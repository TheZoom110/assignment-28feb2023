var words=[]
words[0] = ['RAINBOW', 'COMPUTER', 'SCIENCE', 'PROGRAMMING', 'MATHEMATICS', 'PLAYER', 'CONDITION', 'REVERSE', 'WATER', 'BOARD']

function choose(i) {
    var pick = words[i][Math.floor(Math.random() * words[i].length)]
    words[i].splice (words[i].indexOf(pick), 1)
    words[i+1] = words[i]
    return pick
}

function jumble(word) {
    var preJumble = word
    var postJumble = ""
    while (preJumble.length !=0) {
        letter = preJumble[Math.floor(Math.random() * preJumble.length)]
        postJumble = postJumble + letter
        preJumble = preJumble.replace(letter,'')
    }
    return postJumble
}

var j=0
var answer = []
var qn = []
while (j<10) {
    answer[j] = choose(j)
    qn[j] = jumble(answer[j])
    j = j+1
}

var p1score = 0
var p2score = 0
var turn = 0
var p1name
var p2name
var timer

function initial() {
    document.getElementById("playbox").hidden = true;
    document.getElementById("correct").hidden = true;
    document.getElementById("incorrect").hidden = true;
    document.getElementById("result").hidden = true;
}

function pnames() {
    p1name = document.getElementById("p1name").value.toUpperCase();
    p2name = document.getElementById("p2name").value.toUpperCase();
    if (!p1name || !p2name || p1name==p2name) {
        alert("Player names are not properly defined.\nPlease type proper names.")
    } else {
        play(p1name, p2name, p1score, p2score)
    }
}

function play(p1n, p2n, p1s, p2s) {
    var p1smsg = p1name + ": " + p1score;
    var p2smsg = p2name + ": " + p2score;
    document.getElementById("pans").value = "";
    document.getElementById("pnames").hidden = true;
    document.getElementById("playbox").hidden = false;
    document.getElementById("timer").hidden = true;
    document.getElementById("p1s").innerHTML = p1smsg;
    document.getElementById("p2s").innerHTML = p2smsg;
    document.getElementById("correct").hidden = true;
    document.getElementById("incorrect").hidden = true;

    if (turn<10) {
        document.getElementById("pqn").innerHTML = qn[turn];
        if (turn%2==0) {
            var pheadmsg = p1name + ": YOUR TURN"
            document.getElementById("phead").innerHTML = pheadmsg;
        } else {
            var pheadmsg = p2name + ": YOUR TURN"
            document.getElementById("phead").innerHTML = pheadmsg;
        }
    } else {
        document.getElementById("playbox").hidden = true;
        document.getElementById("result").hidden = false;
        if (p1score>p2score) {
            var winmsg = "The Winner is " + p1name;
            document.getElementById("winner").innerHTML = winmsg;
            document.getElementById("p1sf").innerHTML = p1smsg;
            document.getElementById("p2sf").innerHTML = p2smsg;
        } else if (p1score<p2score){
            var winmsg = "The Winner is " + p2name;
            document.getElementById("winner").innerHTML = winmsg;
            document.getElementById("p1sf").innerHTML = p1smsg;
            document.getElementById("p2sf").innerHTML = p2smsg;
        } else {
            var winmsg = "DRAW";
            document.getElementById("winner").innerHTML = winmsg;
            document.getElementById("p1sf").innerHTML = p1smsg;
            document.getElementById("p2sf").innerHTML = p2smsg;
        }
    }
}

function onSubmit() {
    var pans = document.getElementById("pans").value.toUpperCase();
    if (turn%2==0) {
        if (pans==answer[turn]) {
            document.getElementById("pcorrect").innerHTML = p1name;
            document.getElementById("correct").hidden = false;
            p1score = p1score + 1
        } else {
            document.getElementById("pincorrect").innerHTML = p1name;
            document.getElementById("incorrect").hidden = false;
        }
    } else {
        if (pans==answer[turn]) {
            document.getElementById("pcorrect").innerHTML = p2name;
            document.getElementById("correct").hidden = false;
            p2score = p2score + 1
        } else {
            document.getElementById("pincorrect").innerHTML = p2name;
            document.getElementById("incorrect").hidden = false;
        }
    }
    turn = turn+1
    timer = 3
    wait = setInterval(myTimer, 1000);
}

function myTimer() {
    if (turn==10) {
        timermsg = "Declaring winner in " + timer + " seconds"
    } else {
        timermsg = "Next question in " + timer + " seconds"
    }
    document.getElementById("timer").innerHTML = timermsg;
    document.getElementById("timer").hidden = false;
    if (timer==0) {
        play();
        clearTimeout(wait)
    }
    timer = timer-1
}