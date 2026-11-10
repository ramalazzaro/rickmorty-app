import { Service, signal } from '@angular/core';
import { User } from '../interfaces/user';

@Service()
export class UserService {
  // usuario del login simulado (null si nadie inició sesión)
  user = signal<User | null>(null);

  logout() {
    this.user.set(null);
  }
}
