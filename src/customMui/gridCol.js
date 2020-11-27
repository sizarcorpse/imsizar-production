import { isWidthUp } from "@material-ui/core/withWidth";

export const getGridListCols = (width) => {
  if (isWidthUp("xl", width)) {
    return 4;
  } else if (isWidthUp("lg", width)) {
    return 3;
  } else if (isWidthUp("md", width)) {
    return 1;
  } else if (isWidthUp("sm", width)) {
    return 1;
  } else if (isWidthUp("xs", width)) {
    return 1;
  }
};
