import { Injectable } from '@angular/core';
import { Quiz } from '../domain/quiz';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': environment.ApiUrl,
  }),
};

@Injectable({ providedIn: 'root' })
export class QuizService {
  constructor(protected http: HttpClient) {}

  post = (quiz: Quiz) => this.http.post(`${environment.ApiUrl}/Quiz`, quiz);
  put = (quiz: Quiz) =>
    this.http.put(`${environment.ApiUrl}/Quiz/${quiz.id}`, quiz);
  get = () => this.http.get<Quiz[]>(`${environment.ApiUrl}/Quiz`);
  getById = (id: string) =>
    this.http.get<Quiz>(`${environment.ApiUrl}/Quiz/${id}`);
}
