class SiemaWithDots extends Siema {
    addDots() {      
        this.dots = document.createElement('div');
        this.dots.classList.add('slider-controls');
        for(let i = 0; i < this.innerElements.length; i++) {
            const dot = document.createElement('button');

            dot.classList.add('slider-controls__btn');
            dot.setAttribute('aria-label', 'Пример работ №' + (i+1));

            dot.addEventListener('click', () => {
            this.goTo(i);
            })

            this.dots.appendChild(dot);
        }
      
        this.selector.parentNode.insertBefore(this.dots, this.selector.nextSibling);
    }

    updateDots() {      
        for(let i = 0; i < this.dots.querySelectorAll('.slider-controls__btn').length; i++){        
            const addOrRemove = this.currentSlide === i ? 'add' : 'remove';
            this.dots.querySelectorAll('.slider-controls__btn')[i].classList[addOrRemove]('slider-controls__btn_active');
        }
    }
}

const mySiemaWithDots = new SiemaWithDots({
    onInit: function(){
        this.addDots();
        this.updateDots();
    },

    onChange: function(){
        this.updateDots()
    },
    selector: '.worklist',    
    perPage: {
        1201: 3,
        1025: 2,
    },
    duration: 800,
    loop: false
});

document.getElementById('js-prev-btn').addEventListener('click', () => mySiemaWithDots.prev());
document.getElementById('js-next-btn').addEventListener('click', () => mySiemaWithDots.next());
