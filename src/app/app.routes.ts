import { Routes } from '@angular/router';
import { CharactersPage } from './pages/characters/characters-page';
import { EpisodesPage } from './pages/episodes/episodes-page';
import { LoginPage } from './pages/login/login-page';

export const routes: Routes = [
  { path: '', component: CharactersPage },
  { path: 'episodios', component: EpisodesPage },
  { path: 'login', component: LoginPage },
  // cualquier otra ruta vuelve al inicio
  { path: '**', redirectTo: '' },
];
