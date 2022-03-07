// Eventing file To hanlde all the needed events for a User.

// Type annotation for a function that does not take or return something.
type Callback = () => void;

export class Eventing {
  events: { [key: string]: Callback[] } = {};

  // Registers an event handler with this object. so other parts of the app know when something changes.
  on(eventName: string, callback: Callback): void {
    const handlers = this.events[eventName] || []; // If this.events[eventname] is undfined
    handlers.push(callback); // If this.events[eventname] is a callback
    this.events[eventName] = handlers;
  }

  // Triggers an event to tell other parts of app that something has changed.
  trigger(eventName: string): void {
    const handlers = this.events[eventName];

    if (!handlers || handlers.length === 0) {
      return;
    }

    handlers.forEach((callback) => {
      callback();
    });
  }
}
