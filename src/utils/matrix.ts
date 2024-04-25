export function printSpiral(matrix: number[][]): void {
    if (!matrix || matrix.length === 0) {
        return;
    }

    let top = 0;
    let bottom = matrix.length - 1;
    let left = 0;
    let right = matrix[0].length - 1;
    let output = '';

    while (top <= bottom && left <= right) {
        for (let i = left; i <= right; i++) {
            output = output + ' ' + matrix[top][i];
        }
        top++;

        for (let i = top; i <= bottom; i++) {
            output = output + ' ' + matrix[i][right];
        }
        right--;

        if (top <= bottom) {
            for (let i = right; i >= left; i--) {
                output = output + ' ' + matrix[bottom][i];
            }
            bottom--;
        }

        if (left <= right) {
            for (let i = bottom; i >= top; i--) {
                output = output + ' ' + matrix[i][left];
            }
            left++;
        }
    }

    console.log('Task 2:');
    console.log(output);
}
