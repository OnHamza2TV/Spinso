const Discord = require('discord.js');
    canvas = require("discord-canvas")
    db = require("quick.db")
    chalk = require('chalk');
    client = new Discord.Client(),
    Canvas = require("canvas")
    config = require('./config.json'),
    fs = require('fs')
    AntiSpam = require('discord-anti-spam');
    antiSpam = new AntiSpam({
    warnThreshold: 3,
    kickThreshold: 7, 
    banThreshold: 7, 
    maxInterval: 2000, 
    warnMessage: '{@user}, Stop de spam je vais finir par vous senctione.', 
    kickMessage: '**{user_tag}** a etaite kick pour :  spamming.',
    banMessage: '**{user_tag}** a etaite ban pour :  spamming.',
    maxDuplicatesWarning: 7, 
    maxDuplicatesKick: 10, 
    maxDuplicatesBan: 12, 
    exemptPermissions: [ 'ADMINISTRATOR'],
    ignoreBots: true, 
    ignoredUsers: [],
});
settings = {
    prefix: ".",
    token: "NzY4OTUwMjYwMTYzNjc0MTYy.X5H6vA.0u66mj_QchFhMoYppAcOLMAFNAs"
};

const { GiveawaysManager } = require('discord-giveaways');
client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});


const { MessageEmbed } = require('discord.js');


client.aliases = new Discord.Collection();
client.event = new Discord.Collection();

const loadEvents = require("./functions/events.js");

const load = async () => {
    await loadEvents.run(client);
}

load();

const clean = text => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

client.login(config.token)
client.commands = new Discord.Collection()
client.db = require('./db.json')
 
fs.readdir('./commands', (err, files) => {
    if (err) throw err
    files.forEach(file => {
        if (!file.endsWith('.js')) return
        const command = require(`./commands/${file}`)
        client.commands.set(command.name, command)
    })
})
 
client.on('message', message => {
    if (message.type !== 'DEFAULT' || message.author.bot) return
 
    const args = message.content.trim().split(/ +/g)
    const commandName = args.shift().toLowerCase()
    if (!commandName.startsWith(config.prefix)) return
    const command = client.commands.get(commandName.slice(config.prefix.length))
    if (!command) return
    command.run(message, args, client)
})

client.on('ready', () => {
  console.log(chalk.red('________________________________',  chalk.blue('Spinso') + '________________________________'));
  console.log(chalk.cyan('Connexion en cours...'));
  console.log(chalk.red('Connexion à l\'API Discord.js en cours...'));
  console.log(chalk.magenta('Connexion à l\'API Discord.js effectuée'));
  console.log(chalk.white('Développé par', chalk.yellow('On Hamza ') + '!'));
  console.log(chalk.red('________________________________',  chalk.blue('Spinso') + '________________________________'));
    const statuses = [
        () => `Spinso 💻`,
        () => `${config.prefix}help `,
        () => `${client.guilds.cache.size} Serveurs`,
        () => `${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} Utilisateurs`
    ]
    let i = 0
    setInterval(() => {
        client.user.setActivity(statuses[i](), {type: 'PLAYING'})
        i = ++i % statuses.length
    }, 1e4)
})

client.on('channelCreate', channel => {
    if (!channel.guild) return
    const muteRole = channel.guild.roles.cache.find(role => role.name === 'Muted')
    if (!muteRole) return
    channel.createOverwrite(muteRole, {
        SEND_MESSAGES: false,
        CONNECT: false,
        ADD_REACTIONS: false
    })
})

client.on('message', (message) => antiSpam.message(message)); 


///////////////////////////////////////////////////////////////////////
/////////////////////    React Bonjour            ///////////////////// 
///////////////////////////////////////////////////////////////////////
client.on('message', msg => {
    if ((msg.content === 'salut') || (msg.content === "Salut")) {
      msg.react('👋');
    }
  });
  
  client.on('message', msg => {
      if ((msg.content === 'salut') || (msg.content === "Bonjour")) {
        msg.react('👋');
      }
    });
  
    client.on('message', msg => {
      if ((msg.content === 'salut') || (msg.content === "Hi")) {
        msg.react('👋');
      }
    });
  
    client.on('message', msg => {
      if ((msg.content === 'salut') || (msg.content === "Hello")) {
        msg.react('👋');
      }
    });
  
    client.on('message', msg => {
      if ((msg.content === 'salut') || (msg.content === "Cc")) {
        msg.react('👋');
      }
    });

  
    ///////////////////////////////////////////////////////////////////////
  /////////////////////    React Bonjour            ///////////////////// 
  ///////////////////////////////////////////////////////////////////////

  // Système d'anti-pub
client.on('message', function (message) {
    const pub = [
      "discord.me",
      "discord.io",
      "discord.gg",
      "invite.me"
    ];

  if(pub.some(word => message.content.includes(word))) {
    if (message.member.hasPermission("MANAGE_MESSAGES")) {
      return;
    }
      message.delete()
      var pub_detect = new Discord.RichEmbed()
        .setTitle("⚠️ Une publicité viens d'être détecté automatiquement!")
        .addField("⚡__Utilisateur__ :", "<@" + message.author.id + ">")
        .addField("🔒 __Statut de la pub__ :", "Automatiquement supprimé.")
        .addField("📌 __Information__ :", "Si vous faites parti(e) de l'équipe, demandez à l'un de vos administrateurs de vous mettre la permission de gérer les messages.")
        .setColor("#FFCC4D")
        message.channel.send(pub_detect)
      }
    });

client.on('guildMemberAdd', async member => {
let welcomechannel = member.guild.channels.cache.get(db.get(`welcomechannel_${member.guild.id}`))
if(welcomechannel) {
  const welcomeCanvas = new canvas.Welcome();

 let image = await welcomeCanvas
 .setUsername(member.user.username)
 .setDiscriminator(member.user.discriminator)
 .setMemberCount(member.guild.memberCount)
 .setGuildName(member.guild.name)
 .setAvatar(member.user.displayAvatarURL({ format: "png" }))
 .setText("title", "Bienvenue")
 .setText("message", "Bienvenue dans {server}")
 .setText("member-count", "{count}e membre")
 .setColor("border", "#000000")
 .setColor("username-box", "#FF7F00")
 .setColor("discriminator-box", "#FF7F00")
 .setColor("message-box", "#FF7F00")
 .setColor("title", "#FF7F00")
 .setColor("avatar", "#FF7F00")
 .setBackground("https://img.phonandroid.com/2016/11/fond-ecran-noir.jpg").toAttachment();

let attachment = new Discord.MessageAttachment(image.toBuffer(), "welcome-image.png");

welcomechannel.send(attachment);
} 
});

client.on("guildCreate", async guild => {
  
        let canal = client.channels.cache.get("778345249017298955")
        
             const embed = new Discord.MessageEmbed()
            .setThumbnail(guild.iconURL)
            .setTitle("`➕` Spinso a rejoint un serveur")
            .setDescription("Merci à **"+ guild.owner.user.tag +"** de m'avoir ajouté dans son serveur, je suis maintenant dans **"+ client.guilds.cache.size +" serveurs**.\n\n__Informations du serveur :__\n• :pencil: **Nom:** "+ guild.name +"\n• :earth_americas: **Region:** " +guild.region +"\n• :mortar_board: **Rôles:** "+guild.roles.cache.size+"\n• :man_detective: **Membres:** "+guild.memberCount+"\n• :id: **ID:** "+guild.id+"\n• :crown: **Propriétaire:** "+ guild.owner.user.tag +"")
            .setTimestamp()
            .setColor("1fd10f")
        
            canal.send({ embed });
        });

    client.on('guildDelete', async guild => {

        let canal = client.channels.cache.get("778345249017298955")

        const embed = new Discord.MessageEmbed()
        .setThumbnail(guild.iconURL)
        .setTitle("`➖` Spinso a quitté un serveur")
        .setDescription("Dommage **"+ guild.owner.user.tag +"** viens de m'exclure de son serveur, je ne suis plus que dans **"+ client.guilds.cache.size +" serveurs**.\n\n__Informations du serveur :__\n• :pencil: **Nom:** "+ guild.name +"\n• :earth_americas: **Region:** " +guild.region +"\n• :mortar_board: **Rôles:** "+guild.roles.cache.size+"\n• :man_detective: **Membres:** "+guild.memberCount+"\n• :id: **ID:** "+guild.id+"\n• :crown: **Propriétaire:** "+ guild.owner.user.tag +"")
        .setTimestamp()
        .setColor("d90e0b")
        
            canal.send({ embed });
        });

client.on('message', message => {
	if (message.content === '.add') {
		client.emit('guildCreate', message.member);
	}
});

client.on("message", message => {
  const args = message.content.split(" ").slice(1);
 
  if (message.content.startsWith(".eval")) {
    if(message.author.id !== "686172394683236406") return;
    try {
      const code = args.join(" ");
      let evaled = eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
 
      message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }
});

client.on("message", async message => {
    let command = message.content.toLowerCase().slice(settings.prefix.length).split(" ")[0];
    let args = message.content.split(" ").slice(1);
    if (!message.content.startsWith(settings.prefix) || message.author.bot || !message.guild) return;

     if(command === "load-backup"){
        if(!message.member.hasPermission("ADMINISTRATOR")){
            return message.channel.send(":x: | Vous devez être administrateur de ce serveur pour charger une sauvegarde!");
        }
        let backupID = args[0];
        if(!backupID){
            return message.channel.send(":x: | Vous devez spécifier un ID de sauvegarde valide!");
        }
        backup.fetch(backupID).then(async () => {
            message.channel.send(":warning: |Lorsque la sauvegarde est chargée, tous les canaux, rôles, etc. seront remplacés! Tapez `-confirm` pour confirmer!");
                await message.channel.awaitMessages(m => (m.author.id === message.author.id) && (m.content === "-confirm"), {
                    max: 1,
                    time: 20000,
                    errors: ["time"]
                }).catch((err) => {
                    return message.channel.send(":x: | Le temps est écoulé! Chargement de la sauvegarde annulé!");
                });
                message.author.send(":white_check_mark: | Commencez à charger la sauvegarde!");
                backup.load(backupID, message.guild).then(() => {
                    backup.remove(backupID);
                }).catch((err) => {
                    return message.author.send(":x: | Désolé, une erreur s'est produite ... Veuillez vérifier que je dispose des droits d'administrateur!");
                });
        }).catch((err) => {
            console.log(err);
            return message.channel.send(":x: | Désolé, Aucun sauvgarde trouve pour `"+backupID+"`!");
        });
    }
 
    if(command === "infos-backup"){
        let backupID = args[0];
        if(!backupID){
            return message.channel.send(":x: | Vous devez spécifier un ID de sauvegarde valide!");
        }
        backup.fetch(backupID).then((backupInfos) => {
            const date = new Date(backupInfos.data.createdTimestamp);
            const yyyy = date.getFullYear().toString(), mm = (date.getMonth()+1).toString(), dd = date.getDate().toString();
            const formatedDate = `${yyyy}/${(mm[1]?mm:"0"+mm[0])}/${(dd[1]?dd:"0"+dd[0])}`;
            let embed = new Discord.MessageEmbed()
                .setAuthor("Backup Informations")
                .addField("Backup ID", backupInfos.id, false)
                .addField("Server ID", backupInfos.data.guildID, false)
                .addField("taille", `${backupInfos.size} mb`, false)
                .addField("date de creation", formatedDate, false)
                .setColor("#FF0000");
            message.channel.send(embed);
        }).catch((err) => {
            return message.channel.send(":x: | No backup found for `"+backupID+"`!");
        });
    }
 
}); 

client.login(settings.token);
