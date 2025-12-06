import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { List } from './list/list';
import { Random } from './random/random';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Random, List],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Lab11');
  public field: string = "pole typu string z przypisaną zawartością";
}
