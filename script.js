// すべてのギャラリー親を取得して、1組ずつ初期化
document.querySelectorAll('.section__point__design__works__gallery').forEach((gallery) => {
const thumbsEl = gallery.querySelector('.thumbs-swiper');
const mainEl   = gallery.querySelector('.main-swiper');
if (!thumbsEl || !mainEl) return;

// サムネ（2×3 グリッド / SP時は3×2）
const thumbs = new Swiper(thumbsEl, {
    slidesPerView: 3, //縦に3列
    grid: { rows: 2, fill: 'row' }, //横に2列
    watchSlidesProgress: true,
    slideToClickedSlide: true,
    allowTouchMove: false, // サムネはドラッグ不要なら false
    spaceBetween: 10,
    breakpoints: {
    1240: { slidesPerView: 2, grid: { rows: 3 } }, 
    }
});

// メイン
const main = new Swiper(mainEl, {
    allowTouchMove: false, // メインもドラッグで動かしたいなら true
    speed: 0,
    thumbs: { swiper: thumbs }
});
});


const menu = document.querySelector('#header__menu');
const btn  = document.querySelector('#hamburger');

    function setOpen(open){
    menu.classList.toggle('open', open);
    btn.classList.toggle('open', open);
    document.body.classList.toggle('no-scroll', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    // ボタンで開閉
    btn.addEventListener('click', () => setOpen(!menu.classList.contains('open')));

    // ① メニュー内リンクをクリックしたら閉じる
    menu.addEventListener('click', (e) => {
    if (e.target.closest('a')) setOpen(false);
    });

    // ② ESCキーで閉じる（任意）
    document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
    });

    // ③ PC幅へリサイズ復帰で閉じる（任意）
    const mq = window.matchMedia('(min-width: 961px)');
    mq.addEventListener('change', (e) => { if (e.matches) setOpen(false); });



(function () {
// ページのDOMが準備できてから実行
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initToggleButtons);
} else {
    initToggleButtons();
}

function initToggleButtons() {
    // 複数ブロックがあっても全部対応：.section__form__option をグループとして扱う
    var groups = document.querySelectorAll(".section__form__option");
    if (!groups || groups.length === 0) return;

    for (var g = 0; g < groups.length; g++) {
    setUpGroup(groups[g]);
    }
}

function setUpGroup(groupEl) {
    // このグループ内の対象ボタン
    var buttons = groupEl.querySelectorAll(".section__form__option__object");
    if (!buttons || buttons.length === 0) return;

    for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function (event) {
        var clicked = event.currentTarget;

        // いったん全ボタンを未選択へ
        for (var j = 0; j < buttons.length; j++) {
        buttons[j].classList.remove("is-active");
        buttons[j].setAttribute("aria-pressed", "false");
        }

        // クリックしたボタンだけ選択状態へ
        clicked.classList.add("is-active");
        clicked.setAttribute("aria-pressed", "true");
    });
    }
}
})();

$(function(){
    const $slider = $('.js-works-slider');
    const $bar = $('.section__works__progress__bar');

    // slick 初期化
    $slider.on('init', function(event, slick){
        updateProgress(0, slick);
    });

    $slider.slick({
        slidesToShow: 3,          // PCは3枚見せ
        slidesToScroll: 1,
        infinite: true,          // 進捗計算を簡単にするため非無限
        autoplay:true,
        arrows: false,
        dots: false,
        autoplaySpeed: 0,          // “間隔ゼロ”で連続
        speed:5000,
        cssEase: 'linear',         // 直線的に滑り続ける
        pauseOnHover: false,
        pauseOnFocus: false,
        swipe: false,              // 触って止まるのを避けたいなら

        responsive: [
        { breakpoint: 1080, settings: { slidesToShow: 2 } },
        { breakpoint: 768,  settings: { slidesToShow: 1 } }
        ]
    });
})
