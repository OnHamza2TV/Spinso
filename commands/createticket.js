const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
    run: async (message, args, functions) => {
    if(!message.member.hasPermission("ADMINISTRATOR"))
    {
        return message.channel.send("> :no_entry: Désolé tu n'as pas les permissions ``ADMINISTRATOR`` :no_entry:");
    }

if(message && message.deletable) message.delete().catch(e => {});

let embed = new Discord.MessageEmbed()
.setTitle(`Système de Ticket`)
.setFooter(`Spinso | Crée par On Hamza.`, client.user.displayAvatarURL())
.setDescription(`Réagissez avec 🎟️ pour créer un ticket.`);
message.channel.send(embed).then(m => {
  m.react('🎟️');
});

},
    name: 'createticket',
    guildOnly: true
}
