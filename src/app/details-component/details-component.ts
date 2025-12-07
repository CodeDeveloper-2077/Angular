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
      const idParam = params.get('id');
      if (idParam) {
        const index = Number(idParam);
        this.person = this.personService.getByIndex(index);
      }
    });
  }
}
