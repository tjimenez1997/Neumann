export default class Game {
    constructor() {
        this.inputData = [];
        this.outputData = []; 
        this.temporaryInput = [];
        this.temporaryOutput = [];
        this.levelStatus = "Running" //Standby - (Menu before next level/day) Running - Player is currently playing the current level
        this.level = 1;
        this.workday = 96; //8 Hour Workday... How lucky! (5 minute intervals in 8 hours)
        this.hour = 8;
        this.minute= 0;
        this.solution = "4,3,2,1";
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




}