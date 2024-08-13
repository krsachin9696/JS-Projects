const { 
    Engine, 
    Render, 
    Runner, 
    World, 
    Bodies,
    Body,
    Events } = Matter;

let engine, world, render, runner;

function startGame() {
    const cellsHorizontal = 10;
    const cellsVertical = 10;
    const width = window.innerWidth - 10;
    const height = window.innerHeight - 10;

    const unitLengthX = width / cellsHorizontal;
    const unitLengthY = height / cellsVertical;

    engine = Engine.create();
    engine.world.gravity.y = 0;
    world = engine.world;
    render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            wireframes: false,
            width,
            height
        }
    });
    runner = Runner.create()
    Render.run(render);
    Runner.run(runner, engine);

    // Walls
    const walls = [
        Bodies.rectangle(width/2, 0, width, 4, { isStatic: true }),
        Bodies.rectangle(width/2, height, width, 4, { isStatic: true }),
        Bodies.rectangle(0, height/2, 4, height, { isStatic: true }),
        Bodies.rectangle(width, height/2, 4, height, { isStatic: true })
    ];
    World.add(world, walls);

    // Maze Generation

    const shuffle = (arr) => {
        let counter = arr.length;

        while (counter > 0) {
            const index = Math.floor(Math.random() * counter);
            counter--;

            const temp = arr[counter];
            arr[counter] = arr[index];
            arr[index] = temp;
        }
        return arr;
    }

    const grid = Array(cellsVertical)
        .fill(null)
        .map(() => Array(cellsHorizontal).fill(false));

    const verticals = Array(cellsVertical)
        .fill(null)
        .map(() => Array(cellsHorizontal - 1).fill(false));

    const horizontals = Array(cellsVertical - 1)
        .fill(null)
        .map(() => Array(cellsHorizontal).fill(false));

    const startRow = Math.floor(Math.random() * cellsVertical);
    const startColumn = Math.floor(Math.random() * cellsHorizontal);


    const stepThroughCell = (row, column) => {
        // If I have visited the cell at [row, column], then return
        if (grid[row][column]) {
            return;
        };

        // Mark that cell as visited
        grid[row][column] = true;

        // Assemble randomly-ordered list of neighbors
        const neighbors = shuffle([
            [row - 1, column, 'up'],
            [row, column + 1, 'right'],
            [row + 1, column, 'down'],
            [row, column - 1, 'left']
        ]);

        // For each neighbor...
        for (let neighbor of neighbors) {
            const [nextRow, nextColumn, direction] = neighbor;

            // See if that neighbor is out of bounds
            if (nextRow < 0 || nextRow >= cellsVertical || nextColumn < 0 || nextColumn >= cellsHorizontal) {
                continue;
            };

            // If I've visited that neighbor, continue to next neighbor
            if (grid[nextRow][nextColumn]) {
                continue;
            };

            // Remove a wall from either horizontals or verticals
            if (direction === 'left') {
                verticals[row][column - 1] = true;
            } else if (direction === 'right') {
                verticals[row][column] = true;
            } else if (direction === 'up') {
                horizontals[row - 1][column] = true;
            } else if (direction === 'down') {
                horizontals[row][column] = true;
            }

            stepThroughCell(nextRow, nextColumn);
        };
    };

    stepThroughCell(startRow, startColumn);

    horizontals.forEach((row, rowIndex) => {
        row.forEach((open, columnIndex) => {
            if (open) {
                return;
            };

            const wall = Bodies.rectangle( 
                columnIndex * unitLengthX + unitLengthX / 2, 
                rowIndex * unitLengthY + unitLengthY, 
                unitLengthX, 
                4, 
                { 
                    label: 'wall', 
                    isStatic: true, 
                    render: {
                        fillStyle: '#333'
                } }
            );
            World.add(world, wall);
        });
    });

    verticals.forEach((row, rowIndex) => {
        row.forEach((open, columnIndex) => {
            if (open) {
                return;
            };

            const wall = Bodies.rectangle(
                columnIndex * unitLengthX + unitLengthX,
                rowIndex * unitLengthY + unitLengthY / 2,
                4,
                unitLengthY,
                { 
                    label: 'wall',
                    isStatic: true,
                    render: {
                        fillStyle: '#333'
                    }
                }
            );
            World.add(world, wall);
        });
    });

    // Goal

    const goal = Bodies.rectangle(
        width - unitLengthX / 2,
        height - unitLengthY / 2,
        unitLengthX * .6,
        unitLengthY * .6,
        { 
            label: 'goal',
            isStatic: true,
            render: {
                fillStyle: '#4CAF50'
            }
        }
    );

    World.add(world, goal);

    // Ball

    const ballRadius = Math.min(unitLengthX, unitLengthY) / 4;

    const ball = Bodies.circle(
        unitLengthX / 2,
        unitLengthY / 2,
        ballRadius,
        { label: 'ball',
            render: {
                fillStyle: '#2ea8d87e'
            }
        }
    );

    World.add(world, ball);

    document.addEventListener('keydown', event => {
        const { x, y } = ball.velocity;
        if (event.key === 'w' || event.key === 'ArrowUp' || event.key === 'W') {
            Body.setVelocity(ball, { x, y: y - 5 });
        }
        if (event.key === 's' || event.key === 'ArrowDown' || event.key === 'S') {
            Body.setVelocity(ball, { x, y: y + 5 });
        }
        if (event.key === 'a' || event.key === 'ArrowLeft' || event.key === 'A') {
            Body.setVelocity(ball, { x: x - 5, y });
        }
        if (event.key === 'd' || event.key === 'ArrowRight' || event.key === 'D') {
            Body.setVelocity(ball, { x: x + 5, y });
        }
    });

    // Win Condition

    Events.on(engine, 'collisionStart', event => {
        event.pairs.forEach((collision) => {
            const labels = ['ball', 'goal'];

            if (
                labels.includes(collision.bodyA.label) &&
                labels.includes(collision.bodyB.label)
            ) {
                world.gravity.y = 1;
                world.bodies.forEach(body => {
                    if (body.label === 'wall') {
                        Body.setStatic(body, false);
                    }
                });
                document.querySelector('.winner').classList.remove('hidden');
            }
        });
    });
}

function resetGame() {
    // Remove the existing render and world
    World.clear(world);
    Engine.clear(engine);
    Render.stop(render);
    Runner.stop(runner);
    render.canvas.remove();
    render.canvas = null;
    render.context = null;
    render.textures = {};
    document.querySelector('.winner').classList.add('hidden');

    // Start the game again
    startGame();
}

// Add an event listener for the restart button
document.querySelector('#restart-button').addEventListener('click', resetGame);

// Run the game
startGame();