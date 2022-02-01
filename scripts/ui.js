export default class UI {
    constructor(game,editor){
        this.model = game; //Sets Game Model to local object
        this.editor = editor;
        game.ui = this; //Adds UI Object to Game
        this.gameState = "Intro";
        this.canvas = document.querySelector("#display");
        this.indicatorLocation = {
            x: 200,
            y: 200,
            width: 8,
            height: 8
        }
        document.querySelectorAll("button").forEach((element) => {
            element.addEventListener("click", this.buttonClickSoundEffect)
        });
        document.querySelector("#start").addEventListener("click", this.startGame);
        document.querySelector("#languageGuide").addEventListener("click", this.openGuide);
        document.querySelector("#closeGuide").addEventListener("click", this.closeGuide);
        document.querySelector("#execute").addEventListener("click", this.executePlayerCode);
        this.drawDisplayNoMemory();
        this.drawIndicator(this.indicatorLocation.x, this.indicatorLocation.y, this.indicatorLocation.width, this.indicatorLocation.height); //Center
    }

    buttonClickSoundEffect = (event) => {
        let audio = new Audio('../assets/sounds/buttonClick.mp3');
        audio.play();
    }

    startThemeSong = (number) => {
        let audio = new Audio(`../assets/sounds/theme${number}.mp3`);
        audio.play();
    }

    sleep = (ms) => {
        return new Promise((resolve) => {
          setTimeout(resolve, ms);
        });
    }

    startGame = (event) => {
        setTimeout(() => {
            this.startThemeSong(1)
        }, 100);

        let gameTime = document.querySelector("#gameTime");
        let letter = document.querySelector("#acceptanceLetter");
        let startButtons = document.querySelector("#gameIntroOptions");
        let gameDisplay = document.querySelector("#gameUI");
        let guide = document.querySelector("#languageGuide");
        let gameOptionsTitle = document.querySelector("#gameOptionsTitle");
        letter.remove();
        startButtons.remove();
        gameDisplay.style.display = "flex";
        gameTime.style.display = "block";
        guide.style.display = "block";
        gameOptionsTitle.style.display = "block";

        //Change Game Time using Game Model
        document.querySelector("#gameTime").innerText = `Day ${this.model.level} - Time: ${this.model.hour}:${this.model.minute == 0 ? '00' : this.model.minute} AM`;
        this.model.timeLoop();
    }

    drawDisplayNoMemory = () => {
        let context = this.canvas.getContext("2d");
        
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(0, 400);
        context.lineWidth = 8;
        context.strokeStyle = "#FF0000";
        context.stroke();
        
        context.beginPath();
        context.moveTo(50, 0);
        context.lineTo(50, 400);
        context.lineWidth = 8;
        context.strokeStyle = "#FF0000";
        context.stroke();

        context.beginPath();
        context.moveTo(350, 0);
        context.lineTo(350, 400);
        context.lineWidth = 8;
        context.strokeStyle = "#FF0000";
        context.stroke();

        context.beginPath();
        context.moveTo(400, 0);
        context.lineTo(400, 400);
        context.lineWidth = 8;
        context.strokeStyle = "#FF0000";
        context.stroke();

        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(50, 0);
        context.lineWidth = 8;
        context.strokeStyle = "#FF0000";
        context.stroke();

        
        context.beginPath();
        context.moveTo(0, 50);
        context.lineTo(50, 50);
        context.lineWidth = 8;
        context.strokeStyle = "#FF0000";
        context.stroke();

        context.beginPath();
        context.moveTo(0, 100);
        context.lineTo(50, 100);
        context.lineWidth = 8;
        context.strokeStyle = "#FF0000";
        context.stroke();

        context.beginPath();
        context.moveTo(0, 150);
        context.lineTo(50, 150);
        context.lineWidth = 8;
        context.strokeStyle = "#FF0000";
        context.stroke();

        context.beginPath();
        context.moveTo(0, 200);
        context.lineTo(50, 200);
        context.lineWidth = 8;
        context.strokeStyle = "#FF0000";
        context.stroke();

        context.beginPath();
        context.moveTo(0, 250);
        context.lineTo(50, 250);
        context.lineWidth = 8;
        context.strokeStyle = "#FF0000";
        context.stroke();

        context.beginPath();
        context.moveTo(0, 300);
        context.lineTo(50, 300);
        context.lineWidth = 8;
        context.strokeStyle = "#FF0000";
        context.stroke();

        context.beginPath();
        context.moveTo(0, 350);
        context.lineTo(50, 350);
        context.lineWidth = 8;
        context.strokeStyle = "#FF0000";
        context.stroke();

        context.beginPath();
        context.moveTo(350, 0);
        context.lineTo(400, 0);
        context.lineWidth = 8;
        context.strokeStyle = "#FF0000";
        context.stroke();

        context.beginPath();
        context.moveTo(350, 100);
        context.lineTo(400, 100);
        context.lineWidth = 8;
        context.strokeStyle = "#FF0000";
        context.stroke();

        context.beginPath();
        context.moveTo(350, 150);
        context.lineTo(400, 150);
        context.lineWidth = 8;
        context.strokeStyle = "#FF0000";
        context.stroke();

        context.beginPath();
        context.moveTo(350, 150);
        context.lineTo(400, 150);
        context.lineWidth = 8;
        context.strokeStyle = "#FF0000";
        context.stroke();

        context.beginPath();
        context.moveTo(350, 200);
        context.lineTo(400, 200);
        context.lineWidth = 8;
        context.strokeStyle = "#FF0000";
        context.stroke();

        context.beginPath();
        context.moveTo(350, 250);
        context.lineTo(400, 250);
        context.lineWidth = 8;
        context.strokeStyle = "#FF0000";
        context.stroke();

        context.beginPath();
        context.moveTo(350, 250);
        context.lineTo(400, 250);
        context.lineWidth = 8;
        context.strokeStyle = "#FF0000";
        context.stroke();

        context.beginPath();
        context.moveTo(350, 300);
        context.lineTo(400, 300);
        context.lineWidth = 8;
        context.strokeStyle = "#FF0000";
        context.stroke();



        context.beginPath();
        context.moveTo(350, 50);
        context.lineTo(400, 50);
        context.lineWidth = 8;
        context.strokeStyle = "#FF0000";
        context.stroke();

        this.refreshDisplayData();
    }


    drawDisplayMemory = () => {
        let context = this.canvas.getContext("2d");
        
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(0, 400);
        context.lineWidth = 8;
        context.strokeStyle = "#FF0000";
        context.stroke();
        
        context.beginPath();
        context.moveTo(50, 0);
        context.lineTo(50, 400);
        context.lineWidth = 8;
        context.strokeStyle = "#FF0000";
        context.stroke();

        context.beginPath();
        context.moveTo(350, 0);
        context.lineTo(350, 400);
        context.lineWidth = 8;
        context.strokeStyle = "#FF0000";
        context.stroke();

        context.beginPath();
        context.moveTo(400, 0);
        context.lineTo(400, 400);
        context.lineWidth = 8;
        context.strokeStyle = "#FF0000";
        context.stroke();

        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(50, 0);
        context.lineWidth = 8;
        context.strokeStyle = "#FF0000";
        context.stroke();

        
        context.beginPath();
        context.moveTo(0, 50);
        context.lineTo(50, 50);
        context.lineWidth = 8;
        context.strokeStyle = "#FF0000";
        context.stroke();

        context.beginPath();
        context.moveTo(0, 100);
        context.lineTo(50, 100);
        context.lineWidth = 8;
        context.strokeStyle = "#FF0000";
        context.stroke();

        context.beginPath();
        context.moveTo(0, 150);
        context.lineTo(50, 150);
        context.lineWidth = 8;
        context.strokeStyle = "#FF0000";
        context.stroke();

        context.beginPath();
        context.moveTo(0, 200);
        context.lineTo(50, 200);
        context.lineWidth = 8;
        context.strokeStyle = "#FF0000";
        context.stroke();

        context.beginPath();
        context.moveTo(0, 250);
        context.lineTo(50, 250);
        context.lineWidth = 8;
        context.strokeStyle = "#FF0000";
        context.stroke();

        context.beginPath();
        context.moveTo(0, 300);
        context.lineTo(50, 300);
        context.lineWidth = 8;
        context.strokeStyle = "#FF0000";
        context.stroke();

        context.beginPath();
        context.moveTo(0, 350);
        context.lineTo(50, 350);
        context.lineWidth = 8;
        context.strokeStyle = "#FF0000";
        context.stroke();

        context.beginPath();
        context.moveTo(350, 0);
        context.lineTo(400, 0);
        context.lineWidth = 8;
        context.strokeStyle = "#FF0000";
        context.stroke();

        context.beginPath();
        context.moveTo(350, 100);
        context.lineTo(400, 100);
        context.lineWidth = 8;
        context.strokeStyle = "#FF0000";
        context.stroke();

        context.beginPath();
        context.moveTo(350, 150);
        context.lineTo(400, 150);
        context.lineWidth = 8;
        context.strokeStyle = "#FF0000";
        context.stroke();

        context.beginPath();
        context.moveTo(350, 150);
        context.lineTo(400, 150);
        context.lineWidth = 8;
        context.strokeStyle = "#FF0000";
        context.stroke();

        context.beginPath();
        context.moveTo(350, 200);
        context.lineTo(400, 200);
        context.lineWidth = 8;
        context.strokeStyle = "#FF0000";
        context.stroke();

        context.beginPath();
        context.moveTo(350, 250);
        context.lineTo(400, 250);
        context.lineWidth = 8;
        context.strokeStyle = "#FF0000";
        context.stroke();

        context.beginPath();
        context.moveTo(350, 250);
        context.lineTo(400, 250);
        context.lineWidth = 8;
        context.strokeStyle = "#FF0000";
        context.stroke();

        context.beginPath();
        context.moveTo(350, 300);
        context.lineTo(400, 300);
        context.lineWidth = 8;
        context.strokeStyle = "#FF0000";
        context.stroke();



        context.beginPath();
        context.moveTo(350, 50);
        context.lineTo(400, 50);
        context.lineWidth = 8;
        context.strokeStyle = "#FF0000";
        context.stroke();

        //Save Area
        context.beginPath();
        context.moveTo(100, 0);
        context.lineTo(100, 50);
        context.lineWidth = 8;
        context.strokeStyle = "yellow";
        context.stroke();

        context.beginPath();
        context.moveTo(150, 0);
        context.lineTo(150, 50);
        context.lineWidth = 8;
        context.strokeStyle = "yellow";
        context.stroke();

        context.beginPath();
        context.moveTo(200, 0);
        context.lineTo(200, 50);
        context.lineWidth = 8;
        context.strokeStyle = "yellow";
        context.stroke();
        
        context.beginPath();
        context.moveTo(250, 0);
        context.lineTo(250, 50);
        context.lineWidth = 8;
        context.strokeStyle = "yellow";
        context.stroke();

        context.beginPath();
        context.moveTo(300, 0);
        context.lineTo(300, 50);
        context.lineWidth = 8;
        context.strokeStyle = "yellow";
        context.stroke();

        context.beginPath();
        context.moveTo(96, 50);
        context.lineTo(304, 50);
        context.lineWidth = 8;
        context.strokeStyle = "yellow";
        context.stroke();

        this.refreshDisplayData();
    }

    openGuide() {
        let guide = document.querySelector("#languageGuideScreen");
        guide.style.display = "block";
    }

    closeGuide() {
        let guide = document.querySelector("#languageGuideScreen");
        guide.style.display = "none";
    }

    refreshDisplayData() {
        let input = this.model.temporaryInput;
        let context = this.canvas.getContext("2d");
        this.drawIndicator(200,200,8,8)
        context.fillStyle = "yellow";
        context.font = '12px monospace';
        let inputHeight = 277;
        //Fill Stack Display Bottom Up
        input.slice().reverse().forEach((element) => {
            context.fillText(element,23, inputHeight);
            inputHeight -= 50;
        })
    }

    drawIndicator = (x,y,width,height) => {
         //Delete old indicator location
         let context = this.canvas.getContext("2d");
         context.beginPath();
         context.rect(this.indicatorLocation.x,this.indicatorLocation.y,this.indicatorLocation.width,this.indicatorLocation.height);
         context.strokeStyle = "black";
         context.stroke();

         this.indicatorLocation.x = x;
         this.indicatorLocation.y = y;
         this.indicatorLocation.width = width;
         this.indicatorLocation.height = height;
        
         //Draw Indicator Square
         context.beginPath();
         context.rect(x,y,width,height);
         context.strokeStyle = "green";
         context.stroke();
 
    }

    formattedTime = () => {
        let hour = this.model.hour;
        let minute = this.model.minute;
        
        let time = "";
        time += `${hour}:`
        if(minute == 0){
            time += "00";
        } else if (minute == 5) {
            time += "05";
        } else {
            time += `${minute} `;
        }

        if(this.model.morning) {
            time += ' AM';
        } else {
            time += ' PM';
        }
        return time;
    }

    updateGameClock = () => {
        document.querySelector("#gameTime").innerText = `Day ${this.model.level} - Time: ${this.formattedTime()}`;
    }
    
    executePlayerCode = () => {
        this.model.setAndRunPlayerCode(this.editor.getValue());
    }

    moveIndicator = (location) => {
        console.log(location)
        if (location == "input;") {
         let inputHeight = this.model.temporaryInput.length;
         console.log(inputHeight)
         let heightModifier = (inputHeight-1) * 50;
         let context = this.canvas.getContext("2d");
         context.beginPath();
         context.rect(22,272-heightModifier, 8, 8);
         context.strokeStyle = "black";
         context.stroke();
         
         this.drawIndicator(22,272-heightModifier, 8, 8);
      
        } else {
            //ERROR
            console.log("ERROR TRY AGAIN")
        }
    }

    highlightCodeLine = (number) => {
        this.editor.markText({line:number,ch:0},{line:number+1,ch:0},{css: "background-color : red"});
    }

    clearHighlights = () => {
       this.editor.doc.getAllMarks().forEach(marker => marker.clear());
    }
    displayError = async() => {
        let error = document.querySelector("#error");
        error.style.display = "block";
        await this.sleep(2000);
        error.style.display = "none";
    }
}

