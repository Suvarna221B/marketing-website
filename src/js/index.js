import { HtoVScroll } from './horizontal-scroll' 

var scroll = true;

(()=>{
    let hvscroll = new HtoVScroll({
        container: document.getElementById('slide'),
        slideCount: document.getElementsByClassName('slide').length,
        callback: c => console.log(c)
    });

    let updateAnchor = (index)=>{
        var navbar = document.getElementById('navid')
        var links = Array.from(navbar.children)
        links.forEach(element => {
            var anchor = element.children[0].children[0]
            var classList = anchor.getAttribute("class")
            if(classList!=null){
                classList = classList.split().filter((e)=>{
                    if(e=="")
                        return false
                    return true
                })
                var index = Array.prototype.indexOf.call(classList, "disable-click")
                if(index != -1){
                    classList.splice(index , 1)
                    classList = classList.join(" ")
                    anchor.setAttribute("class", classList)
                }
            }
        });
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
            console.log(classList)
            classList.push("disable-click")
            classList = classList.join(" ")
            anchor.setAttribute("class", classList)
        }
    }

    window.addEventListener('wheel', e => {
        if(!scroll)
            return
        scroll = false
        setTimeout(()=>{scroll = true}, 750)
        var windowWidth = window.innerWidth
        var sign = ( e.deltaY / Math.abs(e.deltaY) )
        hvscroll.onScroll(windowWidth * sign)
        updateAnchor(hvscroll.currentScrollPosition/windowWidth)
    },false)

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            var windowWidth = window.innerWidth
            var container = this.parentElement.parentElement.parentElement
            var navbarLink = this.parentElement.parentElement
            var index = Array.prototype.indexOf.call(container.children, navbarLink)
            var delta = (index*windowWidth) - hvscroll.currentScrollPosition
            hvscroll.updateScrollPosition(delta)
            updateAnchor(hvscroll.currentScrollPosition/windowWidth)
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

