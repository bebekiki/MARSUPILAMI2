import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { NgForm } from '@angular/forms'; 
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers : [UserService]
})
export class RegisterComponent implements OnInit {
  message:string;

  constructor(private userService:UserService, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('users')){
      this.router.navigate(['/home']);
    }
  }

  // fonction pour la création d'un nouvel compte utilisateur
  onSubmit(form:NgForm) { 
    this.userService.postUser(form.value).subscribe(
      res =>{
        if(res['success'] == false){
          this.message = res['message'];
        }
        else if(res['success'] == true){
          this.router.navigate(['/login']);
        }
      },
      err =>{
        this.message = err;
      }
    )
  }

}