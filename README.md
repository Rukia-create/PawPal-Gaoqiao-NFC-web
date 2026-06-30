# PawPal NFC Guide MVP

PawPal NFC Guide MVP is a React + Vite front-end for a real-world NFC point guide in a pet-friendly village.

The first MVP uses URL parameters to simulate NFC point entry. This is not a throwaway fake path: in real deployment, each physical NFC tag can store the same kind of point URL.

## Install

Make sure Node.js is installed first. If PowerShell reports `npm` cannot be recognized, install Node.js LTS and reopen PowerShell.

```bash
npm install
```

Windows quick check:

```bash
node -v
npm -v
```

If both commands print version numbers, continue with `npm install`.

## Run

```bash
npm run dev
```

Then open the local URL shown in the terminal.

## Simulate NFC Points In MVP

Use a `point` URL parameter:

```text
http://localhost:5173/?point=cat-island
```

The app resolves the point id through `src/services/pointResolver.js`, then reads the matching point record from `src/data/points.js`.

Available MVP point ids:

- `cat-island`
- `plant-space`
- `book-house`
- `cafe`
- `lawn`
- `installation`

## Real NFC Deployment Later

For physical deployment, write a point-specific URL into each NFC tag.

Example:

```text
https://example.com/?point=cat-island
```

When a visitor taps the NFC tag, the phone opens the URL, and the app reads `point=cat-island` just like the MVP simulation.

The first MVP does not implement Web NFC reading. If future versions need in-browser NFC scan or write features, add that logic in a separate service layer instead of putting NFC API code inside UI components.

## Point Data

Point content lives in `src/data/points.js`. Add or edit point records there instead of hardcoding point copy inside components.

Each point keeps future expansion fields such as `audioSrc`, `imageSrc`, and `nextPointId`, even when they are empty in the MVP.

## Front-End Storage

Collection helpers live in `src/services/collectionStorage.js`.

The current version is a front-end local storage solution. It does not need a backend: cat atlas progress, music fragment progress, and full theme unlock state are saved only in the visitor's current browser on the current device.

If future versions need cross-device sync, account-based saving, analytics, admin dashboards, or operational data management, the project should add a backend and replace or extend the current `localStorage` layer.

## Asset Folders

- `public/ui-reference/`: UI reference images such as `home-reference.png`, `point-page-reference.png`, `complete-modal-reference.png`, and `atlas-reference.png`.
- `public/pawpal/`: PawPal character images. Prefer `pawpal-placeholder.png` when available.
- `public/audio/`: BGM and sound effect files. The first MVP can use text to simulate BGM playback.

## V0.3 Page Structure

- Welcome screen: real cat cutout/photo, healing copy, and pull-down cue.
- Main interaction screen: comic cat, activity hint after tapping the cat, and three large buttons.
- Current cat modal: current cat profile and cat collection progress.
- Current music modal: current point music playback state and music fragment progress.
- Atlas home page: large cat atlas and music atlas entry buttons.
- Full cat atlas page: collected cats are colorful, locked cats are grey.
- Full music atlas page: collected fragments are colorful, locked fragments are grey.
- Theme song page: unlocked after collecting all 5 music fragments.

## Test The MVP Loop

1. Open `/` without a `point` parameter to see the simulated NFC entry page.
2. Choose `cat-island` or open `/?point=cat-island` directly.
3. Confirm the welcome screen shows the current cat image and healing text.
4. Pull or scroll down to the main interaction screen.
5. Tap the comic cat. The cat moves right and the activity hint appears on the left.
6. Tap the left cat button to open the current cat atlas modal.
7. Tap the center atlas button to enter the atlas home page.
8. From atlas home, enter the full cat atlas or full music atlas.
9. Tap the right music button on fragment points to collect music fragments.
10. Collect 5 fragments to unlock the full theme song.
11. Refresh the page and confirm collection progress remains in localStorage.

## localStorage Keys

- `pawpal_collected_cats`: collected cat point ids, such as `["cat-island"]`.
- `pawpal_music_fragments`: collected music fragment ids, such as `[1, 2, 3]`.
- `pawpal_theme_unlocked`: full theme song state, `true` or `false`.

All direct `localStorage` reads and writes are centralized in `src/services/collectionStorage.js`. UI components should call service functions such as `collectCat`, `collectMusicFragment`, and `getCollectionSnapshot` instead of touching browser storage directly.

## Current Status

The V0.3 MVP is implemented with NFC-ready URL entry, real/comic cat image placeholders, current cat and music modals, atlas home, full cat atlas, full music atlas, full theme song unlock logic, localStorage persistence, and static front-end data.
