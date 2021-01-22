"use strict";
const firebaseConfig = {
    apiKey: "AIzaSyCY378sEtE9yO367t2_X60Fo0hKBFw81RU",
    authDomain: "contactapp-app.firebaseapp.com",
    projectId: "contactapp-app",
    storageBucket: "contactapp-app.appspot.com",
    messagingSenderId: "636670061438",
    appId: "1:636670061438:web:ac582cfaa05676f499212f",
    measurementId: "G-9SVPP9JYCD",
};
firebase.initializeApp(firebaseConfig);
let db = firebase.database().ref().child("contact");

//Clone
let counter = 0;
$(document).ready(function () {
    $(".addContact").on("click", function () {
        counter++;
        let template = $(".template").clone(true);
        template.addClass("contactItem").attr("id", counter);
        template.removeClass("template");
        $(".contactDetails").append(template);
    });
});

//CloseElement Function
$(document).ready(function () {
    $(".close").on("click", function () {
        $(this).closest(".contactItem").remove();
    });
});

// AddButton fuction
$(document).ready(function () {
    $(".addContact").on("click", function () {
        $(".result").show();
    });
});

//BackButton function
$(document).ready(function () {
    $(".backBtn").on("click", function () {
        $(".diplayField").hide();
        $(".backBtn").toggle();
        $(".header").show();
        $(".addContact").show();
        $(".contactForm").show();
        $(".save").hide();
    });
});

// Form submmitting
let data = [];
const handleFormSubmit = (event) => {
    event.preventDefault();

    $(".diplayField").show();
    $(".return").show();
    $(".header").hide();
    $(".addContact").hide();
    $(".contactForm").hide();
    $(".save").show();

    $(".contactItem")
        .map(function () {
            let eachId = $(this).attr("id");

            let obj = {};

            let idContainer = document.getElementById(eachId);
            idContainer
                .querySelectorAll("input")
                .forEach((ele) => (obj[ele.name] = ele.value || ""));

            data.push(obj);
        })
        .get();

    document.querySelector("form").reset();

    // To display result
    let pre = document.querySelector(".display code");
    pre.textContent = "\n" + JSON.stringify(data, "\t", 2);

    let number = document.querySelector(".display span");
    number.textContent = data.length;
};

const form = document.getElementsByClassName("contactForm")[0];
document.addEventListener("submit", handleFormSubmit);

// Saving to database
$(document).ready(function () {
    $(".saveBtn").on("click", function (ev) {
        ev.preventDefault();
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            const autoId = db.push().key;
            db.child(autoId).set({
                name: data[i].name,
                email: data[i].email,
                phone: data[i].phone,
                location: data[i].location,
            });
        }
    });
});
let id = 0;
db.on("value", function (snapshot) {
    if (snapshot.exists()) {
        let content = "";
        snapshot.forEach(function (data) {
            id++;
            let val = data.val();
            content += "<tr>";
            content += "<td>" + id + "</td>";
            content += "<td>" + val.name + "</td>";
            content += "<td>" + val.email + "</td>";
            content += "<td>" + val.phone + "</td>";
            content += "<td>" + val.location + "</td>";
            content += "</tr>";
        });
        $("table").append(content);
    } else {
        let content = "";
        content += "<tr>";
        content += "<td>" + "</td>";
        content += "<td>" + "</td>";
        content += "<td>" + "No record available" + "</td>";
        content += "<td>" + "</td>";
        content += "<td>" + "</td>";
        content += "</tr>";
        $("table").append(content);
        $("td").css({ "background-color": " #ddd" });
    }
});

$(document).ready(function () {
    $(".clearSearch").on("click", function () {
        $(".clearSearch").toggle();
    });
});

const clearSearch = document.querySelector(".clearSearch");
const model = document.querySelector(".model");
const overlay = document.querySelector(".overlay");
const btnCloseModel = document.querySelector(".close-model");

const openModel = function () {
    model.classList.remove("hidden");
    overlay.classList.remove("hidden");
    // clearSearch.classList.remove('hidden');
};

const closeModel = function () {
    model.classList.add("hidden");
    overlay.classList.add("hidden");
};

document.getElementById("searchBtn").addEventListener("click", openModel);

btnCloseModel.addEventListener("click", closeModel);
overlay.addEventListener("click", closeModel);

$(document).ready(function () {
    $(".model").draggable();
});

let searchInput = document.getElementById("search");

searchInput.addEventListener("keyup", function () {
    let searchValue = document.getElementById("search").value.toLowerCase();
    let table = document.getElementById("table");
    let tr = table.querySelectorAll("tr");

    let checkBoxName = document.getElementById("checkBoxName");
    let nameBoxChecked = checkBoxName.checked == true;
    let checkBoxNumber = document.getElementById("checkBoxNumber");
    let numberBoxChecked = checkBoxNumber.checked == true;

    for (let i = 1; i < tr.length; i++) {
        let tdName = tr[i].getElementsByTagName("td")[1];
        let tdNumber = tr[i].getElementsByTagName("td")[3];
        let nameValue = tdName.textContent || tdName.innerHTML;
        let numberValue = tdNumber.textContent || tdNumber.innerHTML;

        if (
            (nameBoxChecked && numberBoxChecked) ||
            (!nameBoxChecked && !numberBoxChecked)
        ) {
            if (tdNumber) {
                if (
                    numberValue.includes(searchValue) ||
                    nameValue.toLowerCase().includes(searchValue)
                ) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                    // notFound();
                }
            }
        } else if (nameBoxChecked) {
            if (tdName) {
                if (nameValue.toLowerCase().includes(searchValue)) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                    // notFound();
                }
            }
        } else if (numberBoxChecked) {
            if (tdNumber) {
                if (numberValue.includes(searchValue)) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                    // notFound();
                }
            }
        }
    }
});

function notFound() {
    let content = "";
    content += "<tr>";
    content += "<td>" + "</td>";
    content += "<td>" + "</td>";
    content += "<td>" + "No record available" + "</td>";
    content += "<td>" + "</td>";
    content += "<td>" + "</td>";
    content += "</tr>";
    $("table").append(content);
    $("td").css({ "background-color": " #ddd" });
}

