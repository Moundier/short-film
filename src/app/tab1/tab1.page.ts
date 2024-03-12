
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CommonModule } from '@angular/common';

import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonCol, IonRow,
  IonIcon, IonButton, IonButtons, IonBackButton, IonMenuButton, IonRippleEffect,
  IonLabel, IonImg, IonAvatar, IonChip, IonText, IonPopover, IonList, IonItem,
} from '@ionic/angular/standalone';

import { CUSTOM_ELEMENTS_SCHEMA, Component, Injectable, Injector, OnInit, ViewChild } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { Interaction } from '../shared/auth.data.transfer.object';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

register();

type TypeInteraction = Interaction;

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

  public isVideoPlaying: boolean = false;
  public showOptions: boolean = false;
  public Interaction: typeof Interaction = Interaction;

  @ViewChild('videoElement') public videoElement: HTMLVideoElement | undefined;

  constructor() { }

  ngOnInit(): void {
    console.log('[Load] Tab 1');
    this.videoElement?.play
  }

  swiperSlideChange(e: any): void {
    console.log(e);
  }

  event(e: any) {
    console.log(e);
  }

  handleTap(e: any, item: Data): void {
    switch (e) {
      case Interaction.ACTION_PLAY_STOP:
        console.log(`PLAY_STOP`, item);
        break;
      case Interaction.ACTION_VOLUME:
        console.log(`VOLUME`, item);
        break;
      case Interaction.ACTION_LIKE:
        console.log(`LIKE`, item);
        break;
      case Interaction.ACTION_DISLIKE:
        console.log(`DISLIKE`, item);
        break;
      case Interaction.ACTION_COMMENT:
        console.log(`COMMENT`, item);
        break;
      case Interaction.ACTION_BOOKMARK:
        console.log(`ACTION_BOOKMARK`, item);
        break;
      case Interaction.ACTION_SEE_MORE_USER:
        console.log(`SEE_MORE_ITEM`, item);
        break;
      case Interaction.ACTION_OPTIONS:
        console.log(`OPTIONS`, item);
        this.showOptions = !this.showOptions;
        break;
      case Interaction.ACTION_REPORT:
        console.log(`REPORT`, item);
        break;
      case Interaction.ACTION_SHARE:
        console.log(`SHARE`, item);
        break;
    }
  }

  public toggleVideo(video: HTMLVideoElement): void {

    const videoIsPaused: boolean = video.paused;
    this.isVideoPlaying = video ? true : false;

    if (videoIsPaused) {
      video.play();
    } else video.pause();
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

interface Data {
  owner: string;
  image: string;
  domain: string;
  domainImage: string;
  liked: number;
  disliked: number;
  comments: number;
}

@Injectable()
class UserToInteractionsService {

  constructor(
    private http: HttpClient
  ) { }

  public saveInteraction<T>(): Observable<T> {
    return this.http.post<T>(``, null);
  }
}