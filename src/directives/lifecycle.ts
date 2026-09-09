import type { Directive, DirectiveBinding, VNode } from 'vue';

export type LifecycleHookName =
  | 'created'
  | 'beforeMount'
  | 'mounted'
  | 'beforeUpdate'
  | 'updated'
  | 'beforeUnmount'
  | 'unmounted';

export type LifecycleHookArgs = {
  el: HTMLElement;
  binding: DirectiveBinding;
  vnode: VNode;
  prevVNode: VNode | null;
};

export type LifecycleHandler = (hook: LifecycleHookName, args: LifecycleHookArgs) => void;

const notify = (
  hook: LifecycleHookName,
  el: HTMLElement,
  binding: DirectiveBinding<LifecycleHandler | undefined>,
  vnode: VNode,
  prevVNode: VNode | null = null
): void => {
  binding.value?.(hook, {
    el,
    binding: binding as DirectiveBinding,
    vnode,
    prevVNode,
  });
};

export const lifecycle: Directive<HTMLElement, LifecycleHandler | undefined> = {
  created: (el, binding, vnode) => {
    notify('created', el, binding, vnode);
  },
  beforeMount: (el, binding, vnode) => {
    notify('beforeMount', el, binding, vnode);
  },
  mounted: (el, binding, vnode) => {
    notify('mounted', el, binding, vnode);
  },
  beforeUpdate: (el, binding, vnode, prevVNode) => {
    notify('beforeUpdate', el, binding, vnode, prevVNode);
  },
  updated: (el, binding, vnode, prevVNode) => {
    notify('updated', el, binding, vnode, prevVNode);
  },
  beforeUnmount: (el, binding, vnode) => {
    notify('beforeUnmount', el, binding, vnode);
  },
  unmounted: (el, binding, vnode) => {
    notify('unmounted', el, binding, vnode);
  },
};
