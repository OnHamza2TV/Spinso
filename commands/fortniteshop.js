const Discord = require("discord.js");
const canvas = require("discord-canvas");

module.exports = {
    run: async (message, args) => { 
  const shop = new canvas.FortniteShop();
  
const image = await shop
  .setToken("3d6aef2f-59d9-49c0-9609-635e48d7330f")
  .lang("fr")
  .dateFormat("dddd Do MMMM YYYY")
  .setText("header", "BOUTIQUE FORTNITE")
.setText("daily", "QUOTIDIEN")
.setText("featured", "EN VEDETTE")
.setText("date", "Boutique fortnite du {date}")
.setText("footer", "Généré par Spinso")
  .toAttachment();

let attachment = new Discord.MessageAttachment(image, "shop.png");

message.channel.send(attachment);

},

    name: 'fortnite-shop',
    guildOnly: true
}