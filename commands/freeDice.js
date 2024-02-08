// ! 1d100과 같은 명령어를 입력하면 유저가 원하는 무작위 주사위를 던질 수 있습니다.

module.exports = {
    name: 'r',
    description: '주사위',
    execute: function (msg, args) {
        // 유저가 입력한 명령어를 분석 (!1d5+1 => [1, 5, 1])
        const match1 = args.join('').toLowerCase().match(/(\d+)d(\d+)([+\-]\d+)?/);
        
        if (!match1) {
            msg.channel.send('🤔 유효한 명령어를 입력해주세요. <<예: !r 1d6+1>>');
            return;
        }

        // times는 주사위를 던지는 횟수, value는 각각의 주사위에서 나오 눈금, calc는 유저가 임의로 지정한 정수이다.
        const times = parseInt(match1[1], 10);
        const value = parseInt(match1[2], 10);
        
        let calc = match1[3] ? parseInt(match1[3], 10) : 0;

        if (isNaN(times) || isNaN(value) || times <= 0 || value <= 0 || !Number.isInteger(value)) {
            msg.channel.send('🤔 유효한 숫자를 입력해주세요. <<예: !r 1d6+1>>');
            return;
        } 

        if(match1) {

        //개별 주사위의 계산 결과를 roll 배열 안에 넣는다. 
        let roll = [];

        //result는 주사위를 던진 값, total은 계산 결과를 반영한 값이다
        let result = 0;
        let total = 0;

        // 가상 주사위
        for (let i = 0; i < times; i++) {
            const rollValue = Math.floor(Math.random() * value) + 1;
            roll.push(rollValue);

            result += rollValue;
            total += rollValue;
        }
        const rollArray = roll.join(' + ');

        if(calc != 0) {
        total += calc;
        
        msg.channel.send(`>>> 🥠 : ${result} [ ${rollArray} ], ${calc} \n${result} + ${calc} = ${total}`);
        } else if(calc == 0) {
        msg.channel.send(`>>> 🥠 : ${result} [ ${rollArray} ]\n${total}`)

        }
        
        }
    }
};