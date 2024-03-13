import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonInput, IonToggle, IonLabel, IonNote, IonTextarea, IonThumbnail, ModalController } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { register } from 'swiper/element/bundle';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenService } from '../blueprint/auth.token.service';
import { LoginService } from '../login/login.service';
import { UserModel } from '../shared/auth.data.transfer.object';

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
    IonTextarea,
    IonToolbar
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA ]
})
export class Tab3Page implements OnInit {

  accountForm!: FormGroup;
  secretsForm!: FormGroup;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private tokenService: TokenService,
    private router: Router,
    private loginService: LoginService,
    
  ) { }

  ngOnInit(): void {
    this.accountForm = new UserForms(this.formBuilder).accountCreateForm();
    this.secretsForm = new UserForms(this.formBuilder).secretsCreateForm();

    // Load user Preferences
    console.log('[Load] Tab 3');
  }

  logout(): void {
    this.tokenService.removeToken();
    this.router.navigate([`login`]);
  }

  async openModal(param: string): Promise<void> {
    let modal = this.modalController.create({
      component: Modal,
      componentProps: {
        itemName: param,
      },
      animated: true,
      backdropDismiss: true
    });

    (await modal).present();
  }
}

class UserForms {

  private formBuilder: FormBuilder;

  constructor(formBuilder: FormBuilder) {
    this.formBuilder = formBuilder;
  }

  accountCreateForm(): FormGroup<any> {
    return this.formBuilder.group({
      email: [``, ],
      firstName: [``,],
      lastName: [``,],
      password: [``,],
      role: [``,],
      termsAcceptedDate: [``,],
      userId: [``,],
    });
  }  
  
  secretsCreateForm(): FormGroup<any> {
    return this.formBuilder.group({
      password: [``, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      confirmPassword: [``, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]]
    });
  }

}

@Component({
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-buttons (click)="closeModal()" slot="start">
          <ion-back-button default-href="#"></ion-back-button>
        </ion-buttons>

        <ion-title>
          Tab 3 {{ itemName }}
        </ion-title>
      </ion-toolbar>
    </ion-header>
  `,
  standalone: true,
  imports: [IonicModule],
})
class Modal implements OnInit {

  @Input() itemName!: string;

  constructor(
    private modalController: ModalController,
    private router: Router
  ) { } 

  ngOnInit(): void {
    console.log(`[Modal] on Tab3 '${this.itemName}'`)
  }

  closeModal(): void {
    this.router.navigate([`tabs/tab3`]);
    this.modalController.dismiss();
  }
}