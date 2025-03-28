<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { AlertEmits, AlertInstance, AlertProps } from './types'
import { typeIconMap } from '@viz-ui-y/utils'
import VizIcon from '../Icon/Icon.vue'

defineOptions({
  name: 'VizAlert'
})
const props = withDefaults(defineProps<AlertProps>(), {
  effect: 'light',
  type: 'info',
  closable: true
})
const emits = defineEmits<AlertEmits>()
const slots = defineSlots()
const withDescription = computed(() => props.description || slots.default)
const iconName = computed(() => typeIconMap.get(props.type) ?? 'circle-info')
//visible
const visible = ref(true)
function open() {
  visible.value = true
}
function close() {
  visible.value = false
  emits('close')
}

defineExpose<AlertInstance>({  
  open,
  close
})
</script>

<template>
  <transition name="viz-alert-fade">
    <div
      v-show="visible"
      class="viz-alert"
      role="alert"
      :class="{
        [`viz-alert__${type}`]: type,
        [`viz-alert__${effect}`]: effect,
        'text-center': center
      }"
    >
      <viz-icon
        v-if="showIcon"
        class="viz-alert__icon"
        :class="{ 'big-icon': withDescription }"
        :icon="iconName"
      />
      <div class="viz-alert__content">
        <span
          class="viz-alert__title"
          :class="{ 'with-desc': withDescription }"
          :style="{ display: center && !showIcon ? 'flow' : 'inline' }"
        >
          <slot name="title">{{ title }}</slot>
        </span>
        <p class="viz-alert__description">
          <slot>{{ description }}</slot>
        </p>
        <div class="viz-alert__close" v-if="closable">
          <viz-icon @click.stop="close" icon="xmark" />
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
@import './style.css';
</style>
