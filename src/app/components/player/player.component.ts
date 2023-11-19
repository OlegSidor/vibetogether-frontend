import {Component, ElementRef, Input, ViewChild, ViewEncapsulation} from '@angular/core';
import * as videojs from 'video.js'

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.sass' ],
  encapsulation: ViewEncapsulation.None,
})
export class PlayerComponent {

  @Input() options: {
    sources: {
      src: string,
      type: string,
    }[],
  };

  @Input() playForAll : () => Promise<void>;
  @Input() pauseForAll : () => Promise<void>;
  @Input() changeTimeForAll : (time : number) => Promise<void>;
  @Input() setRoomTime : (time : number) => Promise<void>;
  @Input() waitForAll : () => Promise<void>;
  @Input() userIsReady : () => Promise<void>;

  @ViewChild('player') playerElement:ElementRef;


  private videoJS = videojs.default;
  private player : any;

  public playPause() : void {
    if(this.player.paused()){
      this.player.play()
    } else {
      this.player.pause()
    }
  }

  public async OnPlay(){
      await this.playForAll();
  }


  public async OnPause(){
      await this.pauseForAll();
  }

  public async OnSeeked(time : number){
      await this.changeTimeForAll(time);
  }

  public async OnTimeUpdate(time : number){
    await this.setRoomTime(time);
  }

  public play(){
    this.player.play();

  }

  public pause(){
    this.player.pause();

  }

  public changeTime(time : number){
    this.player.currentTime(time);
  }

  ngAfterViewInit() {
    this.player = this.videoJS(this.playerElement.nativeElement, this.options);

    this.player.on("play", async (e : any) => await this.OnPlay());
    this.player.on("pause",  async (e : any) => await this.OnPause());
    this.player.on("seeked",  async (e : any) => await this.OnSeeked(this.player.currentTime()));
    this.player.on("timeupdate",  async (e : any) => await this.OnTimeUpdate(this.player.currentTime()));

    this.player.on("canplaythrough",  async (e : any) => await this.userIsReady());
    this.player.on("waiting",  async (e : any) => await this.waitForAll());
  }


}
