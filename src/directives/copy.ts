import type { Directive, DirectiveBinding } from 'vue';

interface CopyElement extends HTMLElement {
  __copyHandler__?: () => void;
  __copyBinding__?: DirectiveBinding<string>;
}

const copyText = async (text: string) => {
  if (!navigator.clipboard?.writeText) {
    throw new Error('Clipboard API unavailable');
  }
  await navigator.clipboard.writeText(text);
};

const attach = (el: CopyElement, binding: DirectiveBinding<string>) => {
  el.__copyBinding__ = binding;

  const handler = async () => {
    const current = el.__copyBinding__;
    if (!current) return;
    const text = String(current.value ?? '');
    try {
      await copyText(text);
      const label = current.arg ?? 'Copied!';
      el.title = label;
      if (current.modifiers.alert) {
        window.alert(label);
      }
    } catch {
      el.title = 'Copy failed';
    }
  };

  el.__copyHandler__ = handler;
  el.addEventListener('click', handler);
};

const detach = (el: CopyElement) => {
  if (el.__copyHandler__) {
    el.removeEventListener('click', el.__copyHandler__);
  }
  delete el.__copyHandler__;
  delete el.__copyBinding__;
};

export const copy: Directive<CopyElement, string> = {
  mounted: (el, binding) => {
    attach(el, binding);
  },
  updated: (el, binding) => {
    el.__copyBinding__ = binding;
  },
  unmounted: (el) => {
    detach(el);
  },
};
