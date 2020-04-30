import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../models/User.model";
import {Route} from "@angular/router";
import {map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = "https://jsonplaceholder.typicode.com/users/"

  constructor(private _http: HttpClient) {
  }

  getAllUsers() {
    return this._http.get<User[]>(this.apiUrl)
  }

  findUserById(number: any) {
    return this._http.get<User>(this.apiUrl + number)
  }

  createUser(newUser: { name: string; email: string; username: string }) {
    return this._http.post<User>(this.apiUrl, newUser)
  }

  updateUser(updateData: any, id: number) {
    return this._http.put<User>(this.apiUrl + id, updateData)
  }

  deleteUser(id: number) {
    return this._http.delete(this.apiUrl + id)
  }
}
