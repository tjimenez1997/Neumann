export default class UI {
    constructor(){
        this.gameState = "Intro";
        this.level = 1;
        document.querySelectorAll("button").forEach((element) => {
            element.addEventListener("click", this.buttonClickSoundEffect)
        });
    }

    buttonClickSoundEffect = (event) => {
        let audio = new Audio('../assets/sounds/buttonClick.mp3');
        audio.play();
    }
    
}

