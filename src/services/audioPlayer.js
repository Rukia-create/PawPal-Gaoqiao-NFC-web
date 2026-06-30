let activeAudio = null;

export async function playPointAudio(point) {
  if (!point?.audioSrc) {
    return {
      status: "mock",
      message:
        point?.musicType === "fragment"
          ? `正在播放：主题曲片段 ${point.fragmentId}`
          : `正在播放：${point?.musicLabel || "点位声音"}`
    };
  }

  try {
    activeAudio?.pause();
    activeAudio = new Audio(point.audioSrc);
    await activeAudio.play();
    return { status: "playing", message: `正在播放：${point.musicLabel}` };
  } catch {
    return { status: "mock", message: `正在播放：${point.musicLabel}（模拟）` };
  }
}

export function getThemePlaybackMessage(src = "/audio/full-theme.mp3") {
  return src ? "正在播放：PawPal 高桥慢游完整主题曲" : "正在播放：PawPal 高桥慢游完整主题曲（模拟）";
}
