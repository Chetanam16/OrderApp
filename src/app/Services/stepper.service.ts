import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { DataInterface, FormDetails, Products } from '../data';

@Injectable({
  providedIn: 'root',
})
export class StepperService {
  [x: string]: any;
  public dataUrl = 'http://localhost:3000/forms';
  private apiUrl = 'http://localhost:3000/products';
  private product: Products | null= null;
  constructor(private http: HttpClient) {}
  getData(): Observable<DataInterface> {
    return this.http.get<DataInterface>(this.dataUrl);
  }

  getFormData(): Observable<FormDetails[]> {
    return this.http.get<FormDetails[]>(this.dataUrl);
  }

  postData(data: any): Observable<DataInterface[]> {
    return this.http.post<any>(this.dataUrl, data);
  }

  deleteFormData(id: number): Observable<void> {
    return this.http.delete<void>(`${this.dataUrl}/${id}`);
  }

  getProducts(): Observable<Products[]> {
    return this.http.get<Products[]>(this.apiUrl);
  }

  private currentLang = new BehaviorSubject<string>('en');
  lang$ = this.currentLang.asObservable();
  switchLanguage(lang: string) {
    this.currentLang.next(lang);
  }
  
  private selectedProduct: any;
  private productSubject = new BehaviorSubject<Products | null>(null);

  setProduct(product: Products): void {
     try {
       if (!product) throw new Error('Invalid product data');
       this.product = product;
     } catch (error) {
       console.error('Error setting product:', error);
       throw new Error('Failed to set product.');
     }
    this.selectedProduct = product;
  }

  getProductforpay(): Products | null {
    try {
      if (!this.product) throw new Error('Product not available in service');
      return this.product;
    } catch (error) {
      console.error('Error retrieving product:', error);
      return null;
      return this.selectedProduct;
    }
  }
}
