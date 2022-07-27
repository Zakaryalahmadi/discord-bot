const { Command, CommandoMessage } = require("discord.js-commando")
const {StreamDispatcher} = require('discord.js')
const {BotNotInChannel, UserNotInChannel} = require('../../errors.json')

module.exports = class PlayCommand extends Command{
    constructor(client){
        super(client,{
            name:'resume',
            aliases: ['r'],
            group: 'music',
            memberName:'resume',
            description:"reprend la musique",
            
        })

        
    }

    async run(message){

        /**
         * @type StreamDispatcher
         */

        const dispatcher = message.client.server.dispatcher;

        // console.log(message.member);

        if(!message.member.voice.channel) return message.say(UserNotInChannel)
        
        if(!message.client.voice.connections.first()) return message.say(BotNotInChannel) 
        
        
    
        if(dispatcher){

            dispatcher.resume(true);
            dispatcher.pause(true);
            dispatcher.resume(true);

        }

        return message.say("entrain de jouer :notes:")
    }


}