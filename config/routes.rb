Weibo::Application.routes.draw do
  get '/statuses/public_timeline' => 'weibo#statuses_public_timeline'
  get '/statuses/friends_timeline' => 'weibo#statuses_friends_timeline'
  get '/statuses/user_timeline' => 'weibo#statuses_user_timeline'
  get '/statuses/mentions' => 'weibo#statuses_mentions'
  get '/statuses/comments_timeline' => 'weibo#statuses_comments_timeline'
  get '/statuses/comments_to_me' => 'weibo#statuses_comments_to_me'
  get '/statuses/comments_by_me' => 'weibo#statuses_comments_by_me'
  get '/statuses/comments' => 'weibo#statuses_comments' 
  get '/statuses/counts' => 'weibo#statuses_counts' 
  get '/statuses/repost_timeline' => 'weibo#statuses_repost_timeline' 
  get '/statuses/repost_by_me' => 'weibo#statuses_repost_by_me' 
  get '/statuses/unread' => 'weibo#statuses_unread'
  get '/statuses/reset_count' => 'weibo#statuses_reset_count'  
  get '/emotions' => 'weibo#emotions'    
  
  get '/statuses/show' => 'weibo#statuses_show'
  get '/statuses/update' => 'weibo#statuses_update'
  get '/statuses/destroy' => 'weibo#statuses_destroy'
  get '/statuses/repost' => 'weibo#statuses_repost'
  get '/statuses/comment' => 'weibo#statuses_comment'
  get '/statuses/comment_destroy' => 'weibo#statuses_comment_destroy'
  get '/statuses/reply' => 'weibo#statuses_reply'
  
  get '/users/show' => 'weibo#users_show'
  get '/statuses/friends' => 'weibo#statuses_friends'
  get '/statuses/followers' => 'weibo#statuses_followers'
  get '/users/hot' => 'weibo#users_hot'
  get '/user/friends/update_remark'
  get '/users/suggestions' => 'weibo#users_suggestions'
  
  get '/friendships/create' => 'weibo#friendships_create'
  get '/friendships/destroy' => 'weibo#friendships_destroy'
  
  get '/direct_messages' => 'weibo#direct_messages'
  get '/direct_messages/send' =>'weibo#direct_messages_send'
  get '/direct_messages/new' => 'weibo#direct_messages_new'
  get '/direct_messages/destroy' => 'weibo#direct_messages_destroy'
  
  get '/account/verify_credentials' => 'weibo#account_verify_credentials'
  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  root :to => "weibo#index"

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  match ':controller(/:action(/:id(.:format)))'
end
