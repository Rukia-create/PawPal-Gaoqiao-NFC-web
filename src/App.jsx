import { useEffect, useMemo, useState } from "react";
import AtlasHomePage from "./components/AtlasHomePage.jsx";
import CurrentCatModal from "./components/CurrentCatModal.jsx";
import CurrentMusicModal from "./components/CurrentMusicModal.jsx";
import FullCatAtlasPage from "./components/FullCatAtlasPage.jsx";
import FullMusicAtlasPage from "./components/FullMusicAtlasPage.jsx";
import MainInteractionScreen from "./components/MainInteractionScreen.jsx";
import SimulatedNfcEntry from "./components/SimulatedNfcEntry.jsx";
import ThemeSongPage from "./components/ThemeSongPage.jsx";
import WelcomeScreen from "./components/WelcomeScreen.jsx";
import { points } from "./data/points.js";
import { playPointAudio, stopPointAudio } from "./services/audioPlayer.js";
import {
  collectCat,
  collectMusicFragment,
  getCollectionSnapshot
} from "./services/collectionStorage.js";
import {
  getInitialPoint,
  getPointById,
  getPointIdFromUrl,
  updateUrlPoint
} from "./services/pointResolver.js";

function getInitialView() {
  return getInitialPoint(points) ? "point" : "entry";
}

export default function App() {
  const initialPoint = getInitialPoint(points);
  const [currentView, setCurrentView] = useState(getInitialView);
  const [currentPointId, setCurrentPointId] = useState(initialPoint?.id || points[0].id);
  const [showCatModal, setShowCatModal] = useState(false);
  const [showMusicModal, setShowMusicModal] = useState(false);
  const [isCatMoved, setIsCatMoved] = useState(false);
  const [currentFeedbackText, setCurrentFeedbackText] = useState("");
  const [playbackMessage, setPlaybackMessage] = useState("");
  const [collection, setCollection] = useState(() => getCollectionSnapshot());

  const currentPoint = useMemo(
    () => getPointById(currentPointId, points) || points[0],
    [currentPointId]
  );

  function refreshCollection() {
    setCollection(getCollectionSnapshot());
  }

  useEffect(() => {
    const syncFromUrl = () => {
      const nextPoint = getPointById(getPointIdFromUrl(), points);
      if (nextPoint) {
        setCurrentPointId(nextPoint.id);
        setCurrentView("point");
      } else {
        setCurrentView("entry");
      }
    };

    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  useEffect(() => {
    if (currentView === "point") {
      collectCat(currentPoint.id);
      refreshCollection();
    }
    setIsCatMoved(false);
    setShowCatModal(false);
    setShowMusicModal(false);
    setPlaybackMessage("");
    setCurrentFeedbackText(currentPoint.activityText);
  }, [currentPoint.id, currentPoint.activityText, currentView]);

  function openPoint(pointId) {
    setCurrentPointId(pointId);
    setCurrentView("point");
    updateUrlPoint(pointId);
  }

  function openEntry() {
    setCurrentView("entry");
    window.history.pushState({}, "", "/");
  }

  function openAtlasHome() {
    refreshCollection();
    setCurrentView("atlasHome");
  }

  async function openMusicModal() {
    const result = await playPointAudio(currentPoint);
    setPlaybackMessage(result.message);
    if (currentPoint.musicType === "fragment" && currentPoint.fragmentId) {
      collectMusicFragment(currentPoint.fragmentId);
      refreshCollection();
    }
    setShowMusicModal(true);
  }

  function closeMusicModal() {
    stopPointAudio();
    setShowMusicModal(false);
  }

  function toggleCatMove() {
    setIsCatMoved((value) => !value);
  }

  return (
    <main className="app-shell">
      {currentView === "entry" && (
        <SimulatedNfcEntry points={points} onOpenPoint={openPoint} />
      )}

      {currentView === "point" && (
        <section className="point-v03">
          <WelcomeScreen point={currentPoint} />
          <MainInteractionScreen
            isCatMoved={isCatMoved}
            onCatClick={toggleCatMove}
            onOpenAtlasHome={openAtlasHome}
            onOpenCatModal={() => setShowCatModal(true)}
            onOpenMusicModal={openMusicModal}
            point={currentPoint}
          />
          {showCatModal && (
            <CurrentCatModal
              collectedCats={collection.collectedCats}
              onClose={() => setShowCatModal(false)}
              point={currentPoint}
              total={points.length}
            />
          )}
          {showMusicModal && (
            <CurrentMusicModal
              collectedMusicFragments={collection.collectedMusicFragments}
              onClose={closeMusicModal}
              playbackMessage={playbackMessage}
              point={currentPoint}
              themeUnlocked={collection.isThemeUnlocked}
            />
          )}
        </section>
      )}

      {currentView === "atlasHome" && (
        <AtlasHomePage
          onBack={() => setCurrentView("point")}
          onOpenCatAtlas={() => setCurrentView("catAtlas")}
          onOpenMusicAtlas={() => setCurrentView("musicAtlas")}
        />
      )}

      {currentView === "catAtlas" && (
        <FullCatAtlasPage
          collectedCats={collection.collectedCats}
          onBack={() => setCurrentView("atlasHome")}
          points={points}
        />
      )}

      {currentView === "musicAtlas" && (
        <FullMusicAtlasPage
          collectedMusicFragments={collection.collectedMusicFragments}
          onBack={() => setCurrentView("atlasHome")}
          onOpenThemeSong={() => setCurrentView("theme")}
          points={points}
          themeUnlocked={collection.isThemeUnlocked}
        />
      )}

      {currentView === "theme" && (
        <ThemeSongPage
          onOpenAtlas={() => setCurrentView("musicAtlas")}
          onOpenPoint={() => setCurrentView("point")}
          unlockedFragments={collection.collectedMusicFragments}
        />
      )}
    </main>
  );
}
