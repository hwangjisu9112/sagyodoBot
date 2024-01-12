// !도움이라는 명령어를 입력하면 명령어 모음을 임베드로 표현한다
const { Client, Intents, MessageEmbed } = require("discord.js");
const { commands } = require("./help.json");
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

module.exports = {
   name: "도움",
   description: "도움!",
   execute: (msg) => {
     const embed = new MessageEmbed()
     .setTitle("안녕하세요 TRPG집회소의 사교도 봇 입니다!") // 1 - embed의 제목
     .setColor('0f4c81') // 2 - embed 사이드 바의 색
     .setDescription(getCommandDescriptions()); // 3 - 설명을 담당하는 곳입니다.
     console.log(embed);
     msg.reply({ embeds: [embed] })
   },
};


//help.json으로부터 각각의 commands를 불러옵니다. 줄바꿈으로 구분합니다
function getCommandDescriptions() {
    return Object.values(commands).join('\n');
}