!SLIDE smbullets incremental

## Now try to go off in this direction ##

<br/>
* What if we wanted to hijack a click event (or touch event)
* and send the response to another browser...
* on another computer...

!SLIDE

# Consider this constructor #

	@@@ javascript
		var DetachedHead = function(name, options){
		  this.juggernaut = new Juggernaut();

		  this.channelName = 'display-' + name;

		  this.target = $('body');

		  var dh = this;
		  this.juggernaut.subscribe(this.channelName, function(data){
		    dh.loadView(data);
		  });
		};
		
!SLIDE

# Instance Methods #

	@@@ javascript
		$.extend(DetachedHead.prototype, {
		  loadView: function(data){
		    this.target.html(data);
		  },

		  destroy: function(){
		    this.juggernaut.unsubscribe(this.channelName);
		  }
		});
		
		
!SLIDE small

## Middleware to the rescue ##

	@@@ ruby
		require 'rack/utils'
		require 'juggernaut'

		class DetachedHeadMiddleware  
		  def initialize(app)
		    @app = app
		  end

		  def call(env)   
		    status, headers, response = @app.call(env)

		    if env["HTTP_SENDTODETACHED"]
		      Juggernaut.publish(env["HTTP_SENDTODETACHED"], response.body)

		      [200, {}, ['Ok']]
		    else
		      [status, headers, response]
		    end
		  end
		end
		
!SLIDE

# Class Methods #

	@@@ javascript
	
	$.extend(DetachedHead, {
	  sendTo: function(name, target_url){
	    $.ajax({
	       type : "GET",
	       url: target_url,
	       beforeSend: function(xhr){
	         xhr.setRequestHeader('SendToDetached', 'display-' + name);
	       }
	     });
	  }
	});
	
!SLIDE

# Usage #

	@@@ javascript
		// In one browser
		dh = new DetachedHead('main');
	
		// In another browser
		DetachedHead.sendTo('main', '/chat');
		