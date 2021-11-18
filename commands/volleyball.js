const { SlashCommandBuilder } = require('@discordjs/builders');
const dotenv = require('dotenv');
const http = require('http');
dotenv.config();

const SCRAPER_API_URL = process.env.SCRAPER_URL;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('volleyball')
        .setDescription('Display the tickets that are on sale for the upcoming volleyball matches.'),
    async execute(interaction) {
        const data = {};
        const options = {
            hostname: SCRAPER_API_URL,
            path: "/volleyball",
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        };

        const request = http.get(options, (req, res) => {
            console.log(res.data)
            data = res.data;
        })

        return interaction.reply(`Volleyball Matches: ${data}\n`);
    },
};