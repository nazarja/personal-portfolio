const globalHeight = (document.height !== undefined) ? document.height : document.body.offsetHeight;

/*==========================
    remove intro loader
==========================*/

const removeLoader = () => {
    const loader = document.querySelector('#loader');
    const title = document.querySelector('#loader p');
    const tl = new TimelineLite();

    tl.to(title, { opacity: 0, duration: .5 });
    tl.to(loader, { height: 0, ease: "power4.inOut", duration: 1 });
}

/*==========================
    show fullscreen image
==========================*/

const imageFullScreen = (filename) => {
    const fullscreen = document.querySelector('#fullscreen-image');
    const img = document.querySelector('#fullscreen-image img');
    const p = document.querySelector('#fullscreen-image p');
    img.src = `/images/${filename}`;

    filename = filename.replace('-', ' ').slice(0, filename.indexOf('.'));
    filename = filename.split(' ').map(word => word.replace(word[0], word[0].toUpperCase())).join(' ');
    p.innerText = filename;

    document.title = `Artwork | ${filename}`;
    document.body.style.overflow = 'hidden';

    const tl = new TimelineLite();
    tl.to(fullscreen, { display: 'block', height: '100vh', ease: 'power4.inOut', duration: .75 });
    tl.to(img, { opacity: 1, ease: "power4.inOut", duration: .5 });
    tl.to(p, { display: 'block', bottom: '3vh', ease: 'power4.inOut', duration: .5 });

    fullscreen.onclick = () => {
        document.title = 'Full Stack Developer Portfolio | Sean Murphy';
        document.body.style.overflow = 'initial';
        document.body.style.overflowX = 'hidden';
        tl.reverse();
    }
};

// listen for image click
const imageListeners = document.querySelectorAll('[data-name]')
imageListeners.forEach(image => image.addEventListener('click', event => {
    imageFullScreen(event.target.dataset.name);
}));


/*==========================
    Show Info Page
==========================*/

const navigationListener = document.querySelector('#show-info');
navigationListener.addEventListener('click', event => showInfo(event));

function showInfo(event) {
    let isInfo = true;
    if (event) event.preventDefault();
    const back = document.querySelector('#back');
    const info = document.querySelector('#info');
    const index = document.querySelector('#index');
    const title = document.querySelector('.title');
    const paragraph = document.querySelector('.paragraph');
    const nav = document.querySelector('#navigation-info');

    const tl = new TimelineLite();
    tl.to(index, { opacity: 0, ease: 'power4.inOut', duration: .75 });
    tl.fromTo([info, nav], { opacity: '0' }, { opacity: '1', ease: 'power4.inOut', duration: 0 })
    tl.fromTo(info, { right: '-100vw' }, { right: '0', ease: 'power4.inOut', duration: 1.2 });
    tl.fromTo(nav, { left: '150%' }, { left: '50%', ease: 'power4.inOut', duration: 1.2 }, '-=1.2');
    tl.fromTo([title, paragraph], { opacity: 0, y: '300' }, { opacity: 1, y: '0', ease: 'power3.inOut', duration: .75 });

    document.title = 'Info | Sean Murphy';
    if (event) document.body.style.height = info.style.height;
    window.history.pushState('Info | Contact', 'Info', '/info')
    window.scrollTo(0, 0);

    function onBack() {
        if (isInfo) {
            document.title = 'Full Stack Developer Portfolio | Sean Murphy';
            window.history.pushState('Full Stack Developer Portfolio | Sean Murphy', 'Index', '/');
            document.body.style.height = globalHeight + 'px';
            document.body.style.overflow = 'initial';
            document.body.style.overflowX = 'hidden';
            TweenLite.fromTo([info, nav], { opacity: '1' }, { opacity: '0', ease: 'power4.inOut', duration: .5 });
            tl.reverse();
            isInfo = false;
        }
    }

    back.onclick = () => onBack();
    window.onpopstate = () => onBack();
};

// check if info page was loaded first
if (window.location.href.includes('info')) {
    window.addEventListener("load", () => {
        setTimeout(() => document.querySelector('#show-info').click(), 1000)
    });
}

/*==========================
    scroll behaviour
==========================*/

const smoothScrollInfo = () => {
    const html = document.documentElement;
    const body = document.body;
    const info = document.querySelector('#info');
    let requestId = null;

    const scroller = {
        target: document.querySelector("#info"),
        ease: 0.05,
        endY: 0,
        y: 0,
        resizeRequest: 1,
        scrollRequest: 0,
    };

    TweenLite.set(scroller.target, {
        rotation: 0.01,
        force3D: true
    });

    function onLoad() {
        updateScroller();
        window.focus();
        window.addEventListener("resize", onResize);
        document.addEventListener("scroll", onScroll);
    };

    function updateScroller() {
        const resized = scroller.resizeRequest > 0;
        if (resized) {
            if (window.location.href.includes('info')) {
                var height = scroller.target.clientHeight;
                body.style.height = height + "px";
                scroller.resizeRequest = 0;
            }
        };

        const scrollY = window.pageYOffset || html.scrollTop || body.scrollTop || 0;
        scroller.endY = scrollY;
        scroller.y += (scrollY - scroller.y) * scroller.ease;

        if (Math.abs(scrollY - scroller.y) < 0.05 || resized) {
            scroller.y = scrollY;
            scroller.scrollRequest = 0;
        };

        TweenLite.set(scroller.target, {
            y: -scroller.y
        });

        requestId = scroller.scrollRequest > 0 ? requestAnimationFrame(updateScroller) : null;
    };

    function onScroll() {
        scroller.scrollRequest++;
        if (!requestId) {
            requestId = requestAnimationFrame(updateScroller);
        };
    };

    function onResize() {
        scroller.resizeRequest++;
        if (!requestId) {
            requestId = requestAnimationFrame(updateScroller);
        };
    };

    window.addEventListener("load", onLoad);
}
smoothScrollInfo();

/*==========================
    Viewport animations
==========================*/

function animateInfoElements() {
    gsap.registerPlugin(ScrollTrigger);

    const _0 = ScrollTrigger.create({
        trigger: '.info-animate-0',
        onEnter: function () {
            gsap.fromTo('.info-animate-0', { x: 0, y: 100, autoAlpha: 0, opacity: 0 }, {
                duration: 2.5,
                x: 0,
                y: 0,
                opacity: 1,
                autoAlpha: 1,
                ease: "expo",
                overwrite: "auto",
            });
        }
    });

    const _1 = ScrollTrigger.create({
        trigger: '.info-trigger-1',
        onEnter: function () {
            gsap.fromTo('.info-animate-1', { x: 0, y: 150, autoAlpha: 0, opacity: 0 }, {
                duration: 2.5,
                x: 0,
                y: 0,
                opacity: 1,
                autoAlpha: 1,
                ease: "expo",
                overwrite: "auto",
            });
        }
    });
}
animateInfoElements();

/*==========================
    Hover link effect
==========================*/

function linkEffect() {
    const links = document.querySelectorAll('.link-effect');

    const animateLetters = (link) => {
        const letters = [...link.querySelectorAll('span')];

        TweenMax.killTweensOf(letters);
        TweenMax.set(letters, { opacity: 0 });
        TweenMax.staggerTo(letters, 0.1, {
            ease: Expo.easeOut,
            startAt: { y: '50%' },
            y: '0%',
            opacity: 1
        }, 0.06);
    };

    links.forEach(link => (link.onmouseenter = () => animateLetters(link)))
}
linkEffect();
