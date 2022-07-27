const { Command, CommandoMessage } = require("discord.js-commando")
const {StreamDispatcher} = require('discord.js')
const ytdl = require('ytdl-core');

const {BotNotInChannel, UserNotInChannel} = require('../../errors.json')

module.exports = class SkipToCommand extends Command{
    constructor(client){
        super(client,{
            name:'skipto',
            aliases: ['st'],
            group: 'music',
            memberName:'skipto',
            description:"skip la musique en cours",
            args:[
                {
                    key:'index',
                    prompt:"Vous voulez allez à quelle musique ?",
                    type: 'integer'
                }
            ]
        })

        
    }


    async run(message, {index}){

    

        const server = message.client.server;
        

        if(!message.member.voice.channel) return message.say(UserNotInChannel)
        
        if(!message.client.voice.connections.first()) return message.say(BotNotInChannel) 
    

        //si il n'ya pas de musique en attente        
        if(!server.queue[index - 1]){
            server.currentVideo = {title: "", url:""};
            return message.say("Pas de musique dans la liste attente");
        } 
        

        server.currentVideo = server.queue[index - 1];
        const dispatcher = server.connection.play(await ytdl(server.currentVideo.url, {filter: 'audioonly'}))
        server.queue.splice(index - 1, 1);

        dispatcher.on('finish',()=>{
            
            this.run(message, {index});
        })
    

        return message.say(`:fast_forward: SkipTo :thumbsup:`)
    }


}