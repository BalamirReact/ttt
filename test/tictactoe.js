import TicTacToe from './../src/js/game/board/tictactoe';
import PreconfiguredPlayer from '../src/js/game/players/preconfiguredPlayer';
import chai from 'chai';

const assert = chai.assert;

/**
 * @param {[[]]} player0Moves
 * @param {[[]]} player1Moves
 * @param {int} expectedWinner
 */
function testGame(player0Moves, player1Moves, expectedWinner) {
    const player0 = new PreconfiguredPlayer(0, 'Player0', player0Moves);
    const player1 = new PreconfiguredPlayer(1, 'Player1', player1Moves);

    const game = new TicTacToe(player0, player1);
    game.start(winner => {
        assert.strictEqual(winner, expectedWinner, `Player ${expectedWinner} should win`);
    });
}

describe('TicTacToe Tests', () => {
    describe('Preset Player Tests', () => {
        it('Player0 can win', () => {
            testGame(
                [
                    [0, 0],
                    [1, 0],
                    [2, 0]
                ], [
                    [0, 2],
                    [1, 2],
                    [2, 2]
                ], 0
            );
        });

        it('Player1 can win', () => {
            testGame(
                [
                    [0, 0],
                    [1, 1],
                    [2, 0]
                ], [
                    [0, 2],
                    [1, 2],
                    [2, 2]
                ], 1
            );
        });
    });
});
