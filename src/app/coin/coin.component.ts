import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.css']
})


export class CoinComponent implements OnInit {
  result;
  private socket;
  games: any = [];

  constructor() { 
    this.result = '';
    this.socket = io();
  }


  ngOnInit() {
    this.socket.on('connect', () =>{
      this.socket.emit('join');
    });

    this.socket.on('result', (result) =>{
      this.result = result;
    });


    this.socket.on('newGameCreated', (id) =>{
      this.games.push(id);
    });

    this.socket.on('listOfGames', (gameList) =>{
      this.games = gameList
    });
  }

  // When user clicks "create game" button, notify server.
  create_game(){
    this.socket.emit('createGame' );
  }

  play(){
    this.socket.emit('play');
  } 
}
