const cvs = document.getElementById("cvs");
const ctx = cvs.getContext("2d");

let a = 80;
ctx.translate(cvs.width / 2, cvs.height / 2);

let projection_matrix = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 0]
];

let angle = 2;



let points = [
    [a, a, a],
    [-a, a, a],
    [a, -a, a],
    [a, a, -a],
    [-a, -a, a],
    [-a, a, -a],
    [a, -a, -a],
    [-a, -a, -a],
];

function multiply_matrix(first_mat, second_matrix) {
    let return_arr = [0, 0, 0];
    for (let i = 0; i < 3; i++) {
        let sum = 0;
        // for (let j = 0; j < 1; j++) {
        for (let k = 0; k < 3; k++) {
            sum += first_mat[i][k] * second_matrix[k][0];
            // }
        }
        return_arr[i] = sum;
    }
    return return_arr;
}

function drawCube() {
    let newPoints = [
        [a, a, a],
        [-a, a, a],
        [a, -a, a],
        [a, a, -a],
        [-a, -a, a],
        [-a, a, -a],
        [a, -a, -a],
        [-a, -a, -a]
    ];
    let rotateX = [
        [1, 0, 0],
        [0, Math.cos(angle), -1 * Math.sin(angle)],
        [0, Math.sin(angle), Math.cos(angle)],
    ];
    let rotateY = [
        [Math.cos(angle), 0, Math.sin(angle)],
        [0, 1, 0],
        [-Math.sin(angle), 0, Math.cos(angle)]
    ];
    let rotateZ = [
        [Math.cos(angle), -1 * Math.sin(angle), 0],
        [Math.sin(angle), Math.cos(angle), 0],
        [0, 0, 1],
    ];
    for (let i = 0; i < points.length; i++) {
        let my_matrix = [
            [0],
            [0],
            [0]
        ];
        for (let j = 0; j < 3; j++) {
            my_matrix[j][0] = points[i][j];
        }
        let rotated_cubeX = multiply_matrix(rotateX, my_matrix);
        let final_matrix1 = [
            [0],
            [0],
            [0]
        ];
        for (let j = 0; j < 3; j++) {
            final_matrix1[j][0] = rotated_cubeX[j];
        }
        let rotated_cubeY = multiply_matrix(rotateY, final_matrix1);
        let final_matrix2 = [
            [0],
            [0],
            [0]
        ];
        for (let j = 0; j < 3; j++) {
            final_matrix2[j][0] = rotated_cubeY[j];
        }
        let rotated_cube = multiply_matrix(rotateZ, final_matrix2);
        newPoints[i] = rotated_cube;
        let final_matrix = [
            [0],
            [0],
            [0]
        ];
        for (let j = 0; j < 3; j++) {
            final_matrix[j][0] = rotated_cube[j];
        }
        let finalPoints = multiply_matrix(projection_matrix, final_matrix);
        ctx.beginPath();
        ctx.lineWidth = 8;
        ctx.arc(finalPoints[0], finalPoints[1], 5000 / (final_matrix[2][0] + 4 * a), 0, Math.PI * 2, false);
        ctx.fill();
        ctx.font = "20px georgia";
        ctx.fillStyle = "red";
        ctx.fillText(i + 1, finalPoints[0] - 20, finalPoints[1] - 20);
        ctx.stroke();
        ctx.closePath();
    }
    ctx.moveTo(newPoints[0][0], newPoints[0][1]);
    ctx.lineTo(newPoints[1][0], newPoints[1][1]);

    ctx.lineTo(newPoints[4][0], newPoints[4][1]);

    ctx.lineTo(newPoints[2][0], newPoints[2][1]);

    ctx.lineTo(newPoints[0][0], newPoints[0][1]);

    ctx.lineTo(newPoints[3][0], newPoints[3][1]);
    // ctx.lineWidth = 30;
    ctx.lineTo(newPoints[6][0], newPoints[6][1]);

    ctx.lineTo(newPoints[7][0], newPoints[7][1]);

    ctx.lineTo(newPoints[5][0], newPoints[5][1]);

    ctx.lineTo(newPoints[3][0], newPoints[3][1]);

    ctx.moveTo(newPoints[6][0], newPoints[6][1]);
    ctx.lineTo(newPoints[2][0], newPoints[2][1]);

    ctx.moveTo(newPoints[7][0], newPoints[7][1]);
    ctx.lineTo(newPoints[4][0], newPoints[4][1]);

    ctx.moveTo(newPoints[5][0], newPoints[5][1]);
    ctx.lineTo(newPoints[1][0], newPoints[1][1]);

    ctx.closePath();
    ctx.stroke();
}


function draw() {
    ctx.fillStyle = "pink";
    ctx.fillRect(-cvs.width / 2, -cvs.height / 2, cvs.width, cvs.height);
    ctx.fill();
    drawCube();
    angle += 0.005;
}

setInterval(draw, 1000 / 12000);