import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../_models/user";
import {Router} from "@angular/router";
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment.development";
import {map} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import videojs from "video.js";
import use = videojs.use;

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;
  private readonly jwtHelper : JwtHelperService;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
    this.jwtHelper =  new JwtHelperService();
  }

  public get userValue() : User | null {
    return this.userSubject.value;
  }

  public login(username: string, password: string) {

    return this.http.post<string>(`${environment.apiUrl}/Login`, {username, password})
      .pipe(map((userToken) => this.saveUserData(userToken)));
  }

  public register(username: string, password: string, confirmPassword: string, email: string) {

    return this.http.post<string>(`${environment.apiUrl}/Register`, {
      "username": username,
      "password": password,
      "confirmPassword": confirmPassword,
      "email": email})
      .pipe(map((userToken) => this.saveUserData(userToken)));
  }

  private saveUserData(userToken: string) : string {
    let userInfo = this.jwtHelper.decodeToken(userToken);
    if (userInfo != null) {
      let user: User | null = JSON.parse(userInfo.UserInfo);
      if (user != null) {
        user.Token = userToken;
      }
      localStorage.setItem('user', JSON.stringify(user));
      this.userSubject.next(user);
    }
    return userToken;
  }

  public logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

}
