const EventsEmitter = {
  events: {},
  dispatch: function (e, x) {
    if (!this.events[e]) {
      return;
    }
    this.events[e].forEach(f => f(x));
  },
  subscribe: function (e, c) {
    if (!this.events[e]) {
      this.events[e] = [];
    }
    this.events[e].push(c);
  }
};

export default EventsEmitter;
