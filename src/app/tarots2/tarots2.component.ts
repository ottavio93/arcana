import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ɵConsole,
} from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragEnter,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { TUTTITAROKKI } from '../data';
import { OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { HostListener } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../AUTH/shared/Auth.Service';
import { ScoreRequestPayload } from '../AUTH/login/ScoreRequestPayload';

import { throwError } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-tarots2',
  templateUrl: './tarots2.component.html',
  styleUrls: ['./tarots2.component.css'],
})
export class Tarots2Component implements OnInit, OnDestroy {
  isLoggedIn: boolean;
  username: string;
  score: number;
  constructor(
    private cookie: CookieService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.loggedIn.subscribe(
      (data: boolean) => (this.isLoggedIn = data)
    );
    this.authService.username.subscribe(
      (data: string) => (this.username = data)
    );
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUserName();
  }

  //###########  tarokki presi  da data.ts ''ildatabase dei tarokki####################
  tarokki = TUTTITAROKKI;

  //########### done e todo sono gli array con le carte. todo è quello con tutte le carte mischiate coperte
  // mentre il done è l'array che si riempe con le tre carte che lutente ha droppato ####################
  todo = this.getRandomTaroks();
  done = [];

  //########### funzione che resistuisce i testi solo se non è in memoria il cookie guest####################
  controlloLogin() {
    if (this.username != null) {
      this.showTesti();
      console.log(
        'ciaooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo'
      );
      this.createPost();
    }

    console.log('funziona');
    if (this.cookie.get('user') != 'ospite') {
      this.showTesti();
    } else {
      var elem = document.getElementById('cookie');
      elem.style.display = 'none';
      var elem = document.getElementById('cookietext');
      elem.style.display = 'inline-flex';

      console.log('non puo gioare piu di una volta se non sei registrato');
    }

    this.cookie.set('user', 'ospite');
  }

  //########### funzione importanteee del drag and drop usando angular material ####################
  drop(event: CdkDragDrop<string[]>) {
    if (this.done.length > 1) {
      this.spariscibottone();
    }

    if ($('.example-box card').is('.ui-draggable-dragging')) {
      console.log('2343546');
      this.spariscitesto();
    }

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    if (this.done.length < 3) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  //########### funzione importante mi restituise un array con gli oggetti mischiati a random ####################
  getRandomTaroks() {
    let tarocchiMischiati = this.tarokki;
    let tarokkilimitati;
    tarocchiMischiati = tarocchiMischiati.sort(() => Math.random() - 0.5);
    tarokkilimitati = tarocchiMischiati.slice(0, 14);

    return tarokkilimitati;
  }

  //########### funzione  che fa sparire il testo nella casella sopra una volta iniziato il drag ####################
  spariscitesto() {
    var elem = document.getElementById('messaggio');
    elem.style.display = 'none';
    console.log('e sparito');
  }

  //########### funzione  che fa apparire i bottoni una volta che ci sono letre carte draggte ####################
  spariscibottone() {
    var elem = document.getElementById('bottoni');
    elem.style.display = 'flex';
    console.log('e sparito');
  }
  load: ScoreRequestPayload;

  //########### funzione  che fa apparire i testi  dei tarokki una volta premuto il bottone scorpi ####################
  showTesti() {
    var testi = document.getElementById('testi');
    testi.style.display = 'flex';
    var puntiKarma = this.getScoreCards();

    var element = document.getElementById('sparisce');
    element.style.display = 'none';

    console.log(puntiKarma);
  }
  createPost() {
    this.score = this.authService.getScore();

    this.load.username = this.authService.getUserName();
    this.load.score = this.score;
    this.authService.setScore(this.load).subscribe((error) => {
      this.router.navigateByUrl('/tarots2');
      throwError(error);
    });
  }
  getScoreCards() {
    this.score =
      this.authService.getScore() +
      this.done[0].punteggio +
      this.done[1].punteggio +
      this.done[2].punteggio;
    this.load = {
      username: 'g',
      score: this.score,
    };

    this.authService.newscore(this.score);
    this.authService.setScore(this.load);

    return this.score;
  }
  //########### metodi in lavorazione ####################
  flip() {
    console.log('grfgggggggggggggggggggggggggggggggggggggggggggggg');
    $('.card').toggleClass('flipped');
  }

  nome() {
    var message;
    if (typeof this.done[0].nome !== undefined) message = this.done[0].nome;

    return message;
  }

  async stampatrecarte() {
    (await this.done.length) == 3;
    console.log('funione asicrona');
    console.log(this.done);
  }

  @HostListener('unloaded')
  ngOnDestroy() {
    console.log('Items destroyed');
  }
}
// home: HomeComponent;
// passato = this.tarokkinondoppiati[0].immagine;
// presente = this.tarokkinondoppiati[1].immagine;
// futuro = this.tarokkinondoppiati[2].immagine;

// @Output('cdkDragEntered')
// entered: EventEmitter<CdkDragEnter<any>>;
// specialUseCase(drag?: CdkDrag, drop?: CdkDrop) {
//   if (drop.data.length <= 2) {
//     console.log(
//       "Can't drop you because there aren't enough items in 'Active'"
//     );
//     return false;
//   }
//

//funzione che mi potrebbe servire

// drag(event: CdkDrag<string[]>) {
//   event._dragRef;
//   this.spariscitesto();
// }

// frin2() {
//   var message1;
//   if (typeof this.done[1].futuroAmore !== undefined)
//     message1 = this.done[1].passatoAmore;
//   else {
//     message1 = 'caro';
//   }
//   console.log('e arivato dai');
//   return message1;
// }

// get3RandomTaroks() {
//   let taroks = [];

//   let i = Math.floor(Math.random() * this.tarokki.length);
//   var passato = this.tarokki[i];
//   taroks[0] = passato;
//   this.tarokki.splice(i, 1);

//   let d = Math.floor(Math.random() * this.tarokki.length);
//   var presente = this.tarokki[d];
//   taroks[1] = presente;
//   this.tarokki.splice(d, 1);
//   var futuro = this.tarokki[Math.floor(Math.random() * this.tarokki.length)];

//   taroks[2] = futuro;

//   return taroks;
// }
// getAllTarots(array) {
//   let tarocco;
//   for (let index = 0; index < array.length; index++) {
//     tarocco = array[index];
//     console.log(tarocco);
//   }

//   console.log(tarocco.immagine);
//   return tarocco;
// }

// evenPredicate(items: CdkDrag<object>[]) {
//   return items.length < 3;
// }
// noReturnPredicate() {
//   return false;
// }
