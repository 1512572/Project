$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip({
        show: {
            //effect: "slideDown",
            delay: 500
        },
        track: true
    });
});

jQuery(document).ready(function ($) {
    $(".clickable-row").click(function () {
        window.location = $(this).data("href");
    });
});