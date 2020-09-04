const menuHeaderEl = document.getElementById('js-menulist-header'), // Меню в хедере
      menuFooterEl = document.getElementById('js-menulist-footer'), // Меню в футере
      btnMenuEl = document.getElementById('js-btn-menu'), // кнопка вызова меню в хедере
      sizeScreen = document.documentElement.clientWidth; // размер экрана

let selectedAnchorEl;

// Скрол к секции 
function onAnchorClick(e) {
    e.preventDefault(); // Отменяем стандаратное поведение при клике по ссылке

    if (menuHeaderEl == e.target) {return false} 
    
    const targetClick = e.target,
        blockID = targetClick.getAttribute('href'); // заберем ID из атрибута href у ссылки

    document.querySelector(blockID).scrollIntoView({ // делаем скролл к нужной секции
        behavior: 'smooth',
        block: 'start'
    });

    // если размер дисплея менее 1200, то сворачиваем меню
    if (sizeScreen < '1200') {
        onOpenBtnClick(e);
    }
};

// Появление меню 
function onOpenBtnClick() { 
    btnMenuEl.classList.toggle('btn-menu_toggle');
};

document.addEventListener('click', function(e) {
    if (!menuHeaderEl.contains(e.target) && btnMenuEl.classList.contains('btn-menu_toggle') && !btnMenuEl.contains(e.target)) {
        onOpenBtnClick(e);
    };
});

document.addEventListener('keydown', function(e) {
    if (e.keyCode === 27 && btnMenuEl.classList.contains('btn-menu_toggle')) {
        onOpenBtnClick(e);
    };
});

//Если  размера дисплея становится более чем 1199, то меню сворачивается
window.addEventListener('resize', function(e) {
    if (btnMenuEl.classList.contains('btn-menu_toggle') && sizeScreen > '1199') {
        onOpenBtnClick(e);
    };
});

menuHeaderEl.addEventListener('click', onAnchorClick);
menuFooterEl.addEventListener('click', onAnchorClick);
btnMenuEl.addEventListener('click', onOpenBtnClick);
