// !사진이라는 명령어를 입력하면 유저의 프로필 사진을 보여준다

module.exports = {
    name: "사진",
    description: "사진",
    execute: (msg) => {
      msg.channel.send(msg.author.displayAvatarURL());
    },
  };