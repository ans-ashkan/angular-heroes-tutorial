import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from '../hero'
import { HeroService } from '../hero.service'

@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  providers: [HeroService]
})
export class HeroesComponent implements OnInit{
  heroes: Hero[];
  title = 'Tour of Heroes';
  selectedHero: Hero;

  constructor(private heroService: HeroService, private router: Router) {
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  async ngOnInit() {
    //this.heroService.getHeroes().then( heroes => this.heroes = heroes);
    this.heroes = await this.heroService.getHeroes();
  }

  goToDetails() {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  add(name: string) {
    name = name.trim();
    if (!name)
      return;

    this.heroService.create(name)
        .then(hero => {
          this.selectedHero = null;
          this.heroes.push(hero);
        });
  }

  delete(hero: Hero): void {
    this.heroService
        .delete(hero.id)
        .then(() => {
          this.heroes = this.heroes.filter(h => h !== hero);
          if (this.selectedHero === hero) {
            this.selectedHero = null;
          }
        });
  }
}
