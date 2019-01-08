import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDrinkFormComponent } from './create-drink-form.component';

describe('CreateDrinkFormComponent', () => {
  let component: CreateDrinkFormComponent;
  let fixture: ComponentFixture<CreateDrinkFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDrinkFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDrinkFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
