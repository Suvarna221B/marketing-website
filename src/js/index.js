import { HtoVScroll } from './horizontal-scroll' 

(()=>{
    console.log("hi")
    let hvscroll = new HtoVScroll({
        container: document.getElementById('slide'),
        slideCount: document.getElementsByClassName('slide').length,
        callback: c => console.log(c)
    });

    window.addEventListener('wheel', e => {
        hvscroll.onScroll(e.deltaY)
    },false)

    // drag
    // document.getElementsByClassName('slide-container')[0].addEventListener('mousedown',e => hvscroll.onMouseDown(e),false);

})()

