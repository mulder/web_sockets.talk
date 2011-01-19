!SLIDE

# Hello World JS #

	@@@ javascript

		ws = new WebSocket("ws://0.0.0.0:8080/websocket");
		ws.onmessage = function(evt) { console.log(evt.data); };
		ws.onclose = function() { console.log("socket closed"); };
		ws.onopen = function() {
		  console.log("connected...");
		  ws.send("Hello Server!");
		};
    
!SLIDE 

# Hello World Ruby #

	@@@ ruby

		require 'em-websocket'

		EventMachine::WebSocket.start(:host => "0.0.0.0", :port => 8080) do |ws|
		  ws.onopen    { ws.send "Hello Client!"; }
		  ws.onmessage { |msg| ws.send "Pong: #{msg}"; }
		  ws.onclose   { puts "\nWebSocket closed" }
		end
		
		#Output in JS Console
		connected...
		Hello Client!
		Pong: Hello Server!
