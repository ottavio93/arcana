import { Component, Input, OnInit } from '@angular/core';
import { Tarots2Component } from '../tarots2/tarots2.component';

@Component({
  selector: 'app-testi-tarokki',
  templateUrl: './testi-tarokki.component.html',
  styleUrls: ['./testi-tarokki.component.css'],
})
export class TestiTarokkiComponent implements OnInit {
  ngOnInit() {}
  @Input()
  nometarokko: string;

  @Input()
  testi: string;
  @Input()
  nometarokko2: string;

  @Input()
  testi2: string;

  @Input()
  nometarokko3: string;

  @Input()
  testi3: string;
}
