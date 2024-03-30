import { makeAutoObservable } from "mobx";

class UserStore {
  users = [];

  constructor() {
    makeAutoObservable(this);
  }

  addUser(user) {
    this.users.push({...user, rating: 0});
  }

  removeUser(id) {
    this.users = this.users.filter(user => user.id !== id);
  }
  
  setRating(id, rating) {
    const user = this.users.find(user => user.id === id);
    if (user) {
      user.rating = rating;
    }
  }
}

export default new UserStore();