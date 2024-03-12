/**
 *  TRPG집회소 전용 봇 - 사교도 (작성자 또몽)
 *  node index.js
 * 
 * 참고
 *  
 *  https://moong-bee.com/posts/create-a-discord-bot-with-js-4
 *  https://support.discord.com/hc/en-us/articles/1500000368501-Slash-Commands-FAQ
 *  https://velog.io/@shin6949/Discord-%EB%B4%87-Slash-Command-%EB%93%B1%EB%A1%9D-%EB%B0%8F-%EC%82%AC%EC%9A%A9#%ED%85%8C%EC%8A%A4%ED%8A%B8
 */

// discord.js 라이브러리 호출
const { Client, Intents, Collection } = require("discord.js");
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const { TOKEN, PREFIX } = require("./config.json");
const fs = require("fs");
client.commands = new Collection(); 


// commands디렉토리에 있는 자바스크립트 파일들로부터 명령어들의 모음인 name들을 전부 찾아온다
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}


// discord 봇이 실행될 때 터미널에 실행할 코드
client.once('ready', () => {
    console.log(`${client.user.tag}가 깨어났다!`);
    console.log(require('discord.js').version);
  });
 
/**
 * messageCreate
 * 유저가 접두사로 시작하는 채팅을 치면 command폴더의 .js파일을 읽고 반응한다
 */  
client.on('messageCreate', msg => {

    //명령어가 접두사로 시작하지 않거나, 혹은 봇 자신이 내놓은 답변에 다시 반복해서 답변하지 않도록 하는 코드
    if (!msg.content.startsWith(PREFIX) || msg.author.bot) return;
  
    const args = msg.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

      // 사용자가 접두사만 입력했을 때 반응하지 않도록 하는 코드
   if (command === '' || command === '!'|| command.length >= 50) {
    console.log('RETURNED')
    return;

    // 사용자가 !!뒤에 추가로 명령어를 입력하는 경우에도 무시하고 리턴, 노래하는 하리보봇과 같이 작동 방지
   } else if (command.startsWith( '!')) {
    console.log('RETURNED')
    return;
   } 
      // 명령어가 존재하지 않은 경우, 리턴
    else if (!client.commands.has(command)) {
     msg.reply("🍦 명령어가 존재하지 않습니다 \n !도움 으로 명령어 목록을 볼 수 있습니다");
     return;
   }
      // 유저가 올바른 명령어를 입력하더라도, 그 기능에 오류가 있다면 출력
   try {
       client.commands.get(command).execute(msg, args);
     } catch (e) {
       console.error(e);
       msg.reply("🙈 명령어를 실행하는 중 오류가 났습니다");
     }
});

// 봇과 서버를 연결
client.login(TOKEN);