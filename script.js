const Control = (() => {
    const startButton = document.querySelector('.start_button');
    const goFirst = document.querySelector('.playfirst_button');
    const goSecond = document.querySelector('.playsecond_button');
    startButton.addEventListener('click', clean);
    goFirst.addEventListener('click', changeTurn1);
    goSecond.addEventListener('click', changeTurn2);
    let turn = "player";
    goFirst.style.backgroundColor = "grey";

    function clean(){
        if (goFirst.style.backgroundColor == "grey"){
            turn = "player";
        } else if (goSecond.style.backgroundColor == "grey") {
            turn = "cpu";
        }
        startButton.disabled = true;
        startButton.className = "inactive";
        goFirst.disabled = true;
        goSecond.disabled = true;

        flowControl.grids.forEach (grid => {
            grid.textContent = "";
            flowControl.winner.textContent = "Welcome!";        
        });
        
        // flowControl.controlTheFlow();
    }

    function changeTurn1(){
        console.log("now turn is: "+turn);
        if (turn == "cpu") {
        flowControl.changeTurn();
        }
        goFirst.style.backgroundColor = "grey";
        goSecond.style.backgroundColor = "#c62d1f";
        turn = "player";
    }
    function changeTurn2(){
        console.log("now turn is: "+turn);
        if (turn == "player") {
            flowControl.changeTurn();
        }
        goSecond.style.backgroundColor = "grey";
        goFirst.style.backgroundColor = "#c62d1f";
        turn = "cpu";
    }

    return{turn,goFirst,goSecond,startButton};
})();

const Player = (name,marker) => {
    return {name, marker};
};

const Gb = (() => {
    const r1c1 = document.getElementById(1); 
    const r1c2 = document.getElementById(2); 
    const r1c3 = document.getElementById(3); 
    const r2c1 = document.getElementById(4); 
    const r2c2 = document.getElementById(5); 
    const r2c3 = document.getElementById(6);
    const r3c1 = document.getElementById(7); 
    const r3c2 = document.getElementById(8); 
    const r3c3 = document.getElementById(9);
 
    let gbArray = [[r1c1,r1c2,r1c3],[r2c1,r2c2,r2c2],[r3c1,r3c2,r3c3]];
    return {gbArray, r1c1, r1c2, r1c3, r2c1, r2c2, r2c3, r3c1, r3c2, r3c3};

})();

const flowControl = (function controlTheFlow() {
    const grids = document.querySelectorAll('.gameboard');
    const winner = document.querySelector('.winner');
    winner.textContent = "Welcome!";
    document.body.insertBefore(winner, document.body.firstChild);
    grids.forEach(grid => {
        grid.addEventListener('click', play);
    });

    const player1 = Player("ahmet", "X");
    const player2 = Player("cpu", "O");
    

 function changeTurn(){
        if (Control.turn == "cpu"){ 
            Control.turn = "player";
            console.log("turn has changed to: "+Control.turn);
        }else if(Control.turn == "player"){
            Control.turn = "cpu";
            console.log("turn has changed to: "+Control.turn);
        }
     }
    
   
    function play(){

        console.log("control turn "+ Control.turn +" idi")
        if (this.textContent == ""){
            if (Control.turn == "player"){
                this.textContent = player1.marker;   
                Control.turn = "cpu";
            } else if (Control.turn == "cpu"){
                this.textContent = player2.marker;   
                Control.turn = "player";
            }   
            winningCondition();
        } 
        console.log("control turn "+ Control.turn +" oldu")
    }
    


    function winningCondition(){
        function changeCond(){
            Control.startButton.disabled = false;
            Control.startButton.className = "start_button red";
            Control.goFirst.disabled = false;
            Control.goSecond.disabled = false;
            if (Control.goFirst.style.backgroundColor == "grey"){
                Control.turn = "player";
            } else if (Control.goFirst.style.backgroundColor == "grey") {
                Control.turn = "cpu";
            }
        };
        if ((Gb.r1c1.textContent == Gb.r1c2.textContent) && (Gb.r1c1.textContent == Gb.r1c3.textContent) && (Gb.r1c1.textContent != "")){
            winner.textContent = "we have a winner!";
            changeCond();
        } else if ((Gb.r2c1.textContent == Gb.r2c2.textContent) && (Gb.r2c1.textContent == Gb.r2c3.textContent) && (Gb.r2c1.textContent != "")){
            winner.textContent = "we have a winner!"; 
            changeCond();          
        } else if ((Gb.r3c1.textContent == Gb.r3c2.textContent) && (Gb.r3c1.textContent == Gb.r3c3.textContent) && (Gb.r3c1.textContent != "")){
            winner.textContent = "we have a winner!";  
            changeCond();         
        } else if ((Gb.r1c1.textContent == Gb.r2c1.textContent) && (Gb.r1c1.textContent == Gb.r3c1.textContent) && (Gb.r1c1.textContent != "")){
            winner.textContent = "we have a winner!";            
            changeCond();
        } else if ((Gb.r1c2.textContent == Gb.r2c2.textContent) && (Gb.r1c2.textContent == Gb.r3c2.textContent) && (Gb.r3c2.textContent != "")){
            winner.textContent = "we have a winner!";   
            changeCond();         
        } else if ((Gb.r1c3.textContent == Gb.r2c3.textContent) && (Gb.r1c3.textContent == Gb.r3c3.textContent) && (Gb.r1c3.textContent != "")){
            winner.textContent = "we have a winner!";  
            changeCond();          
        } else if ((Gb.r1c1.textContent == Gb.r2c2.textContent) && (Gb.r1c1.textContent == Gb.r3c3.textContent) && (Gb.r1c1.textContent != "")){
            winner.textContent = "we have a winner!";  
            changeCond();         
        } else if ((Gb.r1c3.textContent == Gb.r2c2.textContent) && (Gb.r1c3.textContent == Gb.r3c1.textContent) && (Gb.r1c3.textContent != "")){
            winner.textContent = "we have a winner!"; 
            changeCond();           
        } else if ((Gb.r1c1.textContent != "") && (Gb.r1c2.textContent != "") && (Gb.r1c3.textContent != "") && (Gb.r2c1.textContent != "") && (Gb.r2c2.textContent != "") && (Gb.r2c3.textContent != "") && (Gb.r3c1.textContent != "") && (Gb.r3c2.textContent != "") && (Gb.r3c3.textContent != "")){
            winner.textContent = "berabere";
            changeCond();
        }
        
        
    }
    
    return {grids, winner, controlTheFlow,changeTurn};

})();