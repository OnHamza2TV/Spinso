const weather = require('weather-js'); 
const Discord = require('discord.js');
const cooldownweather = new Set();

module.exports = {
    run: async (message, args) => { 
            if (cooldownweather.has(message.author.id)) {
                message.channel.send(message.author.username + ", veuillez patienter **10 secondes** avant de réutiliser cette commande!");
        } else {
            if(!args.length) {
                return message.channel.send("Veuillez indiquer un pays ou une ville!")
              }
              weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) {
                try {
                 
                let embed = new Discord.MessageEmbed()
                .setTitle(`Météo - ${result[0].location.name}`)
                .setColor("#ff2050")
                .setDescription("Les unités de température peuvent différer parfois")
                .addField("Emplacement", `${result[0].location.name}`)
                .addField("Température", `${result[0].current.temperature}°C`, true)
                .addField("Temps Actuel", result[0].current.skytext, true)
                .addField("Humidité", `${result[0].current.humidity}%`, true)
                .addField("Vitesse du vent", result[0].current.windspeed, true)//What about image
                .addField("Temps d'observation", result[0].current.observationtime, true)
                .addField("Déplacement du vent", result[0].current.winddisplay, true)
                .setThumbnail(result[0].current.imageUrl);
                   message.channel.send(embed)
                } catch(err) {
                  return message.channel.send("Impossible d'obtenir les données de l'emplacement donné!")
                }
                });   
                    //LETS CHECK OUT PKG
        
               // the user can type the command ... your command code goes here :)
        
            // Adds the user to the set so that they can't talk for a minute
            cooldownweather.add(message.author.id);
            setTimeout(() => {
              // Removes the user from the set after a minute
              cooldownweather.delete(message.author.id);
            }, 10000);
        }
            
},

    name: 'weather',
    guildOnly: true
}