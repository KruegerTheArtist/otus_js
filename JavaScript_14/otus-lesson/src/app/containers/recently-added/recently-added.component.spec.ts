import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlyAddedComponent } from './recently-added.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RecentlyAddedComponent', () => {
  let component: RecentlyAddedComponent;
  let fixture: ComponentFixture<RecentlyAddedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers:[
        BrowserAnimationsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentlyAddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
