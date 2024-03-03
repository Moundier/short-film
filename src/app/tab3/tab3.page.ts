import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonInput, IonToggle, IonLabel, IonNote, IonTextarea, IonThumbnail } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainerComponent,
    IonList,
    IonItem,
    IonThumbnail,
    IonInput,
    IonToggle,
    IonLabel,
    IonNote,
    IonTextarea
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA ]
})
export class Tab3Page {
  constructor() {}
}
