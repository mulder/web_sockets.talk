!SLIDE center

![Chat Demo](chat.png)

!SLIDE

# Chat ERB #

	@@@ html

		<div id="chat_room" rel-channel-name="<%= channel_name %>" 
		                    rel-name="<%= room_name %>">

		   <label for="chat_name">ScreenName:</label>
		   <input type="text" name="chat_name" class="chat_name" value=""/ >
       
		   <div id="chat_window"></div>
       
		   <textarea class="chat_message" name="chat_message"></textarea>
		</div>   
    
!SLIDE

# Chat javascript #

	@@@ javascript
	
		$(document).ready(function(){
			var channel_name = $('#chat_room').attr('rel-channel-name');
			
			$('.chat_name').val('Guest' + Math.floor(Math.random()*1000));
			
			juggernaut.subscribe(channel_name, receive);

			$(document).bind('keypress', function(event){
				if(event.which == 13) // Enter KeyPress
					return send();
			});
		});
  
!SLIDE

# Chat Send #
	
	@@@ javascript

		send = function(){
			var payload = {room: $('#chat_room').attr('rel-name'), 
			               from: $('.chat_name').val(), 
			               msg: $('.chat_message').val()};

			$.post('/chat/post', payload);

			$('.chat_message').val('');

			return false;
		};
		
!SLIDE

# Chat Receive #

	@@@ javascript

	receive = function(data){
		data = JSON.parse(data);

		msg = $('<div>');
		msg.append('<span>'+data['from']+' @ '+data['time']+': </span>');
		msg.append(data['msg']);

		if(data['from'] === $('.chat_name').val())
			msg.addClass('self');

		$('#chat_window').append(msg).scrollTop($('#chat_window').height());
	};


!SLIDE

# Routes #

	@@@ ruby
	
		match 'chat/post' => 'chat#post', :method => :post
		match 'chat(/:room)' => 'chat#index', :method => :get
	  
    
!SLIDE  small

# Chat Controller #

	@@@ ruby
		class ChatController < ApplicationController
			helper_method :channel_name, :room_name
		  
			def index
				@title = "#{room_name} Chat Room"
			end

			def post
				...
			end
			
		private
			def channel_name
				"#{room_name}-chat-room"
			end
			def room_name
				params[:room] || 'Juggernaut'
			end
		end

!SLIDE

# Chat post action #

	@@@ ruby
	
		def post
			payload = {:from => params[:from],
			           :time => Time.now.strftime("%H:%M"),
			           :msg => params[:msg]}

			Juggernaut.publish(channel_name, payload.to_json)
			render :text => 'ok'
		end
  