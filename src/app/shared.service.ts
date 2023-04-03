import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  createBookData(payLoad: any) {
    return this.httpClient.post('http://localhost:3000/bookcontroller', payLoad);
  }

  getAllBookData() {
    return this.httpClient.get('http://localhost:3000/bookcontroller');
  }

  getIdBookData(_id: any) {
    return this.httpClient.get(`http://localhost:3000/bookcontroller/${_id}`);
  }

  updateBookData(payLoad: any) {
    return this.httpClient.post('http://localhost:3000/bookcontroller/', payLoad);
  }

  deleteBookWithId(_id: any) {
    return this.httpClient.delete(`http://localhost:3000/bookcontroller/${_id}`);
  }

  softDeleteBookWithId(_id: any) {
    return this.httpClient.delete(`http://localhost:3000/bookcontroller/changeStatus/${_id}`);
  }
}
