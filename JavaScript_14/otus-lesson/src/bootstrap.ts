import { Routes, provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
const routes: Routes = [
      {
        path: '',
        loadComponent: () => import('./app/containers/recently-added/recently-added.component').then(m => m.RecentlyAddedComponent)
      },
      {
        path: 'settings',
        loadComponent: () => import('./app/containers/settings/settings.component').then(m => m.SettingsComponent)
      },
      {
        path: 'lesson',
        loadComponent: () => import('./app/containers/lesson/lesson.component').then(m => m.LessonComponent)
      }
]

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom([BrowserAnimationsModule])
  ],
})
  .catch((err) => console.error(err));
