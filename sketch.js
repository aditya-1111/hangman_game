const r = require("raylib");
const { words } = require("./data");

function createRandomWord(data) {
    const keys = Object.keys(data);
    const categoryIdx = Math.floor(Math.random() * keys.length);

    const key = keys[categoryIdx];
    const words = data[key];

    const wordIdx = Math.floor(Math.random() * words.length);
    const word = words[wordIdx];

    return word;
}

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    const screen = {
        width: 800,
        height: 600,
        title: "Hangman",
        fps: 50
    }

    const word = createRandomWord(words);

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(screen.width, screen.height, screen.title);
    r.SetTargetFPS(screen.fps)

    return {
        screen,
    };
}

function update() {
    // change the state
}

function draw() {
    r.BeginDrawing();

    r.ClearBackground(r.BLACK);


    r.EndDrawing();
}

function teardown() {
    r.CloseWindow();
}

module.exports = {
    running,
    setup,
    update,
    draw,
    teardown,
};