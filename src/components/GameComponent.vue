<template>
    <h2>Game Component</h2>
    <div ref="gameboard">
        <table>
            <tr v-for="row in rows">
                <td v-for="col in columns" class="border square">
                    {{ items.pop() }}
                </td>
            </tr>
        </table>
    </div>
</template>

<style>
.border {
    border: 1px;
    border-color: black;
    border-style: solid;
}

.square {
    width: 4em;
    height: 4em;
}
</style>

<script lang="ts">
export default {
    data() {
        return {
            items: [], // 2D Array
            rows: 0,
            columns: 0,
        }
    },
    methods: {
        createBoard(this: any) {
            // Debugging
            console.log('Setup a Board');
            let width = 5, height = 5

            // Copy the Board State into Items
            this.items = [
                ['a', 'b', 'c', 'd', 'e'],
                ['a', 'b', 'c', 'd', 'e'],
                ['a', 'b', 'c', 'd', 'e'],
                ['a', 'b', 'c', 'd', 'e'],
                ['a', 'b', 'c', 'd', 'e']
            ]
            
            // Calculate these using the Board.ts
            this.rows = height;
            this.columns = width;

            // Flatten the Items
            this.items = this.items.flatMap((v: any) => v)

            // Debugging
            console.log('Created Empty Board')
        },
    },
    // !! DOES NOT WORK ON created() !!
    mounted() {
        console.log('Creating Game Component');

        this.createBoard()
    }


}
</script>

