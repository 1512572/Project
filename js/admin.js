$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();   
});

jQuery(document).ready(function($) {
    $(".clickable-row").click(function() {
        window.location = $(this).data("href");
    });
});