<template>
  <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Scooter handlebar -->
    <path d="M15 6h2a2 2 0 0 1 2 2v9" :stroke="color" :stroke-width="1.5" :stroke-linecap="round" :stroke-linejoin="round" />
    
    <!-- Scooter body -->
    <path d="M7 12h5l3 5" :stroke="color" :stroke-width="1.5" :stroke-linecap="round" :stroke-linejoin="round" />
    
    <!-- Scooter post -->
    <path d="M10 6v4" :stroke="color" :stroke-width="1.5" :stroke-linecap="round" :stroke-linejoin="round" />
    <path d="M8 6h4" :stroke="color" :stroke-width="1.5" :stroke-linecap="round" :stroke-linejoin="round" />
    
    <!-- Wheels -->
    <circle cx="7" cy="17" r="2" :stroke="color" :stroke-width="1.5" />
    <circle cx="17" cy="17" r="2" :stroke="color" :stroke-width="1.5" />
  </svg>
</template>

<script setup>
defineProps({
  size: {
    type: [Number, String],
    default: 24
  },
  color: {
    type: String,
    default: 'currentColor'
  }
});
</script>

<style scoped>
svg {
  vertical-align: middle;
  display: inline-block !important;
  visibility: visible !important;
  opacity: 1 !important;
}
</style> 