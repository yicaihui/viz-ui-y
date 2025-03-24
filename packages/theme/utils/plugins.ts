const generateCSSVariablesStyle = variables => {
  let css = ':root {\n'
  for (const key in variables) {
    css += `  --viz-color-${key}: ${variables[key]};\n`
  }
  css += '}\n'
  return css
}
export const themePlugin = {
  install(app, options) {
    // 将主题配置挂载到全局属性
    app.config.globalProperties.$vaColorConfig = options.colors
    //插入样式
    if (options.colors && options.colors.variables) {
      const cssContent = generateCSSVariablesStyle(options.colors.variables)
      const style = document.createElement('style')
      style.type = 'text/css'
      style.innerHTML = cssContent
      document.head.appendChild(style)
    }
  }
}
