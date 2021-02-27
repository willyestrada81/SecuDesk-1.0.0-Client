import { EventEmitter } from 'events'

const _store = {
  menuVisible: false
}

class Store extends EventEmitter {
  toggleSidebar () {
    _store.menuVisible = !_store.menuVisible
  }

  getMenuState () {
    return _store.menuVisible
  }

  addChangeListener (callback) {
  }

  removeChangeListener (callback) {
  }
}

export default new Store()
