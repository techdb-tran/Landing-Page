$(document).ready(function() {
    let currentIndex = 0;
    const slides = $(".carousel-item");
    const totalSlides = slides.length;
    let visibleSlides;
    const totalDots = 4; // Số lượng dot bạn muốn hiển thị

    function updateVisibleSlides() {
        if ($(window).width() <= 460) {
            visibleSlides = 1;
        } else {
            visibleSlides = 2;
        }
    }

    function createDots() {
        $(".dots").empty();
        for (let i = 0; i < totalDots; i++) {
            $(".dots").append("<span class='dot'></span>");
        }
        $(".dot").eq(0).addClass("active");

        // Thêm sự kiện khi click vào dot
        $(".dot").on("click", function() {
            const dotIndex = $(this).index();
            goToSlide(dotIndex * visibleSlides * 2);
        });
    }

    function goToSlide(index) {
        const slideWidth = $(".carousel-item").width() / visibleSlides;
        const offset = -(slideWidth * index);
        $(".carousel__wrap").css("transform", "translateX(" + offset + "px)");
        currentIndex = index;
        updateDots();
    }

    function updateDots() {
        $(".dot").removeClass("active");
        const dotIndex = Math.floor(currentIndex / (visibleSlides * 2));
        $(".dot").eq(dotIndex).addClass("active");
    }

    $(".prev").click(function() {
        if (currentIndex > 0) {
            goToSlide(currentIndex - (visibleSlides * 2));
        }
    });

    $(".next").click(function() {
        if (currentIndex < totalSlides - (visibleSlides * 2)) {
            goToSlide(currentIndex + (visibleSlides * 2));
        }
    });

    setInterval(function() {
        if (currentIndex < totalSlides - (visibleSlides * 2)) {
            goToSlide(currentIndex + (visibleSlides * 2));
        } else {
            goToSlide(0);
        }
    }, 3000);

    updateVisibleSlides();
    createDots();

    $(window).resize(function() {
        updateVisibleSlides();
        createDots();
    });
});
