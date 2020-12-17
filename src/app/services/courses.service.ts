import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private data = new BehaviorSubject(''); // '' là giá trị ban đầu của phim
  public searchText = this.data.asObservable();


  constructor(private http: HttpClient) { }

  handleErr(err: any): any {
    switch ( err.status ) {
      case 500:
        alert(err.error);
        break;
      default:
        break;
    }
    return throwError(err);
  }

  layDanhMucKhoaHoc(): Observable<any> {
    return this.http.get(`https://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhMucKhoaHoc`).pipe(
      tap((data: any) => {
        // loading
      }
    ),
    catchError( err => {
      return this.handleErr(err);
    })
    );
  }
  
  // gọi api lấy danh sách khóa học:
  // api: https://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP07
  layDanhSachKhoaHoc(maNhom: string): Observable<any> {
    return this.http.get(`https://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=${maNhom}`).pipe(
      tap((data: any) => {
        // loading
      }),
      catchError( err => {
        return this.handleErr(err);
      })
    )
    
  }

  // gọi api lấy chi tiết khóa học

  getCourseDetail(maKhoaHoc: string): Observable<any> {
    return this.http.get(`https://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${maKhoaHoc}`).pipe(
      tap((data: any) => {
        // loading
      }
    ),
    catchError( err => {
      return this.handleErr(err);
    })
    );
  }

  //kết thúc gọi api lấy chi tiết khóa học

  // Request khóa học theo mã danh mục
  getCourseByCategory(maDanhMuc: string, maNhom: string): Observable<any> {
    return this.http.get(`https://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${maDanhMuc}&MaNhom=${maNhom}`).pipe(
      tap((data: any) => {
        // loading
      }
    ),
    catchError( err => {
      return this.handleErr(err);
    })
    );
  }
  // End of Request khóa học theo mã danh mục

  getSearchItem(text: any) {
    // this.searchItem = text;
    this.data.next(text);    
  }

  // DangNhap form 
  dangNhap(objDangNhap: any): Observable<any> {
    const url = 'https://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap';
    return this.http.post(url, objDangNhap).pipe(tap((data: any) => {
      //loading
    }),
    catchError(err => {
      return this.handleErr(err)
    }));
  }

  // Service đăng ký user 

  dangKy(objDangKy: any): Observable<any> {
    const url = 'https://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy';
    return this.http.post(url, objDangKy).pipe(
      tap((data: any) => {
        // loading
      }
    ),
    catchError( err => {
      return this.handleErr(err);
    })
    );
  }



}
