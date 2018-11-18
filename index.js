const Discord = require('discord.js');
const client = new Discord.Client();

function work() {
client.guilds.get('444804338460786688').channels.get('445135163257651211').send('.work');
}

function slut() {
    client.guilds.get('444804338460786688').channels.get('445135163257651211').send('.slut');
}

function crime() {
    client.guilds.get('444804338460786688').channels.get('445135163257651211').send('.crime');
}

function giveMoney() {
    client.guilds.get('444804338460786688').channels.get('445135163257651211').send('.give-money <@421944342048014366> all');
}

client.on('ready', () => {
work();
setInterval(work, 28800000);
});

client.on('ready', () => {
    slut();
    setInterval(slut, 28860000);
 });

 client.on('ready', () => {
    crime();
    setInterval(crime, 28890000);
 });

 client.on('ready', () => {
    giveMoney();
    setInterval(giveMoney, 2889000);
 });
 
 client.on('ready', () => {
	console.log('Bot loaded');
    client.user.setPresence({game: {name: null}}).catch(o_O=>{});
    client.user.setStatus('invisible');
});

client.login(process.env.TOKEN);