var dictLast = "";
var wordLast = "";
var queueSpeed = 1;
var mainID;

function getWord() {
    var arr = ig.game.entities.filter(ele => 'remainingWord' in ele && ele.remainingWord !== "" && dictLast !== ele.remainingWord && ele.word !== wordLast);
    if(arr.length > 0) {
        var ele = arr.pop();
        var retVal = ele.remainingWord;
        var retWord = ele.word;
        return {'r': retVal, 'k': retWord};
    }
    return {'r': '', 'k': undefined};
};

// not being used right now...
function spawnShooter(word, idx) {
    if(idx >= word.length)
        return;
    ig.game.shoot(word.charAt(idx));
    setTimeout(spawnShooter, shooterSpeed, word, ++idx);
}

function spawnQueuer(speed) {
    mainID = setInterval(function() {
        if(ig.game.mode === 2) {
            stopMain();
            return;
        }
        var shootWord = getWord();
        if (shootWord.r === '')
            return;
        dictLast = shootWord.r;
        wordLast = shootWord.k;
        for(var i = 0; i < wordLast.length; i++)
            ig.game.shoot(wordLast.charAt(i));
    }, speed, undefined);
}

function stopMain() {
    clearInterval(mainID);
}

function startMain() {
    spawnQueuer(queueSpeed);
}

startMain();