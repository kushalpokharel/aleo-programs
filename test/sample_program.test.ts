import { ExecutionMode, parseJSONLikeString } from "@doko-js/core";
import { Rps001Contract } from "../artifacts/js/rps001";
import { Simple_tokenContract } from "../artifacts/js/simple_token";
import { token, tokenLeo } from '../artifacts/js/types/simple_token';
import { gettoken } from '../artifacts/js/leo2js/simple_token';
import { PrivateKey } from "@aleohq/sdk";

const rps = new Rps001Contract({mode: ExecutionMode.SnarkExecute});
const token = new Simple_tokenContract({mode: ExecutionMode.SnarkExecute});
const mode = ExecutionMode.SnarkExecute;

const TIMEOUT = 200_000;

function parseRecordtoToken(
  recordString: string,
  mode: ExecutionMode,
  privateKey?: string
): token {
  // Records are encrypted in execute mode so we need to decrypt them
  if (mode === ExecutionMode.SnarkExecute || mode === ExecutionMode.LeoExecute) {
    if (!privateKey)
      throw new Error('Private key is required for execute mode');
    const record = gettoken(
      parseJSONLikeString(
        PrivateKey.from_string(privateKey).to_view_key().decrypt(recordString)
      ) as tokenLeo
    );
    return record;
  }
  const record = gettoken(
    parseJSONLikeString(recordString) as tokenLeo
  );
  return record;
}

beforeAll(async () => {
  // We need to deploy contract before running tests in execute mode
  if (token.config.mode === ExecutionMode.SnarkExecute) {
    // This checks for program code on chain to validate that the program is deployed
    const deployed = await token.isDeployed();

    // If the contract is already deployed we skip deployment
    if (deployed) return;

    const tx = await token.deploy();
    await token.wait(tx);
  }
  if (rps.config.mode === ExecutionMode.SnarkExecute) {
    // This checks for program code on chain to validate that the program is deployed
    const deployed = await rps.isDeployed();

    // If the contract is already deployed we skip deployment
    if (deployed) return;

    const tx = await rps.deploy();
    await token.wait(tx);
  }
}, TIMEOUT);

const [admin, user] = token.getAccounts();
const adminPrivateKey = rps.getPrivateKey(admin);
const userPrivateKey = rps.getPrivateKey(user);


describe("Initialize", ()=>{
  test(
    'mint private',
    async () => {
      const amount = BigInt(100000);
      const [result, tx] = await token.mint_private(admin, amount);

      // tx is undefined in evaluate mode
      // This method waits for the transction to be broadcasted in execute mode
      if (tx) await tx.wait();
      console.log(result);
      const tok: token = parseRecordtoToken(
        result,
        mode,
        adminPrivateKey
      );
      console.log(tok);
      expect(tok.owner).toBe(admin);
      expect(tok.amount.toString()).toBe(amount.toString());

      const [result1, tx1] = await token.mint_private(user, amount);

      // tx is undefined in evaluate mode
      // This method waits for the transction to be broadcasted in execute mode
      if (tx1) await tx1.wait();
      console.log(result);
      const tok1: token = parseRecordtoToken(
        result,
        mode,
        adminPrivateKey
      );
      console.log(tok);
      expect(tok1.owner).toBe(user);
      expect(tok1.amount.toString()).toBe(amount.toString());
    },
    TIMEOUT
  );
});

describe("Play game", ()=>{
  test(
    'admin makes the first move',
    async () => {
  //     const amount = BigInt(100000);
  //     const [result, tx] = await rps.challenge(1, user, );

  //     // tx is undefined in evaluate mode
  //     // This method waits for the transction to be broadcasted in execute mode
  //     if (tx) await tx.wait();
  //     console.log(result);
  //     const tok: token = parseRecordtoToken(
  //       result,
  //       mode,
  //       adminPrivateKey
  //     );
  //     console.log(tok);
  //     expect(tok.owner).toBe(admin);
  //     expect(tok.amount.toString()).toBe(amount.toString());

  //     const [result1, tx1] = await token.mint_private(user, amount);

  //     // tx is undefined in evaluate mode
  //     // This method waits for the transction to be broadcasted in execute mode
  //     if (tx1) await tx1.wait();
  //     console.log(result);
  //     const tok1: token = parseRecordtoToken(
  //       result,
  //       mode,
  //       adminPrivateKey
  //     );
  //     console.log(tok);
  //     expect(tok1.owner).toBe(user);
  //     expect(tok1.amount.toString()).toBe(amount.toString());
    },
    TIMEOUT
  );
});