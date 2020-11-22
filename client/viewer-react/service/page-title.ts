import {useContext, useEffect} from "react";

import {NavigationContext} from "./navigation";
import {translateString} from "./i18";
import configuration from "../viewer-configuration";

/**
 * Use given strings to set page title.
 *
 * @param title Text to translate and use for title.
 * @param args Arguments for the title.
 * @param formattedTitle If provided first two values are ignored, and this
 *  value is used directly for title.
 */
export function usePageTitle(
  title: string, args?: any, formattedTitle?: string
) {
  const navigation = useContext(NavigationContext);
  useEffect(() => {
    if (formattedTitle !== undefined) {
      document.title =
        configuration.pageTitlePrefix
        + formattedTitle
        + configuration.pageTitleSuffix;
    } else {
      document.title = configuration.pageTitlePrefix
        + translateString(navigation.language, title, args)
        + configuration.pageTitleSuffix;
    }
  }, [title, args, formattedTitle, navigation.language])
}
