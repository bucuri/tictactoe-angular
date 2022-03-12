import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GameState, PLAYER, SquareState, TictactoeService } from 'src/app/services/tictactoe.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  public GameState = GameState;
  public SquareState = SquareState;

  public board$: Observable<SquareState[][]>;
  public player$: Observable<PLAYER>;
  public gameState$: Observable<GameState>;

  constructor(private gameService: TictactoeService) {
    this.board$ = gameService.board$.asObservable();
    this.player$ = this.gameService.player$.asObservable();
    this.gameState$ = gameService.gameState$.asObservable();
  }

  public ngOnInit(): void {
    this.gameService.resetGame();
  }

  public startGame(): void {
    this.gameService.startGame();
  }

  public resetGame(): void {
    this.gameService.resetGame();
  }

  public play(row: number, col: number): void {
    this.gameService.play(row, col);
  }
}
