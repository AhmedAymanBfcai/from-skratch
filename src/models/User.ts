import { Eventing } from './Eventing';

interface UserPropos {
  id?: number; // THe ? to mark every property as an optional choice. As the user may need to update just one filed (name, age).
  name?: string;
  age?: number;
}

export class User {
  public events: Eventing = new Eventing();

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
}
