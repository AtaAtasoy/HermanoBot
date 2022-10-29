const { SlashCommandBuilder } = require('@discordjs/builders');
const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config({ path: '../.env' });

const scraperServer = process.env.SCRAPER_SERVER;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('volleyball')
        .setDescription('Display the dates of upcoming volleyball matches.'),
    async execute(interaction) {
        let msg = ''
        let responseString = '';

        axios.get(scraperServer + "/volleyball")
            .then((res) => res.data)
            .then((data) => {
                console.log(data);
                data.forEach(element => {
                    responseString += element['title'].replace(/\s\s+/g, ' ') + ' ' + element['date'] + '\n';
                });
                msg = `Volleyball Matches:\n${responseString}\n`
            })
            .then(() => interaction.reply(msg))
            .catch(err => {
                console.error(err)
            })
    },
};