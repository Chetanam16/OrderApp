import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { StepperService } from '../../Services/stepper.service';
import { Products } from '../../data';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [
    MatOption,
    MatTable,
    ReactiveFormsModule,
    CommonModule,
    MatLabel,
    MatFormField,
    MatError,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css',
})
export class PaymentsComponent {
  paymentForm!: FormGroup;
  formData: any;
  product: any;
  productId: string | null = null;
  productName: string | null = null;
    errorMessage: string | null = null; // Declare the errorMessage property

  constructor(
    private stepperService: StepperService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.paymentForm = this.fb.group({
      address: ['', Validators.required],
      phone: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      imageUrl: ['', Validators.required]
    });
  }
    // this.paymentForm = new FormGroup({
    //   address: new FormControl('', Validators.required),
    //   phone: new FormControl('', Validators.required),
    //   image: new FormControl('', Validators.required),
    //   paymentMethod: new FormControl('', Validators.required),
    // });
    // const navigationState = this.router.getCurrentNavigation()?.extras.state;
    // if (navigationState?.['product']) {
    //   this.product = navigationState['product'];
    // }
     
// this.product = this.stepperService.getProductforpay();
// if (!this.product || this.product.imageUrl || !this.product.name || !this.product.amount) {
//   this.errorMessage = 'Invalid product data';
// }
  
  
  ngOnInit(): void {
     this.product = this.stepperService.getProductforpay();
    if (!this.product) {
      this.errorMessage = 'No product selected!';
    } else {
      console.log('Product data in Payment Component:', this.product); // Debug log
    }
  }
  

  onSubmitPayment() {
    if (this.paymentForm.valid) {
      // Handle payment submission logic here
          alert('Payment Processed Successfully!');
          this.router.navigate(['/paymentsuccess']);
      console.log('Payment submitted:', this.paymentForm.value);
    }
    else {
      console.error('fill your details')
    }
  }
}
