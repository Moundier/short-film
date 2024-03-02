
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CommonModule } from '@angular/common';

import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonCol, IonRow,
  IonIcon, IonButton, IonButtons, IonBackButton, IonMenuButton, IonRippleEffect,
  IonLabel, IonImg, IonAvatar, IonChip, IonText, IonPopover, IonList, IonItem, 
} from '@ionic/angular/standalone';

import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { register } from 'swiper/element/bundle';

register();


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainerComponent,
    IonGrid,
    IonCol,
    IonRow,
    IonChip,
    IonAvatar,
    IonImg,
    IonLabel,
    IonText,
    IonIcon,
    IonButton,
    IonButtons,
    IonBackButton,
    IonMenuButton,
    IonRippleEffect,
    IonContent,
    IonPopover,
    IonList,
    IonItem,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Tab1Page implements OnInit {

  public Interaction = Interaction;
  
  @ViewChild('videoElement') videoElement: HTMLVideoElement | undefined;
  isPlaying: boolean = false;

  constructor() { }

  ngOnInit(): void {
    console.log('[Load] Tab 1');
    this.videoElement?.play
  }

  swiperSlideChange(e: any) {
    console.log(e);
  }

  handleTap(e: any, item: Data) {
    switch (e) {
      case Interaction.PLAY_STOP:
        console.log(`PLAY_STOP`, item);
        break;
      case Interaction.VOLUME:
        console.log(`VOLUME`, item);
        break;
      case Interaction.LIKE:
        console.log(`LIKE`, item);
        break;
      case Interaction.DISLIKE:
        console.log(`DISLIKE`, item);
        break;
      case Interaction.COMMENT:
        console.log(`COMMENT`, item);
        break;
      case Interaction.SHARE:
        console.log(`SHARE`, item);
        break;
      case Interaction.SEE_MORE_USER:
        console.log(`SEE_MORE_ITEM`, item);
        break;
      case Interaction.SEE_MORE_ITEM:
        console.log(`SEE_MORE_ITEM`, item);
        break;
    }
  }

  private onPlay() {
    this.isPlaying = true;
    console.log(`[Video context] Playing`);
  }

  private onPause() {
    this.isPlaying = false;
    console.log(`[Video context] Paused`)
  }

  public toggleVideo(video: HTMLVideoElement | undefined) {

    if (!video) {
      return;
    }

    if (video.paused) {
      video.play();
      this.onPlay();
    } else {
      video.pause();
      this.onPause();
    }
  }

  list: Data[] = [
    {
      owner: "John Doe",
      image: "https://placehold.co/400x600/6495ED/FFF",
      domain: "example.com",
      domainImage: "example.jpg",
      liked: 10,
      disliked: 5,
      comments: 20
    },
    {
      owner: "Ana",
      image: "https://placehold.co/400x600/2A690A/FFF",
      domain: "example2.com",
      domainImage: "example2.jpg",
      liked: 15,
      disliked: 3,
      comments: 30
    },
    {
      owner: "Bob",
      image: "https://placehold.co/400x600/0000FF/FFF",
      domain: "example2.com",
      domainImage: "example2.jpg",
      liked: 15,
      disliked: 3,
      comments: 30
    },
    {
      owner: "Chen",
      image: "https://placehold.co/400x600/CC0000/FFF",
      domain: "example2.com",
      domainImage: "example2.jpg",
      liked: 15,
      disliked: 3,
      comments: 30
    },
    {
      owner: "Um nome bem grande como teste de display. Limitar caso atrapalhe o botao ao lado.",
      image: "https://placehold.co/400x600/FFA500/FFF",
      domain: "example2.com",
      domainImage: "example2.jpg",
      liked: 15,
      disliked: 3,
      comments: 30
    },
  ];

}

enum Interaction {
  IMAGE,
  VOLUME,
  PLAY_STOP,
  LIKE,
  DISLIKE,
  COMMENT,
  SHARE,
  OPTIONS,
  DOMAIN_DETAILS,
  SEE_MORE_USER,
  SEE_MORE_ITEM,
}

interface Data {
  owner: string;
  image: string;
  domain:  string;
  domainImage:  string;
  liked: number;
  disliked: number;
  comments: number;
}
