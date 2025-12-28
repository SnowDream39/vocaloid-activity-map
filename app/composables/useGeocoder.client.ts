let geocoder: any = null;

export function useGeocoder() {
  const loadGeocoder = async () => {
    if (geocoder) {
      return geocoder;
    }
    const { $AMap } = useNuxtApp();
    geocoder = new $AMap.Geocoder();
    return geocoder;
  }
  return {
    loadGeocoder,
  }
}