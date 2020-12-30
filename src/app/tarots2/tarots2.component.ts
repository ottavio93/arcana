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
declare var $: any;
@Component({
  selector: 'app-tarots2',
  templateUrl: './tarots2.component.html',
  styleUrls: ['./tarots2.component.css'],
})
export class Tarots2Component implements OnInit {
  ngOnInit() {}
  tarokki = TUTTITAROKKI;

  tarokkinondoppiati = this.getRandomTaroks();

  todo = this.tarokki;

  done = [];
  spariscitesto() {
    var elem = document.getElementById('messaggio');
    elem.style.display = 'none';
    console.log('e sparito');
  }
  spariscibottone() {
    var elem = document.getElementById('bottoni');
    elem.style.display = 'flex';
    console.log('e sparito');
  }

  drag(event: CdkDrag<string[]>) {
    event._dragRef;
    this.spariscitesto();
  }

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
    if (this.done.length === 2) {
      console.log('dsnhlkjdsngkhjdfbkj');
      this.flip();
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

  stampatrecarte() {
    console.log('gggghghdddddddddddddddddddddddddddddddddddddddddddddddddaa');
    console.log(this.done);
  }

  flip() {
    console.log('grfgggggggggggggggggggggggggggggggggggggggggggggg');
    $('.card').toggleClass('flipped');
  }

  flip2() {
    $('.card').toggleClass('flipped');
  }

  passato = this.tarokkinondoppiati[0].immagine;
  presente = this.tarokkinondoppiati[1].immagine;
  futuro = this.tarokkinondoppiati[2].immagine;

  getRandomTaroks() {
    let taroks = [];

    let i = Math.floor(Math.random() * this.tarokki.length);
    var passato = this.tarokki[i];
    taroks[0] = passato;
    this.tarokki.splice(i, 1);

    let d = Math.floor(Math.random() * this.tarokki.length);
    var presente = this.tarokki[d];
    taroks[1] = presente;
    this.tarokki.splice(d, 1);
    var futuro = this.tarokki[Math.floor(Math.random() * this.tarokki.length)];

    taroks[2] = futuro;

    return taroks;
  }
  getAllTarots(array) {
    let tarocco;
    for (let index = 0; index < array.length; index++) {
      tarocco = array[index];
      console.log(tarocco);
    }

    console.log(tarocco.immagine);
    return tarocco;
  }

  evenPredicate(items: CdkDrag<object>[]) {
    return items.length < 3;
  }
  noReturnPredicate() {
    return false;
  }

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

  nome() {
    var message;
    if (typeof this.done[0].nome !== undefined) message = this.done[0].nome;

    return message;
  }

  frin2() {
    var message1;
    if (typeof this.done[1].futuroAmore !== undefined)
      message1 = this.done[1].passatoAmore;
    else {
      message1 = 'caro';
    }
    console.log('e arivato dai');
    return message1;
  }

  showTesti() {
    var testi = document.getElementById('testi');
    testi.style.display = 'flex';

    var element = document.getElementById('sparisce');
    element.style.display = 'none';
  }
  // ngOnDestroy() {}
}
