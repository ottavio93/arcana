import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Tarots2Component } from './tarots2.component';

describe('Tarots2Component', () => {
  let component: Tarots2Component;
  let fixture: ComponentFixture<Tarots2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tarots2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Tarots2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
