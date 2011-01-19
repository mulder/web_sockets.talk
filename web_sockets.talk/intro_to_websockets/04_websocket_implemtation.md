!SLIDE smaller

# WebSocket Interface #
	@@@ javascript  
		[Constructor(in DOMString url, in optional DOMString protocols)]
		[Constructor(in DOMString url, in optional DOMString[] protocols)]

		interface WebSocket {
			readonly attribute DOMString url;

			// ready state
			const unsigned short CONNECTING = 0;
			const unsigned short OPEN = 1;
			const unsigned short CLOSING = 2;
			const unsigned short CLOSED = 3;
			readonly attribute unsigned short readyState;
			readonly attribute unsigned long bufferedAmount;

			// networking
			         attribute Function onopen;
			         attribute Function onmessage;
			         attribute Function onerror;
			         attribute Function onclose;
			readonly attribute DOMString protocol;
			void send(in DOMString data);
			void close();
		};
		WebSocket implements EventTarget;

!SLIDE

# WebSocket Interface #

	@@@ ruby
		[Constructor(in DOMString url, in optional DOMString protocols)]
		[Constructor(in DOMString url, in optional DOMString[] protocols)]

!SLIDE

# WebSocket Interface #


	@@@ javascript
		readonly attribute DOMString url;


!SLIDE

# WebSocket Interface #

	@@@ javascript
		// ready state
		const unsigned short CONNECTING = 0;
		const unsigned short OPEN = 1;
		const unsigned short CLOSING = 2;
		const unsigned short CLOSED = 3;
		readonly attribute unsigned short readyState;


!SLIDE

# WebSocket Interface #

	@@@ javascript
		// networking
		attribute Function onopen;
		attribute Function onmessage;
		attribute Function onerror;
		attribute Function onclose;


!SLIDE

# WebSocket Interface #

	@@@ javascript
		void send(in DOMString data);
		void close();

!SLIDE smaller

# WebSocket Interface #

	@@@ javascript
		[Constructor(in DOMString url, in optional DOMString protocols)]
		[Constructor(in DOMString url, in optional DOMString[] protocols)]

		interface WebSocket {
		  readonly attribute DOMString url;

		  // ready state
		  const unsigned short CONNECTING = 0;
		  const unsigned short OPEN = 1;
		  const unsigned short CLOSING = 2;
		  const unsigned short CLOSED = 3;
		  readonly attribute unsigned short readyState;
		  readonly attribute unsigned long bufferedAmount;

		  // networking
		           attribute Function onopen;
		           attribute Function onmessage;
		           attribute Function onerror;
		           attribute Function onclose;
		  readonly attribute DOMString protocol;
		  void send(in DOMString data);
		  void close();
		};
		WebSocket implements EventTarget;

!SLIDE

# EventTarget #

	@@@ javascript
		// Introduced in DOM Level 2:
		interface EventTarget {
		  void    addEventListener(in DOMString type, 
		                           in EventListener listener, 
		                           in boolean useCapture);
		
		  void removeEventListener(in DOMString type, 
		                           in EventListener listener, 
		                           in boolean useCapture);
		
		  boolean    dispatchEvent(in Event evt)
		                           raises(EventException);
		};