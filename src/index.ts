import { User } from './models/User';

// const user = new User({ id: 1 });
// user.set({ name: 'AHMED', age: 21 });
// user.save();

const user = new User({ name: 'AHMED', age: 21 });
// user.save();

user.events.on('change', () => {
  console.log('Change!');
});

user.events.trigger('change');
