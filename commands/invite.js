const Discord = require('discord.js')
module.exports = {
    run: message => {
const invite = new Discord.MessageEmbed()
            .setTitle(`Spinso - Inviter Moi !`)
            .setDescription("Inviter Spinso en [cliquant-ici](https://discordapp.com/oauth2/authorize?client_id=768950260163674162&scope=bot&permissions=8)")
            .setImage('https://cdn.discordapp.com/attachments/769370480784048162/774783659030085632/unknown.png')  


        message.channel.send(invite)
    },
    name: 'invite'
    
}