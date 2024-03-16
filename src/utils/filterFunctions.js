
export const onLanguageFilter = (value, languageCat, setLanguageCat) => {
    if (languageCat.includes(value)) {
      setLanguageCat(languageCat.filter((lang) => lang !== value));
    } else {
      setLanguageCat([...languageCat, value]);
    }
  };
  
  export const onGenreFilter = (value, genre, setGenre) => {
    if (genre.includes(value)) {
      setGenre(genre.filter((gen) => gen !== value));
    } else {
      setGenre([...genre, value]);
    }
  };