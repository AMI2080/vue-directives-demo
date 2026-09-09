import type { Directive } from 'vue';

export const focus: Directive<HTMLElement> = {
  mounted: (el, binding) => {
    el.focus();
    if (binding.modifiers.select && 'select' in el) {
      (el as HTMLInputElement).select();
    }
  },
};
