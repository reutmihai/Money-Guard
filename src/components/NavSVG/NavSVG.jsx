import homeLogo from '../../assets/homeLogo.svg';
import homeLogoColor from '../../assets/homeLogoColor.svg';
import statsLogo from '../../assets/statsLogo.svg';
import statsLogoColor from '../../assets/statsLogoColor.svg';
import currencyLogo from '../../assets/currencyLogo.svg';
import currencyLogoColor from '../../assets/currencyLogoColor.svg';

// Switch statement that accepts a string and returns the corresponding svg
export const getSvg = name => {
  let svg;
  switch (name) {
    case 'homeLogo':
      svg = homeLogo;
      break;
    case 'homeLogoColor':
      svg = homeLogoColor;
      break;
    case 'statsLogo':
      svg = statsLogo;
      break;
    case 'statsLogoColor':
      svg = statsLogoColor;
      break;
    case 'currencyLogo':
      svg = currencyLogo;
      break;
    case 'currencyLogoColor':
      svg = currencyLogoColor;
      break;
    default:
      svg = null;
  }
  return svg;
};
