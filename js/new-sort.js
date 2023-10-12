let currentArr = []
var delayInMilliseconds = 0;

//support function
function randomIntFromInterval(n, m) {
    const arr = Array.from({ length: m - n + 1 }, (_, i) => i + n);
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function checkDuplicateChangeInfo(arr, value) {
    var valueArr = arr.map(function (item) {
        return item.from + "" + item.to;
    });
    let isDuplicate = valueArr.indexOf(value);

    return isDuplicate
}

function genMergeItem(arr) {
    let length = $("#lengthArr").val()
    // console.log("length",length);
    let w, h, l
    for (let i = 1; i <= length; i++) {
        // console.log("hihi",arr, i);
        if (arr.includes(i)) {
            w = (100 / length);
            h = ((100 / length) * i)
            l = ((100 / length) * (i - 1))

            // console.log("#item" +i, "block");
            $("#item" + i).css("display", "block")
            $("#item" + i).css("left", l + "%")
            $("#item" + i).css("width", w + "%")
            $("#item" + i).css("height", h + "%")
            const target = document.getElementById("item" + i);
            target.classList.remove("border");
        } else {
            // console.log("#item" + i, "none");
            // $("#item" + i).css("display", "none")
            const target = document.getElementById("item" + i);
            target.classList.add("border");
        }
    }
}

function changeStyle(i, j) {
    let c_i = "item" + i;
    let c_j = "item" + j;

    // console.log("changeStyle", c_i, c_j);

    const source = document.getElementById(c_i);
    const target = document.getElementById(c_j);

    let obj
    let source_style = source.style.cssText
    let target_style = target.style.cssText


    source_style = source_style.split(";")
    for (let i = 0; i < source_style.length - 1; i++) {
        obj = source_style[i].split(":")
        $("#" + c_j).css(obj[0], obj[1])
    }

    target_style = target_style.split(";")
    for (let i = 0; i < target_style.length - 1; i++) {
        obj = target_style[i].split(":")
        $("#" + c_i).css(obj[0], obj[1])
    }
}

function transferItem(arr) {
    let index
    var newArr = currentArr;
    let arrIndex = [] //vi tri dang thuc hien
    let arrChange = [] //vi tri có thay doi
    let obj
    for (let i = 0; i < arr.length; i++) {
        index = newArr.indexOf(arr[i]);
        arrIndex.push(index)

        //co thay doi so vi tri => add thay doi
        if (index !== i) {
            let rsCheck = checkDuplicateChangeInfo(arrChange, (i + "" + index)) + checkDuplicateChangeInfo(arrChange, (index + "" + i))
            if (rsCheck <= 0) {
                obj = {
                    from: index,
                    to: i
                }
                // console.log("newArr before:", newArr);
                changeStyle(newArr[obj.from], newArr[obj.to])
                arrChange.push(obj)

                let tmp = newArr[obj.from];
                newArr[obj.from] = newArr[obj.to];
                newArr[obj.to] = tmp;
                // console.log("newArr after:", newArr);
            }
        }
    }

    currentArr = newArr
}

//after event
$(document).ready(function () {
    $("#lengthArr").change(function () {
        let length = $(this).val()
        let newArr = randomIntFromInterval(1, length)
        console.log("newArr", newArr);
        let w, h, l, str
        let listItem = ''
        for (let i = 0; i < length; i++) {
            w = (100 / length);
            h = ((100 / length) * newArr[i])
            l = ((100 / length) * i)
            str = '<div class="element" style="left: ' + l + '%; width: ' + w + '%; height: ' + h + '%;" id ="item' + newArr[i] + '"></div> \n'
            listItem += str
        }
        document.getElementById("sort-container").innerHTML = listItem;
        currentArr = newArr
    });
    $("#run-btn").click(function () {
        run()
    });
    $("#shuffle-btn").click(function () {
        shuffle()
    });

});

function shuffle() {
    let length = $("#lengthArr").val()

    currentArr = randomIntFromInterval(1, length)

    let w, h, l, str
    let listItem = ''
    for (let i = 0; i < length; i++) {
        w = (100 / length);
        h = ((100 / length) * currentArr[i])
        l = ((100 / length) * i)
        str = '<div class="element" style="left: ' + l + '%; width: ' + w + '%; height: ' + h + '%;" id ="item' + currentArr[i] + '"></div> \n'
        listItem += str
    }
    document.getElementById("sort-container").innerHTML = listItem;
}

async function run() {
    var ele = document.getElementsByName('sortType');
    delayInMilliseconds = $("#rateTime").val()

    let p_type = ""
    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked) p_type = ele[i].value
    }
    var arr = []
    for (let j = 0; j < currentArr.length; j++) {
        arr.push(currentArr[j])
    }
    let rs
    let t0 = performance.now(); // start time
    let t1
    switch (p_type) {
        case "selection":
            // console.log("arr", arr);
            rs = await selectionSort(arr)
            // console.log("selectionSort", arr);
            t1 = performance.now(); // end time
            console.log(`Time taken to execute add function ${p_type} : ${t1 - t0} milliseconds`);
            break;
        case "insertion":
            // console.log("arr", arr);
            rs = await insertionSort(arr)
            // console.log("insertionSort", arr);
            t1 = performance.now(); // end time
            console.log(`Time taken to execute add function ${p_type} : ${t1 - t0} milliseconds`);
            break;
        case "bubble":
            // console.log("arr", arr);
            rs = await bubbleSort(arr)
            // console.log("bubbleSort", arr);
            t1 = performance.now(); // end time
            console.log(`Time taken to execute add function ${p_type} : ${t1 - t0} milliseconds`);
            break;
        case "merge":
            // console.log("arr", arr);
            rs = await mergeSort(arr)
            console.log("mergeSort", rs);
            t1 = performance.now(); // end time
            console.log(`Time taken to execute add function ${p_type} : ${t1 - t0} milliseconds`);
            break;
        case "quick":
            // console.log("arr", arr);
            rs = await quickSort(arr)
            // console.log("quickSort", rs);
            t1 = performance.now(); // end time
            console.log(`Time taken to execute add function ${p_type} : ${t1 - t0} milliseconds`);
            break;
        case "non-recursive":
            rs = quickSort_nonRecursive(arr)
            // console.log("non-recursive", rs);
            t1 = performance.now(); // end time
            console.log(`Time taken to execute add function ${p_type} : ${t1 - t0} milliseconds`);
            break;
    }

}

async function selectionSort(inputArr) {
    let n = inputArr.length;

    for (let i = 0; i < n; i++) {
        // tìm phần tử nhỏ nhất trong mảng
        let min = i;
        for (let j = i + 1; j < n; j++) {
            if (inputArr[j] < inputArr[min]) {
                min = j;
            }
        }
        const target = document.getElementById("item" + inputArr[min]);
        target.classList.add("red");
        if (min != i) {
            // hoán đổi vị trí
            let tmp = inputArr[i];
            inputArr[i] = inputArr[min];
            inputArr[min] = tmp;

            changeStyle(inputArr[i], inputArr[min])
        }
        await new Promise(resolve => setTimeout(resolve, delayInMilliseconds * 1000));
        target.classList.remove("red");
    }

    return inputArr;
}

async function insertionSort(inputArr) {
    let n = inputArr.length;
    for (let i = 1; i < n; i++) {
        let current = inputArr[i];

        let j = i - 1;
        //chèn vào trị trí thích hợp từ 0 ->j
        while ((j > -1) && (current < inputArr[j])) {
            changeStyle(inputArr[j], current)

            inputArr[j + 1] = inputArr[j];
            j--;
        }
        inputArr[j + 1] = current;
        const target = document.getElementById("item" + current);
        target.classList.add("red");
        await new Promise(resolve => setTimeout(resolve, delayInMilliseconds * 1000));
        target.classList.remove("red");
    }
    return inputArr;
}

async function bubbleSort(inputArr) {

    for (var i = 0; i < inputArr.length; i++) {
        for (var j = 0; j < (inputArr.length - i - 1); j++) {
            const target = document.getElementById("item" + inputArr[j]);
            target.classList.add("red");
            if (inputArr[j] > inputArr[j + 1]) {

                var temp = inputArr[j]
                inputArr[j] = inputArr[j + 1]
                inputArr[j + 1] = temp
                changeStyle(inputArr[j], temp)
            }
            await new Promise(resolve => setTimeout(resolve, delayInMilliseconds * 1000));
            target.classList.remove("red");
        }
    }
    return inputArr;
}

async function merge(left, right) {
    let arrTmp = []
    while (left.length && right.length) {
        if (left[0] < right[0]) {
            let tmp = left.shift()
            arrTmp.push(tmp)
        } else {
            arrTmp.push(right.shift())
        }

    }
    let rs = [...arrTmp, ...left, ...right]
    await new Promise(resolve => setTimeout(resolve, delayInMilliseconds * 1000));
    transferItem(rs)

    return rs
}

async function mergeSort(inputArr) {
    const half = inputArr.length / 2

    if (inputArr.length < 2) {
        // console.log("item" + inputArr[0]);
        // const target = document.getElementById("item" + inputArr[0]);
        // target.classList.add("red");
        return inputArr
    }
    const left = inputArr.splice(0, half)

    return merge(await mergeSort(left), await mergeSort(inputArr))
}

async function quickSort(inputArr) {

    if (inputArr.length <= 1) {
        return inputArr;
    }

    let pivot = inputArr[0];
    let leftArr = [];
    let rightArr = [];

    const target = document.getElementById("item" + pivot);
    target.classList.add("red");
    await new Promise(resolve => setTimeout(resolve, delayInMilliseconds * 1000));
    target.classList.remove("red");

    for (let i = 1; i < inputArr.length; i++) {
        if (inputArr[i] < pivot) {
            leftArr.push(inputArr[i]);
        } else {
            rightArr.push(inputArr[i]);
        }
    }

    // console.log("pivot", pivot);
    // console.log("leftArr", leftArr);
    // console.log("rightArr", rightArr);
    let rs = [... await quickSort(leftArr), pivot, ... await quickSort(rightArr)]
    transferItem(rs)

    return rs;
};

async function quickSort_nonRecursive(inputArr) {
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

            const target = document.getElementById("item" + x);
            target.classList.add("red");
            await new Promise(resolve => setTimeout(resolve, delayInMilliseconds * 1000));
            target.classList.remove("red");

            do {
                while (inputArr[i] < x) i++; //duyệt từ trái bắt đầu từ i -> vi trí của giá trị x
                while (inputArr[j] > x) j--; //duyệt từ phải j -> vi trí của giá trị x

                if (i <= j) { //hoán vị 2 vị trí
                    [inputArr[i], inputArr[j]] = [inputArr[j], inputArr[i]];
                    changeStyle(inputArr[i], inputArr[j])

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