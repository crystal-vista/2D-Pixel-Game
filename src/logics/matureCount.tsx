export default function matureCount(
    displayData: any,
    gridWidth: number,
    gridHeight: number,
)
// Counts the mature plants and removes them from display data
{
  let count = 0;
  const displayDataCopy = displayData;

  for (let y = 0; y < gridHeight; y++)
  {
    for (let x = 0; x < gridWidth; x++)
    {
      if ((displayDataCopy[y][x] % 10) == 3)
      {
        displayDataCopy[y][x] += -3;
        count++;
      }
    }
  }
  return [count, displayDataCopy]
}