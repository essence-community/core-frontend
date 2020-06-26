import {setComponent} from "@essence-community/constructor-share/components";
import {commonDecorator} from "@essence-community/constructor-share/decorators";
import {PromoContainer} from "./containers/PromoContainer/PromoContainer";
import {PromoPreviewContainer} from "./containers/PromoPreviewContainer";
import {PromoBehaviorText} from "./containers/PromoBehaviorText";

setComponent("PROMO", commonDecorator(PromoContainer));
setComponent("PROMO_PREIVEW", PromoPreviewContainer);
setComponent("PROMO_BEHAVIOR_TEXT", PromoBehaviorText);
