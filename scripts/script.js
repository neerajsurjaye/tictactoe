let gameBoard = (()=>{
    let board = [];
    
    // sets a value
    let set = (position , character)=>{
        
        if(position > 8 || position < 0){
            console.error("Err wrong value");
        }
        if(check(position)){
            board[position] = character;
            return true;
        }
        return false;

    }

    //overWrite a position
    let overW = (position , character)=>{
        if(position > 8 || position < 0){
            console.error("Err wrong value");
        }
        board[position] = character;
    }

    //return board
    let get = ()=>{
        return board;
    }

    let get_at = (position)=>{
        return board[position];
    }

    //print board
    let printBoard = ()=>{
        console.log(board);
    }

    //Checks if position is already filled
    let check = (position) =>{
        if(board[position] == ""){
            return true;
        }
        return false;
    }

    //Check winning condition
    let check_win = ()=>{
        let won = false;

        for(var i = 0 ; i < 3 ; i++){
            //check columns
            if(board[3*i] == board[1 + (3*i)] &&  board[1 + (3*i)] == board[2 + (3*i)] && board[3*i] != ""){
                
                won = true;
            }
            if(board[i] == board[3+i] && board[3+i] == board[6+i] && board[i] != ""){
                won = true;
                
            }
        }

        if(board[0] == board[4] && board[4] == board[8] && board[0] != ""){
            won = true;
        }

        if(board[2] == board[4] && board[4] ==  board[6] && board[2] != ""){
            won = true;
        }

        return won;
    }

    let check_draw = ()=>{
        for(var i = 0 ; i < 9 ; i++){
            if(board[i] == ""){
                return false;
            }
        }
        return true;
    }

    //initializes board
    let init = ()=>{
        for(var i = 0 ; i < 9 ; i++){
            board[i] = "";
        }
    }
    init();

    return{set , get, overW , printBoard , get_at , check , check_win , check_draw , init};
}
)();

let players = ()=>{
    let name = "no name";
    let score = 0;
    let playerCharacter = "";

    let setName = (iName)=>{
        name = iName;
    }

    let getName = ()=>{
        return name;
    }

    let getChar = ()=>{
        return playerCharacter;
    }

    let setChar = (iChar)=>{
        playerCharacter = iChar;
    }


    let incScore = ()=>{
        score++;
    }

    let getScore = ()=>{
        return score;
    }

    let setScore = (iScore)=>{
        score = iScore;
    }

    let printData = ()=>{
        console.log(name , score);
    }
    
    return {setName , getName , incScore , getScore , setScore , printData , getChar , setChar};
}





let displayController = (() => {

    let mid = document.querySelector("#mid");

    let container = document.createElement("div");
    container.id = "container";
    mid.appendChild(container);


    let grid = [];
    let grid_row = [];
    let generateGrid = () =>{
        for(let i = 0 ; i < 9 ; i++){
            grid[i] = document.createElement("div");
            grid[i].classList.add("grid");
            grid[i].dataset.location = i;

            if(i == 0 || i == 1 || i == 2){
                grid[i].classList.add("borderDown");
            }

            if(i == 6 || i == 7 || i == 8){
                grid[i].classList.add("borderTop");
            }

            if(i == 0 || i == 3 || i == 6){
                grid[i].classList.add("borderRight");
            }

            if(i == 2 || i == 5 || i == 8){
                grid[i].classList.add("borderLeft");
            }
        }

        for(let i = 0 ; i < 3 ; i++){
            grid_row[i] = document.createElement("div");
            grid_row[i].classList.add("grid-row");
        }
    }
    generateGrid();

    //add grid elemetns
    let addGrid = ()=>{
        let counter = 0;
        for(var i = 0 ; i < 3 ; i++){
            container.appendChild(grid_row[i]);
            for(var j = 0 ; j < 3 ; j++){
                grid_row[i].appendChild(grid[counter]);
                counter++;
            }
        }
    }
    addGrid();


    let setCharacter = (position , character)=>{
        grid[position].textContent = character;
    }

    let updateBoard = ()=>{
        for(var i = 0 ; i < 9 ; i++){
            grid[i].textContent = gameBoard.get_at(i);
        }
    }


    return{setCharacter , updateBoard};

})();



let gameController = (() =>{
    
    let container = document.querySelector("#container");
    let play_again = document.querySelector("#play-again");
    let reset = document.querySelector("#reset");
    let game_screen = document.querySelector("#game-screen");

    let humanA_button = document.querySelector("#playerA-h");
    let aiA_button = document.querySelector("#playerA-a");
    let humanB_button = document.querySelector("#playerB-h");
    let aiB_button = document.querySelector("#playerB-a");

    let player_inputA = document.querySelector("#playerA");
    let player_inputB = document.querySelector("#playerB");
    
    let player_won = document.querySelector("#player-won");

    let ai_a = false;
    let ai_b = false;

    let playerA = players();
    let playerB = players();

    let CurrentPlayer = playerA;

    playerA.setChar("X");
    playerB.setChar("O");
    playerA.setName("Player A");
    playerB.setName("Player B");

    let inputs = ()=>{
        

        

        let header = document.querySelector("#header");

        let button_handler = (e)=>{

            if(e.target.id == "playerA-h"){
                e.target.classList.add("primary-btn-active");
                aiA_button.classList.remove("primary-btn-active");
                ai_a = false;
            }

            if(e.target.id == "playerA-a"){
                e.target.classList.add("primary-btn-active");
                humanA_button.classList.remove("primary-btn-active");
                ai_a = true;
            }

            if(e.target.id == "playerB-h"){
                e.target.classList.add("primary-btn-active");
                aiB_button.classList.remove("primary-btn-active");

                ai_b = false;
            }

            if(e.target.id == "playerB-a"){
                e.target.classList.add("primary-btn-active");
                humanB_button.classList.remove("primary-btn-active");
                ai_b = true;
            }
            set_name();
            noHuman();
        }
        header.addEventListener("click" , button_handler);

    }
    inputs();


    let set_name =()=>{
        
        if(player_inputA.value != ""){
            playerA.setName(player_inputA.value);
        }

        if(player_inputB.value != ""){
            playerA.setName(player_inputB.value);
        }
    }

    let noHuman = ()=>{
        if(ai_a == true && ai_b == true){
            let won = 0;
            while(!won){
                var loc = parseInt(Math.random()*9);
                while(!gameBoard.check(loc)){
                    loc = parseInt(Math.random()*9);
                }

                gameBoard.set(loc , CurrentPlayer.getChar());
                displayController.updateBoard();
                if(gameBoard.check_win()){
                    game_end("WON" , CurrentPlayer.getName());
                    won = 1;
                }
                else if(gameBoard.check_draw()){
                    game_end("draw");
                    won = 1;
                }
                changePlayer();
            }
        }
    }
   

    //updates board after click event
    let updateBoard = (e)=>{

        let location = parseInt(e.target.dataset.location);
        
        playBoard(location);
        
        
    }

    let playBoard = (location , recc = 0)=>{

        if(gameBoard.set(location , CurrentPlayer.getChar())){
            displayController.updateBoard();
            if(gameBoard.check_win()){
                game_end("WON" , CurrentPlayer.getName());
            }
            else if(gameBoard.check_draw()){
                game_end("draw");
            }
            else{
                changePlayer();
                if(ai_b == true && recc == 0){
                    var loc = parseInt(Math.random()*9);
                    while(!gameBoard.check(loc)){
                        loc = parseInt(Math.random()*9);
                    }
                    playBoard(loc , 1);
                }
            }
        }
    }

    //change current player
    let changePlayer = ()=>{
        if(CurrentPlayer == playerA){
            CurrentPlayer = playerB;
        }
        else{
            CurrentPlayer = playerA;
        }
    }

    container.addEventListener("click" , updateBoard);

    //old WARNING:Do not use
    let game_reset = ()=>{
        gameBoard.init();
        displayController.updateBoard();
        CurrentPlayer = playerA;
    }

    let game_end = (condition , player = "noName")=>{
        
        let game_condition = document.querySelector("#game-condition");
        
        
        console.log(player);
        game_screen.style.display = "flex";
        if(player != "noName"){
            player_won.textContent = player;
        }
        game_condition.textContent = condition;
    }

    let remove_active = ()=>{
        aiA_button.classList.remove("primary-btn-active");
        humanA_button.classList.remove("primary-btn-active");
        aiB_button.classList.remove("primary-btn-active");
        humanB_button.classList.remove("primary-btn-active");
    }


    //reset_game
    let reset_game = ()=>{
        gameBoard.init();
        displayController.updateBoard();
        game_screen.style.display = "none";
        CurrentPlayer = playerA;
        ai_a = false;
        ai_b = false;
        remove_active();
        player_won.textContent = "";
    }
    reset.addEventListener("click" , reset_game);
    play_again.addEventListener("click" , reset_game);
    
})();




