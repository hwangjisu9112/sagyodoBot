// 유저가 입력한 명령어에 대응하는 이모지를 달아준다

const { MessageEmbed } = require("discord.js");
const { reactions } = require("./help.json");

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
const emojiJuice = '🧃';
const emojiScroll= '📜';


module.exports = {
    name: "감정표현",
    aliases: ["교도야"],
    description: "이모지반응",
    execute: (msg) => {
        const args = msg.content.split(' ');
        const emotion = args[1]; 


        // 사용자가 입력한 명령어가 이하의 목록에 있다면, 그에 맞는 반응을 한다
        switch (emotion.toLowerCase()) {

            case '목록':
                const embed = new MessageEmbed()
                    .setTitle("이하의 명령어를 추가로 입력하면 사교도가 답변합니다")
                    .setColor('0f4c81')
                    .setDescription(getReactionsDescriptions());
                msg.reply({ embeds: [embed] });
                msg.react(emojiScroll);
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
            
            case '한잔해':
                msg.react(emojiJuice);
                break;            
                            
            
        default:
            msg.reply("사교도은는 당황한 듯 하다");
            break;
        }
    },
};


//help.json으로부터 각각의 commands를 불러오며, 줄바꿈으로 구별
function getReactionsDescriptions() {
    return Object.keys(reactions).map(reaction => `**${reaction}**: ${reactions[reaction]}`).join('\n');
}