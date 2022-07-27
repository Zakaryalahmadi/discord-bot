const { Command, CommandoMessage } = require("discord.js-commando")
const {BotNotInChannel, UserNotInChannel} = require('../../errors.json')

module.exports = class PlayCommand extends Command{
    constructor(client){
        super(client,{
            name:'join',
            aliases:['j'],
            group: 'music',
            memberName:'join',
            description:"rejoint le channel vocal",
            
        })

        
    }

    async run(message){

        const voiceChannel = message.member.voice.channel;
    

       

        if(!voiceChannel) return message.say(UserNotInChannel)
        
        voiceChannel.join();

        return message.say(":thumbsup: J'ai rejoins " + "`" + voiceChannel.name + "`")
    }


}