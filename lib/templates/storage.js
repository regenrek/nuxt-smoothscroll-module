import Vue from 'vue'
import getProp from 'dotprop'

export default class Storage {
  constructor (ctx, options) {
    this.ctx = ctx
    this.options = options

    this._initState()
  }

  _initState () {
    // Private state is suitable to keep information not being exposed to Vuex store
    // This helps prevent stealing token from SSR response HTML
    Vue.set(this, '_state', {})

    // Use vuex for local state's if possible
    this._useVuex = this.options.vuex && this.ctx.store

    if (this._useVuex) {
      const storeModule = {
        namespaced: true,
        state: () => this.options.initialState,
        mutations: {
          SET (state, payload) {
            Vue.set(state, payload.key, payload.value)
          }
        }
      }

      this.ctx.store.registerModule(this.options.vuex.namespace, storeModule, {
        preserveState: Boolean(this.ctx.store.state[this.options.vuex.namespace])
      })

      this.state = this.ctx.store.state[this.options.vuex.namespace]
    } else {
      Vue.set(this, 'state', {})
    }
  }

  setState (key, value) {
    if (key[0] === '_') {
      Vue.set(this._state, key, value)
    } else if (this._useVuex) {
      this.ctx.store.commit(this.options.vuex.namespace + '/SET', {
        key,
        value
      })
    } else {
      Vue.set(this.state, key, value)
    }

    return value
  }

  getState (key) {
    if (key[0] !== '_') {
      return this.state[key]
    } else {
      return this._state[key]
    }
  }

  watchState (key, fn) {
    if (this._useVuex) {
      return this.ctx.store.watch(
        state => getProp(state[this.options.vuex.namespace], key),
        fn
      )
    }
  }

  removeState (key) {
    this.setState(key, undefined)
  }
}
