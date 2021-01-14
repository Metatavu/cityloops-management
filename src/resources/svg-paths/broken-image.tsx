import * as React from "react";
import { SvgIcon, SvgIconProps } from "@material-ui/core";

/**
 * Interface describing component properties
 */
interface Props extends SvgIconProps {}

/**
 * Component for broken image icon
 * 
 * @param props component props
 */
const CityLoopsLogo = (props: Props) => {
  return (
    <SvgIcon { ...props }>
      <path d="M0,0H24V24H0Z"/>
      <polygon points="19.8 5.55 8.96 7.38 20.11 7.38 19.8 5.55"/>
      <polygon points="2.96 11.99 2.96 8.4 2.37 8.5 2.96 11.99"/>
      <path d="M20.28,8.39H4V18.47H21.65V8.39H20.28Zm-9.67,8.94H5.12l3-7.64,2.76,3.82,2.32-1.57L16,16.42l.58.91Zm8.24-5.12a1,1,0,1,1,1-1A1,1,0,0,1,18.85,12.21Z"/>
      <path d="M21.85,7.38h-.71L20.77,5.2a.81.81,0,0,0-.94-.67L2,7.54a.82.82,0,0,0-.67,1L3,18.09v.57a.82.82,0,0,0,.82.82H21.85a.82.82,0,0,0,.82-.82V8.2A.82.82,0,0,0,21.85,7.38ZM3,12,2.37,8.5,3,8.4ZM19.8,5.55l.31,1.83H9Zm1.85,4.87v8H4V8.39H21.65Z"/>
      <path d="M18.85,10.19a1,1,0,1,0,1,1A1,1,0,0,0,18.85,10.19Z"/>
      <polygon points="13.17 11.95 10.85 13.51 8.1 9.69 5.12 17.33 10.61 17.33 16.58 17.33 16 16.42 13.17 11.95"/>
    </SvgIcon>
  );
}

export default CityLoopsLogo;