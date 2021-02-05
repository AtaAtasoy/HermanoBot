module.exports = {
  name: 'kick',
  description: 'Kick!',
  // eslint-disable-next-line no-unused-vars
  execute(message, args) {
    if (!message.mentions.user.size) {
      message.reply('You need to tag a user!');
    }
    const taggedUser = message.mentions.users.first();
    message.channel.send(`You wanted to kick ${taggedUser.username}`);
  },
};
