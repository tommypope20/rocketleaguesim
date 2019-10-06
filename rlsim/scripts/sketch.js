players = [];
teams = [];
events = [];
matches = [];
freeagents = [];
date = [1, 1, 2019];

function preload() {
    let url = "rlsim/data/names.json"
    names = loadJSON(url);

    let turl = "rlsim/data/teams.json"
    teamn = loadJSON(turl);
}

function Player(first, last, age, nat, team, shot, save, ctrl, pass, ovr) {
    this.firstName = first;
    this.lastName = last;
    this.age = age;
    this.nationality = nat;
    this.team = team;
    this.shot = shot;
    this.save = save;
    this.ctrl = ctrl;
    this.pass = pass;
    this.ovr = ovr;
}

function Team(name, rank, players, nat, rep) {
    this.tname = name;
    this.trank = rank;
    this.tplayers = players;
    this.nat = nat;
    this.rep = rep;
}

function Tournament(name, place, srtdate) {
    this.name = name;
    this.place = place;
    this.srtdate = srtdate;
}

function Match(teamone, teamtwo, md) {
    this.teamone = teamone;
    this.teamtwo = teamtwo;
    this.md = md;
}

function setup() {
    noCanvas();
    noLoop();
    teamGenerate();
    generatePlayers();
    rankTeams();
    teamNats();
    displayDate();
    eventGenerate();
}

function displayDate() {
    dat = document.getElementById("date");
    dat.innerHTML = date[0] + "/" + date[1] + "/" + date[2];
}

function generatePlayers() {


    players = [];
    for (x = 0; x < 30; x++) {
    randNum = random(0, 100);

    if (randNum <= 1) {nat = "Argentina"; natid = 0};
    if (randNum <= 6 && randNum > 1) {nat = "Australia"; natid = 2};
    if (randNum <= 7 && randNum > 6) {nat = "Belgium"; natid = 4};
    if (randNum <= 12 && randNum > 7) {nat = "Brazil"; natid = 6};
    if (randNum <= 27 && randNum > 12) {nat = "Canada"; natid = 8};
    if (randNum <= 28 && randNum > 27) {nat = "Colombia"; natid = 10};
    if (randNum <= 28 && randNum > 29) {nat = "Denmark"; natid = 12};
    if (randNum <= 36 && randNum > 29) {nat = "England"; natid = 14};
    if (randNum <= 37 && randNum > 36) {nat = "Finland"; natid = 16};
    if (randNum <= 47 && randNum > 37) {nat = "France"; natid = 18};
    if (randNum <= 50 && randNum > 47) {nat = "Germany"; natid = 20};
    if (randNum <= 51 && randNum > 50) {nat = "Ireland"; natid = 22};
    if (randNum <= 53 && randNum > 51) {nat = "Italy"; natid = 24};
    if (randNum <= 56 && randNum > 53) {nat = "Netherlands"; natid = 26};
    if (randNum <= 58 && randNum > 56) {nat = "New Zealand"; natid = 28};
    if (randNum <= 59 && randNum > 58) {nat = "Norway"; natid = 30};
    if (randNum <= 61 && randNum > 59) {nat = "Scotland"; natid = 32};
    if (randNum <= 71 && randNum > 61) {nat = "Spain"; natid = 34};
    if (randNum <= 74 && randNum > 71) {nat = "Sweden"; natid = 36};
    if (randNum <= 100 && randNum > 74) {nat = "U.S.A"; natid = 38};

    randNumF = Math.floor(Math.random() * names.first.c[natid + 1].length) + 0;
    randNumL = Math.floor(Math.random() * names.last.c[natid + 1].length) + 0;

    fname = names.first.c[natid + 1][randNumF][0];

    lname = names.last.c[natid + 1][randNumL][0];

    randNum = random(0, 100);
    if (randNum <= 10) [age = 16];
    if (randNum <= 20 && randNum > 10) [age = 17];
    if (randNum <= 40 && randNum > 20) [age = 18];
    if (randNum <= 55 && randNum > 40) [age = 19];
    if (randNum <= 65 && randNum > 55) [age = 20];
    if (randNum <= 80 && randNum > 65) [age = 21];
    if (randNum <= 90 && randNum > 80) [age = 22];
    if (randNum <= 100 && randNum > 90) [age = 23];

    for (i = 0; i < teamn.teams.length; i++) {
        if (teams[i].tplayers.length == 3) {

        } else {

            player = new Player(fname, lname, age, nat, teams[i]);
            players.push(player);
            teams[i].tplayers.push(player);
            break;
        }
    }

    if (players[x].team.rep >= 90) {
        players[x].shot = Math.floor(Math.random() * (100 - (players[x].team.rep - 10) + 1) + (players[x].team.rep - 10));
        players[x].save = Math.floor(Math.random() * (100 - (players[x].team.rep - 10) + 1) + (players[x].team.rep - 10));
        players[x].ctrl = Math.floor(Math.random() * (100 - (players[x].team.rep - 10) + 1) + (players[x].team.rep - 10));
        players[x].pass = Math.floor(Math.random() * (100 - (players[x].team.rep - 10) + 1) + (players[x].team.rep - 10));
        players[x].ovr = Math.round((players[x].pass + players[x].ctrl + players[x].save + players[x].shot)/4)
        players[x].pot = Math.floor(Math.random() * (100 - (players[x].ovr) + 1) + players[x].ovr)
    } else {
        players[x].shot = Math.floor(Math.random() * ((players[x].team.rep + 10) - (players[x].team.rep - 10) + 1) + (players[x].team.rep - 10));
        players[x].save = Math.floor(Math.random() * ((players[x].team.rep + 10) - (players[x].team.rep - 10) + 1) + (players[x].team.rep - 10));
        players[x].ctrl = Math.floor(Math.random() * ((players[x].team.rep + 10) - (players[x].team.rep - 10) + 1) + (players[x].team.rep - 10));
        players[x].pass = Math.floor(Math.random() * ((players[x].team.rep + 10) - (players[x].team.rep - 10) + 1) + (players[x].team.rep - 10));
        players[x].ovr = Math.round((players[x].pass + players[x].ctrl + players[x].save + players[x].shot)/4)
        players[x].pot = Math.floor(Math.random() * (100 - (players[x].ovr) + 1) + players[x].ovr)

    }


    }

}

function displayPlayers() {

    body = document.body;
    
    if (body.children.length > 1) {
        body.removeChild(body.lastChild);
    }

    t = document.createElement("table");
    t.id = "pl";

    body.appendChild(t);

    r = document.createElement("tr");

    t.appendChild(r);

    th = document.createElement('th');
    th.innerHTML = "Player Name";

    r.appendChild(th);

    th = document.createElement('th');
    th.innerHTML = "Age";

    r.appendChild(th);

    th = document.createElement('th');
    th.innerHTML = "Nationality";

    r.appendChild(th);

    th = document.createElement('th');
    th.innerHTML = "Team";

    r.appendChild(th);

    th = document.createElement('th');
    th.innerHTML = "Overall";

    r.appendChild(th);




    for (x=0; x < players.length; x++) {
        r = document.createElement("tr");

        n = document.createElement("td");
        n.innerHTML = players[x].firstName + " " + players[x].lastName;
        n.setAttribute("onclick", "playerPage()")
        r.appendChild(n);

        age = document.createElement("td");
        age.innerHTML = players[x].age;
        r.appendChild(age);

        nat = document.createElement("td");
        nat.innerHTML = players[x].nationality;
        r.appendChild(nat);

        pteam = document.createElement("td");
        pteam.innerHTML = players[x].team.tname;
        pteam.setAttribute("onClick", "teamPage()");
        r.appendChild(pteam);

        overall = document.createElement("td");
        overall.innerHTML = players[x].ovr;
        r.appendChild(overall);

        t.appendChild(r);

    } 
}

function teamGenerate() {
    for (i=0; i < teamn.teams.length; i++) {
        teamname = teamn.teams[i];

        rep = Math.floor(Math.random() * (100 - 75 +1)) + 75;

        team = new Team(teamname, undefined, [], undefined, rep);
        teams.push(team);
    }
}

function playerPage() {
    pname = event.target.innerHTML;

    for(i = 0; i<players.length; i++) {
        if (pname == players[i].firstName + " " + players[i].lastName) {
            tplyr = players[i];
        }
    }

    body = document.body;

    if (body.children.length > 1) {
        for(v = 0; v < body.children.length - 1; v++) {
            body.removeChild(body.lastChild);
        }
    }

    hold = document.createElement("div");
    body.appendChild(hold);

    t = document.createElement("p");
    t.innerHTML = "Name: " + tplyr.firstName + " " + tplyr.lastName;
    hold.appendChild(t);

    t = document.createElement("p");
    t.innerHTML = "Name: " + tplyr.age;
    hold.appendChild(t);

    t = document.createElement("p");
    t.innerHTML = "Team: " + tplyr.team.tname;
    t.setAttribute("onClick", "teamPage()")
    hold.appendChild(t);

    rating = document.createElement("div");
    rating.setAttribute("style", "border:1px solid black; width:20%; padding-left:15px;")

    hold.appendChild(rating);


    r = document.createElement("p");
    r.innerHTML = "Overall: " + tplyr.ovr;
    hold.appendChild(rating);
    rating.appendChild(r);

    if (tplyr.lmshot == undefined) {
        r = document.createElement("p");
        r.innerHTML = "Shot Rating: " + tplyr.shot ;
        rating.appendChild(r);

        r = document.createElement("p");
        r.innerHTML = "Save Rating: " + tplyr.save;
        rating.appendChild(r);

        r = document.createElement("p");
        r.innerHTML = "Control Rating: " + tplyr.ctrl;
        rating.appendChild(r);

        r = document.createElement("p");
        r.innerHTML = "Pass Rating: " + tplyr.pass;
        rating.appendChild(r);
    } else {

    r = document.createElement("p");
    r.innerHTML = "Shot Rating: " + Math.round(tplyr.shot) + " " + Math.round((tplyr.shot - tplyr.lmshot));
    rating.appendChild(r);

    r = document.createElement("p");
    r.innerHTML = "Save Rating: " + Math.round(tplyr.save) + " " + Math.round((tplyr.save - tplyr.lmsave));
    rating.appendChild(r);

    r = document.createElement("p");
    r.innerHTML = "Control Rating: " + Math.round(tplyr.ctrl) + " " + Math.round((tplyr.ctrl - tplyr.lmctrl));
    rating.appendChild(r);

    r = document.createElement("p");
    r.innerHTML = "Pass Rating: " + Math.round(tplyr.pass) + " " + Math.round((tplyr.pass - tplyr.lmpass));
    rating.appendChild(r);
    }
    


    
}

function displayTeams() {
    body = document.body;

    if (body.children.length > 1) {
        body.removeChild(body.lastChild);
    }

    t = document.createElement("table");
    t.id = "tl";

    body.appendChild(t);

    r = document.createElement("tr");

    t.appendChild(r);

    th = document.createElement('th');
    th.innerHTML = "Team Name";

    r.appendChild(th);

    th = document.createElement('th');
    th.innerHTML = "Ranking";

    r.appendChild(th);

    th = document.createElement('th');
    th.innerHTML = "Nationality";

    r.appendChild(th);

    th = document.createElement('th');
    th.innerHTML = "Reputation";

    r.appendChild(th);

    
    for (x=0; x < teams.length; x++) {
        r = document.createElement("tr");

        n = document.createElement("td");
        n.innerHTML = teams[x].tname
        n.setAttribute("onClick", "teamPage()")
        r.appendChild(n);

        rank = document.createElement("td");
        rank.innerHTML = teams[x].trank
        r.appendChild(rank);

        nat = document.createElement("td");
        nat.innerHTML = teams[x].nat;
        r.appendChild(nat);

        rep = document.createElement("td");
        rep.innerHTML = teams[x].rep;
        r.appendChild(rep);

        t.appendChild(r);

    } 
}

function rankTeams() {
    for (x=0; x < teams.length; x++) {

        teams[x].teamelo = 0;

        teams[x].trank = teams.length;


        for (i=0; i < teams[x].tplayers.length; i++) {
            teams[x].teamelo = teams[x].tplayers[i].ovr + teams[x].teamelo;
        } 

        teams[x].teamelo = teams[x].rep + teams[x].teamelo;

    }

    teams.sort(function (a, b){return b.teamelo - a.teamelo});

    for (v = 0; v < teams.length; v++) {
        teams[v].trank = v + 1;
    }
}

function teamNats() {
    for (i=0; i < teams.length; i++) {
        if (teams[i].tplayers[0].nationality == teams[i].tplayers[1].nationality || teams[i].tplayers[0].nationality == teams[i].tplayers[2].nationality) {
            teams[i].nat = teams[i].tplayers[0].nationality;
        } else if (teams[i].tplayers[1].nationality == teams[i].tplayers[2].nationality) {
            teams[i].nat = teams[i].tplayers[1].nationality;
        } else {
            teams[i].nat = "International";
        }
    }

}

function advance(days) {
    for (d=0; d < days; d++){

    date[1] = date[1] + 1;
    if (date[1] > 31) {
        date[1] = 1;
        date[0] = date[0] + 1;
        playerProgression();
        rankTeams();
        teamNats();
        if (date[0] > 12) {
            date[0] = 1;
            date[2] = date[2] + 1;
            playerRetirement();
            newGens();
            playerPickup();

            for (a = 0; a < players.length; a++) {
                players[a].age = players[a].age + 1;
            }
        }
    }

    dat = document.getElementById("date");
    dat.innerHTML = date[0] + "/" + date[1] + "/" + date[2];
    }
}

function vacation() {
    advance(372);
}

function advanceMenu() {
    document.getElementById("AdvanceDrop").classList.toggle("show");
  }
  
  window.onclick = function(e) {
    if (!e.target.matches('.dropbtn')) {
    var myDropdown = document.getElementById("AdvanceDrop");
      if (myDropdown.classList.contains('show')) {
        myDropdown.classList.remove('show');
      }
    }
  }

function playerProgression() {
    for (x = 0; x < players.length; x++) {

        players[x].lmshot = players[x].shot;
        players[x].lmsave = players[x].save;
        players[x].lmpass = players[x].pass;
        players[x].lmctrl = players[x].ctrl;
        players[x].lmovr = players[x].ovr;

        if (players[x].age > 23) {
            randNum = Math.random();
            if(randNum < .9) {
                    randNum = Math.random();
                    if (randNum >= .9) {

                        if (players[x].pot == Math.round(players[x].ovr)  || players[x].ovr > players[x].pot) {

                        } else {
                        players[x].shot = players[x].shot + Math.random();
                        players[x].pass = players[x].pass + Math.random();
                        players[x].ctrl = players[x].ctrl + Math.random();
                        players[x].save = players[x].save + Math.random();}

                    } else if (randNum >= .5 && randNum < .9) {
                        players[x].shot = players[x].shot + Math.random() * (0 - -.5) + -.5;
                        players[x].pass = players[x].pass + Math.random() * (0 - -.5) + -.5;
                        players[x].ctrl = players[x].ctrl + Math.random() * (0 - -.5) + -.5;
                        players[x].save = players[x].save + Math.random() * (0 - -.5) + -.5;

                    } else {
                        players[x].shot = players[x].shot + Math.random() * (-.5 - -2) + -2;
                        players[x].pass = players[x].pass + Math.random() * (-.5 - -2) + -2;
                        players[x].ctrl = players[x].ctrl + Math.random() * (-.5 - -2) + -2;
                        players[x].save = players[x].save + Math.random() * (-.5 - -2) + -2;
                }
            }
        } else {
            randNum = Math.random();
            if(randNum < .85) {
                    randNum = Math.random();
                    if (randNum >= .75) {

                        if (players[x].pot == Math.round(players[x].ovr)  || players[x].ovr > players[x].pot) {

                        } else {

                        players[x].shot = players[x].shot + Math.random() * (1.5 - .5) + .5;
                        players[x].pass = players[x].pass + Math.random() * (1.5 - .5) + .5;
                        players[x].ctrl = players[x].ctrl + Math.random() * (1.5 - .5) + .5;
                        players[x].save = players[x].save + Math.random() * (1.5 - .5) + .5;}
                    } else if (randNum >= .1 && randNum < .75) {

                        if (players[x].pot == Math.round(players[x].ovr)  || players[x].ovr > players[x].pot) {
                        
                        } else {
                        players[x].shot = players[x].shot + Math.random() * (.5 - 0) + 0;
                        players[x].pass = players[x].pass + Math.random() * (.5 - 0) + 0;
                        players[x].ctrl = players[x].ctrl + Math.random() * (.5 - 0) + 0;
                        players[x].save = players[x].save + Math.random() * (.5 - 0) + 0;}
                    } else {
                        players[x].shot = players[x].shot + Math.random() * (0 - -.3) + -.3;
                        players[x].pass = players[x].pass + Math.random() * (0 - -.3) + -.3;
                        players[x].ctrl = players[x].ctrl + Math.random() * (0 - -.3) + -.3;
                        players[x].save = players[x].save + Math.random() * (0 - -.3) + -.3;
                    }
            }
        }

        if (players[x].shot > 100) {
            players[x].shot = 100;
        }  if (players[x].pass > 100) {
            players[x].pass = 100;
        }  if (players[x].save > 100) {
            players[x].save = 100;
        }  if (players[x].ctrl > 100) {
            players[x].ctrl = 100;
        }
        
        players[x].ovr = Math.round((players[x].shot + players[x].pass + players[x].save + players[x].ctrl)/4);
    }
}

function playerRetirement() {
    for (x = 0; x < players.length; x++) {
        if (players[x].age >= 25) {
              if ((Math.floor(Math.random() * (30 - 20 +1)) + 20) + players[x].age > 50) {
                  if (players[x].team.tname == "Free Agents") {
                    for(p = 0; p < freeagents.length; p++) {
                        if (freeagents[p].firstName + " " + freeagents[p].lastName == players[x].firstName + " " + players[x].lastName) {
                          freeagents.splice(p, 1)
                          break;
                        }
                    } 
                    players.splice(x, 1);
                    x--;
                  } else {
                  for(p = 0; p < players[x].team.tplayers.length; p++) {
                      if (players[x].team.tplayers[p].firstName + " " + players[x].team.tplayers[p].lastName == players[x].firstName + " " + players[x].lastName) {
                        players[x].team.tplayers.splice(p, 1)
                        break;
                      }
                  } 
                  players.splice(x, 1);
                  x--;
                }
              }
        }
    }
}

function newGens() {

    num = Math.floor(Math.random() * (7 - 2 + 1)) + 2;
    for(x = 0; x < num; x++) {
    
    randNum = random(0, 100);

    if (randNum <= 1) {nat = "Argentina"; natid = 0};
    if (randNum <= 6 && randNum > 1) {nat = "Australia"; natid = 2};
    if (randNum <= 7 && randNum > 6) {nat = "Belgium"; natid = 4};
    if (randNum <= 12 && randNum > 7) {nat = "Brazil"; natid = 6};
    if (randNum <= 27 && randNum > 12) {nat = "Canada"; natid = 8};
    if (randNum <= 28 && randNum > 27) {nat = "Colombia"; natid = 10};
    if (randNum <= 28 && randNum > 29) {nat = "Denmark"; natid = 12};
    if (randNum <= 36 && randNum > 29) {nat = "England"; natid = 14};
    if (randNum <= 37 && randNum > 36) {nat = "Finland"; natid = 16};
    if (randNum <= 47 && randNum > 37) {nat = "France"; natid = 18};
    if (randNum <= 50 && randNum > 47) {nat = "Germany"; natid = 20};
    if (randNum <= 51 && randNum > 50) {nat = "Ireland"; natid = 22};
    if (randNum <= 53 && randNum > 51) {nat = "Italy"; natid = 24};
    if (randNum <= 56 && randNum > 53) {nat = "Netherlands"; natid = 26};
    if (randNum <= 58 && randNum > 56) {nat = "New Zealand"; natid = 28};
    if (randNum <= 59 && randNum > 58) {nat = "Norway"; natid = 30};
    if (randNum <= 61 && randNum > 59) {nat = "Scotland"; natid = 32};
    if (randNum <= 71 && randNum > 61) {nat = "Spain"; natid = 34};
    if (randNum <= 74 && randNum > 71) {nat = "Sweden"; natid = 36};
    if (randNum <= 100 && randNum > 74) {nat = "U.S.A"; natid = 38};

    randNumF = Math.floor(Math.random() * names.first.c[natid + 1].length) + 0;
    randNumL = Math.floor(Math.random() * names.last.c[natid + 1].length) + 0;

    fname = names.first.c[natid + 1][randNumF][0];

    lname = names.last.c[natid + 1][randNumL][0];

    randNum = random(0, 100);
    if (randNum <= 30) [age = 16];
    if (randNum <= 50 && randNum > 30) [age = 17];
    if (randNum <= 70 && randNum > 50) [age = 18];
    if (randNum <= 90 && randNum > 70) [age = 19];
    if (randNum <= 95 && randNum > 90) [age = 20];
    if (randNum <= 97 && randNum > 95) [age = 21];
    if (randNum <= 99 && randNum > 97) [age = 22];
    if (randNum <= 100 && randNum > 99) [age = 23];

    pid = players.length;

    freeagentt = {};

    player = new Player(fname, lname, age, nat, freeagentt);
    players.push(player);
    freeagents.push(player);

    freeagentt.tname = "Free Agents";
    
    rand = random(70, 100);

    if (rand >= 99) {
        players[pid].shot = Math.floor(Math.random() * (100 - (rand - 10) + 1) + (rand - 10));
        players[pid].save = Math.floor(Math.random() * (100 - (rand - 10) + 1) + (rand - 10));
        players[pid].ctrl = Math.floor(Math.random() * (100 - (rand - 10) + 1) + (rand - 10));
        players[pid].pass = Math.floor(Math.random() * (100 - (rand - 10) + 1) + (rand - 10));
        players[pid].ovr = Math.round((players[pid].pass + players[pid].ctrl + players[pid].save + players[pid].shot)/4)
        players[pid].pot = Math.floor(Math.random() * (100 - (players[pid].ovr) + 1) + players[pid].ovr)
    } else {
        players[pid].shot = Math.floor(Math.random() * ((rand + 10) - (rand - 10) + 1) + (rand - 10));
        players[pid].save = Math.floor(Math.random() * ((rand + 10) - (rand - 10) + 1) + (rand - 10));
        players[pid].ctrl = Math.floor(Math.random() * ((rand + 10) - (rand - 10) + 1) + (rand - 10));
        players[pid].pass = Math.floor(Math.random() * ((rand + 10) - (rand - 10) + 1) + (rand - 10));
        players[pid].ovr = Math.round((players[pid].pass + players[pid].ctrl + players[pid].save + players[pid].shot)/4)
        players[pid].pot = Math.floor(Math.random() * (100 - (players[pid].ovr) + 1) + players[pid].ovr)

    }


    }
}

function playerPickup() {
    for (x = 0; x < teams.length; x++) {
        if (teams[x].tplayers.length < 3) {
            while (teams[x].tplayers.length < 3) {
            picked = Math.floor(Math.random() * (freeagents.length - 1 - 0 + 1)) + 0;
            if (freeagents[picked] == undefined){
                newGens();
                picked = Math.floor(Math.random() * (freeagents.length - 1 - 0 + 1)) + 0;
            }
            teams[x].tplayers.push(freeagents[picked]);
            freeagents[picked].team = teams[x];
            freeagents.splice(picked, 1);
            }
        }

        for(c = 0; c < freeagents.length; c++) {
            for (z = 0; z < teams[x].tplayers.length; z++) {
                if (freeagents[c].overall > teams[x].tplayers[z]) {
                    freeagents.push(teams[x].tplayers[z])
                    teams[x].tplayers.splice(z,1);
                    teams[x].tplayers.push(freeagents[c]);
                    freeagents.splice(c, 1);
                }
            }  
        }
    }
}

function teamPage() {
    tname = event.target.innerHTML;

<<<<<<< HEAD
    if (tname == "Free Agents") {

    } else {

=======
>>>>>>> 0797371d72ccdac3a8114059b3c8bb38bc4f5954
    for(i = 0; i<teams.length; i++) {
        if (tname == teams[i].tname || tname == "Team:" + " " + teams[i].tname) {
            tteam = teams[i];
        }
    }

    body = document.body;

    if (body.children.length > 1) {
        for(v = 0; v < body.children.length - 1; v++) {
            body.removeChild(body.lastChild);
        }
    }

    hold = document.createElement("div");
    body.appendChild(hold);

    t = document.createElement("p");
    t.innerHTML = "Name: " + tteam.tname;
    t.setAttribute("stlye","font-size:25px;")
    hold.appendChild(t);

<<<<<<< HEAD
    

    }
=======
    p = document.createElement("table");
    hold.appendChild(p);
    row = document.createElement("tr");
    p.appendChild(row);

    h = document.createElement("th");
    h.innerHTML = "Player Name:"
    row.appendChild(h);

    h = document.createElement("th");
    h.innerHTML = "Age:"
    row.appendChild(h);

    h = document.createElement("th");
    h.innerHTML = "Nationality:"
    row.appendChild(h);

    h = document.createElement("th");
    h.innerHTML = "Overall:"
    row.appendChild(h);

    h = document.createElement("th");
    h.innerHTML = "Shot Rating:"
    row.appendChild(h);
    
    h = document.createElement("th");
    h.innerHTML = "Save Rating:"
    row.appendChild(h);

    h = document.createElement("th");
    h.innerHTML = "Control Rating:"
    row.appendChild(h);

    h = document.createElement("th");
    h.innerHTML = "Pass Rating:"
    row.appendChild(h);

    for(pl = 0; pl < tteam.tplayers.length; pl++) {

        playerlisting = document.createElement("tr");
        p.appendChild(playerlisting);
        pnam = document.createElement("td");
        pnam.innerHTML = tteam.tplayers[pl].firstName + " " + tteam.tplayers[pl].lastName;
        pnam.setAttribute("onclick", "playerPage()")
        playerlisting.appendChild(pnam);

        page = document.createElement("td");
        page.innerHTML = tteam.tplayers[pl].age;
        playerlisting.appendChild(page);

        pna = document.createElement("td");
        pna.innerHTML = tteam.tplayers[pl].nationality;
        playerlisting.appendChild(pna);

        povr = document.createElement("td");
        povr.innerHTML = tteam.tplayers[pl].ovr;
        playerlisting.appendChild(povr);

        page = document.createElement("td");
        page.innerHTML = tteam.tplayers[pl].shot;
        playerlisting.appendChild(page);

        page = document.createElement("td");
        page.innerHTML = tteam.tplayers[pl].save;
        playerlisting.appendChild(page);

        page = document.createElement("td");
        page.innerHTML = tteam.tplayers[pl].ctrl;
        playerlisting.appendChild(page);

        page = document.createElement("td");
        page.innerHTML = tteam.tplayers[pl].pass;
        playerlisting.appendChild(page);
    }
}

function eventGenerate() {
    enames = [
        "DreamHack",
        "ELEAGUE",
        "MLG",
    ]

    eplaces = [
        "Leizpig",
        "Berlin",
        "Madrid",
        "Barcelona",
        "London",
        "Manchester",
        "New York",
        "Chicago",
        "Paris",
        "Milan",
        "Toronto",
        "Lisbon",
        "Los Angeles",
        "Orlando",
        "Sydney",
        "Munich"
    ]

    id = Math.floor(Math.random() * enames.length) + 0;
    eventname = enames[id];

    id = Math.floor(Math.random() * eplaces.length) + 0;
    eventplace = eplaces[id];

    ename = eventname + " " + eventplace + " " + date[2];

    startdate = [date[0]+2, date[1], date[2]];

    e = new Tournament(ename, eventplace, startdate);
    events.push(e);
    e.teams = [];

    if (eventname == "DreamHack") {
        for(x=0; x<teams.length; x++) {
            if (teams[x].trank < 9) {
                e.teams.push(teams[x]);
            }
        }

        e.groups = [];

    numofgroup = (e.teams.length)/4;

    if (numofgroup == 2) {
        groupA = [];
        groupB = [];

        for(t =0; t<e.teams.length; t++) {
            if (e.teams[t].trank == 1 || e.teams[t].trank == 3 || e.teams[t].trank == 6 || e.teams[t].trank == 8) {
                groupA.push(e.teams[t]);
            } else {
                groupB.push(e.teams[t]);
            }
        }

        e.groups.push(groupA);
        e.groups.push(groupB);
    }

    } else {
        for(c=0; c<teams.length; c++) {
            if (teams[c].trank > 2) {
                e.teams.push(teams[c]);
            }
        }

        e.groups = [];

    numofgroup = (e.teams.length)/4;

    if (numofgroup == 2) {
        groupA = [];
        groupB = [];

        for(t =0; t<e.teams.length; t++) {
            if (e.teams[t].trank == 3 || e.teams[t].trank == 5 || e.teams[t].trank == 8 || e.teams[t].trank == 10) {
                groupA.push(e.teams[t]);
            } else {
                groupB.push(e.teams[t]);
            }
        }

        e.groups.push(groupA);
        e.groups.push(groupB);
        }
    }

    e.groups[0].matches = [];
    e.groups[1].matches = [];

    for (k=0;k<e.groups[0].length; k++) {
        ft = e.groups[0][k];
        for (s=0;s<e.groups[0].length; s++) {
            if (ft.tname == e.groups[0][s].tname) {

            } else {
                st = e.groups[0][s];
                if (e.groups[0].matches.length > 0) {
                    for (b = 0; b < e.groups[0].matches.length; b++) {
                        if (e.groups[0].matches[b].teamone.tname == ft.tname && e.groups[0].matches[b].teamtwo.tname == st.tname 
                            || e.groups[0].matches[b].teamtwo.tname == ft.tname && e.groups[0].matches[b].teamone.tname == st.tname) {
                            st = undefined;
                            break;
                        } else {
                        }
                    }
                    if (st != undefined) {
                        m = new Match(ft, st, startdate);
                        matches.push(m);
                        e.groups[0].matches.push(m);
                    }
                } else {
                    st = e.groups[0][s];
                    m = new Match(ft, st, startdate);
                    matches.push(m);
                    e.groups[0].matches.push(m);
                }
            }
        }
    }

    for (k=0;k<e.groups[1].length; k++) {
        ft = e.groups[1][k];
        for (s=0;s<e.groups[1].length; s++) {
            if (ft.tname == e.groups[1][s].tname) {

            } else {
                st = e.groups[1][s];
                if (e.groups[1].matches.length > 0) {
                    for (b = 0; b < e.groups[1].matches.length; b++) {
                        if (e.groups[1].matches[b].teamone.tname == ft.tname && e.groups[1].matches[b].teamtwo.tname == st.tname 
                            || e.groups[1].matches[b].teamtwo.tname == ft.tname && e.groups[1].matches[b].teamone.tname == st.tname) {
                            st = undefined;
                            break;
                        } else {
                        }
                    }
                    if (st != undefined) {
                        m = new Match(ft, st, [startdate[0], startdate[1]+1, startdate[2]]);
                        matches.push(m);
                        e.groups[1].matches.push(m);
                    }
                } else {
                    st = e.groups[1][s];
                    m = new Match(ft, st, [startdate[0], startdate[1]+1, startdate[2]]);
                    matches.push(m);
                    e.groups[1].matches.push(m);
                }
            }
        }
    }
}

function displayEvents() {

    body = document.body;

    if (body.children.length > 1) {
        for(v = 0; v < body.children.length - 1; v++) {
            body.removeChild(body.lastChild);
        }
    }

    t = document.createElement("table");

    t.id = "tl";

    body.appendChild(t);

    r = document.createElement("tr");

    t.appendChild(r);

    th = document.createElement('th');
    th.innerHTML = "Event Name";

    r.appendChild(th);

    th = document.createElement('th');
    th.innerHTML = "Start Date";

    r.appendChild(th);

    for (x=0; x < events.length; x++) {
        r = document.createElement("tr");
        t.appendChild(r);

        n = document.createElement("td");
        n.innerHTML = events[x].name;
        n.setAttribute("onClick", "teamPage()")
        r.appendChild(n);

        place = document.createElement("td");
        place.innerHTML = events[x].srtdate[0] + "/" + events[x].srtdate[1] + "/" + events[x].srtdate[2];
        r.appendChild(place);

    } 
>>>>>>> 0797371d72ccdac3a8114059b3c8bb38bc4f5954

}


