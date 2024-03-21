
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CommonModule } from '@angular/common';

import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonCol, IonRow,
  IonIcon, IonButton, IonButtons, IonBackButton, IonMenuButton, IonRippleEffect,
  IonLabel, IonImg, IonAvatar, IonChip, IonText, IonPopover, IonList, IonItem,
} from '@ionic/angular/standalone';

import { CUSTOM_ELEMENTS_SCHEMA, Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { InteractionType, UserModel } from '../shared/auth.data.transfer.object';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserStore } from '../blueprint/user.store.service';

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

  public isTutorialComplete: boolean = false;
  public isPlayingVideo: boolean = false;
  public showOptions: boolean = false;
  public InteractionType: typeof InteractionType = InteractionType;

  @ViewChild('videoElement') public videoElement: HTMLVideoElement | undefined;

  constructor() { }

  ngOnInit(): void {
    console.log('[Load] Tab 1');
    this.videoElement?.play
  }

  public swiperSlideChange(e: any): void {
    console.log(e);
  }

  public event(e: any) {
    console.log(e);
  }

  public handleTap(e: any, item: Data): void {
    switch (e) {
      case InteractionType.ACTION_PLAY_STOP:
        console.log(`PLAY_STOP`, item);
        break;
      case InteractionType.ACTION_VOLUME:
        console.log(`VOLUME`, item);
        break;
      case InteractionType.ACTION_LIKE:
        console.log(`LIKE`, item);
        break;
      case InteractionType.ACTION_DISLIKE:
        console.log(`DISLIKE`, item);
        break;
      case InteractionType.ACTION_COMMENT:
        console.log(`COMMENT`, item);
        break;
      case InteractionType.ACTION_BOOKMARK:
        console.log(`ACTION_BOOKMARK`, item);
        break;
      case InteractionType.ACTION_SEE_MORE_USER:
        console.log(`SEE_MORE_ITEM`, item);
        break;
      case InteractionType.ACTION_OPTIONS:
        console.log(`OPTIONS`, item);
        this.showOptions = !this.showOptions;
        break;
      case InteractionType.ACTION_REPORT:
        console.log(`REPORT`, item);
        break;
      case InteractionType.ACTION_SHARE:
        console.log(`SHARE`, item);
        break;
    }
  }

  public toggleVideo(video: HTMLVideoElement): void {
    const videoIsPaused: boolean = video.paused;
    this.isPlayingVideo = video ? true : false;

    if (videoIsPaused) {
      video.play();
    } else {
      video.pause();
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

interface Data {
  owner: string;
  image: string;
  domain: string;
  domainImage: string;
  liked: number;
  disliked: number;
  comments: number;
}

export interface ProgramEntity {
  programId: number;
  imageSource: string;
  domainImageSource: string;
  title: string;
  numberUnique: string;
  classification: string;
  summary: string;
  objectives: string;
  defense: string;
  results: string;
  dateStart: string;
  dateFinal: string;
  status: string;
  hyperlink: string;
}

// export interface HttpResponse<T> {
//   timestamp: string;
//   statusCode: number;
//   status: string;
//   message: string;
//   data: { page: T };
// }

@Injectable({
  providedIn: 'root'
})
class ProgramService {

  constructor(
    private http: HttpClient,
  ) { }

  private API: string = 'http://localhost:9090';

  public findPrograms(page = 0, size = 10): Observable<ProgramEntity> {
    return this.http.get<ProgramEntity>(`${this.API}/programs?page=${page}&size=${size}`);
  }
}

@Injectable({
  providedIn: 'root'
})
class InteractionService {

  constructor(
    private http: HttpClient,
    private userStore: UserStore,
  ) { }
  
  private API: string = 'http://localhost:9090';

  public saveInteraction(actionType: ActionType, content: string, programId: number): void {
    
    let user: UserModel = this.userStore.getUserState();

    const interactionModel: InteractionModel = {
      // interactionId: 0,
      actionType: actionType,
      object: JSON.stringify(content),
      user: user.userId,
      program: programId,
      date: new Date(0),
    };

    this.http.post<any>(`${this.API}/interaction`, interactionModel);
  }

  public findExistsInteraction(userId: number, programId: number): boolean {
    // Note: not found, then it is a save request
    // Note: else found, then it is a putch request
    return false;
  }

  public findInteractions() {

  }

  public editInteraction(actionType: ActionType, content: string, programId: number) {
    return null;
  }

}

interface InteractionModel {
  interactionId?: number;
  actionType?: ActionType;
  object?: string; // Assuming object is stored as JSON string
  user?: number;
  program?: number;
  date?: Date;
}

enum ActionType {
  ACTION_LIKE,
  ACTION_DISLIKE,
  ACTION_RATING,
  ACTION_SHARE,
  ACTION_BOOKMARK,
  ACTION_REPORT,
  ACTION_DETAILS_TIME_SPENT, // Ignored by now
  ACTION_COMMENT,
}