import checkWin from './checkWin';
import helpers from './helpers';
const deepCopy = helpers.deepCopy;

function getPossibleMoves(grid) {
    const possibleMoves = [];
    for (var j = 0; j < grid.length; j++) {
        let row = grid[j];

        for (var i = 0; i < row.length; i++) {
            var point = row[i];
            if (point === null) {
                possibleMoves.push([i, j]);
            }
        }
    }
    return possibleMoves;
}

//let counter = 0;

function bestMove(grid, activePlayer) {
    return minMax(grid, activePlayer, activePlayer, true);
}

/**
 *
 * @param {[[]]} grid
 * @param {int} currentPlayer Player for this recursion instance
 * @param {int} activePlayer Player who is trying to be smart
 * @param {boolean} [topLevel]
 * @returns {[] | int} best move to make if `topLevel` is true, or the best score
 */
function minMax(grid, currentPlayer, activePlayer, topLevel = false) {
    //counter += 1;
    //if (counter > 10) {
    //    throw 'Too many!';
    //}
    let gameStateScore = score(grid, activePlayer);
    if (gameStateScore !== 0) {
        // game over
        return gameStateScore;
    }

    // game not over

    const possibleMoves = getPossibleMoves(grid);
    const correspondingScores = possibleMoves.map((move) => {
        const newGridState = makeMove(grid, move, currentPlayer);
        const nextPlayer = getOtherPlayer(currentPlayer);
        return minMax(newGridState, nextPlayer, activePlayer);
    });

    let result;
    if (currentPlayer === activePlayer) {
        result = Math.max(...correspondingScores);
    } else {
        result = Math.min(...correspondingScores);
    }

    if (topLevel) {
        //console.log('Possible Moves', possibleMoves);
        //console.log('Corresponding Scores', correspondingScores);
        const moveIndexToMake = correspondingScores.indexOf(result);
        const moveToMake = possibleMoves[moveIndexToMake];
        console.log(`Move to make: ${moveToMake}`);
        return moveToMake;
    }
    return result;
}

function getOtherPlayer(currentPlayer) {
    if (currentPlayer === 0) {
        return 1;
    } else {
        return 0;
    }
}

function makeMove(grid, move, player) {
    const copiedGrid = deepCopy(grid);
    copiedGrid[move[1]][move[0]] = player;
    return copiedGrid;
}

function score(grid, activePlayer) {
    const winner = checkWin(grid);
    if (winner !== null) {
        if (winner === activePlayer) {
            return 1;
        } else {
            return -1;
        }
    } else {
        return 0;
    }
}

export default bestMove;
