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

    //initializes board
    let init = ()=>{
        for(var i = 0 ; i < 9 ; i++){
            board[i] = "";
        }
    }
    init();

    return{set , get, overW , printBoard , get_at , check};
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

    let body = document.querySelector("body");

    let container = document.createElement("div");
    container.id = "container";
    body.appendChild(container);


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

    //updates board after click event
    let updateBoard = (e)=>{

        let location = parseInt(e.target.dataset.location);
        if(gameBoard.set(location , CurrentPlayer.getChar())){
            changePlayer();
        }
        displayController.updateBoard();
        
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

    
})();


