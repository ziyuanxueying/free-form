<template>
  <div>
    <a-space>
      <a-button @click="addCount" type="primary">
        Primary
        {{ counter }} 
      </a-button>
    </a-space> 
    <div>
      <tr>
        <td
          a="1"
          b="c"
          c="d"
          d="d"
        >
          adaw
          dawdw
        </td>
      </tr>
    </div>
    <a-textarea placeholder="Please enter something" :model-value="`${counter.count}`" allow-clear/>
  </div>
</template>
<script>
// Composition Api
import { useCounterStore } from './store'
export default {
  name: 'HelloWorld',
  setup () { 
    const counter = useCounterStore()

    // counter.count++
    // with autocompletion ✨
    // counter.$patch({ count: counter.count + 1 })
    // or using an action instead
    // counter.increment()

    async function addCount () {
      // counter.increment()
      await counter.getData({ name: 123, age: 12 })
    }
    return {
      counter,
      addCount
    }
  }
}
</script>