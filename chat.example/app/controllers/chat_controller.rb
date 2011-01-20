class ChatController < ApplicationController

  helper_method :channel_name, :room_name

  def index
    @title = "#{room_name} Chat Room"
  end

  def post
    payload = {:from => params[:from],
               :time => Time.now.strftime("%H:%M"),
               :msg => params[:msg]}

    Juggernaut.publish(channel_name, payload.to_json);

    render :text => 'ok'
  end

  private

    def channel_name
      "#{room_name}-chat-room"
    end

    def room_name
      params[:room] || 'Juggernaut'
    end

end
