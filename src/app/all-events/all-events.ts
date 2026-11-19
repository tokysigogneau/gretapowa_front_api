// src/app/all-events/all-events.ts
import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

export interface EventItem {
  id: number;
  name: string;
  date: string;
  details: string;
  location: string;
}

@Component({
  imports: [DatePipe],
  selector: 'app-all-events',
  styleUrl: './all-events.css',
  templateUrl: './all-events.html',
})
export class AllEvents implements OnInit {
  private http = inject(HttpClient);
  events = signal<EventItem[]>([]);

  ngOnInit(): void {
    this.http.get<EventItem[]>('http://localhost:8080/api/events').subscribe({
      next: (data) => this.events.set(data),
      error: (err) => console.error('Error fetching events:', err),
    });
  }
}
