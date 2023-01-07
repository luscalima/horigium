interface Address {
  label: string;
  countryCode: string;
  countryName: string;
  stateCode: string;
  state: string;
  city: string;
  district: string;
  street: string;
  postalCode: string;
  houseNumber: string;
}

export async function getAddress({
  latitude,
  longitude,
}: GeolocationCoordinates) {
  const API_KEY = import.meta.env.VITE_APP_HERE_KEY;
  const API_URL = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude},${longitude}&lang=pt-BR&apiKey=${API_KEY}`;

  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    const address = data.items[0].address as Address;
    return address;
  } catch (error) {
    throw error;
  }
}
