/** TODO: Оставляем */

import { HistoryMove } from '../../types/typesBoard/typesBoardHistory';
import { boardUtils } from '.';

/* this function is used to uniquely identify ambiguous moves */
const getDisambiguator = (move: HistoryMove, moves: HistoryMove[]) => {
  const from = move.from;
  const to = move.to;
  const piece = move.piece;

  let ambiguities = 0;
  let same_rank = 0;
  let same_file = 0;

  for (let i = 0, len = moves.length; i < len; i++) {
    const ambig_from = moves[i].from;
    const ambig_to = moves[i].to;
    const ambig_piece = moves[i].piece;

    /* if a move of the same piece type ends on the same to square, we'll
     * need to add a disambiguator to the algebraic notation
     */
    if (piece === ambig_piece && from !== ambig_from && to === ambig_to) {
      ambiguities++;

      if (boardUtils.rank(from) === boardUtils.rank(ambig_from)) {
        same_rank++;
      }

      if (boardUtils.file(from) === boardUtils.file(ambig_from)) {
        same_file++;
      }
    }
  }

  if (ambiguities > 0) {
    /* if there exists a similar moving piece on the same rank and file as
     * the move in question, use the square as the disambiguator
     */
    if (same_rank > 0 && same_file > 0) {
      return boardUtils.algebraic(from);
    } else if (same_file > 0) {
      /* if the moving piece rests on the same file, use the rank symbol as the
       * disambiguator
       */
      return boardUtils.algebraic(from).charAt(1);
    } else {
      /* else use the file symbol */
      return boardUtils.algebraic(from).charAt(0);
    }
  }

  return '';
};

export const utilGetDisambiguator = { getDisambiguator };
