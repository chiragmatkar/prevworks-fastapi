function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for(let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

let dict = {
    5: ["John Jones",1,"green"],
    6: ["Erica Smith",3,"darkblue"],
    7: ["Alice Young",1,"darkgreen"],
    8: ["Donald White",3,"purple"],
    9: ["Angela Lewis",1,"orange"],
    10: ["Martin Strong",3,"blue"]
}

let grid;
let nextGrid;
let posGrid;
let cols;
let rows;
let res = 25;
let day;
let infected_count;
let unvaxxed_count;
let vaxxed_count;
let run_flag;
let draw_mode;

function setup() {

    let canv = createCanvas(500, 500);
    canv.parent("canvas-container");
    canv.elt.style.border = "2px solid black";

    frameRate(1);

    cols = 500 / res;
    rows = 500 / res;

    draw_mode = 0;

    initSimulation();
    
    noLoop();
}

function initSimulation() {

    run_flag = 0;

    day = 0;
    document.querySelector("#day-count").innerHTML = day;
    // set the intial values of everything too 0
    grid = make2DArray(cols, rows); 
    for(let i = 0; i < cols; i++) {
        for(let j = 0; j < rows; j++) {
            grid[i][j] = 0;
        }
    }
    nextGrid = make2DArray(cols, rows); 
    for(let i = 0; i < cols; i++) {
        for(let j = 0; j < rows; j++) {
            nextGrid[i][j] = 0;
        }
    }

    let population = document.querySelector("#population").value;
    if(population > 400) {
        population = 400;
    }
    else if(population < 0) {
        population = 0;
    }

    let percentVaxxed = document.querySelector("#per-vaxxed").value;
    if(percentVaxxed > 100) {
        percentVaxxed = 100;
    }
    else if(percentVaxxed < 0) {
        percentVaxxed = 0;
    }

    let infected = document.querySelector("#init-infected").value;
    if(infected > 400) {
        infected = 400;
    }
    else if(infected < 0) {
        infected = 0;
    }

    infected_count = infected;
    document.querySelector("#infected-count").innerHTML = infected_count;



    let vaxxedPop = Math.round(population * (percentVaxxed/100.0));
    let genPop = population - vaxxedPop;
    
    for(let i = 0; i < genPop; i++) {
        while(true) {
            let x = Math.floor(Math.random()*cols);
            let y = Math.floor(Math.random()*rows);
            if(grid[x][y] == 0) {
                grid[x][y] = 1;
                break;
            }
        }
    }

    for(let i = 0; i < vaxxedPop; i++) {
        while(true) {
            let x = Math.floor(Math.random()*cols);
            let y = Math.floor(Math.random()*rows);
            if(grid[x][y] == 0) {
                grid[x][y] = 3;
                break;
            }
        }
    }

    for(let i = 0; i < infected; i++) {
        while(true) {
            let x = Math.floor(Math.random()*cols);
            let y = Math.floor(Math.random()*rows);
            if(grid[x][y] == 1 || grid[x][y] == 3) {
                grid[x][y] = 2;
                break;
            }
        }
    }

}

function draw() {
    
    // render current day
    document.querySelector("#day-count").innerHTML = day;
    if(run_flag) {
        day++;
    }
    infected_count = 0;
    unvaxxed_count = 0; 
    vaxxed_count = 0;

    background(255);
    for(let i = 0; i < cols; i++) {
        for(let j = 0; j < rows; j++) {
            let x = (i * res)+(res/2);
            let y = (j * res)+(res/2);
            if(grid[i][j] == 1) {
                fill('tan');
                circle(x,y,res);
                unvaxxed_count++;
            }
            else if(grid[i][j] == 2) {
                fill('red');
                polygon(x, y, res/2, 4);
                infected_count++;
            }
            else if(grid[i][j] == 3) {
                fill('tan');
                //circle(x,y,res);
                polygon(x, y, res/2, 6);
                vaxxed_count++;
            }
            else if(grid[i][j] == 4) {
                fill('grey');
                square(x- (res/2), y - (res/2), res);
            }
            else if(grid[i][j] >= 5 && grid[i][j] <= 10) {
                let idnum = grid[i][j];
                fill(dict[idnum][2]);
                if(dict[idnum][1] == 1) {
                    circle(x,y,res);
                    unvaxxed_count++;
                }
                else if(dict[idnum][1] == 2) {
                    polygon(x, y, res/2, 4);
                    infected_count++;
                }
                else if(dict[idnum][1] == 3) {
                    polygon(x, y, res/2, 6);
                    vaxxed_count++;
                }
            }
        }
    }

    document.querySelector("#infected-count").innerHTML = infected_count;
    document.querySelector("#unvaxxed-count").innerHTML = unvaxxed_count;
    document.querySelector("#vaxxed-count").innerHTML = vaxxed_count;


    
    for(let i = 0; i < cols; i++) {
        for(let j = 0; j < rows; j++) {
            if(grid[i][j] != 2 && run_flag == 1){
                infectionCheck(i,j);
            }
            else {
                nextGrid[i][j] = grid[i][j];
            }
        }
    }

    for(let i = 0; i < cols; i++) {
        for(let j = 0; j < rows; j++) {
            grid[i][j] = nextGrid[i][j];
        }
    }

    if(run_flag == 0) {
        for(let i = 0; i < cols; i++) {
            for(let j = 0; j < rows; j++) {
                let x = (i * res)+(res/2);
                let y = (j * res)+(res/2);
            
                let distance = Math.sqrt( Math.pow((x-mouseX),2) + Math.pow((y-mouseY),2) );
            
                if(distance < res/2) {
                    if(draw_mode >= 0) {
                        grid[i][j] = draw_mode;
                        //noLoop();
                        //redraw();
                        break;
                    }
                    else if(draw_mode == -1 && grid[i][j] != 0 && grid[i][j] != 4) {
                        document.querySelector("#select-box").style.display = "block";
                        if(grid[i][j] == 1) {
                            document.querySelector("#name").innerHTML = "Unknown";
                            document.querySelector("#employee-id").innerHTML = "Unknown";
                            document.querySelector("#status").innerHTML = "Unvaccinated";
                        }
                        else if(grid[i][j] == 2) {
                            document.querySelector("#name").innerHTML = "Unknown";
                            document.querySelector("#employee-id").innerHTML = "Unknown";
                            document.querySelector("#status").innerHTML = "Infected";
                        }
                        else if(grid[i][j] == 3) {
                            document.querySelector("#name").innerHTML = "Unknown";
                            document.querySelector("#employee-id").innerHTML = "Unknown";
                            document.querySelector("#status").innerHTML = "Vaccinated";
                        }
                        else if(grid[i][j] >= 5) {
                            document.querySelector("#name").innerHTML = dict[grid[i][j]][0];
                            document.querySelector("#employee-id").innerHTML = grid[i][j];
                            if(dict[grid[i][j]][1] == 1) {
                                document.querySelector("#status").innerHTML = "Unvaccinated";
                            }
                            else if(dict[grid[i][j]][1] == 2) {
                                document.querySelector("#status").innerHTML = "Infected";
                            }
                            else if(dict[grid[i][j]][1] == 3) {
                                document.querySelector("#status").innerHTML = "Vaccinated";
                            }
                        }
                        break;
                    }
                }
            
            } 
        }
    }

}

function mousePressed() {
    console.log("mouse pressed");
    run_flag = 0;
    frameRate(30);

    loop();
}

function mouseReleased() {

    console.log("mouse released");
    noLoop();

    frameRate(1);
}

// TODO fix infection check for employees
function infectionCheck(x, y) {

    let infectedNeighbors = 0;

    // North
    let tempX = x;
    let tempY = y;
    for(let i = 0; i < 3; i++) {

        tempY++;

        if(tempX < 0 || tempX >= cols || tempY < 0 || tempY >= rows || grid[tempX][tempY] == 4) {
            break;
        }
        else if(grid[tempX][tempY] == 2) {
            infectedNeighbors++;
        }
    }

    // East
    tempX = x;
    tempY = y;
    for(let i = 0; i < 3; i++) {

        tempX++;

        if(tempX < 0 || tempX >= cols || tempY < 0 || tempY >= rows || grid[tempX][tempY] == 4) {
            break;
        }
        else if(grid[tempX][tempY] == 2) {
            infectedNeighbors++;
        }
    }

    // South
    tempX = x;
    tempY = y;
    for(let i = 0; i < 3; i++) {

        tempY--;

        if(tempX < 0 || tempX >= cols || tempY < 0 || tempY >= rows || grid[tempX][tempY] == 4) {
            break;
        }
        else if(grid[tempX][tempY] == 2) {
            infectedNeighbors++;
        }
    }

    // West
    tempX = x;
    tempY = y;
    for(let i = 0; i < 3; i++) {

        tempX--;

        if(tempX < 0 || tempX >= cols || tempY < 0 || tempY >= rows || grid[tempX][tempY] == 4) {
            break;
        }
        else if(grid[tempX][tempY] == 2) {
            infectedNeighbors++;
        }
    }

    // Northeast
    tempX = x;
    tempY = y;
    for(let i = 0; i < 3; i++) {

        tempY++;
        tempX++;

        if(tempX < 0 || tempX >= cols || tempY < 0 || tempY >= rows || grid[tempX][tempY] == 4) {
            break;
        }
        else if(grid[tempX][tempY] == 2) {
            infectedNeighbors++;
        }
    }

    // Southeast
    tempX = x;
    tempY = y;
    for(let i = 0; i < 3; i++) {

        tempY--;
        tempX++;

        if(tempX < 0 || tempX >= cols || tempY < 0 || tempY >= rows || grid[tempX][tempY] == 4) {
            break;
        }
        else if(grid[tempX][tempY] == 2) {
            infectedNeighbors++;
        }
    }

    // Southwest
    tempX = x;
    tempY = y;
    for(let i = 0; i < 3; i++) {

        tempY--;
        tempX--;

        if(tempX < 0 || tempX >= cols || tempY < 0 || tempY >= rows || grid[tempX][tempY] == 4) {
            break;
        }
        else if(grid[tempX][tempY] == 2) {
            infectedNeighbors++;
        }
    }

    // Northwest
    tempX = x;
    tempY = y;
    for(let i = 0; i < 3; i++) {

        tempY++;
        tempX--;

        if(tempX < 0 || tempX >= cols || tempY < 0 || tempY >= rows || grid[tempX][tempY] == 4) {
            break;
        }
        else if(grid[tempX][tempY] == 2) {
            infectedNeighbors++;
        }
    }


    if(infectedNeighbors > 0) {
        let rand = random(8);
        if((grid[x][y] == 1 && rand < 4) || (grid[x][y] == 3 && rand < 2)) {
            nextGrid[x][y] = 2;
        }
        else if(grid[x][y] > 4 && ((dict[grid[x][y]][1] == 1 && rand < 4) || (dict[grid[x][y]][1] == 3 && rand < 2))) {
            dict[grid[x][y]][1] = 2;
        }
        else {
            nextGrid[x][y] = grid[x][y];
        }
    }
    else {
        nextGrid[x][y] = grid[x][y];
    }

}

document.querySelector("#run-btn").onclick = function() {
    run_flag = 1;
    loop();
}

document.querySelector("#stop-btn").onclick = function() {
    run_flag = 0;
    noLoop();
}

document.querySelector("#reset-btn").onclick = function() {
    loop();
    initSimulation();
    noLoop();
}

document.querySelector("#reset-btn").onclick = function() {
    loop();
    initSimulation();
    noLoop();
}

document.querySelector("#wall-btn").onclick = function() {
    draw_mode = 4;
    document.querySelector("#select-box").style.display = "none";    
}
document.querySelector("#infected-btn").onclick = function() {
    draw_mode = 2;
    document.querySelector("#select-box").style.display = "none";

}
document.querySelector("#unvaxxed-btn").onclick = function() {
    draw_mode = 1;
    document.querySelector("#select-box").style.display = "none";

}
document.querySelector("#vaxxed-btn").onclick = function() {
    draw_mode = 3;
    document.querySelector("#select-box").style.display = "none";

}
document.querySelector("#erase-btn").onclick = function() {
    draw_mode = 0;
    document.querySelector("#select-box").style.display = "none";

}
document.querySelector("#select-btn").onclick = function() {
    draw_mode = -1;
    //document.querySelector("#select-box").style.display = "block";
}

const employeeBtns = document.querySelectorAll('.btn-employee')

employeeBtns.forEach(btn => {
    btn.style.backgroundColor = dict[btn.dataset.id][2];
    btn.onclick = function() {
        console.log(this.dataset.id);
        draw_mode = this.dataset.id;
        document.querySelector("#select-box").style.display = "none";
    }
});


function polygon(x, y, radius, npoints) {
    let angle = TWO_PI / npoints;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = x + cos(a) * radius;
      let sy = y + sin(a) * radius;
      vertex(sx, sy);
    }
    endShape(CLOSE);
}
