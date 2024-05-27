// page2
document.addEventListener("DOMContentLoaded", function() {
    // 각 층별 th 요소를 선택
    var floorElements = document.querySelectorAll('.floor_table th, .floor_table2 th');
    
    // 각 층별 th 요소에 클릭 이벤트 리스너 추가
    floorElements.forEach(function(elem) {
        elem.addEventListener('click', function() {
            // 모든 now_floor 클래스 제거
            floorElements.forEach(function(el) {
                el.classList.remove('now_floor');
            });
            // 클릭된 요소에 now_floor 클래스 추가
            this.classList.add('now_floor');
            
            // 모든 now_box 클래스 제거
            var allBoxes = document.querySelectorAll('.floor_box_right > div');
            allBoxes.forEach(function(box) {
                box.classList.remove('now_box');
            });
            
            // 클릭된 th 태그의 클래스 이름 기반으로 now_box 클래스 추가할 요소 결정
            var classList = this.parentElement.className.split('_')[0]; // 예: floor1_0에서 floor1 추출
            var targetBox = document.querySelector('.' + classList); // 예: .floor1
            if(targetBox) {
                targetBox.classList.add('now_box');
            }
        });
    });
});


//page3
// $(document).ready(function(){
//     // 초기 상태 설정
//     $('.scroll_inside').css('opacity', '1');
//     $('.scroll_outside1').css('opacity', '0');

//     $('.personal_box_scroll').scroll(function(){
//         var div = $(this);
//         var scrollTop = div.scrollTop();
//         var scrollHeight = div[0].scrollHeight;
//         var outerHeight = div.outerHeight();
//         var bottomDistance = scrollHeight - (scrollTop + outerHeight);

//         // 스크롤이 하단 10%에 도달했는지 확인
//         var isBottom = bottomDistance <= (scrollHeight * 0.1);

//         if (scrollTop === 0) {
//             // 스크롤이 상단에 도달했을 때
//             $('.scroll_outside1').css('opacity', '1');
//             $('.scroll_inside').css('opacity', '0');
//         } else if (isBottom) {
//             // 스크롤이 하단 10% 내에 도달했을 때
//             $('.scroll_outside1').css('opacity', '1');
//             $('.scroll_inside').css('opacity', '0');
//         } 
//         // else {
//         //     // 그 외의 경우에는 scroll_outside1을 숨김
//         //     $('.scroll_outside1').css('opacity', '0');
//         //     // 여기서 scroll_inside의 opacity를 변경하고 싶지 않다면 아래 줄을 제거하세요.
//         //     $('.scroll_inside').css('opacity', '0');
//         // }
//     });
// });


$(document).ready(function() {
    $('.personal_room').each(function() { // 각각의 personal_room 요소를 순회
        var $this = $(this); // 현재 personal_room 요소
        var slideIndex = 0; // 현재 이미지 인덱스
        var slideWidth = 640; // 이미지 너비
        var slideCount = $this.find('.room_img_box img').length; // 현재 personal_room 내의 이미지 개수
        
        // 오른쪽 버튼 클릭 이벤트
        $this.find('.right_btn').click(function() {
            slideIndex++; // 다음 이미지로 인덱스 증가
            if (slideIndex >= slideCount) { // 마지막 이미지를 넘어서면 첫 번째 이미지로
                slideIndex = 0;
            }
            $this.find('.room_img_box').animate({
                marginLeft: -(slideIndex * slideWidth) // 왼쪽으로 이미지 너비만큼 이동
            }, 400); // 애니메이션 지속 시간
        });
        
        // 왼쪽 버튼 클릭 이벤트
        $this.find('.left_btn').click(function() {
            slideIndex--; // 이전 이미지로 인덱스 감소
            if (slideIndex < 0) { // 첫 번째 이미지를 넘어서면 마지막 이미지로
                slideIndex = slideCount - 1;
            }
            $this.find('.room_img_box').animate({
                marginLeft: -(slideIndex * slideWidth) // 왼쪽으로 이미지 너비만큼 이동
            }, 400); // 애니메이션 지속 시간
        });
    });
});

//page4
//page4 공용공간
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
//page4 공용공간 흐린 배경
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