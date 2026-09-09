<script setup lang="ts">
import { RouterLink } from 'vue-router';

const demos = [
  {
    to: '/focus',
    title: 'v-focus',
    note: 'Global · modifiers (.select)',
  },
  {
    to: '/click-outside',
    title: 'v-click-outside',
    note: 'Global · value + modifiers (.mousedown / .mouseup)',
  },
  {
    to: '/copy',
    title: 'v-copy',
    note: 'Global · value + arg + modifiers (.alert)',
  },
  {
    to: '/debounce',
    title: 'v-debounce',
    note: 'Local · value + arg + modifiers (.input / .change)',
  },
  {
    to: '/lifecycle',
    title: 'v-lifecycle',
    note: 'Global · all lifecycle hooks',
  },
] as const;
</script>

<template>
  <main class="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-900">
    <div class="mx-auto max-w-2xl">
      <h1 class="text-3xl font-bold tracking-tight">vue-directives-demo</h1>
      <p class="mt-3 text-zinc-600">
        Custom Vue 3 directives with demos for
        <span class="font-medium text-zinc-800">value</span>,
        <span class="font-medium text-zinc-800">argument</span>, and
        <span class="font-medium text-zinc-800">modifiers</span>.
      </p>

      <ul class="mt-8 space-y-3">
        <li v-for="demo in demos" :key="demo.to">
          <router-link
            :to="demo.to"
            class="block rounded-lg border border-zinc-200 bg-white px-4 py-3 transition hover:border-zinc-400"
          >
            <span class="font-semibold">{{ demo.title }}</span>
            <span class="mt-1 block text-sm text-zinc-500">{{ demo.note }}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </main>
</template>
