import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
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

  ngOnInit(): void {
    console.log(this.tarokki);
  }

  flip() {
    $('.card').toggleClass('flipped');
  }

  tarokkinondoppiati = this.getRandomTaroks();
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
    this.flip();
    return taroks;
  }

  dragStart(event) {
    event.dataTransfer.setData('Text', event.target.id);
  }

  allowDrop(event) {
    event.preventDefault();
    document.getElementById('demo').innerHTML =
      'The p element is OVER the droptarget.';
    event.target.style.border = '4px dotted green';
  }

  drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData('Text');
    event.target.appendChild(document.getElementById(data));
    document.getElementById('demo').innerHTML = 'The p element was dropped.';
  }
}
