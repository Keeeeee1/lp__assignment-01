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
    slidesPerView:1,
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


// jQuery + slick：セグメント内バーをアニメ
$(function () {
  const AUTOPLAY    = 3000;   // 1枚の見せ時間
  const SLIDE_SPEED = 300;    // slickの切替アニメ時間（slickの speed と一致させる）
  const $slider = $('.slick01');
  const $steps  = $('.slider-steps');

  // slick前にinitバインド
  $slider.on('init', function (e, slick) {
    const total = slick.slideCount;

    // セグメントDOM（各seg内に .inner を入れる）
    const $bar = $('<div class="slider-steps__bar" />').css('--steps', total);
    for (let i = 0; i < total; i++) {
      $bar.append('<span class="seg" data-index="'+i+'"><span class="inner"></span></span>');
    }
    const $counter = $('<div class="slider-steps__counter"><span class="num">1</span>/'+ total +'</div>');
    $steps.empty().append($bar, $counter);

    // 初回：index 0 をスタート（切替時間ぶんも足す）
    startSegmentAnim(0, total, AUTOPLAY + SLIDE_SPEED);
  });

  // ここがポイント：切り替え完了後に次のセグメントをスタート
  $slider.on('afterChange', function (e, slick, current) {
    // 確定済みカラー
    const $segs = $steps.find('.seg').removeClass('is-done');
    $segs.each(function(i){ if (i < current) $(this).addClass('is-done'); });

    // カウンタ
    $('.slider-steps__counter .num').text(current + 1);

    // 現在のセグメントを 0→100%（表示時間+切替時間）
    startSegmentAnim(current, slick.slideCount, AUTOPLAY + SLIDE_SPEED);
  });

  // slick 初期化（speed を SLIDE_SPEED と一致させる）
  $slider.slick({
    autoplay: true,
    autoplaySpeed: AUTOPLAY,
    speed: SLIDE_SPEED,
    arrows: false,
    slidesToShow: 1,
    centerMode: true,
    centerPadding: '25%',
    pauseOnHover: false,
    pauseOnFocus: false
  });

  // クリックでジャンプ（任意）
  $steps.on('click', '.seg', function(){
    const idx = Number($(this).data('index'));
    $slider.slick('slickGoTo', idx);
  });

  // 指定 index の .inner を 0→100% で伸ばす
  function startSegmentAnim(index, total, durationMs){
    const $segs   = $steps.find('.seg');
    const $inners = $steps.find('.seg .inner');

    // いったん全て即リセット（transitionを無効化）
    $inners.each(function(){
      this.style.transition = 'none';
      this.style.width = '0%';
    });

    const $targetInner = $segs.eq(index).find('.inner');
    // 次フレームで transition を有効化して伸ばす
    requestAnimationFrame(() => {
      $targetInner.css('--dur', durationMs + 'ms');          // CSSの var(--dur) を上書き
      $targetInner[0].style.transition = `width ${durationMs}ms linear`;
      $targetInner[0].style.width = '100%';
    });
  }
});

