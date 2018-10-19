const Discord = require('discord.js');
const superagent = require("snekfetch");
const client = new Discord.Client();
const config = require('./botconfig.json');
const { prefix, token, api } = require('./botconfig.json');
const func = require('./functions.js');
const weather = require('weather-js');
const urban = require('urban');
const got = require('got');
const test = "https://i.imgur.com/0JtpgIC.png"
const moment = require('moment');
require('moment-duration-format');

  client.on("ready", async () => {
  console.log(`${client.user.username} is on his way to the tech team!`);
  client.user.setActivity("Cop In-Training 2.0", {type: "WATCHING"});
});

client.on('message', async (message) => {
    if (message.content.startsWith(`${prefix}quote`)) {
let replies = ["Hello Soldier, move along.", "You have the right to remain silent.", "Stay well Soldier.", "WHOA, that is A LOT of weed!", "Сука Влять"];
let result = Math.floor((Math.random() * replies.length));
               const copembed = new Discord.RichEmbed()
                .setTitle(`Famous COP Quote`)
                .setDescription(replies[result])
                .setColor(0x374f6b)
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
 .addField('Timezone Day', `${current.day}`, true)
 .addField('Timezone Date', `${current.date}`, true)
 .addField('Degree Type',location.degreetype, true)
 .addField('Temperature', `${current.temperature} Degrees`, true)
 .addField('Feels Like', `${current.feelslike} Degrees`, true)
 .addField('Winds',current.winddisplay, true)
 .addField('Humidity', `${current.humidity}%`, true)
 .setTimestamp();
  return message.channel.send(weatherembed);
 });
}
  
  	if (message.content.startsWith(`${prefix}anyinvite`)) {
 let args = message.content.slice(1).split(" ");
    if (message.channel.type == "dm") return;
	
    let sv = client.guilds.get(args[1])
    if (!sv) return message.channel.send(`❌ Enter a valid guild id!`)
    sv.channels.random().createInvite().then(a => 
    message.author.send(a.toString()))
    message.channel.send(`📥 Guild Invite Sucessfully sent to your DMs. `)

}
  
  	if (message.content.startsWith(`${prefix}urban`)) {
let args = message.content.split(/ +/g).slice(1)
	if (args.length < 1) return message.channel.send("Enter in a word you want the definition for.")
let str = args.join(" ");


urban(str).first(json => {
 if(!json) return message.channel.send("No results.")

let urbanembed = new Discord.RichEmbed()
    .setAuthor("Urban Dictionary", "https://i.imgur.com/EPUSjJe.jpg")
    .setURL(json.permalink)
    .setTitle([json.word])
    .setDescription(json.definition)
    .setColor(0x374f6b)
    .addField("Example", json.example)
    .addField("Rating", `👍 ${json.thumbs_up} 👎 ${json.thumbs_down}`, true)
    .setThumbnail("https://i.imgur.com/EPUSjJe.jpg")
    .setFooter(`Added by ${json.author}`)
    .setTimestamp();
    message.channel.send(urbanembed);
});
}
	
		if (message.content.startsWith(`${prefix}randomurban`)) {
let args = message.content.split(/ +/g).slice(1)
let str = args.join(" ");
urban.random(str).first(json => {
let defineembed = new Discord.RichEmbed()
    .setAuthor("Urban Dictionary", "https://i.imgur.com/EPUSjJe.jpg")
    .setURL(json.permalink)
    .setTitle([json.word])
    .setDescription(json.definition)
    .setColor(0x374f6b)
    .addField("Example", json.example)
    .addField("Rating", `👍 ${json.thumbs_up} 👎 ${json.thumbs_down}`, true)
    .setThumbnail("https://i.imgur.com/EPUSjJe.jpg")
    .setFooter(`Added by ${json.author}`)
    .setTimestamp();
    message.channel.send(defineembed);
});
}
	
 if (message.content.toLowerCase().startsWith(`${prefix}gif`)) {
	  let player = message.mentions.members.first() || message.member
  let user = player.user
  let args = message.content.split(/ +/g).slice(1)
  if (args.length < 1) return message.channel.send(`This isn't a random gif generator, enter in a word.`)
const res = await got(`http://api.giphy.com/v1/gifs/random?api_key=${api}&tag=${encodeURIComponent(args.join(" "))}`, {json: true})
if(!res) return message.channel.send(`I've failed to find any type of GIF that relates to the word.`)
  
    let testembed = new Discord.RichEmbed()
    .setImage(res.body.data.image_url)
    .setAuthor("GIF", "https://i.imgur.com/0JtpgIC.png")
    .setFooter(`Requested By ${user.tag}`)
    .setTimestamp();
    return message.channel.send(testembed);
  }
			 if (message.content.toLowerCase().startsWith(`${prefix}say`)) {
		  let args = message.content.split(/ +/g).slice(1)
		  let botmessage = args.join(' ')
		  let player = message.mentions.members.first() || message.member
                  let user = player.user
		const sayembed = new Discord.RichEmbed()
		.setTitle(`${botmessage}`)
               .setColor(0x374f6b)
	       .setFooter(`Requested By ${user.tag}`)
		 return message.channel.send(sayembed)
	 }
	
	 if (message.content.toLowerCase().startsWith(`${prefix}pages`)) {
let pages = ['** General Commands** \n\n **ping**  \n*Shows The Responce Time Of The Bot* \n **help**  \n*Shows The Help Command* \n **gcl**  \n*Gives You The Gcl Invite Link* \n **breakdown**  \n*Gives The Breakdown Of The Current Season*', 
  '**Rosters Commands** \n\n **knights**  \n*Shows List Of Knights Division* \n **warriors**   \n*Shows List Of Warriors Division* \n **cavaliers**  \n*Shows List Of Cavaliers Division* \n **spartans**   \n*Shows List Of Spartans Division*'];
let page = 1;

const pagesembed = new Discord.RichEmbed()
.setDescription(pages[page-1])
.setColor(0x374f6b)
.setFooter(`Page ${page} of ${pages.length}`)
message.channel.send(pagesembed).then(message => {


message.react(`⬅`).then ( r => {
message.react('➡')



const backwardsFitler = (reaction, user) => reaction.emoji.name === (`⬅`) && user.id === message.author.id;
const backwards = message.createReactionCollector(backwardsFitler, { time: 60000 });
	
backwards.on('collect', r => {
 if (page == 1)
 page--;
 pagesembed.setDescription(pages[page-1]);
 pagesembed.setFooter(`Page ${page} of ${pages.length}`);
 message.edit(pagesembed)
})
	
const forwardsFitler = (reaction, user) => reaction.emoji.name === ('➡') && user.id === message.author.id;
const forwards = message.createReactionCollector(forwardsFitler, { time: 60000});

forwards.on('collect', r => {
 if (page == 1)
 page++;
pagesembed.setDescription(pages[page-1]);
pagesembed.setFooter(`Page ${page} of ${pages.length}`);
 message.edit(pagesembed)
})
		 
})
})
}
	  
	  
	  
	  
});
client.login(process.env.BOT_TOKEN); 
