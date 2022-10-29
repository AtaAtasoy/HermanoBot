const axios = require('axios');
const { SlashCommandBuilder } = require('discord.js');
const dotenv = require('dotenv');

dotenv.config({ path: '../.env' });
const scraperServer = process.env.SCRAPER_SERVER;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('twitsearch')
        .setDescription('Performs a twitter search with given params.')
        .addStringOption(optiton =>
            optiton.setName('query')
                .setDescription('This value will be searched in Twitter')
                .setRequired(true)
                .setMaxLength(512)
        )
        .addStringOption(optiton =>
            optiton.setName('sort-order')
                .setDescription("The tweets can be sorted in terms of 'relevance' or 'recency'")
                .addChoices(
                    { name: "relevancy", value: "relevancy" },
                    { name: "recency", value: "recency" },
                )
                .setRequired(true)
        ),
        /** 
        .addIntegerOption(optiton =>
            optiton.setName('max-results')
                .setDescription("Number of tweets to be displayed. Min. 10 Max. 500")
                .setMaxValue(500)
                .setMinValue(10)
        ),*/
    async execute(interaction) {
        const query = await interaction.options.getString("query");
        const sortOrder = await interaction.options.getString("sort-order") ?? 'relevance';
        //const maxResults = await interaction.options.getInteger("max-results") ?? 10;

        const params = new URLSearchParams({
            query: query,
            sortOrder: sortOrder,
            //maxResults: maxResults,
        }).toString();

        console.log("Params:", params)
        const url = scraperServer + '/twitter?' + params
        console.log("URL:", url)
        let msg = ''

        axios.get(url)
            .then(response => response.data)
            .then((data) => {
                data.forEach(tweet => {
                    msg += tweet['text'].replace(/\s\s+/g, ' ') + '\n';
                });
            })
            .then(() => interaction.reply(msg))
            .catch(err => {
                console.error(err)
            })
    },
};