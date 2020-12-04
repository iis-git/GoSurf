import Glide, { Autoplay } from "@glidejs/glide";



const THUMB_SLIDE_CLASSNAME = `glide__slide`;
const ARROWS_CLASSNAME = `glide__arrow`;

const SLIDER_CONFIG = {
    MAIN: {
        type: `slider`,
        perView: 1,
        focusAt: `center`,
        dragThreshold: false,
        throttle: 60
    },
    THUMBNAILS: {
        type: `slider`,
        perView: 0,
        throttle: 60,
        dragThreshold: false,
        gap: 0,
    },
};

export default class CarouselWithThumbs {
    constructor(
        mainSliderSelector,
        thumbsSliderSelector,
        onSlideChange = () => {}
    ) {
        this._mainSliderElement = document.querySelector(mainSliderSelector);
        this._thumbnailsSliderElement = document.querySelector(
            thumbsSliderSelector
        );

        this._handleSlideChange = onSlideChange;

        this._sliderGlideInstance = null;
        this._carouselGlideInstance = null;

        this._arrowClickHandler = this._arrowClickHandler.bind(this);
    }

    _arrowClickHandler(evt) {
        const { glideDir } = evt.currentTarget.dataset;
        this.goToSlide(this._sliderGlideInstance, glideDir).then((result) => {
            if (result === `moved` && this._carouselGlideInstance) {
                this.goToSlide(this._carouselGlideInstance, glideDir);
            }
        });
    }

    changeSlide(index) {
        const goto = `=${index}`;

        this.goToSlide(this._carouselGlideInstance, goto).then(() => {
            this.goToSlide(this._sliderGlideInstance, goto);
        });
    }

    _thumbnailCLickHandler(evt, index) {
        evt.stopPropagation();

        this.changeSlide(index);
    }

    goToSlide(instance, target) {
        return new Promise((resolve) => {
            instance.go(target);
            this._handleSlideChange(instance.index);
            resolve(`moved`);
        });
    }

    _initMainSlider() {
        this._sliderGlideInstance = new Glide(
            this._mainSliderElement,
            SLIDER_CONFIG.MAIN
        );

        this._setMainSliderHandlers();
        this._sliderGlideInstance.mount();
    }

    _setMainSliderHandlers() {
        this._thumbnailsSliderElement
            .querySelectorAll(`.${ARROWS_CLASSNAME}`)
            .forEach((arrow) =>
                arrow.addEventListener(`click`, this._arrowClickHandler)
            );

        this._sliderGlideInstance.on(`run.before`, (evt) =>
            this.goToSlide(this._carouselGlideInstance, evt.direction)
        );
    }

    _setThumbnailsSliderHandlers() {
        const slides = this._thumbnailsSliderElement.querySelectorAll(
            `.${THUMB_SLIDE_CLASSNAME}`
        );
        if (slides.length) {
            slides.forEach((slide, index) =>
                slide.addEventListener(`click`, (evt) =>
                    this._thumbnailCLickHandler(evt, index)
                )
            );
        }
    }

    _initThumbnailsSlider() {
        this._carouselGlideInstance = new Glide(
            this._thumbnailsSliderElement,
            SLIDER_CONFIG.THUMBNAILS
        );

        this._setThumbnailsSliderHandlers();

        this._carouselGlideInstance.mount();
    }

    init() {
        if (this._mainSliderElement && this._thumbnailsSliderElement) {
            this._initMainSlider();
            this._initThumbnailsSlider();
        }
    }
}