import { inject, Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import User from '../../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userService: UserService = inject(UserService);
  private router: Router = inject(Router); // Pour la redirection
  user :User |null = null;
  roles : string[] = []; 
  isAuthenticated = false;

  constructor() {
    this.verifyAuth();
  }

  verifyAuth(redirectRoute: string | null = null) {
    //Vérifier si un token est présent dans le storage
    const token: string | null = localStorage.getItem("token");
    if (token) {
      // Ici on passe à vrai avant de tester le token,sinon le guard nous redirige avant l'execution asynchrone de la requète
      // si le token est la mais pas valide, je force le logout par la suite 
      // Je fais ça car au rafraichissement de la page du coté privé, ça redirigerais même en ayant un token valide
      this.isAuthenticated = true;
      // Je test le token en récupérant le User associé
      this.userService.getUser().subscribe({
        // Si un user à été récuperer
        next: (data) => {
          this.user = data;
          this.roles = data.roles || [];
          console.log(this.roles);
          if (redirectRoute) {
            this.router.navigateByUrl(redirectRoute);
          }
        },
        error: (error) => {
          console.log(error);
          console.log("Token expiré ou invalide");
          this.logout();
        },

      });
    }
  }

  logout() {
    // Suppression du token qui n'a pas fonctionné pour /me
    localStorage.removeItem("token");
    this.isAuthenticated = false;
    this.router.navigate([""]);
  }

}
