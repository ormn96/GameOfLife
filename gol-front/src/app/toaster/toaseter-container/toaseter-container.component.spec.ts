import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToaseterContainerComponent } from './toaseter-container.component';

describe('ToaseterContainerComponent', () => {
  let component: ToaseterContainerComponent;
  let fixture: ComponentFixture<ToaseterContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToaseterContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToaseterContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
