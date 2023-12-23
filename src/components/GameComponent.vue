<template>
    <h2>Game Component</h2>
    <div>
        <div class="setup" v-show="!started">
            <h2>Setup</h2>
            <div class="flex-container">
                <label>Columns: </label>
                <input type="number" v-model="this.columns">
            </div>
            <div class="flex-container">
                <label>Rows: </label>
                <input type="number" v-model="this.rows">
            </div>
            <button @click="fillBoard">Start</button>
        </div>

        <div v-show="started && (columns < 1 || rows < 1)">
            <h1>Can't play without a board...</h1>
        </div>

        <table v-show="started">
            <tr v-show="rows > 0" v-for="row in rows">
                <td v-show="columns > 0" v-for="col in columns" class="border square"
                    @click="select({ col: col - 1, row: row - 1 })">
                    <p class="biggerfont">
                        {{ getPiece() }}

                        <!-- <br>
                        (col: {{ col - 1 }} row: {{ row - 1 }}) -->
                    </p>
                </td>
            </tr>
        </table>
        <div v-if="this.board">
        <p>Moves left: {{ movesLeft }}</p>
        <p>Score: {{ score }}</p>
    </div>

        <!-- <table>
            <tr v-for="col in columns">
                <td v-for="row in rows" class="border square" @click="this.select({ col: col - 1, row: row - 1 })">
                    <p>
                        {{ items.pop() }}
                        <br>
                        index: {{ index++ }}
                        <br>
                        (col: {{ col - 1 }} row: {{ row - 1 }})
                    </p>
                </td>
            </tr>
        </table> -->
    </div>
</template>

<style>
.border {
    border: 1px;
    border-color: black;
    border-style: solid;
}

.cell:focus {
    background-color: yellow;
}

.biggerfont {
    font-size: 28px;
}

.square {
    width: 3em;
    height: 3em;
}

.table {
    margin: 0, auto;
}

table {
    margin: auto;
    border-spacing: 0px;
}
</style>

<script lang="ts">
import { Board, Generator, Position } from '@/model/board';
import { SequenceGenerator } from '@/model/sequenceGenerator'
import gameViewModel from '../viewmodels/GameViewModel'

export default {
    data() {
        return {
            board: null as unknown as Board<string>,
            items: [[''], ['']] as Array<Array<string>>, // 2D Array
            columns: 14,
            rows: 7,
            selected: { col: -1, row: -1 } as Position,
            started: false,
            score: 0,
            movesLeft: 0,
        }
    },
    methods: {
        checkForSizeErrors_naive(pieceSequence: any): { valid: boolean, error: string } {
            let valid: boolean = true
            let error: string = ''

            // Piece Sequence is null / undefined
            if (!pieceSequence) {
                valid = false
            }

            // If Size isn't over 0
            if (!(pieceSequence.length > 0)) {
                valid = false
            }

            // Size is a Multiple of Piece Sequence
            if (this.columns % pieceSequence.length == 0) {
                valid = false
                error = `Columns cannot be a multiple of ${pieceSequence.length}`;
            } else if (this.rows % pieceSequence.length == 0) {
                valid = false
                error = `Rows cannot be a multiple of ${pieceSequence.length}`;
            }

            // Repeating Patterns in Sequence
            // Not sure how to do this exactly

            // Return Object
            return { valid: valid, error: error }
        },
        cloneBoardToUI(this: any) {
            // Save Board State
            let state: string[][] = this.board.duplicateBoard()

            // Flatten the Items
            let loops = state[0].length
            this.items = []

            // Flatten the Array using the first item in each sub-array as the first few items
            for (let index = 0; index < loops; index++) {
                state.forEach(element => {
                    this.items.push(element.shift())
                });
            }
        },
        fillBoard(this: any) {
            // Creation of the Board
            const pieceSequence = '♥♦♣♠♠♦';

            // Alert user if Piece Sequence and Size of Area would cause an issue
            const check = this.checkForSizeErrors_naive(pieceSequence)

            // Send error message if occured
            if (!check.valid) {
                alert(check.error)
                return
            }

            // Generate if board was not a stupid size
            let generator: Generator<string> = new SequenceGenerator(pieceSequence)
            this.board = new Board<string>(generator, this.columns, this.rows);
            this.movesLeft = this.board.getMoves()
            this.score = this.board.getScore()

            // Refill the empty board
            this.cloneBoardToUI()

            // Set Started to True
            this.started = true
        },
        select(position: Position) {
            // Reset of Selected as a Function
            let resetSelected = (): void => { this.selected = { col: -1, row: -1 } as Position };

            // Check if any item is selected
            if (this.selected.col === -1 || this.selected.row === -1) {
                // console.log('Selecting', position);

                // No Item is selected, so just select the current one
                this.selected = position
                return
            }

            // Check if attempting to Unselect
            if (this.selected.col === position.col && this.selected.row === position.row) {
                // console.log('Unselecting', position);

                // Unselect
                resetSelected()
                return
            }

            // Check for a Pair
            if (this.board.canMove(this.selected, position)) {
                // console.log('Legal Swap:', this.selected, position);

                // Perform Move
                this.board.move(this.selected, position)

                // Clone the board
                this.cloneBoardToUI()        

                this.score = this.board.getScore()
                this.movesLeft = this.board.getMoves();

                if(this.movesLeft === 0){
                    gameViewModel.createGame(this.score)
                }

                // Reset Selected
                resetSelected()
            } else {
                console.log('Illegal Swap:', this.selected, position);

                // Reset Selected
                resetSelected()
            }
        },
        getPiece() {
            let thing = this.items.shift()
            // console.log(thing)
            return thing
        },
    },
}
</script>

