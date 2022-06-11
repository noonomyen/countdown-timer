var elm_navbar_nav_l_start = document.getElementById("navbar-nav-l-start");
var elm_navbar_nav_l_pause = document.getElementById("navbar-nav-l-pause");
var elm_navbar_nav_l_set = document.getElementById("navbar-nav-l-set");

var elm_set_timer_h = document.getElementById("set-timer_h");
var elm_set_timer_m = document.getElementById("set-timer_m");
var elm_set_timer_s = document.getElementById("set-timer_s");

var elm_display_time_h0 = document.getElementById("display-time_h0");
var elm_display_time_h1 = document.getElementById("display-time_h1");
var elm_display_time_m0 = document.getElementById("display-time_m0");
var elm_display_time_m1 = document.getElementById("display-time_m1");
var elm_display_time_s0 = document.getElementById("display-time_s0");
var elm_display_time_s1 = document.getElementById("display-time_s1");
var elm_display_time_ms0 = document.getElementById("display-time_ms0");

var elm_display_time = document.getElementById("display-time");
var elm_set_timer = document.getElementById("set-timer");

function onkeypress_set_timer_hms(EVENT, fhms) {
    EVENT = (EVENT) ? EVENT : window.event;
    let code = (EVENT.which) ? EVENT.which : EVENT.keyCode;
    if ((code > 31 && code < 48) || code > 57) {
        return false;
    };
    if ((elm_set_timer_h.value.length < 2) && (fhms == 1)) {
        return true;
    };
    if ((elm_set_timer_m.value.length < 2) && (fhms == 2)) {
        return true;
    };
    if ((elm_set_timer_s.value.length < 2) && (fhms == 3)) {
        return true;
    };
    return false;
};

function get_HMSms(ts) {
    let h = 0;
    let m = 0;
    let s = 0;
    if (ts > 3600000) {
        h = Math.floor(ts / 3600000);
        ts = ts - (h * 3600000);
    };
    if (ts > 60000) {
        m = Math.floor(ts / 60000);
        ts = ts - (m * 60000);
    };
    if (ts > 1000) {
        s = Math.floor(ts / 1000);
        ts = ts - (s * 1000);
    };
    return [h, m, s, ts];
};

var state = 0;
var time_ = 0;
var tstop_ = 0;
var show_ = true;
var Interval_CountdownDisplay = null;

function display_time() {
    if (show_) {
        let current_ = new Date();
        let tt = time_ - current_.getTime();
        if (tt <= 0) {
            elm_display_time_h0.innerText = "0";
            elm_display_time_h1.innerText = "0";
            elm_display_time_m0.innerText = "0";
            elm_display_time_m1.innerText = "0";
            elm_display_time_s0.innerText = "0";
            elm_display_time_s1.innerText = "0";
            elm_display_time_ms0.innerText = "0";
            elm_display_time.style.color = "#d60000";
            clearInterval(Interval_CountdownDisplay);
        } else {
            let tdate = get_HMSms(tt);
            let thour = ("0" + tdate[0].toString()).slice(-2);
            let tmin = ("0" + tdate[1].toString()).slice(-2);
            let tsec = ("0" + tdate[2].toString()).slice(-2);
            let tms = tdate[3].toString()[0];
            elm_display_time_h0.innerText = thour[0];
            elm_display_time_h1.innerText = thour[1];
            elm_display_time_m0.innerText = tmin[0];
            elm_display_time_m1.innerText = tmin[1];
            elm_display_time_s0.innerText = tsec[0];
            elm_display_time_s1.innerText = tsec[1];
            elm_display_time_ms0.innerText = tms;
        };
    };
};

function start_timer() {
    if (state == 2) {
        time_ = time_ + (new Date().getTime() - tstop_);
        show_ = true;
    };
    state = 1;
    elm_navbar_nav_l_pause.classList.remove("disabled");
    elm_navbar_nav_l_set.classList.remove("disabled");
    elm_navbar_nav_l_start.classList.add("disabled");
};

function pause_timer() {
    state = 2;
    elm_navbar_nav_l_pause.classList.add("disabled");
    elm_navbar_nav_l_set.classList.remove("disabled");
    elm_navbar_nav_l_start.classList.remove("disabled");
    show_ = false;
    tstop_ = new Date().getTime();
};

function set_timer() {
    state = 0;
    elm_navbar_nav_l_pause.classList.add("disabled");
    elm_navbar_nav_l_set.classList.add("disabled");
    elm_navbar_nav_l_start.classList.add("disabled");
    elm_display_time.style.display = "none";
    elm_display_time.style.visibility = "hidden";
    elm_set_timer.style.display = "block";
    elm_set_timer.style.visibility = "visible";
    clearInterval(Interval_CountdownDisplay);
};

function submit_time() {
    show_ = true;
    state = 1;
    if (Interval_CountdownDisplay != null) {
        clearInterval(Interval_CountdownDisplay);
    };
    elm_display_time.style.color = "#000000";
    time_ = new Date().getTime() + (Number(elm_set_timer_h.value) * 3600000) + (Number(elm_set_timer_m.value) * 60000) + (Number(elm_set_timer_s.value) * 1000)
    elm_set_timer.style.visibility = "hidden";
    elm_set_timer.style.display = "none";
    elm_display_time.style.display = "block";
    elm_display_time.style.visibility = "visible";
    elm_navbar_nav_l_pause.classList.remove("disabled");
    elm_navbar_nav_l_set.classList.remove("disabled");
    elm_navbar_nav_l_start.classList.add("disabled");
    Interval_CountdownDisplay = setInterval(display_time, 100);
};
