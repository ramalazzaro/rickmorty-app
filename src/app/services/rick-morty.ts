import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Character } from '../interfaces/character';
import { Episode } from '../interfaces/episode';

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

  // GET 3: episodios de una temporada (?episode=S01 trae S01E01, S01E02...)
  getEpisodesBySeason(season: number) {
    return this.http.get<any>(`${this.apiUrl}/episode/?episode=S0${season}`).pipe(
      map(response => response.results as Episode[])
    );
  }

  // GET 4: varios personajes en un solo pedido (/character/1,2,3)
  getCharactersByIds(ids: number[]) {
    return this.http.get<Character[]>(`${this.apiUrl}/character/${ids.join(',')}`);
  }
}
