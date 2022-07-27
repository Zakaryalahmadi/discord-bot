const { Command, CommandoMessage } = require("discord.js-commando")
const ytdl = require('ytdl-core');
const ytsr = require('youtube-search');
const {BotNotInChannel, UserNotInChannel} = require('../../errors.json')

const {key} = require("../../config.json")

module.exports = class PlayCommand extends Command {
    constructor(client){
        super(client,{
            name:'play',
            aliases: ['p'],
            group: 'music',
            memberName:'play',
            description:"joue la musique",
            args: [
                {
                    key:'term',
                    prompt:'Quel musique ?',
                    type:'string'
                }
            ]
        })

        
    }

    async run(message, {term}) {

        const server = message.client.server;
        

        
        if(!message.member.voice.channel) return message.say(UserNotInChannel)

        await message.member.voice.channel.join().then((connection)=>{

            

            ytsr(term,{ key: key, maxResults: 1,type:'video'} ).then((results)=>{
                if(results.results[0]){
                    // console.log(results.results[0].thumbnails.medium.url)
                    const videoFound = {title: results.results[0].title, url: results.results[0].link, img:results.results[0].thumbnails.medium.url}
                

                    if(server.currentVideo.url != ""){
                        server.queue.push(videoFound)
                        return message.say("`" + videoFound.title + "`" +" | Ajouté à la file d'attente")
                    }
        
                    server.currentVideo = videoFound;
                    this.runVideo(message,connection);
                }
            })

         
        })
    }

    async runVideo(message, connection){
        const server = message.client.server;
        const dispatcher = connection.play(await ytdl(server.currentVideo.url, {filter: 'audioonly'}))

        

        server.queue.shift();
        server.dispatcher = dispatcher

        server.connection = connection;

        

        dispatcher.on("finish", ()=>{
            
            if(server.queue[0] === undefined) server.currentVideo.url = "";
            if(server.queue[0]){
                server.currentVideo = server.queue[0];
                return this.runVideo(message,connection,server.currentVideo.url)
            }
            
        })

        return message.say("Entrain de jouer "+ "`" + server.currentVideo.title + "`" + ":notes:");
    }
};