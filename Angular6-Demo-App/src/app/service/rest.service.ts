import { HttpClient,HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../Users';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RestService{

  constructor(private http: HttpClient) { }

  url : string ="http://localhost:3000/Users";


  getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.url)
        .pipe(catchError(this.handleError));
}

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
        console.error('Client Side Error :', errorResponse.error.message);
    } else {
        console.error('Server Side Error :', errorResponse);
    }
    return throwError('There is a problem with the service. We are notified & working on it. Please try again later.');
}

  getUser(id: number): Observable<Users> {
    return this.http.get<Users>(`${this.url}/${id}`)
        .pipe(catchError(this.handleError));
}

  addUser(user: Users): Observable<Users> {

    const formData = new FormData();

    formData.append('profilePhoto', user.profilePhoto);

    return this.http.post<Users>(this.url, user, {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    })
    .pipe(catchError(this.handleError));
}

  updateUser(user: Users): Observable<void> {
    return this.http.put<void>(`${this.url}/${user.id}`, user, {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    })
        .pipe(catchError(this.handleError));
}

}
