# PawPal NFC Guide MVP - Project Rules

## Product Direction

PawPal NFC Guide is a real-world NFC point guide for Gaoqiao pet-friendly village. The MVP is intentionally lightweight, but the project must be structured for future physical NFC deployment.

Do not describe this project as "only a fake simulation" or as something that will never support NFC. The first version simulates the NFC result with a URL parameter because that is also the most reliable production deployment path for many NFC tags.

## NFC Deployment Principle

### MVP Version

- Do not implement real Web NFC reading in the first MVP.
- Use URL parameters to simulate opening a point.
- Example: `/?point=cat-island`
- The simulated entry should behave like the result of tapping a physical NFC tag.

### Real Deployment

Each physical NFC tag will store a point-specific URL.

Example:

```text
https://example.com/?point=cat-island
```

When a visitor taps the NFC tag, the phone opens that URL and the app resolves `cat-island` as the current point.

### Future Web NFC

If future requirements need in-browser NFC reading or writing, add a separate adapter layer, such as `src/services/nfcAdapter.js`. Do not place Web NFC API calls directly inside React UI components.

## Architecture Rules

- Do not hardcode point content inside components.
- Do not hardcode NFC logic inside UI components.
- Resolve point ids through `src/services/pointResolver.js`.
- Store atlas unlock helpers in `src/services/atlasStorage.js`.
- Keep point data in `src/data/points.js`.
- Keep future point fields such as `audioSrc`, `imageSrc`, and `nextPointId`, even when they are empty in the MVP.
- Keep components focused on rendering and user interaction.
- Keep services responsible for external inputs, browser storage, and future platform integration.

## MVP Closed Loop

The later MVP interaction loop is:

1. NFC URL or simulated entry opens a point.
2. PawPal appears.
3. The point introduction is shown.
4. User clicks "听听这里".
5. User clicks "摸摸 PawPal".
6. After both actions are complete, the completion modal appears automatically.
7. The point is unlocked in "高桥宠物友好村猫爪图鉴".
8. The atlas page shows the lit paw print.

This skeleton should prepare for that loop without prematurely implementing complex behavior.

## Data Rules

Each point should use a stable `id`, because the id becomes part of the NFC tag URL.

Required or recommended point fields:

- `id`
- `name`
- `type`
- `tags`
- `duration`
- `intro`
- `pawpalPrompt`
- `listenFeedback`
- `patFeedback`
- `musicLabel`
- `badge`
- `feedback`
- `note`
- `audioSrc`
- `imageSrc`
- `nextPointId`

Do not rename point ids casually. If a point id changes, update point data, docs, and NFC tag URL mapping together.

## Asset Rules

- UI references go in `public/ui-reference/`.
- PawPal character assets go in `public/pawpal/`.
- Audio assets go in `public/audio/`.
- Use `/pawpal/pawpal-placeholder.png` when it exists.
- If the PawPal image does not exist, draw a simple black big-eyed cat placeholder with CSS or SVG.
- UI reference images are visual guidance only. Do not use them as page backgrounds or direct UI assets.

## Technical Scope

- Use React + Vite.
- MVP is front-end only.
- Do not add backend services unless requested.
- Do not add real Web NFC reading unless requested.
- Do not add heavy dependencies unless they are clearly needed.
- Keep the app modular enough for future real NFC deployment.

## Preferred Structure

```text
src/
  App.jsx
  main.jsx
  data/
    points.js
  services/
    pointResolver.js
    atlasStorage.js
  components/
    PawPal.jsx
    SimulatedNfcEntry.jsx
    PointPage.jsx
    AtlasPage.jsx
    CompletionModal.jsx
  styles/
    main.css
```
