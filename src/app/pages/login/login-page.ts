import { Component, inject, signal } from '@angular/core';
import { UserService } from '../../services/user';
import { User } from '../../interfaces/user';

@Component({
  imports: [],
  selector: 'app-login-page',
  templateUrl: './login-page.html',
})
export class LoginPage {
  private userService = inject(UserService);

  // señales del formulario
  username = signal('');
  email = signal('');
  message = signal('');

  login() {
    const user: User = {
      username: this.username(),
      email: this.email(),
    };

    this.message.set(`Hola ${user.email} Login exitoso`);
    console.log(this.message());
    console.log(user);

    this.userService.user.set(user);

    // limpiar campos
    this.username.set('');
    this.email.set('');
  }
}
