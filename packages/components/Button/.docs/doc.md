# 功能点设计：组件库按钮组件

## 1. 功能描述

按钮组件是用户界面中最基本且重要的交互元素之一。该按钮组件旨在提供高度可定制、易于使用、性能优异且符合可访问性标准的用户交互能力。它将支持多种样式类型、尺寸、状态（禁用、加载、激活）、图标以及灵活的自定义能力，以适应各种业务场景和设计系统。

## 2. API 设计 (Vue 3 Composition API / TypeScript)

我们将采用 Vue 3 的 Composition API 风格进行 API 设计，结合 TypeScript 提供完整的类型支持。

```typescript
// src/components/Button/index.vue (script setup 语法)

<script setup lang="ts">
import { computed, useSlots, PropType } from 'vue';

// 定义按钮的通用尺寸
type ButtonSize = 'small' | 'medium' | 'large' | 'custom';

// 定义按钮的通用类型
type ButtonType =
  | 'primary' // 主要操作
  | 'secondary' // 次要操作
  | 'dashed' // 虚线按钮
  | 'text' // 文本按钮
  | 'link' // 链接按钮
  | 'danger'; // 危险操作

// 定义加载动画类型
type LoadingIndicator = 'spinner' | 'dots' | 'custom';

interface ButtonProps {
  /**
   * 按钮的类型，用于定义基础样式。
   * @default 'secondary'
   */
  type?: ButtonType;
  /**
   * 按钮的尺寸。
   * @default 'medium'
   */
  size?: ButtonSize;
  /**
   * 按钮是否禁用。
   * @default false
   */
  disabled?: boolean;
  /**
   * 按钮是否处于加载状态。
   * @default false
   */
  loading?: boolean;
  /**
   * 加载状态下的指示器类型。
   * 如果设置为 'custom'，需要通过 `loadingIcon` 插槽提供自定义内容。
   * @default 'spinner'
   */
  loadingIndicator?: LoadingIndicator;
  /**
   * 自定义加载文案，仅在 `loading` 为 true 时显示。
   */
  loadingText?: string;
  /**
   * 按钮是否宽度占满父容器。
   * @default false
   */
  block?: boolean;
  /**
   * 当按钮用作链接时，指定 `href` 属性。
   */
  href?: string;
  /**
   * HTML `type` 属性，当按钮作为 `<button>` 元素时有效。
   * @default 'button'
   */
  htmlType?: 'button' | 'submit' | 'reset';
  /**
   * 自定义按钮的颜色方案 (例如 'red', 'blue')，用于主题定制。
   * 优先级低于直接的 style 和 class。
   */
  colorScheme?: string;
  /**
   * 是否显示点击水波纹效果。
   * @default false
   */
  ripple?: boolean;
  /**
   * 用于提供禁用提示的 Tooltip 内容，当 `disabled` 为 true 时显示。
   */
  disabledTooltip?: string | any; // 使用 any 兼容 Vue 组件类型
}

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'secondary',
  size: 'medium',
  disabled: false,
  loading: false,
  loadingIndicator: 'spinner',
  block: false,
  htmlType: 'button',
  ripple: false,
});

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const slots = useSlots();

// 内部计算属性，判断是否真正禁用
const isDisabled = computed(() => props.disabled || props.loading);

// 渲染的根标签
const tag = computed(() => (props.href ? 'a' : 'button'));

// 按钮的类名
const buttonClasses = computed(() => [
  'y-button', // 基础类名
  `y-button--${props.type}`,
  `y-button--${props.size}`,
  { 'is-disabled': isDisabled.value },
  { 'is-loading': props.loading },
  { 'is-block': props.block },
  // ... 其他根据 colorScheme, ripple 等添加的类
]);

const handleClick = (event: MouseEvent) => {
  if (isDisabled.value) {
    event.preventDefault(); // 阻止点击事件传播
    return;
  }
  emit('click', event);
};

</script>

<template>
  <component
    :is="tag"
    :class="buttonClasses"
    :href="href && !isDisabled ? href : undefined"
    :type="tag === 'button' ? htmlType : undefined"
    :disabled="tag === 'button' ? isDisabled : undefined"
    :aria-disabled="isDisabled ? 'true' : undefined"
    :aria-busy="loading ? 'true' : undefined"
    @click="handleClick"
  >
    <template v-if="loading">
      <slot name="loadingIcon">
        <span v-if="loadingIndicator === 'spinner'" class="y-button__spinner"></span>
        <span v-else-if="loadingIndicator === 'dots'" class="y-button__dots">...</span>
        </slot>
      <span v-if="loadingText" class="y-button__loading-text">{{ loadingText }}</span>
      <span v-else-if="!slots.default && !loadingText" class="y-button__loading-text">加载中...</span>
    </template>

    <template v-else>
      <slot name="prefixIcon"></slot>
      <slot></slot>
      <slot name="suffixIcon"></slot>
    </template>

    <template v-if="isDisabled && disabledTooltip">
      </template>
  </component>
</template>

<style lang="scss">
/* 基础样式和变量 */
:root {
  --y-button-primary-bg: #409eff;
  --y-button-primary-color: #fff;
  // ... 其他 Design Tokens
}

.y-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 15px;
  border: 1px solid transparent;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap; // 防止文本换行

  /* 类型样式 */
  &--primary {
    background-color: var(--y-button-primary-bg);
    color: var(--y-button-primary-color);
    &:hover {
      background-color: darken(var(--y-button-primary-bg), 10%);
    }
  }
  &--secondary { /* ... */ }
  &--dashed { /* ... */ }
  &--text { /* ... */ }
  &--link { /* ... */ }
  &--danger { /* ... */ }

  /* 尺寸样式 */
  &--small { /* ... */ }
  &--medium { /* ... */ }
  &--large { /* ... */ }

  /* 状态样式 */
  &.is-disabled {
    cursor: not-allowed;
    opacity: 0.6;
    pointer-events: none; // 防止点击事件，即使没有显式禁用 attribute
  }

  &.is-loading {
    .y-button__spinner,
    .y-button__dots {
      margin-right: 5px; /* 加载图标和文本间距 */
    }
  }

  /* 块级按钮 */
  &.is-block {
    width: 100%;
  }

  /* 图标 */
  &__prefix-icon,
  &__suffix-icon {
    display: inline-flex;
    align-items: center;
    // 间距
    &:not(:empty) {
      &:first-child:not(:last-child) {
        margin-right: 5px;
      }
      &:last-child:not(:first-child) {
        margin-left: 5px;
      }
    }
  }

  /* 加载指示器动画 */
  &__spinner {
    // 旋转动画 CSS
  }
  &__dots {
    // 点点动画 CSS
  }
}
</style>
```

## 3. 交互关系

- **点击**: 用户点击按钮时触发 `click` 事件。
- **悬停 (Hover)**: 鼠标悬停在按钮上时，按钮样式（如背景色、边框、阴影）发生变化，给出可点击反馈。
- **按下 (Active)**: 鼠标按下按钮时，按钮样式发生变化，表示正在被激活。
- **焦点 (Focus)**: 按钮获得焦点时，显示清晰的焦点环，支持键盘导航。
- **禁用 (Disabled)**:
  - 按钮视觉上呈现灰色或半透明，表示不可点击。
  - 鼠标悬停时，光标变为“禁止”符号。
  - 点击事件不触发 (`event.preventDefault()`)。
  - 如果设置了 `disabledTooltip`，鼠标悬停在禁用按钮上时，显示 Tooltip 提示禁用原因。
  - 对于 `<button>` 元素，设置 `disabled` HTML 属性；对于 `<a>` 元素，设置 `aria-disabled="true"` 并阻止默认导航行为。
- **加载状态交互**:
  - 当 `loading` 属性为 `true` 时，按钮自动进入禁用状态。
  - 按钮内部显示加载指示器 (`loadingIndicator` 插槽或默认图标)。
  - 如果 `loadingText` 存在，则显示 `loadingText`，否则显示 `加载中...` 或空字符串。
  - 默认内容 (`<slot>`) 在加载时会被加载指示器和文本替换。
- **链接按钮 (`href` 属性)**:
  - 当 `href` 存在时，按钮渲染为 `<a>` 标签，行为与标准 `<a>` 标签一致。
  - 如果 `disabled` 为 `true`，则 `href` 属性不渲染，并添加 `aria-disabled="true"`，通过 JavaScript 阻止点击。
- **图标交互**:
  - 通过 `prefixIcon` 和 `suffixIcon` 命名插槽或 `icon` / `suffixIcon` prop 传入图标内容。
  - 图标与文本之间保持适当间距。

## 4. 功能实现细节

### 4.1 核心结构与样式层

- **组件根元素**: 使用 `<component :is="tag">` 实现动态渲染 `<button>` 或 `<a>` 标签。
- **样式方案**:
  - **CSS 变量**: 在 `:root` 或组件内部定义 CSS 变量，如 `--y-button-primary-bg`，方便全局主题配置和局部覆盖。
  - **BEM 命名规范**: 采用 `y-button`, `y-button--type`, `y-button__element`, `is-state` 等 BEM 风格类名，提高可维护性和可扩展性。
  - **CSS 预处理器**: 可以使用 SASS/LESS 等预处理器，实现样式的嵌套、变量、混合等。
  - **Tailwind CSS (可选)**: 如果项目使用 Tailwind CSS，可以直接在模板中使用 Tailwind 类名，并通过 `props` 动态绑定。
- **条件样式**: 根据 `props` 动态绑定 CSS 类名，如 `:class="{ 'is-disabled': isDisabled, 'is-loading': loading }" `。

### 4.2 状态管理

- **`isDisabled` 计算属性**: 统一处理 `disabled` 和 `loading` 两种禁用情况。
- **加载状态**:
  - `v-if="loading"` 控制加载状态内容的显示。
  - 内置默认的 Spinner 或 Dots 动画，或通过 `loadingIcon` 插槽完全自定义。
  - 加载状态下，通过 `pointer-events: none;` 和 `cursor: not-allowed;` 确保用户无法点击。

### 4.3 内容渲染

- **默认插槽 (`<slot>`)**: 渲染按钮的文本内容。
- **命名插槽 (`<slot name="prefixIcon">`, `<slot name="suffixIcon">`, `<slot name="loadingIcon">`)**: 提供了高度灵活的自定义能力，允许用户传入任何 Vue 组件、HTML 元素或纯文本作为图标或加载指示器。
- **条件渲染**: 使用 `v-if` / `v-else` 控制加载状态和正常状态的内容显示。

### 4.4 可访问性 (Accessibility)

- **语义化 HTML**: 根据 `href` 属性动态渲染 `<a>` 或 `<button>`，确保语义正确性。
- **WAI-ARIA 属性**:
  - `:aria-disabled="isDisabled ? 'true' : undefined"`: 告知屏幕阅读器按钮是否禁用。
  - `:aria-busy="loading ? 'true' : undefined"`: 告知屏幕阅读器按钮处于忙碌状态。
  - **图标按钮**: 如果按钮只有图标没有文本，建议强制要求用户提供 `aria-label` 属性，或提供一个 `tooltip` 作为替代。
- **键盘导航**: 默认支持 Tab 键聚焦和 Enter/Space 键触发点击。
- **焦点样式**: 使用 `:focus-visible` 伪类提供清晰且符合可访问性标准的焦点指示。
- **对比度**: 确保按钮文本和背景颜色具有足够的对比度。

### 4.5 性能优化

- **Tree Shaking**: Vue CLI 或 Vite 会自动支持 Tree Shaking，确保只打包用到的组件和代码。
- **CSS 优化**: 压缩 CSS，避免不必要的样式冗余。
- **动画优化**: 优先使用 `transform` 和 `opacity` 进行动画，避免触发回流和重绘，提升性能。
- **组件懒加载**: 对于复杂的组件库，可以考虑按需加载组件。

### 4.6 TypeScript 支持

- 使用 `defineProps<ButtonProps>()` 和 `withDefaults` 提供完整的 `props` 类型定义、默认值和 IDE 提示。
- `defineEmits` 定义事件类型。
- 使用 `PropType` 来定义复杂类型的 prop。

### 4.7 主题集成

- 利用 CSS 变量作为 Design Tokens 的实现方式，允许用户通过修改 CSS 变量来轻松定制按钮样式。
- 可以提供一个全局的 Vue Plugin 或 Composition Function，用于配置组件库的默认主题变量，例如：

  ```typescript
  // main.ts
  import { createApp } from 'vue'
  import App from './App.vue'
  import Button from './components/Button' // 假设这是你的组件库入口

  const app = createApp(App)
  app.use(Button, {
    theme: {
      primaryColor: '#6200EE'
      // ... 其他 Design Tokens
    }
  })
  app.mount('#app')
  ```

  然后在组件内部通过 `inject` 获取这些主题变量。

## 5. 用户操作流程 (示例)

### 5.1 基本按钮点击

1.  用户在界面上看到一个可点击的按钮。
2.  鼠标悬停，按钮样式变化（如背景变深）。
3.  用户点击按钮。
4.  按钮触发 `@click` 事件，执行相应业务逻辑。
5.  如果配置了 `ripple` 效果，按钮中心向外扩散水波纹。

### 5.2 提交表单按钮

1.  用户填写表单。
2.  点击提交按钮 (`htmlType="submit"`)。
3.  按钮立即进入 `loading` 状态：
    - 按钮文字可能变为“提交中...” (如果设置 `loadingText`)。
    - 按钮显示加载图标。
    - 按钮自动禁用，防止用户重复点击。
4.  后端请求发送。
5.  请求成功或失败后，业务逻辑解除 `loading` 状态。
6.  按钮恢复原始样式和可点击状态。

### 5.3 禁用按钮及其提示

1.  用户看到一个禁用的按钮（如“删除”按钮，在未选择任何项时）。
2.  按钮呈现灰色或半透明。
3.  鼠标悬停，光标变为“禁止”符号。
4.  如果设置了 `disabledTooltip`，鼠标悬停时会显示 Tooltip 提示“请先选择要删除的项”。
5.  用户尝试点击，无任何响应。

## 6. 异常处理

- **无效的 `type`/`size` 值**:
  - 通过 `withDefaults` 提供默认值，并通过 TypeScript 在开发时捕获类型错误。
- **插槽内容为空**:
  - 如果 `<slot>` 为空，或 `prefixIcon/suffixIcon` 插槽为空，确保按钮的布局和样式仍然正确。
- **`href` 与 `htmlType` 冲突**:
  - 在 `tag` 计算属性中，如果 `href` 存在，则强制渲染为 `<a>` 标签，并忽略 `htmlType`。
- **性能瓶颈**:
  - 利用 Vue Devtools 的性能分析功能，监控组件渲染性能。
  - 避免在模板中进行复杂计算，将它们移至 `computed` 属性。
- **可访问性检查**:
  - 集成 `eslint-plugin-vuejs-a11y` 等 Vue 特定的 ESLint 插件进行静态代码分析。
  - 进行实际的屏幕阅读器和键盘导航测试。
- **用户自定义样式冲突**:
  - 确保组件的基础样式可以通过 `class` 和 `style` 属性轻松覆盖。Vue 提供了 `v-bind="$attrs"` 自动传递非 Props 属性到根元素。
