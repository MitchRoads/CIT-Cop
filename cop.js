const Discord = require('discord.js');
const superagent = require("snekfetch");
const client = new Discord.Client();
const config = require('./botconfig.json');
const { prefix, token, api } = require('./botconfig.json');
const func = require('./functions.js');
const weather = require('weather-js');
const urban = require('urban');
const got = require('got');
const moment = require('moment');
require('moment-duration-format');

  client.on("ready", async () => {
  console.log(`${client.user.username} is on his way to the tech team!`);
  client.user.setActivity("Cop In-Training 2.0", {type: "WATCHING"});
	  
	  let actvNum = 0;

	  setInterval(function() {
 if (activNum === 0) {
   client.user.setActivity("Cop In-Training 2.0", {type: "WATCHING"});
   activNum = 1;
 } else if (activNum === 1) {
   client.user.setActivity("CSGO | c!quote")
   activNum = 0;
 }
}, 3 * 1000);
});

client.on('message', async (message) => {
    if (message.content.startsWith(`${prefix}quote`)) {
let replies = ["Hello Soldier, move along.", "You have the right to remain silent.", "Stay well Soldier.", "WHOA, that is A LOT of weed!", "Сука Влять", "If I didn't say hello first, don't come up to me and say hello. Now fuck off. Ok? Ok."];
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
let server = message.guild.name;
let pages = ['**Information Commands.** \n\n ☀ `w!usage` \nDisplays a help page that provides you with the commands of the bot. \n ⛅ `w!weather`  \nDisplays the weather in any valid (real) location you enter.\n 🌥 `w!serverinfo`  \n Displays information about the server. \n ☁ `w!userinfo`  \nDisplays information on yourself and any user you mention. \n 🌩 `w!botinfo` \nDisplays infomation on the bot and an invite if you want to add it to your server as well.', 
  '**Fun Commands** \n\n 🌧 `w!avatar`  \nDisplays the avatar/pfp (profile picture) of yourself or any user you mention. \n 🌨 `w!define`  \nDisplays the definition of a word you input. \n 🌦 `w!randomurban`  \nDisplays the definition of a random word. \n 📢 `w!say`   \nDisplays text you input into it. \n ⚠ `w!hello` \nThe name of the command mostly speaks for itself... \n <:gip:502687241911402496> `w!gif` \nDisplays a gif of a word you input. \n 🏓 `w!ping` \nDisplays your ping. Simple enough.', 
  '**Report Commands.**	\n\n ⛈ `w!reporthelp` \nDisplays a helpful usage sentance for the comamnd: w!reportbug. \n 🌪 `w!reportbug` \nIf you have any issues/find any bugs/errors with these commands, send us issue/error/bug reports here. Thanks.',]; 
  let page = 1; 
 
 const embed = new Discord.RichEmbed() 
    .setColor(0x374f6b)
    .setFooter(`Page ${page} of ${pages.length}`) 
    .setDescription(pages[page-1])
 
  message.channel.send(embed).then(msg => { 
   
    msg.react('⬅').then( r => { 
      msg.react('➡') 
     
      const backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅' && user.id === message.author.id;
      const forwardsFilter = (reaction, user) => reaction.emoji.name === '➡' && user.id === message.author.id; 
     
      const backwards = msg.createReactionCollector(backwardsFilter, { time: 60000 }); 
      const forwards = msg.createReactionCollector(forwardsFilter, { time: 60000 }); 
     
      
      backwards.on('collect', r => { 
        if (page === 1) return; 
        page--; 
        embed.setDescription(pages[page-1]); 
        embed.setFooter(`Page ${page} of ${pages.length}`); 
        msg.edit(embed) 
      })
     
      forwards.on('collect', r => { 
        if (page === pages.length) return; 
        page++; 
        embed.setDescription(pages[page-1]); 
        embed.setFooter(`Page ${page} of ${pages.length}`); 
        msg.edit(embed) 
      })
   
    })
 
  })
	  
}
});

client.on('guildMemberAdd', member => {
  member.guild.fetchInvites().then(guildInvites => {
    const ei = invites[member.guild.id];
    invites[member.guild.id] = guildInvites;
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    const inviter = client.users.get(invite.inviter.id);
    const logging = member.guild.channels.find(channel => channel.name === "general"); 
    logging.send(`${member.user.tag} joined using invite code ${invite.code} from ${inviter.tag}. Invite was used ${invite.uses} times since its creation.`);
  });
});
client.login(process.env.BOT_TOKEN); 
