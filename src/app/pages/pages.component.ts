import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SidenavService } from '../shared/services/sidenav/sidenav.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit, AfterViewInit {
  @ViewChild('sidenav') sidenav: any;

  constructor(private sidenavService: SidenavService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }
}
