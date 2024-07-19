import {
  tx
} from "@doko-js/core";
import * as records from "../types/simple_token";


export type Simple_tokenMint_publicTransition = tx.ExecutionReceipt < [tx.Transition < [tx.FutureOutput], 'simple_token', 'mint_public' > , ] >
  export type Simple_tokenMint_privateTransition = tx.ExecutionReceipt < [tx.Transition < [tx.RecordOutput < records.token > ], 'simple_token', 'mint_private' > , ] >
  export type Simple_tokenTransfer_publicTransition = tx.ExecutionReceipt < [tx.Transition < [tx.FutureOutput], 'simple_token', 'transfer_public' > , ] >
  export type Simple_tokenTransfer_privateTransition = tx.ExecutionReceipt < [tx.Transition < [tx.RecordOutput < records.token > , tx.RecordOutput < records.token > ], 'simple_token', 'transfer_private' > , ] >
  export type Simple_tokenTransfer_private_to_publicTransition = tx.ExecutionReceipt < [tx.Transition < [tx.RecordOutput < records.token > , tx.FutureOutput], 'simple_token', 'transfer_private_to_public' > , ] >
  export type Simple_tokenTransfer_public_to_privateTransition = tx.ExecutionReceipt < [tx.Transition < [tx.RecordOutput < records.token > , tx.FutureOutput], 'simple_token', 'transfer_public_to_private' > , ] >