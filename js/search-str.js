const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const punctuation = "!@#$%^&*()_+-=[]{};:'\"\\|,.<>/?`~";
const whitespace = " \t\n\r";
const allChars = upperCase + lowerCase + punctuation + whitespace;

// const target = "Hello, world!";

function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

//hàm mục tiêu
function fitness1(source, target) {
    let score = 0;
    //so sánh từng kí tự & đếm nếu trùng
    for (let i = 0; i < source.length; i++) {
        if (source[i] === target[i]) {
            score += 1;
        }
    }
    return score;
}

//toán tử đột biến
function mutate(source) {
    //Chọn một vị trí ngẫu nhiên
    let maximum = source.length - 1
    let minimum = 0
    const pos = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum


    //Chọn một ký tự ngẫu nhiên
    var char = allChars[Math.floor(Math.random() * allChars.length)];

    //Thay thế ký tự tại vị trí bằng ký tự mới

    return source.slice(0, pos) + char + source.slice(pos + 1);
}

function onSubmitSearch(target, n_pop, n_gen) {
    // const n_pop = 20;
    const pop = [];

    //khởi tạo quần thể
    for (let i = 0; i < n_pop; i++) {

        const random_string = randomString(target.length, allChars);
        //tính điểm thích nghi
        const score = fitness1(random_string, target);
        // đẩy vào quần thể
        pop.push([random_string, score]);
    }
    //sắp xếp theo thứ tự giảm dần của điểm thích nghi
    pop.sort((a, b) => b[1] - a[1]);
    console.log("Quần thể ban đầu:", pop);

    // const n_gen = 1000; //số lượng đột biến
    let best_score = 0; // điểm thích nghi cao nhất
    let best_string = ""; //chuỗi có điểm cao nhất
    //đột biến quần thể
    let mutants = [];
    let num =0
    for (let gen = 0; gen < n_gen; gen++) {
        //dừng lại nếu tìm thấy chuỗi
        if (best_score === target.length) {
            num =gen
            break;
        }
        for (let i = 0; i < n_pop; i++) {
            //đột biến từng chuỗi
            let mutant_string = mutate(pop[i][0]);
            //tính điểm thích nghi
            let mutant_score = fitness1(mutant_string, target);
            //đẩy vào ds đột biến
            mutants.push([mutant_string, mutant_score]);
            //cập nhật điểm và chuỗi cao hơn
            if (mutant_score > best_score) {
                best_score = mutant_score;
                best_string = mutant_string;
            }
        }
        //sắp xếp theo thứ tự giảm dần của điểm thích nghi
        mutants.sort((a, b) => b[1] - a[1]);
        //Chọn nửa trên của các thể đột biến để thay thế nửa dưới của quần thể
        pop.splice(0, n_pop / 2, ...mutants.slice(0, n_pop / 2));
        // //Print the progress
        console.log(`Generation ${gen}, Best score ${best_score}, Best string ${best_string}`);
    }

    document.getElementById("result1").innerHTML = "<h2>Chuỗi được tìm thấy là: "+best_string+" , gen thứ: "+num+" </h2>";

}

