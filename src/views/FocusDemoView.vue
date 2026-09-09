<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <main class="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-900">
    <div class="mx-auto max-w-xl space-y-6">
      <router-link to="/" class="text-sm text-zinc-500 hover:text-zinc-800">← Home</router-link>

      <header>
        <h1 class="text-2xl font-bold">v-focus</h1>
        <p class="mt-1 text-sm text-zinc-500">Registered globally in <code>main.ts</code></p>
      </header>

      <section class="space-y-2 rounded-lg border border-zinc-200 bg-white p-4">
        <h2 class="font-semibold">Basic focus</h2>
        <p class="text-sm text-zinc-600">No value / arg / modifiers — focuses on mount.</p>
        <input
          class="w-full rounded border border-zinc-300 px-3 py-2"
          type="text"
          value="I receive focus"
          v-focus
        />
      </section>

      <section class="space-y-2 rounded-lg border border-zinc-200 bg-white p-4">
        <h2 class="font-semibold">Modifier: <code>.select</code></h2>
        <p class="text-sm text-zinc-600">
          <span class="font-medium">modifiers</span> — <code>binding.modifiers.select</code> also
          selects the text.
        </p>
        <input
          class="w-full rounded border border-zinc-300 px-3 py-2"
          type="text"
          value="Selected on focus"
          v-focus.select
        />
      </section>
    </div>
  </main>
</template>
