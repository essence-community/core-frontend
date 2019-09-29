/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

import "@essence/essence-constructor-classes/src/FilterExtended";
import {preference} from "@essence/essence-constructor-components";

if (preference.experimentalUI) {
    // eslint-disable-next-line global-require
    require("@essence/essence-constructor-classes/src/FieldCombo");
}
