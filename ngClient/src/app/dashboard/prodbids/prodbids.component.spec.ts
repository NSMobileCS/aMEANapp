import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdbidsComponent } from './prodbids.component';

describe('ProdbidsComponent', () => {
  let component: ProdbidsComponent;
  let fixture: ComponentFixture<ProdbidsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdbidsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdbidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
