const maxGen = 5
function convertNumber(num) {
    return isNaN(num) ? 0 : num
}

function checkValidate(knapsackValue, countItem, beginN, newN, maxValue) {
    let rs = true
    if (countItem > 20) {
        document.getElementById("msg-error").innerHTML = 'Số lượng đồ vật không được > 20';
        rs = false
    }
    else if (maxValue < countItem) {
        document.getElementById("msg-error").innerHTML = 'Giá trị cao nhất phải > Số lượng đồ vật';
        rs = false
    }
    else if (knapsackValue < 1) {
        document.getElementById("msg-error").innerHTML = 'Sức chứa của túi phải > 0';
        rs = false
    }
    else if (beginN < 1) {
        document.getElementById("msg-error").innerHTML = 'Cá thể ban đầu phải > 0';
        rs = false
    }
    else if (beginN > Math.pow(2, countItem)) {
        document.getElementById("msg-error").innerHTML = 'Cá thể ban đầu không hợp lệ';
        rs = false
    }
    else if (newN < 1) {
        document.getElementById("msg-error").innerHTML = 'Số lượng thế hệ phải > 0 ';
        rs = false
    }
    else if (newN > maxGen) {
        document.getElementById("msg-error").innerHTML = 'Số lượng thế hệ phải < ' + maxGen;
        rs = false
    }
    return rs
}
function clearHTML() {
    let id = ''
    let myDiv
    for (let i = 0; i < maxGen; i++) {
        id = 'newparents' + i
        myDiv = document.getElementById(id);
        if (myDiv) {
            myDiv.innerHTML = ''
        }
    }

    Div = document.getElementById("parents");
    if (myDiv) {
        myDiv.innerHTML = ''
    }
}


function onSubmitBT2() {
    var knapsackValue = parseInt(document.getElementById('knapsackValue').value);
    knapsackValue = isNaN(knapsackValue) ? 0 : knapsackValue
    var countItem = parseInt(document.getElementById('countItem').value);
    countItem = isNaN(countItem) ? 0 : countItem
    var beginN = parseInt(document.getElementById('beginN').value);
    beginN = isNaN(beginN) ? 0 : beginN
    var newN = parseInt(document.getElementById('newN').value);
    newN = isNaN(newN) ? 0 : newN
    var maxValue = parseInt(document.getElementById('maxValue').value);
    maxValue = isNaN(maxValue) ? 0 : maxValue

    let rsCheck = checkValidate(knapsackValue, countItem, beginN, newN, maxValue)
    // console.log("hihi", rsCheck)

    if (rsCheck) {
        document.getElementById("msg-error").innerHTML = ''
        let strHTML = ''
        let value = 0
        let arrWeight = []

        while (arrWeight.length !== countItem) {
            value = Math.floor(Math.random() * (maxValue - 1 + 1)) + 1
            if (!arrWeight.includes(value)) {
                strHTML += "  <div class='item'><p>" + value + "</p></div> "
                arrWeight.push(value)
            }
        }
        document.getElementById("list-item").innerHTML = strHTML;
        document.getElementById("process").innerHTML = '';
        onSubmitKnapsack(beginN, knapsackValue, arrWeight, newN)
    }
}