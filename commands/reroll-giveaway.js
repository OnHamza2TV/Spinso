const ms = require('ms');

module.exports = {
    run: async (message, args) => {
		if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`Vous n'êtes pas autorisé à relancer les cadeaux`);

        if(!args[0]) return message.channel.send('Specifier un ID valide');

        let giveaway = client.giveawaysManager.giveaways.find((g) => g.prize === args.join(" ")) || client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

        if(!giveaway) return message.channel.send('Impossible de trouver un cadeau avec cette ID');

        client.giveawaysManager.reroll(giveaway.messageID)
        .then(() => {
            message.channel.send('Giveaway relancé')
        })
        .catch((e) => {
            if(e.startsWith(`Le cadeau avec l'ID $ {giveaway.messageID} n'est pas encore terminé`)){
                message.channel.send(`Ce Concour n'est pas encore terminé`)
            } else {
                console.error(e);
                message.channel.send(`Une erreur s'est produite`)
            }
        })
},
    name: 'reroll-giveaway',
    guildOnly: true

}