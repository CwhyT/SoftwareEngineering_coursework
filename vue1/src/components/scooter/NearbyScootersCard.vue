<template>
  <div class="bg-white rounded-2xl shadow-xl p-8 mb-8">
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center space-x-4">
        <div class="bg-blue-100 p-4 rounded-xl">
          <ScooterIcon :size="32" color="#2563eb" />
        </div>
        <div>
          <h2 class="text-2xl font-semibold text-gray-800">Found <span class="text-blue-600">{{scooters.length}}</span> scooters nearby</h2>
          <p class="text-gray-500 mt-1">Nearest distance {{nearestDistance}}m, battery level sufficient</p>
        </div>
      </div>
      <router-link to="/rent" class="px-6 py-3 bg-blue-600 text-white rounded-xl text-lg font-medium hover:bg-blue-700 transition-colors">
        View All
      </router-link>
    </div>

    <!-- Scooter list -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="(scooter, index) in scooters" :key="index" class="group bg-gray-50 rounded-xl p-6 hover:bg-blue-50/80 transition-all">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center space-x-3">
            <div class="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200/80">
              <ScooterIcon :size="24" color="#2563eb" />
            </div>
            <div>
              <p class="font-medium text-gray-800">Scooter #{{10000+index}}</p>
              <p class="text-sm text-gray-500">Distance: {{scooter.distance}}m</p>
            </div>
          </div>
        </div>
        <router-link to="/scan" class="block w-full text-center py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
          Rent
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import ScooterIcon from '@/components/ScooterIcon.vue';

const props = defineProps({
  scooters: {
    type: Array,
    required: true
  }
});

const nearestDistance = computed(() => {
  return Math.min(...props.scooters.map(s => s.distance));
});
</script> 