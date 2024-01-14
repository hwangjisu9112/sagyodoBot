// ! 1d100과 같은 명령어를 입력하면 유저가 원하는 무작위 주사위를 던질 수 있습니다.
module.exports = {
    name: 'r',
    description: '주사위',
    execute: function (msg, args) {


        // 유저가 입력한 명령어를 분석 (!1d5+1d4 => [[1, 5], [1, 4]])
        const matches = args[0].toLowerCase().matchAll(/(\d+)d(\d+)/g);
        const rolls = [];

        for (const match of matches) {
            const times = parseInt(match[1], 10);
            const value = parseInt(match[2], 10);

            if (isNaN(times) || isNaN(value) || times < 0 || value < 0 || !Number.isInteger(value)) {
                msg.channel.send('🤔 유효한 숫자를 입력해주세요. <<예: !r 1d6+1d4>>');
                return;
            }

            let roll = [];
            let result = 0;

            // 가상 주사위

            for (let i = 0; i < times; i++) {
                const rollValue = Math.floor(Math.random() * value) + 1;
                roll.push(rollValue);
                result += rollValue;
            }

            rolls.push({ result, roll });
        }

        const total = rolls.reduce((acc, curr) => acc + curr.result, 0);
        const formattedRolls = rolls.map(rollData => `[ ${rollData.roll.join(' + ')} ]`).join(' + ');

        msg.channel.send(`🥠 : ${total}  [ ${formattedRolls} ]`);
    },
};