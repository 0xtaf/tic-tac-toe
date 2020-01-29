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
        flowControl.controlTheFlow();
        flowControl.myArray = [0,1,2,3,4,5,6,7,8];
        flowControl.winner.textContent = "Welcome!";
        flowControl.grids.forEach(grid => {
            console.log("before "+grid.textContent);
            grid.textContent = "";
            console.log("after " +grid.textContent);
        });
        
        if (goFirst.style.backgroundColor == "grey"){
            turn = "player";
        } else if (goSecond.style.backgroundColor == "grey") {
            turn = "player2";
        }
        startButton.disabled = true;
        startButton.className = "inactive";
        goFirst.disabled = true;
        goSecond.disabled = true;

   
        
        // flowControl.controlTheFlow();
    }

    function changeTurn1(){
        console.log("now turn is: "+turn);
        if (turn == "player2") {
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
        turn = "player2";
    }

    return{turn,goFirst,goSecond,startButton};
})();

const Player = (name,marker) => {
    return {name, marker};
};

const Gb = (() => {
    const r1c1 = document.getElementById(0); 
    const r1c2 = document.getElementById(1); 
    const r1c3 = document.getElementById(2); 
    const r2c1 = document.getElementById(3); 
    const r2c2 = document.getElementById(4); 
    const r2c3 = document.getElementById(5);
    const r3c1 = document.getElementById(6); 
    const r3c2 = document.getElementById(7); 
    const r3c3 = document.getElementById(8);
 
    let gbArray = [[r1c1,r1c2,r1c3],[r2c1,r2c2,r2c2],[r3c1,r3c2,r3c3]];
    return {gbArray, r1c1, r1c2, r1c3, r2c1, r2c2, r2c3, r3c1, r3c2, r3c3};

})();

const flowControl = (function controlTheFlow() {
    console.log("flowkontrol yuklendi");
    const grids = [...document.querySelectorAll('.gameboard')];
    const winner = document.querySelector('.winner');
    winner.textContent = "Welcome!";
    document.body.insertBefore(winner, document.body.firstChild);
    grids.forEach(grid => {
        grid.addEventListener('click', play);
    });

    const player1 = Player("ahmet", "X");
    const player2 = Player("player2", "O");
    

 function changeTurn(){
        if (Control.turn == "player2"){ 
            Control.turn = "player";
            console.log("turn has changed to: "+Control.turn);
        }else if(Control.turn == "player"){
            Control.turn = "player2";
            console.log("turn has changed to: "+Control.turn);
        }
     }
    

    myArray = [0,1,2,3,4,5,6,7,8];
    
    function play(){
        
        let cpuGrid;
        let condition = false;
        console.log("id"+this.id);
        console.log("myarray = " + myArray);
        if (this.textContent == ""){
            if (Control.turn == "player"){
                this.textContent = player1.marker;
                winningCondition();
              
                myArray.splice(myArray.indexOf(Number(this.id)),1);
                console.log(myArray);
            }
        
            while (condition == false){
                cpuGrid = Math.floor(Math.random()*myArray.length);
                console.log("secilen cpu grid indexi: "+cpuGrid);
                
                if (myArray.length != 0){ 
                    if (grids[myArray[cpuGrid]].textContent == ""){                    
                        condition = true;     
                        grids[myArray[cpuGrid]].textContent = player2.marker;
                        myArray.splice(myArray.indexOf(myArray[cpuGrid]),1);
                        console.log(myArray);
                        condition = false;
                        break;           
                    } else {
                        condition = false;
                    }
                } else {
                    break;
                }
            }
        }
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
    
    return {grids, winner, controlTheFlow,changeTurn,play,myArray};

})();