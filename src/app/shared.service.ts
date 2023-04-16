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
    return this.httpClient.post('http://localhost:3000/books-controller', payLoad);
  }

  getAllBookData() {
    return this.httpClient.get('http://localhost:3000/books-controller');
  }

  getIdBookData(_id: any) {
    return this.httpClient.get(`http://localhost:3000/books-controller/${_id}`);
  }

  updateBookData(payLoad: any) {
    return this.httpClient.post('http://localhost:3000/books-controller/', payLoad);
  }

  deleteBookWithId(_id: any) {
    return this.httpClient.delete(`http://localhost:3000/books-controller/${_id}`);
  }

  softDeleteBookWithId(_id: any) {
    return this.httpClient.delete(`http://localhost:3000/books-controller/changeStatus/${_id}`);
  }
}
