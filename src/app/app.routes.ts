import { Routes } from '@angular/router';
import { TableComponent } from './Components/table/table.component';
import { StepperComponent } from './Components/stepper/stepper.component';
import { PaymentsComponent } from './Components/payments/payments.component';
import { PaymentSuccessfulComponent } from './Components/payment-successful/payment-successful.component';


export const routes: Routes = [
  { path: '', component: TableComponent },
  { path: 'stepper', component: StepperComponent },
  { path: 'payments', component: PaymentsComponent },
  { path: 'paymentsuccess', component: PaymentSuccessfulComponent },
];
