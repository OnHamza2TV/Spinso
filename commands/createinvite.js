module.exports = {
    run: async (message, args) => { 
    message.channel.createInvite({ 
        temporary: false, 
        maxAge: 0, 
        maxUses: 0, 
        reason: `Requested By : ${message.author.username}` 
    }).then(InviteCode => message.channel.send(`**${message.author.username},** voici mon lien d'invitation pour le serveur **${message.guild.name}**: https://discord.gg/${InviteCode.code}`))
},

    name: 'createinvite',
    guildOnly: true
}