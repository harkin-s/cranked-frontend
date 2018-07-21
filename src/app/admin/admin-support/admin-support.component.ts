import { Component, OnInit ,ViewChild} from '@angular/core';
import { AdminComponent } from '../admin.component'
import { AdminService } from '../shared/admin.service';
import { OrderByPipe } from '../../shared/pipes/orderby.pipe';
import * as FileSaver from "file-saver";
@Component({
  selector: 'app-admin-support',
  templateUrl: './admin-support.component.html',
  styleUrls: ['./admin-support.component.css'],   
})
export class AdminSupportComponent implements OnInit {
@ViewChild('fileUpload') fileInput;
tickets: any = [];
invalidFile: boolean = false;
selectTicket: any = {};
listView : Boolean = true
staffResponse : String = "";
user: any = {};
isDesc: boolean = false;
column: string = 'ticketNum';
records: Array<any> = [];
imageNum : number = 0;
direction: number = 1;
Math: any;
fileNames: Array<String> = [];
imageForm = new FormData();
fileOversize: Boolean = false;
AdminComponent :any;


  constructor(private adminService: AdminService) { 
     this.user = JSON.parse(localStorage.getItem('currentUser'));
     this.Math = Math;
     this.AdminComponent = AdminComponent.prototype;
  }

  ngOnInit() {
    this.adminService.getTickets().subscribe((res)=>{
      //this.tickets = res;
      this.records = res;
      this.records.forEach(tic => {
        //To format the date created string
        var newDate = new Date(tic.dateCreated)
        tic.dateCreated = newDate.toLocaleDateString('en-GB');
        // TO format last updated string
        var lastUpdatedDate = new Date(tic.updated[tic.updated.length - 1]);
        var currentDate = new Date();
        tic.lastUpdatedDiff = (currentDate.getTime() - lastUpdatedDate.getTime()) / (1000 * 60);
        tic.lastUpdatedFormated = lastUpdatedDate.toLocaleString('en-GB');
        // Format message dates
        tic.messages.forEach(message => {
          var nDate = new Date(message.date);
          message.date = nDate.toLocaleString('en-GB');
        });

      });
    })
  }

  selectTic(tic){
    this.selectTicket = tic;
    this.listView = false;
  }

  sendReply(){
    this.staffResponse = this.staffResponse.replace(/(?:\r\n|\r|\n)/g, '<br />');
    let data ={
      message: this.staffResponse,
      ticketId: this.selectTicket._id,
      fileNames: this.fileNames,
    };
    let now = new Date;
    this.selectTicket.messages.push({
      userName: this.user.username,
      isStaff: true,
      message: this.staffResponse,
      date: now.toJSON(),
      fileNames: this.fileNames
    });
    this.selectTicket.updated.push(now.toJSON());

    this.adminService.sendReply(data).subscribe();
    this.adminService.uploadFile(this.imageForm, this.selectTicket.ticketNum, this.selectTicket.messages.length).subscribe();
    this.clearData();
  };

  closeTicket(){
    this.selectTicket.status = "Closed";
    let id = {
      id: this.selectTicket._id
    };
    this.adminService.closeTicket(id).subscribe();
  }

  fileAdd(){
    let fileBrowser = this.fileInput.nativeElement;
    if(fileBrowser.files[0].size < 1024 * 1024 * 5){
      let fileName = fileBrowser.files[0].name.toUpperCase();
      if(fileName.includes(".PNG") || fileName.includes(".JPEG")){
        this.invalidFile = false;
        this.fileOversize = false;
        this.imageNum ++;
        this.imageForm.append("image_"+this.imageNum, fileBrowser.files[0]);
        this.fileNames.push(fileBrowser.files[0].name);
      }
      else{
        this.invalidFile = true;
      }
    }
    else{
      this.fileOversize = true;
    } 
  }

  removeFile(fileName,num){
    this.imageForm.delete('image_'+num);
    this.fileNames.splice(fileName);
  }

  getImage(messageNum, imageName){
    return this.adminService.getTicketImage(this.selectTicket.ticketNum, messageNum, imageName)
      .subscribe((res)=>{
        var blob = new Blob([res], {type: 'image/png'});
        FileSaver.saveAs(blob, imageName);
      });
  }
  //Used to change sort directions
  sort(property){
    this.isDesc = !this.isDesc; //change the direction    
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  };

  clearData(){
    this.staffResponse = "";
    this.imageForm = new FormData();
    this.fileNames = [];
  }

}
