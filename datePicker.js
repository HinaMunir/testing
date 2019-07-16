divId = "calenderBox";
daysOfWeek = ['Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th'];
months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
flag = false;
function calender() {
    if (flag == false) {
        createHeader();
    }
    current_date = new Date();
    //setting current month, year and date
    currentMonth = current_date.getMonth();
    currentYear = current_date.getFullYear();
    currentDay = current_date.getDate();
    showCurrent();
}
function createHeader() {
    div_ = document.createElement("div");
    var innerDiv = '<span class="headerBox">  </span>';
    innerDiv += '<button id="btnPrev" onclick="prevMonth()"><</button>';
    innerDiv += '<button id="btnNext" onclick="nextMonth()">></button>';
    div_.id = "headerBox_";
    div_.innerHTML = innerDiv;
    _div = document.createElement("div");
    _div.id = "calenderBox";
    mainBox = document.querySelector(".mainBox");
    mainBox.appendChild(div_);
    mainBox.appendChild(_div);
    flag = true;
}
//next month
function nextMonth() {
    if (this.currentMonth == 11) {
        this.currentMonth = 0;
        this.currentYear = this.currentYear + 1;
    }
    else {
        this.currentMonth = this.currentMonth + 1;
    }
    this.showCurrent();
}
//previous month
function prevMonth() {
    if (this.currentMonth == 0) {
        this.currentMonth = 11;
        this.currentYear = this.currentYear - 1;
    }
    else {
        this.currentMonth = this.currentMonth - 1;
    }
    this.showCurrent();
    return true;
}
//showing current month
function showCurrent() {
    showMonth(this.currentYear, this.currentMonth);
}
//show month
function showMonth(year, month) {
    var d = new Date();
    firstDayOfMonth = new Date(year, month, 3).getDay();
    lastDateOfMonth = new Date(year, month + 1, 0).getDate();
    if (month == 0) {
        lastDayOfLastMonth = new Date(year - 1, 11, 0).getDate();
    }
    else {
        lastDayOfLastMonth = new Date(year, month, 0).getDate();
    }
    //string

    //table heading month and year 

    var head_ = months[month] + ' ' + year;
    var headerBox = document.querySelector(".headerBox");
    headerBox.innerHTML = head_;

    var html = '<table>';
    html += '<tr class="days">';
    for (i = 0; i < 7; i++) {
        html += '<td>' + this.daysOfWeek[i] + '</td>';
    }
    html += '</tr>';
    j = 1;
    do {
        d = new Date(year, month, j);
        dayOfWeek = d.getDay();

        monthcurr = d.getMonth() + 1;
        yearcurr = d.getFullYear();
        if (dayOfWeek == 5) {
            html += '<tr>';
        }
        else if (j == 1) //if first day of month is not sunday writing previous months dates
        {
            val = 1;
            if (month == 0) {
                val += 1;
            }
            prevMonthDates = lastDayOfLastMonth - firstDayOfMonth + val;
            for (iterator = 0; iterator < firstDayOfMonth; iterator++) {
                html += '<td class="prevMonthDate">' + prevMonthDates + '</td>';
                prevMonthDates++;
            }
        }
        checkDate = new Date();
        checkYear = checkDate.getFullYear();
        checkMonth = checkDate.getMonth();
        if (checkYear == this.currentYear && checkMonth == this.currentMonth && i == this.currentDay) {
            html += '<td class="today" onclick="setDate(this,yearcurr,monthcurr)" >' + j + '</td>'; 
        }
        else {

            html += '<td class="remaining" onclick="setDate(this,yearcurr,monthcurr)">' + j + '</td>';
        }

        if (dayOfWeek == 4)//if saturday of current month
        {
            html += '</tr>';
        }
        else if (j == lastDateOfMonth)//writing next months days
        {
            day = 1;
            if (dayOfWeek == 6) {
                dayOfWeek = -1;
            }
            else if (dayOfWeek == 5) {
                dayOfWeek = -2;
            }
            for (dayOfWeek; dayOfWeek < 4; dayOfWeek++) {
                html += '<td class="nextMonthDates">' + day + '</td>';
                day++;
            }
        }

        j++;
    } while (j <= lastDateOfMonth);
    html += '</table>';
    document.getElementById("calenderBox").innerHTML = html;
}
function setDate(date_, year_, month_) {
    elementInput = document.getElementById("txtDate");
    elementInput.value = "";
    if (date_.innerText < 10 && month_ < 10) {
        elementInput.value = '0' + date_.innerText + '/0' + month_ + '/' + year_;
    }
    else if (month_ < 10) {
        elementInput.value = date_.innerText + '/0' + month_ + '/' + year_;
    }
    else if (date_.innerText < 10) {
        elementInput.value = '0' + date_.innerText + '/' + month_ + '/' + year_;
    }
    else {
        elementInput.value = date_.innerText + '/' + month_ + '/' + year_;
    }
}
