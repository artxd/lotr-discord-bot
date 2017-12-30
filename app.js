const Discord = require("discord.js");

const client = new Discord.Client();

const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

const commands = [
  {
    command: "me",
    description: "This command displays information about you.",
    parameters: [],
    execute: function(message, parameters) {
      let member = message.member;
      let date = member.joinedAt;
      console.log(date);
      message.reply(`Oh, Hello there! So you want to know more about yourself? 
      \n-You joined ${member.guild.name} on ${date.getDay()}.${date.getMonth()}.${date.getFullYear()}.
      \n-You like to eat ass.
      \n-You are fat and ugly.`);
    }
  }
];

client.on("ready", () => {
  console.log(`${client.user.username} has joined the guild.`);
});

client.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name}.`);
});

client.on("guildDelete", guild => {
  console.log(`Removed from: ${guild.name}`);
});


client.on("message", async message => {

  if(message.author.bot) return;
  
  if(message.content.indexOf(config.prefix) !== 0) return;

  let args = message.content.slice(config.prefix.length).trim().split(/\s+/);
  let cmd = args.shift();

  console.log(`Command incoming: ${cmd} + [${args}]`);

  command = commands.find(command => command.command === cmd);
  if(command) {
    if(command.parameters.length != args) message.reply(`Wrong argument count. For this command, required is ${command.parameters.length}.`);
    else command.execute(message, args);
  }
  else message.reply(`No such command as "${cmd}" found.`);

});

client.login(config.token);