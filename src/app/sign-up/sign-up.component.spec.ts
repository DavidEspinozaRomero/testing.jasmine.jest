import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  // let http: jasmine.SpyObj<HttpTestingController>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      imports: [HttpClientTestingModule],
      schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    // http = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Layout', () => {
    it('has Sing Up header ', () => {
      const SignUp = fixture.nativeElement as HTMLElement;
      const h1 = SignUp.querySelector('h1');
      expect(h1?.textContent).toBe('Sign Up');
    });
    it('has username input ', () => {
      const SignUp = fixture.nativeElement as HTMLElement;
      const label = SignUp.querySelector('label[for="username"]');
      const input = SignUp.querySelector(
        'input[id="username"]'
      ) as HTMLInputElement;
      expect(label).toBeTruthy();
      expect(label?.textContent).toBe('Username');
      expect(input).toBeTruthy();
      expect(input?.type).toBe('text');
    });
    it('has email input ', () => {
      const SignUp = fixture.nativeElement as HTMLElement;
      const label = SignUp.querySelector('label[for="email"]');
      const input = SignUp.querySelector(
        'input[id="email"]'
      ) as HTMLInputElement; // const input = SignUp.querySelector('input[id="E-mail"]');
      expect(label).toBeTruthy();
      expect(label?.textContent).toBe('E-mail');
      expect(input).toBeTruthy();
      expect(input?.type).toBe('email');
      // const inputs = SignUp.querySelectorAll('input');
      // expect(inputs.length).toBe(2)
    });
    it('has password input ', () => {
      const SignUp = fixture.nativeElement as HTMLElement;
      const label = SignUp.querySelector('label[for="password"]');
      const input = SignUp.querySelector(
        'input[id="password"]'
      ) as HTMLInputElement;
      expect(label).toBeTruthy();
      expect(label?.textContent).toBe('Password');
      expect(input).toBeTruthy();
      expect(input?.type).toBe('password');
    });
    it('has password repeat input ', () => {
      const SignUp = fixture.nativeElement as HTMLElement;
      const label = SignUp.querySelector('label[for="passwordrepeat"]');
      const input = SignUp.querySelector(
        'input[id="passwordrepeat"]'
      ) as HTMLInputElement;
      expect(label).toBeTruthy();
      expect(label?.textContent).toBe('Password Repeat');
      expect(input).toBeTruthy();
      expect(input?.type).toBe('password');
    });
    it('has Sing Up button ', () => {
      const SignUp = fixture.nativeElement as HTMLElement;
      const button = SignUp.querySelector('button');
      expect(button?.textContent).toBe('Sing Up');
      expect(button?.disabled).toBeTruthy();
    });
  });

  describe('Interanctions', () => {
    let button: any;
    let http: HttpTestingController;
    const setupForm = () => {
      http = TestBed.inject(HttpTestingController);

      const SignUp = fixture.nativeElement as HTMLElement;
      const inputUsername = SignUp.querySelector(
        'input[id="username"]'
      ) as HTMLInputElement;
      const inputEmail = SignUp.querySelector(
        'input[id="email"]'
      ) as HTMLInputElement;
      const inputPassword = SignUp.querySelector(
        'input[id="password"]'
      ) as HTMLInputElement;
      const inputPasswordRepeat = SignUp.querySelector(
        'input[id="passwordrepeat"]'
      ) as HTMLInputElement;
      button = SignUp.querySelector('button');

      inputUsername.value = 'user1';
      inputUsername.dispatchEvent(new Event('input'));
      inputEmail.value = 'user1@gmail.com';
      inputEmail.dispatchEvent(new Event('input'));
      inputPassword.value = 'secretpassword';
      inputPassword.dispatchEvent(new Event('input'));
      inputPasswordRepeat.value = 'secretpassword';
      inputPasswordRepeat.dispatchEvent(new Event('input'));
      fixture.detectChanges();
    };

    it('must match password and passwordrepeat', () => {
      const SignUp = fixture.nativeElement as HTMLElement;

      const inputPassword = SignUp.querySelector(
        'input[id="password"]'
      ) as HTMLInputElement;
      const inputPasswordRepeat = SignUp.querySelector(
        'input[id="passwordrepeat"]'
      ) as HTMLInputElement;

      inputPassword.value = 'secretpassword';
      inputPassword.dispatchEvent(new Event('input'));

      inputPasswordRepeat.value = 'secretpassword';
      inputPasswordRepeat.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      const button = SignUp.querySelector('button');
      expect(button?.disabled).toBeFalsy();
    });

    // it('should Post the form to the backend', () => {
    //   const spy = spyOn(window, 'fetch');
    //   const SignUp = fixture.nativeElement as HTMLElement;
    //   const inputUsername = SignUp.querySelector(
    //     'input[id="username"]'
    //   ) as HTMLInputElement;
    //   const inputEmail = SignUp.querySelector(
    //     'input[id="email"]'
    //   ) as HTMLInputElement;
    //   const inputPassword = SignUp.querySelector(
    //     'input[id="password"]'
    //   ) as HTMLInputElement;
    //   const inputPasswordRepeat = SignUp.querySelector(
    //     'input[id="passwordrepeat"]'
    //   ) as HTMLInputElement;
    //   const button = SignUp.querySelector('button');

    //   inputUsername.value = 'user1';
    //   inputUsername.dispatchEvent(new Event('input'));
    //   inputEmail.value = 'user1@gmail.com';
    //   inputEmail.dispatchEvent(new Event('input'));
    //   inputPassword.value = 'secretpassword';
    //   inputPassword.dispatchEvent(new Event('input'));
    //   inputPasswordRepeat.value = 'secretpassword';
    //   inputPasswordRepeat.dispatchEvent(new Event('input'));
    //   fixture.detectChanges();

    //   button?.click();
    //   const args = spy.calls.allArgs()[0];
    //   const secondParam = args[1];
    //   const result = JSON.stringify({
    //     username: 'user1',
    //     email: 'user1@gmail.com',
    //     password: 'secretpassword',
    //   });

    //   expect(secondParam.body).toEqual(result);
    // });

    it('should Post the form to the backend', () => {
      setupForm();
      button?.click();
      const req = http.expectOne('/api/1.0/users');

      const result = {
        username: 'user1',
        email: 'user1@gmail.com',
        password: 'secretpassword',
      };

      expect(req.request.body).toEqual(result);
    });
  });
});

// import { render, screen } from '@testing-library/angular';
// import { SignUpComponent } from './sign-up.component';

// it('has Sign up header', async () => {
//   await render(SignUpComponent);
//   const header = screen.getByRole('heading', { name: 'Sing Up' });
//   expect(header).toBeTruthy();
// });
