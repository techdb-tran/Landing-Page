$(document).ready(function() {
    let currentIndex = 0;
    const slides = $(".carousel-item");
    const totalSlides = slides.length;
    let visibleSlides;
    let totalDots;

    function updateVisibleSlides() {
        if ($(window).width() <= 460) {
            visibleSlides = 1;
            totalDots = 8;
        } else {
            visibleSlides = 2;
            totalDots = 4;
        }
    }

    function createDots() {
        $(".dots").empty(); // Xóa các dấu chấm hiện tại trước khi tạo mới
        for (let i = 0; i < totalDots; i++) {
            $(".dots").append("<span class='dot'></span>");
        }
        $(".dot").eq(0).addClass("active");
    }

    function goToSlide(index) {
        const slideWidth = $(".carousel-item").width() / visibleSlides;
        const offset = -(slideWidth * index);
        $(".carousel-container").css("transform", "translateX(" + offset + "px)");
        currentIndex = index;
        updateDots();
    }

    function updateDots() {
        $(".dot").removeClass("active");
        const dotIndex = Math.floor(currentIndex / visibleSlides);
        $(".dot").eq(dotIndex).addClass("active");
    }

    $(".dot").click(function() {
        const dotIndex = $(this).index();
        goToSlide(dotIndex * visibleSlides);
    });

    $(".prev").click(function() {
        if (currentIndex > 0) {
            goToSlide(currentIndex - visibleSlides);
        }
    });

    $(".next").click(function() {
        if (currentIndex < totalSlides - visibleSlides) {
            goToSlide(currentIndex + visibleSlides);
        }
    });

    setInterval(function() {
        if (currentIndex < totalSlides - visibleSlides) {
            goToSlide(currentIndex + visibleSlides);
        } else {
            goToSlide(0);
        }
    }, 3000);

    // Gọi hàm để cập nhật số lượng slide và dấu chấm ban đầu
    updateVisibleSlides();
    createDots();

    // Thêm sự kiện resize để cập nhật lại số lượng slide và dấu chấm khi kích thước màn hình thay đổi
    $(window).resize(function() {
        updateVisibleSlides();
        createDots();
    });
});
