export const translateWeatherDescription = (description: string) => {
    switch (description)  {
      case "clear sky":
        return "ciel dégagé";
      case "few clouds":
        return "quelques nuages";
      case "scattered clouds":
        return "nuages épars";
      case "broken clouds":
        return "nuages brisés";
      case "overcast clouds":
        return "nuages couverts";
      case "shower rain":
        return "pluie de bruine";
      case "rain":
        return "pluie";
      case "light rain":
        return "pluie légère";
      case "moderate rain":
        return "pluie modérée";
      case "thunderstorm":
        return "orage";
      case "thunderstorm with light rain":
        return "orage avec pluie légère";
      case "snow":
        return "neige";
      case "mist":
        return "brume";
      default:
        return description;
    }
  };
  