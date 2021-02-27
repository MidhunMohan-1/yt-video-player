import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class VideosService {
  configUrl = '/assets/videos.json';
  
  constructor(private http: HttpClient) { }

  getJSON() {
    return this.http.get(this.configUrl);
  }
}
