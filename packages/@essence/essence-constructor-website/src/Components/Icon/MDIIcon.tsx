/* eslint-disable sort-keys, @typescript-eslint/ban-ts-comment, max-len */
import * as React from "react";

interface IProps {
    iconfont: string;
    size: "xs" | "lg" | "2x" | "3x" | "4x" | "5x";
}

const SIZE_MAP = {
    "2x": 48,
    "3x": 72,
    "4x": 96,
    "5x": 120,
    lg: 32,
    xs: 18,
};

const mapIcon = {
    "mdi-access-point-network": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AccessPointNetworkIcon" */
            "mdi-react/AccessPointNetworkIcon"
        ),
    ),
    "mdi-access-point": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AccessPointIcon" */
            "mdi-react/AccessPointIcon"
        ),
    ),
    "mdi-account-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AccountAlertIcon" */
            "mdi-react/AccountAlertIcon"
        ),
    ),
    "mdi-account-box-multiple": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AccountBoxMultipleIcon" */
            "mdi-react/AccountBoxMultipleIcon"
        ),
    ),
    "mdi-account-box-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AccountBoxOutlineIcon" */
            "mdi-react/AccountBoxOutlineIcon"
        ),
    ),
    "mdi-account-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AccountBoxIcon" */
            "mdi-react/AccountBoxIcon"
        ),
    ),
    "mdi-account-card-details": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AccountCardDetailsIcon" */
            "mdi-react/AccountCardDetailsIcon"
        ),
    ),
    "mdi-account-check": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AccountCheckIcon" */
            "mdi-react/AccountCheckIcon"
        ),
    ),
    "mdi-account-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AccountCircleIcon" */
            "mdi-react/AccountCircleIcon"
        ),
    ),
    "mdi-account-convert": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AccountConvertIcon" */
            "mdi-react/AccountConvertIcon"
        ),
    ),
    "mdi-account-edit": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AccountEditIcon" */
            "mdi-react/AccountEditIcon"
        ),
    ),
    "mdi-account-group": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AccountGroupIcon" */
            "mdi-react/AccountGroupIcon"
        ),
    ),
    "mdi-account-heart": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AccountHeartIcon" */
            "mdi-react/AccountHeartIcon"
        ),
    ),
    "mdi-account-key": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AccountKeyIcon" */
            "mdi-react/AccountKeyIcon"
        ),
    ),
    "mdi-account-location": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AccountLocationIcon" */
            "mdi-react/AccountLocationIcon"
        ),
    ),
    "mdi-account-minus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AccountMinusIcon" */
            "mdi-react/AccountMinusIcon"
        ),
    ),
    "mdi-account-multiple-check": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AccountMultipleCheckIcon" */
            "mdi-react/AccountMultipleCheckIcon"
        ),
    ),
    "mdi-account-multiple-minus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AccountMultipleMinusIcon" */
            "mdi-react/AccountMultipleMinusIcon"
        ),
    ),
    "mdi-account-multiple-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AccountMultipleOutlineIcon" */
            "mdi-react/AccountMultipleOutlineIcon"
        ),
    ),
    "mdi-account-multiple-plus-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AccountMultiplePlusOutlineIcon" */
            "mdi-react/AccountMultiplePlusOutlineIcon"
        ),
    ),
    "mdi-account-multiple-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AccountMultiplePlusIcon" */
            "mdi-react/AccountMultiplePlusIcon"
        ),
    ),
    "mdi-account-multiple": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AccountMultipleIcon" */
            "mdi-react/AccountMultipleIcon"
        ),
    ),
    "mdi-account-network": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AccountNetworkIcon" */
            "mdi-react/AccountNetworkIcon"
        ),
    ),
    "mdi-account-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AccountOffIcon" */
            "mdi-react/AccountOffIcon"
        ),
    ),
    "mdi-account-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AccountOutlineIcon" */
            "mdi-react/AccountOutlineIcon"
        ),
    ),
    "mdi-account-plus-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AccountPlusOutlineIcon" */
            "mdi-react/AccountPlusOutlineIcon"
        ),
    ),
    "mdi-account-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AccountPlusIcon" */
            "mdi-react/AccountPlusIcon"
        ),
    ),
    "mdi-account-remove": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AccountRemoveIcon" */
            "mdi-react/AccountRemoveIcon"
        ),
    ),
    "mdi-account-search-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AccountSearchOutlineIcon" */
            "mdi-react/AccountSearchOutlineIcon"
        ),
    ),
    "mdi-account-search": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AccountSearchIcon" */
            "mdi-react/AccountSearchIcon"
        ),
    ),
    "mdi-account-settings-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AccountSettingsVariantIcon" */
            "mdi-react/AccountSettingsVariantIcon"
        ),
    ),
    "mdi-account-settings": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AccountSettingsIcon" */
            "mdi-react/AccountSettingsIcon"
        ),
    ),
    "mdi-account-star": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AccountStarIcon" */
            "mdi-react/AccountStarIcon"
        ),
    ),
    "mdi-account-switch": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AccountSwitchIcon" */
            "mdi-react/AccountSwitchIcon"
        ),
    ),
    "mdi-account": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AccountIcon" */
            "mdi-react/AccountIcon"
        ),
    ),
    "mdi-accusoft": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AccusoftIcon" */
            "mdi-react/AccusoftIcon"
        ),
    ),
    "mdi-adjust": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AdjustIcon" */
            "mdi-react/AdjustIcon"
        ),
    ),
    "mdi-adobe": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AdobeIcon" */
            "mdi-react/AdobeIcon"
        ),
    ),
    "mdi-air-conditioner": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AirConditionerIcon" */
            "mdi-react/AirConditionerIcon"
        ),
    ),
    "mdi-airballoon": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AirballoonIcon" */
            "mdi-react/AirballoonIcon"
        ),
    ),
    "mdi-airplane-landing": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AirplaneLandingIcon" */
            "mdi-react/AirplaneLandingIcon"
        ),
    ),
    "mdi-airplane-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AirplaneOffIcon" */
            "mdi-react/AirplaneOffIcon"
        ),
    ),
    "mdi-airplane-takeoff": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AirplaneTakeoffIcon" */
            "mdi-react/AirplaneTakeoffIcon"
        ),
    ),
    "mdi-airplane": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AirplaneIcon" */
            "mdi-react/AirplaneIcon"
        ),
    ),
    "mdi-airplay": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AirplayIcon" */
            "mdi-react/AirplayIcon"
        ),
    ),
    "mdi-airport": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AirportIcon" */
            "mdi-react/AirportIcon"
        ),
    ),
    "mdi-alarm-bell": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AlarmBellIcon" */
            "mdi-react/AlarmBellIcon"
        ),
    ),
    "mdi-alarm-check": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AlarmCheckIcon" */
            "mdi-react/AlarmCheckIcon"
        ),
    ),
    "mdi-alarm-light": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AlarmLightIcon" */
            "mdi-react/AlarmLightIcon"
        ),
    ),
    "mdi-alarm-multiple": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AlarmMultipleIcon" */
            "mdi-react/AlarmMultipleIcon"
        ),
    ),
    "mdi-alarm-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AlarmOffIcon" */
            "mdi-react/AlarmOffIcon"
        ),
    ),
    "mdi-alarm-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AlarmPlusIcon" */
            "mdi-react/AlarmPlusIcon"
        ),
    ),
    "mdi-alarm-snooze": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AlarmSnoozeIcon" */
            "mdi-react/AlarmSnoozeIcon"
        ),
    ),
    "mdi-alarm": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AlarmIcon" */
            "mdi-react/AlarmIcon"
        ),
    ),
    "mdi-album": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AlbumIcon" */
            "mdi-react/AlbumIcon"
        ),
    ),
    "mdi-alert-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AlertBoxIcon" */
            "mdi-react/AlertBoxIcon"
        ),
    ),
    "mdi-alert-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AlertCircleOutlineIcon" */
            "mdi-react/AlertCircleOutlineIcon"
        ),
    ),
    "mdi-alert-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AlertCircleIcon" */
            "mdi-react/AlertCircleIcon"
        ),
    ),
    "mdi-alert-decagram": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AlertDecagramIcon" */
            "mdi-react/AlertDecagramIcon"
        ),
    ),
    "mdi-alert-octagon": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AlertOctagonIcon" */
            "mdi-react/AlertOctagonIcon"
        ),
    ),
    "mdi-alert-octagram": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AlertOctagramIcon" */
            "mdi-react/AlertOctagramIcon"
        ),
    ),
    "mdi-alert-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AlertOutlineIcon" */
            "mdi-react/AlertOutlineIcon"
        ),
    ),
    "mdi-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AlertIcon" */
            "mdi-react/AlertIcon"
        ),
    ),
    "mdi-alien": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AlienIcon" */
            "mdi-react/AlienIcon"
        ),
    ),
    "mdi-all-inclusive": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AllInclusiveIcon" */
            "mdi-react/AllInclusiveIcon"
        ),
    ),
    "mdi-alpha": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AlphaIcon" */
            "mdi-react/AlphaIcon"
        ),
    ),
    "mdi-alphabetical": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AlphabeticalIcon" */
            "mdi-react/AlphabeticalIcon"
        ),
    ),
    "mdi-altimeter": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AltimeterIcon" */
            "mdi-react/AltimeterIcon"
        ),
    ),
    "mdi-amazon-alexa": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AmazonAlexaIcon" */
            "mdi-react/AmazonAlexaIcon"
        ),
    ),
    "mdi-amazon-drive": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AmazonDriveIcon" */
            "mdi-react/AmazonDriveIcon"
        ),
    ),
    "mdi-amazon": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AmazonIcon" */
            "mdi-react/AmazonIcon"
        ),
    ),
    "mdi-ambulance": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AmbulanceIcon" */
            "mdi-react/AmbulanceIcon"
        ),
    ),
    "mdi-amplifier": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AmplifierIcon" */
            "mdi-react/AmplifierIcon"
        ),
    ),
    "mdi-anchor": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AnchorIcon" */
            "mdi-react/AnchorIcon"
        ),
    ),
    "mdi-android-debug-bridge": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AndroidDebugBridgeIcon" */
            "mdi-react/AndroidDebugBridgeIcon"
        ),
    ),
    "mdi-android-head": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AndroidHeadIcon" */
            "mdi-react/AndroidHeadIcon"
        ),
    ),
    "mdi-android-studio": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AndroidStudioIcon" */
            "mdi-react/AndroidStudioIcon"
        ),
    ),
    "mdi-android": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AndroidIcon" */
            "mdi-react/AndroidIcon"
        ),
    ),
    "mdi-angle-acute": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AngleAcuteIcon" */
            "mdi-react/AngleAcuteIcon"
        ),
    ),
    "mdi-angle-obtuse": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AngleObtuseIcon" */
            "mdi-react/AngleObtuseIcon"
        ),
    ),
    "mdi-angle-right": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AngleRightIcon" */
            "mdi-react/AngleRightIcon"
        ),
    ),
    "mdi-angular": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AngularIcon" */
            "mdi-react/AngularIcon"
        ),
    ),
    "mdi-angularjs": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AngularjsIcon" */
            "mdi-react/AngularjsIcon"
        ),
    ),
    "mdi-animation-play": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AnimationPlayIcon" */
            "mdi-react/AnimationPlayIcon"
        ),
    ),
    "mdi-animation": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AnimationIcon" */
            "mdi-react/AnimationIcon"
        ),
    ),
    "mdi-anvil": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AnvilIcon" */
            "mdi-react/AnvilIcon"
        ),
    ),
    "mdi-apple-finder": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AppleFinderIcon" */
            "mdi-react/AppleFinderIcon"
        ),
    ),
    "mdi-apple-icloud": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AppleIcloudIcon" */
            "mdi-react/AppleIcloudIcon"
        ),
    ),
    "mdi-apple-ios": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AppleIosIcon" */
            "mdi-react/AppleIosIcon"
        ),
    ),
    "mdi-apple-keyboard-caps": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AppleKeyboardCapsIcon" */
            "mdi-react/AppleKeyboardCapsIcon"
        ),
    ),
    "mdi-apple-keyboard-command": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AppleKeyboardCommandIcon" */
            "mdi-react/AppleKeyboardCommandIcon"
        ),
    ),
    "mdi-apple-keyboard-control": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AppleKeyboardControlIcon" */
            "mdi-react/AppleKeyboardControlIcon"
        ),
    ),
    "mdi-apple-keyboard-option": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AppleKeyboardOptionIcon" */
            "mdi-react/AppleKeyboardOptionIcon"
        ),
    ),
    "mdi-apple-keyboard-shift": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AppleKeyboardShiftIcon" */
            "mdi-react/AppleKeyboardShiftIcon"
        ),
    ),
    "mdi-apple-safari": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AppleSafariIcon" */
            "mdi-react/AppleSafariIcon"
        ),
    ),
    "mdi-apple": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AppleIcon" */
            "mdi-react/AppleIcon"
        ),
    ),
    "mdi-application": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ApplicationIcon" */
            "mdi-react/ApplicationIcon"
        ),
    ),
    "mdi-approval": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ApprovalIcon" */
            "mdi-react/ApprovalIcon"
        ),
    ),
    "mdi-apps": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AppsIcon" */
            "mdi-react/AppsIcon"
        ),
    ),
    "mdi-arch": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArchIcon" */
            "mdi-react/ArchIcon"
        ),
    ),
    "mdi-archive": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArchiveIcon" */
            "mdi-react/ArchiveIcon"
        ),
    ),
    "mdi-arrange-bring-forward": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrangeBringForwardIcon" */
            "mdi-react/ArrangeBringForwardIcon"
        ),
    ),
    "mdi-arrange-bring-to-front": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrangeBringToFrontIcon" */
            "mdi-react/ArrangeBringToFrontIcon"
        ),
    ),
    "mdi-arrange-send-backward": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrangeSendBackwardIcon" */
            "mdi-react/ArrangeSendBackwardIcon"
        ),
    ),
    "mdi-arrange-send-to-back": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrangeSendToBackIcon" */
            "mdi-react/ArrangeSendToBackIcon"
        ),
    ),
    "mdi-arrow-all": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowAllIcon" */
            "mdi-react/ArrowAllIcon"
        ),
    ),
    "mdi-arrow-bottom-left": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowBottomLeftIcon" */
            "mdi-react/ArrowBottomLeftIcon"
        ),
    ),
    "mdi-arrow-bottom-right": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowBottomRightIcon" */
            "mdi-react/ArrowBottomRightIcon"
        ),
    ),
    "mdi-arrow-collapse-all": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowCollapseAllIcon" */
            "mdi-react/ArrowCollapseAllIcon"
        ),
    ),
    "mdi-arrow-collapse-down": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowCollapseDownIcon" */
            "mdi-react/ArrowCollapseDownIcon"
        ),
    ),
    "mdi-arrow-collapse-horizontal": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowCollapseHorizontalIcon" */
            "mdi-react/ArrowCollapseHorizontalIcon"
        ),
    ),
    "mdi-arrow-collapse-left": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowCollapseLeftIcon" */
            "mdi-react/ArrowCollapseLeftIcon"
        ),
    ),
    "mdi-arrow-collapse-right": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowCollapseRightIcon" */
            "mdi-react/ArrowCollapseRightIcon"
        ),
    ),
    "mdi-arrow-collapse-up": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowCollapseUpIcon" */
            "mdi-react/ArrowCollapseUpIcon"
        ),
    ),
    "mdi-arrow-collapse-vertical": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowCollapseVerticalIcon" */
            "mdi-react/ArrowCollapseVerticalIcon"
        ),
    ),
    "mdi-arrow-collapse": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowCollapseIcon" */
            "mdi-react/ArrowCollapseIcon"
        ),
    ),
    "mdi-arrow-down-bold-box-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowDownBoldBoxOutlineIcon" */
            "mdi-react/ArrowDownBoldBoxOutlineIcon"
        ),
    ),
    "mdi-arrow-down-bold-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowDownBoldBoxIcon" */
            "mdi-react/ArrowDownBoldBoxIcon"
        ),
    ),
    "mdi-arrow-down-bold-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowDownBoldCircleOutlineIcon" */
            "mdi-react/ArrowDownBoldCircleOutlineIcon"
        ),
    ),
    "mdi-arrow-down-bold-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowDownBoldCircleIcon" */
            "mdi-react/ArrowDownBoldCircleIcon"
        ),
    ),
    "mdi-arrow-down-bold-hexagon-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowDownBoldHexagonOutlineIcon" */
            "mdi-react/ArrowDownBoldHexagonOutlineIcon"
        ),
    ),
    "mdi-arrow-down-bold": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowDownBoldIcon" */
            "mdi-react/ArrowDownBoldIcon"
        ),
    ),
    "mdi-arrow-down-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowDownBoxIcon" */
            "mdi-react/ArrowDownBoxIcon"
        ),
    ),
    "mdi-arrow-down-drop-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowDownDropCircleOutlineIcon" */
            "mdi-react/ArrowDownDropCircleOutlineIcon"
        ),
    ),
    "mdi-arrow-down-drop-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowDownDropCircleIcon" */
            "mdi-react/ArrowDownDropCircleIcon"
        ),
    ),
    "mdi-arrow-down-thick": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowDownThickIcon" */
            "mdi-react/ArrowDownThickIcon"
        ),
    ),
    "mdi-arrow-down": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowDownIcon" */
            "mdi-react/ArrowDownIcon"
        ),
    ),
    "mdi-arrow-expand-all": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowExpandAllIcon" */
            "mdi-react/ArrowExpandAllIcon"
        ),
    ),
    "mdi-arrow-expand-down": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowExpandDownIcon" */
            "mdi-react/ArrowExpandDownIcon"
        ),
    ),
    "mdi-arrow-expand-horizontal": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowExpandHorizontalIcon" */
            "mdi-react/ArrowExpandHorizontalIcon"
        ),
    ),
    "mdi-arrow-expand-left": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowExpandLeftIcon" */
            "mdi-react/ArrowExpandLeftIcon"
        ),
    ),
    "mdi-arrow-expand-right": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowExpandRightIcon" */
            "mdi-react/ArrowExpandRightIcon"
        ),
    ),
    "mdi-arrow-expand-up": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowExpandUpIcon" */
            "mdi-react/ArrowExpandUpIcon"
        ),
    ),
    "mdi-arrow-expand-vertical": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowExpandVerticalIcon" */
            "mdi-react/ArrowExpandVerticalIcon"
        ),
    ),
    "mdi-arrow-expand": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowExpandIcon" */
            "mdi-react/ArrowExpandIcon"
        ),
    ),
    "mdi-arrow-left-bold-box-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowLeftBoldBoxOutlineIcon" */
            "mdi-react/ArrowLeftBoldBoxOutlineIcon"
        ),
    ),
    "mdi-arrow-left-bold-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowLeftBoldBoxIcon" */
            "mdi-react/ArrowLeftBoldBoxIcon"
        ),
    ),
    "mdi-arrow-left-bold-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowLeftBoldCircleOutlineIcon" */
            "mdi-react/ArrowLeftBoldCircleOutlineIcon"
        ),
    ),
    "mdi-arrow-left-bold-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowLeftBoldCircleIcon" */
            "mdi-react/ArrowLeftBoldCircleIcon"
        ),
    ),
    "mdi-arrow-left-bold-hexagon-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowLeftBoldHexagonOutlineIcon" */
            "mdi-react/ArrowLeftBoldHexagonOutlineIcon"
        ),
    ),
    "mdi-arrow-left-bold": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowLeftBoldIcon" */
            "mdi-react/ArrowLeftBoldIcon"
        ),
    ),
    "mdi-arrow-left-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowLeftBoxIcon" */
            "mdi-react/ArrowLeftBoxIcon"
        ),
    ),
    "mdi-arrow-left-drop-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowLeftDropCircleOutlineIcon" */
            "mdi-react/ArrowLeftDropCircleOutlineIcon"
        ),
    ),
    "mdi-arrow-left-drop-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowLeftDropCircleIcon" */
            "mdi-react/ArrowLeftDropCircleIcon"
        ),
    ),
    "mdi-arrow-left-thick": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowLeftThickIcon" */
            "mdi-react/ArrowLeftThickIcon"
        ),
    ),
    "mdi-arrow-left": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowLeftIcon" */
            "mdi-react/ArrowLeftIcon"
        ),
    ),
    "mdi-arrow-right-bold-box-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowRightBoldBoxOutlineIcon" */
            "mdi-react/ArrowRightBoldBoxOutlineIcon"
        ),
    ),
    "mdi-arrow-right-bold-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowRightBoldBoxIcon" */
            "mdi-react/ArrowRightBoldBoxIcon"
        ),
    ),
    "mdi-arrow-right-bold-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowRightBoldCircleOutlineIcon" */
            "mdi-react/ArrowRightBoldCircleOutlineIcon"
        ),
    ),
    "mdi-arrow-right-bold-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowRightBoldCircleIcon" */
            "mdi-react/ArrowRightBoldCircleIcon"
        ),
    ),
    "mdi-arrow-right-bold-hexagon-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowRightBoldHexagonOutlineIcon" */
            "mdi-react/ArrowRightBoldHexagonOutlineIcon"
        ),
    ),
    "mdi-arrow-right-bold": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowRightBoldIcon" */
            "mdi-react/ArrowRightBoldIcon"
        ),
    ),
    "mdi-arrow-right-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowRightBoxIcon" */
            "mdi-react/ArrowRightBoxIcon"
        ),
    ),
    "mdi-arrow-right-drop-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowRightDropCircleOutlineIcon" */
            "mdi-react/ArrowRightDropCircleOutlineIcon"
        ),
    ),
    "mdi-arrow-right-drop-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowRightDropCircleIcon" */
            "mdi-react/ArrowRightDropCircleIcon"
        ),
    ),
    "mdi-arrow-right-thick": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowRightThickIcon" */
            "mdi-react/ArrowRightThickIcon"
        ),
    ),
    "mdi-arrow-right": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowRightIcon" */
            "mdi-react/ArrowRightIcon"
        ),
    ),
    "mdi-arrow-split-horizontal": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowSplitHorizontalIcon" */
            "mdi-react/ArrowSplitHorizontalIcon"
        ),
    ),
    "mdi-arrow-split-vertical": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowSplitVerticalIcon" */
            "mdi-react/ArrowSplitVerticalIcon"
        ),
    ),
    "mdi-arrow-top-left": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowTopLeftIcon" */
            "mdi-react/ArrowTopLeftIcon"
        ),
    ),
    "mdi-arrow-top-right": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowTopRightIcon" */
            "mdi-react/ArrowTopRightIcon"
        ),
    ),
    "mdi-arrow-up-bold-box-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowUpBoldBoxOutlineIcon" */
            "mdi-react/ArrowUpBoldBoxOutlineIcon"
        ),
    ),
    "mdi-arrow-up-bold-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowUpBoldBoxIcon" */
            "mdi-react/ArrowUpBoldBoxIcon"
        ),
    ),
    "mdi-arrow-up-bold-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowUpBoldCircleOutlineIcon" */
            "mdi-react/ArrowUpBoldCircleOutlineIcon"
        ),
    ),
    "mdi-arrow-up-bold-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowUpBoldCircleIcon" */
            "mdi-react/ArrowUpBoldCircleIcon"
        ),
    ),
    "mdi-arrow-up-bold-hexagon-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowUpBoldHexagonOutlineIcon" */
            "mdi-react/ArrowUpBoldHexagonOutlineIcon"
        ),
    ),
    "mdi-arrow-up-bold": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowUpBoldIcon" */
            "mdi-react/ArrowUpBoldIcon"
        ),
    ),
    "mdi-arrow-up-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowUpBoxIcon" */
            "mdi-react/ArrowUpBoxIcon"
        ),
    ),
    "mdi-arrow-up-drop-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowUpDropCircleOutlineIcon" */
            "mdi-react/ArrowUpDropCircleOutlineIcon"
        ),
    ),
    "mdi-arrow-up-drop-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowUpDropCircleIcon" */
            "mdi-react/ArrowUpDropCircleIcon"
        ),
    ),
    "mdi-arrow-up-thick": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowUpThickIcon" */
            "mdi-react/ArrowUpThickIcon"
        ),
    ),
    "mdi-arrow-up": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowUpIcon" */
            "mdi-react/ArrowUpIcon"
        ),
    ),
    "mdi-artist": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArtistIcon" */
            "mdi-react/ArtistIcon"
        ),
    ),
    "mdi-assistant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AssistantIcon" */
            "mdi-react/AssistantIcon"
        ),
    ),
    "mdi-asterisk": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AsteriskIcon" */
            "mdi-react/AsteriskIcon"
        ),
    ),
    "mdi-at": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AtIcon" */
            "mdi-react/AtIcon"
        ),
    ),
    "mdi-atlassian": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AtlassianIcon" */
            "mdi-react/AtlassianIcon"
        ),
    ),
    "mdi-atom": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AtomIcon" */
            "mdi-react/AtomIcon"
        ),
    ),
    "mdi-attachment": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AttachmentIcon" */
            "mdi-react/AttachmentIcon"
        ),
    ),
    "mdi-audio-video": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AudioVideoIcon" */
            "mdi-react/AudioVideoIcon"
        ),
    ),
    "mdi-audiobook": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AudiobookIcon" */
            "mdi-react/AudiobookIcon"
        ),
    ),
    "mdi-augmented-reality": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AugmentedRealityIcon" */
            "mdi-react/AugmentedRealityIcon"
        ),
    ),
    "mdi-auto-fix": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AutoFixIcon" */
            "mdi-react/AutoFixIcon"
        ),
    ),
    "mdi-auto-upload": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AutoUploadIcon" */
            "mdi-react/AutoUploadIcon"
        ),
    ),
    "mdi-autorenew": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AutorenewIcon" */
            "mdi-react/AutorenewIcon"
        ),
    ),
    "mdi-av-timer": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AvTimerIcon" */
            "mdi-react/AvTimerIcon"
        ),
    ),
    "mdi-axe": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AxeIcon" */
            "mdi-react/AxeIcon"
        ),
    ),
    "mdi-azure": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AzureIcon" */
            "mdi-react/AzureIcon"
        ),
    ),
    "mdi-baby-buggy": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BabyBuggyIcon" */
            "mdi-react/BabyBuggyIcon"
        ),
    ),
    "mdi-baby": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BabyIcon" */
            "mdi-react/BabyIcon"
        ),
    ),
    "mdi-backburger": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BackburgerIcon" */
            "mdi-react/BackburgerIcon"
        ),
    ),
    "mdi-backspace": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BackspaceIcon" */
            "mdi-react/BackspaceIcon"
        ),
    ),
    "mdi-backup-restore": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BackupRestoreIcon" */
            "mdi-react/BackupRestoreIcon"
        ),
    ),
    "mdi-badminton": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BadmintonIcon" */
            "mdi-react/BadmintonIcon"
        ),
    ),
    "mdi-bandcamp": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BandcampIcon" */
            "mdi-react/BandcampIcon"
        ),
    ),
    "mdi-bank": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BankIcon" */
            "mdi-react/BankIcon"
        ),
    ),
    "mdi-barcode-scan": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BarcodeScanIcon" */
            "mdi-react/BarcodeScanIcon"
        ),
    ),
    "mdi-barcode": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BarcodeIcon" */
            "mdi-react/BarcodeIcon"
        ),
    ),
    "mdi-barley": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BarleyIcon" */
            "mdi-react/BarleyIcon"
        ),
    ),
    "mdi-barrel": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BarrelIcon" */
            "mdi-react/BarrelIcon"
        ),
    ),
    "mdi-baseball-bat": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BaseballBatIcon" */
            "mdi-react/BaseballBatIcon"
        ),
    ),
    "mdi-baseball": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BaseballIcon" */
            "mdi-react/BaseballIcon"
        ),
    ),
    "mdi-basecamp": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BasecampIcon" */
            "mdi-react/BasecampIcon"
        ),
    ),
    "mdi-basket-fill": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BasketFillIcon" */
            "mdi-react/BasketFillIcon"
        ),
    ),
    "mdi-basket-unfill": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BasketUnfillIcon" */
            "mdi-react/BasketUnfillIcon"
        ),
    ),
    "mdi-basket": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BasketIcon" */
            "mdi-react/BasketIcon"
        ),
    ),
    "mdi-basketball": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BasketballIcon" */
            "mdi-react/BasketballIcon"
        ),
    ),
    "mdi-battery-10-bluetooth": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Battery10BluetoothIcon" */
            "mdi-react/Battery10BluetoothIcon"
        ),
    ),
    "mdi-battery-10": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Battery10Icon" */
            "mdi-react/Battery10Icon"
        ),
    ),
    "mdi-battery-20-bluetooth": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Battery20BluetoothIcon" */
            "mdi-react/Battery20BluetoothIcon"
        ),
    ),
    "mdi-battery-20": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Battery20Icon" */
            "mdi-react/Battery20Icon"
        ),
    ),
    "mdi-battery-30-bluetooth": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Battery30BluetoothIcon" */
            "mdi-react/Battery30BluetoothIcon"
        ),
    ),
    "mdi-battery-30": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Battery30Icon" */
            "mdi-react/Battery30Icon"
        ),
    ),
    "mdi-battery-40-bluetooth": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Battery40BluetoothIcon" */
            "mdi-react/Battery40BluetoothIcon"
        ),
    ),
    "mdi-battery-40": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Battery40Icon" */
            "mdi-react/Battery40Icon"
        ),
    ),
    "mdi-battery-50-bluetooth": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Battery50BluetoothIcon" */
            "mdi-react/Battery50BluetoothIcon"
        ),
    ),
    "mdi-battery-50": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Battery50Icon" */
            "mdi-react/Battery50Icon"
        ),
    ),
    "mdi-battery-60-bluetooth": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Battery60BluetoothIcon" */
            "mdi-react/Battery60BluetoothIcon"
        ),
    ),
    "mdi-battery-60": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Battery60Icon" */
            "mdi-react/Battery60Icon"
        ),
    ),
    "mdi-battery-70-bluetooth": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Battery70BluetoothIcon" */
            "mdi-react/Battery70BluetoothIcon"
        ),
    ),
    "mdi-battery-70": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Battery70Icon" */
            "mdi-react/Battery70Icon"
        ),
    ),
    "mdi-battery-80-bluetooth": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Battery80BluetoothIcon" */
            "mdi-react/Battery80BluetoothIcon"
        ),
    ),
    "mdi-battery-80": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Battery80Icon" */
            "mdi-react/Battery80Icon"
        ),
    ),
    "mdi-battery-90-bluetooth": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Battery90BluetoothIcon" */
            "mdi-react/Battery90BluetoothIcon"
        ),
    ),
    "mdi-battery-90": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Battery90Icon" */
            "mdi-react/Battery90Icon"
        ),
    ),
    "mdi-battery-alert-bluetooth": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BatteryAlertBluetoothIcon" */
            "mdi-react/BatteryAlertBluetoothIcon"
        ),
    ),
    "mdi-battery-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BatteryAlertIcon" */
            "mdi-react/BatteryAlertIcon"
        ),
    ),
    "mdi-battery-bluetooth-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BatteryBluetoothVariantIcon" */
            "mdi-react/BatteryBluetoothVariantIcon"
        ),
    ),
    "mdi-battery-bluetooth": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BatteryBluetoothIcon" */
            "mdi-react/BatteryBluetoothIcon"
        ),
    ),
    "mdi-battery-charging-10": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BatteryCharging10Icon" */
            "mdi-react/BatteryCharging10Icon"
        ),
    ),
    "mdi-battery-charging-100": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BatteryCharging100Icon" */
            "mdi-react/BatteryCharging100Icon"
        ),
    ),
    "mdi-battery-charging-20": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BatteryCharging20Icon" */
            "mdi-react/BatteryCharging20Icon"
        ),
    ),
    "mdi-battery-charging-30": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BatteryCharging30Icon" */
            "mdi-react/BatteryCharging30Icon"
        ),
    ),
    "mdi-battery-charging-40": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BatteryCharging40Icon" */
            "mdi-react/BatteryCharging40Icon"
        ),
    ),
    "mdi-battery-charging-50": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BatteryCharging50Icon" */
            "mdi-react/BatteryCharging50Icon"
        ),
    ),
    "mdi-battery-charging-60": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BatteryCharging60Icon" */
            "mdi-react/BatteryCharging60Icon"
        ),
    ),
    "mdi-battery-charging-70": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BatteryCharging70Icon" */
            "mdi-react/BatteryCharging70Icon"
        ),
    ),
    "mdi-battery-charging-80": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BatteryCharging80Icon" */
            "mdi-react/BatteryCharging80Icon"
        ),
    ),
    "mdi-battery-charging-90": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BatteryCharging90Icon" */
            "mdi-react/BatteryCharging90Icon"
        ),
    ),
    "mdi-battery-charging-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BatteryChargingOutlineIcon" */
            "mdi-react/BatteryChargingOutlineIcon"
        ),
    ),
    "mdi-battery-charging-wireless-10": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BatteryChargingWireless10Icon" */
            "mdi-react/BatteryChargingWireless10Icon"
        ),
    ),
    "mdi-battery-charging-wireless-20": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BatteryChargingWireless20Icon" */
            "mdi-react/BatteryChargingWireless20Icon"
        ),
    ),
    "mdi-battery-charging-wireless-30": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BatteryChargingWireless30Icon" */
            "mdi-react/BatteryChargingWireless30Icon"
        ),
    ),
    "mdi-battery-charging-wireless-40": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BatteryChargingWireless40Icon" */
            "mdi-react/BatteryChargingWireless40Icon"
        ),
    ),
    "mdi-battery-charging-wireless-50": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BatteryChargingWireless50Icon" */
            "mdi-react/BatteryChargingWireless50Icon"
        ),
    ),
    "mdi-battery-charging-wireless-60": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BatteryChargingWireless60Icon" */
            "mdi-react/BatteryChargingWireless60Icon"
        ),
    ),
    "mdi-battery-charging-wireless-70": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BatteryChargingWireless70Icon" */
            "mdi-react/BatteryChargingWireless70Icon"
        ),
    ),
    "mdi-battery-charging-wireless-80": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BatteryChargingWireless80Icon" */
            "mdi-react/BatteryChargingWireless80Icon"
        ),
    ),
    "mdi-battery-charging-wireless-90": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BatteryChargingWireless90Icon" */
            "mdi-react/BatteryChargingWireless90Icon"
        ),
    ),
    "mdi-battery-charging-wireless-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BatteryChargingWirelessAlertIcon" */
            "mdi-react/BatteryChargingWirelessAlertIcon"
        ),
    ),
    "mdi-battery-charging-wireless-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BatteryChargingWirelessOutlineIcon" */
            "mdi-react/BatteryChargingWirelessOutlineIcon"
        ),
    ),
    "mdi-battery-charging-wireless": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BatteryChargingWirelessIcon" */
            "mdi-react/BatteryChargingWirelessIcon"
        ),
    ),
    "mdi-battery-charging": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BatteryChargingIcon" */
            "mdi-react/BatteryChargingIcon"
        ),
    ),
    "mdi-battery-minus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BatteryMinusIcon" */
            "mdi-react/BatteryMinusIcon"
        ),
    ),
    "mdi-battery-negative": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BatteryNegativeIcon" */
            "mdi-react/BatteryNegativeIcon"
        ),
    ),
    "mdi-battery-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BatteryOutlineIcon" */
            "mdi-react/BatteryOutlineIcon"
        ),
    ),
    "mdi-battery-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BatteryPlusIcon" */
            "mdi-react/BatteryPlusIcon"
        ),
    ),
    "mdi-battery-positive": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BatteryPositiveIcon" */
            "mdi-react/BatteryPositiveIcon"
        ),
    ),
    "mdi-battery-unknown-bluetooth": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BatteryUnknownBluetoothIcon" */
            "mdi-react/BatteryUnknownBluetoothIcon"
        ),
    ),
    "mdi-battery-unknown": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BatteryUnknownIcon" */
            "mdi-react/BatteryUnknownIcon"
        ),
    ),
    "mdi-battery": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BatteryIcon" */
            "mdi-react/BatteryIcon"
        ),
    ),
    "mdi-beach": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BeachIcon" */
            "mdi-react/BeachIcon"
        ),
    ),
    "mdi-beaker": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BeakerIcon" */
            "mdi-react/BeakerIcon"
        ),
    ),
    "mdi-beats": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BeatsIcon" */
            "mdi-react/BeatsIcon"
        ),
    ),
    "mdi-bed-empty": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BedEmptyIcon" */
            "mdi-react/BedEmptyIcon"
        ),
    ),
    "mdi-beer": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BeerIcon" */
            "mdi-react/BeerIcon"
        ),
    ),
    "mdi-behance": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BehanceIcon" */
            "mdi-react/BehanceIcon"
        ),
    ),
    "mdi-bell-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BellOffIcon" */
            "mdi-react/BellOffIcon"
        ),
    ),
    "mdi-bell-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BellOutlineIcon" */
            "mdi-react/BellOutlineIcon"
        ),
    ),
    "mdi-bell-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BellPlusIcon" */
            "mdi-react/BellPlusIcon"
        ),
    ),
    "mdi-bell-ring-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BellRingOutlineIcon" */
            "mdi-react/BellRingOutlineIcon"
        ),
    ),
    "mdi-bell-ring": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BellRingIcon" */
            "mdi-react/BellRingIcon"
        ),
    ),
    "mdi-bell-sleep": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BellSleepIcon" */
            "mdi-react/BellSleepIcon"
        ),
    ),
    "mdi-bell": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BellIcon" */
            "mdi-react/BellIcon"
        ),
    ),
    "mdi-beta": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BetaIcon" */
            "mdi-react/BetaIcon"
        ),
    ),
    "mdi-bible": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BibleIcon" */
            "mdi-react/BibleIcon"
        ),
    ),
    "mdi-bike": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BikeIcon" */
            "mdi-react/BikeIcon"
        ),
    ),
    "mdi-bing": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BingIcon" */
            "mdi-react/BingIcon"
        ),
    ),
    "mdi-binoculars": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BinocularsIcon" */
            "mdi-react/BinocularsIcon"
        ),
    ),
    "mdi-bio": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BioIcon" */
            "mdi-react/BioIcon"
        ),
    ),
    "mdi-biohazard": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BiohazardIcon" */
            "mdi-react/BiohazardIcon"
        ),
    ),
    "mdi-bitbucket": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BitbucketIcon" */
            "mdi-react/BitbucketIcon"
        ),
    ),
    "mdi-bitcoin": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BitcoinIcon" */
            "mdi-react/BitcoinIcon"
        ),
    ),
    "mdi-black-mesa": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BlackMesaIcon" */
            "mdi-react/BlackMesaIcon"
        ),
    ),
    "mdi-blackberry": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BlackberryIcon" */
            "mdi-react/BlackberryIcon"
        ),
    ),
    "mdi-blender": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BlenderIcon" */
            "mdi-react/BlenderIcon"
        ),
    ),
    "mdi-blinds": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BlindsIcon" */
            "mdi-react/BlindsIcon"
        ),
    ),
    "mdi-block-helper": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BlockHelperIcon" */
            "mdi-react/BlockHelperIcon"
        ),
    ),
    "mdi-blogger": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BloggerIcon" */
            "mdi-react/BloggerIcon"
        ),
    ),
    "mdi-bluetooth-audio": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BluetoothAudioIcon" */
            "mdi-react/BluetoothAudioIcon"
        ),
    ),
    "mdi-bluetooth-connect": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BluetoothConnectIcon" */
            "mdi-react/BluetoothConnectIcon"
        ),
    ),
    "mdi-bluetooth-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BluetoothOffIcon" */
            "mdi-react/BluetoothOffIcon"
        ),
    ),
    "mdi-bluetooth-settings": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BluetoothSettingsIcon" */
            "mdi-react/BluetoothSettingsIcon"
        ),
    ),
    "mdi-bluetooth-transfer": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BluetoothTransferIcon" */
            "mdi-react/BluetoothTransferIcon"
        ),
    ),
    "mdi-bluetooth": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BluetoothIcon" */
            "mdi-react/BluetoothIcon"
        ),
    ),
    "mdi-blur-linear": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BlurLinearIcon" */
            "mdi-react/BlurLinearIcon"
        ),
    ),
    "mdi-blur-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BlurOffIcon" */
            "mdi-react/BlurOffIcon"
        ),
    ),
    "mdi-blur-radial": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BlurRadialIcon" */
            "mdi-react/BlurRadialIcon"
        ),
    ),
    "mdi-blur": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BlurIcon" */
            "mdi-react/BlurIcon"
        ),
    ),
    "mdi-bomb-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BombOffIcon" */
            "mdi-react/BombOffIcon"
        ),
    ),
    "mdi-bomb": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BombIcon" */
            "mdi-react/BombIcon"
        ),
    ),
    "mdi-bone": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BoneIcon" */
            "mdi-react/BoneIcon"
        ),
    ),
    "mdi-book-minus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BookMinusIcon" */
            "mdi-react/BookMinusIcon"
        ),
    ),
    "mdi-book-multiple-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BookMultipleVariantIcon" */
            "mdi-react/BookMultipleVariantIcon"
        ),
    ),
    "mdi-book-multiple": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BookMultipleIcon" */
            "mdi-react/BookMultipleIcon"
        ),
    ),
    "mdi-book-open-page-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BookOpenPageVariantIcon" */
            "mdi-react/BookOpenPageVariantIcon"
        ),
    ),
    "mdi-book-open-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BookOpenVariantIcon" */
            "mdi-react/BookOpenVariantIcon"
        ),
    ),
    "mdi-book-open": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BookOpenIcon" */
            "mdi-react/BookOpenIcon"
        ),
    ),
    "mdi-book-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BookPlusIcon" */
            "mdi-react/BookPlusIcon"
        ),
    ),
    "mdi-book-secure": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BookSecureIcon" */
            "mdi-react/BookSecureIcon"
        ),
    ),
    "mdi-book-unsecure": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BookUnsecureIcon" */
            "mdi-react/BookUnsecureIcon"
        ),
    ),
    "mdi-book-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BookVariantIcon" */
            "mdi-react/BookVariantIcon"
        ),
    ),
    "mdi-book": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BookIcon" */
            "mdi-react/BookIcon"
        ),
    ),
    "mdi-bookmark-check": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BookmarkCheckIcon" */
            "mdi-react/BookmarkCheckIcon"
        ),
    ),
    "mdi-bookmark-music": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BookmarkMusicIcon" */
            "mdi-react/BookmarkMusicIcon"
        ),
    ),
    "mdi-bookmark-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BookmarkOutlineIcon" */
            "mdi-react/BookmarkOutlineIcon"
        ),
    ),
    "mdi-bookmark-plus-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BookmarkPlusOutlineIcon" */
            "mdi-react/BookmarkPlusOutlineIcon"
        ),
    ),
    "mdi-bookmark-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BookmarkPlusIcon" */
            "mdi-react/BookmarkPlusIcon"
        ),
    ),
    "mdi-bookmark-remove": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BookmarkRemoveIcon" */
            "mdi-react/BookmarkRemoveIcon"
        ),
    ),
    "mdi-bookmark": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BookmarkIcon" */
            "mdi-react/BookmarkIcon"
        ),
    ),
    "mdi-boombox": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BoomboxIcon" */
            "mdi-react/BoomboxIcon"
        ),
    ),
    "mdi-bootstrap": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BootstrapIcon" */
            "mdi-react/BootstrapIcon"
        ),
    ),
    "mdi-border-all-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BorderAllVariantIcon" */
            "mdi-react/BorderAllVariantIcon"
        ),
    ),
    "mdi-border-all": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BorderAllIcon" */
            "mdi-react/BorderAllIcon"
        ),
    ),
    "mdi-border-bottom-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BorderBottomVariantIcon" */
            "mdi-react/BorderBottomVariantIcon"
        ),
    ),
    "mdi-border-bottom": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BorderBottomIcon" */
            "mdi-react/BorderBottomIcon"
        ),
    ),
    "mdi-border-color": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BorderColorIcon" */
            "mdi-react/BorderColorIcon"
        ),
    ),
    "mdi-border-horizontal": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BorderHorizontalIcon" */
            "mdi-react/BorderHorizontalIcon"
        ),
    ),
    "mdi-border-inside": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BorderInsideIcon" */
            "mdi-react/BorderInsideIcon"
        ),
    ),
    "mdi-border-left-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BorderLeftVariantIcon" */
            "mdi-react/BorderLeftVariantIcon"
        ),
    ),
    "mdi-border-left": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BorderLeftIcon" */
            "mdi-react/BorderLeftIcon"
        ),
    ),
    "mdi-border-none-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BorderNoneVariantIcon" */
            "mdi-react/BorderNoneVariantIcon"
        ),
    ),
    "mdi-border-none": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BorderNoneIcon" */
            "mdi-react/BorderNoneIcon"
        ),
    ),
    "mdi-border-outside": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BorderOutsideIcon" */
            "mdi-react/BorderOutsideIcon"
        ),
    ),
    "mdi-border-right-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BorderRightVariantIcon" */
            "mdi-react/BorderRightVariantIcon"
        ),
    ),
    "mdi-border-right": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BorderRightIcon" */
            "mdi-react/BorderRightIcon"
        ),
    ),
    "mdi-border-style": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BorderStyleIcon" */
            "mdi-react/BorderStyleIcon"
        ),
    ),
    "mdi-border-top-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BorderTopVariantIcon" */
            "mdi-react/BorderTopVariantIcon"
        ),
    ),
    "mdi-border-top": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BorderTopIcon" */
            "mdi-react/BorderTopIcon"
        ),
    ),
    "mdi-border-vertical": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BorderVerticalIcon" */
            "mdi-react/BorderVerticalIcon"
        ),
    ),
    "mdi-bottle-wine": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BottleWineIcon" */
            "mdi-react/BottleWineIcon"
        ),
    ),
    "mdi-bow-tie": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BowTieIcon" */
            "mdi-react/BowTieIcon"
        ),
    ),
    "mdi-bowl": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BowlIcon" */
            "mdi-react/BowlIcon"
        ),
    ),
    "mdi-bowling": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BowlingIcon" */
            "mdi-react/BowlingIcon"
        ),
    ),
    "mdi-box-cutter": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BoxCutterIcon" */
            "mdi-react/BoxCutterIcon"
        ),
    ),
    "mdi-box-shadow": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BoxShadowIcon" */
            "mdi-react/BoxShadowIcon"
        ),
    ),
    "mdi-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BoxIcon" */
            "mdi-react/BoxIcon"
        ),
    ),
    "mdi-bridge": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BridgeIcon" */
            "mdi-react/BridgeIcon"
        ),
    ),
    "mdi-briefcase-check": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BriefcaseCheckIcon" */
            "mdi-react/BriefcaseCheckIcon"
        ),
    ),
    "mdi-briefcase-download": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BriefcaseDownloadIcon" */
            "mdi-react/BriefcaseDownloadIcon"
        ),
    ),
    "mdi-briefcase-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BriefcaseOutlineIcon" */
            "mdi-react/BriefcaseOutlineIcon"
        ),
    ),
    "mdi-briefcase-upload": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BriefcaseUploadIcon" */
            "mdi-react/BriefcaseUploadIcon"
        ),
    ),
    "mdi-briefcase": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BriefcaseIcon" */
            "mdi-react/BriefcaseIcon"
        ),
    ),
    "mdi-brightness-1": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Brightness1Icon" */
            "mdi-react/Brightness1Icon"
        ),
    ),
    "mdi-brightness-2": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Brightness2Icon" */
            "mdi-react/Brightness2Icon"
        ),
    ),
    "mdi-brightness-3": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Brightness3Icon" */
            "mdi-react/Brightness3Icon"
        ),
    ),
    "mdi-brightness-4": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Brightness4Icon" */
            "mdi-react/Brightness4Icon"
        ),
    ),
    "mdi-brightness-5": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Brightness5Icon" */
            "mdi-react/Brightness5Icon"
        ),
    ),
    "mdi-brightness-6": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Brightness6Icon" */
            "mdi-react/Brightness6Icon"
        ),
    ),
    "mdi-brightness-7": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Brightness7Icon" */
            "mdi-react/Brightness7Icon"
        ),
    ),
    "mdi-brightness-auto": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BrightnessAutoIcon" */
            "mdi-react/BrightnessAutoIcon"
        ),
    ),
    "mdi-broom": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BroomIcon" */
            /* webpackPrefetch: true */
            "mdi-react/BroomIcon"
        ),
    ),
    "mdi-brush": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BrushIcon" */
            "mdi-react/BrushIcon"
        ),
    ),
    "mdi-buddhism": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BuddhismIcon" */
            "mdi-react/BuddhismIcon"
        ),
    ),
    "mdi-buffer": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BufferIcon" */
            "mdi-react/BufferIcon"
        ),
    ),
    "mdi-bug": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BugIcon" */
            "mdi-react/BugIcon"
        ),
    ),
    "mdi-bulletin-board": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BulletinBoardIcon" */
            "mdi-react/BulletinBoardIcon"
        ),
    ),
    "mdi-bullhorn": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BullhornIcon" */
            "mdi-react/BullhornIcon"
        ),
    ),
    "mdi-bullseye-arrow": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BullseyeArrowIcon" */
            "mdi-react/BullseyeArrowIcon"
        ),
    ),
    "mdi-bullseye": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BullseyeIcon" */
            "mdi-react/BullseyeIcon"
        ),
    ),
    "mdi-bus-articulated-end": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BusArticulatedEndIcon" */
            "mdi-react/BusArticulatedEndIcon"
        ),
    ),
    "mdi-bus-articulated-front": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BusArticulatedFrontIcon" */
            "mdi-react/BusArticulatedFrontIcon"
        ),
    ),
    "mdi-bus-clock": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BusClockIcon" */
            "mdi-react/BusClockIcon"
        ),
    ),
    "mdi-bus-double-decker": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BusDoubleDeckerIcon" */
            "mdi-react/BusDoubleDeckerIcon"
        ),
    ),
    "mdi-bus-school": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BusSchoolIcon" */
            "mdi-react/BusSchoolIcon"
        ),
    ),
    "mdi-bus-side": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BusSideIcon" */
            "mdi-react/BusSideIcon"
        ),
    ),
    "mdi-bus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BusIcon" */
            "mdi-react/BusIcon"
        ),
    ),
    "mdi-cached": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CachedIcon" */
            "mdi-react/CachedIcon"
        ),
    ),
    "mdi-cake-layered": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CakeLayeredIcon" */
            "mdi-react/CakeLayeredIcon"
        ),
    ),
    "mdi-cake-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CakeVariantIcon" */
            "mdi-react/CakeVariantIcon"
        ),
    ),
    "mdi-cake": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CakeIcon" */
            "mdi-react/CakeIcon"
        ),
    ),
    "mdi-calculator": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CalculatorIcon" */
            "mdi-react/CalculatorIcon"
        ),
    ),
    "mdi-calendar-blank": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CalendarBlankIcon" */
            "mdi-react/CalendarBlankIcon"
        ),
    ),
    "mdi-calendar-check": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CalendarCheckIcon" */
            "mdi-react/CalendarCheckIcon"
        ),
    ),
    "mdi-calendar-clock": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CalendarClockIcon" */
            "mdi-react/CalendarClockIcon"
        ),
    ),
    "mdi-calendar-edit": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CalendarEditIcon" */
            "mdi-react/CalendarEditIcon"
        ),
    ),
    "mdi-calendar-multiple-check": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CalendarMultipleCheckIcon" */
            "mdi-react/CalendarMultipleCheckIcon"
        ),
    ),
    "mdi-calendar-multiple": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CalendarMultipleIcon" */
            "mdi-react/CalendarMultipleIcon"
        ),
    ),
    "mdi-calendar-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CalendarPlusIcon" */
            "mdi-react/CalendarPlusIcon"
        ),
    ),
    "mdi-calendar-question": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CalendarQuestionIcon" */
            "mdi-react/CalendarQuestionIcon"
        ),
    ),
    "mdi-calendar-range": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CalendarRangeIcon" */
            "mdi-react/CalendarRangeIcon"
        ),
    ),
    "mdi-calendar-remove": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CalendarRemoveIcon" */
            "mdi-react/CalendarRemoveIcon"
        ),
    ),
    "mdi-calendar-search": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CalendarSearchIcon" */
            "mdi-react/CalendarSearchIcon"
        ),
    ),
    "mdi-calendar-text": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CalendarTextIcon" */
            "mdi-react/CalendarTextIcon"
        ),
    ),
    "mdi-calendar-today": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CalendarTodayIcon" */
            "mdi-react/CalendarTodayIcon"
        ),
    ),
    "mdi-calendar": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CalendarIcon" */
            "mdi-react/CalendarIcon"
        ),
    ),
    "mdi-call-made": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CallMadeIcon" */
            "mdi-react/CallMadeIcon"
        ),
    ),
    "mdi-call-merge": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CallMergeIcon" */
            "mdi-react/CallMergeIcon"
        ),
    ),
    "mdi-call-missed": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CallMissedIcon" */
            "mdi-react/CallMissedIcon"
        ),
    ),
    "mdi-call-received": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CallReceivedIcon" */
            "mdi-react/CallReceivedIcon"
        ),
    ),
    "mdi-call-split": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CallSplitIcon" */
            "mdi-react/CallSplitIcon"
        ),
    ),
    "mdi-camcorder-box-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CamcorderBoxOffIcon" */
            "mdi-react/CamcorderBoxOffIcon"
        ),
    ),
    "mdi-camcorder-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CamcorderBoxIcon" */
            "mdi-react/CamcorderBoxIcon"
        ),
    ),
    "mdi-camcorder-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CamcorderOffIcon" */
            "mdi-react/CamcorderOffIcon"
        ),
    ),
    "mdi-camcorder": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CamcorderIcon" */
            "mdi-react/CamcorderIcon"
        ),
    ),
    "mdi-camera-account": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CameraAccountIcon" */
            "mdi-react/CameraAccountIcon"
        ),
    ),
    "mdi-camera-burst": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CameraBurstIcon" */
            "mdi-react/CameraBurstIcon"
        ),
    ),
    "mdi-camera-enhance": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CameraEnhanceIcon" */
            "mdi-react/CameraEnhanceIcon"
        ),
    ),
    "mdi-camera-front-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CameraFrontVariantIcon" */
            "mdi-react/CameraFrontVariantIcon"
        ),
    ),
    "mdi-camera-front": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CameraFrontIcon" */
            "mdi-react/CameraFrontIcon"
        ),
    ),
    "mdi-camera-gopro": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CameraGoproIcon" */
            "mdi-react/CameraGoproIcon"
        ),
    ),
    "mdi-camera-image": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CameraImageIcon" */
            "mdi-react/CameraImageIcon"
        ),
    ),
    "mdi-camera-iris": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CameraIrisIcon" */
            "mdi-react/CameraIrisIcon"
        ),
    ),
    "mdi-camera-metering-center": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CameraMeteringCenterIcon" */
            "mdi-react/CameraMeteringCenterIcon"
        ),
    ),
    "mdi-camera-metering-matrix": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CameraMeteringMatrixIcon" */
            "mdi-react/CameraMeteringMatrixIcon"
        ),
    ),
    "mdi-camera-metering-partial": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CameraMeteringPartialIcon" */
            "mdi-react/CameraMeteringPartialIcon"
        ),
    ),
    "mdi-camera-metering-spot": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CameraMeteringSpotIcon" */
            "mdi-react/CameraMeteringSpotIcon"
        ),
    ),
    "mdi-camera-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CameraOffIcon" */
            "mdi-react/CameraOffIcon"
        ),
    ),
    "mdi-camera-party-mode": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CameraPartyModeIcon" */
            "mdi-react/CameraPartyModeIcon"
        ),
    ),
    "mdi-camera-rear-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CameraRearVariantIcon" */
            "mdi-react/CameraRearVariantIcon"
        ),
    ),
    "mdi-camera-rear": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CameraRearIcon" */
            "mdi-react/CameraRearIcon"
        ),
    ),
    "mdi-camera-switch": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CameraSwitchIcon" */
            "mdi-react/CameraSwitchIcon"
        ),
    ),
    "mdi-camera-timer": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CameraTimerIcon" */
            "mdi-react/CameraTimerIcon"
        ),
    ),
    "mdi-camera": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CameraIcon" */
            "mdi-react/CameraIcon"
        ),
    ),
    "mdi-cancel": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CancelIcon" */
            "mdi-react/CancelIcon"
        ),
    ),
    "mdi-candle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CandleIcon" */
            "mdi-react/CandleIcon"
        ),
    ),
    "mdi-candycane": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CandycaneIcon" */
            "mdi-react/CandycaneIcon"
        ),
    ),
    "mdi-cannabis": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CannabisIcon" */
            "mdi-react/CannabisIcon"
        ),
    ),
    "mdi-car-battery": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CarBatteryIcon" */
            "mdi-react/CarBatteryIcon"
        ),
    ),
    "mdi-car-connected": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CarConnectedIcon" */
            "mdi-react/CarConnectedIcon"
        ),
    ),
    "mdi-car-convertible": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CarConvertibleIcon" */
            "mdi-react/CarConvertibleIcon"
        ),
    ),
    "mdi-car-estate": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CarEstateIcon" */
            "mdi-react/CarEstateIcon"
        ),
    ),
    "mdi-car-hatchback": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CarHatchbackIcon" */
            "mdi-react/CarHatchbackIcon"
        ),
    ),
    "mdi-car-limousine": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CarLimousineIcon" */
            "mdi-react/CarLimousineIcon"
        ),
    ),
    "mdi-car-pickup": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CarPickupIcon" */
            "mdi-react/CarPickupIcon"
        ),
    ),
    "mdi-car-side": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CarSideIcon" */
            "mdi-react/CarSideIcon"
        ),
    ),
    "mdi-car-sports": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CarSportsIcon" */
            "mdi-react/CarSportsIcon"
        ),
    ),
    "mdi-car-wash": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CarWashIcon" */
            "mdi-react/CarWashIcon"
        ),
    ),
    "mdi-car": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CarIcon" */
            "mdi-react/CarIcon"
        ),
    ),
    "mdi-caravan": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CaravanIcon" */
            "mdi-react/CaravanIcon"
        ),
    ),
    "mdi-cards-club": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CardsClubIcon" */
            "mdi-react/CardsClubIcon"
        ),
    ),
    "mdi-cards-diamond": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CardsDiamondIcon" */
            "mdi-react/CardsDiamondIcon"
        ),
    ),
    "mdi-cards-heart": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CardsHeartIcon" */
            "mdi-react/CardsHeartIcon"
        ),
    ),
    "mdi-cards-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CardsOutlineIcon" */
            "mdi-react/CardsOutlineIcon"
        ),
    ),
    "mdi-cards-playing-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CardsPlayingOutlineIcon" */
            "mdi-react/CardsPlayingOutlineIcon"
        ),
    ),
    "mdi-cards-spade": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CardsSpadeIcon" */
            "mdi-react/CardsSpadeIcon"
        ),
    ),
    "mdi-cards-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CardsVariantIcon" */
            "mdi-react/CardsVariantIcon"
        ),
    ),
    "mdi-cards": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CardsIcon" */
            "mdi-react/CardsIcon"
        ),
    ),
    "mdi-carrot": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CarrotIcon" */
            "mdi-react/CarrotIcon"
        ),
    ),
    "mdi-cart-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CartOffIcon" */
            "mdi-react/CartOffIcon"
        ),
    ),
    "mdi-cart-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CartOutlineIcon" */
            "mdi-react/CartOutlineIcon"
        ),
    ),
    "mdi-cart-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CartPlusIcon" */
            "mdi-react/CartPlusIcon"
        ),
    ),
    "mdi-cart": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CartIcon" */
            "mdi-react/CartIcon"
        ),
    ),
    "mdi-case-sensitive-alt": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CaseSensitiveAltIcon" */
            "mdi-react/CaseSensitiveAltIcon"
        ),
    ),
    "mdi-cash-100": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Cash100Icon" */
            "mdi-react/Cash100Icon"
        ),
    ),
    "mdi-cash-multiple": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CashMultipleIcon" */
            "mdi-react/CashMultipleIcon"
        ),
    ),
    "mdi-cash-usd": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CashUsdIcon" */
            "mdi-react/CashUsdIcon"
        ),
    ),
    "mdi-cash": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CashIcon" */
            "mdi-react/CashIcon"
        ),
    ),
    "mdi-cast-connected": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CastConnectedIcon" */
            "mdi-react/CastConnectedIcon"
        ),
    ),
    "mdi-cast-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CastOffIcon" */
            "mdi-react/CastOffIcon"
        ),
    ),
    "mdi-cast": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CastIcon" */
            "mdi-react/CastIcon"
        ),
    ),
    "mdi-castle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CastleIcon" */
            "mdi-react/CastleIcon"
        ),
    ),
    "mdi-cat": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CatIcon" */
            "mdi-react/CatIcon"
        ),
    ),
    "mdi-cctv": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CctvIcon" */
            "mdi-react/CctvIcon"
        ),
    ),
    "mdi-ceiling-light": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CeilingLightIcon" */
            "mdi-react/CeilingLightIcon"
        ),
    ),
    "mdi-cellphone-android": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CellphoneAndroidIcon" */
            "mdi-react/CellphoneAndroidIcon"
        ),
    ),
    "mdi-cellphone-basic": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CellphoneBasicIcon" */
            "mdi-react/CellphoneBasicIcon"
        ),
    ),
    "mdi-cellphone-dock": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CellphoneDockIcon" */
            "mdi-react/CellphoneDockIcon"
        ),
    ),
    "mdi-cellphone-erase": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CellphoneEraseIcon" */
            "mdi-react/CellphoneEraseIcon"
        ),
    ),
    "mdi-cellphone-iphone": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CellphoneIphoneIcon" */
            "mdi-react/CellphoneIphoneIcon"
        ),
    ),
    "mdi-cellphone-key": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CellphoneKeyIcon" */
            "mdi-react/CellphoneKeyIcon"
        ),
    ),
    "mdi-cellphone-link-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CellphoneLinkOffIcon" */
            "mdi-react/CellphoneLinkOffIcon"
        ),
    ),
    "mdi-cellphone-link": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CellphoneLinkIcon" */
            "mdi-react/CellphoneLinkIcon"
        ),
    ),
    "mdi-cellphone-lock": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CellphoneLockIcon" */
            "mdi-react/CellphoneLockIcon"
        ),
    ),
    "mdi-cellphone-message": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CellphoneMessageIcon" */
            "mdi-react/CellphoneMessageIcon"
        ),
    ),
    "mdi-cellphone-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CellphoneOffIcon" */
            "mdi-react/CellphoneOffIcon"
        ),
    ),
    "mdi-cellphone-settings-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CellphoneSettingsVariantIcon" */
            "mdi-react/CellphoneSettingsVariantIcon"
        ),
    ),
    "mdi-cellphone-settings": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CellphoneSettingsIcon" */
            "mdi-react/CellphoneSettingsIcon"
        ),
    ),
    "mdi-cellphone-sound": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CellphoneSoundIcon" */
            "mdi-react/CellphoneSoundIcon"
        ),
    ),
    "mdi-cellphone-text": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CellphoneTextIcon" */
            "mdi-react/CellphoneTextIcon"
        ),
    ),
    "mdi-cellphone-wireless": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CellphoneWirelessIcon" */
            "mdi-react/CellphoneWirelessIcon"
        ),
    ),
    "mdi-cellphone": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CellphoneIcon" */
            "mdi-react/CellphoneIcon"
        ),
    ),
    "mdi-certificate": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CertificateIcon" */
            "mdi-react/CertificateIcon"
        ),
    ),
    "mdi-chair-school": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ChairSchoolIcon" */
            "mdi-react/ChairSchoolIcon"
        ),
    ),
    "mdi-chart-arc": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ChartArcIcon" */
            "mdi-react/ChartArcIcon"
        ),
    ),
    "mdi-chart-areaspline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ChartAreasplineIcon" */
            "mdi-react/ChartAreasplineIcon"
        ),
    ),
    "mdi-chart-bar-stacked": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ChartBarStackedIcon" */
            "mdi-react/ChartBarStackedIcon"
        ),
    ),
    "mdi-chart-bar": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ChartBarIcon" */
            "mdi-react/ChartBarIcon"
        ),
    ),
    "mdi-chart-bubble": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ChartBubbleIcon" */
            "mdi-react/ChartBubbleIcon"
        ),
    ),
    "mdi-chart-donut-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ChartDonutVariantIcon" */
            "mdi-react/ChartDonutVariantIcon"
        ),
    ),
    "mdi-chart-donut": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ChartDonutIcon" */
            "mdi-react/ChartDonutIcon"
        ),
    ),
    "mdi-chart-gantt": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ChartGanttIcon" */
            "mdi-react/ChartGanttIcon"
        ),
    ),
    "mdi-chart-histogram": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ChartHistogramIcon" */
            "mdi-react/ChartHistogramIcon"
        ),
    ),
    "mdi-chart-line-stacked": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ChartLineStackedIcon" */
            "mdi-react/ChartLineStackedIcon"
        ),
    ),
    "mdi-chart-line-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ChartLineVariantIcon" */
            "mdi-react/ChartLineVariantIcon"
        ),
    ),
    "mdi-chart-line": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ChartLineIcon" */
            "mdi-react/ChartLineIcon"
        ),
    ),
    "mdi-chart-multiline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ChartMultilineIcon" */
            "mdi-react/ChartMultilineIcon"
        ),
    ),
    "mdi-chart-pie": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ChartPieIcon" */
            "mdi-react/ChartPieIcon"
        ),
    ),
    "mdi-chart-scatterplot-hexbin": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ChartScatterplotHexbinIcon" */
            "mdi-react/ChartScatterplotHexbinIcon"
        ),
    ),
    "mdi-chart-timeline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ChartTimelineIcon" */
            "mdi-react/ChartTimelineIcon"
        ),
    ),
    "mdi-check-all": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CheckAllIcon" */
            "mdi-react/CheckAllIcon"
        ),
    ),
    "mdi-check-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CheckCircleOutlineIcon" */
            "mdi-react/CheckCircleOutlineIcon"
        ),
    ),
    "mdi-check-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CheckCircleIcon" */
            "mdi-react/CheckCircleIcon"
        ),
    ),
    "mdi-check-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CheckOutlineIcon" */
            "mdi-react/CheckOutlineIcon"
        ),
    ),
    "mdi-check": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CheckIcon" */
            /* webpackPrefetch: true */
            "mdi-react/CheckIcon"
        ),
    ),
    "mdi-checkbox-blank-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CheckboxBlankCircleOutlineIcon" */
            "mdi-react/CheckboxBlankCircleOutlineIcon"
        ),
    ),
    "mdi-checkbox-blank-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CheckboxBlankCircleIcon" */
            "mdi-react/CheckboxBlankCircleIcon"
        ),
    ),
    "mdi-checkbox-blank-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CheckboxBlankOutlineIcon" */
            "mdi-react/CheckboxBlankOutlineIcon"
        ),
    ),
    "mdi-checkbox-blank": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CheckboxBlankIcon" */
            "mdi-react/CheckboxBlankIcon"
        ),
    ),
    "mdi-checkbox-intermediate": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CheckboxIntermediateIcon" */
            "mdi-react/CheckboxIntermediateIcon"
        ),
    ),
    "mdi-checkbox-marked-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CheckboxMarkedCircleOutlineIcon" */
            "mdi-react/CheckboxMarkedCircleOutlineIcon"
        ),
    ),
    "mdi-checkbox-marked-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CheckboxMarkedCircleIcon" */
            "mdi-react/CheckboxMarkedCircleIcon"
        ),
    ),
    "mdi-checkbox-marked-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CheckboxMarkedOutlineIcon" */
            "mdi-react/CheckboxMarkedOutlineIcon"
        ),
    ),
    "mdi-checkbox-marked": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CheckboxMarkedIcon" */
            "mdi-react/CheckboxMarkedIcon"
        ),
    ),
    "mdi-checkbox-multiple-blank-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CheckboxMultipleBlankCircleOutlineIcon" */
            "mdi-react/CheckboxMultipleBlankCircleOutlineIcon"
        ),
    ),
    "mdi-checkbox-multiple-blank-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CheckboxMultipleBlankCircleIcon" */
            "mdi-react/CheckboxMultipleBlankCircleIcon"
        ),
    ),
    "mdi-checkbox-multiple-blank-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CheckboxMultipleBlankOutlineIcon" */
            "mdi-react/CheckboxMultipleBlankOutlineIcon"
        ),
    ),
    "mdi-checkbox-multiple-blank": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CheckboxMultipleBlankIcon" */
            "mdi-react/CheckboxMultipleBlankIcon"
        ),
    ),
    "mdi-checkbox-multiple-marked-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CheckboxMultipleMarkedCircleOutlineIcon" */
            "mdi-react/CheckboxMultipleMarkedCircleOutlineIcon"
        ),
    ),
    "mdi-checkbox-multiple-marked-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CheckboxMultipleMarkedCircleIcon" */
            "mdi-react/CheckboxMultipleMarkedCircleIcon"
        ),
    ),
    "mdi-checkbox-multiple-marked-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CheckboxMultipleMarkedOutlineIcon" */
            "mdi-react/CheckboxMultipleMarkedOutlineIcon"
        ),
    ),
    "mdi-checkbox-multiple-marked": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CheckboxMultipleMarkedIcon" */
            "mdi-react/CheckboxMultipleMarkedIcon"
        ),
    ),
    "mdi-checkerboard": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CheckerboardIcon" */
            "mdi-react/CheckerboardIcon"
        ),
    ),
    "mdi-chemical-weapon": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ChemicalWeaponIcon" */
            "mdi-react/ChemicalWeaponIcon"
        ),
    ),
    "mdi-chess-bishop": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ChessBishopIcon" */
            "mdi-react/ChessBishopIcon"
        ),
    ),
    "mdi-chess-king": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ChessKingIcon" */
            "mdi-react/ChessKingIcon"
        ),
    ),
    "mdi-chess-knight": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ChessKnightIcon" */
            "mdi-react/ChessKnightIcon"
        ),
    ),
    "mdi-chess-pawn": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ChessPawnIcon" */
            "mdi-react/ChessPawnIcon"
        ),
    ),
    "mdi-chess-queen": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ChessQueenIcon" */
            "mdi-react/ChessQueenIcon"
        ),
    ),
    "mdi-chess-rook": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ChessRookIcon" */
            "mdi-react/ChessRookIcon"
        ),
    ),
    "mdi-chevron-double-down": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ChevronDoubleDownIcon" */
            "mdi-react/ChevronDoubleDownIcon"
        ),
    ),
    "mdi-chevron-double-left": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ChevronDoubleLeftIcon" */
            "mdi-react/ChevronDoubleLeftIcon"
        ),
    ),
    "mdi-chevron-double-right": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ChevronDoubleRightIcon" */
            "mdi-react/ChevronDoubleRightIcon"
        ),
    ),
    "mdi-chevron-double-up": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ChevronDoubleUpIcon" */
            "mdi-react/ChevronDoubleUpIcon"
        ),
    ),
    "mdi-chevron-down": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ChevronDownIcon" */
            "mdi-react/ChevronDownIcon"
        ),
    ),
    "mdi-chevron-left": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ChevronLeftIcon" */
            "mdi-react/ChevronLeftIcon"
        ),
    ),
    "mdi-chevron-right": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ChevronRightIcon" */
            "mdi-react/ChevronRightIcon"
        ),
    ),
    "mdi-chevron-up": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ChevronUpIcon" */
            "mdi-react/ChevronUpIcon"
        ),
    ),
    "mdi-chili-hot": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ChiliHotIcon" */
            "mdi-react/ChiliHotIcon"
        ),
    ),
    "mdi-chili-medium": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ChiliMediumIcon" */
            "mdi-react/ChiliMediumIcon"
        ),
    ),
    "mdi-chili-mild": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ChiliMildIcon" */
            "mdi-react/ChiliMildIcon"
        ),
    ),
    "mdi-chip": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ChipIcon" */
            "mdi-react/ChipIcon"
        ),
    ),
    "mdi-christiantiy": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ChristiantiyIcon" */
            "mdi-react/ChristiantiyIcon"
        ),
    ),
    "mdi-church": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ChurchIcon" */
            "mdi-react/ChurchIcon"
        ),
    ),
    "mdi-circle-edit-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CircleEditOutlineIcon" */
            "mdi-react/CircleEditOutlineIcon"
        ),
    ),
    "mdi-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CircleOutlineIcon" */
            "mdi-react/CircleOutlineIcon"
        ),
    ),
    "mdi-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CircleIcon" */
            "mdi-react/CircleIcon"
        ),
    ),
    "mdi-cisco-webex": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CiscoWebexIcon" */
            "mdi-react/CiscoWebexIcon"
        ),
    ),
    "mdi-city": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CityIcon" */
            "mdi-react/CityIcon"
        ),
    ),
    "mdi-clipboard-account": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ClipboardAccountIcon" */
            "mdi-react/ClipboardAccountIcon"
        ),
    ),
    "mdi-clipboard-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ClipboardAlertIcon" */
            "mdi-react/ClipboardAlertIcon"
        ),
    ),
    "mdi-clipboard-arrow-down": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ClipboardArrowDownIcon" */
            "mdi-react/ClipboardArrowDownIcon"
        ),
    ),
    "mdi-clipboard-arrow-left": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ClipboardArrowLeftIcon" */
            "mdi-react/ClipboardArrowLeftIcon"
        ),
    ),
    "mdi-clipboard-check-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ClipboardCheckOutlineIcon" */
            "mdi-react/ClipboardCheckOutlineIcon"
        ),
    ),
    "mdi-clipboard-check": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ClipboardCheckIcon" */
            "mdi-react/ClipboardCheckIcon"
        ),
    ),
    "mdi-clipboard-flow": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ClipboardFlowIcon" */
            "mdi-react/ClipboardFlowIcon"
        ),
    ),
    "mdi-clipboard-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ClipboardOutlineIcon" */
            "mdi-react/ClipboardOutlineIcon"
        ),
    ),
    "mdi-clipboard-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ClipboardPlusIcon" */
            "mdi-react/ClipboardPlusIcon"
        ),
    ),
    "mdi-clipboard-pulse-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ClipboardPulseOutlineIcon" */
            "mdi-react/ClipboardPulseOutlineIcon"
        ),
    ),
    "mdi-clipboard-pulse": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ClipboardPulseIcon" */
            "mdi-react/ClipboardPulseIcon"
        ),
    ),
    "mdi-clipboard-text": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ClipboardTextIcon" */
            "mdi-react/ClipboardTextIcon"
        ),
    ),
    "mdi-clipboard": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ClipboardIcon" */
            "mdi-react/ClipboardIcon"
        ),
    ),
    "mdi-clippy": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ClippyIcon" */
            "mdi-react/ClippyIcon"
        ),
    ),
    "mdi-clock-alert-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ClockAlertOutlineIcon" */
            "mdi-react/ClockAlertOutlineIcon"
        ),
    ),
    "mdi-clock-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ClockAlertIcon" */
            "mdi-react/ClockAlertIcon"
        ),
    ),
    "mdi-clock-end": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ClockEndIcon" */
            "mdi-react/ClockEndIcon"
        ),
    ),
    "mdi-clock-fast": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ClockFastIcon" */
            "mdi-react/ClockFastIcon"
        ),
    ),
    "mdi-clock-in": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ClockInIcon" */
            "mdi-react/ClockInIcon"
        ),
    ),
    "mdi-clock-out": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ClockOutIcon" */
            "mdi-react/ClockOutIcon"
        ),
    ),
    "mdi-clock-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ClockOutlineIcon" */
            "mdi-react/ClockOutlineIcon"
        ),
    ),
    "mdi-clock-start": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ClockStartIcon" */
            "mdi-react/ClockStartIcon"
        ),
    ),
    "mdi-clock": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ClockIcon" */
            "mdi-react/ClockIcon"
        ),
    ),
    "mdi-close-box-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CloseBoxOutlineIcon" */
            "mdi-react/CloseBoxOutlineIcon"
        ),
    ),
    "mdi-close-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CloseBoxIcon" */
            "mdi-react/CloseBoxIcon"
        ),
    ),
    "mdi-close-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CloseCircleOutlineIcon" */
            "mdi-react/CloseCircleOutlineIcon"
        ),
    ),
    "mdi-close-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CloseCircleIcon" */
            "mdi-react/CloseCircleIcon"
        ),
    ),
    "mdi-close-network": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CloseNetworkIcon" */
            "mdi-react/CloseNetworkIcon"
        ),
    ),
    "mdi-close-octagon-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CloseOctagonOutlineIcon" */
            "mdi-react/CloseOctagonOutlineIcon"
        ),
    ),
    "mdi-close-octagon": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CloseOctagonIcon" */
            "mdi-react/CloseOctagonIcon"
        ),
    ),
    "mdi-close-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CloseOutlineIcon" */
            "mdi-react/CloseOutlineIcon"
        ),
    ),
    "mdi-close": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CloseIcon" */
            "mdi-react/CloseIcon"
        ),
    ),
    "mdi-closed-caption": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ClosedCaptionIcon" */
            "mdi-react/ClosedCaptionIcon"
        ),
    ),
    "mdi-cloud-braces": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CloudBracesIcon" */
            "mdi-react/CloudBracesIcon"
        ),
    ),
    "mdi-cloud-check": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CloudCheckIcon" */
            "mdi-react/CloudCheckIcon"
        ),
    ),
    "mdi-cloud-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CloudCircleIcon" */
            "mdi-react/CloudCircleIcon"
        ),
    ),
    "mdi-cloud-download": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CloudDownloadIcon" */
            "mdi-react/CloudDownloadIcon"
        ),
    ),
    "mdi-cloud-off-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CloudOffOutlineIcon" */
            "mdi-react/CloudOffOutlineIcon"
        ),
    ),
    "mdi-cloud-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CloudOutlineIcon" */
            "mdi-react/CloudOutlineIcon"
        ),
    ),
    "mdi-cloud-print-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CloudPrintOutlineIcon" */
            "mdi-react/CloudPrintOutlineIcon"
        ),
    ),
    "mdi-cloud-print": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CloudPrintIcon" */
            "mdi-react/CloudPrintIcon"
        ),
    ),
    "mdi-cloud-search-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CloudSearchOutlineIcon" */
            "mdi-react/CloudSearchOutlineIcon"
        ),
    ),
    "mdi-cloud-search": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CloudSearchIcon" */
            "mdi-react/CloudSearchIcon"
        ),
    ),
    "mdi-cloud-sync": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CloudSyncIcon" */
            "mdi-react/CloudSyncIcon"
        ),
    ),
    "mdi-cloud-tags": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CloudTagsIcon" */
            "mdi-react/CloudTagsIcon"
        ),
    ),
    "mdi-cloud-upload": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CloudUploadIcon" */
            "mdi-react/CloudUploadIcon"
        ),
    ),
    "mdi-cloud": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CloudIcon" */
            "mdi-react/CloudIcon"
        ),
    ),
    "mdi-clover": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CloverIcon" */
            "mdi-react/CloverIcon"
        ),
    ),
    "mdi-code-array": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CodeArrayIcon" */
            "mdi-react/CodeArrayIcon"
        ),
    ),
    "mdi-code-braces": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CodeBracesIcon" */
            "mdi-react/CodeBracesIcon"
        ),
    ),
    "mdi-code-brackets": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CodeBracketsIcon" */
            "mdi-react/CodeBracketsIcon"
        ),
    ),
    "mdi-code-equal": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CodeEqualIcon" */
            "mdi-react/CodeEqualIcon"
        ),
    ),
    "mdi-code-greater-than-or-equal": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CodeGreaterThanOrEqualIcon" */
            "mdi-react/CodeGreaterThanOrEqualIcon"
        ),
    ),
    "mdi-code-greater-than": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CodeGreaterThanIcon" */
            "mdi-react/CodeGreaterThanIcon"
        ),
    ),
    "mdi-code-less-than-or-equal": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CodeLessThanOrEqualIcon" */
            "mdi-react/CodeLessThanOrEqualIcon"
        ),
    ),
    "mdi-code-less-than": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CodeLessThanIcon" */
            "mdi-react/CodeLessThanIcon"
        ),
    ),
    "mdi-code-not-equal-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CodeNotEqualVariantIcon" */
            "mdi-react/CodeNotEqualVariantIcon"
        ),
    ),
    "mdi-code-not-equal": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CodeNotEqualIcon" */
            "mdi-react/CodeNotEqualIcon"
        ),
    ),
    "mdi-code-parentheses": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CodeParenthesesIcon" */
            "mdi-react/CodeParenthesesIcon"
        ),
    ),
    "mdi-code-string": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CodeStringIcon" */
            "mdi-react/CodeStringIcon"
        ),
    ),
    "mdi-code-tags-check": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CodeTagsCheckIcon" */
            "mdi-react/CodeTagsCheckIcon"
        ),
    ),
    "mdi-code-tags": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CodeTagsIcon" */
            "mdi-react/CodeTagsIcon"
        ),
    ),
    "mdi-codepen": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CodepenIcon" */
            "mdi-react/CodepenIcon"
        ),
    ),
    "mdi-coffee-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CoffeeOutlineIcon" */
            "mdi-react/CoffeeOutlineIcon"
        ),
    ),
    "mdi-coffee-to-go": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CoffeeToGoIcon" */
            "mdi-react/CoffeeToGoIcon"
        ),
    ),
    "mdi-coffee": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CoffeeIcon" */
            "mdi-react/CoffeeIcon"
        ),
    ),
    "mdi-cogs": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CogsIcon" */
            "mdi-react/CogsIcon"
        ),
    ),
    "mdi-coin": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CoinIcon" */
            "mdi-react/CoinIcon"
        ),
    ),
    "mdi-coins": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CoinsIcon" */
            "mdi-react/CoinsIcon"
        ),
    ),
    "mdi-collage": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CollageIcon" */
            "mdi-react/CollageIcon"
        ),
    ),
    "mdi-color-helper": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ColorHelperIcon" */
            "mdi-react/ColorHelperIcon"
        ),
    ),
    "mdi-comment-account-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CommentAccountOutlineIcon" */
            "mdi-react/CommentAccountOutlineIcon"
        ),
    ),
    "mdi-comment-account": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CommentAccountIcon" */
            "mdi-react/CommentAccountIcon"
        ),
    ),
    "mdi-comment-alert-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CommentAlertOutlineIcon" */
            "mdi-react/CommentAlertOutlineIcon"
        ),
    ),
    "mdi-comment-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CommentAlertIcon" */
            "mdi-react/CommentAlertIcon"
        ),
    ),
    "mdi-comment-check-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CommentCheckOutlineIcon" */
            "mdi-react/CommentCheckOutlineIcon"
        ),
    ),
    "mdi-comment-check": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CommentCheckIcon" */
            "mdi-react/CommentCheckIcon"
        ),
    ),
    "mdi-comment-multiple-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CommentMultipleOutlineIcon" */
            "mdi-react/CommentMultipleOutlineIcon"
        ),
    ),
    "mdi-comment-multiple": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CommentMultipleIcon" */
            "mdi-react/CommentMultipleIcon"
        ),
    ),
    "mdi-comment-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CommentOutlineIcon" */
            "mdi-react/CommentOutlineIcon"
        ),
    ),
    "mdi-comment-plus-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CommentPlusOutlineIcon" */
            "mdi-react/CommentPlusOutlineIcon"
        ),
    ),
    "mdi-comment-processing-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CommentProcessingOutlineIcon" */
            "mdi-react/CommentProcessingOutlineIcon"
        ),
    ),
    "mdi-comment-processing": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CommentProcessingIcon" */
            "mdi-react/CommentProcessingIcon"
        ),
    ),
    "mdi-comment-question-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CommentQuestionOutlineIcon" */
            "mdi-react/CommentQuestionOutlineIcon"
        ),
    ),
    "mdi-comment-question": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CommentQuestionIcon" */
            "mdi-react/CommentQuestionIcon"
        ),
    ),
    "mdi-comment-remove-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CommentRemoveOutlineIcon" */
            "mdi-react/CommentRemoveOutlineIcon"
        ),
    ),
    "mdi-comment-remove": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CommentRemoveIcon" */
            "mdi-react/CommentRemoveIcon"
        ),
    ),
    "mdi-comment-text-multiple-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CommentTextMultipleOutlineIcon" */
            "mdi-react/CommentTextMultipleOutlineIcon"
        ),
    ),
    "mdi-comment-text-multiple": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CommentTextMultipleIcon" */
            "mdi-react/CommentTextMultipleIcon"
        ),
    ),
    "mdi-comment-text-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CommentTextOutlineIcon" */
            "mdi-react/CommentTextOutlineIcon"
        ),
    ),
    "mdi-comment-text": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CommentTextIcon" */
            "mdi-react/CommentTextIcon"
        ),
    ),
    "mdi-comment": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CommentIcon" */
            "mdi-react/CommentIcon"
        ),
    ),
    "mdi-compare": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CompareIcon" */
            "mdi-react/CompareIcon"
        ),
    ),
    "mdi-compass-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CompassOutlineIcon" */
            "mdi-react/CompassOutlineIcon"
        ),
    ),
    "mdi-compass": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CompassIcon" */
            "mdi-react/CompassIcon"
        ),
    ),
    "mdi-console-line": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ConsoleLineIcon" */
            "mdi-react/ConsoleLineIcon"
        ),
    ),
    "mdi-console-network": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ConsoleNetworkIcon" */
            "mdi-react/ConsoleNetworkIcon"
        ),
    ),
    "mdi-console": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ConsoleIcon" */
            "mdi-react/ConsoleIcon"
        ),
    ),
    "mdi-contact-mail": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ContactMailIcon" */
            "mdi-react/ContactMailIcon"
        ),
    ),
    "mdi-contacts": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ContactsIcon" */
            "mdi-react/ContactsIcon"
        ),
    ),
    "mdi-content-copy": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ContentCopyIcon" */
            "mdi-react/ContentCopyIcon"
        ),
    ),
    "mdi-content-cut": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ContentCutIcon" */
            "mdi-react/ContentCutIcon"
        ),
    ),
    "mdi-content-duplicate": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ContentDuplicateIcon" */
            "mdi-react/ContentDuplicateIcon"
        ),
    ),
    "mdi-content-paste": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ContentPasteIcon" */
            "mdi-react/ContentPasteIcon"
        ),
    ),
    "mdi-content-save-all": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ContentSaveAllIcon" */
            "mdi-react/ContentSaveAllIcon"
        ),
    ),
    "mdi-content-save-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ContentSaveOutlineIcon" */
            "mdi-react/ContentSaveOutlineIcon"
        ),
    ),
    "mdi-content-save-settings": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ContentSaveSettingsIcon" */
            "mdi-react/ContentSaveSettingsIcon"
        ),
    ),
    "mdi-content-save": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ContentSaveIcon" */
            "mdi-react/ContentSaveIcon"
        ),
    ),
    "mdi-contrast-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ContrastBoxIcon" */
            "mdi-react/ContrastBoxIcon"
        ),
    ),
    "mdi-contrast-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ContrastCircleIcon" */
            "mdi-react/ContrastCircleIcon"
        ),
    ),
    "mdi-contrast": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ContrastIcon" */
            "mdi-react/ContrastIcon"
        ),
    ),
    "mdi-cookie": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CookieIcon" */
            "mdi-react/CookieIcon"
        ),
    ),
    "mdi-copyright": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CopyrightIcon" */
            "mdi-react/CopyrightIcon"
        ),
    ),
    "mdi-cordova": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CordovaIcon" */
            "mdi-react/CordovaIcon"
        ),
    ),
    "mdi-corn": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CornIcon" */
            "mdi-react/CornIcon"
        ),
    ),
    "mdi-counter": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CounterIcon" */
            "mdi-react/CounterIcon"
        ),
    ),
    "mdi-cow": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CowIcon" */
            "mdi-react/CowIcon"
        ),
    ),
    "mdi-crane": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CraneIcon" */
            "mdi-react/CraneIcon"
        ),
    ),
    "mdi-creation": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CreationIcon" */
            "mdi-react/CreationIcon"
        ),
    ),
    "mdi-credit-card-multiple": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CreditCardMultipleIcon" */
            "mdi-react/CreditCardMultipleIcon"
        ),
    ),
    "mdi-credit-card-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CreditCardOffIcon" */
            "mdi-react/CreditCardOffIcon"
        ),
    ),
    "mdi-credit-card-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CreditCardPlusIcon" */
            "mdi-react/CreditCardPlusIcon"
        ),
    ),
    "mdi-credit-card-scan": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CreditCardScanIcon" */
            "mdi-react/CreditCardScanIcon"
        ),
    ),
    "mdi-credit-card-settings": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CreditCardSettingsIcon" */
            "mdi-react/CreditCardSettingsIcon"
        ),
    ),
    "mdi-credit-card": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CreditCardIcon" */
            "mdi-react/CreditCardIcon"
        ),
    ),
    "mdi-crop-free": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CropFreeIcon" */
            "mdi-react/CropFreeIcon"
        ),
    ),
    "mdi-crop-landscape": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CropLandscapeIcon" */
            "mdi-react/CropLandscapeIcon"
        ),
    ),
    "mdi-crop-portrait": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CropPortraitIcon" */
            "mdi-react/CropPortraitIcon"
        ),
    ),
    "mdi-crop-rotate": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CropRotateIcon" */
            "mdi-react/CropRotateIcon"
        ),
    ),
    "mdi-crop-square": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CropSquareIcon" */
            "mdi-react/CropSquareIcon"
        ),
    ),
    "mdi-crop": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CropIcon" */
            "mdi-react/CropIcon"
        ),
    ),
    "mdi-crosshairs-gps": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CrosshairsGpsIcon" */
            "mdi-react/CrosshairsGpsIcon"
        ),
    ),
    "mdi-crosshairs": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CrosshairsIcon" */
            "mdi-react/CrosshairsIcon"
        ),
    ),
    "mdi-crown": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CrownIcon" */
            "mdi-react/CrownIcon"
        ),
    ),
    "mdi-cryengine": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CryengineIcon" */
            "mdi-react/CryengineIcon"
        ),
    ),
    "mdi-cube-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CubeOutlineIcon" */
            "mdi-react/CubeOutlineIcon"
        ),
    ),
    "mdi-cube-send": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CubeSendIcon" */
            "mdi-react/CubeSendIcon"
        ),
    ),
    "mdi-cube-unfolded": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CubeUnfoldedIcon" */
            "mdi-react/CubeUnfoldedIcon"
        ),
    ),
    "mdi-cube": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CubeIcon" */
            "mdi-react/CubeIcon"
        ),
    ),
    "mdi-cup-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CupOffIcon" */
            "mdi-react/CupOffIcon"
        ),
    ),
    "mdi-cup-water": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CupWaterIcon" */
            "mdi-react/CupWaterIcon"
        ),
    ),
    "mdi-cup": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CupIcon" */
            "mdi-react/CupIcon"
        ),
    ),
    "mdi-cupcake": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CupcakeIcon" */
            "mdi-react/CupcakeIcon"
        ),
    ),
    "mdi-curling": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CurlingIcon" */
            "mdi-react/CurlingIcon"
        ),
    ),
    "mdi-currency-bdt": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CurrencyBdtIcon" */
            "mdi-react/CurrencyBdtIcon"
        ),
    ),
    "mdi-currency-btc": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CurrencyBtcIcon" */
            "mdi-react/CurrencyBtcIcon"
        ),
    ),
    "mdi-currency-chf": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CurrencyChfIcon" */
            "mdi-react/CurrencyChfIcon"
        ),
    ),
    "mdi-currency-cny": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CurrencyCnyIcon" */
            "mdi-react/CurrencyCnyIcon"
        ),
    ),
    "mdi-currency-eth": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CurrencyEthIcon" */
            "mdi-react/CurrencyEthIcon"
        ),
    ),
    "mdi-currency-eur": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CurrencyEurIcon" */
            "mdi-react/CurrencyEurIcon"
        ),
    ),
    "mdi-currency-gbp": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CurrencyGbpIcon" */
            "mdi-react/CurrencyGbpIcon"
        ),
    ),
    "mdi-currency-inr": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CurrencyInrIcon" */
            "mdi-react/CurrencyInrIcon"
        ),
    ),
    "mdi-currency-jpy": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CurrencyJpyIcon" */
            "mdi-react/CurrencyJpyIcon"
        ),
    ),
    "mdi-currency-krw": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CurrencyKrwIcon" */
            "mdi-react/CurrencyKrwIcon"
        ),
    ),
    "mdi-currency-kzt": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CurrencyKztIcon" */
            "mdi-react/CurrencyKztIcon"
        ),
    ),
    "mdi-currency-ngn": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CurrencyNgnIcon" */
            "mdi-react/CurrencyNgnIcon"
        ),
    ),
    "mdi-currency-rub": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CurrencyRubIcon" */
            "mdi-react/CurrencyRubIcon"
        ),
    ),
    "mdi-currency-sign": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CurrencySignIcon" */
            "mdi-react/CurrencySignIcon"
        ),
    ),
    "mdi-currency-try": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CurrencyTryIcon" */
            "mdi-react/CurrencyTryIcon"
        ),
    ),
    "mdi-currency-twd": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CurrencyTwdIcon" */
            "mdi-react/CurrencyTwdIcon"
        ),
    ),
    "mdi-currency-usd-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CurrencyUsdOffIcon" */
            "mdi-react/CurrencyUsdOffIcon"
        ),
    ),
    "mdi-currency-usd": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CurrencyUsdIcon" */
            "mdi-react/CurrencyUsdIcon"
        ),
    ),
    "mdi-current-ac": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CurrentAcIcon" */
            "mdi-react/CurrentAcIcon"
        ),
    ),
    "mdi-current-dc": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CurrentDcIcon" */
            "mdi-react/CurrentDcIcon"
        ),
    ),
    "mdi-cursor-default-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CursorDefaultOutlineIcon" */
            "mdi-react/CursorDefaultOutlineIcon"
        ),
    ),
    "mdi-cursor-default": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CursorDefaultIcon" */
            "mdi-react/CursorDefaultIcon"
        ),
    ),
    "mdi-cursor-move": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CursorMoveIcon" */
            "mdi-react/CursorMoveIcon"
        ),
    ),
    "mdi-cursor-pointer": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CursorPointerIcon" */
            "mdi-react/CursorPointerIcon"
        ),
    ),
    "mdi-cursor-text": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CursorTextIcon" */
            "mdi-react/CursorTextIcon"
        ),
    ),
    "mdi-database-export": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DatabaseExportIcon" */
            "mdi-react/DatabaseExportIcon"
        ),
    ),
    "mdi-database-import": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DatabaseImportIcon" */
            "mdi-react/DatabaseImportIcon"
        ),
    ),
    "mdi-database-minus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DatabaseMinusIcon" */
            "mdi-react/DatabaseMinusIcon"
        ),
    ),
    "mdi-database-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DatabasePlusIcon" */
            "mdi-react/DatabasePlusIcon"
        ),
    ),
    "mdi-database-search": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DatabaseSearchIcon" */
            "mdi-react/DatabaseSearchIcon"
        ),
    ),
    "mdi-database": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DatabaseIcon" */
            "mdi-react/DatabaseIcon"
        ),
    ),
    "mdi-death-star-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DeathStarVariantIcon" */
            "mdi-react/DeathStarVariantIcon"
        ),
    ),
    "mdi-death-star": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DeathStarIcon" */
            "mdi-react/DeathStarIcon"
        ),
    ),
    "mdi-debian": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DebianIcon" */
            "mdi-react/DebianIcon"
        ),
    ),
    "mdi-debug-step-into": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DebugStepIntoIcon" */
            "mdi-react/DebugStepIntoIcon"
        ),
    ),
    "mdi-debug-step-out": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DebugStepOutIcon" */
            "mdi-react/DebugStepOutIcon"
        ),
    ),
    "mdi-debug-step-over": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DebugStepOverIcon" */
            "mdi-react/DebugStepOverIcon"
        ),
    ),
    "mdi-decagram-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DecagramOutlineIcon" */
            "mdi-react/DecagramOutlineIcon"
        ),
    ),
    "mdi-decagram": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DecagramIcon" */
            "mdi-react/DecagramIcon"
        ),
    ),
    "mdi-decimal-decrease": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DecimalDecreaseIcon" */
            "mdi-react/DecimalDecreaseIcon"
        ),
    ),
    "mdi-decimal-increase": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DecimalIncreaseIcon" */
            "mdi-react/DecimalIncreaseIcon"
        ),
    ),
    "mdi-delete-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DeleteCircleIcon" */
            "mdi-react/DeleteCircleIcon"
        ),
    ),
    "mdi-delete-empty": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DeleteEmptyIcon" */
            "mdi-react/DeleteEmptyIcon"
        ),
    ),
    "mdi-delete-forever": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DeleteForeverIcon" */
            "mdi-react/DeleteForeverIcon"
        ),
    ),
    "mdi-delete-restore": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DeleteRestoreIcon" */
            "mdi-react/DeleteRestoreIcon"
        ),
    ),
    "mdi-delete-sweep": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DeleteSweepIcon" */
            "mdi-react/DeleteSweepIcon"
        ),
    ),
    "mdi-delete-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DeleteVariantIcon" */
            "mdi-react/DeleteVariantIcon"
        ),
    ),
    "mdi-delete": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DeleteIcon" */
            "mdi-react/DeleteIcon"
        ),
    ),
    "mdi-delta": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DeltaIcon" */
            "mdi-react/DeltaIcon"
        ),
    ),
    "mdi-desk-lamp": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DeskLampIcon" */
            "mdi-react/DeskLampIcon"
        ),
    ),
    "mdi-deskphone": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DeskphoneIcon" */
            "mdi-react/DeskphoneIcon"
        ),
    ),
    "mdi-desktop-classic": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DesktopClassicIcon" */
            "mdi-react/DesktopClassicIcon"
        ),
    ),
    "mdi-desktop-mac": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DesktopMacIcon" */
            "mdi-react/DesktopMacIcon"
        ),
    ),
    "mdi-desktop-tower": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DesktopTowerIcon" */
            "mdi-react/DesktopTowerIcon"
        ),
    ),
    "mdi-details": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DetailsIcon" */
            "mdi-react/DetailsIcon"
        ),
    ),
    "mdi-developer-board": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DeveloperBoardIcon" */
            "mdi-react/DeveloperBoardIcon"
        ),
    ),
    "mdi-deviantart": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DeviantartIcon" */
            "mdi-react/DeviantartIcon"
        ),
    ),
    "mdi-dialpad": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DialpadIcon" */
            "mdi-react/DialpadIcon"
        ),
    ),
    "mdi-diamond": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DiamondIcon" */
            "mdi-react/DiamondIcon"
        ),
    ),
    "mdi-dice-1": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Dice1Icon" */
            "mdi-react/Dice1Icon"
        ),
    ),
    "mdi-dice-2": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Dice2Icon" */
            "mdi-react/Dice2Icon"
        ),
    ),
    "mdi-dice-3": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Dice3Icon" */
            "mdi-react/Dice3Icon"
        ),
    ),
    "mdi-dice-4": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Dice4Icon" */
            "mdi-react/Dice4Icon"
        ),
    ),
    "mdi-dice-5": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Dice5Icon" */
            "mdi-react/Dice5Icon"
        ),
    ),
    "mdi-dice-6": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Dice6Icon" */
            "mdi-react/Dice6Icon"
        ),
    ),
    "mdi-dice-d-10": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DiceD10Icon" */
            "mdi-react/DiceD10Icon"
        ),
    ),
    "mdi-dice-d-12": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DiceD12Icon" */
            "mdi-react/DiceD12Icon"
        ),
    ),
    "mdi-dice-d-20": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DiceD20Icon" */
            "mdi-react/DiceD20Icon"
        ),
    ),
    "mdi-dice-d-4": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DiceD4Icon" */
            "mdi-react/DiceD4Icon"
        ),
    ),
    "mdi-dice-d-6": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DiceD6Icon" */
            "mdi-react/DiceD6Icon"
        ),
    ),
    "mdi-dice-d-8": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DiceD8Icon" */
            "mdi-react/DiceD8Icon"
        ),
    ),
    "mdi-dice-multiple": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DiceMultipleIcon" */
            "mdi-react/DiceMultipleIcon"
        ),
    ),
    "mdi-dictionary": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DictionaryIcon" */
            "mdi-react/DictionaryIcon"
        ),
    ),
    "mdi-dip-switch": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DipSwitchIcon" */
            "mdi-react/DipSwitchIcon"
        ),
    ),
    "mdi-directions-fork": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DirectionsForkIcon" */
            "mdi-react/DirectionsForkIcon"
        ),
    ),
    "mdi-directions": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DirectionsIcon" */
            "mdi-react/DirectionsIcon"
        ),
    ),
    "mdi-discord": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DiscordIcon" */
            "mdi-react/DiscordIcon"
        ),
    ),
    "mdi-disk-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DiskAlertIcon" */
            "mdi-react/DiskAlertIcon"
        ),
    ),
    "mdi-disk-player": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DiskPlayerIcon" */
            "mdi-react/DiskPlayerIcon"
        ),
    ),
    "mdi-disk": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DiskIcon" */
            "mdi-react/DiskIcon"
        ),
    ),
    "mdi-disqus-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DisqusOutlineIcon" */
            "mdi-react/DisqusOutlineIcon"
        ),
    ),
    "mdi-disqus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DisqusIcon" */
            "mdi-react/DisqusIcon"
        ),
    ),
    "mdi-division-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DivisionBoxIcon" */
            "mdi-react/DivisionBoxIcon"
        ),
    ),
    "mdi-division": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DivisionIcon" */
            "mdi-react/DivisionIcon"
        ),
    ),
    "mdi-dna": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DnaIcon" */
            "mdi-react/DnaIcon"
        ),
    ),
    "mdi-dns": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DnsIcon" */
            "mdi-react/DnsIcon"
        ),
    ),
    "mdi-do-not-disturb-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DoNotDisturbOffIcon" */
            "mdi-react/DoNotDisturbOffIcon"
        ),
    ),
    "mdi-do-not-disturb": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DoNotDisturbIcon" */
            "mdi-react/DoNotDisturbIcon"
        ),
    ),
    "mdi-docker": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DockerIcon" */
            "mdi-react/DockerIcon"
        ),
    ),
    "mdi-dolby": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DolbyIcon" */
            "mdi-react/DolbyIcon"
        ),
    ),
    "mdi-domain": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DomainIcon" */
            "mdi-react/DomainIcon"
        ),
    ),
    "mdi-donkey": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DonkeyIcon" */
            "mdi-react/DonkeyIcon"
        ),
    ),
    "mdi-door-closed": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DoorClosedIcon" */
            "mdi-react/DoorClosedIcon"
        ),
    ),
    "mdi-door-open": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DoorOpenIcon" */
            "mdi-react/DoorOpenIcon"
        ),
    ),
    "mdi-door": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DoorIcon" */
            "mdi-react/DoorIcon"
        ),
    ),
    "mdi-doorbell-video": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DoorbellVideoIcon" */
            "mdi-react/DoorbellVideoIcon"
        ),
    ),
    "mdi-dots-horizontal-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DotsHorizontalCircleIcon" */
            "mdi-react/DotsHorizontalCircleIcon"
        ),
    ),
    "mdi-dots-horizontal": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DotsHorizontalIcon" */
            "mdi-react/DotsHorizontalIcon"
        ),
    ),
    "mdi-dots-vertical-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DotsVerticalCircleIcon" */
            "mdi-react/DotsVerticalCircleIcon"
        ),
    ),
    "mdi-dots-vertical": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DotsVerticalIcon" */
            "mdi-react/DotsVerticalIcon"
        ),
    ),
    "mdi-douban": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DoubanIcon" */
            "mdi-react/DoubanIcon"
        ),
    ),
    "mdi-download-network": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DownloadNetworkIcon" */
            "mdi-react/DownloadNetworkIcon"
        ),
    ),
    "mdi-download": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DownloadIcon" */
            "mdi-react/DownloadIcon"
        ),
    ),
    "mdi-drag-horizontal": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DragHorizontalIcon" */
            "mdi-react/DragHorizontalIcon"
        ),
    ),
    "mdi-drag-vertical": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DragVerticalIcon" */
            "mdi-react/DragVerticalIcon"
        ),
    ),
    "mdi-drag": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DragIcon" */
            "mdi-react/DragIcon"
        ),
    ),
    "mdi-drawing-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DrawingBoxIcon" */
            "mdi-react/DrawingBoxIcon"
        ),
    ),
    "mdi-drawing": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DrawingIcon" */
            "mdi-react/DrawingIcon"
        ),
    ),
    "mdi-dribbble-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DribbbleBoxIcon" */
            "mdi-react/DribbbleBoxIcon"
        ),
    ),
    "mdi-dribbble": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DribbbleIcon" */
            "mdi-react/DribbbleIcon"
        ),
    ),
    "mdi-drone": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DroneIcon" */
            "mdi-react/DroneIcon"
        ),
    ),
    "mdi-dropbox": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DropboxIcon" */
            "mdi-react/DropboxIcon"
        ),
    ),
    "mdi-drupal": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DrupalIcon" */
            "mdi-react/DrupalIcon"
        ),
    ),
    "mdi-duck": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DuckIcon" */
            "mdi-react/DuckIcon"
        ),
    ),
    "mdi-dumbbell": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DumbbellIcon" */
            "mdi-react/DumbbellIcon"
        ),
    ),
    "mdi-ear-hearing": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EarHearingIcon" */
            "mdi-react/EarHearingIcon"
        ),
    ),
    "mdi-earth-box-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EarthBoxOffIcon" */
            "mdi-react/EarthBoxOffIcon"
        ),
    ),
    "mdi-earth-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EarthBoxIcon" */
            "mdi-react/EarthBoxIcon"
        ),
    ),
    "mdi-earth-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EarthOffIcon" */
            "mdi-react/EarthOffIcon"
        ),
    ),
    "mdi-earth": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EarthIcon" */
            "mdi-react/EarthIcon"
        ),
    ),
    "mdi-edge": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EdgeIcon" */
            "mdi-react/EdgeIcon"
        ),
    ),
    "mdi-eject": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EjectIcon" */
            "mdi-react/EjectIcon"
        ),
    ),
    "mdi-elephant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ElephantIcon" */
            "mdi-react/ElephantIcon"
        ),
    ),
    "mdi-elevation-decline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ElevationDeclineIcon" */
            "mdi-react/ElevationDeclineIcon"
        ),
    ),
    "mdi-elevation-rise": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ElevationRiseIcon" */
            "mdi-react/ElevationRiseIcon"
        ),
    ),
    "mdi-elevator": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ElevatorIcon" */
            "mdi-react/ElevatorIcon"
        ),
    ),
    "mdi-email-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EmailAlertIcon" */
            "mdi-react/EmailAlertIcon"
        ),
    ),
    "mdi-email-open-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EmailOpenOutlineIcon" */
            "mdi-react/EmailOpenOutlineIcon"
        ),
    ),
    "mdi-email-open": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EmailOpenIcon" */
            "mdi-react/EmailOpenIcon"
        ),
    ),
    "mdi-email-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EmailOutlineIcon" */
            "mdi-react/EmailOutlineIcon"
        ),
    ),
    "mdi-email-search-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EmailSearchOutlineIcon" */
            "mdi-react/EmailSearchOutlineIcon"
        ),
    ),
    "mdi-email-search": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EmailSearchIcon" */
            "mdi-react/EmailSearchIcon"
        ),
    ),
    "mdi-email-secure": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EmailSecureIcon" */
            "mdi-react/EmailSecureIcon"
        ),
    ),
    "mdi-email-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EmailVariantIcon" */
            "mdi-react/EmailVariantIcon"
        ),
    ),
    "mdi-email": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EmailIcon" */
            "mdi-react/EmailIcon"
        ),
    ),
    "mdi-emby": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EmbyIcon" */
            "mdi-react/EmbyIcon"
        ),
    ),
    "mdi-emoticon-cool": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EmoticonCoolIcon" */
            "mdi-react/EmoticonCoolIcon"
        ),
    ),
    "mdi-emoticon-dead": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EmoticonDeadIcon" */
            "mdi-react/EmoticonDeadIcon"
        ),
    ),
    "mdi-emoticon-devil": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EmoticonDevilIcon" */
            "mdi-react/EmoticonDevilIcon"
        ),
    ),
    "mdi-emoticon-excited": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EmoticonExcitedIcon" */
            "mdi-react/EmoticonExcitedIcon"
        ),
    ),
    "mdi-emoticon-happy": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EmoticonHappyIcon" */
            "mdi-react/EmoticonHappyIcon"
        ),
    ),
    "mdi-emoticon-neutral": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EmoticonNeutralIcon" */
            "mdi-react/EmoticonNeutralIcon"
        ),
    ),
    "mdi-emoticon-poop": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EmoticonPoopIcon" */
            "mdi-react/EmoticonPoopIcon"
        ),
    ),
    "mdi-emoticon-sad": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EmoticonSadIcon" */
            "mdi-react/EmoticonSadIcon"
        ),
    ),
    "mdi-emoticon-tongue": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EmoticonTongueIcon" */
            "mdi-react/EmoticonTongueIcon"
        ),
    ),
    "mdi-emoticon": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EmoticonIcon" */
            "mdi-react/EmoticonIcon"
        ),
    ),
    "mdi-engine-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EngineOutlineIcon" */
            "mdi-react/EngineOutlineIcon"
        ),
    ),
    "mdi-engine": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EngineIcon" */
            "mdi-react/EngineIcon"
        ),
    ),
    "mdi-equal-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EqualBoxIcon" */
            "mdi-react/EqualBoxIcon"
        ),
    ),
    "mdi-equal": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EqualIcon" */
            "mdi-react/EqualIcon"
        ),
    ),
    "mdi-eraser-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EraserVariantIcon" */
            "mdi-react/EraserVariantIcon"
        ),
    ),
    "mdi-eraser": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EraserIcon" */
            /* webpackPrefetch: true */
            "mdi-react/EraserIcon"
        ),
    ),
    "mdi-escalator": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EscalatorIcon" */
            "mdi-react/EscalatorIcon"
        ),
    ),
    "mdi-ethereum": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EthereumIcon" */
            "mdi-react/EthereumIcon"
        ),
    ),
    "mdi-ethernet-cable-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EthernetCableOffIcon" */
            "mdi-react/EthernetCableOffIcon"
        ),
    ),
    "mdi-ethernet-cable": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EthernetCableIcon" */
            "mdi-react/EthernetCableIcon"
        ),
    ),
    "mdi-ethernet": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EthernetIcon" */
            "mdi-react/EthernetIcon"
        ),
    ),
    "mdi-etsy": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EtsyIcon" */
            "mdi-react/EtsyIcon"
        ),
    ),
    "mdi-ev-station": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EvStationIcon" */
            "mdi-react/EvStationIcon"
        ),
    ),
    "mdi-eventbrite": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EventbriteIcon" */
            "mdi-react/EventbriteIcon"
        ),
    ),
    "mdi-evernote": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EvernoteIcon" */
            "mdi-react/EvernoteIcon"
        ),
    ),
    "mdi-exclamation": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ExclamationIcon" */
            "mdi-react/ExclamationIcon"
        ),
    ),
    "mdi-exit-to-app": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ExitToAppIcon" */
            "mdi-react/ExitToAppIcon"
        ),
    ),
    "mdi-exponent-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ExponentBoxIcon" */
            "mdi-react/ExponentBoxIcon"
        ),
    ),
    "mdi-exponent": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ExponentIcon" */
            "mdi-react/ExponentIcon"
        ),
    ),
    "mdi-export": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ExportIcon" */
            "mdi-react/ExportIcon"
        ),
    ),
    "mdi-eye-off-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EyeOffOutlineIcon" */
            "mdi-react/EyeOffOutlineIcon"
        ),
    ),
    "mdi-eye-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EyeOffIcon" */
            "mdi-react/EyeOffIcon"
        ),
    ),
    "mdi-eye-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EyeOutlineIcon" */
            "mdi-react/EyeOutlineIcon"
        ),
    ),
    "mdi-eye-plus-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EyePlusOutlineIcon" */
            "mdi-react/EyePlusOutlineIcon"
        ),
    ),
    "mdi-eye-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EyePlusIcon" */
            "mdi-react/EyePlusIcon"
        ),
    ),
    "mdi-eye-settings-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EyeSettingsOutlineIcon" */
            "mdi-react/EyeSettingsOutlineIcon"
        ),
    ),
    "mdi-eye-settings": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EyeSettingsIcon" */
            "mdi-react/EyeSettingsIcon"
        ),
    ),
    "mdi-eye": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EyeIcon" */
            "mdi-react/EyeIcon"
        ),
    ),
    "mdi-eyedropper-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EyedropperVariantIcon" */
            "mdi-react/EyedropperVariantIcon"
        ),
    ),
    "mdi-eyedropper": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EyedropperIcon" */
            "mdi-react/EyedropperIcon"
        ),
    ),
    "mdi-face-profile": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FaceProfileIcon" */
            "mdi-react/FaceProfileIcon"
        ),
    ),
    "mdi-face": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FaceIcon" */
            "mdi-react/FaceIcon"
        ),
    ),
    "mdi-facebook-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FacebookBoxIcon" */
            "mdi-react/FacebookBoxIcon"
        ),
    ),
    "mdi-facebook-messenger": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FacebookMessengerIcon" */
            "mdi-react/FacebookMessengerIcon"
        ),
    ),
    "mdi-facebook": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FacebookIcon" */
            "mdi-react/FacebookIcon"
        ),
    ),
    "mdi-factory": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FactoryIcon" */
            "mdi-react/FactoryIcon"
        ),
    ),
    "mdi-fan-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FanOffIcon" */
            "mdi-react/FanOffIcon"
        ),
    ),
    "mdi-fan": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FanIcon" */
            "mdi-react/FanIcon"
        ),
    ),
    "mdi-fast-forward-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FastForwardOutlineIcon" */
            "mdi-react/FastForwardOutlineIcon"
        ),
    ),
    "mdi-fast-forward": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FastForwardIcon" */
            "mdi-react/FastForwardIcon"
        ),
    ),
    "mdi-fax": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FaxIcon" */
            "mdi-react/FaxIcon"
        ),
    ),
    "mdi-feather": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FeatherIcon" */
            "mdi-react/FeatherIcon"
        ),
    ),
    "mdi-fedora": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FedoraIcon" */
            "mdi-react/FedoraIcon"
        ),
    ),
    "mdi-ferry": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FerryIcon" */
            "mdi-react/FerryIcon"
        ),
    ),
    "mdi-file-account": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FileAccountIcon" */
            "mdi-react/FileAccountIcon"
        ),
    ),
    "mdi-file-chart": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FileChartIcon" */
            "mdi-react/FileChartIcon"
        ),
    ),
    "mdi-file-check": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FileCheckIcon" */
            "mdi-react/FileCheckIcon"
        ),
    ),
    "mdi-file-cloud": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FileCloudIcon" */
            "mdi-react/FileCloudIcon"
        ),
    ),
    "mdi-file-compare": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FileCompareIcon" */
            "mdi-react/FileCompareIcon"
        ),
    ),
    "mdi-file-delimited": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FileDelimitedIcon" */
            "mdi-react/FileDelimitedIcon"
        ),
    ),
    "mdi-file-document-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FileDocumentBoxIcon" */
            "mdi-react/FileDocumentBoxIcon"
        ),
    ),
    "mdi-file-document": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FileDocumentIcon" */
            "mdi-react/FileDocumentIcon"
        ),
    ),
    "mdi-file-download-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FileDownloadOutlineIcon" */
            "mdi-react/FileDownloadOutlineIcon"
        ),
    ),
    "mdi-file-download": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FileDownloadIcon" */
            "mdi-react/FileDownloadIcon"
        ),
    ),
    "mdi-file-excel-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FileExcelBoxIcon" */
            "mdi-react/FileExcelBoxIcon"
        ),
    ),
    "mdi-file-excel": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FileExcelIcon" */
            "mdi-react/FileExcelIcon"
        ),
    ),
    "mdi-file-export": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FileExportIcon" */
            "mdi-react/FileExportIcon"
        ),
    ),
    "mdi-file-find": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FileFindIcon" */
            "mdi-react/FileFindIcon"
        ),
    ),
    "mdi-file-hidden": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FileHiddenIcon" */
            "mdi-react/FileHiddenIcon"
        ),
    ),
    "mdi-file-image": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FileImageIcon" */
            "mdi-react/FileImageIcon"
        ),
    ),
    "mdi-file-import": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FileImportIcon" */
            "mdi-react/FileImportIcon"
        ),
    ),
    "mdi-file-lock": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FileLockIcon" */
            "mdi-react/FileLockIcon"
        ),
    ),
    "mdi-file-multiple": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FileMultipleIcon" */
            "mdi-react/FileMultipleIcon"
        ),
    ),
    "mdi-file-music": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FileMusicIcon" */
            "mdi-react/FileMusicIcon"
        ),
    ),
    "mdi-file-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FileOutlineIcon" */
            "mdi-react/FileOutlineIcon"
        ),
    ),
    "mdi-file-pdf-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FilePdfBoxIcon" */
            "mdi-react/FilePdfBoxIcon"
        ),
    ),
    "mdi-file-pdf": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FilePdfIcon" */
            "mdi-react/FilePdfIcon"
        ),
    ),
    "mdi-file-percent": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FilePercentIcon" */
            "mdi-react/FilePercentIcon"
        ),
    ),
    "mdi-file-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FilePlusIcon" */
            "mdi-react/FilePlusIcon"
        ),
    ),
    "mdi-file-powerpoint-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FilePowerpointBoxIcon" */
            "mdi-react/FilePowerpointBoxIcon"
        ),
    ),
    "mdi-file-powerpoint": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FilePowerpointIcon" */
            "mdi-react/FilePowerpointIcon"
        ),
    ),
    "mdi-file-presentation-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FilePresentationBoxIcon" */
            "mdi-react/FilePresentationBoxIcon"
        ),
    ),
    "mdi-file-question": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FileQuestionIcon" */
            "mdi-react/FileQuestionIcon"
        ),
    ),
    "mdi-file-restore": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FileRestoreIcon" */
            "mdi-react/FileRestoreIcon"
        ),
    ),
    "mdi-file-send": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FileSendIcon" */
            "mdi-react/FileSendIcon"
        ),
    ),
    "mdi-file-tree": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FileTreeIcon" */
            "mdi-react/FileTreeIcon"
        ),
    ),
    "mdi-file-undo": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FileUndoIcon" */
            "mdi-react/FileUndoIcon"
        ),
    ),
    "mdi-file-video": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FileVideoIcon" */
            "mdi-react/FileVideoIcon"
        ),
    ),
    "mdi-file-word-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FileWordBoxIcon" */
            "mdi-react/FileWordBoxIcon"
        ),
    ),
    "mdi-file-word": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FileWordIcon" */
            "mdi-react/FileWordIcon"
        ),
    ),
    "mdi-file-xml": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FileXmlIcon" */
            "mdi-react/FileXmlIcon"
        ),
    ),
    "mdi-file": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FileIcon" */
            "mdi-react/FileIcon"
        ),
    ),
    "mdi-film": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FilmIcon" */
            "mdi-react/FilmIcon"
        ),
    ),
    "mdi-filmstrip-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FilmstripOffIcon" */
            "mdi-react/FilmstripOffIcon"
        ),
    ),
    "mdi-filmstrip": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FilmstripIcon" */
            "mdi-react/FilmstripIcon"
        ),
    ),
    "mdi-filter-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FilterOutlineIcon" */
            "mdi-react/FilterOutlineIcon"
        ),
    ),
    "mdi-filter-remove-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FilterRemoveOutlineIcon" */
            "mdi-react/FilterRemoveOutlineIcon"
        ),
    ),
    "mdi-filter-remove": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FilterRemoveIcon" */
            "mdi-react/FilterRemoveIcon"
        ),
    ),
    "mdi-filter-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FilterVariantIcon" */
            "mdi-react/FilterVariantIcon"
        ),
    ),
    "mdi-filter": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FilterIcon" */
            "mdi-react/FilterIcon"
        ),
    ),
    "mdi-finance": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FinanceIcon" */
            "mdi-react/FinanceIcon"
        ),
    ),
    "mdi-find-replace": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FindReplaceIcon" */
            "mdi-react/FindReplaceIcon"
        ),
    ),
    "mdi-fingerprint": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FingerprintIcon" */
            "mdi-react/FingerprintIcon"
        ),
    ),
    "mdi-fire-truck": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FireTruckIcon" */
            "mdi-react/FireTruckIcon"
        ),
    ),
    "mdi-fire": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FireIcon" */
            "mdi-react/FireIcon"
        ),
    ),
    "mdi-firebase": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FirebaseIcon" */
            "mdi-react/FirebaseIcon"
        ),
    ),
    "mdi-firefox": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FirefoxIcon" */
            "mdi-react/FirefoxIcon"
        ),
    ),
    "mdi-fish": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FishIcon" */
            "mdi-react/FishIcon"
        ),
    ),
    "mdi-flag-checkered": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FlagCheckeredIcon" */
            "mdi-react/FlagCheckeredIcon"
        ),
    ),
    "mdi-flag-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FlagOutlineIcon" */
            "mdi-react/FlagOutlineIcon"
        ),
    ),
    "mdi-flag-triangle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FlagTriangleIcon" */
            "mdi-react/FlagTriangleIcon"
        ),
    ),
    "mdi-flag-variant-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FlagVariantOutlineIcon" */
            "mdi-react/FlagVariantOutlineIcon"
        ),
    ),
    "mdi-flag-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FlagVariantIcon" */
            "mdi-react/FlagVariantIcon"
        ),
    ),
    "mdi-flag": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FlagIcon" */
            "mdi-react/FlagIcon"
        ),
    ),
    "mdi-flash-auto": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FlashAutoIcon" */
            "mdi-react/FlashAutoIcon"
        ),
    ),
    "mdi-flash-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FlashCircleIcon" */
            "mdi-react/FlashCircleIcon"
        ),
    ),
    "mdi-flash-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FlashOffIcon" */
            "mdi-react/FlashOffIcon"
        ),
    ),
    "mdi-flash-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FlashOutlineIcon" */
            "mdi-react/FlashOutlineIcon"
        ),
    ),
    "mdi-flash-red-eye": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FlashRedEyeIcon" */
            "mdi-react/FlashRedEyeIcon"
        ),
    ),
    "mdi-flash": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FlashIcon" */
            "mdi-react/FlashIcon"
        ),
    ),
    "mdi-flashlight-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FlashlightOffIcon" */
            "mdi-react/FlashlightOffIcon"
        ),
    ),
    "mdi-flashlight": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FlashlightIcon" */
            "mdi-react/FlashlightIcon"
        ),
    ),
    "mdi-flask-empty-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FlaskEmptyOutlineIcon" */
            "mdi-react/FlaskEmptyOutlineIcon"
        ),
    ),
    "mdi-flask-empty": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FlaskEmptyIcon" */
            "mdi-react/FlaskEmptyIcon"
        ),
    ),
    "mdi-flask-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FlaskOutlineIcon" */
            "mdi-react/FlaskOutlineIcon"
        ),
    ),
    "mdi-flask": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FlaskIcon" */
            "mdi-react/FlaskIcon"
        ),
    ),
    "mdi-flattr": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FlattrIcon" */
            "mdi-react/FlattrIcon"
        ),
    ),
    "mdi-flip-to-back": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FlipToBackIcon" */
            "mdi-react/FlipToBackIcon"
        ),
    ),
    "mdi-flip-to-front": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FlipToFrontIcon" */
            "mdi-react/FlipToFrontIcon"
        ),
    ),
    "mdi-floor-lamp": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FloorLampIcon" */
            "mdi-react/FloorLampIcon"
        ),
    ),
    "mdi-floor-plan": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FloorPlanIcon" */
            "mdi-react/FloorPlanIcon"
        ),
    ),
    "mdi-floppy": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FloppyIcon" */
            "mdi-react/FloppyIcon"
        ),
    ),
    "mdi-flower": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FlowerIcon" */
            "mdi-react/FlowerIcon"
        ),
    ),
    "mdi-folder-account": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FolderAccountIcon" */
            "mdi-react/FolderAccountIcon"
        ),
    ),
    "mdi-folder-download": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FolderDownloadIcon" */
            "mdi-react/FolderDownloadIcon"
        ),
    ),
    "mdi-folder-edit": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FolderEditIcon" */
            "mdi-react/FolderEditIcon"
        ),
    ),
    "mdi-folder-google-drive": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FolderGoogleDriveIcon" */
            "mdi-react/FolderGoogleDriveIcon"
        ),
    ),
    "mdi-folder-image": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FolderImageIcon" */
            "mdi-react/FolderImageIcon"
        ),
    ),
    "mdi-folder-key-network": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FolderKeyNetworkIcon" */
            "mdi-react/FolderKeyNetworkIcon"
        ),
    ),
    "mdi-folder-key": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FolderKeyIcon" */
            "mdi-react/FolderKeyIcon"
        ),
    ),
    "mdi-folder-lock-open": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FolderLockOpenIcon" */
            "mdi-react/FolderLockOpenIcon"
        ),
    ),
    "mdi-folder-lock": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FolderLockIcon" */
            "mdi-react/FolderLockIcon"
        ),
    ),
    "mdi-folder-move": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FolderMoveIcon" */
            "mdi-react/FolderMoveIcon"
        ),
    ),
    "mdi-folder-multiple-image": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FolderMultipleImageIcon" */
            "mdi-react/FolderMultipleImageIcon"
        ),
    ),
    "mdi-folder-multiple-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FolderMultipleOutlineIcon" */
            "mdi-react/FolderMultipleOutlineIcon"
        ),
    ),
    "mdi-folder-multiple": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FolderMultipleIcon" */
            "mdi-react/FolderMultipleIcon"
        ),
    ),
    "mdi-folder-network": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FolderNetworkIcon" */
            "mdi-react/FolderNetworkIcon"
        ),
    ),
    "mdi-folder-open": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FolderOpenIcon" */
            "mdi-react/FolderOpenIcon"
        ),
    ),
    "mdi-folder-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FolderOutlineIcon" */
            "mdi-react/FolderOutlineIcon"
        ),
    ),
    "mdi-folder-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FolderPlusIcon" */
            "mdi-react/FolderPlusIcon"
        ),
    ),
    "mdi-folder-remove": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FolderRemoveIcon" */
            "mdi-react/FolderRemoveIcon"
        ),
    ),
    "mdi-folder-search-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FolderSearchOutlineIcon" */
            "mdi-react/FolderSearchOutlineIcon"
        ),
    ),
    "mdi-folder-search": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FolderSearchIcon" */
            "mdi-react/FolderSearchIcon"
        ),
    ),
    "mdi-folder-star": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FolderStarIcon" */
            "mdi-react/FolderStarIcon"
        ),
    ),
    "mdi-folder-upload": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FolderUploadIcon" */
            "mdi-react/FolderUploadIcon"
        ),
    ),
    "mdi-folder": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FolderIcon" */
            "mdi-react/FolderIcon"
        ),
    ),
    "mdi-font-awesome": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FontAwesomeIcon" */
            "mdi-react/FontAwesomeIcon"
        ),
    ),
    "mdi-food-apple": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FoodAppleIcon" */
            "mdi-react/FoodAppleIcon"
        ),
    ),
    "mdi-food-croissant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FoodCroissantIcon" */
            "mdi-react/FoodCroissantIcon"
        ),
    ),
    "mdi-food-fork-drink": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FoodForkDrinkIcon" */
            "mdi-react/FoodForkDrinkIcon"
        ),
    ),
    "mdi-food-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FoodOffIcon" */
            "mdi-react/FoodOffIcon"
        ),
    ),
    "mdi-food-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FoodVariantIcon" */
            "mdi-react/FoodVariantIcon"
        ),
    ),
    "mdi-food": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FoodIcon" */
            "mdi-react/FoodIcon"
        ),
    ),
    "mdi-football-australian": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FootballAustralianIcon" */
            "mdi-react/FootballAustralianIcon"
        ),
    ),
    "mdi-football-helmet": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FootballHelmetIcon" */
            "mdi-react/FootballHelmetIcon"
        ),
    ),
    "mdi-football": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FootballIcon" */
            "mdi-react/FootballIcon"
        ),
    ),
    "mdi-forklift": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ForkliftIcon" */
            "mdi-react/ForkliftIcon"
        ),
    ),
    "mdi-format-align-bottom": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatAlignBottomIcon" */
            "mdi-react/FormatAlignBottomIcon"
        ),
    ),
    "mdi-format-align-center": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatAlignCenterIcon" */
            "mdi-react/FormatAlignCenterIcon"
        ),
    ),
    "mdi-format-align-justify": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatAlignJustifyIcon" */
            "mdi-react/FormatAlignJustifyIcon"
        ),
    ),
    "mdi-format-align-left": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatAlignLeftIcon" */
            "mdi-react/FormatAlignLeftIcon"
        ),
    ),
    "mdi-format-align-middle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatAlignMiddleIcon" */
            "mdi-react/FormatAlignMiddleIcon"
        ),
    ),
    "mdi-format-align-right": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatAlignRightIcon" */
            "mdi-react/FormatAlignRightIcon"
        ),
    ),
    "mdi-format-align-top": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatAlignTopIcon" */
            "mdi-react/FormatAlignTopIcon"
        ),
    ),
    "mdi-format-annotation-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatAnnotationPlusIcon" */
            "mdi-react/FormatAnnotationPlusIcon"
        ),
    ),
    "mdi-format-bold": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatBoldIcon" */
            "mdi-react/FormatBoldIcon"
        ),
    ),
    "mdi-format-clear": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatClearIcon" */
            "mdi-react/FormatClearIcon"
        ),
    ),
    "mdi-format-color-fill": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatColorFillIcon" */
            "mdi-react/FormatColorFillIcon"
        ),
    ),
    "mdi-format-color-text": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatColorTextIcon" */
            "mdi-react/FormatColorTextIcon"
        ),
    ),
    "mdi-format-columns": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatColumnsIcon" */
            "mdi-react/FormatColumnsIcon"
        ),
    ),
    "mdi-format-float-center": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatFloatCenterIcon" */
            "mdi-react/FormatFloatCenterIcon"
        ),
    ),
    "mdi-format-float-left": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatFloatLeftIcon" */
            "mdi-react/FormatFloatLeftIcon"
        ),
    ),
    "mdi-format-float-none": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatFloatNoneIcon" */
            "mdi-react/FormatFloatNoneIcon"
        ),
    ),
    "mdi-format-float-right": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatFloatRightIcon" */
            "mdi-react/FormatFloatRightIcon"
        ),
    ),
    "mdi-format-font": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatFontIcon" */
            "mdi-react/FormatFontIcon"
        ),
    ),
    "mdi-format-header-1": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatHeader1Icon" */
            "mdi-react/FormatHeader1Icon"
        ),
    ),
    "mdi-format-header-2": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatHeader2Icon" */
            "mdi-react/FormatHeader2Icon"
        ),
    ),
    "mdi-format-header-3": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatHeader3Icon" */
            "mdi-react/FormatHeader3Icon"
        ),
    ),
    "mdi-format-header-4": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatHeader4Icon" */
            "mdi-react/FormatHeader4Icon"
        ),
    ),
    "mdi-format-header-5": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatHeader5Icon" */
            "mdi-react/FormatHeader5Icon"
        ),
    ),
    "mdi-format-header-6": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatHeader6Icon" */
            "mdi-react/FormatHeader6Icon"
        ),
    ),
    "mdi-format-header-decrease": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatHeaderDecreaseIcon" */
            "mdi-react/FormatHeaderDecreaseIcon"
        ),
    ),
    "mdi-format-header-equal": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatHeaderEqualIcon" */
            "mdi-react/FormatHeaderEqualIcon"
        ),
    ),
    "mdi-format-header-increase": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatHeaderIncreaseIcon" */
            "mdi-react/FormatHeaderIncreaseIcon"
        ),
    ),
    "mdi-format-header-pound": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatHeaderPoundIcon" */
            "mdi-react/FormatHeaderPoundIcon"
        ),
    ),
    "mdi-format-horizontal-align-center": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatHorizontalAlignCenterIcon" */
            "mdi-react/FormatHorizontalAlignCenterIcon"
        ),
    ),
    "mdi-format-horizontal-align-left": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatHorizontalAlignLeftIcon" */
            "mdi-react/FormatHorizontalAlignLeftIcon"
        ),
    ),
    "mdi-format-horizontal-align-right": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatHorizontalAlignRightIcon" */
            "mdi-react/FormatHorizontalAlignRightIcon"
        ),
    ),
    "mdi-format-indent-decrease": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatIndentDecreaseIcon" */
            "mdi-react/FormatIndentDecreaseIcon"
        ),
    ),
    "mdi-format-indent-increase": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatIndentIncreaseIcon" */
            "mdi-react/FormatIndentIncreaseIcon"
        ),
    ),
    "mdi-format-italic": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatItalicIcon" */
            "mdi-react/FormatItalicIcon"
        ),
    ),
    "mdi-format-line-spacing": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatLineSpacingIcon" */
            "mdi-react/FormatLineSpacingIcon"
        ),
    ),
    "mdi-format-line-style": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatLineStyleIcon" */
            "mdi-react/FormatLineStyleIcon"
        ),
    ),
    "mdi-format-line-weight": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatLineWeightIcon" */
            "mdi-react/FormatLineWeightIcon"
        ),
    ),
    "mdi-format-list-bulleted-type": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatListBulletedTypeIcon" */
            "mdi-react/FormatListBulletedTypeIcon"
        ),
    ),
    "mdi-format-list-bulleted": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatListBulletedIcon" */
            "mdi-react/FormatListBulletedIcon"
        ),
    ),
    "mdi-format-list-checkbox": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatListCheckboxIcon" */
            "mdi-react/FormatListCheckboxIcon"
        ),
    ),
    "mdi-format-list-checks": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatListChecksIcon" */
            "mdi-react/FormatListChecksIcon"
        ),
    ),
    "mdi-format-list-numbers": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatListNumbersIcon" */
            "mdi-react/FormatListNumbersIcon"
        ),
    ),
    "mdi-format-page-break": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatPageBreakIcon" */
            "mdi-react/FormatPageBreakIcon"
        ),
    ),
    "mdi-format-paint": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatPaintIcon" */
            "mdi-react/FormatPaintIcon"
        ),
    ),
    "mdi-format-paragraph": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatParagraphIcon" */
            "mdi-react/FormatParagraphIcon"
        ),
    ),
    "mdi-format-pilcrow": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatPilcrowIcon" */
            "mdi-react/FormatPilcrowIcon"
        ),
    ),
    "mdi-format-quote-close": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatQuoteCloseIcon" */
            "mdi-react/FormatQuoteCloseIcon"
        ),
    ),
    "mdi-format-quote-open": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatQuoteOpenIcon" */
            "mdi-react/FormatQuoteOpenIcon"
        ),
    ),
    "mdi-format-rotate-90": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatRotate90Icon" */
            "mdi-react/FormatRotate90Icon"
        ),
    ),
    "mdi-format-section": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatSectionIcon" */
            "mdi-react/FormatSectionIcon"
        ),
    ),
    "mdi-format-size": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatSizeIcon" */
            "mdi-react/FormatSizeIcon"
        ),
    ),
    "mdi-format-strikethrough-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatStrikethroughVariantIcon" */
            "mdi-react/FormatStrikethroughVariantIcon"
        ),
    ),
    "mdi-format-strikethrough": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatStrikethroughIcon" */
            "mdi-react/FormatStrikethroughIcon"
        ),
    ),
    "mdi-format-subscript": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatSubscriptIcon" */
            "mdi-react/FormatSubscriptIcon"
        ),
    ),
    "mdi-format-superscript": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatSuperscriptIcon" */
            "mdi-react/FormatSuperscriptIcon"
        ),
    ),
    "mdi-format-text": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatTextIcon" */
            "mdi-react/FormatTextIcon"
        ),
    ),
    "mdi-format-textdirection-l-to-r": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatTextdirectionLToRIcon" */
            "mdi-react/FormatTextdirectionLToRIcon"
        ),
    ),
    "mdi-format-textdirection-r-to-l": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatTextdirectionRToLIcon" */
            "mdi-react/FormatTextdirectionRToLIcon"
        ),
    ),
    "mdi-format-title": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatTitleIcon" */
            "mdi-react/FormatTitleIcon"
        ),
    ),
    "mdi-format-underline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatUnderlineIcon" */
            "mdi-react/FormatUnderlineIcon"
        ),
    ),
    "mdi-format-vertical-align-bottom": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatVerticalAlignBottomIcon" */
            "mdi-react/FormatVerticalAlignBottomIcon"
        ),
    ),
    "mdi-format-vertical-align-center": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatVerticalAlignCenterIcon" */
            "mdi-react/FormatVerticalAlignCenterIcon"
        ),
    ),
    "mdi-format-vertical-align-top": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatVerticalAlignTopIcon" */
            "mdi-react/FormatVerticalAlignTopIcon"
        ),
    ),
    "mdi-format-wrap-inline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatWrapInlineIcon" */
            "mdi-react/FormatWrapInlineIcon"
        ),
    ),
    "mdi-format-wrap-square": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatWrapSquareIcon" */
            "mdi-react/FormatWrapSquareIcon"
        ),
    ),
    "mdi-format-wrap-tight": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatWrapTightIcon" */
            "mdi-react/FormatWrapTightIcon"
        ),
    ),
    "mdi-format-wrap-top-bottom": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatWrapTopBottomIcon" */
            "mdi-react/FormatWrapTopBottomIcon"
        ),
    ),
    "mdi-forum-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ForumOutlineIcon" */
            "mdi-react/ForumOutlineIcon"
        ),
    ),
    "mdi-forum": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ForumIcon" */
            "mdi-react/ForumIcon"
        ),
    ),
    "mdi-forward": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ForwardIcon" */
            "mdi-react/ForwardIcon"
        ),
    ),
    "mdi-fountain": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FountainIcon" */
            "mdi-react/FountainIcon"
        ),
    ),
    "mdi-foursquare": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FoursquareIcon" */
            "mdi-react/FoursquareIcon"
        ),
    ),
    "mdi-freebsd": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FreebsdIcon" */
            "mdi-react/FreebsdIcon"
        ),
    ),
    "mdi-fridge-filled-bottom": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FridgeFilledBottomIcon" */
            "mdi-react/FridgeFilledBottomIcon"
        ),
    ),
    "mdi-fridge-filled-top": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FridgeFilledTopIcon" */
            "mdi-react/FridgeFilledTopIcon"
        ),
    ),
    "mdi-fridge-filled": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FridgeFilledIcon" */
            "mdi-react/FridgeFilledIcon"
        ),
    ),
    "mdi-fridge": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FridgeIcon" */
            "mdi-react/FridgeIcon"
        ),
    ),
    "mdi-fuel": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FuelIcon" */
            "mdi-react/FuelIcon"
        ),
    ),
    "mdi-fullscreen-exit": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FullscreenExitIcon" */
            "mdi-react/FullscreenExitIcon"
        ),
    ),
    "mdi-fullscreen": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FullscreenIcon" */
            "mdi-react/FullscreenIcon"
        ),
    ),
    "mdi-function-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FunctionVariantIcon" */
            "mdi-react/FunctionVariantIcon"
        ),
    ),
    "mdi-function": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FunctionIcon" */
            "mdi-react/FunctionIcon"
        ),
    ),
    "mdi-gamepad-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GamepadVariantIcon" */
            "mdi-react/GamepadVariantIcon"
        ),
    ),
    "mdi-gamepad": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GamepadIcon" */
            "mdi-react/GamepadIcon"
        ),
    ),
    "mdi-garage-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GarageAlertIcon" */
            "mdi-react/GarageAlertIcon"
        ),
    ),
    "mdi-garage-open": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GarageOpenIcon" */
            "mdi-react/GarageOpenIcon"
        ),
    ),
    "mdi-garage": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GarageIcon" */
            "mdi-react/GarageIcon"
        ),
    ),
    "mdi-gas-cylinder": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GasCylinderIcon" */
            "mdi-react/GasCylinderIcon"
        ),
    ),
    "mdi-gas-station": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GasStationIcon" */
            "mdi-react/GasStationIcon"
        ),
    ),
    "mdi-gate-and": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GateAndIcon" */
            "mdi-react/GateAndIcon"
        ),
    ),
    "mdi-gate-nand": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GateNandIcon" */
            "mdi-react/GateNandIcon"
        ),
    ),
    "mdi-gate-nor": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GateNorIcon" */
            "mdi-react/GateNorIcon"
        ),
    ),
    "mdi-gate-not": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GateNotIcon" */
            "mdi-react/GateNotIcon"
        ),
    ),
    "mdi-gate-or": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GateOrIcon" */
            "mdi-react/GateOrIcon"
        ),
    ),
    "mdi-gate-xnor": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GateXnorIcon" */
            "mdi-react/GateXnorIcon"
        ),
    ),
    "mdi-gate-xor": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GateXorIcon" */
            "mdi-react/GateXorIcon"
        ),
    ),
    "mdi-gate": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GateIcon" */
            "mdi-react/GateIcon"
        ),
    ),
    "mdi-gauge-empty": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GaugeEmptyIcon" */
            "mdi-react/GaugeEmptyIcon"
        ),
    ),
    "mdi-gauge-full": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GaugeFullIcon" */
            "mdi-react/GaugeFullIcon"
        ),
    ),
    "mdi-gauge-low": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GaugeLowIcon" */
            "mdi-react/GaugeLowIcon"
        ),
    ),
    "mdi-gauge": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GaugeIcon" */
            "mdi-react/GaugeIcon"
        ),
    ),
    "mdi-gavel": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GavelIcon" */
            "mdi-react/GavelIcon"
        ),
    ),
    "mdi-gender-female": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GenderFemaleIcon" */
            "mdi-react/GenderFemaleIcon"
        ),
    ),
    "mdi-gender-male-female": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GenderMaleFemaleIcon" */
            "mdi-react/GenderMaleFemaleIcon"
        ),
    ),
    "mdi-gender-male": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GenderMaleIcon" */
            "mdi-react/GenderMaleIcon"
        ),
    ),
    "mdi-gender-transgender": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GenderTransgenderIcon" */
            "mdi-react/GenderTransgenderIcon"
        ),
    ),
    "mdi-gentoo": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GentooIcon" */
            "mdi-react/GentooIcon"
        ),
    ),
    "mdi-gesture-double-tap": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GestureDoubleTapIcon" */
            "mdi-react/GestureDoubleTapIcon"
        ),
    ),
    "mdi-gesture-swipe-down": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GestureSwipeDownIcon" */
            "mdi-react/GestureSwipeDownIcon"
        ),
    ),
    "mdi-gesture-swipe-left": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GestureSwipeLeftIcon" */
            "mdi-react/GestureSwipeLeftIcon"
        ),
    ),
    "mdi-gesture-swipe-right": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GestureSwipeRightIcon" */
            "mdi-react/GestureSwipeRightIcon"
        ),
    ),
    "mdi-gesture-swipe-up": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GestureSwipeUpIcon" */
            "mdi-react/GestureSwipeUpIcon"
        ),
    ),
    "mdi-gesture-tap": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GestureTapIcon" */
            "mdi-react/GestureTapIcon"
        ),
    ),
    "mdi-gesture-two-double-tap": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GestureTwoDoubleTapIcon" */
            "mdi-react/GestureTwoDoubleTapIcon"
        ),
    ),
    "mdi-gesture-two-tap": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GestureTwoTapIcon" */
            "mdi-react/GestureTwoTapIcon"
        ),
    ),
    "mdi-gesture": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GestureIcon" */
            "mdi-react/GestureIcon"
        ),
    ),
    "mdi-ghost": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GhostIcon" */
            "mdi-react/GhostIcon"
        ),
    ),
    "mdi-gift": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GiftIcon" */
            "mdi-react/GiftIcon"
        ),
    ),
    "mdi-git": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GitIcon" */
            "mdi-react/GitIcon"
        ),
    ),
    "mdi-github-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GithubBoxIcon" */
            "mdi-react/GithubBoxIcon"
        ),
    ),
    "mdi-github-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GithubCircleIcon" */
            "mdi-react/GithubCircleIcon"
        ),
    ),
    "mdi-github-face": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GithubFaceIcon" */
            "mdi-react/GithubFaceIcon"
        ),
    ),
    "mdi-glass-cocktail": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GlassCocktailIcon" */
            "mdi-react/GlassCocktailIcon"
        ),
    ),
    "mdi-glass-flute": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GlassFluteIcon" */
            "mdi-react/GlassFluteIcon"
        ),
    ),
    "mdi-glass-mug": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GlassMugIcon" */
            "mdi-react/GlassMugIcon"
        ),
    ),
    "mdi-glass-stange": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GlassStangeIcon" */
            "mdi-react/GlassStangeIcon"
        ),
    ),
    "mdi-glass-tulip": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GlassTulipIcon" */
            "mdi-react/GlassTulipIcon"
        ),
    ),
    "mdi-glass-wine": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GlassWineIcon" */
            "mdi-react/GlassWineIcon"
        ),
    ),
    "mdi-glassdoor": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GlassdoorIcon" */
            "mdi-react/GlassdoorIcon"
        ),
    ),
    "mdi-glasses": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GlassesIcon" */
            "mdi-react/GlassesIcon"
        ),
    ),
    "mdi-globe-model": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GlobeModelIcon" */
            "mdi-react/GlobeModelIcon"
        ),
    ),
    "mdi-gmail": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GmailIcon" */
            "mdi-react/GmailIcon"
        ),
    ),
    "mdi-gnome": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GnomeIcon" */
            "mdi-react/GnomeIcon"
        ),
    ),
    "mdi-golf": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GolfIcon" */
            "mdi-react/GolfIcon"
        ),
    ),
    "mdi-gondola": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GondolaIcon" */
            "mdi-react/GondolaIcon"
        ),
    ),
    "mdi-google-allo": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GoogleAlloIcon" */
            "mdi-react/GoogleAlloIcon"
        ),
    ),
    "mdi-google-analytics": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GoogleAnalyticsIcon" */
            "mdi-react/GoogleAnalyticsIcon"
        ),
    ),
    "mdi-google-assistant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GoogleAssistantIcon" */
            "mdi-react/GoogleAssistantIcon"
        ),
    ),
    "mdi-google-cardboard": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GoogleCardboardIcon" */
            "mdi-react/GoogleCardboardIcon"
        ),
    ),
    "mdi-google-chrome": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GoogleChromeIcon" */
            "mdi-react/GoogleChromeIcon"
        ),
    ),
    "mdi-google-circles-communities": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GoogleCirclesCommunitiesIcon" */
            "mdi-react/GoogleCirclesCommunitiesIcon"
        ),
    ),
    "mdi-google-circles-extended": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GoogleCirclesExtendedIcon" */
            "mdi-react/GoogleCirclesExtendedIcon"
        ),
    ),
    "mdi-google-circles-group": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GoogleCirclesGroupIcon" */
            "mdi-react/GoogleCirclesGroupIcon"
        ),
    ),
    "mdi-google-circles": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GoogleCirclesIcon" */
            "mdi-react/GoogleCirclesIcon"
        ),
    ),
    "mdi-google-controller-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GoogleControllerOffIcon" */
            "mdi-react/GoogleControllerOffIcon"
        ),
    ),
    "mdi-google-controller": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GoogleControllerIcon" */
            "mdi-react/GoogleControllerIcon"
        ),
    ),
    "mdi-google-drive": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GoogleDriveIcon" */
            "mdi-react/GoogleDriveIcon"
        ),
    ),
    "mdi-google-earth": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GoogleEarthIcon" */
            "mdi-react/GoogleEarthIcon"
        ),
    ),
    "mdi-google-fit": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GoogleFitIcon" */
            "mdi-react/GoogleFitIcon"
        ),
    ),
    "mdi-google-glass": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GoogleGlassIcon" */
            "mdi-react/GoogleGlassIcon"
        ),
    ),
    "mdi-google-hangouts": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GoogleHangoutsIcon" */
            "mdi-react/GoogleHangoutsIcon"
        ),
    ),
    "mdi-google-home": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GoogleHomeIcon" */
            "mdi-react/GoogleHomeIcon"
        ),
    ),
    "mdi-google-keep": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GoogleKeepIcon" */
            "mdi-react/GoogleKeepIcon"
        ),
    ),
    "mdi-google-maps": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GoogleMapsIcon" */
            "mdi-react/GoogleMapsIcon"
        ),
    ),
    "mdi-google-nearby": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GoogleNearbyIcon" */
            "mdi-react/GoogleNearbyIcon"
        ),
    ),
    "mdi-google-pages": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GooglePagesIcon" */
            "mdi-react/GooglePagesIcon"
        ),
    ),
    "mdi-google-photos": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GooglePhotosIcon" */
            "mdi-react/GooglePhotosIcon"
        ),
    ),
    "mdi-google-physical-web": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GooglePhysicalWebIcon" */
            "mdi-react/GooglePhysicalWebIcon"
        ),
    ),
    "mdi-google-play": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GooglePlayIcon" */
            "mdi-react/GooglePlayIcon"
        ),
    ),
    "mdi-google-plus-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GooglePlusBoxIcon" */
            "mdi-react/GooglePlusBoxIcon"
        ),
    ),
    "mdi-google-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GooglePlusIcon" */
            "mdi-react/GooglePlusIcon"
        ),
    ),
    "mdi-google-translate": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GoogleTranslateIcon" */
            "mdi-react/GoogleTranslateIcon"
        ),
    ),
    "mdi-google-wallet": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GoogleWalletIcon" */
            "mdi-react/GoogleWalletIcon"
        ),
    ),
    "mdi-google": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GoogleIcon" */
            "mdi-react/GoogleIcon"
        ),
    ),
    "mdi-gpu": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GpuIcon" */
            "mdi-react/GpuIcon"
        ),
    ),
    "mdi-gradient": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GradientIcon" */
            "mdi-react/GradientIcon"
        ),
    ),
    "mdi-graphql": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GraphqlIcon" */
            "mdi-react/GraphqlIcon"
        ),
    ),
    "mdi-grease-pencil": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GreasePencilIcon" */
            "mdi-react/GreasePencilIcon"
        ),
    ),
    "mdi-greater-than-or-equal": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GreaterThanOrEqualIcon" */
            "mdi-react/GreaterThanOrEqualIcon"
        ),
    ),
    "mdi-greater-than": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GreaterThanIcon" */
            "mdi-react/GreaterThanIcon"
        ),
    ),
    "mdi-grid-large": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GridLargeIcon" */
            "mdi-react/GridLargeIcon"
        ),
    ),
    "mdi-grid-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GridOffIcon" */
            "mdi-react/GridOffIcon"
        ),
    ),
    "mdi-grid": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GridIcon" */
            "mdi-react/GridIcon"
        ),
    ),
    "mdi-group": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GroupIcon" */
            "mdi-react/GroupIcon"
        ),
    ),
    "mdi-guitar-acoustic": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GuitarAcousticIcon" */
            "mdi-react/GuitarAcousticIcon"
        ),
    ),
    "mdi-guitar-electric": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GuitarElectricIcon" */
            "mdi-react/GuitarElectricIcon"
        ),
    ),
    "mdi-guitar-pick-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GuitarPickOutlineIcon" */
            "mdi-react/GuitarPickOutlineIcon"
        ),
    ),
    "mdi-guitar-pick": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GuitarPickIcon" */
            "mdi-react/GuitarPickIcon"
        ),
    ),
    "mdi-guy-fawkes-mask": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GuyFawkesMaskIcon" */
            "mdi-react/GuyFawkesMaskIcon"
        ),
    ),
    "mdi-hackernews": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HackernewsIcon" */
            "mdi-react/HackernewsIcon"
        ),
    ),
    "mdi-hamburger": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HamburgerIcon" */
            "mdi-react/HamburgerIcon"
        ),
    ),
    "mdi-hammer": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HammerIcon" */
            "mdi-react/HammerIcon"
        ),
    ),
    "mdi-hand-pointing-right": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HandPointingRightIcon" */
            "mdi-react/HandPointingRightIcon"
        ),
    ),
    "mdi-hanger": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HangerIcon" */
            "mdi-react/HangerIcon"
        ),
    ),
    "mdi-hard-hat": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HardHatIcon" */
            "mdi-react/HardHatIcon"
        ),
    ),
    "mdi-harddisk": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HarddiskIcon" */
            "mdi-react/HarddiskIcon"
        ),
    ),
    "mdi-headphones-bluetooth": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HeadphonesBluetoothIcon" */
            "mdi-react/HeadphonesBluetoothIcon"
        ),
    ),
    "mdi-headphones-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HeadphonesBoxIcon" */
            "mdi-react/HeadphonesBoxIcon"
        ),
    ),
    "mdi-headphones-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HeadphonesOffIcon" */
            "mdi-react/HeadphonesOffIcon"
        ),
    ),
    "mdi-headphones-settings": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HeadphonesSettingsIcon" */
            "mdi-react/HeadphonesSettingsIcon"
        ),
    ),
    "mdi-headphones": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HeadphonesIcon" */
            "mdi-react/HeadphonesIcon"
        ),
    ),
    "mdi-headset-dock": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HeadsetDockIcon" */
            "mdi-react/HeadsetDockIcon"
        ),
    ),
    "mdi-headset-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HeadsetOffIcon" */
            "mdi-react/HeadsetOffIcon"
        ),
    ),
    "mdi-headset": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HeadsetIcon" */
            "mdi-react/HeadsetIcon"
        ),
    ),
    "mdi-heart-box-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HeartBoxOutlineIcon" */
            "mdi-react/HeartBoxOutlineIcon"
        ),
    ),
    "mdi-heart-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HeartBoxIcon" */
            "mdi-react/HeartBoxIcon"
        ),
    ),
    "mdi-heart-broken": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HeartBrokenIcon" */
            "mdi-react/HeartBrokenIcon"
        ),
    ),
    "mdi-heart-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HeartCircleOutlineIcon" */
            "mdi-react/HeartCircleOutlineIcon"
        ),
    ),
    "mdi-heart-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HeartCircleIcon" */
            "mdi-react/HeartCircleIcon"
        ),
    ),
    "mdi-heart-half-full": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HeartHalfFullIcon" */
            "mdi-react/HeartHalfFullIcon"
        ),
    ),
    "mdi-heart-half-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HeartHalfOutlineIcon" */
            "mdi-react/HeartHalfOutlineIcon"
        ),
    ),
    "mdi-heart-half": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HeartHalfIcon" */
            "mdi-react/HeartHalfIcon"
        ),
    ),
    "mdi-heart-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HeartOffIcon" */
            "mdi-react/HeartOffIcon"
        ),
    ),
    "mdi-heart-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HeartOutlineIcon" */
            "mdi-react/HeartOutlineIcon"
        ),
    ),
    "mdi-heart-pulse": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HeartPulseIcon" */
            "mdi-react/HeartPulseIcon"
        ),
    ),
    "mdi-heart": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HeartIcon" */
            "mdi-react/HeartIcon"
        ),
    ),
    "mdi-help-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HelpBoxIcon" */
            "mdi-react/HelpBoxIcon"
        ),
    ),
    "mdi-help-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HelpCircleOutlineIcon" */
            "mdi-react/HelpCircleOutlineIcon"
        ),
    ),
    "mdi-help-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HelpCircleIcon" */
            "mdi-react/HelpCircleIcon"
        ),
    ),
    "mdi-help-network": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HelpNetworkIcon" */
            "mdi-react/HelpNetworkIcon"
        ),
    ),
    "mdi-help": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HelpIcon" */
            "mdi-react/HelpIcon"
        ),
    ),
    "mdi-hexagon-multiple": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HexagonMultipleIcon" */
            "mdi-react/HexagonMultipleIcon"
        ),
    ),
    "mdi-hexagon-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HexagonOutlineIcon" */
            "mdi-react/HexagonOutlineIcon"
        ),
    ),
    "mdi-hexagon": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HexagonIcon" */
            "mdi-react/HexagonIcon"
        ),
    ),
    "mdi-high-definition-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HighDefinitionBoxIcon" */
            "mdi-react/HighDefinitionBoxIcon"
        ),
    ),
    "mdi-high-definition": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HighDefinitionIcon" */
            "mdi-react/HighDefinitionIcon"
        ),
    ),
    "mdi-highway": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HighwayIcon" */
            "mdi-react/HighwayIcon"
        ),
    ),
    "mdi-hinduism": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HinduismIcon" */
            "mdi-react/HinduismIcon"
        ),
    ),
    "mdi-history": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HistoryIcon" */
            "mdi-react/HistoryIcon"
        ),
    ),
    "mdi-hockey-puck": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HockeyPuckIcon" */
            "mdi-react/HockeyPuckIcon"
        ),
    ),
    "mdi-hockey-sticks": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HockeySticksIcon" */
            "mdi-react/HockeySticksIcon"
        ),
    ),
    "mdi-hololens": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HololensIcon" */
            "mdi-react/HololensIcon"
        ),
    ),
    "mdi-home-account": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HomeAccountIcon" */
            "mdi-react/HomeAccountIcon"
        ),
    ),
    "mdi-home-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HomeAlertIcon" */
            "mdi-react/HomeAlertIcon"
        ),
    ),
    "mdi-home-assistant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HomeAssistantIcon" */
            "mdi-react/HomeAssistantIcon"
        ),
    ),
    "mdi-home-automation": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HomeAutomationIcon" */
            "mdi-react/HomeAutomationIcon"
        ),
    ),
    "mdi-home-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HomeCircleIcon" */
            "mdi-react/HomeCircleIcon"
        ),
    ),
    "mdi-home-currency-usd": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HomeCurrencyUsdIcon" */
            "mdi-react/HomeCurrencyUsdIcon"
        ),
    ),
    "mdi-home-heart": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HomeHeartIcon" */
            "mdi-react/HomeHeartIcon"
        ),
    ),
    "mdi-home-lock-open": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HomeLockOpenIcon" */
            "mdi-react/HomeLockOpenIcon"
        ),
    ),
    "mdi-home-lock": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HomeLockIcon" */
            "mdi-react/HomeLockIcon"
        ),
    ),
    "mdi-home-map-marker": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HomeMapMarkerIcon" */
            "mdi-react/HomeMapMarkerIcon"
        ),
    ),
    "mdi-home-minus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HomeMinusIcon" */
            "mdi-react/HomeMinusIcon"
        ),
    ),
    "mdi-home-modern": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HomeModernIcon" */
            "mdi-react/HomeModernIcon"
        ),
    ),
    "mdi-home-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HomeOutlineIcon" */
            "mdi-react/HomeOutlineIcon"
        ),
    ),
    "mdi-home-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HomePlusIcon" */
            "mdi-react/HomePlusIcon"
        ),
    ),
    "mdi-home-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HomeVariantIcon" */
            "mdi-react/HomeVariantIcon"
        ),
    ),
    "mdi-home": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HomeIcon" */
            "mdi-react/HomeIcon"
        ),
    ),
    "mdi-hook-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HookOffIcon" */
            "mdi-react/HookOffIcon"
        ),
    ),
    "mdi-hook": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HookIcon" */
            "mdi-react/HookIcon"
        ),
    ),
    "mdi-hops": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HopsIcon" */
            "mdi-react/HopsIcon"
        ),
    ),
    "mdi-hospital-building": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HospitalBuildingIcon" */
            "mdi-react/HospitalBuildingIcon"
        ),
    ),
    "mdi-hospital-marker": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HospitalMarkerIcon" */
            "mdi-react/HospitalMarkerIcon"
        ),
    ),
    "mdi-hospital": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HospitalIcon" */
            "mdi-react/HospitalIcon"
        ),
    ),
    "mdi-hot-tub": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HotTubIcon" */
            "mdi-react/HotTubIcon"
        ),
    ),
    "mdi-hotel": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HotelIcon" */
            "mdi-react/HotelIcon"
        ),
    ),
    "mdi-houzz-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HouzzBoxIcon" */
            "mdi-react/HouzzBoxIcon"
        ),
    ),
    "mdi-houzz": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HouzzIcon" */
            "mdi-react/HouzzIcon"
        ),
    ),
    "mdi-hulu": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HuluIcon" */
            "mdi-react/HuluIcon"
        ),
    ),
    "mdi-human-child": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HumanChildIcon" */
            "mdi-react/HumanChildIcon"
        ),
    ),
    "mdi-human-female": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HumanFemaleIcon" */
            "mdi-react/HumanFemaleIcon"
        ),
    ),
    "mdi-human-greeting": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HumanGreetingIcon" */
            "mdi-react/HumanGreetingIcon"
        ),
    ),
    "mdi-human-handsdown": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HumanHandsdownIcon" */
            "mdi-react/HumanHandsdownIcon"
        ),
    ),
    "mdi-human-handsup": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HumanHandsupIcon" */
            "mdi-react/HumanHandsupIcon"
        ),
    ),
    "mdi-human-male-female": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HumanMaleFemaleIcon" */
            "mdi-react/HumanMaleFemaleIcon"
        ),
    ),
    "mdi-human-male": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HumanMaleIcon" */
            "mdi-react/HumanMaleIcon"
        ),
    ),
    "mdi-human-pregnant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HumanPregnantIcon" */
            "mdi-react/HumanPregnantIcon"
        ),
    ),
    "mdi-human": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HumanIcon" */
            "mdi-react/HumanIcon"
        ),
    ),
    "mdi-humble-bundle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HumbleBundleIcon" */
            "mdi-react/HumbleBundleIcon"
        ),
    ),
    "mdi-ice-cream": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/IceCreamIcon" */
            "mdi-react/IceCreamIcon"
        ),
    ),
    "mdi-image-album": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ImageAlbumIcon" */
            "mdi-react/ImageAlbumIcon"
        ),
    ),
    "mdi-image-area-close": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ImageAreaCloseIcon" */
            "mdi-react/ImageAreaCloseIcon"
        ),
    ),
    "mdi-image-area": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ImageAreaIcon" */
            "mdi-react/ImageAreaIcon"
        ),
    ),
    "mdi-image-broken-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ImageBrokenVariantIcon" */
            "mdi-react/ImageBrokenVariantIcon"
        ),
    ),
    "mdi-image-broken": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ImageBrokenIcon" */
            "mdi-react/ImageBrokenIcon"
        ),
    ),
    "mdi-image-filter-black-white": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ImageFilterBlackWhiteIcon" */
            "mdi-react/ImageFilterBlackWhiteIcon"
        ),
    ),
    "mdi-image-filter-center-focus-weak": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ImageFilterCenterFocusWeakIcon" */
            "mdi-react/ImageFilterCenterFocusWeakIcon"
        ),
    ),
    "mdi-image-filter-center-focus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ImageFilterCenterFocusIcon" */
            "mdi-react/ImageFilterCenterFocusIcon"
        ),
    ),
    "mdi-image-filter-drama": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ImageFilterDramaIcon" */
            "mdi-react/ImageFilterDramaIcon"
        ),
    ),
    "mdi-image-filter-frames": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ImageFilterFramesIcon" */
            "mdi-react/ImageFilterFramesIcon"
        ),
    ),
    "mdi-image-filter-hdr": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ImageFilterHdrIcon" */
            "mdi-react/ImageFilterHdrIcon"
        ),
    ),
    "mdi-image-filter-none": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ImageFilterNoneIcon" */
            "mdi-react/ImageFilterNoneIcon"
        ),
    ),
    "mdi-image-filter-tilt-shift": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ImageFilterTiltShiftIcon" */
            "mdi-react/ImageFilterTiltShiftIcon"
        ),
    ),
    "mdi-image-filter-vintage": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ImageFilterVintageIcon" */
            "mdi-react/ImageFilterVintageIcon"
        ),
    ),
    "mdi-image-filter": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ImageFilterIcon" */
            "mdi-react/ImageFilterIcon"
        ),
    ),
    "mdi-image-multiple": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ImageMultipleIcon" */
            "mdi-react/ImageMultipleIcon"
        ),
    ),
    "mdi-image-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ImageOffIcon" */
            "mdi-react/ImageOffIcon"
        ),
    ),
    "mdi-image-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ImageOutlineIcon" */
            "mdi-react/ImageOutlineIcon"
        ),
    ),
    "mdi-image-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ImagePlusIcon" */
            "mdi-react/ImagePlusIcon"
        ),
    ),
    "mdi-image-search-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ImageSearchOutlineIcon" */
            "mdi-react/ImageSearchOutlineIcon"
        ),
    ),
    "mdi-image-search": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ImageSearchIcon" */
            "mdi-react/ImageSearchIcon"
        ),
    ),
    "mdi-image": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ImageIcon" */
            "mdi-react/ImageIcon"
        ),
    ),
    "mdi-import": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ImportIcon" */
            "mdi-react/ImportIcon"
        ),
    ),
    "mdi-inbox-arrow-down": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/InboxArrowDownIcon" */
            "mdi-react/InboxArrowDownIcon"
        ),
    ),
    "mdi-inbox-arrow-up": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/InboxArrowUpIcon" */
            "mdi-react/InboxArrowUpIcon"
        ),
    ),
    "mdi-inbox-multiple": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/InboxMultipleIcon" */
            "mdi-react/InboxMultipleIcon"
        ),
    ),
    "mdi-inbox": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/InboxIcon" */
            "mdi-react/InboxIcon"
        ),
    ),
    "mdi-incognito": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/IncognitoIcon" */
            "mdi-react/IncognitoIcon"
        ),
    ),
    "mdi-infinity": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/InfinityIcon" */
            "mdi-react/InfinityIcon"
        ),
    ),
    "mdi-information-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/InformationOutlineIcon" */
            "mdi-react/InformationOutlineIcon"
        ),
    ),
    "mdi-information-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/InformationVariantIcon" */
            "mdi-react/InformationVariantIcon"
        ),
    ),
    "mdi-information": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/InformationIcon" */
            "mdi-react/InformationIcon"
        ),
    ),
    "mdi-instagram": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/InstagramIcon" */
            "mdi-react/InstagramIcon"
        ),
    ),
    "mdi-instapaper": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/InstapaperIcon" */
            "mdi-react/InstapaperIcon"
        ),
    ),
    "mdi-internet-explorer": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/InternetExplorerIcon" */
            "mdi-react/InternetExplorerIcon"
        ),
    ),
    "mdi-invert-colors": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/InvertColorsIcon" */
            "mdi-react/InvertColorsIcon"
        ),
    ),
    "mdi-islam": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/IslamIcon" */
            "mdi-react/IslamIcon"
        ),
    ),
    "mdi-itunes": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ItunesIcon" */
            "mdi-react/ItunesIcon"
        ),
    ),
    "mdi-jeepney": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/JeepneyIcon" */
            "mdi-react/JeepneyIcon"
        ),
    ),
    "mdi-jira": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/JiraIcon" */
            "mdi-react/JiraIcon"
        ),
    ),
    "mdi-jquery": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/JqueryIcon" */
            "mdi-react/JqueryIcon"
        ),
    ),
    "mdi-jsfiddle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/JsfiddleIcon" */
            "mdi-react/JsfiddleIcon"
        ),
    ),
    "mdi-json": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/JsonIcon" */
            "mdi-react/JsonIcon"
        ),
    ),
    "mdi-judaism": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/JudaismIcon" */
            "mdi-react/JudaismIcon"
        ),
    ),
    "mdi-karate": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/KarateIcon" */
            "mdi-react/KarateIcon"
        ),
    ),
    "mdi-keg": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/KegIcon" */
            "mdi-react/KegIcon"
        ),
    ),
    "mdi-kettle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/KettleIcon" */
            "mdi-react/KettleIcon"
        ),
    ),
    "mdi-key-change": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/KeyChangeIcon" */
            "mdi-react/KeyChangeIcon"
        ),
    ),
    "mdi-key-minus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/KeyMinusIcon" */
            "mdi-react/KeyMinusIcon"
        ),
    ),
    "mdi-key-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/KeyPlusIcon" */
            "mdi-react/KeyPlusIcon"
        ),
    ),
    "mdi-key-remove": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/KeyRemoveIcon" */
            "mdi-react/KeyRemoveIcon"
        ),
    ),
    "mdi-key-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/KeyVariantIcon" */
            "mdi-react/KeyVariantIcon"
        ),
    ),
    "mdi-key": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/KeyIcon" */
            "mdi-react/KeyIcon"
        ),
    ),
    "mdi-keyboard-backspace": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/KeyboardBackspaceIcon" */
            "mdi-react/KeyboardBackspaceIcon"
        ),
    ),
    "mdi-keyboard-caps": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/KeyboardCapsIcon" */
            "mdi-react/KeyboardCapsIcon"
        ),
    ),
    "mdi-keyboard-close": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/KeyboardCloseIcon" */
            "mdi-react/KeyboardCloseIcon"
        ),
    ),
    "mdi-keyboard-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/KeyboardOffIcon" */
            "mdi-react/KeyboardOffIcon"
        ),
    ),
    "mdi-keyboard-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/KeyboardOutlineIcon" */
            "mdi-react/KeyboardOutlineIcon"
        ),
    ),
    "mdi-keyboard-return": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/KeyboardReturnIcon" */
            "mdi-react/KeyboardReturnIcon"
        ),
    ),
    "mdi-keyboard-tab": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/KeyboardTabIcon" */
            "mdi-react/KeyboardTabIcon"
        ),
    ),
    "mdi-keyboard-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/KeyboardVariantIcon" */
            "mdi-react/KeyboardVariantIcon"
        ),
    ),
    "mdi-keyboard": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/KeyboardIcon" */
            "mdi-react/KeyboardIcon"
        ),
    ),
    "mdi-kickstarter": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/KickstarterIcon" */
            "mdi-react/KickstarterIcon"
        ),
    ),
    "mdi-kodi": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/KodiIcon" */
            "mdi-react/KodiIcon"
        ),
    ),
    "mdi-label-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LabelOutlineIcon" */
            "mdi-react/LabelOutlineIcon"
        ),
    ),
    "mdi-label": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LabelIcon" */
            "mdi-react/LabelIcon"
        ),
    ),
    "mdi-ladybug": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LadybugIcon" */
            "mdi-react/LadybugIcon"
        ),
    ),
    "mdi-lambda": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LambdaIcon" */
            "mdi-react/LambdaIcon"
        ),
    ),
    "mdi-lamp": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LampIcon" */
            "mdi-react/LampIcon"
        ),
    ),
    "mdi-lan-connect": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LanConnectIcon" */
            "mdi-react/LanConnectIcon"
        ),
    ),
    "mdi-lan-disconnect": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LanDisconnectIcon" */
            "mdi-react/LanDisconnectIcon"
        ),
    ),
    "mdi-lan-pending": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LanPendingIcon" */
            "mdi-react/LanPendingIcon"
        ),
    ),
    "mdi-lan": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LanIcon" */
            "mdi-react/LanIcon"
        ),
    ),
    "mdi-language-c": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LanguageCIcon" */
            "mdi-react/LanguageCIcon"
        ),
    ),
    "mdi-language-cpp": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LanguageCppIcon" */
            "mdi-react/LanguageCppIcon"
        ),
    ),
    "mdi-language-csharp": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LanguageCsharpIcon" */
            "mdi-react/LanguageCsharpIcon"
        ),
    ),
    "mdi-language-css-3": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LanguageCss3Icon" */
            "mdi-react/LanguageCss3Icon"
        ),
    ),
    "mdi-language-go": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LanguageGoIcon" */
            "mdi-react/LanguageGoIcon"
        ),
    ),
    "mdi-language-html-5": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LanguageHtml5Icon" */
            "mdi-react/LanguageHtml5Icon"
        ),
    ),
    "mdi-language-javascript": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LanguageJavascriptIcon" */
            "mdi-react/LanguageJavascriptIcon"
        ),
    ),
    "mdi-language-lua": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LanguageLuaIcon" */
            "mdi-react/LanguageLuaIcon"
        ),
    ),
    "mdi-language-php": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LanguagePhpIcon" */
            "mdi-react/LanguagePhpIcon"
        ),
    ),
    "mdi-language-python-text": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LanguagePythonTextIcon" */
            "mdi-react/LanguagePythonTextIcon"
        ),
    ),
    "mdi-language-python": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LanguagePythonIcon" */
            "mdi-react/LanguagePythonIcon"
        ),
    ),
    "mdi-language-r": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LanguageRIcon" */
            "mdi-react/LanguageRIcon"
        ),
    ),
    "mdi-language-swift": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LanguageSwiftIcon" */
            "mdi-react/LanguageSwiftIcon"
        ),
    ),
    "mdi-language-typescript": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LanguageTypescriptIcon" */
            "mdi-react/LanguageTypescriptIcon"
        ),
    ),
    "mdi-laptop-chromebook": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LaptopChromebookIcon" */
            "mdi-react/LaptopChromebookIcon"
        ),
    ),
    "mdi-laptop-mac": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LaptopMacIcon" */
            "mdi-react/LaptopMacIcon"
        ),
    ),
    "mdi-laptop-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LaptopOffIcon" */
            "mdi-react/LaptopOffIcon"
        ),
    ),
    "mdi-laptop-windows": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LaptopWindowsIcon" */
            "mdi-react/LaptopWindowsIcon"
        ),
    ),
    "mdi-laptop": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LaptopIcon" */
            "mdi-react/LaptopIcon"
        ),
    ),
    "mdi-lastfm": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LastfmIcon" */
            "mdi-react/LastfmIcon"
        ),
    ),
    "mdi-lastpass": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LastpassIcon" */
            "mdi-react/LastpassIcon"
        ),
    ),
    "mdi-launch": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LaunchIcon" */
            "mdi-react/LaunchIcon"
        ),
    ),
    "mdi-lava-lamp": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LavaLampIcon" */
            "mdi-react/LavaLampIcon"
        ),
    ),
    "mdi-layers-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LayersOffIcon" */
            "mdi-react/LayersOffIcon"
        ),
    ),
    "mdi-layers": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LayersIcon" */
            "mdi-react/LayersIcon"
        ),
    ),
    "mdi-lead-pencil": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LeadPencilIcon" */
            "mdi-react/LeadPencilIcon"
        ),
    ),
    "mdi-leaf": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LeafIcon" */
            "mdi-react/LeafIcon"
        ),
    ),
    "mdi-led-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LedOffIcon" */
            "mdi-react/LedOffIcon"
        ),
    ),
    "mdi-led-on": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LedOnIcon" */
            "mdi-react/LedOnIcon"
        ),
    ),
    "mdi-led-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LedOutlineIcon" */
            "mdi-react/LedOutlineIcon"
        ),
    ),
    "mdi-led-strip": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LedStripIcon" */
            "mdi-react/LedStripIcon"
        ),
    ),
    "mdi-led-variant-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LedVariantOffIcon" */
            "mdi-react/LedVariantOffIcon"
        ),
    ),
    "mdi-led-variant-on": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LedVariantOnIcon" */
            "mdi-react/LedVariantOnIcon"
        ),
    ),
    "mdi-led-variant-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LedVariantOutlineIcon" */
            "mdi-react/LedVariantOutlineIcon"
        ),
    ),
    "mdi-less-than-or-equal": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LessThanOrEqualIcon" */
            "mdi-react/LessThanOrEqualIcon"
        ),
    ),
    "mdi-less-than": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LessThanIcon" */
            "mdi-react/LessThanIcon"
        ),
    ),
    "mdi-library-books": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LibraryBooksIcon" */
            "mdi-react/LibraryBooksIcon"
        ),
    ),
    "mdi-library-music": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LibraryMusicIcon" */
            "mdi-react/LibraryMusicIcon"
        ),
    ),
    "mdi-library-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LibraryPlusIcon" */
            "mdi-react/LibraryPlusIcon"
        ),
    ),
    "mdi-library": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LibraryIcon" */
            "mdi-react/LibraryIcon"
        ),
    ),
    "mdi-lifebuoy": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LifebuoyIcon" */
            "mdi-react/LifebuoyIcon"
        ),
    ),
    "mdi-light-switch": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LightSwitchIcon" */
            "mdi-react/LightSwitchIcon"
        ),
    ),
    "mdi-lightbulb-on-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LightbulbOnOutlineIcon" */
            "mdi-react/LightbulbOnOutlineIcon"
        ),
    ),
    "mdi-lightbulb-on": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LightbulbOnIcon" */
            "mdi-react/LightbulbOnIcon"
        ),
    ),
    "mdi-lightbulb-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LightbulbOutlineIcon" */
            "mdi-react/LightbulbOutlineIcon"
        ),
    ),
    "mdi-lightbulb": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LightbulbIcon" */
            "mdi-react/LightbulbIcon"
        ),
    ),
    "mdi-link-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LinkOffIcon" */
            "mdi-react/LinkOffIcon"
        ),
    ),
    "mdi-link-variant-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LinkVariantOffIcon" */
            "mdi-react/LinkVariantOffIcon"
        ),
    ),
    "mdi-link-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LinkVariantIcon" */
            "mdi-react/LinkVariantIcon"
        ),
    ),
    "mdi-link": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LinkIcon" */
            "mdi-react/LinkIcon"
        ),
    ),
    "mdi-linkedin-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LinkedinBoxIcon" */
            "mdi-react/LinkedinBoxIcon"
        ),
    ),
    "mdi-linkedin": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LinkedinIcon" */
            "mdi-react/LinkedinIcon"
        ),
    ),
    "mdi-linux-mint": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LinuxMintIcon" */
            "mdi-react/LinuxMintIcon"
        ),
    ),
    "mdi-linux": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LinuxIcon" */
            "mdi-react/LinuxIcon"
        ),
    ),
    "mdi-loading": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LoadingIcon" */
            "mdi-react/LoadingIcon"
        ),
    ),
    "mdi-lock-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LockAlertIcon" */
            "mdi-react/LockAlertIcon"
        ),
    ),
    "mdi-lock-clock": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LockClockIcon" */
            "mdi-react/LockClockIcon"
        ),
    ),
    "mdi-lock-open-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LockOpenOutlineIcon" */
            "mdi-react/LockOpenOutlineIcon"
        ),
    ),
    "mdi-lock-open": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LockOpenIcon" */
            "mdi-react/LockOpenIcon"
        ),
    ),
    "mdi-lock-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LockOutlineIcon" */
            "mdi-react/LockOutlineIcon"
        ),
    ),
    "mdi-lock-pattern": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LockPatternIcon" */
            "mdi-react/LockPatternIcon"
        ),
    ),
    "mdi-lock-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LockPlusIcon" */
            "mdi-react/LockPlusIcon"
        ),
    ),
    "mdi-lock-question": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LockQuestionIcon" */
            "mdi-react/LockQuestionIcon"
        ),
    ),
    "mdi-lock-reset": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LockResetIcon" */
            "mdi-react/LockResetIcon"
        ),
    ),
    "mdi-lock-smart": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LockSmartIcon" */
            "mdi-react/LockSmartIcon"
        ),
    ),
    "mdi-lock": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LockIcon" */
            "mdi-react/LockIcon"
        ),
    ),
    "mdi-locker-multiple": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LockerMultipleIcon" */
            "mdi-react/LockerMultipleIcon"
        ),
    ),
    "mdi-locker": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LockerIcon" */
            "mdi-react/LockerIcon"
        ),
    ),
    "mdi-login-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LoginVariantIcon" */
            "mdi-react/LoginVariantIcon"
        ),
    ),
    "mdi-login": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LoginIcon" */
            "mdi-react/LoginIcon"
        ),
    ),
    "mdi-logout-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LogoutVariantIcon" */
            "mdi-react/LogoutVariantIcon"
        ),
    ),
    "mdi-logout": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LogoutIcon" */
            "mdi-react/LogoutIcon"
        ),
    ),
    "mdi-looks": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LooksIcon" */
            "mdi-react/LooksIcon"
        ),
    ),
    "mdi-loop": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LoopIcon" */
            "mdi-react/LoopIcon"
        ),
    ),
    "mdi-loupe": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LoupeIcon" */
            "mdi-react/LoupeIcon"
        ),
    ),
    "mdi-lumx": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LumxIcon" */
            "mdi-react/LumxIcon"
        ),
    ),
    "mdi-magnet-on": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MagnetOnIcon" */
            "mdi-react/MagnetOnIcon"
        ),
    ),
    "mdi-magnet": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MagnetIcon" */
            "mdi-react/MagnetIcon"
        ),
    ),
    "mdi-magnify-close": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MagnifyCloseIcon" */
            "mdi-react/MagnifyCloseIcon"
        ),
    ),
    "mdi-magnify-minus-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MagnifyMinusOutlineIcon" */
            "mdi-react/MagnifyMinusOutlineIcon"
        ),
    ),
    "mdi-magnify-minus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MagnifyMinusIcon" */
            "mdi-react/MagnifyMinusIcon"
        ),
    ),
    "mdi-magnify-plus-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MagnifyPlusOutlineIcon" */
            "mdi-react/MagnifyPlusOutlineIcon"
        ),
    ),
    "mdi-magnify-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MagnifyPlusIcon" */
            "mdi-react/MagnifyPlusIcon"
        ),
    ),
    "mdi-magnify": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MagnifyIcon" */
            "mdi-react/MagnifyIcon"
        ),
    ),
    "mdi-mail-ru": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MailRuIcon" */
            "mdi-react/MailRuIcon"
        ),
    ),
    "mdi-mailbox": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MailboxIcon" */
            "mdi-react/MailboxIcon"
        ),
    ),
    "mdi-map-marker-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MapMarkerCircleIcon" */
            "mdi-react/MapMarkerCircleIcon"
        ),
    ),
    "mdi-map-marker-distance": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MapMarkerDistanceIcon" */
            "mdi-react/MapMarkerDistanceIcon"
        ),
    ),
    "mdi-map-marker-minus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MapMarkerMinusIcon" */
            "mdi-react/MapMarkerMinusIcon"
        ),
    ),
    "mdi-map-marker-multiple": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MapMarkerMultipleIcon" */
            "mdi-react/MapMarkerMultipleIcon"
        ),
    ),
    "mdi-map-marker-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MapMarkerOffIcon" */
            "mdi-react/MapMarkerOffIcon"
        ),
    ),
    "mdi-map-marker-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MapMarkerOutlineIcon" */
            "mdi-react/MapMarkerOutlineIcon"
        ),
    ),
    "mdi-map-marker-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MapMarkerPlusIcon" */
            "mdi-react/MapMarkerPlusIcon"
        ),
    ),
    "mdi-map-marker-radius": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MapMarkerRadiusIcon" */
            "mdi-react/MapMarkerRadiusIcon"
        ),
    ),
    "mdi-map-marker": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MapMarkerIcon" */
            "mdi-react/MapMarkerIcon"
        ),
    ),
    "mdi-map-minus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MapMinusIcon" */
            "mdi-react/MapMinusIcon"
        ),
    ),
    "mdi-map-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MapOutlineIcon" */
            "mdi-react/MapOutlineIcon"
        ),
    ),
    "mdi-map-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MapPlusIcon" */
            "mdi-react/MapPlusIcon"
        ),
    ),
    "mdi-map-search-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MapSearchOutlineIcon" */
            "mdi-react/MapSearchOutlineIcon"
        ),
    ),
    "mdi-map-search": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MapSearchIcon" */
            "mdi-react/MapSearchIcon"
        ),
    ),
    "mdi-map": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MapIcon" */
            "mdi-react/MapIcon"
        ),
    ),
    "mdi-margin": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MarginIcon" */
            "mdi-react/MarginIcon"
        ),
    ),
    "mdi-markdown": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MarkdownIcon" */
            "mdi-react/MarkdownIcon"
        ),
    ),
    "mdi-marker-check": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MarkerCheckIcon" */
            "mdi-react/MarkerCheckIcon"
        ),
    ),
    "mdi-marker": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MarkerIcon" */
            "mdi-react/MarkerIcon"
        ),
    ),
    "mdi-material-design": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MaterialDesignIcon" */
            "mdi-react/MaterialDesignIcon"
        ),
    ),
    "mdi-material-ui": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MaterialUiIcon" */
            "mdi-react/MaterialUiIcon"
        ),
    ),
    "mdi-math-compass": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MathCompassIcon" */
            "mdi-react/MathCompassIcon"
        ),
    ),
    "mdi-matrix": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MatrixIcon" */
            "mdi-react/MatrixIcon"
        ),
    ),
    "mdi-maxcdn": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MaxcdnIcon" */
            "mdi-react/MaxcdnIcon"
        ),
    ),
    "mdi-medal": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MedalIcon" */
            "mdi-react/MedalIcon"
        ),
    ),
    "mdi-medical-bag": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MedicalBagIcon" */
            "mdi-react/MedicalBagIcon"
        ),
    ),
    "mdi-medium": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MediumIcon" */
            "mdi-react/MediumIcon"
        ),
    ),
    "mdi-memory": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MemoryIcon" */
            "mdi-react/MemoryIcon"
        ),
    ),
    "mdi-menu-down-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MenuDownOutlineIcon" */
            "mdi-react/MenuDownOutlineIcon"
        ),
    ),
    "mdi-menu-down": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MenuDownIcon" */
            "mdi-react/MenuDownIcon"
        ),
    ),
    "mdi-menu-left": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MenuLeftIcon" */
            "mdi-react/MenuLeftIcon"
        ),
    ),
    "mdi-menu-right": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MenuRightIcon" */
            "mdi-react/MenuRightIcon"
        ),
    ),
    "mdi-menu-up-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MenuUpOutlineIcon" */
            "mdi-react/MenuUpOutlineIcon"
        ),
    ),
    "mdi-menu-up": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MenuUpIcon" */
            "mdi-react/MenuUpIcon"
        ),
    ),
    "mdi-menu": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MenuIcon" */
            "mdi-react/MenuIcon"
        ),
    ),
    "mdi-message-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MessageAlertIcon" */
            "mdi-react/MessageAlertIcon"
        ),
    ),
    "mdi-message-bulleted-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MessageBulletedOffIcon" */
            "mdi-react/MessageBulletedOffIcon"
        ),
    ),
    "mdi-message-bulleted": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MessageBulletedIcon" */
            "mdi-react/MessageBulletedIcon"
        ),
    ),
    "mdi-message-draw": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MessageDrawIcon" */
            "mdi-react/MessageDrawIcon"
        ),
    ),
    "mdi-message-image": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MessageImageIcon" */
            "mdi-react/MessageImageIcon"
        ),
    ),
    "mdi-message-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MessageOutlineIcon" */
            "mdi-react/MessageOutlineIcon"
        ),
    ),
    "mdi-message-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MessagePlusIcon" */
            "mdi-react/MessagePlusIcon"
        ),
    ),
    "mdi-message-processing": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MessageProcessingIcon" */
            "mdi-react/MessageProcessingIcon"
        ),
    ),
    "mdi-message-reply-text": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MessageReplyTextIcon" */
            "mdi-react/MessageReplyTextIcon"
        ),
    ),
    "mdi-message-reply": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MessageReplyIcon" */
            "mdi-react/MessageReplyIcon"
        ),
    ),
    "mdi-message-settings-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MessageSettingsVariantIcon" */
            "mdi-react/MessageSettingsVariantIcon"
        ),
    ),
    "mdi-message-settings": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MessageSettingsIcon" */
            "mdi-react/MessageSettingsIcon"
        ),
    ),
    "mdi-message-text-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MessageTextOutlineIcon" */
            "mdi-react/MessageTextOutlineIcon"
        ),
    ),
    "mdi-message-text": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MessageTextIcon" */
            "mdi-react/MessageTextIcon"
        ),
    ),
    "mdi-message-video": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MessageVideoIcon" */
            "mdi-react/MessageVideoIcon"
        ),
    ),
    "mdi-message": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MessageIcon" */
            "mdi-react/MessageIcon"
        ),
    ),
    "mdi-meteor": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MeteorIcon" */
            "mdi-react/MeteorIcon"
        ),
    ),
    "mdi-metronome-tick": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MetronomeTickIcon" */
            "mdi-react/MetronomeTickIcon"
        ),
    ),
    "mdi-metronome": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MetronomeIcon" */
            "mdi-react/MetronomeIcon"
        ),
    ),
    "mdi-micro-sd": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MicroSdIcon" */
            "mdi-react/MicroSdIcon"
        ),
    ),
    "mdi-microphone-minus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MicrophoneMinusIcon" */
            "mdi-react/MicrophoneMinusIcon"
        ),
    ),
    "mdi-microphone-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MicrophoneOffIcon" */
            "mdi-react/MicrophoneOffIcon"
        ),
    ),
    "mdi-microphone-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MicrophoneOutlineIcon" */
            "mdi-react/MicrophoneOutlineIcon"
        ),
    ),
    "mdi-microphone-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MicrophonePlusIcon" */
            "mdi-react/MicrophonePlusIcon"
        ),
    ),
    "mdi-microphone-settings": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MicrophoneSettingsIcon" */
            "mdi-react/MicrophoneSettingsIcon"
        ),
    ),
    "mdi-microphone-variant-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MicrophoneVariantOffIcon" */
            "mdi-react/MicrophoneVariantOffIcon"
        ),
    ),
    "mdi-microphone-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MicrophoneVariantIcon" */
            "mdi-react/MicrophoneVariantIcon"
        ),
    ),
    "mdi-microphone": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MicrophoneIcon" */
            "mdi-react/MicrophoneIcon"
        ),
    ),
    "mdi-microscope": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MicroscopeIcon" */
            "mdi-react/MicroscopeIcon"
        ),
    ),
    "mdi-microsoft-dynamics": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MicrosoftDynamicsIcon" */
            "mdi-react/MicrosoftDynamicsIcon"
        ),
    ),
    "mdi-microsoft": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MicrosoftIcon" */
            "mdi-react/MicrosoftIcon"
        ),
    ),
    "mdi-midi-port": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MidiPortIcon" */
            "mdi-react/MidiPortIcon"
        ),
    ),
    "mdi-midi": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MidiIcon" */
            "mdi-react/MidiIcon"
        ),
    ),
    "mdi-minecraft": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MinecraftIcon" */
            "mdi-react/MinecraftIcon"
        ),
    ),
    "mdi-minus-box-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MinusBoxOutlineIcon" */
            "mdi-react/MinusBoxOutlineIcon"
        ),
    ),
    "mdi-minus-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MinusBoxIcon" */
            "mdi-react/MinusBoxIcon"
        ),
    ),
    "mdi-minus-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MinusCircleOutlineIcon" */
            "mdi-react/MinusCircleOutlineIcon"
        ),
    ),
    "mdi-minus-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MinusCircleIcon" */
            "mdi-react/MinusCircleIcon"
        ),
    ),
    "mdi-minus-network": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MinusNetworkIcon" */
            "mdi-react/MinusNetworkIcon"
        ),
    ),
    "mdi-minus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MinusIcon" */
            "mdi-react/MinusIcon"
        ),
    ),
    "mdi-mixcloud": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MixcloudIcon" */
            "mdi-react/MixcloudIcon"
        ),
    ),
    "mdi-mixed-reality": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MixedRealityIcon" */
            "mdi-react/MixedRealityIcon"
        ),
    ),
    "mdi-mixer": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MixerIcon" */
            "mdi-react/MixerIcon"
        ),
    ),
    "mdi-monitor-cellphone-star": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MonitorCellphoneStarIcon" */
            "mdi-react/MonitorCellphoneStarIcon"
        ),
    ),
    "mdi-monitor-cellphone": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MonitorCellphoneIcon" */
            "mdi-react/MonitorCellphoneIcon"
        ),
    ),
    "mdi-monitor-multiple": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MonitorMultipleIcon" */
            "mdi-react/MonitorMultipleIcon"
        ),
    ),
    "mdi-monitor": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MonitorIcon" */
            "mdi-react/MonitorIcon"
        ),
    ),
    "mdi-more": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MoreIcon" */
            "mdi-react/MoreIcon"
        ),
    ),
    "mdi-motorbike": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MotorbikeIcon" */
            "mdi-react/MotorbikeIcon"
        ),
    ),
    "mdi-mouse-bluetooth": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MouseBluetoothIcon" */
            "mdi-react/MouseBluetoothIcon"
        ),
    ),
    "mdi-mouse-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MouseOffIcon" */
            "mdi-react/MouseOffIcon"
        ),
    ),
    "mdi-mouse-variant-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MouseVariantOffIcon" */
            "mdi-react/MouseVariantOffIcon"
        ),
    ),
    "mdi-mouse-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MouseVariantIcon" */
            "mdi-react/MouseVariantIcon"
        ),
    ),
    "mdi-mouse": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MouseIcon" */
            "mdi-react/MouseIcon"
        ),
    ),
    "mdi-move-resize-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MoveResizeVariantIcon" */
            "mdi-react/MoveResizeVariantIcon"
        ),
    ),
    "mdi-move-resize": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MoveResizeIcon" */
            "mdi-react/MoveResizeIcon"
        ),
    ),
    "mdi-movie-roll": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MovieRollIcon" */
            "mdi-react/MovieRollIcon"
        ),
    ),
    "mdi-movie": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MovieIcon" */
            "mdi-react/MovieIcon"
        ),
    ),
    "mdi-muffin": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MuffinIcon" */
            "mdi-react/MuffinIcon"
        ),
    ),
    "mdi-multiplication-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MultiplicationBoxIcon" */
            "mdi-react/MultiplicationBoxIcon"
        ),
    ),
    "mdi-multiplication": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MultiplicationIcon" */
            "mdi-react/MultiplicationIcon"
        ),
    ),
    "mdi-mushroom-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MushroomOutlineIcon" */
            "mdi-react/MushroomOutlineIcon"
        ),
    ),
    "mdi-mushroom": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MushroomIcon" */
            "mdi-react/MushroomIcon"
        ),
    ),
    "mdi-music-box-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MusicBoxOutlineIcon" */
            "mdi-react/MusicBoxOutlineIcon"
        ),
    ),
    "mdi-music-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MusicBoxIcon" */
            "mdi-react/MusicBoxIcon"
        ),
    ),
    "mdi-music-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MusicCircleIcon" */
            "mdi-react/MusicCircleIcon"
        ),
    ),
    "mdi-music-note-bluetooth-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MusicNoteBluetoothOffIcon" */
            "mdi-react/MusicNoteBluetoothOffIcon"
        ),
    ),
    "mdi-music-note-bluetooth": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MusicNoteBluetoothIcon" */
            "mdi-react/MusicNoteBluetoothIcon"
        ),
    ),
    "mdi-music-note-eighth": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MusicNoteEighthIcon" */
            "mdi-react/MusicNoteEighthIcon"
        ),
    ),
    "mdi-music-note-half": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MusicNoteHalfIcon" */
            "mdi-react/MusicNoteHalfIcon"
        ),
    ),
    "mdi-music-note-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MusicNoteOffIcon" */
            "mdi-react/MusicNoteOffIcon"
        ),
    ),
    "mdi-music-note-quarter": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MusicNoteQuarterIcon" */
            "mdi-react/MusicNoteQuarterIcon"
        ),
    ),
    "mdi-music-note-sixteenth": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MusicNoteSixteenthIcon" */
            "mdi-react/MusicNoteSixteenthIcon"
        ),
    ),
    "mdi-music-note-whole": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MusicNoteWholeIcon" */
            "mdi-react/MusicNoteWholeIcon"
        ),
    ),
    "mdi-music-note": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MusicNoteIcon" */
            "mdi-react/MusicNoteIcon"
        ),
    ),
    "mdi-music-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MusicOffIcon" */
            "mdi-react/MusicOffIcon"
        ),
    ),
    "mdi-music": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MusicIcon" */
            "mdi-react/MusicIcon"
        ),
    ),
    "mdi-nas": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NasIcon" */
            "mdi-react/NasIcon"
        ),
    ),
    "mdi-nativescript": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NativescriptIcon" */
            "mdi-react/NativescriptIcon"
        ),
    ),
    "mdi-nature-people": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NaturePeopleIcon" */
            "mdi-react/NaturePeopleIcon"
        ),
    ),
    "mdi-nature": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NatureIcon" */
            "mdi-react/NatureIcon"
        ),
    ),
    "mdi-navigation": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NavigationIcon" */
            "mdi-react/NavigationIcon"
        ),
    ),
    "mdi-near-me": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NearMeIcon" */
            "mdi-react/NearMeIcon"
        ),
    ),
    "mdi-needle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NeedleIcon" */
            "mdi-react/NeedleIcon"
        ),
    ),
    "mdi-netflix": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NetflixIcon" */
            "mdi-react/NetflixIcon"
        ),
    ),
    "mdi-network-strength-1-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NetworkStrength1AlertIcon" */
            "mdi-react/NetworkStrength1AlertIcon"
        ),
    ),
    "mdi-network-strength-1": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NetworkStrength1Icon" */
            "mdi-react/NetworkStrength1Icon"
        ),
    ),
    "mdi-network-strength-2-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NetworkStrength2AlertIcon" */
            "mdi-react/NetworkStrength2AlertIcon"
        ),
    ),
    "mdi-network-strength-2": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NetworkStrength2Icon" */
            "mdi-react/NetworkStrength2Icon"
        ),
    ),
    "mdi-network-strength-3-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NetworkStrength3AlertIcon" */
            "mdi-react/NetworkStrength3AlertIcon"
        ),
    ),
    "mdi-network-strength-3": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NetworkStrength3Icon" */
            "mdi-react/NetworkStrength3Icon"
        ),
    ),
    "mdi-network-strength-4-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NetworkStrength4AlertIcon" */
            "mdi-react/NetworkStrength4AlertIcon"
        ),
    ),
    "mdi-network-strength-4": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NetworkStrength4Icon" */
            "mdi-react/NetworkStrength4Icon"
        ),
    ),
    "mdi-network-strength-off-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NetworkStrengthOffOutlineIcon" */
            "mdi-react/NetworkStrengthOffOutlineIcon"
        ),
    ),
    "mdi-network-strength-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NetworkStrengthOffIcon" */
            "mdi-react/NetworkStrengthOffIcon"
        ),
    ),
    "mdi-network-strength-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NetworkStrengthOutlineIcon" */
            "mdi-react/NetworkStrengthOutlineIcon"
        ),
    ),
    "mdi-network": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NetworkIcon" */
            "mdi-react/NetworkIcon"
        ),
    ),
    "mdi-new-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NewBoxIcon" */
            "mdi-react/NewBoxIcon"
        ),
    ),
    "mdi-newspaper": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NewspaperIcon" */
            "mdi-react/NewspaperIcon"
        ),
    ),
    "mdi-nfc-tap": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NfcTapIcon" */
            "mdi-react/NfcTapIcon"
        ),
    ),
    "mdi-nfc-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NfcVariantIcon" */
            "mdi-react/NfcVariantIcon"
        ),
    ),
    "mdi-nfc": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NfcIcon" */
            "mdi-react/NfcIcon"
        ),
    ),
    "mdi-ninja": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NinjaIcon" */
            "mdi-react/NinjaIcon"
        ),
    ),
    "mdi-nintendo-switch": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NintendoSwitchIcon" */
            "mdi-react/NintendoSwitchIcon"
        ),
    ),
    "mdi-nodejs": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NodejsIcon" */
            "mdi-react/NodejsIcon"
        ),
    ),
    "mdi-not-equal-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NotEqualVariantIcon" */
            "mdi-react/NotEqualVariantIcon"
        ),
    ),
    "mdi-not-equal": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NotEqualIcon" */
            "mdi-react/NotEqualIcon"
        ),
    ),
    "mdi-note-multiple-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NoteMultipleOutlineIcon" */
            "mdi-react/NoteMultipleOutlineIcon"
        ),
    ),
    "mdi-note-multiple": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NoteMultipleIcon" */
            "mdi-react/NoteMultipleIcon"
        ),
    ),
    "mdi-note-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NoteOutlineIcon" */
            "mdi-react/NoteOutlineIcon"
        ),
    ),
    "mdi-note-plus-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NotePlusOutlineIcon" */
            "mdi-react/NotePlusOutlineIcon"
        ),
    ),
    "mdi-note-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NotePlusIcon" */
            "mdi-react/NotePlusIcon"
        ),
    ),
    "mdi-note-text": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NoteTextIcon" */
            "mdi-react/NoteTextIcon"
        ),
    ),
    "mdi-note": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NoteIcon" */
            "mdi-react/NoteIcon"
        ),
    ),
    "mdi-notebook": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NotebookIcon" */
            "mdi-react/NotebookIcon"
        ),
    ),
    "mdi-notification-clear-all": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NotificationClearAllIcon" */
            "mdi-react/NotificationClearAllIcon"
        ),
    ),
    "mdi-npm-variant-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NpmVariantOutlineIcon" */
            "mdi-react/NpmVariantOutlineIcon"
        ),
    ),
    "mdi-npm-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NpmVariantIcon" */
            "mdi-react/NpmVariantIcon"
        ),
    ),
    "mdi-npm": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NpmIcon" */
            "mdi-react/NpmIcon"
        ),
    ),
    "mdi-nuke": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NukeIcon" */
            "mdi-react/NukeIcon"
        ),
    ),
    "mdi-null": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NullIcon" */
            "mdi-react/NullIcon"
        ),
    ),
    "mdi-numeric-0-box-multiple-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Numeric0BoxMultipleOutlineIcon" */
            "mdi-react/Numeric0BoxMultipleOutlineIcon"
        ),
    ),
    "mdi-numeric-0-box-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Numeric0BoxOutlineIcon" */
            "mdi-react/Numeric0BoxOutlineIcon"
        ),
    ),
    "mdi-numeric-0-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Numeric0BoxIcon" */
            "mdi-react/Numeric0BoxIcon"
        ),
    ),
    "mdi-numeric-1-box-multiple-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Numeric1BoxMultipleOutlineIcon" */
            "mdi-react/Numeric1BoxMultipleOutlineIcon"
        ),
    ),
    "mdi-numeric-1-box-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Numeric1BoxOutlineIcon" */
            "mdi-react/Numeric1BoxOutlineIcon"
        ),
    ),
    "mdi-numeric-1-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Numeric1BoxIcon" */
            "mdi-react/Numeric1BoxIcon"
        ),
    ),
    "mdi-numeric-2-box-multiple-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Numeric2BoxMultipleOutlineIcon" */
            "mdi-react/Numeric2BoxMultipleOutlineIcon"
        ),
    ),
    "mdi-numeric-2-box-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Numeric2BoxOutlineIcon" */
            "mdi-react/Numeric2BoxOutlineIcon"
        ),
    ),
    "mdi-numeric-2-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Numeric2BoxIcon" */
            "mdi-react/Numeric2BoxIcon"
        ),
    ),
    "mdi-numeric-3-box-multiple-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Numeric3BoxMultipleOutlineIcon" */
            "mdi-react/Numeric3BoxMultipleOutlineIcon"
        ),
    ),
    "mdi-numeric-3-box-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Numeric3BoxOutlineIcon" */
            "mdi-react/Numeric3BoxOutlineIcon"
        ),
    ),
    "mdi-numeric-3-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Numeric3BoxIcon" */
            "mdi-react/Numeric3BoxIcon"
        ),
    ),
    "mdi-numeric-4-box-multiple-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Numeric4BoxMultipleOutlineIcon" */
            "mdi-react/Numeric4BoxMultipleOutlineIcon"
        ),
    ),
    "mdi-numeric-4-box-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Numeric4BoxOutlineIcon" */
            "mdi-react/Numeric4BoxOutlineIcon"
        ),
    ),
    "mdi-numeric-4-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Numeric4BoxIcon" */
            "mdi-react/Numeric4BoxIcon"
        ),
    ),
    "mdi-numeric-5-box-multiple-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Numeric5BoxMultipleOutlineIcon" */
            "mdi-react/Numeric5BoxMultipleOutlineIcon"
        ),
    ),
    "mdi-numeric-5-box-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Numeric5BoxOutlineIcon" */
            "mdi-react/Numeric5BoxOutlineIcon"
        ),
    ),
    "mdi-numeric-5-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Numeric5BoxIcon" */
            "mdi-react/Numeric5BoxIcon"
        ),
    ),
    "mdi-numeric-6-box-multiple-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Numeric6BoxMultipleOutlineIcon" */
            "mdi-react/Numeric6BoxMultipleOutlineIcon"
        ),
    ),
    "mdi-numeric-6-box-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Numeric6BoxOutlineIcon" */
            "mdi-react/Numeric6BoxOutlineIcon"
        ),
    ),
    "mdi-numeric-6-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Numeric6BoxIcon" */
            "mdi-react/Numeric6BoxIcon"
        ),
    ),
    "mdi-numeric-7-box-multiple-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Numeric7BoxMultipleOutlineIcon" */
            "mdi-react/Numeric7BoxMultipleOutlineIcon"
        ),
    ),
    "mdi-numeric-7-box-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Numeric7BoxOutlineIcon" */
            "mdi-react/Numeric7BoxOutlineIcon"
        ),
    ),
    "mdi-numeric-7-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Numeric7BoxIcon" */
            "mdi-react/Numeric7BoxIcon"
        ),
    ),
    "mdi-numeric-8-box-multiple-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Numeric8BoxMultipleOutlineIcon" */
            "mdi-react/Numeric8BoxMultipleOutlineIcon"
        ),
    ),
    "mdi-numeric-8-box-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Numeric8BoxOutlineIcon" */
            "mdi-react/Numeric8BoxOutlineIcon"
        ),
    ),
    "mdi-numeric-8-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Numeric8BoxIcon" */
            "mdi-react/Numeric8BoxIcon"
        ),
    ),
    "mdi-numeric-9-box-multiple-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Numeric9BoxMultipleOutlineIcon" */
            "mdi-react/Numeric9BoxMultipleOutlineIcon"
        ),
    ),
    "mdi-numeric-9-box-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Numeric9BoxOutlineIcon" */
            "mdi-react/Numeric9BoxOutlineIcon"
        ),
    ),
    "mdi-numeric-9-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Numeric9BoxIcon" */
            "mdi-react/Numeric9BoxIcon"
        ),
    ),
    "mdi-numeric-9-plus-box-multiple-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Numeric9PlusBoxMultipleOutlineIcon" */
            "mdi-react/Numeric9PlusBoxMultipleOutlineIcon"
        ),
    ),
    "mdi-numeric-9-plus-box-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Numeric9PlusBoxOutlineIcon" */
            "mdi-react/Numeric9PlusBoxOutlineIcon"
        ),
    ),
    "mdi-numeric-9-plus-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Numeric9PlusBoxIcon" */
            "mdi-react/Numeric9PlusBoxIcon"
        ),
    ),
    "mdi-numeric": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NumericIcon" */
            "mdi-react/NumericIcon"
        ),
    ),
    "mdi-nut": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NutIcon" */
            "mdi-react/NutIcon"
        ),
    ),
    "mdi-nutrition": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NutritionIcon" */
            "mdi-react/NutritionIcon"
        ),
    ),
    "mdi-oar": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/OarIcon" */
            "mdi-react/OarIcon"
        ),
    ),
    "mdi-octagon-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/OctagonOutlineIcon" */
            "mdi-react/OctagonOutlineIcon"
        ),
    ),
    "mdi-octagon": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/OctagonIcon" */
            "mdi-react/OctagonIcon"
        ),
    ),
    "mdi-octagram-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/OctagramOutlineIcon" */
            "mdi-react/OctagramOutlineIcon"
        ),
    ),
    "mdi-octagram": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/OctagramIcon" */
            "mdi-react/OctagramIcon"
        ),
    ),
    "mdi-odnoklassniki": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/OdnoklassnikiIcon" */
            "mdi-react/OdnoklassnikiIcon"
        ),
    ),
    "mdi-office-building": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/OfficeBuildingIcon" */
            "mdi-react/OfficeBuildingIcon"
        ),
    ),
    "mdi-office": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/OfficeIcon" */
            "mdi-react/OfficeIcon"
        ),
    ),
    "mdi-oil-temperature": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/OilTemperatureIcon" */
            "mdi-react/OilTemperatureIcon"
        ),
    ),
    "mdi-oil": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/OilIcon" */
            "mdi-react/OilIcon"
        ),
    ),
    "mdi-omega": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/OmegaIcon" */
            "mdi-react/OmegaIcon"
        ),
    ),
    "mdi-onedrive": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/OnedriveIcon" */
            "mdi-react/OnedriveIcon"
        ),
    ),
    "mdi-onenote": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/OnenoteIcon" */
            "mdi-react/OnenoteIcon"
        ),
    ),
    "mdi-onepassword": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/OnepasswordIcon" */
            "mdi-react/OnepasswordIcon"
        ),
    ),
    "mdi-opacity": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/OpacityIcon" */
            "mdi-react/OpacityIcon"
        ),
    ),
    "mdi-open-in-app": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/OpenInAppIcon" */
            "mdi-react/OpenInAppIcon"
        ),
    ),
    "mdi-open-in-new": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/OpenInNewIcon" */
            "mdi-react/OpenInNewIcon"
        ),
    ),
    "mdi-openid": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/OpenidIcon" */
            "mdi-react/OpenidIcon"
        ),
    ),
    "mdi-opera": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/OperaIcon" */
            "mdi-react/OperaIcon"
        ),
    ),
    "mdi-orbit": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/OrbitIcon" */
            "mdi-react/OrbitIcon"
        ),
    ),
    "mdi-ornament-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/OrnamentVariantIcon" */
            "mdi-react/OrnamentVariantIcon"
        ),
    ),
    "mdi-ornament": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/OrnamentIcon" */
            "mdi-react/OrnamentIcon"
        ),
    ),
    "mdi-owl": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/OwlIcon" */
            "mdi-react/OwlIcon"
        ),
    ),
    "mdi-package-down": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PackageDownIcon" */
            "mdi-react/PackageDownIcon"
        ),
    ),
    "mdi-package-up": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PackageUpIcon" */
            "mdi-react/PackageUpIcon"
        ),
    ),
    "mdi-package-variant-closed": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PackageVariantClosedIcon" */
            "mdi-react/PackageVariantClosedIcon"
        ),
    ),
    "mdi-package-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PackageVariantIcon" */
            "mdi-react/PackageVariantIcon"
        ),
    ),
    "mdi-package": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PackageIcon" */
            "mdi-react/PackageIcon"
        ),
    ),
    "mdi-page-first": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PageFirstIcon" */
            "mdi-react/PageFirstIcon"
        ),
    ),
    "mdi-page-last": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PageLastIcon" */
            "mdi-react/PageLastIcon"
        ),
    ),
    "mdi-page-layout-body": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PageLayoutBodyIcon" */
            "mdi-react/PageLayoutBodyIcon"
        ),
    ),
    "mdi-page-layout-footer": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PageLayoutFooterIcon" */
            "mdi-react/PageLayoutFooterIcon"
        ),
    ),
    "mdi-page-layout-header": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PageLayoutHeaderIcon" */
            "mdi-react/PageLayoutHeaderIcon"
        ),
    ),
    "mdi-page-layout-sidebar-left": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PageLayoutSidebarLeftIcon" */
            "mdi-react/PageLayoutSidebarLeftIcon"
        ),
    ),
    "mdi-page-layout-sidebar-right": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PageLayoutSidebarRightIcon" */
            "mdi-react/PageLayoutSidebarRightIcon"
        ),
    ),
    "mdi-palette-advanced": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PaletteAdvancedIcon" */
            "mdi-react/PaletteAdvancedIcon"
        ),
    ),
    "mdi-palette-swatch": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PaletteSwatchIcon" */
            "mdi-react/PaletteSwatchIcon"
        ),
    ),
    "mdi-palette": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PaletteIcon" */
            "mdi-react/PaletteIcon"
        ),
    ),
    "mdi-panda": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PandaIcon" */
            "mdi-react/PandaIcon"
        ),
    ),
    "mdi-pandora": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PandoraIcon" */
            "mdi-react/PandoraIcon"
        ),
    ),
    "mdi-panorama-fisheye": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PanoramaFisheyeIcon" */
            "mdi-react/PanoramaFisheyeIcon"
        ),
    ),
    "mdi-panorama-horizontal": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PanoramaHorizontalIcon" */
            "mdi-react/PanoramaHorizontalIcon"
        ),
    ),
    "mdi-panorama-vertical": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PanoramaVerticalIcon" */
            "mdi-react/PanoramaVerticalIcon"
        ),
    ),
    "mdi-panorama-wide-angle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PanoramaWideAngleIcon" */
            "mdi-react/PanoramaWideAngleIcon"
        ),
    ),
    "mdi-panorama": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PanoramaIcon" */
            "mdi-react/PanoramaIcon"
        ),
    ),
    "mdi-paper-cut-vertical": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PaperCutVerticalIcon" */
            "mdi-react/PaperCutVerticalIcon"
        ),
    ),
    "mdi-paperclip": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PaperclipIcon" */
            "mdi-react/PaperclipIcon"
        ),
    ),
    "mdi-parking": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ParkingIcon" */
            "mdi-react/ParkingIcon"
        ),
    ),
    "mdi-passport": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PassportIcon" */
            "mdi-react/PassportIcon"
        ),
    ),
    "mdi-patreon": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PatreonIcon" */
            "mdi-react/PatreonIcon"
        ),
    ),
    "mdi-pause-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PauseCircleOutlineIcon" */
            "mdi-react/PauseCircleOutlineIcon"
        ),
    ),
    "mdi-pause-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PauseCircleIcon" */
            "mdi-react/PauseCircleIcon"
        ),
    ),
    "mdi-pause-octagon-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PauseOctagonOutlineIcon" */
            "mdi-react/PauseOctagonOutlineIcon"
        ),
    ),
    "mdi-pause-octagon": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PauseOctagonIcon" */
            "mdi-react/PauseOctagonIcon"
        ),
    ),
    "mdi-pause": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PauseIcon" */
            "mdi-react/PauseIcon"
        ),
    ),
    "mdi-paw-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PawOffIcon" */
            "mdi-react/PawOffIcon"
        ),
    ),
    "mdi-paw": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PawIcon" */
            "mdi-react/PawIcon"
        ),
    ),
    "mdi-paypal": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PaypalIcon" */
            "mdi-react/PaypalIcon"
        ),
    ),
    "mdi-peace": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PeaceIcon" */
            "mdi-react/PeaceIcon"
        ),
    ),
    "mdi-pen": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PenIcon" */
            "mdi-react/PenIcon"
        ),
    ),
    "mdi-pencil-box-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PencilBoxOutlineIcon" */
            "mdi-react/PencilBoxOutlineIcon"
        ),
    ),
    "mdi-pencil-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PencilBoxIcon" */
            "mdi-react/PencilBoxIcon"
        ),
    ),
    "mdi-pencil-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PencilCircleOutlineIcon" */
            "mdi-react/PencilCircleOutlineIcon"
        ),
    ),
    "mdi-pencil-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PencilCircleIcon" */
            "mdi-react/PencilCircleIcon"
        ),
    ),
    "mdi-pencil-lock": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PencilLockIcon" */
            "mdi-react/PencilLockIcon"
        ),
    ),
    "mdi-pencil-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PencilOffIcon" */
            "mdi-react/PencilOffIcon"
        ),
    ),
    "mdi-pencil": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PencilIcon" */
            "mdi-react/PencilIcon"
        ),
    ),
    "mdi-pentagon-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PentagonOutlineIcon" */
            "mdi-react/PentagonOutlineIcon"
        ),
    ),
    "mdi-pentagon": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PentagonIcon" */
            "mdi-react/PentagonIcon"
        ),
    ),
    "mdi-percent": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PercentIcon" */
            "mdi-react/PercentIcon"
        ),
    ),
    "mdi-periodic-table-co-2": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PeriodicTableCo2Icon" */
            "mdi-react/PeriodicTableCo2Icon"
        ),
    ),
    "mdi-periodic-table": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PeriodicTableIcon" */
            "mdi-react/PeriodicTableIcon"
        ),
    ),
    "mdi-periscope": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PeriscopeIcon" */
            "mdi-react/PeriscopeIcon"
        ),
    ),
    "mdi-pharmacy": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PharmacyIcon" */
            "mdi-react/PharmacyIcon"
        ),
    ),
    "mdi-phone-bluetooth": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PhoneBluetoothIcon" */
            "mdi-react/PhoneBluetoothIcon"
        ),
    ),
    "mdi-phone-classic": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PhoneClassicIcon" */
            "mdi-react/PhoneClassicIcon"
        ),
    ),
    "mdi-phone-forward": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PhoneForwardIcon" */
            "mdi-react/PhoneForwardIcon"
        ),
    ),
    "mdi-phone-hangup": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PhoneHangupIcon" */
            "mdi-react/PhoneHangupIcon"
        ),
    ),
    "mdi-phone-in-talk": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PhoneInTalkIcon" */
            "mdi-react/PhoneInTalkIcon"
        ),
    ),
    "mdi-phone-incoming": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PhoneIncomingIcon" */
            "mdi-react/PhoneIncomingIcon"
        ),
    ),
    "mdi-phone-locked": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PhoneLockedIcon" */
            "mdi-react/PhoneLockedIcon"
        ),
    ),
    "mdi-phone-log": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PhoneLogIcon" */
            "mdi-react/PhoneLogIcon"
        ),
    ),
    "mdi-phone-minus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PhoneMinusIcon" */
            "mdi-react/PhoneMinusIcon"
        ),
    ),
    "mdi-phone-missed": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PhoneMissedIcon" */
            "mdi-react/PhoneMissedIcon"
        ),
    ),
    "mdi-phone-outgoing": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PhoneOutgoingIcon" */
            "mdi-react/PhoneOutgoingIcon"
        ),
    ),
    "mdi-phone-paused": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PhonePausedIcon" */
            "mdi-react/PhonePausedIcon"
        ),
    ),
    "mdi-phone-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PhonePlusIcon" */
            "mdi-react/PhonePlusIcon"
        ),
    ),
    "mdi-phone-return": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PhoneReturnIcon" */
            "mdi-react/PhoneReturnIcon"
        ),
    ),
    "mdi-phone-rotate-landscape": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PhoneRotateLandscapeIcon" */
            "mdi-react/PhoneRotateLandscapeIcon"
        ),
    ),
    "mdi-phone-rotate-portrait": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PhoneRotatePortraitIcon" */
            "mdi-react/PhoneRotatePortraitIcon"
        ),
    ),
    "mdi-phone-settings": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PhoneSettingsIcon" */
            "mdi-react/PhoneSettingsIcon"
        ),
    ),
    "mdi-phone-voip": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PhoneVoipIcon" */
            "mdi-react/PhoneVoipIcon"
        ),
    ),
    "mdi-phone": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PhoneIcon" */
            "mdi-react/PhoneIcon"
        ),
    ),
    "mdi-pi-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PiBoxIcon" */
            "mdi-react/PiBoxIcon"
        ),
    ),
    "mdi-pi": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PiIcon" */
            "mdi-react/PiIcon"
        ),
    ),
    "mdi-piano": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PianoIcon" */
            "mdi-react/PianoIcon"
        ),
    ),
    "mdi-pickaxe": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PickaxeIcon" */
            "mdi-react/PickaxeIcon"
        ),
    ),
    "mdi-pier-crane": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PierCraneIcon" */
            "mdi-react/PierCraneIcon"
        ),
    ),
    "mdi-pier": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PierIcon" */
            "mdi-react/PierIcon"
        ),
    ),
    "mdi-pig": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PigIcon" */
            "mdi-react/PigIcon"
        ),
    ),
    "mdi-pill": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PillIcon" */
            "mdi-react/PillIcon"
        ),
    ),
    "mdi-pillar": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PillarIcon" */
            "mdi-react/PillarIcon"
        ),
    ),
    "mdi-pin-off-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PinOffOutlineIcon" */
            "mdi-react/PinOffOutlineIcon"
        ),
    ),
    "mdi-pin-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PinOffIcon" */
            "mdi-react/PinOffIcon"
        ),
    ),
    "mdi-pin-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PinOutlineIcon" */
            "mdi-react/PinOutlineIcon"
        ),
    ),
    "mdi-pin": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PinIcon" */
            "mdi-react/PinIcon"
        ),
    ),
    "mdi-pine-tree-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PineTreeBoxIcon" */
            "mdi-react/PineTreeBoxIcon"
        ),
    ),
    "mdi-pine-tree": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PineTreeIcon" */
            "mdi-react/PineTreeIcon"
        ),
    ),
    "mdi-pinterest-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PinterestBoxIcon" */
            "mdi-react/PinterestBoxIcon"
        ),
    ),
    "mdi-pinterest": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PinterestIcon" */
            "mdi-react/PinterestIcon"
        ),
    ),
    "mdi-pipe-disconnected": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PipeDisconnectedIcon" */
            "mdi-react/PipeDisconnectedIcon"
        ),
    ),
    "mdi-pipe-leak": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PipeLeakIcon" */
            "mdi-react/PipeLeakIcon"
        ),
    ),
    "mdi-pipe": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PipeIcon" */
            "mdi-react/PipeIcon"
        ),
    ),
    "mdi-pistol": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PistolIcon" */
            "mdi-react/PistolIcon"
        ),
    ),
    "mdi-piston": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PistonIcon" */
            "mdi-react/PistonIcon"
        ),
    ),
    "mdi-pizza": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PizzaIcon" */
            "mdi-react/PizzaIcon"
        ),
    ),
    "mdi-plane-shield": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PlaneShieldIcon" */
            "mdi-react/PlaneShieldIcon"
        ),
    ),
    "mdi-play-box-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PlayBoxOutlineIcon" */
            "mdi-react/PlayBoxOutlineIcon"
        ),
    ),
    "mdi-play-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PlayCircleOutlineIcon" */
            "mdi-react/PlayCircleOutlineIcon"
        ),
    ),
    "mdi-play-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PlayCircleIcon" */
            "mdi-react/PlayCircleIcon"
        ),
    ),
    "mdi-play-network": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PlayNetworkIcon" */
            "mdi-react/PlayNetworkIcon"
        ),
    ),
    "mdi-play-pause": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PlayPauseIcon" */
            "mdi-react/PlayPauseIcon"
        ),
    ),
    "mdi-play-protected-content": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PlayProtectedContentIcon" */
            "mdi-react/PlayProtectedContentIcon"
        ),
    ),
    "mdi-play-speed": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PlaySpeedIcon" */
            "mdi-react/PlaySpeedIcon"
        ),
    ),
    "mdi-play": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PlayIcon" */
            "mdi-react/PlayIcon"
        ),
    ),
    "mdi-playlist-check": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PlaylistCheckIcon" */
            "mdi-react/PlaylistCheckIcon"
        ),
    ),
    "mdi-playlist-edit": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PlaylistEditIcon" */
            "mdi-react/PlaylistEditIcon"
        ),
    ),
    "mdi-playlist-minus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PlaylistMinusIcon" */
            "mdi-react/PlaylistMinusIcon"
        ),
    ),
    "mdi-playlist-play": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PlaylistPlayIcon" */
            "mdi-react/PlaylistPlayIcon"
        ),
    ),
    "mdi-playlist-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PlaylistPlusIcon" */
            "mdi-react/PlaylistPlusIcon"
        ),
    ),
    "mdi-playlist-remove": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PlaylistRemoveIcon" */
            "mdi-react/PlaylistRemoveIcon"
        ),
    ),
    "mdi-playstation": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PlaystationIcon" */
            "mdi-react/PlaystationIcon"
        ),
    ),
    "mdi-plex": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PlexIcon" */
            "mdi-react/PlexIcon"
        ),
    ),
    "mdi-plus-box-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PlusBoxOutlineIcon" */
            "mdi-react/PlusBoxOutlineIcon"
        ),
    ),
    "mdi-plus-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PlusBoxIcon" */
            "mdi-react/PlusBoxIcon"
        ),
    ),
    "mdi-plus-circle-multiple-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PlusCircleMultipleOutlineIcon" */
            "mdi-react/PlusCircleMultipleOutlineIcon"
        ),
    ),
    "mdi-plus-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PlusCircleOutlineIcon" */
            "mdi-react/PlusCircleOutlineIcon"
        ),
    ),
    "mdi-plus-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PlusCircleIcon" */
            "mdi-react/PlusCircleIcon"
        ),
    ),
    "mdi-plus-minus-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PlusMinusBoxIcon" */
            "mdi-react/PlusMinusBoxIcon"
        ),
    ),
    "mdi-plus-minus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PlusMinusIcon" */
            "mdi-react/PlusMinusIcon"
        ),
    ),
    "mdi-plus-network": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PlusNetworkIcon" */
            "mdi-react/PlusNetworkIcon"
        ),
    ),
    "mdi-plus-one": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PlusOneIcon" */
            "mdi-react/PlusOneIcon"
        ),
    ),
    "mdi-plus-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PlusOutlineIcon" */
            "mdi-react/PlusOutlineIcon"
        ),
    ),
    "mdi-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PlusIcon" */
            "mdi-react/PlusIcon"
        ),
    ),
    "mdi-pocket": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PocketIcon" */
            "mdi-react/PocketIcon"
        ),
    ),
    "mdi-podcast": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PodcastIcon" */
            "mdi-react/PodcastIcon"
        ),
    ),
    "mdi-pokeball": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PokeballIcon" */
            "mdi-react/PokeballIcon"
        ),
    ),
    "mdi-poker-chip": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PokerChipIcon" */
            "mdi-react/PokerChipIcon"
        ),
    ),
    "mdi-polaroid": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PolaroidIcon" */
            "mdi-react/PolaroidIcon"
        ),
    ),
    "mdi-poll-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PollBoxIcon" */
            "mdi-react/PollBoxIcon"
        ),
    ),
    "mdi-poll": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PollIcon" */
            "mdi-react/PollIcon"
        ),
    ),
    "mdi-polymer": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PolymerIcon" */
            "mdi-react/PolymerIcon"
        ),
    ),
    "mdi-pool": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PoolIcon" */
            "mdi-react/PoolIcon"
        ),
    ),
    "mdi-popcorn": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PopcornIcon" */
            "mdi-react/PopcornIcon"
        ),
    ),
    "mdi-pot-mix": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PotMixIcon" */
            "mdi-react/PotMixIcon"
        ),
    ),
    "mdi-pot": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PotIcon" */
            "mdi-react/PotIcon"
        ),
    ),
    "mdi-pound-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PoundBoxIcon" */
            "mdi-react/PoundBoxIcon"
        ),
    ),
    "mdi-pound": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PoundIcon" */
            "mdi-react/PoundIcon"
        ),
    ),
    "mdi-power-cycle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PowerCycleIcon" */
            "mdi-react/PowerCycleIcon"
        ),
    ),
    "mdi-power-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PowerOffIcon" */
            "mdi-react/PowerOffIcon"
        ),
    ),
    "mdi-power-on": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PowerOnIcon" */
            "mdi-react/PowerOnIcon"
        ),
    ),
    "mdi-power-plug-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PowerPlugOffIcon" */
            "mdi-react/PowerPlugOffIcon"
        ),
    ),
    "mdi-power-plug": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PowerPlugIcon" */
            "mdi-react/PowerPlugIcon"
        ),
    ),
    "mdi-power-settings": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PowerSettingsIcon" */
            "mdi-react/PowerSettingsIcon"
        ),
    ),
    "mdi-power-sleep": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PowerSleepIcon" */
            "mdi-react/PowerSleepIcon"
        ),
    ),
    "mdi-power-socket-au": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PowerSocketAuIcon" */
            "mdi-react/PowerSocketAuIcon"
        ),
    ),
    "mdi-power-socket-eu": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PowerSocketEuIcon" */
            "mdi-react/PowerSocketEuIcon"
        ),
    ),
    "mdi-power-socket-uk": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PowerSocketUkIcon" */
            "mdi-react/PowerSocketUkIcon"
        ),
    ),
    "mdi-power-socket-us": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PowerSocketUsIcon" */
            "mdi-react/PowerSocketUsIcon"
        ),
    ),
    "mdi-power-socket": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PowerSocketIcon" */
            "mdi-react/PowerSocketIcon"
        ),
    ),
    "mdi-power-standby": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PowerStandbyIcon" */
            "mdi-react/PowerStandbyIcon"
        ),
    ),
    "mdi-power": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PowerIcon" */
            "mdi-react/PowerIcon"
        ),
    ),
    "mdi-prescription": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PrescriptionIcon" */
            "mdi-react/PrescriptionIcon"
        ),
    ),
    "mdi-presentation-play": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PresentationPlayIcon" */
            "mdi-react/PresentationPlayIcon"
        ),
    ),
    "mdi-presentation": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PresentationIcon" */
            "mdi-react/PresentationIcon"
        ),
    ),
    "mdi-printer-3-d": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Printer3dIcon" */
            "mdi-react/Printer3dIcon"
        ),
    ),
    "mdi-printer-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PrinterAlertIcon" */
            "mdi-react/PrinterAlertIcon"
        ),
    ),
    "mdi-printer-settings": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PrinterSettingsIcon" */
            "mdi-react/PrinterSettingsIcon"
        ),
    ),
    "mdi-printer": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PrinterIcon" */
            "mdi-react/PrinterIcon"
        ),
    ),
    "mdi-priority-high": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PriorityHighIcon" */
            "mdi-react/PriorityHighIcon"
        ),
    ),
    "mdi-priority-low": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PriorityLowIcon" */
            "mdi-react/PriorityLowIcon"
        ),
    ),
    "mdi-professional-hexagon": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ProfessionalHexagonIcon" */
            "mdi-react/ProfessionalHexagonIcon"
        ),
    ),
    "mdi-progress-check": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ProgressCheckIcon" */
            "mdi-react/ProgressCheckIcon"
        ),
    ),
    "mdi-progress-clock": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ProgressClockIcon" */
            "mdi-react/ProgressClockIcon"
        ),
    ),
    "mdi-progress-download": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ProgressDownloadIcon" */
            "mdi-react/ProgressDownloadIcon"
        ),
    ),
    "mdi-progress-upload": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ProgressUploadIcon" */
            "mdi-react/ProgressUploadIcon"
        ),
    ),
    "mdi-projector-screen": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ProjectorScreenIcon" */
            "mdi-react/ProjectorScreenIcon"
        ),
    ),
    "mdi-projector": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ProjectorIcon" */
            "mdi-react/ProjectorIcon"
        ),
    ),
    "mdi-publish": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PublishIcon" */
            "mdi-react/PublishIcon"
        ),
    ),
    "mdi-pulse": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PulseIcon" */
            "mdi-react/PulseIcon"
        ),
    ),
    "mdi-puzzle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PuzzleIcon" */
            "mdi-react/PuzzleIcon"
        ),
    ),
    "mdi-qi": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/QiIcon" */
            "mdi-react/QiIcon"
        ),
    ),
    "mdi-qqchat": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/QqchatIcon" */
            "mdi-react/QqchatIcon"
        ),
    ),
    "mdi-qrcode-edit": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/QrcodeEditIcon" */
            "mdi-react/QrcodeEditIcon"
        ),
    ),
    "mdi-qrcode-scan": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/QrcodeScanIcon" */
            "mdi-react/QrcodeScanIcon"
        ),
    ),
    "mdi-qrcode": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/QrcodeIcon" */
            "mdi-react/QrcodeIcon"
        ),
    ),
    "mdi-quadcopter": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/QuadcopterIcon" */
            "mdi-react/QuadcopterIcon"
        ),
    ),
    "mdi-quality-high": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/QualityHighIcon" */
            "mdi-react/QualityHighIcon"
        ),
    ),
    "mdi-quicktime": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/QuicktimeIcon" */
            "mdi-react/QuicktimeIcon"
        ),
    ),
    "mdi-rabbit": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RabbitIcon" */
            "mdi-react/RabbitIcon"
        ),
    ),
    "mdi-radar": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RadarIcon" */
            "mdi-react/RadarIcon"
        ),
    ),
    "mdi-radiator": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RadiatorIcon" */
            "mdi-react/RadiatorIcon"
        ),
    ),
    "mdi-radio-handheld": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RadioHandheldIcon" */
            "mdi-react/RadioHandheldIcon"
        ),
    ),
    "mdi-radio-tower": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RadioTowerIcon" */
            "mdi-react/RadioTowerIcon"
        ),
    ),
    "mdi-radio": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RadioIcon" */
            "mdi-react/RadioIcon"
        ),
    ),
    "mdi-radioactive": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RadioactiveIcon" */
            "mdi-react/RadioactiveIcon"
        ),
    ),
    "mdi-radiobox-blank": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RadioboxBlankIcon" */
            "mdi-react/RadioboxBlankIcon"
        ),
    ),
    "mdi-radiobox-marked": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RadioboxMarkedIcon" */
            "mdi-react/RadioboxMarkedIcon"
        ),
    ),
    "mdi-raspberrypi": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RaspberrypiIcon" */
            "mdi-react/RaspberrypiIcon"
        ),
    ),
    "mdi-ray-end-arrow": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RayEndArrowIcon" */
            "mdi-react/RayEndArrowIcon"
        ),
    ),
    "mdi-ray-end": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RayEndIcon" */
            "mdi-react/RayEndIcon"
        ),
    ),
    "mdi-ray-start-arrow": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RayStartArrowIcon" */
            "mdi-react/RayStartArrowIcon"
        ),
    ),
    "mdi-ray-start-end": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RayStartEndIcon" */
            "mdi-react/RayStartEndIcon"
        ),
    ),
    "mdi-ray-start": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RayStartIcon" */
            "mdi-react/RayStartIcon"
        ),
    ),
    "mdi-ray-vertex": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RayVertexIcon" */
            "mdi-react/RayVertexIcon"
        ),
    ),
    "mdi-react": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ReactIcon" */
            "mdi-react/ReactIcon"
        ),
    ),
    "mdi-read": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ReadIcon" */
            "mdi-react/ReadIcon"
        ),
    ),
    "mdi-receipt": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ReceiptIcon" */
            "mdi-react/ReceiptIcon"
        ),
    ),
    "mdi-record-player": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RecordPlayerIcon" */
            "mdi-react/RecordPlayerIcon"
        ),
    ),
    "mdi-record-rec": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RecordRecIcon" */
            "mdi-react/RecordRecIcon"
        ),
    ),
    "mdi-record": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RecordIcon" */
            "mdi-react/RecordIcon"
        ),
    ),
    "mdi-recycle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RecycleIcon" */
            "mdi-react/RecycleIcon"
        ),
    ),
    "mdi-reddit": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RedditIcon" */
            "mdi-react/RedditIcon"
        ),
    ),
    "mdi-redo-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RedoVariantIcon" */
            "mdi-react/RedoVariantIcon"
        ),
    ),
    "mdi-redo": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RedoIcon" */
            "mdi-react/RedoIcon"
        ),
    ),
    "mdi-refresh": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RefreshIcon" */
            "mdi-react/RefreshIcon"
        ),
    ),
    "mdi-regex": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RegexIcon" */
            "mdi-react/RegexIcon"
        ),
    ),
    "mdi-relative-scale": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RelativeScaleIcon" */
            "mdi-react/RelativeScaleIcon"
        ),
    ),
    "mdi-reload": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ReloadIcon" */
            "mdi-react/ReloadIcon"
        ),
    ),
    "mdi-reminder": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ReminderIcon" */
            "mdi-react/ReminderIcon"
        ),
    ),
    "mdi-remote-desktop": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RemoteDesktopIcon" */
            "mdi-react/RemoteDesktopIcon"
        ),
    ),
    "mdi-remote": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RemoteIcon" */
            "mdi-react/RemoteIcon"
        ),
    ),
    "mdi-rename-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RenameBoxIcon" */
            "mdi-react/RenameBoxIcon"
        ),
    ),
    "mdi-reorder-horizontal": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ReorderHorizontalIcon" */
            "mdi-react/ReorderHorizontalIcon"
        ),
    ),
    "mdi-reorder-vertical": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ReorderVerticalIcon" */
            "mdi-react/ReorderVerticalIcon"
        ),
    ),
    "mdi-repeat-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RepeatOffIcon" */
            "mdi-react/RepeatOffIcon"
        ),
    ),
    "mdi-repeat-once": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RepeatOnceIcon" */
            "mdi-react/RepeatOnceIcon"
        ),
    ),
    "mdi-repeat": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RepeatIcon" */
            "mdi-react/RepeatIcon"
        ),
    ),
    "mdi-replay": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ReplayIcon" */
            "mdi-react/ReplayIcon"
        ),
    ),
    "mdi-reply-all": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ReplyAllIcon" */
            "mdi-react/ReplyAllIcon"
        ),
    ),
    "mdi-reply": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ReplyIcon" */
            "mdi-react/ReplyIcon"
        ),
    ),
    "mdi-reproduction": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ReproductionIcon" */
            "mdi-react/ReproductionIcon"
        ),
    ),
    "mdi-resize-bottom-right": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ResizeBottomRightIcon" */
            "mdi-react/ResizeBottomRightIcon"
        ),
    ),
    "mdi-responsive": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ResponsiveIcon" */
            "mdi-react/ResponsiveIcon"
        ),
    ),
    "mdi-restart": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RestartIcon" */
            "mdi-react/RestartIcon"
        ),
    ),
    "mdi-restore-clock": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RestoreClockIcon" */
            "mdi-react/RestoreClockIcon"
        ),
    ),
    "mdi-restore": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RestoreIcon" */
            "mdi-react/RestoreIcon"
        ),
    ),
    "mdi-rewind-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RewindOutlineIcon" */
            "mdi-react/RewindOutlineIcon"
        ),
    ),
    "mdi-rewind": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RewindIcon" */
            "mdi-react/RewindIcon"
        ),
    ),
    "mdi-rhombus-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RhombusOutlineIcon" */
            "mdi-react/RhombusOutlineIcon"
        ),
    ),
    "mdi-rhombus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RhombusIcon" */
            "mdi-react/RhombusIcon"
        ),
    ),
    "mdi-ribbon": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RibbonIcon" */
            "mdi-react/RibbonIcon"
        ),
    ),
    "mdi-rice": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RiceIcon" */
            "mdi-react/RiceIcon"
        ),
    ),
    "mdi-ring": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RingIcon" */
            "mdi-react/RingIcon"
        ),
    ),
    "mdi-road-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RoadVariantIcon" */
            "mdi-react/RoadVariantIcon"
        ),
    ),
    "mdi-road": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RoadIcon" */
            "mdi-react/RoadIcon"
        ),
    ),
    "mdi-robot-vacuum-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RobotVacuumVariantIcon" */
            "mdi-react/RobotVacuumVariantIcon"
        ),
    ),
    "mdi-robot-vacuum": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RobotVacuumIcon" */
            "mdi-react/RobotVacuumIcon"
        ),
    ),
    "mdi-robot": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RobotIcon" */
            "mdi-react/RobotIcon"
        ),
    ),
    "mdi-rocket": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RocketIcon" */
            "mdi-react/RocketIcon"
        ),
    ),
    "mdi-room-service": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RoomServiceIcon" */
            "mdi-react/RoomServiceIcon"
        ),
    ),
    "mdi-rotate-3-d": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Rotate3dIcon" */
            "mdi-react/Rotate3dIcon"
        ),
    ),
    "mdi-rotate-left-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RotateLeftVariantIcon" */
            "mdi-react/RotateLeftVariantIcon"
        ),
    ),
    "mdi-rotate-left": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RotateLeftIcon" */
            "mdi-react/RotateLeftIcon"
        ),
    ),
    "mdi-rotate-right-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RotateRightVariantIcon" */
            "mdi-react/RotateRightVariantIcon"
        ),
    ),
    "mdi-rotate-right": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RotateRightIcon" */
            "mdi-react/RotateRightIcon"
        ),
    ),
    "mdi-rounded-corner": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RoundedCornerIcon" */
            "mdi-react/RoundedCornerIcon"
        ),
    ),
    "mdi-router-wireless": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RouterWirelessIcon" */
            "mdi-react/RouterWirelessIcon"
        ),
    ),
    "mdi-routes": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RoutesIcon" */
            "mdi-react/RoutesIcon"
        ),
    ),
    "mdi-rowing": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RowingIcon" */
            "mdi-react/RowingIcon"
        ),
    ),
    "mdi-rss-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RssBoxIcon" */
            "mdi-react/RssBoxIcon"
        ),
    ),
    "mdi-rss": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RssIcon" */
            "mdi-react/RssIcon"
        ),
    ),
    "mdi-ruler": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RulerIcon" */
            "mdi-react/RulerIcon"
        ),
    ),
    "mdi-run-fast": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RunFastIcon" */
            "mdi-react/RunFastIcon"
        ),
    ),
    "mdi-run": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RunIcon" */
            "mdi-react/RunIcon"
        ),
    ),
    "mdi-sale": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SaleIcon" */
            "mdi-react/SaleIcon"
        ),
    ),
    "mdi-salesforce": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SalesforceIcon" */
            "mdi-react/SalesforceIcon"
        ),
    ),
    "mdi-sass": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SassIcon" */
            "mdi-react/SassIcon"
        ),
    ),
    "mdi-satellite-uplink": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SatelliteUplinkIcon" */
            "mdi-react/SatelliteUplinkIcon"
        ),
    ),
    "mdi-satellite-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SatelliteVariantIcon" */
            "mdi-react/SatelliteVariantIcon"
        ),
    ),
    "mdi-satellite": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SatelliteIcon" */
            "mdi-react/SatelliteIcon"
        ),
    ),
    "mdi-sausage": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SausageIcon" */
            "mdi-react/SausageIcon"
        ),
    ),
    "mdi-saxophone": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SaxophoneIcon" */
            "mdi-react/SaxophoneIcon"
        ),
    ),
    "mdi-scale-balance": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ScaleBalanceIcon" */
            "mdi-react/ScaleBalanceIcon"
        ),
    ),
    "mdi-scale-bathroom": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ScaleBathroomIcon" */
            "mdi-react/ScaleBathroomIcon"
        ),
    ),
    "mdi-scale": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ScaleIcon" */
            "mdi-react/ScaleIcon"
        ),
    ),
    "mdi-scanner-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ScannerOffIcon" */
            "mdi-react/ScannerOffIcon"
        ),
    ),
    "mdi-scanner": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ScannerIcon" */
            "mdi-react/ScannerIcon"
        ),
    ),
    "mdi-school": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SchoolIcon" */
            "mdi-react/SchoolIcon"
        ),
    ),
    "mdi-screen-rotation-lock": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ScreenRotationLockIcon" */
            "mdi-react/ScreenRotationLockIcon"
        ),
    ),
    "mdi-screen-rotation": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ScreenRotationIcon" */
            "mdi-react/ScreenRotationIcon"
        ),
    ),
    "mdi-screwdriver": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ScrewdriverIcon" */
            "mdi-react/ScrewdriverIcon"
        ),
    ),
    "mdi-script": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ScriptIcon" */
            "mdi-react/ScriptIcon"
        ),
    ),
    "mdi-sd": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SdIcon" */
            "mdi-react/SdIcon"
        ),
    ),
    "mdi-seal": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SealIcon" */
            "mdi-react/SealIcon"
        ),
    ),
    "mdi-search-web": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SearchWebIcon" */
            "mdi-react/SearchWebIcon"
        ),
    ),
    "mdi-seat-flat-angled": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SeatFlatAngledIcon" */
            "mdi-react/SeatFlatAngledIcon"
        ),
    ),
    "mdi-seat-flat": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SeatFlatIcon" */
            "mdi-react/SeatFlatIcon"
        ),
    ),
    "mdi-seat-individual-suite": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SeatIndividualSuiteIcon" */
            "mdi-react/SeatIndividualSuiteIcon"
        ),
    ),
    "mdi-seat-legroom-extra": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SeatLegroomExtraIcon" */
            "mdi-react/SeatLegroomExtraIcon"
        ),
    ),
    "mdi-seat-legroom-normal": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SeatLegroomNormalIcon" */
            "mdi-react/SeatLegroomNormalIcon"
        ),
    ),
    "mdi-seat-legroom-reduced": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SeatLegroomReducedIcon" */
            "mdi-react/SeatLegroomReducedIcon"
        ),
    ),
    "mdi-seat-recline-extra": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SeatReclineExtraIcon" */
            "mdi-react/SeatReclineExtraIcon"
        ),
    ),
    "mdi-seat-recline-normal": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SeatReclineNormalIcon" */
            "mdi-react/SeatReclineNormalIcon"
        ),
    ),
    "mdi-security-account": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SecurityAccountIcon" */
            "mdi-react/SecurityAccountIcon"
        ),
    ),
    "mdi-security-close": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SecurityCloseIcon" */
            "mdi-react/SecurityCloseIcon"
        ),
    ),
    "mdi-security-home": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SecurityHomeIcon" */
            "mdi-react/SecurityHomeIcon"
        ),
    ),
    "mdi-security-lock": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SecurityLockIcon" */
            "mdi-react/SecurityLockIcon"
        ),
    ),
    "mdi-security-network": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SecurityNetworkIcon" */
            "mdi-react/SecurityNetworkIcon"
        ),
    ),
    "mdi-security-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SecurityOffIcon" */
            "mdi-react/SecurityOffIcon"
        ),
    ),
    "mdi-security": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SecurityIcon" */
            "mdi-react/SecurityIcon"
        ),
    ),
    "mdi-select-all": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SelectAllIcon" */
            "mdi-react/SelectAllIcon"
        ),
    ),
    "mdi-select-inverse": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SelectInverseIcon" */
            "mdi-react/SelectInverseIcon"
        ),
    ),
    "mdi-select-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SelectOffIcon" */
            "mdi-react/SelectOffIcon"
        ),
    ),
    "mdi-select": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SelectIcon" */
            "mdi-react/SelectIcon"
        ),
    ),
    "mdi-selection-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SelectionOffIcon" */
            "mdi-react/SelectionOffIcon"
        ),
    ),
    "mdi-selection": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SelectionIcon" */
            "mdi-react/SelectionIcon"
        ),
    ),
    "mdi-send-secure": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SendSecureIcon" */
            "mdi-react/SendSecureIcon"
        ),
    ),
    "mdi-send": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SendIcon" */
            "mdi-react/SendIcon"
        ),
    ),
    "mdi-serial-port": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SerialPortIcon" */
            "mdi-react/SerialPortIcon"
        ),
    ),
    "mdi-server-minus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ServerMinusIcon" */
            "mdi-react/ServerMinusIcon"
        ),
    ),
    "mdi-server-network-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ServerNetworkOffIcon" */
            "mdi-react/ServerNetworkOffIcon"
        ),
    ),
    "mdi-server-network": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ServerNetworkIcon" */
            "mdi-react/ServerNetworkIcon"
        ),
    ),
    "mdi-server-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ServerOffIcon" */
            "mdi-react/ServerOffIcon"
        ),
    ),
    "mdi-server-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ServerPlusIcon" */
            "mdi-react/ServerPlusIcon"
        ),
    ),
    "mdi-server-remove": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ServerRemoveIcon" */
            "mdi-react/ServerRemoveIcon"
        ),
    ),
    "mdi-server-security": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ServerSecurityIcon" */
            "mdi-react/ServerSecurityIcon"
        ),
    ),
    "mdi-server": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ServerIcon" */
            "mdi-react/ServerIcon"
        ),
    ),
    "mdi-set-all": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SetAllIcon" */
            "mdi-react/SetAllIcon"
        ),
    ),
    "mdi-set-center-right": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SetCenterRightIcon" */
            "mdi-react/SetCenterRightIcon"
        ),
    ),
    "mdi-set-center": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SetCenterIcon" */
            "mdi-react/SetCenterIcon"
        ),
    ),
    "mdi-set-left-center": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SetLeftCenterIcon" */
            "mdi-react/SetLeftCenterIcon"
        ),
    ),
    "mdi-set-left-right": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SetLeftRightIcon" */
            "mdi-react/SetLeftRightIcon"
        ),
    ),
    "mdi-set-left": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SetLeftIcon" */
            "mdi-react/SetLeftIcon"
        ),
    ),
    "mdi-set-none": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SetNoneIcon" */
            "mdi-react/SetNoneIcon"
        ),
    ),
    "mdi-set-right": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SetRightIcon" */
            "mdi-react/SetRightIcon"
        ),
    ),
    "mdi-set-top-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SetTopBoxIcon" */
            "mdi-react/SetTopBoxIcon"
        ),
    ),
    "mdi-settings-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SettingsBoxIcon" */
            "mdi-react/SettingsBoxIcon"
        ),
    ),
    "mdi-settings-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SettingsOutlineIcon" */
            "mdi-react/SettingsOutlineIcon"
        ),
    ),
    "mdi-settings": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SettingsIcon" */
            "mdi-react/SettingsIcon"
        ),
    ),
    "mdi-shape-circle-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ShapeCirclePlusIcon" */
            "mdi-react/ShapeCirclePlusIcon"
        ),
    ),
    "mdi-shape-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ShapeOutlineIcon" */
            "mdi-react/ShapeOutlineIcon"
        ),
    ),
    "mdi-shape-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ShapePlusIcon" */
            "mdi-react/ShapePlusIcon"
        ),
    ),
    "mdi-shape-polygon-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ShapePolygonPlusIcon" */
            "mdi-react/ShapePolygonPlusIcon"
        ),
    ),
    "mdi-shape-rectangle-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ShapeRectanglePlusIcon" */
            "mdi-react/ShapeRectanglePlusIcon"
        ),
    ),
    "mdi-shape-square-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ShapeSquarePlusIcon" */
            "mdi-react/ShapeSquarePlusIcon"
        ),
    ),
    "mdi-shape": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ShapeIcon" */
            "mdi-react/ShapeIcon"
        ),
    ),
    "mdi-share-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ShareOutlineIcon" */
            "mdi-react/ShareOutlineIcon"
        ),
    ),
    "mdi-share-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ShareVariantIcon" */
            "mdi-react/ShareVariantIcon"
        ),
    ),
    "mdi-share": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ShareIcon" */
            "mdi-react/ShareIcon"
        ),
    ),
    "mdi-shield-half-full": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ShieldHalfFullIcon" */
            "mdi-react/ShieldHalfFullIcon"
        ),
    ),
    "mdi-shield-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ShieldOutlineIcon" */
            "mdi-react/ShieldOutlineIcon"
        ),
    ),
    "mdi-shield": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ShieldIcon" */
            "mdi-react/ShieldIcon"
        ),
    ),
    "mdi-ship-wheel": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ShipWheelIcon" */
            "mdi-react/ShipWheelIcon"
        ),
    ),
    "mdi-shopping-music": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ShoppingMusicIcon" */
            "mdi-react/ShoppingMusicIcon"
        ),
    ),
    "mdi-shopping": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ShoppingIcon" */
            "mdi-react/ShoppingIcon"
        ),
    ),
    "mdi-shovel-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ShovelOffIcon" */
            "mdi-react/ShovelOffIcon"
        ),
    ),
    "mdi-shovel": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ShovelIcon" */
            "mdi-react/ShovelIcon"
        ),
    ),
    "mdi-shower-head": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ShowerHeadIcon" */
            "mdi-react/ShowerHeadIcon"
        ),
    ),
    "mdi-shower": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ShowerIcon" */
            "mdi-react/ShowerIcon"
        ),
    ),
    "mdi-shredder": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ShredderIcon" */
            "mdi-react/ShredderIcon"
        ),
    ),
    "mdi-shuffle-disabled": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ShuffleDisabledIcon" */
            "mdi-react/ShuffleDisabledIcon"
        ),
    ),
    "mdi-shuffle-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ShuffleVariantIcon" */
            "mdi-react/ShuffleVariantIcon"
        ),
    ),
    "mdi-shuffle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ShuffleIcon" */
            "mdi-react/ShuffleIcon"
        ),
    ),
    "mdi-sigma-lower": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SigmaLowerIcon" */
            "mdi-react/SigmaLowerIcon"
        ),
    ),
    "mdi-sigma": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SigmaIcon" */
            "mdi-react/SigmaIcon"
        ),
    ),
    "mdi-sign-caution": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SignCautionIcon" */
            "mdi-react/SignCautionIcon"
        ),
    ),
    "mdi-sign-direction": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SignDirectionIcon" */
            "mdi-react/SignDirectionIcon"
        ),
    ),
    "mdi-sign-text": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SignTextIcon" */
            "mdi-react/SignTextIcon"
        ),
    ),
    "mdi-signal-2-g": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Signal2gIcon" */
            "mdi-react/Signal2gIcon"
        ),
    ),
    "mdi-signal-3-g": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Signal3gIcon" */
            "mdi-react/Signal3gIcon"
        ),
    ),
    "mdi-signal-4-g": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Signal4gIcon" */
            "mdi-react/Signal4gIcon"
        ),
    ),
    "mdi-signal-cellular-1": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SignalCellular1Icon" */
            "mdi-react/SignalCellular1Icon"
        ),
    ),
    "mdi-signal-cellular-2": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SignalCellular2Icon" */
            "mdi-react/SignalCellular2Icon"
        ),
    ),
    "mdi-signal-cellular-3": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SignalCellular3Icon" */
            "mdi-react/SignalCellular3Icon"
        ),
    ),
    "mdi-signal-cellular-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SignalCellularOutlineIcon" */
            "mdi-react/SignalCellularOutlineIcon"
        ),
    ),
    "mdi-signal-hspa-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SignalHspaPlusIcon" */
            "mdi-react/SignalHspaPlusIcon"
        ),
    ),
    "mdi-signal-hspa": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SignalHspaIcon" */
            "mdi-react/SignalHspaIcon"
        ),
    ),
    "mdi-signal-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SignalOffIcon" */
            "mdi-react/SignalOffIcon"
        ),
    ),
    "mdi-signal-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SignalVariantIcon" */
            "mdi-react/SignalVariantIcon"
        ),
    ),
    "mdi-signal": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SignalIcon" */
            "mdi-react/SignalIcon"
        ),
    ),
    "mdi-silverware-fork": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SilverwareForkIcon" */
            "mdi-react/SilverwareForkIcon"
        ),
    ),
    "mdi-silverware-spoon": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SilverwareSpoonIcon" */
            "mdi-react/SilverwareSpoonIcon"
        ),
    ),
    "mdi-silverware-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SilverwareVariantIcon" */
            "mdi-react/SilverwareVariantIcon"
        ),
    ),
    "mdi-silverware": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SilverwareIcon" */
            "mdi-react/SilverwareIcon"
        ),
    ),
    "mdi-sim-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SimAlertIcon" */
            "mdi-react/SimAlertIcon"
        ),
    ),
    "mdi-sim-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SimOffIcon" */
            "mdi-react/SimOffIcon"
        ),
    ),
    "mdi-sim": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SimIcon" */
            "mdi-react/SimIcon"
        ),
    ),
    "mdi-sitemap": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SitemapIcon" */
            "mdi-react/SitemapIcon"
        ),
    ),
    "mdi-skip-backward": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SkipBackwardIcon" */
            "mdi-react/SkipBackwardIcon"
        ),
    ),
    "mdi-skip-forward": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SkipForwardIcon" */
            "mdi-react/SkipForwardIcon"
        ),
    ),
    "mdi-skip-next-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SkipNextCircleOutlineIcon" */
            "mdi-react/SkipNextCircleOutlineIcon"
        ),
    ),
    "mdi-skip-next-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SkipNextCircleIcon" */
            "mdi-react/SkipNextCircleIcon"
        ),
    ),
    "mdi-skip-next": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SkipNextIcon" */
            "mdi-react/SkipNextIcon"
        ),
    ),
    "mdi-skip-previous-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SkipPreviousCircleOutlineIcon" */
            "mdi-react/SkipPreviousCircleOutlineIcon"
        ),
    ),
    "mdi-skip-previous-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SkipPreviousCircleIcon" */
            "mdi-react/SkipPreviousCircleIcon"
        ),
    ),
    "mdi-skip-previous": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SkipPreviousIcon" */
            "mdi-react/SkipPreviousIcon"
        ),
    ),
    "mdi-skull": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SkullIcon" */
            "mdi-react/SkullIcon"
        ),
    ),
    "mdi-skype-business": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SkypeBusinessIcon" */
            "mdi-react/SkypeBusinessIcon"
        ),
    ),
    "mdi-skype": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SkypeIcon" */
            "mdi-react/SkypeIcon"
        ),
    ),
    "mdi-slack": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SlackIcon" */
            "mdi-react/SlackIcon"
        ),
    ),
    "mdi-slackware": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SlackwareIcon" */
            "mdi-react/SlackwareIcon"
        ),
    ),
    "mdi-sleep-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SleepOffIcon" */
            "mdi-react/SleepOffIcon"
        ),
    ),
    "mdi-sleep": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SleepIcon" */
            "mdi-react/SleepIcon"
        ),
    ),
    "mdi-smoke-detector": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SmokeDetectorIcon" */
            "mdi-react/SmokeDetectorIcon"
        ),
    ),
    "mdi-smoking-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SmokingOffIcon" */
            "mdi-react/SmokingOffIcon"
        ),
    ),
    "mdi-smoking": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SmokingIcon" */
            "mdi-react/SmokingIcon"
        ),
    ),
    "mdi-snapchat": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SnapchatIcon" */
            "mdi-react/SnapchatIcon"
        ),
    ),
    "mdi-snowflake": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SnowflakeIcon" */
            "mdi-react/SnowflakeIcon"
        ),
    ),
    "mdi-snowman": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SnowmanIcon" */
            "mdi-react/SnowmanIcon"
        ),
    ),
    "mdi-soccer-field": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SoccerFieldIcon" */
            "mdi-react/SoccerFieldIcon"
        ),
    ),
    "mdi-soccer": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SoccerIcon" */
            "mdi-react/SoccerIcon"
        ),
    ),
    "mdi-sofa": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SofaIcon" */
            "mdi-react/SofaIcon"
        ),
    ),
    "mdi-solid": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SolidIcon" */
            "mdi-react/SolidIcon"
        ),
    ),
    "mdi-sort-alphabetical": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SortAlphabeticalIcon" */
            "mdi-react/SortAlphabeticalIcon"
        ),
    ),
    "mdi-sort-ascending": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SortAscendingIcon" */
            "mdi-react/SortAscendingIcon"
        ),
    ),
    "mdi-sort-descending": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SortDescendingIcon" */
            "mdi-react/SortDescendingIcon"
        ),
    ),
    "mdi-sort-numeric": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SortNumericIcon" */
            "mdi-react/SortNumericIcon"
        ),
    ),
    "mdi-sort-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SortVariantIcon" */
            "mdi-react/SortVariantIcon"
        ),
    ),
    "mdi-sort": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SortIcon" */
            "mdi-react/SortIcon"
        ),
    ),
    "mdi-soundcloud": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SoundcloudIcon" */
            "mdi-react/SoundcloudIcon"
        ),
    ),
    "mdi-source-branch": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SourceBranchIcon" */
            "mdi-react/SourceBranchIcon"
        ),
    ),
    "mdi-source-commit-end-local": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SourceCommitEndLocalIcon" */
            "mdi-react/SourceCommitEndLocalIcon"
        ),
    ),
    "mdi-source-commit-end": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SourceCommitEndIcon" */
            "mdi-react/SourceCommitEndIcon"
        ),
    ),
    "mdi-source-commit-local": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SourceCommitLocalIcon" */
            "mdi-react/SourceCommitLocalIcon"
        ),
    ),
    "mdi-source-commit-next-local": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SourceCommitNextLocalIcon" */
            "mdi-react/SourceCommitNextLocalIcon"
        ),
    ),
    "mdi-source-commit-start-next-local": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SourceCommitStartNextLocalIcon" */
            "mdi-react/SourceCommitStartNextLocalIcon"
        ),
    ),
    "mdi-source-commit-start": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SourceCommitStartIcon" */
            "mdi-react/SourceCommitStartIcon"
        ),
    ),
    "mdi-source-commit": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SourceCommitIcon" */
            "mdi-react/SourceCommitIcon"
        ),
    ),
    "mdi-source-fork": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SourceForkIcon" */
            "mdi-react/SourceForkIcon"
        ),
    ),
    "mdi-source-merge": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SourceMergeIcon" */
            "mdi-react/SourceMergeIcon"
        ),
    ),
    "mdi-source-pull": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SourcePullIcon" */
            "mdi-react/SourcePullIcon"
        ),
    ),
    "mdi-soy-sauce": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SoySauceIcon" */
            "mdi-react/SoySauceIcon"
        ),
    ),
    "mdi-speaker-bluetooth": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SpeakerBluetoothIcon" */
            "mdi-react/SpeakerBluetoothIcon"
        ),
    ),
    "mdi-speaker-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SpeakerOffIcon" */
            "mdi-react/SpeakerOffIcon"
        ),
    ),
    "mdi-speaker-wireless": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SpeakerWirelessIcon" */
            "mdi-react/SpeakerWirelessIcon"
        ),
    ),
    "mdi-speaker": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SpeakerIcon" */
            "mdi-react/SpeakerIcon"
        ),
    ),
    "mdi-speedometer": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SpeedometerIcon" */
            "mdi-react/SpeedometerIcon"
        ),
    ),
    "mdi-spellcheck": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SpellcheckIcon" */
            "mdi-react/SpellcheckIcon"
        ),
    ),
    "mdi-spotify": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SpotifyIcon" */
            "mdi-react/SpotifyIcon"
        ),
    ),
    "mdi-spotlight-beam": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SpotlightBeamIcon" */
            "mdi-react/SpotlightBeamIcon"
        ),
    ),
    "mdi-spotlight": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SpotlightIcon" */
            "mdi-react/SpotlightIcon"
        ),
    ),
    "mdi-spray": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SprayIcon" */
            "mdi-react/SprayIcon"
        ),
    ),
    "mdi-square-edit-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SquareEditOutlineIcon" */
            "mdi-react/SquareEditOutlineIcon"
        ),
    ),
    "mdi-square-inc-cash": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SquareIncCashIcon" */
            "mdi-react/SquareIncCashIcon"
        ),
    ),
    "mdi-square-inc": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SquareIncIcon" */
            "mdi-react/SquareIncIcon"
        ),
    ),
    "mdi-square-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SquareOutlineIcon" */
            "mdi-react/SquareOutlineIcon"
        ),
    ),
    "mdi-square-root-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SquareRootBoxIcon" */
            "mdi-react/SquareRootBoxIcon"
        ),
    ),
    "mdi-square-root": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SquareRootIcon" */
            "mdi-react/SquareRootIcon"
        ),
    ),
    "mdi-square": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SquareIcon" */
            "mdi-react/SquareIcon"
        ),
    ),
    "mdi-ssh": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SshIcon" */
            "mdi-react/SshIcon"
        ),
    ),
    "mdi-stack-exchange": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/StackExchangeIcon" */
            "mdi-react/StackExchangeIcon"
        ),
    ),
    "mdi-stack-overflow": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/StackOverflowIcon" */
            "mdi-react/StackOverflowIcon"
        ),
    ),
    "mdi-stadium": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/StadiumIcon" */
            "mdi-react/StadiumIcon"
        ),
    ),
    "mdi-stairs": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/StairsIcon" */
            "mdi-react/StairsIcon"
        ),
    ),
    "mdi-standard-definition": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/StandardDefinitionIcon" */
            "mdi-react/StandardDefinitionIcon"
        ),
    ),
    "mdi-star-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/StarCircleOutlineIcon" */
            "mdi-react/StarCircleOutlineIcon"
        ),
    ),
    "mdi-star-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/StarCircleIcon" */
            "mdi-react/StarCircleIcon"
        ),
    ),
    "mdi-star-face": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/StarFaceIcon" */
            "mdi-react/StarFaceIcon"
        ),
    ),
    "mdi-star-half": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/StarHalfIcon" */
            "mdi-react/StarHalfIcon"
        ),
    ),
    "mdi-star-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/StarOffIcon" */
            "mdi-react/StarOffIcon"
        ),
    ),
    "mdi-star-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/StarOutlineIcon" */
            "mdi-react/StarOutlineIcon"
        ),
    ),
    "mdi-star": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/StarIcon" */
            "mdi-react/StarIcon"
        ),
    ),
    "mdi-steam-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SteamBoxIcon" */
            "mdi-react/SteamBoxIcon"
        ),
    ),
    "mdi-steam": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SteamIcon" */
            "mdi-react/SteamIcon"
        ),
    ),
    "mdi-steering-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SteeringOffIcon" */
            "mdi-react/SteeringOffIcon"
        ),
    ),
    "mdi-steering": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SteeringIcon" */
            "mdi-react/SteeringIcon"
        ),
    ),
    "mdi-step-backward-2": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/StepBackward2Icon" */
            "mdi-react/StepBackward2Icon"
        ),
    ),
    "mdi-step-backward": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/StepBackwardIcon" */
            "mdi-react/StepBackwardIcon"
        ),
    ),
    "mdi-step-forward-2": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/StepForward2Icon" */
            "mdi-react/StepForward2Icon"
        ),
    ),
    "mdi-step-forward": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/StepForwardIcon" */
            "mdi-react/StepForwardIcon"
        ),
    ),
    "mdi-stethoscope": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/StethoscopeIcon" */
            "mdi-react/StethoscopeIcon"
        ),
    ),
    "mdi-sticker-emoji": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/StickerEmojiIcon" */
            "mdi-react/StickerEmojiIcon"
        ),
    ),
    "mdi-sticker": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/StickerIcon" */
            "mdi-react/StickerIcon"
        ),
    ),
    "mdi-stocking": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/StockingIcon" */
            "mdi-react/StockingIcon"
        ),
    ),
    "mdi-stop-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/StopCircleOutlineIcon" */
            "mdi-react/StopCircleOutlineIcon"
        ),
    ),
    "mdi-stop-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/StopCircleIcon" */
            "mdi-react/StopCircleIcon"
        ),
    ),
    "mdi-stop": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/StopIcon" */
            "mdi-react/StopIcon"
        ),
    ),
    "mdi-store-24-hour": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Store24HourIcon" */
            "mdi-react/Store24HourIcon"
        ),
    ),
    "mdi-store": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/StoreIcon" */
            "mdi-react/StoreIcon"
        ),
    ),
    "mdi-stove": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/StoveIcon" */
            "mdi-react/StoveIcon"
        ),
    ),
    "mdi-subdirectory-arrow-left": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SubdirectoryArrowLeftIcon" */
            "mdi-react/SubdirectoryArrowLeftIcon"
        ),
    ),
    "mdi-subdirectory-arrow-right": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SubdirectoryArrowRightIcon" */
            "mdi-react/SubdirectoryArrowRightIcon"
        ),
    ),
    "mdi-subway-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SubwayVariantIcon" */
            "mdi-react/SubwayVariantIcon"
        ),
    ),
    "mdi-subway": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SubwayIcon" */
            "mdi-react/SubwayIcon"
        ),
    ),
    "mdi-summit": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SummitIcon" */
            "mdi-react/SummitIcon"
        ),
    ),
    "mdi-sunglasses": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SunglassesIcon" */
            "mdi-react/SunglassesIcon"
        ),
    ),
    "mdi-surround-sound-20": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SurroundSound20Icon" */
            "mdi-react/SurroundSound20Icon"
        ),
    ),
    "mdi-surround-sound-31": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SurroundSound31Icon" */
            "mdi-react/SurroundSound31Icon"
        ),
    ),
    "mdi-surround-sound-51": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SurroundSound51Icon" */
            "mdi-react/SurroundSound51Icon"
        ),
    ),
    "mdi-surround-sound-71": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SurroundSound71Icon" */
            "mdi-react/SurroundSound71Icon"
        ),
    ),
    "mdi-surround-sound": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SurroundSoundIcon" */
            "mdi-react/SurroundSoundIcon"
        ),
    ),
    "mdi-svg": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SvgIcon" */
            "mdi-react/SvgIcon"
        ),
    ),
    "mdi-swap-horizontal-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SwapHorizontalVariantIcon" */
            "mdi-react/SwapHorizontalVariantIcon"
        ),
    ),
    "mdi-swap-horizontal": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SwapHorizontalIcon" */
            "mdi-react/SwapHorizontalIcon"
        ),
    ),
    "mdi-swap-vertical-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SwapVerticalVariantIcon" */
            "mdi-react/SwapVerticalVariantIcon"
        ),
    ),
    "mdi-swap-vertical": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SwapVerticalIcon" */
            "mdi-react/SwapVerticalIcon"
        ),
    ),
    "mdi-swim": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SwimIcon" */
            "mdi-react/SwimIcon"
        ),
    ),
    "mdi-switch": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SwitchIcon" */
            "mdi-react/SwitchIcon"
        ),
    ),
    "mdi-sword-cross": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SwordCrossIcon" */
            "mdi-react/SwordCrossIcon"
        ),
    ),
    "mdi-sword": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SwordIcon" */
            "mdi-react/SwordIcon"
        ),
    ),
    "mdi-sync-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SyncAlertIcon" */
            "mdi-react/SyncAlertIcon"
        ),
    ),
    "mdi-sync-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SyncOffIcon" */
            "mdi-react/SyncOffIcon"
        ),
    ),
    "mdi-sync": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SyncIcon" */
            "mdi-react/SyncIcon"
        ),
    ),
    "mdi-tab-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TabPlusIcon" */
            "mdi-react/TabPlusIcon"
        ),
    ),
    "mdi-tab-unselected": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TabUnselectedIcon" */
            "mdi-react/TabUnselectedIcon"
        ),
    ),
    "mdi-tab": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TabIcon" */
            "mdi-react/TabIcon"
        ),
    ),
    "mdi-table-column-plus-after": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TableColumnPlusAfterIcon" */
            "mdi-react/TableColumnPlusAfterIcon"
        ),
    ),
    "mdi-table-column-plus-before": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TableColumnPlusBeforeIcon" */
            "mdi-react/TableColumnPlusBeforeIcon"
        ),
    ),
    "mdi-table-column-remove": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TableColumnRemoveIcon" */
            "mdi-react/TableColumnRemoveIcon"
        ),
    ),
    "mdi-table-column-width": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TableColumnWidthIcon" */
            "mdi-react/TableColumnWidthIcon"
        ),
    ),
    "mdi-table-column": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TableColumnIcon" */
            "mdi-react/TableColumnIcon"
        ),
    ),
    "mdi-table-edit": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TableEditIcon" */
            "mdi-react/TableEditIcon"
        ),
    ),
    "mdi-table-large": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TableLargeIcon" */
            "mdi-react/TableLargeIcon"
        ),
    ),
    "mdi-table-merge-cells": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TableMergeCellsIcon" */
            "mdi-react/TableMergeCellsIcon"
        ),
    ),
    "mdi-table-of-contents": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TableOfContentsIcon" */
            "mdi-react/TableOfContentsIcon"
        ),
    ),
    "mdi-table-row-height": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TableRowHeightIcon" */
            "mdi-react/TableRowHeightIcon"
        ),
    ),
    "mdi-table-row-plus-after": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TableRowPlusAfterIcon" */
            "mdi-react/TableRowPlusAfterIcon"
        ),
    ),
    "mdi-table-row-plus-before": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TableRowPlusBeforeIcon" */
            "mdi-react/TableRowPlusBeforeIcon"
        ),
    ),
    "mdi-table-row-remove": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TableRowRemoveIcon" */
            "mdi-react/TableRowRemoveIcon"
        ),
    ),
    "mdi-table-row": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TableRowIcon" */
            "mdi-react/TableRowIcon"
        ),
    ),
    "mdi-table-search": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TableSearchIcon" */
            "mdi-react/TableSearchIcon"
        ),
    ),
    "mdi-table-settings": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TableSettingsIcon" */
            "mdi-react/TableSettingsIcon"
        ),
    ),
    "mdi-table": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TableIcon" */
            "mdi-react/TableIcon"
        ),
    ),
    "mdi-tablet-android": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TabletAndroidIcon" */
            "mdi-react/TabletAndroidIcon"
        ),
    ),
    "mdi-tablet-cellphone": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TabletCellphoneIcon" */
            "mdi-react/TabletCellphoneIcon"
        ),
    ),
    "mdi-tablet-ipad": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TabletIpadIcon" */
            "mdi-react/TabletIpadIcon"
        ),
    ),
    "mdi-tablet": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TabletIcon" */
            "mdi-react/TabletIcon"
        ),
    ),
    "mdi-taco": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TacoIcon" */
            "mdi-react/TacoIcon"
        ),
    ),
    "mdi-tag-faces": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TagFacesIcon" */
            "mdi-react/TagFacesIcon"
        ),
    ),
    "mdi-tag-heart": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TagHeartIcon" */
            "mdi-react/TagHeartIcon"
        ),
    ),
    "mdi-tag-minus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TagMinusIcon" */
            "mdi-react/TagMinusIcon"
        ),
    ),
    "mdi-tag-multiple": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TagMultipleIcon" */
            "mdi-react/TagMultipleIcon"
        ),
    ),
    "mdi-tag-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TagOutlineIcon" */
            "mdi-react/TagOutlineIcon"
        ),
    ),
    "mdi-tag-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TagPlusIcon" */
            "mdi-react/TagPlusIcon"
        ),
    ),
    "mdi-tag-remove": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TagRemoveIcon" */
            "mdi-react/TagRemoveIcon"
        ),
    ),
    "mdi-tag-text-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TagTextOutlineIcon" */
            "mdi-react/TagTextOutlineIcon"
        ),
    ),
    "mdi-tag": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TagIcon" */
            "mdi-react/TagIcon"
        ),
    ),
    "mdi-target": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TargetIcon" */
            "mdi-react/TargetIcon"
        ),
    ),
    "mdi-taxi": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TaxiIcon" */
            "mdi-react/TaxiIcon"
        ),
    ),
    "mdi-teach": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TeachIcon" */
            "mdi-react/TeachIcon"
        ),
    ),
    "mdi-teamviewer": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TeamviewerIcon" */
            "mdi-react/TeamviewerIcon"
        ),
    ),
    "mdi-telegram": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TelegramIcon" */
            "mdi-react/TelegramIcon"
        ),
    ),
    "mdi-television-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TelevisionBoxIcon" */
            "mdi-react/TelevisionBoxIcon"
        ),
    ),
    "mdi-television-classic-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TelevisionClassicOffIcon" */
            "mdi-react/TelevisionClassicOffIcon"
        ),
    ),
    "mdi-television-classic": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TelevisionClassicIcon" */
            "mdi-react/TelevisionClassicIcon"
        ),
    ),
    "mdi-television-guide": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TelevisionGuideIcon" */
            "mdi-react/TelevisionGuideIcon"
        ),
    ),
    "mdi-television-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TelevisionOffIcon" */
            "mdi-react/TelevisionOffIcon"
        ),
    ),
    "mdi-television": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TelevisionIcon" */
            "mdi-react/TelevisionIcon"
        ),
    ),
    "mdi-temperature-celsius": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TemperatureCelsiusIcon" */
            "mdi-react/TemperatureCelsiusIcon"
        ),
    ),
    "mdi-temperature-fahrenheit": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TemperatureFahrenheitIcon" */
            "mdi-react/TemperatureFahrenheitIcon"
        ),
    ),
    "mdi-temperature-kelvin": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TemperatureKelvinIcon" */
            "mdi-react/TemperatureKelvinIcon"
        ),
    ),
    "mdi-tennis": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TennisIcon" */
            "mdi-react/TennisIcon"
        ),
    ),
    "mdi-tent": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TentIcon" */
            "mdi-react/TentIcon"
        ),
    ),
    "mdi-terrain": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TerrainIcon" */
            "mdi-react/TerrainIcon"
        ),
    ),
    "mdi-test-tube-empty": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TestTubeEmptyIcon" */
            "mdi-react/TestTubeEmptyIcon"
        ),
    ),
    "mdi-test-tube-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TestTubeOffIcon" */
            "mdi-react/TestTubeOffIcon"
        ),
    ),
    "mdi-test-tube": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TestTubeIcon" */
            "mdi-react/TestTubeIcon"
        ),
    ),
    "mdi-text-shadow": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TextShadowIcon" */
            "mdi-react/TextShadowIcon"
        ),
    ),
    "mdi-text-short": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TextShortIcon" */
            "mdi-react/TextShortIcon"
        ),
    ),
    "mdi-text-subject": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TextSubjectIcon" */
            "mdi-react/TextSubjectIcon"
        ),
    ),
    "mdi-text-to-speech-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TextToSpeechOffIcon" */
            "mdi-react/TextToSpeechOffIcon"
        ),
    ),
    "mdi-text-to-speech": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TextToSpeechIcon" */
            "mdi-react/TextToSpeechIcon"
        ),
    ),
    "mdi-text": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TextIcon" */
            "mdi-react/TextIcon"
        ),
    ),
    "mdi-textbox-password": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TextboxPasswordIcon" */
            "mdi-react/TextboxPasswordIcon"
        ),
    ),
    "mdi-textbox": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TextboxIcon" */
            "mdi-react/TextboxIcon"
        ),
    ),
    "mdi-texture": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TextureIcon" */
            "mdi-react/TextureIcon"
        ),
    ),
    "mdi-theater": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TheaterIcon" */
            "mdi-react/TheaterIcon"
        ),
    ),
    "mdi-theme-light-dark": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ThemeLightDarkIcon" */
            "mdi-react/ThemeLightDarkIcon"
        ),
    ),
    "mdi-thermometer-lines": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ThermometerLinesIcon" */
            "mdi-react/ThermometerLinesIcon"
        ),
    ),
    "mdi-thermometer": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ThermometerIcon" */
            "mdi-react/ThermometerIcon"
        ),
    ),
    "mdi-thermostat-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ThermostatBoxIcon" */
            "mdi-react/ThermostatBoxIcon"
        ),
    ),
    "mdi-thermostat": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ThermostatIcon" */
            "mdi-react/ThermostatIcon"
        ),
    ),
    "mdi-thought-bubble-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ThoughtBubbleOutlineIcon" */
            "mdi-react/ThoughtBubbleOutlineIcon"
        ),
    ),
    "mdi-thought-bubble": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ThoughtBubbleIcon" */
            "mdi-react/ThoughtBubbleIcon"
        ),
    ),
    "mdi-thumb-down-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ThumbDownOutlineIcon" */
            "mdi-react/ThumbDownOutlineIcon"
        ),
    ),
    "mdi-thumb-down": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ThumbDownIcon" */
            "mdi-react/ThumbDownIcon"
        ),
    ),
    "mdi-thumb-up-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ThumbUpOutlineIcon" */
            "mdi-react/ThumbUpOutlineIcon"
        ),
    ),
    "mdi-thumb-up": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ThumbUpIcon" */
            "mdi-react/ThumbUpIcon"
        ),
    ),
    "mdi-thumbs-up-down": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ThumbsUpDownIcon" */
            "mdi-react/ThumbsUpDownIcon"
        ),
    ),
    "mdi-ticket-account": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TicketAccountIcon" */
            "mdi-react/TicketAccountIcon"
        ),
    ),
    "mdi-ticket-confirmation": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TicketConfirmationIcon" */
            "mdi-react/TicketConfirmationIcon"
        ),
    ),
    "mdi-ticket-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TicketOutlineIcon" */
            "mdi-react/TicketOutlineIcon"
        ),
    ),
    "mdi-ticket-percent": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TicketPercentIcon" */
            "mdi-react/TicketPercentIcon"
        ),
    ),
    "mdi-ticket": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TicketIcon" */
            "mdi-react/TicketIcon"
        ),
    ),
    "mdi-tie": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TieIcon" */
            "mdi-react/TieIcon"
        ),
    ),
    "mdi-tilde": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TildeIcon" */
            "mdi-react/TildeIcon"
        ),
    ),
    "mdi-timelapse": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TimelapseIcon" */
            "mdi-react/TimelapseIcon"
        ),
    ),
    "mdi-timer-10": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Timer10Icon" */
            "mdi-react/Timer10Icon"
        ),
    ),
    "mdi-timer-3": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Timer3Icon" */
            "mdi-react/Timer3Icon"
        ),
    ),
    "mdi-timer-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TimerOffIcon" */
            "mdi-react/TimerOffIcon"
        ),
    ),
    "mdi-timer-sand-empty": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TimerSandEmptyIcon" */
            "mdi-react/TimerSandEmptyIcon"
        ),
    ),
    "mdi-timer-sand-full": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TimerSandFullIcon" */
            "mdi-react/TimerSandFullIcon"
        ),
    ),
    "mdi-timer-sand": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TimerSandIcon" */
            "mdi-react/TimerSandIcon"
        ),
    ),
    "mdi-timer": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TimerIcon" */
            "mdi-react/TimerIcon"
        ),
    ),
    "mdi-timetable": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TimetableIcon" */
            "mdi-react/TimetableIcon"
        ),
    ),
    "mdi-toggle-switch-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ToggleSwitchOffIcon" */
            "mdi-react/ToggleSwitchOffIcon"
        ),
    ),
    "mdi-toggle-switch": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ToggleSwitchIcon" */
            "mdi-react/ToggleSwitchIcon"
        ),
    ),
    "mdi-toilet": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ToiletIcon" */
            "mdi-react/ToiletIcon"
        ),
    ),
    "mdi-toolbox-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ToolboxOutlineIcon" */
            "mdi-react/ToolboxOutlineIcon"
        ),
    ),
    "mdi-toolbox": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ToolboxIcon" */
            "mdi-react/ToolboxIcon"
        ),
    ),
    "mdi-tooltip-edit": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TooltipEditIcon" */
            "mdi-react/TooltipEditIcon"
        ),
    ),
    "mdi-tooltip-image": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TooltipImageIcon" */
            "mdi-react/TooltipImageIcon"
        ),
    ),
    "mdi-tooltip-outline-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TooltipOutlinePlusIcon" */
            "mdi-react/TooltipOutlinePlusIcon"
        ),
    ),
    "mdi-tooltip-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TooltipOutlineIcon" */
            "mdi-react/TooltipOutlineIcon"
        ),
    ),
    "mdi-tooltip-text": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TooltipTextIcon" */
            "mdi-react/TooltipTextIcon"
        ),
    ),
    "mdi-tooltip": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TooltipIcon" */
            "mdi-react/TooltipIcon"
        ),
    ),
    "mdi-tooth-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ToothOutlineIcon" */
            "mdi-react/ToothOutlineIcon"
        ),
    ),
    "mdi-tooth": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ToothIcon" */
            "mdi-react/ToothIcon"
        ),
    ),
    "mdi-tor": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TorIcon" */
            "mdi-react/TorIcon"
        ),
    ),
    "mdi-tournament": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TournamentIcon" */
            "mdi-react/TournamentIcon"
        ),
    ),
    "mdi-tower-beach": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TowerBeachIcon" */
            "mdi-react/TowerBeachIcon"
        ),
    ),
    "mdi-tower-fire": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TowerFireIcon" */
            "mdi-react/TowerFireIcon"
        ),
    ),
    "mdi-towing": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TowingIcon" */
            "mdi-react/TowingIcon"
        ),
    ),
    "mdi-track-light": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TrackLightIcon" */
            "mdi-react/TrackLightIcon"
        ),
    ),
    "mdi-trackpad-lock": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TrackpadLockIcon" */
            "mdi-react/TrackpadLockIcon"
        ),
    ),
    "mdi-trackpad": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TrackpadIcon" */
            "mdi-react/TrackpadIcon"
        ),
    ),
    "mdi-tractor": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TractorIcon" */
            "mdi-react/TractorIcon"
        ),
    ),
    "mdi-traffic-light": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TrafficLightIcon" */
            "mdi-react/TrafficLightIcon"
        ),
    ),
    "mdi-train-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TrainVariantIcon" */
            "mdi-react/TrainVariantIcon"
        ),
    ),
    "mdi-train": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TrainIcon" */
            "mdi-react/TrainIcon"
        ),
    ),
    "mdi-tram": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TramIcon" */
            "mdi-react/TramIcon"
        ),
    ),
    "mdi-transcribe-close": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TranscribeCloseIcon" */
            "mdi-react/TranscribeCloseIcon"
        ),
    ),
    "mdi-transcribe": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TranscribeIcon" */
            "mdi-react/TranscribeIcon"
        ),
    ),
    "mdi-transfer": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TransferIcon" */
            "mdi-react/TransferIcon"
        ),
    ),
    "mdi-transit-transfer": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TransitTransferIcon" */
            "mdi-react/TransitTransferIcon"
        ),
    ),
    "mdi-transition-masked": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TransitionMaskedIcon" */
            "mdi-react/TransitionMaskedIcon"
        ),
    ),
    "mdi-transition": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TransitionIcon" */
            "mdi-react/TransitionIcon"
        ),
    ),
    "mdi-translate": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TranslateIcon" */
            "mdi-react/TranslateIcon"
        ),
    ),
    "mdi-treasure-chest": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TreasureChestIcon" */
            "mdi-react/TreasureChestIcon"
        ),
    ),
    "mdi-tree": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TreeIcon" */
            "mdi-react/TreeIcon"
        ),
    ),
    "mdi-trello": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TrelloIcon" */
            "mdi-react/TrelloIcon"
        ),
    ),
    "mdi-trending-down": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TrendingDownIcon" */
            "mdi-react/TrendingDownIcon"
        ),
    ),
    "mdi-trending-neutral": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TrendingNeutralIcon" */
            "mdi-react/TrendingNeutralIcon"
        ),
    ),
    "mdi-trending-up": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TrendingUpIcon" */
            "mdi-react/TrendingUpIcon"
        ),
    ),
    "mdi-triangle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TriangleOutlineIcon" */
            "mdi-react/TriangleOutlineIcon"
        ),
    ),
    "mdi-triangle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TriangleIcon" */
            "mdi-react/TriangleIcon"
        ),
    ),
    "mdi-trophy-award": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TrophyAwardIcon" */
            "mdi-react/TrophyAwardIcon"
        ),
    ),
    "mdi-trophy-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TrophyOutlineIcon" */
            "mdi-react/TrophyOutlineIcon"
        ),
    ),
    "mdi-trophy-variant-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TrophyVariantOutlineIcon" */
            "mdi-react/TrophyVariantOutlineIcon"
        ),
    ),
    "mdi-trophy-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TrophyVariantIcon" */
            "mdi-react/TrophyVariantIcon"
        ),
    ),
    "mdi-trophy": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TrophyIcon" */
            "mdi-react/TrophyIcon"
        ),
    ),
    "mdi-truck-delivery": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TruckDeliveryIcon" */
            "mdi-react/TruckDeliveryIcon"
        ),
    ),
    "mdi-truck-fast": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TruckFastIcon" */
            "mdi-react/TruckFastIcon"
        ),
    ),
    "mdi-truck-trailer": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TruckTrailerIcon" */
            "mdi-react/TruckTrailerIcon"
        ),
    ),
    "mdi-truck": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TruckIcon" */
            "mdi-react/TruckIcon"
        ),
    ),
    "mdi-tshirt-crew": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TshirtCrewIcon" */
            "mdi-react/TshirtCrewIcon"
        ),
    ),
    "mdi-tshirt-v": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TshirtVIcon" */
            "mdi-react/TshirtVIcon"
        ),
    ),
    "mdi-tumble-dryer": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TumbleDryerIcon" */
            "mdi-react/TumbleDryerIcon"
        ),
    ),
    "mdi-tumblr-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TumblrBoxIcon" */
            "mdi-react/TumblrBoxIcon"
        ),
    ),
    "mdi-tumblr-reblog": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TumblrReblogIcon" */
            "mdi-react/TumblrReblogIcon"
        ),
    ),
    "mdi-tumblr": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TumblrIcon" */
            "mdi-react/TumblrIcon"
        ),
    ),
    "mdi-tune-vertical": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TuneVerticalIcon" */
            "mdi-react/TuneVerticalIcon"
        ),
    ),
    "mdi-tune": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TuneIcon" */
            "mdi-react/TuneIcon"
        ),
    ),
    "mdi-twitch": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TwitchIcon" */
            "mdi-react/TwitchIcon"
        ),
    ),
    "mdi-twitter-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TwitterBoxIcon" */
            "mdi-react/TwitterBoxIcon"
        ),
    ),
    "mdi-twitter-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TwitterCircleIcon" */
            "mdi-react/TwitterCircleIcon"
        ),
    ),
    "mdi-twitter-retweet": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TwitterRetweetIcon" */
            "mdi-react/TwitterRetweetIcon"
        ),
    ),
    "mdi-twitter": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TwitterIcon" */
            "mdi-react/TwitterIcon"
        ),
    ),
    "mdi-two-factor-authentication": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TwoFactorAuthenticationIcon" */
            "mdi-react/TwoFactorAuthenticationIcon"
        ),
    ),
    "mdi-uber": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UberIcon" */
            "mdi-react/UberIcon"
        ),
    ),
    "mdi-ubuntu": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UbuntuIcon" */
            "mdi-react/UbuntuIcon"
        ),
    ),
    "mdi-ultra-high-definition": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UltraHighDefinitionIcon" */
            "mdi-react/UltraHighDefinitionIcon"
        ),
    ),
    "mdi-umbraco": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UmbracoIcon" */
            "mdi-react/UmbracoIcon"
        ),
    ),
    "mdi-umbrella-closed": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UmbrellaClosedIcon" */
            "mdi-react/UmbrellaClosedIcon"
        ),
    ),
    "mdi-umbrella-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UmbrellaOutlineIcon" */
            "mdi-react/UmbrellaOutlineIcon"
        ),
    ),
    "mdi-umbrella": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UmbrellaIcon" */
            "mdi-react/UmbrellaIcon"
        ),
    ),
    "mdi-undo-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UndoVariantIcon" */
            "mdi-react/UndoVariantIcon"
        ),
    ),
    "mdi-undo": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UndoIcon" */
            "mdi-react/UndoIcon"
        ),
    ),
    "mdi-unfold-less-horizontal": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UnfoldLessHorizontalIcon" */
            "mdi-react/UnfoldLessHorizontalIcon"
        ),
    ),
    "mdi-unfold-less-vertical": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UnfoldLessVerticalIcon" */
            "mdi-react/UnfoldLessVerticalIcon"
        ),
    ),
    "mdi-unfold-more-horizontal": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UnfoldMoreHorizontalIcon" */
            "mdi-react/UnfoldMoreHorizontalIcon"
        ),
    ),
    "mdi-unfold-more-vertical": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UnfoldMoreVerticalIcon" */
            "mdi-react/UnfoldMoreVerticalIcon"
        ),
    ),
    "mdi-ungroup": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UngroupIcon" */
            "mdi-react/UngroupIcon"
        ),
    ),
    "mdi-unity": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UnityIcon" */
            "mdi-react/UnityIcon"
        ),
    ),
    "mdi-unreal": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UnrealIcon" */
            "mdi-react/UnrealIcon"
        ),
    ),
    "mdi-untappd": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UntappdIcon" */
            "mdi-react/UntappdIcon"
        ),
    ),
    "mdi-update": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UpdateIcon" */
            "mdi-react/UpdateIcon"
        ),
    ),
    "mdi-upload-multiple": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UploadMultipleIcon" */
            "mdi-react/UploadMultipleIcon"
        ),
    ),
    "mdi-upload-network": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UploadNetworkIcon" */
            "mdi-react/UploadNetworkIcon"
        ),
    ),
    "mdi-upload": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UploadIcon" */
            "mdi-react/UploadIcon"
        ),
    ),
    "mdi-usb": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UsbIcon" */
            "mdi-react/UsbIcon"
        ),
    ),
    "mdi-van-passenger": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VanPassengerIcon" */
            "mdi-react/VanPassengerIcon"
        ),
    ),
    "mdi-van-utility": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VanUtilityIcon" */
            "mdi-react/VanUtilityIcon"
        ),
    ),
    "mdi-vanish": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VanishIcon" */
            "mdi-react/VanishIcon"
        ),
    ),
    "mdi-vector-arrange-above": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VectorArrangeAboveIcon" */
            "mdi-react/VectorArrangeAboveIcon"
        ),
    ),
    "mdi-vector-arrange-below": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VectorArrangeBelowIcon" */
            "mdi-react/VectorArrangeBelowIcon"
        ),
    ),
    "mdi-vector-circle-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VectorCircleVariantIcon" */
            "mdi-react/VectorCircleVariantIcon"
        ),
    ),
    "mdi-vector-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VectorCircleIcon" */
            "mdi-react/VectorCircleIcon"
        ),
    ),
    "mdi-vector-combine": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VectorCombineIcon" */
            "mdi-react/VectorCombineIcon"
        ),
    ),
    "mdi-vector-curve": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VectorCurveIcon" */
            "mdi-react/VectorCurveIcon"
        ),
    ),
    "mdi-vector-difference-ab": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VectorDifferenceAbIcon" */
            "mdi-react/VectorDifferenceAbIcon"
        ),
    ),
    "mdi-vector-difference-ba": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VectorDifferenceBaIcon" */
            "mdi-react/VectorDifferenceBaIcon"
        ),
    ),
    "mdi-vector-difference": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VectorDifferenceIcon" */
            "mdi-react/VectorDifferenceIcon"
        ),
    ),
    "mdi-vector-ellipse": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VectorEllipseIcon" */
            "mdi-react/VectorEllipseIcon"
        ),
    ),
    "mdi-vector-intersection": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VectorIntersectionIcon" */
            "mdi-react/VectorIntersectionIcon"
        ),
    ),
    "mdi-vector-line": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VectorLineIcon" */
            "mdi-react/VectorLineIcon"
        ),
    ),
    "mdi-vector-point": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VectorPointIcon" */
            "mdi-react/VectorPointIcon"
        ),
    ),
    "mdi-vector-polygon": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VectorPolygonIcon" */
            "mdi-react/VectorPolygonIcon"
        ),
    ),
    "mdi-vector-polyline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VectorPolylineIcon" */
            "mdi-react/VectorPolylineIcon"
        ),
    ),
    "mdi-vector-radius": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VectorRadiusIcon" */
            "mdi-react/VectorRadiusIcon"
        ),
    ),
    "mdi-vector-rectangle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VectorRectangleIcon" */
            "mdi-react/VectorRectangleIcon"
        ),
    ),
    "mdi-vector-selection": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VectorSelectionIcon" */
            "mdi-react/VectorSelectionIcon"
        ),
    ),
    "mdi-vector-square": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VectorSquareIcon" */
            "mdi-react/VectorSquareIcon"
        ),
    ),
    "mdi-vector-triangle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VectorTriangleIcon" */
            "mdi-react/VectorTriangleIcon"
        ),
    ),
    "mdi-vector-union": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VectorUnionIcon" */
            "mdi-react/VectorUnionIcon"
        ),
    ),
    "mdi-venmo": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VenmoIcon" */
            "mdi-react/VenmoIcon"
        ),
    ),
    "mdi-verified": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VerifiedIcon" */
            "mdi-react/VerifiedIcon"
        ),
    ),
    "mdi-vibrate": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VibrateIcon" */
            "mdi-react/VibrateIcon"
        ),
    ),
    "mdi-video-3-d": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Video3dIcon" */
            "mdi-react/Video3dIcon"
        ),
    ),
    "mdi-video-4-k-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Video4kBoxIcon" */
            "mdi-react/Video4kBoxIcon"
        ),
    ),
    "mdi-video-account": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VideoAccountIcon" */
            "mdi-react/VideoAccountIcon"
        ),
    ),
    "mdi-video-image": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VideoImageIcon" */
            "mdi-react/VideoImageIcon"
        ),
    ),
    "mdi-video-input-antenna": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VideoInputAntennaIcon" */
            "mdi-react/VideoInputAntennaIcon"
        ),
    ),
    "mdi-video-input-component": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VideoInputComponentIcon" */
            "mdi-react/VideoInputComponentIcon"
        ),
    ),
    "mdi-video-input-hdmi": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VideoInputHdmiIcon" */
            "mdi-react/VideoInputHdmiIcon"
        ),
    ),
    "mdi-video-input-svideo": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VideoInputSvideoIcon" */
            "mdi-react/VideoInputSvideoIcon"
        ),
    ),
    "mdi-video-minus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VideoMinusIcon" */
            "mdi-react/VideoMinusIcon"
        ),
    ),
    "mdi-video-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VideoOffIcon" */
            "mdi-react/VideoOffIcon"
        ),
    ),
    "mdi-video-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VideoPlusIcon" */
            "mdi-react/VideoPlusIcon"
        ),
    ),
    "mdi-video-stabilization": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VideoStabilizationIcon" */
            "mdi-react/VideoStabilizationIcon"
        ),
    ),
    "mdi-video-switch": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VideoSwitchIcon" */
            "mdi-react/VideoSwitchIcon"
        ),
    ),
    "mdi-video": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VideoIcon" */
            "mdi-react/VideoIcon"
        ),
    ),
    "mdi-view-agenda": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ViewAgendaIcon" */
            "mdi-react/ViewAgendaIcon"
        ),
    ),
    "mdi-view-array": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ViewArrayIcon" */
            "mdi-react/ViewArrayIcon"
        ),
    ),
    "mdi-view-carousel": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ViewCarouselIcon" */
            "mdi-react/ViewCarouselIcon"
        ),
    ),
    "mdi-view-column": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ViewColumnIcon" */
            "mdi-react/ViewColumnIcon"
        ),
    ),
    "mdi-view-dashboard-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ViewDashboardVariantIcon" */
            "mdi-react/ViewDashboardVariantIcon"
        ),
    ),
    "mdi-view-dashboard": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ViewDashboardIcon" */
            "mdi-react/ViewDashboardIcon"
        ),
    ),
    "mdi-view-day": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ViewDayIcon" */
            "mdi-react/ViewDayIcon"
        ),
    ),
    "mdi-view-grid": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ViewGridIcon" */
            "mdi-react/ViewGridIcon"
        ),
    ),
    "mdi-view-headline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ViewHeadlineIcon" */
            "mdi-react/ViewHeadlineIcon"
        ),
    ),
    "mdi-view-list": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ViewListIcon" */
            "mdi-react/ViewListIcon"
        ),
    ),
    "mdi-view-module": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ViewModuleIcon" */
            "mdi-react/ViewModuleIcon"
        ),
    ),
    "mdi-view-parallel": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ViewParallelIcon" */
            "mdi-react/ViewParallelIcon"
        ),
    ),
    "mdi-view-quilt": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ViewQuiltIcon" */
            "mdi-react/ViewQuiltIcon"
        ),
    ),
    "mdi-view-sequential": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ViewSequentialIcon" */
            "mdi-react/ViewSequentialIcon"
        ),
    ),
    "mdi-view-stream": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ViewStreamIcon" */
            "mdi-react/ViewStreamIcon"
        ),
    ),
    "mdi-view-week": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ViewWeekIcon" */
            "mdi-react/ViewWeekIcon"
        ),
    ),
    "mdi-vimeo": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VimeoIcon" */
            "mdi-react/VimeoIcon"
        ),
    ),
    "mdi-violin": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ViolinIcon" */
            "mdi-react/ViolinIcon"
        ),
    ),
    "mdi-virtual-reality": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VirtualRealityIcon" */
            "mdi-react/VirtualRealityIcon"
        ),
    ),
    "mdi-visualstudio": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VisualstudioIcon" */
            "mdi-react/VisualstudioIcon"
        ),
    ),
    "mdi-vk-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VkBoxIcon" */
            "mdi-react/VkBoxIcon"
        ),
    ),
    "mdi-vk-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VkCircleIcon" */
            "mdi-react/VkCircleIcon"
        ),
    ),
    "mdi-vk": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VkIcon" */
            "mdi-react/VkIcon"
        ),
    ),
    "mdi-vlc": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VlcIcon" */
            "mdi-react/VlcIcon"
        ),
    ),
    "mdi-voice": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VoiceIcon" */
            "mdi-react/VoiceIcon"
        ),
    ),
    "mdi-voicemail": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VoicemailIcon" */
            "mdi-react/VoicemailIcon"
        ),
    ),
    "mdi-volleyball": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VolleyballIcon" */
            "mdi-react/VolleyballIcon"
        ),
    ),
    "mdi-volume-high": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VolumeHighIcon" */
            "mdi-react/VolumeHighIcon"
        ),
    ),
    "mdi-volume-low": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VolumeLowIcon" */
            "mdi-react/VolumeLowIcon"
        ),
    ),
    "mdi-volume-medium": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VolumeMediumIcon" */
            "mdi-react/VolumeMediumIcon"
        ),
    ),
    "mdi-volume-minus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VolumeMinusIcon" */
            "mdi-react/VolumeMinusIcon"
        ),
    ),
    "mdi-volume-mute": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VolumeMuteIcon" */
            "mdi-react/VolumeMuteIcon"
        ),
    ),
    "mdi-volume-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VolumeOffIcon" */
            "mdi-react/VolumeOffIcon"
        ),
    ),
    "mdi-volume-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VolumePlusIcon" */
            "mdi-react/VolumePlusIcon"
        ),
    ),
    "mdi-vpn": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VpnIcon" */
            "mdi-react/VpnIcon"
        ),
    ),
    "mdi-vuejs": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VuejsIcon" */
            "mdi-react/VuejsIcon"
        ),
    ),
    "mdi-walk": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WalkIcon" */
            "mdi-react/WalkIcon"
        ),
    ),
    "mdi-wall-sconce-flat": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WallSconceFlatIcon" */
            "mdi-react/WallSconceFlatIcon"
        ),
    ),
    "mdi-wall-sconce-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WallSconceVariantIcon" */
            "mdi-react/WallSconceVariantIcon"
        ),
    ),
    "mdi-wall-sconce": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WallSconceIcon" */
            "mdi-react/WallSconceIcon"
        ),
    ),
    "mdi-wall": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WallIcon" */
            "mdi-react/WallIcon"
        ),
    ),
    "mdi-wallet-giftcard": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WalletGiftcardIcon" */
            "mdi-react/WalletGiftcardIcon"
        ),
    ),
    "mdi-wallet-membership": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WalletMembershipIcon" */
            "mdi-react/WalletMembershipIcon"
        ),
    ),
    "mdi-wallet-travel": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WalletTravelIcon" */
            "mdi-react/WalletTravelIcon"
        ),
    ),
    "mdi-wallet": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WalletIcon" */
            "mdi-react/WalletIcon"
        ),
    ),
    "mdi-wan": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WanIcon" */
            "mdi-react/WanIcon"
        ),
    ),
    "mdi-washing-machine": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WashingMachineIcon" */
            "mdi-react/WashingMachineIcon"
        ),
    ),
    "mdi-watch-export-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WatchExportVariantIcon" */
            "mdi-react/WatchExportVariantIcon"
        ),
    ),
    "mdi-watch-export": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WatchExportIcon" */
            "mdi-react/WatchExportIcon"
        ),
    ),
    "mdi-watch-import-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WatchImportVariantIcon" */
            "mdi-react/WatchImportVariantIcon"
        ),
    ),
    "mdi-watch-import": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WatchImportIcon" */
            "mdi-react/WatchImportIcon"
        ),
    ),
    "mdi-watch-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WatchVariantIcon" */
            "mdi-react/WatchVariantIcon"
        ),
    ),
    "mdi-watch-vibrate": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WatchVibrateIcon" */
            "mdi-react/WatchVibrateIcon"
        ),
    ),
    "mdi-watch": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WatchIcon" */
            "mdi-react/WatchIcon"
        ),
    ),
    "mdi-water-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WaterOffIcon" */
            "mdi-react/WaterOffIcon"
        ),
    ),
    "mdi-water-percent": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WaterPercentIcon" */
            "mdi-react/WaterPercentIcon"
        ),
    ),
    "mdi-water-pump": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WaterPumpIcon" */
            "mdi-react/WaterPumpIcon"
        ),
    ),
    "mdi-water": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WaterIcon" */
            "mdi-react/WaterIcon"
        ),
    ),
    "mdi-watermark": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WatermarkIcon" */
            "mdi-react/WatermarkIcon"
        ),
    ),
    "mdi-waves": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WavesIcon" */
            "mdi-react/WavesIcon"
        ),
    ),
    "mdi-weather-cloudy": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WeatherCloudyIcon" */
            "mdi-react/WeatherCloudyIcon"
        ),
    ),
    "mdi-weather-fog": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WeatherFogIcon" */
            "mdi-react/WeatherFogIcon"
        ),
    ),
    "mdi-weather-hail": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WeatherHailIcon" */
            "mdi-react/WeatherHailIcon"
        ),
    ),
    "mdi-weather-hurricane": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WeatherHurricaneIcon" */
            "mdi-react/WeatherHurricaneIcon"
        ),
    ),
    "mdi-weather-lightning-rainy": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WeatherLightningRainyIcon" */
            "mdi-react/WeatherLightningRainyIcon"
        ),
    ),
    "mdi-weather-lightning": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WeatherLightningIcon" */
            "mdi-react/WeatherLightningIcon"
        ),
    ),
    "mdi-weather-night": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WeatherNightIcon" */
            "mdi-react/WeatherNightIcon"
        ),
    ),
    "mdi-weather-partlycloudy": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WeatherPartlycloudyIcon" */
            "mdi-react/WeatherPartlycloudyIcon"
        ),
    ),
    "mdi-weather-pouring": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WeatherPouringIcon" */
            "mdi-react/WeatherPouringIcon"
        ),
    ),
    "mdi-weather-rainy": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WeatherRainyIcon" */
            "mdi-react/WeatherRainyIcon"
        ),
    ),
    "mdi-weather-snowy-rainy": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WeatherSnowyRainyIcon" */
            "mdi-react/WeatherSnowyRainyIcon"
        ),
    ),
    "mdi-weather-snowy": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WeatherSnowyIcon" */
            "mdi-react/WeatherSnowyIcon"
        ),
    ),
    "mdi-weather-sunny": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WeatherSunnyIcon" */
            "mdi-react/WeatherSunnyIcon"
        ),
    ),
    "mdi-weather-sunset-down": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WeatherSunsetDownIcon" */
            "mdi-react/WeatherSunsetDownIcon"
        ),
    ),
    "mdi-weather-sunset-up": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WeatherSunsetUpIcon" */
            "mdi-react/WeatherSunsetUpIcon"
        ),
    ),
    "mdi-weather-sunset": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WeatherSunsetIcon" */
            "mdi-react/WeatherSunsetIcon"
        ),
    ),
    "mdi-weather-windy-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WeatherWindyVariantIcon" */
            "mdi-react/WeatherWindyVariantIcon"
        ),
    ),
    "mdi-weather-windy": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WeatherWindyIcon" */
            "mdi-react/WeatherWindyIcon"
        ),
    ),
    "mdi-web": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WebIcon" */
            "mdi-react/WebIcon"
        ),
    ),
    "mdi-webcam": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WebcamIcon" */
            "mdi-react/WebcamIcon"
        ),
    ),
    "mdi-webhook": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WebhookIcon" */
            "mdi-react/WebhookIcon"
        ),
    ),
    "mdi-webpack": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WebpackIcon" */
            "mdi-react/WebpackIcon"
        ),
    ),
    "mdi-wechat": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WechatIcon" */
            "mdi-react/WechatIcon"
        ),
    ),
    "mdi-weight-kilogram": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WeightKilogramIcon" */
            "mdi-react/WeightKilogramIcon"
        ),
    ),
    "mdi-weight-pound": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WeightPoundIcon" */
            "mdi-react/WeightPoundIcon"
        ),
    ),
    "mdi-weight": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WeightIcon" */
            "mdi-react/WeightIcon"
        ),
    ),
    "mdi-whatsapp": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WhatsappIcon" */
            "mdi-react/WhatsappIcon"
        ),
    ),
    "mdi-wheelchair-accessibility": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WheelchairAccessibilityIcon" */
            "mdi-react/WheelchairAccessibilityIcon"
        ),
    ),
    "mdi-whistle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WhistleIcon" */
            "mdi-react/WhistleIcon"
        ),
    ),
    "mdi-white-balance-auto": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WhiteBalanceAutoIcon" */
            "mdi-react/WhiteBalanceAutoIcon"
        ),
    ),
    "mdi-white-balance-incandescent": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WhiteBalanceIncandescentIcon" */
            "mdi-react/WhiteBalanceIncandescentIcon"
        ),
    ),
    "mdi-white-balance-iridescent": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WhiteBalanceIridescentIcon" */
            "mdi-react/WhiteBalanceIridescentIcon"
        ),
    ),
    "mdi-white-balance-sunny": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WhiteBalanceSunnyIcon" */
            "mdi-react/WhiteBalanceSunnyIcon"
        ),
    ),
    "mdi-widgets": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WidgetsIcon" */
            "mdi-react/WidgetsIcon"
        ),
    ),
    "mdi-wifi-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WifiOffIcon" */
            "mdi-react/WifiOffIcon"
        ),
    ),
    "mdi-wifi-strength-1-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WifiStrength1AlertIcon" */
            "mdi-react/WifiStrength1AlertIcon"
        ),
    ),
    "mdi-wifi-strength-1-lock": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WifiStrength1LockIcon" */
            "mdi-react/WifiStrength1LockIcon"
        ),
    ),
    "mdi-wifi-strength-1": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WifiStrength1Icon" */
            "mdi-react/WifiStrength1Icon"
        ),
    ),
    "mdi-wifi-strength-2-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WifiStrength2AlertIcon" */
            "mdi-react/WifiStrength2AlertIcon"
        ),
    ),
    "mdi-wifi-strength-2-lock": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WifiStrength2LockIcon" */
            "mdi-react/WifiStrength2LockIcon"
        ),
    ),
    "mdi-wifi-strength-2": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WifiStrength2Icon" */
            "mdi-react/WifiStrength2Icon"
        ),
    ),
    "mdi-wifi-strength-3-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WifiStrength3AlertIcon" */
            "mdi-react/WifiStrength3AlertIcon"
        ),
    ),
    "mdi-wifi-strength-3-lock": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WifiStrength3LockIcon" */
            "mdi-react/WifiStrength3LockIcon"
        ),
    ),
    "mdi-wifi-strength-3": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WifiStrength3Icon" */
            "mdi-react/WifiStrength3Icon"
        ),
    ),
    "mdi-wifi-strength-4-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WifiStrength4AlertIcon" */
            "mdi-react/WifiStrength4AlertIcon"
        ),
    ),
    "mdi-wifi-strength-4-lock": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WifiStrength4LockIcon" */
            "mdi-react/WifiStrength4LockIcon"
        ),
    ),
    "mdi-wifi-strength-4": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WifiStrength4Icon" */
            "mdi-react/WifiStrength4Icon"
        ),
    ),
    "mdi-wifi-strength-alert-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WifiStrengthAlertOutlineIcon" */
            "mdi-react/WifiStrengthAlertOutlineIcon"
        ),
    ),
    "mdi-wifi-strength-lock-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WifiStrengthLockOutlineIcon" */
            "mdi-react/WifiStrengthLockOutlineIcon"
        ),
    ),
    "mdi-wifi-strength-off-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WifiStrengthOffOutlineIcon" */
            "mdi-react/WifiStrengthOffOutlineIcon"
        ),
    ),
    "mdi-wifi-strength-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WifiStrengthOffIcon" */
            "mdi-react/WifiStrengthOffIcon"
        ),
    ),
    "mdi-wifi-strength-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WifiStrengthOutlineIcon" */
            "mdi-react/WifiStrengthOutlineIcon"
        ),
    ),
    "mdi-wifi": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WifiIcon" */
            "mdi-react/WifiIcon"
        ),
    ),
    "mdi-wii": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WiiIcon" */
            "mdi-react/WiiIcon"
        ),
    ),
    "mdi-wiiu": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WiiuIcon" */
            "mdi-react/WiiuIcon"
        ),
    ),
    "mdi-wikipedia": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WikipediaIcon" */
            "mdi-react/WikipediaIcon"
        ),
    ),
    "mdi-window-close": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WindowCloseIcon" */
            "mdi-react/WindowCloseIcon"
        ),
    ),
    "mdi-window-closed": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WindowClosedIcon" */
            "mdi-react/WindowClosedIcon"
        ),
    ),
    "mdi-window-maximize": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WindowMaximizeIcon" */
            "mdi-react/WindowMaximizeIcon"
        ),
    ),
    "mdi-window-minimize": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WindowMinimizeIcon" */
            "mdi-react/WindowMinimizeIcon"
        ),
    ),
    "mdi-window-open": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WindowOpenIcon" */
            "mdi-react/WindowOpenIcon"
        ),
    ),
    "mdi-window-restore": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WindowRestoreIcon" */
            "mdi-react/WindowRestoreIcon"
        ),
    ),
    "mdi-windows": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WindowsIcon" */
            "mdi-react/WindowsIcon"
        ),
    ),
    "mdi-wordpress": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WordpressIcon" */
            "mdi-react/WordpressIcon"
        ),
    ),
    "mdi-worker": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WorkerIcon" */
            "mdi-react/WorkerIcon"
        ),
    ),
    "mdi-wrap": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WrapIcon" */
            "mdi-react/WrapIcon"
        ),
    ),
    "mdi-wrench": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WrenchIcon" */
            "mdi-react/WrenchIcon"
        ),
    ),
    "mdi-wunderlist": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WunderlistIcon" */
            "mdi-react/WunderlistIcon"
        ),
    ),
    "mdi-xamarin-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/XamarinOutlineIcon" */
            "mdi-react/XamarinOutlineIcon"
        ),
    ),
    "mdi-xamarin": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/XamarinIcon" */
            "mdi-react/XamarinIcon"
        ),
    ),
    "mdi-xaml": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/XamlIcon" */
            "mdi-react/XamlIcon"
        ),
    ),
    "mdi-xbox-controller-battery-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/XboxControllerBatteryAlertIcon" */
            "mdi-react/XboxControllerBatteryAlertIcon"
        ),
    ),
    "mdi-xbox-controller-battery-empty": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/XboxControllerBatteryEmptyIcon" */
            "mdi-react/XboxControllerBatteryEmptyIcon"
        ),
    ),
    "mdi-xbox-controller-battery-full": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/XboxControllerBatteryFullIcon" */
            "mdi-react/XboxControllerBatteryFullIcon"
        ),
    ),
    "mdi-xbox-controller-battery-low": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/XboxControllerBatteryLowIcon" */
            "mdi-react/XboxControllerBatteryLowIcon"
        ),
    ),
    "mdi-xbox-controller-battery-medium": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/XboxControllerBatteryMediumIcon" */
            "mdi-react/XboxControllerBatteryMediumIcon"
        ),
    ),
    "mdi-xbox-controller-battery-unknown": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/XboxControllerBatteryUnknownIcon" */
            "mdi-react/XboxControllerBatteryUnknownIcon"
        ),
    ),
    "mdi-xbox-controller-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/XboxControllerOffIcon" */
            "mdi-react/XboxControllerOffIcon"
        ),
    ),
    "mdi-xbox-controller": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/XboxControllerIcon" */
            "mdi-react/XboxControllerIcon"
        ),
    ),
    "mdi-xbox": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/XboxIcon" */
            "mdi-react/XboxIcon"
        ),
    ),
    "mdi-xda": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/XdaIcon" */
            "mdi-react/XdaIcon"
        ),
    ),
    "mdi-xing-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/XingBoxIcon" */
            "mdi-react/XingBoxIcon"
        ),
    ),
    "mdi-xing-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/XingCircleIcon" */
            "mdi-react/XingCircleIcon"
        ),
    ),
    "mdi-xing": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/XingIcon" */
            "mdi-react/XingIcon"
        ),
    ),
    "mdi-xml": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/XmlIcon" */
            "mdi-react/XmlIcon"
        ),
    ),
    "mdi-xmpp": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/XmppIcon" */
            "mdi-react/XmppIcon"
        ),
    ),
    "mdi-yammer": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/YammerIcon" */
            "mdi-react/YammerIcon"
        ),
    ),
    "mdi-yeast": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/YeastIcon" */
            "mdi-react/YeastIcon"
        ),
    ),
    "mdi-yelp": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/YelpIcon" */
            "mdi-react/YelpIcon"
        ),
    ),
    "mdi-yin-yang": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/YinYangIcon" */
            "mdi-react/YinYangIcon"
        ),
    ),
    "mdi-youtube-creator-studio": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/YoutubeCreatorStudioIcon" */
            "mdi-react/YoutubeCreatorStudioIcon"
        ),
    ),
    "mdi-youtube-gaming": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/YoutubeGamingIcon" */
            "mdi-react/YoutubeGamingIcon"
        ),
    ),
    "mdi-youtube-tv": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/YoutubeTvIcon" */
            "mdi-react/YoutubeTvIcon"
        ),
    ),
    "mdi-youtube": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/YoutubeIcon" */
            "mdi-react/YoutubeIcon"
        ),
    ),
    "mdi-zip-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ZipBoxIcon" */
            "mdi-react/ZipBoxIcon"
        ),
    ),
    "mdi-user-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UserBoxIcon" */
            "mdi-react/UserBoxIcon"
        ),
    ),
    "mdi-identification-card": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/IdentificationCardIcon" */
            "mdi-react/IdentificationCardIcon"
        ),
    ),
    "mdi-user-card-details": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UserCardDetailsIcon" */
            "mdi-react/UserCardDetailsIcon"
        ),
    ),
    "mdi-user-check": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UserCheckIcon" */
            "mdi-react/UserCheckIcon"
        ),
    ),
    "mdi-user-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UserCircleIcon" */
            "mdi-react/UserCircleIcon"
        ),
    ),
    "mdi-user-convert": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UserConvertIcon" */
            "mdi-react/UserConvertIcon"
        ),
    ),
    "mdi-user-edit": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UserEditIcon" */
            "mdi-react/UserEditIcon"
        ),
    ),
    "mdi-user-group": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UserGroupIcon" */
            "mdi-react/UserGroupIcon"
        ),
    ),
    "mdi-user-heart": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UserHeartIcon" */
            "mdi-react/UserHeartIcon"
        ),
    ),
    "mdi-user-key": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UserKeyIcon" */
            "mdi-react/UserKeyIcon"
        ),
    ),
    "mdi-user-address": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UserAddressIcon" */
            "mdi-react/UserAddressIcon"
        ),
    ),
    "mdi-account-address": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AccountAddressIcon" */
            "mdi-react/AccountAddressIcon"
        ),
    ),
    "mdi-user-location": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UserLocationIcon" */
            "mdi-react/UserLocationIcon"
        ),
    ),
    "mdi-user-minus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UserMinusIcon" */
            "mdi-react/UserMinusIcon"
        ),
    ),
    "mdi-user-multiple-check": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UserMultipleCheckIcon" */
            "mdi-react/UserMultipleCheckIcon"
        ),
    ),
    "mdi-user-multiple-minus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UserMultipleMinusIcon" */
            "mdi-react/UserMultipleMinusIcon"
        ),
    ),
    "mdi-user-multiple-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UserMultipleOutlineIcon" */
            "mdi-react/UserMultipleOutlineIcon"
        ),
    ),
    "mdi-people-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PeopleOutlineIcon" */
            "mdi-react/PeopleOutlineIcon"
        ),
    ),
    "mdi-group-add-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GroupAddOutlineIcon" */
            "mdi-react/GroupAddOutlineIcon"
        ),
    ),
    "mdi-user-multiple-plus-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UserMultiplePlusOutlineIcon" */
            "mdi-react/UserMultiplePlusOutlineIcon"
        ),
    ),
    "mdi-user-multiple-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UserMultiplePlusIcon" */
            "mdi-react/UserMultiplePlusIcon"
        ),
    ),
    "mdi-group-add": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GroupAddIcon" */
            "mdi-react/GroupAddIcon"
        ),
    ),
    "mdi-people": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PeopleIcon" */
            "mdi-react/PeopleIcon"
        ),
    ),
    "mdi-user-multiple": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UserMultipleIcon" */
            "mdi-react/UserMultipleIcon"
        ),
    ),
    "mdi-user-network": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UserNetworkIcon" */
            "mdi-react/UserNetworkIcon"
        ),
    ),
    "mdi-user-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UserOffIcon" */
            "mdi-react/UserOffIcon"
        ),
    ),
    "mdi-user-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UserOutlineIcon" */
            "mdi-react/UserOutlineIcon"
        ),
    ),
    "mdi-perm-identity": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PermIdentityIcon" */
            "mdi-react/PermIdentityIcon"
        ),
    ),
    "mdi-person-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PersonOutlineIcon" */
            "mdi-react/PersonOutlineIcon"
        ),
    ),
    "mdi-person-add-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PersonAddOutlineIcon" */
            "mdi-react/PersonAddOutlineIcon"
        ),
    ),
    "mdi-register-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RegisterOutlineIcon" */
            "mdi-react/RegisterOutlineIcon"
        ),
    ),
    "mdi-user-plus-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UserPlusOutlineIcon" */
            "mdi-react/UserPlusOutlineIcon"
        ),
    ),
    "mdi-register": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RegisterIcon" */
            "mdi-react/RegisterIcon"
        ),
    ),
    "mdi-user-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UserPlusIcon" */
            "mdi-react/UserPlusIcon"
        ),
    ),
    "mdi-person-add": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PersonAddIcon" */
            "mdi-react/PersonAddIcon"
        ),
    ),
    "mdi-user-remove": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UserRemoveIcon" */
            "mdi-react/UserRemoveIcon"
        ),
    ),
    "mdi-user-search-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UserSearchOutlineIcon" */
            "mdi-react/UserSearchOutlineIcon"
        ),
    ),
    "mdi-user-search": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UserSearchIcon" */
            "mdi-react/UserSearchIcon"
        ),
    ),
    "mdi-user-settings-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UserSettingsVariantIcon" */
            "mdi-react/UserSettingsVariantIcon"
        ),
    ),
    "mdi-user-settings": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UserSettingsIcon" */
            "mdi-react/UserSettingsIcon"
        ),
    ),
    "mdi-user-star": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UserStarIcon" */
            "mdi-react/UserStarIcon"
        ),
    ),
    "mdi-user-switch": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UserSwitchIcon" */
            "mdi-react/UserSwitchIcon"
        ),
    ),
    "mdi-person": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PersonIcon" */
            "mdi-react/PersonIcon"
        ),
    ),
    "mdi-user": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UserIcon" */
            "mdi-react/UserIcon"
        ),
    ),
    "mdi-ac-unit": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AcUnitIcon" */
            "mdi-react/AcUnitIcon"
        ),
    ),
    "mdi-hot-air-balloon": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HotAirBalloonIcon" */
            "mdi-react/HotAirBalloonIcon"
        ),
    ),
    "mdi-aeroplane-landing": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AeroplaneLandingIcon" */
            "mdi-react/AeroplaneLandingIcon"
        ),
    ),
    "mdi-flight-land": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FlightLandIcon" */
            "mdi-react/FlightLandIcon"
        ),
    ),
    "mdi-aeroplane-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AeroplaneOffIcon" */
            "mdi-react/AeroplaneOffIcon"
        ),
    ),
    "mdi-airplanemode-inactive": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AirplanemodeInactiveIcon" */
            "mdi-react/AirplanemodeInactiveIcon"
        ),
    ),
    "mdi-aeroplane-takeoff": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AeroplaneTakeoffIcon" */
            "mdi-react/AeroplaneTakeoffIcon"
        ),
    ),
    "mdi-flight-takeoff": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FlightTakeoffIcon" */
            "mdi-react/FlightTakeoffIcon"
        ),
    ),
    "mdi-aeroplane": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AeroplaneIcon" */
            "mdi-react/AeroplaneIcon"
        ),
    ),
    "mdi-airplanemode-active": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AirplanemodeActiveIcon" */
            "mdi-react/AirplanemodeActiveIcon"
        ),
    ),
    "mdi-flight": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FlightIcon" */
            "mdi-react/FlightIcon"
        ),
    ),
    "mdi-local-airport": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LocalAirportIcon" */
            "mdi-react/LocalAirportIcon"
        ),
    ),
    "mdi-alarm-on": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AlarmOnIcon" */
            "mdi-react/AlarmOnIcon"
        ),
    ),
    "mdi-add-alarm": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AddAlarmIcon" */
            "mdi-react/AddAlarmIcon"
        ),
    ),
    "mdi-access-alarms": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AccessAlarmsIcon" */
            "mdi-react/AccessAlarmsIcon"
        ),
    ),
    "mdi-vinyl": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VinylIcon" */
            "mdi-react/VinylIcon"
        ),
    ),
    "mdi-warning-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WarningBoxIcon" */
            "mdi-react/WarningBoxIcon"
        ),
    ),
    "mdi-warning-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WarningCircleOutlineIcon" */
            "mdi-react/WarningCircleOutlineIcon"
        ),
    ),
    "mdi-error-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ErrorOutlineIcon" */
            "mdi-react/ErrorOutlineIcon"
        ),
    ),
    "mdi-warning-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WarningCircleIcon" */
            "mdi-react/WarningCircleIcon"
        ),
    ),
    "mdi-error": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ErrorIcon" */
            "mdi-react/ErrorIcon"
        ),
    ),
    "mdi-new-releases": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NewReleasesIcon" */
            "mdi-react/NewReleasesIcon"
        ),
    ),
    "mdi-warning-decagram": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WarningDecagramIcon" */
            "mdi-react/WarningDecagramIcon"
        ),
    ),
    "mdi-warning-octagon": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WarningOctagonIcon" */
            "mdi-react/WarningOctagonIcon"
        ),
    ),
    "mdi-report": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ReportIcon" */
            "mdi-react/ReportIcon"
        ),
    ),
    "mdi-warning-octagram": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WarningOctagramIcon" */
            "mdi-react/WarningOctagramIcon"
        ),
    ),
    "mdi-warning-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WarningOutlineIcon" */
            "mdi-react/WarningOutlineIcon"
        ),
    ),
    "mdi-warning": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WarningIcon" */
            "mdi-react/WarningIcon"
        ),
    ),
    "mdi-report-problem": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ReportProblemIcon" */
            "mdi-react/ReportProblemIcon"
        ),
    ),
    "mdi-amazon-clouddrive": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AmazonClouddriveIcon" */
            "mdi-react/AmazonClouddriveIcon"
        ),
    ),
    "mdi-adb": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AdbIcon" */
            "mdi-react/AdbIcon"
        ),
    ),
    "mdi-math-compass-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MathCompassVariantIcon" */
            "mdi-react/MathCompassVariantIcon"
        ),
    ),
    "mdi-auto-awesome-motion": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AutoAwesomeMotionIcon" */
            "mdi-react/AutoAwesomeMotionIcon"
        ),
    ),
    "mdi-apple-mobileme": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AppleMobilemeIcon" */
            "mdi-react/AppleMobilemeIcon"
        ),
    ),
    "mdi-web-asset": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WebAssetIcon" */
            "mdi-react/WebAssetIcon"
        ),
    ),
    "mdi-decagram-check": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DecagramCheckIcon" */
            "mdi-react/DecagramCheckIcon"
        ),
    ),
    "mdi-approve": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ApproveIcon" */
            "mdi-react/ApproveIcon"
        ),
    ),
    "mdi-arrow-compress-all": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowCompressAllIcon" */
            "mdi-react/ArrowCompressAllIcon"
        ),
    ),
    "mdi-arrow-compress-down": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowCompressDownIcon" */
            "mdi-react/ArrowCompressDownIcon"
        ),
    ),
    "mdi-arrow-compress-left": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowCompressLeftIcon" */
            "mdi-react/ArrowCompressLeftIcon"
        ),
    ),
    "mdi-arrow-compress-right": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowCompressRightIcon" */
            "mdi-react/ArrowCompressRightIcon"
        ),
    ),
    "mdi-arrow-compress-up": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowCompressUpIcon" */
            "mdi-react/ArrowCompressUpIcon"
        ),
    ),
    "mdi-arrow-compress": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowCompressIcon" */
            "mdi-react/ArrowCompressIcon"
        ),
    ),
    "mdi-arrow-drop-down-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowDropDownCircleIcon" */
            "mdi-react/ArrowDropDownCircleIcon"
        ),
    ),
    "mdi-arrow-downward": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowDownwardIcon" */
            "mdi-react/ArrowDownwardIcon"
        ),
    ),
    "mdi-arrow-back": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowBackIcon" */
            "mdi-react/ArrowBackIcon"
        ),
    ),
    "mdi-arrow-forward": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowForwardIcon" */
            "mdi-react/ArrowForwardIcon"
        ),
    ),
    "mdi-arrow-upward": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowUpwardIcon" */
            "mdi-react/ArrowUpwardIcon"
        ),
    ),
    "mdi-alternate-email": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AlternateEmailIcon" */
            "mdi-react/AlternateEmailIcon"
        ),
    ),
    "mdi-paperclip-horizontal": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PaperclipHorizontalIcon" */
            "mdi-react/PaperclipHorizontalIcon"
        ),
    ),
    "mdi-magic": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MagicIcon" */
            "mdi-react/MagicIcon"
        ),
    ),
    "mdi-wand": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WandIcon" */
            "mdi-react/WandIcon"
        ),
    ),
    "mdi-auto-fix-high": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AutoFixHighIcon" */
            "mdi-react/AutoFixHighIcon"
        ),
    ),
    "mdi-child-friendly": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ChildFriendlyIcon" */
            "mdi-react/ChildFriendlyIcon"
        ),
    ),
    "mdi-hamburger-menu-back": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HamburgerMenuBackIcon" */
            "mdi-react/HamburgerMenuBackIcon"
        ),
    ),
    "mdi-settings-backup-restore": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SettingsBackupRestoreIcon" */
            "mdi-react/SettingsBackupRestoreIcon"
        ),
    ),
    "mdi-shuttlecock": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ShuttlecockIcon" */
            "mdi-react/ShuttlecockIcon"
        ),
    ),
    "mdi-account-balance": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AccountBalanceIcon" */
            "mdi-react/AccountBalanceIcon"
        ),
    ),
    "mdi-barcode-scanner": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BarcodeScannerIcon" */
            "mdi-react/BarcodeScannerIcon"
        ),
    ),
    "mdi-grain": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GrainIcon" */
            "mdi-react/GrainIcon"
        ),
    ),
    "mdi-shopping-basket": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ShoppingBasketIcon" */
            "mdi-react/ShoppingBasketIcon"
        ),
    ),
    "mdi-youtube-sports": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/YoutubeSportsIcon" */
            "mdi-react/YoutubeSportsIcon"
        ),
    ),
    "mdi-battery-warning": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BatteryWarningIcon" */
            "mdi-react/BatteryWarningIcon"
        ),
    ),
    "mdi-battery-charging-wireless-warning": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BatteryChargingWirelessWarningIcon" */
            "mdi-react/BatteryChargingWirelessWarningIcon"
        ),
    ),
    "mdi-battery-charging-wireless-empty": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BatteryChargingWirelessEmptyIcon" */
            "mdi-react/BatteryChargingWirelessEmptyIcon"
        ),
    ),
    "mdi-battery-charging-wireless-0": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BatteryChargingWireless0Icon" */
            "mdi-react/BatteryChargingWireless0Icon"
        ),
    ),
    "mdi-battery-charging-wireless-full": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BatteryChargingWirelessFullIcon" */
            "mdi-react/BatteryChargingWirelessFullIcon"
        ),
    ),
    "mdi-battery-charging-wireless-100": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BatteryChargingWireless100Icon" */
            "mdi-react/BatteryChargingWireless100Icon"
        ),
    ),
    "mdi-battery-charging-full": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BatteryChargingFullIcon" */
            "mdi-react/BatteryChargingFullIcon"
        ),
    ),
    "mdi-battery-0": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Battery0Icon" */
            "mdi-react/Battery0Icon"
        ),
    ),
    "mdi-battery-empty": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BatteryEmptyIcon" */
            "mdi-react/BatteryEmptyIcon"
        ),
    ),
    "mdi-battery-saver": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BatterySaverIcon" */
            "mdi-react/BatterySaverIcon"
        ),
    ),
    "mdi-battery-full": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BatteryFullIcon" */
            "mdi-react/BatteryFullIcon"
        ),
    ),
    "mdi-battery-std": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BatteryStdIcon" */
            "mdi-react/BatteryStdIcon"
        ),
    ),
    "mdi-battery-100": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Battery100Icon" */
            "mdi-react/Battery100Icon"
        ),
    ),
    "mdi-parasol": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ParasolIcon" */
            "mdi-react/ParasolIcon"
        ),
    ),
    "mdi-notifications-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NotificationsOffIcon" */
            "mdi-react/NotificationsOffIcon"
        ),
    ),
    "mdi-notifications-none": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NotificationsNoneIcon" */
            "mdi-react/NotificationsNoneIcon"
        ),
    ),
    "mdi-add-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AddAlertIcon" */
            "mdi-react/AddAlertIcon"
        ),
    ),
    "mdi-notifications-active": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NotificationsActiveIcon" */
            "mdi-react/NotificationsActiveIcon"
        ),
    ),
    "mdi-notifications-paused": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NotificationsPausedIcon" */
            "mdi-react/NotificationsPausedIcon"
        ),
    ),
    "mdi-notifications": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NotificationsIcon" */
            "mdi-react/NotificationsIcon"
        ),
    ),
    "mdi-bicycle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BicycleIcon" */
            "mdi-react/BicycleIcon"
        ),
    ),
    "mdi-cycling": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CyclingIcon" */
            "mdi-react/CyclingIcon"
        ),
    ),
    "mdi-directions-bike": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DirectionsBikeIcon" */
            "mdi-react/DirectionsBikeIcon"
        ),
    ),
    "mdi-bluetooth-searching": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BluetoothSearchingIcon" */
            "mdi-react/BluetoothSearchingIcon"
        ),
    ),
    "mdi-bluetooth-connected": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BluetoothConnectedIcon" */
            "mdi-react/BluetoothConnectedIcon"
        ),
    ),
    "mdi-bluetooth-disabled": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BluetoothDisabledIcon" */
            "mdi-react/BluetoothDisabledIcon"
        ),
    ),
    "mdi-settings-bluetooth": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SettingsBluetoothIcon" */
            "mdi-react/SettingsBluetoothIcon"
        ),
    ),
    "mdi-blur-circular": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BlurCircularIcon" */
            "mdi-react/BlurCircularIcon"
        ),
    ),
    "mdi-blur-on": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BlurOnIcon" */
            "mdi-react/BlurOnIcon"
        ),
    ),
    "mdi-auto-stories": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AutoStoriesIcon" */
            "mdi-react/AutoStoriesIcon"
        ),
    ),
    "mdi-import-contacts": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ImportContactsIcon" */
            "mdi-react/ImportContactsIcon"
        ),
    ),
    "mdi-chrome-reader-mode": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ChromeReaderModeIcon" */
            "mdi-react/ChromeReaderModeIcon"
        ),
    ),
    "mdi-class": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ClassIcon" */
            "mdi-react/ClassIcon"
        ),
    ),
    "mdi-bookmark-border": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BookmarkBorderIcon" */
            "mdi-react/BookmarkBorderIcon"
        ),
    ),
    "mdi-turned-in-not": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TurnedInNotIcon" */
            "mdi-react/TurnedInNotIcon"
        ),
    ),
    "mdi-turned-in": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TurnedInIcon" */
            "mdi-react/TurnedInIcon"
        ),
    ),
    "mdi-border-colour": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BorderColourIcon" */
            "mdi-react/BorderColourIcon"
        ),
    ),
    "mdi-border-clear": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BorderClearIcon" */
            "mdi-react/BorderClearIcon"
        ),
    ),
    "mdi-border-outer": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BorderOuterIcon" */
            "mdi-react/BorderOuterIcon"
        ),
    ),
    "mdi-work": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WorkIcon" */
            "mdi-react/WorkIcon"
        ),
    ),
    "mdi-brightness-low": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BrightnessLowIcon" */
            "mdi-react/BrightnessLowIcon"
        ),
    ),
    "mdi-brightness-medium": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BrightnessMediumIcon" */
            "mdi-react/BrightnessMediumIcon"
        ),
    ),
    "mdi-brightness-high": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BrightnessHighIcon" */
            "mdi-react/BrightnessHighIcon"
        ),
    ),
    "mdi-paintbrush": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PaintbrushIcon" */
            "mdi-react/PaintbrushIcon"
        ),
    ),
    "mdi-bug-report": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BugReportIcon" */
            "mdi-react/BugReportIcon"
        ),
    ),
    "mdi-announcement": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AnnouncementIcon" */
            "mdi-react/AnnouncementIcon"
        ),
    ),
    "mdi-megaphone": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MegaphoneIcon" */
            "mdi-react/MegaphoneIcon"
        ),
    ),
    "mdi-target-arrow": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TargetArrowIcon" */
            "mdi-react/TargetArrowIcon"
        ),
    ),
    "mdi-departure-board": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DepartureBoardIcon" */
            "mdi-react/DepartureBoardIcon"
        ),
    ),
    "mdi-directions-bus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DirectionsBusIcon" */
            "mdi-react/DirectionsBusIcon"
        ),
    ),
    "mdi-event-available": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EventAvailableIcon" */
            "mdi-react/EventAvailableIcon"
        ),
    ),
    "mdi-calendar-task": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CalendarTaskIcon" */
            "mdi-react/CalendarTaskIcon"
        ),
    ),
    "mdi-event-clock": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EventClockIcon" */
            "mdi-react/EventClockIcon"
        ),
    ),
    "mdi-event-time": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EventTimeIcon" */
            "mdi-react/EventTimeIcon"
        ),
    ),
    "mdi-calendar-time": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CalendarTimeIcon" */
            "mdi-react/CalendarTimeIcon"
        ),
    ),
    "mdi-event-edit": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EventEditIcon" */
            "mdi-react/EventEditIcon"
        ),
    ),
    "mdi-event-multiple-check": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EventMultipleCheckIcon" */
            "mdi-react/EventMultipleCheckIcon"
        ),
    ),
    "mdi-event-multiple": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EventMultipleIcon" */
            "mdi-react/EventMultipleIcon"
        ),
    ),
    "mdi-event-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EventPlusIcon" */
            "mdi-react/EventPlusIcon"
        ),
    ),
    "mdi-calendar-rsvp": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CalendarRsvpIcon" */
            "mdi-react/CalendarRsvpIcon"
        ),
    ),
    "mdi-event-question": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EventQuestionIcon" */
            "mdi-react/EventQuestionIcon"
        ),
    ),
    "mdi-date-range": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DateRangeIcon" */
            "mdi-react/DateRangeIcon"
        ),
    ),
    "mdi-calendar-week": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CalendarWeekIcon" */
            "mdi-react/CalendarWeekIcon"
        ),
    ),
    "mdi-event-range": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EventRangeIcon" */
            "mdi-react/EventRangeIcon"
        ),
    ),
    "mdi-event-busy": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EventBusyIcon" */
            "mdi-react/EventBusyIcon"
        ),
    ),
    "mdi-event-note": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EventNoteIcon" */
            "mdi-react/EventNoteIcon"
        ),
    ),
    "mdi-calendar-day": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CalendarDayIcon" */
            "mdi-react/CalendarDayIcon"
        ),
    ),
    "mdi-event": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EventIcon" */
            "mdi-react/EventIcon"
        ),
    ),
    "mdi-insert-invitation": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/InsertInvitationIcon" */
            "mdi-react/InsertInvitationIcon"
        ),
    ),
    "mdi-merge-type": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MergeTypeIcon" */
            "mdi-react/MergeTypeIcon"
        ),
    ),
    "mdi-camera-user": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CameraUserIcon" */
            "mdi-react/CameraUserIcon"
        ),
    ),
    "mdi-burst-mode": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BurstModeIcon" */
            "mdi-react/BurstModeIcon"
        ),
    ),
    "mdi-camera-metering-centre": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CameraMeteringCentreIcon" */
            "mdi-react/CameraMeteringCentreIcon"
        ),
    ),
    "mdi-switch-camera": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SwitchCameraIcon" */
            "mdi-react/SwitchCameraIcon"
        ),
    ),
    "mdi-photography": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PhotographyIcon" */
            "mdi-react/PhotographyIcon"
        ),
    ),
    "mdi-camera-alt": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CameraAltIcon" */
            "mdi-react/CameraAltIcon"
        ),
    ),
    "mdi-local-see": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LocalSeeIcon" */
            "mdi-react/LocalSeeIcon"
        ),
    ),
    "mdi-photo-camera": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PhotoCameraIcon" */
            "mdi-react/PhotoCameraIcon"
        ),
    ),
    "mdi-prohibited": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ProhibitedIcon" */
            "mdi-react/ProhibitedIcon"
        ),
    ),
    "mdi-ban": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BanIcon" */
            "mdi-react/BanIcon"
        ),
    ),
    "mdi-do-not-disturb-alt": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DoNotDisturbAltIcon" */
            "mdi-react/DoNotDisturbAltIcon"
        ),
    ),
    "mdi-local-car-wash": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LocalCarWashIcon" */
            "mdi-react/LocalCarWashIcon"
        ),
    ),
    "mdi-directions-car": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DirectionsCarIcon" */
            "mdi-react/DirectionsCarIcon"
        ),
    ),
    "mdi-drive-eta": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DriveEtaIcon" */
            "mdi-react/DriveEtaIcon"
        ),
    ),
    "mdi-time-to-leave": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TimeToLeaveIcon" */
            "mdi-react/TimeToLeaveIcon"
        ),
    ),
    "mdi-suit-clubs": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SuitClubsIcon" */
            "mdi-react/SuitClubsIcon"
        ),
    ),
    "mdi-suit-diamonds": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SuitDiamondsIcon" */
            "mdi-react/SuitDiamondsIcon"
        ),
    ),
    "mdi-suit-hearts": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SuitHeartsIcon" */
            "mdi-react/SuitHeartsIcon"
        ),
    ),
    "mdi-suit-spades": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SuitSpadesIcon" */
            "mdi-react/SuitSpadesIcon"
        ),
    ),
    "mdi-trolley-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TrolleyOffIcon" */
            "mdi-react/TrolleyOffIcon"
        ),
    ),
    "mdi-remove-shopping-cart": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RemoveShoppingCartIcon" */
            "mdi-react/RemoveShoppingCartIcon"
        ),
    ),
    "mdi-trolley-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TrolleyOutlineIcon" */
            "mdi-react/TrolleyOutlineIcon"
        ),
    ),
    "mdi-trolley-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TrolleyPlusIcon" */
            "mdi-react/TrolleyPlusIcon"
        ),
    ),
    "mdi-add-shopping-cart": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AddShoppingCartIcon" */
            "mdi-react/AddShoppingCartIcon"
        ),
    ),
    "mdi-trolley": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TrolleyIcon" */
            "mdi-react/TrolleyIcon"
        ),
    ),
    "mdi-local-grocery-store": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LocalGroceryStoreIcon" */
            "mdi-react/LocalGroceryStoreIcon"
        ),
    ),
    "mdi-shopping-cart": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ShoppingCartIcon" */
            "mdi-react/ShoppingCartIcon"
        ),
    ),
    "mdi-local-atm": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LocalAtmIcon" */
            "mdi-react/LocalAtmIcon"
        ),
    ),
    "mdi-closed-circuit-television": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ClosedCircuitTelevisionIcon" */
            "mdi-react/ClosedCircuitTelevisionIcon"
        ),
    ),
    "mdi-security-camera": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SecurityCameraIcon" */
            "mdi-react/SecurityCameraIcon"
        ),
    ),
    "mdi-mobile-phone-android": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MobilePhoneAndroidIcon" */
            "mdi-react/MobilePhoneAndroidIcon"
        ),
    ),
    "mdi-smartphone-android": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SmartphoneAndroidIcon" */
            "mdi-react/SmartphoneAndroidIcon"
        ),
    ),
    "mdi-mobile-phone-basic": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MobilePhoneBasicIcon" */
            "mdi-react/MobilePhoneBasicIcon"
        ),
    ),
    "mdi-mobile-phone-dock": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MobilePhoneDockIcon" */
            "mdi-react/MobilePhoneDockIcon"
        ),
    ),
    "mdi-smartphone-dock": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SmartphoneDockIcon" */
            "mdi-react/SmartphoneDockIcon"
        ),
    ),
    "mdi-phonelink-erase": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PhonelinkEraseIcon" */
            "mdi-react/PhonelinkEraseIcon"
        ),
    ),
    "mdi-mobile-phone-erase": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MobilePhoneEraseIcon" */
            "mdi-react/MobilePhoneEraseIcon"
        ),
    ),
    "mdi-smartphone-erase": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SmartphoneEraseIcon" */
            "mdi-react/SmartphoneEraseIcon"
        ),
    ),
    "mdi-mobile-phone-iphone": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MobilePhoneIphoneIcon" */
            "mdi-react/MobilePhoneIphoneIcon"
        ),
    ),
    "mdi-smartphone-iphone": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SmartphoneIphoneIcon" */
            "mdi-react/SmartphoneIphoneIcon"
        ),
    ),
    "mdi-mobile-phone-link-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MobilePhoneLinkOffIcon" */
            "mdi-react/MobilePhoneLinkOffIcon"
        ),
    ),
    "mdi-smartphone-link-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SmartphoneLinkOffIcon" */
            "mdi-react/SmartphoneLinkOffIcon"
        ),
    ),
    "mdi-phonelink-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PhonelinkOffIcon" */
            "mdi-react/PhonelinkOffIcon"
        ),
    ),
    "mdi-mobile-phone-link": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MobilePhoneLinkIcon" */
            "mdi-react/MobilePhoneLinkIcon"
        ),
    ),
    "mdi-smartphone-link": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SmartphoneLinkIcon" */
            "mdi-react/SmartphoneLinkIcon"
        ),
    ),
    "mdi-devices": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DevicesIcon" */
            "mdi-react/DevicesIcon"
        ),
    ),
    "mdi-phonelink-lock": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PhonelinkLockIcon" */
            "mdi-react/PhonelinkLockIcon"
        ),
    ),
    "mdi-mobile-phone-lock": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MobilePhoneLockIcon" */
            "mdi-react/MobilePhoneLockIcon"
        ),
    ),
    "mdi-smartphone-lock": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SmartphoneLockIcon" */
            "mdi-react/SmartphoneLockIcon"
        ),
    ),
    "mdi-mobile-phone-message": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MobilePhoneMessageIcon" */
            "mdi-react/MobilePhoneMessageIcon"
        ),
    ),
    "mdi-smartphone-message": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SmartphoneMessageIcon" */
            "mdi-react/SmartphoneMessageIcon"
        ),
    ),
    "mdi-mobile-phone-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MobilePhoneOffIcon" */
            "mdi-react/MobilePhoneOffIcon"
        ),
    ),
    "mdi-smartphone-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SmartphoneOffIcon" */
            "mdi-react/SmartphoneOffIcon"
        ),
    ),
    "mdi-mobile-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MobileOffIcon" */
            "mdi-react/MobileOffIcon"
        ),
    ),
    "mdi-phonelink-setup": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PhonelinkSetupIcon" */
            "mdi-react/PhonelinkSetupIcon"
        ),
    ),
    "mdi-mobile-phone-settings-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MobilePhoneSettingsVariantIcon" */
            "mdi-react/MobilePhoneSettingsVariantIcon"
        ),
    ),
    "mdi-smartphone-settings-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SmartphoneSettingsVariantIcon" */
            "mdi-react/SmartphoneSettingsVariantIcon"
        ),
    ),
    "mdi-mobile-phone-settings": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MobilePhoneSettingsIcon" */
            "mdi-react/MobilePhoneSettingsIcon"
        ),
    ),
    "mdi-smartphone-settings": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SmartphoneSettingsIcon" */
            "mdi-react/SmartphoneSettingsIcon"
        ),
    ),
    "mdi-settings-cell": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SettingsCellIcon" */
            "mdi-react/SettingsCellIcon"
        ),
    ),
    "mdi-phonelink-ring": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PhonelinkRingIcon" */
            "mdi-react/PhonelinkRingIcon"
        ),
    ),
    "mdi-mobile-phone-sound": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MobilePhoneSoundIcon" */
            "mdi-react/MobilePhoneSoundIcon"
        ),
    ),
    "mdi-smartphone-sound": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SmartphoneSoundIcon" */
            "mdi-react/SmartphoneSoundIcon"
        ),
    ),
    "mdi-mobile-phone-text": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MobilePhoneTextIcon" */
            "mdi-react/MobilePhoneTextIcon"
        ),
    ),
    "mdi-smartphone-text": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SmartphoneTextIcon" */
            "mdi-react/SmartphoneTextIcon"
        ),
    ),
    "mdi-mobile-phone-wireless": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MobilePhoneWirelessIcon" */
            "mdi-react/MobilePhoneWirelessIcon"
        ),
    ),
    "mdi-smartphone-wireless": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SmartphoneWirelessIcon" */
            "mdi-react/SmartphoneWirelessIcon"
        ),
    ),
    "mdi-mobile-phone": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MobilePhoneIcon" */
            "mdi-react/MobilePhoneIcon"
        ),
    ),
    "mdi-smartphone": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SmartphoneIcon" */
            "mdi-react/SmartphoneIcon"
        ),
    ),
    "mdi-stay-current-portrait": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/StayCurrentPortraitIcon" */
            "mdi-react/StayCurrentPortraitIcon"
        ),
    ),
    "mdi-stay-primary-portrait": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/StayPrimaryPortraitIcon" */
            "mdi-react/StayPrimaryPortraitIcon"
        ),
    ),
    "mdi-bubble-chart": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BubbleChartIcon" */
            "mdi-react/BubbleChartIcon"
        ),
    ),
    "mdi-chart-doughnut-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ChartDoughnutVariantIcon" */
            "mdi-react/ChartDoughnutVariantIcon"
        ),
    ),
    "mdi-chart-doughnut": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ChartDoughnutIcon" */
            "mdi-react/ChartDoughnutIcon"
        ),
    ),
    "mdi-data-usage": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DataUsageIcon" */
            "mdi-react/DataUsageIcon"
        ),
    ),
    "mdi-show-chart": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ShowChartIcon" */
            "mdi-react/ShowChartIcon"
        ),
    ),
    "mdi-tick-all": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TickAllIcon" */
            "mdi-react/TickAllIcon"
        ),
    ),
    "mdi-done-all": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DoneAllIcon" */
            "mdi-react/DoneAllIcon"
        ),
    ),
    "mdi-tick-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TickCircleOutlineIcon" */
            "mdi-react/TickCircleOutlineIcon"
        ),
    ),
    "mdi-tick-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TickCircleIcon" */
            "mdi-react/TickCircleIcon"
        ),
    ),
    "mdi-done-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DoneOutlineIcon" */
            "mdi-react/DoneOutlineIcon"
        ),
    ),
    "mdi-tick-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TickOutlineIcon" */
            "mdi-react/TickOutlineIcon"
        ),
    ),
    "mdi-tick": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TickIcon" */
            "mdi-react/TickIcon"
        ),
    ),
    "mdi-done": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DoneIcon" */
            "mdi-react/DoneIcon"
        ),
    ),
    "mdi-check-box-outline-blank": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CheckBoxOutlineBlankIcon" */
            "mdi-react/CheckBoxOutlineBlankIcon"
        ),
    ),
    "mdi-check-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CheckBoxIcon" */
            "mdi-react/CheckBoxIcon"
        ),
    ),
    "mdi-chess-horse": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ChessHorseIcon" */
            "mdi-react/ChessHorseIcon"
        ),
    ),
    "mdi-chess-castle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ChessCastleIcon" */
            "mdi-react/ChessCastleIcon"
        ),
    ),
    "mdi-expand-more": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ExpandMoreIcon" */
            "mdi-react/ExpandMoreIcon"
        ),
    ),
    "mdi-keyboard-arrow-down": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/KeyboardArrowDownIcon" */
            "mdi-react/KeyboardArrowDownIcon"
        ),
    ),
    "mdi-keyboard-arrow-left": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/KeyboardArrowLeftIcon" */
            "mdi-react/KeyboardArrowLeftIcon"
        ),
    ),
    "mdi-navigate-before": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NavigateBeforeIcon" */
            "mdi-react/NavigateBeforeIcon"
        ),
    ),
    "mdi-keyboard-arrow-right": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/KeyboardArrowRightIcon" */
            "mdi-react/KeyboardArrowRightIcon"
        ),
    ),
    "mdi-navigate-next": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NavigateNextIcon" */
            "mdi-react/NavigateNextIcon"
        ),
    ),
    "mdi-expand-less": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ExpandLessIcon" */
            "mdi-react/ExpandLessIcon"
        ),
    ),
    "mdi-keyboard-arrow-up": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/KeyboardArrowUpIcon" */
            "mdi-react/KeyboardArrowUpIcon"
        ),
    ),
    "mdi-chilli-hot": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ChilliHotIcon" */
            "mdi-react/ChilliHotIcon"
        ),
    ),
    "mdi-chilli-medium": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ChilliMediumIcon" */
            "mdi-react/ChilliMediumIcon"
        ),
    ),
    "mdi-chilli-mild": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ChilliMildIcon" */
            "mdi-react/ChilliMildIcon"
        ),
    ),
    "mdi-lens": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LensIcon" */
            "mdi-react/LensIcon"
        ),
    ),
    "mdi-location-city": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LocationCityIcon" */
            "mdi-react/LocationCityIcon"
        ),
    ),
    "mdi-clipboard-user": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ClipboardUserIcon" */
            "mdi-react/ClipboardUserIcon"
        ),
    ),
    "mdi-assignment-ind": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AssignmentIndIcon" */
            "mdi-react/AssignmentIndIcon"
        ),
    ),
    "mdi-clipboard-warning": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ClipboardWarningIcon" */
            "mdi-react/ClipboardWarningIcon"
        ),
    ),
    "mdi-assignment-late": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AssignmentLateIcon" */
            "mdi-react/AssignmentLateIcon"
        ),
    ),
    "mdi-assignment-returned": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AssignmentReturnedIcon" */
            "mdi-react/AssignmentReturnedIcon"
        ),
    ),
    "mdi-assignment-return": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AssignmentReturnIcon" */
            "mdi-react/AssignmentReturnIcon"
        ),
    ),
    "mdi-assignment-turned-in": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AssignmentTurnedInIcon" */
            "mdi-react/AssignmentTurnedInIcon"
        ),
    ),
    "mdi-assignment": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AssignmentIcon" */
            "mdi-react/AssignmentIcon"
        ),
    ),
    "mdi-clock-warning": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ClockWarningIcon" */
            "mdi-react/ClockWarningIcon"
        ),
    ),
    "mdi-access-time": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AccessTimeIcon" */
            "mdi-react/AccessTimeIcon"
        ),
    ),
    "mdi-query-builder": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/QueryBuilderIcon" */
            "mdi-react/QueryBuilderIcon"
        ),
    ),
    "mdi-schedule": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ScheduleIcon" */
            "mdi-react/ScheduleIcon"
        ),
    ),
    "mdi-watch-later": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WatchLaterIcon" */
            "mdi-react/WatchLaterIcon"
        ),
    ),
    "mdi-highlight-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HighlightOffIcon" */
            "mdi-react/HighlightOffIcon"
        ),
    ),
    "mdi-remove-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RemoveCircleIcon" */
            "mdi-react/RemoveCircleIcon"
        ),
    ),
    "mdi-clear": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ClearIcon" */
            "mdi-react/ClearIcon"
        ),
    ),
    "mdi-cc": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CcIcon" */
            "mdi-react/CcIcon"
        ),
    ),
    "mdi-cloud-json": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CloudJsonIcon" */
            "mdi-react/CloudJsonIcon"
        ),
    ),
    "mdi-cloud-done": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CloudDoneIcon" */
            "mdi-react/CloudDoneIcon"
        ),
    ),
    "mdi-cloud-queue": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CloudQueueIcon" */
            "mdi-react/CloudQueueIcon"
        ),
    ),
    "mdi-cloud-xml": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CloudXmlIcon" */
            "mdi-react/CloudXmlIcon"
        ),
    ),
    "mdi-backup": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BackupIcon" */
            "mdi-react/BackupIcon"
        ),
    ),
    "mdi-wb-cloudy": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WbCloudyIcon" */
            "mdi-react/WbCloudyIcon"
        ),
    ),
    "mdi-luck": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LuckIcon" */
            "mdi-react/LuckIcon"
        ),
    ),
    "mdi-tea-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TeaOutlineIcon" */
            "mdi-react/TeaOutlineIcon"
        ),
    ),
    "mdi-cup-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CupOutlineIcon" */
            "mdi-react/CupOutlineIcon"
        ),
    ),
    "mdi-tea": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TeaIcon" */
            "mdi-react/TeaIcon"
        ),
    ),
    "mdi-free-breakfast": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FreeBreakfastIcon" */
            "mdi-react/FreeBreakfastIcon"
        ),
    ),
    "mdi-local-cafe": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LocalCafeIcon" */
            "mdi-react/LocalCafeIcon"
        ),
    ),
    "mdi-manufacturing": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ManufacturingIcon" */
            "mdi-react/ManufacturingIcon"
        ),
    ),
    "mdi-toll": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TollIcon" */
            "mdi-react/TollIcon"
        ),
    ),
    "mdi-auto-awesome-mosaic": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AutoAwesomeMosaicIcon" */
            "mdi-react/AutoAwesomeMosaicIcon"
        ),
    ),
    "mdi-colour-helper": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ColourHelperIcon" */
            "mdi-react/ColourHelperIcon"
        ),
    ),
    "mdi-comment-user-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CommentUserOutlineIcon" */
            "mdi-react/CommentUserOutlineIcon"
        ),
    ),
    "mdi-comment-user": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CommentUserIcon" */
            "mdi-react/CommentUserIcon"
        ),
    ),
    "mdi-comment-warning-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CommentWarningOutlineIcon" */
            "mdi-react/CommentWarningOutlineIcon"
        ),
    ),
    "mdi-comment-warning": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CommentWarningIcon" */
            "mdi-react/CommentWarningIcon"
        ),
    ),
    "mdi-explore": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ExploreIcon" */
            "mdi-react/ExploreIcon"
        ),
    ),
    "mdi-terminal-line": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TerminalLineIcon" */
            "mdi-react/TerminalLineIcon"
        ),
    ),
    "mdi-terminal-network": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TerminalNetworkIcon" */
            "mdi-react/TerminalNetworkIcon"
        ),
    ),
    "mdi-terminal": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TerminalIcon" */
            "mdi-react/TerminalIcon"
        ),
    ),
    "mdi-scissors": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ScissorsIcon" */
            "mdi-react/ScissorsIcon"
        ),
    ),
    "mdi-clip": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ClipIcon" */
            "mdi-react/ClipIcon"
        ),
    ),
    "mdi-auto-awesome": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AutoAwesomeIcon" */
            "mdi-react/AutoAwesomeIcon"
        ),
    ),
    "mdi-payment-settings": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PaymentSettingsIcon" */
            "mdi-react/PaymentSettingsIcon"
        ),
    ),
    "mdi-payment": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PaymentIcon" */
            "mdi-react/PaymentIcon"
        ),
    ),
    "mdi-crop-54": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Crop54Icon" */
            "mdi-react/Crop54Icon"
        ),
    ),
    "mdi-gps-fixed": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GpsFixedIcon" */
            "mdi-react/GpsFixedIcon"
        ),
    ),
    "mdi-my-location": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MyLocationIcon" */
            "mdi-react/MyLocationIcon"
        ),
    ),
    "mdi-gps-not-fixed": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GpsNotFixedIcon" */
            "mdi-react/GpsNotFixedIcon"
        ),
    ),
    "mdi-location-searching": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LocationSearchingIcon" */
            "mdi-react/LocationSearchingIcon"
        ),
    ),
    "mdi-local-drink": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LocalDrinkIcon" */
            "mdi-react/LocalDrinkIcon"
        ),
    ),
    "mdi-taka": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TakaIcon" */
            "mdi-react/TakaIcon"
        ),
    ),
    "mdi-bangladeshi-taka": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BangladeshiTakaIcon" */
            "mdi-react/BangladeshiTakaIcon"
        ),
    ),
    "mdi-franc": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FrancIcon" */
            "mdi-react/FrancIcon"
        ),
    ),
    "mdi-yuan": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/YuanIcon" */
            "mdi-react/YuanIcon"
        ),
    ),
    "mdi-renminbi": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RenminbiIcon" */
            "mdi-react/RenminbiIcon"
        ),
    ),
    "mdi-xi": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/XiIcon" */
            "mdi-react/XiIcon"
        ),
    ),
    "mdi-euro": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EuroIcon" */
            "mdi-react/EuroIcon"
        ),
    ),
    "mdi-euro-symbol": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EuroSymbolIcon" */
            "mdi-react/EuroSymbolIcon"
        ),
    ),
    "mdi-sterling": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SterlingIcon" */
            "mdi-react/SterlingIcon"
        ),
    ),
    "mdi-rupee": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RupeeIcon" */
            "mdi-react/RupeeIcon"
        ),
    ),
    "mdi-yen": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/YenIcon" */
            "mdi-react/YenIcon"
        ),
    ),
    "mdi-won": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WonIcon" */
            "mdi-react/WonIcon"
        ),
    ),
    "mdi-kazakhstani-tenge": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/KazakhstaniTengeIcon" */
            "mdi-react/KazakhstaniTengeIcon"
        ),
    ),
    "mdi-naira": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NairaIcon" */
            "mdi-react/NairaIcon"
        ),
    ),
    "mdi-ruble": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RubleIcon" */
            "mdi-react/RubleIcon"
        ),
    ),
    "mdi-currency-scarab": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CurrencyScarabIcon" */
            "mdi-react/CurrencyScarabIcon"
        ),
    ),
    "mdi-lira": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LiraIcon" */
            "mdi-react/LiraIcon"
        ),
    ),
    "mdi-money-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MoneyOffIcon" */
            "mdi-react/MoneyOffIcon"
        ),
    ),
    "mdi-attach-money": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AttachMoneyIcon" */
            "mdi-react/AttachMoneyIcon"
        ),
    ),
    "mdi-alternating-current": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AlternatingCurrentIcon" */
            "mdi-react/AlternatingCurrentIcon"
        ),
    ),
    "mdi-direct-current": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DirectCurrentIcon" */
            "mdi-react/DirectCurrentIcon"
        ),
    ),
    "mdi-trash-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TrashCircleIcon" */
            "mdi-react/TrashCircleIcon"
        ),
    ),
    "mdi-bin-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BinCircleIcon" */
            "mdi-react/BinCircleIcon"
        ),
    ),
    "mdi-trash-empty": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TrashEmptyIcon" */
            "mdi-react/TrashEmptyIcon"
        ),
    ),
    "mdi-bin-empty": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BinEmptyIcon" */
            "mdi-react/BinEmptyIcon"
        ),
    ),
    "mdi-trash-restore": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TrashRestoreIcon" */
            "mdi-react/TrashRestoreIcon"
        ),
    ),
    "mdi-bin-restore": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BinRestoreIcon" */
            "mdi-react/BinRestoreIcon"
        ),
    ),
    "mdi-restore-from-trash": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RestoreFromTrashIcon" */
            "mdi-react/RestoreFromTrashIcon"
        ),
    ),
    "mdi-trash-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TrashVariantIcon" */
            "mdi-react/TrashVariantIcon"
        ),
    ),
    "mdi-bin-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BinVariantIcon" */
            "mdi-react/BinVariantIcon"
        ),
    ),
    "mdi-trash": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TrashIcon" */
            "mdi-react/TrashIcon"
        ),
    ),
    "mdi-bin": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BinIcon" */
            "mdi-react/BinIcon"
        ),
    ),
    "mdi-change-history": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ChangeHistoryIcon" */
            "mdi-react/ChangeHistoryIcon"
        ),
    ),
    "mdi-computer-classic": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ComputerClassicIcon" */
            "mdi-react/ComputerClassicIcon"
        ),
    ),
    "mdi-keypad": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/KeypadIcon" */
            "mdi-react/KeypadIcon"
        ),
    ),
    "mdi-die-1": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Die1Icon" */
            "mdi-react/Die1Icon"
        ),
    ),
    "mdi-die-2": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Die2Icon" */
            "mdi-react/Die2Icon"
        ),
    ),
    "mdi-die-3": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Die3Icon" */
            "mdi-react/Die3Icon"
        ),
    ),
    "mdi-die-4": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Die4Icon" */
            "mdi-react/Die4Icon"
        ),
    ),
    "mdi-die-5": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Die5Icon" */
            "mdi-react/Die5Icon"
        ),
    ),
    "mdi-die-6": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Die6Icon" */
            "mdi-react/Die6Icon"
        ),
    ),
    "mdi-die-d-10": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DieD10Icon" */
            "mdi-react/DieD10Icon"
        ),
    ),
    "mdi-die-d-20": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DieD20Icon" */
            "mdi-react/DieD20Icon"
        ),
    ),
    "mdi-die-d-4": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DieD4Icon" */
            "mdi-react/DieD4Icon"
        ),
    ),
    "mdi-die-d-6": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DieD6Icon" */
            "mdi-react/DieD6Icon"
        ),
    ),
    "mdi-die-d-8": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DieD8Icon" */
            "mdi-react/DieD8Icon"
        ),
    ),
    "mdi-disk-warning": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DiskWarningIcon" */
            "mdi-react/DiskWarningIcon"
        ),
    ),
    "mdi-disc-full": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DiscFullIcon" */
            "mdi-react/DiscFullIcon"
        ),
    ),
    "mdi-disc-player": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DiscPlayerIcon" */
            "mdi-react/DiscPlayerIcon"
        ),
    ),
    "mdi-helix": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HelixIcon" */
            "mdi-react/HelixIcon"
        ),
    ),
    "mdi-no-entry": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NoEntryIcon" */
            "mdi-react/NoEntryIcon"
        ),
    ),
    "mdi-building": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BuildingIcon" */
            "mdi-react/BuildingIcon"
        ),
    ),
    "mdi-company": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CompanyIcon" */
            "mdi-react/CompanyIcon"
        ),
    ),
    "mdi-business": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BusinessIcon" */
            "mdi-react/BusinessIcon"
        ),
    ),
    "mdi-ellipsis-horizontal-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EllipsisHorizontalCircleIcon" */
            "mdi-react/EllipsisHorizontalCircleIcon"
        ),
    ),
    "mdi-more-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MoreCircleIcon" */
            "mdi-react/MoreCircleIcon"
        ),
    ),
    "mdi-ellipsis-horizontal": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EllipsisHorizontalIcon" */
            "mdi-react/EllipsisHorizontalIcon"
        ),
    ),
    "mdi-more-horiz": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MoreHorizIcon" */
            "mdi-react/MoreHorizIcon"
        ),
    ),
    "mdi-ellipsis-vertical-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EllipsisVerticalCircleIcon" */
            "mdi-react/EllipsisVerticalCircleIcon"
        ),
    ),
    "mdi-ellipsis-vertical": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EllipsisVerticalIcon" */
            "mdi-react/EllipsisVerticalIcon"
        ),
    ),
    "mdi-more-vert": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MoreVertIcon" */
            "mdi-react/MoreVertIcon"
        ),
    ),
    "mdi-get-app": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GetAppIcon" */
            "mdi-react/GetAppIcon"
        ),
    ),
    "mdi-weights": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WeightsIcon" */
            "mdi-react/WeightsIcon"
        ),
    ),
    "mdi-globe": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GlobeIcon" */
            "mdi-react/GlobeIcon"
        ),
    ),
    "mdi-public": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PublicIcon" */
            "mdi-react/PublicIcon"
        ),
    ),
    "mdi-email-warning": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EmailWarningIcon" */
            "mdi-react/EmailWarningIcon"
        ),
    ),
    "mdi-envelope-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EnvelopeAlertIcon" */
            "mdi-react/EnvelopeAlertIcon"
        ),
    ),
    "mdi-envelope-warning": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EnvelopeWarningIcon" */
            "mdi-react/EnvelopeWarningIcon"
        ),
    ),
    "mdi-envelope-open-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EnvelopeOpenOutlineIcon" */
            "mdi-react/EnvelopeOpenOutlineIcon"
        ),
    ),
    "mdi-drafts": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DraftsIcon" */
            "mdi-react/DraftsIcon"
        ),
    ),
    "mdi-envelope-open": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EnvelopeOpenIcon" */
            "mdi-react/EnvelopeOpenIcon"
        ),
    ),
    "mdi-mail-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MailOutlineIcon" */
            "mdi-react/MailOutlineIcon"
        ),
    ),
    "mdi-envelope-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EnvelopeOutlineIcon" */
            "mdi-react/EnvelopeOutlineIcon"
        ),
    ),
    "mdi-envelope-secure": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EnvelopeSecureIcon" */
            "mdi-react/EnvelopeSecureIcon"
        ),
    ),
    "mdi-envelope-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EnvelopeVariantIcon" */
            "mdi-react/EnvelopeVariantIcon"
        ),
    ),
    "mdi-local-post-office": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LocalPostOfficeIcon" */
            "mdi-react/LocalPostOfficeIcon"
        ),
    ),
    "mdi-mail": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MailIcon" */
            "mdi-react/MailIcon"
        ),
    ),
    "mdi-markunread": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MarkunreadIcon" */
            "mdi-react/MarkunreadIcon"
        ),
    ),
    "mdi-envelope": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EnvelopeIcon" */
            "mdi-react/EnvelopeIcon"
        ),
    ),
    "mdi-smiley-cool": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SmileyCoolIcon" */
            "mdi-react/SmileyCoolIcon"
        ),
    ),
    "mdi-smiley-dead": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SmileyDeadIcon" */
            "mdi-react/SmileyDeadIcon"
        ),
    ),
    "mdi-smiley-devil": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SmileyDevilIcon" */
            "mdi-react/SmileyDevilIcon"
        ),
    ),
    "mdi-smiley-excited": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SmileyExcitedIcon" */
            "mdi-react/SmileyExcitedIcon"
        ),
    ),
    "mdi-smiley-happy": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SmileyHappyIcon" */
            "mdi-react/SmileyHappyIcon"
        ),
    ),
    "mdi-smiley-neutral": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SmileyNeutralIcon" */
            "mdi-react/SmileyNeutralIcon"
        ),
    ),
    "mdi-smiley-poop": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SmileyPoopIcon" */
            "mdi-react/SmileyPoopIcon"
        ),
    ),
    "mdi-smiley-sad": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SmileySadIcon" */
            "mdi-react/SmileySadIcon"
        ),
    ),
    "mdi-smiley-tongue": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SmileyTongueIcon" */
            "mdi-react/SmileyTongueIcon"
        ),
    ),
    "mdi-smiley": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SmileyIcon" */
            "mdi-react/SmileyIcon"
        ),
    ),
    "mdi-insert-emoticon": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/InsertEmoticonIcon" */
            "mdi-react/InsertEmoticonIcon"
        ),
    ),
    "mdi-mood": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MoodIcon" */
            "mdi-react/MoodIcon"
        ),
    ),
    "mdi-sentiment-very-satisfied": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SentimentVerySatisfiedIcon" */
            "mdi-react/SentimentVerySatisfiedIcon"
        ),
    ),
    "mdi-hide-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HideOutlineIcon" */
            "mdi-react/HideOutlineIcon"
        ),
    ),
    "mdi-visibility-off-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VisibilityOffOutlineIcon" */
            "mdi-react/VisibilityOffOutlineIcon"
        ),
    ),
    "mdi-hide": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HideIcon" */
            "mdi-react/HideIcon"
        ),
    ),
    "mdi-visibility-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VisibilityOffIcon" */
            "mdi-react/VisibilityOffIcon"
        ),
    ),
    "mdi-show-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ShowOutlineIcon" */
            "mdi-react/ShowOutlineIcon"
        ),
    ),
    "mdi-visibility-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VisibilityOutlineIcon" */
            "mdi-react/VisibilityOutlineIcon"
        ),
    ),
    "mdi-show": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ShowIcon" */
            "mdi-react/ShowIcon"
        ),
    ),
    "mdi-visibility": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VisibilityIcon" */
            "mdi-react/VisibilityIcon"
        ),
    ),
    "mdi-remove-red-eye": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RemoveRedEyeIcon" */
            "mdi-react/RemoveRedEyeIcon"
        ),
    ),
    "mdi-colorize": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ColorizeIcon" */
            "mdi-react/ColorizeIcon"
        ),
    ),
    "mdi-colourise": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ColouriseIcon" */
            "mdi-react/ColouriseIcon"
        ),
    ),
    "mdi-industrial": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/IndustrialIcon" */
            "mdi-react/IndustrialIcon"
        ),
    ),
    "mdi-cargo-ship": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CargoShipIcon" */
            "mdi-react/CargoShipIcon"
        ),
    ),
    "mdi-boat": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BoatIcon" */
            "mdi-react/BoatIcon"
        ),
    ),
    "mdi-ship": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ShipIcon" */
            "mdi-react/ShipIcon"
        ),
    ),
    "mdi-directions-boat": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DirectionsBoatIcon" */
            "mdi-react/DirectionsBoatIcon"
        ),
    ),
    "mdi-directions-ferry": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DirectionsFerryIcon" */
            "mdi-react/DirectionsFerryIcon"
        ),
    ),
    "mdi-file-user": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FileUserIcon" */
            "mdi-react/FileUserIcon"
        ),
    ),
    "mdi-file-report": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FileReportIcon" */
            "mdi-react/FileReportIcon"
        ),
    ),
    "mdi-file-csv": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FileCsvIcon" */
            "mdi-react/FileCsvIcon"
        ),
    ),
    "mdi-print-preview": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PrintPreviewIcon" */
            "mdi-react/PrintPreviewIcon"
        ),
    ),
    "mdi-find-in-page": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FindInPageIcon" */
            "mdi-react/FindInPageIcon"
        ),
    ),
    "mdi-note-add": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NoteAddIcon" */
            "mdi-react/NoteAddIcon"
        ),
    ),
    "mdi-restore-page": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RestorePageIcon" */
            "mdi-react/RestorePageIcon"
        ),
    ),
    "mdi-subtasks": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SubtasksIcon" */
            "mdi-react/SubtasksIcon"
        ),
    ),
    "mdi-file-revert": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FileRevertIcon" */
            "mdi-react/FileRevertIcon"
        ),
    ),
    "mdi-file-discard": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FileDiscardIcon" */
            "mdi-react/FileDiscardIcon"
        ),
    ),
    "mdi-insert-drive-file": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/InsertDriveFileIcon" */
            "mdi-react/InsertDriveFileIcon"
        ),
    ),
    "mdi-draft": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DraftIcon" */
            "mdi-react/DraftIcon"
        ),
    ),
    "mdi-camera-roll": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CameraRollIcon" */
            "mdi-react/CameraRollIcon"
        ),
    ),
    "mdi-local-movies": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LocalMoviesIcon" */
            "mdi-react/LocalMoviesIcon"
        ),
    ),
    "mdi-theaters": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TheatersIcon" */
            "mdi-react/TheatersIcon"
        ),
    ),
    "mdi-filter-list": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FilterListIcon" */
            "mdi-react/FilterListIcon"
        ),
    ),
    "mdi-chart-finance": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ChartFinanceIcon" */
            "mdi-react/ChartFinanceIcon"
        ),
    ),
    "mdi-fire-engine": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FireEngineIcon" */
            "mdi-react/FireEngineIcon"
        ),
    ),
    "mdi-whatshot": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WhatshotIcon" */
            "mdi-react/WhatshotIcon"
        ),
    ),
    "mdi-assistant-photo": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AssistantPhotoIcon" */
            "mdi-react/AssistantPhotoIcon"
        ),
    ),
    "mdi-amp": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AmpIcon" */
            "mdi-react/AmpIcon"
        ),
    ),
    "mdi-offline-bolt": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/OfflineBoltIcon" */
            "mdi-react/OfflineBoltIcon"
        ),
    ),
    "mdi-lightning-bolt-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LightningBoltCircleIcon" */
            "mdi-react/LightningBoltCircleIcon"
        ),
    ),
    "mdi-lighning-bolt-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LighningBoltOutlineIcon" */
            "mdi-react/LighningBoltOutlineIcon"
        ),
    ),
    "mdi-lightning-bolt": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LightningBoltIcon" */
            "mdi-react/LightningBoltIcon"
        ),
    ),
    "mdi-flash-on": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FlashOnIcon" */
            "mdi-react/FlashOnIcon"
        ),
    ),
    "mdi-electricity": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ElectricityIcon" */
            "mdi-react/ElectricityIcon"
        ),
    ),
    "mdi-torch-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TorchOffIcon" */
            "mdi-react/TorchOffIcon"
        ),
    ),
    "mdi-torch": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TorchIcon" */
            "mdi-react/TorchIcon"
        ),
    ),
    "mdi-local-florist": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LocalFloristIcon" */
            "mdi-react/LocalFloristIcon"
        ),
    ),
    "mdi-folder-user": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FolderUserIcon" */
            "mdi-react/FolderUserIcon"
        ),
    ),
    "mdi-folder-shared": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FolderSharedIcon" */
            "mdi-react/FolderSharedIcon"
        ),
    ),
    "mdi-folder-mydrive": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FolderMydriveIcon" */
            "mdi-react/FolderMydriveIcon"
        ),
    ),
    "mdi-perm-media": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PermMediaIcon" */
            "mdi-react/PermMediaIcon"
        ),
    ),
    "mdi-create-new-folder": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CreateNewFolderIcon" */
            "mdi-react/CreateNewFolderIcon"
        ),
    ),
    "mdi-folder-special": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FolderSpecialIcon" */
            "mdi-react/FolderSpecialIcon"
        ),
    ),
    "mdi-format-align-centre": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatAlignCentreIcon" */
            "mdi-react/FormatAlignCentreIcon"
        ),
    ),
    "mdi-format-colour-fill": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatColourFillIcon" */
            "mdi-react/FormatColourFillIcon"
        ),
    ),
    "mdi-format-colour-text": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatColourTextIcon" */
            "mdi-react/FormatColourTextIcon"
        ),
    ),
    "mdi-format-float-centre": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatFloatCentreIcon" */
            "mdi-react/FormatFloatCentreIcon"
        ),
    ),
    "mdi-format-horizontal-align-centre": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatHorizontalAlignCentreIcon" */
            "mdi-react/FormatHorizontalAlignCentreIcon"
        ),
    ),
    "mdi-format-list-numbered": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatListNumberedIcon" */
            "mdi-react/FormatListNumberedIcon"
        ),
    ),
    "mdi-rotate-90-degrees-ccw": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Rotate90DegreesCcwIcon" */
            "mdi-react/Rotate90DegreesCcwIcon"
        ),
    ),
    "mdi-strikethrough-s": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/StrikethroughSIcon" */
            "mdi-react/StrikethroughSIcon"
        ),
    ),
    "mdi-format-underlined": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatUnderlinedIcon" */
            "mdi-react/FormatUnderlinedIcon"
        ),
    ),
    "mdi-format-vertical-align-centre": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatVerticalAlignCentreIcon" */
            "mdi-react/FormatVerticalAlignCentreIcon"
        ),
    ),
    "mdi-message-group": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MessageGroupIcon" */
            "mdi-react/MessageGroupIcon"
        ),
    ),
    "mdi-question-answer": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/QuestionAnswerIcon" */
            "mdi-react/QuestionAnswerIcon"
        ),
    ),
    "mdi-refrigerator-filled-bottom": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RefrigeratorFilledBottomIcon" */
            "mdi-react/RefrigeratorFilledBottomIcon"
        ),
    ),
    "mdi-refrigerator-filled-top": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RefrigeratorFilledTopIcon" */
            "mdi-react/RefrigeratorFilledTopIcon"
        ),
    ),
    "mdi-refrigerator-filled": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RefrigeratorFilledIcon" */
            "mdi-react/RefrigeratorFilledIcon"
        ),
    ),
    "mdi-kitchen": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/KitchenIcon" */
            "mdi-react/KitchenIcon"
        ),
    ),
    "mdi-refrigerator": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RefrigeratorIcon" */
            "mdi-react/RefrigeratorIcon"
        ),
    ),
    "mdi-games": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GamesIcon" */
            "mdi-react/GamesIcon"
        ),
    ),
    "mdi-garage-warning": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GarageWarningIcon" */
            "mdi-react/GarageWarningIcon"
        ),
    ),
    "mdi-gas-pump": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GasPumpIcon" */
            "mdi-react/GasPumpIcon"
        ),
    ),
    "mdi-petrol-pump": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PetrolPumpIcon" */
            "mdi-react/PetrolPumpIcon"
        ),
    ),
    "mdi-petrol-station": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PetrolStationIcon" */
            "mdi-react/PetrolStationIcon"
        ),
    ),
    "mdi-local-gas-station": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LocalGasStationIcon" */
            "mdi-react/LocalGasStationIcon"
        ),
    ),
    "mdi-logic-gate-and": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LogicGateAndIcon" */
            "mdi-react/LogicGateAndIcon"
        ),
    ),
    "mdi-logic-gate-nand": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LogicGateNandIcon" */
            "mdi-react/LogicGateNandIcon"
        ),
    ),
    "mdi-logic-gate-nor": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LogicGateNorIcon" */
            "mdi-react/LogicGateNorIcon"
        ),
    ),
    "mdi-logic-gate-not": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LogicGateNotIcon" */
            "mdi-react/LogicGateNotIcon"
        ),
    ),
    "mdi-logic-gate-or": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LogicGateOrIcon" */
            "mdi-react/LogicGateOrIcon"
        ),
    ),
    "mdi-logic-gate-xnor": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LogicGateXnorIcon" */
            "mdi-react/LogicGateXnorIcon"
        ),
    ),
    "mdi-logic-gate-xor": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LogicGateXorIcon" */
            "mdi-react/LogicGateXorIcon"
        ),
    ),
    "mdi-swap-driving-apps-wheel": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SwapDrivingAppsWheelIcon" */
            "mdi-react/SwapDrivingAppsWheelIcon"
        ),
    ),
    "mdi-court-hammer": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CourtHammerIcon" */
            "mdi-react/CourtHammerIcon"
        ),
    ),
    "mdi-interaction-double-tap": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/InteractionDoubleTapIcon" */
            "mdi-react/InteractionDoubleTapIcon"
        ),
    ),
    "mdi-hand-double-tap": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HandDoubleTapIcon" */
            "mdi-react/HandDoubleTapIcon"
        ),
    ),
    "mdi-interaction-tap": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/InteractionTapIcon" */
            "mdi-react/InteractionTapIcon"
        ),
    ),
    "mdi-hand-tap": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HandTapIcon" */
            "mdi-react/HandTapIcon"
        ),
    ),
    "mdi-donate": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DonateIcon" */
            "mdi-react/DonateIcon"
        ),
    ),
    "mdi-present": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PresentIcon" */
            "mdi-react/PresentIcon"
        ),
    ),
    "mdi-local-bar": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LocalBarIcon" */
            "mdi-react/LocalBarIcon"
        ),
    ),
    "mdi-cocktail": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CocktailIcon" */
            "mdi-react/CocktailIcon"
        ),
    ),
    "mdi-martini": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MartiniIcon" */
            "mdi-react/MartiniIcon"
        ),
    ),
    "mdi-golf-course": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GolfCourseIcon" */
            "mdi-react/GolfCourseIcon"
        ),
    ),
    "mdi-cable-car": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CableCarIcon" */
            "mdi-react/CableCarIcon"
        ),
    ),
    "mdi-chromecast": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ChromecastIcon" */
            "mdi-react/ChromecastIcon"
        ),
    ),
    "mdi-attach-drive": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AttachDriveIcon" */
            "mdi-react/AttachDriveIcon"
        ),
    ),
    "mdi-g-translate": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GTranslateIcon" */
            "mdi-react/GTranslateIcon"
        ),
    ),
    "mdi-wallet-product": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WalletProductIcon" */
            "mdi-react/WalletProductIcon"
        ),
    ),
    "mdi-grid-on": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GridOnIcon" */
            "mdi-react/GridOnIcon"
        ),
    ),
    "mdi-headset-mic": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HeadsetMicIcon" */
            "mdi-react/HeadsetMicIcon"
        ),
    ),
    "mdi-favorite-border": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FavoriteBorderIcon" */
            "mdi-react/FavoriteBorderIcon"
        ),
    ),
    "mdi-favourite-border": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FavouriteBorderIcon" */
            "mdi-react/FavouriteBorderIcon"
        ),
    ),
    "mdi-favorite-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FavoriteOutlineIcon" */
            "mdi-react/FavoriteOutlineIcon"
        ),
    ),
    "mdi-favourite-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FavouriteOutlineIcon" */
            "mdi-react/FavouriteOutlineIcon"
        ),
    ),
    "mdi-favorite": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FavoriteIcon" */
            "mdi-react/FavoriteIcon"
        ),
    ),
    "mdi-favourite": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FavouriteIcon" */
            "mdi-react/FavouriteIcon"
        ),
    ),
    "mdi-help-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HelpOutlineIcon" */
            "mdi-react/HelpOutlineIcon"
        ),
    ),
    "mdi-question-mark-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/QuestionMarkCircleIcon" */
            "mdi-react/QuestionMarkCircleIcon"
        ),
    ),
    "mdi-question-mark": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/QuestionMarkIcon" */
            "mdi-react/QuestionMarkIcon"
        ),
    ),
    "mdi-hd-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HdBoxIcon" */
            "mdi-react/HdBoxIcon"
        ),
    ),
    "mdi-hd": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HdIcon" */
            "mdi-react/HdIcon"
        ),
    ),
    "mdi-autobahn": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AutobahnIcon" */
            "mdi-react/AutobahnIcon"
        ),
    ),
    "mdi-motorway": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MotorwayIcon" */
            "mdi-react/MotorwayIcon"
        ),
    ),
    "mdi-recent": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RecentIcon" */
            "mdi-react/RecentIcon"
        ),
    ),
    "mdi-latest": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LatestIcon" */
            "mdi-react/LatestIcon"
        ),
    ),
    "mdi-clock-arrow": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ClockArrowIcon" */
            "mdi-react/ClockArrowIcon"
        ),
    ),
    "mdi-counterclockwise": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CounterclockwiseIcon" */
            "mdi-react/CounterclockwiseIcon"
        ),
    ),
    "mdi-home-user": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HomeUserIcon" */
            "mdi-react/HomeUserIcon"
        ),
    ),
    "mdi-home-warning": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HomeWarningIcon" */
            "mdi-react/HomeWarningIcon"
        ),
    ),
    "mdi-house-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HouseCircleIcon" */
            "mdi-react/HouseCircleIcon"
        ),
    ),
    "mdi-family": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FamilyIcon" */
            "mdi-react/FamilyIcon"
        ),
    ),
    "mdi-house-map-marker": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HouseMapMarkerIcon" */
            "mdi-react/HouseMapMarkerIcon"
        ),
    ),
    "mdi-house-modern": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HouseModernIcon" */
            "mdi-react/HouseModernIcon"
        ),
    ),
    "mdi-house-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HouseOutlineIcon" */
            "mdi-react/HouseOutlineIcon"
        ),
    ),
    "mdi-house-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HouseVariantIcon" */
            "mdi-react/HouseVariantIcon"
        ),
    ),
    "mdi-house": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HouseIcon" */
            "mdi-react/HouseIcon"
        ),
    ),
    "mdi-local-hospital": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LocalHospitalIcon" */
            "mdi-react/LocalHospitalIcon"
        ),
    ),
    "mdi-bed": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BedIcon" */
            "mdi-react/BedIcon"
        ),
    ),
    "mdi-local-hotel": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LocalHotelIcon" */
            "mdi-react/LocalHotelIcon"
        ),
    ),
    "mdi-woman": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WomanIcon" */
            "mdi-react/WomanIcon"
        ),
    ),
    "mdi-wc": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WcIcon" */
            "mdi-react/WcIcon"
        ),
    ),
    "mdi-man-woman": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ManWomanIcon" */
            "mdi-react/ManWomanIcon"
        ),
    ),
    "mdi-man": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ManIcon" */
            "mdi-react/ManIcon"
        ),
    ),
    "mdi-pregnant-woman": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PregnantWomanIcon" */
            "mdi-react/PregnantWomanIcon"
        ),
    ),
    "mdi-accessibility": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AccessibilityIcon" */
            "mdi-react/AccessibilityIcon"
        ),
    ),
    "mdi-photo-album": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PhotoAlbumIcon" */
            "mdi-react/PhotoAlbumIcon"
        ),
    ),
    "mdi-broken-image": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BrokenImageIcon" */
            "mdi-react/BrokenImageIcon"
        ),
    ),
    "mdi-filter-b-and-w": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FilterBAndWIcon" */
            "mdi-react/FilterBAndWIcon"
        ),
    ),
    "mdi-image-filter-centre-focus-weak": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ImageFilterCentreFocusWeakIcon" */
            "mdi-react/ImageFilterCentreFocusWeakIcon"
        ),
    ),
    "mdi-image-filter-centre-focus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ImageFilterCentreFocusIcon" */
            "mdi-react/ImageFilterCentreFocusIcon"
        ),
    ),
    "mdi-mountain": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MountainIcon" */
            "mdi-react/MountainIcon"
        ),
    ),
    "mdi-landscape": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LandscapeIcon" */
            "mdi-react/LandscapeIcon"
        ),
    ),
    "mdi-image-multiple-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ImageMultipleOutlineIcon" */
            "mdi-react/ImageMultipleOutlineIcon"
        ),
    ),
    "mdi-collections": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CollectionsIcon" */
            "mdi-react/CollectionsIcon"
        ),
    ),
    "mdi-photo-library": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PhotoLibraryIcon" */
            "mdi-react/PhotoLibraryIcon"
        ),
    ),
    "mdi-insert-photo": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/InsertPhotoIcon" */
            "mdi-react/InsertPhotoIcon"
        ),
    ),
    "mdi-move-to-inbox": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MoveToInboxIcon" */
            "mdi-react/MoveToInboxIcon"
        ),
    ),
    "mdi-info-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/InfoOutlineIcon" */
            "mdi-react/InfoOutlineIcon"
        ),
    ),
    "mdi-about-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AboutOutlineIcon" */
            "mdi-react/AboutOutlineIcon"
        ),
    ),
    "mdi-about": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AboutIcon" */
            "mdi-react/AboutIcon"
        ),
    ),
    "mdi-invert-colours": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/InvertColoursIcon" */
            "mdi-react/InvertColoursIcon"
        ),
    ),
    "mdi-jewish": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/JewishIcon" */
            "mdi-react/JewishIcon"
        ),
    ),
    "mdi-martial-arts": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MartialArtsIcon" */
            "mdi-react/MartialArtsIcon"
        ),
    ),
    "mdi-vpn-key": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VpnKeyIcon" */
            "mdi-react/VpnKeyIcon"
        ),
    ),
    "mdi-keyboard-capslock": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/KeyboardCapslockIcon" */
            "mdi-react/KeyboardCapslockIcon"
        ),
    ),
    "mdi-keyboard-hide": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/KeyboardHideIcon" */
            "mdi-react/KeyboardHideIcon"
        ),
    ),
    "mdi-bugfood": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BugfoodIcon" */
            "mdi-react/BugfoodIcon"
        ),
    ),
    "mdi-ladybird": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LadybirdIcon" */
            "mdi-react/LadybirdIcon"
        ),
    ),
    "mdi-computer": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ComputerIcon" */
            "mdi-react/ComputerIcon"
        ),
    ),
    "mdi-layers-clear": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LayersClearIcon" */
            "mdi-react/LayersClearIcon"
        ),
    ),
    "mdi-add-to-photos": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AddToPhotosIcon" */
            "mdi-react/AddToPhotosIcon"
        ),
    ),
    "mdi-library-add": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LibraryAddIcon" */
            "mdi-react/LibraryAddIcon"
        ),
    ),
    "mdi-queue": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/QueueIcon" */
            "mdi-react/QueueIcon"
        ),
    ),
    "mdi-local-library": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LocalLibraryIcon" */
            "mdi-react/LocalLibraryIcon"
        ),
    ),
    "mdi-life-preserver": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LifePreserverIcon" */
            "mdi-react/LifePreserverIcon"
        ),
    ),
    "mdi-support": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SupportIcon" */
            "mdi-react/SupportIcon"
        ),
    ),
    "mdi-insert-link": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/InsertLinkIcon" */
            "mdi-react/InsertLinkIcon"
        ),
    ),
    "mdi-tux": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TuxIcon" */
            "mdi-react/TuxIcon"
        ),
    ),
    "mdi-lock-warning": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LockWarningIcon" */
            "mdi-react/LockWarningIcon"
        ),
    ),
    "mdi-enhanced-encryption": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EnhancedEncryptionIcon" */
            "mdi-react/EnhancedEncryptionIcon"
        ),
    ),
    "mdi-forgot-password": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ForgotPasswordIcon" */
            "mdi-react/ForgotPasswordIcon"
        ),
    ),
    "mdi-password-reset": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PasswordResetIcon" */
            "mdi-react/PasswordResetIcon"
        ),
    ),
    "mdi-https": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HttpsIcon" */
            "mdi-react/HttpsIcon"
        ),
    ),
    "mdi-rainbow": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RainbowIcon" */
            "mdi-react/RainbowIcon"
        ),
    ),
    "mdi-zoom-out-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ZoomOutOutlineIcon" */
            "mdi-react/ZoomOutOutlineIcon"
        ),
    ),
    "mdi-zoom-out": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ZoomOutIcon" */
            "mdi-react/ZoomOutIcon"
        ),
    ),
    "mdi-zoom-in-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ZoomInOutlineIcon" */
            "mdi-react/ZoomInOutlineIcon"
        ),
    ),
    "mdi-zoom-in": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ZoomInIcon" */
            "mdi-react/ZoomInIcon"
        ),
    ),
    "mdi-search": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SearchIcon" */
            "mdi-react/SearchIcon"
        ),
    ),
    "mdi-markunread-mailbox": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MarkunreadMailboxIcon" */
            "mdi-react/MarkunreadMailboxIcon"
        ),
    ),
    "mdi-explore-nearby": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ExploreNearbyIcon" */
            "mdi-react/ExploreNearbyIcon"
        ),
    ),
    "mdi-location-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LocationOffIcon" */
            "mdi-react/LocationOffIcon"
        ),
    ),
    "mdi-add-location": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AddLocationIcon" */
            "mdi-react/AddLocationIcon"
        ),
    ),
    "mdi-location": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LocationIcon" */
            "mdi-react/LocationIcon"
        ),
    ),
    "mdi-address-marker": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AddressMarkerIcon" */
            "mdi-react/AddressMarkerIcon"
        ),
    ),
    "mdi-location-on": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LocationOnIcon" */
            "mdi-react/LocationOnIcon"
        ),
    ),
    "mdi-place": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PlaceIcon" */
            "mdi-react/PlaceIcon"
        ),
    ),
    "mdi-room": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RoomIcon" */
            "mdi-react/RoomIcon"
        ),
    ),
    "mdi-beenhere": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BeenhereIcon" */
            "mdi-react/BeenhereIcon"
        ),
    ),
    "mdi-highlighter": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HighlighterIcon" */
            "mdi-react/HighlighterIcon"
        ),
    ),
    "mdi-first-aid-kit": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FirstAidKitIcon" */
            "mdi-react/FirstAidKitIcon"
        ),
    ),
    "mdi-arrow-drop-down": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowDropDownIcon" */
            "mdi-react/ArrowDropDownIcon"
        ),
    ),
    "mdi-arrow-drop-up": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowDropUpIcon" */
            "mdi-react/ArrowDropUpIcon"
        ),
    ),
    "mdi-hamburger-menu": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HamburgerMenuIcon" */
            "mdi-react/HamburgerMenuIcon"
        ),
    ),
    "mdi-feedback": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FeedbackIcon" */
            "mdi-react/FeedbackIcon"
        ),
    ),
    "mdi-message-warning": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MessageWarningIcon" */
            "mdi-react/MessageWarningIcon"
        ),
    ),
    "mdi-sms-failed": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SmsFailedIcon" */
            "mdi-react/SmsFailedIcon"
        ),
    ),
    "mdi-speaker-notes-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SpeakerNotesOffIcon" */
            "mdi-react/SpeakerNotesOffIcon"
        ),
    ),
    "mdi-speaker-notes": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SpeakerNotesIcon" */
            "mdi-react/SpeakerNotesIcon"
        ),
    ),
    "mdi-rate-review": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RateReviewIcon" */
            "mdi-react/RateReviewIcon"
        ),
    ),
    "mdi-mms": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MmsIcon" */
            "mdi-react/MmsIcon"
        ),
    ),
    "mdi-chat-bubble-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ChatBubbleOutlineIcon" */
            "mdi-react/ChatBubbleOutlineIcon"
        ),
    ),
    "mdi-sms": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SmsIcon" */
            "mdi-react/SmsIcon"
        ),
    ),
    "mdi-textsms": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TextsmsIcon" */
            "mdi-react/TextsmsIcon"
        ),
    ),
    "mdi-insert-comment": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/InsertCommentIcon" */
            "mdi-react/InsertCommentIcon"
        ),
    ),
    "mdi-mode-comment": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ModeCommentIcon" */
            "mdi-react/ModeCommentIcon"
        ),
    ),
    "mdi-chat": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ChatIcon" */
            "mdi-react/ChatIcon"
        ),
    ),
    "mdi-voice-chat": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VoiceChatIcon" */
            "mdi-react/VoiceChatIcon"
        ),
    ),
    "mdi-chat-bubble": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ChatBubbleIcon" */
            "mdi-react/ChatBubbleIcon"
        ),
    ),
    "mdi-mic-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MicOffIcon" */
            "mdi-react/MicOffIcon"
        ),
    ),
    "mdi-mic-none": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MicNoneIcon" */
            "mdi-react/MicNoneIcon"
        ),
    ),
    "mdi-settings-voice": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SettingsVoiceIcon" */
            "mdi-react/SettingsVoiceIcon"
        ),
    ),
    "mdi-keyboard-voice": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/KeyboardVoiceIcon" */
            "mdi-react/KeyboardVoiceIcon"
        ),
    ),
    "mdi-checkbox-indeterminate-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CheckboxIndeterminateOutlineIcon" */
            "mdi-react/CheckboxIndeterminateOutlineIcon"
        ),
    ),
    "mdi-indeterminate-check-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/IndeterminateCheckBoxIcon" */
            "mdi-react/IndeterminateCheckBoxIcon"
        ),
    ),
    "mdi-remove-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RemoveCircleOutlineIcon" */
            "mdi-react/RemoveCircleOutlineIcon"
        ),
    ),
    "mdi-do-not-disturb-on": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DoNotDisturbOnIcon" */
            "mdi-react/DoNotDisturbOnIcon"
        ),
    ),
    "mdi-remove": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RemoveIcon" */
            "mdi-react/RemoveIcon"
        ),
    ),
    "mdi-important-devices": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ImportantDevicesIcon" */
            "mdi-react/ImportantDevicesIcon"
        ),
    ),
    "mdi-desktop-windows": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DesktopWindowsIcon" */
            "mdi-react/DesktopWindowsIcon"
        ),
    ),
    "mdi-motorcycle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MotorcycleIcon" */
            "mdi-react/MotorcycleIcon"
        ),
    ),
    "mdi-film-reel": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FilmReelIcon" */
            "mdi-react/FilmReelIcon"
        ),
    ),
    "mdi-slate": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SlateIcon" */
            "mdi-react/SlateIcon"
        ),
    ),
    "mdi-clapperboard": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ClapperboardIcon" */
            "mdi-react/ClapperboardIcon"
        ),
    ),
    "mdi-movie-creation": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MovieCreationIcon" */
            "mdi-react/MovieCreationIcon"
        ),
    ),
    "mdi-network-attached-storage": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NetworkAttachedStorageIcon" */
            "mdi-react/NetworkAttachedStorageIcon"
        ),
    ),
    "mdi-arrow-compass": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowCompassIcon" */
            "mdi-react/ArrowCompassIcon"
        ),
    ),
    "mdi-syringe": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SyringeIcon" */
            "mdi-react/SyringeIcon"
        ),
    ),
    "mdi-network-strength-1-warning": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NetworkStrength1WarningIcon" */
            "mdi-react/NetworkStrength1WarningIcon"
        ),
    ),
    "mdi-network-strength-2-warning": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NetworkStrength2WarningIcon" */
            "mdi-react/NetworkStrength2WarningIcon"
        ),
    ),
    "mdi-network-strength-3-warning": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NetworkStrength3WarningIcon" */
            "mdi-react/NetworkStrength3WarningIcon"
        ),
    ),
    "mdi-network-strength-4-warning": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NetworkStrength4WarningIcon" */
            "mdi-react/NetworkStrength4WarningIcon"
        ),
    ),
    "mdi-network-strength-0": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NetworkStrength0Icon" */
            "mdi-react/NetworkStrength0Icon"
        ),
    ),
    "mdi-fiber-new": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FiberNewIcon" */
            "mdi-react/FiberNewIcon"
        ),
    ),
    "mdi-filter-1": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Filter1Icon" */
            "mdi-react/Filter1Icon"
        ),
    ),
    "mdi-looks-one": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LooksOneIcon" */
            "mdi-react/LooksOneIcon"
        ),
    ),
    "mdi-filter-2": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Filter2Icon" */
            "mdi-react/Filter2Icon"
        ),
    ),
    "mdi-looks-two": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LooksTwoIcon" */
            "mdi-react/LooksTwoIcon"
        ),
    ),
    "mdi-filter-3": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Filter3Icon" */
            "mdi-react/Filter3Icon"
        ),
    ),
    "mdi-looks-3": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Looks3Icon" */
            "mdi-react/Looks3Icon"
        ),
    ),
    "mdi-filter-4": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Filter4Icon" */
            "mdi-react/Filter4Icon"
        ),
    ),
    "mdi-looks-4": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Looks4Icon" */
            "mdi-react/Looks4Icon"
        ),
    ),
    "mdi-filter-5": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Filter5Icon" */
            "mdi-react/Filter5Icon"
        ),
    ),
    "mdi-looks-5": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Looks5Icon" */
            "mdi-react/Looks5Icon"
        ),
    ),
    "mdi-filter-6": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Filter6Icon" */
            "mdi-react/Filter6Icon"
        ),
    ),
    "mdi-looks-6": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Looks6Icon" */
            "mdi-react/Looks6Icon"
        ),
    ),
    "mdi-filter-7": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Filter7Icon" */
            "mdi-react/Filter7Icon"
        ),
    ),
    "mdi-filter-8": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Filter8Icon" */
            "mdi-react/Filter8Icon"
        ),
    ),
    "mdi-filter-9": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Filter9Icon" */
            "mdi-react/Filter9Icon"
        ),
    ),
    "mdi-filter-9-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Filter9PlusIcon" */
            "mdi-react/Filter9PlusIcon"
        ),
    ),
    "mdi-ok-ru": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/OkRuIcon" */
            "mdi-react/OkRuIcon"
        ),
    ),
    "mdi-open-in-browser": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/OpenInBrowserIcon" */
            "mdi-react/OpenInBrowserIcon"
        ),
    ),
    "mdi-external-link": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ExternalLinkIcon" */
            "mdi-react/ExternalLinkIcon"
        ),
    ),
    "mdi-unarchive": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UnarchiveIcon" */
            "mdi-react/UnarchiveIcon"
        ),
    ),
    "mdi-first-page": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FirstPageIcon" */
            "mdi-react/FirstPageIcon"
        ),
    ),
    "mdi-last-page": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LastPageIcon" */
            "mdi-react/LastPageIcon"
        ),
    ),
    "mdi-style": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/StyleIcon" */
            "mdi-react/StyleIcon"
        ),
    ),
    "mdi-color-lens": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ColorLensIcon" */
            "mdi-react/ColorLensIcon"
        ),
    ),
    "mdi-colour-lens": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ColourLensIcon" */
            "mdi-react/ColourLensIcon"
        ),
    ),
    "mdi-attachment-vertical": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AttachmentVerticalIcon" */
            "mdi-react/AttachmentVerticalIcon"
        ),
    ),
    "mdi-attach-file": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AttachFileIcon" */
            "mdi-react/AttachFileIcon"
        ),
    ),
    "mdi-car-park": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CarParkIcon" */
            "mdi-react/CarParkIcon"
        ),
    ),
    "mdi-local-parking": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LocalParkingIcon" */
            "mdi-react/LocalParkingIcon"
        ),
    ),
    "mdi-pause-circle-filled": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PauseCircleFilledIcon" */
            "mdi-react/PauseCircleFilledIcon"
        ),
    ),
    "mdi-pets": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PetsIcon" */
            "mdi-react/PetsIcon"
        ),
    ),
    "mdi-edit": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EditIcon" */
            "mdi-react/EditIcon"
        ),
    ),
    "mdi-create": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CreateIcon" */
            "mdi-react/CreateIcon"
        ),
    ),
    "mdi-mode-edit": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ModeEditIcon" */
            "mdi-react/ModeEditIcon"
        ),
    ),
    "mdi-chemist": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ChemistIcon" */
            "mdi-react/ChemistIcon"
        ),
    ),
    "mdi-local-pharmacy": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LocalPharmacyIcon" */
            "mdi-react/LocalPharmacyIcon"
        ),
    ),
    "mdi-phone-bluetooth-speaker": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PhoneBluetoothSpeakerIcon" */
            "mdi-react/PhoneBluetoothSpeakerIcon"
        ),
    ),
    "mdi-telephone-bluetooth": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TelephoneBluetoothIcon" */
            "mdi-react/TelephoneBluetoothIcon"
        ),
    ),
    "mdi-phone-forwarded": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PhoneForwardedIcon" */
            "mdi-react/PhoneForwardedIcon"
        ),
    ),
    "mdi-telephone-forward": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TelephoneForwardIcon" */
            "mdi-react/TelephoneForwardIcon"
        ),
    ),
    "mdi-call-end": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CallEndIcon" */
            "mdi-react/CallEndIcon"
        ),
    ),
    "mdi-telephone-hangup": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TelephoneHangupIcon" */
            "mdi-react/TelephoneHangupIcon"
        ),
    ),
    "mdi-telephone-in-talk": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TelephoneInTalkIcon" */
            "mdi-react/TelephoneInTalkIcon"
        ),
    ),
    "mdi-telephone-incoming": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TelephoneIncomingIcon" */
            "mdi-react/TelephoneIncomingIcon"
        ),
    ),
    "mdi-telephone-locked": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TelephoneLockedIcon" */
            "mdi-react/TelephoneLockedIcon"
        ),
    ),
    "mdi-add-call": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AddCallIcon" */
            "mdi-react/AddCallIcon"
        ),
    ),
    "mdi-settings-phone": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SettingsPhoneIcon" */
            "mdi-react/SettingsPhoneIcon"
        ),
    ),
    "mdi-call": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CallIcon" */
            "mdi-react/CallIcon"
        ),
    ),
    "mdi-local-phone": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LocalPhoneIcon" */
            "mdi-react/LocalPhoneIcon"
        ),
    ),
    "mdi-telephone": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TelephoneIcon" */
            "mdi-react/TelephoneIcon"
        ),
    ),
    "mdi-medicine": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MedicineIcon" */
            "mdi-react/MedicineIcon"
        ),
    ),
    "mdi-capsule": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CapsuleIcon" */
            "mdi-react/CapsuleIcon"
        ),
    ),
    "mdi-historic": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HistoricIcon" */
            "mdi-react/HistoricIcon"
        ),
    ),
    "mdi-column": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ColumnIcon" */
            "mdi-react/ColumnIcon"
        ),
    ),
    "mdi-keep-off-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/KeepOffOutlineIcon" */
            "mdi-react/KeepOffOutlineIcon"
        ),
    ),
    "mdi-keep-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/KeepOffIcon" */
            "mdi-react/KeepOffIcon"
        ),
    ),
    "mdi-keep-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/KeepOutlineIcon" */
            "mdi-react/KeepOutlineIcon"
        ),
    ),
    "mdi-keep": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/KeepIcon" */
            "mdi-react/KeepIcon"
        ),
    ),
    "mdi-gun": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GunIcon" */
            "mdi-react/GunIcon"
        ),
    ),
    "mdi-pizzeria": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PizzeriaIcon" */
            "mdi-react/PizzeriaIcon"
        ),
    ),
    "mdi-local-pizza": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LocalPizzaIcon" */
            "mdi-react/LocalPizzaIcon"
        ),
    ),
    "mdi-aeroplane-shield": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AeroplaneShieldIcon" */
            "mdi-react/AeroplaneShieldIcon"
        ),
    ),
    "mdi-airplane-shield": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AirplaneShieldIcon" */
            "mdi-react/AirplaneShieldIcon"
        ),
    ),
    "mdi-slideshow": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SlideshowIcon" */
            "mdi-react/SlideshowIcon"
        ),
    ),
    "mdi-play-circle-filled": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PlayCircleFilledIcon" */
            "mdi-react/PlayCircleFilledIcon"
        ),
    ),
    "mdi-media-network": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MediaNetworkIcon" */
            "mdi-react/MediaNetworkIcon"
        ),
    ),
    "mdi-play-arrow": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PlayArrowIcon" */
            "mdi-react/PlayArrowIcon"
        ),
    ),
    "mdi-subscriptions": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SubscriptionsIcon" */
            "mdi-react/SubscriptionsIcon"
        ),
    ),
    "mdi-playlist-add-check": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PlaylistAddCheckIcon" */
            "mdi-react/PlaylistAddCheckIcon"
        ),
    ),
    "mdi-playlist-add": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PlaylistAddIcon" */
            "mdi-react/PlaylistAddIcon"
        ),
    ),
    "mdi-add-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AddBoxIcon" */
            "mdi-react/AddBoxIcon"
        ),
    ),
    "mdi-control-point-duplicate": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ControlPointDuplicateIcon" */
            "mdi-react/ControlPointDuplicateIcon"
        ),
    ),
    "mdi-add-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AddCircleOutlineIcon" */
            "mdi-react/AddCircleOutlineIcon"
        ),
    ),
    "mdi-control-point": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ControlPointIcon" */
            "mdi-react/ControlPointIcon"
        ),
    ),
    "mdi-add-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AddCircleIcon" */
            "mdi-react/AddCircleIcon"
        ),
    ),
    "mdi-add": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AddIcon" */
            "mdi-react/AddIcon"
        ),
    ),
    "mdi-assessment": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AssessmentIcon" */
            "mdi-react/AssessmentIcon"
        ),
    ),
    "mdi-insert-chart": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/InsertChartIcon" */
            "mdi-react/InsertChartIcon"
        ),
    ),
    "mdi-bar-chart": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BarChartIcon" */
            "mdi-react/BarChartIcon"
        ),
    ),
    "mdi-hashtag-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HashtagBoxIcon" */
            "mdi-react/HashtagBoxIcon"
        ),
    ),
    "mdi-hashtag": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HashtagIcon" */
            "mdi-react/HashtagIcon"
        ),
    ),
    "mdi-settings-power": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SettingsPowerIcon" */
            "mdi-react/SettingsPowerIcon"
        ),
    ),
    "mdi-plug-socket-au": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PlugSocketAuIcon" */
            "mdi-react/PlugSocketAuIcon"
        ),
    ),
    "mdi-power-socket-type-i": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PowerSocketTypeIIcon" */
            "mdi-react/PowerSocketTypeIIcon"
        ),
    ),
    "mdi-power-socket-cn": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PowerSocketCnIcon" */
            "mdi-react/PowerSocketCnIcon"
        ),
    ),
    "mdi-power-socket-ar": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PowerSocketArIcon" */
            "mdi-react/PowerSocketArIcon"
        ),
    ),
    "mdi-power-socket-nz": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PowerSocketNzIcon" */
            "mdi-react/PowerSocketNzIcon"
        ),
    ),
    "mdi-power-socket-pg": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PowerSocketPgIcon" */
            "mdi-react/PowerSocketPgIcon"
        ),
    ),
    "mdi-plug-socket-eu": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PlugSocketEuIcon" */
            "mdi-react/PlugSocketEuIcon"
        ),
    ),
    "mdi-plug-socket-uk": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PlugSocketUkIcon" */
            "mdi-react/PlugSocketUkIcon"
        ),
    ),
    "mdi-power-socket-type-g": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PowerSocketTypeGIcon" */
            "mdi-react/PowerSocketTypeGIcon"
        ),
    ),
    "mdi-power-socket-ie": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PowerSocketIeIcon" */
            "mdi-react/PowerSocketIeIcon"
        ),
    ),
    "mdi-power-socket-hk": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PowerSocketHkIcon" */
            "mdi-react/PowerSocketHkIcon"
        ),
    ),
    "mdi-power-socket-my": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PowerSocketMyIcon" */
            "mdi-react/PowerSocketMyIcon"
        ),
    ),
    "mdi-power-socket-cy": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PowerSocketCyIcon" */
            "mdi-react/PowerSocketCyIcon"
        ),
    ),
    "mdi-power-socket-mt": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PowerSocketMtIcon" */
            "mdi-react/PowerSocketMtIcon"
        ),
    ),
    "mdi-power-socket-sg": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PowerSocketSgIcon" */
            "mdi-react/PowerSocketSgIcon"
        ),
    ),
    "mdi-plug-socket-us": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PlugSocketUsIcon" */
            "mdi-react/PlugSocketUsIcon"
        ),
    ),
    "mdi-power-socket-jp": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PowerSocketJpIcon" */
            "mdi-react/PowerSocketJpIcon"
        ),
    ),
    "mdi-power-socket-ca": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PowerSocketCaIcon" */
            "mdi-react/PowerSocketCaIcon"
        ),
    ),
    "mdi-power-socket-mx": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PowerSocketMxIcon" */
            "mdi-react/PowerSocketMxIcon"
        ),
    ),
    "mdi-power-socket-type-b": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PowerSocketTypeBIcon" */
            "mdi-react/PowerSocketTypeBIcon"
        ),
    ),
    "mdi-plug-socket": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PlugSocketIcon" */
            "mdi-react/PlugSocketIcon"
        ),
    ),
    "mdi-power-settings-new": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PowerSettingsNewIcon" */
            "mdi-react/PowerSettingsNewIcon"
        ),
    ),
    "mdi-shutdown": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ShutdownIcon" */
            "mdi-react/ShutdownIcon"
        ),
    ),
    "mdi-printer-warning": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PrinterWarningIcon" */
            "mdi-react/PrinterWarningIcon"
        ),
    ),
    "mdi-local-printshop": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LocalPrintshopIcon" */
            "mdi-react/LocalPrintshopIcon"
        ),
    ),
    "mdi-low-priority": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LowPriorityIcon" */
            "mdi-react/LowPriorityIcon"
        ),
    ),
    "mdi-extension": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ExtensionIcon" */
            "mdi-react/ExtensionIcon"
        ),
    ),
    "mdi-high-quality": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HighQualityIcon" */
            "mdi-react/HighQualityIcon"
        ),
    ),
    "mdi-bunny": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BunnyIcon" */
            "mdi-react/BunnyIcon"
        ),
    ),
    "mdi-track-changes": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TrackChangesIcon" */
            "mdi-react/TrackChangesIcon"
        ),
    ),
    "mdi-radio-button-unchecked": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RadioButtonUncheckedIcon" */
            "mdi-react/RadioButtonUncheckedIcon"
        ),
    ),
    "mdi-radio-button-checked": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RadioButtonCheckedIcon" */
            "mdi-react/RadioButtonCheckedIcon"
        ),
    ),
    "mdi-fiber-manual-record": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FiberManualRecordIcon" */
            "mdi-react/FiberManualRecordIcon"
        ),
    ),
    "mdi-image-aspect-ratio": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ImageAspectRatioIcon" */
            "mdi-react/ImageAspectRatioIcon"
        ),
    ),
    "mdi-settings-remote": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SettingsRemoteIcon" */
            "mdi-react/SettingsRemoteIcon"
        ),
    ),
    "mdi-repeat-one": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RepeatOneIcon" */
            "mdi-react/RepeatOneIcon"
        ),
    ),
    "mdi-fast-rewind": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FastRewindIcon" */
            "mdi-react/FastRewindIcon"
        ),
    ),
    "mdi-diamond-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DiamondOutlineIcon" */
            "mdi-react/DiamondOutlineIcon"
        ),
    ),
    "mdi-neato": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NeatoIcon" */
            "mdi-react/NeatoIcon"
        ),
    ),
    "mdi-roomba": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RoombaIcon" */
            "mdi-react/RoombaIcon"
        ),
    ),
    "mdi-arrow-rotate-left": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowRotateLeftIcon" */
            "mdi-react/ArrowRotateLeftIcon"
        ),
    ),
    "mdi-arrow-rotate-right": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArrowRotateRightIcon" */
            "mdi-react/ArrowRotateRightIcon"
        ),
    ),
    "mdi-sign-routes": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SignRoutesIcon" */
            "mdi-react/SignRoutesIcon"
        ),
    ),
    "mdi-rss-feed": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RssFeedIcon" */
            "mdi-react/RssFeedIcon"
        ),
    ),
    "mdi-directions-run": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DirectionsRunIcon" */
            "mdi-react/DirectionsRunIcon"
        ),
    ),
    "mdi-discount": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DiscountIcon" */
            "mdi-react/DiscountIcon"
        ),
    ),
    "mdi-graduation-cap": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GraduationCapIcon" */
            "mdi-react/GraduationCapIcon"
        ),
    ),
    "mdi-screen-lock-rotation": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ScreenLockRotationIcon" */
            "mdi-react/ScreenLockRotationIcon"
        ),
    ),
    "mdi-sd-card": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SdCardIcon" */
            "mdi-react/SdCardIcon"
        ),
    ),
    "mdi-sd-storage": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SdStorageIcon" */
            "mdi-react/SdStorageIcon"
        ),
    ),
    "mdi-airline-seat-flat-angled": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AirlineSeatFlatAngledIcon" */
            "mdi-react/AirlineSeatFlatAngledIcon"
        ),
    ),
    "mdi-airline-seat-flat": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AirlineSeatFlatIcon" */
            "mdi-react/AirlineSeatFlatIcon"
        ),
    ),
    "mdi-airline-seat-individual-suite": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AirlineSeatIndividualSuiteIcon" */
            "mdi-react/AirlineSeatIndividualSuiteIcon"
        ),
    ),
    "mdi-airline-seat-legroom-extra": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AirlineSeatLegroomExtraIcon" */
            "mdi-react/AirlineSeatLegroomExtraIcon"
        ),
    ),
    "mdi-airline-seat-legroom-normal": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AirlineSeatLegroomNormalIcon" */
            "mdi-react/AirlineSeatLegroomNormalIcon"
        ),
    ),
    "mdi-airline-seat-legroom-reduced": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AirlineSeatLegroomReducedIcon" */
            "mdi-react/AirlineSeatLegroomReducedIcon"
        ),
    ),
    "mdi-airline-seat-recline-extra": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AirlineSeatReclineExtraIcon" */
            "mdi-react/AirlineSeatReclineExtraIcon"
        ),
    ),
    "mdi-airline-seat-recline-normal": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AirlineSeatReclineNormalIcon" */
            "mdi-react/AirlineSeatReclineNormalIcon"
        ),
    ),
    "mdi-set-centre-right": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SetCentreRightIcon" */
            "mdi-react/SetCentreRightIcon"
        ),
    ),
    "mdi-set-centre": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SetCentreIcon" */
            "mdi-react/SetCentreIcon"
        ),
    ),
    "mdi-set-left-centre": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SetLeftCentreIcon" */
            "mdi-react/SetLeftCentreIcon"
        ),
    ),
    "mdi-gear-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GearBoxIcon" */
            "mdi-react/GearBoxIcon"
        ),
    ),
    "mdi-cog-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CogBoxIcon" */
            "mdi-react/CogBoxIcon"
        ),
    ),
    "mdi-settings-applications": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SettingsApplicationsIcon" */
            "mdi-react/SettingsApplicationsIcon"
        ),
    ),
    "mdi-cog-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CogOutlineIcon" */
            "mdi-react/CogOutlineIcon"
        ),
    ),
    "mdi-gear-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GearOutlineIcon" */
            "mdi-react/GearOutlineIcon"
        ),
    ),
    "mdi-cog": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CogIcon" */
            "mdi-react/CogIcon"
        ),
    ),
    "mdi-gear": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GearIcon" */
            "mdi-react/GearIcon"
        ),
    ),
    "mdi-theme": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ThemeIcon" */
            "mdi-react/ThemeIcon"
        ),
    ),
    "mdi-category": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CategoryIcon" */
            "mdi-react/CategoryIcon"
        ),
    ),
    "mdi-voyager": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VoyagerIcon" */
            "mdi-react/VoyagerIcon"
        ),
    ),
    "mdi-local-mall": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LocalMallIcon" */
            "mdi-react/LocalMallIcon"
        ),
    ),
    "mdi-summation": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SummationIcon" */
            "mdi-react/SummationIcon"
        ),
    ),
    "mdi-signal-cellular-0": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SignalCellular0Icon" */
            "mdi-react/SignalCellular0Icon"
        ),
    ),
    "mdi-local-dining": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LocalDiningIcon" */
            "mdi-react/LocalDiningIcon"
        ),
    ),
    "mdi-restaurant-menu": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RestaurantMenuIcon" */
            "mdi-react/RestaurantMenuIcon"
        ),
    ),
    "mdi-local-restaurant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LocalRestaurantIcon" */
            "mdi-react/LocalRestaurantIcon"
        ),
    ),
    "mdi-sim-warning": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SimWarningIcon" */
            "mdi-react/SimWarningIcon"
        ),
    ),
    "mdi-sim-card-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SimCardAlertIcon" */
            "mdi-react/SimCardAlertIcon"
        ),
    ),
    "mdi-signal-cellular-no-sim": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SignalCellularNoSimIcon" */
            "mdi-react/SignalCellularNoSimIcon"
        ),
    ),
    "mdi-sim-card": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SimCardIcon" */
            "mdi-react/SimCardIcon"
        ),
    ),
    "mdi-workflow": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WorkflowIcon" */
            "mdi-react/WorkflowIcon"
        ),
    ),
    "mdi-flowchart": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FlowchartIcon" */
            "mdi-react/FlowchartIcon"
        ),
    ),
    "mdi-title-backward": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TitleBackwardIcon" */
            "mdi-react/TitleBackwardIcon"
        ),
    ),
    "mdi-previous-title": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PreviousTitleIcon" */
            "mdi-react/PreviousTitleIcon"
        ),
    ),
    "mdi-title-forward": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TitleForwardIcon" */
            "mdi-react/TitleForwardIcon"
        ),
    ),
    "mdi-next-title": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NextTitleIcon" */
            "mdi-react/NextTitleIcon"
        ),
    ),
    "mdi-nest-protect": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NestProtectIcon" */
            "mdi-react/NestProtectIcon"
        ),
    ),
    "mdi-no-smoking": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NoSmokingIcon" */
            "mdi-react/NoSmokingIcon"
        ),
    ),
    "mdi-cigarette-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CigaretteOffIcon" */
            "mdi-react/CigaretteOffIcon"
        ),
    ),
    "mdi-smoke-free": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SmokeFreeIcon" */
            "mdi-react/SmokeFreeIcon"
        ),
    ),
    "mdi-cigarette": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CigaretteIcon" */
            "mdi-react/CigaretteIcon"
        ),
    ),
    "mdi-smoking-area": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SmokingAreaIcon" */
            "mdi-react/SmokingAreaIcon"
        ),
    ),
    "mdi-smoking-rooms": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SmokingRoomsIcon" */
            "mdi-react/SmokingRoomsIcon"
        ),
    ),
    "mdi-football-pitch": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FootballPitchIcon" */
            "mdi-react/FootballPitchIcon"
        ),
    ),
    "mdi-couch": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CouchIcon" */
            "mdi-react/CouchIcon"
        ),
    ),
    "mdi-sort-by-alpha": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SortByAlphaIcon" */
            "mdi-react/SortByAlphaIcon"
        ),
    ),
    "mdi-paint": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PaintIcon" */
            "mdi-react/PaintIcon"
        ),
    ),
    "mdi-aerosol": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AerosolIcon" */
            "mdi-react/AerosolIcon"
        ),
    ),
    "mdi-arena": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ArenaIcon" */
            "mdi-react/ArenaIcon"
        ),
    ),
    "mdi-feature-highlight": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FeatureHighlightIcon" */
            "mdi-react/FeatureHighlightIcon"
        ),
    ),
    "mdi-stars": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/StarsIcon" */
            "mdi-react/StarsIcon"
        ),
    ),
    "mdi-star-border": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/StarBorderIcon" */
            "mdi-react/StarBorderIcon"
        ),
    ),
    "mdi-grade": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/GradeIcon" */
            "mdi-react/GradeIcon"
        ),
    ),
    "mdi-star-rate": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/StarRateIcon" */
            "mdi-react/StarRateIcon"
        ),
    ),
    "mdi-search-hands-free-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SearchHandsFreeOffIcon" */
            "mdi-react/SearchHandsFreeOffIcon"
        ),
    ),
    "mdi-search-hands-free": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SearchHandsFreeIcon" */
            "mdi-react/SearchHandsFreeIcon"
        ),
    ),
    "mdi-frame-backward": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FrameBackwardIcon" */
            "mdi-react/FrameBackwardIcon"
        ),
    ),
    "mdi-frame-forward": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FrameForwardIcon" */
            "mdi-react/FrameForwardIcon"
        ),
    ),
    "mdi-local-convenience-store": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LocalConvenienceStoreIcon" */
            "mdi-react/LocalConvenienceStoreIcon"
        ),
    ),
    "mdi-shop-24-hour": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/Shop24HourIcon" */
            "mdi-react/Shop24HourIcon"
        ),
    ),
    "mdi-shop": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ShopIcon" */
            "mdi-react/ShopIcon"
        ),
    ),
    "mdi-store-mall-directory": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/StoreMallDirectoryIcon" */
            "mdi-react/StoreMallDirectoryIcon"
        ),
    ),
    "mdi-cooker": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CookerIcon" */
            "mdi-react/CookerIcon"
        ),
    ),
    "mdi-oven": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/OvenIcon" */
            "mdi-react/OvenIcon"
        ),
    ),
    "mdi-metro-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MetroVariantIcon" */
            "mdi-react/MetroVariantIcon"
        ),
    ),
    "mdi-tube-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TubeVariantIcon" */
            "mdi-react/TubeVariantIcon"
        ),
    ),
    "mdi-underground-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UndergroundVariantIcon" */
            "mdi-react/UndergroundVariantIcon"
        ),
    ),
    "mdi-directions-subway": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DirectionsSubwayIcon" */
            "mdi-react/DirectionsSubwayIcon"
        ),
    ),
    "mdi-directions-transit": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DirectionsTransitIcon" */
            "mdi-react/DirectionsTransitIcon"
        ),
    ),
    "mdi-metro": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MetroIcon" */
            "mdi-react/MetroIcon"
        ),
    ),
    "mdi-tube": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TubeIcon" */
            "mdi-react/TubeIcon"
        ),
    ),
    "mdi-underground": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UndergroundIcon" */
            "mdi-react/UndergroundIcon"
        ),
    ),
    "mdi-peak": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/PeakIcon" */
            "mdi-react/PeakIcon"
        ),
    ),
    "mdi-stereo": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/StereoIcon" */
            "mdi-react/StereoIcon"
        ),
    ),
    "mdi-swap-calls": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SwapCallsIcon" */
            "mdi-react/SwapCallsIcon"
        ),
    ),
    "mdi-import-export": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ImportExportIcon" */
            "mdi-react/ImportExportIcon"
        ),
    ),
    "mdi-sync-warning": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SyncWarningIcon" */
            "mdi-react/SyncWarningIcon"
        ),
    ),
    "mdi-sync-problem": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SyncProblemIcon" */
            "mdi-react/SyncProblemIcon"
        ),
    ),
    "mdi-sync-disabled": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SyncDisabledIcon" */
            "mdi-react/SyncDisabledIcon"
        ),
    ),
    "mdi-toc": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TocIcon" */
            "mdi-react/TocIcon"
        ),
    ),
    "mdi-mobile-devices": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MobileDevicesIcon" */
            "mdi-react/MobileDevicesIcon"
        ),
    ),
    "mdi-tablet-mac": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TabletMacIcon" */
            "mdi-react/TabletMacIcon"
        ),
    ),
    "mdi-loyalty": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LoyaltyIcon" */
            "mdi-react/LoyaltyIcon"
        ),
    ),
    "mdi-local-offer": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LocalOfferIcon" */
            "mdi-react/LocalOfferIcon"
        ),
    ),
    "mdi-local-taxi": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LocalTaxiIcon" */
            "mdi-react/LocalTaxiIcon"
        ),
    ),
    "mdi-teacher": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TeacherIcon" */
            "mdi-react/TeacherIcon"
        ),
    ),
    "mdi-teaching": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TeachingIcon" */
            "mdi-react/TeachingIcon"
        ),
    ),
    "mdi-tv-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TvBoxIcon" */
            "mdi-react/TvBoxIcon"
        ),
    ),
    "mdi-tv-guide": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TvGuideIcon" */
            "mdi-react/TvGuideIcon"
        ),
    ),
    "mdi-tv-classic-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TvClassicOffIcon" */
            "mdi-react/TvClassicOffIcon"
        ),
    ),
    "mdi-tv-classic": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TvClassicIcon" */
            "mdi-react/TvClassicIcon"
        ),
    ),
    "mdi-tv-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TvOffIcon" */
            "mdi-react/TvOffIcon"
        ),
    ),
    "mdi-tv": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TvIcon" */
            "mdi-react/TvIcon"
        ),
    ),
    "mdi-temperature-centigrade": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TemperatureCentigradeIcon" */
            "mdi-react/TemperatureCentigradeIcon"
        ),
    ),
    "mdi-camping": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CampingIcon" */
            "mdi-react/CampingIcon"
        ),
    ),
    "mdi-cinema": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CinemaIcon" */
            "mdi-react/CinemaIcon"
        ),
    ),
    "mdi-theatre": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TheatreIcon" */
            "mdi-react/TheatreIcon"
        ),
    ),
    "mdi-sun-moon-stars": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SunMoonStarsIcon" */
            "mdi-react/SunMoonStarsIcon"
        ),
    ),
    "mdi-nest": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NestIcon" */
            "mdi-react/NestIcon"
        ),
    ),
    "mdi-comic-thought-bubble-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ComicThoughtBubbleOutlineIcon" */
            "mdi-react/ComicThoughtBubbleOutlineIcon"
        ),
    ),
    "mdi-comic-bubble": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ComicBubbleIcon" */
            "mdi-react/ComicBubbleIcon"
        ),
    ),
    "mdi-dislike-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DislikeOutlineIcon" */
            "mdi-react/DislikeOutlineIcon"
        ),
    ),
    "mdi-thumbs-down-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ThumbsDownOutlineIcon" */
            "mdi-react/ThumbsDownOutlineIcon"
        ),
    ),
    "mdi-dislike": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DislikeIcon" */
            "mdi-react/DislikeIcon"
        ),
    ),
    "mdi-thumbs-down": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ThumbsDownIcon" */
            "mdi-react/ThumbsDownIcon"
        ),
    ),
    "mdi-like-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LikeOutlineIcon" */
            "mdi-react/LikeOutlineIcon"
        ),
    ),
    "mdi-thumbs-up-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ThumbsUpOutlineIcon" */
            "mdi-react/ThumbsUpOutlineIcon"
        ),
    ),
    "mdi-like": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LikeIcon" */
            "mdi-react/LikeIcon"
        ),
    ),
    "mdi-thumbs-up": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ThumbsUpIcon" */
            "mdi-react/ThumbsUpIcon"
        ),
    ),
    "mdi-like-dislike": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LikeDislikeIcon" */
            "mdi-react/LikeDislikeIcon"
        ),
    ),
    "mdi-ticket-user": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TicketUserIcon" */
            "mdi-react/TicketUserIcon"
        ),
    ),
    "mdi-confirmation-number": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ConfirmationNumberIcon" */
            "mdi-react/ConfirmationNumberIcon"
        ),
    ),
    "mdi-coupon": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CouponIcon" */
            "mdi-react/CouponIcon"
        ),
    ),
    "mdi-voucher": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VoucherIcon" */
            "mdi-react/VoucherIcon"
        ),
    ),
    "mdi-local-activity": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LocalActivityIcon" */
            "mdi-react/LocalActivityIcon"
        ),
    ),
    "mdi-local-play": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LocalPlayIcon" */
            "mdi-react/LocalPlayIcon"
        ),
    ),
    "mdi-local-attraction": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LocalAttractionIcon" */
            "mdi-react/LocalAttractionIcon"
        ),
    ),
    "mdi-stopwatch-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/StopwatchOffIcon" */
            "mdi-react/StopwatchOffIcon"
        ),
    ),
    "mdi-hourglass-empty": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HourglassEmptyIcon" */
            "mdi-react/HourglassEmptyIcon"
        ),
    ),
    "mdi-hourglass-full": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HourglassFullIcon" */
            "mdi-react/HourglassFullIcon"
        ),
    ),
    "mdi-hourglass": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HourglassIcon" */
            "mdi-react/HourglassIcon"
        ),
    ),
    "mdi-stopwatch": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/StopwatchIcon" */
            "mdi-react/StopwatchIcon"
        ),
    ),
    "mdi-bracket": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BracketIcon" */
            "mdi-react/BracketIcon"
        ),
    ),
    "mdi-auto-towing": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AutoTowingIcon" */
            "mdi-react/AutoTowingIcon"
        ),
    ),
    "mdi-directions-railway": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DirectionsRailwayIcon" */
            "mdi-react/DirectionsRailwayIcon"
        ),
    ),
    "mdi-transfer-within-a-station": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TransferWithinAStationIcon" */
            "mdi-react/TransferWithinAStationIcon"
        ),
    ),
    "mdi-masked-transitions": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MaskedTransitionsIcon" */
            "mdi-react/MaskedTransitionsIcon"
        ),
    ),
    "mdi-motion": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MotionIcon" */
            "mdi-react/MotionIcon"
        ),
    ),
    "mdi-language": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LanguageIcon" */
            "mdi-react/LanguageIcon"
        ),
    ),
    "mdi-trending-flat": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/TrendingFlatIcon" */
            "mdi-react/TrendingFlatIcon"
        ),
    ),
    "mdi-achievement-award": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AchievementAwardIcon" */
            "mdi-react/AchievementAwardIcon"
        ),
    ),
    "mdi-achievement-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AchievementOutlineIcon" */
            "mdi-react/AchievementOutlineIcon"
        ),
    ),
    "mdi-achievement-variant-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AchievementVariantOutlineIcon" */
            "mdi-react/AchievementVariantOutlineIcon"
        ),
    ),
    "mdi-achievement-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AchievementVariantIcon" */
            "mdi-react/AchievementVariantIcon"
        ),
    ),
    "mdi-achievement": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AchievementIcon" */
            "mdi-react/AchievementIcon"
        ),
    ),
    "mdi-lorry-delivery": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LorryDeliveryIcon" */
            "mdi-react/LorryDeliveryIcon"
        ),
    ),
    "mdi-lorry-fast": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LorryFastIcon" */
            "mdi-react/LorryFastIcon"
        ),
    ),
    "mdi-lorry": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LorryIcon" */
            "mdi-react/LorryIcon"
        ),
    ),
    "mdi-local-shipping": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LocalShippingIcon" */
            "mdi-react/LocalShippingIcon"
        ),
    ),
    "mdi-equaliser-vertical": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EqualiserVerticalIcon" */
            "mdi-react/EqualiserVerticalIcon"
        ),
    ),
    "mdi-instant-mix": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/InstantMixIcon" */
            "mdi-react/InstantMixIcon"
        ),
    ),
    "mdi-mixer-settings": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MixerSettingsIcon" */
            "mdi-react/MixerSettingsIcon"
        ),
    ),
    "mdi-equaliser": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/EqualiserIcon" */
            "mdi-react/EqualiserIcon"
        ),
    ),
    "mdi-uhd": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UhdIcon" */
            "mdi-react/UhdIcon"
        ),
    ),
    "mdi-unreal-engine": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/UnrealEngineIcon" */
            "mdi-react/UnrealEngineIcon"
        ),
    ),
    "mdi-clockwise": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ClockwiseIcon" */
            "mdi-react/ClockwiseIcon"
        ),
    ),
    "mdi-file-upload": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FileUploadIcon" */
            "mdi-react/FileUploadIcon"
        ),
    ),
    "mdi-van-candy": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VanCandyIcon" */
            "mdi-react/VanCandyIcon"
        ),
    ),
    "mdi-bezier": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BezierIcon" */
            "mdi-react/BezierIcon"
        ),
    ),
    "mdi-shield-check": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/ShieldCheckIcon" */
            "mdi-react/ShieldCheckIcon"
        ),
    ),
    "mdi-verified-user": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VerifiedUserIcon" */
            "mdi-react/VerifiedUserIcon"
        ),
    ),
    "mdi-vibration": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VibrationIcon" */
            "mdi-react/VibrationIcon"
        ),
    ),
    "mdi-video-user": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VideoUserIcon" */
            "mdi-react/VideoUserIcon"
        ),
    ),
    "mdi-settings-input-antenna": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SettingsInputAntennaIcon" */
            "mdi-react/SettingsInputAntennaIcon"
        ),
    ),
    "mdi-video-input-composite": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VideoInputCompositeIcon" */
            "mdi-react/VideoInputCompositeIcon"
        ),
    ),
    "mdi-settings-input-component": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SettingsInputComponentIcon" */
            "mdi-react/SettingsInputComponentIcon"
        ),
    ),
    "mdi-settings-input-composite": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SettingsInputCompositeIcon" */
            "mdi-react/SettingsInputCompositeIcon"
        ),
    ),
    "mdi-video-input-ypbpr": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VideoInputYpbprIcon" */
            "mdi-react/VideoInputYpbprIcon"
        ),
    ),
    "mdi-rca": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RcaIcon" */
            "mdi-react/RcaIcon"
        ),
    ),
    "mdi-settings-input-hdmi": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SettingsInputHdmiIcon" */
            "mdi-react/SettingsInputHdmiIcon"
        ),
    ),
    "mdi-settings-input-svideo": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SettingsInputSvideoIcon" */
            "mdi-react/SettingsInputSvideoIcon"
        ),
    ),
    "mdi-videocam-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VideocamOffIcon" */
            "mdi-react/VideocamOffIcon"
        ),
    ),
    "mdi-video-call": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VideoCallIcon" */
            "mdi-react/VideoCallIcon"
        ),
    ),
    "mdi-video-stabilisation": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VideoStabilisationIcon" */
            "mdi-react/VideoStabilisationIcon"
        ),
    ),
    "mdi-switch-video": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SwitchVideoIcon" */
            "mdi-react/SwitchVideoIcon"
        ),
    ),
    "mdi-videocam": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VideocamIcon" */
            "mdi-react/VideocamIcon"
        ),
    ),
    "mdi-vr": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VrIcon" */
            "mdi-react/VrIcon"
        ),
    ),
    "mdi-vkontakte-box": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VkontakteBoxIcon" */
            "mdi-react/VkontakteBoxIcon"
        ),
    ),
    "mdi-vkontakte-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VkontakteCircleIcon" */
            "mdi-react/VkontakteCircleIcon"
        ),
    ),
    "mdi-vkontakte": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VkontakteIcon" */
            "mdi-react/VkontakteIcon"
        ),
    ),
    "mdi-record-voice-over": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RecordVoiceOverIcon" */
            "mdi-react/RecordVoiceOverIcon"
        ),
    ),
    "mdi-audio": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AudioIcon" */
            "mdi-react/AudioIcon"
        ),
    ),
    "mdi-speakerphone": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SpeakerphoneIcon" */
            "mdi-react/SpeakerphoneIcon"
        ),
    ),
    "mdi-mute": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MuteIcon" */
            "mdi-react/MuteIcon"
        ),
    ),
    "mdi-audio-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AudioOffIcon" */
            "mdi-react/AudioOffIcon"
        ),
    ),
    "mdi-speakerphone-off": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/SpeakerphoneOffIcon" */
            "mdi-react/SpeakerphoneOffIcon"
        ),
    ),
    "mdi-directions-walk": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/DirectionsWalkIcon" */
            "mdi-react/DirectionsWalkIcon"
        ),
    ),
    "mdi-card-giftcard": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CardGiftcardIcon" */
            "mdi-react/CardGiftcardIcon"
        ),
    ),
    "mdi-redeem": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/RedeemIcon" */
            "mdi-react/RedeemIcon"
        ),
    ),
    "mdi-card-membership": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CardMembershipIcon" */
            "mdi-react/CardMembershipIcon"
        ),
    ),
    "mdi-card-travel": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/CardTravelIcon" */
            "mdi-react/CardTravelIcon"
        ),
    ),
    "mdi-account-balance-wallet": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AccountBalanceWalletIcon" */
            "mdi-react/AccountBalanceWalletIcon"
        ),
    ),
    "mdi-laundrette": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LaundretteIcon" */
            "mdi-react/LaundretteIcon"
        ),
    ),
    "mdi-local-laundry-service": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/LocalLaundryServiceIcon" */
            "mdi-react/LocalLaundryServiceIcon"
        ),
    ),
    "mdi-format-color-reset": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/FormatColorResetIcon" */
            "mdi-react/FormatColorResetIcon"
        ),
    ),
    "mdi-humidity": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/HumidityIcon" */
            "mdi-react/HumidityIcon"
        ),
    ),
    "mdi-branding-watermark": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BrandingWatermarkIcon" */
            "mdi-react/BrandingWatermarkIcon"
        ),
    ),
    "mdi-moon-and-stars": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MoonAndStarsIcon" */
            "mdi-react/MoonAndStarsIcon"
        ),
    ),
    "mdi-night-sky": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/NightSkyIcon" */
            "mdi-react/NightSkyIcon"
        ),
    ),
    "mdi-accessible": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/AccessibleIcon" */
            "mdi-react/AccessibleIcon"
        ),
    ),
    "mdi-wb-auto": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WbAutoIcon" */
            "mdi-react/WbAutoIcon"
        ),
    ),
    "mdi-wb-incandescent": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WbIncandescentIcon" */
            "mdi-react/WbIncandescentIcon"
        ),
    ),
    "mdi-wb-iridescent": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WbIridescentIcon" */
            "mdi-react/WbIridescentIcon"
        ),
    ),
    "mdi-wb-sunny": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WbSunnyIcon" */
            "mdi-react/WbSunnyIcon"
        ),
    ),
    "mdi-wifi-strength-1-warning": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WifiStrength1WarningIcon" */
            "mdi-react/WifiStrength1WarningIcon"
        ),
    ),
    "mdi-wifi-strength-2-warning": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WifiStrength2WarningIcon" */
            "mdi-react/WifiStrength2WarningIcon"
        ),
    ),
    "mdi-wifi-strength-3-warning": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WifiStrength3WarningIcon" */
            "mdi-react/WifiStrength3WarningIcon"
        ),
    ),
    "mdi-wifi-strength-4-warning": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WifiStrength4WarningIcon" */
            "mdi-react/WifiStrength4WarningIcon"
        ),
    ),
    "mdi-wifi-strength-warning-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WifiStrengthWarningOutlineIcon" */
            "mdi-react/WifiStrengthWarningOutlineIcon"
        ),
    ),
    "mdi-wifi-strength-0-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WifiStrength0AlertIcon" */
            "mdi-react/WifiStrength0AlertIcon"
        ),
    ),
    "mdi-wifi-strength-0-warning": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WifiStrength0WarningIcon" */
            "mdi-react/WifiStrength0WarningIcon"
        ),
    ),
    "mdi-wifi-strength-0-lock": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WifiStrength0LockIcon" */
            "mdi-react/WifiStrength0LockIcon"
        ),
    ),
    "mdi-wifi-strength-0": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/WifiStrength0Icon" */
            "mdi-react/WifiStrength0Icon"
        ),
    ),
    "mdi-build": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/BuildIcon" */
            "mdi-react/BuildIcon"
        ),
    ),
    "mdi-microsoft-xamarin-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MicrosoftXamarinOutlineIcon" */
            "mdi-react/MicrosoftXamarinOutlineIcon"
        ),
    ),
    "mdi-microsoft-xamarin": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/MicrosoftXamarinIcon" */
            "mdi-react/MicrosoftXamarinIcon"
        ),
    ),
    "mdi-xbox-controller-battery-warning": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/XboxControllerBatteryWarningIcon" */
            "mdi-react/XboxControllerBatteryWarningIcon"
        ),
    ),
    "mdi-video-youtube": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/VideoYoutubeIcon" */
            "mdi-react/VideoYoutubeIcon"
        ),
    ),
    "mdi-youtube-play": React.lazy(() =>
        import(
            /* webpackChunkName: "mdi/YoutubePlayIcon" */
            "mdi-react/YoutubePlayIcon"
        ),
    ),
};

const MDIIcon = ({iconfont, size, ...otherPops}: IProps) => {
    // @ts-ignore
    const IconComponent = mapIcon[iconfont];

    return IconComponent ? <IconComponent size={SIZE_MAP[size]} {...otherPops} /> : null;
};

export default MDIIcon;
