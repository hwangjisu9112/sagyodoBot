//!일정을 입력하면 우리 디스코드 채널의 구글 캘린더 링크를 출력한다
//https://calendar.google.com/calendar/u/0?cid=YThhZTVkMWI5OWYyMWE1NjMzOTY5Yzk5YjAzZTg5MzMyMWUwNmIwODhkZjMyYzM2NjE1OTVlZTljZmUwNmQ1N0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t

module.exports = {
    name: "일정",
    description: "달력",
    execute: (msg) => {
        const today = new Date(); 
        const month = today.getMonth() + 1; 
        const date = today.getDate(); 
        const dayIndex = today.getDay(); 
        const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
        const day = daysOfWeek[dayIndex]; 

      msg.channel.send(` 🗓️ **[TRPG집회소 일정표(구글 달력)](https://calendar.google.com/calendar/u/1?cid=ZWVmODIwOWQyODFhZmIxMDQwOGM5MjVjODdmOTVlNjA3ODY4NTFlM2Q1ZTBiY2ExMjk0ZDdmNGNmMjdiMDE2ZUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t)**`);
      msg.channel.send(` 오늘은 **${month}월 ${date}일 ${day}요일** 입니다`);
    },
  };
