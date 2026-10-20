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
            x: 10,
            y: 50,
        },
        size: 40,
    }

    const font = r.GetFontDefault();
    const startX = 90;
    const gap = 70;

    const centerLine = {
        start: {
            x: screen.width / 1.55,
            y: 100,
        },
        end: {
            x: screen.width / 1.55,
            y: screen.height
        },
        thick: 10,
        color: r.BLACK,
    }

    let points = 0;
    let attempts = 0;

    const userInput = "";

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(screen.width, screen.height, screen.title);
    r.SetTargetFPS(screen.fps)

    return {
        screen,
        data,
        title,
        font,
        centerLine,
        userInput,
        points,
        startX,
        gap,
        attempts
    };
}

function update(w) {
    let key = r.GetKeyPressed();
    const word = String(w.data.word).toLocaleUpperCase();

    if (key !== 0 && w.points < 6) {
        const input = String.fromCharCode(key);

        if (input === word[w.points]) {
            w.userInput += input;
            w.points++;
        }

        w.attempts++;
    }

    if (w.points === 6) {
        w.title.text = `Congratulations! You guessed it in ${w.attempts}.`;
        w.title.size = 29;
    }

    if ((w.attempts - w.points) > 6) {
        w.title.text = `Oops! You failed to guess the word "${word}".`;
        w.title.size = 25;
    }
}

function drawHangman(attempts, points) {
    const misses = attempts - points;

    r.DrawLineEx({ x: 500, y: 100 }, { x: 800, y: 100 }, 10, r.BLACK);

    if (misses >= 1) {
        r.DrawLineEx({ x: 700, y: 100 }, { x: 700, y: 200 }, 10, r.BLACK);
    }

    if (misses >= 2) {
        r.DrawCircle(700, 200, 50, r.BLACK);
        r.DrawCircle(700, 200, 40, r.WHITE);
    }

    if (misses >= 3) {
        r.DrawLineEx({ x: 700, y: 250 }, { x: 700, y: 370 }, 10, r.BLACK);
    }

    if (misses >= 4) {
        r.DrawLineEx({ x: 700, y: 250 }, { x: 750, y: 300 }, 10, r.BLACK);
    }

    if (misses >= 5) {
        r.DrawLineEx({ x: 700, y: 250 }, { x: 650, y: 300 }, 10, r.BLACK);
    }

    if (misses >= 6) {
        r.DrawLineEx({ x: 700, y: 365 }, { x: 750, y: 400 }, 10, r.BLACK);
    }

    if (misses >= 7) {
        r.DrawLineEx({ x: 700, y: 365 }, { x: 650, y: 400 }, 10, r.BLACK);
    }

}

function drawUserInput(userInput, x, gap) {
    for (let i = 0; i < userInput.length; i++) {
        r.DrawText(`${userInput[i]}`, x + gap * i, 340, 50, r.BLACK);
    }
}

function drawInputSpace(x, gap) {
    r.DrawText("_", x, 350, 50, r.BLACK);

    r.DrawText("_", x + gap, 350, 50, r.BLACK);

    r.DrawText("_", x + gap * 2, 350, 50, r.BLACK);

    r.DrawText("_", x + gap * 3, 350, 50, r.BLACK);

    r.DrawText("_", x + gap * 4, 350, 50, r.BLACK);

    r.DrawText("_", x + gap * 5, 350, 50, r.BLACK);
}

function draw(w) {
    const word = w.data;
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

    drawInputSpace(w.startX, w.gap);
    drawUserInput(w.userInput, w.startX, w.gap);
    drawHangman(w.attempts, w.points);

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