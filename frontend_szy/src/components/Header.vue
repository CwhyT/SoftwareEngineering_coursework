<template>
  <header class="bg-white shadow-sm py-4">
    <div class="container mx-auto px-4 flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <img src="@/assets/logo.png" alt="Logo" class="h-8 w-8">
        <h1 class="text-xl font-bold text-primary">电动滑板车租赁</h1>
      </div>
      <div class="flex items-center space-x-4">
        <slot name="actions"></slot>
      </div>
    </div>
  </header>
</template>

<script setup>
// 简单的Header组件
</script> 