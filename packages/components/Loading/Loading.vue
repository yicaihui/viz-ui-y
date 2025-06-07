<script setup lang="ts">
import type { LoadingOptions } from './types'
import { computed, type Ref } from 'vue'
import { isString } from 'lodash-es'
import VizIcon from '../Icon/Icon.vue'

defineOptions({
  name: 'VizLoading',
  inheritAttrs: false
})
const props = defineProps<LoadingOptions>()

const iconName = computed(() => {
  if (isString(props.spinner)) {
    return props.spinner
  }
  return 'spinner' // 'circle-notch' 也很好看
})
</script>

<template>
  <transition name="fade-in-linear" @after-leave="onAfterLeave">
    <div
      v-show="(props.visible as Ref).value"
      class="viz-loading viz-loading__mask"
      :class="{ 'is-fullscreen': fullscreen }"
    >
      <div class="viz-loading__spinner">
        <viz-icon v-if="props.spinner !== false" :icon="iconName" spin />
        <p v-if="text" class="viz-loading-text">{{ text }}</p>
      </div>
    </div>
  </transition>
</template>

<style>
@import './style.css';
.viz-loading {
  --viz-loading-bg-color: v-bind(background) !important;
  --viz-loading-z-index: v-bind(zIndex) !important;
}
</style>