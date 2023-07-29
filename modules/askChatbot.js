const askChatbot = require('./chatbot');

// This is an example. Replace this with the real user's message.
const userMessage = 'This has been on my mind for a while do you know Who Yoko Ono is?';

askChatbot(userMessage)
  .then(botResponse => {
    console.log(botResponse);
    // Here, you would typically send `botResponse` back to the user.
  });
