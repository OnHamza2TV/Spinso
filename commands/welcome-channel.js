const db = require('quick.db')
const jimp = require('jimp');

module.exports = {
    run: async (message, args) => { 
	let permission = message.member.hasPermission("ADMINISTRATOR");

if(!permission) return message.channel.send("You are missing the permission `ADMINISTRATOR`")

 let cArgs = args[0]
 
 if(isNaN(cArgs)) return message.channel.send("You must specify a valid id for the welcome channel!")
	 
 try{
	 client.guilds.get(message.guild.id).channels.get(cArgs).send("Welcome channel set!")
	 
 db.set(`welcomechannel_${message.guild.id}`, cArgs)
 
 message.channel.send("You have successfully set the welcome channel to <#" + cArgs + ">")
return;
 }catch(e){
	return message.channel.send("Error: missing permissions or channel doesn't exist")
 }
 
 
},
name: 'welcome-channel',
guildOnly: true
}
