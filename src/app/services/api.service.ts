import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { GitHubUser } from 'src/model/GitHubUser';
import { Repo } from 'src/model/Repo';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  constructor(
    private httpClient: HttpClient
  ) {
    
   }

  private setLoading(loading: boolean): void {
    this.loadingSubject.next(loading);
  }


  getUser(githubUsername: string): Observable<GitHubUser> {
    this.setLoading(true);
    return this.httpClient.get<GitHubUser>(`https://api.github.com/users/${githubUsername}`).pipe(
      catchError(error => {
        // Handle error
        return throwError(()=> error);
      }),
      finalize(() => this.setLoading(false))
    );
  }

  getRepos(githubUsername: string): Observable<Repo[]> {
    this.setLoading(true);
    
    return this.httpClient.get<Repo[]>(`https://api.github.com/users/${githubUsername}/repos`).pipe(
      catchError(error => {
        // Handle error
        return throwError(()=> error);
      }),
      finalize(() => this.setLoading(false))
    );
  }
  // implement getRepos method by referring to the documentation. Add proper types for the return type and params 
}
