import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { VideosService } from '../../services/videos.service'

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {
  videoID: any;
  videos: any;
  iframeHTML: any;
  mainTitle: any;
  mainViews: any;
  mainElapsedTime: any;
  mainChannelName: any;
  mainAuthorThumbnail: any;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private videoService: VideosService,
    private sanitizer: DomSanitizer 
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.videoID = params.id;
      this.videoService.getJSON().subscribe(data => {
        console.log(data);
        this.videos = data;
        for(let key in this.videos) {
          if(this.videos[key].id === this.videoID) {
            this.mainTitle = this.videos[key].title;
            this.mainViews = this.videos[key].views;
            this.mainElapsedTime = this.videos[key].time_elapsed;
            this.mainChannelName = this.videos[key].author_name;
            this.mainAuthorThumbnail = this.videos[key].author_thumbnail;
            this.iframeHTML = this.sanitizer.bypassSecurityTrustHtml(this.videos[key].html);
          }
        }
      });
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
