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
  notFound = signal(false);
  error = signal(false);

  // paginación
  page = signal(1);
  totalPages = signal(0);

  // filtros
  name = signal('');
  status = signal('');

  randomCharacter = signal<Character | null>(null);

  constructor() {
    this.loadCharacters();
  }

  loadCharacters() {
    this.loading.set(true);
    this.notFound.set(false);
    this.error.set(false);

    this.rickMorty.getCharacters(this.page(), this.name(), this.status()).subscribe({
      next: (response) => {
        this.characters.set(response.results);
        this.totalCharacters.set(response.info.count);
        this.totalPages.set(response.info.pages);
        this.loading.set(false);
      },
      error: (err) => {
        this.characters.set([]);
        this.totalPages.set(0);
        // la API responde 404 cuando el filtro no encuentra nada
        if (err.status === 404) {
          this.notFound.set(true);
        } else {
          this.error.set(true);
        }
        this.loading.set(false);
      },
    });
  }

  search(text: string) {
    this.name.set(text.trim());
    this.page.set(1);
    this.loadCharacters();
  }

  changeStatus(value: string) {
    this.status.set(value);
    this.page.set(1);
    this.loadCharacters();
  }

  previousPage() {
    this.page.update(p => p - 1);
    this.loadCharacters();
  }

  nextPage() {
    this.page.update(p => p + 1);
    this.loadCharacters();
  }

  loadRandomCharacter() {
    // la API tiene 826 personajes, con ids del 1 al 826
    const id = Math.floor(Math.random() * 826) + 1;
    this.rickMorty.getCharacter(id).subscribe({
      next: (character) => this.randomCharacter.set(character),
      error: () => this.randomCharacter.set(null),
    });
  }
}
