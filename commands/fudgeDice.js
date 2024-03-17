 /** 
* 6면체 주사위이되 숫자 대신 +, -, 공백으로만 이루어진 퍼지 주사위를 던진다
* 여러 개의 퍼지 주사위를 던져 나온 +의 수만큼 +1, 공백의 수만큼 +0, -의 수만큼 -1을 더한다
* 4개의 퍼지 주사위를 던져 +, +, -, 공백이라는 결과가 나왔다면 1+1-1+0 = 1이라는 값으로 표현한다
*/
module.exports = {
    name: 'fd',
    description: '퍼지 주사위',
    async execute(interaction, args) {
        // 유저의 명령어를 분석하여 주사위를 던질 횟수를 결정.
        let times = 1;
        const match4 = args.join('').toLowerCase().match(/(\d+)/);


        if (match4) {
            times = parseInt(match4[0], 10);
        }

        // 유효한 숫자가 아니거나 0보다 작은 경우 에러 메시지를 출력하고 함수를 종료
        else if (isNaN(times) || times <= 0 || times > 10) {
            interaction.reply('🤔 유효한 숫자를 입력해주세요. <<예: !fd 2>>\n최대 10까지 입력할 수 있습니다');
            return;
        } else if (!match4) {
            interaction.reply('🤔 유효한 명령어를 입력해주세요. <<예: !fd 2>> \n최대 10까지 입력할 수 있습니다');
            return;
        }


        // 여러 개의 퍼지 주사위를 던져서 결과를 계산
        let totalValue = 0;
        let resultValue = '';
        let resultMark = '';

        // 퍼지 주사위.
        for (let i = 0; i < times; i++) {
            const fudgeDie = rollDice();
            let fudgeValue = '';
            let fudgeMark = '';
            if (fudgeDie === 1) {
                fudgeValue = '+1';
                fudgeMark = '[+]';
                totalValue += 1;
            } else if (fudgeDie === 2) {
                fudgeValue = '-1';
                fudgeMark = '[-]';
                totalValue -= 1;
            } else if (fudgeDie === 3) {
                fudgeValue = '0';
                fudgeMark = '[ ]';
            }
            // 결과를 문자열로 추가.
            resultValue += fudgeValue;
            resultMark += fudgeMark;

            if (i !== times - 1) {
                resultValue += ', ';
            }
        }

        // 결과를 메시지로 출력
        await interaction.reply(`>>> 🍫 : ${resultMark}\n ${resultValue}\n 결과 :  ${totalValue} `);
    }
};

// 퍼지 주사위를 던지는 함수
function rollDice() {
    return Math.floor(Math.random() * 3) + 1;
}