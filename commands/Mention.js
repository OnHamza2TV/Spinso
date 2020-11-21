module.exports = {
    run: async (message, args) => { 
       
message.channel.send(message.author + ", je t'ai entendu me mentionner... Une question ? Mon prefix est `.`");
                
    },
    name: `<@${client.user.id}>`,
    guildOnly: true

}
