import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, subscribeOn, tap } from 'rxjs/operators';
import { IUser} from './user.model';

@Injectable()

export class AuthService{
    /**
     *
     */
    constructor(private http: HttpClient) { }
    currentUser: IUser;

    loginUser(userName: string, password: string){
        const loginInfo = {username: userName, password};
        const options = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

        return this.http.post('/api/login', loginInfo, options)
        .pipe(tap(data => {
            this.currentUser = (data as IUser);
        }))
        .pipe(catchError(err => {
            return of(false);
        }));
    //   this.currentUser = {
    //       id:1,
    //       userName: userName,
    //       firstName:'John',
    //       lastName:'Papa'
    //   }
    }
    isAuthenticated(){
        return !!this.currentUser;
    }
    checkAuthenticationStatus(){
        this.http.get('/api/currentIdentity')
        .pipe(tap(data  => {
           if (data instanceof Object){
               this.currentUser = (data as IUser);
           }
        }))
        .subscribe();
    } 
    logout(){
        this.currentUser = undefined;
        const options = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
        return this.http.post('/api/logout', {}, options);
    } 
    updateCurrentUser(firstName: string, lastName: string){
        this.currentUser.firstName = firstName;
        this.currentUser.lastName = lastName;

        const options = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
        return this.http.put(`/api/users/${this.currentUser.id}`, this.currentUser, options);

    }
}
