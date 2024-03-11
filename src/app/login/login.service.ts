import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginDTO, TokenDTO } from "../shared/auth.data.transfer.object";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private API: string = 'http://localhost:9090';

  constructor(private http: HttpClient) { }

  login(obj: LoginDTO): Observable<TokenDTO> {
    return this.http.post<TokenDTO>(`${this.API}/auth/login`, obj);
  }
  
}
