export function getCoords() {
  return new Promise(
    (
      resolve: (coords: GeolocationPosition) => void,
      reject: (err: GeolocationPositionError) => void
    ) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    }
  );
}
