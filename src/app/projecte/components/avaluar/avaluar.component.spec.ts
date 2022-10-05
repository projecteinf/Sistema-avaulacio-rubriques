import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaluarComponent } from './avaluar.component';

describe('AvaluarComponent', () => {
  let component: AvaluarComponent;
  let fixture: ComponentFixture<AvaluarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvaluarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvaluarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
