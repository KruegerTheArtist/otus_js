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
      },
      {
        path: 'sign-in',
        loadComponent: () => import('./app/containers/sign-in/sign-in.component').then(m => m.SignInComponent)
      },
      {
        path: 'sign-up',
        loadComponent: () => import('./app/containers/sign-up/sign-up.component').then(m => m.SignUpComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('./app/containers/profile/profile.component').then(m => m.ProfileComponent)
      },
      {
        path: 'tags',
        loadComponent: () => import('./app/containers/tags/tags.component').then(m => m.TagsComponent)
      },
      {
        path: 'tasks',
        loadComponent: () => import('./app/containers/tasks/tasks.component').then(m => m.TasksComponent)
      },
      
]

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom([BrowserAnimationsModule])
  ],
})
  .catch((err) => console.error(err));
