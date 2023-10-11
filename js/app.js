let countCompareMerge = 0;
let countSwapMerge = 0;

let countCompareQuick = 0;
let countSwapQuick = 0;

const optionArr = [
    {
        type: "Option1",
        value: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    },
    {
        type: "Option2",
        value: [8, 2, 5, 7, 3, 1, 9, 4, 6]
    },
    {
        type: "Option3",
        value: [9, 8, 7, 6, 5, 4, 3, 2, 1]
    },
]

function onSubmit() {
    var ele = document.getElementsByName('sortType');
    let p_type = ""
    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked) p_type = ele[i].value
    }

    var e = document.getElementById("standardSelect");
    var arr = e.value ? e.value.split(" ") : [1, 2, 3, 4, 5, 6, 7, 8, 9];
    // console.log("arr", arr);
    let rs
    let objRS
    switch (p_type) {
        case "selection":
            // var arr = e.value ? e.value.split(" ") : [1, 2, 3, 4, 5, 6, 7, 8, 9];
            console.log("arr", arr);
            rs = selectionSort(arr)
            console.log("selectionSort", arr);
            break;
        case "insertion":
            rs = insertionSort(arr)
            console.log("insertionSort", arr);
            break;
        case "bubble":
            rs = bubbleSort(arr)
            console.log("bubbleSort", arr);
            break;
        case "merge":
            countCompareMerge = 0
            countSwapMerge = 0
            rs = mergeSort(arr)
            objRS = {
                arr: rs,
                countCompare: countCompareMerge,
                countSwap: countSwapMerge
            }
            rs = objRS;
            break;
        case "quick":
            countCompareQuick = 0
            countSwapQuick = 0
            let arr1 = [6, 5, 3, 2, 8, 9, 7, 4, 1]
            rs = quickSort(arr1)
            console.log("quickSort", arr1, rs);
            objRS = {
                arr: rs,
                countCompare: countCompareQuick,
                countSwap: countSwapQuick
            }
            rs = objRS;
            break;
        case "non-recursive":
            countCompareQuick = 0
            countSwapQuick = 0
            // var arr = [7, 5, 1, 8, 2]
            rs = quickSort_nonRecursive(arr)
            console.log("quickSort", rs);
            objRS = {
                arr: rs,
                countCompare: countCompareQuick,
                countSwap: countSwapQuick
            }
            rs = objRS;
            break;
    }
    if (rs) fillValue(rs)
}
function fillValue(data) {
    document.getElementById("result").innerHTML = data.arr.toString();
    // document.getElementById("countCompare").innerHTML = data.countCompare;
    // document.getElementById("countSwap").innerHTML = data.countSwap;
}

function selectionSort(inputArr) {
    let n = inputArr.length;
    let countCompare = 0;
    let countSwap = 0;

    for (let i = 0; i < n; i++) {
        // tìm phần tử nhỏ nhất trong mảng
        let min = i;
        for (let j = i + 1; j < n; j++) {
            countCompare++

            if (inputArr[j] < inputArr[min]) {
                min = j;
            }
        }
        if (min != i) {
            // hoán đổi vị trí
            let tmp = inputArr[i];
            inputArr[i] = inputArr[min];
            inputArr[min] = tmp;
            countSwap++
        }
    }
    let objRS = {
        arr: inputArr,
        countCompare,
        countSwap
    }
    return objRS;
}

function insertionSort(inputArr) {
    let countCompare = 0;
    let countSwap = 0;
    let n = inputArr.length;
    for (let i = 1; i < n; i++) {
        // Choosing the first element in our unsorted subarray
        let current = inputArr[i];
        // The last element of our sorted subarray
        let j = i - 1;
        countCompare++
        while ((j > -1) && (current < inputArr[j])) {
            countCompare++
            inputArr[j + 1] = inputArr[j];
            j--;
            countSwap++
        }
        inputArr[j + 1] = current;
    }
    let objRS = {
        arr: inputArr,
        countCompare,
        countSwap
    }
    return objRS;
}

function bubbleSort(inputArr) {
    let countCompare = 0;
    let countSwap = 0;
    for (var i = 0; i < inputArr.length; i++) {

        // Last i elements are already in place  
        for (var j = 0; j < (inputArr.length - i - 1); j++) {
            countCompare++

            // Checking if the item at present iteration 
            // is greater than the next iteration
            if (inputArr[j] > inputArr[j + 1]) {

                // If the condition is true
                // then swap them
                var temp = inputArr[j]
                inputArr[j] = inputArr[j + 1]
                inputArr[j + 1] = temp
                countSwap++
            }
        }
    }
    let objRS = {
        arr: inputArr,
        countCompare,
        countSwap
    }
    return objRS;
}
function merge(left, right) {
    let arrTmp = []
    // Break out of loop if any one of the array gets empty
    while (left.length && right.length) {
        // Pick the smaller among the smallest element of left and right sub arrays 
        countCompareMerge++
        if (left[0] < right[0]) {
            arrTmp.push(left.shift())
        } else {
            arrTmp.push(right.shift())
        }
    }

    // Concatenating the leftover elements
    // (in case we didn't go through the entire left or right array)
    return [...arrTmp, ...left, ...right]
}

function mergeSort(inputArr) {
    const half = inputArr.length / 2

    countCompareMerge++
    // Base case or terminating case
    if (inputArr.length < 2) {
        return inputArr
    }

    const left = inputArr.splice(0, half)
    return merge(mergeSort(left), mergeSort(inputArr))
}

function quickSort(inputArr) {
    countCompareQuick++

    if (inputArr.length <= 1) {
        return inputArr;
    }

    let pivot = inputArr[0];
    let leftArr = [];
    let rightArr = [];

    for (let i = 1; i < inputArr.length; i++) {
        countCompareQuick++
        if (inputArr[i] < pivot) {
            leftArr.push(inputArr[i]);
        } else {
            rightArr.push(inputArr[i]);
        }
    }

    console.log("pivot", pivot);
    console.log("leftArr", leftArr);
    console.log("rightArr", rightArr);

    return [...quickSort(leftArr), pivot, ...quickSort(rightArr)];
};

// b1: Khởi tạo Stack Rỗng
// b2: Dãy đang xét từ 0 đến n-1. Cất 2 L=0 và R=n-1 vào Stack
// b3: Lấy (L, R) từ Stack
// b4: Phân hoạch dãy A[L] .. A[R] thành 2 dãy A[L]..A[j] và A[i]..A[R]
// b5: Nếu (i<R) cất (i,R) vào Stack
// b6: R = j
// b7: Nếu (L<R) Quay lại b4 để phân hoạch dãy A[L] ..A[j] ngược lại chuyển sang b8
// b8: Nếu Stack <> rỗng quay lại b3 phân hoạch các dãy bên phải ngược lại kết thúc.

function quickSort_nonRecursive_log(inputArr) {
    // b1: Khởi tạo Stack Rỗng
    let stack = [];
    let L, R, i, j;
    let x;
    let n = inputArr.length

    // b2: Dãy đang xét từ 0 đến n-1. Đẩy 2 L=0 và R=n-1 vào Stack;
    // L: vị trí bắt đầu duyệt từ trái ; R ngược lại
    stack.push({ L: 0, R: n - 1 });
    do {
        const P = stack.pop();
        L = P.L;
        R = P.R;
        console.log("stack.length1: ", P);
        do {
            // b4: Phân hoạch dãy A[L] .. A[R] thành 2 dãy A[L]..A[j] và A[i]..A[R]
            i = L;
            j = R;
            x = inputArr[Math.floor((L + R) / 2)];

            do {
                console.log("pivot ", x, i, j);
                while (inputArr[i] < x) i++; //duyệt từ trái bắt đầu từ i -> vi trí của giá trị x
                while (inputArr[j] > x) j--; //duyệt từ phải j -> vi trí của giá trị x
                console.log(i, "- value i: ", inputArr[i]);
                console.log(j, "- value j: ", inputArr[j]);
                if (i <= j) { //hoán vị 2 vị trí
                    [inputArr[i], inputArr[j]] = [inputArr[j], inputArr[i]];
                    i++;
                    j--;
                }
                console.log("inputArr: ", inputArr);
            } while (i <= j);
            console.log("B5: ", i, j);
            console.log("B5 PUSH: i < R", i, R);
            // b5: Nếu (i<R) cất (i,R) vào Stack
            if (i < R) stack.push({ L: i, R: R });
            R = j;  //tiếp tục với vế trái từ 0 (L) -> j

            console.log("B5 LR: ", L, R);
        } while (L < R);
    } while (stack.length !== 0); //khi trong stack không còn phần tử nào

    return inputArr
}



function quickSort_nonRecursive(inputArr) {
    // Khởi tạo Stack Rỗng
    let stack = [];
    let L, R, i, j;
    let x;
    let n = inputArr.length

    // Dãy đang xét từ 0 đến n-1. Đẩy 2 L=0 và R=n-1 vào Stack;
    // L: vị trí bắt đầu duyệt từ trái ; R ngược lại
    stack.push({ L: 0, R: n - 1 });
    do {
        const P = stack.pop();
        L = P.L;
        R = P.R;
        do {
            // Phân hoạch dãy A[L] .. A[R] thành 2 dãy A[L]..A[j] và A[i]..A[R]
            i = L;
            j = R;
            x = inputArr[Math.floor((L + R) / 2)];

            do {
                while (inputArr[i] < x) i++; //duyệt từ trái bắt đầu từ i -> vi trí của giá trị x
                while (inputArr[j] > x) j--; //duyệt từ phải j -> vi trí của giá trị x

                if (i <= j) { //hoán vị 2 vị trí
                    [inputArr[i], inputArr[j]] = [inputArr[j], inputArr[i]];
                    i++;
                    j--;
                }
            } while (i <= j);

            // Nếu (i<R) push (i,R) vào Stack
            if (i < R) stack.push({ L: i, R: R });
            R = j;  //tiếp tục với vế trái từ 0 (L) -> j

        } while (L < R); //khi vị trí của L >= R thì pop từ stack
    } while (stack.length !== 0); //khi trong stack không còn phần tử nào

    return inputArr
}



