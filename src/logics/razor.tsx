type DisplayData = number[][];
let razorConfig = 0;

export default function razor(
  monster: number[][],
  displayData: DisplayData
): DisplayData {
  let copy = [...displayData].map((row) => [...row]); // Hard copy here
  let gridWidth = displayData.length;
  let gridHeight = displayData.length == 0 ? 0 : displayData[0].length;

  let razors: boolean[][] = [...Array(3)].map(() =>
    [...Array(3)].map(() => false)
  );
  switch (razorConfig) {
    case 0:
      razors[0][0] = true;
      razors[2][2] = true;
      break;
    case 1:
      razors[0][1] = true;
      razors[2][1] = true;
      break;
    case 2:
      razors[0][2] = true;
      razors[2][0] = true;
      break;
    case 3:
      razors[1][2] = true;
      razors[1][0] = true;
      break;
  }

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
            A[1] + r > 0 &&
            A[1] + r < gridWidth &&
            A[0] + c > 0 &&
            A[0] + c < gridHeight
          ) {
            if (
              //assert 10-13
              displayData[A[1] + r][A[0] + c] >= 10 &&
              displayData[A[1] + r][A[0] + c] != 14
            )
              copy[A[1] + r][A[0] + c] = 9;
            else if (displayData[A[1] + r][A[0] + c] <= 3)
              copy[A[1] + r][A[0] + c] = 8;
          }
          if (
            B[1] + r > 0 &&
            B[1] + r < gridWidth &&
            B[0] + c > 0 &&
            B[0] + c < gridHeight
          ) {
            if (
              displayData[B[1] + r][B[0] + c] >= 10 &&
              displayData[B[1] + r][B[0] + c] != 14
            )
              copy[B[1] + r][B[0] + c] = 9;
            else if (displayData[B[1] + r][B[0] + c] <= 3)
              copy[B[1] + r][B[0] + c] = 8;
          }
        }
      }
    }
    index += 3;
  }
  razorConfig = (razorConfig+1) %  4;

  return copy;
}
