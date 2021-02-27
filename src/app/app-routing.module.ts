import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'watch/:id', component: VideoPlayerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
