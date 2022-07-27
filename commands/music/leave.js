const { Command, CommandoMessage } = require("discord.js-commando")
const {BotNotInChannel, UserNotInChannel} = require('../../errors.json')

module.exports = class PlayCommand extends Command{
    constructor(client){
        super(client,{
            name:'leave',
            aliases:['l'],
            group: 'music',
            memberName:'leave',
            description:"Je quitte le channel vocal",
            
        })

        
    }

    /**
     * 
     * @param {CommandoMessage} message 
     * @param {String} param1 
     */
    async run(message){

        const voiceChannel = message.guild.me.voice.channel;
        const server = message.client.server;

        
        server.queue = []
        server.currentVideo = {title: "", url: ""};
       

        if(!voiceChannel) return message.say(UserNotInChannel)
        
        

        await voiceChannel.leave()
        

        return message.say(":thumbsup: J'ai quitte " + "`" + voiceChannel.name + "`")
    }


}