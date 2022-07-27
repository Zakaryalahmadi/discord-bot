const {CommandoClient } = require('discord.js-commando');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const token = process.env.TOKEN;

const client = new CommandoClient({
    commandPrefix: '-',
    owner:'488369818135822336',
    invite:'https://discord.gg/Z5VgpBtC'
})

client.registry
    .registerDefaultTypes()
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerGroup('music','Music')
    .registerCommandsIn(path.join(__dirname,'commands'));


client.server = {
    queue : [],
    currentVideo:{title: "Rien", url:"", img:"https://www.freeiconspng.com/thumbs/youtube-logo-png/youtube-play-logo-png-5.png"},
    dispatcher: null,
    pause: true,
    connection: null
}


client.once('ready', ()=>{
    console.log(`connecte en tant que ${client.user.tag}`)
})

client.on('error',(error)=>{
    console.error(error);
})

client.login(token);