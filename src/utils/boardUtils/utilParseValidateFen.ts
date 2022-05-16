import { EMPTY, FEN_ERRORS, IS_DEVELOP } from '../../store/initialState';
import {
  Fen,
  ParsedFen,
  ParseValidateFen,
} from '../../types/typesBoard/typesBoardFen';
import { COLORS, Kings } from '../../types/typesBoard/typesBoardFigures';
import { BITS, SQUARES } from '../../types/typesBoard/typesBoardState';

/**
 * TODO: Вынести валидацию в отдельную функцию, возвращать обьект { valid: false, error_number: 1, error: errors[1] } по результату которого делать ретурн или парсить fen
 * TODO: В режиме IS_DEVELOP === true писать ошибки в лог, а ретурн этой функции сделать однозначным
 *
 * This function checks the structure and parses "fen" into object, can be called with error code
 * @implements validate_fen
 * @param {Fen} fen
 * @param {boolean} isDevelop = false
 * @returns {ParseValidateFen | ParseValidateFen['parsedFen']} isDevelop ? { parsedFen, error_number, error } : parsedFen
 */
const parseValidateFen = (
  fen: Fen,
  isDevelop: boolean = IS_DEVELOP,
): ParseValidateFen | ParseValidateFen['parsedFen'] => {
  // Return function
  const returnData = (devObject: ParseValidateFen) =>
    isDevelop ? devObject : devObject.parsedFen;

  const errors = FEN_ERRORS;

  /// STEP 1: Validation
  const tokens = fen.split(/\s+/);

  // 1st criterion: 6 space-seperated fields?
  if (tokens.length !== 6) {
    return returnData({ parsedFen: null, error_number: 1, error: errors[1] });
  }

  // 2nd criterion: move number field is a integer value > 0?
  if (isNaN(+tokens[5]) || parseInt(tokens[5], 10) <= 0) {
    return returnData({ parsedFen: null, error_number: 2, error: errors[2] });
  }

  // 3rd criterion: half move counter is an integer >= 0?
  if (isNaN(+tokens[4]) || parseInt(tokens[4], 10) < 0) {
    return returnData({ parsedFen: null, error_number: 3, error: errors[3] });
  }

  // 4th criterion: 4th field is a valid e.p.-string?
  const epSquareRegexp = new RegExp('^(-|[abcdefgh][36])$');
  if (!epSquareRegexp.test(tokens[3])) {
    return returnData({ parsedFen: null, error_number: 4, error: errors[4] });
  }

  // 5th criterion: 3th field is a valid castle-string?
  const castlingRegexp = new RegExp('^(KQ?k?q?|Qk?q?|kq?|q|-)$');
  if (!castlingRegexp.test(tokens[2])) {
    return returnData({ parsedFen: null, error_number: 5, error: errors[5] });
  }

  // 6th criterion: 2nd field is "w" (white) or "b" (black)?
  const turnRegexp = new RegExp('^(w|b)$');
  if (!turnRegexp.test(tokens[1])) {
    return returnData({ parsedFen: null, error_number: 6, error: errors[6] });
  }

  // 7th criterion: 1st field contains 8 rows?
  const rows = tokens[0].split('/');
  if (rows.length !== 8) {
    return returnData({ parsedFen: null, error_number: 7, error: errors[7] });
  }

  // 8th criterion: every row is valid?
  for (let i = 0; i < rows.length; i++) {
    // check for right sum of fields AND not two numbers in succession
    let sum_fields = 0;
    let previous_was_number = false;

    for (let k = 0; k < rows[i].length; k++) {
      if (!isNaN(+rows[i][k])) {
        if (previous_was_number) {
          return returnData({
            parsedFen: null,
            error_number: 8,
            error: errors[8],
          });
        }
        sum_fields += parseInt(rows[i][k], 10);
        previous_was_number = true;
      } else {
        if (!/^[prnbqkPRNBQK]$/.test(rows[i][k])) {
          return returnData({
            parsedFen: null,
            error_number: 9,
            error: errors[9],
          });
        }
        sum_fields += 1;
        previous_was_number = false;
      }
    }
    if (sum_fields !== 8) {
      return returnData({
        parsedFen: null,
        error_number: 10,
        error: errors[10],
      });
    }
  }

  if (
    (tokens[3][1] === '3' && tokens[1] === 'w') ||
    (tokens[3][1] === '6' && tokens[1] === 'b')
  ) {
    return returnData({ parsedFen: null, error_number: 11, error: errors[11] });
  }

  /// Step 2: Parse
  const castling: Kings = { [COLORS.WHITE]: 0, [COLORS.BLACK]: 0 };

  if (tokens[2].indexOf('K') > -1) {
    castling[COLORS.WHITE] |= BITS.KSIDE_CASTLE;
  }
  if (tokens[2].indexOf('Q') > -1) {
    castling[COLORS.WHITE] |= BITS.QSIDE_CASTLE;
  }
  if (tokens[2].indexOf('k') > -1) {
    castling[COLORS.BLACK] |= BITS.KSIDE_CASTLE;
  }
  if (tokens[2].indexOf('q') > -1) {
    castling[COLORS.BLACK] |= BITS.QSIDE_CASTLE;
  }

  const ep_square =
    tokens[3] === '-' ? EMPTY : SQUARES[tokens[3] as keyof typeof SQUARES];

  const parsedFen: ParsedFen = {
    pieces: tokens[0] as string,
    turn: tokens[1] as `${COLORS}`,
    castling: castling,
    ep_square: ep_square,
    half_moves: parseInt(tokens[4], 10) as number,
    move_number: parseInt(tokens[5], 10) as number,
  };

  // everything's okay!
  return returnData({
    parsedFen: parsedFen,
    error_number: 0,
    error: errors[0],
  });
};

export const utilParseValidateFen = {
  parseValidateFen,
};
