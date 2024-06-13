import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../Services/auth.service";

 
export const authGuard = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const router = inject(Router);
    const authService = inject(AuthService);
    console.log(authService.user);
    

    if(authService.user){
        return true;
    }
    else{
        return router.createUrlTree(['login']);
    }
}