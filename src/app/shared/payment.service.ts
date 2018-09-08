import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { environment } from '../../environments/environment';
@Injectable()
export class PaymentService {

  constructor(private http: Http) {
  }

  createPayment(value: string): any {
    let params = new URLSearchParams();
    params.set('paymentVal', value);
    return this.http.get(`${environment.apiUrl}/createPayment`, { search: params })
      .toPromise();
  }

  executePayment(payerId: string, paymentId: string): any {
    let params = new URLSearchParams();
    params.set('payerId', payerId);
    params.set('paymentId', paymentId);
    return this.http.get(`${environment.apiUrl}/executePayment`, { search: params })
      .toPromise();
  }

  createStripePayment(token: object, details: any): any {
    let params = new URLSearchParams();
    params.set('paymentValue', details.paymentValue.toString());
    if (details.returningCustomer) {
      return this.http.get(`${environment.apiUrl}/stripe/returningCustomerPayment`, { search: params })
        .toPromise();
    } else if (details.saveInfo) {
      params.set('token', JSON.stringify(token));
      return this.http.get(`${environment.apiUrl}/stripe/newCustomerPayment`, { search: params })
        .toPromise();
    } else {
      params.set('token', JSON.stringify(token));
      return this.http.get(`${environment.apiUrl}/stripe/onceOffPayment`, { search: params })
        .toPromise();
    }
  }

  createStripeSubscription(token: object, details: any): any {
    let params = new URLSearchParams();
    params.set('isReturning', details.returningCustomer);
    params.set('token', JSON.stringify(token));
    return this.http.get(`${environment.apiUrl}/stripe/recurringPayment`, { search: params })
      .toPromise();
  }

  cancelStripeSubscription() : any{
    return this.http.delete(`${environment.apiUrl}/stripe/recurringPayment`).toPromise();
  }
}
