import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  btndisabled: boolean = true;

  miForm: FormGroup = this.fb.group({
    username: [''],
    email: [''],
    password: [''],
    passwordrepeat: [''],
  });

  constructor(private http: HttpClient, private fb: FormBuilder) {}

  ngOnInit(): void {}

  onChangePassword() {
    this.btndisabled =
      this.miForm.get('password')?.value !==
      this.miForm.get('passwordrepeat')?.value;
  }

  onChangePasswordRepeat() {
    this.btndisabled =
      this.miForm.get('password')?.value !==
      this.miForm.get('passwordrepeat')?.value;
  }

  save() {
    const data = { ...this.miForm.value };
    delete data.passwordrepeat;

    this.http.post('/api/1.0/users', data).subscribe(console.log);

    // fetch('/api/1.0/users', {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    //   headers: { 'Content-Type': 'application/json' },
    // });
  }
}
