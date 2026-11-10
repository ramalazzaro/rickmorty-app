import { Service, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, retry, throwError, timer } from 'rxjs';
import { Character } from '../interfaces/character';
import { Episode } from '../interfaces/episode';

@Service()
export class RickMortyService {
  private http = inject(HttpClient);
  private apiUrl = 'https://rickandmortyapi.com/api';

  // si llegan muchos pedidos seguidos (cada página pide además 20 imágenes) la API los rechaza unos segundos,
  // así que cada GET se reintenta hasta 3 veces, esperando 2, 4 y 6 segundos. El 404 no se reintenta: significa que no hay resultados.
  private retryDelay = (error: HttpErrorResponse, retryCount: number) =>
    error.status === 404 ? throwError(() => error) : timer(retryCount * 2000);

  // GET 1: personajes de a 20, filtrados por nombre y estado
  getCharacters(page: number, name: string, status: string) {
    return this.http.get<any>(`${this.apiUrl}/character/`, {
      params: { page, name, status },
    }).pipe(retry({ count: 3, delay: this.retryDelay }));
  }

  // GET 2: un personaje por su id
  getCharacter(id: number) {
    return this.http.get<Character>(`${this.apiUrl}/character/${id}`).pipe(
      retry({ count: 3, delay: this.retryDelay })
    );
  }

  // GET 3: episodios de una temporada (?episode=S01 trae S01E01, S01E02...)
  getEpisodesBySeason(season: number) {
    return this.http.get<any>(`${this.apiUrl}/episode/?episode=S0${season}`).pipe(
      retry({ count: 3, delay: this.retryDelay }),
      map(response => response.results as Episode[])
    );
  }

  // GET 4: varios personajes en un solo pedido (/character/1,2,3)
  getCharactersByIds(ids: number[]) {
    return this.http.get<Character[]>(`${this.apiUrl}/character/${ids.join(',')}`).pipe(
      retry({ count: 3, delay: this.retryDelay })
    );
  }
}
