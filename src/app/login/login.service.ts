import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginDTO, TokenResponse } from "../shared/auth.data.transfer.object";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private API: string = 'http://localhost:9090';

  constructor(private http: HttpClient) { }

  login(req: LoginDTO): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.API}/auth/login`, req);
  }
  
}
