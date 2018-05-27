//Khi người dùng cuộn chuột thì gọi hàm scrollFunction
window.onscroll = function () { scrollFunction() };

// khai báo hàm scrollFunction
function scrollFunction() {
    // Kiểm tra vị trí hiện tại của con trỏ so với nội dung trang
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 40) {
        //nếu lớn hơn 20px thì hiện button scrollToTop
        document.getElementById("scrollToTopBtn").style.display = "block";
    } else {
        //nếu nhỏ hơn 20px thì ẩn button scrollToTop
        document.getElementById("scrollToTopBtn").style.display = "none";
    }

    // Kiểm tra vị trí hiện tại của con trỏ so với nội dung trang
    if ($(window).scrollTop() + $(window).height() > $(document).height() - 40) {
        //nếu nhỏ hơn 20px thì ẩn button scrollToBottom
        document.getElementById("scrollToBottomBtn").style.display = "none";
    } else {
        //ngược lại hiện button scrollToBottom
        document.getElementById("scrollToBottomBtn").style.display = "block";
    }
}

//gán sự kiện click cho button scrollToTop
document.getElementById('scrollToTopBtn').addEventListener("click", function () {
    //Nếu button được click thì nhảy về đầu trang
    var i = document.body.scrollHeight - 50;
    var int = setInterval(function () {
        if (i <= 0) clearInterval(int);
        window.scrollTo(0, i);
        i -= 20;
    },  0);
});

//gán sự kiện click cho button scrollToBottom
document.getElementById('scrollToBottomBtn').addEventListener("click", function () {
    //Nếu button được click thì nhảy về cuối trang
    var i = 50;
    var int = setInterval(function () {
        if (i >= document.body.scrollHeight) clearInterval(int);
        window.scrollTo(0, i);
        i += 20;
    },  0);
});