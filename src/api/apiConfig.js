const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3/",
  apiKey: "7c6c82f2e19983f9b83480a3860e33a0",
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500${imgPath}`,
}

export default apiConfig
