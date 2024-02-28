import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonCol, IonRow, IonIcon, IonButton, IonRippleEffect, IonLabel, IonImg, IonAvatar, IonChip, IonText } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonGrid, IonCol, IonRow, IonChip, IonAvatar, IonImg, IonLabel, IonText, IonIcon, IonButton, IonRippleEffect],
})
export class Tab1Page {

  constructor() {}
}
