import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { UserModel } from "../shared/auth.data.transfer.object";

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private userState: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>({});

  constructor() { }

  getUserState(): any {

  }

  setUserState(state: any): void {
    this.userState.next(state);  
  }

  mixUserState(partialState: Partial<any>) {
    const currentState = this.getUserState();
    this.setUserState({ ...currentState, ...partialState });
  }


}
