//npm run watch_games

title = "REPS";

description = `
look good
feel good
`;

characters = [
  `
 yyy
y y y
 yyy
  y
 yly
y l y
y   y
`,
  `
 YYY
Y Y Y
 YYY
  Y
 yly
y l y
      
    `,
  `
yr ry
y   y
RR RR
  `,
  `
yr ry
y   y
 y y
RR RR
`,
  `
CC
CCCCCC
CC
`,
`
CC CCC
CCC
CC
`,
`
    CC
CCCCCC
    CC
`,
`
CCC CC
   CCC
    CC
`,
`
 l l
  l
 l l
`,
`
 L L
  L
 L L
`
];

let anim = 0;
let lives = 3;
let player;
let marker = false;
let markerPosX = 0;
/** @type {{pos: Vector, vx: number}} */

options = {
  theme: "crt",
  isPlayingBgm: true,
  //isReplayEnabled: true,
  seed: 900,
  viewSize: {x: 75, y: 45},
  isCapturing: true,
  isCapturingGameCanvasOnly: true,
  captureCanvasScale: 2
};


function update() {
  if (!ticks) {
    player = { pos: vec(25, 20), vx: 1};
    lives = 3;
    anim = 0;
    marker = false;
}
  //level design
  color("light_black");
  rect(0, 40, 75, 5);

  //bar 
  //color("light_green");
  //line(5, 41, 71, 41, 7);
  color("light_yellow");
  rect(2, 18, 71, 5);
  color("light_green");
  rect(32, 18, 11, 5);
  color("green");
  rect(35, 18, 5, 5);

  //ANIMATIONS
  color ("black");
  if(anim == 0 ) {
      const char1 = char("a", vec(37.5,34)); // top
      const char2 = char("e", 35, 38);
      const char3 = char("g", 40, 38);
      const char4 = char("c", 37.5, 38);
      }
  else if(anim == 1) {
    const char1 = char("a", vec(37.5,33)); // top
    color("cyan")
    const char2 = char("e", 35, 37);
    const char3 = char("g", 40, 37);
    color("black")
    const char4 = char("d", 37.5, 38);
  }
  else if(anim == 2) {
    const char1 = char("b", vec(38,33)); // top
    const char2 = char("f", 35, 38);
    const char3 = char("h", 40, 38);
    const char4 = char("d", 37.5, 38);
  }
  
  if(marker == true) {
    color("red")
    char("j", markerPosX, player.pos.y);
  }
  else if(marker == false) {
    color("transparent")
    char("j", markerPosX, player.pos.y);
  }
  
  //char(addWithCharCode("a", floor(ticks / 15) % 2), 37.5,27);
  //char(addWithCharCode("e", floor(ticks / 15) % 2), 35, 31);
  //char(addWithCharCode("g", floor(ticks / 15) % 2), 40, 31);
  //char(addWithCharCode("c", floor(ticks / 15) % 2), 37.5, 31);
  
  color("black");
  char("i", player.pos);
  player.pos.x += player.vx * difficulty * 0.5;
  if (
    (player.pos.x < 5 && player.vx < 0) ||
    (player.pos.x > 70 && player.vx > 0)
  ) {
    player.vx *= -1;
  }

  if (player.pos.x < 6 || player.pos.x > 69) {
    anim = 0;
    marker = false;
  }

  const bigMoney = player.pos.x;

  if(input.isJustPressed && bigMoney >= 32 && bigMoney <= 43) {
    play("powerUp");
    addScore(1);
    anim = 1;

    //color("green");
    //rect(0, 38, 75, 5);
    //rect(0, 0, 75,75);
    player.vx *= 1.05;
    marker = true;
    markerPosX = player.pos.x;
  } else if(input.isJustPressed && bigMoney < 32 || input.isJustPressed && bigMoney > 40) {
    color("red");
    rect(0, 0, 75,75);
    play("laser");
    lives--
    anim = 2;
    color("black");
    // Generate particles
    particle(
        37.5, // x coordinate
        31, // y coordinate
        10, // The number of particles
        .6, // The speed of the particles
        PI/.26, // The emitting angle
        PI/ 4  // The emitting width
    ); 
    marker = true;
    markerPosX = player.pos.x;
  } 
  if(lives == 0) {
    color("white");
    rect(0, 0, 75,75);
    play("explosion");
    end();
  }
}

addEventListener("load", onLoad);
