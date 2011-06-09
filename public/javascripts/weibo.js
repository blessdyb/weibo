var weibo={
  getAccountInfo : function(){
     $.ajax({
       url: "/account/verify_credentials.json",
       success: function(data){
      	 $('.avatar').html("<img src="+data.profile_image_url+" />");
      	 var avatar='<img src='+data.profile_image_url+' width="80" height="80" />';
      	 if(data.verified){
      	   avatar+='<span class="vip"></span>';
      	 }
      	 $('#info header .user_aside a').html(avatar);
      	 $('#info header h1').html(data.screen_name);
      	 $("#info header .user_main .city").html(data.location);
      	 $("#info header .user_main p:last").html(data.description);
      	 $("#info .user_info .info_wb").append(data.statuses_count);
      	 $("#info .user_info .info_sc").append(data.favourites_count);
      	 $("#info .user_info .info_gz").append(data.friends_count);
      	 $("#info .user_info .info_fs").append(data.followers_count);
       }
     });
  },
  getFriendsTimeline : function(){
    $.ajax({
      url: "/statuses/friends_timeline.json",
      success: function(data){
      	$.each(data,function(i){
      	  var content="<article class='clearfix'>"+
      	  		"<div class='aside'>"+
      	  		    "<a class='user_home' title=''><img src="+this.user.profile_image_url+" />";
      	  if(this.user.verified){
      	    content+="<span class='vip'></span>";
      	  }
      	  content+="<input type='hidden' class='user_id' value='"+this.user.id+"'></hidden></a></div>";
      	  
      	  content+="<div class='main article_img'>"+
      	  		"<div class='top_box'><h6>"+this.user.screen_name+"</h6>"+
      	  		    "<div class='top_oper'><span class='icon_pl'>"+0+"</span><span class='icon_zf'>"+0+"</span></div></div>"+
      	  		 "<div class='text_box'>"+this.text+"<input type='hidden' class='weibo_id' value='"+this.id+"'></hidden></div>"+
      	                 "<div class='footer'><span class='time'>"+0+"分钟前</span><span>来自新浪微博</span></div>"+
      	            "</div>";
          if(this.thumbnail_pic!=undefined){
            content+="<div class='img_box'><img width='80' height='77' src='"+this.thumbnail_pic+"' /></div>";
            $("#picShowr img").attr("src",this.bmiddle_pic);
            $("#picShow img").attr("src",this.original_pic);
          }
          if(this.retweeted_status!=undefined){
            content+="<section class='turn_box'><div class='text_box'>"+this.retweeted_status.text+"<input type='hidden' class='weibo_id' value='"+this.retweeted_status.id+"'></hidden></div>";
            if(this.retweeted_status.thumbnail_pic!=undefined){
              content+="<div class='img_box'><img width='80' height='77' src='"+this.retweeted_status.thumbnail_pic+"' /></div>";
            }
            content+="</section>";
          }
      	  content+="</atricle>";
      	  $("#allmain").append(content);
      	});
      }
    });
  },
  getMentions : function(){
    $.ajax({
      url: "/statuses/mentions.json",
      success: function(data){
      	$.each(data,function(i){
      	  var content="<article class='clearfix'>"+
      	  		"<div class='aside'>"+
      	  		    "<a class='user_home' title=''><img src="+this.user.profile_image_url+" />";
      	  if(this.user.verified){
      	    content+="<span class='vip'></span>";
      	  }
      	  content+="</a></div>";
      	  
      	  content+="<div class='main article_img'>"+
      	  		"<div class='top_box'><h6>"+this.user.screen_name+"</h6>"+
      	  		    "<div class='top_oper'><span class='icon_pl'>"+0+"</span><span class='icon_zf'>"+0+"</span></div></div>"+
      	  		 "<div class='text_box'>"+this.text+"</div>"+
      	                 "<div class='footer'><span class='time'>"+0+"分钟前</span><span>来自新浪微博</span></div>"+
      	            "</div>";
          if(this.thumbnail_pic!=undefined){
            content+="<div class='img_box'><img width='80' height='77' src='"+this.thumbnail_pic+"' /></div>";
          }
          if(this.retweeted_status!=undefined){
            content+="<section class='turn_box'><div class='text_box'>"+this.retweeted_status.text+"</div>";
            if(this.retweeted_status.thumbnail_pic!=undefined){
              content+="<div class='img_box'><img width='80' height='77' src='"+this.retweeted_status.thumbnail_pic+"' /></div>";
            }
            content+="</section>";
          }
      	  content+="</atricle>";
      	  $("#atme .jspPane").append(content);
      	});
      }
    });
  },
  getCommentsToMe : function() {
    $.ajax({
      url: "/statuses/comments_to_me.json",
      success: function(data){
      	$.each(data,function(i){
      	  var content="<article class='clearfix'>"+
      	  		"<div class='aside'>"+
      	  		    "<a class='user_home' title=''><img src="+this.user.profile_image_url+" />";
      	  if(this.user.verified){
      	    content+="<span class='vip'></span>";
      	  }
      	  content+="</a></div>";
      	  
      	  content+="<div class='main article_img'>"+
      	  		"<div class='top_box'><h6>"+this.user.screen_name+"</h6>"+
      	  		    "<div class='top_oper'><span class='icon_pl'>"+0+"</span><span class='icon_zf'>"+0+"</span></div></div>"+
      	  		 "<div class='text_box'>"+this.text+"</div>"+
      	                 "<div class='footer'><span class='time'>"+0+"分钟前</span><span>来自新浪微博</span><div class='user_oper'><a class='options_comment' title=''></a></div></div>";
            content+="<div class='comment_reply'> 回复 @"+ this.status.user.screen_name +" 的微博: "+this.status.text+"</div>";
      	  content+="</div></atricle>";
      	  $("#comment_receive").append(content);
      	});
      }
    });
  },
  getCommentsByMe : function() {
    $.ajax({
      url: "/statuses/comments_by_me.json",
      success: function(data){
      	$.each(data,function(i){
      	  var content="<article class='clearfix'>"+
      	  		"<div class='aside'>"+
      	  		    "<a class='user_home' title=''><img src="+this.user.profile_image_url+" />";
      	  if(this.user.verified){
      	    content+="<span class='vip'></span>";
      	  }
      	  content+="</a></div>";
      	  
      	  content+="<div class='main article_img'>"+
      	  		"<div class='top_box'><h6>"+this.user.screen_name+"</h6>"+
      	  		    "<div class='top_oper'><span class='icon_pl'>"+0+"</span><span class='icon_zf'>"+0+"</span></div></div>"+
      	  		 "<div class='text_box'>"+this.text+"</div>"+
      	                 "<div class='footer'><span class='time'>"+0+"分钟前</span><span>来自新浪微博</span><div class='user_oper'><a class='options_comment' title=''></a></div></div>";
            content+="<div class='comment_reply'> 回复 @"+ this.status.user.screen_name +" 的微博: "+this.status.text+"</div>";
      	  content+="</div></atricle>";
      	  $("#comment_issued").append(content);
      	});
      }
    });
  },
  getUserTimeline : function(user_id) {
    var url="/statuses/user_timeline.json";
    $.ajax({
      url: url,
      success: function(data){
      	$.each(data,function(i){
      	  var content="<article class='clearfix'>"+
      	  		"<div class='aside'>"+
      	  		    "<a class='user_home' title=''><img src="+this.user.profile_image_url+" />";
      	  if(this.user.verified){
      	    content+="<span class='vip'></span>";
      	  }
      	  content+="</a></div>";
      	  
      	  content+="<div class='main article_img'>"+
      	  		"<div class='top_box'><h6>"+this.user.screen_name+"</h6>"+
      	  		    "<div class='top_oper'><span class='icon_pl'>"+0+"</span><span class='icon_zf'>"+0+"</span></div></div>"+
      	  		 "<div class='text_box'>"+this.text+"</div>"+
      	                 "<div class='footer'><span class='time'>"+0+"分钟前</span><span>来自新浪微博</span></div>"+
      	            "</div>";
          if(this.thumbnail_pic!=undefined){
            content+="<div class='img_box'><img width='80' height='77' src='"+this.thumbnail_pic+"' /></div>";
          }
          if(this.retweeted_status!=undefined){
            content+="<section class='turn_box'><div class='text_box'>"+this.retweeted_status.text+"</div>";
            if(this.retweeted_status.thumbnail_pic!=undefined){
              content+="<div class='img_box'><img width='80' height='77' src='"+this.retweeted_status.thumbnail_pic+"' /></div>";
            }
            content+="</section>";
          }
      	  content+="</atricle>";
      	  $("#info_wb").append(content);
      	});
      }
    });
  },
  getFollowers : function(){
    $.ajax({
      url: "/statuses/followers.json",
      success: function(data){
      	$.each(data,function(i){
      	  var content="<div class='fans_card'><a title='' class='user_home'><img src='"+this.profile_image_url+"' />";
      	  if(this.verified){
      	    content+="<span class='vip'></span>";
      	  }
      	  content+="</a><p>"+this.screen_name+"</p>";
      	  if(this.gender=="m"){
      	    content+="<p>男";
      	  }else{
      	    content+="<p>女";
      	  }
      	  content+=this.location+"</p><p>"+this.followers_count+"</p></div>";
      	  $("#info_fs").append(content);
      	});
      }
    });
  },
  getFriends : function(){
    $.ajax({
      url: "/statuses/friends.json",
      success: function(data){
      	$.each(data,function(i){
      	  var content="<div class='fans_card'><a title='' class='user_home'><img src='"+this.profile_image_url+"' />";
      	  if(this.verified){
      	    content+="<span class='vip'></span>";
      	  }
      	  content+="</a><p>"+this.screen_name+"</p>";
      	  if(this.gender=="m"){
      	    content+="<p>男";
      	  }else{
      	    content+="<p>女";
      	  }
      	  content+=this.location+"</p><p>"+this.followers_count+"</p></div>";
      	  $("#info_gz").append(content);
      	});
      }
    });  
  },
  getUserInfo : function(user_id){
    $.ajax({
    	url: "/users/show.json?id="+user_id,
    	success: function(data){
    	  var avatar='<img src="'+data.profile_image_url+'" width="80" height="80" />';
    	  if(data.verified==true){
    	    avatar+="<span class='vip'></span>";
    	  }
    	  $("#userMaterial header .user_aside .user_home").html(avatar);
    	  var detail="<h6>"+data.screen_name+"</h6>";
    	   if(data.gender=="m"){
      	    detail+="<p>男,";
      	  }else{
      	    content+="<p>女,";
      	  }
      	  detail+=data.location+"</p><p>"+data.description+"</p>";
    	  $("#userMaterial header .user_main").html(detail);
    	  var counters="<li><a title=''><span>微博</span>"+data.statuses_count+"</li><li><a title=''><span>关注</span>"+data.friends_count+"</li><li><a title=''><span>粉丝</span>"+data.followers_count+"</li>";
    	  $("#userMaterial header .user_info").html(counters);
    	  $("#userMaterial .user_blog .jspPane").html("");
	  $.ajax({
	     url: "/statuses/user_timeline.json?id="+user_id,
	     success: function(data){
	      	$.each(data,function(i){
	      	  var content="<article class='clearfix'>";
	      	  content+="<div class='main article_img'>"+
	      	  		"<div class='top_box'><h6>"+this.user.screen_name+"</h6>"+
	      	  		    "<div class='top_oper'><span class='icon_pl'>"+0+"</span><span class='icon_zf'>"+0+"</span></div></div>"+
	      	  		 "<div class='text_box'>"+this.text+"</div>"+
	      	                 "<div class='footer'><span class='time'>"+0+"分钟前</span><span>来自新浪微博</span></div>"+
	      	            "</div>";
		  if(this.thumbnail_pic!=undefined){
		    content+="<div class='img_box'><img width='80' height='77' src='"+this.thumbnail_pic+"' /></div>";
		  }
		  if(this.retweeted_status!=undefined){
		    content+="<section class='turn_box'><div class='text_box'>"+this.retweeted_status.text+"</div>";
		    if(this.retweeted_status.thumbnail_pic!=undefined){
		      content+="<div class='img_box'><img width='80' height='77' src='"+this.retweeted_status.thumbnail_pic+"' /></div>";
		    }
		    content+="</section>";
		  }
	      	  content+="</atricle>";
	      	  $("#userMaterial .user_blog .jspPane").append(content);
	      	});
	      }
	    });	  
    	}
    });
  },
  getWeiboComments : function(weibo_id){
    var url="/statuses/show.json?id="+weibo_id;
    $.ajax({
    	url: url,
    	success: function(data){
    	  var avatar='<img src="'+data.user.profile_image_url+'" />';
    	  if(data.user.verified==true){
    	    avatar+="<span class='vip'></span>";
    	  }
    	  $("#blogShow .blog_top .user_home").html(avatar);
    	  $("#blogShow .blog_top .user_name").html(data.user.screen_name);
    	  $("#blogShow .artivle_scroll .artivle_text p").html(data.text);
    	  
    	  $.ajax({
    	    url: "/statuses/comments.json?id="+weibo_id,
    	    success: function(data){
    	      $("#blogShow .artivle_comment").html("");
    	      var content='<h2>评论<span>'+data.length+'条</span><a title="" class="options_refresh"></a></h2>';
    	      $.each(data, function(){
		 content+="<article class='clearfix'><div class='aside'><a class='user_home' title=''><img src='"+this.user.profile_image_url+"' />";
		 if(this.user.verified==true){
		   content+="<span class='vip'></span>";
		 } 
		 content+="</a></div><div class='main'><div class='text_box'>"+this.text+"</div><div class='footer clearfix'><span class='time'>38分钟前</span><div class='user_oper'><a title='' class='options_comment'></a></div></div></article>";
    	      });
    	      $("#blogShow .artivle_comment").html(content);
    	    }
    	  });
    	}
    });
  }
  
};
