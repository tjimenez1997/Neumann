export default class Game {
    constructor() {
        this.inputData = ["1","2","3","4"];   
        this.temporaryInput = ["1","2","3","4"];
        this.temporaryOutput = [];
        this.morning = true;
        this.levelStatus = "Running" //Standby - (Menu before next level/day) Running - Player is currently playing the current level
        this.level = 1;
        this.workday = 96; //8 Hour Workday... How lucky! (5 minute intervals in 8 hours)
        this.hour = 8;
        this.minute= 0;
        this.playerCodeString = "";
        this.playerCode = []
        this.solutionCode = ["4","3","2","1"];
    }

    sleep = (ms) => {
        return new Promise((resolve) => {
          setTimeout(resolve, ms);
        });
    }

    timeLoop = async() => {
        let count = 0; //8 Hour Workday... How lucky!
        await this.sleep(500);
        while(count <= this.workday){
            this.minute += 5;
            this.minute = this.minute % 60;
            if(this.minute == 0){
                this.hour += 1;
                if(this.hour == 12){
                    this.morning = false;
                }
                if(this.hour > 12) {
                    this.hour = this.hour % 12;
                }
            }
            this.ui.updateGameClock(); //Controller - Causes UI Update for Game Clock
            await this.sleep(500);
            count++;
        }
    }

    setAndRunPlayerCode = (playerCode) => {
        this.playerCodeString = playerCode;
        let tokenized = this.playerCodeString.split("\n");
        tokenized = tokenized.filter((element) => {
            return element !== '';
        });

        

        this.runUserCode(tokenized);//Run These Instructions
    }

    runUserCode = async(array) => {
        /*let userCode = [];
        for(let i = 0; i < array.length; i++){
            let currentWord = array[i];
            if(currentWord.charAt(currentWord.length-1) === ";"){
                userCode.push(currentWord.substring(0,currentWord.length-2));
                userCode.push(";")
            }
        }*/
        this.playerCode = array;
        console.log(this.playerCode);
        for(let index = 0; index < this.playerCode.length; index++){
            if(this.playerCode[index].includes("get") && this.playerCode[index].substring(0,3) == 'get'){
                this.ui.moveIndicator(this.playerCode[index].substring(4,this.playerCode[index].length)); //Make sound after
                this.ui.highlightCodeLine(index);
            }
            let audio = new Audio('../assets/sounds/codeline.mp3');
            audio.play();
            await this.sleep(2000); //audio before
            this.ui.clearHighlights();
        }
    
        
        if(this.temporaryOutput === this.solutionCode) {
            console.log("correct solution");
        } else {
            this.temporaryInput = this.inputData;
            this.temporaryOutput = [];
            let audio = new Audio('../assets/sounds/error.mp3');
            audio.play();
            this.ui.displayError();
            await this.sleep(2000);
            this.ui.refreshDisplayData();
            console.log("incorrect solution!!! ERRROR try again")
        }
    }




}