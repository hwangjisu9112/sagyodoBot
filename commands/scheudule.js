// !일정을 입력하면 우리 디스코드 채널의 캘린더 링크를 출력한다
//https://github.com/4spartame/trpg-calendar-public/issues

module.exports = {
    name: "일정",
    description: "달력",
    execute: (msg) => {
      msg.channel.send(`[TRPG집회소 캘린더](https://trpg-calendar.com/EklCxksj6eQreMAZTiIb)`);
    },
  };
