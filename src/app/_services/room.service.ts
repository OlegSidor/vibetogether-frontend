import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Room} from "../_models/room";
import {User} from "../_models/user";
import {environment} from "../../environments/environment.development";
import {map} from "rxjs/operators";
import {AccountService} from "./account.service";

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private roomSubject: BehaviorSubject<Room | null>;
  public room: Observable<Room | null>;

  constructor(private router: Router,
              private http: HttpClient,
              private accountService: AccountService) {
    this.roomSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('room')!));
    this.room = this.roomSubject.asObservable();
  }

  public get roomValue() : Room | null {
    return this.roomSubject.value;
  }

  public createRoom(url: string) : Observable<Room> {

    return this.http.post<Room>(`${environment.apiUrl}/room`, {'videoUrl': url})
      .pipe(map((room : Room) => {
        localStorage.setItem('room', JSON.stringify(room));

        return room;
      }));
  }

  public getRoom(id: string) : Observable<Room> {

    return this.http.get<Room>(`${environment.apiUrl}/room`, {params: {id: id}}).pipe()
  }

}
