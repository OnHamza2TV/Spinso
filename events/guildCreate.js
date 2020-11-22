module.exports = async (guild) => {
    const Discord = require('discord.js');

    let region = {
        "brazil": `:flag_br: \`Brésil\``,
        "southafrica": `:flag_za: \`Afrique du Sud\``,
        "eu-central": `:flag_eu: \`Europe Central\``,
        "europe": `:flag_eu: \`Europe\``,
        "russia": `:flag_ru: \`Russie\``,
        "singapore": `:flag_sg: \`Singapour\``,
        "us-central": `:flag_us: \`États-Unis Central\``,
        "sydney": `:flag_au: \`Sydney\``,
        "japan": `:flag_jp: \`Japon\``,
        "us-east": `:flag_us: \`Est des États-Unis\``,
        "us-south": `:flag_us: \`Sud des États-Unis\``,
        "us-west": `:flag_us: \`Ouest des États-Unis\``,
        "eu-west": `:flag_eu: \`Europe de l'Ouest\``,
        "vip-us-east": `:flag_us: \`VIP U.S. East ?\``,
        "london": `:flag_gb: \`Londres\``,
        "india": `:flag_in: \`Inde\``,
        "amsterdam": `:flag_nl: \`Amsterdam\``,
        "hongkong": `:flag_hk: \`Hong Kong\``
    };

    const embed = new Discord.MessageEmbed()
        .setColor(`GREEN`)
        .setAuthor(`${client.user.username} à rejoind le serveur`, client.user.displayAvatarURL({
            dynamic: true
        }))
        .setTitle(`Informations du serveur`)
        .addField(`📰 • __Nom__`, `\`${guild.name}\``, true)
        .addField(`📰 • __Région__`, `${region[guild.region]}`, true)
        .addField(`📰 • __Rôles__`, `\`${guild.roles.cache.size}\``, true)
        .addField(`📰 • __Membres__`, `\`${guild.memberCount - guild.members.cache.filter(m => m.user.bot).size}\``, true)
        .addField(`📰 • __ID__`, `\`${guild.id}\``, true)
        .addField(`👑 • __Propriétaire__`, `${guild.owner || `\`${guild.owner.user.username}\``}`, true)
        .setTimestamp()
        .setFooter(``, undefined);
    const myGuild = client.guilds.cache.get(`IDGUILD`);
    const myChannel = myGuild.channels.cache.find((channel) => `IDCHANNEL` == channel.id);
    myChannel.send(embed);
};