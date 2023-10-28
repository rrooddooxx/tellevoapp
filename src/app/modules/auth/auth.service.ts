import { Injectable, OnInit } from '@angular/core';
import { UsersRepository } from '../../providers/db-api/repositories/users.repository';
import { UserModel } from './model/user.model';

@Injectable()
export class AuthService implements OnInit {
  userDB: UserModel[] = [];
  constructor(private readonly usersRepository: UsersRepository) {}

  ngOnInit(): void {
    this.getUsers();
  }

  private getUserProfile() {}

  public logIn(userEmail: string, userPwd: string): boolean {
    const loginResult: UserModel | undefined = this.userDB.find(
      (user) => user.user_email === userEmail && user.user_pwd === userPwd
    );
    return loginResult && Object.keys(loginResult).length > 1;
  }

  public logOut() {}

  async getUsers() {
    this.usersRepository.getUsers().subscribe((data) => {
      this.userDB = data;
    });
  }
}
