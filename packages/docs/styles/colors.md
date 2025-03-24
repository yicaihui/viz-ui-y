---
title: Colors
description: 颜色主题

next:
  link: /components/collapse
  text: Collapse 折叠面板

prev:
  link: /get-started
  text: 快速开始
---

# 定制主题色

可以灵活地修改或扩展现有颜色集，以及定义自己的自定义颜色预设。

```js
import VizElement from 'voz-ui-y'

const app = createApp(App)
app.use(
  VizElement(app, {
    colors: {
      primary: '#ff00ff'
    }
  })
)
app.mount('#app')
```
