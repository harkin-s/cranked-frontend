import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class PaymentService {

  constructor(private http: Http) {
  }

  createPayment(value: string) {
    let params = new URLSearchParams();
    params.set('paymentVal', value);
    return this.http.get('/api/createPayment', { search: params })
      .map(res => res.json());
  }

  executePayment(payerId: string, paymentId: string) {
    let params = new URLSearchParams();
    params.set('payerId', payerId);
    params.set('paymentId', paymentId);
    return this.http.get('/api/executePayment', { search: params })
      .map(res => res.json());
  }

  createStripePayment(token: object, details: any) {
    let params = new URLSearchParams();
    params.set('paymentValue', details.paymentValue.toString());
    if (details.returningCustomer) {
      return this.http.get('/api/stripe/returningCustomerPayment', { search: params })
        .map(res => res.json());
    } else if (details.saveInfo) {
      params.set('token', JSON.stringify(token));
      return this.http.get('/api/stripe/newCustomerPayment', { search: params })
        .map(res => res.json());
    } else {
      params.set('token', JSON.stringify(token));
      return this.http.get('/api/stripe/onceOffPayment', { search: params })
        .map(res => res.json());
    }
  }

  createStripeSubscription(token: object, details: any) {
    let params = new URLSearchParams();
    params.set('isReturning', details.returningCustomer);
    params.set('token', JSON.stringify(token));
    return this.http.get('/api/stripe/recurringPayment', { search: params })
      .map(res => res.json());
  }

  cancelStripeSubscription() {
    return this.http.delete('/api/stripe/recurringPayment').map(res => res.json());
  }
}
