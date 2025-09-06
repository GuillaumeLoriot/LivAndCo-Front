import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/user/auth.service';


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot): boolean {
  
    const requiredRoles = route.data['roles'] as string[]; // Lis les roles nécéssaires défini dans appRoutes
    const userRoles = this.authService.roles; // Récupère les role que possède le user

    // Vérifie si l'utilisateur a au moins un des rôles requis
    const hasRequiredRole = requiredRoles.some(role =>
      userRoles.includes(role)
    );

    if (hasRequiredRole) {
      return true; // Accès autorisé
    }

console.log('page réservé au propriétaires');
    this.router.navigate(['/forbidden']);
    return false;
  }

}