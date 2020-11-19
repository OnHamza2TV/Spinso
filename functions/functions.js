const Discord = require("discord.js");
const fs = require("fs");

module.exports = {

    loadCommands: function(dirname) {
        fs.readdir(dirname, (err, files) => {
            if(err) console.error(err);
            var jsFiles = files.filter(f => f.split(".").pop() === "js");
            if(jsFiles.length <= 0){
                console.log(`No command to load in the folder : ${dirname.replace(/.\/commands\//gi, "")}`);
                return;
            }

            console.log("");
            console.log(`Commands ${dirname.replace(/.\/commands\//gi, "")}`);
            console.log("");
            jsFiles.forEach((f, i) => {
                delete require.cache[require.resolve(`${dirname}${f}`)];
                var props = require(`${dirname}${f}`);
                console.log(`${i + 1}: ${f} Loaded`);
                client.commands.set(props.help.name, props);

                if(props.help.aliases) for (const alias of props.help.aliases){
                    client.aliases.set(alias, props);
                }
            })
        })
    },

  // =================================== EMBED SUCCESS & ERROR =================================== //

  errorEmbed: function(message, channel, argument) {
    channel.send(`📛 **Erreur:** ${argument} \\📛`)
  },

  successEmbed: function(message, channel, argument) {
    channel.send(`✅ **Succès:** ${argument}`)
  },

}
