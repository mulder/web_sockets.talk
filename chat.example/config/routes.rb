Chat::Application.routes.draw do

  match 'chat/post' => 'chat#post', :method => :post
  match 'chat(/:room)' => 'chat#index', :method => :get


  root :to => "welcome#index"

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id(.:format)))'
end
