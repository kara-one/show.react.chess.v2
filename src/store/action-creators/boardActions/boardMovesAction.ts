import { Dispatch } from "react";
import { BoardActions } from "../../../types/typesBoard/typesBoardActions";
import { SQUARES } from "../../../types/typesBoard/typesBoardState";

/**
 * The internal representation of a chess move is in 0x88 format, and
 * not meant to be human-readable.  The code below converts the 0x88
 * square coordinates to algebraic coordinates.  It also prunes an
 * unnecessary move keys resulting from a verbose call.
 * @returns void
 */
const boardMovesAction = (square?: `${SQUARES}`, verbose?: boolean): Function => {
  return (dispatch: Dispatch<BoardActions>, getState: Function): void => {
    /**
     var ugly_moves = generate_moves(options)
      var moves = []

      for (var i = 0, len = ugly_moves.length; i < len; i++) {
        // does the user want a full move object (most likely not), or just SAN
        if (
          typeof options !== 'undefined' &&
          'verbose' in options &&
          options.verbose
        ) {
          moves.push(make_pretty(ugly_moves[i]))
        } else {
          moves.push(move_to_san(ugly_moves[i], false))
        }
      }

      return moves
     */
  };
};

export default boardMovesAction;