import {
  clearCollections,
  collectCat,
  collectMusicFragment,
  getCollectedCats,
  getCollectedMusicFragments
} from "./collectionStorage.js";

// Compatibility layer for older imports. V0.3 storage lives in collectionStorage.js.
export function getUnlockedPoints() {
  return getCollectedCats();
}

export function unlockPoint(pointId) {
  return collectCat(pointId);
}

export function isPointUnlocked(pointId) {
  return getCollectedCats().includes(pointId);
}

export function clearUnlockedPoints() {
  return clearCollections().collectedCats;
}

export function getUnlockedFragments() {
  return getCollectedMusicFragments();
}

export function unlockFragment(fragmentId) {
  return collectMusicFragment(fragmentId);
}

export function isFragmentUnlocked(fragmentId) {
  return getCollectedMusicFragments().includes(fragmentId);
}

export function clearUnlockedFragments() {
  return clearCollections().collectedMusicFragments;
}
