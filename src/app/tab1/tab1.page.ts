import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonCol, IonRow, IonIcon, IonButton, IonButtons, IonBackButton, IonMenuButton, IonRippleEffect, IonLabel, IonImg, IonAvatar, IonChip, IonText, IonPopover, IonList, IonItem } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Data } from './data';
import { CommonModule } from '@angular/common';

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
    IonItem
  ],
})
export class Tab1Page implements OnInit {

  @ViewChildren('dinamic') 
  elements: QueryList<ElementRef> = new QueryList<ElementRef>();

  constructor() { }

  ngOnInit(): void {
    this.adjustElementHeight();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    console.log('Window resized:', event.target.innerWidth, 'x', event.target.innerHeight);
    this.adjustElementHeight();
  }

  adjustElementHeight() {
    const screenHeight = window.innerHeight;
    const heightPercentage = 50; // Adjust this percentage as needed

    for (const e of this.elements) {
      const element = e.nativeElement;
      console.log(e.nativeElement)
      element.style.height = screenHeight * heightPercentage / 100 + 'px';
    }
  }
  

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
      owner: "Chen",
      ownerImage: "jane-smith.jpg",
      domain: "example2.com",
      domainImage: "example2.jpg",
      liked: 15,
      disliked: 3,
      comments: 30
    },
  ];


}
