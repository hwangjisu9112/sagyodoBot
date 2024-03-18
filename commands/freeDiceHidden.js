// freeDice와 같지만, 디스코드 상의 마크다운 문법 || ? ||를 이용, 클릭해야 결과가 보이는 주사위를 던진다

module.exports = {
    name: 'hr',
    description: '비밀 주사위',
    async execute(interaction,args) {
        // 유저가 입력한 명령어를 분석 (!1d5+1 => [1, 5, 1])
        const match1 = args.join('').toLowerCase().match(/(\d+d\d+|\d+|\-\d+)/g);

        

        if (!match1) {
            msg.channel.send('🤔 유효한 명령어를 입력해주세요. <<예: !r 1d6+1>>');
            return;
        }

        // 주사위를 던지는 횟수와 주사위의 값들, 그리고 자연수들을 저장할 배열
        let rolls = [];
        let numbers = [];

        let total = 0;

        console.log("블라인드 주사위 실시" + match1);

        //
        match1.forEach((diceString) => {
            if (diceString.includes('d')) {
                const [times, value] = diceString.split('d').map(num => parseInt(num));
                let result = 0;
        
                // 주사위 던지기
                for (let i = 0; i < times; i++) {
                    const rollValue = Math.floor(Math.random() * value) + 1;
                    rolls.push(rollValue);
                    result += rollValue;
                }
        
                total += result;

            } else {
                const number = parseInt(diceString); 
        
                if (number >= 0) {
                    numbers.push(number);
                    total += number;
                    console.log("number >= 0 " + number);
                } else {
                    numbers.push(number);
                    total += number; 
                    console.log("number < 0 " + number);
                }
            }
        });

        
        const rollArray = rolls.join(' + ');
        const numberArray = numbers.join(' + ');
     

        console.log("주사위를 던진 랜덤한 값 rollArray : " + rollArray);
        console.log("더하거나 빼는 상수 numberArray : " + numberArray);

        await interaction.reply(`>>> ㊙️ : ||[ ${rollArray} ${numbers.length > 0 ? '+ ' + numberArray : ''} ]\n${total}||`);
    }
};