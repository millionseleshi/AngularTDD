import {TestBed} from '@angular/core/testing';

import {UserService} from './user.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import * as faker from 'faker';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {User} from "../models/User.model";


describe('UserService', () => {
  let userService: UserService, httpMock: HttpTestingController, httpClient: HttpClient;

  let apiUrl = environment.baseUrl

  const dummyUser: any =
    [
      {
        id: faker.random.number,
        name: faker.name.firstName,
        username: faker.internet.username,
        email: faker.internet.email
      },
      {
        id: faker.random.number,
        name: faker.name.firstName,
        username: faker.internet.username,
        email: faker.internet.email
      }

    ]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    userService = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
    // httpClient = TestBed.inject(HttpClient)
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  it('should return all users', () => {
    userService.getAllUsers().subscribe(user => {
      expect(user).toEqual(dummyUser)
      expect(user.length).toBe(2)
    })

    const req = httpMock
      .expectOne(req => req.method === 'GET' && req.url === apiUrl + 'users/');

    req.flush(dummyUser);
  })

  it('should return one user', () => {
    userService.findUserById(dummyUser[0].id).subscribe(user => {
      expect(user).toEqual(dummyUser[0])
    })
    const req = httpMock
      .expectOne(req => req.method === 'GET' && req.url === apiUrl + 'users/' + dummyUser[0].id);
    req.flush(dummyUser[0]);
  })

  it('should create user', () => {
    let newUser = {
      name: faker.name.firstName,
      username: faker.internet.username,
      email: faker.internet.email
    }
    userService.createUser(newUser).subscribe(user => {
      expect(user.name).toEqual(newUser.name)
      expect(user.username).toEqual(newUser.username)
    })
    const req = httpMock
      .expectOne(req => req.method === 'POST' && req.url === apiUrl + 'users/');
    expect(req.request.body).toEqual(newUser)

    const httpResponse = new HttpResponse({status: 201, body: newUser})
    req.event(httpResponse);
  })

  it('should update user', () => {

    let updateData: any = {
      name: faker.name.firstName
    }
    userService.updateUser(updateData, dummyUser[0].id).subscribe((user) => {
      expect(user.name).toEqual(updateData.name)
    })

    const req = httpMock
      .expectOne(req => req.method === 'PUT' && req.url === apiUrl + 'users/' + dummyUser[0].id);

    expect(req.request.body).toEqual(updateData)
    const httpResponse = new HttpResponse({status: 200, body: updateData})
    req.event(httpResponse);
  })

  it('should delete user', () => {

    userService.deleteUser(dummyUser[0].id).subscribe((response) => {
      expect(response).toBeNull()
    })

    const req = httpMock
      .expectOne(req => req.method === 'DELETE' && req.url === apiUrl + 'users/' + dummyUser[0].id);

    // expect(req.request.).toEqual(dummyUser[0].id)
    const httpResponse = new HttpResponse({status: 200})
    req.event(httpResponse);

  })

  afterEach(() => {
    httpMock.verify();
  });

});
