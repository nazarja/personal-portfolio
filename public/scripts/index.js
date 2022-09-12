{
    const body = document.body;

    const MathUtils = {
        map: (x, a, b, c, d) => (x - a) * (d - c) / (b - a) + c,
        lerp: (a, b, n) => (1 - n) * a + n * b
    };

    let winsize;
    const calcWinsize = () => winsize = { width: window.innerWidth, height: window.innerHeight };
    calcWinsize();

    window.addEventListener('resize', calcWinsize);

    let docScroll;
    const getPageYScroll = () => docScroll = window.pageYOffset || document.documentElement.scrollTop;
    window.addEventListener('scroll', getPageYScroll);

    class Item {
        constructor(el) {
            this.DOM = { el: el };
            this.DOM.image = this.DOM.el.querySelector('.item__img');
            this.renderedStyles = {
                innerTranslationY: {
                    previous: 0,
                    current: 0,
                    ease: 0.1,
                    maxValue: parseInt(getComputedStyle(this.DOM.image).getPropertyValue('--overflow'), 10),
                    setValue: () => {
                        const maxValue = this.renderedStyles.innerTranslationY.maxValue;
                        const minValue = -1 * maxValue;
                        return Math.max(Math.min(MathUtils.map(this.props.top - docScroll, winsize.height, -1 * this.props.height, minValue, maxValue), maxValue), minValue)
                    }
                }
            };
            this.update();
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => this.isVisible = entry.intersectionRatio > 0);
            });
            this.observer.observe(this.DOM.el);
            this.initEvents();
        }
        update() {
            this.getSize();
            for (const key in this.renderedStyles) {
                this.renderedStyles[key].current = this.renderedStyles[key].previous = this.renderedStyles[key].setValue();
            }
            this.layout();
        }
        getSize() {
            const rect = this.DOM.el.getBoundingClientRect();
            this.props = {
                height: rect.height,
                top: docScroll + rect.top
            }
        }
        initEvents() {
            window.addEventListener('resize', () => this.resize());
        }
        resize() {
            this.update();
        }
        render() {
            for (const key in this.renderedStyles) {
                this.renderedStyles[key].current = this.renderedStyles[key].setValue();
                this.renderedStyles[key].previous = MathUtils.lerp(this.renderedStyles[key].previous, this.renderedStyles[key].current, this.renderedStyles[key].ease);
            }
            this.layout();
        }
        layout() {
            this.DOM.image.style.transform = `translate3d(0,${this.renderedStyles.innerTranslationY.previous}px,0)`;
        }
    }

    class SmoothScroll {
        constructor() {
            this.DOM = { main: document.querySelector('main') };
            this.DOM.scrollable = this.DOM.main.querySelector('div[data-scroll]');
            this.items = [];
            [...this.DOM.main.querySelectorAll('.content > .item')].forEach(item => this.items.push(new Item(item)));
            this.renderedStyles = {
                translationY: {
                    previous: 0,
                    current: 0,
                    ease: 0.1,
                    setValue: () => docScroll
                }
            };
            this.setSize();
            this.update();
            this.style();
            this.initEvents();
            requestAnimationFrame(() => this.render());
        }
        update() {

            for (const key in this.renderedStyles) {
                this.renderedStyles[key].current = this.renderedStyles[key].previous = this.renderedStyles[key].setValue();
            }
            this.layout();
        }
        layout() {
            this.DOM.scrollable.style.transform = `translate3d(0,${-1 * this.renderedStyles.translationY.previous}px,0)`;
        }
        setSize() {
            if (!window.location.href.includes('info')) {
                body.style.height = `${this.DOM.scrollable.scrollHeight}px`;
            }
        }
        style() {
            this.DOM.main.style.position = 'fixed';
            this.DOM.main.style.width = this.DOM.main.style.height = '100%';
            this.DOM.main.style.top = this.DOM.main.style.left = 0;
            this.DOM.main.style.overflow = 'hidden';
        }
        initEvents() {
            window.addEventListener('resize', () => this.setSize());
        }
        render() {

            for (const key in this.renderedStyles) {
                this.renderedStyles[key].current = this.renderedStyles[key].setValue();
                this.renderedStyles[key].previous = MathUtils.lerp(this.renderedStyles[key].previous, this.renderedStyles[key].current, this.renderedStyles[key].ease);
            }

            this.layout();

            for (const item of this.items) {
                if (item.isVisible) {
                    item.render();
                }
            }

            requestAnimationFrame(() => this.render());
        }
    }

    /********** Preload stuff **********/
    const preloadImages = () => {
        return new Promise((resolve, reject) => {
            imagesLoaded(document.querySelectorAll('.item__img'), { background: true }, resolve);
        });
    };

    preloadImages().then(() => {
        setTimeout(() => removeLoader(), 2000);
        getPageYScroll();
        new SmoothScroll();
    });
}

