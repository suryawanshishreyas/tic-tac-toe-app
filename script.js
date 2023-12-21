const boxes = document.querySelectorAll('.box');
const gameInfo = document.querySelector('.game-info');
const newGameBtn = document.querySelector('.btn');

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//creating a function to initialize the game

function initGame(){
    currentPlayer="X";
    gameGrid  =  ["","","","","","","","",""];
    // make ui empty
    boxes.forEach((box,index)=>{
        box.innerHTML = "";
        boxes[index].style.pointerEvents ='all';
        boxes[index].classList.remove('win');
    })
    newGameBtn.classList.remove('active');
    gameInfo.innerText = `Current Player- ${currentPlayer}`;
}

initGame();

// check game over
function checkGameOver(){
    let answer = "";
    // all 3 boxes should be non empty and same in value
    winningPositions.forEach((position)=>{
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== ""|| gameGrid[position[2]] !== "")
        && (gameGrid[position[0]] === gameGrid[position[1]])
        && (gameGrid[position[1]] === gameGrid[position[2]])){
            // check if winner is X
            if(gameGrid[position[0]] === "X")
                answer="X";
            else
                answer="O";
            // X or O should be a winner

            // disable pointer events so no more click on boxes
            boxes.forEach((box)=>{
                box.style.pointerEvents = 'none';
            });

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });
    // we have a winner so start new game button should show
    if(answer !== ""){
        newGameBtn.classList.add('active');
        gameInfo.innerText = `Winner is -${answer}`;
        return;
    }

    // tie condition
    let fillCount = 0;
    gameGrid.forEach((box)=>{
        if(box!="")
        fillCount++;
        console.log(fillCount);
    });

    // fillCount should be 9 if all boxes are selected

    if(fillCount === 9){
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add('active');
    }
}


    


// new game btn
newGameBtn.addEventListener('click',initGame);



//Executing each box one by one 
boxes.forEach((box,index)=>{
    box.addEventListener('click',()=>{
        handleClick(index);
    })
})

function swapTurn(){
    if(currentPlayer === 'X'){
        currentPlayer = "O";
    }
    else{
        currentPlayer ="X";
    }
    // Updating UI about currentPlayer
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerHTML = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        // swap turn
        swapTurn();
        // check if win
        checkGameOver();
    }
}

