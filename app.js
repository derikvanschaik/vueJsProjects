const app = Vue.createApp({
    data(){
        return {
            gamePlaying : false,
            userChar : 'X', // default 
            gameOver : false,
            userWon: false,
            isTie : false,
            playingGrid: [
                ['_', '_', '_'],
                ['_', '_', '_'],
                ['_', '_', '_'],
            ], 
        }

    },
    methods:{
        isGameOver(){
            // this will track a tie -- if noMorePos is true but gamewon is false -- no winner 
            let noMorePos = (this.getFreePos().length === 0); 
            console.log("No more pos: ", noMorePos); 
            let gameWon = false; 
            // rows 
            this.playingGrid.forEach((row)=>{
                gameWon = gameWon || (row.every((value)=>value==="X") || row.every((value)=>value==="O")); 
            }); 
            // diagonals 
            let diagonal1 = []; 
            let diagonal2 = []; 
            for(let i =0, j=2; (i < 3 && j >= 0); i++, j--){
                diagonal1.push( this.playingGrid[i][i]); 
                diagonal2.push( this.playingGrid[i][j] ); 
            }
            gameWon = gameWon || (diagonal1.every((value)=>value==="X") || diagonal1.every((value)=>value==="O")); 
            gameWon = gameWon || (diagonal2.every((value)=>value==="X") || diagonal2.every((value)=>value==="O"));

            // columns 
            for(let col = 0; col < 3; col++){
                let column = []; 
                for (let row = 0; row < 3; row++){
                    column.push( this.playingGrid[row][col] ); 
                }
                gameWon = gameWon || (column.every((value)=>value==="X") || column.every((value)=>value==="O"));
                console.log(" in columns: ", gameWon);
                console.log( column); 
            }
            this.isTie = (noMorePos && !gameWon);
            console.log("this.isTie", this.isTie); 
            return (gameWon || this.isTie); 

        }, 
        getFreePos(){
            let availablePositions = []; // array of arrays containing the row and col of empty positions 
            for(let i = 0; i < 3; i++){
                for (let j = 0; j < 3; j++ ){
                    if (this.playingGrid[i][j] === "_"){
                        availablePositions.push([i,j]);
                    }
                }
            }
            return availablePositions; 
        },
        playBotTurn(){
            // simulate playing a very unintelligent tic tac toe bot
            const availablePos = this.getFreePos();
            if (availablePos.length === 0){
                return; // no more available positions     
            }
            const [randRow, randCol] = availablePos[Math.floor(Math.random()*availablePos.length)];
            let robotChar = 'O'; 
            if (this.userChar === "O"){
                robotChar = 'X'; 
            }
            this.playingGrid[randRow][randCol] = robotChar;
        },
        contains(searchArray, array){

            let isIn = false;
            // searching the search array to see if it contains the array
            if (searchArray.length === 0){
                return; // no available positions 
            }
            searchArray.forEach( (list) =>{
                isIn = isIn || (JSON.stringify(list) === JSON.stringify(array) ); // json stringify to see if the contents are equal 
            }); 
            return isIn; 
        }, 
        playUserTurn(row, col){
            if (this.gameOver){
                return; // user is clicking after game 
            }
            const availablePos = this.getFreePos(); // get the currently open positions 
            const positions = [row, col]; // where the user clicked 
            if (!this.contains(availablePos, positions) ){

                alert(`row ${positions[0]}, and col ${positions[1]} already taken!`); 

            }else { // valid position 
                const [row,col] = positions;
                this.playingGrid[row][col] = this.userChar;
                // check if the user won the game during this round 
                this.gameOver = this.isGameOver();
                this.userWon = (this.gameOver && !this.isTie); // case when game is over and it was a tie
                // robot turn 
                this.playBotTurn(); 
                // check to see if the bot won this game during this round 
                this.gameOver = this.isGameOver();
            }

        },
        endingMessage(){

            if(this.userWon){
                 return "You won!"; 
            }if (!this.isTie){
                return "The bot won"; 
            }else{
                return "Tie."; 
            }
        }, 
        resetGame(){
            this.gamePlaying = true; 
            this.gameOver = false;
            this.playingGrid = this.playingGrid.map((row) =>{
                return ['_', '_', '_']; 
            }); 
        }

    }

}).mount("#assignment"); 