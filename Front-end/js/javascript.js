//TODO: remove the guide demo text (.todo)
$('.todo').addClass("bg-info").css({ "font-size": "150%" })
    .each(function (index) {
        $(this).text('//' + $(this).text());
    });

$('#signup-page-btn').click(function (e) {
    $('#login-form').fadeOut('fast', function () {
        $('#signup-form').fadeIn('fast');
    });
});

$('#login-page-btn').click(function (e) {
    $('#signup-form').fadeOut('fast', function () {
        $('#login-form').fadeIn('fast');
    });
});

$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip({
        show: {
            //effect: "slideDown",
            delay: 500
        },
        track: true
    });
});

// script for #filterProduct-slider of price
$(function () {
    $("#slider-range-price-category").slider({
        range: true,
        min: 0,
        max: 1000000,
        values: [0, 1000000],
        slide: function (event, ui) {
            $("#amount").val(ui.values[0] + " - " + ui.values[1]);
        }
    });
    $("#amount").val($("#slider-range-price-category").slider("values", 0) +
        " - " + $("#slider-range-price-category").slider("values", 1));
});