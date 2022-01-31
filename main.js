import Game from './scripts/game.js';
import UI from './scripts/ui.js';

const editorTextArea = document.querySelector("#editor");
const editor = CodeMirror.fromTextArea(editorTextArea, {mode:"clike", theme:"liquibyte", autoRefresh:true,});
editor.setSize("400","300");
const game = new Game();
const ui = new UI(game,editor);


