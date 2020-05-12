import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ChartService {
  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:8080/api/';

  getCharts() {
    return this.http.get(this.baseUrl + 'charts');
  }

  getSalesVariation() {
    return this.http.get(this.baseUrl + 'getSalesVariation');
  }

  getOrdersVariation() {
    return this.http.get(this.baseUrl + 'getOrdersVariation');
  }

  /*getUsers() {
    return this.http.get<User[]>(this.baseUrl);
  }

  getUserById(id: number) {
    return this.http.get<User>(this.baseUrl + '/' + id);
  }

  createUser(user: User) {
    return this.http.post(this.baseUrl, user);
  }

  updateUser(user: User) {
    return this.http.put(this.baseUrl + '/' + user.id, user);
  }

  deleteUser(id: number) {
    return this.http.delete(this.baseUrl + '/' + id);
  }*/
}