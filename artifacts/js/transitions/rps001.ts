import {
  tx
} from "@doko-js/core";
import * as records from "../types/rps001";
import {
  Simple_tokenTransfer_private_to_publicTransition,
  Simple_tokenTransfer_public_to_privateTransition
} from "./simple_token";

export type Rps001ChallengeTransition = tx.ExecutionReceipt < [...Simple_tokenTransfer_private_to_publicTransition['execution']['transitions'],
    tx.Transition < [tx.RecordOutput < records.Game > , tx.RecordOutput < records.Reedem > , tx.FutureOutput], 'rps001', 'challenge' > ,
  ] >
  export type Rps001AcceptTransition = tx.ExecutionReceipt < [...Simple_tokenTransfer_private_to_publicTransition['execution']['transitions'],
    tx.Transition < [tx.RecordOutput < records.Game > , tx.RecordOutput < records.Reedem > , tx.FutureOutput], 'rps001', 'accept' > ,
  ] >
  export type Rps001Claim_rewardTransition = tx.ExecutionReceipt < [...Simple_tokenTransfer_public_to_privateTransition['execution']['transitions'],
    tx.Transition < [tx.ExternalRecordOutput, tx.FutureOutput], 'rps001', 'claim_reward' > ,
  ] >
  export type Rps001RevealTransition = tx.ExecutionReceipt < [tx.Transition < [tx.RecordOutput < records.Reedem > , tx.RecordOutput < records.Reedem > , tx.FutureOutput], 'rps001', 'reveal' > , ] >