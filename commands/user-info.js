const Discord = require ('discord.js')

module.exports = {
    run: async (message, args) => { 

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        let status;
        switch (user.presence.status) {
            case "online":
                status = "<a:vert:753724022860152902> En ligne";
                break;
            case "dnd":
                status = "<a:rouge:753730718739333138> Ne pas déranger";
                break;
            case "idle":
                status = "<a:jaune:753730579723321356> Inactif";
                break;
            case "offline":
                status = "<a:gris:753730770241060884> Invisible";
                break;
        }

        message.channel.send(new Discord.MessageEmbed()
            .setTitle(` __**${user.user.username}**__ stats`)
            .setColor("RANDOM")
            .setThumbnail(user.user.displayAvatarURL({dynamic : true}))

            .addFields(
                {
                    name: "Nom: ",
                    value: user.user.username,
                    inline: true
                },
                {
                    name: " Discriminateur: ",
                    value: `#${user.user.discriminator}`,
                    inline: true
                },
                {
                    name: " ID: ",
                    value: user.user.id,
                },
                {
                    name: "Statut actuel :",
                    value: status,
                    inline: false
                },
              
                {
                    name: 'Lien avatar :',
                    value: `[Click Here](${user.user.displayAvatarURL()})`,
                    inline: true
                },
                {
                    name: 'Date de création : ',
                    value: user.user.createdAt.toLocaleDateString("en-us"),
                    inline: true
                },
                {
                    name: 'Date de Join ',
                    value: user.joinedAt.toLocaleDateString("en-us"),
                    inline: true
                }
 )
                )
    },
    name: 'ui',
    guildOnly: true

}