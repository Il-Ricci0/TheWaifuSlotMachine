const pictures = ["pictures/yor.jpg","pictures/anya.jpg","pictures/mai.jpg","pictures/marin.jpg","pictures/zerotwo.jpg","pictures/asuna.jpg", "pictures/rem.jpg"];
let boxes = []
var values = [0, 0, 0, 0, 0, 0];
var points = [];
var bet = 1;
var balance = 10;
window.onload = (event) =>{
    document.getElementsByName("bet-amount")[0].placeholder = bet;
    document.getElementById('balance').innerHTML = "BALANCE: " + balance + "€";
    boxes = document.querySelectorAll('[id^="box_"]');
};

async function CheckWin(array){
    var counter = 1;
    for(i=1; i<array.length; i++){
        if(array[i]===array[i-1]){
            counter++;
        }else{
            counter=1;
        }
        points.push(counter);
    }
    console.log("points: " + points);
    var win = 0;
    {
        for(i=0; i<points.length; i++){
            if(points[i]!=1)
                win += bet*points[i];
        }
    }

    MarkBonus();

    document.getElementById('win').innerHTML = "WON: " + win + "€";
    balance+=win;
    document.getElementById('balance').innerHTML = "BALANCE: " + balance + "€";
}

async function MarkBonus(){
    await delay(300);
    for(i=0; i<points.length;i++){
        if(points[i]===2){
            boxes[i].classList.add('bg-warning');
            boxes[i+1].classList.add('bg-warning');
            await delay(800);
            boxes[i].classList.remove('bg-warning');
            boxes[i+1].classList.remove('bg-warning');
            await delay(800);
        }
    }
    for(i=0; i<points.length;i++){
        if(points[i]===3){
            boxes[i].classList.add('bg-warning');
            boxes[i+1].classList.add('bg-warning');
            boxes[i-1].classList.add('bg-warning');
            await delay(800);
            boxes[i].classList.remove('bg-warning');
            boxes[i+1].classList.remove('bg-warning');
            boxes[i-1].classList.remove('bg-warning');
            await delay(800);
        }
    }
    for(i=0; i<points.length;i++){
        if(points[i]===4){
            boxes[i].classList.add('bg-warning');
            boxes[i+1].classList.add('bg-warning');
            boxes[i-1].classList.add('bg-warning');
            boxes[i-2].classList.add('bg-warning');
            await delay(800);
            boxes[i].classList.remove('bg-warning');
            boxes[i+1].classList.remove('bg-warning');
            boxes[i-1].classList.remove('bg-warning');
            boxes[i-2].classList.remove('bg-warning');
            await delay(800);
        }
    }
    for(i=0; i<points.length;i++){
        if(points[i]===5){
            boxes[i].classList.add('bg-warning');
            boxes[i+1].classList.add('bg-warning');
            boxes[i-1].classList.add('bg-warning');
            boxes[i-2].classList.add('bg-warning');
            boxes[i-3].classList.add('bg-warning');
            await delay(800);
            boxes[i].classList.remove('bg-warning');
            boxes[i+1].classList.remove('bg-warning');
            boxes[i-1].classList.remove('bg-warning');
            boxes[i-2].classList.remove('bg-warning');
            boxes[i-3].classList.remove('bg-warning');
            await delay(800);
        }
    }
    for(i=0; i<points.length;i++){
        if(points[i]===6){
            boxes[i].classList.add('bg-warning');
            boxes[i+1].classList.add('bg-warning');
            boxes[i-1].classList.add('bg-warning');
            boxes[i-2].classList.add('bg-warning');
            boxes[i-3].classList.add('bg-warning');
            boxes[i-4].classList.add('bg-warning');
            await delay(800);
            boxes[i].classList.remove('bg-warning');
            boxes[i+1].classList.remove('bg-warning');
            boxes[i-1].classList.remove('bg-warning');
            boxes[i-2].classList.remove('bg-warning');
            boxes[i-3].classList.remove('bg-warning');
            boxes[i-4].classList.remove('bg-warning');
            await delay(800);
        }
    }
    if(bet>balance)
        bet=balance;
    document.getElementsByName("bet-amount")[0].placeholder = bet;
    document.getElementById('spin').classList.remove("disabled");
}

function Multiply(){
    if(bet*10<=balance){
        bet *= 10;
        document.getElementsByName("bet-amount")[0].placeholder = bet;
    }
}
function Divide(){
    if(bet%10===0){
        bet /= 10;
        document.getElementsByName("bet-amount")[0].placeholder = bet;
    }
}

function Add(){
    if(bet+1<=balance){
        bet+=1;
        document.getElementsByName("bet-amount")[0].placeholder = bet;
    }
}

function Remove(){
    if(bet>0){
        bet-=1;
        document.getElementsByName("bet-amount")[0].placeholder = bet;
    }
}

async function Spin(){
    document.getElementById('spin').classList.add("disabled");
    if(balance===0)
        return;
    balance -=bet;
    document.getElementById('balance').innerHTML = "BALANCE: " + balance + "€";
    document.getElementById('win').innerHTML = "WON: ?€";
    var k=0;
    for(k=0;k<5;k++){
        document.querySelectorAll('[id^="img_"]').forEach(function(element) {
            var key = Math.floor(Math.random() * pictures.length);
            element.src=pictures[key];
        });
        await delay(100);
    }
    for(k=0;k<5;k++){
        document.querySelectorAll('[id^="img_"]').forEach(function(element) {
            var key = Math.floor(Math.random() * pictures.length);
            element.src=pictures[key];
        });
        await delay(200);
    }
    for(k=0;k<5;k++){
        document.querySelectorAll('[id^="img_"]').forEach(function(element) {
            var key = Math.floor(Math.random() * pictures.length);
            element.src=pictures[key];
        });
        await delay(k*200);
    }
    points = [];
    var i=0;
    document.querySelectorAll('[id^="img_"]').forEach(function(element) {
        var key = Math.floor(Math.random() * pictures.length);
        element.src=pictures[key];
        values[i] = key;
        i++;
    });
    console.log("values: " + values)
    CheckWin(values);
}

function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}
