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