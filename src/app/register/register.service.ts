import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { TokenResponse, UserModel } from "../shared/auth.data.transfer.object";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http: HttpClient) { }

  private API: string = 'http://localhost:9090';

  register(user: UserModel): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.API}/auth/register`, user);
  }

}