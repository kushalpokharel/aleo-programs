import {
  token
} from "./types/simple_token";
import {
  gettokenLeo
} from "./js2leo/simple_token";
import {
  gettoken
} from "./leo2js/simple_token";
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
import * as receipt from "./transitions/simple_token";

export class Simple_tokenContract extends BaseContract {

  constructor(config: Partial < ContractConfig > = {
    mode: ExecutionMode.LeoRun
  }) {
    super({
      ...config,
      appName: 'simple_token',
      contractPath: 'artifacts/leo/simple_token',
      networkMode: config.networkName === 'testnet' ? 1 : 0,
      fee: '0.01'
    });
  }
  async mint_public(r0: LeoAddress, r1: bigint): Promise < [TransactionResponse & receipt.Simple_tokenMint_publicTransition] > {
    const r0Leo = js2leo.address(r0);
    const r1Leo = js2leo.u64(r1);

    const params = [r0Leo, r1Leo]
    const result = await this.ctx.execute('mint_public', params);
    return [result];
  }

  async mint_private(r0: LeoAddress, r1: bigint): Promise < [LeoRecord, TransactionResponse & receipt.Simple_tokenMint_privateTransition] > {
    const r0Leo = js2leo.address(r0);
    const r1Leo = js2leo.u64(r1);

    const params = [r0Leo, r1Leo]
    const result = await this.ctx.execute('mint_private', params);
    const out0 = (this.config.mode === ExecutionMode.LeoRun) ? JSON.stringify(result.outputs[0]) : result.outputs[0];
    return [out0, result];
  }

  async transfer_public(r0: LeoAddress, r1: bigint): Promise < [TransactionResponse & receipt.Simple_tokenTransfer_publicTransition] > {
    const r0Leo = js2leo.address(r0);
    const r1Leo = js2leo.u64(r1);

    const params = [r0Leo, r1Leo]
    const result = await this.ctx.execute('transfer_public', params);
    return [result];
  }

  async transfer_private(r0: token, r1: LeoAddress, r2: bigint): Promise < [LeoRecord, LeoRecord, TransactionResponse & receipt.Simple_tokenTransfer_privateTransition] > {
    const r0Leo = js2leo.json(gettokenLeo(r0));
    const r1Leo = js2leo.address(r1);
    const r2Leo = js2leo.u64(r2);

    const params = [r0Leo, r1Leo, r2Leo]
    const result = await this.ctx.execute('transfer_private', params);
    const out0 = (this.config.mode === ExecutionMode.LeoRun) ? JSON.stringify(result.outputs[0]) : result.outputs[0];
    const out1 = (this.config.mode === ExecutionMode.LeoRun) ? JSON.stringify(result.outputs[1]) : result.outputs[1];
    return [out0, out1, result];
  }

  async transfer_private_to_public(r0: token, r1: LeoAddress, r2: bigint): Promise < [LeoRecord, TransactionResponse & receipt.Simple_tokenTransfer_private_to_publicTransition] > {
    const r0Leo = js2leo.json(gettokenLeo(r0));
    const r1Leo = js2leo.address(r1);
    const r2Leo = js2leo.u64(r2);

    const params = [r0Leo, r1Leo, r2Leo]
    const result = await this.ctx.execute('transfer_private_to_public', params);
    const out0 = (this.config.mode === ExecutionMode.LeoRun) ? JSON.stringify(result.outputs[0]) : result.outputs[0];
    return [out0, result];
  }

  async transfer_public_to_private(r0: LeoAddress, r1: bigint): Promise < [LeoRecord, TransactionResponse & receipt.Simple_tokenTransfer_public_to_privateTransition] > {
    const r0Leo = js2leo.address(r0);
    const r1Leo = js2leo.u64(r1);

    const params = [r0Leo, r1Leo]
    const result = await this.ctx.execute('transfer_public_to_private', params);
    const out0 = (this.config.mode === ExecutionMode.LeoRun) ? JSON.stringify(result.outputs[0]) : result.outputs[0];
    return [out0, result];
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