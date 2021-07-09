/**
 * Every word that follows "var" is a variable. it's like a box with a name on it. This box will contain some data. It can be a word, a number, or an HTML object like the tag canvas
 * Below you will find all the variable "boxes" that contain the information for the game to behave and work in a certain way.
 */

//######################## BEGINNING OF THE VARIABLES SETTINGS #################################
// this line will get the tag <canvas> in the HTML file so we can use it
var canvas = document.getElementById("myCanvas");
// this line tells that we will create an 2D game. 3D will be when you know more math ;-)
var ctx = canvas.getContext("2d");
// Define the radius of a ball
var ballRadius = 15;
// Horizontal position of the ball when we start
var x = canvas.width / 2;
// Vertical position of the ball when we start

// Horizontal speed of the ball. Increase for more stamina
var dx = -2;
// Vertical speed ot the ball. Increase for more madness
var dy = -3;
// The height of the paddle.
var paddleUp = 4;
var y = canvas.height - 30-paddleUp;
var paddleHeight = 16;
// The width of the paddle. Don't make it to big you cheater  !!! :-)
var paddleWidth = 100;
// The Horizontal position of the paddle in the beginning
var paddleX = (canvas.width - paddleWidth) / 2;
// Setting the state of the right arrow key in the beginning of the game
var rightPressed = false;
// Setting the state of the left arrow key in the beginning of the game
var leftPressed = false;
// Number of row of brick
var brickRowCount = 14;
// Number of column of brick
var brickColumnCount = 6;
// The width of a brick. Make it smaller to improve your aiming then you can increase the number of rows and column of bricks
var brickWidth = 75;
// The width of a brick. Make it smaller to improve your aiming then you can increase the number of rows and column of bricks
var brickHeight = 20;
// The space between each brick
var brickPadding = 15;
// The space between the top and the bricks
var brickOffsetTop = 30;
// The space between the left wall and the bricks
var brickOffsetLeft = 30;
// The score of the beginning
var score = 0;
// The number of lives you start with. Decrease to one... it will be insane mouahahahaha
var lives = 3;
// The message that you will receive when you win
var messageWin = "YOU WIN, CONGRATS!";
var messagePause = "pause...";
// The message that you will receive when you lose
var messageGameOver = "GAME OVER";
// The color of the ball
var ballColor = " #6600ff";
// The color of the paddle
var paddleColor = "#0035DD";
// The color of the brick
var brickColor = "#ffff1a";
// The color of the score
var scoreColor = " #ffff1a";
// The color of the lives
var liveColor = "#ffff1a";
//
var brickColors = ["0095DD","","0095DD","","","0095DD","","","0095DD","","","",""];
//######################## END OF THE VARIABLES SETTINGS #################################

//!!!!!!!!!!!!!!!! CAUTION, DON'T TOUCH WHAT'S BELOW THIS LINE!!!!!!!!!!!!!!!!!!!!!!
var bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
//document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
        leftPressed = false;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
        rightPressed = false;
    }
    if(e.key=="r")
    {
        document.location.reload();
    }
    if(e.key=='p')
    {
        alert(messagePause);
    }
}

function keyUpHandler(e) 
{
if(e.key!="Right")
{
    rightPressed=false;
}
if(e.key!="Left")
{
    leftPressed=false;
}
}

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}
function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                if (
                    x > b.x-ballRadius &&
                    x < b.x+ballRadius + brickWidth &&
                    y > b.y-ballRadius &&
                    y < b.y+ballRadius + brickHeight
                ) {
                    dy = dy*-1.05;

                    b.status = 0;
                    score++;


                    ballColor=brickColor;

 

                    if (score == brickRowCount * brickColumnCount) {
                        alert(messageWin);
                        document.location.reload();
                    }
                }
            }
        }
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius,0,Math.PI*2);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
    
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight-paddleUp, paddleWidth, paddleHeight);
    ctx.fillStyle = paddleColor;
    ctx.fill();
    ctx.closePath();
}
function drawBricks() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                var brickX = r * (brickWidth + brickPadding) + brickOffsetLeft;
                var brickY = c * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = brickColor;
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
function drawScore() {
    ctx.font = "16px Mono";
    ctx.fillStyle = scoreColor;
    ctx.fillText("Score: " + score, 8, 20);
}
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = liveColor;
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy <ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius-paddleHeight- paddleUp) {
        if (x > paddleX-ballRadius && x < paddleX + paddleWidth+ballRadius) {
            dy = -dy;

            ballColor=paddleColor;
            
        } else {
            lives--;
            if (!lives) {
                alert(messageGameOver);
                document.location.reload();
            } else {
                x = canvas.width / 2;
                y = canvas.height - 30-paddleUp;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width - paddleWidth) / 2;
            }
        }
    }

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx;
    y += dy;
    requestAnimationFrame(draw);

    
}

draw();
