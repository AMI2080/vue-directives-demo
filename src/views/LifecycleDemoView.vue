<script setup lang="ts">
import { ref } from 'vue';
import type { LifecycleHookName } from '@/directives/lifecycle';
import LifecycleTarget from './LifecycleTarget.vue';
import type { LifecycleArgsSummary } from './LifecycleTarget.vue';

const visible = ref<boolean>(true);
const count = ref<number>(0);
const log = ref<{ id: number; hook: LifecycleHookName; args: LifecycleArgsSummary }[]>([]);

let nextId: number = 1;

const onHook = (hook: LifecycleHookName, summary: LifecycleArgsSummary): void => {
  log.value.push({ id: nextId++, hook, args: summary });
};

const mountTarget = (): void => {
  visible.value = true;
};

const unmountTarget = (): void => {
  visible.value = false;
};

const bumpCount = (): void => {
  count.value += 1;
};

const clearLog = (): void => {
  log.value = [];
};
</script>

<template>
  <main class="min-h-screen bg-zinc-50 px-6 py-10 pb-1 text-zinc-900">
    <div class="mx-auto max-w-2xl space-y-6">
      <router-link to="/" class="text-sm text-zinc-500 hover:text-zinc-800">← Home</router-link>

      <div class="grid gap-6 lg:grid-cols-[minmax(0,18rem)_1fr] lg:items-start">
        <div class="space-y-6">
          <header>
            <h1 class="text-2xl font-bold">v-lifecycle</h1>
            <p class="mt-1 text-sm text-zinc-500">
              Registered globally in <code>main.ts</code> — implements all directive hooks
            </p>
          </header>

          <section class="space-y-3 rounded-lg border border-zinc-200 bg-white p-4">
            <h2 class="font-semibold">Trigger hooks</h2>
            <ul class="list-inside list-disc text-sm text-zinc-600">
              <li><span class="font-medium">Mount</span> → created, beforeMount, mounted</li>
              <li><span class="font-medium">Update</span> → beforeUpdate, updated</li>
              <li><span class="font-medium">Unmount</span> → beforeUnmount, unmounted</li>
            </ul>
            <p class="text-sm text-zinc-600">
              Each hook receives <code>(el, binding, vnode, prevVNode)</code>.
              <code>beforeUpdate</code> / <code>updated</code> get a previous vnode; other hooks get
              <code>prevVNode: null</code>.
            </p>

            <div class="flex flex-wrap gap-2">
              <button
                type="button"
                class="rounded bg-zinc-900 px-3 py-2 text-sm text-white disabled:opacity-40"
                :disabled="visible"
                @click="mountTarget"
              >
                Mount
              </button>
              <button
                type="button"
                class="rounded border border-zinc-300 px-3 py-2 text-sm disabled:opacity-40"
                :disabled="!visible"
                @click="bumpCount"
              >
                Update (count++)
              </button>
              <button
                type="button"
                class="rounded border border-zinc-300 px-3 py-2 text-sm disabled:opacity-40"
                :disabled="!visible"
                @click="unmountTarget"
              >
                Unmount
              </button>
              <button
                type="button"
                class="rounded border border-zinc-300 px-3 py-2 text-sm"
                @click="clearLog"
              >
                Clear log
              </button>
            </div>

            <lifecycle-target v-if="visible" :count="count" @hook="onHook" />
            <p v-else class="text-sm text-zinc-500">Target is unmounted.</p>
          </section>
        </div>

        <section
          class="flex h-[calc(50vh-2rem)] min-h-0 flex-col gap-2 rounded-lg border border-zinc-200 bg-white p-4 pe-2 lg:h-[calc(100vh-5rem)] lg:max-h-none"
        >
          <h2 class="shrink-0 font-semibold">Hook log (oldest → newest)</h2>
          <ol
            v-if="log.length"
            class="min-h-0 flex-1 space-y-2 overflow-y-auto pe-2 font-mono text-xs"
          >
            <li v-for="entry in log" :key="entry.id" class="rounded bg-zinc-100 p-2">
              <details>
                <summary class="cursor-pointer text-sm font-semibold">
                  {{ entry.id }}. {{ entry.hook }}
                </summary>
                <pre class="mt-1 overflow-x-auto whitespace-pre-wrap text-zinc-600">{{
                  JSON.stringify(entry.args, null, 2)
                }}</pre>
              </details>
            </li>
          </ol>
          <p v-else class="text-sm text-zinc-500">No hooks logged yet.</p>
        </section>
      </div>
    </div>
  </main>
</template>
