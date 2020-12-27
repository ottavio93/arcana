import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarotsComponent } from './tarots.component';

describe('TarotsComponent', () => {
  let component: TarotsComponent;
  let fixture: ComponentFixture<TarotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
