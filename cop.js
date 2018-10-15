const Discord = require('discord.js');
const superagent = require("snekfetch");
const client = new Discord.Client();
const config = require('./botconfig.json');
const { prefix, token } = require('./botconfig.json');
const func = require('./functions.js');
const weather = require('weather-js')

  client.on("ready", async () => {
  console.log(`${client.user.username} is on his way to the tech team!`);
  client.user.setActivity("Cop In-Training 2.0", {type: "WATCHING"});
});

client.on('message', async (message) => {
    if (message.content.startsWith(`${prefix}quote`)) {
let replies = ["Hello Soldier, move along.", "You have the right to remain silent.", "Stay well Soldier.", "WHOA, that is A LOT of weed!"];
let result = Math.floor((Math.random() * replies.length));
               const copembed = new Discord.RichEmbed()
                .setTitle(`Famous COP Quote`)
                .setDescription(replies[result])
                .setColor(`#374f6b`)
                .setTimestamp();
            return message.channel.send(copembed);
    }
});

client.on('message', async (message) => {
  
 if (message.content.startsWith(`${prefix}weather`)) {
 const Discord = require('discord.js');
 let args = message.content.slice(1).split(" "); 
 weather.find({search: args.join(" "), degreeType: 'F'}, function(err, result) {
if (err) message.channel.send(err);

   
   if (result === undefined || result.length === 0) {
message.channel.send(`You didn't put in valid **location**, please enter one.`)
return;
}

let current = result[0].current;
let location = result[0].location; 


const weatherembed = new Discord.RichEmbed()
 .setTitle(`Weather For ${current.observationpoint}`)
 .setDescription(`**${current.skytext}**`)
 .setThumbnail(current.imageUrl)
 .setColor(0x374f6b)
 .addField('Timezone', `UTC${location.timezone}`, true)
 .addField('Degree Type',location.degreetype, true)
 .addField('Temperature', `${current.temperature} Degrees`, true)
 .addField('Feels Like', `{current.feelslike} Degrees`, true)
 .addField('Winds',current.winddisplay, true)
 .addField('Humidity', `${current.humidity}%`, true)

  return message.channel.send(weatherembed);
 });

}
  
  
});


client.login(process.env.BOT_TOKEN); 
