export default class UI {
    constructor(game){
        this.model = game; //Sets Game Model to local object
        game.ui = this; //Adds UI Object to Game
        this.gameState = "Intro";
        this.canvas = document.querySelector("#display");
        document.querySelectorAll("button").forEach((element) => {
            element.addEventListener("click", this.buttonClickSoundEffect)
        });
        document.querySelector("#start").addEventListener("click", this.startGame);
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
    }

    formattedTime = () => {
        let hour = this.model.hour;
        let minute = this.model.minute;

        let time = "";
        let morning = true;
        time += `${hour}:`
        if(hour > 12) {
            morning = false;
        }
        if(minute == 0){
            time += "00";
        } else if (minute == 5) {
            time += "05";
        } else {
            time += `${minute} `;
        }

        if(morning) {
            time += ' AM';
        } else {
            time += ' PM';
        }
        return time;
    }

    updateGameClock = () => {
        document.querySelector("#gameTime").innerText = `Day ${this.model.level} - Time: ${this.formattedTime()}`;
    }
    
}

