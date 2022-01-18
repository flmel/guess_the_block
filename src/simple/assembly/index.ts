import { Context } from "near-sdk-as"

// get the current execution block id 
export function get_block(): string {
  return `The current execution block is ${Context.blockIndex} use that information wisely.`
}

// guess the tx execution block id 
export function guess_block(guessed_block_index: u64): string {
  // for clarification
  const actual_block_index = Context.blockIndex

  if (guessed_block_index == actual_block_index) {
    // TODO: Reward the Context.sender()
    return `Hoaa you've guessed correctly ${Context.blockIndex} you shall be rewarded!`
  } else {
    return 'Sorry, you ' + missed_by(guessed_block_index, actual_block_index) + ' Better luck next time!'
  }
}

// calculates "the missed by blocks" and reterns a string
function missed_by(guessed_block: u64, actual_block: u64): string {
  // float difference since in AS type Number is float
  // TODO: Parse/Typecast it 
  const block_difference = Math.abs(f64(guessed_block - actual_block))

  if (guessed_block > actual_block) {
    return `overshot by ${block_difference} blocks!`
  } else {
    return `undershot by ${block_difference} blocks!`
  }
}