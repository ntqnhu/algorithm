function randomIntFromInterval(n, m) {
    const arr = Array.from({ length: m - n + 1 }, (_, i) => i + n);
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

let currentArr = []
let currentArr_fe = []
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
            currentArr_fe.push(str)
        }
        document.getElementById("sort-container").innerHTML = listItem;
        currentArr = newArr
    });
    $("#run-btn").click(function () {
        // alert("button");
        run()
    });

});

function genFE(inputArr) {
    let listItem = ''
    for (let i = 0; i < inputArr.length; i++) {
        listItem += currentArr_fe[i]
    }
    document.getElementById("sort-container").innerHTML = listItem;
}

function copyStyles(source, target) {
    const styles = window.getComputedStyle(source);
    target.style.cssText = styles.cssText;
  }

function changeStyle(i, j) {
    let c_i = "item" + i;
    let c_j = "item" + j;
    const source = document.getElementById(c_i);
    const target = document.getElementById(c_j);
    console.log("before", source.style.cssText, target.style.cssText);

    let source_style = source.style.cssText
    const json = CSSJSON.toJSON(source_style);
console.log(json);

    let target_style = target.style.cssText



    $(c_i).css(target_style);
    $(c_j).css(source_style);

    console.log("after", document.getElementById(c_i).style.cssText, document.getElementById(c_j).style.cssText);


    // copyStyles(source, target);

    // var left_i =  $("#item" + i).css("left");
    // var width_i = $("#item" + i).css("width");
    // var height_i = $("#item" + i).css("height");

    // var left_j =   $("#item" + j).css("left");
    // var width_j = $("#item" + j).css("width");
    // var height_j = $("#item" + j).css("height");


    // $("#item" + i).css("left", left_j);
    // $("#item" + i).css("width", width_j);
    // $("#item" + i).css("height", height_j);

    // $("#item" + j).css("left", left_i);
    // $("#item" + j).css("width", width_i);
    // $("#item" + j).css("height", height_i);

    // console.log("#item" + i, left_j, width_j, height_j, "#item" + j, left_i, width_i, height_i);


}

function run() {
    var ele = document.getElementsByName('sortType');
    let p_type = ""
    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked) p_type = ele[i].value
    }
    let arr = currentArr
    let rs
    let objRS
    switch (p_type) {
        case "selection":
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
}

function selectionSort(inputArr) {
    console.log("hihihi");
    let n = inputArr.length;


    for (let i = 0; i < n; i++) {
        // tìm phần tử nhỏ nhất trong mảng
        let min = i;
        for (let j = i + 1; j < n; j++) {
            if (inputArr[j] < inputArr[min]) {
                min = j;
            }
        }
        if (min != i) {
            // hoán đổi vị trí
            let tmp = inputArr[i];
            inputArr[i] = inputArr[min];
            inputArr[min] = tmp;

            changeStyle(inputArr[i], inputArr[min])
        }

    }
    return inputArr;
}