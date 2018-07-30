import {
  Component, Input, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaymentService } from '../../payment.service';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { element } from '../../../../../node_modules/@angular/core/src/render3/instructions';

@Component({
  selector: 'app-payment-popup',
  templateUrl: './payment-popup.component.html',
  styleUrls: ['./payment-popup.component.css']
})
export class PaymentPopupComponent implements OnDestroy {
  @ViewChild('cardInfo') cardInfo: ElementRef;
  card: any;
  cardHandler = this.onChange.bind(this);
  error: string;
  saveStripeDetails: Boolean = true;
  paymentMethod: string;
  state: string;
  paymentValue: string;
  user: any = {};
  subscription: boolean;

  constructor(private cd: ChangeDetectorRef, private paymentService: PaymentService) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  initialize(paymentType, paymentValue) {
    if (paymentType === 'subscription') {
      this.subscription = true;
    }
    if (paymentType === 'single') {
      this.subscription = false;
      this.paymentValue = paymentValue;
    }
    this.paymentMethod = null;
    this.state = 'initState';

  }

  ngOnDestroy() {
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }

  ngAfterViewInit() {
    this.card = element.create('card');
    this.card.mount(this.cardInfo.nativeElement);
    this.card.addEventListener('change', this.cardHandler);
  }

  onChange({ error }) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }


  onCheckoutButton() {
    if (this.paymentMethod == 'paypal') {
      this.createPaypalPayment();
    }
    if (this.paymentMethod == 'stripe') {
      if (this.user.stripeTokenSaved && !this.subscription) {
        this.createStripePayment(null);
      } else if (this.user.stripeTokenSaved && this.subscription) {
        this.createStripeSubscription(null);
      } else {
        this.state = 'stripeState';
      }
    }
  }

  createPaypalPayment() {
    // create the payment object. Get the paypal redirect link from the response
    this.paymentService.createPayment(this.paymentValue).subscribe(payment => {
      for (let link of payment.links) {
        if (link.method === 'REDIRECT') {
          window.location.href = link.href;
        }
      }
    });
  }// end of createPayment

  onStripeFormCheckout(form: NgForm) {
    stripe.createToken(this.card).then((result) => {
      if (result.error) console.log('Something is wrong:', result.error);
      const token = result.token;
      if (this.subscription) {
        this.createStripeSubscription(token);
      } else {
        this.createStripePayment(token);
      }
    });

  }

  createStripePayment(token = null) {
    this.state = 'waiting';
    const details = {
      saveInfo: this.saveStripeDetails,
      returningCustomer: this.user.stripeTokenSaved,
      paymentValue: this.paymentValue
    }
    this.paymentService.createStripePayment(token, details).subscribe(success => {
      if (success) {
        console.log('Yurt!');
        this.state = 'success';
        if (this.saveStripeDetails) {
          this.user.stripeTokenSaved = true;
        }
      } else {
        console.log('Fuck');
        this.state = 'failed';
      }
    });
  }

  createStripeSubscription(token) {
    this.state = 'waiting';
    const details = {
      saveInfo: this.saveStripeDetails,
      returningCustomer: this.user.stripeTokenSaved,
      paymentValue: this.paymentValue
    }
    this.paymentService.createStripeSubscription(token, details).subscribe(success => {
      if (success) {
        console.log('Yurt!');
        this.state = 'success';
      } else {
        console.log('Fuck');
        this.state = 'failed';
      }
    });
  }
}
