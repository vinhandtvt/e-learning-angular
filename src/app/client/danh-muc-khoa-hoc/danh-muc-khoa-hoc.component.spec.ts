import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhMucKhoaHocComponent } from './danh-muc-khoa-hoc.component';

describe('DanhMucKhoaHocComponent', () => {
  let component: DanhMucKhoaHocComponent;
  let fixture: ComponentFixture<DanhMucKhoaHocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanhMucKhoaHocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhMucKhoaHocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
