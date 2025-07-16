// get total price
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discont = document.getElementById("discont");
let count = document.getElementById("count");
let category = document.getElementById("category");
let btn = document.getElementById("submit");
let total = document.getElementById("total");
let mod = "create";
function modC() {
    count.style.display = "block";
    btn.innerHTML = "Create";
    btn.id = "createbtn";
    mod = "create";
}
function modUp() {
    count.style.display = "none";
    btn.innerHTML = "Update";
    btn.id = "updatebtn";
    mod = "update";
}
function onlyNumbers(input) {
    input.value = input.value.replace(/[^0-9]/g, "");
}

let temp;

function getTotal() {
    let priceValue = +((price && price.value) || 0);
    let taxesValue = +((taxes && taxes.value) || 0);
    let adsValue = +((ads && ads.value) || 0);
    let discontValue = +((discont && discont.value) || 0);

    let result = priceValue + taxesValue + adsValue - discontValue;
    if (total) {
        total.innerHTML = result;
    }
}

// انشاء منتج
let datapro;
if (localStorage.product != null) {
    datapro = JSON.parse(localStorage.product || "[]");
} else {
    datapro = [];
}
btn.onclick = function () {
    let newpro = {
        title: title.value.toLowerCase() || "null",
        price: price.value || "0",
        taxes: taxes.value || "0",
        ads: ads.value || "0",
        discont: discont.value || "0",
        count: count.value || "1",
        category: category.value.toLowerCase() || "n",
        total: total.innerHTML || "0",
    };

    if (mod == "create") {
        if (newpro.count >= 1) {
            for (let i = 0; i <= count.value; i++) {
                datapro.push(newpro);
            }
        } else {
            datapro.push(newpro);
        }
    } else if (mod == "update") {
        datapro[temp] = newpro;
        modC();
    }
    localStorage.setItem("product", JSON.stringify(datapro));
    clearData();
    createInTabel();
};
function clearData() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discont.value = "";
    count.value = "";
    category.value = "";
    total.innerHTML = "";
}
// create in tabel
function createInTabel() {
    let tabel = ``;
    for (let i = 0; i < datapro.length; i++) {
        tabel += `
                    <tr>
                        <th>${i + 1}</th>
                        <th>${datapro[i].title}</th>
                        <th>${datapro[i].price}</th>
                        <th>${datapro[i].taxes}</th>
                        <th>${datapro[i].ads}</th>
                        <th>${datapro[i].discont}</th>
                        <th>${datapro[i].total}</th>
                        <th>${datapro[i].category}</th>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteOne(${i})" id="delete">delete</button></td>
                    </tr>
        `;
    }
    document.getElementById("tbody").innerHTML = tabel;

    // انشاء مربع حذف الكل

    if (datapro.length > 0) {
        document.getElementById(
            "deleteall"
        ).innerHTML = `<button onclick="deleteAll()" id="deleteallbtn">Delete all(${datapro.length})</button>`;
    } else {
        document.getElementById("deleteall").innerHTML = "";
    }
}
createInTabel();
// delete one
function deleteOne(i) {
    datapro.splice(i, 1);
    localStorage.setItem("product", JSON.stringify(datapro));
    createInTabel();
    modC();
    clearData();
}
// deleteAll
function deleteAll() {
    datapro.splice(0);
    localStorage.clear();
    createInTabel();
    modC();
    clearData();
}
// update
function updateData(i) {
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discont.value = datapro[i].discont;
    category.value = datapro[i].category;
    getTotal();
    modUp();
    temp = i;
    console.log(temp);
    createInTabel();
}
// search mod
let modSearch = "Search-by-title";
let search = document.getElementById("search");
function getModSearch(this1) {
    modSearch = document.getElementById(this1.id);
    modSearch = modSearch.id || "Search-by-title";
    if (modSearch === "Search-by-title") {
        document.getElementById("Search-by-Chatrgory").style.backgroundColor =
            "#039ee6";
        document.getElementById("Search-by-title").style.backgroundColor =
            "#01579b";
    } else if (modSearch === "Search-by-Chatrgory") {
        document.getElementById("Search-by-Chatrgory").style.backgroundColor =
            "#01579b";
        document.getElementById("Search-by-title").style.backgroundColor =
            "#039ee6";
    }
}

// search fuction
function searchNow(value) {
    let tabel = "";
    if (value.value !== "") {
        if (modSearch === "Search-by-title") {
            for (let i = 0; i < datapro.length; i++) {
                if (
                    datapro[i].title
                        .toLowerCase()
                        .includes(search.value.toLowerCase())
                ) {
                    tabel += `
                    <tr>
                    <th>${i + 1}</th>
                    <th>${datapro[i].title}</th>
                    <th>${datapro[i].price}</th>
                    <th>${datapro[i].taxes}</th>
                    <th>${datapro[i].ads}</th>
                    <th>${datapro[i].discont}</th>
                    <th>${datapro[i].total}</th>
                    <th>${datapro[i].category}</th>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteOne(${i})" id="delete">delete</button></td>
                    </tr>
                    `;
                }
            }
        } else if (modSearch === "Search-by-Chatrgory") {
            for (let i = 0; i < datapro.length; i++) {
                if (
                    datapro[i].category
                        .toLowerCase()
                        .includes(search.value.toLowerCase())
                ) {
                    tabel += `
                    <tr>
                    <th>${i + 1}</th>
                    <th>${datapro[i].title}</th>
                    <th>${datapro[i].price}</th>
                    <th>${datapro[i].taxes}</th>
                    <th>${datapro[i].ads}</th>
                    <th>${datapro[i].discont}</th>
                    <th>${datapro[i].total}</th>
                    <th>${datapro[i].category}</th>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteOne(${i})" id="delete">delete</button></td>
                    </tr>
                    `;
                }
            }
        }
        document.getElementById("tbody").innerHTML = tabel;
    } else {
        createInTabel();
    }
}

// الكود الذي ينفيذه عند تحميل الصفحة
window.onload = function () {
    if (modSearch === "Search-by-title") {
        document.getElementById("Search-by-Chatrgory").style.backgroundColor =
            "#039ee6";
        document.getElementById("Search-by-title").style.backgroundColor =
            "#01579b";
    } else if (modSearch === "Search-by-Chatrgory") {
        document.getElementById("Search-by-Chatrgory").style.backgroundColor =
            "#01579b";
        document.getElementById("Search-by-title").style.backgroundColor =
            "#039ee6";
    }
    createInTabel();
};
