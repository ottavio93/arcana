import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestiTarokkiComponent } from './testi-tarokki.component';

describe('TestiTarokkiComponent', () => {
  let component: TestiTarokkiComponent;
  let fixture: ComponentFixture<TestiTarokkiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestiTarokkiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestiTarokkiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
