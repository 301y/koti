

//page4 푸터
$(document).ready(function() {
  $('footer').on('mouseover', function() {
    $(this).css('transform', 'translateY(0%)');
    $('.footer_btn').css('opacity', '0');
  }).on('mouseleave', function() {
    $(this).css('transform', 'translateY(96%)');
    $('.footer_btn').css('opacity', '1');
  });
});


// <!-- 스크롤 휠 + 사이드 네비 + 탑메뉴 -->
$(function () {
    var $divs = $('.page');
    var div = -1; // 초기화

    // 현재 보이는 섹션의 인덱스와 네비게이션 업데이트
    function updateDivIndexAndNav() {
        var currentScrollTop = $(window).scrollTop();
        $divs.each(function (i) {
            if ($(this).offset().top <= currentScrollTop + 10) {
                div = i;
            }
        });
        updateNavigation();
        updategnb1();
    }

    function updateNavigation() {
        var isInSpecialDiv = div >= 1 && div <= 5;
        $('.scroll-menu .nav>li>a, .tel').css('color', isInSpecialDiv ? '#333' : '#fff');
        $('.now_menu').css('background', isInSpecialDiv ? 'none' : '#ed5700');
        $('.tel img').css('filter', isInSpecialDiv ? 'invert(1)' : 'invert(0)');
        $('.side_nav ul a').css('color', (div >= 4 && div <= 5) ? '#fff' : isInSpecialDiv ? '#999' : '#fff');
        $('.side_nav_list').each(function (i) {
            $(this).toggleClass('active', i === div)
                .find('.side_nav_bullet').text(i === div ? '○' : '●');
        });
    }

    function updategnb1() {
        // div 값이 1 이상 5 이하인지 확인하는 변수
        var isInSpecialDiv1 = div >= 1 && div <= 5;
        // isInSpecialDiv가 참일 경우에만 클래스 추가
        if (isInSpecialDiv1) {
            $('.scroll-menu').addClass('scroll-fixed');
            $('.mimoji .lets_talk').css('opacity', '0');
        }
        else {
            $('.scroll-menu').removeClass('scroll-fixed');
            $('.mimoji .lets_talk').css('opacity', '1');
        }

    }
    ////////
    $('.nav').mouseenter(function () {
        updateNavigation(); // 엔터 시에도 div 인덱스 업데이트
        $('.sub').stop(true, true).delay(100).slideDown(300);
        $('.gnb .tel img').css('filter', 'invert(1)');
        $('.header_bg, .header_bg_line').css('opacity', '1');
        //$('.nav li .now_menu').css('background-color', '#ed570000');
        updateMenuStyleFirst();
    });

    $('.scroll-menu').mouseleave(function () {
        updateNavigation(); // 리브 시에도 div 인덱스 업데이트
        $('.sub').stop(true, true).slideUp(300);
        $('.header_bg').stop(true, true).animate({ height: '0px' }, 100, 'linear');
        $('.header_bg, .header_bg_line').css('opacity', '0');
        //$('.nav li .now_menu').css('background-color', '#ed5700');
        resetToInitialStyleFirst(); // 초기 스타일로 되돌리기
    });

    // 스타일 업데이트 함수
    function updateMenuStyleFirst() {
        if (div >= 1 && div <= 5) {
            $('.header_bg').stop(true, true).animate({ height: '280px' }, 100, 'linear');
            $('.gnb .nav>li>a, .gnb .tel').css('color', '#333');
        } else {
            $('.header_bg').stop(true, true).animate({ height: '350px' }, 100, 'linear');
            $('.gnb .nav>li>a, .gnb .tel').css('color', '#333');
            $('.nav li .now_menu').css('background', 'none');
        }
    }

    // 초기 스타일로 되돌리는 함수
    function resetToInitialStyleFirst() {
        if (div >= 1 && div <= 5) {
            $('.gnb .nav>li>a, .gnb .tel').css('color', 'none');
            //$('.gnb nav>li>.now_menu').css('color', '#fff');
            $('.gnb .tel img').css('filter', 'invert(1)');
        } else {
            //$('.gnb nav>li>.now_menu').css('color', '#fff');
            $('.gnb .nav>li>a, .gnb .tel').css('color', '#fff');
            $('.gnb .tel img').css('filter', 'none');
            $('.nav li .now_menu').css('background', '#ed5700');
        }
    }
    ////////

    // 스크롤 이벤트 및 스크롤 휠 이벤트 처리
    window.addEventListener('mousewheel', function(e) {
        $('html').css('scroll-behavior', 'auto');
        if (!$(e.target).closest('.talk_box_big').length) {
            var delta = e.wheelDelta > 0 || e.detail < 0 ? -1 : 1;
    
            div += delta;
            div = Math.max(0, Math.min(div, $divs.length - 1));
    
            $('html,body').stop().animate({
                scrollTop: $divs.eq(div).offset().top
            }, 400, function () {
                $('html').css('scroll-behavior', 'smooth');
                updateDivIndexAndNav();
            });
    
            e.preventDefault();
        }
    }, { passive: false });
    
    $(window).on('scroll', function() {
        updateDivIndexAndNav(); // 스크롤할 때마다 현재 섹션 인덱스 및 네비게이션 업데이트
    });

    updateDivIndexAndNav(); // 페이지 로드 시 현재 섹션 인덱스 및 네비게이션 업데이트
});


// <!-- 스크롤하면 요소 나타나는 -->
AOS.init({
    duration: 800 //aos 나타나는 속도
});


//커서
const cursor = document.querySelector('#cursor');
const cursorCircle = cursor.querySelector('.cursor__circle');

const mouse = { x: -100, y: -100 }; // mouse pointer's coordinates
const pos = { x: 0, y: 0 }; // cursor's coordinates
const speed = 0.2; // between 0 and 1

const updateCoordinates = e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
}

window.addEventListener('mousemove', updateCoordinates);

function getAngle(diffX, diffY) {
    return Math.atan2(diffY, diffX) * 180 / Math.PI;
}

function getSqueeze(diffX, diffY) {
    const distance = Math.sqrt(
        Math.pow(diffX, 2) + Math.pow(diffY, 2)
    );
    const maxSqueeze = 0.15;
    const accelerator = 1500;
    return Math.min(distance / accelerator, maxSqueeze);
}

const updateCursor = () => {
    const diffX = Math.round(mouse.x - pos.x);
    const diffY = Math.round(mouse.y - pos.y);

    pos.x += diffX * speed;
    pos.y += diffY * speed;

    const angle = getAngle(diffX, diffY);
    const squeeze = getSqueeze(diffX, diffY);

    const scale = 'scale(' + (1 + squeeze) + ', ' + (1 - squeeze) + ')';
    const rotate = 'rotate(' + angle + 'deg)';
    const translate = 'translate3d(' + pos.x + 'px ,' + pos.y + 'px, 0)';

    cursor.style.transform = translate;
    cursorCircle.style.transform = rotate + scale;
};

function loop() {
    updateCursor();
    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

const cursorModifiers = document.querySelectorAll('[cursor-class]');

cursorModifiers.forEach(curosrModifier => {
    curosrModifier.addEventListener('mouseenter', function () {
        const className = this.getAttribute('cursor-class');
        cursor.classList.add(className);
    });

    curosrModifier.addEventListener('mouseleave', function () {
        const className = this.getAttribute('cursor-class');
        cursor.classList.remove(className);
    });
});
