// !도움이라는 명령어를 입력하면 명령어 모음을 임베드로 표현한다
const { MessageEmbed } = require("discord.js");
const { commands } = require("./help.json");

module.exports = {
   name: "도움",
   description: "도움!",
   execute: (msg) => {
     const embed = new MessageEmbed()
     .setTitle("안녕하세요 TRPG집회소의 사교도 봇 입니다!") // 1 - embed의 제목
     .setColor('#FF4500') // 2 - embed 사이드 바의 색
     .setDescription(getCommandDescriptions()); // 3 - 설명
     console.log(embed);
     msg.reply({ embeds: [embed] })
   },
};


//help.json으로부터 각각의 commands를 불러오며, 줄바꿈으로 구별
function getCommandDescriptions() {
    return Object.values(commands).join('\n');
}