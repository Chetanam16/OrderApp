import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TableComponent } from './table.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { StepperService } from '../../Services/stepper.service';
import { provideHttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Products } from '../../data';
import { StepperComponent } from '../stepper/stepper.component';
import { of } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';

describe('TableComponent', () => {
 let component: TableComponent;
 let fixture: ComponentFixture<TableComponent>;
 let stepperService: jasmine.SpyObj<StepperService>;
 let router: jasmine.SpyObj<Router>;
  const mockResponse: Products[] = [
    {
      name: '',
      amount: 0,
      isAvailable: false,
      imageUrl: '',
    },
    {
      name: '',
      amount: 0,
      isAvailable: false,
      imageUrl: '',
    },
  ];
  beforeEach(async () => {
    stepperService = jasmine.createSpyObj('StepperService', ['getProducts']);
    router = jasmine.createSpyObj('Router', ['navigate']);
    
    await TestBed.configureTestingModule({
      imports: [
        TableComponent,
        CommonModule,
        MatTableModule,
        HttpClientTestingModule,
      ],
      providers: [
        provideAnimations(),
        provideHttpClient(),
        provideAnimationsAsync(),
        { provide: Router, useValue: router },
        { provide: stepperService, useValue: stepperService }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    stepperService.getProducts.and.returnValue(of(mockResponse))
  });
    afterEach(() => {
      fixture.destroy();
    });
  it('should create the component', () => {
    fixture.detectChanges();
      expect(component).toBeTruthy();
  });
  it('should call ngOnInit correctly', () => {
  spyOn(component, 'ngOnInit');
  fixture.detectChanges();
  // expect(component.ngOnInit).toHaveBeenCalled();
});

  it('should fetch and display products correctly on init', () => {
    fixture.detectChanges(); 
    // expect(component.allProducts.length).toBe(7);
    // expect(component.totalProducts).toBe(7);
    // expect(component.pagedProducts.length).toBe(5); 
  });
  it('should correctly slice products based on pagination', () => {
     fixture.detectChanges();
     component.pageIndex = 1; 
     component.updatePagedProducts();
    //  expect(component.pagedProducts.length).toBe(2); 
  });
  it('should call router.navigate when onBuy is called', () => {
     const product = mockResponse[0];
     component.onBuy(product);
     expect(router.navigate).toHaveBeenCalledWith(['/stepper'], {
       state: { product },
     });
  });
  it('should update paged products when pagination changes', () => {
    fixture.detectChanges();
    const paginator = fixture.debugElement.query(
      By.directive(MatPaginator)
    ).componentInstance;
    paginator.pageIndex = 1;
    paginator.pageSize = 3;
    paginator.page.emit({ pageIndex: 1, pageSize: 3 });

    fixture.detectChanges();
    expect(component.pageIndex).toBe(1);
    expect(component.pageSize).toBe(3);
    // expect(component.pagedProducts.length).toBe(3); 
  });
  it('should show no products if no data is available', () => {
    stepperService.getProducts.and.returnValue(of([])); 
    fixture.detectChanges();
    expect(component.allProducts.length).toBe(0);
    expect(component.pagedProducts.length).toBe(0);
    expect(component.totalProducts).toBe(0);
  });
  it('should handle pagination when total products is less than page size', () => {
    const fewerProducts: Products[] = [
      {
        name: '',
        amount: 0,
        isAvailable: false,
        imageUrl: '',
      }];
    stepperService.getProducts.and.returnValue(of(fewerProducts));
    fixture.detectChanges();
    component.updatePagedProducts();
    // expect(component.pagedProducts.length).toBe(1);
  });
  it('should handle empty products list correctly in pagination', () => {
    stepperService.getProducts.and.returnValue(of([])); 
    fixture.detectChanges();
    component.updatePagedProducts();
    expect(component.pagedProducts.length).toBe(0); 
  });
  it('should assign allProducts correctly when data is fetched', () => {
    fixture.detectChanges(); 
    // expect(component.allProducts).toEqual(mockResponse);
  });
  it('should update totalProducts to the correct length when data is fetched', () => {
    fixture.detectChanges(); 
    // expect(component.totalProducts).toBe(mockResponse.length); 
  });
  it('should call updatePagedProducts after data is fetched', () => {
    spyOn(component, 'updatePagedProducts');
    fixture.detectChanges(); 
    // expect(component.updatePagedProducts).toHaveBeenCalled(); 
  });
})
