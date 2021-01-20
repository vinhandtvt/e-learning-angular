import  Swal  from 'sweetalert2';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private data = new BehaviorSubject(''); // '' là giá trị ban đầu của phim
  public searchText = this.data.asObservable();

  // Observe the course t modify 
  private course = new BehaviorSubject({}); // giá trị ban đầu là object trống
  public courseToModify = this.course.asObservable();

  token: any;


  constructor(private http: HttpClient, private router: Router) { }

  handleErr(err: any): any {
    switch ( err.status ) {
      case 500:
        // alert(err.error);
        Swal.fire(err.error);
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

  daDangNhap() {
    return !!localStorage.getItem('token');
    // console.log(!!localStorage.getItem('token'));
  }

  dangXuat() {
    localStorage.removeItem('token');
    this.router.navigate(['/client']);
  }

  getToken(): any {
    return localStorage.getItem('token')
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


  // Service find all users
  getAllUsers(maNhom: string, page: number, size: number): Observable<any> {
    return this.http.get(`https://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung_PhanTrang?MaNhom=${maNhom}&page=${page}&pageSize=${size}`).pipe(
      tap((data: any) => {
        // loading
      }),
      catchError( err => {
        return this.handleErr(err);
      })
    )
  }

  deleteUser(userName: string) {
    return this.http.delete(`https://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${userName}`, { responseType: 'text'}).pipe(
      tap((data: any) => {
        // loading        
      }),
      catchError( err => {
        return this.handleErr(err);
      })
    )
  }

  getUserInfo(taiKhoan: string, matKhau: string) {
    const user = { 'taiKhoan': taiKhoan, 'matKhau': matKhau};
    return this.http.post(`https://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan`, user).pipe(
      tap( (data: any) => {
        //loading
      }),
      catchError(err => {
        return this.handleErr(err);
      })
    )
  }

  addUser(data: any){
    const url = 'https://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThemNguoiDung';
    return this.http.post(url, data).pipe(
      tap((data: any) => {
        // loading
      }
    ),
    catchError( err => {
      return this.handleErr(err);
    })
    ); 
  }

  // course management services

  getAllCourse(maNhom: string){
    return this.http.get(`https://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=${maNhom}`).pipe(
      tap( res => {
        //loading
      }),
      catchError( err => {
        return this.handleErr(err);
      })
    )
  }

  addCourse(course: any) {
    return this.http.post(`https://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/ThemKhoaHoc`, course).pipe(
      tap( res => {

      }),
      catchError( err => {
        return this.handleErr(err);
      })
    )
  }

  uploadPicture(data: any) {
    return this.http.post(`https://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/UploadHinhAnhKhoaHoc`, data, {responseType: 'text'}).pipe(
      tap( res => {

      }),
      catchError( err => {
        return this.handleErr(err);
      })
    )
  }

  // service which delete course by maKhoaHoc + Bearer accessToken
  deleteCourse(maKhoaHoc: string) {
    return this.http.delete(`https://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/XoaKhoaHoc?MaKhoaHoc=${maKhoaHoc}`, { responseType: 'text'}).pipe(
      tap( (data: any) => {
        //loading
      }),
      catchError( err => {
        return this.handleErr(err);
      })
    )
  }

  modifyCourse(course: object) {
    this.course.next(course);
  }

  // service that register a course
  courseRegister(maKhoaHoc: string) {
    const body = {
      maKhoaHoc: maKhoaHoc,
      taiKhoan: JSON.parse(this.getToken()).taiKhoan
    }
    // console.log(body);
    
    return this.http.post(`https://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/DangKyKhoaHoc`, body, { responseType: 'text'}).pipe(
    tap( data => {
      // loading
    }),
    catchError( err => {
      return this.handleErr(err);
    })
    )
  }

  // get logged user info
  loggedUserCourses(taiKhoan: string) {
    const body = {
      taiKhoan: taiKhoan,
      matKhau: ''
    }
    return this.http.post(`https://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan`, body).pipe(
      tap( (data: any) => {
        //loading data
      }),
      catchError( err => {
        return this.handleErr(err);
      })
    )
  }

  // Service Hủy khóa học đá ghi danh

  cancelCourse(maKhoaHoc: string) {
    const body = {
      maKhoaHoc: maKhoaHoc,
      taiKhoan: JSON.parse(this.getToken()).taiKhoan
    }
    return this.http.post(`https://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/HuyGhiDanh`, body, { responseType: 'text'}).pipe(
      tap( (data: any) => {
        //loading
      }),
      catchError( err => {
        return this.handleErr(err)
      })
    )
    
  }

  // service cập nhật thông tin người dùng

  updateProfile(data: any) {
    return this.http.put(`https://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, data).pipe(
      tap( data => {
        // loading
      }),
      catchError( err => {
        return this.handleErr(err)
      })
    )
  }


  // services liên quan tới việc ghi danh khóa học dựa trên user account

  getUnresgiteredCourseByUser(account: string): Observable<any> {
    const body = {};
    return this.http.post(`https://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachKhoaHocChuaGhiDanh?TaiKhoan=${account}`, body).pipe(
      tap( data => {
        // loading
      }),
      catchError( err => {
        return this.handleErr(err);
      })
    )
  }

  registerCourseByUser(data: any) {
    return this.http.post(`https://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/GhiDanhKhoaHoc`, data, { responseType: 'text'}).pipe(
      tap( (data: any) => {
        //loading
      }),
      catchError( err => {
        return this.handleErr(err);
      })
    )
  }

  unRegisterCourseByUser(data: any) {
    return this.http.post('https://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/HuyGhiDanh', data, { responseType: 'text'}).pipe(
      tap( (data: any) => {
        //loading
      }),
      catchError( err => {
        return this.handleErr(err);
      })
    )

  }

  getUnauthenticationCoursesByUser(taiKhoan: string) {
    const body = {
      taiKhoan: taiKhoan
    }
    return this.http.post(`https://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet`, body).pipe(
      tap( (data: any) => {
        //loading
      }),
      catchError( err => {
        return this.handleErr(err);
      })
    )
  }

  getAuthenticationCoursesByUser(taiKhoan: string) {
    const body = {
      taiKhoan: taiKhoan
    }
    return this.http.post('https://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet', body).pipe(
      tap( (data: any) => {
        //loading
      }),
      catchError( err => {
        return this.handleErr( err);
      })
    )
  }

  
  // services liên quan tới ghi danh khóa học dựa trên khóa học maKhoaHoc

  getUnregisteredUsersByCourse(data: any) {
    return this.http.post('https://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDungChuaGhiDanh', data).pipe(
      tap( (data: any) => {
        //loading
      }),
      catchError( err => {
        return this.handleErr(err);
      })
    )
  }

  getWaitingApprovalUsers(data: any) {
    return this.http.post('https://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachHocVienChoXetDuyet', data).pipe(
      tap( (data: any)=> {
        //loading
      }),
      catchError( err => {
        return this.handleErr(err);
      })
    )
  }

  getRegisteredUsers(data: any) {
    return this.http.post('https://elearning0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc', data).pipe(
      tap( (data: any) => {
        //loading
      }),
      catchError( err => {
        return this.handleErr(err);
      })
    )
  }


}
