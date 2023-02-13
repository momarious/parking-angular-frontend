import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReservationFirstStepPage } from './reservation-first-step.page';

describe('ReservationFirstStepPage', () => {
  let component: ReservationFirstStepPage;
  let fixture: ComponentFixture<ReservationFirstStepPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationFirstStepPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReservationFirstStepPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
