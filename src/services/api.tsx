export async function getMovies(url) {
  const result = await fetch(`http://localhost:3030/api/v1/search${url}`);
  const data = await result.json();
  return data;
}
