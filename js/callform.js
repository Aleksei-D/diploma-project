const btnCallFormHeaderEl = document.getElementById('js-callform-header'),
      btnCallFormFooterEl = document.getElementById('js-callform-footer'),
      btnCallFormCaseworkEl = document.getElementById('js-callform-casework'),  
      telInputEl = document.getElementById('js-tel-input'),
      formOverlayEl = document.getElementById('js-overlay-form'),
      formEl = document.getElementById('js-form'),
      btnCloseFormEl = document.getElementById('js-btnclose-form'),
      messageOverlayEl = document.getElementById('js-overlay-message'),
      messageEl = document.getElementById('js-message'),
      btnCloseMessageEl = document.getElementById('js-btnclose-message');

let focusBtnEl;

function onOpenFormClick(e) {
    document.body.classList.add('body-form_locked');
    if (!focusBtnEl) {focusBtnEl = e.target;}
    
    setTimeout(function() { btnCloseFormEl.focus(); }, 100);
};

function onCloseFormClick() {    
    document.body.classList.remove('body-form_locked');
    focusBtnEl.focus();
    focusBtnEl = undefined;
};

function onCloseMessageClick() {    
    document.body.classList.remove('body-message_locked');
};

document.addEventListener('keydown', function (e) {
    if (e.keyCode === 27  && document.body.classList.contains('body-form_locked')) {
        onCloseFormClick();
        formEl.reset();
    }
});

formOverlayEl.addEventListener('click', function(e) {
    if (document.body.classList.contains('body-form_locked') && !formEl.contains(e.target)) {
        onCloseFormClick();
        formEl.reset();
    };
});

document.addEventListener('keydown', function (e) {
    if (e.keyCode === 27  && document.body.classList.contains('body-message_locked')) {
        onCloseMessageClick();
    }
});


messageOverlayEl.addEventListener('click', function(e) {
    if (document.body.classList.contains('body-message_locked') && !messageEl.contains(e.target)) {
        onCloseMessageClick();
    };
});

function onInputTelKeypress(e) {
    if(!/\d/.test(e.key)) {
        e.preventDefault();
        telInputEl.classList.add('form__input_error');
    }
}

function onInputTelFocus() {
    if(!/^\+\d*$/.test(telInputEl.value))
    telInputEl.value = '+7';
    telInputEl.classList.remove('form__input_error');
}

window.addEventListener('load', function(){
    function sendData(){
        const XHR = new XMLHttpRequest();
  
        const FD = new FormData(formEl);
  
        XHR.addEventListener('load', function(event){
        document.body.classList.add('body-message_locked');
            setTimeout(function() { 
                document.body.classList.remove('body-message_locked');
            }, 5000);
        });
  
        XHR.addEventListener('error', function(event){ 
            alert('УПСсс! Что-то пошло не так((');
        });
  
        XHR.open('POST', 'https://mycis.ru/php/mail.php');
  
        XHR.send(FD);
        }
   
    formEl.addEventListener('submit', function(event){
        event.preventDefault();
  
        sendData();
        onCloseFormClick();
        formEl.reset();
    });
});

telInputEl.addEventListener('focus', onInputTelFocus);
telInputEl.addEventListener('keypress', onInputTelKeypress);
btnCloseFormEl.addEventListener('click', onCloseFormClick);
btnCallFormHeaderEl.addEventListener('click', onOpenFormClick);
btnCallFormFooterEl.addEventListener('click', onOpenFormClick);
btnCallFormCaseworkEl.addEventListener('click', onOpenFormClick);
btnCloseMessageEl.addEventListener('click', onCloseMessageClick);
