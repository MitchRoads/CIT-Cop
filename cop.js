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
const helloResponses = ["Hello Soldier, move along.", "You have the right to remain silent.", "Stay well Soldier."];
  let args = message.content.slice(1).split(" ");
   switch (args[0].toLowerCase()) {
        case `${prefix}hello`:
            var response = helloResponses [Math.floor(Math.random()*helloResponses.length)];

            message.channel.send(response).then().catch(console.error);
            break;
        default:
            break;
    }
});

client.login(process.env.BOT_TOKEN); 
