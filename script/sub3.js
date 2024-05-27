// page2
$(function () {
    $('.tabcontent > div').hide();
    $('.tabnav a').click(function () {
        $('.tabcontent > div').hide().filter(this.hash).fadeIn();
        $('.tabnav a').removeClass('active');
        $(this).addClass('active');
        $(".campain_poster img").removeClass("poster_on"); // 모든 이미지에서 poster_on 클래스를 제거합니다.
        return false;
    }).filter(':eq(0)').click();
});
$(function () {
    // 초기 상태 설정: 첫 번째 이미지에 'poster_on' 클래스 추가
    $('.campain_poster img').eq(0).addClass('poster_on');

    // 탭 클릭 이벤트 설정
    $('.tabnav a').on('click', function (e) {
        e.preventDefault(); // 기본 이벤트 차단

        // 모든 이미지에서 'poster_on' 클래스 제거
        $('.campain_poster img').removeClass('poster_on');

        // 클릭된 탭에 해당하는 인덱스를 가져옴
        var index = $('.tabnav a').index(this);

        // 해당 인덱스의 이미지에만 'poster_on' 클래스 추가
        $('.campain_poster img').eq(index).addClass('poster_on');
    });
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

// 톡 박스
$(document).ready(function () {
    // 미모지 클릭시 나타나는
    $(".mimoji_box").click(function () {
        $(".talk_box_big").css('display', 'block').animate({ opacity: 1 }, 500);
    });

    // 닫기 버튼 클릭시 사라지는
    $(".talk_box_btn").click(function () {
        $(".talk_box_big").animate({ opacity: 0 }, 500).delay(500).queue(function (next) {
            $(this).css('display', 'none');
            next();
        });
    });
});
// 톡박스와 미모지박스 외의 다른 부분 클릭시 사라지는 
$(document).click(function (event) {
    if (!$(event.target).closest('.talk_box_big, .mimoji_box').length) {
        $(".talk_box_big").animate({ opacity: 0 }, 500).delay(500).queue(function (next) {
            $(this).css('display', 'none');
            next();
        });
    }
});
$(document).ready(function () {
    $('.mimoji_box').click(function () {
        // 클릭된 요소를 서서히 사라지게 합니다.
        $('.lets_talk').fadeOut();
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
        var isInSpecialDiv = div >= 2 && div <= 5;
        $('.scroll-menu .nav>li>a, .tel').css('color', isInSpecialDiv ? '#333' : '#fff');
        $('.tel img').css('filter', isInSpecialDiv ? 'invert(1)' : 'invert(0)');
        $('.side_nav ul a').css('color', (div >= 4 && div <= 5) ? '#fff' : isInSpecialDiv ? '#999' : '#fff');
        $('.side_nav_list').each(function (i) {
            $(this).toggleClass('active', i === div)
                .find('.side_nav_bullet').text(i === div ? '○' : '●');
        });
    }

    function updategnb1() {
        var isInSpecialDiv1 = div >= 2 && div <= 5;
        var isInSpecialDiv2 = div === 1;

        // div 값이 1인 경우
        if (isInSpecialDiv2) {
            $('.scroll-menu').addClass('scroll-fixed0');
            $('.scroll-menu').removeClass('scroll-fixed'); // 이전에 추가된 scroll-fixed 클래스를 제거
            $('.mimoji .lets_talk').css('opacity', '0'); // opacity를 1로 설정하여 원래 상태로 복원
            $('.now_menu').css('background', 'none');

        }
        // div 값이 2에서 5 사이인 경우
        else if (isInSpecialDiv1) {
            $('.scroll-menu').addClass('scroll-fixed');
            $('.scroll-menu').removeClass('scroll-fixed0'); // 이전에 추가된 scroll-fixed0 클래스를 제거
            $('.mimoji .lets_talk').css('opacity', '0');
            $('.now_menu').css('background', 'none');
        }
        // 그 외의 경우
        else {
            $('.scroll-menu').removeClass('scroll-fixed');
            $('.scroll-menu').removeClass('scroll-fixed0');
            $('.mimoji .lets_talk').css('opacity', '1');
            $('.now_menu').css('background', '#111');
        }
    }

    ////////
    $('.nav').mouseenter(function () {
        updateNavigation(); // 엔터 시에도 div 인덱스 업데이트
        $('.sub').stop(true, true).delay(100).slideDown(300);
        $('.gnb .tel img').css('filter', 'invert(1)');
        $('.header_bg, .header_bg_line').css('opacity', '1');
        $('.now_menu').css('background', 'none');
        updateMenuStyleFirst();
    });

    $('.scroll-menu').mouseleave(function () {
        updateNavigation(); // 리브 시에도 div 인덱스 업데이트
        $('.sub').stop(true, true).slideUp(300);
        $('.header_bg').stop(true, true).animate({ height: '0px' }, 100, 'linear');
        $('.header_bg, .header_bg_line').css('opacity', '0');
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
        }
    }

    // 초기 스타일로 되돌리는 함수
    function resetToInitialStyleFirst() {
        if (div >= 2 && div <= 5) {
            $('.scroll-menu').removeClass('scroll-fixed0');
            $('.scroll-menu').addClass('scroll-fixed');
            $('.gnb .nav>li>a, .gnb .tel').css('color', 'none');
            $('.gnb .tel img').css('filter', 'invert(1)');
            $('.now_menu').css('background', 'none');
        }
        else if (div == 0) {
            $('.scroll-menu').removeClass('scroll-fixed0'); // 이전에 추가된 scroll-fixed0 클래스를 제거
            $('.scroll-menu').removeClass('scroll-fixed'); // 이전에 추가된 scroll-fixed0 클래스를 제거
            $('.gnb .nav>li>a, .gnb .tel').css('color', '#fff');
            $('.gnb .tel img').css('filter', 'none');
            $('.now_menu').css('background', '#111');
        }
        else { // div == 1
            $('.scroll-menu').addClass('scroll-fixed0');
            $('.scroll-menu').removeClass('scroll-fixed');
            $('.gnb .nav>li>a, .gnb .tel').css('color', '#fff');
            $('.gnb .tel img').css('filter', 'none');
            $('.now_menu').css('background', 'none');
        }
    }
    ////////

    // 스크롤 이벤트 및 스크롤 휠 이벤트 처리
    window.addEventListener('mousewheel', function (e) {
        $('html').css('scroll-behavior', 'auto');
        var delta = e.wheelDelta > 0 || e.detail < 0 ? -1 : 1;
        
        // .page3에 대한 조건을 확인
        var page3 = $('.page3');
        var page3Top = page3.offset().top;
        var scrollPosition = $(window).scrollTop();
        var page3Height = page3.outerHeight();
        
        // .page3 내에서의 스크롤 위치 비율 계산
        var scrollPositionWithinPage3 = (scrollPosition - page3Top) / page3Height;
    
        // .page3의 하단 n% 이상에서의 스크롤 처리
        var isScrollingUpWithinPage3Bottom70 = delta < 0 && scrollPositionWithinPage3 >= 0.1;
        var isScrollingDownIntoPage3 = delta > 0 && div === 2;
    
        if (!(div === 2 && page3.length && (isScrollingDownIntoPage3 || isScrollingUpWithinPage3Bottom70))) {
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

    $(window).on('scroll', function () {
        updateDivIndexAndNav(); // 스크롤할 때마다 현재 섹션 인덱스 및 네비게이션 업데이트
    });

    updateDivIndexAndNav(); // 페이지 로드 시 현재 섹션 인덱스 및 네비게이션 업데이트
});




// <!-- 스크롤하면 요소 나타나는 -->
AOS.init({
    duration: 800 //aos 나타나는 속도
});