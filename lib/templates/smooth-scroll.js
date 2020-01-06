import LocomotiveScroll from 'locomotive-scroll'
// import LocomotiveScroll from '../vendor/locomotive-scroll.js'
import _ from 'lodash'
import Storage from './storage'

export default class SmoothScroll {
  constructor (ctx, options) {
    this.ctx = ctx
    this.options = options
    this.smoothScroll = null

    // Storage & State
    const storage = new Storage(ctx, options)

    this.$storage = storage
    this.$state = storage.state
  }

  init () {
    if (this.smoothScroll === null) {
      this.smoothScroll = new LocomotiveScroll({
        el: document.querySelector('#js-scroll'),
        smooth: this.options.enableSmooth
      })

      if (this.options.attachScrollListener) {
        // @TODO Set custom hook function somehow
        this.$smoothScroll.on('scroll', _.throttle(this.onLmsScroll, 150))
      }

      if (this.options.attachResizeListener) {
        window.addEventListener(
          'resize',
          _.debounce(
            function () {
              this.$smoothScroll.update()
            }.bind(this),
            100
          )
        )
      }
    } else {
      // this.smoothScroll.update()
      this.smoothScroll = new LocomotiveScroll({
        el: document.querySelector('#js-scroll'),
        smooth: this.options.enableSmooth
      })
    }
  }

  scrollTo (position, offset, behavior) {
    if (this.smoothScroll != null) {
      this.smoothScroll.scrollTo(position, offset, behavior)
    }
  }

  update () {
    this.smoothScroll.update()
  }

  destroy () {
    // since we're using .update() right now it seems to
  // work fine without reinit smooth scroll
  // if any bad issues appear remove .update above
  // reinit smoothScroll and use .destroy() below
    if (this.smoothScroll !== null) {
      this.smoothScroll.destroy()
      // window.removeEventListener('resize', this.onLmsResize)
    }
  }
}
