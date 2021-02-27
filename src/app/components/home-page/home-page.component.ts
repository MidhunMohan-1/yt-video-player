import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VideosService } from '../../services/videos.service'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  videos: any;

  constructor(private videoService: VideosService, private router: Router) { }

  ngOnInit(): void {
    this.videoService.getJSON().subscribe(data => {
      console.log(data);
      this.videos = data;
    });
  }

  toggleSearchBox() {
    const header = document.querySelector('.top');
    if (header.classList.contains('search_active')) {
      header.classList.remove('search_active');
    } else {
      header.classList.add('search_active');
    }
  }

  toggleSideMenu() {
    const wrapper = document.querySelector('.wrapper');
    if (window.matchMedia('(max-width: 1300px)').matches) {
      wrapper.classList.remove('menu_small');
      if (wrapper.classList.contains('menu_overlay')) {
        wrapper.classList.remove('menu_overlay');
      } else {
        wrapper.classList.add('menu_overlay');
      }
    } else {
      wrapper.classList.remove('menu_overlay');
      if (wrapper.classList.contains('menu_small')) {
        wrapper.classList.remove('menu_small');
      } else {
        wrapper.classList.add('menu_small');
      }
    }
  }

  goToVideoPlayerPage(id) {
    this.router.navigate(['/watch', id]);
  }

}
