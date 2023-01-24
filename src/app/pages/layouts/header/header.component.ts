import { Component, OnInit } from '@angular/core';
import { SidenavService } from 'src/app/shared/services/sidenav/sidenav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private sidenavService: SidenavService) { }

  ngOnInit(): void {
  }

  toggleCart(): void {
    this.sidenavService.toggle();
  }
}
