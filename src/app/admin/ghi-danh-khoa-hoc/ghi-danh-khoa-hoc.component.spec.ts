import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GhiDanhKhoaHocComponent } from './ghi-danh-khoa-hoc.component';

describe('GhiDanhKhoaHocComponent', () => {
  let component: GhiDanhKhoaHocComponent;
  let fixture: ComponentFixture<GhiDanhKhoaHocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GhiDanhKhoaHocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GhiDanhKhoaHocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
