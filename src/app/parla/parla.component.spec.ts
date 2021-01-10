import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParlaComponent } from './parla.component';

describe('ParlaComponent', () => {
  let component: ParlaComponent;
  let fixture: ComponentFixture<ParlaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParlaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParlaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
