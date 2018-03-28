const Discord = require('discord.js');
const client = new Discord.Client();
const filter = require('./filter.json');
const fs = require('fs');

let prefix = '+';
let points = JSON.parse(fs.readFileSync("./points.json", "utf8"));
let warns = JSON.parse(fs.readFileSync("./warns.json", "utf8"));
let trade = JSON.parse(fs.readFileSync("./trade.json", "utf8"));

client.on('ready',() => {
  console.log('I am ready...');
});

client.on('message', async message => {

if (message.channel.type === "dm") return;
if (message.author.bot) return;

let args = message.content.split(' ').slice(1);
var argresult = args.join(' ');
let guild = message.guild;

if (!points[message.author.id]) points[message.author.id] = {
    points: 0,
    level: 0,
    inventory: "empty",
    invsetter: 0,
    etime: 0
  };
  points[message.author.id].points++;

  if (message.content.startsWith(prefix)) {
  let timesave = points[message.author.id].etime;
  points[message.author.id].etime = Date.now();
  if (timesave - points[message.author.id].etime > -10000) {
    message.channel.send('You are using commands to fast, please slow down!');
    return;
  }
}

  if (message.content.toLowerCase().startsWith(prefix + 'points')) {
    message.delete();
    let mentioned = message.mentions.members.first();
    if (mentioned) {
      if (!points[mentioned.id]) points[mentioned.id] = {
          points: 0,
          level: 0,
          inventory: "empty",
          invsetter: 0
        };
      const embed = new Discord.RichEmbed()
      .setTitle(`PracticePoint Counter`)
      .setColor(0x009933)
      .addField('``Points of:``', mentioned.displayName, true)
      .addField('``Collection:``', points[mentioned.id].points + ' Points', true);
      message.channel.send({embed}).catch(console.error);
      return;
    }
    const embed = new Discord.RichEmbed()
    .setTitle(`PracticePoint Counter`)
    .setColor(0x009933)
    .addField('``Points of:``', message.author.username, true)
    .addField('``Collection:``', points[message.author.id].points + ' Points', true)
    message.channel.send({embed});
  };

  if (message.content.toLowerCase() === prefix + 'buy 👀') {
    message.delete();
    if (points[message.author.id].invsetter === 0) {
      message.channel.send('You must use the .inventory command before you can buy items.');
      return;
    }
    if (JSON.stringify(points[message.author.id].inventory).indexOf('👀') > -1) {
      const embed = new Discord.RichEmbed()
      .setTitle('Already Purchased')
      .setColor(0x009933)
      .setDescription('You have already purchased 👀, look in your inventory!');

      message.channel.send({embed});
      return;
    }
    if (points[message.author.id].points < 5) {
      message.reply(`I'm sorry, you do not have enough points to buy 👀.`);
      return;
    } else {
      if (points[message.author.id].points >= 5) {
        if (points[message.author.id].inventory === "empty") {
          const embed = new Discord.RichEmbed()
          .setTitle('Shop')
          .setColor(0x009933)
          .setDescription(`${message.author.username} has purchased 👀 for 5 points!`)

          message.channel.send({embed});

        points[message.author.id].inventory = "👀";
        var i;
        for (i = 0; i <= 5; i++) {
          points[message.author.id].points--;
          }
        return;
        }
        const embed = new Discord.RichEmbed()
        .setTitle('Shop')
        .setColor(0x009933)
        .setDescription(`${message.author.username} has purchased 👀 for 5 points!`)

        message.channel.send({embed});

        points[message.author.id].inventory = points[message.author.id].inventory + ", 👀";
        var i;
        for (i = 0; i < 5; i++) {
          points[message.author.id].points--;
        }
      };
    };
  };

  if (message.content.toLowerCase() === prefix + 'buy 😏') {
    message.delete();
    if (points[message.author.id].invsetter === 0) {
      message.channel.send('You must use the .inventory command before you can buy items.');
      return;
    }
    if (JSON.stringify(points[message.author.id].inventory).indexOf('😏') > -1) {
      const embed = new Discord.RichEmbed()
      .setTitle('Already Purchased')
      .setColor(0x009933)
      .setDescription('You have already purchased 😏, look in your inventory!');

      message.channel.send({embed});
      return;
    }
    if (points[message.author.id].points < 200) {
      message.reply(`I'm sorry, you do not have enough points to buy 😏.`);
      return;
    } else {
      if (points[message.author.id].points >= 200) {
        if (points[message.author.id].inventory === "empty") {
          const embed = new Discord.RichEmbed()
          .setTitle('Shop')
          .setColor(0x009933)
          .setDescription(`${message.author.username} has purchased 😏 for 200 points!`)

          message.channel.send({embed});

          points[message.author.id].inventory = "😏";
          var i;
          for (i = 0; i <= 200; i++) {
          points[message.author.id].points--;
          }
        return;
        }
        const embed = new Discord.RichEmbed()
        .setTitle('Shop')
        .setColor(0x009933)
        .setDescription(`${message.author.username} has purchased 😏 for 200 points!`)

        message.channel.send({embed});

        points[message.author.id].inventory = points[message.author.id].inventory + ", 😏";
        var i;
        for (i = 0; i < 200; i++) {
          points[message.author.id].points--;
        }
      };
    };
  };

  if (message.content.toLowerCase().startsWith(prefix + 'inventory')) {
  message.delete();
  let mentioned = message.mentions.members.first();
  if (mentioned) {
    if (!points[mentioned.id]) points[mentioned.id] = {
        points: 0,
        level: 0,
        inventory: "empty",
        invsetter: 0
      };
    const embed = new Discord.RichEmbed()
    .setTitle(`${mentioned.displayName}'s Inventory:`)
    .setColor(0x009933)
    .addField('``Items:``', points[mentioned.id].inventory, true);
    message.channel.send({embed});
    return;
  }
  if (points[message.author.id].invsetter === 0) {
    points[message.author.id].inventory = "empty";
    points[message.author.id].invsetter++;
  }
  const embed = new Discord.RichEmbed()
  .setTitle(`${message.author.username}'s Inventory:`)
  .setColor(0x009933)
  .addField('``Items:``', points[message.author.id].inventory, true);
  message.channel.send({embed});
}

if (message.content.toLowerCase() === prefix + 'shop') {
  message.delete();
  const embed = new Discord.RichEmbed()
  .setTitle('Points Shop')
  .setColor(0x009933)
  .setThumbnail("https://cdn.discordapp.com/attachments/417440013387825156/427166443507810304/unknown.png")
  .addField('👀', '[5 points]', true)
  .addField('😏', '[200 points]', true)
  .setFooter('To buy an item use ``.buy :emoji:``');
  message.channel.send({embed});
}

if (message.content.toLowerCase().startsWith(prefix + 'takepoints')) {
  if (message.author.id !== '314146155564892160') return;
  message.delete();
  let mentioned = message.mentions.members.first();
  if (!mentioned) return;
  let args = message.content.split(' ').slice(2);
  var argresult = args.join(' ');

  if (points[mentioned.id].points < argresult) {
    message.channel.send(`${mentioned} only has ${points[mentioned.id].points} points, please pick a smaller amount to deduct!`);
    return;
  }
  if (!Number.isInteger(parseInt(argresult))) {
    message.channel.send('You need to enter a number!');
    return;
  }

  points[mentioned.id].points = points[mentioned.id].points - parseInt(argresult);
  message.channel.send(`${argresult} points have been deducted from ${mentioned.displayName}'s account!`)
}

if (message.content.toLowerCase().startsWith(prefix + 'addpoints')) {
  if (message.author.id !== '314146155564892160') return;
  message.delete();
  let mentioned = message.mentions.members.first();
  if (!mentioned) return;
  let args = message.content.split(' ').slice(2);
  var argresult = args.join(' ');

  if (!Number.isInteger(parseInt(argresult))) {
    message.channel.send('You need to enter a number!');
    return;
  }

    points[mentioned.id].points = points[mentioned.id].points + parseInt(argresult);
    message.channel.send(`${argresult} points have been added to ${mentioned.displayName}'s account!`)
}

if (message.content.toLowerCase().startsWith(prefix + 'setpoints')) {
  if (message.author.id !== '314146155564892160') return;
  message.delete()
  let mentioned = message.mentions.members.first();
  if (!mentioned) return;
  let prevpoints = points[mentioned.id].points;
  let args = message.content.split(' ').slice(2);
  var argresult = args.join(' ');

  if (!Number.isInteger(parseInt(argresult))) {
    message.channel.send('You need to enter a number!');
    return;
  }
  if (parseInt(argresult) < 0) {
    message.channel.send('You cannot set someones points below 0!');
    return;
  }
  points[mentioned.id].points = parseInt(argresult);
  message.channel.send(`${mentioned.displayName}'s points were set to ${argresult}! The account previously had ${prevpoints} points.`)
}

  if (message.content.toLowerCase().startsWith(prefix + 'trade')) {
    message.delete()
    let mentioned = message.mentions.members.first()
    if (!mentioned) return;
    if (!points[mentioned.id]) points[mentioned.id] = {
        points: 0,
        level: 0,
        inventory: "empty",
        invsetter: 0
      };
    let args = message.content.split(' ').slice(2,3);
    var argresult = args.join(' ');
    let args2 = message.content.split(' ').slice(3);
    var argresult2 = args2.join(' ');

    if (!Number.isInteger(parseInt(argresult2))) {
      message.channel.send('You must enter a number of points to trade!')
      return;
    }

    if (!trade[message.author.id]) trade[message.author.id] = {
      trade: 0,
      tradereq: 0
    }

    if (JSON.stringify(points[message.author.id].inventory).indexOf(argresult) > -1) {
      if (trade[message.author.id].trade === 1) {
        message.channel.send('You already have an open trade request, please close it before you start another!')
        return;
      }
      trade[message.author.id].trade++;
      trade[mentioned.id].tradereq++;
      message.channel.send(`${message.author.username} would like to trade his ${argresult} with ${mentioned.displayName} for ${argresult2} points! Use .tradeaccept ${message.author} ${argresult} ${argresult2} to accept the trade request.`)
    } else {
      message.channel.send('This item does not exist OR you do not have it in your inventory, so you cannot trade it!')
      return
    }

    fs.writeFile("./trade.json", JSON.stringify(trade), (err) => {
      if (err) console.error(err)
    });
  }

  if(message.content.toLowerCase().startsWith(prefix + 'canceltrade')) {
    message.delete();
    let mentioned = message.mentions.members.first();
    if (!mentioned) return;

  if (trade[message.author.id].trade === 1 && trade[mentioned.id].tradereq > 0) {
    message.reply(`your trade request with ${mentioned} has been canceled!`);
    trade[message.author.id].trade--;
    trade[mentioned.id].tradereq--;
  } else {
    message.reply(`you have no previous trade requests with ${mentioned}!`)
    return;
    }

    fs.writeFile("./trade.json", JSON.stringify(trade), (err) => {
      if (err) console.error(err)
    });
  }

  if (message.content.toLowerCase().startsWith(prefix + 'accepttrade')) {
    message.delete();
    let mentioned = message.mentions.members.first();
    if (!mentioned) return;
    if (!points[mentioned.id]) points[mentioned.id] = {
        points: 0,
        level: 0,
        inventory: "empty",
        invsetter: 0
      };
    let args = message.content.split(' ').slice(2,3);
    var argresult = args.join(' ');
    let args2 = message.content.split(' ').slice(3);
    var argresult2 = args2.join(' ');

    if (argresult2 > points[message.author.id].points) {
      message.channel.send('You do not have enough points to complete this trade. The trade will now be cancelled!');
      trade[message.author.id].tradereq--;
      trade[mentioned.id].trade--;
      fs.writeFile("./trade.json", JSON.stringify(trade), (err) => {
        if (err) console.error(err)
      });
      return;
    }

    if (JSON.stringify(points[message.author.id].inventory).indexOf(argresult) > -1) {
      message.channel.send('You cannot trade for an item that you already have! Check your inventory!');
      trade[message.author.id].tradereq--;
      trade[mentioned.id].trade--;
      fs.writeFile("./trade.json", JSON.stringify(trade), (err) => {
        if (err) console.error(err)
      });
      return;
    }

    if (JSON.stringify(points[mentioned.id].inventory).indexOf(argresult) > -1) {
      message.channel.send(`${mentioned.displayName} has traded ${argresult} with ${message.author.username} for ${argresult2}!`);
      trade[message.author.id].tradereq--;
      trade[mentioned.id].trade--;
      points[mentioned.id].inventory = points[mentioned.id].inventory - (", " + argresult);
      points[message.author.id].inventory = points[message.author.id].inventory + (", " + argresult);
      points[message.author.id].points = points[message.author.id].points - argresult2;
      points[mentioned.id].points = points[mentioned.id].points + argresult2;
    } else {
      message.channel.send(`${mentioned.displayName} no longer has the requested trade item in their inventory! The trade will now be cancelled!`);
      trade[message.author.id].tradereq--;
      trade[mentioned.id].trade--;
      fs.writeFile("./trade.json", JSON.stringify(trade), (err) => {
        if (err) console.error(err)
      });
      return;
    }

    fs.writeFile("./trade.json", JSON.stringify(trade), (err) => {
      if (err) console.error(err)
    });
  }

  if (message.content.toLowerCase() === prefix + 'levelup') {
    if (points[message.author.id].level === 0){
      if (points[message.author.id].points < 100) {
        message.channel.send(`You only have ${points[message.author.id].points}, you need 100 to level up!`)
        return;
      }
      points[message.author.id].level++;
      message.channel.send('You have successfully leveled up to the asteroidette rank!')
      fs.writeFile("./points.json", JSON.stringify(points), (err) => {
        if (err) console.error(err)
      });
      return;
    }
    if (points[message.author.id].level === 1){
      if (points[message.author.id].points < 500) {
        message.channel.send(`You only have ${points[message.author.id].points}, you need 500 to level up!`)
        return;
      }
      points[message.author.id].level++;
      message.channel.send('You have successfully leveled up to the asteroidling rank!')
      fs.writeFile("./points.json", JSON.stringify(points), (err) => {
        if (err) console.error(err)
      });
      return;
    }
    if (points[message.author.id].level === 2){
      if (points[message.author.id].points < 1500) {
        message.channel.send(`You only have ${points[message.author.id].points}, you need 1500 to level up!`)
        return;
      }
      points[message.author.id].level++;
      message.channel.send('You have successfully leveled up to the asteroid rank!')
      fs.writeFile("./points.json", JSON.stringify(points), (err) => {
        if (err) console.error(err)
      });
      return;
    }
    if (points[message.author.id].level === 3){
      if (points[message.author.id].points < 3750) {
        message.channel.send(`You only have ${points[message.author.id].points}, you need 3750 to level up!`)
        return;
      }
      points[message.author.id].level++;
      message.channel.send('You have successfully leveled up to the grand asteroid rank!')
      fs.writeFile("./points.json", JSON.stringify(points), (err) => {
        if (err) console.error(err)
      });
      return;
    }
    if (points[message.author.id].level === 4){
      if (points[message.author.id].points < 8300) {
        message.channel.send(`You only have ${points[message.author.id].points}, you need 8300 to level up!`)
        return;
      }
      points[message.author.id].level++;
      message.channel.send('You have successfully leveled up to the cometlette rank!')
      fs.writeFile("./points.json", JSON.stringify(points), (err) => {
        if (err) console.error(err)
      });
      return;
    }
    if (points[message.author.id].level === 5){
      if (points[message.author.id].points < 10000) {
        message.channel.send(`You only have ${points[message.author.id].points}, you need 10000 to level up!`)
        return;
      }
      points[message.author.id].level++;
      message.channel.send('You have successfully leveled up to the cometette rank!')
      fs.writeFile("./points.json", JSON.stringify(points), (err) => {
        if (err) console.error(err)
      });
      return;
    }
    if (points[message.author.id].level === 6){
      if (points[message.author.id].points < 14700) {
        message.channel.send(`You only have ${points[message.author.id].points}, you need 14700 to level up!`)
        return;
      }
      points[message.author.id].level++;
      message.channel.send('You have successfully leveled up to the cometling rank!')
      fs.writeFile("./points.json", JSON.stringify(points), (err) => {
        if (err) console.error(err)
      });
      return;
    }
    if (points[message.author.id].level === 7){
      if (points[message.author.id].points < 20500) {
        message.channel.send(`You only have ${points[message.author.id].points}, you need 20500 to level up!`)
        return;
      }
      points[message.author.id].level++;
      message.channel.send('You have successfully leveled up to the comet rank!')
      fs.writeFile("./points.json", JSON.stringify(points), (err) => {
        if (err) console.error(err)
      });
      return;
    }
    if (points[message.author.id].level === 8){
      if (points[message.author.id].points < 24000) {
        message.channel.send(`You only have ${points[message.author.id].points}, you need 24000 to level up!`)
        return;
      }
      points[message.author.id].level++;
      message.channel.send('You have successfully leveled up to the grand comet rank!')
      fs.writeFile("./points.json", JSON.stringify(points), (err) => {
        if (err) console.error(err)
      });
      return;
    }
    if (points[message.author.id].level === 9){
      if (points[message.author.id].points < 29000) {
        message.channel.send(`You only have ${points[message.author.id].points}, you need 29000 to level up!`)
        return;
      }
      points[message.author.id].level++;
      message.channel.send('You have successfully leveled up to the starlette rank!')
      fs.writeFile("./points.json", JSON.stringify(points), (err) => {
        if (err) console.error(err)
      });
      return;
    }
    if (points[message.author.id].level === 10){
      if (points[message.author.id].points < 38250) {
        message.channel.send(`You only have ${points[message.author.id].points}, you need 38250 to level up!`)
        return;
      }
      points[message.author.id].level++;
      message.channel.send('You have successfully leveled up to the starette rank!')
      fs.writeFile("./points.json", JSON.stringify(points), (err) => {
        if (err) console.error(err)
      });
      return;
    }
    if (points[message.author.id].level === 11){
      if (points[message.author.id].points < 42000) {
        message.channel.send(`You only have ${points[message.author.id].points}, you need 42000 to level up!`)
        return;
      }
      points[message.author.id].level++;
      message.channel.send('You have successfully leveled up to the starling rank!')
      fs.writeFile("./points.json", JSON.stringify(points), (err) => {
        if (err) console.error(err)
      });
      return;
    }
    if (points[message.author.id].level === 12){
      if (points[message.author.id].points < 45000) {
        message.channel.send(`You only have ${points[message.author.id].points}, you need 45000 to level up!`)
        return;
      }
      points[message.author.id].level++;
      message.channel.send('You have successfully leveled up to the star rank!')
      fs.writeFile("./points.json", JSON.stringify(points), (err) => {
        if (err) console.error(err)
      });
      return;
    }
    if (points[message.author.id].level === 13){
      if (points[message.author.id].points < 49450) {
        message.channel.send(`You only have ${points[message.author.id].points}, you need 49450 to level up!`)
        return;
      }
      points[message.author.id].level++;
      message.channel.send('You have successfully leveled up to the grand star rank!')
      fs.writeFile("./points.json", JSON.stringify(points), (err) => {
        if (err) console.error(err)
      });
      return;
    }
    if (points[message.author.id].level === 14){
      if (points[message.author.id].points < 57200) {
        message.channel.send(`You only have ${points[message.author.id].points}, you need 57200 to level up!`)
        return;
      }
      points[message.author.id].level++;
      message.channel.send('You have successfully leveled up to the moonlette rank!')
      fs.writeFile("./points.json", JSON.stringify(points), (err) => {
        if (err) console.error(err)
      });
      return;
    }
    if (points[message.author.id].level === 16){
      if (points[message.author.id].points < 64000) {
        message.channel.send(`You only have ${points[message.author.id].points}, you need 64000 to level up!`)
        return;
      }
      points[message.author.id].level++;
      message.channel.send('You have successfully leveled up to the moonette rank!')
      fs.writeFile("./points.json", JSON.stringify(points), (err) => {
        if (err) console.error(err)
      });
      return;
    }
    if (points[message.author.id].level === 16){
      if (points[message.author.id].points < 73000) {
        message.channel.send(`You only have ${points[message.author.id].points}, you need 73000 to level up!`)
        return;
      }
      points[message.author.id].level++;
      message.channel.send('You have successfully leveled up to the moonling rank!')
      fs.writeFile("./points.json", JSON.stringify(points), (err) => {
        if (err) console.error(err)
      });
      return;
    }
    if (points[message.author.id].level === 17){
      if (points[message.author.id].points < 79500) {
        message.channel.send(`You only have ${points[message.author.id].points}, you need 79500 to level up!`)
        return;
      }
      points[message.author.id].level++;
      message.channel.send('You have successfully leveled up to the moon rank!')
      fs.writeFile("./points.json", JSON.stringify(points), (err) => {
        if (err) console.error(err)
      });
      return;
    }
    if (points[message.author.id].level === 18){
      if (points[message.author.id].points < 90000) {
        message.channel.send(`You only have ${points[message.author.id].points}, you need 90000 to level up!`)
        return;
      }
      points[message.author.id].level++;
      message.channel.send('You have successfully leveled up to the grand moon rank!')
      fs.writeFile("./points.json", JSON.stringify(points), (err) => {
        if (err) console.error(err)
      });
      return;
    }
    if (points[message.author.id].level === 19){
      if (points[message.author.id].points < 101500) {
        message.channel.send(`You only have ${points[message.author.id].points}, you need 101500 to level up!`)
        return;
      }
      points[message.author.id].level++;
      message.channel.send('You have successfully leveled up to the planetlette rank!')
      fs.writeFile("./points.json", JSON.stringify(points), (err) => {
        if (err) console.error(err)
      });
      return;
    }
    if (points[message.author.id].level === 20){
      if (points[message.author.id].points < 110000) {
        message.channel.send(`You only have ${points[message.author.id].points}, you need 110000 to level up!`)
        return;
      }
      points[message.author.id].level++;
      message.channel.send('You have successfully leveled up to the planetette rank!')
      fs.writeFile("./points.json", JSON.stringify(points), (err) => {
        if (err) console.error(err)
      });
      return;
    }
    if (points[message.author.id].level === 21){
      if (points[message.author.id].points < 122760) {
        message.channel.send(`You only have ${points[message.author.id].points}, you need 122760 to level up!`)
        return;
      }
      points[message.author.id].level++;
      message.channel.send('You have successfully leveled up to the planetling rank!')
      fs.writeFile("./points.json", JSON.stringify(points), (err) => {
        if (err) console.error(err)
      });
      return;
    }
    if (points[message.author.id].level === 22){
      if (points[message.author.id].points < 134900) {
        message.channel.send(`You only have ${points[message.author.id].points}, you need 134900 to level up!`)
        return;
      }
      points[message.author.id].level++;
      message.channel.send('You have successfully leveled up to the planet rank!')
      fs.writeFile("./points.json", JSON.stringify(points), (err) => {
        if (err) console.error(err)
      });
      return;
    }
    if (points[message.author.id].level === 23){
      if (points[message.author.id].points < 150000) {
        message.channel.send(`You only have ${points[message.author.id].points}, you need 150000 to level up!`)
        return;
      }
      points[message.author.id].level++;
      message.channel.send('You have successfully leveled up to the grand planet rank!')
      fs.writeFile("./points.json", JSON.stringify(points), (err) => {
        if (err) console.error(err)
      });
      return;
    }
    if (points[message.author.id].level === 24){
      if (points[message.author.id].points < 165000) {
        message.channel.send(`You only have ${points[message.author.id].points}, you need 165000 to level up!`)
        return;
      }
      points[message.author.id].level++;
      message.channel.send('You have successfully leveled up to the irregular galaxy rank!')
      fs.writeFile("./points.json", JSON.stringify(points), (err) => {
        if (err) console.error(err)
      });
      return;
    }
    if (points[message.author.id].level === 25){
      if (points[message.author.id].points < 185435) {
        message.channel.send(`You only have ${points[message.author.id].points}, you need 185435 to level up!`)
        return;
      }
      points[message.author.id].level++;
      message.channel.send('You have successfully leveled up to the spiral galaxy rank!')
      fs.writeFile("./points.json", JSON.stringify(points), (err) => {
        if (err) console.error(err)
      });
      return;
    }
    if (points[message.author.id].level === 26){
      if (points[message.author.id].points < 200000) {
        message.channel.send(`You only have ${points[message.author.id].points}, you need 200000 to level up!`)
        return;
      }
      points[message.author.id].level++;
      message.channel.send('You have successfully leveled up to the elliptical galaxy rank!')
      fs.writeFile("./points.json", JSON.stringify(points), (err) => {
        if (err) console.error(err)
      });
      return;
    }

    if (points[message.author.id].level === 27) {
      message.channel.send('You are already the max level possible. You can`t level up again!')
      return;
    }

  }

  if (message.content.toLowerCase().startsWith(prefix + 'level')) {
    let mentioned = message.mentions.members.first();
    if (mentioned) {
      if (!points[mentioned.id]) points[mentioned.id] = {
          points: 0,
          level: 0,
          inventory: "empty",
          invsetter: 0
        };
      if (points[mentioned.id].level === 0) {
        const embed = new Discord.RichEmbed()
        .setTitle('Level')
        .setColor(0x009933)
        .addField('User:', mentioned.displayName, true)
        .addField('Level:', 'asteroidlette', true);

        message.channel.send({embed});
        return;
      }
      if (points[mentioned.id].level === 1) {
        const embed = new Discord.RichEmbed()
        .setTitle('Level')
        .setColor(0x009933)
        .addField('User:', mentioned.displayName, true)
        .addField('Level:', 'asteroidette', true);

        message.channel.send({embed});
        return;
      }
      if (points[mentioned.id].level === 2) {
        const embed = new Discord.RichEmbed()
        .setTitle('Level')
        .setColor(0x009933)
        .addField('User:', mentioned.displayName, true)
        .addField('Level:', 'asteroidling', true);

        message.channel.send({embed});
        return;
      }
      if (points[mentioned.id].level === 3) {
        const embed = new Discord.RichEmbed()
        .setTitle('Level')
        .setColor(0x009933)
        .addField('User:', mentioned.displayName, true)
        .addField('Level:', 'asteroid', true);

        message.channel.send({embed});
        return;
      }
      if (points[mentioned.id].level === 4) {
        const embed = new Discord.RichEmbed()
        .setTitle('Level')
        .setColor(0x009933)
        .addField('User:', mentioned.displayName, true)
        .addField('Level:', 'grand asteroid', true);

        message.channel.send({embed});
        return;
      }
      if (points[mentioned.id].level === 5) {
        const embed = new Discord.RichEmbed()
        .setTitle('Level')
        .setColor(0x009933)
        .addField('User:', mentioned.displayName, true)
        .addField('Level:', 'cometlette', true);

        message.channel.send({embed});
        return;
      }
      if (points[mentioned.id].level === 6) {
        const embed = new Discord.RichEmbed()
        .setTitle('Level')
        .setColor(0x009933)
        .addField('User:', mentioned.displayName, true)
        .addField('Level:', 'cometette', true);

        message.channel.send({embed});
        return;
      }
      if (points[mentioned.id].level === 7) {
        const embed = new Discord.RichEmbed()
        .setTitle('Level')
        .setColor(0x009933)
        .addField('User:', mentioned.displayName, true)
        .addField('Level:', 'cometling', true);

        message.channel.send({embed});
        return;
      }
      if (points[mentioned.id].level === 8) {
        const embed = new Discord.RichEmbed()
        .setTitle('Level')
        .setColor(0x009933)
        .addField('User:', mentioned.displayName, true)
        .addField('Level:', 'comet', true);

        message.channel.send({embed});
        return;
      }
      if (points[mentioned.id].level === 9) {
        const embed = new Discord.RichEmbed()
        .setTitle('Level')
        .setColor(0x009933)
        .addField('User:', mentioned.displayName, true)
        .addField('Level:', 'grand comet', true);

        message.channel.send({embed});
        return;
      }
      if (points[mentioned.id].level === 10) {
        const embed = new Discord.RichEmbed()
        .setTitle('Level')
        .setColor(0x009933)
        .addField('User:', mentioned.displayName, true)
        .addField('Level:', 'starlette', true);

        message.channel.send({embed});
        return;
      }
      if (points[mentioned.id].level === 11) {
        const embed = new Discord.RichEmbed()
        .setTitle('Level')
        .setColor(0x009933)
        .addField('User:', mentioned.displayName, true)
        .addField('Level:', 'starette', true);

        message.channel.send({embed});
        return;
      }
      if (points[mentioned.id].level === 12) {
        const embed = new Discord.RichEmbed()
        .setTitle('Level')
        .setColor(0x009933)
        .addField('User:', mentioned.displayName, true)
        .addField('Level:', 'starling', true);

        message.channel.send({embed});
        return;
      }
      if (points[mentioned.id].level === 13) {
        const embed = new Discord.RichEmbed()
        .setTitle('Level')
        .setColor(0x009933)
        .addField('User:', mentioned.displayName, true)
        .addField('Level:', 'star', true);

        message.channel.send({embed});
        return;
      }
      if (points[mentioned.id].level === 14) {
        const embed = new Discord.RichEmbed()
        .setTitle('Level')
        .setColor(0x009933)
        .addField('User:', mentioned.displayName, true)
        .addField('Level:', 'grand star', true);

        message.channel.send({embed});
        return;
      }
      if (points[mentioned.id].level === 15) {
        const embed = new Discord.RichEmbed()
        .setTitle('Level')
        .setColor(0x009933)
        .addField('User:', mentioned.displayName, true)
        .addField('Level:', 'moonlette', true);

        message.channel.send({embed});
        return;
      }
      if (points[mentioned.id].level === 16) {
        const embed = new Discord.RichEmbed()
        .setTitle('Level')
        .setColor(0x009933)
        .addField('User:', mentioned.displayName, true)
        .addField('Level:', 'moonette', true);

        message.channel.send({embed});
        return;
      }
      if (points[mentioned.id].level === 17) {
        const embed = new Discord.RichEmbed()
        .setTitle('Level')
        .setColor(0x009933)
        .addField('User:', mentioned.displayName, true)
        .addField('Level:', 'moonling', true);

        message.channel.send({embed});
        return;
      }
      if (points[mentioned.id].level === 18) {
        const embed = new Discord.RichEmbed()
        .setTitle('Level')
        .setColor(0x009933)
        .addField('User:', mentioned.displayName, true)
        .addField('Level:', 'moon', true);

        message.channel.send({embed});
        return;
      }
      if (points[mentioned.id].level === 19) {
        const embed = new Discord.RichEmbed()
        .setTitle('Level')
        .setColor(0x009933)
        .addField('User:', mentioned.displayName, true)
        .addField('Level:', 'grand moon', true);

        message.channel.send({embed});
        return;
      }
      if (points[mentioned.id].level === 20) {
        const embed = new Discord.RichEmbed()
        .setTitle('Level')
        .setColor(0x009933)
        .addField('User:', mentioned.displayName, true)
        .addField('Level:', 'planetlette', true);

        message.channel.send({embed});
        return;
      }
      if (points[mentioned.id].level === 21) {
        const embed = new Discord.RichEmbed()
        .setTitle('Level')
        .setColor(0x009933)
        .addField('User:', mentioned.displayName, true)
        .addField('Level:', 'planetette', true);

        message.channel.send({embed});
        return;
      }
      if (points[mentioned.id].level === 22) {
        const embed = new Discord.RichEmbed()
        .setTitle('Level')
        .setColor(0x009933)
        .addField('User:', mentioned.displayName, true)
        .addField('Level:', 'planetling', true);

        message.channel.send({embed});
        return;
      }
      if (points[mentioned.id].level === 23) {
        const embed = new Discord.RichEmbed()
        .setTitle('Level')
        .setColor(0x009933)
        .addField('User:', mentioned.displayName, true)
        .addField('Level:', 'planet', true);

        message.channel.send({embed});
        return;
      }
      if (points[mentioned.id].level === 24) {
        const embed = new Discord.RichEmbed()
        .setTitle('Level')
        .setColor(0x009933)
        .addField('User:', mentioned.displayName, true)
        .addField('Level:', 'grand planet', true);

        message.channel.send({embed});
        return;
      }
      if (points[mentioned.id].level === 25) {
        const embed = new Discord.RichEmbed()
        .setTitle('Level')
        .setColor(0x009933)
        .addField('User:', mentioned.displayName, true)
        .addField('Level:', 'irregular galaxy', true);

        message.channel.send({embed});
        return;
      }
      if (points[mentioned.id].level === 26) {
        const embed = new Discord.RichEmbed()
        .setTitle('Level')
        .setColor(0x009933)
        .addField('User:', mentioned.displayName, true)
        .addField('Level:', 'spiral galaxy', true);

        message.channel.send({embed});
        return;
      }
      if (points[mentioned.id].level === 27) {
        const embed = new Discord.RichEmbed()
        .setTitle('Level')
        .setColor(0x009933)
        .addField('User:', mentioned.displayName, true)
        .addField('Level:', 'elliptical galaxy', true);

        message.channel.send({embed});
        return;
      }
    }
    if (points[message.author.id].level === 0) {
      const embed = new Discord.RichEmbed()
      .setTitle('Level')
      .setColor(0x009933)
      .addField('User:', message.author.username, true)
      .addField('Level:', 'asteroidlette', true);

      message.channel.send({embed});
      return;
    }
    if (points[message.author.id].level === 1) {
      const embed = new Discord.RichEmbed()
      .setTitle('Level')
      .setColor(0x009933)
      .addField('User:', message.author.username, true)
      .addField('Level:', 'asteroidette', true);

      message.channel.send({embed});
      return;
    }
    if (points[message.author.id].level === 2) {
      const embed = new Discord.RichEmbed()
      .setTitle('Level')
      .setColor(0x009933)
      .addField('User:', message.author.username, true)
      .addField('Level:', 'asteroidling', true);

      message.channel.send({embed});
      return;
    }
    if (points[message.author.id].level === 3) {
      const embed = new Discord.RichEmbed()
      .setTitle('Level')
      .setColor(0x009933)
      .addField('User:', message.author.username, true)
      .addField('Level:', 'asteroid', true);

      message.channel.send({embed});
      return;
    }
    if (points[message.author.id].level === 4) {
      const embed = new Discord.RichEmbed()
      .setTitle('Level')
      .setColor(0x009933)
      .addField('User:', message.author.username, true)
      .addField('Level:', 'grand asteroid', true);

      message.channel.send({embed});
      return;
    }
    if (points[message.author.id].level === 5) {
      const embed = new Discord.RichEmbed()
      .setTitle('Level')
      .setColor(0x009933)
      .addField('User:', message.author.username, true)
      .addField('Level:', 'cometlette', true);

      message.channel.send({embed});
      return;
    }
    if (points[message.author.id].level === 6) {
      const embed = new Discord.RichEmbed()
      .setTitle('Level')
      .setColor(0x009933)
      .addField('User:', message.author.username, true)
      .addField('Level:', 'cometette', true);

      message.channel.send({embed});
      return;
    }
    if (points[message.author.id].level === 7) {
      const embed = new Discord.RichEmbed()
      .setTitle('Level')
      .setColor(0x009933)
      .addField('User:', message.author.username, true)
      .addField('Level:', 'cometling', true);

      message.channel.send({embed});
      return;
    }
    if (points[message.author.id].level === 8) {
      const embed = new Discord.RichEmbed()
      .setTitle('Level')
      .setColor(0x009933)
      .addField('User:', message.author.username, true)
      .addField('Level:', 'comet', true);

      message.channel.send({embed});
      return;
    }
    if (points[message.author.id].level === 9) {
      const embed = new Discord.RichEmbed()
      .setTitle('Level')
      .setColor(0x009933)
      .addField('User:', message.author.username, true)
      .addField('Level:', 'grand comet', true);

      message.channel.send({embed});
      return;
    }
    if (points[message.author.id].level === 10) {
      const embed = new Discord.RichEmbed()
      .setTitle('Level')
      .setColor(0x009933)
      .addField('User:', message.author.username, true)
      .addField('Level:', 'starlette', true);

      message.channel.send({embed});
      return;
    }
    if (points[message.author.id].level === 11) {
      const embed = new Discord.RichEmbed()
      .setTitle('Level')
      .setColor(0x009933)
      .addField('User:', message.author.username, true)
      .addField('Level:', 'starette', true);

      message.channel.send({embed});
      return;
    }
    if (points[message.author.id].level === 12) {
      const embed = new Discord.RichEmbed()
      .setTitle('Level')
      .setColor(0x009933)
      .addField('User:', message.author.username, true)
      .addField('Level:', 'starling', true);

      message.channel.send({embed});
      return;
    }
    if (points[message.author.id].level === 13) {
      const embed = new Discord.RichEmbed()
      .setTitle('Level')
      .setColor(0x009933)
      .addField('User:', message.author.username, true)
      .addField('Level:', 'star', true);

      message.channel.send({embed});
      return;
    }
    if (points[message.author.id].level === 14) {
      const embed = new Discord.RichEmbed()
      .setTitle('Level')
      .setColor(0x009933)
      .addField('User:', message.author.username, true)
      .addField('Level:', 'grand star', true);

      message.channel.send({embed});
      return;
    }
    if (points[message.author.id].level === 15) {
      const embed = new Discord.RichEmbed()
      .setTitle('Level')
      .setColor(0x009933)
      .addField('User:', message.author.username, true)
      .addField('Level:', 'moonlette', true);

      message.channel.send({embed});
      return;
    }
    if (points[message.author.id].level === 16) {
      const embed = new Discord.RichEmbed()
      .setTitle('Level')
      .setColor(0x009933)
      .addField('User:', message.author.username, true)
      .addField('Level:', 'moonette', true);

      message.channel.send({embed});
      return;
    }
    if (points[message.author.id].level === 17) {
      const embed = new Discord.RichEmbed()
      .setTitle('Level')
      .setColor(0x009933)
      .addField('User:', message.author.username, true)
      .addField('Level:', 'moonling', true);

      message.channel.send({embed});
      return;
    }
    if (points[message.author.id].level === 18) {
      const embed = new Discord.RichEmbed()
      .setTitle('Level')
      .setColor(0x009933)
      .addField('User:', message.author.username, true)
      .addField('Level:', 'moon', true);

      message.channel.send({embed});
      return;
    }
    if (points[message.author.id].level === 19) {
      const embed = new Discord.RichEmbed()
      .setTitle('Level')
      .setColor(0x009933)
      .addField('User:', message.author.username, true)
      .addField('Level:', 'grand moon', true);

      message.channel.send({embed});
      return;
    }
    if (points[message.author.id].level === 20) {
      const embed = new Discord.RichEmbed()
      .setTitle('Level')
      .setColor(0x009933)
      .addField('User:', message.author.username, true)
      .addField('Level:', 'planetlette', true);

      message.channel.send({embed});
      return;
    }
    if (points[message.author.id].level === 21) {
      const embed = new Discord.RichEmbed()
      .setTitle('Level')
      .setColor(0x009933)
      .addField('User:', message.author.username, true)
      .addField('Level:', 'planetette', true);

      message.channel.send({embed});
      return;
    }
    if (points[message.author.id].level === 22) {
      const embed = new Discord.RichEmbed()
      .setTitle('Level')
      .setColor(0x009933)
      .addField('User:', message.author.username, true)
      .addField('Level:', 'planetling', true);

      message.channel.send({embed});
      return;
    }
    if (points[message.author.id].level === 23) {
      const embed = new Discord.RichEmbed()
      .setTitle('Level')
      .setColor(0x009933)
      .addField('User:', message.author.username, true)
      .addField('Level:', 'planet', true);

      message.channel.send({embed});
      return;
    }
    if (points[message.author.id].level === 24) {
      const embed = new Discord.RichEmbed()
      .setTitle('Level')
      .setColor(0x009933)
      .addField('User:', message.author.username, true)
      .addField('Level:', 'grand planet', true);

      message.channel.send({embed});
      return;
    }
    if (points[message.author.id].level === 25) {
      const embed = new Discord.RichEmbed()
      .setTitle('Level')
      .setColor(0x009933)
      .addField('User:', message.author.username, true)
      .addField('Level:', 'irregular galaxy', true);

      message.channel.send({embed});
      return;
    }
    if (points[message.author.id].level === 26) {
      const embed = new Discord.RichEmbed()
      .setTitle('Level')
      .setColor(0x009933)
      .addField('User:', message.author.username, true)
      .addField('Level:', 'spiral galaxy', true);

      message.channel.send({embed});
      return;
    }
    if (points[message.author.id].level === 27) {
      const embed = new Discord.RichEmbed()
      .setTitle('Level')
      .setColor(0x009933)
      .addField('User:', message.author.username, true)
      .addField('Level:', 'elliptical galaxy', true);

      message.channel.send({embed});
      return;
    }
  }

  fs.writeFile("./points.json", JSON.stringify(points), (err) => {
    if (err) console.error(err)
  });

    if (message.content.toLowerCase().startsWith(prefix + 'warn')) {
    if(!message.guild.member(message.author).hasPermission('ADMINISTRATOR')) return;
    let member = message.mentions.members.first();
    if (!member) return;
    if (!warns[member.id]) warns[member.id] = {
      warns: 0
    };

      warns[member.id].warns++;

      let warnData = warns[member.id];
      client.channels.get('423631883142692864').send(`The following user has been warned for the following reason: ${argresult}`);
      message.channel.send(`The following user has been warned for the following reason: ${argresult}! They now have ${warnData.warns}/3 warns!`);

      if (warnData.warns === 3) {
        message.channel.send(`${member} has been auto-banned, for 7 days, for receiving 3 warns!`)
        member.ban(7).catch(console.error);
      }

      fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {
        if (err) console.error(err)
    });
} else

  if (message.content.toLowerCase() === prefix + 'ping') {
  const m = await message.channel.send('pong!');
  let latency = m.createdTimestamp - message.createdTimestamp;
  const embed = new Discord.RichEmbed()
  .setTitle('Ping')
  .setColor(0x009933)
  .addField('API Ping:',`${Math.round(client.ping)}ms`)
  .addField('Latency Ping:', `${latency}ms`);

  m.edit({embed});
} else

if (message.content.toLowerCase() === 'hi') {
  let rand = Math.floor((Math.random() * 20) + 1);
  if (rand >= 1 && rand < 6) {
    message.channel.send(`What's up?`);
  }
  if (rand >= 6 && rand < 13) {
    message.channel.send(`Hello.`);
  }
  if (rand >= 13) {
    message.channel.send(`G'day brethren!`);
  }
}

if (message.content.toLowerCase().startsWith(prefix + 'setgame')) {
  if (message.author.id === 314146155564892160) return;
  client.user.setActivity(argresult);
} else

if (message.content.toLowerCase().startsWith(prefix + 'guildname')) {
  if(!message.guild.member(message.author).hasPermission('ADMIN')) return;
  message.guild.setName(argresult);
} else

if (message.content.toLowerCase().includes('pbot')) {
  message.react('👀');
}

if (message.content.toLowerCase().startsWith('thank you pbot')) {
  message.reply('Not a problem!');
} else

if (message.content.toLowerCase().startsWith(prefix + 'help')) {
  const embed = new Discord.RichEmbed()
  .setTitle('Current list of commands:')
  .setColor(0x009933)
  .setThumbnail("https://cdn.discordapp.com/attachments/417440013387825156/427166443507810304/unknown.png")
  .setDescription('Our prefix is +, you must put this in front of any command or it will not work!')
  .addField('+help', 'This command opens this menu.', true)
  .addField('+ping', 'This command gives the current api ping.', true)
  .addField('+repeat', 'Repeats any message you send.')
  .addField('+game', 'A fun little minigame that will soon be connected to the points economy.', true)
  .addField('+invite', 'You wanna invite our bot to your server? Use this command then!', true)
  .addField('+points', 'Our economy uses points as currency, see yours, or your friends, with this command.', true)
  .addField('+buy :item:', 'This command will allow you to spend your hard earned points on items for rewards.', true)
  .addField('+inventory', ' This command will show you what you have bought with our points, or what other users have bought.', true)
  .addField('+trade', 'If you wanna trade some of your items for points with other users use this!. [Note: Trade is buggy right now DONT USE]', true)
  .addField('+shop', 'Use this comamnd if you want to see what items are available to buy right now. [Note: 1/5 of the shop will be changed daily!]', true)
  .addField('+canceltrade', 'Don`t want to trade anymore? Use this command!', true)
  .addField('+accepttrade', 'If another user, and you, decide to trade, you`ll need this command!', true)
  .addField('+modhelp', 'These commands are for people with moderator powers!', true)
  .setFooter('If you have any questions ask around and see if others know the answer, we don`t have a support command yet')
  message.author.send({embed})
  .catch(console.error);
} else

if (message.content.toLowerCase().startsWith(prefix + 'kick')) {
if(!message.guild.member(message.author).hasPermission('ADMINISTRATOR')) return;
if (!message.content.includes(' ')) return;
  let member = message.mentions.members.first();
  member.kick();
  message.channel.send(`The user ${member} has been kicked from this server!`);
} else

if (message.content.toLowerCase().startsWith(prefix + 'repeat')) {
  message.delete();
  message.channel.send(argresult);
} else

if (message.content.toLowerCase().startsWith(prefix + 'filter on')) {
  if(!message.guild.member(message.author).hasPermission('ADMINISTRATOR')) return;
  filter.shouldbeon = 1;
  fs.writeFile("./filter.json", JSON.stringify(filter), (err) => console.error);
  message.channel.send('The chat filter is now on!');
} else

if (message.content.toLowerCase().startsWith(prefix + 'filter off')) {
  if(!message.guild.member(message.author).hasPermission('ADMINISTRATOR')) return;
  filter.shouldbeon = 0;
  fs.writeFile("./filter.json", JSON.stringify(filter), (err) => console.error);
  message.channel.send('The chat filter is now off!');
} else

if (filter.shouldbeon === 1) {
    if (message.content.toLowerCase().includes('fuck') || message.content.toLowerCase().includes('ass') || message.content.toLowerCase().includes('fag') || message.content.toLowerCase().includes('nig') || message.content.toLowerCase().includes('damn')) {
      message.delete();
      message.author.send('Bad words are prohibited on our server!').catch(console.error);
      return;
    } else
    if (message.content.toLowerCase().includes('pussy') || message.content.toLowerCase().includes('cock') || message.content.toLowerCase().includes('shit') || message.content.toLowerCase().includes('bitch') || message.content.toLowerCase().includes('dick')) {
      message.delete();
      message.author.send('Bad words are prohibited on our server!').catch(console.error);
      return;
    }
} else

if (message.content.toLowerCase().startsWith(prefix + 'mute')) {
  if(!message.guild.member(message.author).hasPermission('ADMINISTRATOR')) return;
  let role = message.guild.roles.get('423933569874788373');
  let member = message.mentions.members.first();
  member.addRole(role).catch(console.error);
  message.channel.send(`${member} needed to be muted!`);
}

if (message.content.toLowerCase().startsWith(prefix + 'unmute')) {
  if(!message.guild.member(message.author).hasPermission('ADMINISTRATOR')) return;
  let member = message.mentions.members.first();
  member.setRoles([]);
  message.channel.send(`You are free to speak ${member}!`)
}

if (message.content.toLowerCase().startsWith(prefix + 'invite')) {
  message.reply('You can invite this bot to your server with this link: https://discordapp.com/api/oauth2/authorize?client_id=421048764984197130&permissions=8&scope=bot')
}

if (message.content.toLowerCase().startsWith('what time is it?')) {
  message.reply(`It is currently ${message.createdAt}`);
}

if (message.content.toLowerCase().startsWith(prefix + 'game')) {
  message.reply('good luck!');
  let rand = Math.floor((Math.random() * 20) + 1);
  if (rand === 1) {
    message.channel.send('winner')
  } else
  if (rand === 2) {
    message.channel.send('loser')
  } else
  if (rand === 3) {
    message.channel.send('Mega Winner!')
  } else
  if (rand === 4) {
    message.channel.send('nothing happened')
  } else
  if (rand === 5) {
    message.channel.send('Major Loser')
  } else
  if (rand === 6) {
    message.channel.send('You win a new car')
  } else
  if (rand === 7) {
    message.channel.send('No win for you')
  } else
  if (rand === 8) {
    message.channel.send('Giant Loser')
  } else
  if (rand === 9) {
    message.channel.send('Nothing changed')
  } else
  if (rand === 10) {
    message.channel.send('you get nothing')
  } else
  if (rand === 11) {
    message.channel.send(`You ${message.author.username} are the biggest loser of all TIME!!!`)
  } else
  if (rand === 12) {
    message.channel.send('OML YOU WON')
  } else
  if (rand === 13) {
    message.channel.send('I love you')
  } else
  if (rand === 14) {
    message.channel.send('Mom?')
  } else
  if (rand === 15) {
    message.channel.send('You have won $1,000,000')
  } else
  if (rand === 16) {
    message.channel.send(`you didn't win, you didn't lose.`)
  } else
  if (rand === 17) {
    message.channel.send(`You ${message.author.username} played this game at ${message.createdAt} and it is my great pleasure to inform you...YOU LOST BAD`)
  } else
  if (rand === 18) {
    message.channel.send('Jackpot')
  } else
  if (rand === 19) {
    message.channel.send('Super Ultra JACKPOT!!!!')
  } else
  if (rand === 20) {
    message.channel.send('You suck and you lost!')
  }
}

if (message.content.toLowerCase().startsWith(prefix + 'support')) {
  if (!argresult) {
    message.reply('you need to enter either a question or a suggestion after the command!');
    return;
  }
  message.delete();
  const embed = new Discord.RichEmbed()
  .setTitle('Support')
  .setColor(0x009933)
  .addField('Support Request From:', message.author.username, true)
  .addField('Support Content:', argresult, true)
  .addField('Discord Server:', message.guild.name);
  client.channels.get('427549310700355585').send({embed})
}

if(message.content.toLowerCase().startsWith(prefix + 'clear')) {
  if(!message.guild.member(message.author).hasPermission('ADMINISTRATOR')) return;
  let args = message.content.split(' ').slice(1,2);
  var argresult = args.join(' ');
  let argresultint = parseInt(argresult);

  if (!argresult) {
    message.channel.bulkDelete(100);
    message.channel.send(`The last 100 messages have been cleared by ${message.author.username} by default, because no value was specified!`);
    return;
  }

  if (argresultint > 100 || argresultint < 2) {
    message.channel.send('You must enter a value from 2-100!');
    return;
  }

  message.channel.bulkDelete(argresultint)
}

if (message.content.toLowerCase().startsWith(prefix + 'math')) {
  let args = message.content.split(' ').slice(1,2);
  var argresult = args.join(' ');
  if (!argresult) return;

  let args2 = message.content.split(' ').slice(2,3);
  var argresult2 = args2.join(' ');
  if (!argresult2) return;

  let args3 = message.content.split(' ').slice(3, 4);
  var argresult3 = args3.join(' ');
  if (!argresult3) return;

  let args4 = message.content.split(' ').slice(4, 5);
  var argresult4 = args4.join(' ');

  let args5 = message.content.split(' ').slice(5);
  var argresult5 = args5.join(' ');

  if (!argresult4) {

  if (argresult2 === '+') {
    let argresultint = parseFloat(argresult);
    let argresultint3 = parseFloat(argresult3);
    message.channel.send(`The answer is ${argresultint + argresultint3}`);
    return;
  }
  if (argresult2 === '-') {
    let argresultint = parseFloat(argresult);
    let argresultint3 = parseFloat(argresult3);
    message.channel.send(`The answer is ${argresultint - argresultint3}`);
    return;
  }
  if (argresult2 === '/') {
    let argresultint = parseFloat(argresult);
    let argresultint3 = parseFloat(argresult3);
    message.channel.send(`The answer is ${argresultint / argresultint3}`);
    return;
  }
  if (argresult2 === '*') {
    let argresultint = parseFloat(argresult);
    let argresultint3 = parseFloat(argresult3);
    message.channel.send(`The answer is ${argresultint * argresultint3}`);
    return;
  }
}

  if (argresult2 === '=') {
    if (argresult4 === '+') {
      if (argresult3 === 'x') {
        let argresultint = parseFloat(argresult);
        let argresultint5 = parseFloat(argresult5);
        message.channel.send(`X = ${argresultint - argresultint5}`)
        return;
      }
      if (argresult5 === 'x') {
        let argresultint = parseFloat(argresult);
        let argresultint3 = parseFloat(argresult3);
        message.channel.send(`X = ${argresultint - argresultint3}`)
        return;
      }
      let argresultint5 = parseFloat(argresult5);
      let argresultint3 = parseFloat(argresult3);
      message.channel.send(`X = ${argresultint5 + argresultint3}`)
      return;
    }
    if (argresult4 === '-') {
      if (argresult3 === 'x') {
        let argresultint = parseFloat(argresult);
        let argresultint5 = parseFloat(argresult5);
        message.channel.send(`X = ${argresultint + argresultint5}`)
        return;
      }
      if (argresult5 === 'x') {
        let argresultint = parseFloat(argresult);
        let argresultint3 = parseFloat(argresult3);
        message.channel.send(`X = ${(argresultint - argresultint3) * -1}`)
        return;
      }
      let argresultint5 = parseFloat(argresult5);
      let argresultint3 = parseFloat(argresult3);
      message.channel.send(`X = ${argresultint3 - argresultint5}`)
      return;
    }
    if (argresult4 === '*') {
      if (argresult3 === 'x') {
        let argresultint = parseFloat(argresult);
        let argresultint5 = parseFloat(argresult5);
        message.channel.send(`X = ${argresultint / argresultint5}`)
        return;
      }
      if (argresult5 === 'x') {
        let argresultint = parseFloat(argresult);
        let argresultint3 = parseFloat(argresult3);
        message.channel.send(`X = ${argresultint / argresultint3}`)
        return;
      }
      let argresultint5 = parseFloat(argresult5);
      let argresultint3 = parseFloat(argresult3);
      message.channel.send(`X = ${argresultint3 * argresultint5}`)
      return;
    }
    if (argresult4 === '/') {
      if (argresult3 === 'x') {
        let argresultint = parseFloat(argresult);
        let argresultint5 = parseFloat(argresult5);
        message.channel.send(`X = ${argresultint * argresultint5}`)
        return;
      }
      if (argresult5 === 'x') {
        let argresultint = parseFloat(argresult);
        let argresultint3 = parseFloat(argresult3);
        message.channel.send(`X = ${argresultint3 / argresultint}`)
        return;
      }
      let argresultint5 = parseFloat(argresult5);
      let argresultint3 = parseFloat(argresult3);
      message.channel.send(`X = ${argresultint3 / argresultint5}`)
      return;
    }
  }
  if (argresult4 === '=') {
    if (argresult2 === '+') {
      if (argresult3 === 'x') {
        let argresultint = parseFloat(argresult);
        let argresultint5 = parseFloat(argresult5);
        message.channel.send(`X = ${argresultint5 - argresultint}`)
        return;
      }
      if (argresult5 === 'x') {
        let argresultint = parseFloat(argresult);
        let argresultint3 = parseFloat(argresult3);
        message.channel.send(`X = ${argresultint3 + argresultint}`)
        return;
      }
      let argresultint5 = parseFloat(argresult5);
      let argresultint3 = parseFloat(argresult3);
      message.channel.send(`X = ${argresultint5 - argresultint3}`)
      return;
    }
    if (argresult2 === '-') {
      if (argresult3 === 'x') {
        let argresultint = parseFloat(argresult);
        let argresultint5 = parseFloat(argresult5);
        message.channel.send(`X = ${(argresultint5 - argresultint) * -1}`)
        return;
      }
      if (argresult5 === 'x') {
        let argresultint = parseFloat(argresult);
        let argresultint3 = parseFloat(argresult3);
        message.channel.send(`X = ${argresultint - argresultint3}`)
        return;
      }
      let argresultint5 = parseFloat(argresult5);
      let argresultint3 = parseFloat(argresult3);
      message.channel.send(`X = ${argresultint5 + argresultint3}`)
      return;
    }
    if (argresult2 === '*') {
      if (argresult3 === 'x') {
        let argresultint = parseFloat(argresult);
        let argresultint5 = parseFloat(argresult5);
        message.channel.send(`X = ${argresultint5 / argresultint}`)
        return;
      }
      if (argresult5 === 'x') {
        let argresultint = parseFloat(argresult);
        let argresultint3 = parseFloat(argresult3);
        message.channel.send(`X = ${argresultint3 * argresultint}`)
        return;
      }
      let argresultint5 = parseFloat(argresult5);
      let argresultint3 = parseFloat(argresult3);
      message.channel.send(`X = ${argresultint5 / argresultint3}`)
      return;
    }
    if (argresult2 === '/') {
      if (argresult3 === 'x') {
        let argresultint = parseFloat(argresult);
        let argresultint5 = parseFloat(argresult5);
        message.channel.send(`X = ${argresultint / argresultint5}`)
        return;
      }
      if (argresult5 === 'x') {
        let argresultint = parseFloat(argresult);
        let argresultint3 = parseFloat(argresult3);
        message.channel.send(`X = ${argresultint / argresultint3}`)
        return;
      }
      let argresultint5 = parseFloat(argresult5);
      let argresultint3 = parseFloat(argresult3);
      message.channel.send(`X = ${argresultint5 * argresultint3}`)
      return;
    }
  }



  message.channel.send('This does not follow the correct math format!');
}

});

client.on('messageDelete', message => {
    const embed = new Discord.RichEmbed()
    .setTitle('Message Deleted')
    .setColor(0x009933)
    .addField('Message Creator', message.author.username, true)
    .addField('Message Content', message.content, true)
    client.channels.get('423831057708744704').send({embed})
});


client.login('NDIxMDQ4NzY0OTg0MTk3MTMw.DYHkdw.OXfPhhtQNcVbF2o-ZIxh3oVj_FA');
