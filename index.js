const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const fs = require('fs');
const economy = require('discord-eco');
const forEachTimeout = require('foreach-timeout');


let p = "$"

let currency = '₳'

let ADM = '503340531481313321'
let MOD = '503340542160273419'

let cooldown = new Set();
let cdseconds = 5

const bot_name = 'Mr. Cash';
let version = 'v1.0.0'


client.on("ready", () => {
    console.log(`test bot start working!`);
});

client.on('message', message => {
    if(message.channel.type !== 'text') return;
    if(message.channel.id === '482262654845452298') return;
    if (message.author.bot) return;
    if(message.content.indexOf(p) !== 0) return;
    const vote = message.content.slice(p.length).trim().split(/;+/g);
    const args = message.content.slice(p.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if (cooldown.has(message.author.id)) {
        message.reply('Ошибка. Причина **Вы не можете использовать эту команду так часто. Её можно использовать раз в 10 секунд**')
        return
    }
    if (!message.member.hasPermission("ADMINISTRATOR")) {
        cooldown.add(message.author.id);
    }

    if (['Баланс', 'Деньги', 'баланс', 'деньги', 'бАланс', 'дЕньги', 'баЛанс', 'деНьги', 'Счёт', 'счёт', 'сЧёт'].includes(command)) {
        let user = message.mentions.members.first(); 
        const embed = new Discord.RichEmbed()
            if (!user) {
                embed.setAuthor(message.member.displayName, message.author.avatarURL);
                user = message.author
            } else {
                embed.setAuthor(user.displayName, user.user.avatarURL)
            }
            economy.fetchBalance(user.id + message.guild.id).then((i) => {
            embed.setFooter(bot_name + " | " + version )
            .setColor("FF7F00") 
            .addField('Баланс', '**' + i.money + ' ' +currency + '**',true)
        message.channel.send({embed})
    })
}

if (['добавить-денег', 'прибавить-денег', 'дд', 'пд', 'Добавить-денег', 'Прибавить-денег', 'ДД', 'ПД'].includes(command)) {
    let user = message.mentions.members.first(); 
    if (message.member.roles.some(r=>[MOD, ADM].includes(r.id))) {
        if (!args[0]) {
            message.channel.send(`**Вы забыли указать пользователя. $добавить-денег <пользователь> <количество>**`);
            return;
        }
        if (isNaN(args[1])) {
            message.channel.send(`**Вы забыли указать количество. $добавить-денег <пользователь> <количество>**`);
            return; 
        }
        let defineduser = '';
        if (!args[0]) { 
            defineduser = message.author.id;
        } else { 
            let firstMentioned = message.mentions.users.first();
            defineduser = firstMentioned.id;
        }
        economy.updateBalance(defineduser + message.guild.id, parseInt(args[1])).then((i) => { 
            message.channel.send(`**Пользователь получил ${args[1]}${currency} успешно**`)
        });    
    } else {
        message.reply('Ошибка. Причина: **У вас недостаточно прав для использования этой команды.**')
    }
}

if (['вернуть-деньги', 'вернуть-средства', 'вд','вс','Вернуть-деньги', 'Вернуть-средства', 'ВД','ВС'].includes(command)) {
    let user = message.mentions.members.first(); 
    if (message.member.roles.some(r=>[MOD, ADM].includes(r.id))) {
        if (!args[0]) {
            message.channel.send(`**Вы забыли указать пользователя. $вернуть-деньги <пользователь> <количество>**`);
            return;
        }
        if (isNaN(args[1])) {
            message.channel.send(`**Вы забыли указать количество. $вернуть-деньги <пользователь> <количество>**`);
            return; 
        }
        let defineduser = '';
        if (!args[0]) { 
            defineduser = message.author.id;
        } else { 
            let firstMentioned = message.mentions.users.first();
            defineduser = firstMentioned.id;
        }
        economy.updateBalance(defineduser + message.guild.id, -parseInt(args[1])).then((i) => { 
            message.channel.send(`**Списано ${args[1]}${currency} со счета ` + user + ` успешно**`)
        });    
    } else {
        message.reply('Ошибка. Причина: **У вас недостаточно прав для использования этой команды.**')
    }
}

if (['заплатить', 'передать-деньги', 'отправить-деньги', 'од', 'Передать-деньги', 'Заплатить' ,'Отправить-деньги','ОД',].includes(command)) {
    if (!args[0]) {
        message.channel.send(`**Вы забыли указать пользователя. =заплатить <пользователь> <количество>**`);
        return;
    }
    if (isNaN(args[1])) {
        message.channel.send(`**Вы забыли указать количество. =заплатить <пользователь> <количество>**`);
        return; 
    }
    let defineduser = '';
    if (!args[0]) { 
        defineduser = message.author.id;
    } else { 
        let firstMentioned = message.mentions.users.first();
        defineduser = firstMentioned.id;
    }    
    economy.fetchBalance(message.author.id + message.guild.id, parseInt(args[1])).then((i) => {
        if (i.money <= args[1]) return message.channel.send('**Ты не можешь заплатить больше денег чем ты имеешь -_-. У тебя лишь ' + i.money + currency + '. А ты хочешь заплатить ' + args[1] + currency + '**');
        //economy.updateBalance(defineduser + message.guild.id, parseInt(args[1])).then((i) => { 
            message.channel.send(`**Вы дали ${args[1]}${currency} ` + user + `**`)
        //});
        economy.updateBalance(message.author.id + message.guild.id, -parseInt(args[1]))
    })
}

});
client.login(config.token);