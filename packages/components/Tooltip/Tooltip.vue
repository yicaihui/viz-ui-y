<!-- eslint-disable no-undef -->
<script setup lang="ts" >
import { computed, onUnmounted, ref, watch, watchEffect, type Ref } from 'vue'
import type { TooltipEmits, TooltipInstance, TooltipProps } from './types'
import { bind, debounce, type DebouncedFunc } from 'lodash-es'
import { createPopper, type Instance } from '@popperjs/core'
import { useClickOutside } from '@viz-ui-y/hooks'
import type { ButtonInstance } from '../Button'
import useEvenstToTiggerNode from './useEventsToTiggerNode'

defineOptions({
  name: 'VizTooltip'
})

interface _TooltipProps extends TooltipProps {
  virtualRef?: HTMLElement | ButtonInstance | void
  virtualTriggering?: boolean
}
const props = withDefaults(defineProps<_TooltipProps>(), {
  placement: 'bottom',
  trigger: 'hover',
  transition: 'fade',
  showTimeout: 0,
  hideTimeout: 200
})
const emits = defineEmits<TooltipEmits>()

const openDelay = computed(() =>
  props.trigger === 'hover' ? props.showTimeout : 0
)

const closeDelay = computed(() =>
  props.trigger === 'hover' ? props.hideTimeout : 0
)
//visible
const visible = ref(false)
const events: Ref<Record<string, EventListener>> = ref({})
const outerEvents: Ref<Record<string, EventListener>> = ref({})
const dropdownEvents: Ref<Record<string, EventListener>> = ref({})

const containerNode = ref<HTMLElement>()
const _triggerNode = ref<HTMLElement>()
const popperNode = ref<HTMLElement>()

const triggerNode = computed(() => {
  if (props.virtualTriggering)
    return (
      // @tips any 为了 fix 一个初始设计上的小失误 （后续重构 "虚拟目标节点" 时解决）
      ((props.virtualRef as ButtonInstance)?.ref as any) ??
      (props.virtualRef as HTMLElement) ??
      _triggerNode.value
    )
  return _triggerNode.value as HTMLElement
})

const popperOptions = computed(() => {
  return {
    placement: props.placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 9]
        }
      }
    ],
    ...props.popperOptions
  }
})
let popperInstance: Instance | null

watch(
  visible,
  val => {
    if (!val) return
    if (triggerNode.value && popperNode.value) {
      popperInstance = createPopper(
        triggerNode.value,
        popperNode.value,
        popperOptions.value
      )
    }
  },
  { flush: 'post' }
)
function destroyPopperInstance() {
  if (popperInstance) {
    popperInstance.destroy()
  }
}
let openDebounce: DebouncedFunc<() => void> | void
let closeDebounce: DebouncedFunc<() => void> | void

function openFinal() {
  closeDebounce?.cancel()
  openDebounce?.()
}

function closeFinal() {
  openDebounce?.cancel()
  closeDebounce?.()
}

function togglePopper() {
  if (visible.value) {
    closeFinal()
  } else {
    openFinal()
  }
}
function setVisible(val: boolean) {
  if (props.disabled) return
  visible.value = val
  emits('visible-change', val)
}
const triggerStrategyMap: Map<string, () => void> = new Map()
triggerStrategyMap.set('hover', () => {
  events.value['mouseenter'] = openFinal
  outerEvents.value['mouseleave'] = closeFinal
  dropdownEvents.value['mouseenter'] = openFinal
})
triggerStrategyMap.set('click', () => {
  events.value['click'] = togglePopper
})
triggerStrategyMap.set('contextmenu', () => {
  events.value['contextmenu'] = e => {
    e.preventDefault()
    openFinal()
  }
})
function attachEvents() {
  if (props.disabled || props.manual) return
  triggerStrategyMap.get(props.trigger)?.()
}
function resetEvents() {
  events.value = {}
  outerEvents.value = {}
  dropdownEvents.value = {}

  attachEvents()
}

if (!props.manual) {
  attachEvents()
}

watch(
  () => props.trigger,
  () => {
    resetEvents()
  }
)
//点击外部
useClickOutside(containerNode, () => {
  emits('click-outside')
  if (props.trigger == 'hover' || props.manual) return
  if (visible.value) closeFinal()
})
watchEffect(() => {
  openDebounce = debounce(bind(setVisible, null, true), openDelay.value)
  closeDebounce = debounce(bind(setVisible, null, false), closeDelay.value)
  attachEvents()
})
const show = () => openFinal()
const hide = () => closeFinal()

useEvenstToTiggerNode(props, triggerNode, events, () => {
  openDebounce?.cancel()
  setVisible(false)
})

onUnmounted(() => {
  destroyPopperInstance()
})
defineExpose<TooltipInstance>({
  show,
  hide
})
</script>
<template>
  <div class="viz-tooltip" ref="containerNode" v-on="outerEvents">
    <div
      class="viz-tooltip__trigger"
      ref="_triggerNode"
      v-on="events"
      v-if="!virtualTriggering"
    >
      <slot></slot>
    </div>
    <slot name="default" v-else></slot>
    <transition :name="transition" @after-leave="destroyPopperInstance">
      <div
        class="viz-tooltip__popper"
        ref="popperNode"
        v-on="dropdownEvents"
        v-if="visible"
      >
        <slot name="content">
          {{ content }}
        </slot>
        <div id="arrow" data-popper-arrow></div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
@import './style.css';
</style>