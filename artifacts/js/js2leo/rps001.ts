import {
  token,
  tokenLeo,
  GameInfo,
  GameInfoLeo,
  Game,
  GameLeo,
  Reedem,
  ReedemLeo
} from "../types/rps001";
import {
  js2leo
} from "@doko-js/core";


export function gettokenLeo(token: token): tokenLeo {
  const result: tokenLeo = {
    owner: js2leo.privateField(js2leo.address(token.owner)),
    amount: js2leo.privateField(js2leo.u64(token.amount)),
    _nonce: js2leo.publicField(js2leo.group(token._nonce)),
  }
  return result;
}

export function getGameInfoLeo(gameInfo: GameInfo): GameInfoLeo {
  const result: GameInfoLeo = {
    deadline: js2leo.u32(gameInfo.deadline),
    turn: js2leo.boolean(gameInfo.turn),
    is_complete: js2leo.boolean(gameInfo.is_complete),
  }
  return result;
}

export function getGameLeo(game: Game): GameLeo {
  const result: GameLeo = {
    owner: js2leo.privateField(js2leo.address(game.owner)),
    id: js2leo.privateField(js2leo.u64(game.id)),
    challenger_move: js2leo.privateField(js2leo.group(game.challenger_move)),
    acceptor_move: js2leo.privateField(js2leo.u8(game.acceptor_move)),
    player1: js2leo.privateField(js2leo.address(game.player1)),
    player2: js2leo.privateField(js2leo.address(game.player2)),
    is_winner: js2leo.privateField(js2leo.boolean(game.is_winner)),
    each_stake: js2leo.privateField(js2leo.u64(game.each_stake)),
    _nonce: js2leo.publicField(js2leo.group(game._nonce)),
  }
  return result;
}

export function getReedemLeo(reedem: Reedem): ReedemLeo {
  const result: ReedemLeo = {
    owner: js2leo.privateField(js2leo.address(reedem.owner)),
    id: js2leo.privateField(js2leo.u64(reedem.id)),
    turn: js2leo.privateField(js2leo.boolean(reedem.turn)),
    amount: js2leo.privateField(js2leo.u64(reedem.amount)),
    is_complete: js2leo.privateField(js2leo.boolean(reedem.is_complete)),
    _nonce: js2leo.publicField(js2leo.group(reedem._nonce)),
  }
  return result;
}