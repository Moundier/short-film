import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, ViewChild } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonCol, IonRow, IonChip, IonAvatar, IonImg, IonLabel, IonText, IonIcon, IonButton, IonButtons, IonBackButton, IonMenuButton, IonRippleEffect, IonPopover, IonList, IonItem } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CommonModule } from '@angular/common';
import { cogSharp } from 'ionicons/icons';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
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
export class Tab2Page {

  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;

  logActiveIndex() {
    console.log(this.swiperRef?.nativeElement.swiper.activeIndex);
  }

  constructor() {}

  onSlideChange() {
    console.log('Works')
  }

}
