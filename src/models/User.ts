// axios library makes network request to a server
import axios, { AxiosResponse } from 'axios';

interface UserPropos {
  id?: number; // THe ? to mark every property as an optional choice. As the user may need to update just one filed (name, age).
  name?: string;
  age?: number;
}

// Type annotation for a function that does not take or return something.
type Callback = () => void;

export class User {
  events: { [key: string]: Callback[] } = {};

  // Object to store information about a particular user (name, age)
  constructor(private data: UserPropos) {}

  // Gets a single piece of info about this user (name, age).
  get(propName: string): number | string {
    return this.data[propName];
  }

  // Changes information about this user (name, age).
  set(update: UserPropos): void {
    Object.assign(this.data, update); //Tha's mean copy the content of update object in this.data
  }

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

  // Fetches some data from the server about a particular user. Returns Promise.
  fetch(): void {
    axios
      .get(`https://localhost:3000/users/${this.get('id')}`)
      .then((response: AxiosResponse): void => {
        this.set(response.data);
      });
  }

  // Saves some data about this user to the server.
  save(): void {
    const id = this.get('id');
    if (id) {
      axios.put(`http://localhost:3000/users/${id}`, this.data);
    } else {
      axios.post('http://localhost:3000/users', this.data);
    }
  }
}
