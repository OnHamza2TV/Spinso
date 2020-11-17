const ms = require('ms');

module.exports = {
    run: async (message, args) => { 
if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`Vous n'êtes pas autorisé à lancer des giveaways`);

        let channel = message.mentions.channels.first();

        if (!channel) return message.channel.send('Veuillez fournir un channel');

        let giveawayDuration = args[1];

        if (!giveawayDuration || isNaN(ms(giveawayDuration))) return message.channel.send('Veuillez fournir une durée valide');

        let giveawayWinners = args[2];

        if (isNaN(giveawayWinners) || (parseInt(giveawayWinners) <= 0)) return message.channel.send('Veuillez fournir un nombre valide de gagnants!');

        let giveawayPrize = args.slice(3).join(" ");

        if (!giveawayPrize) return message.channel.send('Ok alors, je ne donnerai rien');

        client.giveawaysManager.start(channel, {
            time: ms(giveawayDuration),
            prize: giveawayPrize,
            winnerCount: giveawayWinners,

            messages: {
                giveaway: "Concour",
                giveawayEned: "Concour termine",
                timeRemaining: "Temps restant: **{duration}**",
                inviteToParticipate: "Réagissez avec 🎉 pour participer",
                winMessage: "🎉 Félicitations {winners}, vous avez gagné ** {prize} **",
                embedFooter: "Temps de concour!",
                noWinner: "Impossible de déterminer un gagnant",
                hostedBy: "Heberger par {user}",
                winners: "gagnant (e)",
                endedAt: "Fini à",
                units: {
                    seconds: "seconds",
                    minutes: "minutes",
                    hours: "hours",
                    days: "days",
                    pluralS: false
                }
            }
        })

        message.channel.send(`J'ai Lancer le concour dans ${channel}`);
    },
    name: 'start-giveaway',
    guildOnly: true
}