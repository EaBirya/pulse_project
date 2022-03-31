const vh = window.innerHeight / 100;
document.documentElement.style.setProperty('--vh', `${vh}px`);

/* создать слайдер через slick */ 
$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 600,
        adaptiveHeight: false,
        autoplay: true,
        autoplaySpeed: 2000,
        prevArrow: '<button type="button" class="slick-prev"><img src="img/carousel/chevron-left-solid.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="img/carousel/chevron-right-solid.png"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false,
                    centerMode: true,
                    variableWidth: true,
                    dotsClass: 'carousel__dots'
                }
            }
        ]
    });
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__wrapper').eq(i).toggleClass('catalog-item__wrapper_active');
            })      
        });
    };
    toggleSlide ('.catalog-item__link');
    toggleSlide ('.catalog-item__back');

    //Modal 

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });
  
    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            /* попытка сделать замену value в input */
            $('#order_product').val($('#order .modal__descr').text());

            $('.overlay, #order').fadeIn('slow');
        })
    });

    
    

    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });

    
    function valideForm(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                  },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите Ваше имя",
                    minlength: jQuery.validator.format("Минимально {0} символа")
                },
                phone: "Пожалуйста, введите Ваш номер телефона",
                email: {
                    required: "Пожалуйста, введите Вашу почту",
                    email: "Введите верный электронный адрес"
                }
              }
        });
    };

    valideForm('#consultation-form');
    valideForm('#consultation form');
    valideForm('#order form');

    $('input[name=phone]').mask("+7 (999) 999-99-99");


    function postForm(post_form) {
        $(post_form).submit(function(e) {
            e.preventDefault();
    
            if (!$(this).valid()) {
                return;
            }
    
            $.ajax({
                type: "POST",
                url: "mailer/smart.php",
                data: $(this).serialize()
            }).done(function() {
                $(this).find("input").val("");
                $('#consultation, #order').fadeOut();
                $('.overlay , #thanks').fadeIn('slow');
                $('.overlay , #thanks').delay(5000).fadeOut('slow');
                $('form').trigger('reset');
            });
            return false;
        });
    };

    postForm('#consultation-form')
    postForm('#consultation form')

    $('#order form').submit(function(e) {
        e.preventDefault();

        if (!$(this).valid()) {
            return;
        }

        $.ajax({
            type: "POST",
            url: "mailer/smart_order.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay , #thanks').fadeIn('slow');
            $('.overlay , #thanks').delay(5000).fadeOut('slow');
            $('form').trigger('reset');
        });
        return false;
    });

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1200 ) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    /* Плавный скрол, хотя он уже работает сам по себе */ 
    $('a[href^="#"]').on('click', function() {
        let href = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(href).offset().top
        }, {
            duration: 370,   // по умолчанию «400» 
            easing: "linear"
        });
        return false;
    });
    

});


/* создаем слайдер через Tiny */
/* const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    nav: false,
    controls: false
});
document.querySelector('.prev').addEventListener('click', function () {
    slider.goTo('prev');
});
document.querySelector('.next').addEventListener('click', function () {
    slider.goTo('next');
}); */


