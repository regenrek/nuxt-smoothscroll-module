module.exports = {

  enableSmooth: true,
  //  -- Vuex Store --

  // @TODO: Maybe not necessary since loco attaches their own listener
  attachResizeListener: false,

  // @TODO: Maybe not necessary since loco attaches their own listener
  attachScrollListener: false,

  vuex: {
    namespace: 'smoothScroll'
  }
}
