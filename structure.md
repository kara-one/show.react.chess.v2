## Functions
clear(keep_headers) |
prune_comments() |
reset() |
*load(fen, keep_headers)*                         |-- boardLoadAction(
                                                        fen: IBoardState['fen'] = DEFAULT_POSITION,
                                                        keep_headers: boolean = false,
                                                      )
*validate_fen(fen)*                               |- utilParseValidateFen.parseValidateFen
*generate_fen()*                                  |- utilGenerateFen.generateFen
set_header(args) |
update_setup(fen) |
get(square) |
put(piece, square) |
remove(square) |
*build_move(board, from, to, flags, promotion)*   |- utilBuildMove.buildMove
*generate_moves(options)*                         |- utilGenerateMoves.generateMoves
*stripped_san(move)*                              |- utilLambda.strippedSan
*attacked(color, square)*                         |- utilAttacked.attacked
*king_attacked(color)*                            |- utilAttacked.king_attacked
*in_check()*                                      |- utilAttacked.in_check
*in_checkmate()*                                  |- utilAttacked.in_checkmate
*in_stalemate()*                                  |- utilAttacked.in_stalemate
*insufficient_material()*                         |- utilInsufficientMaterial.insufficientMaterial
in_threefold_repetition() |
*push(move)*                                      |-- boardHistoryPushAction(move: HistoryMove)
*make_move(move)*                                 |- utilMakeMove.makeMove
                                                  |-- boardMakeMoveAction(move: HistoryMove)
undo_move() |
*get_disambiguator(move, sloppy)*                 |- utilGetDisambiguator.getDisambiguator
*ascii()*                                         |- utilAscii.ascii
move_from_san(move, sloppy) |
move_to_san(move, sloppy) |
*rank(i)*                                         |- utilLambda.rank
*file(i)*                                         |- utilLambda.file
*algebraic(i)*                                    |- utilLambda.algebraic
*swap_color(c)*                                   |- utilLambda.swap_color
*is_digit(c)*                                     |- utilLambda.isDigit
make_pretty(ugly_move) |
*clone(obj)*                                      |- utilClone.clone
*trim(str)*                                       |- utilLambda.trim
perft(depth) |
                                                  |- utilGetCellClasses.getCellClasses
                                                  |-- cellClickAction(cell: BoardCell)



## Methods
*SQUARES*                                         |- utilCopySquares.copySquares
load: function(fen)                             |
reset: function() |
*moves: function(options)*                        |-- boardMovesAction(square?: `${SQUARES}`, verbose?: boolean)
in_check: function() |
in_checkmate: function() |
in_stalemate: function() |
in_draw: function() |
insufficient_material: function() |
in_threefold_repetition: function() |
game_over: function() |
validate_fen: function(fen) |
fen: function() |
*board: function()*                               |- utilGetBoard.getBoard
pgn: function(options) |
load_pgn: function(pgn, options) |
header: function() |
ascii: function() |
turn: function() |
move: function(move, options)                   |
undo: function() |
clear: function() |
*put: function(piece, square)*                    |-- boardPutCellAction(
                                                        piece: BoardItem,
                                                        square: keyof typeof SQUARES,
                                                      )
get: function(square) |
remove: function(square) |
perft: function(depth) |
square_color: function(square) |
history: function(options) |
get_comment: function() |
set_comment: function(comment) |
delete_comment: function() |
get_comments: function() |
delete_comments: function() |