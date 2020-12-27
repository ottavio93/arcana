import { Component, OnInit } from '@angular/core';

import { TUTTITAROKKI } from '../data';
declare var $: any;
@Component({
  selector: 'app-tarots',
  templateUrl: './tarots.component.html',
  styleUrls: ['./tarots.component.css'],
})
export class TarotsComponent implements OnInit {
  tarokki = TUTTITAROKKI;
  constructor() {}

  ngOnInit(): void {}

  flip() {
    $('.card').toggleClass('flipped');
  }

  getimg() {
    let g = this.shuffle(this.tarokki);
    return g[0].immagine;
  }
  passato = this.getimg();
  presente = this.getRandomTaroks()[1].immagine;
  futuro = this.getRandomTaroks()[2].immagine;
  getRandomTaroks() {
    let taroks = [];
    var passato = this.tarokki[Math.floor(Math.random() * this.tarokki.length)];
    var presente = this.tarokki[
      Math.floor(Math.random() * this.tarokki.length)
    ];
    var futuro = this.tarokki[Math.floor(Math.random() * this.tarokki.length)];
    taroks[0] = passato;
    taroks[1] = presente;
    taroks[2] = futuro;
    this.flip();
    return taroks;
  }

  shuffle(array) {
    this.flip();
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  loop5() {
    this.flip();
    let i = 0;
    let timer = setInterval(function () {
      this.shuffle1();
      if (i >= 10001) {
        clearInterval(timer);
      }
      i++;
    }, 500);
  }

  shuffle1() {
    this.tarokki.sort(() => Math.random() - 0.5);
    this.shuffle(this.tarokki);
  }
}
