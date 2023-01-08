interface Quote {
  content: string;
  author: string;
  authorSlug: string;
}

export async function getQuote() {
  const API_URL = "https://api.quotable.io/random";

  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data as Quote;
  } catch (error) {
    throw error;
  }
}
