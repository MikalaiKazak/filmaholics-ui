import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MovieplayPage } from './movieplay.page';

describe('MovieplayPage', () => {
  let component: MovieplayPage;
  let fixture: ComponentFixture<MovieplayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieplayPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieplayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
