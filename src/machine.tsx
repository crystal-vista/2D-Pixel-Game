import { useState } from "react";

const tileStates:any = [];
const monster:any = [];

const gridHeight = 50;
const gridWidth = 50;

/* DO NOT COPY PASTE ANY CODE ABOVE THIS LINE */ 

const directionMove: any = 
{
  "up":    [0, 1],
  "down":  [0, -1],
  "right": [1, 0],
  "left":  [-1, 0]
}

function movementDecision ()
{
  let dir = "unknown";
  let max = [0, dir];
  if (monster.length == 1)
  {
    //check all 4 sides
    dir = greedyDecision(["up", "down", "right", "left"], 4);
  }
  else{
    //check all 3 sides
    dir = greedyDecision(["up", "right", "left"], 3);
  }
  //update the movement and then update headposition

  let [x, y] = directionMove[dir];
  //updateHead(monster[0][0], monster[0][1]) //x and y
  //setHeadpos([headPos[0] + x, headPos[1] + y]);
}

function greedyDecision(directions: any, len: number)
{
  const headPos = monster[0];
  let max = 0; // Max amount of food in straight line
  let max_det = 0; // Determines which dir if max food is same for two different dir
  let dir = "unknown";
  for (let i = 0; i < len; i++)
  {
    let [food, det] = checkGrass(directions[i]);
    if (food > max)
    {
      max = food;
      max_det = det;
      dir = directions[i]
    }
    else if (food == max && det > max_det)
    {
      max_det = det;
      dir = directions[i]
    }
  }

  if (dir == "unkown") // If each dir has no food at all, randomize
  {
    dir = directions[Math.floor(Math.random() * len)];
    let x = headPos[0] + directionMove[dir][0];
    let y = headPos[1] + directionMove[dir][1];
    while(x < 0 || x >= gridWidth || y < 0 || y >= gridHeight) // Make it make sure its not out of bounds
    {
      dir = directions[Math.floor(Math.random() * len)];
      x = headPos[0] + directionMove[dir][0];
      y = headPos[1] + directionMove[dir][1];
    }
  }

  return dir;
}

function checkGrass(dir: String) // Checks for grass and returns num of grass it can eat, and in the area
{
  let xi = 0;
  let yi = 0;
  let xf = 0;
  let yf = 0;

  // Head location
  const x = monster[0][0];
  const y = monster[0][1];

  let res = 0;
  let food = 0;

  if (dir == "up")
  {
    xi = -2;
    xf =  2;
    yi =  1;
    yf =  5;
  }

  if (dir == "down")
  {
    xi = -2;
    xf =  2;
    yi = -5;
    yf = -1;
  }

  if (dir == "left")
  {
    xi = -5;
    xf = -1;
    yi = -2;
    yf =  2;
  }

  if (dir == "right")
  {
    xi =  1;
    xf =  5;
    yi = -2;
    yf =  2;
  }

  for (let i = yi; i <= yf; i++)
  {
    for (let j = xi; j <= xf; j++)
    {
      if ((y+i >= 0 && y+i < gridHeight) && (x+j >= 0 && x+j < gridWidth))
      {
        if (i == 0 || j == 0)
        {
          food += tileStates[y+i][x+j] % 10;
        }
        else
        {
          res += tileStates[y+i][x+j] % 10;
        }
      }
    }
  }

  return [food, res];
}
