const Discord = require('discord.js');
const superagent = require("snekfetch");
const client = new Discord.Client();
const config = require('./botconfig.json');
const { prefix, token } = require('./botconfig.json');
const func = require('./functions.js');

  client.on("ready", async () => {
  console.log(`${client.user.username} is on his way to the tech team!`);
  client.user.setActivity("Cop In-Training 2.0", {type: "WATCHING"});
});

client.on('message', async (message) => {
    if (message.content.startsWith(`${prefix}hello`)) {
let replies = ["Hello Soldier, move along.", "You have the right to remain silent.", "Stay well Soldier."];
let result = Math.floor((Math.random() * replies.length));
               const copembed = new Discord.RichEmbed()
                .setTitle(`Response to ${message.author.tag}`)
                .setColor(`#374f6b`)
                .addField(`Hello!`, "replies[result]")
                .setTimestamp();
            return message.channel.send(copembed);
    }
  
});


client.login(process.env.BOT_TOKEN); 
