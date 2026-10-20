const r = require("raylib");
const { words } = require("./data");

function createRandomWord(data) {
    const keys = Object.keys(data);
    const categoryIdx = Math.floor(Math.random() * keys.length);

    const key = keys[categoryIdx];
    const words = data[key];

    const wordIdx = Math.floor(Math.random() * words.length);
    const word = words[wordIdx];

    return { category: key, word };
}

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    const screen = {
        width: 900,
        height: 600,
        title: "Hangman",
        fps: 50
    }

    const data = createRandomWord(words);

    const title = {
        text: data.category,
        pos: {
            x: 200,
            y: 50,
        },
        size: 30,
    }

    const font = r.GetFontDefault();

    const centerLine = {
        start: {
            x: screen.width / 1.55,
            y: 0,
        },
        end: {
            x: screen.width / 1.55,
            y: screen.height
        },
        thick: 10,
        color: r.BLACK,
    }

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(screen.width, screen.height, screen.title);
    r.SetTargetFPS(screen.fps)

    return {
        screen,
        data,
        title,
        font,
        centerLine
    };
}

function update(w) {
    // change the state
}

function draw(w) {
    const wordData = w.wordData;
    const title = w.title;
    const centerLine = w.centerLine;

    r.BeginDrawing();

    r.ClearBackground(r.WHITE);

    r.DrawLineEx(centerLine.start, centerLine.end, centerLine.thick, centerLine.color);

    r.DrawTextEx(
        w.font,
        `${title.text}`,
        title.pos,
        title.size, 3, r.BLACK
    )

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