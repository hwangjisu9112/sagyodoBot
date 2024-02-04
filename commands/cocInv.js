// !cc를 입력하면 <크툴루의 부름>의 탐사자용 능력치가 출력된다

const { Client, Intents, MessageEmbed } = require("discord.js");
const C = require("./coc.json");
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });


//무작위 능력치 제공을 위한 가상 주사위
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

        // 초기 이성은 정신력과 같은 값이며, 체력은 크기, 건강의 합을 10으로 나눈 수, 마력은 정신력의 5분의 1
        const insane = Math.round(pow - pow/5) ;
        const san = pow + `, 장기적 광기는 ` + insane + `부터`;
        const hp = parseInt((siz + hth)/10);
        const mp = parseInt(pow/5);
        
        /** 
        *db = 체구
        * 체구는 근력과 크기의 합이 일정 수치보다 큰가 작은가를 의미하며
        * db는 근접 전투를 할 때 피해보너스를 더 줄 수 있는지 없는지에 대해 관여
        * dmg = 피해 보너스
        * dmg는 근접 전투시 상대에게 가하는 추가 피해량을 의미
        * 체구가 자신보다 큰 상대에게는 상대적으로 피해가 덜 들어가는 등 복잡한 공식이 있지만 여기서는 무시
        */
        let db = 0;
        if(str + siz <=64) {
        db = -2;
        } else if(str + siz <=84) {
        db = -1;  
        } else if(str + siz <=124) {
        db = 0;    
        } else if(str + siz <=164) {
        db = 1; 
        } else {
        db = 2;    
        }

        let dmg = 0;
        if(str + siz <=64) {
        dmg = '-2';
        } else if(str + siz <=84) {
        dmg = '-1';  
        } else if(str + siz <=124) {
        dmg = '0';    
        } else if(str + siz <=164) {
        dmg = '1d4'; 
        } else {
        dmg = '1d6';    
        }

        // 교육의 4를 곱한 값, 지능의 2를 곱한 값을 더하여 기능을 올릴 수 있는 점수로 활용
        const jobAndinterest = edu * 4 + int * 2;        
        const skill = `${jobAndinterest}`;

        /* mov = 이동력
        * 이동력은 캐릭터가 이동할 때 사용하는 수치로, 보통 이동력은 추격전에서 활용되는 능력치다
        * 근력이 체구보다 크고, 민첩도 체구보다 크다면 이동력은 가장 높으며 체구가 민첩 혹은 근력보다 크다면 느려진다
        * 나이도 캐릭터의 나이가 10대인 경우 가장 빠르며, 그보다 높을 수록 점점 느려진다
        * 
        * 이 시트에서는 캐릭터의 나이를 랜덤으로 부여할 지에 대해 고민중이므로 이 부분의 작성은 잠시 미룬다.
        */


        const embed = new MessageEmbed()
        .setTitle(`${msg.author.username}님의 크툴루의 부름7th 탐사자`) 
        .setColor('0f4c81') 
        .setDescription(`${C.str}${str}\n${C.dex}${dex}\n${C.pow}${pow}\n${C.hth}${hth}\n${C.app}${app}\n${C.edu}${edu}\n${C.siz}${siz}\n${C.int}${int}\n${C.luk}${luk}\n${C.san}${san}\n${C.hp}${hp}${C.mp}${mp}\n${C.skill}${skill}\n${C.db}${db}(${dmg})`);       
        msg.reply({ embeds: [embed] });
    },
};

