import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  subscribeForm: FormGroup
  contactForm: FormGroup
  constructor() {
    this.subscribeForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email])
    });
    this.contactForm = new FormGroup({
      hoTen: new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$")]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      soDT: new FormControl(null, [Validators.required]),
      message: new FormControl(null, [Validators.required])
    })

   }

  ngOnInit(): void {
  }

  contactUs() {
    const contactInfo = {
      hoTen: this.contactForm.value.hoTen,
      email: this.contactForm.value.email,
      soDT: this.contactForm.value.soDT,
      message: this.contactForm.value.message
    }
    console.log(contactInfo);
    Swal.fire("Cảm ơn ! Chúng tôi sẽ liên hệ lại bạn sớm!")
    this.contactForm.reset();
  }

  subscribed(subscribeForm: any) {
    const subEmail = {
      email: this.subscribeForm.value.email
    }    
    Swal.fire("Cảm ơn bạn đã đăng ký!");
    this.subscribeForm.reset();
  }

  get email() { return this.subscribeForm.get("email")}
  get hoTenCT() { return this.contactForm.get("hoTen")}
  get emailCT() { return this.contactForm.get("email")}
  get soDTCT() { return this.contactForm.get("soDT")}
  get messageCT() { return this.contactForm.get("message")}
  
}
