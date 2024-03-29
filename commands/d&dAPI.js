/* https://www.dnd5eapi.co
*  D&D 5e SRD API,던전 앤 드래곤 관련 API를 이용하여 게임 내의 주문, 몬스터, 아이템 등에 대한 정보를 출력한다
*/
const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');

const emojiReaction = '📦'


module.exports = {
    name: 'dd',
    description: 'D&D5e_API',
    async execute(msg) {
        const args = msg.content.split(' ');
        const endpoint = args[1];  
        const jsonName = args.slice(2).join('-').toLowerCase(); // 공백을 "-"로 대체하여 문자열 조합

        console.log('Endpoint:', endpoint);
        console.log('JSON Name:', jsonName);

        // 사용자가 !dd만 입력한 경우
        if (!endpoint) {
            try {
                const response = await fetch('https://www.dnd5eapi.co/api/');
                const data = await response.json();

                // API에서 반환된 데이터의 키를 배열로 가져옴
                const keys = Object.keys(data);

                // 키 목록을 문자열로 변환하여 출력
                const keyList = keys.join('\n');

                const embed = new MessageEmbed()
                    .setTitle(`D&D 5e SRD API에서 제공하는 정보 목록`)  
                    .setColor('#FF4500')
                    .setDescription(`${keyList}\n 출처 : https://www.dnd5eapi.co \n 🔍 사용법 : !dd + 목차명(!dd monsters)` );       
                msg.author.send({ embeds: [embed] });    
                msg.react(emojiReaction);      

            } catch (error) {
                console.error(error);
                msg.reply(`API 데이터를 가져오는 중에 오류가 발생했습니다.`);
            }
        } else if (endpoint && jsonName) {
            try {
                // API에 요청하여 데이터 가져오기
                const response = await fetch(`https://www.dnd5eapi.co/api/${endpoint}/${jsonName}`);
                const data = await response.json();
                function sendStringifiedMessage(channel, data) {
                    const jsonString = JSON.stringify(data, null, 2)
                    .replace(/(\{|\}|\[|\]|"|,)/g, '') // 중괄호, 대괄호, 쌍따옴표, 쉼표 제거
                    .replace(/index:.*?(?=,|$)/g, '') // index:로 시작하는 값 제외
                    .replace(/url:.*?(?=,|$)/g, ''); // url:로 시작하는 값 제외
                
                    const chunks = jsonString.match(/[\s\S]{1,2000}/g) || [];
                    chunks.forEach(chunk => {
                        channel.send('```\n' + chunk + '\n```');
                    });
                }
                

                if (response.ok) {
                    //msg.author.send(`https://www.dnd5eapi.co/api/${endpoint}/${jsonName}`);
                    sendStringifiedMessage(msg.author, data);
                    msg.react(emojiReaction);      

                } else {
                    // API 요청이 실패한 경우
                    msg.author.send('API 요청에 실패했습니다.');
                }
            } catch (error) {
                // 오류 발생 시 처리
                console.error(error);
                msg.author.send('API 요청 중 오류가 발생했습니다.');
            }
        } else if (endpoint) {
            // 사용자가 !dd 뒤에 특정 엔드포인트를 입력한 경우
            try {
                const response = await fetch(`https://www.dnd5eapi.co/api/${endpoint}`);
                const data = await response.json();
            
                // data가 JSON 형식이라면 MessageEmbed를 사용하여 데이터를 가공 후 출력
                if (typeof data === 'object') {
                    // 각 JSON 항목에서 "name" 속성의 값을 추출하여 새로운 배열을 생성.
                    const names = data.results.map(item => item.name);
    
                    // 출력할 문자열의 총 길이가 1000자를 초과하는 경우 일부만 출력.
                    let namesString = '';
                    if (names.join('\n').length <= 1000) {
                        namesString = names.join('\n');
                    } else {
                        // names 배열에서 일부만 추출하여 출력.
                        const startIndex = Math.floor((Math.random() * names.length) - 20); 
                        const truncatedNames = names.slice(startIndex, startIndex + 20); 
                        namesString = truncatedNames.join('\n') + '...'; 
                    }
                    
                    // 생성된 배열을 문자열로 변환하여 출력.
                    const embed = new MessageEmbed()
                        .setTitle(`D&D 5e SRD API - ${endpoint}`)  
                        .setColor('#FF4500')
                        .setDescription(`${namesString} \n 🔍 사용법 : !dd + 목차 + 항목명(!dd races human)`);    
                    msg.author.send({ embeds: [embed] });   
                    msg.react(emojiReaction);      
 
                } else {
                    msg.author.send('🫤 API 데이터를 가져오는 중에 오류가 발생했습니다. 항목명이 바르지 않거나, API 데이터에 변동이 생겼을 수 있습니다');
                    
                }
            } catch (error) {
                console.error(error);
                msg.author.send('🫤 API 데이터를 가져오는 중에 오류가 발생했습니다. 항목명이 바르지 않거나, API 데이터에 변동이 생겼을 수 있습니다');
            }
        }
    }
}
