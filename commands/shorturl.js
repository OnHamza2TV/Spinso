const fetch = require("node-fetch")

module.exports = {
    run: async (message, args) => { 
    const url = args[0];
    if(!url) return message.channel.send("Veuillez mettre un lien!");        
    const res = await fetch(`https://is.gd/create.php?format=simple&url=${encodeURI(url)}`);
    const body = await res.text();
    if(body === "Error: Please enter a valid URL to shorten") return message.channel.send("Veuillez mettre un lien valide!")
    message.channel.send(`**${message.author.username}**, j'ai raccourci le lien \`${url}\` en ${body}!`)
},

    name: 'shorturl',
    guildOnly: true
}