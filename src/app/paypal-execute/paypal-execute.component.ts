import { Component, OnInit } from '@angular/core';
import { Router }          from '@angular/router';
import { PaymentService } from '../shared/payment.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-paypal-execute',
  templateUrl: './paypal-execute.component.html',
  styleUrls: ['./paypal-execute.component.css']
})
export class PaypalExecuteComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private service: PaymentService) { }

  ngOnInit() {
    this.executePayment();
  }

  executePayment() {

    var payerId = this.route.snapshot.queryParams.PayerID;
    var paymentId = this.route.snapshot.queryParams.paymentId
    this.service.executePayment(payerId, paymentId).then(payment => {
      if (payment.state == 'approved'){
        this.router.navigate(['/tokens', {paymentSuccess: true}]);    
      }else{
        this.router.navigate(['/tokens', {paymentSuccess: false}]);
      }
    });
  }
}
