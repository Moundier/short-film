import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, ViewChild } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonCol, IonRow, IonChip, IonAvatar, IonImg, IonLabel, IonText, IonIcon, IonButton, IonButtons, IonBackButton, IonMenuButton, IonRippleEffect, IonPopover, IonList, IonItem } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CommonModule } from '@angular/common';

import { register } from 'swiper/element/bundle';

register();

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

  selectedButton: string | null = null;

  constructor() {}

  redirect(): void {

  }

  processString(inputStr?: string): string {
    if (inputStr === undefined) {
      return "Input string is undefined.";
    }

    const words = inputStr.split(' ');

    if (words.length <= 3) {
      return inputStr;
    } else {
      const firstPart = words.slice(0, 3).join(' ');
      return `${firstPart}...`;
    }
  }

  getUniqueTopics(): any[] {
    return [];
  }

  selectTopic(item: any): void {

  }

  getFilteredFavorites(): any[] {
    return [];
  }

  openCardModal(itemId: any): void {

  }

  removeFavorite(itemId: any): void {

  }

}
