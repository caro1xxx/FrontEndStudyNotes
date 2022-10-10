> 使用 `ref` attribute 为子组件或 HTML 元素指定引用 ID

```vue
<input ref="input" />
```

```javascript
methods: {
    focusInput() {
      this.$refs.input.focus()
    }
  },
  mounted() {
    this.focusInput()
  }
```

> **`$refs` 只会在组件渲染完成之后生效。这仅作为一个用于直接操作子元素的“逃生舱”——你应该避免在模板或计算属性中访问 `$refs`。**

