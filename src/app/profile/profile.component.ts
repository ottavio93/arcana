import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReadTarokRequestPayload } from '../auth/login/ReadTarokRequestPayload';
import { Authservice } from '../auth/shared/authservice';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogExampleComponent } from '../dialog-example/dialog-example.component';
declare var $: any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private authService: Authservice,
    private router: Router,
    public dialog: MatDialog
  ) {}
  tarok: ReadTarokRequestPayload;
  taroks: ReadTarokRequestPayload[];
  isLoggedIn: boolean;
  username: string;
  dateLetture: Date[];

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUserName();

    console.log(this.authService.getReading(this.username));
    this.authService.getReading(this.username).subscribe((data) => {
      this.taroks = data;
      console.log(this.taroks);
      for (let index = 0; index < this.taroks.length; index++) {}
      // let t = new Date(this.taroks[].created * 1000);
      // console.log(new Date(t).toLocaleString());
    });
  }

  openDialog(i) {
    // this.authService.getReading(this.username).subscribe((data) => {
    //       this.taroks = data;
    return this.dialog.open(DialogExampleComponent, {
      data: {
        casa:
          this.taroks[i].descriptionPassato +
          '           ' +
          this.taroks[i].descriptionPresente +
          '        ' +
          this.taroks[i].descriptionFuturo,
      },
    });

    // dialogref.afterClosed().subscribe((result) => {
    //   console.log('dialog result: ${result}');
  }

  alert(testo) {
    window.alert(testo);
  }
}
