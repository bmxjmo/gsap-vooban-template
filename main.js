
gsap.from(".headline span", 2, {
	scale: 1, 
	y: 200,
	x: -800,
	opacity: 1,
	yoyo: false, 
	repeat: 0, 
	ease: "Power2.easeInOut",
	delay: 1,
	duration: 0.6,
	stagger: {
		amount: 0.6, 
		grid: [1,6],
		from: 0
	}
  });



const headlines = gsap.utils.toArray('.headline span');
headlines.forEach(span => {
  gsap.to(span, { 
    x: 100,
    immediateRender: false,
    scrollTrigger: {
      trigger: span,
      scrub: true
    }
  })
});
/*
*/
