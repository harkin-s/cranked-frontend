import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {UserService} from '../../user.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-ticket-view',
  templateUrl: './ticket-view.component.html',
  styleUrls: ['./ticket-view.component.css']
})
export class TicketViewComponent {
@Input() selectTicket: any = {};
@Input() viewActive: boolean;
@Output() viewChange = new EventEmitter<boolean>();
@ViewChild('fileUpload') fileInput;
imageForm = new FormData();
fileNames: Array<String> = [];
invalidFile: Boolean = false;
imageNum: number = 0;
fileOversize: Boolean = false;
response: String = "";
user: any = {};
wrongFileType: boolean = false;

  constructor(private userService: UserService) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  setStatus(){
    this.viewActive = false;
    this.viewChange.emit(false);
  }

  sendReply(){
    this.response = this.response.replace(/(?:\r\n|\r|\n)/g, '<br />');
    let reply ={
      ticketId: this.selectTicket._id,
      ticketNum:this.selectTicket.ticketNum,
      message: this.response,
      files: this.fileNames
    };
    let now = new Date;
    this.selectTicket.messages.push({
      userName: this.user.username,
      isStaff: false,
      message: this.response,
      date: now.toJSON(),
      fileNames: this.fileNames
    });
    this.selectTicket.updated.push(now.toJSON());

    this.userService.ticketUpdate(reply , this.imageForm).subscribe();
    this.clearData();
  };

  removeFile(fileName,num){
    this.imageForm.delete('image_'+num);
    this.fileNames.splice(fileName);
  }

  async getImage(messageNum, imageName){
    const file = await this.userService.getTicketImage(this.selectTicket.ticketNum, messageNum, imageName);
    FileSaver.saveAs(file, imageName);
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

  clearData(){
    this.response = "";
    this.imageForm = new FormData();
    this.fileNames = [];
  }
}
