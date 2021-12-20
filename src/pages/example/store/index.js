import { defineStore } from 'pinia'
import { get } from '@request'

export const useCounterStore = defineStore('counter', {
  state: () => {
    return { count: 0 }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    increment() {
      this.count++
    },
    getData() {
      get()
    }
  },
})