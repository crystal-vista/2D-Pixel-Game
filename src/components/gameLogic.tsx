export function updateBoard(
  monster: number[][],
  setMonster: any,
  tileStates: number[][],
  setTileStates: any,
  updateTileStates: any,
  gridWidth: number,
  gridHeight: number,
  lastDir: string,
  setLastDir: any,
  foodCnt: number,
  setFoodCnt: any,
) {
  let tileStatesCopy:any = [...tileStates];

  console.log(tileStatesCopy)

  const directionMove: any = {
    down: [0, 1],
    up: [0, -1],
    right: [1, 0],
    left: [-1, 0],
  };

  const headDirection: any = {
    up: 4,
    down: 5,
    left: 6,
    right: 7
  }

  let food = foodCnt;

  function checkGrass(dir: String, gridHeight: number, gridWidth: number) {
    //checks for grass and returns num of grass it can eat, and in the area
    let xi = 0;
    let yi = 0;
    let xf = 0;
    let yf = 0;

    //head location
    const x = monster[0][0];
    const y = monster[0][1];

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
          let val = tileStates[y + i][x + j] % 10;
          if (val < 4) {
            if (i == 0 || j == 0) {
              food += tileStates[y + i][x + j] % 10;
            } else {
              res += tileStates[y + i][x + j] % 10;
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
    const headPos = monster[0];
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
    console.log(dir)
    return dir;
  }
  function moveMonster( 
    newx: number,
    newy: number,
    tileStates: number[][],
  ) {
    let monsterState = [...monster];
    if (tileStates[newy][newx] >= 10 && tileStates[newy][newx] < 14) {
      monsterState.shift();
      if (monsterState.length > 0)
      {
        tileStatesCopy[newy][newx] = headDirection[lastDir];
      }
      else
      {
        tileStatesCopy[newy][newx] = 0;
      }
    }
    else {
      monsterState.unshift([newx, newy]);

      let grow = false;

      if (tileStatesCopy[newy][newx] > 0 && tileStatesCopy[newy][newx] < 5)
      {
        food += tileStatesCopy[newy][newx];
        if (food >= 20)
        {
          grow = true;
          food = food % 20;
        }
      }

      tileStatesCopy[newy][newx] = headDirection[lastDir]; //head orientation
      let [oldx, oldy] = monsterState[1];

      if (!grow) //grow if food cnt reaches 20 after it eats
      {
        let len = monsterState.length;
        let [lastx, lasty] = monsterState[len - 1];
        tileStatesCopy[lasty][lastx] = 0;
        monsterState.pop();
      }

      if(monsterState.length == 1)
      {
        tileStatesCopy[oldy][oldx] = 0;
      }
      else
      {
        tileStatesCopy[oldy][oldx] = 14;
      }
    }
    return monsterState;
  }

  let dir = "unknown";
  if (monster.length == 1) {
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
    if (monster[0][0] - monster[1][0] == 0) {
      direction =
        monster[0][1] == monster[1][1] + 1
          ? ["left", "down", "right"]
          : ["left", "up", "right"];
    } else if (monster[0][1] == monster[1][1] + 1)
      direction = ["up", "right", "down"];

    dir = greedyDecision(direction, 3, gridHeight, gridWidth);
  }

  setMonster(moveMonster(monster[0][0] + directionMove[dir][0], monster[0][1] + directionMove[dir][1], tileStates));
  setFoodCnt(food);
  setTileStates(tileStatesCopy)
}

export function cutPlants(
  monster: number[][],
  tileStates: number[][],
  razors: boolean[][],
  gridWidth: number,
  gridHeight: number
) {
  let index = 2;
  while (index < monster.length) {
    let A: [number, number];
    let B: [number, number];
    if (monster[index][0] - monster[index - 1][0] == 0) {
      //same row, so blades are vertically stacked
      A = [monster[index][0] - 3, monster[index][1] - 1]; //top left corner of each 3x3 blade unit
      B = [monster[index][0] + 1, monster[index][1] - 1];
    } else {
      A = [monster[index][0] - 1, monster[index][1] - 3];
      B = [monster[index][0] - 1, monster[index][1] + 1];
    }
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (razors[r][c]) {
          if (
            A[0] + r > 0 &&
            A[0] + r < gridWidth &&
            A[1] + c > 0 &&
            A[1] + c < gridHeight
          ) {
            if (tileStates[A[0] + r][A[1] + c] != 0)
              tileStates[A[0] + r][A[1] + c] = 1;
          }
          if (
            B[0] + r > 0 &&
            B[0] + r < gridWidth &&
            B[1] + c > 0 &&
            B[1] + c < gridHeight
          ) {
            if (tileStates[B[0] + r][B[1] + c] != 0)
              tileStates[B[0] + r][B[1] + c] = 1;
          }
        }
      }
    }
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (razors[r][c]) {
          razors[r][c] = false;
          if (r == 0 && c == 0) razors[0][1] = true;
          else if (r == 0 && c == 1) razors[0][2] = true;
          else if (r == 0 && c == 2) razors[1][2] = true;
          else if (r == 1 && c == 2) razors[2][2] = true;
          else if (r == 2 && c == 2) razors[2][1] = true;
          else if (r == 2 && c == 1) razors[2][0] = true;
          else if (r == 2 && c == 0) razors[1][0] = true;
          else razors[0][0] = true;
        }
      }
    }
  }
}