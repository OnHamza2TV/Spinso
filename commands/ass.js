const Discord = require ('discord.js')
const fetch = require('node-fetch')

module.exports = {
    run: async message => { 
        if (!message.channel.nsfw) return message.channel.send(new Discord.MessageEmbed()
        .setTitle("Ce salon n'est pas __**NSFW**__ <:nsfw:774057171121209375>  !") )

        const data = await fetch("http://api.obutts.ru/butts/0/1/random").then(res => res.json());

        message.channel.send(new Discord.MessageEmbed()

            .setColor("RANDOM")
            .setImage(`http://media.obutts.ru/${data[0].preview}`)
 )
    },
    name: 'ass',
    guildOnly: true
}