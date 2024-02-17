//!홍보라고 입력한다면 우리 집회소의 홍보물의 링크를 출력한다

module.exports = {
    name: "홍보",
    description: "홍보",
    async execute(interaction) {
      await interaction.reply(`[TRPG 집회소 사용법 정리 노션 문서](https://lacy-goldfish-e44.notion.site/TRPG-15a8acf8e32e4907b95050649b58e418)`);
    },
  };