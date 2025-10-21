import { message } from 'ant-design-vue';

import { i18n } from '@/locales';

export function showSuccessMessage(messageText = i18n.global.t('success')) {
  message.success(messageText);
}

export function showErrorMessage(messageText) {
  message.error(messageText);
}

export async function copyToClipboard(text, successText = i18n.global.t('success')) {
  await navigator.clipboard.writeText(text);
  showSuccessMessage(successText);
}

export function getQueryString(name, url) {
  const res = (url || location.href).match(new RegExp('[?&]' + name + '=([^&#]+)', 'i'));

  if (res === null || res.length < 1) {
    return null;
  }

  return decodeURIComponent(res[1]);
}

export function shuffle(array) {
  const items = array.slice();
  let t, r, i;

  for (i = items.length - 1; i > 0; i--) {
    r = Math.round(Math.random() * i);

    t = items[i];
    items[i] = items[r];
    items[r] = t;
  }

  return items;
}
