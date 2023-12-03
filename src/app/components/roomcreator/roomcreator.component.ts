import {Component, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../environments/environment.development";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {RoomService} from "../../_services/room.service";
import {first} from "rxjs";
import {Room} from "../../_models/room";

@Component({
  selector: 'app-roomcreator',
  templateUrl: './roomcreator.component.html',
  styleUrls: ['./roomcreator.component.sass']
})
export class RoomcreatorComponent {
  @Input() showSubmitButton : boolean = false;

  public form!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private router: Router,
              private roomService: RoomService) {

  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      url: ['', Validators.required]
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {

    if (this.form.invalid) {
      return;
    }

    this.roomService.createRoom(this.f['url'].value)
      .pipe(first())
      .subscribe({
        complete(): void {

        },
        next: (value : Room) => {
          this.router.navigateByUrl(`/play/${value.id}`);
        },
        error: (error : Error) => {
        }
      });

  }
}
