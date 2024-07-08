import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plant } from '../models/plant';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  dataSource: string = "http://localhost:3000/plants"

  lowhighPrice: string = "http://localhost:3000/plants?_sort=itemPrice"

  // highlowPrice: string ="http://localhost:3000/plants?_sort=price&order=desc"

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Plant[]> {
    return this.http.get<Plant[]>(this.dataSource);
  }

  getLowtoHigh(): Observable<Plant[]> {
    return this.http.get<Plant[]>(this.lowhighPrice);
  }

  // getHightoLow(): Observable<Plant[]> {
  //   return this.http.get <Plant[]>(this.highlowPrice);
  // }

  viewProductById(id: number): Observable<Plant> {
    return this.http.get<Plant>(this.dataSource + `/${id}`);
  }

  removeProductById(id: number): Observable<any> {
    return this.http.delete<any>(this.dataSource + `/${id}`);
  }

  editProductById(id: number, updatedProduct: Plant): Observable<Plant> {
    return this.http.put<Plant>(this.dataSource + `/${id}`, updatedProduct);
  }

  addNewProduct(newProduct: Plant): Observable<Plant> {
    return this.http.post<Plant>(this.dataSource, newProduct);
  }
}
