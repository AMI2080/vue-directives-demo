import type { Directive, DirectiveBinding } from 'vue';

type ClickOutsideHandler = (event: Event) => void;

interface ClickOutsideElement extends HTMLElement {
  __clickOutsideHandler__?: (event: Event) => void;
  __clickOutsideEvent__?: string;
  __clickOutsideCallback__?: ClickOutsideHandler;
}

const resolveEventName = (binding: DirectiveBinding): string => {
  if (binding.modifiers.mousedown) return 'mousedown';
  if (binding.modifiers.mouseup) return 'mouseup';
  return 'click';
};

const attach = (el: ClickOutsideElement, binding: DirectiveBinding<ClickOutsideHandler>): void => {
  const eventName = resolveEventName(binding);
  el.__clickOutsideCallback__ = binding.value;

  const handler = (event: Event) => {
    const target = event.target as Node | null;
    if (!target || el.contains(target)) return;
    el.__clickOutsideCallback__?.(event);
  };

  el.__clickOutsideHandler__ = handler;
  el.__clickOutsideEvent__ = eventName;
  document.addEventListener(eventName, handler);
};

const detach = (el: ClickOutsideElement): void => {
  const eventName = el.__clickOutsideEvent__;
  const handler = el.__clickOutsideHandler__;
  if (eventName && handler) {
    document.removeEventListener(eventName, handler);
  }
  delete el.__clickOutsideHandler__;
  delete el.__clickOutsideEvent__;
  delete el.__clickOutsideCallback__;
};

export const clickOutside: Directive<ClickOutsideElement, ClickOutsideHandler> = {
  mounted: (el, binding) => {
    attach(el, binding);
  },
  updated: (el, binding) => {
    el.__clickOutsideCallback__ = binding.value;
    const nextEvent = resolveEventName(binding);
    if (el.__clickOutsideEvent__ !== nextEvent) {
      detach(el);
      attach(el, binding);
    }
  },
  unmounted: (el) => {
    detach(el);
  },
};
