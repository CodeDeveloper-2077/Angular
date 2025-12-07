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
    this.people = this.personService.getAll();
  }

  delete(index: number): void {
    if (confirm('Are you sure you want to delete this person?')) {
      this.personService.removeByIndex(index);
      this.loadPeople();
    }
  }
}