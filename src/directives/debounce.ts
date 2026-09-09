import type { Directive, DirectiveBinding } from 'vue';

type DebounceHandler = (event: Event) => void;

interface DebounceElement extends HTMLElement {
  __debounceHandler__?: (event: Event) => void;
  __debounceEvent__?: string;
  __debounceTimer__?: ReturnType<typeof setTimeout>;
  __debounceCallback__?: DebounceHandler;
  __debounceDelay__?: number;
}

const resolveEventName = (binding: DirectiveBinding): string => {
  if (binding.modifiers.change) return 'change';
  if (binding.modifiers.input) return 'input';
  return 'input';
};

const resolveDelay = (binding: DirectiveBinding): number => {
  const fromArg = binding.arg ? Number(binding.arg) : NaN;
  return Number.isFinite(fromArg) && fromArg >= 0 ? fromArg : 300;
};

const attach = (el: DebounceElement, binding: DirectiveBinding<DebounceHandler>): void => {
  const eventName = resolveEventName(binding);
  const delay = resolveDelay(binding);
  el.__debounceCallback__ = binding.value;
  el.__debounceDelay__ = delay;

  const handler = (event: Event) => {
    if (el.__debounceTimer__) {
      clearTimeout(el.__debounceTimer__);
    }
    el.__debounceTimer__ = setTimeout(() => {
      el.__debounceCallback__?.(event);
    }, el.__debounceDelay__ ?? 300);
  };

  el.__debounceHandler__ = handler;
  el.__debounceEvent__ = eventName;
  el.addEventListener(eventName, handler);
};

const detach = (el: DebounceElement): void => {
  if (el.__debounceTimer__) {
    clearTimeout(el.__debounceTimer__);
  }
  if (el.__debounceHandler__ && el.__debounceEvent__) {
    el.removeEventListener(el.__debounceEvent__, el.__debounceHandler__);
  }
  delete el.__debounceHandler__;
  delete el.__debounceEvent__;
  delete el.__debounceTimer__;
  delete el.__debounceCallback__;
  delete el.__debounceDelay__;
};

export const debounce: Directive<DebounceElement, DebounceHandler> = {
  mounted: (el, binding) => {
    attach(el, binding);
  },
  updated: (el, binding) => {
    const nextEvent = resolveEventName(binding);
    const nextDelay = resolveDelay(binding);
    el.__debounceCallback__ = binding.value;
    el.__debounceDelay__ = nextDelay;

    if (el.__debounceEvent__ !== nextEvent) {
      detach(el);
      attach(el, binding);
    }
  },
  unmounted: (el) => {
    detach(el);
  },
};
