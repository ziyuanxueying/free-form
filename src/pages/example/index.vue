<template>
  <div>
    <a-space>
      <a-button @click="addCount" type="primary">Primary</a-button>
    </a-space> 
    <a-textarea placeholder="Please enter something" :model-value='`${counter.count}`' allow-clear/>
  </div>

</template>
<script>
// Composition Api
import { useCounterStore } from './store'
export default {
  name: 'HelloWorld',
  setup() {

    const counter = useCounterStore()

    // counter.count++
    // with autocompletion ✨
    // counter.$patch({ count: counter.count + 1 })
    // or using an action instead
    // counter.increment()

    function addCount () {
      counter.increment()
    }
    return {
      counter,
      addCount
    }
  }
}
</script>