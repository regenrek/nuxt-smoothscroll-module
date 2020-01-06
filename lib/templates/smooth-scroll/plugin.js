import 'locomotive-scroll/dist/locomotive-scroll.min.css'
import SmoothScroll from './smooth-scroll'

export default (ctx, inject) => {
  const options = JSON.parse('<%= JSON.stringify(options.options) %>')

  const smoothScroll = new SmoothScroll(ctx, options)

  ctx.$smoothScroll = smoothScroll
  inject('smoothScroll', smoothScroll)
}
