type DisplayData = number[][];
type MachineData = number[][];

export default function machine(
  machineData: MachineData,
  displayData: DisplayData,
  gridWidth: number,
  gridHeight: number,
  lastDir: string,
  setLastDir: any,
  foodCnt: number,
  setFoodCnt: any,
) {
  let displayDataCopy:any = [...displayData];

  const directionMove: any = {
    down: [0, 1],
    up: [0, -1],
    right: [1, 0],
    left: [-1, 0],
  };

  const headDirection: any = {
    up: 4,
    down: 6,
    left: 7,
    right: 5
  }

  let food = foodCnt;

  function checkGrass(dir: String, gridHeight: number, gridWidth: number) {
    //checks for grass and returns num of grass it can eat, and in the area
    let xi = 0;
    let yi = 0;
    let xf = 0;
    let yf = 0;

    //head location
    const x = machineData[0][0];
    const y = machineData[0][1];

    let res = 0;
    let food = 0;

    if (dir == "down") {
      xi = -2;
      xf = 2;
      yi = 1;
      yf = 5;
    }

    if (dir == "up") {
      xi = -2;
      xf = 2;
      yi = -5;
      yf = -1;
    }

    if (dir == "left") {
      xi = -5;
      xf = -1;
      yi = -2;
      yf = 2;
    }

    if (dir == "right") {
      xi = 1;
      xf = 5;
      yi = -2;
      yf = 2;
    }

    for (let i = yi; i <= yf; i++) {
      for (let j = xi; j <= xf; j++) {
        if (
          y + i >= 0 &&
          y + i < gridHeight &&
          x + j >= 0 &&
          x + j < gridWidth
        ) {
          let val = displayData[y + i][x + j] % 10;
          if (val < 4) {
            if (i == 0 || j == 0) {
              food += displayData[y + i][x + j] % 10;
            } else {
              res += displayData[y + i][x + j] % 10;
            }
          }
        }
      }
    }
    return [food, res];
  }
  function greedyDecision(
    directions: string[],
    len: number,
    gridHeight: number,
    gridWidth: number
  ) {
    const headPos = machineData[0];
    let max = 0; //max amount of food in straight line
    let max_det = 0; //determines which dir if max food is same for two different dir
    let dir = "unknown";
    if (Math.floor(Math.random() * 100) >=70)
    {
      for (let i = 0; i < len; i++) {
        let [food, det] = checkGrass(directions[i], gridHeight, gridWidth);
        if (food > max) {
          max = food;
          max_det = det;
          dir = directions[i];
        } else if (food == max && det > max_det) {
          max_det = det;
          dir = directions[i];
        }
      }
    }
    else if (lastDir != "unknown"){
      dir = lastDir
      let x = headPos[0] + directionMove[dir][0];
      let y = headPos[1] + directionMove[dir][1];

      if (x < 0 || x >= gridWidth || y < 0 || y >= gridHeight)
      {
        dir = "unknown";
      }
    }

    if (dir == "unknown") {
      //if each dir has no food at all, randomize
      dir = directions[Math.floor(Math.random() * len)];
      let x = headPos[0] + directionMove[dir][0];
      let y = headPos[1] + directionMove[dir][1];
      while (x < 0 || x >= gridWidth || y < 0 || y >= gridHeight) {
        //make it make sure its not out of bounds
        dir = directions[Math.floor(Math.random() * len)];
        x = headPos[0] + directionMove[dir][0];
        y = headPos[1] + directionMove[dir][1];
      }
    }
    setLastDir(dir);
    return dir;
  }

  function moveMonster( 
    newx: number,
    newy: number,
    displayData: number[][],
    dir: string,
  ) {
    let machineDataCopy = [...machineData];
    if (displayData[newy][newx] >= 10 && displayData[newy][newx] < 14) {
      machineDataCopy.shift();
      if (machineDataCopy.length > 0)
      {
        displayDataCopy[newy][newx] = headDirection[lastDir];
      }
      else
      {
        displayDataCopy[newy][newx] = 0;
      }
    }
    else {
      machineDataCopy.unshift([newx, newy]);

      let grow = false;

      if (displayDataCopy[newy][newx] > 0 && displayDataCopy[newy][newx] < 5)
      {
        food += displayDataCopy[newy][newx];
        if (food >= 20)
        {
          grow = true;
          food = food % 20;
        }
      }

      displayDataCopy[newy][newx] = headDirection[dir]; //head orientation
      let [oldx, oldy] = machineDataCopy[1];

      if (!grow) //grow if food cnt reaches 20 after it eats
      {
        let len = machineDataCopy.length;
        let [lastx, lasty] = machineDataCopy[len - 1];
        //checks if these coordinates are found in another part of the snake
        if (lastx >= 0 && lastx < gridWidth && lasty >= 0 && lasty < gridHeight)
        {
          displayDataCopy[lasty][lastx] = 0;
        }
        for (let i = 0; i < len - 2; i++)
        {
          let coord = machineDataCopy[i]
          if (coord[0] == lastx && coord[1] == lasty)
          {
            if (lastx >= 0 && lastx < gridWidth && lasty >= 0 && lasty <= gridHeight)
            {
              displayDataCopy[lasty][lastx] = 14;
            }
          }
        }
        machineDataCopy.pop();
      }

      if(machineDataCopy.length == 1)
      {
        displayDataCopy[oldy][oldx] = 0;
      }
      else
      {
        displayDataCopy[oldy][oldx] = 14;
      }
    }
    return machineDataCopy;
  }

  let dir = "unknown";
  if (machineData.length == 1) {
    //check all 4 sides
    dir = greedyDecision(
      ["up", "down", "right", "left"],
      4,
      gridHeight,
      gridWidth
    );
  } else {
    //check only 3 sides
    let direction = ["up", "left", "down"];
    if (lastDir == "down") {
      direction = ["right", "left", "down"];
    } else if (lastDir == "right")
    {
      direction = ["up", "right", "down"];
    }
    else if (lastDir == "up")
    {
      direction = ["right", "left", "up"];
    }

    dir = greedyDecision(direction, 3, gridHeight, gridWidth);
  }

  machineData = moveMonster(machineData[0][0] + directionMove[dir][0], machineData[0][1] + directionMove[dir][1], displayData, dir)
  setFoodCnt(food);

  return [ machineData, displayDataCopy ];
}