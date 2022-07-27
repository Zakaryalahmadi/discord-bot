const { MessageEmbed } = require("discord.js");
const { Command, CommandoMessage } = require("discord.js-commando")
const {BotNotInChannel, UserNotInChannel} = require('../../errors.json')


module.exports = class PlayCommand extends Command{
    constructor(client){
        super(client,{
            name:'queue',
            aliases:['q'],
            group: 'music',
            memberName:'queue',
            description:"affiche l'affiche d'attente",
            args:[
                {
                    key:'page',
                    prompt:'quelle page ?',
                    default: 1,
                    type:'integer'
                }
            ]
        })

        
    }

    /**
     * 
     * @param {CommandoMessage} message 
     * @param {Number} page 
     */
    async run(message, {page}){

        

        const server = message.client.server;

        if(!message.client.voice.connections.first()) return message.say(BotNotInChannel) 

        

        const nbItem = 10

        const startingItem = (page-1) * nbItem;

        const queueLength = server.queue.length;

        let itemPerPage = startingItem + nbItem;

        let totalPages = 1;

        let embed = new MessageEmbed()
                .setColor("#0099ff")
                .setTitle(`File d'attente pour : ${message.author.username}`)
                .setThumbnail(`${server.currentVideo.img}`)
                
                .addField("En train de jouer :",`[${server.currentVideo.title}]` + `(${server.currentVideo.url ? server.currentVideo.url : ""})`)

        if(queueLength > 0){
            let value = ""
            
            if(queueLength > nbItem){
                totalPages = Math.ceil(queueLength / nbItem);
            }
            if(page < 0 || page > totalPages){
                return message.say(":x: cette page n'existe pas");
            }

            if((queueLength - startingItem) < nbItem){
                itemPerPage = queueLength;
            }

            for(let i = startingItem; i < itemPerPage; i++){
                const video = server.queue[i];
                value += "`" + (i+1) + ".` " + `[${video.title}]` + `(${video.url})` + "\n"
            }
            embed.addField("A venir: ", value);
        }

        embed.setFooter(`Page ${page}/${totalPages}`)

        return message.say(embed);
    }


}
