import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { PostDelete } from '../auth/PostDelete';
import { PostModel } from '../auth/PostModel';
import { AuthService } from '../auth/shared/authservice';
import { VoteType } from '../auth/Vote-type';
import { VoteRequest } from '../auth/VoteRequest';
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
  post: PostModel = {
    description: 'boooooooooooooooooooooooooooooooooooooooooooo',
    userName: 'g',
  };

  postDelete: PostDelete = {
    userName: 'g',
    postId: 0,
  };

  value: string; // Add this as you had used and assign it to your ngModel

  ngOnInit(): void {
    this.authService.username.subscribe(
      (data: string) => (this.username = data)
    );
    var isClicked = false;
    this.username = this.authService.getUserName();
    console.log('ciaooooooooooo' + this.username);
    this.authService.getAllPost().subscribe((data) => {
      this.posts = data.slice().reverse();
      console.log(this.posts);
    });
  }

  sortBy(prop: any) {
    return this.posts.sort((a, b) =>
      a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1
    );
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
    this.voteRequest.postId = this.posts[id].postId;
    this.voteRequest.userName = this.username;
    this.voteRequest.voteType = VoteType.NONMIPIACE;
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
  utentedelpost;
  upVote(id) {
    this.voteRequest.postId = this.posts[id].postId;
    this.voteRequest.userName = this.username;
    this.voteRequest.voteType = VoteType.UPVOTE;

    if (localStorage.getItem('ngx-webstorage|username') != null) {
      this.authService.votePost(this.voteRequest).subscribe((data) => {
        console.log(this.posts[id].user.username + '  questo');

        if (this.voteRequest.userName == this.posts[id].user.username) {
          alert('non puoi votare un tuo post');
        } else {
          this.ngOnInit();
          this.ngOnInit();
          this.change();
        }
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

  addPost() {
    if (this.username != null && this.value.length > 5) {
      this.post = {
        description: this.value,
        userName: this.username,
      };

      this.authService.putPost(this.post).subscribe((error) => {
        this.ngOnInit();
        throwError(error);
      });
      console.log('down');
      this.ngOnInit();

      console.log(this.post); // this will now have a value depends on your input from ngModel
    } else if (this.username != null && this.value.length < 5) {
      alert('il post deve contenere almeno 5 caratteri ');
    } else {
      alert('accedi o registrati per pubblicare un post ');
    }
  }

  deletepost(id: number) {
    if (this.username != null) {
      this.postDelete = {
        postId: this.posts[id].postId,
        userName: this.username,
      };

      console.log(this.posts[id].user.username + '  questo');

      if (this.username == this.posts[id].user.username) {
        this.authService.deletePost(this.postDelete).subscribe((error) => {
          this.ngOnInit();
          throwError(error);
        });
        this.ngOnInit();
      }
    }
  }

  getValuesPost() {}
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
