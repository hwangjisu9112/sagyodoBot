// !cc를 입력하면 <크툴루의 부름>의 탐사자용 능력치를 만들 수 있습니다
const { Client, Intents, MessageEmbed } = require("discord.js");
const C = require("./coc.json");
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });


//무작위 능력치 제공을 위한 가상 주사위 공식입니다
function rollCoC(times, value) {
    let total = 0;
    for (let i = 0; i < times; i++) {
        total += Math.floor(Math.random() * value) + 1;
    }
    return total;

    
}
module.exports = {
    name: 'cc',
    description: '크툴루의_부름_탐사자',
    execute: (msg) => {
        /** 
        *str 근력  
        *hth 건강
        *siz 크기
        *dex 민첩성
        *app 외모
        *int 지능
        *san 정신력
        *edu 교육
        *luk 운
        */
        const str = rollCoC(3, 6) * 5;
        const hth = rollCoC(3, 6) * 5;
        const siz = (rollCoC(2, 6) + 6) * 5;
        const dex = rollCoC(3, 6) * 5;
        const app = rollCoC(3, 6) * 5;
        const int = (rollCoC(2, 6) + 6) * 5;
        const pow = rollCoC(3, 6) * 5;
        const edu = (rollCoC(2, 6) + 6) * 5;
        const luk = rollCoC(3, 6) * 5;

        //
        const insane = Math.round(pow - pow/6) ;
        const san = `${pow}, 장기적 광기는.. [${insane}] 부터`;
        const hp = ``;
        const mp = ``;
        const db = ``;
        const sklil = ``;


        const embed = new MessageEmbed()
        .setTitle(`${msg.author.username}님의 크툴루의 부름7th 탐사자`) 
        .setColor('0f4c81') 
        .setDescription(`${C.str}${str}\n${C.dex}${dex}\n${C.pow}${pow}\n${C.hth}${hth}\n${C.app}${app}\n${C.edu}${edu}\n${C.siz}${siz}\n${C.int}${int}\n${C.luk}${luk}\n${C.san}${san}`);       
        msg.reply({ embeds: [embed] });
    },
};

