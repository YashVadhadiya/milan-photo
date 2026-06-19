import type { AppState } from '../types';

const A4_HEIGHT_PX = 1123;
const MARGIN_TOP = 57;      // 15mm outer padding
const MARGIN_BOTTOM = 30;   // 8mm outer padding
const HEADER_H = 82;        // 65px div + 11pt padding-bottom + 1.6pt border
const HEADER_GAP = 16;      // 12pt margin-bottom
const FOOTER_H = 75;        // 6pt padding + 1.3pt border + ~65px content
const FOOTER_GAP = 10;      // buffer between content and footer
const BODY_AVAIL = A4_HEIGHT_PX - MARGIN_TOP - HEADER_H - HEADER_GAP - FOOTER_H - FOOTER_GAP - MARGIN_BOTTOM;

// Content height estimates (in pixels, matching actual CSS rendering at 96 DPI)
const CLIENT_H = 150;
const AMOUNT_H = 85;
const DAY_BASE_H = 100;     // header + inner padding + service title
const DAY_ITEM_H = 33;      // per enabled item in the taller column
const DAY_GAP = 12;         // gap between day sections

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
  isLastPage?: boolean;
}

export function paginate(state: AppState): PageContent[] {
  const { eventDays, clientDetails, totalAmount, advanceAmount } = state;
  const hasClient = !!(clientDetails.name || clientDetails.mobile || clientDetails.address || clientDetails.eventDate || clientDetails.quotationDate);
  const hasAmount = totalAmount != null && totalAmount > 0;
  const hasAdvance = advanceAmount != null && advanceAmount > 0;
  const amountHeight = hasAdvance ? 115 : 85;

  const pages: PageContent[] = [];
  let curDays: number[] = [];
  let used = 0;

  const flush = () => {
    if (curDays.length === 0) return;
    const isFirst = pages.length === 0;
    pages.push({
      dayIndices: curDays,
      showClient: isFirst && hasClient,
      showAmount: false,
    });
    curDays = [];
    used = 0;
  };

  // Pack days without amount consideration
  for (let i = 0; i < eventDays.length; i++) {
    const day = eventDays[i];
    const dh = estimateDayHeight(day);
    const addClient = pages.length === 0 && curDays.length === 0 && hasClient ? CLIENT_H : 0;
    const needed = dh + addClient + (curDays.length > 0 ? DAY_GAP : 0);

    if (used + needed > BODY_AVAIL && curDays.length > 0) {
      flush();
      curDays = [i];
      const reClient = pages.length === 0 && hasClient ? CLIENT_H : 0;
      used = dh + reClient;
    } else {
      curDays.push(i);
      used += dh + (curDays.length > 1 ? DAY_GAP : 0) + addClient;
    }
  }

  // Flush remaining days after loop
  if (curDays.length > 0 || pages.length === 0) {
    const isFirst = pages.length === 0;
    if (curDays.length === 0 && eventDays.length > 0) {
      curDays = [eventDays.length - 1];
    }
    pages.push({
      dayIndices: curDays,
      showClient: isFirst && hasClient,
      showAmount: false,
    });
    curDays = [];
    used = 0;
  }

  // Create initial page for empty state
  if (pages.length === 0 && (hasClient || eventDays.length === 0)) {
    pages.push({ dayIndices: [], showClient: hasClient, showAmount: false });
  }

  // Handle amount separately — try to fit on last content page, otherwise create its own page
  if (hasAmount && pages.length > 0) {
    const lastPage = pages[pages.length - 1];
    let lastPageUsed = 0;
    for (let i = 0; i < lastPage.dayIndices.length; i++) {
      lastPageUsed += estimateDayHeight(eventDays[lastPage.dayIndices[i]]);
      if (i > 0) lastPageUsed += DAY_GAP;
    }
    if (lastPage.showClient) {
      lastPageUsed += CLIENT_H;
    }
    if (BODY_AVAIL - lastPageUsed >= amountHeight) {
      lastPage.showAmount = true;
    } else {
      pages.push({
        dayIndices: [],
        showClient: false,
        showAmount: true,
      });
    }
  }

  // Always append the brand closing page
  pages.push({ dayIndices: [], showClient: false, showAmount: false, isLastPage: true });

  return pages;
}
