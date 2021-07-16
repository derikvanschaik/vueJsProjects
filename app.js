const app = Vue.createApp({
    data(){
        return {
            gamePlaying : false,
            gameOver : false,
            userWon: false, 
            nextPos: '', 
            playingGrid: [
                ['_', '_', '_'],
                ['_', '_', '_'],
                ['_', '_', '_'],
            ], 
        }

    },
    methods:{
        isGameOver(){
            if (this.getFreePos().length === 0){
                return true; // game is obviously over 
            }
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
            return gameWon; 

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
            this.playingGrid[randRow][randCol] = 'O';
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
        playUserTurn(){
            const positions = this.nextPos.split(' ').map( (element) => parseInt(element)); // convert strings to ints in the map 
            const availablePos = this.getFreePos();
            if (positions.length !== 2){

                alert("Please enter value such as: 0 1"); 

            } else if (positions.length === 2 && !this.contains(availablePos, positions) ){

                alert(`row ${positions[0]}, and col ${positions[1]} already taken!`); 

            }else { // valid position 
                const [row,col] = positions;
                this.playingGrid[row][col] = 'X';
                // check if the user won the game during this round 
                this.gameOver = this.isGameOver();
                this.userWon = this.gameOver;
                // robot turn 
                this.playBotTurn(); 
                // check to see if the bot won this game during this round 
                this.gameOver = this.isGameOver(); 
            }
            // reset the input field 
            this.nextPos = '';

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