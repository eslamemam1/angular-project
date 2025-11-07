import { Component } from '@angular/core';
import { Users } from '../service/users';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-us',
  imports: [CommonModule],
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.css',
})
export class ContactUs {
  users: any[] = [];
  constructor(private userService: Users) {}
  ngOnInit() {
    this.userService.getUsersFromApi().subscribe((data) => {
      this.users = data;
    });
  }
}
