import { Context } from "near-sdk-as"

// TEST GROUND

export function get_block(): string {
  return `The current execution block is ${Context.blockIndex} use that information wisely.`
}