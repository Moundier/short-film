import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, Injectable, ViewChild } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonCol, IonRow, IonChip, IonAvatar, IonImg, IonLabel, IonText, IonIcon, IonButton, IonButtons, IonBackButton, IonMenuButton, IonRippleEffect, IonPopover, IonList, IonItem } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CommonModule } from '@angular/common';
import { register } from 'swiper/element/bundle';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { compassSharp } from 'ionicons/icons';

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

  public list: any[] = [
    {
      "itemId": 0,
      "itemName": "The Inner Workings of the Atom: Exploring Atomic Structure",
      "itemImage": "https://placehold.co/250x320/333333/FF5733",
    },
    {
      "itemId": 1,
      "itemName": "The Biology of Cells: Investigating the Building Blocks of Life",
      "itemImage": "https://placehold.co/250x320/FF78AD/33FF57",
    },
    {
      "itemId": 2,
      "itemName": "Newton's Laws in Action: Exploring Classical Mechanics",
      "itemImage": "https://placehold.co/250x320/44AAAAD/5733FF",
    },
    {
      "itemId": 3,
      "itemName": "Server Side Applications for the Web",
      "itemImage": "https://placehold.co/250x320/99ADFC/FF5733",
    },
    {
      "itemId": 4,
      "itemName": "The Human Body: Anatomy and Physiology Explained",
      "itemImage": "https://placehold.co/250x320/AAAAA9/33FF57",
    },
    {
      "itemId": 5,
      "itemName": "Mathematics in Motion: Exploring Patterns and Algorithms",
      "itemImage": "https://placehold.co/250x320/CFB829/5733FF",
    },
    {
      "itemId": 6,
      "itemName": "Astrophysics: A Journey Through the Cosmos",
      "itemImage": "https://placehold.co/250x320/FF5733/78ADFC",
    },
    {
      "itemId": 7,
      "itemName": "Chemical Reactions: Understanding Molecular Transformations",
      "itemImage": "https://placehold.co/250x320/33FF57/AA33FF",
    },
    {
      "itemId": 8,
      "itemName": "Artificial Intelligence: Exploring Intelligent Systems",
      "itemImage": "https://placehold.co/250x320/5733FF/CFB829",
    },
    {
      "itemId": 9,
      "itemName": "Environmental Science: Investigating Ecosystems and Sustainability",
      "itemImage": "https://placehold.co/250x320/DADA22/44AAAAD",
    },
    {
      "itemId": 10,
      "itemName": "Robotics and Automation: Designing Autonomous Systems",
      "itemImage": "https://placehold.co/250x320/78ADFC/FF78AD",
    }
  ];

  public selectedButton: string | null = null;

  constructor(private keywordEntityService: KeywordEntityService) { }

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

  findBookmark(): void {
    console.log(`Found bookmark`);
  }

  wipeBookmark(): void {
    console.log('Delete click');
  }

  openModal(): void {

  }

  data: any[] = [];
  loading: boolean = false;
  pageNumber: number = 0;
  pageSize: number = 20;

  findAllKeywordPaginated(): Observable<any> {
    return this.keywordEntityService.findAllKeywordsPaginated(this.pageNumber, this.pageSize);
  }

}

@Injectable({
  providedIn: 'root'
})
class UserToPreferencesService {

  private API: string = '';

  constructor() {  }

  public saveInteraction(userId: number, programId: number): void {
    
    return;
  }

}

@Injectable({
  providedIn: 'root'
})
class KeywordEntityService {
  
  constructor(private http: HttpClient) {  }

  private API: string = 'user_to_preferences';

  // Put these on component

  public findAllKeywordsPaginated(pageNumber: number = 0, pageSize: number = 20): Observable<any> {
    
    let params: HttpParams = new HttpParams()
    .set(`pageNumber`, pageNumber.toString())
    .set(`pageSize`, pageSize.toString());
    
    return this.http.get<any>(`${this.API}`, { params });
  }
}