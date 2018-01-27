const Discord = require("discord.js");

const client = new Discord.Client();

const config = require("./config.json");

const commands = [
  {
    command: "me",
    description: "This command displays information about you.",
    parameters: [],
    execute: function(message, parameters) {
      let member = message.member;
      let date = member.joinedAt;
      message.reply(`Oh, Hello there! So you want to know more about yourself? 
      \n-You joined ${member.guild.name} on ${date.getDate()} ${getNamedMonth(date.getMonth())} ${date.getFullYear()}.
    }
  }
];

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

function getNamedMonth(month) {
  switch (month) {
    case 0:
      return "January"
    case 1:
      return "February"
    case 2:
      return "March"
    case 3:
      return "April"
    case 4:
      return "May"
    case 5:
      return "June"
    case 6:
      return "July"
    case 7:
      return "August"
    case 8:
      return "September"
    case 9:
      return "October"
    case 10:
      return "November"
    case 11:
      return "December"
  }
}