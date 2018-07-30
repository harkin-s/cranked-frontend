import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../shared/payment.service';
import { UserService } from '../shared/user.service';
import { AuctionServices } from '../shared/auctions.services';
import { PaymentPopupComponent } from '../shared/components/payment-popup/payment-popup.component';
import * as io from 'socket.io-client';

@Component({
    selector: 'app-tokens',
    templateUrl: './tokens.component.html',
    styleUrls: ['./tokens.component.css']
})
export class TokensComponent implements OnInit, AfterViewInit {
    @ViewChild(PaymentPopupComponent) paymentsPopup: PaymentPopupComponent;
    paymentSuccessful: string;
    user;
    private socket;
    skin: any = {};
    inventory: any = [];
    pageInventory: any = [];
    skinChoosen: boolean = false;
    numberOfPages: any = [];
    selectDate: Date;
    lastSelected: number = null;
    selectedSkins: any = [];
    selectedSkinsValue: number = 0;
    totalTokens: number = 0;
    currentPage: number = 0;
    depositState: string = 'waiting';
    private sub: any;


    constructor(private paymentService: PaymentService, private userService: UserService,
        private auctionService: AuctionServices, private route: ActivatedRoute) {
        this.socket = io();
    }

    ngAfterViewInit() {
    }

    openPaymentsPopup(paymentType, paymentValue ) {
        this.paymentsPopup.initialize(paymentType, paymentValue);
    }

    ngOnInit() {
        this.userService.getUser().subscribe(res => {
            this.user = res.user;
        });
        this.getInventory();
        this.socket.on('depositSuccess', (success) => {
            if (success) {
                this.depositState = 'success';
            } else {
                this.depositState = 'failed';
            }
        });
        this.socket.on('offerAccepted', (success) => {
            alert('offer accepted yo!');
        });
        this.sub = this.route.params.subscribe(params => {
            if (params['paymentSuccess']) {
                document.getElementById('paymentSuccessButton').click();
            } else {
                // create payment failed popup
            }
        });
    }

    depositSkin() {
        this.depositState = 'waiting';
        // First we need to get the asset ids of the selected skins
        var assetIds = []
        for (var skin of this.selectedSkins) {
            var asset = this.inventory.assets.find((asset) => {
                return asset.classid === skin.classid;
            });
            assetIds.push(asset.assetid);
        }

        // Send the asset ids and user id to the bot to initiate the trade
        const tradeData = {
            assetIds: assetIds,
            userId: this.user.userid
        }
        this.socket.emit('depositSkin', tradeData);

    }



    // Inventory stuff
    getInventory() {
        this.auctionService.getUserInventory().subscribe(inv => {
            this.inventory = inv;
            for (var i = this.inventory.descriptions.length - 1; i >= 0; i--) {
                const iconUrl = 'http://community.edgecast.steamstatic.com/economy/image/' + this.inventory.descriptions[i].icon_url_large;
                this.inventory.descriptions[i].icon_url_large = iconUrl;
                this.inventory.descriptions[i].selectedSkin = false;
            }
            this.currentPage = 0;
            this.changePage(1, 0, 12);
            this.skinChoosen = true;   //hidden boolean
        });
    }

    selectSkin(event, inv) {
        var selected = !inv.selectedSkin;
        //If event is a shift click, highlight all intervening items.
        if (this.lastSelected && event.shiftKey) {
            var start = Math.min(this.inventory.descriptions.indexOf(inv), this.lastSelected);
            var end = Math.max(this.inventory.descriptions.indexOf(inv), this.lastSelected);
            //change intervening items to true or false. Opposite of item being selected
            //loop through range and change select/unselect items
            for (var i = start; i <= end; i++) {
                this.updateSelectedSkins(this.inventory.descriptions[i], selected, this.inventory.descriptions[i].selectedSkin);
                this.inventory.descriptions[i].selectedSkin = selected;
            }
        } else {
            // When normal click, just invert selection
            this.updateSelectedSkins(inv, selected, inv.selectedSkin);
            inv.selectedSkin = selected;
        }
        // keep track of last selection for shift click functionality
        this.lastSelected = this.inventory.descriptions.indexOf(inv);
    }

    updateSelectedSkins(skin, selected, previouslySelected) {
        // If skin is being selected, and wasn't selected previously
        if (selected && selected != previouslySelected) {
            // add it to the list of selected skins.
            this.selectedSkins.push(skin);
            this.selectedSkinsValue += skin.price;
            // if item is being deselected, and wasn't deselected previously
        } else if (!selected && selected != previouslySelected) {
            //remove skin from selected skins.
            this.selectedSkins.splice(this.selectedSkins.indexOf(skin), 1);
            this.selectedSkinsValue -= skin.price;
        }    //otherwise do nothing
        this.totalTokens = Math.floor((this.selectedSkinsValue / 10) * 230 * 0.65);
        // Round skins value to 2 decimal places
        this.selectedSkinsValue = Math.round(this.selectedSkinsValue * 100) / 100;
    }

    changePage(action, source, pageSize) {
        var sourceData = this.inventory.descriptions;
        var firstItme = 0;
        var lastItem = 0;

        this.numberOfPages = Math.ceil(sourceData.length / pageSize);

        if (action == 1 && this.currentPage < this.numberOfPages) {
            firstItme = (this.currentPage) * pageSize;
            ++this.currentPage;
            lastItem = (this.currentPage) * pageSize;
        }
        else if (action == -1 && this.currentPage > 1) {
            --this.currentPage;
            firstItme = (this.currentPage - 1) * pageSize;
            lastItem = (this.currentPage) * pageSize;
        }
        else {
            return;
        }
        this.pageInventory = [];
        for (var i = firstItme; i < lastItem; i++) {
            if (sourceData[i] != null) {
                this.pageInventory.push(sourceData[i]);
            }
        }
    }


}
