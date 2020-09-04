const btnScrollService = document.getElementById('js-btn-service'),
      btnScrollPrice = document.getElementById('js-btn-price');

      btnScrollService.addEventListener('click', function() {
    document.getElementById('js-services').scrollIntoView({
        behavior: 'smooth', 
        block: 'start'
    });
});

btnScrollPrice.addEventListener('click', function() {
    document.getElementById('js-price').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});
