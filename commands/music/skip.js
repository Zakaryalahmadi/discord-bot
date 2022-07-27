const { Command, CommandoMessage } = require("discord.js-commando")
const ytdl = require('ytdl-core');
const {BotNotInChannel, UserNotInChannel} = require('../../errors.json')

module.exports = class SkipCommand extends Command{
    constructor(client){
        super(client,{
            name:'skip',
            aliases: ['s'],
            group: 'music',
            memberName:'skip',
            description:"skip la musique en cours",
            
        })

        
    }


    

    async run(message){


        const server = message.client.server;
        

        if(!message.member.voice.channel) return message.say(UserNotInChannel)
        
        if(!message.client.voice.connections.first()) return message.say(BotNotInChannel) 
    
        let index = 0;

        //si il n'ya pas de musique en attente
        if(!server.queue[index]){
            server.currentVideo = {title: "", url:""};
            return message.say("pas de musique en attente");
        } 
        
        
        
        server.currentVideo = server.queue[index];
        const dispatcher = server.connection.play(await ytdl(server.currentVideo.url, {filter: 'audioonly'}));
        server.queue.shift();

        
        dispatcher.on("finish",()=>{
            this.run(message);
        })
    

        return message.say(":fast_forward: Skip :thumbsup:");
    }


}