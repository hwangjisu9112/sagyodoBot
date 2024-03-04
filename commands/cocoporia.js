// !코코라는 명령어를 입력하면 크툴루의 부름 기준 코코포리아 사용법을 알려주는 링크를 제공한다
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "코코",
    description: "코코포리아 사용법",
    async execute(interaction) {

      const embed = new MessageEmbed()
      .setTitle(`코코포리아`) 
      .setColor('#FF4500') 
      .setDescription(`☕ [코코포리아 사용법 정리 노션 문서](https://lacy-goldfish-e44.notion.site/4e867f269cc94f87b4fa728ed3fc0810)`);       
      await interaction.reply({ embeds: [embed] });
    },
  };
