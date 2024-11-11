import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { TableComponent } from './Components/table/table.component';
import { StepperComponent } from './Components/stepper/stepper.component';
import { PaymentsComponent } from './Components/payments/payments.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,HeaderComponent,FooterComponent,TableComponent,StepperComponent,PaymentsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'orderApp';
}
