/* https://www.dnd5eapi.co
*  D&D 5e SRD API,던전 앤 드래곤 관련 API를 이용하여 게임 내의 주문, 몬스터, 아이템 등에 대한 정보를 출력한다
*/

const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');

module.exports = {
    name: 'dd',
    description: 'D&D5e_API',
    async execute(msg) {
        const args = msg.content.split(' ');
        const endpoint = args[1]; 

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
                    .setDescription(`${keyList}` + `\n출처 : https://www.dnd5eapi.co \n 사용법 : !dd + 항목명` );       
                msg.reply({ embeds: [embed] });          

            } catch (error) {
                console.error(error);
                msg.reply(`API 데이터를 가져오는 중에 오류가 발생했습니다.`);
            }
        } else {
            // 사용자가 !dd 뒤에 특정 엔드포인트를 입력한 경우
            try {
                const response = await fetch(`https://www.dnd5eapi.co/api/${endpoint}`);
                const data = await response.json();

                // data가 JSON 형식이라면 MessageEmbed를 사용하여 데이터를 가공 후 출력
                if (typeof data === 'object') {
                    const embed = new MessageEmbed()
                        .setTitle(`D&D 5e SRD API - ${endpoint}`)
                        .setColor('#FF4500')
                        .setDescription(JSON.stringify(data, null, 2))
                    msg.reply({ embeds: [embed] });
                } else {
                    msg.reply('API 데이터를 가져오는 중에 오류가 발생했습니다.');
                }
            } catch (error) {
                console.error(error);
                msg.reply('API 데이터를 가져오는 중에 오류가 발생했습니다.');
            }
        }
    }
}