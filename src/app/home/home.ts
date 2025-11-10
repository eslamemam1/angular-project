import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApexTreeView } from '../apex-tree-view/apex-tree-view';

@Component({
  selector: 'app-home',
  imports: [FormsModule, ReactiveFormsModule, ApexTreeView],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  onSubmit(form: any) {
    console.log('Form Data: ', form.value);
  }
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  onSubmitFormGroup() {
    if (this.loginForm.invalid) {
      return;
    } else {
      console.log('FormGroup Data: ', this.loginForm.value);
    }
  }
}
