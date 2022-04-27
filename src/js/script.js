$(document).ready(function () {

    const slider = tns({
        container: '.carousel__inner',
        items: 1,
        controls: false,
        nav: false
    });

    document.querySelector('.prev').addEventListener('click', () => {
        slider.goTo('prev');
    });

    document.querySelector('.next').addEventListener('click', () => {
        slider.goTo('next');
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });


    function toggleSlide(item) {
        $(item).each(function (i) {
            $(this).on('click', function (e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            });
        });
    }
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');



    //модальные окна
    $('[data-modal=consultation]').on('click', function () {
        $('.overlay, #consultation').fadeIn();
    });

    $('.modal__close').on('click', function () {
        $('.overlay, #consultation, #order, #thanks').fadeOut();
    });

    $('.button_mini').each(function (i) {
        $(this).on('click', function () {
            $('#order .modal__description').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn();
        })
    });
    
    function validateForm(form){
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
                  required: "Please enter your name",
                  minlength: jQuery.validator.format("At least {0} characters required!")
                },
                phone: {
                    required: "Please enter your phone"
                },
                email:{
                    required: "Please enter your email",
                    email: "You email is incorrect"
                }
                
            }
        });
    }
    validateForm($('#consultation form'));
    validateForm($('#order form'));
    validateForm($('#consultation-form'));

    $('input[name=phone').mask("+38(999) 999-99-99");

    $('form').submit(function(e){
        e.preventDefault();
        if (!$(this).valid()) {
            return;
        }

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function(){
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');
            $('form').trigger('reset');
            
        });
        return false;
    });
    $(window).scroll(function(){
        if($(this).scrollTop() > 1600 ) {
            $('.page-up').fadeIn();
        } else {
            $('.page-up').fadeOut();
        }
    });
});