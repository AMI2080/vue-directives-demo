<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const open = ref<boolean>(true);
const lastEvent = ref<string>('—');

const close = (event: Event): void => {
  open.value = false;
  lastEvent.value = event.type;
};

const reopen = (event: Event): void => {
  event.stopPropagation();
  open.value = true;
  lastEvent.value = '—';
};
</script>

<template>
  <main class="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-900">
    <div class="mx-auto max-w-xl space-y-6">
      <router-link to="/" class="text-sm text-zinc-500 hover:text-zinc-800">← Home</router-link>

      <header>
        <h1 class="text-2xl font-bold">v-click-outside</h1>
        <p class="mt-1 text-sm text-zinc-500">Registered globally in <code>main.ts</code></p>
      </header>

      <section class="space-y-3 rounded-lg border border-zinc-200 bg-white p-4">
        <h2 class="font-semibold">value + modifiers</h2>
        <ul class="list-inside list-disc text-sm text-zinc-600">
          <li>
            <span class="font-medium">value</span> — callback:
            <code>binding.value</code>
          </li>
          <li>
            <span class="font-medium">modifiers</span> — <code>.mousedown</code> /
            <code>.mouseup</code> (default <code>click</code>)
          </li>
        </ul>

        <p class="text-sm text-zinc-500">Last outside event: {{ lastEvent }}</p>

        <div v-if="open" class="space-y-3">
          <div
            v-click-outside.mousedown="close"
            class="rounded border border-emerald-300 bg-emerald-50 p-4"
          >
            Panel with <code>v-click-outside.mousedown="close"</code>. Click outside to close.
          </div>
        </div>
        <button
          v-else
          type="button"
          class="rounded bg-zinc-900 px-3 py-2 text-sm text-white"
          @click="reopen"
        >
          Reopen panel
        </button>
      </section>
    </div>
  </main>
</template>
