# encoding: utf-8
require 'rubygems'
require 'oauth'

class WeiboController < ApplicationController
  before_filter :get_access_info, :except => [ :request_token, :access_token ]
  
  def index
    redirect_to request_token
  end

  def consumer
    #sina_api_key="2682305636"
    #sina_api_key_secret="d409a33aa462790d3322f17e657fa323"
    sina_api_key="723367001"
    sina_api_key_secret="7272fad793129fddd5c60a7528c65341"
    OAuth::Consumer.new(sina_api_key,sina_api_key_secret,:site=>"http://api.t.sina.com.cn")
  end

  #获取未授权的Request Token 
  def request_token
    @request_token=consumer.get_request_token
    session[:request_token]=@request_token.token
    session[:request_token_secret]=@request_token.secret
    redirect_to @request_token.authorize_url(:oauth_callback => 'http://localhost:3000/weibo/access_token')
  end

  #获取授权过的Access Token
  def access_token
    request_token = OAuth::RequestToken.new(
          consumer,
          session[:request_token],
          session[:request_token_secret]
         )
    access_token = request_token.get_access_token(:oauth_verifier=>params["oauth_verifier"])
    session[:access_token] = access_token.token
    session[:access_token_secret] = access_token.secret
    file=File.new("#{Rails.root.to_s}/config/weibo.config","w")
    file.puts session[:access_token]
    file.puts session[:access_token_secret]
    file.close
  end
  
  #获取最新的公共微博消息 
  def statuses_public_timeline
    url="http://api.t.sina.com.cn/statuses/public_timeline.json"
    get_response url
  end
  
  #获取当前登录用户及其所关注用户的最新微博消息
  def statuses_friends_timeline
    url="http://api.t.sina.com.cn/statuses/friends_timeline.json"
    url+=get_page
    get_response url
  end
  
  #获取当前登录用户发布的微博消息列表 
  #TODO get every users weibo list ( should use params such as  name, id ...)
  def statuses_user_timeline
    user_id=params[:id]
    url="http://api.t.sina.com.cn/statuses/user_timeline.json"
    url+=get_page
    if !user_id.nil?
    	url+="&id="+params[:id]
    end
    get_response url
  end
  
  #获取@当前用户的微博列表 
  def statuses_mentions
    url="http://api.t.sina.com.cn/statuses/mentions.json"
    url+=get_page
    get_response url
  end
  
  #获取当前用户发送及收到的评论列表
  def statuses_comments_timeline
    url="http://api.t.sina.com.cn/statuses/comments_timeline.json"
    url+=get_page
    get_response url	
  end
  
  #获取当前登录用户发出的评论 
  def statuses_comments_by_me
    url="http://api.t.sina.com.cn/statuses/comments_by_me.json"
    url+=get_page
    get_response url
  end
  
  #获取当前登录用户收到的评论 
  def statuses_comments_to_me
    url="http://api.t.sina.com.cn/statuses/comments_to_me.json"
    url+=get_page
    get_response url
  end
  
  #根据微博消息ID返回某条微博消息的评论列表 
  def statuses_comments
    url="http://api.t.sina.com.cn/statuses/comments.json"
    url+=get_page
    url+="&id="+params[:id]
    get_response url
  end

  #批量获取一组微博的评论数及转发数 
  def statuses_counts
    url="http://api.t.sina.com.cn/statuses/counts.json"
    get_response url
  end
  
  #返回一条原创微博的最新n条转发微博信息
  def statuses_repost_timeline
    url="http://api.t.sina.com.cn/statuses/repost_timeline.json"
    url+=get_page
    url+="&id="+params[:id]
    get_response url
  end
  
  #返回用户转发的最新n条微博信息
  def statuses_repost_by_me
    url="http://api.t.sina.com.cn/statuses/repost_timeline.json"
    url+=get_page
    url+="&id="+params[:id]
    get_response url
  end
  
  #获取当前用户未读消息数 
  def statuses_unread
    url="http://api.t.sina.com.cn/statuses/unread.json"
    get_response url
  end
  
  #未读消息数清零
  def statuses_reset_count
    url="http://api.t.sina.com.cn/statuses/reset_count.json"
    type=params[:type]
    response = @access_token.request(:post, url, :type => type)
    respond_to do |format|
      format.json { render :json => ActiveSupport::JSON.decode(response.body) }
    end
  end
  
  #表情接口，获取表情列表 
  def emotions
    url="http://api.t.sina.com.cn/emotions.json"
    get_response url
  end
  
  #根据ID获取单条微博信息内容 
  def statuses_show
    url="http://api.t.sina.com.cn/statuses/show/"
    url+=params["id"]+".json";
    get_response url
  end
    
  #发布一条微博信息，也可以转发微博信息
  def statuses_update
    url="http://api.t.sina.com.cn/statuses/update.json"
    message=(params[:message].lstrip.empty?) ? "转发微博" : (params[:message].lstrip)
    in_reply_to_status_id=params[:id]
    response = @access_token.request(:post, url, :status=>message, :in_reply_to_status_id => in_reply_to_status_id)
    respond_to do |format|
      format.json { render :json => ActiveSupport::JSON.decode(response.body) }
    end
  end
  
  #上传图片并发布一条微博信息 
  #TODO you should study the rails file upload
  def statuses_upload
  
  end
  
  #删除一条微博信息
  def statuses_destroy
    url="http://api.t.sina.com.cn/statuses/destroy/#{params[:id]}.json"
    response = @access_token.request(:post, url)
    respond_to do |format|
      format.json { render :json => ActiveSupport::JSON.decode(response.body) }
    end
  end
  
  #转发一条微博信息
  def statuses_repost
    url="http://api.t.sina.com.cn/statuses/repost.json"
    response = @access_token.request(:post, url, :id => params[:id])
    respond_to do |format|
      format.json { render :json => ActiveSupport::JSON.decode(response.body) }
    end
  end
  
  #对一条微博信息进行评论
  def statuses_comment
    url="http://api.t.sina.com.cn/statuses/comment.json"
    response = @access_token.request(:post, url, :id => params[:id],:comment => params[:comment])
    respond_to do |format|
      format.json { render :json => ActiveSupport::JSON.decode(response.body) }
    end
  end
  
  #删除当前用户的微博评论信息
  def statuses_comment_destroy
    url="http://api.t.sina.com.cn/statuses/comment_destroy/#{params[:id]}.json"
    response = @access_token.request(:post, url)
    respond_to do |format|
      format.json { render :json => ActiveSupport::JSON.decode(response.body) }
    end
  end
  
  #批量删除当前用户的微博评论信息 
  def statuses_comment_destroy_batch 
  
  end
  
  #回复微博评论信息
  def statuses_reply
    url="http://api.t.sina.com.cn/statuses/reply.json"
    response = @access_token.request(:post, url, :cid => params[:cid], :comment => params[:comment], :id => params[:id])
    respond_to do |format|
      format.json { render :json => ActiveSupport::JSON.decode(response.body) }
    end
  end
  
  #根据用户ID获取用户资料
  def users_show
    url="http://api.t.sina.com.cn/users/show.json?user_id=#{params[:id]}" 
    get_response url 
  end
  
  #获取用户关注列表及每个关注用户最新一条微博
  def statuses_friends
    url="http://api.t.sina.com.cn/statuses/friends.json"
    get_response url
  end
  
  #获取用户粉丝列表及及每个粉丝用户最新一条微博
  def statuses_followers
    url="http://api.t.sina.com.cn/statuses/followers.json"
    get_response url
  end
  
  #获取系统推荐用户
  def users_hot
    url="http://api.t.sina.com.cn/users/hot.json"
    category=(params[:category].lstrip.empty?) ? "default" : (params[:category].lstrip)
    url+="?category="+category
    get_response url
  end
  
  #更新当前登录用户所关注的某个好友的备注信息
  #TODO analysis the needs
  def user_friends_update_remark
  
  end
  
  #返回当前用户可能感兴趣的用户 
  def users_suggestions
    url="http://api.t.sina.com.cn/users/suggestions.json"
    get_response url
  end
  
  #关注某用户
  def friendships_create
    url="http://api.t.sina.com.cn/friendships/create.json"
    response = @access_token.request(:post, url, :user_id => params[:id])
    respond_to do |format|
      format.json { render :json => ActiveSupport::JSON.decode(response.body) }
    end
  end
  
  #取消关注
  def friendships_destroy
    url="http://api.t.sina.com.cn/friendships/destroy.json"
    response = @access_token.request(:post, url, :user_id => params[:id])
    respond_to do |format|
      format.json { render :json => ActiveSupport::JSON.decode(response.body) }
    end
  end
  
  #是否关注某用户(推荐使用friendships/show)
  #TODO analysis the needs
  def friendships_exists
  
  end
  
  #获取两个用户关系的详细情况
  #TODO analysis the needs
  def friendships_show
  
  end
  
  #返回登录用户的最新收到的n条私信，每条私信包含发送者和接受者的详细信息
  def direct_messages
    url="http://api.t.sina.com.cn/direct_messages.json"
    url+=get_page
    get_response url
  end
  
  #返回登录用户已发送的最新n条私信，每条私信包含发送者和接受者的详细信息
  def direct_messages_send
    url="http://api.t.sina.com.cn/direct_messages/send.json"
    url+=get_page
    get_response url
  end
  
  #发送一条私信，请求必须使用POST方式提交。发送成功将返回完整的私信消息，包括发送者和接收者的详细信息
  def direct_messages_new
    url="http://api.t.sina.com.cn/direct_messages/new.json"
    response = @access_token.request(:post, url, :id => params[:id], :text => params[:text])
    respond_to do |format|
      format.json { render :json => ActiveSupport::JSON.decode(response.body) }
    end
  end
  
  #根据ID删除登录用户收到的私信
  def direct_messages_destroy
    url="http://api.t.sina.com.cn/direct_messages/destroy/#{params[:id]}.json"
    response = @access_token.request(:post, url)
    respond_to do |format|
      format.json { render :json => ActiveSupport::JSON.decode(response.body) }
    end
  end
  
  #验证当前的用户身份的合法性，并返回当前用户的身份信息
  def account_verify_credentials 
    url="http://api.t.sina.com.cn/account/verify_credentials.json"
    get_response url
  end

  private 
  
  def get_access_info
    lines=File.readlines("#{Rails.root.to_s}/config/weibo.config")
    access_token_saved=lines[0].chomp
    access_token_secret_saved=lines[1].chomp
    @access_token = OAuth::AccessToken.new(consumer, access_token_saved,access_token_secret_saved)
  end

  def get_page
    if params[:page].nil?
      page="1"
    else
      page=(params[:page].lstrip.empty?) ? "1" : (params[:page].lstrip)
    end
    "?page="+page
  end

  def get_response(url)
    response=@access_token.request(:get, url) 
    puts ActiveSupport::JSON.decode(response.body)
    respond_to do |format|
      format.json { render :json => ActiveSupport::JSON.decode(response.body) }
    end
  end
end
