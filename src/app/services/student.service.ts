import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../interfaces/student';
import { map, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { ApiResponse } from '../interfaces/Response';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'https://localhost:5001/api/Student';

  private _refreshNeeded$ = new Subject<void>();

  get refressNeeded$() {
    return this._refreshNeeded$;
  }

  getStudents(): Observable<any> {
     return this.http.get(this.baseUrl).pipe(map(this.extractData));
    // return this.http.get<ApiResponse[]>(this.baseUrl);
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getStudentById(id: number) {
    return this.http.get<Student>(this.baseUrl + '/' + id);
  }

  createStudent(student: Student): Observable<Student> {
    // console.log(student);
    return this.http.post<Student>(this.baseUrl, student).pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }

  updateStudent(student: Student): Observable<Student> {
    // console.log(student);
    return this.http.put<Student>(this.baseUrl, student).pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );;
  }

  deleteStudent(id: number): Observable<Student> {
    // console.log(id);
    return this.http.delete<Student>(this.baseUrl + '/' + id).pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );;;
  }
}
