import { Injectable } from '@angular/core';
import { Person } from '../models/person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private storageKey = 'people';

  constructor() {}

  getAll(): Person[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  getByIndex(index: number): Person | null {
    const persons = this.getAll();
    return persons[index] ?? null;
  }

  addPerson(person: Person): void {
    const persons = this.getAll();
    persons.push(person);
    localStorage.setItem(this.storageKey, JSON.stringify(persons));
  }

  removeByIndex(index: number): void {
    const persons = this.getAll();
    if (index >= 0 && index < persons.length) {
      persons.splice(index, 1);
      localStorage.setItem(this.storageKey, JSON.stringify(persons));
    }
  }
}
