var hashTag = document.location.hash;

$(document).ready(function () {
    if (hashTag) {
        $("#link-chan-dung").removeClass('active');
        $("#tab-chan-dung").removeClass('active').addClass('fade');
        $(hashTag).removeClass('fade');
        $(hashTag).addClass('active');
        var link = '#link' + hashTag.substring(4);
        $('#link-chan-dung').removeClass('active');
        $(link).addClass('active');
    }
});