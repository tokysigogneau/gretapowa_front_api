import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { AllEvents } from './app/all-events/all-events';
import { AddEvent } from './app/add-event/add-event';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
bootstrapApplication(AllEvents, appConfig)
  .catch((err) => console.error(err));
  bootstrapApplication(AddEvent, appConfig)
  .catch((err) => console.error(err));