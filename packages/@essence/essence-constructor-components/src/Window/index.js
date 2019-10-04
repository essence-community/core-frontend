import {setComponent} from "@essence/essence-constructor-share";
import BuilderWindow from "./BuilderWindow";
import BuilderInlineWindow from "./BuilderInlineWindow/BuilderInlineWindow";

setComponent("INLINE_WINDOW", BuilderInlineWindow);
setComponent("WINDOW", BuilderWindow);

export {BuilderInlineWindow, BuilderWindow};
