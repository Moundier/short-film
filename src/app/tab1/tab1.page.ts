import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonCol, IonRow, IonIcon, IonButton, IonRippleEffect, IonLabel, IonImg, IonAvatar, IonChip, IonText, IonPopover, IonList, IonItem } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Data } from './data';
import { CommonModule, NgFor } from '@angular/common';

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
    IonRippleEffect,
    IonContent,
    IonPopover,
    IonList,
    IonItem
  ],
})
export class Tab1Page {

  constructor() { }

  list: Data[] = [
    {
      owner: "John Doe",
      ownerImage: "john-doe.jpg",
      domain: "example.com",
      domainImage: "example.jpg",
      liked: 10,
      disliked: 5,
      comments: 20
    },
    {
      owner: "Ana",
      ownerImage: "jane-smith.jpg",
      domain: "example2.com",
      domainImage: "example2.jpg",
      liked: 15,
      disliked: 3,
      comments: 30
    },
    {
      owner: "Bob",
      ownerImage: "jane-smith.jpg",
      domain: "example2.com",
      domainImage: "example2.jpg",
      liked: 15,
      disliked: 3,
      comments: 30
    },
    {
      owner: "Criss",
      ownerImage: "jane-smith.jpg",
      domain: "example2.com",
      domainImage: "example2.jpg",
      liked: 15,
      disliked: 3,
      comments: 30
    },
  ]
}
