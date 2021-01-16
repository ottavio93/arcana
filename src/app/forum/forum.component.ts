import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { PostModel } from '../AUTH/PostModel';
import { AuthService } from '../AUTH/shared/Auth.Service';
import { VoteType } from '../AUTH/Vote-type';
import { VoteRequest } from '../AUTH/VoteRequest';
import { DialogExampleComponent } from '../dialog-example/dialog-example.component';
declare var $: any;
@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'],
})
export class ForumComponent implements OnInit {
  username: string;
  clickedIndex: number;

  ngOnInit(): void {
    this.authService.username.subscribe(
      (data: string) => (this.username = data)
    );
    var isClicked = false;
    this.username = this.authService.getUserName();

    this.authService.getAllPost().subscribe((data) => {
      this.posts = data;
      console.table(this.posts);
    });
  }
  btnColour = 'red';
  change() {
    this.btnColour = 'green';
  }
  public dialog: MatDialog;
  constructor(private authService: AuthService, private router: Router) {
    this.voteRequest = {
      postId: 1,
      userName: this.username,
      voteType: VoteType.UPVOTE,
    };
  }
  posts: any[];
  up = false;
  down = false;
  voteRequest: VoteRequest;

  storage: Storage;
  downVote(id) {
    this.voteRequest.postId = id;
    this.voteRequest.userName = this.username;
    this.voteRequest.voteType = VoteType.DOWNVOTE;
    if (localStorage.getItem('ngx-webstorage|username') != null) {
      this.authService.votePostMeno(this.voteRequest).subscribe((error) => {
        this.ngOnInit();
        throwError(error);
      });
      console.log('down');
      this.ngOnInit();
      this.change();
      this.up = true;
    } else {
      alert('nn sei registato');
    }
  }
  upVote(id) {
    this.voteRequest.postId = id;
    this.voteRequest.userName = this.username;
    this.voteRequest.voteType = VoteType.UPVOTE;

    if (localStorage.getItem('ngx-webstorage|username') != null) {
      this.authService.votePost(this.voteRequest).subscribe((data) => {
        this.ngOnInit();

        console.log(data);
        this.ngOnInit();
        this.change();
      });
      console.log('up');
    } else {
      alert('nn sei registato');
    }
  }

  stateFlag = false;

  toggleState() {
    this.stateFlag = !this.stateFlag;
  }

  submit() {
    console.log('Button submitted');
  }

  calculateClasses() {
    return {
      btn: true,
      'btn-primary': true,
      'btn-extra-class': this.stateFlag,
    };
  }
  toggleVotomeno(id) {
    this.up == true ? this.upVote(id) : this.downVote(id);
  }
  paletteColour = 'primary';

  flip() {
    console.log('grfgggggggggggggggggggggggggggggggggggggggggggggg');
    $('.nonvotato').toggleId('votato');
  }
  // upVote(id) {
  //   if (localStorage.getItem('ngx-webstorage|username') != null) {
  //     this.authService.votePostPiu(id).subscribe((error) => {
  //       throwError(error);
  //     });
  //     console.log('up');
  //     this.up = false;
  //   } else {
  //     alert('nn sei registato');
  //   }
  // }

  // downVote1(id) {
  //   if (localStorage.getItem('ngx-webstorage|username') != null) {
  //     this.authService.votePostPiu(id).subscribe((error) => {
  //       throwError(error);
  //     });
  //     console.log('up');
  //     console.log(this.authService.getScore());
  //     this.down = true;
  //   } else {
  //     alert('nn sei registato');
  //   }
  // }
  // upVote1(id) {
  //   if (localStorage.getItem('ngx-webstorage|username') != null) {
  //     this.authService.votePost(id).subscribe((error) => {
  //       throwError(error);
  //     });
  //     console.log('down');
  //     console.log(this.authService.getScore());
  //     this.down = false;
  //   } else {
  //     alert('nn sei registato');
  //   }
  // }

  // toggleVotopiu(id) {
  //   this.down ? this.upVote1(id) : this.downVote1(id);
  // }
}
