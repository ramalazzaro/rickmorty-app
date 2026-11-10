import { Component, inject, signal } from '@angular/core';
import { RickMortyService } from '../../services/rick-morty';
import { Character } from '../../interfaces/character';

@Component({
  imports: [],
  selector: 'app-characters-page',
  styleUrl: './characters-page.css',
  templateUrl: './characters-page.html',
})
export class CharactersPage {
  private rickMorty = inject(RickMortyService);

  characters = signal<Character[]>([]);
  totalCharacters = signal(0);
  loading = signal(false);
  error = signal('');

  constructor() {
    this.loadCharacters();
  }

  loadCharacters() {
    this.loading.set(true);
    this.error.set('');

    this.rickMorty.getCharacters(1, '', '').subscribe({
      next: (response) => {
        this.characters.set(response.results);
        this.totalCharacters.set(response.info.count);
        this.loading.set(false);
      },
      error: () => {
        this.characters.set([]);
        this.error.set('No se pudo conectar con la API');
        this.loading.set(false);
      },
    });
  }
}
