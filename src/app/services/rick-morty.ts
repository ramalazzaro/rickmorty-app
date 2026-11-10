import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Character } from '../interfaces/character';

@Service()
export class RickMortyService {
  private http = inject(HttpClient);
  private apiUrl = 'https://rickandmortyapi.com/api';

  // GET 1: personajes de a 20, filtrados por nombre y estado
  getCharacters(page: number, name: string, status: string) {
    return this.http.get<any>(`${this.apiUrl}/character/`, {
      params: { page, name, status },
    });
  }

  // GET 2: un personaje por su id
  getCharacter(id: number) {
    return this.http.get<Character>(`${this.apiUrl}/character/${id}`);
  }
}
