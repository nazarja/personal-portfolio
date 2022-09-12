const text = document.getElementById("text");
text.innerHTML = "Go!";
let playMusic = 0;

const controlArea = document.getElementById("control-area");
controlArea.addEventListener('click', () => init());

function drawFirstRender() {
     // canvas
     const canvas = document.getElementById("canvas");
     const ctx = canvas.getContext("2d");

     // bricks
     const brickWidth = 106;
     const brickHeight = 30;
     const brickRows = 6;
     const brickColumns = 10;
 
     const brickPadding = 20;
     const brickPaddingX = 20;
     const brickPaddingY = 20;
 
     let colours = ["#284FB6", "#901FD8", "#D81F1F", "#D87A1F", "#D8C91F", "#1FD88C"]
     let bricks = [];

     for (let columns = 0; columns < brickColumns; columns++) {
         bricks[columns] = [];
         for (let rows = 0; rows < brickRows; rows++) {
             bricks[columns][rows] = { x: 0, y: 0, smashed: true };
         }
     }

     function drawBricks() {
         bricksRemaining = 0;
         for (let columns = 0; columns < brickColumns; columns++) {
             for (let rows = 0; rows < brickRows; rows++) {
                 if (bricks[columns][rows].smashed === true) {
 
                     const brickX = (columns * (brickWidth + brickPadding)) + brickPaddingY;
                     const brickY = (rows * (brickHeight + brickPadding)) + brickPaddingX;
 
                     bricks[columns][rows].x = brickX;
                     bricks[columns][rows].y = brickY;
 
                     ctx.beginPath();
                     ctx.rect(brickX, brickY, brickWidth, brickHeight);
                     ctx.fillStyle = colours[rows];
                     ctx.fill();
                     ctx.closePath();
                     bricksRemaining += 1;
                 }
             }
         }
     }
     drawBricks();
};
drawFirstRender()

function init() {
    // canvas
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    let score = 0;
    let started = false;
    let time = 0;
    let displayTime = "0:00";
    let bricksRemaining = 0;


    // sound
    const paddleSound = new Audio('assets/audio/paddleSound.wav');
    const brickSound = new Audio('assets/audio/brickSound.wav');
    const music = new Audio('assets/audio/music.mp3');
    music.loop = true;
    music.volume = 0.2;
    if (playMusic === 0) {
        music.play();
        playMusic = 1;
    };

    // ball
    let x = canvas.width / 2;
    let y = canvas.height - 100;
    let bx = 2;
    let by = -2;
    const ballRadius = 20;

    // paddle
    const paddleWidth = 105;
    const paddleHeight = 15;
    let px = (canvas.width / 2) - paddleWidth;
    let py = (canvas.height - 80) - paddleHeight;

    // movement
    let right = false;
    let left = false;
    let mouse = false;
    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);
    document.addEventListener("mousemove", mouseMoveHandler);

    // bricks
    const brickWidth = 106;
    const brickHeight = 30;
    const brickRows = 6;
    const brickColumns = 10;

    const brickPadding = 20;
    const brickPaddingX = 20;
    const brickPaddingY = 20;

    let colours = ["#284FB6", "#901FD8", "#D81F1F", "#D87A1F", "#D8C91F", "#1FD88C"]
    let bricks = [];
    for (let columns = 0; columns < brickColumns; columns++) {
        bricks[columns] = [];
        for (let rows = 0; rows < brickRows; rows++) {
            bricks[columns][rows] = { x: 0, y: 0, smashed: true };
        }
    }

    //
    // Functions 
    //

    function drawBricks() {
        bricksRemaining = 0;
        for (let columns = 0; columns < brickColumns; columns++) {
            for (let rows = 0; rows < brickRows; rows++) {
                if (bricks[columns][rows].smashed === true) {

                    const brickX = (columns * (brickWidth + brickPadding)) + brickPaddingY;
                    const brickY = (rows * (brickHeight + brickPadding)) + brickPaddingX;

                    bricks[columns][rows].x = brickX;
                    bricks[columns][rows].y = brickY;

                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    ctx.fillStyle = colours[rows];
                    ctx.fill();
                    ctx.closePath();
                    bricksRemaining += 1;
                }
            }
        }
    }

    // have collided with brick?
    function collisionDetection() {
        for (let columns = 0; columns < brickColumns; columns++) {
            for (let rows = 0; rows < brickRows; rows++) {
                const brick = bricks[columns][rows];
                if (brick.smashed === true) {
                    if (x > brick.x && x < brick.x + brickWidth && y > brick.y && y < brick.y + brickHeight) {
                        by = -by;
                        brick.smashed = false;
                        score += 10;
                        switch (score) {
                            case 100:
                                bx = 3;
                                by = -3;
                                break;
                            case 300:
                                bx = 4;
                                by = -4;
                                break;
                            case 500:
                                bx = 5;
                                by = -5;
                                break;
                        }
                        text.innerHTML = "SMASH!!!";
                        setTimeout(setText, 500);
                        brickSound.play();


                        if (score == (brickColumns * brickRows) * 10) {
                            clearInterval(frames);
                            function flashWin() {
                                text.style.color = (text.style.color == 'white') ? 'grey' : 'white';
                            }
                            setInterval(flashWin, 500);
                            started = false;
                            text.innerHTML = `Game Over, You Won! - Score: ${score} | Time: ${displayTime}`;
                        }
                    }
                }
            }
        }
    }

    function setText() {
        text.innerHTML = "Go!";
    }

    // movement events    
    function keyDownHandler(event) {
        if (event.keyCode == 37) {
            left = true;
        }
        if (event.keyCode == 39) {
            right = true;
        }
    }

    function keyUpHandler(event) {
        if (event.keyCode == 37) {
            left = false;
        }
        if (event.keyCode == 39) {
            right = false;
        }
    }

    function mouseMoveHandler(event) {
        let rx = event.clientX - canvas.offsetLeft;
        if (rx > 0 && rx < canvas.width) {
            px = rx - paddleWidth / 2;
        }
    }

    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(px, py, paddleWidth, paddleHeight);
        ctx.fillStyle = "#CD1FD8";
        ctx.fill();
        ctx.closePath();
    }

    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, 2 * Math.PI);
        ctx.fillStyle = "#CD1FD8";
        ctx.fill();
        ctx.closePath();
    }

    function drawBricksRemaining() {
        ctx.font = "20px Monospace";
        ctx.fillStyle = "#fff";
        ctx.fillText(`Remaining: ${bricksRemaining}`, (canvas.width / 2) - 60, 20);
    }

    function drawScore() {
        ctx.font = "20px Monospace";
        ctx.fillStyle = "#fff";
        ctx.fillText("Score: " + score, 8, 20);
    }

    function countTime() {
        setInterval(function () {
            time += 1;
            let minutes = Math.floor(time / 60);
            let seconds = time - minutes * 60;
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            displayTime = `${minutes}:${seconds}`;
        }, 1000);
    }
    countTime();

    function drawTime() {
        ctx.font = "20px Monospace";
        ctx.fillStyle = "#fff";
        ctx.fillText("Time: " + displayTime, 1150, 20);
    }

    // draw event
    function draw() {
        // clear for next frame
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBricks();
        drawBall();
        drawPaddle();
        drawScore();
        drawBricksRemaining()
        drawTime();
        collisionDetection();

        started = true;

        // collision detection and reverse direction
        if (x + bx > canvas.width - ballRadius || x + bx < ballRadius) {
            bx = -bx;
        }

        if (y + by < ballRadius) {
            by = -by;
        }

        if (y + by > py) {
            // collision with paddle
            if (x > px && x < px + paddleWidth) {
                by = -by;
                paddleSound.play();
            }
        }

        // collision with bottom border // END GAME
        if (y + by > canvas.height - ballRadius) {
            clearInterval(frames);
            started = false;
            function flashLose() {
                text.style.color = (text.style.color == 'white') ? 'grey' : 'white';
            }
            setInterval(flashLose, 500);
            text.innerHTML = `You Lose, Try Again!  - Score: ${score} | Time: ${displayTime}`;
        }

        // change paddle direction
        if (right && px < canvas.width - paddleWidth) {
            px += 8;
        }
        if (left && px > 0) {
            px -= 8
        }
        x += bx;
        y += by;
    }
    draw();
    const frames = setInterval(draw, 5);
}



