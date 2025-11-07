import { Component } from '@angular/core';
import { Users } from '../service/users';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  users: string[];

  constructor(private usersService: Users) {
    this.users = this.usersService.getUsers();
  }
}
