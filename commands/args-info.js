module.exports = {
  name: 'args-info',
  description: 'Displays argument information',
  args: true,
  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line consistent-return
  execute(message, args) {
    if (args[0] === 'foo') {
      return message.channel.send('bar');
    }
    message.channel.send(`Arguments: ${args}`);
  },
};
