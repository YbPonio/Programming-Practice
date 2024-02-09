<template>
  <button @click="increment">{{ count }}</button>
</template>

<script setup>
// COMPOSITION API
import {ref, onMounted} from 'vue'

let count = ref(2)

function increment() {
  count.value++
}

onMounted(() => { 
  console.log(count.value)
})

// OPTIONS API
// export default {
//   data() {
//     return {
//       count: 0
//     }
//   },
//   methods: {
//     increment() {
//       this.count++
//     }
//   },
//   mounted() {
//     console.log(this.count)
//   }
// }
</script>

<style scoped>
button{
  padding: .3rem 1rem;
}
</style>