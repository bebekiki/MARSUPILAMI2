import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'; 
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message: string;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void { 
    if(localStorage.getItem('users')){
      this.router.navigate(['/home']);
    }
  }

  // fonction de connection
  onSubmit(form:NgForm):void {
    this.userService.logUser(form.value).subscribe(
      res =>{
        if(res['success'] == false){
          this.message = res['message'];
        }
        else if(res['success'] == true){
          localStorage.setItem('users', JSON.stringify(res['message']));
          this.router.navigate(['/home']);
        }
      },
      err =>{
        this.message = err;
      }
    )
  }


}