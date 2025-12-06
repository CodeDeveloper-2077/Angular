import { Component, Input } from '@angular/core';
import { Random as RandomService } from '../random';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-random',
  imports: [CommonModule],
  templateUrl: './random.html',
  styleUrls: ['./random.css'],
})
export class Random {
  @Input() max: number = 10;

  value: number | null = null;
  comment: string = '';
  color: string = '';

  constructor(private randomService: RandomService) {}

  generate() {
    this.value = this.randomService.getRandomNumber(this.max);
    const threshold = 0.5 * this.max;

    if (this.value <= threshold) {
      this.comment = `The number ${this.value} is less than or equal to 0.5 * max (${threshold})`;
      this.color = 'green';
    } else {
      this.comment = `The number ${this.value} is greater than 0.5 * max (${threshold})`;
      this.color = 'red';
    }
  }
}
