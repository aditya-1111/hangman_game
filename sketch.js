const r = require("raylib");
const d = require("./data");

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

    console.log(d);


    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(WIDTH, HEIGHT, TITLE);
    r.SetTargetFPS(FPS)

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

    r.DrawRectangle(0, 0, 100, 100, r.RED);

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