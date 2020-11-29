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

    setName = (iName)=>{
        name = iName;
    }

    getName = ()=>{
        return name;
    }

    getChar = ()=>{
        return playerCharacter;
    }

    setChar = (iChar)=>{
        playerCharacter = iChar;
    }


    incScore = ()=>{
        score++;
    }

    getScore = ()=>{
        return score;
    }

    setScore = (iScore)=>{
        score = iScore;
    }

    printData = ()=>{
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
        for(var i = 0 ; i < 9 ; i++){
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

        for(var i = 0 ; i < 3 ; i++){
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

    let playerA = players();
    let playerB = players();

    let CurrentPlayer = playerA;

    playerA.setChar("X");
    playerB.setChar("O");
    playerA.setName("john");
    playerB.setName("Ben");

    //updates board after click event
    let updateBoard = (e)=>{

        let location = parseInt(e.target.dataset.location);
        if(gameBoard.set(location , CurrentPlayer.getChar())){
            displayController.updateBoard();
            if(gameBoard.check_win()){
                console.log("won : " , CurrentPlayer.getName());
                game_reset();
            }
            else if(gameBoard.check_draw()){
                console.log("draw");
                game_reset();
            }
            else{
                changePlayer();
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


    let game_reset = ()=>{
        gameBoard.init();
        displayController.updateBoard();
        CurrentPlayer = playerA;
    }

    
})();


