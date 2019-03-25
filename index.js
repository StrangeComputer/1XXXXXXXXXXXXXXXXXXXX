const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = `<@559331913005924355>`; 
const creator = `327872942124040192`;

function err (reason, missPerms) {
  if (!missPerms) {
      const embed = new Discord.RichEmbed()
      .setTitle("Произошла ошибка")
      .setColor("282b30")
      .setDescription('Причина : **' + reason + '**')
      .setTimestamp();
      return message.channel.send({embed})
  }
  const embed = new Discord.RichEmbed()
      .setTitle("Недостаточно прав")
      .setColor("282b30")
      .setDescription('Вы не можете использовать эту команду\nУ вас должно быть право `' + missPerms + '`')
      .setTimestamp();
      return message.channel.send({embed})
} 

function crank() {
  client.guilds.get('535752951948378113').channels.get('535752951948378115').send('Кому ранги на креативе выдать?)))');
  
  }
  
  function crankfalse() {
      client.guilds.get('535752951948378113').channels.get('535752951948378115').send('Ой, никого нет, какая досада, а я хотела элиту выдать(((((');
  }  

client.on('ready', () => {
	console.log('//------------------//');
    console.log('Бот запущен успешно.');
    console.log('');
    console.log('Краткая информация:');
    console.log('- Авторизован как ' + client.user.tag);
    console.log('//------------------//');
    client.user.setPresence({game: {name: null}}).catch(o_O=>{});
    client.user.setStatus('idle');
    crank();
    setInterval(crank, 86400000);
    crankfalse();
    setInterval(crankfalse, 86410000);

});
 
client.on('message', message => {
  
    if (message.author.bot) return;
    let prefixes = ['Лина ', 'Лина', 'Милашка', 'Милашка ', 'Лина, ', 'Милашка, ', 'Лина,', 'Милашка,', 'MilaFFka ', 'MilaFFka, ', 'MilaFFka', '<@559331913005924355>'];
    let prefix = false;
    prefixes.forEach(prefix_ => {
        if (message.content.startsWith(prefix_)) {
            prefix = prefix_;
        }
    })
    if (prefix === false) return;

  if(message.content.indexOf(prefix) !== 0) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === 'say') {
    message.delete();
    message.channel.send(args.join(" ")).catch(() => {return err('Не указано сообщение')});
}

if (command === "setav"){
  client.user.setAvatar('https://cdn.discordapp.com/attachments/475264609230782464/514493999634186250/72ed55cec194dbe359fa755a2380dd97.jpg');
}

if(command === ""){
    if(message.member.roles.has('536309904261251110')) return message.author.send("Ох простите меня, я не специально");
    let authcode = [`очень жаль, но ты мудила`,`ну ты и объебок`,`а ты хуесос однако `,`ты похуже Гитлера`,`шкила, та ещё шкила..`,`ебать ты горячий как в печке`,`у тебя аутизм?`,`я тут ебалась, а ты помешал`,`ну и жирный, ахах`,`ты отброс? ну давай отбросим эти все факты и поедем ко мне`,`вы подо мной`,`я бы с тобой на парад эщкере не пошла`,`долбаеб обращается ко мне, помогите`,`чёртила ходячья`,`ты моя ссанина`];
    let rac = Math.floor(Math.random() * authcode.length);
    message.channel.send(`${authcode[rac]}`);
}

if (command === 'eval') {
  if (message.author.id !== creator) return message.channel.send('Доступ запрещен.');
  const code = args.join(" ").replace(/client\.token|client\[.token.\]/ig, 'process.env.TOKEN');        
  const token = client.token.split("").join("[^]{0,2}");
  const rev = client.token.split("").reverse().join("[^]{0,2}");
  const filter = new RegExp(`${token}|${rev}`, "g");
  try {
      let output = eval(code);
      if (output instanceof Promise || (Boolean(output) && typeof output.then === "function" && typeof output.catch === "function")) output = output;
      output = inspect(output, { depth: 0, maxArrayLength: null });
      output = output.replace(filter, "[TOKEN]");
      output = clean(output);
      if (output.length < 1950) message.channel.send(`\`\`\`js\n${output}\n\`\`\``).then(() => {message.react("✅")});
      else message.channel.send(`${output}`, {split:"\n", code:"js"});
  } catch (error) {message.channel.send(`Анхэндлэд промайз риджекшн ворнинг \`\`\`js\n${error}\`\`\``).then(() => {message.react("❎");});}
  function clean(text)  {
      return text
          .replace(/`/g, "`" + String.fromCharCode(8203))
          .replace(/@/g, "@" + String.fromCharCode(8203));
  }
}

});

client.login(process.env.TOKEN);