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

