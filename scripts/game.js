export default class Game {
    constructor() {
        this.level1 =  ["1", "2"];
        this.level2 =  ["1", "2", "3", "4"];
        this.level3 =  ["1", "2", "3", "4", "5", "6"];
        this.level4 =  ["1", "2"];
        this.temporaryInput = ["1","2"];
        this.temporaryOutput = [];
        this.temporarySave = ["","","",""];
        this.temporaryInstruction = "";
        this.temporaryValue = -1;
        this.morning = true;
        this.levelStatus = "Running" //Standby - (Menu before next level/day) Running - Player is currently playing the current level
        this.level = 1; //changed this
        this.workday = 95; //8 Hour Workday... How lucky! (5 minute intervals in 8 hours)
        this.hour = 9;
        this.minute= 0;
        this.playerCodeString = "";
        this.playerCode = []
        this.solution1 = ["2","1"];
        this.solution2 = ["4","3","2","1"];
        this.solution3 = ["6","5","4","3","2","1"];
        this.solution4 = ["2","2","2","1"];
    }

    sleep = (ms) => {
        return new Promise((resolve) => {
          setTimeout(resolve, ms);
        });
    }

    timeLoop = async() => {
        let count = 0; //8 Hour Workday... How lucky!
        await this.sleep(500);
        console.log(((this.hour == 5) && (this.minute == 0)));
        while(((this.hour != 5) || (this.minute != 0))){
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
        //lose message
        if(this.level != 5) {
            this.ui.displayLoss();
        }
        
    }

    setAndRunPlayerCode = (playerCode) => {
        this.playerCodeString = playerCode;
        let tokenized = this.playerCodeString.split("\n");
        tokenized = tokenized.filter((element) => {
            return element !== '';
        });

        for(let index = 0; index < tokenized.length; index++){
            tokenized[index] = tokenized[index].trim();
        }

        console.log("USER INPUT:")
        console.log(tokenized);
        console.log("-----------")

        this.runUserCode(tokenized);//Run These Instructions
    }

    runUserCode = async(array) => {
        this.playerCode = array;
        for(let index = 0; index < this.playerCode.length; index++){
            //Highlights and Manipulates Game Data Model
            if(this.playerCode[index].substring(0,3) == 'get'){
                this.temporaryInstruction = 'get';
                this.temporaryValue = this.playerCode[index].substring(4,this.playerCode[index].length-1);
                //console.log(this.playerCode[index].substring(4,this.playerCode[index].length-1));
                this.ui.moveIndicator(this.playerCode[index].substring(4,this.playerCode[index].length)); //Make sound after
                this.ui.highlightCodeLine(index);
                this.temporaryValue = this.temporaryInput.shift();
            } else if (this.playerCode[index].substring(0,6) == 'return') {
                if(this.temporaryValue != "") {
                    this.temporaryInstruction = 'return';
                    this.ui.highlightCodeLine(index);
                    this.temporaryOutput.unshift(this.temporaryValue); //test
                    this.ui.moveIndicator(this.playerCode[index].substring(7,this.playerCode[index].length)); //Make sound after
                } else {
                    break;
                }
            } else if (this.playerCode[index].substring(0,8) == 'copyfrom') {
                this.temporaryInstruction = 'copyfrom';
                this.ui.highlightCodeLine(index);
                this.temporaryValue = this.temporarySave[this.playerCode[index].substring(9,this.playerCode[index].length-1)]; //save index
                /*
                //Make Copy From Blank? 
                let saveIndex = this.playerCode[index].substring(9,this.playerCode[index].length-1);
                */

                if(this.playerCode[index].substring(9,this.playerCode[index].length-1) >= 0 && this.playerCode[index].substring(9,this.playerCode[index].length-1) <= 3 && this.temporaryValue != "") {   
                //console.log(this.playerCode[index].substring(8,this.playerCode[index].length));
                this.ui.moveIndicator(this.playerCode[index].substring(9,this.playerCode[index].length)); //Make sound after
                }
                
            } else if (this.playerCode[index].substring(0,6) == 'copyto') {
                this.temporaryInstruction = 'copyto';
                //write to save data visually and in array
                
            this.ui.highlightCodeLine(index);
            //this.temporaryOutput.unshift(this.temporaryValue);
            let saveIndex = this.playerCode[index].substring(7,this.playerCode[index].length-1);
            this.temporarySave[saveIndex] = this.temporaryValue;
            this.ui.refreshDisplayData();
            //refreshdisplay and reset save to default 


            //console.log(this.playerCode[index].substring(7,this.playerCode[index].length-1));
            //this.temporarySave[this.temporaryValue]

            //this.temporaryValue = this.temporarySave[this.playerCode[index].substring(9,this.playerCode[index].length-1)]; //save index
            //console.log(this.playerCode[index].substring(8,this.playerCode[index].length));
            //this.ui.moveIndicator(this.playerCode[index].substring(7,this.playerCode[index].length)); //Make sound after
        }
            console.log("Current Command: ",this.temporaryInstruction);
            console.log("Current Value: ",this.temporaryValue);
            console.log("Current Input: ",this.temporaryInput);
            console.log("Current Output: ",this.temporaryOutput);
            console.log("-------------")

            let audio = new Audio('../assets/sounds/codeline.mp3');
            audio.play();
            await this.sleep(2000); //audio before
            this.ui.clearHighlights();
        }
        
        console.log(this.level)
        console.log(this.temporaryOutput)
        console.log("this.solution"+this.level)
        console.log(this.solution2)
        let solutionObject = eval("this.solution"+this.level);
        console.log(solutionObject)
        console.log("solution length",solutionObject.length)
        console.log("temp length", this.temporaryOutput.length);
 
        if(this.temporaryOutput.every(item => solutionObject.includes(item)) && solutionObject.every(item => this.temporaryOutput.includes(item)) && solutionObject.length === this.temporaryOutput.length) {
            console.log("correct solution");
            this.level = this.level + 1;
            this.ui.displayNewSolution();
            if(this.level === 5){
                console.log("YOU WIN GAME")
                this.ui.displayWin();
                let audio = new Audio('../assets/sounds/success.mp3'); //Play success
                audio.play();
                return;
            }
            let currentLevelObject = eval("this.level"+this.level);
            currentLevelObject.forEach(element => { //experimental
                this.temporaryInput.push(element)
            });
            this.hour = 9;
            this.minute= 0;
            this.temporaryOutput = [];
            this.temporarySave = ["","","",""];
            let audio = new Audio('../assets/sounds/success.mp3'); //Play success
            audio.play();
            this.ui.deleteInputOutputData();
            if(this.level > 3) {
                this.ui.drawDisplayMemory();
            }
            this.ui.refreshDisplayData();
            //this.timeLoop();

        } else {
            this.temporaryInput = [];
            let currentLevelObject = eval("this.level"+this.level);
            currentLevelObject.forEach(element => { //experimental
                this.temporaryInput.push(element)
            });
            this.temporaryOutput = [];
            this.temporarySave = ["","","",""];
            let audio = new Audio('../assets/sounds/error.mp3');
            audio.play();
            this.ui.displayError();
            await this.sleep(2000);
            this.ui.deleteInputOutputData();
            this.ui.refreshDisplayData();
            console.log("incorrect solution!!! ERRROR try again")
        }
    }




}