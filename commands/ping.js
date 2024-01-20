// !ping이라는 명령어를 입력하면 GITHUB라고 답한다

module.exports = {
    name: "ping",
    description: "Ping!",
    execute: (msg) => {
      msg.channel.send("[GitHub](https://github.com/hwangjisu9112/sagyodoBot)");
    },
  };