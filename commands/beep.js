module.exports = {
  name: 'beep',
  description: 'Beep!',
  // eslint-disable-next-line no-unused-vars
  execute(message, args) {
    message.channel.send('Boop!');
  },
};
