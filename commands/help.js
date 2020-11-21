const Discord = require('discord.js')
module.exports = {
    run: message => {
const help = new Discord.MessageEmbed()
            .setTitle(`● <:delta_help:774824627351322627> Page d'aide - Spinso`)
            .setDescription("● :exclamation: Le bot n'est pas encore fini, il y a quelques commandes qui ne marchent pas encore.\n ● Mon préfix est `.`\n ● Je possède un total de `67` commandes")
            .addField("<:general:774824803186114560> __Général__", "`help`, `invite`, `embed`,  `img`,  `ui`, `serv-info`, `sondage`, `about`,`ascii`, `reversetext`, `pp`, `rdm-number`, `invite`")
            .addField("<:moderation:774826227184828437> __Modération__", "`ban`, `kick`, `tempban`,`clear`, `unban`, `mute`, `unmute`, `tempmute`, `slowmode`")
            .addField("<:fun:774824901877956640> __Divertissement__ ", "`anonymous`, `fbi`, `poutine`, `trump`, `macron`, `cheh`, `meme`, `coinflip`, `issou`, `covid`, `8ball`, `nitro`, `panda`, `koala`, `fox`, `cat`, `dog`, `captcha`,`hastbin`, `weather`, `createinvite`, `covid-stats`")
            .addField("<:owner:774825209936478249> __Owner__", "`serverlist`, `maj`, `eval`")   
	    .addField("<a:star:774242897465180201> __Backup__", "`create-backup`, `load-backup`, `infos-backup`")
	    .addField("<:protect:774827497694167040> __Anti-raid__", "`lock`, `unlock`") 
            .addField("<:giveaway:774826792618950656> __Giveaway__", "`start-giveaway`, `reroll-giveaway`")
	    .addField("<:alcatraz_emojis:776186958120091668> __Fortnite__", " `fortnite-stats`, `fortnite-shop`") 
            .addField("<:alcatraz_version:776109859468607539> __Ticket__", "`createticket`, `close`, `close force`")
            .addField("<:bot:774828002029862943> Invite Le Bot", "[Cliquez ici pour inviter le bot](https://discordapp.com/oauth2/authorize?client_id=768950260163674162&scope=bot&permissions=8)") 
            .addField("<:backup:774827088310042644> Serveur Support", "[Cliquez ici pour rejoindre le serveur Discord](https://discord.gg/hyk9wa75CT)")
	    .addField("<:web:774828253395419186> Site Web", "[Cliquez ici pour voir le site web](https://spinso.byethost18.com/)") 
            .setImage('https://cdn.discordapp.com/attachments/769230312110555158/774334872658903090/Sans_titre.png')  


        message.channel.send(help)
    },
    name: 'help'
    
}
