import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignupRequestPayload } from '../signup/SignupRequestPayload';
import { Observable, throwError } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { LoginRequestPayload } from '../login/login-request.payload';
import { LoginResponse } from '../login/login-response.payload';
import { map, tap } from 'rxjs/operators';
import { ScoreRequestPayload } from '../login/ScoreRequestPayload';
import { ReadTarokRequestPayload } from '../login/ReadTarokRequestPayload';
import { VoteRequest } from '../VoteRequest';
import { PostModel } from '../PostModel';
import { PostDelete } from '../PostDelete';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName(),
  };
  score: number;
  constructor(
    private httpClient: HttpClient,
    private localStorage: LocalStorageService
  ) {}
  ngOnInit() {
    console.log('ffffffffffff');
  }

  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.httpClient.post(
      'http://localhost:8080/api/auth/signup',
      signupRequestPayload,
      { responseType: 'text' }
    );
  }

  setScore(scoreRequestPayload: ScoreRequestPayload): Observable<any> {
    return this.httpClient.post(
      'http://localhost:8080/api/auth/setscore',
      scoreRequestPayload
    );
  }
  votePost(vote: VoteRequest) {
    return this.httpClient.post('http://localhost:8080/api/auth/voto', vote);
  }
  votePostMeno(vote: VoteRequest) {
    return this.httpClient.post(
      'http://localhost:8080/api/auth/votoMeno',
      vote
    );
  }

  setReading(
    readTarokRequestPayload: ReadTarokRequestPayload
  ): Observable<any> {
    return this.httpClient.post(
      'http://localhost:8080/api/auth/create',
      readTarokRequestPayload
    );
  }

  getReading(userName: string): Observable<any> {
    return this.httpClient.get(
      'http://localhost:8080/api/auth/historyTaroks/' + userName
    );
  }

  putPost(postModel: PostModel): Observable<any> {
    return this.httpClient.post(
      'http://localhost:8080/api/auth/createPost',
      postModel
    );
  }

  getAllPost(): Observable<any> {
    return this.httpClient.get('http://localhost:8080/api/auth/posts');
  }
  getPost(id: number): Observable<PostModel> {
    return this.httpClient.get<PostModel>(
      'http://localhost:8080/api/posts/' + id
    );
  }

  deletePost(postDelete: PostDelete): Observable<any> {
    return this.httpClient.post(
      'http://localhost:8080/api/auth/deletePost',
      postDelete
    );
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.httpClient
      .post<LoginResponse>(
        'http://localhost:8080/api/auth/login/',
        loginRequestPayload
      )
      .pipe(
        map((data) => {
          this.localStorage.store(
            'authenticationToken',
            data.authenticationToken
          );
          this.refreshPage();
          this.localStorage.store('username', data.username);
          this.localStorage.store('refreshToken', data.refreshToken);
          this.localStorage.store('expiresAt', data.expiresAt);
          this.localStorage.store('score', data.score);

          this.loggedIn.emit(true);
          this.username.emit(data.username);

          return true;
        })
      );
  }
  refreshPage() {
    window.location.reload();
  }

  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }
  newscore(newscore) {
    return this.localStorage.store('score', newscore);
  }

  refreshToken() {
    return this.httpClient
      .post<LoginResponse>(
        'http://localhost:8080/api/auth/refresh/token',
        this.refreshTokenPayload
      )
      .pipe(
        tap((response) => {
          this.localStorage.clear('authenticationToken');
          this.localStorage.clear('expiresAt');

          this.localStorage.store(
            'authenticationToken',
            response.authenticationToken
          );
          this.localStorage.store('expiresAt', response.expiresAt);
        })
      );
  }

  logout() {
    this.httpClient
      .post('http://localhost:8080/api/auth/logout', this.refreshTokenPayload, {
        responseType: 'text',
      })
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          throwError(error);
        }
      );
    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('username');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('expiresAt');
    this.localStorage.clear('score');
  }

  getUserName() {
    return this.localStorage.retrieve('username');
  }
  getScore() {
    return this.localStorage.retrieve('score');
  }
  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }
  getAllPostsByUser(name: string): Observable<number> {
    return this.httpClient.get<number>(
      'http://localhost:8080/api/posts/by-user/' + name
    );
  }
}
