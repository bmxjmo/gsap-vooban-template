'use strict';

export const start = () => {
    gsap.to('.page', 0.5, {
        opacity: 1,
        duration: 1,
        delay: 0.2,
        onStart: headlines
    });
}

export const headlines = () => {
    document.querySelector('#loader').remove();
    gsap.set('.headline span', {opacity: 1});
    gsap.from('.headline span', 2, {
        scale: 1, 
        y: 200,
        x: -800,
        ease: 'Power2.easeInOut',
        delay: 0,
        duration: 0.6,
        stagger: {
            grid: [1,6],
            from: 0,
            amount: 0.6
        }
    });
}
