import axios, { AxiosResponse } from 'axios'; // axios library makes network request to a server

export class Sync {
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

/*
Serilalize => Convert data from an objectd  into seome save-able format (json)
Deserialize => Put data on an object using some previously saved data (json)
*/
