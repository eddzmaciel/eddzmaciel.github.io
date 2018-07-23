( function($) {
"use strict";

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
}
function scrollParallax(){
    $('.bg-parallax').each(function() {
        if(isMobile.any()){
            $(this).css('background-attachment', 'scroll');
        } else{
            $(this).parallax("50%", 0.2);
        }
    });
}
function checkAddClass(selector, className) {
    if (!selector.hasClass(className)) {
        selector.addClass(className);
    }
}

function checkRemoveClass(selector, className) {
    if (selector.hasClass(className)) {
        selector.removeClass(className);
    }
}

function backToTop() {
    var scrollPos = 0;
    var element = $('.back-to-top');
    $(window).scroll(function() {
        var scrollCur = $(window).scrollTop();
        if (scrollCur > scrollPos) {
            // scroll down
            if (scrollCur > 500) {
                element.addClass('active');
            } else {
                element.removeClass('active');
            }
        } else {
            // scroll up
            element.removeClass('active');
        }

        scrollPos = scrollCur;
    });

    element.on('click', function() {
        $('html, body').animate({
            scrollTop: '0px'
        }, 800);
    })
}
function backgroundImage() {
    var databackground = $('[data-background]');
    databackground.each(function() {
        if ($(this).attr('data-background')) {
            var image_path = $(this).attr('data-background');
            $(this).css({
                'background': 'url(' + image_path + ')'
            });
        }
    });
}

function customOwlCaurousel() {
    var owl = $('.carousel');
    owl.each(function(index) {
        var currentOwl = $(this);
        var lg = currentOwl.data('lg');
        var md = currentOwl.data('md');
        var sm = currentOwl.data('sm');
        var xs = currentOwl.data('xs');
        var nav = currentOwl.data('owl-navigation');
        var margin = currentOwl.data('owl-margin');
        var dots = currentOwl.data('owl-dots');
        var timeOut = currentOwl.data('owl-timeout'); //ms
        currentOwl.owlCarousel({
            margin: margin,
            autoplay: true,
            autoplayTimeout: timeOut,
            autoplayHoverPause: true,
            loop: true,
            dots: true,
            nav: nav,
            navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
            responsive: {
                0: {
                    items: xs
                },
                768: {
                    items: sm
                },
                992: {
                    items: md
                },
                1200: {
                    items: lg
                }
            }
        })
    });

}
function magnificPopupConfig() {
    if($('.image-popup').length) {
        $('.image-popup').magnificPopup({
          type: 'image'
          // other options
        });
    }
    if($('.video-popup').length) {
        $('.video-popup').magnificPopup({
          type: 'iframe'
          // other options
        });
    }
    if($('.shop-item-popup').length) {
        $('.open-popup-link').magnificPopup({
          type:'inline',
          midClick: true
        });
    }
}
function isotopeLayout() {
    $('.isotope-grid-wrapper').each(function() {
        var el = $(this),
            columnGap = el.data('column-gap');

        var isotopeContainer = el.find('.isotope-grid');
        isotopeContainer.css('width', '100% !important');

        if (el.attr('data-column-gap') !== 'undefined') {
            el.find('.isotope-grid-row').css('margin', -columnGap / 2);
            el.find('.isotope-grid-item').css('padding', columnGap / 2);
        }

        var workItem = el.find('.isotope-grid-item'),
            workItemLarge = el.find('.isotope-grid-item-large'),
            isotopeColumn = el.data('isotope-column'),
            responsiveMd = el.data('column-md'),
            responsiveSm = el.data('column-sm'),
            responsiveXs = el.data('column-xs'),
            responsiveTn = el.data('column-tn');

        var windowWidth = window.innerWidth,
            mediumDevices = 1200,
            smallDevices = 992,
            extrasmallDevices = 768,
            tinyDevices = 480;
        if (windowWidth < tinyDevices) {
            workItem.css('width', 100 / responsiveTn + '%');
        } else if (windowWidth < extrasmallDevices) {
            workItem.css('width', 100 / responsiveXs + '%');
            workItemLarge.css('width', 100 / responsiveXs + '%');
        } else if (windowWidth < smallDevices) {
            workItem.css('width', 100 / responsiveSm + '%');
            workItemLarge.css('width', 100 / responsiveSm + '%');
        } else if (windowWidth < mediumDevices) {
            workItem.css('width', 100 / responsiveMd + '%');
            workItemLarge.css('width', 2 * 100 / responsiveMd + '%');
        } else {
            workItem.css('width', 100 / isotopeColumn + '%');
            workItemLarge.css('width', 2 * 100 / isotopeColumn + '%');
        }

        isotopeContainer.imagesLoaded(function() {
            isotopeContainer.isotope({
                layoutMode: 'packery',
                itemSelector: '.isotope-grid-item',
                transitionDuration: '0.5s',
            });
        });
        // FILTER
        var filters = el.parents().find('.isotope-filters');
        filters.on('click', 'a', function() {
            var selector = $(this).attr('data-filter');
            $('.current', filters).removeClass('current');
            $(this).addClass('current');
            isotopeContainer.isotope({
                layoutMode: 'masonry',
                itemSelector: '.portfolio-item',
                filter: selector
            });

            return false;
        });
    });
}
function chartConfig() {

    $('.chart-area').waypoint(function(direction) {
        var line_chart = $('.line-chart');
        line_chart.each(function(index, el) {
            var self = $(this);
            var value = self.find('.chart-bar').data('value');
            self.find('.chart-bar').css('width', value + '%');
            // self.find('.chart-bar').addClass('active');
        });
    },
    {
        offset: '75%'
    });
}

function countUp() {
    var number = $('.sppb-animated-number');
    var counter_clone = $('.counter-clone');
    number.each(function() {
        // Set data-to attribute to '.count-number'
        if($(this).attr('data-to') == undefined) {
            var value = $(this).html().match(/\d+/);
            $(this).attr('data-to', value);
            // reset text default
            $(this).text('0');
        }

        $(this).waypoint(function(direction) {
            $(this).countTo({
                speed: '1500',
                refreshInterval: 50
            });
        },
        {
            triggerOnce: true,
            offset: '75%'
        });
    });
    if(counter_clone.length > 0) {
        counter_clone.each(function() {
            // Set data-to attribute to '.count-number'
            if($(this).attr('data-to') == undefined) {
                var value = $(this).html().match(/\d+/);
                $(this).attr('data-to', value);
                // reset text default
                $(this).text('0');
            }

            $(this).waypoint(function(direction) {
                $(this).countTo({
                    speed: '1500',
                    refreshInterval: 50
                });
            },
            {
                triggerOnce: true,
                offset: '75%'
            });
        });
    }
}
function pieChartConfig() {
    $('.pie-chart-group').waypoint(function(direction) {
        var pie_chart = $('.pie-chart');
        if(pie_chart.length !==0) {
            pie_chart.each(function() {
                var self = $(this);
                var chart_width = self.data('width');
                var chart_unit = self.data('unit');
                var line_width = self.data('line-width');
                self.easyPieChart({
                    barColor: '#1674d1',
                    scaleColor: 'transparent',
                    size: chart_width,
                    lineWidth: line_width
                });
            });
        }
    },
    {
        triggerOnce: true,
        offset: '75%'
    });
}

function searchAction() {
    var search_btn = $('.trigger-search');
    var searchbox = $('.search-box');
    var close_btn = $('.search-box-close');
    search_btn.click(function(event) {
        checkAddClass(searchbox, 'search-box-active');
    });
    close_btn.click(function(event) {
       checkRemoveClass(searchbox, 'search-box-active');
    });
}

function menuResponsive() {
    var nav = $('.navigation');
    var menu = $('.navigation').find('.menu');
    var check_point = nav.data('responsive');
    var window_width = $(window).innerWidth();
    var header_height = $('.header').innerHeight();
    // responsive
    if(check_point > window_width) {
        checkAddClass(nav, 'navigation-mobile');
        if($('.sub-menu').children('.back-btn').length == 0) {
            $('.sub-menu').prepend("<li class='back-btn menu-item'><a href='#'>Back</a></li>");
        }
        $("body").on('click', '.menu-item a', function(event) {
            var self = $(this).parent();
            if(self.hasClass('has-children')) {
                event.preventDefault();
                self.siblings('.menu-item').hide();
                self.children('a').hide();
                self.addClass('active');
            }
        });
        $("body").on('click', '.back-btn a', function(event) {
            event.preventDefault();
            var current_back_btn = $(this).parent();
            current_back_btn.closest('.has-children').removeClass('active');
            current_back_btn.closest('.has-children').siblings('.menu-item').show();
            current_back_btn.closest('.has-children').children('a').show();
            return false;
        });
    }
    // normal
    else {
         checkRemoveClass(nav, 'navigation-mobile');
    }
}
function toogleMenuResponsive() {
    var menu_toggle = $('.menu-toggle');
    var menu = $('.menu');
    menu_toggle.click(function(event) {
        menu.toggleClass('menu-mobile-active');
    });
    $('.wrapper').on('click', function(event) {
        if(menu.hasClass('menu-mobile-active')) {
            menu.removeClass('menu-mobile-active')
        }
    });
}
function menuStickyWhenScrollUp () {
    var header   = $('.header');
    var position = 0;
    var header_fullscreen = $('.header-fullscreen');
    var restaurant = $('.header-restaurant');
    $(window).scroll(function(event) {
        var currentPos = $(this).scrollTop();
        // on top
        if (currentPos == 0 ) {
            header.removeClass('header-fixed');
            if(header_fullscreen.length != 0) {
                checkRemoveClass(header_fullscreen, 'has-scroll-down');
            }
        }
        // scroll down
        if (currentPos > position && currentPos > 200) {
            header.addClass('header-fixed');
            if(header.hasClass('header-restaurant')) {
                header.removeClass('header-fixed');
            }
            if(header_fullscreen.length != 0) {
                checkAddClass(header_fullscreen, 'has-scroll-down');
            }
        }
        // scroll up
        position = currentPos;
    });
}
function fullScreenMenuAction() {
    var nav = $('.navigation-fullscreen');
    var open_btn = $('.menu-open-fullscreen');
    var close_btn = $('.menu-close-fullscreen');
    open_btn.click(function(event) {
        checkAddClass(nav, 'navigation-active');
    });
    close_btn.click(function(event) {
        checkRemoveClass(nav, 'navigation-active');
    });

}
function shoppingReset() {
    $('.shopping-icon a').on('click', function(event) {
        event.preventDefault();
    });
}
$(document).ready(function() {
    backToTop();
    backgroundImage();
    customOwlCaurousel();
    magnificPopupConfig();
    countUp();
    // counterConfig();
    pieChartConfig();
    searchAction();
    toogleMenuResponsive();
    menuStickyWhenScrollUp ();
    fullScreenMenuAction();
    new WOW().init();
});
$(window).on('load resize', function() {
    scrollParallax();
    isotopeLayout();
    chartConfig();
    menuResponsive();
    shoppingReset();
});
$(window).on('load', function() {
    $('#preloader').addClass('completed');
});
} )(jQuery);

