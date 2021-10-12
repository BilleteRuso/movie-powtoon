const API_KEY = "54ffed57deb5a7a8688be4de3007e578";

const requests = {
  fetchNowPlaying1: `/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`,
  fetchNowPlaying2: `/movie/now_playing?api_key=${API_KEY}&language=en-US&page=2`,
  fetchNowPlaying3: `/movie/now_playing?api_key=${API_KEY}&language=en-US&page=3`,
};

export default requests;
