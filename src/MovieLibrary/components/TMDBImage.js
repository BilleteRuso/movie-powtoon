import React from "react";

const TMDB_IMAGE_BASE_PATH = "https://image.tmdb.org/t/p/w500/";
const BACKUP_IMG =
  "https://media.cdnandroid.com/item_images/1004178/imagen-powtoon-connect-0big.jpg";

const TMDBImage = ({ src, alt, ...restProps }) => (
  <img
    src={`${TMDB_IMAGE_BASE_PATH}${src}`}
    alt={`${alt}`}
    {...restProps}
    onError={(e) => {
      e.target.onerror = null;
      e.target.src = `${BACKUP_IMG}`;
    }}
  />
);

export default TMDBImage;
