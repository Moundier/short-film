
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CommonModule } from '@angular/common';

import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonCol, IonRow,
  IonIcon, IonButton, IonButtons, IonBackButton, IonMenuButton, IonRippleEffect,
  IonLabel, IonImg, IonAvatar, IonChip, IonText, IonPopover, IonList, IonItem 
} from '@ionic/angular/standalone';

import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Swiper from 'swiper';

import { register as swiperPrepare } from 'swiper/element/bundle';

swiperPrepare();

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

  constructor() { }

  ngOnInit(): void {
    console.log('[Load] Tab 1')
  }

  slideChange(e: any) {
    console.log('Change: ', e);
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
      image: "https://placehold.co/400x600/00FF00/FFF",
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
  domain:  string;
  domainImage:  string;
  liked: number;
  disliked: number;
  comments: number;
}
