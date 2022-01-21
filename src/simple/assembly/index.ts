import { Context, logging, RNG, ContractPromiseBatch, u128, context } from "near-sdk-as"
import { Contract } from "../../singleton/assembly";
import { ONE_NEAR, XCC_GAS, assert_self, assert_single_promise_success } from "../../utils";

// get the current execution block id 
export function get_block(): string {
  return `The current execution block is ${Context.blockIndex} use that information wisely.`
}

// guess the tx execution block id 
export function guess_block(guessed_block_index: u64): string {
  logging.log(`sender ${Context.sender}`)
  logging.log(`balance of sender  ${Context.accountBalance}`)
  logging.log(`contract name ${Context.contractName}`)

  // for clarification
  // const actual_block_index = Context.blockIndex
  const actual_block_index = 11

  if (guessed_block_index == actual_block_index) {
    // reward_sender()

    return `Hoaa you've guessed correctly ${Context.blockIndex} you shall be rewarded!`
  } else {
    return `Sorry, you ${missed_by(guessed_block_index, actual_block_index)} Better luck next time!`
  }
}

// calculates "the missed by blocks" and returns a string
function missed_by(guessed_block: u64, actual_block: u64): string {
  const block_difference = abs(guessed_block as i64 - actual_block as i64)

  if (guessed_block > actual_block) {
    return `overshot by ${block_difference} blocks!`
  } else {
    return `undershot by ${block_difference} blocks!`
  }
}

function reward_sender(): void {
  ContractPromiseBatch
    .create("ethuil.testnet")
    .transfer(ONE_NEAR)
}

// function on_transfer_complete(): void {
//   assert_self()
//   assert_single_promise_success()

//   logging.log("transfer complete")
// }