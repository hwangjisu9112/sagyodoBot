// 유저가 입력한 명령어에 대응하는 이모지를 달아준다

const { Client, Intents, MessageEmbed } = require("discord.js");
const { reactions } = require("./help.json");
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

//const emojiStar = '⭐';

// const emojiA = '';
// const emojiW = '';


const emojiHug = '🫂';
const emojiThumb = '👍'; 
const emojiClap = '👏'; 
const emojiDog = '🐶';
const emojiDown = '⬇️';
const emojiSkull = '💀';
const emojiPenguin = '🐧'
const emojiSushi = '🍣';

module.exports = {
    name: "감정표현",
    aliases: ["교도야"],
    description: "이모지반응",
    execute: (msg) => {
        const args = msg.content.split(' ');
        const emotion = args[1]; 

        switch (emotion.toLowerCase()) {

            case '목록':
                    const embed = new MessageEmbed()
                    .setTitle("reactions") // 1 - embed의 제목
                    .setColor('0f4c81') // 2 - embed 사이드 바의 색
                    .setDescription(getReactionsDescriptions()); // 3 - 설명
                    console.log(embed);
                    msg.reply({ embeds: [embed] })                
                    break;

            case '권':
                msg.react(emojiPenguin);
                break;

            case '배고파':
                msg.react(emojiSushi);
                break;


            case '와!':
                msg.react(emojiSkull);
                msg.channel.send(`아시는구나`);
                break;

            case '안아줘요':
                msg.react(emojiHug);
                msg.channel.send(`안아줬어요`);
                break;
                
            case '칭찬해줘':
                msg.react(emojiThumb);
                break;
             
            case '박수':
                msg.react(emojiClap);
                break;    
            
            case '개추':
                msg.react(emojiDog);
                msg.react(emojiThumb);
                break;
            
            case '비추':
                msg.react(emojiDown);
                break;            
            
        default:
            msg.reply("사교도은는 당황한 듯 하다");
            break;
        }
    },
};


//help.json으로부터 각각의 commands를 불러오며, 줄바꿈으로 구별
function getReactionsDescriptions() {
    return Object.values(reactions).join('\n');
}