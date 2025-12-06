import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class List {
  items: string[] = [];
  newItem: string = '';

  addItem() {
    if (this.newItem.trim().length === 0) return;

    this.items.push(this.newItem.trim());
    this.newItem = '';
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
  }
}
