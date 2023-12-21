<template>
    <h2>Game Component</h2>
    <div ref="gameboard">
        <p>
            This is a message
        </p>
    </div>
</template>

<style></style>

<script lang="ts">
export default {
    data() {
        return {
            items: [] // 2D Array
        }
    },
    methods: {
        createBoard() {
            // Debugging
            console.log('Setup a Board');
            let width = 10, height = 8

            // Get the Board
            let board = this.$refs.gameboard as HTMLDivElement;


            this.items = [['a', 'b', 'c', 'd', 'e'], ['a', 'b', 'c', 'd', 'e'], ['a', 'b', 'c', 'd', 'e'], ['a', 'b', 'c', 'd', 'e'], ['a', 'b', 'c', 'd', 'e']]

            // Set the Board
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

