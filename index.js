/* eslint-disable no-console */
// eslint-disable-next-line import/no-unresolved
const Discord = require('discord.js');

const client = new Discord.Client();
const token = process.env.TOKEN;

client.once('ready', () => {
  console.log('Client Ready!');
});

client.login(token);

client.on('message', (message) => {
  if (message.content === '!ping') {
    message.channel.send('Pong.');
  }
});
