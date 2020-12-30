import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GhiDanhComponent } from './ghi-danh.component';

describe('GhiDanhComponent', () => {
  let component: GhiDanhComponent;
  let fixture: ComponentFixture<GhiDanhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GhiDanhComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GhiDanhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
