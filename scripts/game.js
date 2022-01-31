export default class Game {
    constructor() {
        this.inputData = [];
        this.outputData = []; 
        this.temporaryInput = ["1","2","3","4"];
        this.temporaryOutput = [];
        this.levelStatus = "Running" //Standby - (Menu before next level/day) Running - Player is currently playing the current level
        this.level = 1;
        this.workday = 96; //8 Hour Workday... How lucky! (5 minute intervals in 8 hours)
        this.hour = 8;
        this.minute= 0;
        this.playerCodeString = "";
        this.playerCode = []
        this.solutionCodeString = "4,3,2,1"; //Formatted with Commas to make it easier
        this.solutionCode = [];
    }

    sleep = (ms) => {
        return new Promise((resolve) => {
          setTimeout(resolve, ms);
        });
    }

    timeLoop = async() => {
        let count = 0; //8 Hour Workday... How lucky!
        await this.sleep(5000);
        while(count <= this.workday){
            this.minute += 5;
            this.minute = this.minute % 60;
            if(this.minute == 0){
                this.hour += 1;
                this.hour = this.hour % 12;
            }
            this.ui.updateGameClock(); //Controller - Causes UI Update for Game Clock
            await this.sleep(5000);
            count++;
        }
    }

    setAndRunPlayerCode = (playerCode) => {
        this.playerCodeString = playerCode;
        let preTokenized = this.playerCodeString.split(" ");
        this.tokenizeRawUserCode(preTokenized);
    }

    tokenizeRawUserCode = (array) => {
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
    }




}