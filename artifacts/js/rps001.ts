import {
  token,
  Game,
  Reedem,
  GameInfo
} from "./types/rps001";
import {
  gettokenLeo,
  getGameLeo,
  getReedemLeo,
  getGameInfoLeo
} from "./js2leo/rps001";
import {
  gettoken,
  getGame,
  getReedem,
  getGameInfo
} from "./leo2js/rps001";
import {
  ContractConfig,
  zkGetMapping,
  LeoAddress,
  LeoRecord,
  js2leo,
  leo2js,
  ExternalRecord,
  ExecutionMode,
  ExecutionContext,
  CreateExecutionContext,
  TransactionResponse
} from "@doko-js/core";
import {
  BaseContract
} from "../../contract/base-contract";
import * as receipt from "./transitions/rps001";

export class Rps001Contract extends BaseContract {

  constructor(config: Partial < ContractConfig > = {
    mode: ExecutionMode.LeoRun
  }) {
    super({
      ...config,
      appName: 'rps001',
      contractPath: 'artifacts/leo/rps001',
      networkMode: config.networkName === 'testnet' ? 1 : 0,
      fee: '0.01'
    });
  }
  async challenge(r0: bigint, r1: LeoAddress, r2: number, r3: bigint, r4: number, r5: token, r6: bigint): Promise < [LeoRecord, LeoRecord, TransactionResponse & receipt.Rps001ChallengeTransition] > {
    const r0Leo = js2leo.u64(r0);
    const r1Leo = js2leo.address(r1);
    const r2Leo = js2leo.u8(r2);
    const r3Leo = js2leo.u128(r3);
    const r4Leo = js2leo.u32(r4);
    const r5Leo = js2leo.json(gettokenLeo(r5));
    const r6Leo = js2leo.u64(r6);

    const params = [r0Leo, r1Leo, r2Leo, r3Leo, r4Leo, r5Leo, r6Leo]
    const result = await this.ctx.execute('challenge', params);
    const out0 = (this.config.mode === ExecutionMode.LeoRun) ? JSON.stringify(result.outputs[0]) : result.outputs[0];
    const out1 = (this.config.mode === ExecutionMode.LeoRun) ? JSON.stringify(result.outputs[1]) : result.outputs[1];
    return [out0, out1, result];
  }

  async accept(r0: Game, r1: number, r2: token, r3: bigint): Promise < [LeoRecord, LeoRecord, TransactionResponse & receipt.Rps001AcceptTransition] > {
    const r0Leo = js2leo.json(getGameLeo(r0));
    const r1Leo = js2leo.u8(r1);
    const r2Leo = js2leo.json(gettokenLeo(r2));
    const r3Leo = js2leo.u64(r3);

    const params = [r0Leo, r1Leo, r2Leo, r3Leo]
    const result = await this.ctx.execute('accept', params);
    const out0 = (this.config.mode === ExecutionMode.LeoRun) ? JSON.stringify(result.outputs[0]) : result.outputs[0];
    const out1 = (this.config.mode === ExecutionMode.LeoRun) ? JSON.stringify(result.outputs[1]) : result.outputs[1];
    return [out0, out1, result];
  }

  async claim_reward(r0: Reedem): Promise < [ExternalRecord < 'simple_token', 'token' > , TransactionResponse & receipt.Rps001Claim_rewardTransition] > {
    const r0Leo = js2leo.json(getReedemLeo(r0));

    const params = [r0Leo]
    const result = await this.ctx.execute('claim_reward', params);
    const out0 = new ExternalRecord('simple_token.aleo/token');
    return [out0, result];
  }

  async reveal(r0: Game, r1: number, r2: bigint): Promise < [LeoRecord, LeoRecord, TransactionResponse & receipt.Rps001RevealTransition] > {
    const r0Leo = js2leo.json(getGameLeo(r0));
    const r1Leo = js2leo.u8(r1);
    const r2Leo = js2leo.u128(r2);

    const params = [r0Leo, r1Leo, r2Leo]
    const result = await this.ctx.execute('reveal', params);
    const out0 = (this.config.mode === ExecutionMode.LeoRun) ? JSON.stringify(result.outputs[0]) : result.outputs[0];
    const out1 = (this.config.mode === ExecutionMode.LeoRun) ? JSON.stringify(result.outputs[1]) : result.outputs[1];
    return [out0, out1, result];
  }

  async game_turn(key: bigint, defaultValue ? : GameInfo): Promise < GameInfo > {
    const keyLeo = js2leo.u64(key);

    const params = [keyLeo]
    const result = await zkGetMapping(
      this.config,
      'game_turn',
      params[0],
    );

    if (result != null)
      return getGameInfo(result);
    else {
      if (defaultValue != undefined) return defaultValue;
      throw new Error(`game_turn returned invalid value[input: ${key}, output: ${result}`);
    }
  }

  async account(key: LeoAddress, defaultValue ? : bigint): Promise < bigint > {
    const keyLeo = js2leo.address(key);

    const params = [keyLeo]
    const result = await zkGetMapping(
      this.config,
      'account',
      params[0],
    );

    if (result != null)
      return leo2js.u64(result);
    else {
      if (defaultValue != undefined) return defaultValue;
      throw new Error(`account returned invalid value[input: ${key}, output: ${result}`);
    }
  }


}