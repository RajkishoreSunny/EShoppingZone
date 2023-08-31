import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, switchMap, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: boolean = false;
  private sessionKey: string = 'userSession';
  public adminLoggedIn: boolean = false;
  public userLoggedIn: boolean = false;
  constructor(private http: HttpClient, private router: Router) 
  {
    const token = localStorage.getItem('jwtToken');
    this.loggedInSubject = new BehaviorSubject<boolean>(!!token);
    this.loggedIn$ = this.loggedInSubject.asObservable();
  }
  baseServerUrl = "https://localhost:7092/api/";
  public checkTokenExpiration(error: any): void {

    if (error.status === 401) {
      alert('Session expired. Please login again.');
      this.setLoggedIn(false); // Clear login status
      localStorage.removeItem('jwtToken');
      this.router.navigate(['/login']);
    }
  }
  registerUser(user: Array<string>){
    return this.http.post(this.baseServerUrl + "User/CreateUser", 
    {
      UserName: user[0],
      Password: user[1],
      Email: user[2],
      DateOfBirth: user[3],
      PhoneNumber: user[4],
      Gender: user[5],
      Address: user[6]
    },{
      responseType: "text",
    })
  }

  loginUser(loginInfo: Array<string>)
  {
    return this.http.post(this.baseServerUrl + "User/LoginUser", 
    {
      Email: loginInfo[0],
      Password: loginInfo[1],
    },
    {
      responseType: "text",
    }).pipe(
      tap((token: string) => {
        const response = JSON.parse(token);
        const resToken = response.token;
        localStorage.setItem('jwtTokenUser', resToken);
        localStorage.setItem('email', loginInfo[0]);
        this.setSession(token);
        this.setLoggedIn(true, token);
        this.userLoggedIn = true;
      }),
      switchMap(() => this.getUserInfo()),
      catchError(error => {
        this.checkTokenExpiration(error);
        console.log(error);
        return throwError(error);
      })
    );
  }
  getUserInfo(): Observable<any>
  {
    const email = localStorage.getItem('email');
    if (email !== null) {
      const decodedEmail = decodeURIComponent(email);
      const url = `${this.baseServerUrl}User/GetByEmail?email=${decodedEmail}`;
      return this.http.get(url).pipe(
        tap((response: any) => {
          const userId = response;
          localStorage.setItem('userId', userId);
        })
      );
    } else {
      return throwError('Email not found in localStorage');
    }
  }
  //Admin Login
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseServerUrl}Admin/AdminLogin`, { email, password }).pipe(
      tap((response: any) => {
        const token = response.token; 
        if (token) {
          localStorage.setItem('jwtToken', token);
          this.setSession(token);
          this.setLoggedIn(true, token);
          this.adminLoggedIn = true;
        } else {
          this.clearSession();
          this.setLoggedIn(false);
        }
      })
    );
  }

    private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public loggedIn$: Observable<boolean> = this.loggedInSubject.asObservable();

    setLoggedIn(value: boolean, token?: string) {
      this.loggedInSubject.next(value);
      this.loggedIn = value;
      if(value && token){
        this.createSession(token);
      }
      else{
        this.clearSession();
      }
    }

    logoutUser() {
      // Logout logic
      // Clear the session
      this.setLoggedIn(false);
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('userId');
      localStorage.clear();
      this.router.navigate(['/login']);
    }
    private createSession(token: string) {
      localStorage.setItem('jwtToken', token);
      this.loggedInSubject.next(true);
    }
    private setSession(token: string) {
      localStorage.setItem('jwtToken', token);
      this.loggedIn = true;
    }
  
    private clearSession() {
      localStorage.removeItem(this.sessionKey);
      this.loggedInSubject.next(false);
    }
  

  
    public isLoggedIn(): boolean {
      return this.loggedInSubject.getValue();
    }

}
