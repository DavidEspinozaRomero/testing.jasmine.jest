import { ReactiveFormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { render, screen, waitFor } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
// import { rest } from 'msw';
// import { setupServer } from 'msw/node';
// import 'whatwg-fetch'

import { SignUpComponent } from './sign-up.component';

// let resquestBody: any;
// const server = setupServer(
//   rest.post('/api/1.0/users', (req, res, ctx) => {
//     resquestBody = req.body;
//     return res(ctx.status(200), ctx.json({}));
//   })
// );

const setup = async () => {
  await render(SignUpComponent, {
    imports: [HttpClientTestingModule],
  });
};

// beforeAll(() => server.listen());
// afterAll(() => server.close());

describe('SignUpComponent', () => {
  beforeEach(async () => {
    await render(SignUpComponent, {
      imports: [HttpClientTestingModule, ReactiveFormsModule],
    });
  });

  describe('Layout', () => {
    it('has Sign up header', async () => {
      // await setup();
      const header = screen.getByRole('heading', { name: 'Sign Up' });
      expect(header).toBeInTheDocument();
    });

    it('has username input', async () => {
      // await setup();
      const input = screen.getByLabelText('Username');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'text');
    });
    it('has email input', async () => {
      // await setup();
      const input = screen.getByLabelText('E-mail');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'email');
    });
    it('has password input', async () => {
      // await setup();
      const input = screen.getByLabelText('Password');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'password');
    });
    it('has password repeat input', async () => {
      // await setup();
      const input = screen.getByLabelText('Password Repeat');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'password');
    });
    it('has Sign up button', async () => {
      // await setup();
      const button = screen.getByRole('button', { name: 'Sign Up' });
      expect(button).toBeInTheDocument();
      expect(button).toBeDisabled();
    });
  });

  describe('Interactions', () => {
    it('should be enabled if password and passwordrepeat matches', async () => {
      // await setup();
      const password = screen.getByLabelText('Password');
      const passwordRepeat = screen.getByLabelText('Password Repeat');
      const button = screen.getByRole('button', { name: 'Sign Up' });
      expect(button).toBeDisabled();

      await userEvent.type(password, 'secretpassword');
      await userEvent.type(passwordRepeat, 'secretpassword');
      expect(button).not.toBeDisabled();
    });

    it('should Post the form to the backend', async () => {
      // await setup();

      const username = screen.getByLabelText('Username');
      const email = screen.getByLabelText('E-mail');
      const password = screen.getByLabelText('Password');
      const passwordRepeat = screen.getByLabelText('Password Repeat');
      const button = screen.getByRole('button', { name: 'Sign Up' });

      await userEvent.type(username, 'user1');
      await userEvent.type(email, 'user1@gmail.com');
      await userEvent.type(password, 'secretpassword');
      await userEvent.type(passwordRepeat, 'secretpassword');
      await userEvent.click(button);

      //#region MockServer HttpClientModule
      // await waitFor(() => {
      //   const result = {
      //     username: 'user1',
      //     email: 'user1@gmail.com',
      //     password: 'secretpassword',
      //   };

      //   expect(resquestBody).toEqual(result);
      // });
      //#endregion MockServer

      // #region whit HttpClientTestingModule
      // const http = TestBed.inject(HttpTestingController);

      // const call = http.expectOne('/api/1.0/users');
      // const reqBody = call.request.body
      // console.log(call);
      // const result = {
      //   username: 'user1',
      //   email: 'user1@gmail.com',
      //   password: 'secretpassword',
      // };

      // expect(reqBody).toEqual(result);
      // #endregion

      // #region whit fetch
      // const spy = jest.spyOn(window, 'fetch');
      // const call = spy.mock.calls[0];
      // const secondParam = call[1] as RequestInit;
      // const result = JSON.stringify({
      //   username: 'user1',
      //   email: 'user1@gmail.com',
      //   password: 'secretpassword',
      // });

      // expect(secondParam.body).toEqual(result);
      // #endregion
    });
  });
});
