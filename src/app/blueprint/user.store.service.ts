import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { UserModel } from "../shared/auth.data.transfer.object";

@Injectable({
  providedIn: 'root'
})
export class UserStore {

  public userState: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>({});

  getUserState(): UserModel {
    return this.userState.getValue();
  }

  setUserState(nextState: UserModel): void {
    // console.log(nextState);
    this.userState.next(nextState);  
  }

  mixUserState(partialState: Partial<UserModel>) {
    console.log(partialState);
    const currentState = this.getUserState();
    this.setUserState({ ...currentState, ...partialState });
  }
}