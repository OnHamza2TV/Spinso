const Discord = require('discord.js');
    canvas = require("discord-canvas")
    db = require("quick.db")
    chalk = require('chalk');
    client = new Discord.Client(),
    Canvas = require("canvas")
    backup = require("discord-backup"),
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


client.aliases = new Discord.Collection();
client.event = new Discord.Collection();

const loadEvents = require("./functions/events.js");

const load = async () => {
    await loadEvents.run(client);
}

load();


const { Player } = require("discord-player");
// Create a new Player (you don't need any API Key)
const player = new Player(client);
client.player = player;
client.player.on('trackStart', (message, track) => message.channel.send(`Lecture en cours de ${track.title}...`))

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

const { MessageEmbed } = require('discord.js');

      client.on('guildCreate', guild => {
    const embed = new MessageEmbed()
        .setDescription(`➕ Spinso a rejoin un serveur.\n __Informations du serveur :__`)
        .addField("📋 __Nom du serveur__", guild.name, true)
        .addField("📊 __Nombre de membres__ :", guild.memberCount, true)
        .addField("💻 __Nombre de salons__ :", guild.channels.size, true)
        .addField("👤 __Propriétaire__ :", guild.owner, true)
        .addField("🌍 __Région du serveur__ :", guild.region, true)
        .addField("📝 __ID du serveur__ :", guild.id, true)
        .setColor("#F03A17")
      client.channels.cache.get('778345249017298955').send(embed);
});

        client.on('guildDelete', guild => {
    const embed = new MessageEmbed()
        .setDescription(`➖ Spinso a quitté un serveur.\n __Informations du serveur :__`)
        .addField("📋 __Nom du serveur__", guild.name, true)
        .addField("📊 __Nombre de membres__ :", guild.memberCount, true)
        .addField("💻 __Nombre de salons__ :", guild.channels.size, true)
        .addField("👤 __Propriétaire__ :", guild.owner, true)
        .addField("🌍 __Région du serveur__ :", guild.region, true)
        .addField("📝 __ID du serveur__ :", guild.id, true)
        .setColor("#F03A17")
      client.channels.cache.get('778345249017298955').send(embed);
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

client.on('message', msg => { 
if ((msg.content === '<@${client.user.id}>') || (msg.content === "<@${client.user.id}> ")) { 
msg.send('Hey, Moi Ces **spinso** , Mon Prefix est `.`')
msg.react('👋'); 
} 
});

client.on('message', message => {
	if (message.content === '.join') {
		client.emit('guildMemberAdd', message.member);
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
 
    if(command === "create-backup"){
        if(!message.member.hasPermission("ADMINISTRATOR")){
            return message.channel.send(":x: | Vous devez être administrateur de ce serveur pour demander une sauvegarde!");
        }
        backup.create(message.guild, {
            jsonBeautify: true
        }).then((backupData) => {
            message.author.send("La sauvegarde a été créée! Pour le charger, tapez cette commande sur le serveur de votre choix: `"+settings.prefix+"load "+backupData.id+"`!");
            message.channel.send(":white_check_mark:Sauvegarde créée avec succès. L'ID de sauvegarde a été envoyé dans dm!");
        });
    }
 
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
	    if(command === "play"){
        client.player.play(message, args[0], message.member.user);
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
