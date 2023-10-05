export class AuthRequest {
  identifier: string;
  password: string;

  constructor(body : any){
    this.identifier = body.identifier;
    this.password = body.password;
  }
}

export interface AuthResponse {
  message: string,
  token?: string
}