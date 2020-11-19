const Discord = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const dateFormat = require("dateformat");

module.exports = {
    run: async (message, args, functions) => { 

    let logsChannel = message.guild.channels.cache.find(c => c.id === db.get(`logs_${message.guild.id}`));

    if(!message.channel.name.startsWith(`ticket-`)) return;
    
    if(message.author.id === db.get(`ticket.${message.channel.name}.user`)) {
    
      let userEmbed = new Discord.MessageEmbed()
      .setAuthor(`🗑️ | Ticket Fermé`)
      .setDescription(`L'auteur du ticket à procédé à la fermeture de celui-ci.`)
      .setTimestamp()
      .setFooter(`Ticket System`, client.user.displayAvatarURL())
      .addField(`Informations`, `**Utilisateur :** \`${message.author.tag}\`\n**ID :** \`${message.author.id}\`\n**Ticket :** \`${message.channel.name}\`\n**Date :** \`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\``);
    
      db.delete(`ticket.${message.channel.name}`);
      if(logsChannel) await logsChannel.send(userEmbed);
      await message.channel.delete();
    } else {
    
      let support = message.guild.roles.cache.find(r => r.name === "Ticket Support");
      if(!support) return functions.errorEmbed(message, message.channel, "Le rôle `Ticket Support` n'existe pas, veuillez le créer.");
      if(message.deletable) message.delete();
    
      if(args[0] === "force"){
    
        let forceEmbed = new Discord.MessageEmbed()
        .setAuthor(`🗑️ | Ticket Fermé`)
        .setDescription(`Un membre ayant le rôle ${support} a supprimé un ticket de force.`)
        .setTimestamp()
        .setFooter(`Ticket System`, client.user.displayAvatarURL())
        .addField(`Informations`, `**Utilisateur :** \`${message.author.tag}\`\n**ID :** \`${message.author.id}\`\n**Ticket :** \`${message.channel.name}\`\n**Date :** \`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\``);
    
        let embed1 = new Discord.MessageEmbed()
        .setAuthor(`📥 | Ticket Fermé`)
        .setDescription(`\`${message.author.tag}\` a forcé la fermeture de votre ticket.`);
        db.delete(`ticket.${message.channel.name}`);
        if(logsChannel) await logsChannel.send(forceEmbed);
        if(client.users.cache.get(db.get(`ticket.${message.channel.name}.user`))) client.users.cache.get(db.get(`ticket.${message.channel.name}.user`)).send(embed1).catch(e => {console.log(e)})
        message.channel.delete();
        
    
      } else {
    
        let staffEmbed = new Discord.MessageEmbed()
      .setAuthor(`🗑️| Demande de Fermeture`)
      .setDescription(`Un membre ayant le rôle ${support} a demandé la fermeture du ticket.`)
      .setTimestamp()
      .setFooter(`Ticket System`, client.user.displayAvatarURL())
      .addField(`Informations`, `**Utilisateur :** \`${message.author.tag}\`\n**ID :** \`${message.author.id}\`\n**Ticket :** \`${message.channel.name}\`\n**Date :** \`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\``);
    
        if(!message.guild.member(message.author).roles.cache.has(support.id)) return functions.errorEmbed(message, message.channel, "Désolé, vous n'avez pas le rôle `Ticket Support`.");
        let embed2 = new Discord.MessageEmbed()
        .setTitle(`🎟️ | Ticket Terminé`)
        .setDescription(`Réagissez avec \\🗑️ pour fermer le ticket ou ne réagissez pas si vous avez d'autres demandes.`);
        if(logsChannel) await logsChannel.send(staffEmbed);
        message.channel.send(embed2).then(m => m.react(`🗑️`));
      }
    
    }

},

    name: 'close',
    guildOnly: true
}
