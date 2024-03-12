// !사다리라는 명령어를 입력하면 

module.exports = {
    name: "사다리",
    description: "무작위 사다리!",
    execute: (msg) => {


      const users = message.channel.members.filter(member => !member.user.bot).array();
        
      // 무작위로 유저들을 선택하여 사다리 타기
      const ladderResult = [];
      while (users.length > 0) {
          const randomIndex = Math.floor(Math.random() * users.length);
          const selectedUser = users.splice(randomIndex, 1)[0];
          ladderResult.push(selectedUser.displayName);
      }

      // 사다리 결과 출력
      message.channel.send(`사다리 결과: ${ladderResult.join(' -> ')}`);


    },
  };