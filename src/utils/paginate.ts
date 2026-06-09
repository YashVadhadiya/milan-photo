import type { AppState } from '../types';

const A4_HEIGHT_PX = 1123;
const MARGIN_TOP = 50;
const MARGIN_BOTTOM = 50;
const HEADER_H = 140;
const HEADER_GAP = 14;
const FOOTER_H = 70;
const FOOTER_GAP = 14;
const BODY_AVAIL = A4_HEIGHT_PX - MARGIN_TOP - HEADER_H - HEADER_GAP - FOOTER_GAP - FOOTER_H - MARGIN_BOTTOM;

const CLIENT_H = 90;
const AMOUNT_H = 75;
const DAY_BASE_H = 95;
const DAY_ITEM_H = 30;
const DAY_GAP = 20;

function estimateDayHeight(day: { preProduction: { enabled: boolean }[]; postProduction: { enabled: boolean }[] }): number {
  const pre = day.preProduction.filter(i => i.enabled).length;
  const post = day.postProduction.filter(i => i.enabled).length;
  const items = Math.max(pre, post, 1);
  return DAY_BASE_H + items * DAY_ITEM_H;
}

export interface PageContent {
  dayIndices: number[];
  showClient: boolean;
  showAmount: boolean;
}

export function paginate(state: AppState): PageContent[] {
  const { eventDays, clientDetails, totalAmount } = state;
  const hasClient = !!(clientDetails.name || clientDetails.mobile || clientDetails.address || clientDetails.eventName || clientDetails.venue);
  const hasAmount = totalAmount != null && totalAmount > 0;

  const pages: PageContent[] = [];
  let curDays: number[] = [];
  let used = 0;

  const flush = (isLast: boolean) => {
    if (curDays.length === 0) return;
    const isFirst = pages.length === 0;
    pages.push({
      dayIndices: curDays,
      showClient: isFirst && hasClient,
      showAmount: isLast && hasAmount,
    });
    curDays = [];
    used = 0;
  };

  for (let i = 0; i < eventDays.length; i++) {
    const day = eventDays[i];
    const dh = estimateDayHeight(day);
    const isLast = i === eventDays.length - 1;
    const addAmount = isLast && hasAmount ? AMOUNT_H : 0;
    const addClient = pages.length === 0 && curDays.length === 0 && hasClient ? CLIENT_H : 0;
    const needed = dh + addAmount + addClient + (curDays.length > 0 ? DAY_GAP : 0);

    if (used + needed > BODY_AVAIL && curDays.length > 0) {
      flush(false);
      curDays = [i];
      const reClient = pages.length === 0 && hasClient ? CLIENT_H : 0;
      const reAmount = isLast && hasAmount ? AMOUNT_H : 0;
      used = dh + reClient + reAmount;
    } else {
      curDays.push(i);
      used += dh + (curDays.length > 1 ? DAY_GAP : 0) + addClient + addAmount;
    }
  }

  if (curDays.length > 0 || pages.length === 0) {
    const isFirst = pages.length === 0;
    const needsFlush = curDays.length > 0 || pages.length === 0;
    if (needsFlush) {
      if (curDays.length === 0 && eventDays.length > 0) {
        curDays = [eventDays.length - 1];
      }
      pages.push({
        dayIndices: curDays,
        showClient: isFirst && hasClient,
        showAmount: hasAmount && true,
      });
    }
  }

  if (pages.length === 0 && (hasClient || eventDays.length === 0)) {
    pages.push({ dayIndices: [], showClient: hasClient, showAmount: hasAmount });
  }

  return pages;
}
