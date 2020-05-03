import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Route} from "@angular/router";
import {map, tap} from "rxjs/operators";
import {User} from "../models/users.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userApiUrl = environment.baseUrl+"users/"

  constructor(private _http: HttpClient) {
  }

  getAllUsers() {
    return this._http.get<User[]>(this.userApiUrl)
  }

  findUserById(number: any) {
    return this._http.get<User>(this.userApiUrl + number)
  }

  createUser(newUser: { name: string; email: string; username: string }) {
    return this._http.post<User>(this.userApiUrl, newUser)
  }

  updateUser(updateData: any, id: number) {
    return this._http.put<User>(this.userApiUrl + id, updateData)
  }

  deleteUser(id: number) {
    return this._http.delete(this.userApiUrl + id)
  }
}
