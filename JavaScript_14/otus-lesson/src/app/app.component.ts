import { MatButtonModule } from '@angular/material/button';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

export const MATERIAL_MODULES = [
  MatButtonModule
]

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ...MATERIAL_MODULES
  ],
  providers: []
})
export class AppComponent {
  title = 'otus-lesson';
}
