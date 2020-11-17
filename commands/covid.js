const Discord = require('discord.js')
const covid = require("covidapi")

module.exports = {
    run: async (message, args) => { 
    let argument = args.join(" ");
    if(!argument) return message.channel.send("Veuillez mettre le nom d'un pays!")
    if(argument == "all") {
    covid.all().then(console.log)

    const data = await covid.all()
    const coronaembed = new Discord.MessageEmbed()
    .setColor("ff2050")
    .setTitle("Statistiques COVID-19 dans le monde")
    .setDescription("Parfois le nombre de cas peut différer d'une petite quantité")
    .addField("Cas", data.cases, true)
    .addField("Cas actifs", data.active, true)
    .addField("Nouveaux cas aujourd'hui", data.todayCases, true)
    .addField("Cas critiques", data.critical, true)
    .addField("Décès", data.deaths, true)
    .addField("Nouveaux décès", data.todayDeaths, true)
    .addField("Guéris", data.recovered, true)
    .addField("Nouveaux guéris", data.todayRecovered, true)
    .addField("Tests", data.tests, true)
    .addField("Pays affectés", data.affectedCountries, true)
    .addField("Cas par million", data.casesPerOneMillion, true)
    .addField("Morts par million", data.deathsPerOneMillion, true)
    .addField("Tests par million", data.testsPerOneMillion, true)
    .setThumbnail("https://cdn.koya.gg/utilities/COVID-19.png")
    message.channel.send(coronaembed)

} else {
    const countrydata = await covid.countries({country: argument})
    if(!countrydata.cases){
      return message.channel.send("Veuillez rédiger le nom du pays en anglais car il y a une erreur!")
    }
    const countryembed = new Discord.MessageEmbed()
    .setColor("ff2050")
    .setTitle(`Statistiques COVID-19 en ${argument}`)
    .setDescription("Parfois le nombre de cas peut différer d'une petite quantité")
    .addField("Pays", argument, true)
    .addField("Cas", countrydata.cases, true)
    .addField("Cas actifs", countrydata.active, true)
    .addField("Nouveaux cas aujourd'hui", countrydata.todayCases, true)
    .addField("Cas critiques", countrydata.critical, true)
    .addField("Décès", countrydata.deaths, true)
    .addField("Guéris", countrydata.recovered, true)
    .setThumbnail("https://cdn.koya.gg/utilities/COVID-19.png")
    message.channel.send(countryembed)
}
},

    name: 'covid-stats',
    guildOnly: true
}