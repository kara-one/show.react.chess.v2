import { utilAscii } from './utilAscii';
import { utilAttacked } from './utilAttacked';
import { utilBuildMove } from './utilBuildMove';
import { utilClone } from './utilClone';
import { utilCopySquares } from './utilCopySquares';
import { utilGenerateFen } from './utilGenerateFen';
import { utilGetBoard } from './utilGetBoard';
import { utilGetCellClasses } from './utilGetCellClasses';
import { utilGetDisambiguator } from './utilGetDisambiguator';
import { utilInsufficientMaterial } from './utilInsufficientMaterial';
import { utilLambda } from './utilLambda';
import { utilParseValidateFen } from './utilParseValidateFen';

export const boardUtils = {
  ...utilGetCellClasses,
  ...utilGetBoard,
  ...utilParseValidateFen,
  ...utilGenerateFen,
  ...utilBuildMove,
  ...utilAttacked,
  ...utilInsufficientMaterial,
  ...utilGetDisambiguator,
  ...utilAscii,
  ...utilLambda,
  ...utilClone,
  ...utilCopySquares,
};
