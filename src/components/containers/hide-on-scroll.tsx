import { Slide, useScrollTrigger } from "@material-ui/core";
import * as React from "react";

/**
 * Interface describing component properties
 */
interface Props { }

/**
 * Component for hide on scroll container
 * 
 * @param children component children
 */
const HideOnScroll: React.FC<Props> = ({ children }) => {
  
  const trigger = useScrollTrigger();

  if (!children) {
    return null;
  }

  return (
    <Slide
      appear={ false }
      direction="down"
      in={ !trigger }
    >
      { children as React.ReactElement }
    </Slide>
  );
}

export default HideOnScroll;