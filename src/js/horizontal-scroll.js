
export class HtoVScroll{
    constructor(options){
        this.index = 0;
        this.currentScrollPosition = 0;
        this.container = options.container;
        this.containerWidth = this.container.clientWidth;
        this.numberOfSlides = options.slideCount || null;
        this.direction = options.direction || false;
        this.maxTranslateValue = Math.round((this.numberOfSlides-1)*this.containerWidth/this.numberOfSlides);
        this.onScroll = this.onScroll.bind(this);
        this.slideCallback = options.callback || null;
        this.slideWidth = this.maxTranslateValue/this.numberOfSlides;
    }

    indexChange(s){
        var tmp = this.index + s;
        tmp = Math.max(0, tmp);
        this.index = Math.min(((this.numberOfSlides)-1), tmp);
    }

    trimValue(val){
        let newVal = Math.max(val,0);
        return  Math.min(this.maxTranslateValue,newVal);
    }

    onMouseDown(e){
        console.log('down')
        this.posX = e.clientX;
        document.onmousemove = this.onDrag.bind(this);
        document.onmouseup = this.onMouseUp.bind(this);
    }

    onDrag(e){
        let delta = this.posX - e.clientX; 
        console.log('drag',delta)
        this.updateScrollPosition(delta);
    }

    onMouseUp(e){
        console.log('up')        
        document.onmousemove = null;
        document.onmouseup = null;
    }

    onScroll(deltaY){
        this.updateScrollPosition(deltaY);
    }

    updateScrollPosition(delta){
        let currentSlide = Math.floor(this.currentScrollPosition/this.slideWidth);
        if(this.slideCallback){
            this.slideCallback(currentSlide)
        }
        this.currentScrollPosition+= delta;
        this.currentScrollPosition = this.trimValue(this.currentScrollPosition);
        this.container.style.transform = `translateX(${this.direction?'':'-'}${this.currentScrollPosition}px)`;
    }
}