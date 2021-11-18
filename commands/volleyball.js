const { SlashCommandBuilder } = require('@discordjs/builders');
const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config({ path: '../.env' });

const scraperApiUrl = process.env.SCRAPER_API_URL;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('volleyball')
        .setDescription('Display the dates of upcoming volleyball matches.'),
    async execute(interaction) {
        let matches = [];
        
        axios.get(scraperApiUrl + "/volleyball")
            .then((res) => {
                matches = res.data
            })
            .then(() => {
                console.log(matches);

                let responseString = "";
                matches.forEach(element => {
                    responseString += element['title'].replace(/\s\s+/g, ' ') + ' ' + element['date'] + '\n';
                });
                return interaction.reply(`Sent request to: ${scraperApiUrl + "/volleyball"}\nVolleyball Matches:\n${responseString}\n`);
            })
            .catch(err => {
                console.log(err)
            })
    },
};