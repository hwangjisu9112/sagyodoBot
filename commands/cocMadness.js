// !mad를 입력하면 <크툴루의 부름>의 탐사자의 광기에 대한 무작위 표를 표시합니다.

const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'cm',
    description: '크툴루의_부름_광기',
    execute: (msg) => {

    //무작위 광기 출력을 위한 가상 주사위
    function rollMadness() {
    // Math.floor(Math.random() * (최대값 - 최소값 + 1)) + 최소값
    return Math.floor(Math.random() * 10) + 1;
    }

    let Mad = rollMadness();

    function rollDuration() {
    // Math.floor(Math.random() * (최대값 - 최소값 + 1)) + 최소값
    return Math.floor(Math.random() * 10) + 1;
    }

    let duration = rollDuration();    

    
    let subject = '';    
    
    if (Mad === 1) {
    
    subject = '기억상실'; 

    } else if (Mad === 2) {
  
    subject = '심신성 장애';

    } else if (Mad === 3) {
    
    subject = '폭력';    

    } else if (Mad === 4) {
    
    subject = '편집증';     
    } else if (Mad === 5) {
    
    subject = '중요한 사람?'; 
    } else if (Mad === 6) {
    
    subject = '기절';    
    } else if (Mad === 7) {

    subject = '필사적인 도주';
    } else if (Mad === 8) {
        
    subject = '발작적 행동이나 감정 폭발';    
    } else if (Mad === 9) {
    
    subject = '😨 공포증'; 
    } else if (Mad === 10) {
    
    subject = '🤑 집착증'; 
    }
    


    let conc = `${subject}, ${duration}라운드 동안 지속됩니다...`;
        
    const embed = new MessageEmbed()
    .setTitle(`❤‍🩹 ${msg.author.username}님의 크툴루의 부름7th 광기의 발작(실시간)`) 
    .setColor('#FF4500') 
    .setDescription(`${conc}`);       
    msg.reply({ embeds: [embed] });

    },
};

