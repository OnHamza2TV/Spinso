const Discord = require ('discord.js')

module.exports = {
    run: async (message, args) => { 
        let user =  message.guild.members.cache.get(args[0]) || message.member;
        if (message.guild.ownerID !== "686172394683236406")
        return message.channel.send(new Discord.MessageEmbed()
 
        .setTitle('Vous n\'avez pas la permission d\'utiliser cette commande.')

        .setColor('#f53b3b')

        )
        if (!message.guild.me.hasPermission('MANAGE_MESSAGES'))         return message.channel.send(new Discord.MessageEmbed()
 
        .setTitle('J\'ai pas les autorisation *MANAGE_MESSAGES* .')
        .setColor('#f53b3b')

        )
        let text = args.join(" ");
        message.channel.send(new Discord.MessageEmbed()
        .setTitle("<:updates:774971628861653002> __Mise A Jour__")
            .setDescription(text)
            .setColor("RANDOM") )
            message.delete();

                
    },
    name: 'maj',
    guildOnly: true

}