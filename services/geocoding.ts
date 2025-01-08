const locationCache = new Map<
  string,
  { lat: number; lon: number }
>();

export async function getLocationFromSearch(search: string) {
  if (locationCache.has(search)) {
    return locationCache.get(search);
  }
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${search}&format=json&limit=1`
  );
  const data = await res.json();
  if (data[0]) {
    const { lat, lon } = data[0] as {
      lat: string;
      lon: string;
    };
    locationCache.set(search, {
      lat: parseFloat(lat),
      lon: parseFloat(lon),
    });
    return locationCache.get(search);
  } else {
    return null;
  }
}
