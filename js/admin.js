jQuery(document).ready(function ($) {
    $(".clickable-row").click(function () {
        window.location = $(this).data("href");
    });
});

$(".datepicker").datepicker();

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
              shouldSwitch= true;
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
              shouldSwitch= true;
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
        switchcount ++;      
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
					labelString: 'Thời gian'
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