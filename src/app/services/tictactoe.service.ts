import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


export enum GameState {
  NotStarted = "NotStarted",
  Started = "Started",
  Victory = "Victory",
  Draw = "Draw",
}

export enum SquareState {
  Free = 0,
  Player1 = 1,
  Player2 = 2,
}

const DefaultBoardState: SquareState[][] = [
  [SquareState.Free, SquareState.Free, SquareState.Free],
  [SquareState.Free, SquareState.Free, SquareState.Free],
  [SquareState.Free, SquareState.Free, SquareState.Free],
];

export type PLAYER = 1 | 2;

@Injectable({
  providedIn: 'root'
})
export class TictactoeService {

  public board$ = new BehaviorSubject<SquareState[][]>(DefaultBoardState);
  public gameState$ = new BehaviorSubject<GameState>(GameState.NotStarted);
  public player$ = new BehaviorSubject<PLAYER>(1);

  public constructor() { }

  public play(row: number, col: number) {
    const value = (this.player$.getValue() === 1)
      ? SquareState.Player1
      : SquareState.Player2;

    const boardClone: SquareState[][] = this.board$
      .getValue()
      .map((row: SquareState[]) =>
        row.map((val: SquareState) => val)
      );

    boardClone[row][col] = value;

    if (this.isWin(row, col, boardClone)) {
      this.gameState$.next(GameState.Victory);
    } else if (this.isDraw(boardClone)) {
      this.gameState$.next(GameState.Draw);
    } else {
      this.switchPlayer();
    }

    this.board$.next(boardClone);
  }

  public resetGame() {
    this.player$.next(1);
    this.board$.next(DefaultBoardState);
    this.gameState$.next(GameState.NotStarted);
  }

  public startGame() {
    this.gameState$.next(GameState.Started);
  }


  private isWin(row: number, col: number, board: SquareState[][]) {
    const winnerLine: boolean =
      board[row][0] === board[row][1] &&
      board[row][0] === board[row][2] &&
      board[row][0] !== SquareState.Free;

    const winnerCol: boolean =
      board[0][col] === board[1][col] &&
      board[0][col] === board[2][col] &&
      board[0][col] !== SquareState.Free;

    const winnerDiag1: boolean =
      board[0][0] === board[1][1] &&
      board[0][0] === board[2][2] &&
      board[0][0] !== SquareState.Free;

    const winnerDiag2: boolean =
      board[1][1] === board[0][2] &&
      board[1][1] === board[2][0] &&
      board[1][1] !== SquareState.Free;

    return winnerLine || winnerCol || winnerDiag1 || winnerDiag2;
  }

  private isDraw(board: SquareState[][]) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === SquareState.Free) {
          return false;
        }
      }
    }
    return true;
  }

  private switchPlayer() {
    this.player$.next(this.player$.getValue() === 1 ? 2 : 1)
  }
}
