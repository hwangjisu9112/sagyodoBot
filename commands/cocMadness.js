// !cm를 입력하면 <크툴루의 부름>의 탐사자의 광기에 대한 무작위 표를 표시합니다.
const { Client, Intents, MessageEmbed } = require("discord.js");
const M = require("./cocMadness.json");
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });


