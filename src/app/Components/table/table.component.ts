import { Component, OnInit} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';
import { Products } from '../../data';
import {  MatTableModule } from '@angular/material/table';
import { StepperService } from '../../Services/stepper.service';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatCardModule,
    MatPaginator,
    MatPaginatorModule,
    CommonModule,
    MatTableModule,
    MatSelectModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnInit {
  pageSize: number = 5;
  pageIndex: number = 0;
  allProducts: Products[] = []; 
  pagedProducts: Products[] = [];
  totalProducts: number = 0;
  displayedColumns: string[] = ['product'];
  errorMessage: string | undefined;

  constructor(private stepperService: StepperService, private router: Router) {}
  products: Products = {
    name: '',
    amount: 0,
    isAvailable: false,
    imageUrl: '',
  };

  ngOnInit(): void {
     try {
       this.products;
     } catch (error) {
       this.errorMessage = 'Failed to load products.';
       console.error('Error loading products:', error);
     }
    this.stepperService.getProducts().subscribe((data: Products[]) => {
      this.allProducts = data;
      this.totalProducts = data.length;
      this.updatePagedProducts();
    });
  }

  onBuy(product: Products): void {
     try {
       this.stepperService.setProduct(product);
       console.log('Product stored in service:', product);
     } catch (error) {
       this.errorMessage = 'Failed to select product. Please try again.';
       console.error('Error setting product in service:', error);
     }
    //  console.log('Product selected:', product); // Log the product data
    //  if (!product || !product.imageUrl || !product.name || !product.amount) {
    //    console.error('Invalid product data:', product);
    //    return;
    //  }
    this.stepperService.setProduct(product);
    this.router.navigate(['/stepper'],{state:{product}});
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedProducts();
  }
  updatePagedProducts(): void {
    if (this.allProducts && this.allProducts.length > 0) {
      const startIndex = this.pageIndex * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.pagedProducts = this.allProducts.slice(startIndex, endIndex); // Slice the array to get the correct page
    } else {
      this.pagedProducts = []; // If there are no products, set an empty array
    }
  }
}
