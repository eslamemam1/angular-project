import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  age = 30;
  name = 'abdelrahman mohamed';
  isTrue = false;
  names = ['ahmed', 'mohamed', 'sayed', 'ali'];
  car = 'ww';
  isActive = false;
  isError = true;
}
