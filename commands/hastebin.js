const Discord = require("discord.js")
const fetch = require("node-fetch")

module.exports = {
    run: async (message, args) => { 
const content = args.join(" ");
if(!content) return message.error("Veuillez mettre un texte ou code à enregistrer dans un hastebin!")
if(content.length > 1600) return message.channel.send("Votre message est très long!")

try {
    const res = await fetch("https://hasteb.in/documents", {
        method: "POST",
        body: content,
        headers: { "Content-Type": "text/plain" }
    });
    
    const json = await res.json();
    if(!json.key) return message.channel.send("Une erreur s'est produite!")
    const url = "https://hasteb.in/"+json.key+".js";

    const embed = new Discord.MessageEmbed()
    .setTitle("Nouveau Hastebin créé")
    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
    .addField("Lien du Hastebin", url)
    .addField("Contenu", `\`\`\`js\n${content}\n\`\`\``)
    message.channel.send(embed)
} catch(e){
    message.channel.send("Une erreur s'est produite!");
}
},

    name: 'hastebin',
    guildOnly: true
}