import { Context, logging, ContractPromiseBatch, u128, } from "near-sdk-as"
import { ONE_NEAR, XCC_GAS } from "../../utils";


@nearBindgen
export class Contract {
  // returns the execution block height
  get_block(): string {
    return `the current block index is ${Context.blockIndex} use that information wisely`
  }

  // guess the tx execution block id 
  guess_block(guessed_block_index: u64): string {
    // for clarification
    // const actual_block_index = Context.blockIndex
    const actual_block_index = 11; // shortcircuit

    if (guessed_block_index == actual_block_index) {
      this.reward_sender()
      return `Whoaa! you've guessed correctly ${Context.blockIndex} you shall be rewarded!`
    } else {
      return `Sorry, you ${this.missed_by(guessed_block_index, actual_block_index)} Better luck next time!`
    }
  }

  // calculates "the missed by blocks" :: STRING
  private missed_by(guessed_block: u64, actual_block: u64): string {
    const block_difference = abs(guessed_block - actual_block)

    if (guessed_block > actual_block) {
      return `overshot by ${block_difference} blocks!`
    } else {
      return `undershot by ${block_difference} blocks!`
    }
  }

  private reward_sender(): void {
    const self = Context.contractName

    ContractPromiseBatch.create(Context.sender)
      .transfer(ONE_NEAR)
      .then(self).function_call("on_reward_complete", "{}", u128.Zero, XCC_GAS);
  }
  private on_reward_complete(): void {
    logging.log("reward successful");
  }
}