const Discord = require ('discord.js')

module.exports = {
    run: async (message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        var error_permissions = new Discord.RichEmbed()
            .setDescription(" Vous ne disposez pas les permissions nécessaires pour effectuer cette commande.")
            .setColor("#F43436")
         message.channel.send(error_permissions)
    }
    if (message.member.hasPermission("MANAGE_MESSAGES")) {
    let msg = message.content.split(' ').slice(1);
    if (!msg[0]) {
        message.channel.send("Merci de donner un chiffre entre 1 et 100 pour effectuer cette commande.")
    }else {
        let x = parseInt(msg[0], 10)
        if (x > 100) {
            x = 100
        }

        message.delete();
        message.channel.send(" **" + x + " messages supprimés.**")
        message.channel.bulkDelete(x)
    }
}
}, 
    name: 'clear',
    guildOnly: true
}