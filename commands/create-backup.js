const Discord = require('discord.js');
const backup = require("discord-backup"),

module.exports = {
    run: async (message, args) => { 
        if(!message.member.hasPermission("ADMINISTRATOR")){
            return message.channel.send(":x: | Vous devez être administrateur de ce serveur pour demander une sauvegarde!");
        }
        backup.create(message.guild, {
            jsonBeautify: true
        }).then((backupData) => {
            message.author.send("La sauvegarde a été créée! Pour le charger, tapez cette commande sur le serveur de votre choix: `"+settings.prefix+"load "+backupData.id+"`!");
            message.channel.send(":white_check_mark:Sauvegarde créée avec succès. L'ID de sauvegarde a été envoyé dans dm!");
},
    name: 'create-backup',
    guildOnly: true
}
