const Discord = require('discord.js');
const { get } = require('axios');

module.exports = {
    run: async (message, args) => { 
  let argument = args.join("+")
  if(argument.length >= 23) return message.channel.send("<:Only_Error:772738605368999936> **—** Ton message est très long")

if(argument.length <= 22) {
    if(!argument) return message.channel.send("<:Only_Error:772738605368999936> **—** Veuillez rédiger le message de votre captcha!");

get(`https://api.alexflipnote.dev/captcha?text=${argument}`, {
  responseType: 'arraybuffer'
})
  .then((res) => {
    message.channel.send({
      files: [{
        attachment: res.data,
        name: 'captcha.png'
      }]
    })
  })
  .catch((error) => console.error(`Error: ${error}`));
}
},
    name: 'captcha',
    guildOnly: true
}