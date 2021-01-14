import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onActivate(event: any) {
    window.scroll(0,0);
  }

}
