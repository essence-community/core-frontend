import {setComponent} from "@essence-community/constructor-share";
import BuilderWindow from "./BuilderWindow";
import BuilderInlineWindow from "./BuilderInlineWindow/BuilderInlineWindow";

setComponent("INLINE_WINDOW", BuilderInlineWindow);
setComponent("WIN", BuilderWindow);
// @depricated
setComponent("WINDOW", BuilderWindow);

export {BuilderInlineWindow, BuilderWindow};
