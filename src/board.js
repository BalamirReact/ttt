import checkWin from './checkWin';
import helpers from './helpers';

const BOARD_SIZE = 3;
const DIMENSIONS = 2;

const emptyGrid = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

const deepCopy = helpers.deepCopy;
class Board {
    /**
     * @param {[[]]} [initGrid]
     */
    constructor(initGrid = emptyGrid) {
        this.grid = deepCopy(initGrid);
        this.gameWinner = null;
    }

    /**
     *
     * @param {int} player > 1
     * @param {[]} coordinates length 2 list of coordinates
     * @returns {number|null} the winning player or null
     */
    makeMove(player, coordinates) {
        if (this.gameWinner) {
            throw 'Game has already ended';
        }
        // valid move
        if (this._markPlayerMove(player, coordinates)) {
            let winner = checkWin(this.grid);
            // need to check for null because a winning player can be int value 0
            if (winner !== null) {
                this.gameWinner = winner;
            }
            return winner;
        }
    }

    /**
     * @param {int} player
     * @param {[]} coordinates length 2 list of coordinates
     */
    _markPlayerMove(player, coordinates) {
        // check if valid player
        if (player === null || player === undefined) {
            throw 'Player is invalid';
        }

        // check if coordinates is valid
        if (coordinates.length !== DIMENSIONS) {
            throw 'Invalid coordinates dimensions';
        }

        // check coordinate in bounds
        coordinates.forEach(coordinate => {
            if (coordinate >= BOARD_SIZE) {
                throw 'Coordinates out of bounds';
            }
        });

        // check position is empty
        const playerAtCoordinates = this.grid[coordinates[1]][coordinates[0]];
        if (playerAtCoordinates !== null) {
            throw 'Grid has already been occupied at point!'
        }

        this.grid[coordinates[1]][coordinates[0]] = player;
        return true;
    }

    get gameGrid() {
        return deepCopy(this.grid);
    }
}


export default Board;
