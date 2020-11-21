const PU_PREFIX = "https://data.gov.cz/podmínky-užití/";

export const LEGAL = {
  [PU_PREFIX + "neobsahuje-autorská-díla/"]: "no",
  [PU_PREFIX + "obsahuje-více-autorských-děl/"]: "multi",
  "https://creativecommons.org/licenses/by/4.0/": "ccBy",
  [PU_PREFIX + "není-autorskoprávně-chráněnou-databází/"]: "no",
  "https://creativecommons.org/publicdomain/zero/1.0/": "cc0",
  [PU_PREFIX + "není-chráněna-zvláštním-právem-pořizovatele-databáze/"]: "no",
  [PU_PREFIX + "obsahuje-osobní-údaje/"]: "contains",
  [PU_PREFIX + "neobsahuje-osobní-údaje/"]: "no",
  [PU_PREFIX + "není-specifikováno-zda-obsahuje-osobní-údaje/"]: "unspecified",
  "missing": "missing",
};
