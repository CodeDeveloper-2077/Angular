import { Component, OnInit } from '@angular/core';
import { PersonService } from '../services/person-service';
import { Person } from '../models/person.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-component',
  imports: [CommonModule, RouterModule],
  templateUrl: './list-component.html',
  styleUrl: './list-component.css',
})
export class ListComponent implements OnInit {

  people: Person[] = [];

  constructor(private personService: PersonService) {}

  ngOnInit(): void {
    this.loadPeople();
  }

  loadPeople(): void {
  this.personService.getAll().subscribe({
    next: people => this.people = people,
    error: err => console.error(err)
  });
}

delete(id: number): void {
  if (!id) {
    console.error('Invalid id:', id);
    return;
  }

  if (confirm('Delete this person?')) {
    this.personService.deletePerson(id).subscribe(() => this.loadPeople());
  }
}

}
