import _ from "lodash";
import { useEffect, useState } from "react";

export const usePageWidth = () => {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
      const handleResize = _.debounce(() => setWidth(window.innerWidth), 100);
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
        handleResize.cancel();
      };
    }, []);
    return width;
  };
  