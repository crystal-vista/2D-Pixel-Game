export default function machineAppear(
    // Grid size, monster, make it return monster
    gridWidth: number,
    gridHeight: number,
    machineData: any,
    displayData: any,
)
// Randomly make the machine on any side of the place
{
    const headDirection: any = {
        up: 4,
        down: 6,
        left: 7,
        right: 5
    }

    const displayDataCopy = displayData;

    // Randomly choose direction
    const side = Math.floor(Math.random() * 4) //0, 1, 2, 3 => u, d, r, l
    const machineDataCopy = machineData;

    if (side == 0)// Comes from the top //hd = down
    {
        const x = Math.floor(Math.random() * gridWidth);
        for (let i = 0; i < machineDataCopy.length; i++)
        {
            if (i == 0)
            {
                displayDataCopy[0][x] = headDirection["down"];
            }

            machineDataCopy[i] = [x, -i];
        }
    }

    else if (side == 1)// Comes from the bot //hd = up
    {
        const x = Math.floor(Math.random() * gridWidth);
        for (let i = 0; i < machineDataCopy.length; i++)
        {
            if (i == 0)
            {
                displayDataCopy[gridHeight-1][x] = headDirection["up"];
            }

            machineDataCopy[i] = [x, gridHeight - 1 + i];
        }
    }

    else if (side == 2)// Comes from the right //hd = left
    {
        const y = Math.floor(Math.random() * gridHeight);
        for (let i = 0; i < machineDataCopy.length; i++)
        {
            if (i == 0)
            {
                displayDataCopy[y][gridWidth - 1] = headDirection["left"];
            }

            machineDataCopy[i] = [gridWidth - 1 + i, y];
        }
    }

    else if (side == 3)// Comes from the left //hd = right
    {
        const y = Math.floor(Math.random() * gridHeight);
        for (let i = 0; i < machineDataCopy.length; i++)
        {
            if (i == 0)
            {
                displayDataCopy[y][0] = headDirection["right"];
            }

            machineDataCopy[i] = [-i, y];
        }
    }

    return [machineDataCopy, displayDataCopy];
}