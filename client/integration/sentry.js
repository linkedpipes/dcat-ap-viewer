/**
 * Module file.
 *
 * Import Raven and configure it to report to sentry instance options
 * from the configuration file.
 */
import Raven from "raven-js";

if (SENTRY_REPORT) {
  Raven.config(SENTRY_URL).install();
}