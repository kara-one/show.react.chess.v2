import { Dispatch } from "react";
import { BoardActions, BoardActionTypes } from "../../../types/typesBoard/typesBoardActions";
import { boardUtils } from "../../../utils/boardUtils";
import { EMPTY } from "../../initialBoardState";
import { RootReducer } from "../../reducers";

const boardSetSelectedAction = (square: number): Function => {
  return (dispatch: Dispatch<BoardActions>, getState: Function): void => {
    const { chess } = getState() as RootReducer;
    const copyChess = boardUtils.clone(chess);

    if (
      copyChess.board[square] !== null &&
      copyChess.board[square]?.color === copyChess.turn
    ) {
      dispatch({
        type: BoardActionTypes.BOARD_SELECT_CELL,
        selectSquare: square,
      });
    } else {
      dispatch({
        type: BoardActionTypes.BOARD_SELECT_CELL,
        selectSquare: EMPTY,
      });
    }};
};
export default boardSetSelectedAction;