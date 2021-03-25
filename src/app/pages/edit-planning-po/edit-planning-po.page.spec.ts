import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditPlanningPoPage } from './edit-planning-po.page';

describe('EditPlanningPoPage', () => {
  let component: EditPlanningPoPage;
  let fixture: ComponentFixture<EditPlanningPoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPlanningPoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditPlanningPoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
