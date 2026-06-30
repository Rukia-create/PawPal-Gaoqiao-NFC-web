export function getPointIdFromUrl(search = window.location.search) {
  const params = new URLSearchParams(search);
  return params.get("point");
}

export function getPointById(pointId, points) {
  return points.find((point) => point.id === pointId) || null;
}

export function getInitialPoint(points) {
  const pointId = getPointIdFromUrl();
  return getPointById(pointId, points);
}

export function buildPointUrl(pointId) {
  const params = new URLSearchParams();
  params.set("point", pointId);
  return `/?${params.toString()}`;
}

export function updateUrlPoint(pointId) {
  const nextUrl = buildPointUrl(pointId);
  window.history.pushState({ pointId }, "", nextUrl);
}
