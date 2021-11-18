const { Client, Intents, Collection, ClientUser } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config();

const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;
const scraperApiUrl = process.env.SCRAPER_API_URL;
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const guildId = process.env.GUILD_ID;
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js')); 
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const commands = [];
client.commands = new Collection();


client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) {
    await interaction.reply({ content: `${interaction.commandName} is not supported!`, ephemeral: true });
    return;
  }

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// Register commands and events
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
  client.commands.set(command.data.name, command);
}

for (const file of eventFiles) { 
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

const rest = new REST({ version: '9' }).setToken(token);
 
(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();

client.login(token);

module.exports = {scraperApiUrl};