import exifr from "exifr";

export function imageFileToSrc(file: File) {
  return URL.createObjectURL(file);
}

export async function getLocationFromImage(file: File) {
  const { latitude, longitude } = await exifr.gps(file);

  return [latitude, longitude] as [number, number];
}

export async function getImageData(file: File) {
  const data = await exifr.parse(file);
  const { latitude, longitude } = await exifr.gps(file);

  return {
    angle: data.GPSImgDirection ?? null,
    latitude,
    longitude,
  };
}
