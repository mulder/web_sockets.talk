send = function(){
  var payload = {room: $('#chat_room').attr('rel-name'), 
                 from: $('.chat_name').val(), 
                 msg: $('.chat_message').val()};
  
  $.post('/chat/post', payload);

  $('.chat_message').val('');
  
  return false;
};

receive = function(data){
  data = JSON.parse(data);

  msg = $('<div>');
  msg.append('<span>' + data['from'] +' @ ' + data['time'] + ': </span>');
  msg.append(data['msg']);

  if(data['from'] === $('.chat_name').val())
    msg.addClass('self');

    $('#chat_window').append(msg).scrollTop($('#chat_window').height());
};

send_on_enter = function(event){
  if(event.which == 13)
    return send();
};

$(document).ready(function(){

  if($('#chat_room').length){
    $('.chat_name').val('Guest' + Math.floor(Math.random()*1000));

    juggernaut.subscribe($('#chat_room').attr('rel-channel-name'), receive);
    $(document).bind('keypress', send_on_enter);
  };
});
