import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { NgForm } from '@angular/forms'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  message: string;  //variable pour les message d'erreurs
  messageEdit:string; //variable pour le message d'erreur de la modal edit
  friends: []; // pour stocker tous les amis de l'utilisateur connecté
  amis= true; // pour savoir si l'utilisateur connecte a déjà des amis
  notAmis = false; // pour savoir si l'utilisateur connecte n'a pas encore  d'amis
  currentUser = JSON.parse((localStorage.getItem('users'))); // pour avoir les infos de l'utilisateur connecté
  constructor(private userService:UserService, private router: Router) { }

  ngOnInit(): void {
    //pour savoir si un utilisateur est connecte ou pas
    if(!localStorage.getItem('users')){
      this.router.navigate(['/login']);
    }

    this.allFriends();

  }

  // fonction de déconnection
  logout():void{
    localStorage.removeItem('users');
    this.router.navigate(['/login']);
  }

  // fonction pour récupérer tous les amis d'un utilisateur
  allFriends(){
    this.userService.getAllFriends(this.currentUser._id).subscribe(
      res =>{
        if(res['success'] == false){
          console.log(res['message']);
        }
        else if(res['success'] == true){
          this.friends = res['message'];
          if(this.friends.length == 0){
            this.notAmis = true;
            this.amis = false;
          }
          else{
            this.notAmis = false;
            this.amis = true;
          }
        }
      },
      err =>{
        console.log(err);
      }
    )
  }

  // fonction pour éditer les infos de l'utilisateur connecté
  editUser(form:NgForm): void{
    this.userService.editUser(this.currentUser._id, form.value).subscribe(
      res =>{
        if(res['success'] == false){
          this.messageEdit = res['message'];
        }
        else if(res['success'] == true){
          this.currentUser = res['message'];
          document.getElementById("edit").click();
        }
      },
      err =>{
        this.messageEdit = err;
      }
    )
  }

  // fonction ajouter un nouvel ami à sa liste d'amis
  newFriend(form:NgForm) { 
    this.userService.addNewFriend(this.currentUser._id,form.value).subscribe(
      res =>{
        if(res['success'] == false){
          this.message = res['message'];
        }
        else if(res['success'] == true){
          this.allFriends();
          document.getElementById("close").click();
        }
      },
      err =>{
        this.message = err;
      }
    )
  }

  // fonction supprimer un ami à sa liste d'amis
  deleteFriends(id:string){
    this.userService.deleteFriends(this.currentUser._id,id).subscribe(
      res =>{
        if(res['success'] == false){
          console.log(res['message']);
        }
        else{
          this.allFriends();
        }
      },
      err =>{
        this.message = err;
      }
    )
  }

}