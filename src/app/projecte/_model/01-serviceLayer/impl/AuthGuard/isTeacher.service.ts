import { Injectable } from '@angular/core';
import { Router,CanActivate,ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginWebService } from '../../api/loginWebService';

@Injectable()

export class isTeacher implements CanActivate {
  
  private token:any;

  constructor(private _router:Router, private loginWebService: LoginWebService ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    this.loginWebService.getToken().subscribe( token => 
      {
        this.token = token;
      }
    );
    return (JSON.parse(this.token)).rol.toLocaleLowerCase() == "teacher";
  }

  
}
