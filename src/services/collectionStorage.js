const CAT_KEY = "pawpal_collected_cats";
const MUSIC_KEY = "pawpal_music_fragments";
const THEME_KEY = "pawpal_theme_unlocked";
const TOTAL_FRAGMENTS = 8;

function canUseStorage() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

function readArray(key) {
  if (!canUseStorage()) return [];
  try {
    const value = JSON.parse(window.localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function writeArray(key, value) {
  if (canUseStorage()) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
  return value;
}

export function getCollectedCats() {
  return readArray(CAT_KEY);
}

export function collectCat(pointId) {
  if (!pointId) return getCollectedCats();
  const collected = getCollectedCats();
  if (collected.includes(pointId)) return collected;
  return writeArray(CAT_KEY, [...collected, pointId]);
}

export function getCollectedMusicFragments() {
  return readArray(MUSIC_KEY);
}

export function collectMusicFragment(fragmentId) {
  if (!fragmentId) return getCollectedMusicFragments();
  const collected = getCollectedMusicFragments();
  if (collected.includes(fragmentId)) return collected;
  const next = writeArray(MUSIC_KEY, [...collected, fragmentId].sort((a, b) => a - b));
  if (next.length >= TOTAL_FRAGMENTS) {
    setThemeUnlocked(true);
  }
  return next;
}

export function isThemeUnlocked() {
  if (!canUseStorage()) return false;
  return window.localStorage.getItem(THEME_KEY) === "true";
}

export function setThemeUnlocked(value) {
  if (canUseStorage()) {
    window.localStorage.setItem(THEME_KEY, value ? "true" : "false");
  }
  return value;
}

export function getCollectionSnapshot() {
  return {
    collectedCats: getCollectedCats(),
    collectedMusicFragments: getCollectedMusicFragments(),
    isThemeUnlocked: isThemeUnlocked()
  };
}

export function clearCollections() {
  if (canUseStorage()) {
    window.localStorage.removeItem(CAT_KEY);
    window.localStorage.removeItem(MUSIC_KEY);
    window.localStorage.removeItem(THEME_KEY);
  }
  return getCollectionSnapshot();
}
