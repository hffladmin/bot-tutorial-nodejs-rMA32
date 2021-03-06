var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\/coolguy1234554321/; 
      botRegexRoster = /^\/roster/; 
      botRegexRules = /^\/rules/;
      botRegexLeagueSchedule = /^\/lschedule/;
      botRegexTeamSchedule = /^\/tschedule/i; 
      botRegexPlayer = /^\/player/i;
      botRegexHelp = /^\/help/;
      botRegexCowbots = /^\/cowbots/;
      botRegexDeadCowbots = /^\/dedcowbots/;
      botRegexWhenIsDraft = /^\/whenisdraft/;
      botRegexAdmin = /^\/admin/;
      botRegexDanny = /^\/danny/;
      botRegexMikey = /^\/mikey/
      botRegexTrophyCase= /^\/trophycase/;
      botRegexTop5= /^\/top5/;
      botRegexTwitch = /^\/twitch/i; 
      mikey1 = 'https://i.groupme.com/285x440.jpeg.780fe5c310ba49f0b62aa612b9c4965c.large';
      mikey2 = 'https://i.groupme.com/723x1125.jpeg.1cf8863794af496c99673f6a77e46448.large';
      mikey3 = 'https://i.groupme.com/691x978.jpeg.d2a2c3df2ca54104a7aa98c0a746d380.large';
      
  var teamAb = ["NE","NO","ARI","PHI","CLE","TEN","OAK","DAL","IND","SEA","CIN","PIT","JAC"
                ,"BAL","SD","DEN","MIN","ATL","KC","NYG","GB","DET","HOU","STL","CHI","CAR",
                "MIA","BUF","SF","WAS","NYJ","TB"]
  
  
  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage(cool());
    this.res.end();
  }
  else if(request.text && botRegexHelp.test(request.text)) {
    this.res.writeHead(200);
    postMessage("Command List: \n /roster [team] - [Team] Roster \n /rules - Rules Page \n /lschedule - League Schedule \n /tschedule [team] - [Team] Schedule \n /player [player name] - [Player]'s Stats \n /twitch [username] - Twitch Channel \n /trophycase - Shows Superbowl Winners \n /whenisdraft - Information For Next Draft  \n \n Am I broken or shitty? Yell at Charlotte.");
    this.res.end();
  }
  else if(request.text && botRegexRoster.test(request.text)) {
    this.res.writeHead(200);
    //postMessage("http://www.daddyleagues.com/maddenrating?name=&position=all&team="+request.text.substring(5,8));
    postMessage("http://daddyleagues.com/hffl19/team/"+request.text.substring(8,11)+"/depthchart");
    this.res.end();
  } 
  
  else if(request.text && botRegexRules.test(request.text)) {
    this.res.writeHead(200);
    postMessage("https://www.daddyleagues.com/hffl19/rules");
    this.res.end();
  } 
  else if(request.text && botRegexTeamSchedule.test(request.text)) {
    this.res.writeHead(200);
    postMessage("http://daddyleagues.com/hffl19/team/"+request.text.substring(11,14)+"/schedule");
    this.res.end();
  }
  else if(request.text && botRegexLeagueSchedule.test(request.text)) {
    this.res.writeHead(200);
    postMessage("http://daddyleagues.com/hffl19/schedules");
    this.res.end();
  } 
  else if(request.text && botRegexCowbots.test(request.text)) {
    this.res.writeHead(200);
    postMessage("Victor's new team:");
    postMessage("http://www.moochandise.com/cows/cowbot.jpg");
    this.res.end();
  } 
  else if(request.text && botRegexDeadCowbots.test(request.text)) {
    this.res.writeHead(200);
    postMessage("RIP");
    postMessage("https://i.groupme.com/313x287.jpeg.39dd029fdaca43d0915346204c730ebd");
    this.res.end();
  }
  else if(request.text && botRegexDanny.test(request.text)) {
    this.res.writeHead(200);
    postMessage("https://i.imgur.com/yFw2JOL.jpg");
    this.res.end();
  }
   else if(request.text && botRegexMikey.test(request.text)) {
    this.res.writeHead(200);
    if(0.5 >= Math.random() > 0)
      postMessage(mikey1);
    else if(Math.random() >0.5)
      postMessage(mikey2)
    else
      postMessage(mikey3);
    this.res.end();
  }
  else if(request.text && botRegexTrophyCase.test(request.text)) {
    this.res.writeHead(200);
    postMessage("Trophy Case (Madden 20) ");
    this.res.end();
  }
  else if(request.text && botRegexWhenIsDraft.test(request.text)) {
    this.res.writeHead(200);
    postMessage("Next Draft: 8/11 (Sunday) @ 6PST");
    this.res.end();
  }
  else if(request.text && botRegexPlayer.test(request.text)) {
    this.res.writeHead(200);
    var req = request.text.substring(8,request.text.length);
    var rep = req.replace(/ /,"+");
    postMessage("http://daddyleagues.com/hffl19/players?name="+rep+"&position=all&team=all");
    this.res.end();
  }
  else if(request.text && botRegexAdmin.test(request.text)) {
    this.res.writeHead(200);
    attachment("RIP");
    this.res.end();
  } 
  else if(request.text && botRegexTwitch.test(request.text)) {
    this.res.writeHead(200);
    postMessage("http://www.twitch.tv/"+request.text.substring(8,request.text.length));
    this.res.end();
  }
  
  else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage(response) {
  var botResponse,options, body, botReq;

  botResponse = response

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

exports.respond = respond;

