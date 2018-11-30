const Discord = require('discord.js');
const client = new Discord.Client();

function rep() {
client.guilds.get('438026942068031490').channels.get('518139909685379102').send('.rep <@327872942124040192>');
}

function dailyMoney() {
    client.guilds.get('438026942068031490').channels.get('518139909685379102').send('.daily');
}

function silverName() {
    client.guilds.get('438026942068031490').channels.get('518139909685379102').send('Да-да я');
}

function giveMoney() {
    client.guilds.get('444804338460786688').channels.get('445135163257651211').send('.credits <@327872942124040192> 200');
}

client.on('ready', () => {
rep();
setInterval(rep, 86400000);
});

client.on('ready', () => {
    dailyMoney();
    setInterval(dailyMoney, 86400000);
 });

 client.on('ready', () => {
    silverName();
    setInterval(silverName, 28800000);
 });

 client.on('ready', () => {
    giveMoney();
    setInterval(giveMoney, 43200000);
 });
 
 client.on('ready', () => {
	console.log('Bot loaded');
    client.user.setPresence({game: {name: null}}).catch(o_O=>{});
    client.user.setStatus('invisible');
});

client.login(process.env.TOKEN);