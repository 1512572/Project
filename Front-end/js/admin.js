$(".datepicker").datepicker({
  dateFormat: "dd-mm-yy"
});

// save old value to attribute-data
$('input.datepicker').on('focusin', function () {
  $(this).data('val', $(this).val());
});

function validatedate(inputText) {
  var dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
  // Match the date format through regular expression
  if (inputText.match(dateformat)) {
    // document.form1.text1.focus();
    //Test which seperator is used '/' or '-'
    var opera1 = inputText.split('/');
    var opera2 = inputText.split('-');
    lopera1 = opera1.length;
    lopera2 = opera2.length;
    // Extract the string into month, date and year
    if (lopera1 > 1) {
      var pdate = inputText.split('/');
    }
    else if (lopera2 > 1) {
      var pdate = inputText.split('-');
    }
    var dd = parseInt(pdate[0]);
    var mm = parseInt(pdate[1]);
    var yy = parseInt(pdate[2]);
    // Create list of days of a month [assume there is no leap year by default]
    var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (mm == 1 || mm > 2) {
      if (dd > ListofDays[mm - 1]) {
        alert('Ngày không tồn tại!');
        return false;
      }
    }
    if (mm == 2) {
      var lyear = false;
      if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
        lyear = true;
      }
      if ((lyear == false) && (dd >= 29)) {
        alert('Ngày không tồn tại!');
        return false;
      }
      if ((lyear == true) && (dd > 29)) {
        alert('Ngày không tồn tại!');
        return false;
      }
    }
  }
  else {
    alert("Hãy nhập ngày với định dạng dd-mm-yy!");
    // document.form1.text1.focus();
    return false;
  }
}

function validateDateFromTo(startDate, endDate) {
  if ((new Date(startDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")).getTime() > new Date(endDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")).getTime())) {
    alert("Ngày bắt đầu không được lớn hơn ngày kết thúc!");
    return false;
  }
  return true;
}

$('input.datepicker').on('change', function () {
  if (validatedate($(this).val()) === false) {
    $(this).val($(this).data('val'));
    return false;
  }
  if (($('input#from').val() === "") || ($('input#to').val() === "")) {
    return true;
  }
  if (validateDateFromTo($('input#from').val(), $('input#to').val()) === false) {
    $(this).val($(this).data('val'));
    return false;
  }
  else {
    document.formDate.submit.title = "";
    document.formDate.submit.disabled = false;
    return true;
  }
});

jQuery(document).ready(function ($) {
  $(".clickable-row").click(function () {
    window.location = $(this).data("href");
  });
});

function sortTable(n, numerically) {
  numerically = numerically || false;
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("myTable");
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc";
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.getElementsByTagName("TR");
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (numerically == false) {
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      } else {
        if (dir == "asc") {
          if (Number(x.innerHTML) > Number(y.innerHTML)) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (Number(x.innerHTML) < Number(y.innerHTML)) {
            //if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount++;
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

// chart
var config = {
  type: 'line',
  data: {
    labels: ['11/2017', '12/2017', '01/2018', '02/2018', '03/2018', '04/2018', '05/2018'],
    datasets: [{
      label: 'Đơn hàng đã hủy',
      backgroundColor: window.chartColors.red,
      borderColor: window.chartColors.red,
      data: [
        Math.floor((Math.random() * 1000000) + 100000),
        Math.floor((Math.random() * 1000000) + 100000),
        Math.floor((Math.random() * 1000000) + 100000),
        Math.floor((Math.random() * 1000000) + 100000),
        Math.floor((Math.random() * 1000000) + 100000),
        Math.floor((Math.random() * 1000000) + 100000),
        Math.floor((Math.random() * 1000000) + 100000)
      ],
      fill: false,
    }, {
      label: 'Đơn hàng giao thành công',
      fill: false,
      backgroundColor: window.chartColors.blue,
      borderColor: window.chartColors.blue,
      data: [
        Math.floor((Math.random() * 1000000) + 100000),
        Math.floor((Math.random() * 1000000) + 100000),
        Math.floor((Math.random() * 1000000) + 100000),
        Math.floor((Math.random() * 1000000) + 100000),
        Math.floor((Math.random() * 1000000) + 100000),
        Math.floor((Math.random() * 1000000) + 100000),
        Math.floor((Math.random() * 1000000) + 100000)
      ],
    }]
  },
  options: {
    responsive: true,
    title: {
      display: true,
      text: 'Tổng giá trị đơn hàng theo thời gian'
    },
    tooltips: {
      mode: 'index',
      intersect: false,
    },
    hover: {
      mode: 'nearest',
      intersect: true
    },
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: ''
        }
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'VND'
        }
      }]
    }
  }
};

window.onload = function () {
  var ctx = document.getElementById('canvas').getContext('2d');
  window.myLine = new Chart(ctx, config);
};