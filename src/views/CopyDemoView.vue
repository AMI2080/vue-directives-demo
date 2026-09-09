<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const code = ref('npm install vue');
</script>

<template>
  <main class="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-900">
    <div class="mx-auto max-w-xl space-y-6">
      <router-link to="/" class="text-sm text-zinc-500 hover:text-zinc-800">← Home</router-link>

      <header>
        <h1 class="text-2xl font-bold">v-copy</h1>
        <p class="mt-1 text-sm text-zinc-500">Registered globally in <code>main.ts</code></p>
      </header>

      <section class="space-y-3 rounded-lg border border-zinc-200 bg-white p-4">
        <h2 class="font-semibold">value + arg + modifiers</h2>
        <ul class="list-inside list-disc text-sm text-zinc-600">
          <li>
            <span class="font-medium">value</span> — text to copy:
            <code>binding.value</code>
          </li>
          <li>
            <span class="font-medium">arg</span> — success label: <code>binding.arg</code> (hover
            title after copy)
          </li>
          <li>
            <span class="font-medium">modifiers</span> — <code>.alert</code> shows an alert with
            that label
          </li>
        </ul>

        <label class="block text-sm text-zinc-600">
          Text to copy
          <input
            v-model="code"
            class="mt-1 w-full rounded border border-zinc-300 px-3 py-2 font-mono text-sm"
            type="text"
          />
        </label>

        <button
          type="button"
          class="rounded bg-zinc-900 px-3 py-2 text-sm text-white"
          v-copy:Copied.alert="code"
        >
          Copy with <code>v-copy:Copied.alert</code>
        </button>

        <button
          type="button"
          class="ml-2 rounded border border-zinc-300 px-3 py-2 text-sm"
          v-copy="code"
        >
          Copy (value only)
        </button>
      </section>
    </div>
  </main>
</template>
