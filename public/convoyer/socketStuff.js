$(function () {

  var serverAddress = 'http://ec2-34-215-115-69.us-west-2.compute.amazonaws.com:3000';

  console.log('socketStuff called');

  getMessages();

  var socket = io();

  var FADE_TIME = 150; // ms
  var TYPING_TIMER_LENGTH = 400; // ms
  var COLORS = [
    '#e21400', '#f8a700', '#f78b00',
    '#58dc00', '#a8f07a', '#4ae8c4',
    '#3b88eb'
  ];

  /// Initialize variables
  var $window = $(window);
  var $usernameInput = $('.usernameInput'); // Input for username
  var $messages = $('.messages'); // Messages area
  var $inputMessage = $('.inputMessage'); // Input message input box
  var $chatPage = $('.chat.page'); // The chatroom page


  // Prompt for setting a username
  var username = '';
  var connected = true;
  var typing = false;
  var lastTypingTime;
  var $currentInput = $usernameInput.focus();
  setUsername();

  let sendMessageButton = parent.document.getElementById('sendMessageButton');

  sendMessageButton.addEventListener('click', function () {
    sendMessage();
  })

  function getMessages() {
    var xhr = new XMLHttpRequest();

    if (!xhr) {
      return false;
    }

    xhr.onreadystatechange = function () {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        let json = JSON.parse(xhr.responseText);
        if (json.length > 0) {
          console.log('logging json from getMessages');
          console.log(json);
          for (let i = 0; i < json.length; i++) {
            let username = json[i].FirstName;
            let message = json[i].Message;

            addChatMessage({ "username": username, "message": message });
          }
        }
      }
    }

    xhr.open("GET", serverAddress + "/messages/", true);

    xhr.send(null);
  }

  function addParticipantsMessage(data) {
    var message = '';
    if (data.numUsers === 1) {
      message += "1 User Online";
    } else {
      message += data.numUsers + " Users Online";
    }
    log(message);
  }

  // Sets the client's username
  function setUsername() {

    console.log('setUsername called');

    username = "DISPATCH";
    socket.emit('add user', username);
  }

  // Sends a chat messages
  function sendMessage() {

    var message = $inputMessage.val();
    // Prevent markup from being injected into the message
    message = cleanInput(message);

    // if there is a non-empty message and a socket connection
    if (message && connected) {
      $inputMessage.val('');
      addChatMessage({
        username: username,
        message: message
      });
      // tell server to execute 'message' and send along one parameter
      socket.emit('new message', message);
    }

    postMessage(message);
  }

  // Log a message
  function log(message, options) {
    var $el = $('<li>').addClass('log').text(message);
    addMessageElement($el, options);
  }

  // Adds the visual chat message to the message list
  function addChatMessage(data, options) {

    console.log('logging data from addChatMessage ')
    console.log(data);

    // Don't fade the message in if there is an 'X was typing'
    var $typingMessages = getTypingMessages(data);
    options = options || {};
    if ($typingMessages.length !== 0) {
      options.fade = false;
      $typingMessages.remove();
    }

    var $usernameDiv = $('<span class="username"/>')
      .text(data.username)
      .css('color', getUsernameColor(data.username));
    var $messageBodyDiv = $('<span class="messageBody">')
      .text(data.message);

    var typingClass = data.typing ? 'typing' : '';
    var $messageDiv = $('<li class="message"/>')
      .data('username', data.username)
      .addClass(typingClass)
      .append($usernameDiv, $messageBodyDiv);

    addMessageElement($messageDiv, options);
  }

  // Adds the visual chat typing message
  function addChatTyping(data) {
    data.typing = true;
    data.message = 'is typing';
    addChatMessage(data);

  }

  // Removes the visual chat typing message
  function removeChatTyping(data) {
    getTypingMessages(data).fadeOut(function () {
      $(this).remove();
    });
  }

  // Adds a message element to the messages and scrolls to the bottom
  // el - The element to add as a message
  // options.fade - If the element should fade-in (default = true)
  // options.prepend - If the element should prepend
  //   all other messages (default = false)
  function addMessageElement(el, options) {
    var $el = $(el);

    // Setup default options
    if (!options) {
      options = {};
    }
    if (typeof options.fade === 'undefined') {
      options.fade = true;
    }
    if (typeof options.prepend === 'undefined') {
      options.prepend = false;
    }

    // Apply options
    if (options.fade) {
      $el.hide().fadeIn(FADE_TIME);
    }
    if (options.prepend) {
      $messages.prepend($el);
    } else {
      $messages.append($el);
    }
    $messages[0].scrollTop = $messages[0].scrollHeight;
  }

  // Prevents input from having injected markup
  function cleanInput(input) {
    return $('<div/>').text(input).html();
  }

  // Updates the typing event
  function updateTyping() {
    if (connected) {
      if (!typing) {
        typing = true;
        socket.emit('typing');
      }
      lastTypingTime = (new Date()).getTime();

      setTimeout(function () {
        var typingTimer = (new Date()).getTime();
        var timeDiff = typingTimer - lastTypingTime;
        if (timeDiff >= TYPING_TIMER_LENGTH && typing) {
          socket.emit('stop typing');
          typing = false;
        }
      }, TYPING_TIMER_LENGTH);
    }
  }

  // Gets the 'X is typing' messages of a user
  function getTypingMessages(data) {
    return $('.typing.message').filter(function (i) {
      return $(this).data('username') === data.username;
    });
  }

  // Gets the color of a username through our hash function
  function getUsernameColor(username) {
    // Compute hash code
    var hash = 7;
    for (var i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + (hash << 5) - hash;
    }
    // Calculate color
    var index = Math.abs(hash % COLORS.length);
    return COLORS[index];
  }

  function postMessage(message) {

    var xhr = new XMLHttpRequest();

    if (!xhr) {
      return false;
    }

    xhr.open("POST", serverAddress + "/messages", true);

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(JSON.stringify({
      "MessageID": createID(),
      "Message": message,
      "GuardID": 'DISPATCH'
    }));

  }

  function createID() {
    var newID = Math.random().toString(36).substr(2, 9);
    return newID;
  }


  // Keyboard events

  $window.keydown(function (event) {
    // Auto-focus the current input when a key is typed
    if (!(event.ctrlKey || event.metaKey || event.altKey)) {
      $currentInput.focus();
    }
    // When the client hits ENTER on their keyboard
    if (event.which === 13) {
      if (username) {
        sendMessage();
        socket.emit('stop typing');
        typing = false;
      } else {
      }
    }
  });

  $inputMessage.on('input', function () {
    updateTyping();
  });

  // Click events

  // Focus input when clicking on the message input's border
  $inputMessage.click(function () {
    $inputMessage.focus();
  });

  // Socket events

  // Whenever the server emits 'login', log the login message
  socket.on('login', function (data) {

    connected = true;
    // Display the welcome message
    var message = "CONVOYER CHAT";
    log(message, {
      prepend: true
    });
    addParticipantsMessage(data);
  });

  // Whenever the server emits 'message', update the chat body
  socket.on('message', function (data) {

    addChatMessage(data);

  });

  // Whenever the server emits 'user joined', log it in the chat body
  socket.on('user joined', function (data) {
    log(data.username + ' joined');
    addParticipantsMessage(data);

  });

  // Whenever the server emits 'user left', log it in the chat body
  socket.on('user left', function (data) {
    log(data.username + ' left');
    addParticipantsMessage(data);
    removeChatTyping(data);

  });

  // Whenever the server emits 'typing', show the typing message
  socket.on('typing', function (data) {
    addChatTyping(data);
  });

  // Whenever the server emits 'stop typing', kill the typing message
  socket.on('stop typing', function (data) {
    removeChatTyping(data);
  });

  socket.on('disconnect', function () {
    log('you have been disconnected');
  });

  socket.on('reconnect', function () {
    log('you have been reconnected');
    if (username) {
      socket.emit('add user', username);
    }
  });

  socket.on('reconnect_error', function () {
    log('attempt to reconnect has failed');
  });



});
