import { Injectable } from '@angular/core';
import { Taquerias } from './taquerias';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, tap,of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TaqueriasService {

  private tacolizadorURL = 'http://localhost:3000/api/v1/taquerias/';
  constructor
  (private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  getTaquerias(): Observable<Taquerias[]> {
    return this.http.get<Taquerias[]>(this.tacolizadorURL).pipe(
      tap(_ => this.log('fetched taquerias')),
      catchError(this.handleError<Taquerias[]>('getTaquerias', []))
    );
  }
  getTaqueria(id: number): Observable<Taquerias> {
    const url = `${this.tacolizadorURL}/${id}`;
    return this.http.get<Taquerias>(url).pipe(
      tap(_ => this.log(`Fetched Taqueria id=${id}`)),
      catchError(this.handleError<Taquerias>(`getTaqueria id=${id}`))
    );
  }
  addTaqueria(taqueria: Taquerias): Observable<Taquerias>{
    return this.http.post<Taquerias>(this.tacolizadorURL,taqueria, this.httpOptions).pipe(
      tap((taqueria: Taquerias) => this.log(`added hero w/ id=${taqueria.id_taqueria}`)),
      catchError(this.handleError<Taquerias>('addTaquerias'))
    );
   }
  updateTaqueria(taqueria: Taquerias): Observable<any> {
    return this.http.put(this.tacolizadorURL, taqueria, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${taqueria.id_taqueria}`)),
      catchError(this.handleError<any>('updateHero'))
    );
   }
  deleteTaqueria(id: number): Observable<any> {
    const url = `${this.tacolizadorURL}/${id}`;
    return this.http.delete<Taquerias>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted taqueria id=${id}`)),
      catchError(this.handleError<Taquerias>('deleteHero'))
    );
   }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  private log(message: string) {

  }

}
