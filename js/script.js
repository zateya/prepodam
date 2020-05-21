$(function() {
    var WindowWidth = {
        TABLET: 1024,
        DESKTOP: 1440,
    };

    var PageClass = {
        PHONE: 'page_phone',
        TABLET: 'page_tablet',
        DESKTOP: 'page_desktop',
    }

    const bodyElem = $('body');

    const programsSliderParams = {
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        variableWidth: true
    };

    function openMobileMenu () {
        $(this).toggleClass('menu-button_opened');
        $('.nav').toggleClass('nav_opened');
    };

    function openUserMenu () {
        $(this).toggleClass('menu-button_opened');
        $('.nav__menu_user').toggleClass('nav__menu_opened');
    };

    function onWindowResize () {
        const isPhone = window.matchMedia(`(max-width: ${WindowWidth.TABLET - 1}px)`).matches;
        const isTablet = window.matchMedia(`(min-width: ${WindowWidth.TABLET}px) and (max-width: ${WindowWidth.DESKTOP - 1}px)`).matches;
        const isDesktop = window.matchMedia(`(min-width: ${WindowWidth.DESKTOP}px)`).matches;

        if (isDesktop) {
            bodyElem.removeClass(PageClass.PHONE);
            bodyElem.removeClass(PageClass.TABLET);
            bodyElem.addClass(PageClass.DESKTOP);

            $('.header__menu-button').off('click', openMobileMenu);
            $('.header__menu-button').off('click', openUserMenu);
            $('.menu-button').removeClass('menu-button_opened');
            $('.nav').removeClass('nav_opened');
            $('.nav__menu_user').removeClass('nav__menu_opened');

            $('.programs-list.slick-slider').slick('unslick');

        } else if (isTablet) {
            if (!bodyElem.hasClass(PageClass.TABLET)) {
                $('.header__menu-button').on('click', openUserMenu);

                $('.menu-button').removeClass('menu-button_opened');
                $('.nav').removeClass('nav_opened');

                $('.programs-list.slick-slider').slick('unslick');
            }

            bodyElem.removeClass(PageClass.PHONE);
            bodyElem.removeClass(PageClass.DESKTOP);
            bodyElem.addClass(PageClass.TABLET);

            $('.header__menu-button').off('click', openMobileMenu);
        } else if (isPhone) {
            if (!bodyElem.hasClass(PageClass.PHONE)) {
                $('.header__menu-button').on('click', openMobileMenu);

                $('.menu-button').removeClass('menu-button_opened');
                $('.nav__menu_user').removeClass('nav__menu_opened');

                $('.programs-list').slick(programsSliderParams);
            }

            bodyElem.removeClass(PageClass.TABLET);
            bodyElem.removeClass(PageClass.DESKTOP);
            bodyElem.addClass(PageClass.PHONE);

            $('.header__menu-button').off('click', openUserMenu);
        }
    };

    $(window).on('resize', onWindowResize);
    onWindowResize();
});
