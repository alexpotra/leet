// 01 - Merge sorted arrays
function mergeArrays(a: number[], b: number[]): number[] {
    const result: number[] = [];
    let i = 0;
    let j = 0;

    while (i < a.length && j < b.length) {
        if (a[i] <= b[j]) {
            result.push(a[i]);
            i++;
        } else {
            result.push(b[j]);
            j++;
        }
    }

    while (i < a.length) {
        result.push(a[i++]);
    }

    while (j < b.length) {
        result.push(b[j++]);
    }

    return result;
}

// 02 - Merge N sorted arrays
function mergeManyArrays(a: number[][]) {
    const result: number[] = [];
    const merged: number[] = a.map((array) => 0); // Initialize an array of tracking merge positions
    let found = true;

    while (found) {
        let min: number | undefined = undefined;
        let minIndex = 0;

        for (let i = 0; i < a.length; i++) {
            if (merged[i] < a[i].length) {
                if (min === undefined || min > a[i][merged[i]]) {
                    min = a[i][merged[i]];
                    minIndex = i;
                }
            }
        }

        // We found a new minimum
        if (min !== undefined) {
            result.push(min);
            merged[minIndex]++;
        } else {
            found = false;
        }
    }

    return result;
}

// 03 - Three sum to 0
function threeSum(nums: number[]): number[][] {
    const result: number[][] = [];
    // Create set of all numbers
    const numSet = new Map<number, number>();

    // Initialize set
    for (let k = 0; k < nums.length; k++) {
        numSet.set(nums[k], k);
    }

    // Go through all pairs and find if there's an opposite number in the set
    for (let i = 0; i < nums.length - 1; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            const opposite = -(nums[i] + nums[j]);
            if (numSet.has(opposite)) {
                const position = numSet.get(opposite);
                if (position !== i && position !== j) {
                    result.push([nums[i], nums[j], nums[position]]);
                }
            }
        }
    }
    return result;
}

// 04 - Traverse matrix in spiral order
function spiralOrder(matrix: number[][]): number[] {
    const result: number[] = [];

    let top = 0;
    let bottom = matrix.length;
    let left = 0;
    let right = matrix[0].length;

    let i = 0;
    let direction = 0;
    while (top < bottom && left < right) {
        switch (direction) {
            case 0: // going right
                for (i = left; i < right; i++) {
                    result.push(matrix[top][i]);
                }
                top++;
                break;
            case 1: // going down
                for (i = top; i < bottom; i++) {
                    result.push(matrix[i][right - 1]);
                }
                right--;
                break;
            case 2: // going right
                for (i = right - 1; i >= left; i--) {
                    result.push(matrix[bottom - 1][i]);
                }
                bottom--;
                break;
            case 3: // going up
                for (i = bottom - 1; i >= top; i--) {
                    result.push(matrix[i][left]);
                }
                left++;
                break;
            default:
                break;
        }
        direction = (direction + 1) % 4;
    }

    return result;
}

// 05 - Remove duplicates in place and return new lenght
function removeDuplicates(a: number[]): number {
    const result = 0;
    let i = 0;
    let j = 1;

    while (j < a.length) {
        while (j < a.length && a[i] === a[j]) {
            j++;
        }

        if (j < a.length) {
            i++;
            a[i] = a[j];
        }
    }

    return i;
}

// 06 - Merge intervals
function mergeIntervals(intervals: number[][]): number[][] {
    const result: number[][] = [];

    if (intervals.length === 0) {
        return intervals;
    }

    intervals.sort((a, b) => (a[0] <= b[0] ? -1 : 1));

    let current = intervals[0];
    for (let j = 1; j < intervals.length; j++) {
        if (current[1] > intervals[j][0]) {
            current[1] = Math.max(current[1], intervals[j][1]);
        } else {
            result.push(current);
            current = intervals[j];
        }
    }

    result.push(current);
    return result;
}

// 07 - Island water
function maxWater(heights: number[]): number {
    let result = 0;

    let l = 0;
    let r = heights.length - 1;

    while (l < r) {
        result = Math.max(result, (r - l) * Math.min(heights[l], heights[r]));
        if (heights[l] > heights[r]) {
            r--;
        } else {
            l++;
        }
    }

    return result;
}

// 08 - Rotate right array
function rotate(a: number[], k: number): void {
    function reverse(start: number, end: number) {
        while (start < end) {
            const temp = a[start];
            a[start] = a[end];
            a[end] = temp;

            start++;
            end--;
        }
    }

    reverse(0, a.length - 1);
    reverse(0, k - 1);
    reverse(k, a.length - 1);
}

// 09 - Rotate right matrix
function rotateMatrix(m: number[][]) {
    // Idea is to transpose twice along diagonal and vertical middle
    for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[0].length; j++) {
            const temp = m[i][j];
            m[i][j] = m[j][i];
            m[j][i] = temp;
        }
    }

    for (let i = 0; i < m.length; i++) {
        let l = 0;
        let r = m[0].length - 1;
        while (l < r) {
            const temp = m[i][l];
            m[i][l] = m[i][r];
            m[i][r] = temp;
            l++;
            r--;
        }
    }
}
