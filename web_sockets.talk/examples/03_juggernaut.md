!SLIDE smbullets incremental left

# Juggernaut #

* https://github.com/maccman/juggernaut
* Juggernaut 2, which is a completely rewrite, is built on node.js
* It's insanely fast, and can scale horizontally to millions of clients
* Requirements: Node.js, Redis, Ruby

!SLIDE

# Getting started with Juggernaut #

	@@@ javascript
	
		// Javascript
		var jug = new Juggernaut;
		jug.subscribe("channel_name", function(data){
		  console.log("Got data: " + data);
		});
		
	
		// Ruby
		Juggernaut.publish("channel_name", {:some => "data"})
		Juggernaut.publish(["channel1", "channel2"], "foo")