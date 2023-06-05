const bill_input = document.getElementById("bill");
const people_input = document.getElementById("people");
const custom_percent = document.getElementById("custom");
const tip_amount = document.getElementById("tip_amount");
const total_amount = document.getElementById("total_amount");
const reset_btn = document.getElementById("reset");
const percent_btns = document.getElementsByClassName("percent__btn");
const zero_span = document.getElementById("zero_span");

var bill;
var people;
var tip_percent;
var tip_amount_local;
var total_amount_local;
var active_btn;

function get_bill_value(e) {
    let bill_local = bill_input.value
    let check = parseFloat(bill_local);
    if (isNaN(parseInt(bill_local[bill_local.length - 1])) && bill_local[bill_local.length - 1] !== '.') {
        e.target.value = e.target.value.substring(0, e.target.value.length - 1)
        return;
    }
    if (isNaN(check)) {
        e.target.value = e.target.value.substring(0, e.target.value.length - 1)
        return;
    }
    //bill_input.value = check;
    bill = check;
    if (!people) {
        people_input.className = people_input.className + " zero-warning";
        zero_span.style.display = "initial";
        return;
    }
    if (bill || people || tip_percent) {
        set_reset_button_active()
    }
    if (people && tip_percent) {
        set_tip_amount();
        set_total_amount();
    }
}

function get_people_value(e) {
    let check = parseInt(people_input.value)
    if (isNaN(check)) {
        e.target.value = e.target.value.substring(0, e.target.value.length - 1)
        return;
    }
    if (check.toString().length > 2) {
        e.target.value = e.target.value.substring(0, e.target.value.length - 1)
        return;
    }
    people_input.value = check;
    people = check;
    if (people) {
        people_input.className = "form__input people-icon";
        zero_span.style.display = "none";
    }
    if (bill || people || tip_percent) {
        set_reset_button_active()
    }
    if (bill && tip_percent) {
        set_tip_amount();
        set_total_amount();
    }
}

function get_custom_percent(e) {
    let check = parseInt(custom_percent.value)
    if (isNaN(check)) {
        e.target.value = e.target.value.substring(0, e.target.value.length - 1)
        return;
    }
    if (check.toString().length > 3) {
        e.target.value = e.target.value.substring(0, e.target.value.length - 1)
        return;
    }
    custom_percent.value = check;
    tip_percent = check;
    active_btn.className = "percent__btn";
    active_btn = "";
    if (bill || people || tip_percent) {
        set_reset_button_active()
    }
    if (bill && tip_percent) {
        set_tip_amount();
        set_total_amount();
    }
}

function percent_btn_press(e) {
    if (active_btn) {
        active_btn.className = "percent__btn";
    }
    active_btn = e.target;
    active_btn.className = active_btn.className + " active-btn";
    let text = e.target.textContent;
    tip_percent = parseInt(text);
    e.target.className = e.target.className + " active-btn";
    if (bill || people || tip_percent) {
        set_reset_button_active()
    }
    if (bill && people) {
        set_tip_amount();
        set_total_amount();
    }
}

function set_tip_amount() {
    tip_amount_local = Math.round((((tip_percent / 100) * bill) / people) * 100) / 100;
    tip_amount.textContent = tip_amount_local;
    tip_amount.textContent = tip_amount.textContent.slice(0, 5);
}

function set_total_amount() {
    total_amount_local = Math.round((bill / people) * 100) / 100;
    total_amount.textContent = (total_amount_local + tip_amount_local);
    total_amount.textContent = (total_amount.textContent).slice(0, 5);
}

function set_reset_button_active() {
    reset_btn.className = reset_btn.className + " active-btn";
}

function reset_values() {
    bill_input.value = "";
    bill = 0;
    people_input.value = "";
    people = 0;
    custom_percent.value = "";
    tip_percent = 0;
    total_amount.textContent = "0.00"
    tip_amount.textContent = "0.00"
    tip_amount_local = 0;
    total_amount_local = 0;
    people_input.className = "form__input people-icon";
    zero_span.style.display = "none";
    reset_btn.className = "reset";
    if (active_btn) {
        active_btn.className = "percent__btn";
    }
    active_btn = "";
}

bill_input.addEventListener("input", get_bill_value);
people_input.addEventListener("input", get_people_value);
reset_btn.addEventListener("click", reset_values);
custom_percent.addEventListener("input", get_custom_percent);

for (key in percent_btns) {
    if (typeof (percent_btns[key]) == 'object') {
        percent_btns[key].addEventListener("click", percent_btn_press);
    }
}