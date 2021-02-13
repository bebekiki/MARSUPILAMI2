import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  // service pour créer un nouvel utilisateur
  postUser(user:User){
    return this.httpClient.post(environment.apiBaseUrl+'/register',user);
  }

  // service pour loger un utilisateur
  logUser(user:any){
    return this.httpClient.post(environment.apiBaseUrl+'/login', user);
  }

  // service pour éditer les infos d'un utilisateur
  editUser(id:string,user:any){
    return this.httpClient.patch(environment.apiBaseUrl+'/'+id, user);
  } 

  // service pour ajouter un ami a sa liste d'amis
  addNewFriend(id:string,user:User){
    return this.httpClient.post(environment.apiBaseUrl+'/addNewFriend/'+id, user);
  }

  // service pour récupérer tous les amis d'un utilisateur
  getAllFriends(id:string){
    return this.httpClient.get(environment.apiBaseUrl+'/friend/'+id);
  }

  // service pour supprimer un ami de sa liste d'utilisateur
  deleteFriends(id:string, friend:string){
    return this.httpClient.get(environment.apiBaseUrl+'/'+friend+'/'+id);
  }

}