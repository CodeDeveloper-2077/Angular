import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PersonService } from '../services/person-service';
import { Person } from '../models/person.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details-component',
  imports: [CommonModule, RouterModule],
  templateUrl: './details-component.html',
  styleUrl: './details-component.css',
})
export class DetailsComponent implements OnInit {

  person: Person | null = null;

  constructor(
    private route: ActivatedRoute,
    private personService: PersonService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.personService.getById(Number(id)).subscribe({
          next: (person) => this.person = person,
          error: () => this.person = null
        });
      }
    });
  }
}
