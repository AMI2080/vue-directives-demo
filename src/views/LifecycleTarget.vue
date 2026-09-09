<script setup lang="ts">
import type {
  LifecycleHandler,
  LifecycleHookArgs,
  LifecycleHookName,
} from '@/directives/lifecycle';

defineProps<{
  count: number;
}>();

export type LifecycleArgsSummary = {
  el: { tagName: string; dataCount: string | null };
  binding: {
    arg: string | null | undefined;
    modifiers: Record<string, boolean>;
    value: string;
  };
  vnode: { type: string };
  prevVNode: { type: string } | null;
};

const emit = defineEmits<{
  hook: [hook: LifecycleHookName, summary: LifecycleArgsSummary];
}>();

const vnodeType = (vnode: LifecycleHookArgs['vnode']): string => {
  return typeof vnode.type === 'string' ? vnode.type : String(vnode.type);
};

const summarize = (args: LifecycleHookArgs): LifecycleArgsSummary => {
  return {
    el: {
      tagName: args.el.tagName,
      dataCount: args.el.getAttribute('data-count'),
    },
    binding: {
      arg: args.binding.arg,
      modifiers: { ...(args.binding.modifiers as Record<string, boolean>) },
      value: typeof args.binding.value === 'function' ? 'function' : String(args.binding.value),
    },
    vnode: { type: vnodeType(args.vnode) },
    prevVNode: args.prevVNode ? { type: vnodeType(args.prevVNode) } : null,
  };
};

const onHook: LifecycleHandler = (hook, args): void => {
  emit('hook', hook, summarize(args));
};
</script>

<template>
  <div
    v-lifecycle="onHook"
    :data-count="count"
    class="rounded border border-emerald-300 bg-emerald-50 p-4 text-sm"
  >
    Target element — count: {{ count }}
  </div>
</template>
