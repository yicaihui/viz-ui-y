<script setup lang="ts">
import { VizButton, VizPopconfirm } from 'viz-ui-y'

function confirm() {
  console.log('confirm')
}
function cancel() {
  console.log('cancel')
}
</script>

<template>
  <viz-popconfirm title="确定删除吗？" @confirm="confirm" @cancel="cancel">
    <viz-button type="primary" size="small">test</viz-button>
  </viz-popconfirm>
</template>

<style scoped>
</style>
