<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { debounce } from '@/directives/debounce';

const vDebounce = debounce;

const query = ref<string>('');
const results = ref<string[]>([]);
const changeLog = ref<string>('—');

const onSearch = (event: Event): void => {
  const value = (event.target as HTMLInputElement).value;
  query.value = value;
  results.value = value
    ? [`Result for “${value}” #1`, `Result for “${value}” #2`, `Result for “${value}” #3`]
    : [];
};

const onChange = (event: Event): void => {
  const value = (event.target as HTMLInputElement).value;
  changeLog.value = value || '(empty)';
};
</script>

<template>
  <main class="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-900">
    <div class="mx-auto max-w-xl space-y-6">
      <router-link to="/" class="text-sm text-zinc-500 hover:text-zinc-800">← Home</router-link>

      <header>
        <h1 class="text-2xl font-bold">v-debounce</h1>
        <p class="mt-1 text-sm text-zinc-500">
          Registered locally in this view (<code>const vDebounce = debounce</code>)
        </p>
      </header>

      <section class="space-y-3 rounded-lg border border-zinc-200 bg-white p-4">
        <h2 class="font-semibold">value + arg + modifiers</h2>
        <ul class="list-inside list-disc text-sm text-zinc-600">
          <li>
            <span class="font-medium">value</span> — handler:
            <code>binding.value</code>
          </li>
          <li>
            <span class="font-medium">arg</span> — delay ms: <code>binding.arg</code> (default
            <code>300</code>)
          </li>
          <li>
            <span class="font-medium">modifiers</span> — event: <code>.input</code> /
            <code>.change</code> (default <code>input</code>)
          </li>
        </ul>

        <label class="block text-sm text-zinc-600">
          Search (<code>v-debounce:500.input="onSearch"</code>)
          <input
            class="mt-1 w-full rounded border border-zinc-300 px-3 py-2"
            type="search"
            placeholder="Type to search…"
            v-debounce:500.input="onSearch"
          />
        </label>

        <p class="text-sm text-zinc-500">Debounced query: {{ query || '—' }}</p>
        <ul v-if="results.length" class="space-y-1 text-sm">
          <li v-for="item in results" :key="item" class="rounded bg-zinc-100 px-2 py-1">
            {{ item }}
          </li>
        </ul>
      </section>

      <section class="space-y-3 rounded-lg border border-zinc-200 bg-white p-4">
        <h2 class="font-semibold">modifier: <code>.change</code></h2>
        <p class="text-sm text-zinc-600">
          Fires after blur/commit:
          <code>v-debounce:200.change="onChange"</code>
        </p>
        <input
          class="w-full rounded border border-zinc-300 px-3 py-2"
          type="text"
          placeholder="Edit then leave the field"
          v-debounce:200.change="onChange"
        />
        <p class="text-sm text-zinc-500">Last change value: {{ changeLog }}</p>
      </section>
    </div>
  </main>
</template>
