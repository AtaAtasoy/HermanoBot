/* eslint-disable consistent-return */
/* eslint-disable global-require */
/* eslint-disable no-console */
// eslint-disable-next-line import/no-unresolved
const Discord = require('discord.js');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();
const client = new Discord.Client();
const token = process.env.TOKEN;
const prefix = process.env.PREFIX;
client.commands = new Discord.Collection();
// Reading the commandFiles
const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));

// Setting the commands to the collection
// eslint-disable-next-line no-restricted-syntax
for (const file of commandFiles) {
  // eslint-disable-next-line import/no-dynamic-require
  const command = require(`./commands/${file}`);

  // set new item with the key as the command name and the value as the exported module
  client.commands.set(command.name, command);
}

client.once('ready', () => {
  console.log('Client Ready!');
});

client.on('message', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);

  if (command.args && !args.length) {
    return message.channel.send(`You did not provide any arguments ${message.author}!`);
  }
  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('There was an error trying to execute that command!');
  }
});

client.login(token);
