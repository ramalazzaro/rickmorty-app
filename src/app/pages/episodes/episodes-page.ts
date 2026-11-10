import { Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RickMortyService } from '../../services/rick-morty';
import { Episode } from '../../interfaces/episode';
import { Character } from '../../interfaces/character';

@Component({
  imports: [DatePipe],
  selector: 'app-episodes-page',
  styleUrl: './episodes-page.css',
  templateUrl: './episodes-page.html',
})
export class EpisodesPage {
  private rickMorty = inject(RickMortyService);

  seasons = [1, 2, 3, 4, 5];
  season = signal(1);
  episodes = signal<Episode[]>([]);
  loading = signal(false);
  error = signal(false);

  // episodio elegido y sus personajes
  selectedEpisode = signal<Episode | null>(null);
  episodeCharacters = signal<Character[]>([]);
  loadingCharacters = signal(false);

  constructor() {
    this.selectSeason(1);
  }

  selectSeason(season: number) {
    this.season.set(season);
    this.selectedEpisode.set(null);
    this.episodeCharacters.set([]);
    this.loading.set(true);
    this.error.set(false);

    this.rickMorty.getEpisodesBySeason(season).subscribe({
      next: (episodes) => {
        this.episodes.set(episodes);
        this.loading.set(false);
      },
      error: () => {
        this.episodes.set([]);
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }

  selectEpisode(episode: Episode) {
    this.selectedEpisode.set(episode);
    this.episodeCharacters.set([]);
    this.loadingCharacters.set(true);

    // cada personaje viene como URL (.../character/35): me quedo con el número del final
    const ids = episode.characters.map(url => Number(url.split('/').pop()));

    this.rickMorty.getCharactersByIds(ids).subscribe({
      next: (characters) => {
        this.episodeCharacters.set(characters);
        this.loadingCharacters.set(false);
      },
      error: () => this.loadingCharacters.set(false),
    });
  }
}
