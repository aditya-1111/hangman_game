const r = require("raylib");
const { words } = require("./data");

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

    // const wordData = {
    //     category: "household",
    //     word: Math.random() * words[category]
    // }
    console.log(words[category]);



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