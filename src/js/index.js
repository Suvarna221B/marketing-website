import { HtoVScroll } from './horizontal-scroll' 


(()=>{

    let scroll = true;

    let hvscroll = new HtoVScroll({
        container: document.getElementById('slide'),
        slideCount: document.getElementsByClassName('slide').length,
        callback: c => {/*if(c){console.log(c)}*/}
    });

    let updateAnchor = (index)=>{
        var navbar = document.getElementById('navid')
        var links = Array.from(navbar.children)
        links.forEach(element => {
            var classNo = index % 2;
            var anchorContainer = element.children[0];
            var newClass = anchorContainer.getAttribute("class").replace("center-mobile-1", "center-mobile-"+classNo)
            newClass = newClass.replace("center-mobile-0", "center-mobile-"+classNo)
            anchorContainer.setAttribute("class", newClass)
            var anchor = element.children[0].children[0]
            var classList = anchor.getAttribute("class")
            if(classList!=null){
                classList = classList.split().filter((e)=>{
                    if(e=="")
                        return false
                    return true
                })
                var i = Array.prototype.indexOf.call(classList, "disable-click")
                if(i != -1){
                    classList.splice(i , 1)
                    classList = classList.join(" ")
                    anchor.setAttribute("class", classList)
                }
            }
        });
        // console.log(index)
        var anchor = navbar.children[index].children[0].children[0]
        var classList = anchor.getAttribute("class")
        if(classList==null)
            anchor.setAttribute("class", "disable-click")
        else{
            classList = classList.split().filter((e)=>{
                if(e=="")
                    return false
                return true
            })
            // console.log(classList)
            classList.push("disable-click")
            classList = classList.join(" ")
            anchor.setAttribute("class", classList)
        }
    }

    window.addEventListener('wheel', e => {
        // console.log(scroll)
        var windowWidth = window.innerWidth
        var sign = e.deltaY == 0 ? 0 : ( e.deltaY / Math.abs(e.deltaY) )
        if(!scroll || hvscroll.index+sign<0 || hvscroll.index+sign>=hvscroll.numberOfSlides)
            return
        scroll = false
        setTimeout(()=>{scroll = true}, 750)
        hvscroll.onScroll(windowWidth * sign)
        console.log(hvscroll)
        hvscroll.indexChange(sign)
        updateAnchor(hvscroll.index)
    },false)

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            var windowWidth = window.innerWidth
            var container = this.parentElement.parentElement.parentElement
            var navbarLink = this.parentElement.parentElement
            var i = Array.prototype.indexOf.call(container.children, navbarLink)
            var delta = (i*windowWidth) - hvscroll.currentScrollPosition
            hvscroll.updateScrollPosition(delta)
            hvscroll.indexChange(i - hvscroll.index)
            updateAnchor(hvscroll.index)
        });
    });
    
    


    /* flickety testimonial*/
    var flkty = new Flickity( '.main-gallery', {
        cellAlign: 'left',
        contain: true,
        wrapAround: true,
        prevNextButtons: false,
        // autoPlay: 2000,
        prevNextButtons: true
    });

    // drag
    // document.getElementsByClassName('slide-container')[0].addEventListener('mousedown',e => hvscroll.onMouseDown(e),false);

})()

