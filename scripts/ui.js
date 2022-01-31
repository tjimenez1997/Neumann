export default class UI {
    constructor(game,editor){
        this.model = game; //Sets Game Model to local object
        this.editor = editor;
        game.ui = this; //Adds UI Object to Game
        this.gameState = "Intro";
        this.canvas = document.querySelector("#display");
        document.querySelectorAll("button").forEach((element) => {
            element.addEventListener("click", this.buttonClickSoundEffect)
        });
        document.querySelector("#start").addEventListener("click", this.startGame);
        document.querySelector("#execute").addEventListener("click", this.executePlayerCode);
        this.drawDisplay();
    }

    buttonClickSoundEffect = (event) => {
        let audio = new Audio('../assets/sounds/buttonClick.mp3');
        audio.play();
    }

    startThemeSong = (number) => {
        let audio = new Audio(`../assets/sounds/theme${number}.mp3`);
        audio.play();
    }

    startGame = (event) => {
        setTimeout(() => {
            this.startThemeSong(1)
        }, 100);

        let gameTime = document.querySelector("#gameTime");
        let letter = document.querySelector("#acceptanceLetter");
        let startButtons = document.querySelector("#gameIntroOptions");
        let gameDisplay = document.querySelector("#gameUI");
        letter.remove();
        startButtons.remove();
        gameDisplay.style.display = "flex";
        gameTime.style.display = "block";

        //Change Game Time using Game Model
        document.querySelector("#gameTime").innerText = `Day ${this.model.level} - Time: ${this.model.hour}:${this.model.minute == 0 ? '00' : this.model.minute} AM`;
        this.model.timeLoop();
    }

    drawDisplay = () => {
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

        this.refreshDisplay();
    }

    refreshDisplay() {
        let input = this.model.temporaryInput;
        let context = this.canvas.getContext("2d");
        context.fillStyle = "yellow";
        context.font = '12px monospace';
        let inputHeight = 277;
        //Fill Stack Display Bottom Up
        input.slice().reverse().forEach((element) => {
            context.fillText(element,23, inputHeight);
            inputHeight -= 50;
        })
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
}

