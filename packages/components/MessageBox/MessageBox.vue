<script setup lang="ts">
import { useZIndex, useId } from '@viz-ui-y/hooks'
import { typeIconMap } from '@viz-ui-y/utils'
import type { MessageBoxAction, MessageBoxProps } from './types'
import VizOverlay from '../Overlay/Overlay.vue'
import VizIcon from '../Icon/Icon.vue'
import VizButton from '../Button/Button.vue'
import VizInput from '../Input/Input.vue'
import { isFunction, isNil } from 'lodash-es'
import { computed, nextTick, reactive, ref, watch, type Ref } from 'vue'
import type { InputInstance } from '../Input'

defineOptions({ name: 'VizMessageBox' })
const props = withDefaults(defineProps<MessageBoxProps>(), {
  lockScroll: true,
  showClose: true,
  closeOnClickModal: true,
  confirmButtonType: 'primary',
  roundButton: false,
  boxType: '',
  inputValue: '',
  inputPlaceholder: 'Please input...',
  confirmButtonText: 'Ok',
  cancelButtonText: 'Cancel',
  showConfirmButton: true
})
const { nextZIndex } = useZIndex()
const state = reactive({
  ...props,
  zIndex: nextZIndex()
})
const hasMessage = computed(() => !!state.message)
const iconComponent = computed(
  () => state.icon ?? typeIconMap.get(state.type ?? '')
)
const headerRef = ref<HTMLElement>()
const inputRef = ref<InputInstance>()
const inputId = useId()
function handleWrapperClick() {
  props.closeOnClickModal && handleAction('close')
}
const { doAction } = props
function handleAction(action: MessageBoxAction) {
  isFunction(props.beforeClose)
    ? props.beforeClose(action, state, () => doAction(action, state.inputValue))
    : doAction(action, state.inputValue)
}
//键盘
function handleInputEnter(e: KeyboardEvent) {
  if (state.inputType === 'textarea') return
  e.preventDefault()
  return handleAction('confirm')
}
//自动聚焦
watch(
  () => props.visible?.value,
  val => {
    if (val) state.zIndex = nextZIndex()

    if (props.boxType !== 'prompt') return

    if (!val) return

    nextTick(() => {
      inputRef.value && inputRef.value.focus()
    })
  }
)
function handleClose() {
  handleAction('close')
}
</script>

<template>
  <transition name="fade-in-linear" @after-leave="destroy">
    <viz-overlay v-show="(visible as Ref).value" :z-index="state.zIndex" mask>
      <div
        role="dialog"
        class="viz-overlay-message-box"
        @click="handleWrapperClick"
      >
        <div
          ref="rootRef"
          :class="[
            'viz-message-box',
            {
              'is-center': state.center
            }
          ]"
          @click.stop
        >
          <div
            v-if="!isNil(state.title)"
            ref="headerRef"
            class="viz-message-box__header"
            :class="{ 'show-close': state.showClose }"
          >
            <div class="viz-message-box__title">
              <viz-icon
                v-if="iconComponent && state.center"
                :class="{
                  [`viz-icon-${state.type}`]: state.type
                }"
                :icon="iconComponent"
              />
              {{ state.title }}
            </div>
            <viz-button
              v-if="showClose"
              class="viz-message-box__header-btn"
              @click.stop="handleClose"
            >
              <viz-icon icon="xmark" />
            </viz-button>
          </div>
          <div class="viz-message-box__content">
            <viz-icon
              v-if="iconComponent && !state.center && hasMessage"
              :class="{
                [`viz-icon-${state.type}`]: state.type
              }"
              :icon="iconComponent"
            />
            <div v-if="hasMessage" class="viz-message-box__message">
              <slot>
                <component
                  :is="state.showInput ? 'label' : 'p'"
                  :for="state.showInput ? inputId : void 0"
                >
                  {{ state.message }}
                </component>
              </slot>
            </div>
          </div>
          <div v-show="state.showInput" class="viz-message-box__input">
            <viz-input
              v-model="state.inputValue"
              ref="inputRef"
              :placeholder="state.inputPlaceholder"
              :type="state.inputType"
              @keyup.enter="handleInputEnter"
            />
          </div>
          <div class="viz-message-box__footer">
            <viz-button
              v-if="state.showCancelButton"
              class="viz-message-box__footer-btn viz-message-box__cancel-btn"
              :type="state.cancelButtonType"
              :round="state.roundButton"
              :loading="state.cancelButtonLoading"
              @click="handleAction('cancel')"
              @keydown.prevent.enter="handleAction('cancel')"
              >{{ state.cancelButtonText }}</viz-button
            >
            <viz-button
              v-show="state.showConfirmButton"
              class="viz-message-box__footer-btn viz-message-box__confirm-btn"
              :type="state.confirmButtonType ?? 'primary'"
              :round="state.roundButton"
              :loading="state.confirmButtonLoading"
              @click="handleAction('confirm')"
              @keydown.prevent.enter="handleAction('confirm')"
              >{{ state.confirmButtonText }}</viz-button
            >
          </div>
        </div>
      </div>
    </viz-overlay>
  </transition>
</template>

<style scoped>
@import './style.css';
</style>