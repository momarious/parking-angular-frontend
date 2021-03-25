import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditAccountPoPage } from './edit-account-po.page';

describe('EditAccountPoPage', () => {
  let component: EditAccountPoPage;
  let fixture: ComponentFixture<EditAccountPoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAccountPoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditAccountPoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
