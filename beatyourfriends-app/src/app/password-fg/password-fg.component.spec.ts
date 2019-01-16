import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordFgComponent } from './password-fg.component';

describe('PasswordFgComponent', () => {
  let component: PasswordFgComponent;
  let fixture: ComponentFixture<PasswordFgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordFgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordFgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
