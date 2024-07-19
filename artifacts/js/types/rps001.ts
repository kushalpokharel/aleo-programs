import {
  z
} from "zod";
import {
  leoAddressSchema,
  leoPrivateKeySchema,
  leoViewKeySchema,
  leoTxIdSchema,
  leoScalarSchema,
  leoFieldSchema,
  leoBooleanSchema,
  leoU8Schema,
  leoU16Schema,
  leoU32Schema,
  leoU64Schema,
  leoU128Schema,
  leoGroupSchema,
  leoRecordSchema,
  leoTxSchema,
  leoSignatureSchema,
  LeoArray,
  LeoAddress,
  ExternalRecord,
  tx
} from "@doko-js/core";

export interface token {
  owner: LeoAddress;
  amount: bigint;
  _nonce: bigint;
}

export const leoTokenSchema = z.object({
  owner: leoAddressSchema,
  amount: leoU64Schema,
  _nonce: leoGroupSchema,
});
export type tokenLeo = z.infer < typeof leoTokenSchema > ;

export interface GameInfo {
  deadline: number;
  turn: boolean;
  is_complete: boolean;
}

export const leoGameInfoSchema = z.object({
  deadline: leoU32Schema,
  turn: leoBooleanSchema,
  is_complete: leoBooleanSchema,
});
export type GameInfoLeo = z.infer < typeof leoGameInfoSchema > ;

export interface Game {
  owner: LeoAddress;
  id: bigint;
  challenger_move: bigint;
  acceptor_move: number;
  player1: LeoAddress;
  player2: LeoAddress;
  is_winner: boolean;
  each_stake: bigint;
  _nonce: bigint;
}

export const leoGameSchema = z.object({
  owner: leoAddressSchema,
  id: leoU64Schema,
  challenger_move: leoGroupSchema,
  acceptor_move: leoU8Schema,
  player1: leoAddressSchema,
  player2: leoAddressSchema,
  is_winner: leoBooleanSchema,
  each_stake: leoU64Schema,
  _nonce: leoGroupSchema,
});
export type GameLeo = z.infer < typeof leoGameSchema > ;

export interface Reedem {
  owner: LeoAddress;
  id: bigint;
  turn: boolean;
  amount: bigint;
  is_complete: boolean;
  _nonce: bigint;
}

export const leoReedemSchema = z.object({
  owner: leoAddressSchema,
  id: leoU64Schema,
  turn: leoBooleanSchema,
  amount: leoU64Schema,
  is_complete: leoBooleanSchema,
  _nonce: leoGroupSchema,
});
export type ReedemLeo = z.infer < typeof leoReedemSchema > ;