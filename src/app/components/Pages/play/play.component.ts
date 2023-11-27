import {Component, ViewChild} from '@angular/core';
import {HubConnection, HubConnectionBuilder, HubConnectionState} from "@microsoft/signalr";
import {ActivatedRoute} from '@angular/router';
import {PlayerComponent} from "../../player/player.component";
import {environment} from "../../../../environments/environment.development";
import {User} from "../../../_models/user";
import {AccountService} from "../../../_services/account.service";

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.sass'],
})
export class PlayComponent {

  @ViewChild('player') player:PlayerComponent;


  private readonly connection : HubConnection;
  private readonly roomId : string | null;
  public connected : boolean;
  private user: User | null;


  constructor(private route: ActivatedRoute,
              private accountService: AccountService) {
    this.user = this.accountService.userValue;
    this.roomId = this.route.snapshot.paramMap.get('roomId');
    let token : string | undefined = this.user?.Token

    this.connection = new HubConnectionBuilder()
      .withUrl(`${environment.apiUrl}/player`, {
        accessTokenFactory(): string | Promise<string> {
          return token || "";
        }})
      .build();

    this.connection.start().then(() => {
      this.connection.invoke("AssignGroupAsync", this.roomId);

      if(this.connection.state === HubConnectionState.Connected) {
        this.connected = true;
        this.subscribe(this.connection);
      }
    });
  }

  private lastCommand : string = "";

  public play = async () : Promise<void> => {
    if(this.connection.state === HubConnectionState.Connected)
      await this.connection.invoke("PlayAsync");

    this.lastCommand = "play";
  }

  public pause = async () : Promise<void> => {
    if(this.connection.state === HubConnectionState.Connected)
      await this.connection.invoke("PauseAsync");

    this.lastCommand = "pause";
  }

  public changeTime = async (time: number) : Promise<void> => {
    if(this.connection.state === HubConnectionState.Connected)
      await this.connection.invoke("ChangeTimeAsync", time);

    this.lastCommand = "seek";
  }

  public setRoomTime = async (time: number) : Promise<void> => {
    if(this.connection.state === HubConnectionState.Connected)
      await this.connection.invoke("UpdateRoomTime", time);

  }

  public waitForAll = async () : Promise<void> => {
    if(this.connection.state === HubConnectionState.Connected)
      await this.connection.invoke("waitForAllAsync");

  }

  public isReady = async () : Promise<void> => {
    if(this.connection.state === HubConnectionState.Connected)
      await this.connection.invoke("userIsReadyAsync");

  }

  private subscribe(connection : HubConnection){

    connection.on("PlayAsync", () => {if(this.lastCommand !== "play") this.player.play()})
    connection.on("PauseAsync", () => {if(this.lastCommand !== "pause") this.player.pause()})
    connection.on("ChangeTimeAsync", (data) => {if(this.lastCommand !== "seek") this.player.changeTime(data)})


    connection.on("waitForAllAsync", () => {
        setTimeout(() => {
          this.player.pause();
        }, 200)
    });

    connection.on("userIsReadyAsync", () => {
      setTimeout(() => {
        this.player.play();
      }, 200)
    });

  }


}
