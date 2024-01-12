// ! 1d100과 같은 명령어를 입력하면 유저가 원하는 무작위 주사위를 던질 수 있습니다.

module.exports = {
    name: 'r',
    description: '주사위',
    execute: function (msg, args) {
        // 유저가 입력한 명령어를 분석 (!1d5 => [1, 5])
        const [times, value] = args[0].toLowerCase().split('d').map(str => parseInt(str, 10));


        if (isNaN(times) || isNaN(value) || times < 0 || value < 0 || !Number.isInteger(value)) {
            msg.channel.send('🤔 유효한 숫자를 입력해주세요. <<예: !r 1d6>>');
            return;
        }

        let roll = [];
        let total = 0;
        for (let i = 0; i < times; i++) {
            const rollValue = Math.floor(Math.random() * value) + 1;
            roll.push(rollValue);
            total += rollValue;

        }
        const rollArray = roll.join(' + ');
        msg.channel.send(`🥠 : ${total},  [ ${rollArray} ]`);
    },
};