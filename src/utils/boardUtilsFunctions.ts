/** TODO: Перенос в initialState */
/*
export const reset = (): void => {
  load(DEFAULT_POSITION);
}
*/

import { ValidateFen } from "../types/typesBoard/typesBoardFen";

/** TODO: Перенос в initialState */
/*
export const clear = (keep_headers = false): void => {
  const state: IBoardState = {
    board = new Array(128),
    kings = { w: EMPTY, b: EMPTY },
    turn = COLORS.WHITE,
    castling = { w: 0, b: 0 },
    ep_square = EMPTY,
    half_moves = 0,
    move_number = 1,
    history = [],
    comments = {},
    fen: '',
  }
  state.fen = generate_fen(state);

  if (!keep_headers) state.header = {};

  update_setup(state.fen);
}
*/

/** TODO: Move in Actions */
/*
export const prune_comments = (state: IBoardState) => {
  const reversed_history = [];
  const current_comments: Comments = {};

  const copy_comment = function (fen: string) {
    if (fen in state.comments) {
      current_comments[fen] = state.comments[fen];
    }
  };

  while (state.history.length > 0) {
    reversed_history.push(undo_move());
  }

  copy_comment(generate_fen(state));

  while (reversed_history.length > 0) {
    make_move(reversed_history.pop());
    copy_comment(generate_fen(state));
  }

  state.comments = current_comments;
}
*/

/** TODO: Старая функция, зменена на parseValidateFen */
export const validate_fen = (fen: string): ValidateFen => {
  const errors = {
    0: 'No errors.',
    1: 'FEN string must contain six space-delimited fields.',
    2: '6th field (move number) must be a positive integer.',
    3: '5th field (half move counter) must be a non-negative integer.',
    4: '4th field (en-passant square) is invalid.',
    5: '3rd field (castling availability) is invalid.',
    6: '2nd field (side to move) is invalid.',
    7: "1st field (piece positions) does not contain 8 '/'-delimited rows.",
    8: '1st field (piece positions) is invalid [consecutive numbers].',
    9: '1st field (piece positions) is invalid [invalid piece].',
    10: '1st field (piece positions) is invalid [row too large].',
    11: 'Illegal en-passant square',
  };

  /* 1st criterion: 6 space-seperated fields? */
  const tokens = fen.split(/\s+/);
  if (tokens.length !== 6) {
    return { valid: false, error_number: 1, error: errors[1] };
  }

  /* 2nd criterion: move number field is a integer value > 0? */
  if (isNaN(+tokens[5]) || parseInt(tokens[5], 10) <= 0) {
    return { valid: false, error_number: 2, error: errors[2] };
  }

  /* 3rd criterion: half move counter is an integer >= 0? */
  if (isNaN(+tokens[4]) || parseInt(tokens[4], 10) < 0) {
    return { valid: false, error_number: 3, error: errors[3] };
  }

  /* 4th criterion: 4th field is a valid e.p.-string? */
  if (!/^(-|[abcdefgh][36])$/.test(tokens[3])) {
    return { valid: false, error_number: 4, error: errors[4] };
  }

  /* 5th criterion: 3th field is a valid castle-string? */
  if (!/^(KQ?k?q?|Qk?q?|kq?|q|-)$/.test(tokens[2])) {
    return { valid: false, error_number: 5, error: errors[5] };
  }

  /* 6th criterion: 2nd field is "w" (white) or "b" (black)? */
  if (!/^(w|b)$/.test(tokens[1])) {
    return { valid: false, error_number: 6, error: errors[6] };
  }

  /* 7th criterion: 1st field contains 8 rows? */
  const rows = tokens[0].split('/');
  if (rows.length !== 8) {
    return { valid: false, error_number: 7, error: errors[7] };
  }

  /* 8th criterion: every row is valid? */
  for (let i = 0; i < rows.length; i++) {
    /* check for right sum of fields AND not two numbers in succession */
    let sum_fields = 0;
    let previous_was_number = false;

    for (let k = 0; k < rows[i].length; k++) {
      if (!isNaN(+rows[i][k])) {
        if (previous_was_number) {
          return { valid: false, error_number: 8, error: errors[8] };
        }
        sum_fields += parseInt(rows[i][k], 10);
        previous_was_number = true;
      } else {
        if (!/^[prnbqkPRNBQK]$/.test(rows[i][k])) {
          return { valid: false, error_number: 9, error: errors[9] };
        }
        sum_fields += 1;
        previous_was_number = false;
      }
    }
    if (sum_fields !== 8) {
      return { valid: false, error_number: 10, error: errors[10] };
    }
  }

  if (
    (tokens[3][1] === '3' && tokens[1] === 'w') ||
    (tokens[3][1] === '6' && tokens[1] === 'b')
  ) {
    return { valid: false, error_number: 11, error: errors[11] };
  }

  /* everything's okay! */
  return { valid: true, error_number: 0, error: errors[0] };
};

/** TODO: Move to Actions */
/*
export const set_header = (args: [], header: object): object => {
  for (let i = 0; i < args.length; i += 2) {
    if (typeof args[i] === 'string' && typeof args[i + 1] === 'string') {
      header[args[i]] = args[i + 1];
    }
  }
  return header;
}
*/

/** TODO: Move in Actions */
/* called when the initial board setup is changed with put() or remove().
 * modifies the SetUp and FEN properties of the header object.  if the FEN is
 * equal to the default position, the SetUp and FEN are deleted
 * the setup is only updated if history.length is zero, ie moves haven't been
 * made.
 */
/*
export const update_setup = (fen) => {
  if (history.length > 0) return;

  if (fen !== DEFAULT_POSITION) {
    header['SetUp'] = '1';
    header['FEN'] = fen;
  } else {
    delete header['SetUp'];
    delete header['FEN'];
  }
}
*/

/** TODO: Бесполезаня ф-ция, можно делать деструктуризацию на месте */
/*
export const get = (square:string, board: BoardItem[]):BoardItem|null => {
  const piece:BoardItem = board[SQUARES[square]];
  return piece ? { ...piece } : null;
}
*/

/** TODO: Move in Action */
/*
export const remove = (square) => {
  const piece = get(square);
  board[SQUARES[square]] = null;
  if (piece && piece.type === FIGURES.KING) {
    kings[piece.color] = EMPTY;
  }

  update_setup(generate_fen());

  return piece;
}
*/

/** TODO: Move in Actions */
/*
export const generate_moves = (options) => {
  function add_move(board: BoardItem[], moves, from:number, to:number, flags) {
    // if pawn promotion
    if (
      board[from].type === FIGURES.PAWN &&
      (rank(to) === RANKS.RANK_8 || rank(to) === RANKS.RANK_1)
    ) {
      const pieces = [
        FIGURES.QUEEN,
        FIGURES.ROOK,
        FIGURES.BISHOP,
        FIGURES.KNIGHT,
      ];
      for (const i = 0, len = pieces.length; i < len; i++) {
        moves.push(build_move(board, from, to, flags, pieces[i]));
      }
    } else {
      moves.push(build_move(board, from, to, flags));
    }
  }

  const moves = [];
  const us = turn;
  const them = swap_color(us);
  const second_rank = { b: RANKS.RANK_7, w: RANKS.RANK_2 };

  const first_sq = SQUARES.a8;
  const last_sq = SQUARES.h1;
  const single_square = false;

  // do we want legal moves?
  const legal =
    typeof options !== 'undefined' && 'legal' in options ? options.legal : true;

  // are we generating moves for a single square?
  if (typeof options !== 'undefined' && 'square' in options) => {
    if (options.square in SQUARES) {
      first_sq = last_sq = SQUARES[options.square];
      single_square = true;
    } else {
      // invalid square
      return [];
    }
  }

  for (const i = first_sq; i <= last_sq; i++) {
    // did we run off the end of the board
    if (i & 0x88) {
      i += 7;
      continue;
    }

    const piece = board[i];
    if (piece == null || piece.color !== us) {
      continue;
    }

    if (piece.type === FIGURES.PAWN) {
      // single square, non-capturing
      const square = i + PAWN_OFFSETS[us][0];
      if (board[square] == null) {
        add_move(board, moves, i, square, BITS.NORMAL);

        // double square
        const square = i + PAWN_OFFSETS[us][1];
        if (second_rank[us] === rank(i) && board[square] == null) {
          add_move(board, moves, i, square, BITS.BIG_PAWN);
        }
      }

      // pawn captures
      for (j = 2; j < 4; j++) {
        const square = i + PAWN_OFFSETS[us][j];
        if (square & 0x88) continue;

        if (board[square] != null && board[square].color === them) {
          add_move(board, moves, i, square, BITS.CAPTURE);
        } else if (square === ep_square) {
          add_move(board, moves, i, ep_square, BITS.EP_CAPTURE);
        }
      }
    } else {
      for (const j = 0, len = PIECE_OFFSETS[piece.type].length; j < len; j++) {
        const offset = PIECE_OFFSETS[piece.type][j];
        const square = i;

        while (true) {
          square += offset;
          if (square & 0x88) break;

          if (board[square] == null) {
            add_move(board, moves, i, square, BITS.NORMAL);
          } else {
            if (board[square].color === us) break;
            add_move(board, moves, i, square, BITS.CAPTURE);
            break;
          }

          // break, if knight or king
          if (piece.type === 'n' || piece.type === 'k') break;
        }
      }
    }
  }

  // check for castling if: a) we're generating all moves, or b) we're doing
  // single square move generation on the king's square
  if (!single_square || last_sq === kings[us]) {
    // king-side castling
    if (castling[us] & BITS.KSIDE_CASTLE) {
      const castling_from = kings[us];
      const castling_to = castling_from + 2;

      if (
        board[castling_from + 1] == null &&
        board[castling_to] == null &&
        !attacked(them, kings[us]) &&
        !attacked(them, castling_from + 1) &&
        !attacked(them, castling_to)
      ) {
        add_move(board, moves, kings[us], castling_to, BITS.KSIDE_CASTLE);
      }
    }

    // queen-side castling
    if (castling[us] & BITS.QSIDE_CASTLE) {
      const castling_from = kings[us];
      const castling_to = castling_from - 2;

      if (
        board[castling_from - 1] == null &&
        board[castling_from - 2] == null &&
        board[castling_from - 3] == null &&
        !attacked(them, kings[us]) &&
        !attacked(them, castling_from - 1) &&
        !attacked(them, castling_to)
      ) {
        add_move(board, moves, kings[us], castling_to, BITS.QSIDE_CASTLE);
      }
    }
  }

  // return all pseudo-legal moves (this includes moves that allow the king
  // to be captured)
  if (!legal) {
    return moves;
  }

  // filter out illegal moves
  const legal_moves = [];
  for (const i = 0, len = moves.length; i < len; i++) {
    make_move(moves[i]);
    if (!king_attacked(us)) {
      legal_moves.push(moves[i]);
    }
    undo_move();
  }

  return legal_moves;
}
*/

/** TODO: Move to Actions */
/** TODO: sloppy убрал из пропсов, перед вызовом сделать moves = generate_moves({ legal: !sloppy }) */
/** TODO: checkmate - проверяется перед вызовом, блок проверки заккоментил */
/* convert a move from 0x88 coordinates to Standard Algebraic Notation
 * (SAN)
 *
 * @param {boolean} sloppy Use the sloppy SAN generator to work around over
 * disambiguation bugs in Fritz and Chessbase.  See below:
 *
 * r1bqkbnr/ppp2ppp/2n5/1B1pP3/4P3/8/PPPP2PP/RNBQK1NR b KQkq - 2 4
 * 4. ... Nge7 is overly disambiguated because the knight on c6 is pinned
 * 4. ... Ne7 is technically the valid SAN
 */
/*
export const move_to_san = (
  move: HistoryMove,
  moves: HistoryMove[],
  checkmate: string): string => {
  let output = '';

  if (+move.flags & BITS.KSIDE_CASTLE) {
    output = 'O-O';
  } else if (+move.flags & BITS.QSIDE_CASTLE) {
    output = 'O-O-O';
  } else {
    const disambiguator = get_disambiguator(move, moves);

    if (move.piece !== FIGURES.PAWN) {
      output += move.piece.toUpperCase() + disambiguator;
    }

    if (+move.flags & (BITS.CAPTURE | BITS.EP_CAPTURE)) {
      if (move.piece === FIGURES.PAWN) {
        output += algebraic(move.from)[0];
      }
      output += 'x';
    }

    output += algebraic(move.to);

    if (+move.flags & BITS.PROMOTION) {
      output += '=' + move.promotion?.toUpperCase();
    }
  }

  make_move(move);
  output += checkmate;
  if (in_check()) {
    if (in_checkmate()) {
      output += '#';
    } else {
      output += '+';
    }
  }

  //** TODO: Вынести вызов за функцию
  undo_move();

  return output;
};
*/

/** TODO: Move in Action */
/*
export const king_attacked = (color) => {
  return attacked(swap_color(color), kings[color]);
}

export const in_check = () => {
  return king_attacked(turn);
}

export const in_checkmate = () => {
  return in_check() && generate_moves().length === 0;
}

export const in_stalemate = () => {
  return !in_check() && generate_moves().length === 0;
}
*/

/** TODO: Move in Action */
/*
export const in_threefold_repetition = () => {
  // TODO: while this function is fine for casual use, a better
  // implementation would use a Zobrist key (instead of FEN). the
  // Zobrist key would be maintained in the make_move/undo_move functions,
  // avoiding the costly that we do below.
  const moves = [];
  const positions = {};
  const repetition = false;

  while (true) {
    const move = undo_move();
    if (!move) break;
    moves.push(move);
  }

  while (true) {
    // remove the last two fields in the FEN string, they're not needed
    // when checking for draw by rep
    const fen = generate_fen().split(' ').slice(0, 4).join(' ');

    // has the position occurred three or move times
    positions[fen] = fen in positions ? positions[fen] + 1 : 1;
    if (positions[fen] >= 3) {
      repetition = true;
    }

    if (!moves.length) {
      break;
    }
    make_move(moves.pop());
  }

  return repetition;
}
*/

/** TODO: Move to Action */
/*
export const push = (move: HistoryMove): History => {
  history.push({
    move: move,
    kings: { b: kings.b, w: kings.w },
    turn: turn,
    castling: { b: castling.b, w: castling.w },
    ep_square: ep_square,
    half_moves: half_moves,
    move_number: move_number,
  });
}
*/

/** TODO: Move to Action */
/*
export const make_move = (move) => {
  const us = turn;
  const them = swap_color(us);
  push(move);

  board[move.to] = board[move.from];
  board[move.from] = null;

  // if ep capture, remove the captured pawn
  if (move.flags & BITS.EP_CAPTURE) {
    if (turn === COLORS.BLACK) {
      board[move.to - 16] = null;
    } else {
      board[move.to + 16] = null;
    }
  }

  // if pawn promotion, replace with new piece
  if (move.flags & BITS.PROMOTION) {
    board[move.to] = { type: move.promotion, color: us };
  }

  // if we moved the king
  if (board[move.to].type === FIGURES.KING) {
    kings[board[move.to].color] = move.to;

    //* if we castled, move the rook next to the king
    if (move.flags & BITS.KSIDE_CASTLE) {
      const castling_to = move.to - 1;
      const castling_from = move.to + 1;
      board[castling_to] = board[castling_from];
      board[castling_from] = null;
    } else if (move.flags & BITS.QSIDE_CASTLE) {
      const castling_to = move.to + 1;
      const castling_from = move.to - 2;
      board[castling_to] = board[castling_from];
      board[castling_from] = null;
    }

    //* turn off castling
    castling[us] = '';
  }

  //* turn off castling if we move a rook
  if (castling[us]) {
    for (const i = 0, len = ROOKS[us].length; i < len; i++) {
      if (
        move.from === ROOKS[us][i].square &&
        castling[us] & ROOKS[us][i].flag
      ) {
        castling[us] ^= ROOKS[us][i].flag;
        break;
      }
    }
  }

  //* turn off castling if we capture a rook
  if (castling[them]) {
    for (const i = 0, len = ROOKS[them].length; i < len; i++) {
      if (
        move.to === ROOKS[them][i].square &&
        castling[them] & ROOKS[them][i].flag
      ) {
        castling[them] ^= ROOKS[them][i].flag;
        break;
      }
    }
  }

  //* if big pawn move, update the en passant square
  if (move.flags & BITS.BIG_PAWN) {
    if (turn === 'b') {
      ep_square = move.to - 16;
    } else {
      ep_square = move.to + 16;
    }
  } else {
    ep_square = EMPTY;
  }

  //* reset the 50 move counter if a pawn is moved or a piece is captured
  if (move.piece === FIGURES.PAWN) {
    half_moves = 0;
  } else if (move.flags & (BITS.CAPTURE | BITS.EP_CAPTURE)) {
    half_moves = 0;
  } else {
    half_moves++;
  }

  if (turn === COLORS.BLACK) {
    move_number++;
  }
  turn = swap_color(turn);
}
*/

/** TODO: Move to Action */
/*
export const undo_move = () => {
  const old = history.pop();
  if (old == null) {
    return null;
  }

  const move = old.move;
  kings = old.kings;
  turn = old.turn;
  castling = old.castling;
  ep_square = old.ep_square;
  half_moves = old.half_moves;
  move_number = old.move_number;

  const us = turn;
  const them = swap_color(turn);

  board[move.from] = board[move.to];
  board[move.from].type = move.piece; // to undo any promotions
  board[move.to] = null;

  if (move.flags & BITS.CAPTURE) {
    board[move.to] = { type: move.captured, color: them };
  } else if (move.flags & BITS.EP_CAPTURE) {
    const index;
    if (us === COLORS.BLACK) {
      index = move.to - 16;
    } else {
      index = move.to + 16;
    }
    board[index] = { type: FIGURES.PAWN, color: them };
  }

  if (move.flags & (BITS.KSIDE_CASTLE | BITS.QSIDE_CASTLE)) {
    const castling_to, castling_from;
    if (move.flags & BITS.KSIDE_CASTLE) {
      castling_to = move.to + 1;
      castling_from = move.to - 1;
    } else if (move.flags & BITS.QSIDE_CASTLE) {
      castling_to = move.to - 2;
      castling_from = move.to + 1;
    }

    board[castling_to] = board[castling_from];
    board[castling_from] = null;
  }

  return move;
}
*/

/** TODO: Move to Action */
// convert a move from Standard Algebraic Notation (SAN) to 0x88 coordinates
/*
export const move_from_san = (move, sloppy) => {
  // strip off any move decorations: e.g Nf3+?!
  const clean_move = stripped_san(move);

  // if we're using the sloppy parser run a regex to grab piece, to, and from
  // this should parse invalid SAN like: Pe2-e4, Rc1c4, Qf3xf7
  if (sloppy) {
    const matches = clean_move.match(
      /([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/,
    );
    if (matches) {
      const piece = matches[1];
      const from = matches[2];
      const to = matches[3];
      const promotion = matches[4];
    }
  }

  const moves = generate_moves();
  for (const i = 0, len = moves.length; i < len; i++) {
    // try the strict parser first, then the sloppy parser if requested
    // by the user
    if (
      clean_move === stripped_san(move_to_san(moves[i])) ||
      (sloppy && clean_move === stripped_san(move_to_san(moves[i], true)))
    ) {
      return moves[i];
    } else {
      if (
        matches &&
        (!piece || piece.toLowerCase() == moves[i].piece) &&
        SQUARES[from] == moves[i].from &&
        SQUARES[to] == moves[i].to &&
        (!promotion || promotion.toLowerCase() == moves[i].promotion)
      ) {
        return moves[i];
      }
    }
  }

  return null;
}
*/

/*****************************************************************************
 * UTILITY FUNCTIONS
 ****************************************************************************/

/** TODO: Move to Action */
/* pretty = external move object */
/*
export const make_pretty = (ugly_move) => {
  const move = clone(ugly_move);

  move.san = move_to_san(move, false);
  move.to = algebraic(move.to);
  move.from = algebraic(move.from);

  const flags = '';

  for (const flag in BITS) {
    if (BITS[flag] & move.flags) {
      flags += FLAGS[flag];
    }
  }
  move.flags = flags;

  return move;
};
*/

/*****************************************************************************
 * DEBUGGING UTILITIES
 ****************************************************************************/
/** TODO: Move to Action */
/* export const perft = (depth) => {
  const moves = generate_moves({ legal: false });
  const nodes = 0;
  const color = turn;

  for (const i = 0, len = moves.length; i < len; i++) {
    make_move(moves[i]);
    if (!king_attacked(color)) {
      if (depth - 1 > 0) {
        const child_nodes = perft(depth - 1);
        nodes += child_nodes;
      } else {
        nodes++;
      }
    }
    undo_move();
  }

  return nodes;
}; */
