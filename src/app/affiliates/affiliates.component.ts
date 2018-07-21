import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-affiliates',
  templateUrl: './affiliates.component.html',
  styleUrls: ['./affiliates.component.css']
})
export class AffiliatesComponent implements OnInit {
  createAffCode: String = null;
  useAffCode: String = null;
  useCodeMessage: String;
  createCodeMessage: String;
  constructor(private userService: UserService) { }

  ngOnInit() {

  }

  createCode() {
    if (this.createAffCode && this.createAffCode.length > 0) {
      this.userService.createAffiliateCode(this.createAffCode).subscribe(res => {
        this.createCodeMessage = res;
      });
    }

  }

  useCode() {
    if (this.useAffCode && this.useAffCode.length > 0) {
      this.userService.useAffiliateCode(this.useAffCode).subscribe(res => {
        this.useCodeMessage = res;
      });
    } else {
      this.useCodeMessage = 'Please Enter a code';
    }


  }

}
