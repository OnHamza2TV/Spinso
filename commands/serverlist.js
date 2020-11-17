const Discord = require ('discord.js')

module.exports = {
    run: async (message, args) => { 
  if(message.author.id !== "686172394683236406") return message.channel.send("<:error:774074981608849408> **—** Seulement mon owner peut utilisé cette commande!")
    let servers = ""
    await client.guilds.cache.each(server => servers += `\n${server.name} (\`${server.id}\`)`)
message.channel.send(`Voici la liste de tous les serveurs dans lesquels je m'y trouve actuellement:\n${servers}`)
},
    name: 'serverlist',
    guildOnly: true
}