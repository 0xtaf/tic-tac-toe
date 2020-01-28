const Control = (() => {
    const startButton = document.querySelector('.start_button');
    startButton.addEventListener('click', clean);

    function clean(){
        flowControl.grids.forEach (grid => {
            grid.textContent = "";
            flowControl.winner.textContent = "";
        });
    }

    
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

const flowControl = (() => {
    const grids = document.querySelectorAll('.gameboard');
    const winner = document.querySelector('.winner');
    winner.textContent = "Welcome!";
    document.body.insertBefore(winner, document.body.firstChild);
    grids.forEach(grid => {
        grid.addEventListener('click', play);
    });

    const player1 = Player("ahmet", "X");
    const player2 = Player("cpu", "O");
    


    let turn = "player";
    function play(){
        if (this.textContent == ""){
            if (turn == "player"){
                this.textContent = player1.marker;   
                turn = "cpu";
            } else if (turn == "cpu"){
                this.textContent = player2.marker;   
                turn = "player";
            }   
            winningCondition();
        } 
    }
    


    function winningCondition(){
        
        if ((Gb.r1c1.textContent == Gb.r1c2.textContent) && (Gb.r1c1.textContent == Gb.r1c3.textContent) && (Gb.r1c1.textContent != "")){
            winner.textContent = "we have a winner!";
        } else if ((Gb.r2c1.textContent == Gb.r2c2.textContent) && (Gb.r2c1.textContent == Gb.r2c3.textContent) && (Gb.r2c1.textContent != "")){
            winner.textContent = "we have a winner!";           
        } else if ((Gb.r3c1.textContent == Gb.r3c2.textContent) && (Gb.r3c1.textContent == Gb.r3c3.textContent) && (Gb.r3c1.textContent != "")){
            winner.textContent = "we have a winner!";           
        } else if ((Gb.r1c1.textContent == Gb.r2c1.textContent) && (Gb.r1c1.textContent == Gb.r3c1.textContent) && (Gb.r1c1.textContent != "")){
            winner.textContent = "we have a winner!";            
        } else if ((Gb.r1c2.textContent == Gb.r2c2.textContent) && (Gb.r1c2.textContent == Gb.r3c2.textContent) && (Gb.r3c2.textContent != "")){
            winner.textContent = "we have a winner!";            
        } else if ((Gb.r1c3.textContent == Gb.r2c3.textContent) && (Gb.r1c3.textContent == Gb.r3c3.textContent) && (Gb.r1c3.textContent != "")){
            winner.textContent = "we have a winner!";            
        } else if ((Gb.r1c1.textContent == Gb.r2c2.textContent) && (Gb.r1c1.textContent == Gb.r3c3.textContent) && (Gb.r1c1.textContent != "")){
            winner.textContent = "we have a winner!";           
        } else if ((Gb.r1c3.textContent == Gb.r2c2.textContent) && (Gb.r1c3.textContent == Gb.r3c1.textContent) && (Gb.r1c3.textContent != "")){
            winner.textContent = "we have a winner!";            
        } else if ((Gb.r1c1.textContent != "") && (Gb.r1c2.textContent != "") && (Gb.r1c3.textContent != "") && (Gb.r2c1.textContent != "") && (Gb.r2c2.textContent != "") && (Gb.r2c3.textContent != "") && (Gb.r3c1.textContent != "") && (Gb.r3c2.textContent != "") && (Gb.r3c3.textContent != "")){
            winner.textContent = "berabere";
        }
        
        
    }
    
    return {grids, winner};

})();