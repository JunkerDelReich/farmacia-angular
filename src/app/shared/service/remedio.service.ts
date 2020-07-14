import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClientModule, HttpClient } from '@angular/common//http';
import { Observable } from 'rxjs';
import { Remedio } from '../model/remedio.model';

@Injectable({
  providedIn: 'root'
})
export class RemedioService {

  apiUrl = 'https://5f02650b9e41230016d42d46.mockapi.io/api/v1/remedio/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  public getRemedio(): Observable<Remedio[]> {
    return this.httpClient.get<Remedio[]>(this.apiUrl);
  }

  public postRemedio(remedio: any): Observable<Remedio> {
    return this.httpClient.post<any>(this.apiUrl, remedio, this.httpOptions);
  }

  
  public putRemedio(remedio: any, id: any): Observable<Remedio> {
    return this.httpClient.put<any>(this.apiUrl+id, remedio, this.httpOptions);
  }

  
  public deleteRemedio(id: any): Observable<Remedio> {
    return this.httpClient.delete<any>(this.apiUrl+id);
  }
}
