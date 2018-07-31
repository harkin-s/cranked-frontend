(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-admin-module"],{

/***/ "./src/app/admin/admin-shared.ts":
/*!***************************************!*\
  !*** ./src/app/admin/admin-shared.ts ***!
  \***************************************/
/*! exports provided: appendItems */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appendItems", function() { return appendItems; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);

var defaultPageSize = 12;
function appendItems(_a) {
    var allItems = _a.allItems, _b = _a.viewItems, viewItems = _b === void 0 ? [] : _b, _c = _a.pageSize, pageSize = _c === void 0 ? defaultPageSize : _c;
    if (!Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isEmpty"])(allItems) || allItems.length === viewItems.length) {
        var startIndex = viewItems.length;
        var newItems = allItems.slice(startIndex, (startIndex + pageSize));
        for (var _i = 0, newItems_1 = newItems; _i < newItems_1.length; _i++) {
            var skin = newItems_1[_i];
            viewItems.push(skin);
        }
        return viewItems;
    }
}


/***/ }),

/***/ "./src/app/admin/admin-support/admin-support.component.css":
/*!*****************************************************************!*\
  !*** ./src/app/admin/admin-support/admin-support.component.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".adminTabs{\n    margin-bottom: 15px;\n    margin-top: 15px; \n    border: none;\n}\n.adminTabs li a{\n    color: #777;\n    \n}\n.adminTabs li a:hover{\n    color: #ffffff;\n    background-color:transparent;\n    border: none;\n    text-decoration: none;\n    cursor: pointer;\n}\n.text-area{\n    border: 1px solid #000000;\n    background-color: #363636;\n    min-height: 100px;\n    margin-bottom: 2%;\n}\n.staffMes{\n    border-color: #01E5A8;\n}\n#reply-text{\n    border: 1px solid #000000;\n    background-color: #363636;\n    color: #777;\n    height: 150px;\n    width: 70%;\n}\n.reply .row{\n    margin-bottom: 2%;\n}\n.reply button{\n    width: 40%;\n}\n#uploadButton{\n    width: 40%;\n    margin-bottom: 2%;\n}\n"

/***/ }),

/***/ "./src/app/admin/admin-support/admin-support.component.html":
/*!******************************************************************!*\
  !*** ./src/app/admin/admin-support/admin-support.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"text-center\">\n  <ul class=\"list-inline adminTabs\">\n    <li [routerLink]=\"['/admin']\"><a>Bot Inventory</a></li>\n    <li [routerLink]=\"['/admin/op-skins']\"><a>OPSkins Inventory</a></li>\n    <li [routerLink]=\"['/admin/remove']\"><a>Remove Auction</a></li>\n    <li [routerLink]=\"['/admin/support']\" ><a>Support Tickets</a></li>\n    <li [routerLink]=\"['/admin/listings']\"><a>Listings</a></li>\n    <li [routerLink]=\"['/admin/user-list']\"><a >User List</a></li>\n  </ul>\n</div>\n\n<div *ngIf=\"listView\" class=\"container\">\n  <table class=\"table\">\n    <thead>\n      <tr>\n        <th (click)=\"sort('ticketNum')\">Ticket\n          <i class=\"fa\" [ngClass]=\"{'fa-sort': column != 'ticketNum', 'fa-sort-asc': (column == 'ticketNum' && isDesc), 'fa-sort-desc': (column == 'ticketNum' && !isDesc) }\"\n            aria-hidden=\"true\"> </i>\n        </th>\n        <th (click)=\"sort('department')\">Department\n          <i class=\"fa\" [ngClass]=\"{'fa-sort': column != 'department', 'fa-sort-asc': (column == 'department' && isDesc), 'fa-sort-desc': (column == 'department' && !isDesc) }\"\n            aria-hidden=\"true\"> </i>\n        </th>\n        <th (click)=\"sort('dateCreated')\">Date Created\n          <i class=\"fa\" [ngClass]=\"{'fa-sort': column != 'dateCreated', 'fa-sort-asc': (column == 'dateCreated' && isDesc), 'fa-sort-desc': (column == 'dateCreated' && !isDesc) }\"\n            aria-hidden=\"true\"> </i>\n        </th>\n        <th (click)=\"sort('lastUpdatedDiff')\">Updated\n          <i class=\"fa\" [ngClass]=\"{'fa-sort': column != 'lastUpdatedDiff', 'fa-sort-asc': (column == 'lastUpdatedDiff' && isDesc), 'fa-sort-desc': (column == 'lastUpdatedDiff' && !isDesc) }\"\n            aria-hidden=\"true\"> </i>\n        </th>\n        <th (click)=\"sort('status')\">Status\n          <i class=\"fa\" [ngClass]=\"{'fa-sort': column != 'status', 'fa-sort-asc': (column == 'status' && isDesc), 'fa-sort-desc': (column == 'status' && !isDesc) }\"\n            aria-hidden=\"true\"> </i>\n        </th>\n        <th (click)=\"sort('subject')\">Subject\n          <i class=\"fa\" [ngClass]=\"{'fa-sort': column != 'subject', 'fa-sort-asc': (column == 'subject' && isDesc), 'fa-sort-desc': (column == 'subject' && !isDesc) }\"\n            aria-hidden=\"true\"> </i>\n        </th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr *ngFor=\"let ticket of records |  orderBy: {property: column, direction: direction}\" (click)=\"selectTic(ticket)\">\n        <td>{{ticket.ticketNum}}</td>\n        <td>{{ticket.department}}</td>\n        <td>{{ticket.dateCreated}}</td>\n        <td [hidden]=\"ticket.lastUpdatedDiff > 1440\">{{this.Math.ceil(ticket.lastUpdatedDiff / 60 )}} hours ago</td>\n        <td [hidden]=\"ticket.lastUpdatedDiff < 1440\">{{this.Math.ceil(ticket.lastUpdatedDiff / 1440 )}} days ago </td>\n        <td>{{ticket.status}}</td>\n        <td>{{ticket.subject}}</td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n\n<div *ngIf=\"!listView\" class=\"container\">\n  <div class=\"row\">\n    <div class=\"col-md-4 reply \">\n      <div class=\"row\">\n        <button class=\"btn btn-default\" (click)=\"listView = true\"> <i class=\"fa fa-arrow-left\" aria-hidden=\"true\"></i> Go Back to list</button>\n      </div>\n      <div class=\"row\">\n        <strong>Status:</strong>\n        <p>{{selectTicket.status}}</p>\n        <strong>Department:</strong>\n        <p>{{selectTicket.department}}</p>\n        <strong>Ticket Opened:</strong>\n        <p>{{selectTicket.dateCreated}}</p>\n        <strong>Last Updated:</strong>\n        <p>{{selectTicket.lastUpdatedFormated}}</p>\n      </div>\n      <div class=\"row\">\n        <textarea [(ngModel)]=\"staffResponse\" id=\"reply-text\" rows=\"7\" placeholder=\"Add Reply\"></textarea>\n      </div>\n      <p *ngFor=\"let file of fileNames; let i = index\">\n        {{file}}  <i class=\"fa fa-times-circle\" (click)=\"removeFile(file,i+1)\" aria-hidden=\"true\"></i>\n      </p>\n      <p *ngIf=\"invalidFile\">\n        File upload must be PNG or JPEG\n      </p>\n      <p *ngIf=\"fileOversize\">\n        File must be less than 5MB\n      </p>\n      <div class=\"row\">\n        <form id=\"frmUploader\" enctype=\"multipart/form-data\">\n          <label class=\"btn btn-success\" id=\"uploadButton\"><i class=\"fa fa-paperclip\"></i> Upload <input class =\"hidden\" (change)=\"fileAdd()\" type=\"file\" #fileUpload name=\"file\"></label><br>\n          <button class=\"btn btn-success\" (click)=\"sendReply()\">Reply</button>\n        </form>\n      </div>\n      <div class=\"row\">\n        <button class=\"btn btn-danger\" (click)=\"closeTicket()\">Close Ticket</button>\n      </div>\n    </div>\n    <div class=\"col-md-8\">\n      <div class=\"row\">\n        <h2>Ticket #{{selectTicket.ticketNum}}: {{selectTicket.subject}}</h2>\n        <div [ngClass]=\"{'staffMes': mes.isStaff }\" class=\"text-area\" *ngFor=\"let mes of selectTicket.messages; let i = index\">\n          <div>\n            <p *ngIf=\"mes.isStaff\" style=\"color:#01E5A8;\" > {{i +1 }}. Staff reply by {{mes.userName}} on {{mes.date}}</p>\n            <p *ngIf=\"!mes.isStaff\" >{{i +1 }}. Sent by {{mes.userName}} on {{mes.date}}</p>\n            <p [innerHtml] = \"mes.message\"></p>\n            <p *ngFor=\"let name of mes.fileNames\">\n              <a (click)=\"getImage(i+1,name)\"> {{name}}</a>\n            </p>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/admin/admin-support/admin-support.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/admin/admin-support/admin-support.component.ts ***!
  \****************************************************************/
/*! exports provided: AdminSupportComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminSupportComponent", function() { return AdminSupportComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _admin_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../admin.component */ "./src/app/admin/admin.component.ts");
/* harmony import */ var _shared_admin_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/admin.service */ "./src/app/admin/shared/admin.service.ts");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! file-saver */ "./node_modules/file-saver/FileSaver.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_3__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AdminSupportComponent = /** @class */ (function () {
    function AdminSupportComponent(adminService) {
        this.adminService = adminService;
        this.tickets = [];
        this.invalidFile = false;
        this.selectTicket = {};
        this.listView = true;
        this.staffResponse = "";
        this.user = {};
        this.isDesc = false;
        this.column = 'ticketNum';
        this.records = [];
        this.imageNum = 0;
        this.direction = 1;
        this.fileNames = [];
        this.imageForm = new FormData();
        this.fileOversize = false;
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        this.Math = Math;
        this.AdminComponent = _admin_component__WEBPACK_IMPORTED_MODULE_1__["AdminComponent"].prototype;
    }
    AdminSupportComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.adminService.getTickets().then(function (res) {
            //this.tickets = res;
            _this.records = res;
            _this.records.forEach(function (tic) {
                //To format the date created string
                var newDate = new Date(tic.dateCreated);
                tic.dateCreated = newDate.toLocaleDateString('en-GB');
                // TO format last updated string
                var lastUpdatedDate = new Date(tic.updated[tic.updated.length - 1]);
                var currentDate = new Date();
                tic.lastUpdatedDiff = (currentDate.getTime() - lastUpdatedDate.getTime()) / (1000 * 60);
                tic.lastUpdatedFormated = lastUpdatedDate.toLocaleString('en-GB');
                // Format message dates
                tic.messages.forEach(function (message) {
                    var nDate = new Date(message.date);
                    message.date = nDate.toLocaleString('en-GB');
                });
            });
        });
    };
    AdminSupportComponent.prototype.selectTic = function (tic) {
        this.selectTicket = tic;
        this.listView = false;
    };
    AdminSupportComponent.prototype.sendReply = function () {
        this.staffResponse = this.staffResponse.replace(/(?:\r\n|\r|\n)/g, '<br />');
        var data = {
            message: this.staffResponse,
            ticketId: this.selectTicket._id,
            fileNames: this.fileNames,
        };
        var now = new Date;
        this.selectTicket.messages.push({
            userName: this.user.username,
            isStaff: true,
            message: this.staffResponse,
            date: now.toJSON(),
            fileNames: this.fileNames
        });
        this.selectTicket.updated.push(now.toJSON());
        this.adminService.sendReply(data).then();
        this.adminService.uploadFile(this.imageForm, this.selectTicket.ticketNum, this.selectTicket.messages.length).then();
        this.clearData();
    };
    ;
    AdminSupportComponent.prototype.closeTicket = function () {
        this.selectTicket.status = "Closed";
        var id = {
            id: this.selectTicket._id
        };
        this.adminService.closeTicket(id).then();
    };
    AdminSupportComponent.prototype.fileAdd = function () {
        var fileBrowser = this.fileInput.nativeElement;
        if (fileBrowser.files[0].size < 1024 * 1024 * 5) {
            var fileName = fileBrowser.files[0].name.toUpperCase();
            if (fileName.includes(".PNG") || fileName.includes(".JPEG")) {
                this.invalidFile = false;
                this.fileOversize = false;
                this.imageNum++;
                this.imageForm.append("image_" + this.imageNum, fileBrowser.files[0]);
                this.fileNames.push(fileBrowser.files[0].name);
            }
            else {
                this.invalidFile = true;
            }
        }
        else {
            this.fileOversize = true;
        }
    };
    AdminSupportComponent.prototype.removeFile = function (fileName, num) {
        this.imageForm.delete('image_' + num);
        this.fileNames.splice(fileName);
    };
    AdminSupportComponent.prototype.getImage = function (messageNum, imageName) {
        return this.adminService.getTicketImage(this.selectTicket.ticketNum, messageNum, imageName)
            .then(function (res) {
            var blob = new Blob([res], { type: 'image/png' });
            file_saver__WEBPACK_IMPORTED_MODULE_3__["saveAs"](blob, imageName);
        });
    };
    //Used to change sort directions
    AdminSupportComponent.prototype.sort = function (property) {
        this.isDesc = !this.isDesc; //change the direction    
        this.column = property;
        this.direction = this.isDesc ? 1 : -1;
    };
    ;
    AdminSupportComponent.prototype.clearData = function () {
        this.staffResponse = "";
        this.imageForm = new FormData();
        this.fileNames = [];
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('fileUpload'),
        __metadata("design:type", Object)
    ], AdminSupportComponent.prototype, "fileInput", void 0);
    AdminSupportComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-admin-support',
            template: __webpack_require__(/*! ./admin-support.component.html */ "./src/app/admin/admin-support/admin-support.component.html"),
            styles: [__webpack_require__(/*! ./admin-support.component.css */ "./src/app/admin/admin-support/admin-support.component.css")],
        }),
        __metadata("design:paramtypes", [_shared_admin_service__WEBPACK_IMPORTED_MODULE_2__["AdminService"]])
    ], AdminSupportComponent);
    return AdminSupportComponent;
}());



/***/ }),

/***/ "./src/app/admin/admin.component.css":
/*!*******************************************!*\
  !*** ./src/app/admin/admin.component.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".skin{\n    margin: 0px;\n    cursor: pointer; cursor: hand; \n}\n.skin p{\n    font-size: small;\n    text-align: center;\n}\n.selectTab{\n   font-weight: 800;\n}\n.adminTabs{\n    margin-bottom: 15px;\n    margin-top: 15px; \n    border: none;\n}\n.adminTabs li a{\n    color: #777;\n    \n}\n.adminTabs li a:hover{\n    color: #ffffff;\n    background-color:transparent;\n    border: none;\n    text-decoration: none;\n}\nli{\n    cursor: pointer; cursor: hand;\n}\n.ng-valid[required], .ng-valid.required  {\n  border-left: 2px solid #42A948; /* green */\n}\n.ng-invalid:not(form)  {\n  border-left: 2px solid #a94442; /* red */\n}\n.timeForm{\n    margin-bottom: 1.5%;\n}\n.opSearch{\n    margin-bottom: 1%;\n}\n.pageNav p{\n    text-align: left;\n    margin-left: 60px\n}\n.pageNav ul{\n    margin-bottom: auto;\n}\ndiv.opSkin div{\n    cursor: pointer; cursor: hand;\n    text-align: center;\n}\n.search{\n    margin-left: 35%;\n    margin-bottom: 3%;\n}\n.mydp .selection{\n    background-color: #353334;\n    color: #777;\n}\n.modal-header{\n    border-bottom:1px solid #777; \n}"

/***/ }),

/***/ "./src/app/admin/admin.component.html":
/*!********************************************!*\
  !*** ./src/app/admin/admin.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"text-center\">\n  <ul class=\"list-inline adminTabs\">\n    <li [routerLink]=\"['/admin']\"><a>Bot Inventory</a></li>\n    <li [routerLink]=\"['/admin/op-skins']\"><a>OPSkins Inventory</a></li>\n    <li [routerLink]=\"['/admin/remove']\"><a>Remove Auction</a></li>\n    <li [routerLink]=\"['/admin/support']\"><a>Support Tickets</a></li>\n    <li [routerLink]=\"['/admin/listings']\"><a>Listings</a></li>\n    <li [routerLink]=\"['/admin/user-list']\"><a>User List</a></li>\n  </ul>\n</div>\n\n<div class=\"container\" infinite-scroll\n     [infiniteScrollDistance]=\"3\"\n     [infiniteScrollThrottle]=\"100\"\n     (scrolled)=\"onScrollDown()\">\n  <div class=\"row\">\n    <div class=\"row col-md-3 skin\" *ngFor=\"let inv of pageInventory\" [@fadeIn]=\"''\">\n      <div class=\"thumbnail\" data-toggle=\"modal\" data-target=\"#myModal\" (click)=\"selectSkin(inv)\">\n        <img src={{inv.icon_url_large}} alt=\"\">\n        <p>{{inv.name}}</p>\n        <p>{{inv.wear}}</p>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div id=\"myModal\" class=\"modal fade\" role=\"dialog\">\n  <div class=\"modal-dialog\">\n    <!-- Modal content-->\n    <div class=\"modal-content\">\n      <div class=\"modal-header text-center\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n        <h4 class=\"modal-title\">Add Auction</h4>\n      </div>\n      <div class=\"modal-body\">\n        <form #auctionForm=\"ngForm\" style=\"margin-right:2%;\">\n          <div class=\"form-group\" style=\"margin-bottom:0px;\">\n            <label for=\"weapon\">Name</label>\n            <input type=\"text\" class=\"form-control\" id=\"name\" required [(ngModel)]=\"auction.name\" name=\"weapon\">\n\n            <label for=\"value\">Value</label>\n            <input type=\"number\" class=\"form-control\" id=\"value\" required [(ngModel)]=\"auction.value\" name=\"Value\">\n\n            <label for=\"reserve\">Reserve</label>\n            <input type=\"number\" class=\"form-control\" id=\"reserve\" required [(ngModel)]=\"auction.reserve\"\n                   name=\"reserve\">\n\n            <label for=\"maxPrice\">Max Price</label>\n            <input type=\"number\" class=\"form-control\" id=\"maxPrice\" required [(ngModel)]=\"auction.maxPrice\"\n                   name=\"maxPrice\">\n\n            <label for=\"wear\">Weapon Wear</label>\n            <input type=\"text\" class=\"form-control\" id=\"wear\" required [(ngModel)]=\"auction.wear\" name=\"wear\">\n\n            <label for=\"numToStart\">Number of People to start</label>\n            <input type=\"number\" class=\"form-control\" id=\"numToStart\" required [(ngModel)]=\"auction.numToStart\"\n                   name=\"numToStart\">\n\n            <label for=\"priceIncrese\">Price Increse per bid (cents)</label>\n            <input type=\"number\" class=\"form-control\" id=\"priceIncrese\" required [(ngModel)]=\"auction.priceIncrease\"\n                   name=\"priceIncrese\">\n\n            <label for=\"bidCost\">Bid Cost</label>\n            <input type=\"number\" class=\"form-control\" id=\"bidCost\" required [(ngModel)]=\"auction.bidCost\"\n                   name=\"bidCost\">\n\n            <label for=\"time\">Initial Auction Time</label>\n            <input type=\"number\" class=\"form-control\" id=\"time\" required [(ngModel)]=\"auction.timeRemaining\"\n                   name=\"time\">\n\n            <label for=\"imageURL\">Image URL</label>\n            <input type=\"text\" class=\"form-control\" id=\"imageURL\" required [(ngModel)]=\"auction.imageURL\"\n                   name=\"imageURL\">\n\n            <label for=\"imageURL\">Start Date</label>\n            <my-date-picker style=\"background-color:#000000;\" name=\"mydate\" [options]=\"myDatePickerOptions\"\n                            [(ngModel)]=\"selectDate\">\n            </my-date-picker>\n          </div>\n          <label>Start Time</label>\n          <form class=\"form-inline timeForm\">\n            <div class=\"form-group\">\n              <input type=\"number\" class=\"form-control\" id=\"startHour\" required [(ngModel)]=\"startHour\" name=\"startTime\"\n                     placeholder=\"Hrs\"\n                     max=\"24\" min=\"0\">\n              <input type=\"number\" class=\"form-control\" id=\"startMinutes\" required [(ngModel)]=\"startMinutes\"\n                     name=\"startMinutes\" placeholder=\"Min\"\n                     max=\"60\" min=\"0\">\n            </div>\n          </form>\n          <button data-dismiss=\"modal\" (click)=\"onSubmit()\" class=\"btn btn-success\"\n                  [disabled]=\"!auctionForm.form.valid\">Add Auction\n          </button>\n          <button (click)=\"cancelSubmit()\" class=\"btn btn-danger\" data-dismiss=\"modal\">Cancel</button>\n        </form>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/admin/admin.component.ts":
/*!******************************************!*\
  !*** ./src/app/admin/admin.component.ts ***!
  \******************************************/
/*! exports provided: AdminComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminComponent", function() { return AdminComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _auction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auction */ "./src/app/admin/auction.ts");
/* harmony import */ var _shared_auctions_services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/auctions.services */ "./src/app/shared/auctions.services.ts");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/fesm5/animations.js");
/* harmony import */ var _admin_shared__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./admin-shared */ "./src/app/admin/admin-shared.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AdminComponent = /** @class */ (function () {
    function AdminComponent(service) {
        this.service = service;
        this.inventory = [];
        this.pageInventory = [];
        this.activeAuctions = [];
        this.skinChoosen = false;
        this.sourceOptions = ['Bot Inv', 'OpSkins'];
        this.source = '';
        this.skin = {};
        this.currentPage = 0;
        this.activeTab = 1;
        this.numToStart = 0;
        this.priceIncrese = 0;
        this.timeIncrese = 0;
        this.auction = new _auction__WEBPACK_IMPORTED_MODULE_1__["auction"]();
        //TODO Replace date picker wiht angular date picker
        this.submitted = false;
    }
    AdminComponent.prototype.ngOnInit = function () {
        this.getInventory();
    };
    AdminComponent.prototype.onScrollDown = function () {
        this.pageInventory = Object(_admin_shared__WEBPACK_IMPORTED_MODULE_4__["appendItems"])({ allItems: this.inventory.descriptions, viewItems: this.pageInventory, pageSize: 16 });
    };
    AdminComponent.prototype.onSubmit = function () {
        var _this = this;
        this.submitted = true;
        var date = new Date(this.selectDate.jsdate);
        date.setHours(this.startHour);
        date.setMinutes(this.startMinutes);
        this.auction.startDate = date;
        this.auction.priceIncrease = (this.auction.priceIncrease / 100);
        var item = lodash__WEBPACK_IMPORTED_MODULE_5__["find"](this.activeAuctions, {
            'assetid': this.auction.assetid,
            'appid': this.auction.appid,
            'contextid': this.auction.contextid
        });
        if (item === undefined) {
            this.service.addAuction(this.auction).then();
            //Remove added auction from descriptions
            // _.remove(this.inventory.descriptions, (item) => {
            //   return (item.assetid === this.auction.assetid && item.contextid === this.auction.contextid && item.appid === this.auction.appid);
            // });
            // Remove from page view
            lodash__WEBPACK_IMPORTED_MODULE_5__["remove"](this.pageInventory, function (_a) {
                var assetid = _a.assetid, contextid = _a.contextid, appid = _a.appid;
                return (assetid === _this.auction.assetid && contextid === _this.auction.contextid && appid === _this.auction.appid);
            });
            var numTo = Math.ceil(this.inventory.descriptions.length / 12);
            this.numberOfPages = lodash__WEBPACK_IMPORTED_MODULE_5__["range"](1, (numTo + 1));
            this.auction = new _auction__WEBPACK_IMPORTED_MODULE_1__["auction"]();
        }
        else {
            alert('Auction Already exists');
        }
    };
    AdminComponent.prototype.getInventory = function () {
        var _this = this;
        //Remove any unwanted items from inventory
        this.service.getInventory().subscribe(function (res) {
            _this.inventory = res;
            //Remove unmarktable items
            lodash__WEBPACK_IMPORTED_MODULE_5__["remove"](_this.inventory.descriptions, function (_a) {
                var tags = _a.tags;
                return (!(tags[1].category == 'Weapon'));
            });
            //Add asset id and context id for UID
            // this.inventory.descriptions.forEach((item) => {
            //   const {assetid, } = _.find(this.inventory.assets, {'classid': item.classid});
            //   item.assetid = asset.assetid;
            //   item.contextid = asset.contextid;
            // });
            //Remove auctions that are already live
            _this.activeAuctions.forEach(function (element) {
                lodash__WEBPACK_IMPORTED_MODULE_5__["remove"](_this.inventory.descriptions, function (_a) {
                    var assetid = _a.assetid, contextid = _a.contextid, appid = _a.appid;
                    return (assetid == element.assetid && contextid == element.contextid && appid == element.appid);
                });
            });
            for (var i = 0; i < _this.inventory.descriptions.length; i++) {
                _this.inventory.descriptions[i].icon_url_large = 'http://cdn.steamcommunity.com/economy/image/' + _this.inventory.descriptions[i].icon_url_large;
                var wear = _this.inventory.descriptions[i].market_name.match(/\(([^)]+)\)/);
                if (wear != undefined)
                    _this.inventory.descriptions[i].wear = wear[1];
            }
            _this.pageInventory = Object(_admin_shared__WEBPACK_IMPORTED_MODULE_4__["appendItems"])({ allItems: _this.inventory.descriptions, viewItems: _this.pageInventory, pageSize: 16 });
        });
        this.skinChoosen = true; //hidden boolea
    };
    AdminComponent.prototype.selectSkin = function (inv) {
        var _this = this;
        this.auction = new _auction__WEBPACK_IMPORTED_MODULE_1__["auction"]();
        this.auction.name = inv.name;
        this.service.getPrice(inv.market_hash_name).then(function (res) {
            _this.auction.value = res;
        });
        var link = inv.actions[0].link;
        var address = link.replace('%owner_steamid%', '76561198076790795').replace('%assetid%', inv.assetid);
        this.auction.imageURL = inv.icon_url_large;
        this.auction.assetid = inv.assetid;
        this.auction.contextid = inv.contextid;
        this.auction.appid = inv.appid;
        this.auction.wear = inv.wear;
        this.auction.inspectLink = inv.market_actions[0];
    };
    AdminComponent.prototype.cancelSubmit = function () {
        for (var _i = 0, _a = this.inventory.descriptions; _i < _a.length; _i++) {
            var item = _a[_i];
            item.selectedSkin = false;
        }
        this.auction = new _auction__WEBPACK_IMPORTED_MODULE_1__["auction"]();
    };
    AdminComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-admin',
            template: __webpack_require__(/*! ./admin.component.html */ "./src/app/admin/admin.component.html"),
            styles: [__webpack_require__(/*! ./admin.component.css */ "./src/app/admin/admin.component.css")],
            animations: [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["trigger"])('fadeIn', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["transition"])(':enter', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["style"])({ opacity: '0' }),
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["animate"])('.75s ease-out', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["style"])({ opacity: '1' })),
                    ]),
                ]),
            ],
        }),
        __metadata("design:paramtypes", [_shared_auctions_services__WEBPACK_IMPORTED_MODULE_2__["AuctionServices"]])
    ], AdminComponent);
    return AdminComponent;
}());



/***/ }),

/***/ "./src/app/admin/admin.module.ts":
/*!***************************************!*\
  !*** ./src/app/admin/admin.module.ts ***!
  \***************************************/
/*! exports provided: AdminModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminModule", function() { return AdminModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _shared_auctions_services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/auctions.services */ "./src/app/shared/auctions.services.ts");
/* harmony import */ var _admin_routes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./admin.routes */ "./src/app/admin/admin.routes.ts");
/* harmony import */ var _admin_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./admin.component */ "./src/app/admin/admin.component.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _admin_support_admin_support_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./admin-support/admin-support.component */ "./src/app/admin/admin-support/admin-support.component.ts");
/* harmony import */ var _shared_admin_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./shared/admin.service */ "./src/app/admin/shared/admin.service.ts");
/* harmony import */ var _user_list_user_list_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./user-list/user-list.component */ "./src/app/admin/user-list/user-list.component.ts");
/* harmony import */ var _shared_user_list_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./shared/user-list.service */ "./src/app/admin/shared/user-list.service.ts");
/* harmony import */ var _listings_admin_listings_admin_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./listings-admin/listings-admin.component */ "./src/app/admin/listings-admin/listings-admin.component.ts");
/* harmony import */ var _op_skins_op_skins_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./op-skins/op-skins.component */ "./src/app/admin/op-skins/op-skins.component.ts");
/* harmony import */ var _remove_remove_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./remove/remove.component */ "./src/app/admin/remove/remove.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














var AdminModule = /** @class */ (function () {
    function AdminModule() {
    }
    AdminModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [
                _admin_component__WEBPACK_IMPORTED_MODULE_4__["AdminComponent"],
                _admin_support_admin_support_component__WEBPACK_IMPORTED_MODULE_7__["AdminSupportComponent"],
                _user_list_user_list_component__WEBPACK_IMPORTED_MODULE_9__["UserListComponent"],
                _listings_admin_listings_admin_component__WEBPACK_IMPORTED_MODULE_11__["ListingsAdminComponent"],
                _op_skins_op_skins_component__WEBPACK_IMPORTED_MODULE_12__["OpSkinsComponent"],
                _remove_remove_component__WEBPACK_IMPORTED_MODULE_13__["RemoveComponent"]
            ],
            imports: [
                _admin_routes__WEBPACK_IMPORTED_MODULE_3__["AdminRouting"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__["SharedModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"]
            ],
            providers: [_shared_auctions_services__WEBPACK_IMPORTED_MODULE_2__["AuctionServices"], _shared_admin_service__WEBPACK_IMPORTED_MODULE_8__["AdminService"], _shared_user_list_service__WEBPACK_IMPORTED_MODULE_10__["UserListService"]],
        })
    ], AdminModule);
    return AdminModule;
}());



/***/ }),

/***/ "./src/app/admin/admin.routes.ts":
/*!***************************************!*\
  !*** ./src/app/admin/admin.routes.ts ***!
  \***************************************/
/*! exports provided: routes, AdminRouting */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routes", function() { return routes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminRouting", function() { return AdminRouting; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _admin_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./admin.component */ "./src/app/admin/admin.component.ts");
/* harmony import */ var _admin_support_admin_support_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./admin-support/admin-support.component */ "./src/app/admin/admin-support/admin-support.component.ts");
/* harmony import */ var _shared_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/auth-guard.service */ "./src/app/shared/auth-guard.service.ts");
/* harmony import */ var _user_list_user_list_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./user-list/user-list.component */ "./src/app/admin/user-list/user-list.component.ts");
/* harmony import */ var _listings_admin_listings_admin_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./listings-admin/listings-admin.component */ "./src/app/admin/listings-admin/listings-admin.component.ts");
/* harmony import */ var _op_skins_op_skins_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./op-skins/op-skins.component */ "./src/app/admin/op-skins/op-skins.component.ts");
/* harmony import */ var _remove_remove_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./remove/remove.component */ "./src/app/admin/remove/remove.component.ts");








var routes = [
    {
        path: '',
        component: _admin_component__WEBPACK_IMPORTED_MODULE_1__["AdminComponent"],
        canActivate: [_shared_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]]
    },
    {
        path: 'support',
        component: _admin_support_admin_support_component__WEBPACK_IMPORTED_MODULE_2__["AdminSupportComponent"],
        canActivate: [_shared_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]]
    },
    {
        path: 'user-list',
        component: _user_list_user_list_component__WEBPACK_IMPORTED_MODULE_4__["UserListComponent"],
        canActivate: [_shared_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]]
    },
    {
        path: 'listings',
        component: _listings_admin_listings_admin_component__WEBPACK_IMPORTED_MODULE_5__["ListingsAdminComponent"],
        canActivate: [_shared_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]]
    },
    {
        path: 'op-skins',
        component: _op_skins_op_skins_component__WEBPACK_IMPORTED_MODULE_6__["OpSkinsComponent"],
        canActivate: [_shared_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]]
    },
    {
        path: 'remove',
        component: _remove_remove_component__WEBPACK_IMPORTED_MODULE_7__["RemoveComponent"],
        canActivate: [_shared_auth_guard_service__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]]
    }
];
var AdminRouting = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes);


/***/ }),

/***/ "./src/app/admin/auction.ts":
/*!**********************************!*\
  !*** ./src/app/admin/auction.ts ***!
  \**********************************/
/*! exports provided: auction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "auction", function() { return auction; });
var auction = /** @class */ (function () {
    function auction(name, value, wear, inspectLink, timeRemaining, startDate, startHour, startMinutes, imageURL, reserve, numToStart, bidCost, priceIncrease, isInInventory, opSkinsId, assetid, contextid, appid, maxPrice) {
        if (name === void 0) { name = ''; }
        if (value === void 0) { value = ''; }
        if (wear === void 0) { wear = ''; }
        if (inspectLink === void 0) { inspectLink = {}; }
        if (timeRemaining === void 0) { timeRemaining = 0; }
        if (startDate === void 0) { startDate = {}; }
        if (startHour === void 0) { startHour = 0; }
        if (startMinutes === void 0) { startMinutes = 0; }
        if (imageURL === void 0) { imageURL = ''; }
        if (reserve === void 0) { reserve = 0; }
        if (numToStart === void 0) { numToStart = 0; }
        if (bidCost === void 0) { bidCost = 0; }
        if (priceIncrease === void 0) { priceIncrease = 0; }
        if (isInInventory === void 0) { isInInventory = true; }
        if (opSkinsId === void 0) { opSkinsId = ''; }
        if (assetid === void 0) { assetid = 0; }
        if (contextid === void 0) { contextid = 0; }
        if (appid === void 0) { appid = 0; }
        if (maxPrice === void 0) { maxPrice = 0; }
        this.name = name;
        this.value = value;
        this.wear = wear;
        this.inspectLink = inspectLink;
        this.timeRemaining = timeRemaining;
        this.startDate = startDate;
        this.startHour = startHour;
        this.startMinutes = startMinutes;
        this.imageURL = imageURL;
        this.reserve = reserve;
        this.numToStart = numToStart;
        this.bidCost = bidCost;
        this.priceIncrease = priceIncrease;
        this.isInInventory = isInInventory;
        this.opSkinsId = opSkinsId;
        this.assetid = assetid;
        this.contextid = contextid;
        this.appid = appid;
        this.maxPrice = maxPrice;
    }
    return auction;
}());

;


/***/ }),

/***/ "./src/app/admin/listings-admin/listings-admin.component.css":
/*!*******************************************************************!*\
  !*** ./src/app/admin/listings-admin/listings-admin.component.css ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".listing{\n    margin-right: 4%;\n    margin-left: 4%;\n}\n.listing img:hover{\n    cursor: pointer; \n}\nh2{\n    text-align: center;\n}\n.listing i:hover{\n    cursor: pointer; \n}\n.modify input{\n    width: auto;\n    margin-left: auto;\n    margin-right: auto;\n}\nh4{\n    text-align: center;\n}\nbutton{\n    width:100px;\n}\n#listingFooter .list-inline>li{\n    padding-left: 0;\n    padding-right: 0;\n}\n.adminTabs{\n    margin-bottom: 15px;\n    margin-top: 15px; \n    border: none;\n}\n.adminTabs li a{\n    color: #777;\n    \n}\n.adminTabs li a:hover{\n    color: #ffffff;\n    background-color:transparent;\n    border: none;\n    text-decoration: none;\n    cursor: pointer;\n}\n.modify{\n    text-align: center;\n}"

/***/ }),

/***/ "./src/app/admin/listings-admin/listings-admin.component.html":
/*!********************************************************************!*\
  !*** ./src/app/admin/listings-admin/listings-admin.component.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"text-center\">\n  <ul class=\"list-inline adminTabs\">\n    <li [routerLink]=\"['/admin']\"><a>Bot Inventory</a></li>\n    <li [routerLink]=\"['/admin/op-skins']\"><a>OPSkins Inventory</a></li>\n    <li [routerLink]=\"['/admin/remove']\"><a>Remove Auction</a></li>\n    <li [routerLink]=\"['/admin/support']\" ><a>Support Tickets</a></li>\n    <li [routerLink]=\"['/admin/listings']\"><a>Listings</a></li>\n    <li [routerLink]=\"['/admin/user-list']\"><a >User List</a></li>\n  </ul>\n</div>\n\n<div class=\"container\">\n  <div *ngIf=\"listings &&listings.length == 0\">\n    <h2>No Listings</h2>\n  </div>\n  <div *ngIf=\"listings && listings.length > 0\">\n    <div *ngFor=\"let listing of listings\">\n      <div *ngIf=\"listing.status === 'Listed'\" class=\"row col-md-3 listing\">\n        <div  class=\"thumbnail\" (click)=\"selectListing = listing\">\n          <h4>{{listing.skinName}}</h4>\n          <img data-toggle=\"modal\" data-target=\"#listingInfo\" src={{listing.imageURL}} alt=\"\">\n          <h4>Listed on {{listing.listDate}} <i data-toggle=\"modal\" data-target=\"#listingInfo\" class=\"fa fa-info-circle\" aria-hidden=\"true\"></i> </h4>\n          <h4>Our cut will be ${{(listing.salePrice * 0.15).toFixed(2)}}</h4>\n          <div class=\"row\" id=\"listingFooter\">\n            <h4>Our Price :<strong>${{listing.salePrice}}</strong></h4>\n            <div class=\"col-md-12 text-center\">\n              <ul class=\"list-inline\">\n                <li>\n                  <button type=\"button\" class=\"btn btn-warning \"><a style=\"color:#353334\" data-toggle=\"modal\" data-target=\"#listingModify\" href=\"{{listing.inspectLink.link}}\">Modify Price</a></button>\n                </li>\n                <li>\n                  <button type=\"button\" class=\"btn btn-danger \" (click)=\"cancelListing(listing)\">Cancel Listing</button>\n                </li>\n              </ul>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div *ngIf=\"listing.status === 'Sold'\" class=\"row col-md-3 listing\" >\n        <div  class=\"thumbnail\" (click)=\"selectListing = listing\">\n          <h4>{{listing.skinName}}</h4>\n          <img data-toggle=\"modal\" data-target=\"#listingInfoSold\" src={{listing.imageURL}} alt=\"\">\n          <h4>Listed on {{listing.saleDate}} <i data-toggle=\"modal\" data-target=\"#listingInfoSold\" class=\"fa fa-info-circle\" aria-hidden=\"true\"></i> </h4>\n          <h4>Our cut was: ${{(listing.salePrice * 0.15).toFixed(2)}}</h4>\n          <div class=\"row\" id=\"listingFooter\">\n            <div class=\"col-md-12 text-center\">\n              <ul class=\"list-inline\">\n                <li>\n                  <button type=\"button\" class=\"btn btn-danger \" (click)=\"removeFromAdm(listing)\">Clear Record</button>\n                </li>\n              </ul>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div id=\"listingModify\" class=\"modal fade\" role=\"dialog\">\n  <div class=\"modal-dialog\">\n    <div class=\"modal-content modify\">\n      <div class=\"modal-body\" *ngIf=\"selectListing\">\n        <h3>Modify Price</h3>\n        <p>Curretn Price: ${{selectListing.salePrice}}</p>\n        <input [(ngModel)]=\"newPrice\" type=\"text\" class=\"form-control\" (ngModelChange)=\"ourCut = newPrice * 0.15\" placeholder=\"New Price\">\n        <p>Our cut is currentley ${{(selectListing.salePrice * 0.15).toFixed(2)}} <br> Our new cut will be $ {{(ourCut).toFixed(2)}}\n        </p>\n      </div>\n      <div id=\"modalFooter\">\n        <ul class=\"list-inline\">\n          <li><button class=\"btn btn-success\" (click)=\"modifyListing()\">Modify</button></li>\n          <li><button class=\"btn btn-danger\" data-dismiss=\"modal\">Cancel</button></li>\n        </ul>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div id=\"listingInfo\" class=\"modal fade\" role=\"dialog\">\n  <div class=\"modal-dialog\">\n    <div class=\"modal-content\">\n      <div class=\"modal-body text-center\" *ngIf=\"selectListing\">\n        <p>Item: {{selectListing.skinName}} <br> Value: ${{selectListing.skinValue}} <br> Auction Reserve: {{selectListing.auctionReserve}}\n          <br> {{selectListing.userBidsOnAuc}} bid on the auction <br> Listing Created on {{selectListing.listDate}} <br>          Sale Price {{selectListing.salePrice}} <br> User Cut {{selectListing.userCut}} <br>\n          <strong>Our Cut ${{(selectListing.salePrice * 0.15).toFixed(2)}}</strong> <br> Listed By {{selectListing.creatorName}}\n        </p>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div id=\"listingInfoSold\" class=\"modal fade\" role=\"dialog\">\n  <div class=\"modal-dialog\">\n    <div class=\"modal-content\">\n      <div class=\"modal-body text-center\" *ngIf=\"selectListing\">\n        <p>Item: {{selectListing.skinName}} <br> Value: ${{selectListing.skinValue}} <br> Auction Reserve: {{selectListing.auctionReserve}}\n          <br> {{selectListing.userBidsOnAuc}} bid on the auction <br> Listing Created on {{selectListing.listDate}} <br>          Sale Price {{selectListing.salePrice}} <br> User Cut {{selectListing.userCut}} <br>\n          <strong>Our Cut ${{(selectListing.salePrice * 0.15).toFixed(2)}}</strong> <br> Sold By {{selectListing.creatorName}} <br> Bought by {{selectListing.purchaserName}}\n        </p>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/admin/listings-admin/listings-admin.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/admin/listings-admin/listings-admin.component.ts ***!
  \******************************************************************/
/*! exports provided: ListingsAdminComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListingsAdminComponent", function() { return ListingsAdminComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_admin_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/admin.service */ "./src/app/admin/shared/admin.service.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ListingsAdminComponent = /** @class */ (function () {
    function ListingsAdminComponent(adminService) {
        this.adminService = adminService;
        this.listings = null;
        this.selectListing = null;
        this.ourCut = 0;
        this.Math = Math;
    }
    ListingsAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.adminService.getAdmListings().then(function (res) {
            _this.listings = res;
            _this.listings = lodash__WEBPACK_IMPORTED_MODULE_2__["sortBy"](_this.listings, [function (o) { return o.status; }]);
            _this.listings.forEach(function (item) {
                item.listDate = new Date(item.listDate).toLocaleDateString('en-GB');
                item.saleDate = new Date(item.saleDate).toLocaleDateString('en-GB');
            });
        });
    };
    ListingsAdminComponent.prototype.cancelListing = function (listing) {
        var _this = this;
        var data = {
            id: listing._id
        };
        this.adminService.cancelListing(data).then();
        var index = 0;
        this.listings.forEach(function (item) {
            if (item._id === listing._id) {
                _this.listings.splice(index, 1);
            }
            index++;
        });
    };
    ListingsAdminComponent.prototype.modifyListing = function () {
        var _this = this;
        var data = {
            id: this.selectListing._id,
            newPrice: this.newPrice
        };
        this.adminService.modifyListing(data).then();
        this.listings.forEach(function (listing) {
            if (listing._id == _this.selectListing._id) {
                listing.salePrice = _this.newPrice;
            }
        });
    };
    ListingsAdminComponent.prototype.removeFromAdm = function (list) {
        var _this = this;
        var listing = {
            id: list._id
        };
        this.adminService.removeFromAdm(listing).then();
        var index = 0;
        this.listings.forEach(function (listing) {
            if (listing._id == list._id) {
                _this.listings.splice(index, 1);
            }
            index++;
        });
    };
    ListingsAdminComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-listings-admin',
            template: __webpack_require__(/*! ./listings-admin.component.html */ "./src/app/admin/listings-admin/listings-admin.component.html"),
            styles: [__webpack_require__(/*! ./listings-admin.component.css */ "./src/app/admin/listings-admin/listings-admin.component.css")]
        }),
        __metadata("design:paramtypes", [_shared_admin_service__WEBPACK_IMPORTED_MODULE_1__["AdminService"]])
    ], ListingsAdminComponent);
    return ListingsAdminComponent;
}());



/***/ }),

/***/ "./src/app/admin/op-skins/op-skins.component.css":
/*!*******************************************************!*\
  !*** ./src/app/admin/op-skins/op-skins.component.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".skin{\n  margin: 0px;\n  cursor: pointer; cursor: hand;\n}\n.skin p{\n  font-size: small;\n  text-align: center;\n}\n.selectTab{\n  font-weight: 800;\n}\n.adminTabs{\n  margin-bottom: 15px;\n  margin-top: 15px;\n  border: none;\n}\n.adminTabs li a{\n  color: #777;\n\n}\n.adminTabs li a:hover{\n  color: #ffffff;\n  background-color:transparent;\n  border: none;\n  text-decoration: none;\n}\nli{\n  cursor: pointer; cursor: hand;\n}\n.ng-valid[required], .ng-valid.required  {\n  border-left: 2px solid #42A948; /* green */\n}\n.ng-invalid:not(form)  {\n  border-left: 2px solid #a94442; /* red */\n}\n.timeForm{\n  margin-bottom: 1.5%;\n}\n.opSearch{\n  margin-bottom: 1%;\n}\n.pageNav p{\n  text-align: left;\n  margin-left: 60px\n}\n.pageNav ul{\n  margin-bottom: auto;\n}\ndiv.opSkin div{\n  cursor: pointer; cursor: hand;\n  text-align: center;\n}\n.search{\n  margin-left: 35%;\n  margin-bottom: 3%;\n}\n.mydp .selection{\n  background-color: #353334;\n  color: #777;\n}\n.modal-header{\n  border-bottom:1px solid #777;\n}\n"

/***/ }),

/***/ "./src/app/admin/op-skins/op-skins.component.html":
/*!********************************************************!*\
  !*** ./src/app/admin/op-skins/op-skins.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"text-center\">\n  <ul class=\"list-inline adminTabs\">\n    <li [routerLink]=\"['/admin']\"><a>Bot Inventory</a></li>\n    <li [routerLink]=\"['/admin/op-skins']\"><a>OPSkins Inventory</a></li>\n    <li [routerLink]=\"['/admin/remove']\"><a>Remove Auction</a></li>\n    <li [routerLink]=\"['/admin/support']\" ><a>Support Tickets</a></li>\n    <li [routerLink]=\"['/admin/listings']\"><a>Listings</a></li>\n    <li [routerLink]=\"['/admin/user-list']\"><a >User List</a></li>\n  </ul>\n</div>\n\n<div class=\"container\">\n    <div class=\"container\" infinite-scroll\n         [infiniteScrollDistance]=\"3\"\n         [infiniteScrollThrottle]=\"100\"\n         (scrolled)=\"onScrollDown()\">\n      <div class=\"row\">\n        <div class=\"col-md-4 col-md-offset-4 opSearch\">\n          <form>\n            <div class=\"input-group\">\n              <input class=\"form-control\" type=\"text\" [(ngModel)]=\"searchPara\" [ngModelOptions]=\"{standalone: true}\" id=\"search\" placeholder=\"Search\"\n                     (keydown.enter)=\"filterSkins(false)\">\n              <div class=\"input-group-btn\">\n                <button class=\"btn btn-default\" (click)=\"filterSkins(false)\">\n                  <i class=\"fa fa-search\" aria-hidden=\"true\"></i>\n                </button>\n                <button class=\"btn btn-default\" (click)=\"filterSkins(true)\">\n                  <i class=\"fa fa-times\" aria-hidden=\"true\"></i>\n                </button>\n              </div>\n            </div>\n          </form>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div *ngFor=\"let skin of pageItems\" class=\"opSkin col-md-4 col-xs-6\" >\n          <div data-toggle=\"modal\" data-target=\"#myModal\" class=\"thumbnail\" (click)=\"selectOPSkin(skin)\" >\n            <h5 style=\"text-align:center;\"><strong>Name: </strong>{{skin.name}}</h5>\n            <p><strong>Wear: </strong>{{skin.wear}}</p>\n            <p><strong>Lowest Price: </strong>${{skin.price}}</p>\n            <p><strong>Quantity </strong>{{skin.quantity}}</p>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n<div id=\"myModal\" class=\"modal fade\" role=\"dialog\">\n  <div class=\"modal-dialog\">\n    <!-- Modal content-->\n    <div class=\"modal-content\">\n      <div class=\"modal-header text-center\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n        <h4 class=\"modal-title\">Add Auction</h4>\n      </div>\n      <div class=\"modal-body\">\n        <form #auctionForm=\"ngForm\" style=\"margin-right:2%;\">\n          <div class=\"form-group\" style=\"margin-bottom:0px;\">\n            <label for=\"weapon\">Name</label>\n            <input type=\"text\" class=\"form-control\" id=\"name\" required [(ngModel)]=\"auction.name\" name=\"weapon\">\n\n            <label for=\"value\">Value</label>\n            <input type=\"number\" class=\"form-control\" id=\"value\" required [(ngModel)]=\"auction.value\" name=\"Value\">\n\n            <label for=\"reserve\">Reserve</label>\n            <input type=\"number\" class=\"form-control\" id=\"reserve\" required [(ngModel)]=\"auction.reserve\" name=\"reserve\">\n\n            <label for=\"maxPrice\">Max Price</label>\n            <input type=\"number\" class=\"form-control\" id=\"maxPrice\" required [(ngModel)]=\"auction.maxPrice\" name=\"maxPrice\">\n\n            <label for=\"wear\">Weapon Wear</label>\n            <input type=\"text\" class=\"form-control\" id=\"wear\" required [(ngModel)]=\"auction.wear\" name=\"wear\">\n\n            <label for=\"numToStart\">Number of People to start</label>\n            <input type=\"number\" class=\"form-control\" id=\"numToStart\" required [(ngModel)]=\"auction.numToStart\" name=\"numToStart\">\n\n            <label for=\"priceIncrese\">Price Increse per bid (cents)</label>\n            <input type=\"number\" class=\"form-control\" id=\"priceIncrese\" required [(ngModel)]=\"auction.priceIncrease\" name=\"priceIncrese\">\n\n            <label for=\"bidCost\">Bid Cost</label>\n            <input type=\"number\" class=\"form-control\" id=\"bidCost\" required [(ngModel)]=\"auction.bidCost\" name=\"bidCost\">\n\n            <label for=\"time\">Initial Auction Time</label>\n            <input type=\"number\" class=\"form-control\" id=\"time\" required [(ngModel)]=\"auction.timeRemaining\" name=\"time\">\n\n            <label for=\"imageURL\">Image URL</label>\n            <input type=\"text\" class=\"form-control\" id=\"imageURL\" required [(ngModel)]=\"auction.imageURL\" name=\"imageURL\">\n\n            <label for=\"imageURL\">Start Date</label>\n            <my-date-picker style=\"background-color:#000000;\" name=\"mydate\" [options]=\"myDatePickerOptions\" [(ngModel)]=\"selectDate\">\n            </my-date-picker>\n          </div>\n          <label>Start Time</label>\n          <form class=\"form-inline timeForm\">\n            <div class=\"form-group\">\n              <input type=\"number\" class=\"form-control\" id=\"startHour\" required [(ngModel)]=\"startHour\" name=\"startTime\" placeholder=\"Hrs\"\n                     max=\"24\" min=\"0\">\n              <input type=\"number\" class=\"form-control\" id=\"startMinutes\" required [(ngModel)]=\"startMinutes\" name=\"startMinutes\" placeholder=\"Min\"\n                     max=\"60\" min=\"0\">\n            </div>\n          </form>\n          <button data-dismiss=\"modal\" (click)=\"onSubmit()\" class=\"btn btn-success\" [disabled]=\"!auctionForm.form.valid\">Add Auction</button>\n          <button (click)=\"cancelSubmit()\" class=\"btn btn-danger\" data-dismiss=\"modal\">Cancel</button>\n        </form>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/admin/op-skins/op-skins.component.ts":
/*!******************************************************!*\
  !*** ./src/app/admin/op-skins/op-skins.component.ts ***!
  \******************************************************/
/*! exports provided: OpSkinsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OpSkinsComponent", function() { return OpSkinsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_auctions_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/auctions.services */ "./src/app/shared/auctions.services.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _admin_shared__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../admin-shared */ "./src/app/admin/admin-shared.ts");
/* harmony import */ var _auction__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../auction */ "./src/app/admin/auction.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var OpSkinsComponent = /** @class */ (function () {
    function OpSkinsComponent(service) {
        this.service = service;
        this.filteredSkins = [];
        this.unFilteredSkins = [];
        this.pageSize = 21;
        this.auction = new _auction__WEBPACK_IMPORTED_MODULE_4__["auction"]();
        this.searchPara = '';
    }
    OpSkinsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service.getOpskinsInventory().subscribe(function (res) {
            _this.unFilteredSkins = res;
            _this.filteredSkins = res;
            _this.pageItems = Object(_admin_shared__WEBPACK_IMPORTED_MODULE_3__["appendItems"])({ allItems: _this.filteredSkins, viewItems: _this.pageItems, pageSize: _this.pageSize });
        });
    };
    OpSkinsComponent.prototype.onScrollDown = function () {
        this.pageItems = Object(_admin_shared__WEBPACK_IMPORTED_MODULE_3__["appendItems"])({ allItems: this.filteredSkins, viewItems: this.pageItems, pageSize: this.pageSize });
    };
    OpSkinsComponent.prototype.selectOPSkin = function (skin) {
        var _this = this;
        this.auction = new _auction__WEBPACK_IMPORTED_MODULE_4__["auction"]();
        this.auction.name = skin.name;
        this.service.getImage("" + skin.name + skin.wear).subscribe(function (res) {
            _this.auction.imageURL = res.url;
        });
        this.auction.wear = skin.wear;
        this.auction.value = skin.price;
    };
    OpSkinsComponent.prototype.filterSkins = function (clear) {
        var _this = this;
        if (clear === true || this.searchPara === '') {
            this.filteredSkins = this.unFilteredSkins.length > this.filteredSkins.length ? this.unFilteredSkins : this.filteredSkins;
            this.pageItems = [];
            this.searchPara = '';
            this.pageItems = Object(_admin_shared__WEBPACK_IMPORTED_MODULE_3__["appendItems"])({ allItems: this.filteredSkins, viewItems: this.pageItems, pageSize: this.pageSize });
        }
        else {
            this.filteredSkins = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["filter"])(this.unFilteredSkins, function (skin) {
                return skin.name.toLowerCase().includes(_this.searchPara.toLowerCase());
            });
            this.pageItems = [];
            this.pageItems = Object(_admin_shared__WEBPACK_IMPORTED_MODULE_3__["appendItems"])({ allItems: this.filteredSkins, viewItems: this.pageItems, pageSize: this.pageSize });
        }
    };
    OpSkinsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-op-skins',
            template: __webpack_require__(/*! ./op-skins.component.html */ "./src/app/admin/op-skins/op-skins.component.html"),
            styles: [__webpack_require__(/*! ./op-skins.component.css */ "./src/app/admin/op-skins/op-skins.component.css")],
        }),
        __metadata("design:paramtypes", [_shared_auctions_services__WEBPACK_IMPORTED_MODULE_1__["AuctionServices"]])
    ], OpSkinsComponent);
    return OpSkinsComponent;
}());



/***/ }),

/***/ "./src/app/admin/remove/remove.component.css":
/*!***************************************************!*\
  !*** ./src/app/admin/remove/remove.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".skin{\n  margin: 0px;\n  cursor: pointer; cursor: hand;\n}\n.skin p{\n  font-size: small;\n  text-align: center;\n}\n.selectTab{\n  font-weight: 800;\n}\n.adminTabs{\n  margin-bottom: 15px;\n  margin-top: 15px;\n  border: none;\n}\n.adminTabs li a{\n  color: #777;\n\n}\n.adminTabs li a:hover{\n  color: #ffffff;\n  background-color:transparent;\n  border: none;\n  text-decoration: none;\n}\nli{\n  cursor: pointer; cursor: hand;\n}\n.ng-valid[required], .ng-valid.required  {\n  border-left: 2px solid #42A948; /* green */\n}\n.ng-invalid:not(form)  {\n  border-left: 2px solid #a94442; /* red */\n}\n.timeForm{\n  margin-bottom: 1.5%;\n}\n.opSearch{\n  margin-bottom: 1%;\n}\n.pageNav p{\n  text-align: left;\n  margin-left: 60px\n}\n.pageNav ul{\n  margin-bottom: auto;\n}\ndiv.opSkin div{\n  cursor: pointer; cursor: hand;\n  text-align: center;\n}\n.search{\n  margin-left: 35%;\n  margin-bottom: 3%;\n}\n.mydp .selection{\n  background-color: #353334;\n  color: #777;\n}\n.modal-header{\n  border-bottom:1px solid #777;\n}\n"

/***/ }),

/***/ "./src/app/admin/remove/remove.component.html":
/*!****************************************************!*\
  !*** ./src/app/admin/remove/remove.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"text-center\">\n  <ul class=\"list-inline adminTabs\">\n    <li [routerLink]=\"['/admin']\"><a>Bot Inventory</a></li>\n    <li [routerLink]=\"['/admin/op-skins']\"><a>OPSkins Inventory</a></li>\n    <li [routerLink]=\"['/admin/remove']\"><a>Remove Auction</a></li>\n    <li [routerLink]=\"['/admin/support']\" ><a>Support Tickets</a></li>\n    <li [routerLink]=\"['/admin/listings']\"><a>Listings</a></li>\n    <li [routerLink]=\"['/admin/user-list']\"><a >User List</a></li>\n  </ul>\n</div>\n\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"row col-md-4 skin\" *ngFor=\"let auc of activeAuctions\">\n        <div class=\"thumbnail\">\n          <img src={{auc.imageURL}} alt=\"\">\n          <p>{{auc.name}}\n          <p>\n            <button type=\"button\" data-toggle=\"modal\" data-target=\"#removeModal\" class=\"btn btn-danger\" (click)=\"selectAuctionId = auc._id\">Remove</button>\n        </div>\n      </div>\n    </div>\n  </div>\n\n<div class=\"modal fade\" id=\"removeModal\" role=\"dialog\">\n  <div class=\"modal-dialog\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h4 class=\"modal-title\">Are you sure you want to remove this auction?</h4>\n        <div *ngIf=\"toRemove != undefined\">\n          {{toRemove.name}}\n        </div>\n      </div>\n      <div class=\"modal-body\">\n        <button type=\"button\" data-dismiss=\"modal\" class=\"btn btn-default\">No</button>\n        <button type=\"button\" (click)=\"removeSelectAuction()\" data-dismiss=\"modal\" class=\"btn btn-danger\">Yes</button>\n      </div>\n    </div>\n  </div>\n</div>\n\n"

/***/ }),

/***/ "./src/app/admin/remove/remove.component.ts":
/*!**************************************************!*\
  !*** ./src/app/admin/remove/remove.component.ts ***!
  \**************************************************/
/*! exports provided: RemoveComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RemoveComponent", function() { return RemoveComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_auctions_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/auctions.services */ "./src/app/shared/auctions.services.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var RemoveComponent = /** @class */ (function () {
    function RemoveComponent(service) {
        this.service = service;
        this.activeAuctions = [];
    }
    RemoveComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service.getAllAuctions().then(function (res) {
            _this.activeAuctions = res;
        });
    };
    RemoveComponent.prototype.removeSelectAuction = function () {
        var _this = this;
        if (this.selectAuctionId) {
            this.service.removeAuction(this.selectAuctionId).then(function (res) {
                Object(lodash__WEBPACK_IMPORTED_MODULE_2__["remove"])(_this.activeAuctions, function (item) {
                    return item._id === _this.selectAuctionId;
                });
                _this.selectAuctionId = null;
            });
        }
    };
    RemoveComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-remove',
            template: __webpack_require__(/*! ./remove.component.html */ "./src/app/admin/remove/remove.component.html"),
            styles: [__webpack_require__(/*! ./remove.component.css */ "./src/app/admin/remove/remove.component.css")]
        }),
        __metadata("design:paramtypes", [_shared_auctions_services__WEBPACK_IMPORTED_MODULE_1__["AuctionServices"]])
    ], RemoveComponent);
    return RemoveComponent;
}());



/***/ }),

/***/ "./src/app/admin/shared/admin.service.ts":
/*!***********************************************!*\
  !*** ./src/app/admin/shared/admin.service.ts ***!
  \***********************************************/
/*! exports provided: AdminService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminService", function() { return AdminService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AdminService = /** @class */ (function () {
    function AdminService(http) {
        this.http = http;
    }
    AdminService.prototype.getTickets = function () {
        return this.http.get('/api/allTickets').toPromise();
    };
    AdminService.prototype.sendReply = function (data) {
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http
            .put('/api/staffTicketReply', JSON.stringify(data), { headers: headers })
            .toPromise();
    };
    AdminService.prototype.closeTicket = function (id) {
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http
            .put('/api/closeTicket', JSON.stringify(id), { headers: headers })
            .toPromise();
    };
    AdminService.prototype.uploadFile = function (file, id, messNum) {
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]();
        headers.delete('Content-Type');
        var params = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["URLSearchParams"]();
        params.set('issueId', id);
        params.set('messageNum', messNum);
        return this.http
            .post('/api/uploadFile', file, { headers: headers, params: params })
            .toPromise();
    };
    AdminService.prototype.getTicketImage = function (ticketNum, messageNum, imageName) {
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]();
        var params = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["URLSearchParams"]();
        params.set('ticketNum', ticketNum);
        params.set('messageNum', messageNum);
        params.set('imageName', imageName);
        var options = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["RequestOptions"]({
            headers: headers,
            params: params
        });
        options.responseType = _angular_http__WEBPACK_IMPORTED_MODULE_1__["ResponseContentType"].Blob;
        return this.http.get('/api/ticketImage', options).toPromise();
    };
    AdminService.prototype.getAdmListings = function () {
        return this.http.get('/api/admListings').toPromise();
    };
    AdminService.prototype.cancelListing = function (listing) {
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/cancelListing', JSON.stringify(listing), { headers: headers }).toPromise();
    };
    AdminService.prototype.modifyListing = function (listing) {
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/modifyListing', JSON.stringify(listing), { headers: headers });
    };
    AdminService.prototype.removeFromAdm = function (listing) {
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/removeFromAdm', JSON.stringify(listing), { headers: headers });
    };
    AdminService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"]])
    ], AdminService);
    return AdminService;
}());



/***/ }),

/***/ "./src/app/admin/shared/user-list.service.ts":
/*!***************************************************!*\
  !*** ./src/app/admin/shared/user-list.service.ts ***!
  \***************************************************/
/*! exports provided: UserListService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserListService", function() { return UserListService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UserListService = /** @class */ (function () {
    function UserListService(http) {
        this.http = http;
    }
    UserListService.prototype.getUsers = function () {
        return this.http.get('/api/userList').toPromise();
    };
    UserListService.prototype.giveTokens = function (data) {
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/giveTokens', JSON.stringify(data), { headers: headers })
            .toPromise();
    };
    UserListService.prototype.takeTokens = function (data) {
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/takeTokens', JSON.stringify(data), { headers: headers })
            .toPromise();
    };
    UserListService.prototype.banUser = function (data) {
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_1__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/banUser', JSON.stringify(data), { headers: headers })
            .toPromise();
    };
    UserListService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_http__WEBPACK_IMPORTED_MODULE_1__["Http"]])
    ], UserListService);
    return UserListService;
}());



/***/ }),

/***/ "./src/app/admin/user-list/user-list.component.css":
/*!*********************************************************!*\
  !*** ./src/app/admin/user-list/user-list.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#button-row{\n    height: 45px;\n}\n#button-row button{\n    margin: 5px;\n}\n.table>tbody+tbody{\n    border: none;\n}\n.table>thead>tr>th{\n    border: none;\n}\n.token-buttons{\n    margin-top: 8px;\n}"

/***/ }),

/***/ "./src/app/admin/user-list/user-list.component.html":
/*!**********************************************************!*\
  !*** ./src/app/admin/user-list/user-list.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"text-center\">\n  <ul class=\"list-inline adminTabs\">\n    <li [routerLink]=\"['/admin']\"><a>Bot Inventory</a></li>\n    <li [routerLink]=\"['/admin/op-skins']\"><a>OPSkins Inventory</a></li>\n    <li [routerLink]=\"['/admin/remove']\"><a>Remove Auction</a></li>\n    <li [routerLink]=\"['/admin/support']\" ><a>Support Tickets</a></li>\n    <li [routerLink]=\"['/admin/listings']\"><a>Listings</a></li>\n    <li [routerLink]=\"['/admin/user-list']\"><a >User List</a></li>\n  </ul>\n</div>\n\n<div class=\"container\">\n  <table class=\"table\">\n    <thead>\n      <tr>\n        <th (click)=\"sort('_id')\">User #\n          <i class=\"fa\" [ngClass]=\"{'fa-sort': column != '_id', 'fa-sort-asc': (column == '_id' && isDesc), 'fa-sort-desc': (column == '_id' && !isDesc) }\"\n            aria-hidden=\"true\"> </i>\n        </th>\n        <th (click)=\"sort('username')\">User Name\n          <i class=\"fa\" [ngClass]=\"{'fa-sort': column != 'username', 'fa-sort-asc': (column == 'username' && isDesc), 'fa-sort-desc': (column == 'username' && !isDesc) }\"\n            aria-hidden=\"true\"> </i>\n        </th>\n        <th (click)=\"sort('userid')\">Steam ID\n          <i class=\"fa\" [ngClass]=\"{'fa-sort': column != 'userid', 'fa-sort-asc': (column == 'userid' && isDesc), 'fa-sort-desc': (column == 'userid' && !isDesc) }\"\n            aria-hidden=\"true\"> </i>\n        </th>\n        <th (click)=\"sort('tokensPurchased')\">Tokens Purchased\n          <i class=\"fa\" [ngClass]=\"{'fa-sort': column != 'tokensPurchased', 'fa-sort-asc': (column == 'tokensPurchased' && isDesc), 'fa-sort-desc': (column == 'tokensPurchased' && !isDesc) }\"\n            aria-hidden=\"true\"> </i>\n        </th>\n        <th (click)=\"sort('tokensSpent')\">Tokens Spent\n          <i class=\"fa\" [ngClass]=\"{'fa-sort': column != 'tokensSpent', 'fa-sort-asc': (column == 'tokensSpent' && isDesc), 'fa-sort-desc': (column == 'tokensSpent' && !isDesc) }\"\n            aria-hidden=\"true\"> </i>\n        </th>\n        <th (click)=\"sort('tokens')\">Current balence\n          <i class=\"fa\" [ngClass]=\"{'fa-sort': column != 'tokens', 'fa-sort-asc': (column == 'tokens' && isDesc), 'fa-sort-desc': (column == 'tokens' && !isDesc) }\"\n            aria-hidden=\"true\"> </i>\n        </th>\n        <th (click)=\"sort('auctionsWon')\">Auctions Won\n          <i class=\"fa\" [ngClass]=\"{'fa-sort': column != 'auctionsWon', 'fa-sort-asc': (column == 'auctionsWon' && isDesc), 'fa-sort-desc': (column == 'auctionsWon' && !isDesc) }\"\n            aria-hidden=\"true\"> </i>\n        </th>\n        <th (click)=\"sort('memberSince')\">Memeber Since\n          <i class=\"fa\" [ngClass]=\"{'fa-sort': column != 'memberSince', 'fa-sort-asc': (column == 'memberSince' && isDesc), 'fa-sort-desc': (column == 'memberSince' && !isDesc) }\"\n            aria-hidden=\"true\"> </i>\n        </th>\n      </tr>\n    </thead>\n    <tbody *ngFor=\"let user of records |  orderBy: {property: column, direction: direction}\" >\n      <tr (click)=\"selectUser(user)\" >\n        <td>{{user._id}}</td>\n        <td>{{user.username}}</td>\n        <td>{{user.userid}}</td>\n        <td>{{user.tokensPurchased}}</td>\n        <td>{{user.tokensSpent}}</td>\n        <td>{{user.tokens}}</td>\n        <td>{{user.auctionsWon.length}}</td>\n        <td>{{user.memberSince}}</td>\n      </tr>\n      <tr class=\"row\" *ngIf=\"user.optionsActive\">\n        <td></td>\n        <td></td>\n        <td></td>\n        <td></td>\n        <td>\n            <button class=\"btn btn-success\" data-toggle=\"modal\" data-target=\"#sendModal\">Send Tokens</button>\n        </td>\n        <td>\n            <button class=\"btn btn-warning\" data-toggle=\"modal\" data-target=\"#removeModal\">Remove Tokens</button>\n        </td>\n        <td>\n            <button *ngIf=\"!user.isBanned\" class=\"btn btn-danger\" (click)=\"banUser(true)\">Ban User</button>\n            <button *ngIf=\"user.isBanned\" class=\"btn btn-danger\" (click)=\"banUser(false)\">Un-Ban User</button>\n        </td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n<div id=\"sendModal\" class=\"modal fade\" role=\"dialog\">\n    <div class=\"modal-dialog\">\n\n      <!-- Modal content-->\n      <div class=\"modal-content\">\n        <div class=\"modal-header\">\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n          <h4 class=\"modal-title\">Send Tokens</h4>\n        </div>\n        <div class=\"modal-body\">\n          <input type=\"number\" [(ngModel)]=\"tokens\" required>\n          <ul class=\"list-inline token-buttons\">\n            <li><button class=\"btn btn-success\" (click)=\"giveTokens()\" >Send</button></li>\n            <li><button class=\"btn btn-danger\" data-dismiss=\"modal\" >Cancel</button></li>\n          </ul>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div id=\"removeModal\" class=\"modal fade\" role=\"dialog\">\n      <div class=\"modal-dialog\">\n\n        <!-- Modal content-->\n        <div class=\"modal-content\">\n          <div class=\"modal-header\">\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n            <h4 class=\"modal-title\">Remove Tokens</h4>\n          </div>\n          <div class=\"modal-body\">\n            <input type=\"number\" [(ngModel)]=\"tokens\" required>\n            <ul class=\"list-inline token-buttons\">\n              <li><button class=\"btn btn-success\" (click)=\"takeTokens()\" >Send</button></li>\n              <li><button class=\"btn btn-danger\" data-dismiss=\"modal\" >Cancel</button></li>\n            </ul>\n          </div>\n        </div>\n\n      </div>\n    </div>\n"

/***/ }),

/***/ "./src/app/admin/user-list/user-list.component.ts":
/*!********************************************************!*\
  !*** ./src/app/admin/user-list/user-list.component.ts ***!
  \********************************************************/
/*! exports provided: UserListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserListComponent", function() { return UserListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_user_list_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/user-list.service */ "./src/app/admin/shared/user-list.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UserListComponent = /** @class */ (function () {
    function UserListComponent(userListService) {
        this.userListService = userListService;
        this.direction = 1;
        this.isDesc = false;
        this.column = '_id';
        this.records = [];
        this.Math = Math;
    }
    UserListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userListService.getUsers().then(function (res) {
            _this.records = res;
            var now = new Date();
            // Format all of the records into the relevent fileds
            _this.records.forEach(function (user) {
                var joinDate = new Date(user.joinDate);
                user.memberSince = (now.getTime() - joinDate.getTime()) / (1000 * 60 * 60);
                if (user.memberSince > 24 && user.memberSince < 720) {
                    user.memberSince = user.memberSince / 24;
                    user.memberSince = Math.round(user.memberSince) + ' Days ago';
                }
                else if (user.memberSince > 720 && user.memberSince < 8640) {
                    user.memberSince = user.memberSince / 720;
                    user.memberSince = Math.round(user.memberSince) + ' Months ago';
                }
                else if (user.memberSince > 8640) {
                    user.memberSince = user.memberSince / 8640;
                    user.memberSince = Math.round(user.memberSince) + ' Years ago';
                }
                else {
                    user.memberSince = Math.round(user.memberSince) + ' Hours ago';
                }
                user.optionsActive = false;
                user.tokensPurchased = 0;
                if (user.purchaseHistory) {
                    user.purchaseHistory.forEach(function (purch) {
                        user.tokensPurchased += purch.tokens;
                    });
                }
                else {
                    user.tokensPurchased = 0;
                }
                user.tokensSpent = user.tokensPurchased - user.tokens;
            });
        });
    };
    ;
    UserListComponent.prototype.selectUser = function (user) {
        user.optionsActive = !user.optionsActive;
        this.user = user;
    };
    UserListComponent.prototype.giveTokens = function () {
        var data = {
            userid: this.user._id,
            tokens: this.tokens
        };
        this.userListService.giveTokens(data).then();
        this.user.tokens += this.tokens;
    };
    UserListComponent.prototype.banUser = function (value) {
        var data = {
            userid: this.user._id,
            value: value
        };
        this.userListService.banUser(data).then();
        this.user.isBanned = value;
    };
    UserListComponent.prototype.takeTokens = function () {
        var data = {
            userid: this.user._id,
            tokens: this.tokens
        };
        this.userListService.takeTokens(data).then();
        this.user.tokens -= this.tokens;
    };
    UserListComponent.prototype.sort = function (property) {
        this.isDesc = !this.isDesc; //change the direction    
        this.column = property;
        this.direction = this.isDesc ? 1 : -1;
    };
    ;
    UserListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-user-list',
            template: __webpack_require__(/*! ./user-list.component.html */ "./src/app/admin/user-list/user-list.component.html"),
            styles: [__webpack_require__(/*! ./user-list.component.css */ "./src/app/admin/user-list/user-list.component.css")]
        }),
        __metadata("design:paramtypes", [_shared_user_list_service__WEBPACK_IMPORTED_MODULE_1__["UserListService"]])
    ], UserListComponent);
    return UserListComponent;
}());



/***/ })

}]);
//# sourceMappingURL=admin-admin-module.js.map