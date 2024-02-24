<template>
    <main>
        <div>
            <h1>This number...</h1>
            <h2>{{ count }}</h2>
            <button @click="count--">-</button>
            <button @click="count++">+</button>
        </div>
    </main>
</template>

<script setup>
import {ref} from 'vue'

let count = ref(0)

</script>

<style scoped>
main {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;

    div {
        text-align: center;
    }
}
</style>