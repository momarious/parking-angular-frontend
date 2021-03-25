import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReservationSecondStepPage } from './reservation-second-step.page';

describe('ReservationSecondStepPage', () => {
  let component: ReservationSecondStepPage;
  let fixture: ComponentFixture<ReservationSecondStepPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationSecondStepPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReservationSecondStepPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
