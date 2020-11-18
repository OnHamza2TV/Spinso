const Discord = require('discord.js')
module.exports = {
    run: message => {
    message.channel.send(new Discord.MessageEmbed()
        .setTitle("<:info:774066090111664168>  Informations sur " + `Spinso `)
        .addField('<:dev:774065913003638814>  __**Développeur :**__', `On Hamza#9999`)
        .addField("📂 __Version de discord.js__ :", `v12.2.0`)
        .addField("__**Lien d'invitation :**__", "[**Cliquez ici**](https://discordapp.com/oauth2/authorize?client_id=768950260163674162&scope=bot&permissions=8)", true)
        .setColor("RANDOM")
        .setTimestamp()
        )
    },
    name: 'about'
    
}
