// slider from slick
$(document).ready(function () {
    $(".carousel__inner").slick({
        // adaptiveHeight: true,
        speed: 1200,
        controls: false,
        prevArrow:
            '<button type="button" class="slick-prev"><img src="icons/chevron_left.svg"></button>',
        nextArrow:
            '<button type="button" class="slick-next"><img src="icons/chevron_right.svg"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    nextArrow: false,
                    prevArrow: false,
                },
            },
        ],
    });

    // tabs

    $("ul.catalog__tabs").on(
        "click",
        "li:not(.catalog__tab_active)",
        function () {
            $(this)
                .addClass("catalog__tab_active")
                .siblings()
                .removeClass("catalog__tab_active")
                .closest("div.container")
                .find("div.catalog__content")
                .removeClass("catalog__content_active")
                .eq($(this).index())
                .addClass("catalog__content_active");
        }
    );

    function toggleSlide(item) {
        $(item).each(function (i) {
            $(this).on("click", function (e) {
                e.preventDefault();
                $(".catalog-item__content")
                    .eq(i)
                    .toggleClass("catalog-item__content_active");
                $(".catalog-item__list").eq(i).toggleClass("catalog-item__list_active");
            });
        });
    }

    toggleSlide(".catalog-item__link");
    toggleSlide(".catalog-item__back");

    // modal

    $("[data-modal=consultation]").on("click", function () {
        $(".overlay, #consultation").fadeIn("slow");
    });
    $(".modal__close").on("click", function () {
        $(".overlay, #consultation, #order, #thanks").fadeOut("slow");
    });

    $(".button_mini").each(function (i) {
        $(this).on("click", function () {
            $("#order .modal__descr").text($(".catalog-item__subtitle").eq(i).text());
            $(".overlay, #order").fadeIn("slow");
        });
    });

    function validateForms(form) {
        $(form).validate( {
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                email: {
                    required: true,
                    email: true
                },
                phone: {
                    required: true,
                    minlength: 11
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Не менее {0} символов!")
                },
                phone: {
                    required: "Пожалуйста, введите свой номер телефона",
                    minlength: jQuery.validator.format("Не менее {0} символов!")
                },
                email: {
                    required: "Пожалуйста, введите свой e-mail",
                    email: "Формат почты: name@damain.com"
                }
            }
        });
    };

    validateForms("#order form");
    validateForms('#consultation form');
    validateForms('#consultation-form');

    $('input[name=phone]').mask("+7 (999) 999-99-99");

    $('form').submit(function(e) {
        e.preventDefault();

        if (!$(this).valid()) {
            return;
        };
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');
            $('form').trigger('reset');
        });
        return false;
    });

    // Smooth scroll and pageup

    // Animation arrow 

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    // codeharmony.ru

    $(".pageup").click(function (){
        $("body,html").animate({
            scrollTop:0
        }, 0);
        return false;
    });

    new WOW().init();
});
