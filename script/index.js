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


// <!-- 톡 박스 -->
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
        // div 값이 1 이상 5 이하인지 확인하는 변수
        var isInSpecialDiv1 = div >= 1 && div <= 5;
        // isInSpecialDiv가 참일 경우에만 클래스 추가
        if (isInSpecialDiv1) {
            $('.scroll-menu').addClass('scroll-fixed');
        }
        else {
            $('.scroll-menu').removeClass('scroll-fixed');
        }

    }
    ////////
    $('.nav').mouseenter(function () {
        updateNavigation(); // 엔터 시에도 div 인덱스 업데이트
        $('.sub').stop(true, true).delay(100).slideDown(300);
        $('.gnb .nav>li>a, .gnb .tel').css('color', '#333');
        $('.gnb .tel img').css('filter', 'invert(1)');
        $('.header_bg, .header_bg_line').css('opacity', '1');
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
        } else {
            $('.header_bg').stop(true, true).animate({ height: '350px' }, 100, 'linear');
        }
    }

    // 초기 스타일로 되돌리는 함수
    function resetToInitialStyleFirst() {
        if (div >= 2 && div <= 5) {
            $('.gnb .nav>li>a, .gnb .tel').css('color', '#333');
            $('.gnb .tel img').css('filter', 'invert(1)');
        } else {
            $('.gnb .nav>li>a, .gnb .tel').css('color', '#fff');
            $('.gnb .tel img').css('filter', 'none');
        }
    }
    ////////

    // 스크롤 이벤트 및 스크롤 휠 이벤트 처리
    window.addEventListener('mousewheel', function (e) {
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

    window.addEventListener('DOMMouseScroll', function (e) {
        $('html').css('scroll-behavior', 'auto');
        if (!$(e.target).closest('.talk_box_big').length) {
            var delta = e.detail > 0 ? 1 : -1;

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

// < !--메인 배너 슬라이드-- 
$(function () {
    var swiper = new Swiper('.slide ', {
        speed: 500,//버튼을 슬라이드가 넘어가는 시간
        autoplay: {
            delay: 8000,//자동으로 넘어가기 전 머무르는 시간
            disableOnInteraction: false,
        },
        loop: true,//슬라이드 무한반복
        navigation: {//화살표 버튼
            nextEl: '.slide .swiper-button-next',
            prevEl: '.slide .swiper-button-prev',
        },
        pagination: {//블릿 버튼
            el: '.slide .swiper-pagination',
            clickable: true,
        },
    });
});

// <!--로케이션 슬라이드-- >
$(function () {
    var swiper = new Swiper('.page2 .gallery-center_inner ', {
        slidesPerView: 3,//보여지는 갤러리 수
        spaceBetween: 12,//갤러리 사이 간격
        centeredSlides: true,//센터모드
        speed: 1500,//버튼을 슬라이드가 넘어가는 시간
        autoplay: {
            delay: 2500,//자동으로 넘어가기 전 머무르는 시간
            disableOnInteraction: false,
        },
        loop: true,//슬라이드 무한반복
        navigation: {//화살표 버튼
            nextEl: '.page2 .gallery-center .swiper-button-next',
            prevEl: '.page2 .gallery-center .swiper-button-prev',
        },
        pagination: {//블릿 버튼
            el: '.page2 .gallery-center .swiper-pagination',
            clickable: true,
        },
    });
    $('.page2 .swiper-slide a').on('mouseenter', function () {
        swiper.autoplay.stop();
    });

    $('.page2 .swiper-slide a').on('mouseleave', function () {
        swiper.autoplay.start();
    });
});

// <!--룸인 한남-- >
$(function () {
    // 초기 설정: 첫 번째 탭과 이미지 표시
    $('.tabcontent > div').hide().filter(':first').show();
    $('.tabnav a:first').addClass('active');
    $('.tab_img > img').hide().filter(':first').show();

    // 탭 클릭 이벤트
    $('.tabnav a').click(function () {
        var tabIndex = $(this).parent().index();
        $('.tabcontent > div').hide().eq(tabIndex).fadeIn();
        $('.tabnav a').removeClass('active');
        $(this).addClass('active');
        $('.tab_img > img').hide(); // 탭 변경 시 이미지 초기화
        $('.tabcontent > div').eq(tabIndex).find('.tab_img > img:first').fadeIn(); // 탭 변경 시 첫 번째 이미지 표시
        return false;
    });

    // 이미지 넘기기 버튼 클릭 이벤트
    $('.left_btn, .right_btn').click(function () {
        var currentTab = $('.tabcontent > div:visible');
        var currentImg = currentTab.find('.tab_img > img:visible');
        var nextImg, nextTab;

        if ($(this).hasClass('right_btn')) {
            nextImg = currentImg.next('img');
            if (nextImg.length === 0) { // 다음 이미지가 없으면 다음 탭으로
                currentImg.fadeOut(0); // 현재 이미지 사라짐
                nextTab = currentTab.next('div');
                if (nextTab.length === 0) { // 다음 탭이 없으면 첫 번째 탭으로
                    nextTab = $('.tabcontent > div:first');
                }
                currentTab.fadeOut(0, function () { // 현재 탭 사라짐
                    nextTab.fadeIn(0); // 다음 탭 나타남
                    nextTab.find('.tab_img > img:first').fadeIn(400); // 다음 탭의 첫 번째 이미지 나타남
                });
            } else {
                currentImg.fadeOut(0, function () { // 현재 이미지 사라짐
                    nextImg.fadeIn(0); // 다음 이미지 나타남
                });
            }
        } else if ($(this).hasClass('left_btn')) {
            nextImg = currentImg.prev('img');
            if (nextImg.length === 0) { // 이전 이미지가 없으면 이전 탭으로
                currentImg.fadeOut(0); // 현재 이미지 사라짐
                nextTab = currentTab.prev('div');
                if (nextTab.length === 0) { // 이전 탭이 없으면 마지막 탭으로
                    nextTab = $('.tabcontent > div:last');
                }
                currentTab.fadeOut(0, function () { // 현재 탭 사라짐
                    nextTab.fadeIn(0); // 이전 탭 나타남
                    nextTab.find('.tab_img > img:last').fadeIn(400); // 이전 탭의 마지막 이미지 나타남
                });
            } else {
                currentImg.fadeOut(0, function () { // 현재 이미지 사라짐
                    nextImg.fadeIn(0); // 이전 이미지 나타남
                });
            }
        }
        updateActiveTab(nextTab ? nextTab.index() : currentTab.index());
    });

    // 탭 업데이트 함수
    function updateActiveTab(index) {
        $('.tabnav li').eq(index).find('a').addClass('active').parent().siblings().find('a').removeClass('active');
    }
});

// <!-- 뉴스앤컬쳐 -->

$(function () {
    var swiper = new Swiper('.news_culture_div .gallery-center_inner ', {
        slidesPerView: 4,//보여지는 갤러리 수
        spaceBetween: 30,//갤러리 사이 간격
        //centeredSlides: true,//센터모드
        speed: 1500,//버튼을 슬라이드가 넘어가는 시간
        autoplay: {
            delay: 2000,//자동으로 넘어가기 전 머무르는 시간
            disableOnInteraction: false,
        },
        loop: true,//슬라이드 무한반복
        pagination: {//블릿 버튼
            el: '.page5 .gallery-center .swiper-pagination',
            clickable: true,
        },
    });
});


// 공용공간

$(function () {
    // 초기 설정: 첫 번째 탭과 이미지 표시
    $('.tabcontent_horizontal > div').hide().filter(':first').show();
    $('.tabnav_horizontal a:first').addClass('active');
    $('.tab_horizontal_img > img').hide().filter(':first').show();

    // 탭 클릭 이벤트
    $('.tabnav_horizontal a').click(function () {
        var tabIndex = $(this).parent().index();
        $('.tabcontent_horizontal > div').hide().eq(tabIndex).fadeIn();
        $('.tabnav_horizontal a').removeClass('active');
        $(this).addClass('active');
        $('.tab_horizontal_img > img').hide(); // 탭 변경 시 이미지 초기화
        $('.tabcontent_horizontal > div').eq(tabIndex).find('.tab_horizontal_img > img:first').fadeIn(); // 탭 변경 시 첫 번째 이미지 표시
        return false;
    });

    // 이미지 넘기기 버튼 클릭 이벤트
    $('.tab_horizontal_btn .left_btn, .tab_horizontal_btn .right_btn').click(function () {
        var currentTab = $('.tabcontent_horizontal > div:visible');
        var currentImg = currentTab.find('.tab_horizontal_img > img:visible');
        var nextImg, nextTab;

        if ($(this).hasClass('right_btn')) {
            nextImg = currentImg.next('img');
            if (nextImg.length === 0) { // 다음 이미지가 없으면 다음 탭으로
                currentImg.fadeOut(0); // 현재 이미지 사라짐
                nextTab = currentTab.next('div');
                if (nextTab.length === 0) { // 다음 탭이 없으면 첫 번째 탭으로
                    nextTab = $('.tabcontent_horizontal > div:first');
                }
                currentTab.fadeOut(0, function () { // 현재 탭 사라짐
                    nextTab.fadeIn(0); // 다음 탭 나타남
                    nextTab.find('.tab_horizontal_img > img:first').fadeIn(400); // 다음 탭의 첫 번째 이미지 나타남
                });
            } else {
                currentImg.fadeOut(0, function () { // 현재 이미지 사라짐
                    nextImg.fadeIn(0); // 다음 이미지 나타남
                });
            }
        } else if ($(this).hasClass('left_btn')) {
            nextImg = currentImg.prev('img');
            if (nextImg.length === 0) { // 이전 이미지가 없으면 이전 탭으로
                currentImg.fadeOut(0); // 현재 이미지 사라짐
                nextTab = currentTab.prev('div');
                if (nextTab.length === 0) { // 이전 탭이 없으면 마지막 탭으로
                    nextTab = $('.tabcontent_horizontal > div:last');
                }
                currentTab.fadeOut(0, function () { // 현재 탭 사라짐
                    nextTab.fadeIn(0); // 이전 탭 나타남
                    nextTab.find('.tab_horizontal_img > img:last').fadeIn(400); // 이전 탭의 마지막 이미지 나타남
                });
            } else {
                currentImg.fadeOut(0, function () { // 현재 이미지 사라짐
                    nextImg.fadeIn(0); // 이전 이미지 나타남
                });
            }
        }
        updateActiveTab(nextTab ? nextTab.index() : currentTab.index());
    });

    // 탭 업데이트 함수
    function updateActiveTab(index) {
        $('.tabnav_horizontal li').eq(index).find('a').addClass('active').parent().siblings().find('a').removeClass('active');
    }
});
// 공용공간 흐린 배경
$('.tabnav_horizontal li a, .tab_horizontal_btn').click(function () {
    // '.Shared_box_bg_img li' 선택자를 사용하여 모든 li 요소를 $items 변수에 저장합니다.
    var $items = $('.Shared_box_bg_img li');

    // '.visible' 클래스를 가진 li 요소의 인덱스를 찾아 visibleIdx 변수에 저장합니다.
    var visibleIdx = $items.filter('.visible').index();

    // 현재 '.visible' 클래스를 가진 요소에서 '.visible' 클래스를 제거합니다.
    $items.eq(visibleIdx).removeClass('visible');

    // 다음 요소의 인덱스를 계산합니다. (현재 인덱스 + 1) % 아이템의 총 갯수를 사용하여 순환될 수 있게 합니다.
    var nextIdx = (visibleIdx + 1) % $items.length;

    // 계산된 다음 요소의 인덱스에 '.visible' 클래스를 추가하여 해당 요소를 보이게 합니다.
    $items.eq(nextIdx).addClass('visible');
});


// <!-- 스크롤하면 요소 나타나는 -->
AOS.init({
    duration: 800 //aos 나타나는 속도
});



// 사이드 네비
//  <!-- <script>
//     $(function () {
//         var divs = $('.page');
//         var div = -1; // 초기화

//         function updateDivIndex() {
//             div = -1; // 재초기화
//             divs.each(function (i) {
//                 if (div < 0 && ($(this).offset().top >= $(window).scrollTop())) {
//                     div = i;
//                 }
//             });
//             updateSideNavList(div); // side_nav_list 업데이트 함수 호출
//         }

//         // side_nav_list 업데이트 함수
//         function updateSideNavList(activeIndex) {
//             $('.side_nav_list').each(function (i) {
//                 if (i === activeIndex) {
//                     $(this).addClass('active');
//                     $(this).find('.side_nav_bullet').text('○');
//                     //$(this).css('opacity', '1');
//                 } else {
//                     $(this).removeClass('active');
//                     $(this).find('.side_nav_bullet').text('●');
//                 }
//             });
//         }
//         $(window).scroll(updateDivIndex); // 스크롤할 때마다 div 인덱스 및 side_nav_list 업데이트

//         // 초기 로드 시에도 side_nav_list 업데이트를 위한 호출
//         updateDivIndex();
//     });
// </script> -->
// <!-- 스크롤 휠 -->
// <!-- <script>
//     $(function () {
//         var $divs = $('.page');
//         var div = $divs.toArray().findIndex(div => $(div).offset().top >= $(window).scrollTop());
//         div = Math.max(div, 0);

//         var $scrollMenuLinks = $('.scroll-menu .nav>li>a, .tel');
//         var $telImg = $('.tel img');
//         var $sideNav = $('.side_nav ul a');

//         $(window).on('mousewheel DOMMouseScroll', function (e) {
//             // CSS scroll-behavior 속성을 auto로 변경
//             $('html').css('scroll-behavior', 'auto');

//             if (!$(e.target).closest('.talk_box_big').length) {
//                 var delta = e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0 ? -1 : 1;

//                 div += delta;
//                 div = Math.max(0, Math.min(div, $divs.length - 1));

//                 if (div >= 2 && div <= 5) {
//                     $scrollMenuLinks.css('color', '#333');
//                     $sideNav.css('color', '#999');
//                     $telImg.css('filter', 'invert(1)');

//                     if (div == 4) {
//                         $sideNav.css('color', '#fff');
//                     } else {
//                         $sideNav.css('color', '#999');
//                     }
//                 }
//                 else {
//                     $scrollMenuLinks.css('color', '#fff');
//                     $sideNav.css('color', '#fff');
//                     $telImg.css('filter', 'invert(0)');
//                 }

//                 $('html,body').stop().animate({
//                     scrollTop: $divs.eq(div).offset().top
//                 }, 500, function () {
//                     // 애니메이션이 완료된 후 scroll-behavior 속성을 다시 smooth로 복원
//                     $('html').css('scroll-behavior', 'smooth');
//                 });
//                 return false;
//             }
//         });
//     });
// </script> -->