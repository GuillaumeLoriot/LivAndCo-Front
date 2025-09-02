import { HttpContext, HttpContextToken, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const IS_TOKEN_REQUIRED = new HttpContextToken<boolean>(() => false);

export const enableAuthContext: Function = ()=> {
  return new HttpContext().set(IS_TOKEN_REQUIRED, true);
}

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {

  const token = localStorage.getItem("token");
  //Je vérifie si la requete a besoin du token
  if (req.context.get(IS_TOKEN_REQUIRED) == true) {
    //Je verifie si un User est connecté (presence d'un token)
    if (token) {
      //Je clone la requete de base, pour y ajouter le header Authorization
      const authReq = req.clone({
        setHeaders: {
          "Authorization": "Bearer " + token,
        }
      })
      return next(authReq);
    }
  }

  return next(req);

};