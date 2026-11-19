import { Component, inject, output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventItem } from '../all-events/all-events';

@Component({
  selector: 'app-add-event',
  imports: [ReactiveFormsModule],
  templateUrl: './add-event.html',
  styleUrl: './add-event.css',
})
export class AddEvent {
  private http = inject(HttpClient);
  private fb = inject(FormBuilder);
  private apiUrl = 'http://localhost:8080/api/events';

  // Émet le nouvel événement vers le composant parent
  eventAdded = output<EventItem>();

  eventForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    date: ['', Validators.required],
    location: ['', Validators.required],
    details: ['', Validators.required],
  });

  onSubmit(): void {
    if (this.eventForm.invalid) return;

    this.http.post<EventItem>(this.apiUrl, this.eventForm.getRawValue()).subscribe({
      next: (addedEvent) => {
        this.eventAdded.emit(addedEvent);
        this.eventForm.reset();
      },
      error: (err) => console.error('Erreur lors de la création :', err),
    });
  }
}
