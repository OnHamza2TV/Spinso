const Discord = require('discord.js')
module.exports = {
    run: message => message.channel.send(new Discord.MessageEmbed()
    .setTitle(`Voici Mon ping : ${client.ws.ping} ms`)
    ),
    name: 'ping',
    guildOnly: true
}