import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';
import { StepperService } from '../../Services/stepper.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, CommonModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  providers: [StepperService, HttpClient],
})
export class HeaderComponent {}
