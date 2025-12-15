import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Person } from '../models/person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private apiUrl = 'http://localhost:55241/api/people';

  constructor(private http: HttpClient) {}

  // ===== HAL → Person =====

  private getPersonId(resource: any): number {
    return Number(resource._links.self.href.split('/').pop());
  }

  private mapPerson(resource: any): Person {
    return {
      id: this.getPersonId(resource),
      firstName: resource.firstName,
      familyName: resource.familyName,
      age: resource.age,
      address: resource.address
    };
  }

  private mapPeople(response: any): Person[] {
    return (response._embedded?.persons ?? []).map((p: any) => this.mapPerson(p));
  }

  // ===== CRUD (POPRAWIONE) =====

  getAll(): Observable<Person[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(res => this.mapPeople(res))
    );
  }

  getById(id: number): Observable<Person> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(res => this.mapPerson(res))
    );
  }

  addPerson(person: Person): Observable<Person> {
    const { id, ...payload } = person; // nie wysyłamy id
    return this.http.post<any>(this.apiUrl, payload).pipe(
      map(res => this.mapPerson(res))
    );
  }

  updatePerson(id: number, person: Person): Observable<Person> {
    const { id: _, ...payload } = person;
    return this.http.put<any>(`${this.apiUrl}/${id}`, payload).pipe(
      map(res => this.mapPerson(res))
    );
  }

  deletePerson(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // ===== FINDERS =====

  findByCity(city: string): Observable<Person[]> {
    return this.http.get<any>(`${this.apiUrl}/search/findByAddress_City`, {
      params: { city }
    }).pipe(
      map(res => this.mapPeople(res))
    );
  }

  findByFamilyName(familyName: string): Observable<Person[]> {
    return this.http.get<any>(`${this.apiUrl}/search/findByFamilyName`, {
      params: { familyName }
    }).pipe(
      map(res => this.mapPeople(res))
    );
  }
}
