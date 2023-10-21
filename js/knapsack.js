function genFE(arrWeight, arr, idName, index, text) {
    let id = idName + index
    let strHTML = ''
    let value
    strHTML += "  <h4>" + text + "</h4>"
    strHTML += "  <div id='" + id + "'   class='" + idName + "'>"
    for (let i = 0; i < arr.length; i++) {
        strHTML += "  <div class='item-bag'>"
        strHTML += "<h5>" + arr[i][1] + "</h5>"
        for (let j = 0; j < arr[i][0].length; j++) {
            value = arr[i][0][j]
            if (value == 1) strHTML += "  <div class='item'><p>" + arrWeight[j] + "</p></div> "
            else strHTML += "  <div class='item-non'><p>" + arrWeight[j] + "</p></div> "
        }
        strHTML += "</div>"
    }
    strHTML += "</div>"
    document.getElementById("process").innerHTML += strHTML;

}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// hàm mục tiêu
function fitness(item, knapsackValue, arrWeight) {
    let sum_w = 0;

    for (let index in item) {
        let i = item[index];
        if (i == 0) {
            continue;
        } else {
            sum_w += arrWeight[index];
        }
    }
    if (sum_w > knapsackValue) {
        return -1;
    } else {
        return sum_w;
    }
}
//Toán tử đột biến
function mutation(ch) {
    //đột biến ngẫu nhiên nhiều vị trí
    // for (let i = 0; i < ch.length; i++) {
    //     const k = Math.random();
    //     if (k > 0.5) {
    //         if (ch[i] === 1) {
    //             ch[i] = 0;
    //         } else {
    //             ch[i] = 1;
    //         }
    //     }
    // }

    //đột biến ngẫu nhiên 1 vị trí
    let position = getRandomNumber(0, ch.length - 1);
    let value = getRandomNumber(0, 1);
    ch[position] = value;

    return ch;
}
//lai ghép hai bố mẹ để sinh ra hai con bằng cách trộn chúng theo tỷ lệ ngẫu nhiên mỗi lần
function crossover(ch1, ch2) {
    const threshold = Math.floor(Math.random() * (ch1.length - 1)) + 1;
    // const threshold = Math.floor(ch1.length / 2)
    const tmp1 = ch1.slice(threshold);
    const tmp2 = ch2.slice(threshold);
    ch1 = ch1.slice(0, threshold);
    ch2 = ch2.slice(0, threshold);
    ch1.push(...tmp2);
    ch2.push(...tmp1);
    return [ch1, ch2];
}

function onSubmitKnapsack(N, knapsackValue, arrWeight, n_gen) {
    var ele = document.getElementsByName('sortType');
    let p_type = ""
    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked) p_type = ele[i].value
    }


    let parents = [];//quần thể ban đầu
    let newparents = []; //quần thể con được sinh ra
    let bests = [];//cá thể có tổng kl nặng nhất
    let score = 0;


    if (p_type == 'type_random') {
        //tạo quần thể ban đầu với số lượng N
        for (let i = 0; i < N; i++) {
            let parent = [];
            for (let k = 0; k < arrWeight.length; k++) {
                let pos = Math.floor(Math.random() * (1 - 0 + 1)) + 0
                parent.push(pos);
            }
            //tính điểm thích nghi
            score = this.fitness(parent, knapsackValue, arrWeight);
            // đẩy vào quần thể
            parents.push([parent, score]);
        }
    } else {
        while (parents.length < N) {

            let parent = [];
            for (let k = 0; k < arrWeight.length; k++) {
                let pos = Math.floor(Math.random() * (1 - 0 + 1)) + 0
                parent.push(pos);
            }
            //tính điểm thích nghi
            score = this.fitness(parent, knapsackValue, arrWeight);
            if (score !== -1) parents.push([parent, score]);

        }
    }

    //sắp xếp theo thứ tự giảm dần của điểm thích nghi
    parents.sort((a, b) => b[1] - a[1]);
    genFE(arrWeight, parents, "parents", 0, "Quần thể ban đầu")

    //chọn cá thể tốt nhất để lai ghép
    let best_parents = parents.filter((item) => item[1] > -1);
    bests = best_parents[0]
    let pop = best_parents.length - 1
    let score1 = 0
    let score2 = 0
    let gen = 1
    let num = 0
    // console.log("bests", bests);
    while (gen <= n_gen && pop > 0) {
        for (let i = 0; i < pop; i++) {
            if (i < pop - 1) {
                let r1 = best_parents[i][0];
                let r2 = best_parents[i + 1][0];
                let [nchild1, nchild2] = this.crossover(r1, r2);
                nchild1 = this.mutation(nchild1);
                score1 = this.fitness(nchild1, knapsackValue, arrWeight)

                nchild2 = this.mutation(nchild2);
                score2 = this.fitness(nchild2, knapsackValue, arrWeight)

                newparents.push([nchild1, score1]);
                newparents.push([nchild2, score2]);

                //cập nhật điểm cao hơn
                if (score1 > bests[1]) {
                    bests = [nchild1, score1];
                    num = gen
                }
                else if (score2 > bests[1]) {
                    bests = [nchild2, score2];
                    num = gen
                }

            } else {
                let r1 = best_parents[i][0];
                let r2 = best_parents[0][0];
                let [nchild1, nchild2] = this.crossover(r1, r2);
                nchild1 = this.mutation(nchild1);
                score1 = this.fitness(nchild1, knapsackValue, arrWeight)

                nchild2 = this.mutation(nchild2);
                score2 = this.fitness(nchild2, knapsackValue, arrWeight)

                newparents.push([nchild1, score1]);
                newparents.push([nchild2, score2]);

                //cập nhật điểm cao hơn
                if (score1 > bests[1]) {
                    bests = [nchild1, score1];
                    num = gen
                }
                else if (score2 > bests[1]) {
                    bests = [nchild2, score2];
                    num = gen
                }
            }
        }
        //sắp xếp theo thứ tự giảm dần của điểm thích nghi
        newparents.sort((a, b) => b[1] - a[1]);
        genFE(arrWeight, newparents, "newparents", gen - 1, "Quần thể thế hệ thứ " + gen + " - số lượng:" + newparents.length)
        console.log("gen:", gen, " ,best_parents: ", best_parents.length, " ,newparents: ", newparents.length);

        best_parents = newparents.filter((item) => item[1] > -1);
        pop = best_parents.length - 1
        gen++
    }

    if (bests) {
        let strHTML = "<h2> Danh sách các vật có thể bỏ vào túi là:</h2> <div class='list-item'>"
        for (let index in bests[0]) {
            // console.log(bests);
            if (bests[0][index] == 1) {

                strHTML += "   <div class='item'><p>" + arrWeight[index] + "</p></div>"
            }
        }
        strHTML += "</div><h2> Tổng khối lượng tối đa: " + bests[1] + "</h2>"
        strHTML += "<p> gen: " + num + "</p>"

        document.getElementById("result").innerHTML = strHTML;
    } else {
        document.getElementById("result").innerHTML = "<h2>Không tìm thấy danh sách các vật thỏa điều kiện trên</h2>";
    }
}


