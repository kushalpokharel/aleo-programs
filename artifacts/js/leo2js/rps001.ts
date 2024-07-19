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
  leo2js,
  tx,
  parseJSONLikeString
} from "@doko-js/core";
import {
  PrivateKey
} from "@aleohq/sdk"


export function gettoken(token: tokenLeo): token {
  const result: token = {
    owner: leo2js.address(token.owner),
    amount: leo2js.u64(token.amount),
    _nonce: leo2js.group(token._nonce),
  }
  return result;
}


export function decrypttoken(token: tx.RecordOutput < token > | string, privateKey: string): token {
  const encodedRecord: string = typeof token === 'string' ? token : token.value;
  const decodedRecord: string = PrivateKey.from_string(privateKey).to_view_key().decrypt(encodedRecord);
  const result: token = gettoken(parseJSONLikeString(decodedRecord));

  return result;
}

export function getGameInfo(gameInfo: GameInfoLeo): GameInfo {
  const result: GameInfo = {
    deadline: leo2js.u32(gameInfo.deadline),
    turn: leo2js.boolean(gameInfo.turn),
    is_complete: leo2js.boolean(gameInfo.is_complete),
  }
  return result;
}

export function getGame(game: GameLeo): Game {
  const result: Game = {
    owner: leo2js.address(game.owner),
    id: leo2js.u64(game.id),
    challenger_move: leo2js.group(game.challenger_move),
    acceptor_move: leo2js.u8(game.acceptor_move),
    player1: leo2js.address(game.player1),
    player2: leo2js.address(game.player2),
    is_winner: leo2js.boolean(game.is_winner),
    each_stake: leo2js.u64(game.each_stake),
    _nonce: leo2js.group(game._nonce),
  }
  return result;
}


export function decryptGame(game: tx.RecordOutput < Game > | string, privateKey: string): Game {
  const encodedRecord: string = typeof game === 'string' ? game : game.value;
  const decodedRecord: string = PrivateKey.from_string(privateKey).to_view_key().decrypt(encodedRecord);
  const result: Game = getGame(parseJSONLikeString(decodedRecord));

  return result;
}

export function getReedem(reedem: ReedemLeo): Reedem {
  const result: Reedem = {
    owner: leo2js.address(reedem.owner),
    id: leo2js.u64(reedem.id),
    turn: leo2js.boolean(reedem.turn),
    amount: leo2js.u64(reedem.amount),
    is_complete: leo2js.boolean(reedem.is_complete),
    _nonce: leo2js.group(reedem._nonce),
  }
  return result;
}


export function decryptReedem(reedem: tx.RecordOutput < Reedem > | string, privateKey: string): Reedem {
  const encodedRecord: string = typeof reedem === 'string' ? reedem : reedem.value;
  const decodedRecord: string = PrivateKey.from_string(privateKey).to_view_key().decrypt(encodedRecord);
  const result: Reedem = getReedem(parseJSONLikeString(decodedRecord));

  return result;
}