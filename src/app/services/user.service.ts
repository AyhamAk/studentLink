import {Injectable} from "@angular/core";
import {db} from "src/environments/environment";
import {collection, doc, getDocs, setDoc} from "firebase/firestore";
import {User} from "../models/user";
@Injectable({
  providedIn: 'root'
})
export class userService {
  users: User[] = [];

  constructor() {
  }
  async getUsers() {
    // get users data
    const itemsCol = collection(db, 'users');
    const information = await getDocs(itemsCol);
    const itemsList = information.docs
      .map(doc => doc.data());
    itemsList.map(element => {
      let user: User = {
        email:element['email'],
        name:element['name'],
        profilePictureUrl:element['profilePictureUrl'],
        password:element['password'],
      };
      this.users.push(user);
    })
    return this.users;
  }
  async addNewUser(name: string, email: string | null | undefined, password: string, profilePictureUrl: string) {
    await setDoc(doc(db, "users", name), {
      name:name,
      email:email,
      password:password,
      profilePictureUrl:profilePictureUrl
    });
  }

}
