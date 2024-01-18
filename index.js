/**
 *  TRPG집회소 전용 봇 - 사교도 (작성자 또몽)
 *  node index.js
 * 
 * 참고
 *  https://moong-bee.com/posts/create-a-discord-bot-with-js-4
 */

// discord.js 라이브러리 호출
const { Client, Intents, Discord, Collection } = require("discord.js");
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const { TOKEN, PREFIX } = require("./config.json");
const fs = require("fs");
client.commands = new Collection(); 

const quickCommands = {
	'도움': '도움!',
	'사진': '사진',
	'홍보': '홍보',
  'r': '주사위',
  'cc': '크툴루의_부름_탐사자',
};
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
 * 유저가 !로 시작하는 채팅을 치면 command폴더의 js파일을 읽고 반응한다
 */  

client.on('messageCreate', msg => {
    if (!msg.content.startsWith(PREFIX) || msg.author.bot) return;
  
    const args = msg.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

      // 사용자가 접두사만 입력했을 때 반응하지 않도록 하는 코드
   if (command === '' || command === '!'|| command.length >= 10) return;

    
      // 명령어가 존재하지 않은 경우, 리턴
   if (!client.commands.has(command)) {
     msg.reply("🍦 명령어가 존재하지 않습니다 \n !도움 으로 명령어 목록을 볼 수 있습니다");
     return;
   }
      // 유저가 올바른 명령어를 입력하더라도, 그 기능이 오류가 있다면 출력
   try {
       client.commands.get(command).execute(msg, args);
     } catch (e) {
       console.error(e);
       msg.reply("🙈 명령어를 실행하는 중 오류가 났습니다");
     }
});

// 봇과 서버를 연결
client.login(TOKEN);