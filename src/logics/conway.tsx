type tiles = number[][];

// to do
// - only implement rules if is a plant
// - update if previously was razor
// -
export default function conway(tiles: number[][]) {
  let copy = [...tiles].map((row) => [...row]); // Hard copy here

  let h = tiles.length;
  let w = tiles.length == 0 ? 0 : tiles[0].length;
  for (let x = 0; x < h; x++) {
    for (let y = 0; y < w; y++) {
      switch (tiles[x][y]) {
        case 8:
          copy[x][y] = 0;
          break;
        case 9:
          copy[x][y] = 10;
          break;
        case 4:
        case 5:
        case 6:
        case 7:
        case 14:
          break;
        default: // 0 1 2 3 10 11 12 13
          let neighbors = [0, 0, 0, 0];
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              if (i == 0 && j == 0) continue;
              if (0 <= x + i && x + i < h && 0 <= y + j && y + j < w) {
                let type = tiles[x + i][y + j] % 10;
                if (type <= 3) neighbors[type]++;
              }
            }
          }
          // Update tileStates based on number of neighbors
          let numAlive = neighbors[1] + neighbors[2] + neighbors[3];
          if (tiles[x][y] % 10 != 0) {
            if (
              tiles[x][y] % 10 != 3 &&
              (numAlive == 2 || numAlive == 3 || numAlive == 4)
            ) {
              copy[x][y] = tiles[x][y] + 1;
            } else {
              if (tiles[x][y] >= 10) copy[x][y] = 10;
              else copy[x][y] = 0;
            }
          } else if (numAlive > 2) {
            if (tiles[x][y] >= 10) copy[x][y] = 11;
            else copy[x][y] = 1;
          }
          break;
      }
    }
  }
  return copy;
}