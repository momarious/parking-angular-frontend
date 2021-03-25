import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Tab43Page } from './tab43.page';

describe('Tab43Page', () => {
  let component: Tab43Page;
  let fixture: ComponentFixture<Tab43Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Tab43Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab43Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
