import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../domain/category';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(protected http: HttpClient) {}

  post = (category: Category) =>
    this.http.post(`${environment.ApiUrl}/Category`, category);
  put = (category: Category) =>
    this.http.put(`${environment.ApiUrl}/Category/${category.id}`, category);
  get = () => this.http.get<Category[]>(`${environment.ApiUrl}/Category`);
  getById = (id: string) =>
    this.http.get<Category>(`${environment.ApiUrl}/Category/${id}`);
  delete = (id: number) =>
    this.http.delete(`${environment.ApiUrl}/Category/${id}`);
}
