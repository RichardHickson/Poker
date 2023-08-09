import Player from "./Player";

interface Game {
  gameID: number;
  gameTitle: string;
  gameInfo: string;
  players?: Player[];
}

export default Game;
