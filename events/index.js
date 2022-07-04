class EventsEmitter {
  constructor() {
    this._events = {};
  }
  emit(e, x) {
    if (!this._events[e]) {
      throw new Error(`Cant emit event, ${e} does not exist`);
    }
    this._events[e].forEach(f => f(x));
  }
  on(e, listener) {
    if (!this._events[e]) {
      this._events[e] = [];
    }
    this._events[e].push(listener);
  }
  remove(e, listenerToRemove) {
    if (!this._events[e]) {
      throw new Error("Cant remove listener, none exists");
    }
    this._events[e] = this._events[e].filter(l => l !== listenerToRemove);
  }
}

export default EventsEmitter;
