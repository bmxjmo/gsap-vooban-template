gsap.registerPlugin(ScrollTrigger);

// tell ScrollTrigger to use these proxy methods for the element data-scroll-container since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy('[data-scroll-container]', {
    // we don't have to define a scrollLeft because we're only scrolling vertically.    
    scrollTop(value) {
        return arguments.length ? Scrollbar.scrollTo(value, 0, 0) : Scrollbar.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    pinType: document.querySelector('[data-scroll-container]').style.transform ? "transform" : "fixed"
});
/*
LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So 
to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if 
there's a transform applied to the container.
*/

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
const Scrollbar = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
Scrollbar.on("scroll", ScrollTrigger.update);

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => Scrollbar.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

// to solve the resize bug
window.addEventListener('resize', () => location.assign(location.href));

var tl = gsap.timeline({
scrollTrigger: {
  trigger: 'body',
  scroller: '[data-scroll-container]',
  scrub: true,
  pin: true,
  start: 'top top',
  end: '100%'
}
});

tl.to('.headline span', 2, {
    x: 200,
    duration: 2,
    stagger: {
        grid: [1,6],
        from: 'random',
        amount: 1
    }
});
