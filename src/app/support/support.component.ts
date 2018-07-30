import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css'],
})

export class SupportComponent {
@ViewChild('fileUpload') fileInput;
fileToUpload: Array<Object>;
supportComp: any;
selectTicket: any;
fileNames: Array<String> = [];
fileOversize: Boolean = false;
viewTicket: Boolean = false;
imageNum= 0;
invalidFile: Boolean = false;
user: any;
department: String = '';
email: String = '';
subject: String = '';
message: String = '';
departments: String[] =  ['General Enquiries', 'Billing', 'Auction Issues', 'Item Issues', 'Sponsorship & Business',
                        'Account Issues', 'Affiliates Issues', 'Feedback & Suggestions' ];

  constructor(private userService: UserService) {
    this.supportComp = SupportComponent.prototype;
    this.userService.currentUser.subscribe(user => this.user = user);

  }

  submit() {
    const ticket = {
      department: this.department,
      email: this.email,
      subject: this.subject,
      message: this.message,
      files: this.fileNames
    };
  

    this.userService.createTicket(ticket, this.fileToUpload).subscribe((res) =>{
      document.getElementById('ticketCreatedButton').click();
      this.selectTicket = res;
      const newDate = new Date(this.selectTicket.dateCreated);
      this.selectTicket.dateCreated = newDate.toLocaleDateString('en-GB');
      // TO format last updated string
      const lastUpdatedDate = new Date(this.selectTicket.updated[this.selectTicket.updated.length - 1]);
      const currentDate = new Date();
      this.selectTicket.lastUpdatedDiff = (currentDate.getTime() - lastUpdatedDate.getTime()) / (1000 * 60);
      this.selectTicket.lastUpdatedFormated = lastUpdatedDate.toLocaleString('en-GB');
      // Format message dates
      this.selectTicket.messages.forEach(message => {
        const nDate = new Date(message.date);
        message.date = nDate.toLocaleString('en-GB');
      });
      this.clearData();
    });

  }

  fileAdd(files){
    const fileBrowser = this.fileInput.nativeElement;
    if (files[0].size < 1024 * 1024 * 5) {

      const fileName = files[0].name.toUpperCase();
      if (fileName.includes('.PNG') || fileName.includes('.JPEG')) {
        this.invalidFile = false;
        this.fileOversize = false;
        this.imageNum ++;
        const file = {
          name: fileName,
          file: files[0]
        };
        this.fileToUpload.push(file);

      } else {
        this.invalidFile = true;
      }
    } else {
      this.fileOversize = true;
    }
  }

  removeFile(fileName){
    delete this.fileNames[fileName];
  }

  clearData(){
    this.department = '';
    this.email  = '';
    this.subject = '';
    this.message = '';
    this.fileToUpload = Array<Object>();
    this.fileNames = [];
  }
  goBack(){
    this.viewTicket = false;
  }

}
