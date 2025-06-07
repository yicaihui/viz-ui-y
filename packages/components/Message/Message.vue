<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import type { MessageCompInstance, MessageProps } from './types'
import { bind, delay } from 'lodash-es'
import { VizIcon } from '../Icon'
import { addUnit, RenderVnode, typeIconMap } from '@viz-ui-y/utils'
import { useEventListener, useOffset } from '@viz-ui-y/hooks'
import { getLastBottomOffset } from './methods'

defineOptions({ name: 'VizMessage' })
const props = withDefaults(defineProps<MessageProps>(), {
  type: 'info',
  duration: 3000,
  offset: 10,
  transitionName: 'fade-up'
})
//iconName
const iconName = computed(() => typeIconMap.get(props.type) ?? 'circle-info')
//visible
const visible = ref(false)
watch(visible, val => {
  if (!val) boxHeight.value = -props.offset // 使得退出的动画更加流畅
})
//timer
let timer: number
function startTimmer() {
  if (props.duration === 0) return
  timer = delay(close, props.duration)
}
function clearTimer() {
  clearTimeout(timer)
}
//计算高度
const boxHeight = ref(0)
const { topOffset, bottomOffset } = useOffset({
  offset: props.offset,
  boxHeight,
  getLastBottomOffset: bind(getLastBottomOffset, props)
})
const computedStyle = computed(() => ({
  top: addUnit(topOffset.value),
  zIndex: props.zIndex
}))
const messageRef = ref<HTMLElement>()
function close() {
  visible.value = false
}
onMounted(() => {
  visible.value = true
  startTimmer()
})
//按esc关闭
useEventListener(document, 'keydown', (e: Event) => {
  const { code } = e as KeyboardEvent
  if (code === 'Escape') close()
})

defineExpose<MessageCompInstance>({
  close,
  bottomOffset
})
</script>

<template>
  <Transition
    name="transitionName"
    @enter="boxHeight = messageRef!.getBoundingClientRect().height"
    @after-leave="!visible && onDestory()"
  >
    <div
      class="viz-message"
      v-show="visible"
      @mouseenter="clearTimer"
      @mouseleave="startTimmer"
      :class="{
        [`viz-message--${type}`]: type,
        'is-close': showClose,
        'text-center': center
      }"
      :style="computedStyle"
      role="alert"
      ref="messageRef"
    >
      <viz-icon class="viz-message__icon" :icon="iconName" />
      <div class="viz-message__content">
        <slot>
          <render-vnode v-if="message" :vNode="message" />
        </slot>
      </div>
      <div class="viz-message__close" v-if="showClose">
        <viz-icon icon="xmark" @click.stop="close" />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
@import './style.css';
</style>