import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  constructor(private route:Router)
  {

  }
  ngOnInit(): void {
    this.route.navigate(['/Home'])
  }
  title = 'IvyInternalApplication-AdminPortal';
}
