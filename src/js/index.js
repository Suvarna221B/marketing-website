import { HtoVScroll } from './horizontal-scroll' 

(()=>{
    console.log("hi")
    let hvscroll = new HtoVScroll({
        container: document.getElementById('slide'),
        slideCount: document.getElementsByClassName('slide').length,
        callback: c => console.log(c)
    });

    window.addEventListener('wheel', e => {
        var windowWidth = window.innerWidth
        var sign = ( e.deltaY / Math.abs(e.deltaY) )
        hvscroll.onScroll(windowWidth * sign)
    },false)

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    


    /* flickety testimonial*/
    var flkty = new Flickity( '.main-gallery', {
        cellAlign: 'left',
        contain: true,
        wrapAround: true,
        prevNextButtons: false,
        autoPlay: 1500,
        prevNextButtons: true
    });

    // drag
    // document.getElementsByClassName('slide-container')[0].addEventListener('mousedown',e => hvscroll.onMouseDown(e),false);

})()

