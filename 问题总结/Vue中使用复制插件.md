>  npm install clipboard --save

```vue
<template>
  <div>
    <p id="CarKey">这里的内容可以被复制</p>
    <button class="btn" data-clipboard-target="#CarKey">Copy</button>
  </div>
</template>

<script setup>
import Clipboard from 'clipboard';
var clipboard = new Clipboard('.btn');
    
</script>


```

