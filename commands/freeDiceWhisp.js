// ! 1d100과 같은 명령어를 입력하면 유저가 원하는 무작위 주사위를 던질 수 있습니다.
// 주사위의 결과값을 전체 채널 대신 유저의 개인 메시지로 전달합니다.
// ?d? + ?d? + ?

const emojiReaction = '🫢';

module.exports = {
    name: 'wr',
    description: '주사위',
    async execute(msg, args) {
        // 유저가 입력한 명령어를 분석 (!1d5+1 => [1, 5, 1])
        const match1 = args.join('').toLowerCase().match(/(\d+d\d+|\d+)/g);

        if (!match1) {
            msg.channel.send('🤔 유효한 명령어를 입력해주세요. <<예: !r 1d6+1>>');
            return;
        }

        // 주사위를 던지는 횟수와 주사위의 값들, 그리고 자연수들을 저장할 배열
        let rolls = [];
        let numbers = [];

        let total = 0;

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
                numbers.push(number);
                total += number;
            }
        });

        const rollArray = rolls.join(' + ');
        const numberArray = numbers.join(' + ');

        msg.react(emojiReaction);       
        msg.author.send(`>>> 🤫 : [ ${rollArray} ${numbers.length > 0 ? '+ ' + numberArray : ''} ]\n${total}`);
    }
};