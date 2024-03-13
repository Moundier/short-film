import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginDTO, TokenResponse, UserModel } from "../shared/auth.data.transfer.object";
import { options } from "ionicons/icons";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private API: string = 'http://localhost:9090';

  constructor(private http: HttpClient) { }

  login(req: LoginDTO): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.API}/auth/login`, req);
  }

  getUser(options: HttpHeaders): Observable<UserModel> {
    const httpOptions = {
      headers: options 
    };

    return this.http.get<UserModel>(`${this.API}/user/user_data`, httpOptions);
  }
  
}
