/*
(function () {
    const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true
    });
})();
*/

gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const scrollbar = new LocomotiveScroll({
el: document.querySelector('[data-scroll-container]'),
smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
scrollbar.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy('[data-scroll-container]', {
    scrollTop(value) {
    return arguments.length ? scrollbar.scrollTo(value, 0, 0) : scrollbar.scroll.instance.scroll.y;
}, // we don't have to define a scrollLeft because we're only scrolling vertically.
getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
},
// LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
pinType: document.querySelector('[data-scroll-container]').style.transform ? "transform" : "fixed"
});


/*
gsap.from(".line-1", {
scrollTrigger: {
trigger: ".line-1",
scroller: ".smooth-scroll",
scrub: true,
start: "top bottom",
end: "top top"
},
scaleX: 0,
transformOrigin: "left center", 
ease: "none"
});


gsap.from(".line-2", {
scrollTrigger: {
trigger: ".orange",
scroller: ".smooth-scroll",
scrub: true,
pin: true,
start: "top top",
end: "+=100%"
},
scaleX: 0, 
transformOrigin: "left center", 
ease: "none"
});
*/

var tl = gsap.timeline({
scrollTrigger: {
  trigger: '.topbar',
  scroller: '[data-scroll-container]',
  scrub: true,
  pin: true,
  start: 'top top',
  end: '+=100%'
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

/*
tl.from(".purple p", {scale: 0.3, rotation:45, autoAlpha: 0, ease: "power2"})
.from(".line-3", {scaleX: 0, transformOrigin: "left center", ease: "none"}, 0)
.to(".purple", {backgroundColor: "#28a92b"}, 0);
*/


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => scrollbar.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
