// Usage:
// 
//  Create detached head
// 
// $(document).ready(function(){
//   DetachedHead.create('one', {target: '#detached'});
// });
// 
//  Send a url to a detached head
// 
// DetachedHead.sendTo('one', 'http://localhost:3000/welcome/hello');
// 

var DetachedHead = function(name, options){
  this.options = options || {};
  
  this.options.target = this.options.target || 'body';
  
  this.juggernaut = new Juggernaut();

  this.name = name;
  this.channelName = 'display-' + name;
  
  this.target = $(this.options.target);
  
  var dh = this;
  this.juggernaut.subscribe(this.channelName, function(data){
    dh.loadView(data);
  });
};

// Instance Methods
$.extend(DetachedHead.prototype, {
  loadView: function(data){
    this.target.html(data);
  },
  
  destroy: function(){
    this.juggernaut.unsubscribe(this.channelName);
  }
});

// Class Methods
$.extend(DetachedHead, {
  sendTo: function(name, target_url){
    $.ajax({
       type : "GET",
       url: target_url,
       beforeSend: function(xhr){
         xhr.setRequestHeader('SendToDetached', 'display-' + name);
       }
     });
  },

  create: function(name, options){
    if(DetachedHead.current)
      DetachedHead.current.destroy();

    DetachedHead.current = new DetachedHead(name, options);
  }
});