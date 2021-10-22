/* eslint-disable sort-keys, @typescript-eslint/ban-ts-comment, max-len */
import * as React from "react";
import {mapComponents} from "@essence-community/constructor-share/Icon/Icon";

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
            /* webpackChunkName: "AccessPointNetworkIcon" */
            "mdi-react/AccessPointNetworkIcon"
        ),
    ),
    "mdi-access-point": React.lazy(() =>
        import(
            /* webpackChunkName: "AccessPointIcon" */
            "mdi-react/AccessPointIcon"
        ),
    ),
    "mdi-account-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "AccountAlertIcon" */
            "mdi-react/AccountAlertIcon"
        ),
    ),
    "mdi-account-box-multiple": React.lazy(() =>
        import(
            /* webpackChunkName: "AccountBoxMultipleIcon" */
            "mdi-react/AccountBoxMultipleIcon"
        ),
    ),
    "mdi-account-box-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "AccountBoxOutlineIcon" */
            "mdi-react/AccountBoxOutlineIcon"
        ),
    ),
    "mdi-account-box": React.lazy(() =>
        import(
            /* webpackChunkName: "AccountBoxIcon" */
            "mdi-react/AccountBoxIcon"
        ),
    ),
    "mdi-account-card-details": React.lazy(() =>
        import(
            /* webpackChunkName: "AccountCardDetailsIcon" */
            "mdi-react/AccountCardDetailsIcon"
        ),
    ),
    "mdi-account-check": React.lazy(() =>
        import(
            /* webpackChunkName: "AccountCheckIcon" */
            "mdi-react/AccountCheckIcon"
        ),
    ),
    "mdi-account-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "AccountCircleIcon" */
            "mdi-react/AccountCircleIcon"
        ),
    ),
    "mdi-account-convert": React.lazy(() =>
        import(
            /* webpackChunkName: "AccountConvertIcon" */
            "mdi-react/AccountConvertIcon"
        ),
    ),
    "mdi-account-edit": React.lazy(() =>
        import(
            /* webpackChunkName: "AccountEditIcon" */
            "mdi-react/AccountEditIcon"
        ),
    ),
    "mdi-account-group": React.lazy(() =>
        import(
            /* webpackChunkName: "AccountGroupIcon" */
            "mdi-react/AccountGroupIcon"
        ),
    ),
    "mdi-account-heart": React.lazy(() =>
        import(
            /* webpackChunkName: "AccountHeartIcon" */
            "mdi-react/AccountHeartIcon"
        ),
    ),
    "mdi-account-key": React.lazy(() =>
        import(
            /* webpackChunkName: "AccountKeyIcon" */
            "mdi-react/AccountKeyIcon"
        ),
    ),
    "mdi-account-location": React.lazy(() =>
        import(
            /* webpackChunkName: "AccountLocationIcon" */
            "mdi-react/AccountLocationIcon"
        ),
    ),
    "mdi-account-minus": React.lazy(() =>
        import(
            /* webpackChunkName: "AccountMinusIcon" */
            "mdi-react/AccountMinusIcon"
        ),
    ),
    "mdi-account-multiple-check": React.lazy(() =>
        import(
            /* webpackChunkName: "AccountMultipleCheckIcon" */
            "mdi-react/AccountMultipleCheckIcon"
        ),
    ),
    "mdi-account-multiple-minus": React.lazy(() =>
        import(
            /* webpackChunkName: "AccountMultipleMinusIcon" */
            "mdi-react/AccountMultipleMinusIcon"
        ),
    ),
    "mdi-account-multiple-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "AccountMultipleOutlineIcon" */
            "mdi-react/AccountMultipleOutlineIcon"
        ),
    ),
    "mdi-account-multiple-plus-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "AccountMultiplePlusOutlineIcon" */
            "mdi-react/AccountMultiplePlusOutlineIcon"
        ),
    ),
    "mdi-account-multiple-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "AccountMultiplePlusIcon" */
            "mdi-react/AccountMultiplePlusIcon"
        ),
    ),
    "mdi-account-multiple": React.lazy(() =>
        import(
            /* webpackChunkName: "AccountMultipleIcon" */
            "mdi-react/AccountMultipleIcon"
        ),
    ),
    "mdi-account-network": React.lazy(() =>
        import(
            /* webpackChunkName: "AccountNetworkIcon" */
            "mdi-react/AccountNetworkIcon"
        ),
    ),
    "mdi-account-off": React.lazy(() =>
        import(
            /* webpackChunkName: "AccountOffIcon" */
            "mdi-react/AccountOffIcon"
        ),
    ),
    "mdi-account-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "AccountOutlineIcon" */
            "mdi-react/AccountOutlineIcon"
        ),
    ),
    "mdi-account-plus-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "AccountPlusOutlineIcon" */
            "mdi-react/AccountPlusOutlineIcon"
        ),
    ),
    "mdi-account-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "AccountPlusIcon" */
            "mdi-react/AccountPlusIcon"
        ),
    ),
    "mdi-account-remove": React.lazy(() =>
        import(
            /* webpackChunkName: "AccountRemoveIcon" */
            "mdi-react/AccountRemoveIcon"
        ),
    ),
    "mdi-account-search-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "AccountSearchOutlineIcon" */
            "mdi-react/AccountSearchOutlineIcon"
        ),
    ),
    "mdi-account-search": React.lazy(() =>
        import(
            /* webpackChunkName: "AccountSearchIcon" */
            "mdi-react/AccountSearchIcon"
        ),
    ),
    "mdi-account-settings-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "AccountSettingsVariantIcon" */
            "mdi-react/AccountSettingsVariantIcon"
        ),
    ),
    "mdi-account-settings": React.lazy(() =>
        import(
            /* webpackChunkName: "AccountSettingsIcon" */
            "mdi-react/AccountSettingsIcon"
        ),
    ),
    "mdi-account-star": React.lazy(() =>
        import(
            /* webpackChunkName: "AccountStarIcon" */
            "mdi-react/AccountStarIcon"
        ),
    ),
    "mdi-account-switch": React.lazy(() =>
        import(
            /* webpackChunkName: "AccountSwitchIcon" */
            "mdi-react/AccountSwitchIcon"
        ),
    ),
    "mdi-account": React.lazy(() =>
        import(
            /* webpackChunkName: "AccountIcon" */
            "mdi-react/AccountIcon"
        ),
    ),
    "mdi-accusoft": React.lazy(() =>
        import(
            /* webpackChunkName: "AccusoftIcon" */
            "mdi-react/AccusoftIcon"
        ),
    ),
    "mdi-adjust": React.lazy(() =>
        import(
            /* webpackChunkName: "AdjustIcon" */
            "mdi-react/AdjustIcon"
        ),
    ),
    "mdi-adobe": React.lazy(() =>
        import(
            /* webpackChunkName: "AdobeIcon" */
            "mdi-react/AdobeIcon"
        ),
    ),
    "mdi-air-conditioner": React.lazy(() =>
        import(
            /* webpackChunkName: "AirConditionerIcon" */
            "mdi-react/AirConditionerIcon"
        ),
    ),
    "mdi-airballoon": React.lazy(() =>
        import(
            /* webpackChunkName: "AirballoonIcon" */
            "mdi-react/AirballoonIcon"
        ),
    ),
    "mdi-airplane-landing": React.lazy(() =>
        import(
            /* webpackChunkName: "AirplaneLandingIcon" */
            "mdi-react/AirplaneLandingIcon"
        ),
    ),
    "mdi-airplane-off": React.lazy(() =>
        import(
            /* webpackChunkName: "AirplaneOffIcon" */
            "mdi-react/AirplaneOffIcon"
        ),
    ),
    "mdi-airplane-takeoff": React.lazy(() =>
        import(
            /* webpackChunkName: "AirplaneTakeoffIcon" */
            "mdi-react/AirplaneTakeoffIcon"
        ),
    ),
    "mdi-airplane": React.lazy(() =>
        import(
            /* webpackChunkName: "AirplaneIcon" */
            "mdi-react/AirplaneIcon"
        ),
    ),
    "mdi-airplay": React.lazy(() =>
        import(
            /* webpackChunkName: "AirplayIcon" */
            "mdi-react/AirplayIcon"
        ),
    ),
    "mdi-airport": React.lazy(() =>
        import(
            /* webpackChunkName: "AirportIcon" */
            "mdi-react/AirportIcon"
        ),
    ),
    "mdi-alarm-bell": React.lazy(() =>
        import(
            /* webpackChunkName: "AlarmBellIcon" */
            "mdi-react/AlarmBellIcon"
        ),
    ),
    "mdi-alarm-check": React.lazy(() =>
        import(
            /* webpackChunkName: "AlarmCheckIcon" */
            "mdi-react/AlarmCheckIcon"
        ),
    ),
    "mdi-alarm-light": React.lazy(() =>
        import(
            /* webpackChunkName: "AlarmLightIcon" */
            "mdi-react/AlarmLightIcon"
        ),
    ),
    "mdi-alarm-multiple": React.lazy(() =>
        import(
            /* webpackChunkName: "AlarmMultipleIcon" */
            "mdi-react/AlarmMultipleIcon"
        ),
    ),
    "mdi-alarm-off": React.lazy(() =>
        import(
            /* webpackChunkName: "AlarmOffIcon" */
            "mdi-react/AlarmOffIcon"
        ),
    ),
    "mdi-alarm-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "AlarmPlusIcon" */
            "mdi-react/AlarmPlusIcon"
        ),
    ),
    "mdi-alarm-snooze": React.lazy(() =>
        import(
            /* webpackChunkName: "AlarmSnoozeIcon" */
            "mdi-react/AlarmSnoozeIcon"
        ),
    ),
    "mdi-alarm": React.lazy(() =>
        import(
            /* webpackChunkName: "AlarmIcon" */
            "mdi-react/AlarmIcon"
        ),
    ),
    "mdi-album": React.lazy(() =>
        import(
            /* webpackChunkName: "AlbumIcon" */
            "mdi-react/AlbumIcon"
        ),
    ),
    "mdi-alert-box": React.lazy(() =>
        import(
            /* webpackChunkName: "AlertBoxIcon" */
            "mdi-react/AlertBoxIcon"
        ),
    ),
    "mdi-alert-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "AlertCircleOutlineIcon" */
            "mdi-react/AlertCircleOutlineIcon"
        ),
    ),
    "mdi-alert-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "AlertCircleIcon" */
            "mdi-react/AlertCircleIcon"
        ),
    ),
    "mdi-alert-decagram": React.lazy(() =>
        import(
            /* webpackChunkName: "AlertDecagramIcon" */
            "mdi-react/AlertDecagramIcon"
        ),
    ),
    "mdi-alert-octagon": React.lazy(() =>
        import(
            /* webpackChunkName: "AlertOctagonIcon" */
            "mdi-react/AlertOctagonIcon"
        ),
    ),
    "mdi-alert-octagram": React.lazy(() =>
        import(
            /* webpackChunkName: "AlertOctagramIcon" */
            "mdi-react/AlertOctagramIcon"
        ),
    ),
    "mdi-alert-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "AlertOutlineIcon" */
            "mdi-react/AlertOutlineIcon"
        ),
    ),
    "mdi-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "AlertIcon" */
            "mdi-react/AlertIcon"
        ),
    ),
    "mdi-alien": React.lazy(() =>
        import(
            /* webpackChunkName: "AlienIcon" */
            "mdi-react/AlienIcon"
        ),
    ),
    "mdi-all-inclusive": React.lazy(() =>
        import(
            /* webpackChunkName: "AllInclusiveIcon" */
            "mdi-react/AllInclusiveIcon"
        ),
    ),
    "mdi-alpha": React.lazy(() =>
        import(
            /* webpackChunkName: "AlphaIcon" */
            "mdi-react/AlphaIcon"
        ),
    ),
    "mdi-alphabetical": React.lazy(() =>
        import(
            /* webpackChunkName: "AlphabeticalIcon" */
            "mdi-react/AlphabeticalIcon"
        ),
    ),
    "mdi-altimeter": React.lazy(() =>
        import(
            /* webpackChunkName: "AltimeterIcon" */
            "mdi-react/AltimeterIcon"
        ),
    ),
    "mdi-amazon-alexa": React.lazy(() =>
        import(
            /* webpackChunkName: "AmazonAlexaIcon" */
            "mdi-react/AmazonAlexaIcon"
        ),
    ),
    "mdi-amazon-drive": React.lazy(() =>
        import(
            /* webpackChunkName: "AmazonDriveIcon" */
            "mdi-react/AmazonDriveIcon"
        ),
    ),
    "mdi-amazon": React.lazy(() =>
        import(
            /* webpackChunkName: "AmazonIcon" */
            "mdi-react/AmazonIcon"
        ),
    ),
    "mdi-ambulance": React.lazy(() =>
        import(
            /* webpackChunkName: "AmbulanceIcon" */
            "mdi-react/AmbulanceIcon"
        ),
    ),
    "mdi-amplifier": React.lazy(() =>
        import(
            /* webpackChunkName: "AmplifierIcon" */
            "mdi-react/AmplifierIcon"
        ),
    ),
    "mdi-anchor": React.lazy(() =>
        import(
            /* webpackChunkName: "AnchorIcon" */
            "mdi-react/AnchorIcon"
        ),
    ),
    "mdi-android-debug-bridge": React.lazy(() =>
        import(
            /* webpackChunkName: "AndroidDebugBridgeIcon" */
            "mdi-react/AndroidDebugBridgeIcon"
        ),
    ),
    "mdi-android-head": React.lazy(() =>
        import(
            /* webpackChunkName: "AndroidHeadIcon" */
            "mdi-react/AndroidHeadIcon"
        ),
    ),
    "mdi-android-studio": React.lazy(() =>
        import(
            /* webpackChunkName: "AndroidStudioIcon" */
            "mdi-react/AndroidStudioIcon"
        ),
    ),
    "mdi-android": React.lazy(() =>
        import(
            /* webpackChunkName: "AndroidIcon" */
            "mdi-react/AndroidIcon"
        ),
    ),
    "mdi-angle-acute": React.lazy(() =>
        import(
            /* webpackChunkName: "AngleAcuteIcon" */
            "mdi-react/AngleAcuteIcon"
        ),
    ),
    "mdi-angle-obtuse": React.lazy(() =>
        import(
            /* webpackChunkName: "AngleObtuseIcon" */
            "mdi-react/AngleObtuseIcon"
        ),
    ),
    "mdi-angle-right": React.lazy(() =>
        import(
            /* webpackChunkName: "AngleRightIcon" */
            "mdi-react/AngleRightIcon"
        ),
    ),
    "mdi-angular": React.lazy(() =>
        import(
            /* webpackChunkName: "AngularIcon" */
            "mdi-react/AngularIcon"
        ),
    ),
    "mdi-angularjs": React.lazy(() =>
        import(
            /* webpackChunkName: "AngularjsIcon" */
            "mdi-react/AngularjsIcon"
        ),
    ),
    "mdi-animation-play": React.lazy(() =>
        import(
            /* webpackChunkName: "AnimationPlayIcon" */
            "mdi-react/AnimationPlayIcon"
        ),
    ),
    "mdi-animation": React.lazy(() =>
        import(
            /* webpackChunkName: "AnimationIcon" */
            "mdi-react/AnimationIcon"
        ),
    ),
    "mdi-anvil": React.lazy(() =>
        import(
            /* webpackChunkName: "AnvilIcon" */
            "mdi-react/AnvilIcon"
        ),
    ),
    "mdi-apple-finder": React.lazy(() =>
        import(
            /* webpackChunkName: "AppleFinderIcon" */
            "mdi-react/AppleFinderIcon"
        ),
    ),
    "mdi-apple-icloud": React.lazy(() =>
        import(
            /* webpackChunkName: "AppleIcloudIcon" */
            "mdi-react/AppleIcloudIcon"
        ),
    ),
    "mdi-apple-ios": React.lazy(() =>
        import(
            /* webpackChunkName: "AppleIosIcon" */
            "mdi-react/AppleIosIcon"
        ),
    ),
    "mdi-apple-keyboard-caps": React.lazy(() =>
        import(
            /* webpackChunkName: "AppleKeyboardCapsIcon" */
            "mdi-react/AppleKeyboardCapsIcon"
        ),
    ),
    "mdi-apple-keyboard-command": React.lazy(() =>
        import(
            /* webpackChunkName: "AppleKeyboardCommandIcon" */
            "mdi-react/AppleKeyboardCommandIcon"
        ),
    ),
    "mdi-apple-keyboard-control": React.lazy(() =>
        import(
            /* webpackChunkName: "AppleKeyboardControlIcon" */
            "mdi-react/AppleKeyboardControlIcon"
        ),
    ),
    "mdi-apple-keyboard-option": React.lazy(() =>
        import(
            /* webpackChunkName: "AppleKeyboardOptionIcon" */
            "mdi-react/AppleKeyboardOptionIcon"
        ),
    ),
    "mdi-apple-keyboard-shift": React.lazy(() =>
        import(
            /* webpackChunkName: "AppleKeyboardShiftIcon" */
            "mdi-react/AppleKeyboardShiftIcon"
        ),
    ),
    "mdi-apple-safari": React.lazy(() =>
        import(
            /* webpackChunkName: "AppleSafariIcon" */
            "mdi-react/AppleSafariIcon"
        ),
    ),
    "mdi-apple": React.lazy(() =>
        import(
            /* webpackChunkName: "AppleIcon" */
            "mdi-react/AppleIcon"
        ),
    ),
    "mdi-application": React.lazy(() =>
        import(
            /* webpackChunkName: "ApplicationIcon" */
            "mdi-react/ApplicationIcon"
        ),
    ),
    "mdi-approval": React.lazy(() =>
        import(
            /* webpackChunkName: "ApprovalIcon" */
            "mdi-react/ApprovalIcon"
        ),
    ),
    "mdi-apps": React.lazy(() =>
        import(
            /* webpackChunkName: "AppsIcon" */
            "mdi-react/AppsIcon"
        ),
    ),
    "mdi-arch": React.lazy(() =>
        import(
            /* webpackChunkName: "ArchIcon" */
            "mdi-react/ArchIcon"
        ),
    ),
    "mdi-archive": React.lazy(() =>
        import(
            /* webpackChunkName: "ArchiveIcon" */
            "mdi-react/ArchiveIcon"
        ),
    ),
    "mdi-arrange-bring-forward": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrangeBringForwardIcon" */
            "mdi-react/ArrangeBringForwardIcon"
        ),
    ),
    "mdi-arrange-bring-to-front": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrangeBringToFrontIcon" */
            "mdi-react/ArrangeBringToFrontIcon"
        ),
    ),
    "mdi-arrange-send-backward": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrangeSendBackwardIcon" */
            "mdi-react/ArrangeSendBackwardIcon"
        ),
    ),
    "mdi-arrange-send-to-back": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrangeSendToBackIcon" */
            "mdi-react/ArrangeSendToBackIcon"
        ),
    ),
    "mdi-arrow-all": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowAllIcon" */
            "mdi-react/ArrowAllIcon"
        ),
    ),
    "mdi-arrow-bottom-left": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowBottomLeftIcon" */
            "mdi-react/ArrowBottomLeftIcon"
        ),
    ),
    "mdi-arrow-bottom-right": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowBottomRightIcon" */
            "mdi-react/ArrowBottomRightIcon"
        ),
    ),
    "mdi-arrow-collapse-all": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowCollapseAllIcon" */
            "mdi-react/ArrowCollapseAllIcon"
        ),
    ),
    "mdi-arrow-collapse-down": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowCollapseDownIcon" */
            "mdi-react/ArrowCollapseDownIcon"
        ),
    ),
    "mdi-arrow-collapse-horizontal": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowCollapseHorizontalIcon" */
            "mdi-react/ArrowCollapseHorizontalIcon"
        ),
    ),
    "mdi-arrow-collapse-left": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowCollapseLeftIcon" */
            "mdi-react/ArrowCollapseLeftIcon"
        ),
    ),
    "mdi-arrow-collapse-right": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowCollapseRightIcon" */
            "mdi-react/ArrowCollapseRightIcon"
        ),
    ),
    "mdi-arrow-collapse-up": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowCollapseUpIcon" */
            "mdi-react/ArrowCollapseUpIcon"
        ),
    ),
    "mdi-arrow-collapse-vertical": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowCollapseVerticalIcon" */
            "mdi-react/ArrowCollapseVerticalIcon"
        ),
    ),
    "mdi-arrow-collapse": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowCollapseIcon" */
            "mdi-react/ArrowCollapseIcon"
        ),
    ),
    "mdi-arrow-down-bold-box-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowDownBoldBoxOutlineIcon" */
            "mdi-react/ArrowDownBoldBoxOutlineIcon"
        ),
    ),
    "mdi-arrow-down-bold-box": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowDownBoldBoxIcon" */
            "mdi-react/ArrowDownBoldBoxIcon"
        ),
    ),
    "mdi-arrow-down-bold-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowDownBoldCircleOutlineIcon" */
            "mdi-react/ArrowDownBoldCircleOutlineIcon"
        ),
    ),
    "mdi-arrow-down-bold-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowDownBoldCircleIcon" */
            "mdi-react/ArrowDownBoldCircleIcon"
        ),
    ),
    "mdi-arrow-down-bold-hexagon-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowDownBoldHexagonOutlineIcon" */
            "mdi-react/ArrowDownBoldHexagonOutlineIcon"
        ),
    ),
    "mdi-arrow-down-bold": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowDownBoldIcon" */
            "mdi-react/ArrowDownBoldIcon"
        ),
    ),
    "mdi-arrow-down-box": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowDownBoxIcon" */
            "mdi-react/ArrowDownBoxIcon"
        ),
    ),
    "mdi-arrow-down-drop-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowDownDropCircleOutlineIcon" */
            "mdi-react/ArrowDownDropCircleOutlineIcon"
        ),
    ),
    "mdi-arrow-down-drop-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowDownDropCircleIcon" */
            "mdi-react/ArrowDownDropCircleIcon"
        ),
    ),
    "mdi-arrow-down-thick": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowDownThickIcon" */
            "mdi-react/ArrowDownThickIcon"
        ),
    ),
    "mdi-arrow-down": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowDownIcon" */
            "mdi-react/ArrowDownIcon"
        ),
    ),
    "mdi-arrow-expand-all": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowExpandAllIcon" */
            "mdi-react/ArrowExpandAllIcon"
        ),
    ),
    "mdi-arrow-expand-down": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowExpandDownIcon" */
            "mdi-react/ArrowExpandDownIcon"
        ),
    ),
    "mdi-arrow-expand-horizontal": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowExpandHorizontalIcon" */
            "mdi-react/ArrowExpandHorizontalIcon"
        ),
    ),
    "mdi-arrow-expand-left": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowExpandLeftIcon" */
            "mdi-react/ArrowExpandLeftIcon"
        ),
    ),
    "mdi-arrow-expand-right": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowExpandRightIcon" */
            "mdi-react/ArrowExpandRightIcon"
        ),
    ),
    "mdi-arrow-expand-up": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowExpandUpIcon" */
            "mdi-react/ArrowExpandUpIcon"
        ),
    ),
    "mdi-arrow-expand-vertical": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowExpandVerticalIcon" */
            "mdi-react/ArrowExpandVerticalIcon"
        ),
    ),
    "mdi-arrow-expand": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowExpandIcon" */
            "mdi-react/ArrowExpandIcon"
        ),
    ),
    "mdi-arrow-left-bold-box-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowLeftBoldBoxOutlineIcon" */
            "mdi-react/ArrowLeftBoldBoxOutlineIcon"
        ),
    ),
    "mdi-arrow-left-bold-box": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowLeftBoldBoxIcon" */
            "mdi-react/ArrowLeftBoldBoxIcon"
        ),
    ),
    "mdi-arrow-left-bold-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowLeftBoldCircleOutlineIcon" */
            "mdi-react/ArrowLeftBoldCircleOutlineIcon"
        ),
    ),
    "mdi-arrow-left-bold-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowLeftBoldCircleIcon" */
            "mdi-react/ArrowLeftBoldCircleIcon"
        ),
    ),
    "mdi-arrow-left-bold-hexagon-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowLeftBoldHexagonOutlineIcon" */
            "mdi-react/ArrowLeftBoldHexagonOutlineIcon"
        ),
    ),
    "mdi-arrow-left-bold": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowLeftBoldIcon" */
            "mdi-react/ArrowLeftBoldIcon"
        ),
    ),
    "mdi-arrow-left-box": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowLeftBoxIcon" */
            "mdi-react/ArrowLeftBoxIcon"
        ),
    ),
    "mdi-arrow-left-drop-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowLeftDropCircleOutlineIcon" */
            "mdi-react/ArrowLeftDropCircleOutlineIcon"
        ),
    ),
    "mdi-arrow-left-drop-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowLeftDropCircleIcon" */
            "mdi-react/ArrowLeftDropCircleIcon"
        ),
    ),
    "mdi-arrow-left-thick": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowLeftThickIcon" */
            "mdi-react/ArrowLeftThickIcon"
        ),
    ),
    "mdi-arrow-left": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowLeftIcon" */
            "mdi-react/ArrowLeftIcon"
        ),
    ),
    "mdi-arrow-right-bold-box-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowRightBoldBoxOutlineIcon" */
            "mdi-react/ArrowRightBoldBoxOutlineIcon"
        ),
    ),
    "mdi-arrow-right-bold-box": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowRightBoldBoxIcon" */
            "mdi-react/ArrowRightBoldBoxIcon"
        ),
    ),
    "mdi-arrow-right-bold-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowRightBoldCircleOutlineIcon" */
            "mdi-react/ArrowRightBoldCircleOutlineIcon"
        ),
    ),
    "mdi-arrow-right-bold-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowRightBoldCircleIcon" */
            "mdi-react/ArrowRightBoldCircleIcon"
        ),
    ),
    "mdi-arrow-right-bold-hexagon-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowRightBoldHexagonOutlineIcon" */
            "mdi-react/ArrowRightBoldHexagonOutlineIcon"
        ),
    ),
    "mdi-arrow-right-bold": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowRightBoldIcon" */
            "mdi-react/ArrowRightBoldIcon"
        ),
    ),
    "mdi-arrow-right-box": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowRightBoxIcon" */
            "mdi-react/ArrowRightBoxIcon"
        ),
    ),
    "mdi-arrow-right-drop-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowRightDropCircleOutlineIcon" */
            "mdi-react/ArrowRightDropCircleOutlineIcon"
        ),
    ),
    "mdi-arrow-right-drop-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowRightDropCircleIcon" */
            "mdi-react/ArrowRightDropCircleIcon"
        ),
    ),
    "mdi-arrow-right-thick": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowRightThickIcon" */
            "mdi-react/ArrowRightThickIcon"
        ),
    ),
    "mdi-arrow-right": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowRightIcon" */
            "mdi-react/ArrowRightIcon"
        ),
    ),
    "mdi-arrow-split-horizontal": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowSplitHorizontalIcon" */
            "mdi-react/ArrowSplitHorizontalIcon"
        ),
    ),
    "mdi-arrow-split-vertical": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowSplitVerticalIcon" */
            "mdi-react/ArrowSplitVerticalIcon"
        ),
    ),
    "mdi-arrow-top-left": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowTopLeftIcon" */
            "mdi-react/ArrowTopLeftIcon"
        ),
    ),
    "mdi-arrow-top-right": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowTopRightIcon" */
            "mdi-react/ArrowTopRightIcon"
        ),
    ),
    "mdi-arrow-up-bold-box-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowUpBoldBoxOutlineIcon" */
            "mdi-react/ArrowUpBoldBoxOutlineIcon"
        ),
    ),
    "mdi-arrow-up-bold-box": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowUpBoldBoxIcon" */
            "mdi-react/ArrowUpBoldBoxIcon"
        ),
    ),
    "mdi-arrow-up-bold-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowUpBoldCircleOutlineIcon" */
            "mdi-react/ArrowUpBoldCircleOutlineIcon"
        ),
    ),
    "mdi-arrow-up-bold-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowUpBoldCircleIcon" */
            "mdi-react/ArrowUpBoldCircleIcon"
        ),
    ),
    "mdi-arrow-up-bold-hexagon-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowUpBoldHexagonOutlineIcon" */
            "mdi-react/ArrowUpBoldHexagonOutlineIcon"
        ),
    ),
    "mdi-arrow-up-bold": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowUpBoldIcon" */
            "mdi-react/ArrowUpBoldIcon"
        ),
    ),
    "mdi-arrow-up-box": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowUpBoxIcon" */
            "mdi-react/ArrowUpBoxIcon"
        ),
    ),
    "mdi-arrow-up-drop-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowUpDropCircleOutlineIcon" */
            "mdi-react/ArrowUpDropCircleOutlineIcon"
        ),
    ),
    "mdi-arrow-up-drop-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowUpDropCircleIcon" */
            "mdi-react/ArrowUpDropCircleIcon"
        ),
    ),
    "mdi-arrow-up-thick": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowUpThickIcon" */
            "mdi-react/ArrowUpThickIcon"
        ),
    ),
    "mdi-arrow-up": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowUpIcon" */
            "mdi-react/ArrowUpIcon"
        ),
    ),
    "mdi-artist": React.lazy(() =>
        import(
            /* webpackChunkName: "ArtistIcon" */
            "mdi-react/ArtistIcon"
        ),
    ),
    "mdi-assistant": React.lazy(() =>
        import(
            /* webpackChunkName: "AssistantIcon" */
            "mdi-react/AssistantIcon"
        ),
    ),
    "mdi-asterisk": React.lazy(() =>
        import(
            /* webpackChunkName: "AsteriskIcon" */
            "mdi-react/AsteriskIcon"
        ),
    ),
    "mdi-at": React.lazy(() =>
        import(
            /* webpackChunkName: "AtIcon" */
            "mdi-react/AtIcon"
        ),
    ),
    "mdi-atlassian": React.lazy(() =>
        import(
            /* webpackChunkName: "AtlassianIcon" */
            "mdi-react/AtlassianIcon"
        ),
    ),
    "mdi-atom": React.lazy(() =>
        import(
            /* webpackChunkName: "AtomIcon" */
            "mdi-react/AtomIcon"
        ),
    ),
    "mdi-attachment": React.lazy(() =>
        import(
            /* webpackChunkName: "AttachmentIcon" */
            "mdi-react/AttachmentIcon"
        ),
    ),
    "mdi-audio-video": React.lazy(() =>
        import(
            /* webpackChunkName: "AudioVideoIcon" */
            "mdi-react/AudioVideoIcon"
        ),
    ),
    "mdi-audiobook": React.lazy(() =>
        import(
            /* webpackChunkName: "AudiobookIcon" */
            "mdi-react/AudiobookIcon"
        ),
    ),
    "mdi-augmented-reality": React.lazy(() =>
        import(
            /* webpackChunkName: "AugmentedRealityIcon" */
            "mdi-react/AugmentedRealityIcon"
        ),
    ),
    "mdi-auto-fix": React.lazy(() =>
        import(
            /* webpackChunkName: "AutoFixIcon" */
            "mdi-react/AutoFixIcon"
        ),
    ),
    "mdi-auto-upload": React.lazy(() =>
        import(
            /* webpackChunkName: "AutoUploadIcon" */
            "mdi-react/AutoUploadIcon"
        ),
    ),
    "mdi-autorenew": React.lazy(() =>
        import(
            /* webpackChunkName: "AutorenewIcon" */
            "mdi-react/AutorenewIcon"
        ),
    ),
    "mdi-av-timer": React.lazy(() =>
        import(
            /* webpackChunkName: "AvTimerIcon" */
            "mdi-react/AvTimerIcon"
        ),
    ),
    "mdi-axe": React.lazy(() =>
        import(
            /* webpackChunkName: "AxeIcon" */
            "mdi-react/AxeIcon"
        ),
    ),
    "mdi-azure": React.lazy(() =>
        import(
            /* webpackChunkName: "AzureIcon" */
            "mdi-react/AzureIcon"
        ),
    ),
    "mdi-baby-buggy": React.lazy(() =>
        import(
            /* webpackChunkName: "BabyBuggyIcon" */
            "mdi-react/BabyBuggyIcon"
        ),
    ),
    "mdi-baby": React.lazy(() =>
        import(
            /* webpackChunkName: "BabyIcon" */
            "mdi-react/BabyIcon"
        ),
    ),
    "mdi-backburger": React.lazy(() =>
        import(
            /* webpackChunkName: "BackburgerIcon" */
            "mdi-react/BackburgerIcon"
        ),
    ),
    "mdi-backspace": React.lazy(() =>
        import(
            /* webpackChunkName: "BackspaceIcon" */
            "mdi-react/BackspaceIcon"
        ),
    ),
    "mdi-backup-restore": React.lazy(() =>
        import(
            /* webpackChunkName: "BackupRestoreIcon" */
            "mdi-react/BackupRestoreIcon"
        ),
    ),
    "mdi-badminton": React.lazy(() =>
        import(
            /* webpackChunkName: "BadmintonIcon" */
            "mdi-react/BadmintonIcon"
        ),
    ),
    "mdi-bandcamp": React.lazy(() =>
        import(
            /* webpackChunkName: "BandcampIcon" */
            "mdi-react/BandcampIcon"
        ),
    ),
    "mdi-bank": React.lazy(() =>
        import(
            /* webpackChunkName: "BankIcon" */
            "mdi-react/BankIcon"
        ),
    ),
    "mdi-barcode-scan": React.lazy(() =>
        import(
            /* webpackChunkName: "BarcodeScanIcon" */
            "mdi-react/BarcodeScanIcon"
        ),
    ),
    "mdi-barcode": React.lazy(() =>
        import(
            /* webpackChunkName: "BarcodeIcon" */
            "mdi-react/BarcodeIcon"
        ),
    ),
    "mdi-barley": React.lazy(() =>
        import(
            /* webpackChunkName: "BarleyIcon" */
            "mdi-react/BarleyIcon"
        ),
    ),
    "mdi-barrel": React.lazy(() =>
        import(
            /* webpackChunkName: "BarrelIcon" */
            "mdi-react/BarrelIcon"
        ),
    ),
    "mdi-baseball-bat": React.lazy(() =>
        import(
            /* webpackChunkName: "BaseballBatIcon" */
            "mdi-react/BaseballBatIcon"
        ),
    ),
    "mdi-baseball": React.lazy(() =>
        import(
            /* webpackChunkName: "BaseballIcon" */
            "mdi-react/BaseballIcon"
        ),
    ),
    "mdi-basecamp": React.lazy(() =>
        import(
            /* webpackChunkName: "BasecampIcon" */
            "mdi-react/BasecampIcon"
        ),
    ),
    "mdi-basket-fill": React.lazy(() =>
        import(
            /* webpackChunkName: "BasketFillIcon" */
            "mdi-react/BasketFillIcon"
        ),
    ),
    "mdi-basket-unfill": React.lazy(() =>
        import(
            /* webpackChunkName: "BasketUnfillIcon" */
            "mdi-react/BasketUnfillIcon"
        ),
    ),
    "mdi-basket": React.lazy(() =>
        import(
            /* webpackChunkName: "BasketIcon" */
            "mdi-react/BasketIcon"
        ),
    ),
    "mdi-basketball": React.lazy(() =>
        import(
            /* webpackChunkName: "BasketballIcon" */
            "mdi-react/BasketballIcon"
        ),
    ),
    "mdi-battery-10-bluetooth": React.lazy(() =>
        import(
            /* webpackChunkName: "Battery10BluetoothIcon" */
            "mdi-react/Battery10BluetoothIcon"
        ),
    ),
    "mdi-battery-10": React.lazy(() =>
        import(
            /* webpackChunkName: "Battery10Icon" */
            "mdi-react/Battery10Icon"
        ),
    ),
    "mdi-battery-20-bluetooth": React.lazy(() =>
        import(
            /* webpackChunkName: "Battery20BluetoothIcon" */
            "mdi-react/Battery20BluetoothIcon"
        ),
    ),
    "mdi-battery-20": React.lazy(() =>
        import(
            /* webpackChunkName: "Battery20Icon" */
            "mdi-react/Battery20Icon"
        ),
    ),
    "mdi-battery-30-bluetooth": React.lazy(() =>
        import(
            /* webpackChunkName: "Battery30BluetoothIcon" */
            "mdi-react/Battery30BluetoothIcon"
        ),
    ),
    "mdi-battery-30": React.lazy(() =>
        import(
            /* webpackChunkName: "Battery30Icon" */
            "mdi-react/Battery30Icon"
        ),
    ),
    "mdi-battery-40-bluetooth": React.lazy(() =>
        import(
            /* webpackChunkName: "Battery40BluetoothIcon" */
            "mdi-react/Battery40BluetoothIcon"
        ),
    ),
    "mdi-battery-40": React.lazy(() =>
        import(
            /* webpackChunkName: "Battery40Icon" */
            "mdi-react/Battery40Icon"
        ),
    ),
    "mdi-battery-50-bluetooth": React.lazy(() =>
        import(
            /* webpackChunkName: "Battery50BluetoothIcon" */
            "mdi-react/Battery50BluetoothIcon"
        ),
    ),
    "mdi-battery-50": React.lazy(() =>
        import(
            /* webpackChunkName: "Battery50Icon" */
            "mdi-react/Battery50Icon"
        ),
    ),
    "mdi-battery-60-bluetooth": React.lazy(() =>
        import(
            /* webpackChunkName: "Battery60BluetoothIcon" */
            "mdi-react/Battery60BluetoothIcon"
        ),
    ),
    "mdi-battery-60": React.lazy(() =>
        import(
            /* webpackChunkName: "Battery60Icon" */
            "mdi-react/Battery60Icon"
        ),
    ),
    "mdi-battery-70-bluetooth": React.lazy(() =>
        import(
            /* webpackChunkName: "Battery70BluetoothIcon" */
            "mdi-react/Battery70BluetoothIcon"
        ),
    ),
    "mdi-battery-70": React.lazy(() =>
        import(
            /* webpackChunkName: "Battery70Icon" */
            "mdi-react/Battery70Icon"
        ),
    ),
    "mdi-battery-80-bluetooth": React.lazy(() =>
        import(
            /* webpackChunkName: "Battery80BluetoothIcon" */
            "mdi-react/Battery80BluetoothIcon"
        ),
    ),
    "mdi-battery-80": React.lazy(() =>
        import(
            /* webpackChunkName: "Battery80Icon" */
            "mdi-react/Battery80Icon"
        ),
    ),
    "mdi-battery-90-bluetooth": React.lazy(() =>
        import(
            /* webpackChunkName: "Battery90BluetoothIcon" */
            "mdi-react/Battery90BluetoothIcon"
        ),
    ),
    "mdi-battery-90": React.lazy(() =>
        import(
            /* webpackChunkName: "Battery90Icon" */
            "mdi-react/Battery90Icon"
        ),
    ),
    "mdi-battery-alert-bluetooth": React.lazy(() =>
        import(
            /* webpackChunkName: "BatteryAlertBluetoothIcon" */
            "mdi-react/BatteryAlertBluetoothIcon"
        ),
    ),
    "mdi-battery-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "BatteryAlertIcon" */
            "mdi-react/BatteryAlertIcon"
        ),
    ),
    "mdi-battery-bluetooth-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "BatteryBluetoothVariantIcon" */
            "mdi-react/BatteryBluetoothVariantIcon"
        ),
    ),
    "mdi-battery-bluetooth": React.lazy(() =>
        import(
            /* webpackChunkName: "BatteryBluetoothIcon" */
            "mdi-react/BatteryBluetoothIcon"
        ),
    ),
    "mdi-battery-charging-10": React.lazy(() =>
        import(
            /* webpackChunkName: "BatteryCharging10Icon" */
            "mdi-react/BatteryCharging10Icon"
        ),
    ),
    "mdi-battery-charging-100": React.lazy(() =>
        import(
            /* webpackChunkName: "BatteryCharging100Icon" */
            "mdi-react/BatteryCharging100Icon"
        ),
    ),
    "mdi-battery-charging-20": React.lazy(() =>
        import(
            /* webpackChunkName: "BatteryCharging20Icon" */
            "mdi-react/BatteryCharging20Icon"
        ),
    ),
    "mdi-battery-charging-30": React.lazy(() =>
        import(
            /* webpackChunkName: "BatteryCharging30Icon" */
            "mdi-react/BatteryCharging30Icon"
        ),
    ),
    "mdi-battery-charging-40": React.lazy(() =>
        import(
            /* webpackChunkName: "BatteryCharging40Icon" */
            "mdi-react/BatteryCharging40Icon"
        ),
    ),
    "mdi-battery-charging-50": React.lazy(() =>
        import(
            /* webpackChunkName: "BatteryCharging50Icon" */
            "mdi-react/BatteryCharging50Icon"
        ),
    ),
    "mdi-battery-charging-60": React.lazy(() =>
        import(
            /* webpackChunkName: "BatteryCharging60Icon" */
            "mdi-react/BatteryCharging60Icon"
        ),
    ),
    "mdi-battery-charging-70": React.lazy(() =>
        import(
            /* webpackChunkName: "BatteryCharging70Icon" */
            "mdi-react/BatteryCharging70Icon"
        ),
    ),
    "mdi-battery-charging-80": React.lazy(() =>
        import(
            /* webpackChunkName: "BatteryCharging80Icon" */
            "mdi-react/BatteryCharging80Icon"
        ),
    ),
    "mdi-battery-charging-90": React.lazy(() =>
        import(
            /* webpackChunkName: "BatteryCharging90Icon" */
            "mdi-react/BatteryCharging90Icon"
        ),
    ),
    "mdi-battery-charging-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "BatteryChargingOutlineIcon" */
            "mdi-react/BatteryChargingOutlineIcon"
        ),
    ),
    "mdi-battery-charging-wireless-10": React.lazy(() =>
        import(
            /* webpackChunkName: "BatteryChargingWireless10Icon" */
            "mdi-react/BatteryChargingWireless10Icon"
        ),
    ),
    "mdi-battery-charging-wireless-20": React.lazy(() =>
        import(
            /* webpackChunkName: "BatteryChargingWireless20Icon" */
            "mdi-react/BatteryChargingWireless20Icon"
        ),
    ),
    "mdi-battery-charging-wireless-30": React.lazy(() =>
        import(
            /* webpackChunkName: "BatteryChargingWireless30Icon" */
            "mdi-react/BatteryChargingWireless30Icon"
        ),
    ),
    "mdi-battery-charging-wireless-40": React.lazy(() =>
        import(
            /* webpackChunkName: "BatteryChargingWireless40Icon" */
            "mdi-react/BatteryChargingWireless40Icon"
        ),
    ),
    "mdi-battery-charging-wireless-50": React.lazy(() =>
        import(
            /* webpackChunkName: "BatteryChargingWireless50Icon" */
            "mdi-react/BatteryChargingWireless50Icon"
        ),
    ),
    "mdi-battery-charging-wireless-60": React.lazy(() =>
        import(
            /* webpackChunkName: "BatteryChargingWireless60Icon" */
            "mdi-react/BatteryChargingWireless60Icon"
        ),
    ),
    "mdi-battery-charging-wireless-70": React.lazy(() =>
        import(
            /* webpackChunkName: "BatteryChargingWireless70Icon" */
            "mdi-react/BatteryChargingWireless70Icon"
        ),
    ),
    "mdi-battery-charging-wireless-80": React.lazy(() =>
        import(
            /* webpackChunkName: "BatteryChargingWireless80Icon" */
            "mdi-react/BatteryChargingWireless80Icon"
        ),
    ),
    "mdi-battery-charging-wireless-90": React.lazy(() =>
        import(
            /* webpackChunkName: "BatteryChargingWireless90Icon" */
            "mdi-react/BatteryChargingWireless90Icon"
        ),
    ),
    "mdi-battery-charging-wireless-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "BatteryChargingWirelessAlertIcon" */
            "mdi-react/BatteryChargingWirelessAlertIcon"
        ),
    ),
    "mdi-battery-charging-wireless-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "BatteryChargingWirelessOutlineIcon" */
            "mdi-react/BatteryChargingWirelessOutlineIcon"
        ),
    ),
    "mdi-battery-charging-wireless": React.lazy(() =>
        import(
            /* webpackChunkName: "BatteryChargingWirelessIcon" */
            "mdi-react/BatteryChargingWirelessIcon"
        ),
    ),
    "mdi-battery-charging": React.lazy(() =>
        import(
            /* webpackChunkName: "BatteryChargingIcon" */
            "mdi-react/BatteryChargingIcon"
        ),
    ),
    "mdi-battery-minus": React.lazy(() =>
        import(
            /* webpackChunkName: "BatteryMinusIcon" */
            "mdi-react/BatteryMinusIcon"
        ),
    ),
    "mdi-battery-negative": React.lazy(() =>
        import(
            /* webpackChunkName: "BatteryNegativeIcon" */
            "mdi-react/BatteryNegativeIcon"
        ),
    ),
    "mdi-battery-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "BatteryOutlineIcon" */
            "mdi-react/BatteryOutlineIcon"
        ),
    ),
    "mdi-battery-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "BatteryPlusIcon" */
            "mdi-react/BatteryPlusIcon"
        ),
    ),
    "mdi-battery-positive": React.lazy(() =>
        import(
            /* webpackChunkName: "BatteryPositiveIcon" */
            "mdi-react/BatteryPositiveIcon"
        ),
    ),
    "mdi-battery-unknown-bluetooth": React.lazy(() =>
        import(
            /* webpackChunkName: "BatteryUnknownBluetoothIcon" */
            "mdi-react/BatteryUnknownBluetoothIcon"
        ),
    ),
    "mdi-battery-unknown": React.lazy(() =>
        import(
            /* webpackChunkName: "BatteryUnknownIcon" */
            "mdi-react/BatteryUnknownIcon"
        ),
    ),
    "mdi-battery": React.lazy(() =>
        import(
            /* webpackChunkName: "BatteryIcon" */
            "mdi-react/BatteryIcon"
        ),
    ),
    "mdi-beach": React.lazy(() =>
        import(
            /* webpackChunkName: "BeachIcon" */
            "mdi-react/BeachIcon"
        ),
    ),
    "mdi-beaker": React.lazy(() =>
        import(
            /* webpackChunkName: "BeakerIcon" */
            "mdi-react/BeakerIcon"
        ),
    ),
    "mdi-beats": React.lazy(() =>
        import(
            /* webpackChunkName: "BeatsIcon" */
            "mdi-react/BeatsIcon"
        ),
    ),
    "mdi-bed-empty": React.lazy(() =>
        import(
            /* webpackChunkName: "BedEmptyIcon" */
            "mdi-react/BedEmptyIcon"
        ),
    ),
    "mdi-beer": React.lazy(() =>
        import(
            /* webpackChunkName: "BeerIcon" */
            "mdi-react/BeerIcon"
        ),
    ),
    "mdi-behance": React.lazy(() =>
        import(
            /* webpackChunkName: "BehanceIcon" */
            "mdi-react/BehanceIcon"
        ),
    ),
    "mdi-bell-off": React.lazy(() =>
        import(
            /* webpackChunkName: "BellOffIcon" */
            "mdi-react/BellOffIcon"
        ),
    ),
    "mdi-bell-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "BellOutlineIcon" */
            "mdi-react/BellOutlineIcon"
        ),
    ),
    "mdi-bell-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "BellPlusIcon" */
            "mdi-react/BellPlusIcon"
        ),
    ),
    "mdi-bell-ring-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "BellRingOutlineIcon" */
            "mdi-react/BellRingOutlineIcon"
        ),
    ),
    "mdi-bell-ring": React.lazy(() =>
        import(
            /* webpackChunkName: "BellRingIcon" */
            "mdi-react/BellRingIcon"
        ),
    ),
    "mdi-bell-sleep": React.lazy(() =>
        import(
            /* webpackChunkName: "BellSleepIcon" */
            "mdi-react/BellSleepIcon"
        ),
    ),
    "mdi-bell": React.lazy(() =>
        import(
            /* webpackChunkName: "BellIcon" */
            "mdi-react/BellIcon"
        ),
    ),
    "mdi-beta": React.lazy(() =>
        import(
            /* webpackChunkName: "BetaIcon" */
            "mdi-react/BetaIcon"
        ),
    ),
    "mdi-bible": React.lazy(() =>
        import(
            /* webpackChunkName: "BibleIcon" */
            "mdi-react/BibleIcon"
        ),
    ),
    "mdi-bike": React.lazy(() =>
        import(
            /* webpackChunkName: "BikeIcon" */
            "mdi-react/BikeIcon"
        ),
    ),
    "mdi-bing": React.lazy(() =>
        import(
            /* webpackChunkName: "BingIcon" */
            "mdi-react/BingIcon"
        ),
    ),
    "mdi-binoculars": React.lazy(() =>
        import(
            /* webpackChunkName: "BinocularsIcon" */
            "mdi-react/BinocularsIcon"
        ),
    ),
    "mdi-bio": React.lazy(() =>
        import(
            /* webpackChunkName: "BioIcon" */
            "mdi-react/BioIcon"
        ),
    ),
    "mdi-biohazard": React.lazy(() =>
        import(
            /* webpackChunkName: "BiohazardIcon" */
            "mdi-react/BiohazardIcon"
        ),
    ),
    "mdi-bitbucket": React.lazy(() =>
        import(
            /* webpackChunkName: "BitbucketIcon" */
            "mdi-react/BitbucketIcon"
        ),
    ),
    "mdi-bitcoin": React.lazy(() =>
        import(
            /* webpackChunkName: "BitcoinIcon" */
            "mdi-react/BitcoinIcon"
        ),
    ),
    "mdi-black-mesa": React.lazy(() =>
        import(
            /* webpackChunkName: "BlackMesaIcon" */
            "mdi-react/BlackMesaIcon"
        ),
    ),
    "mdi-blackberry": React.lazy(() =>
        import(
            /* webpackChunkName: "BlackberryIcon" */
            "mdi-react/BlackberryIcon"
        ),
    ),
    "mdi-blender": React.lazy(() =>
        import(
            /* webpackChunkName: "BlenderIcon" */
            "mdi-react/BlenderIcon"
        ),
    ),
    "mdi-blinds": React.lazy(() =>
        import(
            /* webpackChunkName: "BlindsIcon" */
            "mdi-react/BlindsIcon"
        ),
    ),
    "mdi-block-helper": React.lazy(() =>
        import(
            /* webpackChunkName: "BlockHelperIcon" */
            "mdi-react/BlockHelperIcon"
        ),
    ),
    "mdi-blogger": React.lazy(() =>
        import(
            /* webpackChunkName: "BloggerIcon" */
            "mdi-react/BloggerIcon"
        ),
    ),
    "mdi-bluetooth-audio": React.lazy(() =>
        import(
            /* webpackChunkName: "BluetoothAudioIcon" */
            "mdi-react/BluetoothAudioIcon"
        ),
    ),
    "mdi-bluetooth-connect": React.lazy(() =>
        import(
            /* webpackChunkName: "BluetoothConnectIcon" */
            "mdi-react/BluetoothConnectIcon"
        ),
    ),
    "mdi-bluetooth-off": React.lazy(() =>
        import(
            /* webpackChunkName: "BluetoothOffIcon" */
            "mdi-react/BluetoothOffIcon"
        ),
    ),
    "mdi-bluetooth-settings": React.lazy(() =>
        import(
            /* webpackChunkName: "BluetoothSettingsIcon" */
            "mdi-react/BluetoothSettingsIcon"
        ),
    ),
    "mdi-bluetooth-transfer": React.lazy(() =>
        import(
            /* webpackChunkName: "BluetoothTransferIcon" */
            "mdi-react/BluetoothTransferIcon"
        ),
    ),
    "mdi-bluetooth": React.lazy(() =>
        import(
            /* webpackChunkName: "BluetoothIcon" */
            "mdi-react/BluetoothIcon"
        ),
    ),
    "mdi-blur-linear": React.lazy(() =>
        import(
            /* webpackChunkName: "BlurLinearIcon" */
            "mdi-react/BlurLinearIcon"
        ),
    ),
    "mdi-blur-off": React.lazy(() =>
        import(
            /* webpackChunkName: "BlurOffIcon" */
            "mdi-react/BlurOffIcon"
        ),
    ),
    "mdi-blur-radial": React.lazy(() =>
        import(
            /* webpackChunkName: "BlurRadialIcon" */
            "mdi-react/BlurRadialIcon"
        ),
    ),
    "mdi-blur": React.lazy(() =>
        import(
            /* webpackChunkName: "BlurIcon" */
            "mdi-react/BlurIcon"
        ),
    ),
    "mdi-bomb-off": React.lazy(() =>
        import(
            /* webpackChunkName: "BombOffIcon" */
            "mdi-react/BombOffIcon"
        ),
    ),
    "mdi-bomb": React.lazy(() =>
        import(
            /* webpackChunkName: "BombIcon" */
            "mdi-react/BombIcon"
        ),
    ),
    "mdi-bone": React.lazy(() =>
        import(
            /* webpackChunkName: "BoneIcon" */
            "mdi-react/BoneIcon"
        ),
    ),
    "mdi-book-minus": React.lazy(() =>
        import(
            /* webpackChunkName: "BookMinusIcon" */
            "mdi-react/BookMinusIcon"
        ),
    ),
    "mdi-book-multiple-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "BookMultipleVariantIcon" */
            "mdi-react/BookMultipleVariantIcon"
        ),
    ),
    "mdi-book-multiple": React.lazy(() =>
        import(
            /* webpackChunkName: "BookMultipleIcon" */
            "mdi-react/BookMultipleIcon"
        ),
    ),
    "mdi-book-open-page-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "BookOpenPageVariantIcon" */
            "mdi-react/BookOpenPageVariantIcon"
        ),
    ),
    "mdi-book-open-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "BookOpenVariantIcon" */
            "mdi-react/BookOpenVariantIcon"
        ),
    ),
    "mdi-book-open": React.lazy(() =>
        import(
            /* webpackChunkName: "BookOpenIcon" */
            "mdi-react/BookOpenIcon"
        ),
    ),
    "mdi-book-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "BookPlusIcon" */
            "mdi-react/BookPlusIcon"
        ),
    ),
    "mdi-book-secure": React.lazy(() =>
        import(
            /* webpackChunkName: "BookSecureIcon" */
            "mdi-react/BookSecureIcon"
        ),
    ),
    "mdi-book-unsecure": React.lazy(() =>
        import(
            /* webpackChunkName: "BookUnsecureIcon" */
            "mdi-react/BookUnsecureIcon"
        ),
    ),
    "mdi-book-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "BookVariantIcon" */
            "mdi-react/BookVariantIcon"
        ),
    ),
    "mdi-book": React.lazy(() =>
        import(
            /* webpackChunkName: "BookIcon" */
            "mdi-react/BookIcon"
        ),
    ),
    "mdi-bookmark-check": React.lazy(() =>
        import(
            /* webpackChunkName: "BookmarkCheckIcon" */
            "mdi-react/BookmarkCheckIcon"
        ),
    ),
    "mdi-bookmark-music": React.lazy(() =>
        import(
            /* webpackChunkName: "BookmarkMusicIcon" */
            "mdi-react/BookmarkMusicIcon"
        ),
    ),
    "mdi-bookmark-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "BookmarkOutlineIcon" */
            "mdi-react/BookmarkOutlineIcon"
        ),
    ),
    "mdi-bookmark-plus-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "BookmarkPlusOutlineIcon" */
            "mdi-react/BookmarkPlusOutlineIcon"
        ),
    ),
    "mdi-bookmark-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "BookmarkPlusIcon" */
            "mdi-react/BookmarkPlusIcon"
        ),
    ),
    "mdi-bookmark-remove": React.lazy(() =>
        import(
            /* webpackChunkName: "BookmarkRemoveIcon" */
            "mdi-react/BookmarkRemoveIcon"
        ),
    ),
    "mdi-bookmark": React.lazy(() =>
        import(
            /* webpackChunkName: "BookmarkIcon" */
            "mdi-react/BookmarkIcon"
        ),
    ),
    "mdi-boombox": React.lazy(() =>
        import(
            /* webpackChunkName: "BoomboxIcon" */
            "mdi-react/BoomboxIcon"
        ),
    ),
    "mdi-bootstrap": React.lazy(() =>
        import(
            /* webpackChunkName: "BootstrapIcon" */
            "mdi-react/BootstrapIcon"
        ),
    ),
    "mdi-border-all-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "BorderAllVariantIcon" */
            "mdi-react/BorderAllVariantIcon"
        ),
    ),
    "mdi-border-all": React.lazy(() =>
        import(
            /* webpackChunkName: "BorderAllIcon" */
            "mdi-react/BorderAllIcon"
        ),
    ),
    "mdi-border-bottom-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "BorderBottomVariantIcon" */
            "mdi-react/BorderBottomVariantIcon"
        ),
    ),
    "mdi-border-bottom": React.lazy(() =>
        import(
            /* webpackChunkName: "BorderBottomIcon" */
            "mdi-react/BorderBottomIcon"
        ),
    ),
    "mdi-border-color": React.lazy(() =>
        import(
            /* webpackChunkName: "BorderColorIcon" */
            "mdi-react/BorderColorIcon"
        ),
    ),
    "mdi-border-horizontal": React.lazy(() =>
        import(
            /* webpackChunkName: "BorderHorizontalIcon" */
            "mdi-react/BorderHorizontalIcon"
        ),
    ),
    "mdi-border-inside": React.lazy(() =>
        import(
            /* webpackChunkName: "BorderInsideIcon" */
            "mdi-react/BorderInsideIcon"
        ),
    ),
    "mdi-border-left-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "BorderLeftVariantIcon" */
            "mdi-react/BorderLeftVariantIcon"
        ),
    ),
    "mdi-border-left": React.lazy(() =>
        import(
            /* webpackChunkName: "BorderLeftIcon" */
            "mdi-react/BorderLeftIcon"
        ),
    ),
    "mdi-border-none-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "BorderNoneVariantIcon" */
            "mdi-react/BorderNoneVariantIcon"
        ),
    ),
    "mdi-border-none": React.lazy(() =>
        import(
            /* webpackChunkName: "BorderNoneIcon" */
            "mdi-react/BorderNoneIcon"
        ),
    ),
    "mdi-border-outside": React.lazy(() =>
        import(
            /* webpackChunkName: "BorderOutsideIcon" */
            "mdi-react/BorderOutsideIcon"
        ),
    ),
    "mdi-border-right-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "BorderRightVariantIcon" */
            "mdi-react/BorderRightVariantIcon"
        ),
    ),
    "mdi-border-right": React.lazy(() =>
        import(
            /* webpackChunkName: "BorderRightIcon" */
            "mdi-react/BorderRightIcon"
        ),
    ),
    "mdi-border-style": React.lazy(() =>
        import(
            /* webpackChunkName: "BorderStyleIcon" */
            "mdi-react/BorderStyleIcon"
        ),
    ),
    "mdi-border-top-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "BorderTopVariantIcon" */
            "mdi-react/BorderTopVariantIcon"
        ),
    ),
    "mdi-border-top": React.lazy(() =>
        import(
            /* webpackChunkName: "BorderTopIcon" */
            "mdi-react/BorderTopIcon"
        ),
    ),
    "mdi-border-vertical": React.lazy(() =>
        import(
            /* webpackChunkName: "BorderVerticalIcon" */
            "mdi-react/BorderVerticalIcon"
        ),
    ),
    "mdi-bottle-wine": React.lazy(() =>
        import(
            /* webpackChunkName: "BottleWineIcon" */
            "mdi-react/BottleWineIcon"
        ),
    ),
    "mdi-bow-tie": React.lazy(() =>
        import(
            /* webpackChunkName: "BowTieIcon" */
            "mdi-react/BowTieIcon"
        ),
    ),
    "mdi-bowl": React.lazy(() =>
        import(
            /* webpackChunkName: "BowlIcon" */
            "mdi-react/BowlIcon"
        ),
    ),
    "mdi-bowling": React.lazy(() =>
        import(
            /* webpackChunkName: "BowlingIcon" */
            "mdi-react/BowlingIcon"
        ),
    ),
    "mdi-box-cutter": React.lazy(() =>
        import(
            /* webpackChunkName: "BoxCutterIcon" */
            "mdi-react/BoxCutterIcon"
        ),
    ),
    "mdi-box-shadow": React.lazy(() =>
        import(
            /* webpackChunkName: "BoxShadowIcon" */
            "mdi-react/BoxShadowIcon"
        ),
    ),
    "mdi-box": React.lazy(() =>
        import(
            /* webpackChunkName: "BoxIcon" */
            "mdi-react/BoxIcon"
        ),
    ),
    "mdi-bridge": React.lazy(() =>
        import(
            /* webpackChunkName: "BridgeIcon" */
            "mdi-react/BridgeIcon"
        ),
    ),
    "mdi-briefcase-check": React.lazy(() =>
        import(
            /* webpackChunkName: "BriefcaseCheckIcon" */
            "mdi-react/BriefcaseCheckIcon"
        ),
    ),
    "mdi-briefcase-download": React.lazy(() =>
        import(
            /* webpackChunkName: "BriefcaseDownloadIcon" */
            "mdi-react/BriefcaseDownloadIcon"
        ),
    ),
    "mdi-briefcase-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "BriefcaseOutlineIcon" */
            "mdi-react/BriefcaseOutlineIcon"
        ),
    ),
    "mdi-briefcase-upload": React.lazy(() =>
        import(
            /* webpackChunkName: "BriefcaseUploadIcon" */
            "mdi-react/BriefcaseUploadIcon"
        ),
    ),
    "mdi-briefcase": React.lazy(() =>
        import(
            /* webpackChunkName: "BriefcaseIcon" */
            "mdi-react/BriefcaseIcon"
        ),
    ),
    "mdi-brightness-1": React.lazy(() =>
        import(
            /* webpackChunkName: "Brightness1Icon" */
            "mdi-react/Brightness1Icon"
        ),
    ),
    "mdi-brightness-2": React.lazy(() =>
        import(
            /* webpackChunkName: "Brightness2Icon" */
            "mdi-react/Brightness2Icon"
        ),
    ),
    "mdi-brightness-3": React.lazy(() =>
        import(
            /* webpackChunkName: "Brightness3Icon" */
            "mdi-react/Brightness3Icon"
        ),
    ),
    "mdi-brightness-4": React.lazy(() =>
        import(
            /* webpackChunkName: "Brightness4Icon" */
            "mdi-react/Brightness4Icon"
        ),
    ),
    "mdi-brightness-5": React.lazy(() =>
        import(
            /* webpackChunkName: "Brightness5Icon" */
            "mdi-react/Brightness5Icon"
        ),
    ),
    "mdi-brightness-6": React.lazy(() =>
        import(
            /* webpackChunkName: "Brightness6Icon" */
            "mdi-react/Brightness6Icon"
        ),
    ),
    "mdi-brightness-7": React.lazy(() =>
        import(
            /* webpackChunkName: "Brightness7Icon" */
            "mdi-react/Brightness7Icon"
        ),
    ),
    "mdi-brightness-auto": React.lazy(() =>
        import(
            /* webpackChunkName: "BrightnessAutoIcon" */
            "mdi-react/BrightnessAutoIcon"
        ),
    ),
    "mdi-broom": React.lazy(() =>
        import(
            /* webpackChunkName: "BroomIcon" */
            "mdi-react/BroomIcon"
        ),
    ),
    "mdi-brush": React.lazy(() =>
        import(
            /* webpackChunkName: "BrushIcon" */
            "mdi-react/BrushIcon"
        ),
    ),
    "mdi-buddhism": React.lazy(() =>
        import(
            /* webpackChunkName: "BuddhismIcon" */
            "mdi-react/BuddhismIcon"
        ),
    ),
    "mdi-buffer": React.lazy(() =>
        import(
            /* webpackChunkName: "BufferIcon" */
            "mdi-react/BufferIcon"
        ),
    ),
    "mdi-bug": React.lazy(() =>
        import(
            /* webpackChunkName: "BugIcon" */
            "mdi-react/BugIcon"
        ),
    ),
    "mdi-bulletin-board": React.lazy(() =>
        import(
            /* webpackChunkName: "BulletinBoardIcon" */
            "mdi-react/BulletinBoardIcon"
        ),
    ),
    "mdi-bullhorn": React.lazy(() =>
        import(
            /* webpackChunkName: "BullhornIcon" */
            "mdi-react/BullhornIcon"
        ),
    ),
    "mdi-bullseye-arrow": React.lazy(() =>
        import(
            /* webpackChunkName: "BullseyeArrowIcon" */
            "mdi-react/BullseyeArrowIcon"
        ),
    ),
    "mdi-bullseye": React.lazy(() =>
        import(
            /* webpackChunkName: "BullseyeIcon" */
            "mdi-react/BullseyeIcon"
        ),
    ),
    "mdi-bus-articulated-end": React.lazy(() =>
        import(
            /* webpackChunkName: "BusArticulatedEndIcon" */
            "mdi-react/BusArticulatedEndIcon"
        ),
    ),
    "mdi-bus-articulated-front": React.lazy(() =>
        import(
            /* webpackChunkName: "BusArticulatedFrontIcon" */
            "mdi-react/BusArticulatedFrontIcon"
        ),
    ),
    "mdi-bus-clock": React.lazy(() =>
        import(
            /* webpackChunkName: "BusClockIcon" */
            "mdi-react/BusClockIcon"
        ),
    ),
    "mdi-bus-double-decker": React.lazy(() =>
        import(
            /* webpackChunkName: "BusDoubleDeckerIcon" */
            "mdi-react/BusDoubleDeckerIcon"
        ),
    ),
    "mdi-bus-school": React.lazy(() =>
        import(
            /* webpackChunkName: "BusSchoolIcon" */
            "mdi-react/BusSchoolIcon"
        ),
    ),
    "mdi-bus-side": React.lazy(() =>
        import(
            /* webpackChunkName: "BusSideIcon" */
            "mdi-react/BusSideIcon"
        ),
    ),
    "mdi-bus": React.lazy(() =>
        import(
            /* webpackChunkName: "BusIcon" */
            "mdi-react/BusIcon"
        ),
    ),
    "mdi-cached": React.lazy(() =>
        import(
            /* webpackChunkName: "CachedIcon" */
            "mdi-react/CachedIcon"
        ),
    ),
    "mdi-cake-layered": React.lazy(() =>
        import(
            /* webpackChunkName: "CakeLayeredIcon" */
            "mdi-react/CakeLayeredIcon"
        ),
    ),
    "mdi-cake-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "CakeVariantIcon" */
            "mdi-react/CakeVariantIcon"
        ),
    ),
    "mdi-cake": React.lazy(() =>
        import(
            /* webpackChunkName: "CakeIcon" */
            "mdi-react/CakeIcon"
        ),
    ),
    "mdi-calculator": React.lazy(() =>
        import(
            /* webpackChunkName: "CalculatorIcon" */
            "mdi-react/CalculatorIcon"
        ),
    ),
    "mdi-calendar-blank": React.lazy(() =>
        import(
            /* webpackChunkName: "CalendarBlankIcon" */
            "mdi-react/CalendarBlankIcon"
        ),
    ),
    "mdi-calendar-check": React.lazy(() =>
        import(
            /* webpackChunkName: "CalendarCheckIcon" */
            "mdi-react/CalendarCheckIcon"
        ),
    ),
    "mdi-calendar-clock": React.lazy(() =>
        import(
            /* webpackChunkName: "CalendarClockIcon" */
            "mdi-react/CalendarClockIcon"
        ),
    ),
    "mdi-calendar-edit": React.lazy(() =>
        import(
            /* webpackChunkName: "CalendarEditIcon" */
            "mdi-react/CalendarEditIcon"
        ),
    ),
    "mdi-calendar-multiple-check": React.lazy(() =>
        import(
            /* webpackChunkName: "CalendarMultipleCheckIcon" */
            "mdi-react/CalendarMultipleCheckIcon"
        ),
    ),
    "mdi-calendar-multiple": React.lazy(() =>
        import(
            /* webpackChunkName: "CalendarMultipleIcon" */
            "mdi-react/CalendarMultipleIcon"
        ),
    ),
    "mdi-calendar-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "CalendarPlusIcon" */
            "mdi-react/CalendarPlusIcon"
        ),
    ),
    "mdi-calendar-question": React.lazy(() =>
        import(
            /* webpackChunkName: "CalendarQuestionIcon" */
            "mdi-react/CalendarQuestionIcon"
        ),
    ),
    "mdi-calendar-range": React.lazy(() =>
        import(
            /* webpackChunkName: "CalendarRangeIcon" */
            "mdi-react/CalendarRangeIcon"
        ),
    ),
    "mdi-calendar-remove": React.lazy(() =>
        import(
            /* webpackChunkName: "CalendarRemoveIcon" */
            "mdi-react/CalendarRemoveIcon"
        ),
    ),
    "mdi-calendar-search": React.lazy(() =>
        import(
            /* webpackChunkName: "CalendarSearchIcon" */
            "mdi-react/CalendarSearchIcon"
        ),
    ),
    "mdi-calendar-text": React.lazy(() =>
        import(
            /* webpackChunkName: "CalendarTextIcon" */
            "mdi-react/CalendarTextIcon"
        ),
    ),
    "mdi-calendar-today": React.lazy(() =>
        import(
            /* webpackChunkName: "CalendarTodayIcon" */
            "mdi-react/CalendarTodayIcon"
        ),
    ),
    "mdi-calendar": React.lazy(() =>
        import(
            /* webpackChunkName: "CalendarIcon" */
            "mdi-react/CalendarIcon"
        ),
    ),
    "mdi-call-made": React.lazy(() =>
        import(
            /* webpackChunkName: "CallMadeIcon" */
            "mdi-react/CallMadeIcon"
        ),
    ),
    "mdi-call-merge": React.lazy(() =>
        import(
            /* webpackChunkName: "CallMergeIcon" */
            "mdi-react/CallMergeIcon"
        ),
    ),
    "mdi-call-missed": React.lazy(() =>
        import(
            /* webpackChunkName: "CallMissedIcon" */
            "mdi-react/CallMissedIcon"
        ),
    ),
    "mdi-call-received": React.lazy(() =>
        import(
            /* webpackChunkName: "CallReceivedIcon" */
            "mdi-react/CallReceivedIcon"
        ),
    ),
    "mdi-call-split": React.lazy(() =>
        import(
            /* webpackChunkName: "CallSplitIcon" */
            "mdi-react/CallSplitIcon"
        ),
    ),
    "mdi-camcorder-box-off": React.lazy(() =>
        import(
            /* webpackChunkName: "CamcorderBoxOffIcon" */
            "mdi-react/CamcorderBoxOffIcon"
        ),
    ),
    "mdi-camcorder-box": React.lazy(() =>
        import(
            /* webpackChunkName: "CamcorderBoxIcon" */
            "mdi-react/CamcorderBoxIcon"
        ),
    ),
    "mdi-camcorder-off": React.lazy(() =>
        import(
            /* webpackChunkName: "CamcorderOffIcon" */
            "mdi-react/CamcorderOffIcon"
        ),
    ),
    "mdi-camcorder": React.lazy(() =>
        import(
            /* webpackChunkName: "CamcorderIcon" */
            "mdi-react/CamcorderIcon"
        ),
    ),
    "mdi-camera-account": React.lazy(() =>
        import(
            /* webpackChunkName: "CameraAccountIcon" */
            "mdi-react/CameraAccountIcon"
        ),
    ),
    "mdi-camera-burst": React.lazy(() =>
        import(
            /* webpackChunkName: "CameraBurstIcon" */
            "mdi-react/CameraBurstIcon"
        ),
    ),
    "mdi-camera-enhance": React.lazy(() =>
        import(
            /* webpackChunkName: "CameraEnhanceIcon" */
            "mdi-react/CameraEnhanceIcon"
        ),
    ),
    "mdi-camera-front-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "CameraFrontVariantIcon" */
            "mdi-react/CameraFrontVariantIcon"
        ),
    ),
    "mdi-camera-front": React.lazy(() =>
        import(
            /* webpackChunkName: "CameraFrontIcon" */
            "mdi-react/CameraFrontIcon"
        ),
    ),
    "mdi-camera-gopro": React.lazy(() =>
        import(
            /* webpackChunkName: "CameraGoproIcon" */
            "mdi-react/CameraGoproIcon"
        ),
    ),
    "mdi-camera-image": React.lazy(() =>
        import(
            /* webpackChunkName: "CameraImageIcon" */
            "mdi-react/CameraImageIcon"
        ),
    ),
    "mdi-camera-iris": React.lazy(() =>
        import(
            /* webpackChunkName: "CameraIrisIcon" */
            "mdi-react/CameraIrisIcon"
        ),
    ),
    "mdi-camera-metering-center": React.lazy(() =>
        import(
            /* webpackChunkName: "CameraMeteringCenterIcon" */
            "mdi-react/CameraMeteringCenterIcon"
        ),
    ),
    "mdi-camera-metering-matrix": React.lazy(() =>
        import(
            /* webpackChunkName: "CameraMeteringMatrixIcon" */
            "mdi-react/CameraMeteringMatrixIcon"
        ),
    ),
    "mdi-camera-metering-partial": React.lazy(() =>
        import(
            /* webpackChunkName: "CameraMeteringPartialIcon" */
            "mdi-react/CameraMeteringPartialIcon"
        ),
    ),
    "mdi-camera-metering-spot": React.lazy(() =>
        import(
            /* webpackChunkName: "CameraMeteringSpotIcon" */
            "mdi-react/CameraMeteringSpotIcon"
        ),
    ),
    "mdi-camera-off": React.lazy(() =>
        import(
            /* webpackChunkName: "CameraOffIcon" */
            "mdi-react/CameraOffIcon"
        ),
    ),
    "mdi-camera-party-mode": React.lazy(() =>
        import(
            /* webpackChunkName: "CameraPartyModeIcon" */
            "mdi-react/CameraPartyModeIcon"
        ),
    ),
    "mdi-camera-rear-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "CameraRearVariantIcon" */
            "mdi-react/CameraRearVariantIcon"
        ),
    ),
    "mdi-camera-rear": React.lazy(() =>
        import(
            /* webpackChunkName: "CameraRearIcon" */
            "mdi-react/CameraRearIcon"
        ),
    ),
    "mdi-camera-switch": React.lazy(() =>
        import(
            /* webpackChunkName: "CameraSwitchIcon" */
            "mdi-react/CameraSwitchIcon"
        ),
    ),
    "mdi-camera-timer": React.lazy(() =>
        import(
            /* webpackChunkName: "CameraTimerIcon" */
            "mdi-react/CameraTimerIcon"
        ),
    ),
    "mdi-camera": React.lazy(() =>
        import(
            /* webpackChunkName: "CameraIcon" */
            "mdi-react/CameraIcon"
        ),
    ),
    "mdi-cancel": React.lazy(() =>
        import(
            /* webpackChunkName: "CancelIcon" */
            "mdi-react/CancelIcon"
        ),
    ),
    "mdi-candle": React.lazy(() =>
        import(
            /* webpackChunkName: "CandleIcon" */
            "mdi-react/CandleIcon"
        ),
    ),
    "mdi-candycane": React.lazy(() =>
        import(
            /* webpackChunkName: "CandycaneIcon" */
            "mdi-react/CandycaneIcon"
        ),
    ),
    "mdi-cannabis": React.lazy(() =>
        import(
            /* webpackChunkName: "CannabisIcon" */
            "mdi-react/CannabisIcon"
        ),
    ),
    "mdi-car-battery": React.lazy(() =>
        import(
            /* webpackChunkName: "CarBatteryIcon" */
            "mdi-react/CarBatteryIcon"
        ),
    ),
    "mdi-car-connected": React.lazy(() =>
        import(
            /* webpackChunkName: "CarConnectedIcon" */
            "mdi-react/CarConnectedIcon"
        ),
    ),
    "mdi-car-convertible": React.lazy(() =>
        import(
            /* webpackChunkName: "CarConvertibleIcon" */
            "mdi-react/CarConvertibleIcon"
        ),
    ),
    "mdi-car-estate": React.lazy(() =>
        import(
            /* webpackChunkName: "CarEstateIcon" */
            "mdi-react/CarEstateIcon"
        ),
    ),
    "mdi-car-hatchback": React.lazy(() =>
        import(
            /* webpackChunkName: "CarHatchbackIcon" */
            "mdi-react/CarHatchbackIcon"
        ),
    ),
    "mdi-car-limousine": React.lazy(() =>
        import(
            /* webpackChunkName: "CarLimousineIcon" */
            "mdi-react/CarLimousineIcon"
        ),
    ),
    "mdi-car-pickup": React.lazy(() =>
        import(
            /* webpackChunkName: "CarPickupIcon" */
            "mdi-react/CarPickupIcon"
        ),
    ),
    "mdi-car-side": React.lazy(() =>
        import(
            /* webpackChunkName: "CarSideIcon" */
            "mdi-react/CarSideIcon"
        ),
    ),
    "mdi-car-sports": React.lazy(() =>
        import(
            /* webpackChunkName: "CarSportsIcon" */
            "mdi-react/CarSportsIcon"
        ),
    ),
    "mdi-car-wash": React.lazy(() =>
        import(
            /* webpackChunkName: "CarWashIcon" */
            "mdi-react/CarWashIcon"
        ),
    ),
    "mdi-car": React.lazy(() =>
        import(
            /* webpackChunkName: "CarIcon" */
            "mdi-react/CarIcon"
        ),
    ),
    "mdi-caravan": React.lazy(() =>
        import(
            /* webpackChunkName: "CaravanIcon" */
            "mdi-react/CaravanIcon"
        ),
    ),
    "mdi-cards-club": React.lazy(() =>
        import(
            /* webpackChunkName: "CardsClubIcon" */
            "mdi-react/CardsClubIcon"
        ),
    ),
    "mdi-cards-diamond": React.lazy(() =>
        import(
            /* webpackChunkName: "CardsDiamondIcon" */
            "mdi-react/CardsDiamondIcon"
        ),
    ),
    "mdi-cards-heart": React.lazy(() =>
        import(
            /* webpackChunkName: "CardsHeartIcon" */
            "mdi-react/CardsHeartIcon"
        ),
    ),
    "mdi-cards-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "CardsOutlineIcon" */
            "mdi-react/CardsOutlineIcon"
        ),
    ),
    "mdi-cards-playing-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "CardsPlayingOutlineIcon" */
            "mdi-react/CardsPlayingOutlineIcon"
        ),
    ),
    "mdi-cards-spade": React.lazy(() =>
        import(
            /* webpackChunkName: "CardsSpadeIcon" */
            "mdi-react/CardsSpadeIcon"
        ),
    ),
    "mdi-cards-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "CardsVariantIcon" */
            "mdi-react/CardsVariantIcon"
        ),
    ),
    "mdi-cards": React.lazy(() =>
        import(
            /* webpackChunkName: "CardsIcon" */
            "mdi-react/CardsIcon"
        ),
    ),
    "mdi-carrot": React.lazy(() =>
        import(
            /* webpackChunkName: "CarrotIcon" */
            "mdi-react/CarrotIcon"
        ),
    ),
    "mdi-cart-off": React.lazy(() =>
        import(
            /* webpackChunkName: "CartOffIcon" */
            "mdi-react/CartOffIcon"
        ),
    ),
    "mdi-cart-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "CartOutlineIcon" */
            "mdi-react/CartOutlineIcon"
        ),
    ),
    "mdi-cart-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "CartPlusIcon" */
            "mdi-react/CartPlusIcon"
        ),
    ),
    "mdi-cart": React.lazy(() =>
        import(
            /* webpackChunkName: "CartIcon" */
            "mdi-react/CartIcon"
        ),
    ),
    "mdi-case-sensitive-alt": React.lazy(() =>
        import(
            /* webpackChunkName: "CaseSensitiveAltIcon" */
            "mdi-react/CaseSensitiveAltIcon"
        ),
    ),
    "mdi-cash-100": React.lazy(() =>
        import(
            /* webpackChunkName: "Cash100Icon" */
            "mdi-react/Cash100Icon"
        ),
    ),
    "mdi-cash-multiple": React.lazy(() =>
        import(
            /* webpackChunkName: "CashMultipleIcon" */
            "mdi-react/CashMultipleIcon"
        ),
    ),
    "mdi-cash-usd": React.lazy(() =>
        import(
            /* webpackChunkName: "CashUsdIcon" */
            "mdi-react/CashUsdIcon"
        ),
    ),
    "mdi-cash": React.lazy(() =>
        import(
            /* webpackChunkName: "CashIcon" */
            "mdi-react/CashIcon"
        ),
    ),
    "mdi-cast-connected": React.lazy(() =>
        import(
            /* webpackChunkName: "CastConnectedIcon" */
            "mdi-react/CastConnectedIcon"
        ),
    ),
    "mdi-cast-off": React.lazy(() =>
        import(
            /* webpackChunkName: "CastOffIcon" */
            "mdi-react/CastOffIcon"
        ),
    ),
    "mdi-cast": React.lazy(() =>
        import(
            /* webpackChunkName: "CastIcon" */
            "mdi-react/CastIcon"
        ),
    ),
    "mdi-castle": React.lazy(() =>
        import(
            /* webpackChunkName: "CastleIcon" */
            "mdi-react/CastleIcon"
        ),
    ),
    "mdi-cat": React.lazy(() =>
        import(
            /* webpackChunkName: "CatIcon" */
            "mdi-react/CatIcon"
        ),
    ),
    "mdi-cctv": React.lazy(() =>
        import(
            /* webpackChunkName: "CctvIcon" */
            "mdi-react/CctvIcon"
        ),
    ),
    "mdi-ceiling-light": React.lazy(() =>
        import(
            /* webpackChunkName: "CeilingLightIcon" */
            "mdi-react/CeilingLightIcon"
        ),
    ),
    "mdi-cellphone-android": React.lazy(() =>
        import(
            /* webpackChunkName: "CellphoneAndroidIcon" */
            "mdi-react/CellphoneAndroidIcon"
        ),
    ),
    "mdi-cellphone-basic": React.lazy(() =>
        import(
            /* webpackChunkName: "CellphoneBasicIcon" */
            "mdi-react/CellphoneBasicIcon"
        ),
    ),
    "mdi-cellphone-dock": React.lazy(() =>
        import(
            /* webpackChunkName: "CellphoneDockIcon" */
            "mdi-react/CellphoneDockIcon"
        ),
    ),
    "mdi-cellphone-erase": React.lazy(() =>
        import(
            /* webpackChunkName: "CellphoneEraseIcon" */
            "mdi-react/CellphoneEraseIcon"
        ),
    ),
    "mdi-cellphone-iphone": React.lazy(() =>
        import(
            /* webpackChunkName: "CellphoneIphoneIcon" */
            "mdi-react/CellphoneIphoneIcon"
        ),
    ),
    "mdi-cellphone-key": React.lazy(() =>
        import(
            /* webpackChunkName: "CellphoneKeyIcon" */
            "mdi-react/CellphoneKeyIcon"
        ),
    ),
    "mdi-cellphone-link-off": React.lazy(() =>
        import(
            /* webpackChunkName: "CellphoneLinkOffIcon" */
            "mdi-react/CellphoneLinkOffIcon"
        ),
    ),
    "mdi-cellphone-link": React.lazy(() =>
        import(
            /* webpackChunkName: "CellphoneLinkIcon" */
            "mdi-react/CellphoneLinkIcon"
        ),
    ),
    "mdi-cellphone-lock": React.lazy(() =>
        import(
            /* webpackChunkName: "CellphoneLockIcon" */
            "mdi-react/CellphoneLockIcon"
        ),
    ),
    "mdi-cellphone-message": React.lazy(() =>
        import(
            /* webpackChunkName: "CellphoneMessageIcon" */
            "mdi-react/CellphoneMessageIcon"
        ),
    ),
    "mdi-cellphone-off": React.lazy(() =>
        import(
            /* webpackChunkName: "CellphoneOffIcon" */
            "mdi-react/CellphoneOffIcon"
        ),
    ),
    "mdi-cellphone-settings-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "CellphoneSettingsVariantIcon" */
            "mdi-react/CellphoneSettingsVariantIcon"
        ),
    ),
    "mdi-cellphone-settings": React.lazy(() =>
        import(
            /* webpackChunkName: "CellphoneSettingsIcon" */
            "mdi-react/CellphoneSettingsIcon"
        ),
    ),
    "mdi-cellphone-sound": React.lazy(() =>
        import(
            /* webpackChunkName: "CellphoneSoundIcon" */
            "mdi-react/CellphoneSoundIcon"
        ),
    ),
    "mdi-cellphone-text": React.lazy(() =>
        import(
            /* webpackChunkName: "CellphoneTextIcon" */
            "mdi-react/CellphoneTextIcon"
        ),
    ),
    "mdi-cellphone-wireless": React.lazy(() =>
        import(
            /* webpackChunkName: "CellphoneWirelessIcon" */
            "mdi-react/CellphoneWirelessIcon"
        ),
    ),
    "mdi-cellphone": React.lazy(() =>
        import(
            /* webpackChunkName: "CellphoneIcon" */
            "mdi-react/CellphoneIcon"
        ),
    ),
    "mdi-certificate": React.lazy(() =>
        import(
            /* webpackChunkName: "CertificateIcon" */
            "mdi-react/CertificateIcon"
        ),
    ),
    "mdi-chair-school": React.lazy(() =>
        import(
            /* webpackChunkName: "ChairSchoolIcon" */
            "mdi-react/ChairSchoolIcon"
        ),
    ),
    "mdi-chart-arc": React.lazy(() =>
        import(
            /* webpackChunkName: "ChartArcIcon" */
            "mdi-react/ChartArcIcon"
        ),
    ),
    "mdi-chart-areaspline": React.lazy(() =>
        import(
            /* webpackChunkName: "ChartAreasplineIcon" */
            "mdi-react/ChartAreasplineIcon"
        ),
    ),
    "mdi-chart-bar-stacked": React.lazy(() =>
        import(
            /* webpackChunkName: "ChartBarStackedIcon" */
            "mdi-react/ChartBarStackedIcon"
        ),
    ),
    "mdi-chart-bar": React.lazy(() =>
        import(
            /* webpackChunkName: "ChartBarIcon" */
            "mdi-react/ChartBarIcon"
        ),
    ),
    "mdi-chart-bubble": React.lazy(() =>
        import(
            /* webpackChunkName: "ChartBubbleIcon" */
            "mdi-react/ChartBubbleIcon"
        ),
    ),
    "mdi-chart-donut-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "ChartDonutVariantIcon" */
            "mdi-react/ChartDonutVariantIcon"
        ),
    ),
    "mdi-chart-donut": React.lazy(() =>
        import(
            /* webpackChunkName: "ChartDonutIcon" */
            "mdi-react/ChartDonutIcon"
        ),
    ),
    "mdi-chart-gantt": React.lazy(() =>
        import(
            /* webpackChunkName: "ChartGanttIcon" */
            "mdi-react/ChartGanttIcon"
        ),
    ),
    "mdi-chart-histogram": React.lazy(() =>
        import(
            /* webpackChunkName: "ChartHistogramIcon" */
            "mdi-react/ChartHistogramIcon"
        ),
    ),
    "mdi-chart-line-stacked": React.lazy(() =>
        import(
            /* webpackChunkName: "ChartLineStackedIcon" */
            "mdi-react/ChartLineStackedIcon"
        ),
    ),
    "mdi-chart-line-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "ChartLineVariantIcon" */
            "mdi-react/ChartLineVariantIcon"
        ),
    ),
    "mdi-chart-line": React.lazy(() =>
        import(
            /* webpackChunkName: "ChartLineIcon" */
            "mdi-react/ChartLineIcon"
        ),
    ),
    "mdi-chart-multiline": React.lazy(() =>
        import(
            /* webpackChunkName: "ChartMultilineIcon" */
            "mdi-react/ChartMultilineIcon"
        ),
    ),
    "mdi-chart-pie": React.lazy(() =>
        import(
            /* webpackChunkName: "ChartPieIcon" */
            "mdi-react/ChartPieIcon"
        ),
    ),
    "mdi-chart-scatterplot-hexbin": React.lazy(() =>
        import(
            /* webpackChunkName: "ChartScatterplotHexbinIcon" */
            "mdi-react/ChartScatterplotHexbinIcon"
        ),
    ),
    "mdi-chart-timeline": React.lazy(() =>
        import(
            /* webpackChunkName: "ChartTimelineIcon" */
            "mdi-react/ChartTimelineIcon"
        ),
    ),
    "mdi-check-all": React.lazy(() =>
        import(
            /* webpackChunkName: "CheckAllIcon" */
            "mdi-react/CheckAllIcon"
        ),
    ),
    "mdi-check-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "CheckCircleOutlineIcon" */
            "mdi-react/CheckCircleOutlineIcon"
        ),
    ),
    "mdi-check-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "CheckCircleIcon" */
            "mdi-react/CheckCircleIcon"
        ),
    ),
    "mdi-check-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "CheckOutlineIcon" */
            "mdi-react/CheckOutlineIcon"
        ),
    ),
    "mdi-check": React.lazy(() =>
        import(
            /* webpackChunkName: "CheckIcon" */
            "mdi-react/CheckIcon"
        ),
    ),
    "mdi-checkbox-blank-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "CheckboxBlankCircleOutlineIcon" */
            "mdi-react/CheckboxBlankCircleOutlineIcon"
        ),
    ),
    "mdi-checkbox-blank-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "CheckboxBlankCircleIcon" */
            "mdi-react/CheckboxBlankCircleIcon"
        ),
    ),
    "mdi-checkbox-blank-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "CheckboxBlankOutlineIcon" */
            "mdi-react/CheckboxBlankOutlineIcon"
        ),
    ),
    "mdi-checkbox-blank": React.lazy(() =>
        import(
            /* webpackChunkName: "CheckboxBlankIcon" */
            "mdi-react/CheckboxBlankIcon"
        ),
    ),
    "mdi-checkbox-intermediate": React.lazy(() =>
        import(
            /* webpackChunkName: "CheckboxIntermediateIcon" */
            "mdi-react/CheckboxIntermediateIcon"
        ),
    ),
    "mdi-checkbox-marked-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "CheckboxMarkedCircleOutlineIcon" */
            "mdi-react/CheckboxMarkedCircleOutlineIcon"
        ),
    ),
    "mdi-checkbox-marked-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "CheckboxMarkedCircleIcon" */
            "mdi-react/CheckboxMarkedCircleIcon"
        ),
    ),
    "mdi-checkbox-marked-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "CheckboxMarkedOutlineIcon" */
            "mdi-react/CheckboxMarkedOutlineIcon"
        ),
    ),
    "mdi-checkbox-marked": React.lazy(() =>
        import(
            /* webpackChunkName: "CheckboxMarkedIcon" */
            "mdi-react/CheckboxMarkedIcon"
        ),
    ),
    "mdi-checkbox-multiple-blank-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "CheckboxMultipleBlankCircleOutlineIcon" */
            "mdi-react/CheckboxMultipleBlankCircleOutlineIcon"
        ),
    ),
    "mdi-checkbox-multiple-blank-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "CheckboxMultipleBlankCircleIcon" */
            "mdi-react/CheckboxMultipleBlankCircleIcon"
        ),
    ),
    "mdi-checkbox-multiple-blank-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "CheckboxMultipleBlankOutlineIcon" */
            "mdi-react/CheckboxMultipleBlankOutlineIcon"
        ),
    ),
    "mdi-checkbox-multiple-blank": React.lazy(() =>
        import(
            /* webpackChunkName: "CheckboxMultipleBlankIcon" */
            "mdi-react/CheckboxMultipleBlankIcon"
        ),
    ),
    "mdi-checkbox-multiple-marked-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "CheckboxMultipleMarkedCircleOutlineIcon" */
            "mdi-react/CheckboxMultipleMarkedCircleOutlineIcon"
        ),
    ),
    "mdi-checkbox-multiple-marked-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "CheckboxMultipleMarkedCircleIcon" */
            "mdi-react/CheckboxMultipleMarkedCircleIcon"
        ),
    ),
    "mdi-checkbox-multiple-marked-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "CheckboxMultipleMarkedOutlineIcon" */
            "mdi-react/CheckboxMultipleMarkedOutlineIcon"
        ),
    ),
    "mdi-checkbox-multiple-marked": React.lazy(() =>
        import(
            /* webpackChunkName: "CheckboxMultipleMarkedIcon" */
            "mdi-react/CheckboxMultipleMarkedIcon"
        ),
    ),
    "mdi-checkerboard": React.lazy(() =>
        import(
            /* webpackChunkName: "CheckerboardIcon" */
            "mdi-react/CheckerboardIcon"
        ),
    ),
    "mdi-chemical-weapon": React.lazy(() =>
        import(
            /* webpackChunkName: "ChemicalWeaponIcon" */
            "mdi-react/ChemicalWeaponIcon"
        ),
    ),
    "mdi-chess-bishop": React.lazy(() =>
        import(
            /* webpackChunkName: "ChessBishopIcon" */
            "mdi-react/ChessBishopIcon"
        ),
    ),
    "mdi-chess-king": React.lazy(() =>
        import(
            /* webpackChunkName: "ChessKingIcon" */
            "mdi-react/ChessKingIcon"
        ),
    ),
    "mdi-chess-knight": React.lazy(() =>
        import(
            /* webpackChunkName: "ChessKnightIcon" */
            "mdi-react/ChessKnightIcon"
        ),
    ),
    "mdi-chess-pawn": React.lazy(() =>
        import(
            /* webpackChunkName: "ChessPawnIcon" */
            "mdi-react/ChessPawnIcon"
        ),
    ),
    "mdi-chess-queen": React.lazy(() =>
        import(
            /* webpackChunkName: "ChessQueenIcon" */
            "mdi-react/ChessQueenIcon"
        ),
    ),
    "mdi-chess-rook": React.lazy(() =>
        import(
            /* webpackChunkName: "ChessRookIcon" */
            "mdi-react/ChessRookIcon"
        ),
    ),
    "mdi-chevron-double-down": React.lazy(() =>
        import(
            /* webpackChunkName: "ChevronDoubleDownIcon" */
            "mdi-react/ChevronDoubleDownIcon"
        ),
    ),
    "mdi-chevron-double-left": React.lazy(() =>
        import(
            /* webpackChunkName: "ChevronDoubleLeftIcon" */
            "mdi-react/ChevronDoubleLeftIcon"
        ),
    ),
    "mdi-chevron-double-right": React.lazy(() =>
        import(
            /* webpackChunkName: "ChevronDoubleRightIcon" */
            "mdi-react/ChevronDoubleRightIcon"
        ),
    ),
    "mdi-chevron-double-up": React.lazy(() =>
        import(
            /* webpackChunkName: "ChevronDoubleUpIcon" */
            "mdi-react/ChevronDoubleUpIcon"
        ),
    ),
    "mdi-chevron-down": React.lazy(() =>
        import(
            /* webpackChunkName: "ChevronDownIcon" */
            "mdi-react/ChevronDownIcon"
        ),
    ),
    "mdi-chevron-left": React.lazy(() =>
        import(
            /* webpackChunkName: "ChevronLeftIcon" */
            "mdi-react/ChevronLeftIcon"
        ),
    ),
    "mdi-chevron-right": React.lazy(() =>
        import(
            /* webpackChunkName: "ChevronRightIcon" */
            "mdi-react/ChevronRightIcon"
        ),
    ),
    "mdi-chevron-up": React.lazy(() =>
        import(
            /* webpackChunkName: "ChevronUpIcon" */
            "mdi-react/ChevronUpIcon"
        ),
    ),
    "mdi-chili-hot": React.lazy(() =>
        import(
            /* webpackChunkName: "ChiliHotIcon" */
            "mdi-react/ChiliHotIcon"
        ),
    ),
    "mdi-chili-medium": React.lazy(() =>
        import(
            /* webpackChunkName: "ChiliMediumIcon" */
            "mdi-react/ChiliMediumIcon"
        ),
    ),
    "mdi-chili-mild": React.lazy(() =>
        import(
            /* webpackChunkName: "ChiliMildIcon" */
            "mdi-react/ChiliMildIcon"
        ),
    ),
    "mdi-chip": React.lazy(() =>
        import(
            /* webpackChunkName: "ChipIcon" */
            "mdi-react/ChipIcon"
        ),
    ),
    "mdi-christiantiy": React.lazy(() =>
        import(
            /* webpackChunkName: "ChristiantiyIcon" */
            "mdi-react/ChristiantiyIcon"
        ),
    ),
    "mdi-church": React.lazy(() =>
        import(
            /* webpackChunkName: "ChurchIcon" */
            "mdi-react/ChurchIcon"
        ),
    ),
    "mdi-circle-edit-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "CircleEditOutlineIcon" */
            "mdi-react/CircleEditOutlineIcon"
        ),
    ),
    "mdi-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "CircleOutlineIcon" */
            "mdi-react/CircleOutlineIcon"
        ),
    ),
    "mdi-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "CircleIcon" */
            "mdi-react/CircleIcon"
        ),
    ),
    "mdi-cisco-webex": React.lazy(() =>
        import(
            /* webpackChunkName: "CiscoWebexIcon" */
            "mdi-react/CiscoWebexIcon"
        ),
    ),
    "mdi-city": React.lazy(() =>
        import(
            /* webpackChunkName: "CityIcon" */
            "mdi-react/CityIcon"
        ),
    ),
    "mdi-clipboard-account": React.lazy(() =>
        import(
            /* webpackChunkName: "ClipboardAccountIcon" */
            "mdi-react/ClipboardAccountIcon"
        ),
    ),
    "mdi-clipboard-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "ClipboardAlertIcon" */
            "mdi-react/ClipboardAlertIcon"
        ),
    ),
    "mdi-clipboard-arrow-down": React.lazy(() =>
        import(
            /* webpackChunkName: "ClipboardArrowDownIcon" */
            "mdi-react/ClipboardArrowDownIcon"
        ),
    ),
    "mdi-clipboard-arrow-left": React.lazy(() =>
        import(
            /* webpackChunkName: "ClipboardArrowLeftIcon" */
            "mdi-react/ClipboardArrowLeftIcon"
        ),
    ),
    "mdi-clipboard-check-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "ClipboardCheckOutlineIcon" */
            "mdi-react/ClipboardCheckOutlineIcon"
        ),
    ),
    "mdi-clipboard-check": React.lazy(() =>
        import(
            /* webpackChunkName: "ClipboardCheckIcon" */
            "mdi-react/ClipboardCheckIcon"
        ),
    ),
    "mdi-clipboard-flow": React.lazy(() =>
        import(
            /* webpackChunkName: "ClipboardFlowIcon" */
            "mdi-react/ClipboardFlowIcon"
        ),
    ),
    "mdi-clipboard-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "ClipboardOutlineIcon" */
            "mdi-react/ClipboardOutlineIcon"
        ),
    ),
    "mdi-clipboard-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "ClipboardPlusIcon" */
            "mdi-react/ClipboardPlusIcon"
        ),
    ),
    "mdi-clipboard-pulse-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "ClipboardPulseOutlineIcon" */
            "mdi-react/ClipboardPulseOutlineIcon"
        ),
    ),
    "mdi-clipboard-pulse": React.lazy(() =>
        import(
            /* webpackChunkName: "ClipboardPulseIcon" */
            "mdi-react/ClipboardPulseIcon"
        ),
    ),
    "mdi-clipboard-text": React.lazy(() =>
        import(
            /* webpackChunkName: "ClipboardTextIcon" */
            "mdi-react/ClipboardTextIcon"
        ),
    ),
    "mdi-clipboard": React.lazy(() =>
        import(
            /* webpackChunkName: "ClipboardIcon" */
            "mdi-react/ClipboardIcon"
        ),
    ),
    "mdi-clippy": React.lazy(() =>
        import(
            /* webpackChunkName: "ClippyIcon" */
            "mdi-react/ClippyIcon"
        ),
    ),
    "mdi-clock-alert-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "ClockAlertOutlineIcon" */
            "mdi-react/ClockAlertOutlineIcon"
        ),
    ),
    "mdi-clock-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "ClockAlertIcon" */
            "mdi-react/ClockAlertIcon"
        ),
    ),
    "mdi-clock-end": React.lazy(() =>
        import(
            /* webpackChunkName: "ClockEndIcon" */
            "mdi-react/ClockEndIcon"
        ),
    ),
    "mdi-clock-fast": React.lazy(() =>
        import(
            /* webpackChunkName: "ClockFastIcon" */
            "mdi-react/ClockFastIcon"
        ),
    ),
    "mdi-clock-in": React.lazy(() =>
        import(
            /* webpackChunkName: "ClockInIcon" */
            "mdi-react/ClockInIcon"
        ),
    ),
    "mdi-clock-out": React.lazy(() =>
        import(
            /* webpackChunkName: "ClockOutIcon" */
            "mdi-react/ClockOutIcon"
        ),
    ),
    "mdi-clock-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "ClockOutlineIcon" */
            "mdi-react/ClockOutlineIcon"
        ),
    ),
    "mdi-clock-start": React.lazy(() =>
        import(
            /* webpackChunkName: "ClockStartIcon" */
            "mdi-react/ClockStartIcon"
        ),
    ),
    "mdi-clock": React.lazy(() =>
        import(
            /* webpackChunkName: "ClockIcon" */
            "mdi-react/ClockIcon"
        ),
    ),
    "mdi-close-box-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "CloseBoxOutlineIcon" */
            "mdi-react/CloseBoxOutlineIcon"
        ),
    ),
    "mdi-close-box": React.lazy(() =>
        import(
            /* webpackChunkName: "CloseBoxIcon" */
            "mdi-react/CloseBoxIcon"
        ),
    ),
    "mdi-close-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "CloseCircleOutlineIcon" */
            "mdi-react/CloseCircleOutlineIcon"
        ),
    ),
    "mdi-close-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "CloseCircleIcon" */
            "mdi-react/CloseCircleIcon"
        ),
    ),
    "mdi-close-network": React.lazy(() =>
        import(
            /* webpackChunkName: "CloseNetworkIcon" */
            "mdi-react/CloseNetworkIcon"
        ),
    ),
    "mdi-close-octagon-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "CloseOctagonOutlineIcon" */
            "mdi-react/CloseOctagonOutlineIcon"
        ),
    ),
    "mdi-close-octagon": React.lazy(() =>
        import(
            /* webpackChunkName: "CloseOctagonIcon" */
            "mdi-react/CloseOctagonIcon"
        ),
    ),
    "mdi-close-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "CloseOutlineIcon" */
            "mdi-react/CloseOutlineIcon"
        ),
    ),
    "mdi-close": React.lazy(() =>
        import(
            /* webpackChunkName: "CloseIcon" */
            "mdi-react/CloseIcon"
        ),
    ),
    "mdi-closed-caption": React.lazy(() =>
        import(
            /* webpackChunkName: "ClosedCaptionIcon" */
            "mdi-react/ClosedCaptionIcon"
        ),
    ),
    "mdi-cloud-braces": React.lazy(() =>
        import(
            /* webpackChunkName: "CloudBracesIcon" */
            "mdi-react/CloudBracesIcon"
        ),
    ),
    "mdi-cloud-check": React.lazy(() =>
        import(
            /* webpackChunkName: "CloudCheckIcon" */
            "mdi-react/CloudCheckIcon"
        ),
    ),
    "mdi-cloud-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "CloudCircleIcon" */
            "mdi-react/CloudCircleIcon"
        ),
    ),
    "mdi-cloud-download": React.lazy(() =>
        import(
            /* webpackChunkName: "CloudDownloadIcon" */
            "mdi-react/CloudDownloadIcon"
        ),
    ),
    "mdi-cloud-off-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "CloudOffOutlineIcon" */
            "mdi-react/CloudOffOutlineIcon"
        ),
    ),
    "mdi-cloud-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "CloudOutlineIcon" */
            "mdi-react/CloudOutlineIcon"
        ),
    ),
    "mdi-cloud-print-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "CloudPrintOutlineIcon" */
            "mdi-react/CloudPrintOutlineIcon"
        ),
    ),
    "mdi-cloud-print": React.lazy(() =>
        import(
            /* webpackChunkName: "CloudPrintIcon" */
            "mdi-react/CloudPrintIcon"
        ),
    ),
    "mdi-cloud-search-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "CloudSearchOutlineIcon" */
            "mdi-react/CloudSearchOutlineIcon"
        ),
    ),
    "mdi-cloud-search": React.lazy(() =>
        import(
            /* webpackChunkName: "CloudSearchIcon" */
            "mdi-react/CloudSearchIcon"
        ),
    ),
    "mdi-cloud-sync": React.lazy(() =>
        import(
            /* webpackChunkName: "CloudSyncIcon" */
            "mdi-react/CloudSyncIcon"
        ),
    ),
    "mdi-cloud-tags": React.lazy(() =>
        import(
            /* webpackChunkName: "CloudTagsIcon" */
            "mdi-react/CloudTagsIcon"
        ),
    ),
    "mdi-cloud-upload": React.lazy(() =>
        import(
            /* webpackChunkName: "CloudUploadIcon" */
            "mdi-react/CloudUploadIcon"
        ),
    ),
    "mdi-cloud": React.lazy(() =>
        import(
            /* webpackChunkName: "CloudIcon" */
            "mdi-react/CloudIcon"
        ),
    ),
    "mdi-clover": React.lazy(() =>
        import(
            /* webpackChunkName: "CloverIcon" */
            "mdi-react/CloverIcon"
        ),
    ),
    "mdi-code-array": React.lazy(() =>
        import(
            /* webpackChunkName: "CodeArrayIcon" */
            "mdi-react/CodeArrayIcon"
        ),
    ),
    "mdi-code-braces": React.lazy(() =>
        import(
            /* webpackChunkName: "CodeBracesIcon" */
            "mdi-react/CodeBracesIcon"
        ),
    ),
    "mdi-code-brackets": React.lazy(() =>
        import(
            /* webpackChunkName: "CodeBracketsIcon" */
            "mdi-react/CodeBracketsIcon"
        ),
    ),
    "mdi-code-equal": React.lazy(() =>
        import(
            /* webpackChunkName: "CodeEqualIcon" */
            "mdi-react/CodeEqualIcon"
        ),
    ),
    "mdi-code-greater-than-or-equal": React.lazy(() =>
        import(
            /* webpackChunkName: "CodeGreaterThanOrEqualIcon" */
            "mdi-react/CodeGreaterThanOrEqualIcon"
        ),
    ),
    "mdi-code-greater-than": React.lazy(() =>
        import(
            /* webpackChunkName: "CodeGreaterThanIcon" */
            "mdi-react/CodeGreaterThanIcon"
        ),
    ),
    "mdi-code-less-than-or-equal": React.lazy(() =>
        import(
            /* webpackChunkName: "CodeLessThanOrEqualIcon" */
            "mdi-react/CodeLessThanOrEqualIcon"
        ),
    ),
    "mdi-code-less-than": React.lazy(() =>
        import(
            /* webpackChunkName: "CodeLessThanIcon" */
            "mdi-react/CodeLessThanIcon"
        ),
    ),
    "mdi-code-not-equal-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "CodeNotEqualVariantIcon" */
            "mdi-react/CodeNotEqualVariantIcon"
        ),
    ),
    "mdi-code-not-equal": React.lazy(() =>
        import(
            /* webpackChunkName: "CodeNotEqualIcon" */
            "mdi-react/CodeNotEqualIcon"
        ),
    ),
    "mdi-code-parentheses": React.lazy(() =>
        import(
            /* webpackChunkName: "CodeParenthesesIcon" */
            "mdi-react/CodeParenthesesIcon"
        ),
    ),
    "mdi-code-string": React.lazy(() =>
        import(
            /* webpackChunkName: "CodeStringIcon" */
            "mdi-react/CodeStringIcon"
        ),
    ),
    "mdi-code-tags-check": React.lazy(() =>
        import(
            /* webpackChunkName: "CodeTagsCheckIcon" */
            "mdi-react/CodeTagsCheckIcon"
        ),
    ),
    "mdi-code-tags": React.lazy(() =>
        import(
            /* webpackChunkName: "CodeTagsIcon" */
            "mdi-react/CodeTagsIcon"
        ),
    ),
    "mdi-codepen": React.lazy(() =>
        import(
            /* webpackChunkName: "CodepenIcon" */
            "mdi-react/CodepenIcon"
        ),
    ),
    "mdi-coffee-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "CoffeeOutlineIcon" */
            "mdi-react/CoffeeOutlineIcon"
        ),
    ),
    "mdi-coffee-to-go": React.lazy(() =>
        import(
            /* webpackChunkName: "CoffeeToGoIcon" */
            "mdi-react/CoffeeToGoIcon"
        ),
    ),
    "mdi-coffee": React.lazy(() =>
        import(
            /* webpackChunkName: "CoffeeIcon" */
            "mdi-react/CoffeeIcon"
        ),
    ),
    "mdi-cogs": React.lazy(() =>
        import(
            /* webpackChunkName: "CogsIcon" */
            "mdi-react/CogsIcon"
        ),
    ),
    "mdi-coin": React.lazy(() =>
        import(
            /* webpackChunkName: "CoinIcon" */
            "mdi-react/CoinIcon"
        ),
    ),
    "mdi-coins": React.lazy(() =>
        import(
            /* webpackChunkName: "CoinsIcon" */
            "mdi-react/CoinsIcon"
        ),
    ),
    "mdi-collage": React.lazy(() =>
        import(
            /* webpackChunkName: "CollageIcon" */
            "mdi-react/CollageIcon"
        ),
    ),
    "mdi-color-helper": React.lazy(() =>
        import(
            /* webpackChunkName: "ColorHelperIcon" */
            "mdi-react/ColorHelperIcon"
        ),
    ),
    "mdi-comment-account-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "CommentAccountOutlineIcon" */
            "mdi-react/CommentAccountOutlineIcon"
        ),
    ),
    "mdi-comment-account": React.lazy(() =>
        import(
            /* webpackChunkName: "CommentAccountIcon" */
            "mdi-react/CommentAccountIcon"
        ),
    ),
    "mdi-comment-alert-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "CommentAlertOutlineIcon" */
            "mdi-react/CommentAlertOutlineIcon"
        ),
    ),
    "mdi-comment-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "CommentAlertIcon" */
            "mdi-react/CommentAlertIcon"
        ),
    ),
    "mdi-comment-check-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "CommentCheckOutlineIcon" */
            "mdi-react/CommentCheckOutlineIcon"
        ),
    ),
    "mdi-comment-check": React.lazy(() =>
        import(
            /* webpackChunkName: "CommentCheckIcon" */
            "mdi-react/CommentCheckIcon"
        ),
    ),
    "mdi-comment-multiple-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "CommentMultipleOutlineIcon" */
            "mdi-react/CommentMultipleOutlineIcon"
        ),
    ),
    "mdi-comment-multiple": React.lazy(() =>
        import(
            /* webpackChunkName: "CommentMultipleIcon" */
            "mdi-react/CommentMultipleIcon"
        ),
    ),
    "mdi-comment-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "CommentOutlineIcon" */
            "mdi-react/CommentOutlineIcon"
        ),
    ),
    "mdi-comment-plus-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "CommentPlusOutlineIcon" */
            "mdi-react/CommentPlusOutlineIcon"
        ),
    ),
    "mdi-comment-processing-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "CommentProcessingOutlineIcon" */
            "mdi-react/CommentProcessingOutlineIcon"
        ),
    ),
    "mdi-comment-processing": React.lazy(() =>
        import(
            /* webpackChunkName: "CommentProcessingIcon" */
            "mdi-react/CommentProcessingIcon"
        ),
    ),
    "mdi-comment-question-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "CommentQuestionOutlineIcon" */
            "mdi-react/CommentQuestionOutlineIcon"
        ),
    ),
    "mdi-comment-question": React.lazy(() =>
        import(
            /* webpackChunkName: "CommentQuestionIcon" */
            "mdi-react/CommentQuestionIcon"
        ),
    ),
    "mdi-comment-remove-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "CommentRemoveOutlineIcon" */
            "mdi-react/CommentRemoveOutlineIcon"
        ),
    ),
    "mdi-comment-remove": React.lazy(() =>
        import(
            /* webpackChunkName: "CommentRemoveIcon" */
            "mdi-react/CommentRemoveIcon"
        ),
    ),
    "mdi-comment-text-multiple-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "CommentTextMultipleOutlineIcon" */
            "mdi-react/CommentTextMultipleOutlineIcon"
        ),
    ),
    "mdi-comment-text-multiple": React.lazy(() =>
        import(
            /* webpackChunkName: "CommentTextMultipleIcon" */
            "mdi-react/CommentTextMultipleIcon"
        ),
    ),
    "mdi-comment-text-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "CommentTextOutlineIcon" */
            "mdi-react/CommentTextOutlineIcon"
        ),
    ),
    "mdi-comment-text": React.lazy(() =>
        import(
            /* webpackChunkName: "CommentTextIcon" */
            "mdi-react/CommentTextIcon"
        ),
    ),
    "mdi-comment": React.lazy(() =>
        import(
            /* webpackChunkName: "CommentIcon" */
            "mdi-react/CommentIcon"
        ),
    ),
    "mdi-compare": React.lazy(() =>
        import(
            /* webpackChunkName: "CompareIcon" */
            "mdi-react/CompareIcon"
        ),
    ),
    "mdi-compass-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "CompassOutlineIcon" */
            "mdi-react/CompassOutlineIcon"
        ),
    ),
    "mdi-compass": React.lazy(() =>
        import(
            /* webpackChunkName: "CompassIcon" */
            "mdi-react/CompassIcon"
        ),
    ),
    "mdi-console-line": React.lazy(() =>
        import(
            /* webpackChunkName: "ConsoleLineIcon" */
            "mdi-react/ConsoleLineIcon"
        ),
    ),
    "mdi-console-network": React.lazy(() =>
        import(
            /* webpackChunkName: "ConsoleNetworkIcon" */
            "mdi-react/ConsoleNetworkIcon"
        ),
    ),
    "mdi-console": React.lazy(() =>
        import(
            /* webpackChunkName: "ConsoleIcon" */
            "mdi-react/ConsoleIcon"
        ),
    ),
    "mdi-contact-mail": React.lazy(() =>
        import(
            /* webpackChunkName: "ContactMailIcon" */
            "mdi-react/ContactMailIcon"
        ),
    ),
    "mdi-contacts": React.lazy(() =>
        import(
            /* webpackChunkName: "ContactsIcon" */
            "mdi-react/ContactsIcon"
        ),
    ),
    "mdi-content-copy": React.lazy(() =>
        import(
            /* webpackChunkName: "ContentCopyIcon" */
            "mdi-react/ContentCopyIcon"
        ),
    ),
    "mdi-content-cut": React.lazy(() =>
        import(
            /* webpackChunkName: "ContentCutIcon" */
            "mdi-react/ContentCutIcon"
        ),
    ),
    "mdi-content-duplicate": React.lazy(() =>
        import(
            /* webpackChunkName: "ContentDuplicateIcon" */
            "mdi-react/ContentDuplicateIcon"
        ),
    ),
    "mdi-content-paste": React.lazy(() =>
        import(
            /* webpackChunkName: "ContentPasteIcon" */
            "mdi-react/ContentPasteIcon"
        ),
    ),
    "mdi-content-save-all": React.lazy(() =>
        import(
            /* webpackChunkName: "ContentSaveAllIcon" */
            "mdi-react/ContentSaveAllIcon"
        ),
    ),
    "mdi-content-save-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "ContentSaveOutlineIcon" */
            "mdi-react/ContentSaveOutlineIcon"
        ),
    ),
    "mdi-content-save-settings": React.lazy(() =>
        import(
            /* webpackChunkName: "ContentSaveSettingsIcon" */
            "mdi-react/ContentSaveSettingsIcon"
        ),
    ),
    "mdi-content-save": React.lazy(() =>
        import(
            /* webpackChunkName: "ContentSaveIcon" */
            "mdi-react/ContentSaveIcon"
        ),
    ),
    "mdi-contrast-box": React.lazy(() =>
        import(
            /* webpackChunkName: "ContrastBoxIcon" */
            "mdi-react/ContrastBoxIcon"
        ),
    ),
    "mdi-contrast-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "ContrastCircleIcon" */
            "mdi-react/ContrastCircleIcon"
        ),
    ),
    "mdi-contrast": React.lazy(() =>
        import(
            /* webpackChunkName: "ContrastIcon" */
            "mdi-react/ContrastIcon"
        ),
    ),
    "mdi-cookie": React.lazy(() =>
        import(
            /* webpackChunkName: "CookieIcon" */
            "mdi-react/CookieIcon"
        ),
    ),
    "mdi-copyright": React.lazy(() =>
        import(
            /* webpackChunkName: "CopyrightIcon" */
            "mdi-react/CopyrightIcon"
        ),
    ),
    "mdi-cordova": React.lazy(() =>
        import(
            /* webpackChunkName: "CordovaIcon" */
            "mdi-react/CordovaIcon"
        ),
    ),
    "mdi-corn": React.lazy(() =>
        import(
            /* webpackChunkName: "CornIcon" */
            "mdi-react/CornIcon"
        ),
    ),
    "mdi-counter": React.lazy(() =>
        import(
            /* webpackChunkName: "CounterIcon" */
            "mdi-react/CounterIcon"
        ),
    ),
    "mdi-cow": React.lazy(() =>
        import(
            /* webpackChunkName: "CowIcon" */
            "mdi-react/CowIcon"
        ),
    ),
    "mdi-crane": React.lazy(() =>
        import(
            /* webpackChunkName: "CraneIcon" */
            "mdi-react/CraneIcon"
        ),
    ),
    "mdi-creation": React.lazy(() =>
        import(
            /* webpackChunkName: "CreationIcon" */
            "mdi-react/CreationIcon"
        ),
    ),
    "mdi-credit-card-multiple": React.lazy(() =>
        import(
            /* webpackChunkName: "CreditCardMultipleIcon" */
            "mdi-react/CreditCardMultipleIcon"
        ),
    ),
    "mdi-credit-card-off": React.lazy(() =>
        import(
            /* webpackChunkName: "CreditCardOffIcon" */
            "mdi-react/CreditCardOffIcon"
        ),
    ),
    "mdi-credit-card-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "CreditCardPlusIcon" */
            "mdi-react/CreditCardPlusIcon"
        ),
    ),
    "mdi-credit-card-scan": React.lazy(() =>
        import(
            /* webpackChunkName: "CreditCardScanIcon" */
            "mdi-react/CreditCardScanIcon"
        ),
    ),
    "mdi-credit-card-settings": React.lazy(() =>
        import(
            /* webpackChunkName: "CreditCardSettingsIcon" */
            "mdi-react/CreditCardSettingsIcon"
        ),
    ),
    "mdi-credit-card": React.lazy(() =>
        import(
            /* webpackChunkName: "CreditCardIcon" */
            "mdi-react/CreditCardIcon"
        ),
    ),
    "mdi-crop-free": React.lazy(() =>
        import(
            /* webpackChunkName: "CropFreeIcon" */
            "mdi-react/CropFreeIcon"
        ),
    ),
    "mdi-crop-landscape": React.lazy(() =>
        import(
            /* webpackChunkName: "CropLandscapeIcon" */
            "mdi-react/CropLandscapeIcon"
        ),
    ),
    "mdi-crop-portrait": React.lazy(() =>
        import(
            /* webpackChunkName: "CropPortraitIcon" */
            "mdi-react/CropPortraitIcon"
        ),
    ),
    "mdi-crop-rotate": React.lazy(() =>
        import(
            /* webpackChunkName: "CropRotateIcon" */
            "mdi-react/CropRotateIcon"
        ),
    ),
    "mdi-crop-square": React.lazy(() =>
        import(
            /* webpackChunkName: "CropSquareIcon" */
            "mdi-react/CropSquareIcon"
        ),
    ),
    "mdi-crop": React.lazy(() =>
        import(
            /* webpackChunkName: "CropIcon" */
            "mdi-react/CropIcon"
        ),
    ),
    "mdi-crosshairs-gps": React.lazy(() =>
        import(
            /* webpackChunkName: "CrosshairsGpsIcon" */
            "mdi-react/CrosshairsGpsIcon"
        ),
    ),
    "mdi-crosshairs": React.lazy(() =>
        import(
            /* webpackChunkName: "CrosshairsIcon" */
            "mdi-react/CrosshairsIcon"
        ),
    ),
    "mdi-crown": React.lazy(() =>
        import(
            /* webpackChunkName: "CrownIcon" */
            "mdi-react/CrownIcon"
        ),
    ),
    "mdi-cryengine": React.lazy(() =>
        import(
            /* webpackChunkName: "CryengineIcon" */
            "mdi-react/CryengineIcon"
        ),
    ),
    "mdi-cube-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "CubeOutlineIcon" */
            "mdi-react/CubeOutlineIcon"
        ),
    ),
    "mdi-cube-send": React.lazy(() =>
        import(
            /* webpackChunkName: "CubeSendIcon" */
            "mdi-react/CubeSendIcon"
        ),
    ),
    "mdi-cube-unfolded": React.lazy(() =>
        import(
            /* webpackChunkName: "CubeUnfoldedIcon" */
            "mdi-react/CubeUnfoldedIcon"
        ),
    ),
    "mdi-cube": React.lazy(() =>
        import(
            /* webpackChunkName: "CubeIcon" */
            "mdi-react/CubeIcon"
        ),
    ),
    "mdi-cup-off": React.lazy(() =>
        import(
            /* webpackChunkName: "CupOffIcon" */
            "mdi-react/CupOffIcon"
        ),
    ),
    "mdi-cup-water": React.lazy(() =>
        import(
            /* webpackChunkName: "CupWaterIcon" */
            "mdi-react/CupWaterIcon"
        ),
    ),
    "mdi-cup": React.lazy(() =>
        import(
            /* webpackChunkName: "CupIcon" */
            "mdi-react/CupIcon"
        ),
    ),
    "mdi-cupcake": React.lazy(() =>
        import(
            /* webpackChunkName: "CupcakeIcon" */
            "mdi-react/CupcakeIcon"
        ),
    ),
    "mdi-curling": React.lazy(() =>
        import(
            /* webpackChunkName: "CurlingIcon" */
            "mdi-react/CurlingIcon"
        ),
    ),
    "mdi-currency-bdt": React.lazy(() =>
        import(
            /* webpackChunkName: "CurrencyBdtIcon" */
            "mdi-react/CurrencyBdtIcon"
        ),
    ),
    "mdi-currency-btc": React.lazy(() =>
        import(
            /* webpackChunkName: "CurrencyBtcIcon" */
            "mdi-react/CurrencyBtcIcon"
        ),
    ),
    "mdi-currency-chf": React.lazy(() =>
        import(
            /* webpackChunkName: "CurrencyChfIcon" */
            "mdi-react/CurrencyChfIcon"
        ),
    ),
    "mdi-currency-cny": React.lazy(() =>
        import(
            /* webpackChunkName: "CurrencyCnyIcon" */
            "mdi-react/CurrencyCnyIcon"
        ),
    ),
    "mdi-currency-eth": React.lazy(() =>
        import(
            /* webpackChunkName: "CurrencyEthIcon" */
            "mdi-react/CurrencyEthIcon"
        ),
    ),
    "mdi-currency-eur": React.lazy(() =>
        import(
            /* webpackChunkName: "CurrencyEurIcon" */
            "mdi-react/CurrencyEurIcon"
        ),
    ),
    "mdi-currency-gbp": React.lazy(() =>
        import(
            /* webpackChunkName: "CurrencyGbpIcon" */
            "mdi-react/CurrencyGbpIcon"
        ),
    ),
    "mdi-currency-inr": React.lazy(() =>
        import(
            /* webpackChunkName: "CurrencyInrIcon" */
            "mdi-react/CurrencyInrIcon"
        ),
    ),
    "mdi-currency-jpy": React.lazy(() =>
        import(
            /* webpackChunkName: "CurrencyJpyIcon" */
            "mdi-react/CurrencyJpyIcon"
        ),
    ),
    "mdi-currency-krw": React.lazy(() =>
        import(
            /* webpackChunkName: "CurrencyKrwIcon" */
            "mdi-react/CurrencyKrwIcon"
        ),
    ),
    "mdi-currency-kzt": React.lazy(() =>
        import(
            /* webpackChunkName: "CurrencyKztIcon" */
            "mdi-react/CurrencyKztIcon"
        ),
    ),
    "mdi-currency-ngn": React.lazy(() =>
        import(
            /* webpackChunkName: "CurrencyNgnIcon" */
            "mdi-react/CurrencyNgnIcon"
        ),
    ),
    "mdi-currency-rub": React.lazy(() =>
        import(
            /* webpackChunkName: "CurrencyRubIcon" */
            "mdi-react/CurrencyRubIcon"
        ),
    ),
    "mdi-currency-sign": React.lazy(() =>
        import(
            /* webpackChunkName: "CurrencySignIcon" */
            "mdi-react/CurrencySignIcon"
        ),
    ),
    "mdi-currency-try": React.lazy(() =>
        import(
            /* webpackChunkName: "CurrencyTryIcon" */
            "mdi-react/CurrencyTryIcon"
        ),
    ),
    "mdi-currency-twd": React.lazy(() =>
        import(
            /* webpackChunkName: "CurrencyTwdIcon" */
            "mdi-react/CurrencyTwdIcon"
        ),
    ),
    "mdi-currency-usd-off": React.lazy(() =>
        import(
            /* webpackChunkName: "CurrencyUsdOffIcon" */
            "mdi-react/CurrencyUsdOffIcon"
        ),
    ),
    "mdi-currency-usd": React.lazy(() =>
        import(
            /* webpackChunkName: "CurrencyUsdIcon" */
            "mdi-react/CurrencyUsdIcon"
        ),
    ),
    "mdi-current-ac": React.lazy(() =>
        import(
            /* webpackChunkName: "CurrentAcIcon" */
            "mdi-react/CurrentAcIcon"
        ),
    ),
    "mdi-current-dc": React.lazy(() =>
        import(
            /* webpackChunkName: "CurrentDcIcon" */
            "mdi-react/CurrentDcIcon"
        ),
    ),
    "mdi-cursor-default-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "CursorDefaultOutlineIcon" */
            "mdi-react/CursorDefaultOutlineIcon"
        ),
    ),
    "mdi-cursor-default": React.lazy(() =>
        import(
            /* webpackChunkName: "CursorDefaultIcon" */
            "mdi-react/CursorDefaultIcon"
        ),
    ),
    "mdi-cursor-move": React.lazy(() =>
        import(
            /* webpackChunkName: "CursorMoveIcon" */
            "mdi-react/CursorMoveIcon"
        ),
    ),
    "mdi-cursor-pointer": React.lazy(() =>
        import(
            /* webpackChunkName: "CursorPointerIcon" */
            "mdi-react/CursorPointerIcon"
        ),
    ),
    "mdi-cursor-text": React.lazy(() =>
        import(
            /* webpackChunkName: "CursorTextIcon" */
            "mdi-react/CursorTextIcon"
        ),
    ),
    "mdi-database-export": React.lazy(() =>
        import(
            /* webpackChunkName: "DatabaseExportIcon" */
            "mdi-react/DatabaseExportIcon"
        ),
    ),
    "mdi-database-import": React.lazy(() =>
        import(
            /* webpackChunkName: "DatabaseImportIcon" */
            "mdi-react/DatabaseImportIcon"
        ),
    ),
    "mdi-database-minus": React.lazy(() =>
        import(
            /* webpackChunkName: "DatabaseMinusIcon" */
            "mdi-react/DatabaseMinusIcon"
        ),
    ),
    "mdi-database-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "DatabasePlusIcon" */
            "mdi-react/DatabasePlusIcon"
        ),
    ),
    "mdi-database-search": React.lazy(() =>
        import(
            /* webpackChunkName: "DatabaseSearchIcon" */
            "mdi-react/DatabaseSearchIcon"
        ),
    ),
    "mdi-database": React.lazy(() =>
        import(
            /* webpackChunkName: "DatabaseIcon" */
            "mdi-react/DatabaseIcon"
        ),
    ),
    "mdi-death-star-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "DeathStarVariantIcon" */
            "mdi-react/DeathStarVariantIcon"
        ),
    ),
    "mdi-death-star": React.lazy(() =>
        import(
            /* webpackChunkName: "DeathStarIcon" */
            "mdi-react/DeathStarIcon"
        ),
    ),
    "mdi-debian": React.lazy(() =>
        import(
            /* webpackChunkName: "DebianIcon" */
            "mdi-react/DebianIcon"
        ),
    ),
    "mdi-debug-step-into": React.lazy(() =>
        import(
            /* webpackChunkName: "DebugStepIntoIcon" */
            "mdi-react/DebugStepIntoIcon"
        ),
    ),
    "mdi-debug-step-out": React.lazy(() =>
        import(
            /* webpackChunkName: "DebugStepOutIcon" */
            "mdi-react/DebugStepOutIcon"
        ),
    ),
    "mdi-debug-step-over": React.lazy(() =>
        import(
            /* webpackChunkName: "DebugStepOverIcon" */
            "mdi-react/DebugStepOverIcon"
        ),
    ),
    "mdi-decagram-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "DecagramOutlineIcon" */
            "mdi-react/DecagramOutlineIcon"
        ),
    ),
    "mdi-decagram": React.lazy(() =>
        import(
            /* webpackChunkName: "DecagramIcon" */
            "mdi-react/DecagramIcon"
        ),
    ),
    "mdi-decimal-decrease": React.lazy(() =>
        import(
            /* webpackChunkName: "DecimalDecreaseIcon" */
            "mdi-react/DecimalDecreaseIcon"
        ),
    ),
    "mdi-decimal-increase": React.lazy(() =>
        import(
            /* webpackChunkName: "DecimalIncreaseIcon" */
            "mdi-react/DecimalIncreaseIcon"
        ),
    ),
    "mdi-delete-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "DeleteCircleIcon" */
            "mdi-react/DeleteCircleIcon"
        ),
    ),
    "mdi-delete-empty": React.lazy(() =>
        import(
            /* webpackChunkName: "DeleteEmptyIcon" */
            "mdi-react/DeleteEmptyIcon"
        ),
    ),
    "mdi-delete-forever": React.lazy(() =>
        import(
            /* webpackChunkName: "DeleteForeverIcon" */
            "mdi-react/DeleteForeverIcon"
        ),
    ),
    "mdi-delete-restore": React.lazy(() =>
        import(
            /* webpackChunkName: "DeleteRestoreIcon" */
            "mdi-react/DeleteRestoreIcon"
        ),
    ),
    "mdi-delete-sweep": React.lazy(() =>
        import(
            /* webpackChunkName: "DeleteSweepIcon" */
            "mdi-react/DeleteSweepIcon"
        ),
    ),
    "mdi-delete-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "DeleteVariantIcon" */
            "mdi-react/DeleteVariantIcon"
        ),
    ),
    "mdi-delete": React.lazy(() =>
        import(
            /* webpackChunkName: "DeleteIcon" */
            "mdi-react/DeleteIcon"
        ),
    ),
    "mdi-delta": React.lazy(() =>
        import(
            /* webpackChunkName: "DeltaIcon" */
            "mdi-react/DeltaIcon"
        ),
    ),
    "mdi-desk-lamp": React.lazy(() =>
        import(
            /* webpackChunkName: "DeskLampIcon" */
            "mdi-react/DeskLampIcon"
        ),
    ),
    "mdi-deskphone": React.lazy(() =>
        import(
            /* webpackChunkName: "DeskphoneIcon" */
            "mdi-react/DeskphoneIcon"
        ),
    ),
    "mdi-desktop-classic": React.lazy(() =>
        import(
            /* webpackChunkName: "DesktopClassicIcon" */
            "mdi-react/DesktopClassicIcon"
        ),
    ),
    "mdi-desktop-mac": React.lazy(() =>
        import(
            /* webpackChunkName: "DesktopMacIcon" */
            "mdi-react/DesktopMacIcon"
        ),
    ),
    "mdi-desktop-tower": React.lazy(() =>
        import(
            /* webpackChunkName: "DesktopTowerIcon" */
            "mdi-react/DesktopTowerIcon"
        ),
    ),
    "mdi-details": React.lazy(() =>
        import(
            /* webpackChunkName: "DetailsIcon" */
            "mdi-react/DetailsIcon"
        ),
    ),
    "mdi-developer-board": React.lazy(() =>
        import(
            /* webpackChunkName: "DeveloperBoardIcon" */
            "mdi-react/DeveloperBoardIcon"
        ),
    ),
    "mdi-deviantart": React.lazy(() =>
        import(
            /* webpackChunkName: "DeviantartIcon" */
            "mdi-react/DeviantartIcon"
        ),
    ),
    "mdi-dialpad": React.lazy(() =>
        import(
            /* webpackChunkName: "DialpadIcon" */
            "mdi-react/DialpadIcon"
        ),
    ),
    "mdi-diamond": React.lazy(() =>
        import(
            /* webpackChunkName: "DiamondIcon" */
            "mdi-react/DiamondIcon"
        ),
    ),
    "mdi-dice-1": React.lazy(() =>
        import(
            /* webpackChunkName: "Dice1Icon" */
            "mdi-react/Dice1Icon"
        ),
    ),
    "mdi-dice-2": React.lazy(() =>
        import(
            /* webpackChunkName: "Dice2Icon" */
            "mdi-react/Dice2Icon"
        ),
    ),
    "mdi-dice-3": React.lazy(() =>
        import(
            /* webpackChunkName: "Dice3Icon" */
            "mdi-react/Dice3Icon"
        ),
    ),
    "mdi-dice-4": React.lazy(() =>
        import(
            /* webpackChunkName: "Dice4Icon" */
            "mdi-react/Dice4Icon"
        ),
    ),
    "mdi-dice-5": React.lazy(() =>
        import(
            /* webpackChunkName: "Dice5Icon" */
            "mdi-react/Dice5Icon"
        ),
    ),
    "mdi-dice-6": React.lazy(() =>
        import(
            /* webpackChunkName: "Dice6Icon" */
            "mdi-react/Dice6Icon"
        ),
    ),
    "mdi-dice-d-10": React.lazy(() =>
        import(
            /* webpackChunkName: "DiceD10Icon" */
            "mdi-react/DiceD10Icon"
        ),
    ),
    "mdi-dice-d-12": React.lazy(() =>
        import(
            /* webpackChunkName: "DiceD12Icon" */
            "mdi-react/DiceD12Icon"
        ),
    ),
    "mdi-dice-d-20": React.lazy(() =>
        import(
            /* webpackChunkName: "DiceD20Icon" */
            "mdi-react/DiceD20Icon"
        ),
    ),
    "mdi-dice-d-4": React.lazy(() =>
        import(
            /* webpackChunkName: "DiceD4Icon" */
            "mdi-react/DiceD4Icon"
        ),
    ),
    "mdi-dice-d-6": React.lazy(() =>
        import(
            /* webpackChunkName: "DiceD6Icon" */
            "mdi-react/DiceD6Icon"
        ),
    ),
    "mdi-dice-d-8": React.lazy(() =>
        import(
            /* webpackChunkName: "DiceD8Icon" */
            "mdi-react/DiceD8Icon"
        ),
    ),
    "mdi-dice-multiple": React.lazy(() =>
        import(
            /* webpackChunkName: "DiceMultipleIcon" */
            "mdi-react/DiceMultipleIcon"
        ),
    ),
    "mdi-dictionary": React.lazy(() =>
        import(
            /* webpackChunkName: "DictionaryIcon" */
            "mdi-react/DictionaryIcon"
        ),
    ),
    "mdi-dip-switch": React.lazy(() =>
        import(
            /* webpackChunkName: "DipSwitchIcon" */
            "mdi-react/DipSwitchIcon"
        ),
    ),
    "mdi-directions-fork": React.lazy(() =>
        import(
            /* webpackChunkName: "DirectionsForkIcon" */
            "mdi-react/DirectionsForkIcon"
        ),
    ),
    "mdi-directions": React.lazy(() =>
        import(
            /* webpackChunkName: "DirectionsIcon" */
            "mdi-react/DirectionsIcon"
        ),
    ),
    "mdi-discord": React.lazy(() =>
        import(
            /* webpackChunkName: "DiscordIcon" */
            "mdi-react/DiscordIcon"
        ),
    ),
    "mdi-disk-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "DiskAlertIcon" */
            "mdi-react/DiskAlertIcon"
        ),
    ),
    "mdi-disk-player": React.lazy(() =>
        import(
            /* webpackChunkName: "DiskPlayerIcon" */
            "mdi-react/DiskPlayerIcon"
        ),
    ),
    "mdi-disk": React.lazy(() =>
        import(
            /* webpackChunkName: "DiskIcon" */
            "mdi-react/DiskIcon"
        ),
    ),
    "mdi-disqus-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "DisqusOutlineIcon" */
            "mdi-react/DisqusOutlineIcon"
        ),
    ),
    "mdi-disqus": React.lazy(() =>
        import(
            /* webpackChunkName: "DisqusIcon" */
            "mdi-react/DisqusIcon"
        ),
    ),
    "mdi-division-box": React.lazy(() =>
        import(
            /* webpackChunkName: "DivisionBoxIcon" */
            "mdi-react/DivisionBoxIcon"
        ),
    ),
    "mdi-division": React.lazy(() =>
        import(
            /* webpackChunkName: "DivisionIcon" */
            "mdi-react/DivisionIcon"
        ),
    ),
    "mdi-dna": React.lazy(() =>
        import(
            /* webpackChunkName: "DnaIcon" */
            "mdi-react/DnaIcon"
        ),
    ),
    "mdi-dns": React.lazy(() =>
        import(
            /* webpackChunkName: "DnsIcon" */
            "mdi-react/DnsIcon"
        ),
    ),
    "mdi-do-not-disturb-off": React.lazy(() =>
        import(
            /* webpackChunkName: "DoNotDisturbOffIcon" */
            "mdi-react/DoNotDisturbOffIcon"
        ),
    ),
    "mdi-do-not-disturb": React.lazy(() =>
        import(
            /* webpackChunkName: "DoNotDisturbIcon" */
            "mdi-react/DoNotDisturbIcon"
        ),
    ),
    "mdi-docker": React.lazy(() =>
        import(
            /* webpackChunkName: "DockerIcon" */
            "mdi-react/DockerIcon"
        ),
    ),
    "mdi-dolby": React.lazy(() =>
        import(
            /* webpackChunkName: "DolbyIcon" */
            "mdi-react/DolbyIcon"
        ),
    ),
    "mdi-domain": React.lazy(() =>
        import(
            /* webpackChunkName: "DomainIcon" */
            "mdi-react/DomainIcon"
        ),
    ),
    "mdi-donkey": React.lazy(() =>
        import(
            /* webpackChunkName: "DonkeyIcon" */
            "mdi-react/DonkeyIcon"
        ),
    ),
    "mdi-door-closed": React.lazy(() =>
        import(
            /* webpackChunkName: "DoorClosedIcon" */
            "mdi-react/DoorClosedIcon"
        ),
    ),
    "mdi-door-open": React.lazy(() =>
        import(
            /* webpackChunkName: "DoorOpenIcon" */
            "mdi-react/DoorOpenIcon"
        ),
    ),
    "mdi-door": React.lazy(() =>
        import(
            /* webpackChunkName: "DoorIcon" */
            "mdi-react/DoorIcon"
        ),
    ),
    "mdi-doorbell-video": React.lazy(() =>
        import(
            /* webpackChunkName: "DoorbellVideoIcon" */
            "mdi-react/DoorbellVideoIcon"
        ),
    ),
    "mdi-dots-horizontal-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "DotsHorizontalCircleIcon" */
            "mdi-react/DotsHorizontalCircleIcon"
        ),
    ),
    "mdi-dots-horizontal": React.lazy(() =>
        import(
            /* webpackChunkName: "DotsHorizontalIcon" */
            "mdi-react/DotsHorizontalIcon"
        ),
    ),
    "mdi-dots-vertical-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "DotsVerticalCircleIcon" */
            "mdi-react/DotsVerticalCircleIcon"
        ),
    ),
    "mdi-dots-vertical": React.lazy(() =>
        import(
            /* webpackChunkName: "DotsVerticalIcon" */
            "mdi-react/DotsVerticalIcon"
        ),
    ),
    "mdi-douban": React.lazy(() =>
        import(
            /* webpackChunkName: "DoubanIcon" */
            "mdi-react/DoubanIcon"
        ),
    ),
    "mdi-download-network": React.lazy(() =>
        import(
            /* webpackChunkName: "DownloadNetworkIcon" */
            "mdi-react/DownloadNetworkIcon"
        ),
    ),
    "mdi-download": React.lazy(() =>
        import(
            /* webpackChunkName: "DownloadIcon" */
            "mdi-react/DownloadIcon"
        ),
    ),
    "mdi-drag-horizontal": React.lazy(() =>
        import(
            /* webpackChunkName: "DragHorizontalIcon" */
            "mdi-react/DragHorizontalIcon"
        ),
    ),
    "mdi-drag-vertical": React.lazy(() =>
        import(
            /* webpackChunkName: "DragVerticalIcon" */
            "mdi-react/DragVerticalIcon"
        ),
    ),
    "mdi-drag": React.lazy(() =>
        import(
            /* webpackChunkName: "DragIcon" */
            "mdi-react/DragIcon"
        ),
    ),
    "mdi-drawing-box": React.lazy(() =>
        import(
            /* webpackChunkName: "DrawingBoxIcon" */
            "mdi-react/DrawingBoxIcon"
        ),
    ),
    "mdi-drawing": React.lazy(() =>
        import(
            /* webpackChunkName: "DrawingIcon" */
            "mdi-react/DrawingIcon"
        ),
    ),
    "mdi-dribbble-box": React.lazy(() =>
        import(
            /* webpackChunkName: "DribbbleBoxIcon" */
            "mdi-react/DribbbleBoxIcon"
        ),
    ),
    "mdi-dribbble": React.lazy(() =>
        import(
            /* webpackChunkName: "DribbbleIcon" */
            "mdi-react/DribbbleIcon"
        ),
    ),
    "mdi-drone": React.lazy(() =>
        import(
            /* webpackChunkName: "DroneIcon" */
            "mdi-react/DroneIcon"
        ),
    ),
    "mdi-dropbox": React.lazy(() =>
        import(
            /* webpackChunkName: "DropboxIcon" */
            "mdi-react/DropboxIcon"
        ),
    ),
    "mdi-drupal": React.lazy(() =>
        import(
            /* webpackChunkName: "DrupalIcon" */
            "mdi-react/DrupalIcon"
        ),
    ),
    "mdi-duck": React.lazy(() =>
        import(
            /* webpackChunkName: "DuckIcon" */
            "mdi-react/DuckIcon"
        ),
    ),
    "mdi-dumbbell": React.lazy(() =>
        import(
            /* webpackChunkName: "DumbbellIcon" */
            "mdi-react/DumbbellIcon"
        ),
    ),
    "mdi-ear-hearing": React.lazy(() =>
        import(
            /* webpackChunkName: "EarHearingIcon" */
            "mdi-react/EarHearingIcon"
        ),
    ),
    "mdi-earth-box-off": React.lazy(() =>
        import(
            /* webpackChunkName: "EarthBoxOffIcon" */
            "mdi-react/EarthBoxOffIcon"
        ),
    ),
    "mdi-earth-box": React.lazy(() =>
        import(
            /* webpackChunkName: "EarthBoxIcon" */
            "mdi-react/EarthBoxIcon"
        ),
    ),
    "mdi-earth-off": React.lazy(() =>
        import(
            /* webpackChunkName: "EarthOffIcon" */
            "mdi-react/EarthOffIcon"
        ),
    ),
    "mdi-earth": React.lazy(() =>
        import(
            /* webpackChunkName: "EarthIcon" */
            "mdi-react/EarthIcon"
        ),
    ),
    "mdi-edge": React.lazy(() =>
        import(
            /* webpackChunkName: "EdgeIcon" */
            "mdi-react/EdgeIcon"
        ),
    ),
    "mdi-eject": React.lazy(() =>
        import(
            /* webpackChunkName: "EjectIcon" */
            "mdi-react/EjectIcon"
        ),
    ),
    "mdi-elephant": React.lazy(() =>
        import(
            /* webpackChunkName: "ElephantIcon" */
            "mdi-react/ElephantIcon"
        ),
    ),
    "mdi-elevation-decline": React.lazy(() =>
        import(
            /* webpackChunkName: "ElevationDeclineIcon" */
            "mdi-react/ElevationDeclineIcon"
        ),
    ),
    "mdi-elevation-rise": React.lazy(() =>
        import(
            /* webpackChunkName: "ElevationRiseIcon" */
            "mdi-react/ElevationRiseIcon"
        ),
    ),
    "mdi-elevator": React.lazy(() =>
        import(
            /* webpackChunkName: "ElevatorIcon" */
            "mdi-react/ElevatorIcon"
        ),
    ),
    "mdi-email-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "EmailAlertIcon" */
            "mdi-react/EmailAlertIcon"
        ),
    ),
    "mdi-email-open-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "EmailOpenOutlineIcon" */
            "mdi-react/EmailOpenOutlineIcon"
        ),
    ),
    "mdi-email-open": React.lazy(() =>
        import(
            /* webpackChunkName: "EmailOpenIcon" */
            "mdi-react/EmailOpenIcon"
        ),
    ),
    "mdi-email-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "EmailOutlineIcon" */
            "mdi-react/EmailOutlineIcon"
        ),
    ),
    "mdi-email-search-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "EmailSearchOutlineIcon" */
            "mdi-react/EmailSearchOutlineIcon"
        ),
    ),
    "mdi-email-search": React.lazy(() =>
        import(
            /* webpackChunkName: "EmailSearchIcon" */
            "mdi-react/EmailSearchIcon"
        ),
    ),
    "mdi-email-secure": React.lazy(() =>
        import(
            /* webpackChunkName: "EmailSecureIcon" */
            "mdi-react/EmailSecureIcon"
        ),
    ),
    "mdi-email-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "EmailVariantIcon" */
            "mdi-react/EmailVariantIcon"
        ),
    ),
    "mdi-email": React.lazy(() =>
        import(
            /* webpackChunkName: "EmailIcon" */
            "mdi-react/EmailIcon"
        ),
    ),
    "mdi-emby": React.lazy(() =>
        import(
            /* webpackChunkName: "EmbyIcon" */
            "mdi-react/EmbyIcon"
        ),
    ),
    "mdi-emoticon-cool": React.lazy(() =>
        import(
            /* webpackChunkName: "EmoticonCoolIcon" */
            "mdi-react/EmoticonCoolIcon"
        ),
    ),
    "mdi-emoticon-dead": React.lazy(() =>
        import(
            /* webpackChunkName: "EmoticonDeadIcon" */
            "mdi-react/EmoticonDeadIcon"
        ),
    ),
    "mdi-emoticon-devil": React.lazy(() =>
        import(
            /* webpackChunkName: "EmoticonDevilIcon" */
            "mdi-react/EmoticonDevilIcon"
        ),
    ),
    "mdi-emoticon-excited": React.lazy(() =>
        import(
            /* webpackChunkName: "EmoticonExcitedIcon" */
            "mdi-react/EmoticonExcitedIcon"
        ),
    ),
    "mdi-emoticon-happy": React.lazy(() =>
        import(
            /* webpackChunkName: "EmoticonHappyIcon" */
            "mdi-react/EmoticonHappyIcon"
        ),
    ),
    "mdi-emoticon-neutral": React.lazy(() =>
        import(
            /* webpackChunkName: "EmoticonNeutralIcon" */
            "mdi-react/EmoticonNeutralIcon"
        ),
    ),
    "mdi-emoticon-poop": React.lazy(() =>
        import(
            /* webpackChunkName: "EmoticonPoopIcon" */
            "mdi-react/EmoticonPoopIcon"
        ),
    ),
    "mdi-emoticon-sad": React.lazy(() =>
        import(
            /* webpackChunkName: "EmoticonSadIcon" */
            "mdi-react/EmoticonSadIcon"
        ),
    ),
    "mdi-emoticon-tongue": React.lazy(() =>
        import(
            /* webpackChunkName: "EmoticonTongueIcon" */
            "mdi-react/EmoticonTongueIcon"
        ),
    ),
    "mdi-emoticon": React.lazy(() =>
        import(
            /* webpackChunkName: "EmoticonIcon" */
            "mdi-react/EmoticonIcon"
        ),
    ),
    "mdi-engine-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "EngineOutlineIcon" */
            "mdi-react/EngineOutlineIcon"
        ),
    ),
    "mdi-engine": React.lazy(() =>
        import(
            /* webpackChunkName: "EngineIcon" */
            "mdi-react/EngineIcon"
        ),
    ),
    "mdi-equal-box": React.lazy(() =>
        import(
            /* webpackChunkName: "EqualBoxIcon" */
            "mdi-react/EqualBoxIcon"
        ),
    ),
    "mdi-equal": React.lazy(() =>
        import(
            /* webpackChunkName: "EqualIcon" */
            "mdi-react/EqualIcon"
        ),
    ),
    "mdi-eraser-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "EraserVariantIcon" */
            "mdi-react/EraserVariantIcon"
        ),
    ),
    "mdi-eraser": React.lazy(() =>
        import(
            /* webpackChunkName: "EraserIcon" */
            "mdi-react/EraserIcon"
        ),
    ),
    "mdi-escalator": React.lazy(() =>
        import(
            /* webpackChunkName: "EscalatorIcon" */
            "mdi-react/EscalatorIcon"
        ),
    ),
    "mdi-ethereum": React.lazy(() =>
        import(
            /* webpackChunkName: "EthereumIcon" */
            "mdi-react/EthereumIcon"
        ),
    ),
    "mdi-ethernet-cable-off": React.lazy(() =>
        import(
            /* webpackChunkName: "EthernetCableOffIcon" */
            "mdi-react/EthernetCableOffIcon"
        ),
    ),
    "mdi-ethernet-cable": React.lazy(() =>
        import(
            /* webpackChunkName: "EthernetCableIcon" */
            "mdi-react/EthernetCableIcon"
        ),
    ),
    "mdi-ethernet": React.lazy(() =>
        import(
            /* webpackChunkName: "EthernetIcon" */
            "mdi-react/EthernetIcon"
        ),
    ),
    "mdi-etsy": React.lazy(() =>
        import(
            /* webpackChunkName: "EtsyIcon" */
            "mdi-react/EtsyIcon"
        ),
    ),
    "mdi-ev-station": React.lazy(() =>
        import(
            /* webpackChunkName: "EvStationIcon" */
            "mdi-react/EvStationIcon"
        ),
    ),
    "mdi-eventbrite": React.lazy(() =>
        import(
            /* webpackChunkName: "EventbriteIcon" */
            "mdi-react/EventbriteIcon"
        ),
    ),
    "mdi-evernote": React.lazy(() =>
        import(
            /* webpackChunkName: "EvernoteIcon" */
            "mdi-react/EvernoteIcon"
        ),
    ),
    "mdi-exclamation": React.lazy(() =>
        import(
            /* webpackChunkName: "ExclamationIcon" */
            "mdi-react/ExclamationIcon"
        ),
    ),
    "mdi-exit-to-app": React.lazy(() =>
        import(
            /* webpackChunkName: "ExitToAppIcon" */
            "mdi-react/ExitToAppIcon"
        ),
    ),
    "mdi-exponent-box": React.lazy(() =>
        import(
            /* webpackChunkName: "ExponentBoxIcon" */
            "mdi-react/ExponentBoxIcon"
        ),
    ),
    "mdi-exponent": React.lazy(() =>
        import(
            /* webpackChunkName: "ExponentIcon" */
            "mdi-react/ExponentIcon"
        ),
    ),
    "mdi-export": React.lazy(() =>
        import(
            /* webpackChunkName: "ExportIcon" */
            "mdi-react/ExportIcon"
        ),
    ),
    "mdi-eye-off-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "EyeOffOutlineIcon" */
            "mdi-react/EyeOffOutlineIcon"
        ),
    ),
    "mdi-eye-off": React.lazy(() =>
        import(
            /* webpackChunkName: "EyeOffIcon" */
            "mdi-react/EyeOffIcon"
        ),
    ),
    "mdi-eye-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "EyeOutlineIcon" */
            "mdi-react/EyeOutlineIcon"
        ),
    ),
    "mdi-eye-plus-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "EyePlusOutlineIcon" */
            "mdi-react/EyePlusOutlineIcon"
        ),
    ),
    "mdi-eye-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "EyePlusIcon" */
            "mdi-react/EyePlusIcon"
        ),
    ),
    "mdi-eye-settings-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "EyeSettingsOutlineIcon" */
            "mdi-react/EyeSettingsOutlineIcon"
        ),
    ),
    "mdi-eye-settings": React.lazy(() =>
        import(
            /* webpackChunkName: "EyeSettingsIcon" */
            "mdi-react/EyeSettingsIcon"
        ),
    ),
    "mdi-eye": React.lazy(() =>
        import(
            /* webpackChunkName: "EyeIcon" */
            "mdi-react/EyeIcon"
        ),
    ),
    "mdi-eyedropper-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "EyedropperVariantIcon" */
            "mdi-react/EyedropperVariantIcon"
        ),
    ),
    "mdi-eyedropper": React.lazy(() =>
        import(
            /* webpackChunkName: "EyedropperIcon" */
            "mdi-react/EyedropperIcon"
        ),
    ),
    "mdi-face-profile": React.lazy(() =>
        import(
            /* webpackChunkName: "FaceProfileIcon" */
            "mdi-react/FaceProfileIcon"
        ),
    ),
    "mdi-face": React.lazy(() =>
        import(
            /* webpackChunkName: "FaceIcon" */
            "mdi-react/FaceIcon"
        ),
    ),
    "mdi-facebook-box": React.lazy(() =>
        import(
            /* webpackChunkName: "FacebookBoxIcon" */
            "mdi-react/FacebookBoxIcon"
        ),
    ),
    "mdi-facebook-messenger": React.lazy(() =>
        import(
            /* webpackChunkName: "FacebookMessengerIcon" */
            "mdi-react/FacebookMessengerIcon"
        ),
    ),
    "mdi-facebook": React.lazy(() =>
        import(
            /* webpackChunkName: "FacebookIcon" */
            "mdi-react/FacebookIcon"
        ),
    ),
    "mdi-factory": React.lazy(() =>
        import(
            /* webpackChunkName: "FactoryIcon" */
            "mdi-react/FactoryIcon"
        ),
    ),
    "mdi-fan-off": React.lazy(() =>
        import(
            /* webpackChunkName: "FanOffIcon" */
            "mdi-react/FanOffIcon"
        ),
    ),
    "mdi-fan": React.lazy(() =>
        import(
            /* webpackChunkName: "FanIcon" */
            "mdi-react/FanIcon"
        ),
    ),
    "mdi-fast-forward-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "FastForwardOutlineIcon" */
            "mdi-react/FastForwardOutlineIcon"
        ),
    ),
    "mdi-fast-forward": React.lazy(() =>
        import(
            /* webpackChunkName: "FastForwardIcon" */
            "mdi-react/FastForwardIcon"
        ),
    ),
    "mdi-fax": React.lazy(() =>
        import(
            /* webpackChunkName: "FaxIcon" */
            "mdi-react/FaxIcon"
        ),
    ),
    "mdi-feather": React.lazy(() =>
        import(
            /* webpackChunkName: "FeatherIcon" */
            "mdi-react/FeatherIcon"
        ),
    ),
    "mdi-fedora": React.lazy(() =>
        import(
            /* webpackChunkName: "FedoraIcon" */
            "mdi-react/FedoraIcon"
        ),
    ),
    "mdi-ferry": React.lazy(() =>
        import(
            /* webpackChunkName: "FerryIcon" */
            "mdi-react/FerryIcon"
        ),
    ),
    "mdi-file-account": React.lazy(() =>
        import(
            /* webpackChunkName: "FileAccountIcon" */
            "mdi-react/FileAccountIcon"
        ),
    ),
    "mdi-file-chart": React.lazy(() =>
        import(
            /* webpackChunkName: "FileChartIcon" */
            "mdi-react/FileChartIcon"
        ),
    ),
    "mdi-file-check": React.lazy(() =>
        import(
            /* webpackChunkName: "FileCheckIcon" */
            "mdi-react/FileCheckIcon"
        ),
    ),
    "mdi-file-cloud": React.lazy(() =>
        import(
            /* webpackChunkName: "FileCloudIcon" */
            "mdi-react/FileCloudIcon"
        ),
    ),
    "mdi-file-compare": React.lazy(() =>
        import(
            /* webpackChunkName: "FileCompareIcon" */
            "mdi-react/FileCompareIcon"
        ),
    ),
    "mdi-file-delimited": React.lazy(() =>
        import(
            /* webpackChunkName: "FileDelimitedIcon" */
            "mdi-react/FileDelimitedIcon"
        ),
    ),
    "mdi-file-document-box": React.lazy(() =>
        import(
            /* webpackChunkName: "FileDocumentBoxIcon" */
            "mdi-react/FileDocumentBoxIcon"
        ),
    ),
    "mdi-file-document": React.lazy(() =>
        import(
            /* webpackChunkName: "FileDocumentIcon" */
            "mdi-react/FileDocumentIcon"
        ),
    ),
    "mdi-file-download-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "FileDownloadOutlineIcon" */
            "mdi-react/FileDownloadOutlineIcon"
        ),
    ),
    "mdi-file-download": React.lazy(() =>
        import(
            /* webpackChunkName: "FileDownloadIcon" */
            "mdi-react/FileDownloadIcon"
        ),
    ),
    "mdi-file-excel-box": React.lazy(() =>
        import(
            /* webpackChunkName: "FileExcelBoxIcon" */
            "mdi-react/FileExcelBoxIcon"
        ),
    ),
    "mdi-file-excel": React.lazy(() =>
        import(
            /* webpackChunkName: "FileExcelIcon" */
            "mdi-react/FileExcelIcon"
        ),
    ),
    "mdi-file-export": React.lazy(() =>
        import(
            /* webpackChunkName: "FileExportIcon" */
            "mdi-react/FileExportIcon"
        ),
    ),
    "mdi-file-find": React.lazy(() =>
        import(
            /* webpackChunkName: "FileFindIcon" */
            "mdi-react/FileFindIcon"
        ),
    ),
    "mdi-file-hidden": React.lazy(() =>
        import(
            /* webpackChunkName: "FileHiddenIcon" */
            "mdi-react/FileHiddenIcon"
        ),
    ),
    "mdi-file-image": React.lazy(() =>
        import(
            /* webpackChunkName: "FileImageIcon" */
            "mdi-react/FileImageIcon"
        ),
    ),
    "mdi-file-import": React.lazy(() =>
        import(
            /* webpackChunkName: "FileImportIcon" */
            "mdi-react/FileImportIcon"
        ),
    ),
    "mdi-file-lock": React.lazy(() =>
        import(
            /* webpackChunkName: "FileLockIcon" */
            "mdi-react/FileLockIcon"
        ),
    ),
    "mdi-file-multiple": React.lazy(() =>
        import(
            /* webpackChunkName: "FileMultipleIcon" */
            "mdi-react/FileMultipleIcon"
        ),
    ),
    "mdi-file-music": React.lazy(() =>
        import(
            /* webpackChunkName: "FileMusicIcon" */
            "mdi-react/FileMusicIcon"
        ),
    ),
    "mdi-file-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "FileOutlineIcon" */
            "mdi-react/FileOutlineIcon"
        ),
    ),
    "mdi-file-pdf-box": React.lazy(() =>
        import(
            /* webpackChunkName: "FilePdfBoxIcon" */
            "mdi-react/FilePdfBoxIcon"
        ),
    ),
    "mdi-file-pdf": React.lazy(() =>
        import(
            /* webpackChunkName: "FilePdfIcon" */
            "mdi-react/FilePdfIcon"
        ),
    ),
    "mdi-file-percent": React.lazy(() =>
        import(
            /* webpackChunkName: "FilePercentIcon" */
            "mdi-react/FilePercentIcon"
        ),
    ),
    "mdi-file-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "FilePlusIcon" */
            "mdi-react/FilePlusIcon"
        ),
    ),
    "mdi-file-powerpoint-box": React.lazy(() =>
        import(
            /* webpackChunkName: "FilePowerpointBoxIcon" */
            "mdi-react/FilePowerpointBoxIcon"
        ),
    ),
    "mdi-file-powerpoint": React.lazy(() =>
        import(
            /* webpackChunkName: "FilePowerpointIcon" */
            "mdi-react/FilePowerpointIcon"
        ),
    ),
    "mdi-file-presentation-box": React.lazy(() =>
        import(
            /* webpackChunkName: "FilePresentationBoxIcon" */
            "mdi-react/FilePresentationBoxIcon"
        ),
    ),
    "mdi-file-question": React.lazy(() =>
        import(
            /* webpackChunkName: "FileQuestionIcon" */
            "mdi-react/FileQuestionIcon"
        ),
    ),
    "mdi-file-restore": React.lazy(() =>
        import(
            /* webpackChunkName: "FileRestoreIcon" */
            "mdi-react/FileRestoreIcon"
        ),
    ),
    "mdi-file-send": React.lazy(() =>
        import(
            /* webpackChunkName: "FileSendIcon" */
            "mdi-react/FileSendIcon"
        ),
    ),
    "mdi-file-tree": React.lazy(() =>
        import(
            /* webpackChunkName: "FileTreeIcon" */
            "mdi-react/FileTreeIcon"
        ),
    ),
    "mdi-file-undo": React.lazy(() =>
        import(
            /* webpackChunkName: "FileUndoIcon" */
            "mdi-react/FileUndoIcon"
        ),
    ),
    "mdi-file-video": React.lazy(() =>
        import(
            /* webpackChunkName: "FileVideoIcon" */
            "mdi-react/FileVideoIcon"
        ),
    ),
    "mdi-file-word-box": React.lazy(() =>
        import(
            /* webpackChunkName: "FileWordBoxIcon" */
            "mdi-react/FileWordBoxIcon"
        ),
    ),
    "mdi-file-word": React.lazy(() =>
        import(
            /* webpackChunkName: "FileWordIcon" */
            "mdi-react/FileWordIcon"
        ),
    ),
    "mdi-file-xml": React.lazy(() =>
        import(
            /* webpackChunkName: "FileXmlIcon" */
            "mdi-react/FileXmlIcon"
        ),
    ),
    "mdi-file": React.lazy(() =>
        import(
            /* webpackChunkName: "FileIcon" */
            "mdi-react/FileIcon"
        ),
    ),
    "mdi-film": React.lazy(() =>
        import(
            /* webpackChunkName: "FilmIcon" */
            "mdi-react/FilmIcon"
        ),
    ),
    "mdi-filmstrip-off": React.lazy(() =>
        import(
            /* webpackChunkName: "FilmstripOffIcon" */
            "mdi-react/FilmstripOffIcon"
        ),
    ),
    "mdi-filmstrip": React.lazy(() =>
        import(
            /* webpackChunkName: "FilmstripIcon" */
            "mdi-react/FilmstripIcon"
        ),
    ),
    "mdi-filter-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "FilterOutlineIcon" */
            "mdi-react/FilterOutlineIcon"
        ),
    ),
    "mdi-filter-remove-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "FilterRemoveOutlineIcon" */
            "mdi-react/FilterRemoveOutlineIcon"
        ),
    ),
    "mdi-filter-remove": React.lazy(() =>
        import(
            /* webpackChunkName: "FilterRemoveIcon" */
            "mdi-react/FilterRemoveIcon"
        ),
    ),
    "mdi-filter-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "FilterVariantIcon" */
            "mdi-react/FilterVariantIcon"
        ),
    ),
    "mdi-filter": React.lazy(() =>
        import(
            /* webpackChunkName: "FilterIcon" */
            "mdi-react/FilterIcon"
        ),
    ),
    "mdi-finance": React.lazy(() =>
        import(
            /* webpackChunkName: "FinanceIcon" */
            "mdi-react/FinanceIcon"
        ),
    ),
    "mdi-find-replace": React.lazy(() =>
        import(
            /* webpackChunkName: "FindReplaceIcon" */
            "mdi-react/FindReplaceIcon"
        ),
    ),
    "mdi-fingerprint": React.lazy(() =>
        import(
            /* webpackChunkName: "FingerprintIcon" */
            "mdi-react/FingerprintIcon"
        ),
    ),
    "mdi-fire-truck": React.lazy(() =>
        import(
            /* webpackChunkName: "FireTruckIcon" */
            "mdi-react/FireTruckIcon"
        ),
    ),
    "mdi-fire": React.lazy(() =>
        import(
            /* webpackChunkName: "FireIcon" */
            "mdi-react/FireIcon"
        ),
    ),
    "mdi-firebase": React.lazy(() =>
        import(
            /* webpackChunkName: "FirebaseIcon" */
            "mdi-react/FirebaseIcon"
        ),
    ),
    "mdi-firefox": React.lazy(() =>
        import(
            /* webpackChunkName: "FirefoxIcon" */
            "mdi-react/FirefoxIcon"
        ),
    ),
    "mdi-fish": React.lazy(() =>
        import(
            /* webpackChunkName: "FishIcon" */
            "mdi-react/FishIcon"
        ),
    ),
    "mdi-flag-checkered": React.lazy(() =>
        import(
            /* webpackChunkName: "FlagCheckeredIcon" */
            "mdi-react/FlagCheckeredIcon"
        ),
    ),
    "mdi-flag-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "FlagOutlineIcon" */
            "mdi-react/FlagOutlineIcon"
        ),
    ),
    "mdi-flag-triangle": React.lazy(() =>
        import(
            /* webpackChunkName: "FlagTriangleIcon" */
            "mdi-react/FlagTriangleIcon"
        ),
    ),
    "mdi-flag-variant-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "FlagVariantOutlineIcon" */
            "mdi-react/FlagVariantOutlineIcon"
        ),
    ),
    "mdi-flag-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "FlagVariantIcon" */
            "mdi-react/FlagVariantIcon"
        ),
    ),
    "mdi-flag": React.lazy(() =>
        import(
            /* webpackChunkName: "FlagIcon" */
            "mdi-react/FlagIcon"
        ),
    ),
    "mdi-flash-auto": React.lazy(() =>
        import(
            /* webpackChunkName: "FlashAutoIcon" */
            "mdi-react/FlashAutoIcon"
        ),
    ),
    "mdi-flash-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "FlashCircleIcon" */
            "mdi-react/FlashCircleIcon"
        ),
    ),
    "mdi-flash-off": React.lazy(() =>
        import(
            /* webpackChunkName: "FlashOffIcon" */
            "mdi-react/FlashOffIcon"
        ),
    ),
    "mdi-flash-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "FlashOutlineIcon" */
            "mdi-react/FlashOutlineIcon"
        ),
    ),
    "mdi-flash-red-eye": React.lazy(() =>
        import(
            /* webpackChunkName: "FlashRedEyeIcon" */
            "mdi-react/FlashRedEyeIcon"
        ),
    ),
    "mdi-flash": React.lazy(() =>
        import(
            /* webpackChunkName: "FlashIcon" */
            "mdi-react/FlashIcon"
        ),
    ),
    "mdi-flashlight-off": React.lazy(() =>
        import(
            /* webpackChunkName: "FlashlightOffIcon" */
            "mdi-react/FlashlightOffIcon"
        ),
    ),
    "mdi-flashlight": React.lazy(() =>
        import(
            /* webpackChunkName: "FlashlightIcon" */
            "mdi-react/FlashlightIcon"
        ),
    ),
    "mdi-flask-empty-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "FlaskEmptyOutlineIcon" */
            "mdi-react/FlaskEmptyOutlineIcon"
        ),
    ),
    "mdi-flask-empty": React.lazy(() =>
        import(
            /* webpackChunkName: "FlaskEmptyIcon" */
            "mdi-react/FlaskEmptyIcon"
        ),
    ),
    "mdi-flask-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "FlaskOutlineIcon" */
            "mdi-react/FlaskOutlineIcon"
        ),
    ),
    "mdi-flask": React.lazy(() =>
        import(
            /* webpackChunkName: "FlaskIcon" */
            "mdi-react/FlaskIcon"
        ),
    ),
    "mdi-flattr": React.lazy(() =>
        import(
            /* webpackChunkName: "FlattrIcon" */
            "mdi-react/FlattrIcon"
        ),
    ),
    "mdi-flip-to-back": React.lazy(() =>
        import(
            /* webpackChunkName: "FlipToBackIcon" */
            "mdi-react/FlipToBackIcon"
        ),
    ),
    "mdi-flip-to-front": React.lazy(() =>
        import(
            /* webpackChunkName: "FlipToFrontIcon" */
            "mdi-react/FlipToFrontIcon"
        ),
    ),
    "mdi-floor-lamp": React.lazy(() =>
        import(
            /* webpackChunkName: "FloorLampIcon" */
            "mdi-react/FloorLampIcon"
        ),
    ),
    "mdi-floor-plan": React.lazy(() =>
        import(
            /* webpackChunkName: "FloorPlanIcon" */
            "mdi-react/FloorPlanIcon"
        ),
    ),
    "mdi-floppy": React.lazy(() =>
        import(
            /* webpackChunkName: "FloppyIcon" */
            "mdi-react/FloppyIcon"
        ),
    ),
    "mdi-flower": React.lazy(() =>
        import(
            /* webpackChunkName: "FlowerIcon" */
            "mdi-react/FlowerIcon"
        ),
    ),
    "mdi-folder-account": React.lazy(() =>
        import(
            /* webpackChunkName: "FolderAccountIcon" */
            "mdi-react/FolderAccountIcon"
        ),
    ),
    "mdi-folder-download": React.lazy(() =>
        import(
            /* webpackChunkName: "FolderDownloadIcon" */
            "mdi-react/FolderDownloadIcon"
        ),
    ),
    "mdi-folder-edit": React.lazy(() =>
        import(
            /* webpackChunkName: "FolderEditIcon" */
            "mdi-react/FolderEditIcon"
        ),
    ),
    "mdi-folder-google-drive": React.lazy(() =>
        import(
            /* webpackChunkName: "FolderGoogleDriveIcon" */
            "mdi-react/FolderGoogleDriveIcon"
        ),
    ),
    "mdi-folder-image": React.lazy(() =>
        import(
            /* webpackChunkName: "FolderImageIcon" */
            "mdi-react/FolderImageIcon"
        ),
    ),
    "mdi-folder-key-network": React.lazy(() =>
        import(
            /* webpackChunkName: "FolderKeyNetworkIcon" */
            "mdi-react/FolderKeyNetworkIcon"
        ),
    ),
    "mdi-folder-key": React.lazy(() =>
        import(
            /* webpackChunkName: "FolderKeyIcon" */
            "mdi-react/FolderKeyIcon"
        ),
    ),
    "mdi-folder-lock-open": React.lazy(() =>
        import(
            /* webpackChunkName: "FolderLockOpenIcon" */
            "mdi-react/FolderLockOpenIcon"
        ),
    ),
    "mdi-folder-lock": React.lazy(() =>
        import(
            /* webpackChunkName: "FolderLockIcon" */
            "mdi-react/FolderLockIcon"
        ),
    ),
    "mdi-folder-move": React.lazy(() =>
        import(
            /* webpackChunkName: "FolderMoveIcon" */
            "mdi-react/FolderMoveIcon"
        ),
    ),
    "mdi-folder-multiple-image": React.lazy(() =>
        import(
            /* webpackChunkName: "FolderMultipleImageIcon" */
            "mdi-react/FolderMultipleImageIcon"
        ),
    ),
    "mdi-folder-multiple-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "FolderMultipleOutlineIcon" */
            "mdi-react/FolderMultipleOutlineIcon"
        ),
    ),
    "mdi-folder-multiple": React.lazy(() =>
        import(
            /* webpackChunkName: "FolderMultipleIcon" */
            "mdi-react/FolderMultipleIcon"
        ),
    ),
    "mdi-folder-network": React.lazy(() =>
        import(
            /* webpackChunkName: "FolderNetworkIcon" */
            "mdi-react/FolderNetworkIcon"
        ),
    ),
    "mdi-folder-open": React.lazy(() =>
        import(
            /* webpackChunkName: "FolderOpenIcon" */
            "mdi-react/FolderOpenIcon"
        ),
    ),
    "mdi-folder-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "FolderOutlineIcon" */
            "mdi-react/FolderOutlineIcon"
        ),
    ),
    "mdi-folder-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "FolderPlusIcon" */
            "mdi-react/FolderPlusIcon"
        ),
    ),
    "mdi-folder-remove": React.lazy(() =>
        import(
            /* webpackChunkName: "FolderRemoveIcon" */
            "mdi-react/FolderRemoveIcon"
        ),
    ),
    "mdi-folder-search-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "FolderSearchOutlineIcon" */
            "mdi-react/FolderSearchOutlineIcon"
        ),
    ),
    "mdi-folder-search": React.lazy(() =>
        import(
            /* webpackChunkName: "FolderSearchIcon" */
            "mdi-react/FolderSearchIcon"
        ),
    ),
    "mdi-folder-star": React.lazy(() =>
        import(
            /* webpackChunkName: "FolderStarIcon" */
            "mdi-react/FolderStarIcon"
        ),
    ),
    "mdi-folder-upload": React.lazy(() =>
        import(
            /* webpackChunkName: "FolderUploadIcon" */
            "mdi-react/FolderUploadIcon"
        ),
    ),
    "mdi-folder": React.lazy(() =>
        import(
            /* webpackChunkName: "FolderIcon" */
            "mdi-react/FolderIcon"
        ),
    ),
    "mdi-font-awesome": React.lazy(() =>
        import(
            /* webpackChunkName: "FontAwesomeIcon" */
            "mdi-react/FontAwesomeIcon"
        ),
    ),
    "mdi-food-apple": React.lazy(() =>
        import(
            /* webpackChunkName: "FoodAppleIcon" */
            "mdi-react/FoodAppleIcon"
        ),
    ),
    "mdi-food-croissant": React.lazy(() =>
        import(
            /* webpackChunkName: "FoodCroissantIcon" */
            "mdi-react/FoodCroissantIcon"
        ),
    ),
    "mdi-food-fork-drink": React.lazy(() =>
        import(
            /* webpackChunkName: "FoodForkDrinkIcon" */
            "mdi-react/FoodForkDrinkIcon"
        ),
    ),
    "mdi-food-off": React.lazy(() =>
        import(
            /* webpackChunkName: "FoodOffIcon" */
            "mdi-react/FoodOffIcon"
        ),
    ),
    "mdi-food-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "FoodVariantIcon" */
            "mdi-react/FoodVariantIcon"
        ),
    ),
    "mdi-food": React.lazy(() =>
        import(
            /* webpackChunkName: "FoodIcon" */
            "mdi-react/FoodIcon"
        ),
    ),
    "mdi-football-australian": React.lazy(() =>
        import(
            /* webpackChunkName: "FootballAustralianIcon" */
            "mdi-react/FootballAustralianIcon"
        ),
    ),
    "mdi-football-helmet": React.lazy(() =>
        import(
            /* webpackChunkName: "FootballHelmetIcon" */
            "mdi-react/FootballHelmetIcon"
        ),
    ),
    "mdi-football": React.lazy(() =>
        import(
            /* webpackChunkName: "FootballIcon" */
            "mdi-react/FootballIcon"
        ),
    ),
    "mdi-forklift": React.lazy(() =>
        import(
            /* webpackChunkName: "ForkliftIcon" */
            "mdi-react/ForkliftIcon"
        ),
    ),
    "mdi-format-align-bottom": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatAlignBottomIcon" */
            "mdi-react/FormatAlignBottomIcon"
        ),
    ),
    "mdi-format-align-center": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatAlignCenterIcon" */
            "mdi-react/FormatAlignCenterIcon"
        ),
    ),
    "mdi-format-align-justify": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatAlignJustifyIcon" */
            "mdi-react/FormatAlignJustifyIcon"
        ),
    ),
    "mdi-format-align-left": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatAlignLeftIcon" */
            "mdi-react/FormatAlignLeftIcon"
        ),
    ),
    "mdi-format-align-middle": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatAlignMiddleIcon" */
            "mdi-react/FormatAlignMiddleIcon"
        ),
    ),
    "mdi-format-align-right": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatAlignRightIcon" */
            "mdi-react/FormatAlignRightIcon"
        ),
    ),
    "mdi-format-align-top": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatAlignTopIcon" */
            "mdi-react/FormatAlignTopIcon"
        ),
    ),
    "mdi-format-annotation-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatAnnotationPlusIcon" */
            "mdi-react/FormatAnnotationPlusIcon"
        ),
    ),
    "mdi-format-bold": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatBoldIcon" */
            "mdi-react/FormatBoldIcon"
        ),
    ),
    "mdi-format-clear": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatClearIcon" */
            "mdi-react/FormatClearIcon"
        ),
    ),
    "mdi-format-color-fill": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatColorFillIcon" */
            "mdi-react/FormatColorFillIcon"
        ),
    ),
    "mdi-format-color-text": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatColorTextIcon" */
            "mdi-react/FormatColorTextIcon"
        ),
    ),
    "mdi-format-columns": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatColumnsIcon" */
            "mdi-react/FormatColumnsIcon"
        ),
    ),
    "mdi-format-float-center": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatFloatCenterIcon" */
            "mdi-react/FormatFloatCenterIcon"
        ),
    ),
    "mdi-format-float-left": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatFloatLeftIcon" */
            "mdi-react/FormatFloatLeftIcon"
        ),
    ),
    "mdi-format-float-none": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatFloatNoneIcon" */
            "mdi-react/FormatFloatNoneIcon"
        ),
    ),
    "mdi-format-float-right": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatFloatRightIcon" */
            "mdi-react/FormatFloatRightIcon"
        ),
    ),
    "mdi-format-font": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatFontIcon" */
            "mdi-react/FormatFontIcon"
        ),
    ),
    "mdi-format-header-1": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatHeader1Icon" */
            "mdi-react/FormatHeader1Icon"
        ),
    ),
    "mdi-format-header-2": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatHeader2Icon" */
            "mdi-react/FormatHeader2Icon"
        ),
    ),
    "mdi-format-header-3": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatHeader3Icon" */
            "mdi-react/FormatHeader3Icon"
        ),
    ),
    "mdi-format-header-4": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatHeader4Icon" */
            "mdi-react/FormatHeader4Icon"
        ),
    ),
    "mdi-format-header-5": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatHeader5Icon" */
            "mdi-react/FormatHeader5Icon"
        ),
    ),
    "mdi-format-header-6": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatHeader6Icon" */
            "mdi-react/FormatHeader6Icon"
        ),
    ),
    "mdi-format-header-decrease": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatHeaderDecreaseIcon" */
            "mdi-react/FormatHeaderDecreaseIcon"
        ),
    ),
    "mdi-format-header-equal": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatHeaderEqualIcon" */
            "mdi-react/FormatHeaderEqualIcon"
        ),
    ),
    "mdi-format-header-increase": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatHeaderIncreaseIcon" */
            "mdi-react/FormatHeaderIncreaseIcon"
        ),
    ),
    "mdi-format-header-pound": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatHeaderPoundIcon" */
            "mdi-react/FormatHeaderPoundIcon"
        ),
    ),
    "mdi-format-horizontal-align-center": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatHorizontalAlignCenterIcon" */
            "mdi-react/FormatHorizontalAlignCenterIcon"
        ),
    ),
    "mdi-format-horizontal-align-left": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatHorizontalAlignLeftIcon" */
            "mdi-react/FormatHorizontalAlignLeftIcon"
        ),
    ),
    "mdi-format-horizontal-align-right": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatHorizontalAlignRightIcon" */
            "mdi-react/FormatHorizontalAlignRightIcon"
        ),
    ),
    "mdi-format-indent-decrease": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatIndentDecreaseIcon" */
            "mdi-react/FormatIndentDecreaseIcon"
        ),
    ),
    "mdi-format-indent-increase": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatIndentIncreaseIcon" */
            "mdi-react/FormatIndentIncreaseIcon"
        ),
    ),
    "mdi-format-italic": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatItalicIcon" */
            "mdi-react/FormatItalicIcon"
        ),
    ),
    "mdi-format-line-spacing": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatLineSpacingIcon" */
            "mdi-react/FormatLineSpacingIcon"
        ),
    ),
    "mdi-format-line-style": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatLineStyleIcon" */
            "mdi-react/FormatLineStyleIcon"
        ),
    ),
    "mdi-format-line-weight": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatLineWeightIcon" */
            "mdi-react/FormatLineWeightIcon"
        ),
    ),
    "mdi-format-list-bulleted-type": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatListBulletedTypeIcon" */
            "mdi-react/FormatListBulletedTypeIcon"
        ),
    ),
    "mdi-format-list-bulleted": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatListBulletedIcon" */
            "mdi-react/FormatListBulletedIcon"
        ),
    ),
    "mdi-format-list-checkbox": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatListCheckboxIcon" */
            "mdi-react/FormatListCheckboxIcon"
        ),
    ),
    "mdi-format-list-checks": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatListChecksIcon" */
            "mdi-react/FormatListChecksIcon"
        ),
    ),
    "mdi-format-list-numbers": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatListNumbersIcon" */
            "mdi-react/FormatListNumbersIcon"
        ),
    ),
    "mdi-format-page-break": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatPageBreakIcon" */
            "mdi-react/FormatPageBreakIcon"
        ),
    ),
    "mdi-format-paint": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatPaintIcon" */
            "mdi-react/FormatPaintIcon"
        ),
    ),
    "mdi-format-paragraph": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatParagraphIcon" */
            "mdi-react/FormatParagraphIcon"
        ),
    ),
    "mdi-format-pilcrow": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatPilcrowIcon" */
            "mdi-react/FormatPilcrowIcon"
        ),
    ),
    "mdi-format-quote-close": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatQuoteCloseIcon" */
            "mdi-react/FormatQuoteCloseIcon"
        ),
    ),
    "mdi-format-quote-open": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatQuoteOpenIcon" */
            "mdi-react/FormatQuoteOpenIcon"
        ),
    ),
    "mdi-format-rotate-90": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatRotate90Icon" */
            "mdi-react/FormatRotate90Icon"
        ),
    ),
    "mdi-format-section": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatSectionIcon" */
            "mdi-react/FormatSectionIcon"
        ),
    ),
    "mdi-format-size": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatSizeIcon" */
            "mdi-react/FormatSizeIcon"
        ),
    ),
    "mdi-format-strikethrough-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatStrikethroughVariantIcon" */
            "mdi-react/FormatStrikethroughVariantIcon"
        ),
    ),
    "mdi-format-strikethrough": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatStrikethroughIcon" */
            "mdi-react/FormatStrikethroughIcon"
        ),
    ),
    "mdi-format-subscript": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatSubscriptIcon" */
            "mdi-react/FormatSubscriptIcon"
        ),
    ),
    "mdi-format-superscript": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatSuperscriptIcon" */
            "mdi-react/FormatSuperscriptIcon"
        ),
    ),
    "mdi-format-text": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatTextIcon" */
            "mdi-react/FormatTextIcon"
        ),
    ),
    "mdi-format-textdirection-l-to-r": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatTextdirectionLToRIcon" */
            "mdi-react/FormatTextdirectionLToRIcon"
        ),
    ),
    "mdi-format-textdirection-r-to-l": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatTextdirectionRToLIcon" */
            "mdi-react/FormatTextdirectionRToLIcon"
        ),
    ),
    "mdi-format-title": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatTitleIcon" */
            "mdi-react/FormatTitleIcon"
        ),
    ),
    "mdi-format-underline": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatUnderlineIcon" */
            "mdi-react/FormatUnderlineIcon"
        ),
    ),
    "mdi-format-vertical-align-bottom": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatVerticalAlignBottomIcon" */
            "mdi-react/FormatVerticalAlignBottomIcon"
        ),
    ),
    "mdi-format-vertical-align-center": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatVerticalAlignCenterIcon" */
            "mdi-react/FormatVerticalAlignCenterIcon"
        ),
    ),
    "mdi-format-vertical-align-top": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatVerticalAlignTopIcon" */
            "mdi-react/FormatVerticalAlignTopIcon"
        ),
    ),
    "mdi-format-wrap-inline": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatWrapInlineIcon" */
            "mdi-react/FormatWrapInlineIcon"
        ),
    ),
    "mdi-format-wrap-square": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatWrapSquareIcon" */
            "mdi-react/FormatWrapSquareIcon"
        ),
    ),
    "mdi-format-wrap-tight": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatWrapTightIcon" */
            "mdi-react/FormatWrapTightIcon"
        ),
    ),
    "mdi-format-wrap-top-bottom": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatWrapTopBottomIcon" */
            "mdi-react/FormatWrapTopBottomIcon"
        ),
    ),
    "mdi-forum-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "ForumOutlineIcon" */
            "mdi-react/ForumOutlineIcon"
        ),
    ),
    "mdi-forum": React.lazy(() =>
        import(
            /* webpackChunkName: "ForumIcon" */
            "mdi-react/ForumIcon"
        ),
    ),
    "mdi-forward": React.lazy(() =>
        import(
            /* webpackChunkName: "ForwardIcon" */
            "mdi-react/ForwardIcon"
        ),
    ),
    "mdi-fountain": React.lazy(() =>
        import(
            /* webpackChunkName: "FountainIcon" */
            "mdi-react/FountainIcon"
        ),
    ),
    "mdi-foursquare": React.lazy(() =>
        import(
            /* webpackChunkName: "FoursquareIcon" */
            "mdi-react/FoursquareIcon"
        ),
    ),
    "mdi-freebsd": React.lazy(() =>
        import(
            /* webpackChunkName: "FreebsdIcon" */
            "mdi-react/FreebsdIcon"
        ),
    ),
    "mdi-fridge-filled-bottom": React.lazy(() =>
        import(
            /* webpackChunkName: "FridgeFilledBottomIcon" */
            "mdi-react/FridgeFilledBottomIcon"
        ),
    ),
    "mdi-fridge-filled-top": React.lazy(() =>
        import(
            /* webpackChunkName: "FridgeFilledTopIcon" */
            "mdi-react/FridgeFilledTopIcon"
        ),
    ),
    "mdi-fridge-filled": React.lazy(() =>
        import(
            /* webpackChunkName: "FridgeFilledIcon" */
            "mdi-react/FridgeFilledIcon"
        ),
    ),
    "mdi-fridge": React.lazy(() =>
        import(
            /* webpackChunkName: "FridgeIcon" */
            "mdi-react/FridgeIcon"
        ),
    ),
    "mdi-fuel": React.lazy(() =>
        import(
            /* webpackChunkName: "FuelIcon" */
            "mdi-react/FuelIcon"
        ),
    ),
    "mdi-fullscreen-exit": React.lazy(() =>
        import(
            /* webpackChunkName: "FullscreenExitIcon" */
            "mdi-react/FullscreenExitIcon"
        ),
    ),
    "mdi-fullscreen": React.lazy(() =>
        import(
            /* webpackChunkName: "FullscreenIcon" */
            "mdi-react/FullscreenIcon"
        ),
    ),
    "mdi-function-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "FunctionVariantIcon" */
            "mdi-react/FunctionVariantIcon"
        ),
    ),
    "mdi-function": React.lazy(() =>
        import(
            /* webpackChunkName: "FunctionIcon" */
            "mdi-react/FunctionIcon"
        ),
    ),
    "mdi-gamepad-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "GamepadVariantIcon" */
            "mdi-react/GamepadVariantIcon"
        ),
    ),
    "mdi-gamepad": React.lazy(() =>
        import(
            /* webpackChunkName: "GamepadIcon" */
            "mdi-react/GamepadIcon"
        ),
    ),
    "mdi-garage-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "GarageAlertIcon" */
            "mdi-react/GarageAlertIcon"
        ),
    ),
    "mdi-garage-open": React.lazy(() =>
        import(
            /* webpackChunkName: "GarageOpenIcon" */
            "mdi-react/GarageOpenIcon"
        ),
    ),
    "mdi-garage": React.lazy(() =>
        import(
            /* webpackChunkName: "GarageIcon" */
            "mdi-react/GarageIcon"
        ),
    ),
    "mdi-gas-cylinder": React.lazy(() =>
        import(
            /* webpackChunkName: "GasCylinderIcon" */
            "mdi-react/GasCylinderIcon"
        ),
    ),
    "mdi-gas-station": React.lazy(() =>
        import(
            /* webpackChunkName: "GasStationIcon" */
            "mdi-react/GasStationIcon"
        ),
    ),
    "mdi-gate-and": React.lazy(() =>
        import(
            /* webpackChunkName: "GateAndIcon" */
            "mdi-react/GateAndIcon"
        ),
    ),
    "mdi-gate-nand": React.lazy(() =>
        import(
            /* webpackChunkName: "GateNandIcon" */
            "mdi-react/GateNandIcon"
        ),
    ),
    "mdi-gate-nor": React.lazy(() =>
        import(
            /* webpackChunkName: "GateNorIcon" */
            "mdi-react/GateNorIcon"
        ),
    ),
    "mdi-gate-not": React.lazy(() =>
        import(
            /* webpackChunkName: "GateNotIcon" */
            "mdi-react/GateNotIcon"
        ),
    ),
    "mdi-gate-or": React.lazy(() =>
        import(
            /* webpackChunkName: "GateOrIcon" */
            "mdi-react/GateOrIcon"
        ),
    ),
    "mdi-gate-xnor": React.lazy(() =>
        import(
            /* webpackChunkName: "GateXnorIcon" */
            "mdi-react/GateXnorIcon"
        ),
    ),
    "mdi-gate-xor": React.lazy(() =>
        import(
            /* webpackChunkName: "GateXorIcon" */
            "mdi-react/GateXorIcon"
        ),
    ),
    "mdi-gate": React.lazy(() =>
        import(
            /* webpackChunkName: "GateIcon" */
            "mdi-react/GateIcon"
        ),
    ),
    "mdi-gauge-empty": React.lazy(() =>
        import(
            /* webpackChunkName: "GaugeEmptyIcon" */
            "mdi-react/GaugeEmptyIcon"
        ),
    ),
    "mdi-gauge-full": React.lazy(() =>
        import(
            /* webpackChunkName: "GaugeFullIcon" */
            "mdi-react/GaugeFullIcon"
        ),
    ),
    "mdi-gauge-low": React.lazy(() =>
        import(
            /* webpackChunkName: "GaugeLowIcon" */
            "mdi-react/GaugeLowIcon"
        ),
    ),
    "mdi-gauge": React.lazy(() =>
        import(
            /* webpackChunkName: "GaugeIcon" */
            "mdi-react/GaugeIcon"
        ),
    ),
    "mdi-gavel": React.lazy(() =>
        import(
            /* webpackChunkName: "GavelIcon" */
            "mdi-react/GavelIcon"
        ),
    ),
    "mdi-gender-female": React.lazy(() =>
        import(
            /* webpackChunkName: "GenderFemaleIcon" */
            "mdi-react/GenderFemaleIcon"
        ),
    ),
    "mdi-gender-male-female": React.lazy(() =>
        import(
            /* webpackChunkName: "GenderMaleFemaleIcon" */
            "mdi-react/GenderMaleFemaleIcon"
        ),
    ),
    "mdi-gender-male": React.lazy(() =>
        import(
            /* webpackChunkName: "GenderMaleIcon" */
            "mdi-react/GenderMaleIcon"
        ),
    ),
    "mdi-gender-transgender": React.lazy(() =>
        import(
            /* webpackChunkName: "GenderTransgenderIcon" */
            "mdi-react/GenderTransgenderIcon"
        ),
    ),
    "mdi-gentoo": React.lazy(() =>
        import(
            /* webpackChunkName: "GentooIcon" */
            "mdi-react/GentooIcon"
        ),
    ),
    "mdi-gesture-double-tap": React.lazy(() =>
        import(
            /* webpackChunkName: "GestureDoubleTapIcon" */
            "mdi-react/GestureDoubleTapIcon"
        ),
    ),
    "mdi-gesture-swipe-down": React.lazy(() =>
        import(
            /* webpackChunkName: "GestureSwipeDownIcon" */
            "mdi-react/GestureSwipeDownIcon"
        ),
    ),
    "mdi-gesture-swipe-left": React.lazy(() =>
        import(
            /* webpackChunkName: "GestureSwipeLeftIcon" */
            "mdi-react/GestureSwipeLeftIcon"
        ),
    ),
    "mdi-gesture-swipe-right": React.lazy(() =>
        import(
            /* webpackChunkName: "GestureSwipeRightIcon" */
            "mdi-react/GestureSwipeRightIcon"
        ),
    ),
    "mdi-gesture-swipe-up": React.lazy(() =>
        import(
            /* webpackChunkName: "GestureSwipeUpIcon" */
            "mdi-react/GestureSwipeUpIcon"
        ),
    ),
    "mdi-gesture-tap": React.lazy(() =>
        import(
            /* webpackChunkName: "GestureTapIcon" */
            "mdi-react/GestureTapIcon"
        ),
    ),
    "mdi-gesture-two-double-tap": React.lazy(() =>
        import(
            /* webpackChunkName: "GestureTwoDoubleTapIcon" */
            "mdi-react/GestureTwoDoubleTapIcon"
        ),
    ),
    "mdi-gesture-two-tap": React.lazy(() =>
        import(
            /* webpackChunkName: "GestureTwoTapIcon" */
            "mdi-react/GestureTwoTapIcon"
        ),
    ),
    "mdi-gesture": React.lazy(() =>
        import(
            /* webpackChunkName: "GestureIcon" */
            "mdi-react/GestureIcon"
        ),
    ),
    "mdi-ghost": React.lazy(() =>
        import(
            /* webpackChunkName: "GhostIcon" */
            "mdi-react/GhostIcon"
        ),
    ),
    "mdi-gift": React.lazy(() =>
        import(
            /* webpackChunkName: "GiftIcon" */
            "mdi-react/GiftIcon"
        ),
    ),
    "mdi-git": React.lazy(() =>
        import(
            /* webpackChunkName: "GitIcon" */
            "mdi-react/GitIcon"
        ),
    ),
    "mdi-github-box": React.lazy(() =>
        import(
            /* webpackChunkName: "GithubBoxIcon" */
            "mdi-react/GithubBoxIcon"
        ),
    ),
    "mdi-github-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "GithubCircleIcon" */
            "mdi-react/GithubCircleIcon"
        ),
    ),
    "mdi-github-face": React.lazy(() =>
        import(
            /* webpackChunkName: "GithubFaceIcon" */
            "mdi-react/GithubFaceIcon"
        ),
    ),
    "mdi-glass-cocktail": React.lazy(() =>
        import(
            /* webpackChunkName: "GlassCocktailIcon" */
            "mdi-react/GlassCocktailIcon"
        ),
    ),
    "mdi-glass-flute": React.lazy(() =>
        import(
            /* webpackChunkName: "GlassFluteIcon" */
            "mdi-react/GlassFluteIcon"
        ),
    ),
    "mdi-glass-mug": React.lazy(() =>
        import(
            /* webpackChunkName: "GlassMugIcon" */
            "mdi-react/GlassMugIcon"
        ),
    ),
    "mdi-glass-stange": React.lazy(() =>
        import(
            /* webpackChunkName: "GlassStangeIcon" */
            "mdi-react/GlassStangeIcon"
        ),
    ),
    "mdi-glass-tulip": React.lazy(() =>
        import(
            /* webpackChunkName: "GlassTulipIcon" */
            "mdi-react/GlassTulipIcon"
        ),
    ),
    "mdi-glass-wine": React.lazy(() =>
        import(
            /* webpackChunkName: "GlassWineIcon" */
            "mdi-react/GlassWineIcon"
        ),
    ),
    "mdi-glassdoor": React.lazy(() =>
        import(
            /* webpackChunkName: "GlassdoorIcon" */
            "mdi-react/GlassdoorIcon"
        ),
    ),
    "mdi-glasses": React.lazy(() =>
        import(
            /* webpackChunkName: "GlassesIcon" */
            "mdi-react/GlassesIcon"
        ),
    ),
    "mdi-globe-model": React.lazy(() =>
        import(
            /* webpackChunkName: "GlobeModelIcon" */
            "mdi-react/GlobeModelIcon"
        ),
    ),
    "mdi-gmail": React.lazy(() =>
        import(
            /* webpackChunkName: "GmailIcon" */
            "mdi-react/GmailIcon"
        ),
    ),
    "mdi-gnome": React.lazy(() =>
        import(
            /* webpackChunkName: "GnomeIcon" */
            "mdi-react/GnomeIcon"
        ),
    ),
    "mdi-golf": React.lazy(() =>
        import(
            /* webpackChunkName: "GolfIcon" */
            "mdi-react/GolfIcon"
        ),
    ),
    "mdi-gondola": React.lazy(() =>
        import(
            /* webpackChunkName: "GondolaIcon" */
            "mdi-react/GondolaIcon"
        ),
    ),
    "mdi-google-allo": React.lazy(() =>
        import(
            /* webpackChunkName: "GoogleAlloIcon" */
            "mdi-react/GoogleAlloIcon"
        ),
    ),
    "mdi-google-analytics": React.lazy(() =>
        import(
            /* webpackChunkName: "GoogleAnalyticsIcon" */
            "mdi-react/GoogleAnalyticsIcon"
        ),
    ),
    "mdi-google-assistant": React.lazy(() =>
        import(
            /* webpackChunkName: "GoogleAssistantIcon" */
            "mdi-react/GoogleAssistantIcon"
        ),
    ),
    "mdi-google-cardboard": React.lazy(() =>
        import(
            /* webpackChunkName: "GoogleCardboardIcon" */
            "mdi-react/GoogleCardboardIcon"
        ),
    ),
    "mdi-google-chrome": React.lazy(() =>
        import(
            /* webpackChunkName: "GoogleChromeIcon" */
            "mdi-react/GoogleChromeIcon"
        ),
    ),
    "mdi-google-circles-communities": React.lazy(() =>
        import(
            /* webpackChunkName: "GoogleCirclesCommunitiesIcon" */
            "mdi-react/GoogleCirclesCommunitiesIcon"
        ),
    ),
    "mdi-google-circles-extended": React.lazy(() =>
        import(
            /* webpackChunkName: "GoogleCirclesExtendedIcon" */
            "mdi-react/GoogleCirclesExtendedIcon"
        ),
    ),
    "mdi-google-circles-group": React.lazy(() =>
        import(
            /* webpackChunkName: "GoogleCirclesGroupIcon" */
            "mdi-react/GoogleCirclesGroupIcon"
        ),
    ),
    "mdi-google-circles": React.lazy(() =>
        import(
            /* webpackChunkName: "GoogleCirclesIcon" */
            "mdi-react/GoogleCirclesIcon"
        ),
    ),
    "mdi-google-controller-off": React.lazy(() =>
        import(
            /* webpackChunkName: "GoogleControllerOffIcon" */
            "mdi-react/GoogleControllerOffIcon"
        ),
    ),
    "mdi-google-controller": React.lazy(() =>
        import(
            /* webpackChunkName: "GoogleControllerIcon" */
            "mdi-react/GoogleControllerIcon"
        ),
    ),
    "mdi-google-drive": React.lazy(() =>
        import(
            /* webpackChunkName: "GoogleDriveIcon" */
            "mdi-react/GoogleDriveIcon"
        ),
    ),
    "mdi-google-earth": React.lazy(() =>
        import(
            /* webpackChunkName: "GoogleEarthIcon" */
            "mdi-react/GoogleEarthIcon"
        ),
    ),
    "mdi-google-fit": React.lazy(() =>
        import(
            /* webpackChunkName: "GoogleFitIcon" */
            "mdi-react/GoogleFitIcon"
        ),
    ),
    "mdi-google-glass": React.lazy(() =>
        import(
            /* webpackChunkName: "GoogleGlassIcon" */
            "mdi-react/GoogleGlassIcon"
        ),
    ),
    "mdi-google-hangouts": React.lazy(() =>
        import(
            /* webpackChunkName: "GoogleHangoutsIcon" */
            "mdi-react/GoogleHangoutsIcon"
        ),
    ),
    "mdi-google-home": React.lazy(() =>
        import(
            /* webpackChunkName: "GoogleHomeIcon" */
            "mdi-react/GoogleHomeIcon"
        ),
    ),
    "mdi-google-keep": React.lazy(() =>
        import(
            /* webpackChunkName: "GoogleKeepIcon" */
            "mdi-react/GoogleKeepIcon"
        ),
    ),
    "mdi-google-maps": React.lazy(() =>
        import(
            /* webpackChunkName: "GoogleMapsIcon" */
            "mdi-react/GoogleMapsIcon"
        ),
    ),
    "mdi-google-nearby": React.lazy(() =>
        import(
            /* webpackChunkName: "GoogleNearbyIcon" */
            "mdi-react/GoogleNearbyIcon"
        ),
    ),
    "mdi-google-pages": React.lazy(() =>
        import(
            /* webpackChunkName: "GooglePagesIcon" */
            "mdi-react/GooglePagesIcon"
        ),
    ),
    "mdi-google-photos": React.lazy(() =>
        import(
            /* webpackChunkName: "GooglePhotosIcon" */
            "mdi-react/GooglePhotosIcon"
        ),
    ),
    "mdi-google-physical-web": React.lazy(() =>
        import(
            /* webpackChunkName: "GooglePhysicalWebIcon" */
            "mdi-react/GooglePhysicalWebIcon"
        ),
    ),
    "mdi-google-play": React.lazy(() =>
        import(
            /* webpackChunkName: "GooglePlayIcon" */
            "mdi-react/GooglePlayIcon"
        ),
    ),
    "mdi-google-plus-box": React.lazy(() =>
        import(
            /* webpackChunkName: "GooglePlusBoxIcon" */
            "mdi-react/GooglePlusBoxIcon"
        ),
    ),
    "mdi-google-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "GooglePlusIcon" */
            "mdi-react/GooglePlusIcon"
        ),
    ),
    "mdi-google-translate": React.lazy(() =>
        import(
            /* webpackChunkName: "GoogleTranslateIcon" */
            "mdi-react/GoogleTranslateIcon"
        ),
    ),
    "mdi-google-wallet": React.lazy(() =>
        import(
            /* webpackChunkName: "GoogleWalletIcon" */
            "mdi-react/GoogleWalletIcon"
        ),
    ),
    "mdi-google": React.lazy(() =>
        import(
            /* webpackChunkName: "GoogleIcon" */
            "mdi-react/GoogleIcon"
        ),
    ),
    "mdi-gpu": React.lazy(() =>
        import(
            /* webpackChunkName: "GpuIcon" */
            "mdi-react/GpuIcon"
        ),
    ),
    "mdi-gradient": React.lazy(() =>
        import(
            /* webpackChunkName: "GradientIcon" */
            "mdi-react/GradientIcon"
        ),
    ),
    "mdi-graphql": React.lazy(() =>
        import(
            /* webpackChunkName: "GraphqlIcon" */
            "mdi-react/GraphqlIcon"
        ),
    ),
    "mdi-grease-pencil": React.lazy(() =>
        import(
            /* webpackChunkName: "GreasePencilIcon" */
            "mdi-react/GreasePencilIcon"
        ),
    ),
    "mdi-greater-than-or-equal": React.lazy(() =>
        import(
            /* webpackChunkName: "GreaterThanOrEqualIcon" */
            "mdi-react/GreaterThanOrEqualIcon"
        ),
    ),
    "mdi-greater-than": React.lazy(() =>
        import(
            /* webpackChunkName: "GreaterThanIcon" */
            "mdi-react/GreaterThanIcon"
        ),
    ),
    "mdi-grid-large": React.lazy(() =>
        import(
            /* webpackChunkName: "GridLargeIcon" */
            "mdi-react/GridLargeIcon"
        ),
    ),
    "mdi-grid-off": React.lazy(() =>
        import(
            /* webpackChunkName: "GridOffIcon" */
            "mdi-react/GridOffIcon"
        ),
    ),
    "mdi-grid": React.lazy(() =>
        import(
            /* webpackChunkName: "GridIcon" */
            "mdi-react/GridIcon"
        ),
    ),
    "mdi-group": React.lazy(() =>
        import(
            /* webpackChunkName: "GroupIcon" */
            "mdi-react/GroupIcon"
        ),
    ),
    "mdi-guitar-acoustic": React.lazy(() =>
        import(
            /* webpackChunkName: "GuitarAcousticIcon" */
            "mdi-react/GuitarAcousticIcon"
        ),
    ),
    "mdi-guitar-electric": React.lazy(() =>
        import(
            /* webpackChunkName: "GuitarElectricIcon" */
            "mdi-react/GuitarElectricIcon"
        ),
    ),
    "mdi-guitar-pick-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "GuitarPickOutlineIcon" */
            "mdi-react/GuitarPickOutlineIcon"
        ),
    ),
    "mdi-guitar-pick": React.lazy(() =>
        import(
            /* webpackChunkName: "GuitarPickIcon" */
            "mdi-react/GuitarPickIcon"
        ),
    ),
    "mdi-guy-fawkes-mask": React.lazy(() =>
        import(
            /* webpackChunkName: "GuyFawkesMaskIcon" */
            "mdi-react/GuyFawkesMaskIcon"
        ),
    ),
    "mdi-hackernews": React.lazy(() =>
        import(
            /* webpackChunkName: "HackernewsIcon" */
            "mdi-react/HackernewsIcon"
        ),
    ),
    "mdi-hamburger": React.lazy(() =>
        import(
            /* webpackChunkName: "HamburgerIcon" */
            "mdi-react/HamburgerIcon"
        ),
    ),
    "mdi-hammer": React.lazy(() =>
        import(
            /* webpackChunkName: "HammerIcon" */
            "mdi-react/HammerIcon"
        ),
    ),
    "mdi-hand-pointing-right": React.lazy(() =>
        import(
            /* webpackChunkName: "HandPointingRightIcon" */
            "mdi-react/HandPointingRightIcon"
        ),
    ),
    "mdi-hanger": React.lazy(() =>
        import(
            /* webpackChunkName: "HangerIcon" */
            "mdi-react/HangerIcon"
        ),
    ),
    "mdi-hard-hat": React.lazy(() =>
        import(
            /* webpackChunkName: "HardHatIcon" */
            "mdi-react/HardHatIcon"
        ),
    ),
    "mdi-harddisk": React.lazy(() =>
        import(
            /* webpackChunkName: "HarddiskIcon" */
            "mdi-react/HarddiskIcon"
        ),
    ),
    "mdi-headphones-bluetooth": React.lazy(() =>
        import(
            /* webpackChunkName: "HeadphonesBluetoothIcon" */
            "mdi-react/HeadphonesBluetoothIcon"
        ),
    ),
    "mdi-headphones-box": React.lazy(() =>
        import(
            /* webpackChunkName: "HeadphonesBoxIcon" */
            "mdi-react/HeadphonesBoxIcon"
        ),
    ),
    "mdi-headphones-off": React.lazy(() =>
        import(
            /* webpackChunkName: "HeadphonesOffIcon" */
            "mdi-react/HeadphonesOffIcon"
        ),
    ),
    "mdi-headphones-settings": React.lazy(() =>
        import(
            /* webpackChunkName: "HeadphonesSettingsIcon" */
            "mdi-react/HeadphonesSettingsIcon"
        ),
    ),
    "mdi-headphones": React.lazy(() =>
        import(
            /* webpackChunkName: "HeadphonesIcon" */
            "mdi-react/HeadphonesIcon"
        ),
    ),
    "mdi-headset-dock": React.lazy(() =>
        import(
            /* webpackChunkName: "HeadsetDockIcon" */
            "mdi-react/HeadsetDockIcon"
        ),
    ),
    "mdi-headset-off": React.lazy(() =>
        import(
            /* webpackChunkName: "HeadsetOffIcon" */
            "mdi-react/HeadsetOffIcon"
        ),
    ),
    "mdi-headset": React.lazy(() =>
        import(
            /* webpackChunkName: "HeadsetIcon" */
            "mdi-react/HeadsetIcon"
        ),
    ),
    "mdi-heart-box-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "HeartBoxOutlineIcon" */
            "mdi-react/HeartBoxOutlineIcon"
        ),
    ),
    "mdi-heart-box": React.lazy(() =>
        import(
            /* webpackChunkName: "HeartBoxIcon" */
            "mdi-react/HeartBoxIcon"
        ),
    ),
    "mdi-heart-broken": React.lazy(() =>
        import(
            /* webpackChunkName: "HeartBrokenIcon" */
            "mdi-react/HeartBrokenIcon"
        ),
    ),
    "mdi-heart-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "HeartCircleOutlineIcon" */
            "mdi-react/HeartCircleOutlineIcon"
        ),
    ),
    "mdi-heart-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "HeartCircleIcon" */
            "mdi-react/HeartCircleIcon"
        ),
    ),
    "mdi-heart-half-full": React.lazy(() =>
        import(
            /* webpackChunkName: "HeartHalfFullIcon" */
            "mdi-react/HeartHalfFullIcon"
        ),
    ),
    "mdi-heart-half-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "HeartHalfOutlineIcon" */
            "mdi-react/HeartHalfOutlineIcon"
        ),
    ),
    "mdi-heart-half": React.lazy(() =>
        import(
            /* webpackChunkName: "HeartHalfIcon" */
            "mdi-react/HeartHalfIcon"
        ),
    ),
    "mdi-heart-off": React.lazy(() =>
        import(
            /* webpackChunkName: "HeartOffIcon" */
            "mdi-react/HeartOffIcon"
        ),
    ),
    "mdi-heart-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "HeartOutlineIcon" */
            "mdi-react/HeartOutlineIcon"
        ),
    ),
    "mdi-heart-pulse": React.lazy(() =>
        import(
            /* webpackChunkName: "HeartPulseIcon" */
            "mdi-react/HeartPulseIcon"
        ),
    ),
    "mdi-heart": React.lazy(() =>
        import(
            /* webpackChunkName: "HeartIcon" */
            "mdi-react/HeartIcon"
        ),
    ),
    "mdi-help-box": React.lazy(() =>
        import(
            /* webpackChunkName: "HelpBoxIcon" */
            "mdi-react/HelpBoxIcon"
        ),
    ),
    "mdi-help-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "HelpCircleOutlineIcon" */
            "mdi-react/HelpCircleOutlineIcon"
        ),
    ),
    "mdi-help-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "HelpCircleIcon" */
            "mdi-react/HelpCircleIcon"
        ),
    ),
    "mdi-help-network": React.lazy(() =>
        import(
            /* webpackChunkName: "HelpNetworkIcon" */
            "mdi-react/HelpNetworkIcon"
        ),
    ),
    "mdi-help": React.lazy(() =>
        import(
            /* webpackChunkName: "HelpIcon" */
            "mdi-react/HelpIcon"
        ),
    ),
    "mdi-hexagon-multiple": React.lazy(() =>
        import(
            /* webpackChunkName: "HexagonMultipleIcon" */
            "mdi-react/HexagonMultipleIcon"
        ),
    ),
    "mdi-hexagon-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "HexagonOutlineIcon" */
            "mdi-react/HexagonOutlineIcon"
        ),
    ),
    "mdi-hexagon": React.lazy(() =>
        import(
            /* webpackChunkName: "HexagonIcon" */
            "mdi-react/HexagonIcon"
        ),
    ),
    "mdi-high-definition-box": React.lazy(() =>
        import(
            /* webpackChunkName: "HighDefinitionBoxIcon" */
            "mdi-react/HighDefinitionBoxIcon"
        ),
    ),
    "mdi-high-definition": React.lazy(() =>
        import(
            /* webpackChunkName: "HighDefinitionIcon" */
            "mdi-react/HighDefinitionIcon"
        ),
    ),
    "mdi-highway": React.lazy(() =>
        import(
            /* webpackChunkName: "HighwayIcon" */
            "mdi-react/HighwayIcon"
        ),
    ),
    "mdi-hinduism": React.lazy(() =>
        import(
            /* webpackChunkName: "HinduismIcon" */
            "mdi-react/HinduismIcon"
        ),
    ),
    "mdi-history": React.lazy(() =>
        import(
            /* webpackChunkName: "HistoryIcon" */
            "mdi-react/HistoryIcon"
        ),
    ),
    "mdi-hockey-puck": React.lazy(() =>
        import(
            /* webpackChunkName: "HockeyPuckIcon" */
            "mdi-react/HockeyPuckIcon"
        ),
    ),
    "mdi-hockey-sticks": React.lazy(() =>
        import(
            /* webpackChunkName: "HockeySticksIcon" */
            "mdi-react/HockeySticksIcon"
        ),
    ),
    "mdi-hololens": React.lazy(() =>
        import(
            /* webpackChunkName: "HololensIcon" */
            "mdi-react/HololensIcon"
        ),
    ),
    "mdi-home-account": React.lazy(() =>
        import(
            /* webpackChunkName: "HomeAccountIcon" */
            "mdi-react/HomeAccountIcon"
        ),
    ),
    "mdi-home-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "HomeAlertIcon" */
            "mdi-react/HomeAlertIcon"
        ),
    ),
    "mdi-home-assistant": React.lazy(() =>
        import(
            /* webpackChunkName: "HomeAssistantIcon" */
            "mdi-react/HomeAssistantIcon"
        ),
    ),
    "mdi-home-automation": React.lazy(() =>
        import(
            /* webpackChunkName: "HomeAutomationIcon" */
            "mdi-react/HomeAutomationIcon"
        ),
    ),
    "mdi-home-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "HomeCircleIcon" */
            "mdi-react/HomeCircleIcon"
        ),
    ),
    "mdi-home-currency-usd": React.lazy(() =>
        import(
            /* webpackChunkName: "HomeCurrencyUsdIcon" */
            "mdi-react/HomeCurrencyUsdIcon"
        ),
    ),
    "mdi-home-heart": React.lazy(() =>
        import(
            /* webpackChunkName: "HomeHeartIcon" */
            "mdi-react/HomeHeartIcon"
        ),
    ),
    "mdi-home-lock-open": React.lazy(() =>
        import(
            /* webpackChunkName: "HomeLockOpenIcon" */
            "mdi-react/HomeLockOpenIcon"
        ),
    ),
    "mdi-home-lock": React.lazy(() =>
        import(
            /* webpackChunkName: "HomeLockIcon" */
            "mdi-react/HomeLockIcon"
        ),
    ),
    "mdi-home-map-marker": React.lazy(() =>
        import(
            /* webpackChunkName: "HomeMapMarkerIcon" */
            "mdi-react/HomeMapMarkerIcon"
        ),
    ),
    "mdi-home-minus": React.lazy(() =>
        import(
            /* webpackChunkName: "HomeMinusIcon" */
            "mdi-react/HomeMinusIcon"
        ),
    ),
    "mdi-home-modern": React.lazy(() =>
        import(
            /* webpackChunkName: "HomeModernIcon" */
            "mdi-react/HomeModernIcon"
        ),
    ),
    "mdi-home-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "HomeOutlineIcon" */
            "mdi-react/HomeOutlineIcon"
        ),
    ),
    "mdi-home-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "HomePlusIcon" */
            "mdi-react/HomePlusIcon"
        ),
    ),
    "mdi-home-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "HomeVariantIcon" */
            "mdi-react/HomeVariantIcon"
        ),
    ),
    "mdi-home": React.lazy(() =>
        import(
            /* webpackChunkName: "HomeIcon" */
            "mdi-react/HomeIcon"
        ),
    ),
    "mdi-hook-off": React.lazy(() =>
        import(
            /* webpackChunkName: "HookOffIcon" */
            "mdi-react/HookOffIcon"
        ),
    ),
    "mdi-hook": React.lazy(() =>
        import(
            /* webpackChunkName: "HookIcon" */
            "mdi-react/HookIcon"
        ),
    ),
    "mdi-hops": React.lazy(() =>
        import(
            /* webpackChunkName: "HopsIcon" */
            "mdi-react/HopsIcon"
        ),
    ),
    "mdi-hospital-building": React.lazy(() =>
        import(
            /* webpackChunkName: "HospitalBuildingIcon" */
            "mdi-react/HospitalBuildingIcon"
        ),
    ),
    "mdi-hospital-marker": React.lazy(() =>
        import(
            /* webpackChunkName: "HospitalMarkerIcon" */
            "mdi-react/HospitalMarkerIcon"
        ),
    ),
    "mdi-hospital": React.lazy(() =>
        import(
            /* webpackChunkName: "HospitalIcon" */
            "mdi-react/HospitalIcon"
        ),
    ),
    "mdi-hot-tub": React.lazy(() =>
        import(
            /* webpackChunkName: "HotTubIcon" */
            "mdi-react/HotTubIcon"
        ),
    ),
    "mdi-hotel": React.lazy(() =>
        import(
            /* webpackChunkName: "HotelIcon" */
            "mdi-react/HotelIcon"
        ),
    ),
    "mdi-houzz-box": React.lazy(() =>
        import(
            /* webpackChunkName: "HouzzBoxIcon" */
            "mdi-react/HouzzBoxIcon"
        ),
    ),
    "mdi-houzz": React.lazy(() =>
        import(
            /* webpackChunkName: "HouzzIcon" */
            "mdi-react/HouzzIcon"
        ),
    ),
    "mdi-hulu": React.lazy(() =>
        import(
            /* webpackChunkName: "HuluIcon" */
            "mdi-react/HuluIcon"
        ),
    ),
    "mdi-human-child": React.lazy(() =>
        import(
            /* webpackChunkName: "HumanChildIcon" */
            "mdi-react/HumanChildIcon"
        ),
    ),
    "mdi-human-female": React.lazy(() =>
        import(
            /* webpackChunkName: "HumanFemaleIcon" */
            "mdi-react/HumanFemaleIcon"
        ),
    ),
    "mdi-human-greeting": React.lazy(() =>
        import(
            /* webpackChunkName: "HumanGreetingIcon" */
            "mdi-react/HumanGreetingIcon"
        ),
    ),
    "mdi-human-handsdown": React.lazy(() =>
        import(
            /* webpackChunkName: "HumanHandsdownIcon" */
            "mdi-react/HumanHandsdownIcon"
        ),
    ),
    "mdi-human-handsup": React.lazy(() =>
        import(
            /* webpackChunkName: "HumanHandsupIcon" */
            "mdi-react/HumanHandsupIcon"
        ),
    ),
    "mdi-human-male-female": React.lazy(() =>
        import(
            /* webpackChunkName: "HumanMaleFemaleIcon" */
            "mdi-react/HumanMaleFemaleIcon"
        ),
    ),
    "mdi-human-male": React.lazy(() =>
        import(
            /* webpackChunkName: "HumanMaleIcon" */
            "mdi-react/HumanMaleIcon"
        ),
    ),
    "mdi-human-pregnant": React.lazy(() =>
        import(
            /* webpackChunkName: "HumanPregnantIcon" */
            "mdi-react/HumanPregnantIcon"
        ),
    ),
    "mdi-human": React.lazy(() =>
        import(
            /* webpackChunkName: "HumanIcon" */
            "mdi-react/HumanIcon"
        ),
    ),
    "mdi-humble-bundle": React.lazy(() =>
        import(
            /* webpackChunkName: "HumbleBundleIcon" */
            "mdi-react/HumbleBundleIcon"
        ),
    ),
    "mdi-ice-cream": React.lazy(() =>
        import(
            /* webpackChunkName: "IceCreamIcon" */
            "mdi-react/IceCreamIcon"
        ),
    ),
    "mdi-image-album": React.lazy(() =>
        import(
            /* webpackChunkName: "ImageAlbumIcon" */
            "mdi-react/ImageAlbumIcon"
        ),
    ),
    "mdi-image-area-close": React.lazy(() =>
        import(
            /* webpackChunkName: "ImageAreaCloseIcon" */
            "mdi-react/ImageAreaCloseIcon"
        ),
    ),
    "mdi-image-area": React.lazy(() =>
        import(
            /* webpackChunkName: "ImageAreaIcon" */
            "mdi-react/ImageAreaIcon"
        ),
    ),
    "mdi-image-broken-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "ImageBrokenVariantIcon" */
            "mdi-react/ImageBrokenVariantIcon"
        ),
    ),
    "mdi-image-broken": React.lazy(() =>
        import(
            /* webpackChunkName: "ImageBrokenIcon" */
            "mdi-react/ImageBrokenIcon"
        ),
    ),
    "mdi-image-filter-black-white": React.lazy(() =>
        import(
            /* webpackChunkName: "ImageFilterBlackWhiteIcon" */
            "mdi-react/ImageFilterBlackWhiteIcon"
        ),
    ),
    "mdi-image-filter-center-focus-weak": React.lazy(() =>
        import(
            /* webpackChunkName: "ImageFilterCenterFocusWeakIcon" */
            "mdi-react/ImageFilterCenterFocusWeakIcon"
        ),
    ),
    "mdi-image-filter-center-focus": React.lazy(() =>
        import(
            /* webpackChunkName: "ImageFilterCenterFocusIcon" */
            "mdi-react/ImageFilterCenterFocusIcon"
        ),
    ),
    "mdi-image-filter-drama": React.lazy(() =>
        import(
            /* webpackChunkName: "ImageFilterDramaIcon" */
            "mdi-react/ImageFilterDramaIcon"
        ),
    ),
    "mdi-image-filter-frames": React.lazy(() =>
        import(
            /* webpackChunkName: "ImageFilterFramesIcon" */
            "mdi-react/ImageFilterFramesIcon"
        ),
    ),
    "mdi-image-filter-hdr": React.lazy(() =>
        import(
            /* webpackChunkName: "ImageFilterHdrIcon" */
            "mdi-react/ImageFilterHdrIcon"
        ),
    ),
    "mdi-image-filter-none": React.lazy(() =>
        import(
            /* webpackChunkName: "ImageFilterNoneIcon" */
            "mdi-react/ImageFilterNoneIcon"
        ),
    ),
    "mdi-image-filter-tilt-shift": React.lazy(() =>
        import(
            /* webpackChunkName: "ImageFilterTiltShiftIcon" */
            "mdi-react/ImageFilterTiltShiftIcon"
        ),
    ),
    "mdi-image-filter-vintage": React.lazy(() =>
        import(
            /* webpackChunkName: "ImageFilterVintageIcon" */
            "mdi-react/ImageFilterVintageIcon"
        ),
    ),
    "mdi-image-filter": React.lazy(() =>
        import(
            /* webpackChunkName: "ImageFilterIcon" */
            "mdi-react/ImageFilterIcon"
        ),
    ),
    "mdi-image-multiple": React.lazy(() =>
        import(
            /* webpackChunkName: "ImageMultipleIcon" */
            "mdi-react/ImageMultipleIcon"
        ),
    ),
    "mdi-image-off": React.lazy(() =>
        import(
            /* webpackChunkName: "ImageOffIcon" */
            "mdi-react/ImageOffIcon"
        ),
    ),
    "mdi-image-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "ImageOutlineIcon" */
            "mdi-react/ImageOutlineIcon"
        ),
    ),
    "mdi-image-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "ImagePlusIcon" */
            "mdi-react/ImagePlusIcon"
        ),
    ),
    "mdi-image-search-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "ImageSearchOutlineIcon" */
            "mdi-react/ImageSearchOutlineIcon"
        ),
    ),
    "mdi-image-search": React.lazy(() =>
        import(
            /* webpackChunkName: "ImageSearchIcon" */
            "mdi-react/ImageSearchIcon"
        ),
    ),
    "mdi-image": React.lazy(() =>
        import(
            /* webpackChunkName: "ImageIcon" */
            "mdi-react/ImageIcon"
        ),
    ),
    "mdi-import": React.lazy(() =>
        import(
            /* webpackChunkName: "ImportIcon" */
            "mdi-react/ImportIcon"
        ),
    ),
    "mdi-inbox-arrow-down": React.lazy(() =>
        import(
            /* webpackChunkName: "InboxArrowDownIcon" */
            "mdi-react/InboxArrowDownIcon"
        ),
    ),
    "mdi-inbox-arrow-up": React.lazy(() =>
        import(
            /* webpackChunkName: "InboxArrowUpIcon" */
            "mdi-react/InboxArrowUpIcon"
        ),
    ),
    "mdi-inbox-multiple": React.lazy(() =>
        import(
            /* webpackChunkName: "InboxMultipleIcon" */
            "mdi-react/InboxMultipleIcon"
        ),
    ),
    "mdi-inbox": React.lazy(() =>
        import(
            /* webpackChunkName: "InboxIcon" */
            "mdi-react/InboxIcon"
        ),
    ),
    "mdi-incognito": React.lazy(() =>
        import(
            /* webpackChunkName: "IncognitoIcon" */
            "mdi-react/IncognitoIcon"
        ),
    ),
    "mdi-infinity": React.lazy(() =>
        import(
            /* webpackChunkName: "InfinityIcon" */
            "mdi-react/InfinityIcon"
        ),
    ),
    "mdi-information-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "InformationOutlineIcon" */
            "mdi-react/InformationOutlineIcon"
        ),
    ),
    "mdi-information-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "InformationVariantIcon" */
            "mdi-react/InformationVariantIcon"
        ),
    ),
    "mdi-information": React.lazy(() =>
        import(
            /* webpackChunkName: "InformationIcon" */
            "mdi-react/InformationIcon"
        ),
    ),
    "mdi-instagram": React.lazy(() =>
        import(
            /* webpackChunkName: "InstagramIcon" */
            "mdi-react/InstagramIcon"
        ),
    ),
    "mdi-instapaper": React.lazy(() =>
        import(
            /* webpackChunkName: "InstapaperIcon" */
            "mdi-react/InstapaperIcon"
        ),
    ),
    "mdi-internet-explorer": React.lazy(() =>
        import(
            /* webpackChunkName: "InternetExplorerIcon" */
            "mdi-react/InternetExplorerIcon"
        ),
    ),
    "mdi-invert-colors": React.lazy(() =>
        import(
            /* webpackChunkName: "InvertColorsIcon" */
            "mdi-react/InvertColorsIcon"
        ),
    ),
    "mdi-islam": React.lazy(() =>
        import(
            /* webpackChunkName: "IslamIcon" */
            "mdi-react/IslamIcon"
        ),
    ),
    "mdi-itunes": React.lazy(() =>
        import(
            /* webpackChunkName: "ItunesIcon" */
            "mdi-react/ItunesIcon"
        ),
    ),
    "mdi-jeepney": React.lazy(() =>
        import(
            /* webpackChunkName: "JeepneyIcon" */
            "mdi-react/JeepneyIcon"
        ),
    ),
    "mdi-jira": React.lazy(() =>
        import(
            /* webpackChunkName: "JiraIcon" */
            "mdi-react/JiraIcon"
        ),
    ),
    "mdi-jquery": React.lazy(() =>
        import(
            /* webpackChunkName: "JqueryIcon" */
            "mdi-react/JqueryIcon"
        ),
    ),
    "mdi-jsfiddle": React.lazy(() =>
        import(
            /* webpackChunkName: "JsfiddleIcon" */
            "mdi-react/JsfiddleIcon"
        ),
    ),
    "mdi-json": React.lazy(() =>
        import(
            /* webpackChunkName: "JsonIcon" */
            "mdi-react/JsonIcon"
        ),
    ),
    "mdi-judaism": React.lazy(() =>
        import(
            /* webpackChunkName: "JudaismIcon" */
            "mdi-react/JudaismIcon"
        ),
    ),
    "mdi-karate": React.lazy(() =>
        import(
            /* webpackChunkName: "KarateIcon" */
            "mdi-react/KarateIcon"
        ),
    ),
    "mdi-keg": React.lazy(() =>
        import(
            /* webpackChunkName: "KegIcon" */
            "mdi-react/KegIcon"
        ),
    ),
    "mdi-kettle": React.lazy(() =>
        import(
            /* webpackChunkName: "KettleIcon" */
            "mdi-react/KettleIcon"
        ),
    ),
    "mdi-key-change": React.lazy(() =>
        import(
            /* webpackChunkName: "KeyChangeIcon" */
            "mdi-react/KeyChangeIcon"
        ),
    ),
    "mdi-key-minus": React.lazy(() =>
        import(
            /* webpackChunkName: "KeyMinusIcon" */
            "mdi-react/KeyMinusIcon"
        ),
    ),
    "mdi-key-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "KeyPlusIcon" */
            "mdi-react/KeyPlusIcon"
        ),
    ),
    "mdi-key-remove": React.lazy(() =>
        import(
            /* webpackChunkName: "KeyRemoveIcon" */
            "mdi-react/KeyRemoveIcon"
        ),
    ),
    "mdi-key-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "KeyVariantIcon" */
            "mdi-react/KeyVariantIcon"
        ),
    ),
    "mdi-key": React.lazy(() =>
        import(
            /* webpackChunkName: "KeyIcon" */
            "mdi-react/KeyIcon"
        ),
    ),
    "mdi-keyboard-backspace": React.lazy(() =>
        import(
            /* webpackChunkName: "KeyboardBackspaceIcon" */
            "mdi-react/KeyboardBackspaceIcon"
        ),
    ),
    "mdi-keyboard-caps": React.lazy(() =>
        import(
            /* webpackChunkName: "KeyboardCapsIcon" */
            "mdi-react/KeyboardCapsIcon"
        ),
    ),
    "mdi-keyboard-close": React.lazy(() =>
        import(
            /* webpackChunkName: "KeyboardCloseIcon" */
            "mdi-react/KeyboardCloseIcon"
        ),
    ),
    "mdi-keyboard-off": React.lazy(() =>
        import(
            /* webpackChunkName: "KeyboardOffIcon" */
            "mdi-react/KeyboardOffIcon"
        ),
    ),
    "mdi-keyboard-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "KeyboardOutlineIcon" */
            "mdi-react/KeyboardOutlineIcon"
        ),
    ),
    "mdi-keyboard-return": React.lazy(() =>
        import(
            /* webpackChunkName: "KeyboardReturnIcon" */
            "mdi-react/KeyboardReturnIcon"
        ),
    ),
    "mdi-keyboard-tab": React.lazy(() =>
        import(
            /* webpackChunkName: "KeyboardTabIcon" */
            "mdi-react/KeyboardTabIcon"
        ),
    ),
    "mdi-keyboard-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "KeyboardVariantIcon" */
            "mdi-react/KeyboardVariantIcon"
        ),
    ),
    "mdi-keyboard": React.lazy(() =>
        import(
            /* webpackChunkName: "KeyboardIcon" */
            "mdi-react/KeyboardIcon"
        ),
    ),
    "mdi-kickstarter": React.lazy(() =>
        import(
            /* webpackChunkName: "KickstarterIcon" */
            "mdi-react/KickstarterIcon"
        ),
    ),
    "mdi-kodi": React.lazy(() =>
        import(
            /* webpackChunkName: "KodiIcon" */
            "mdi-react/KodiIcon"
        ),
    ),
    "mdi-label-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "LabelOutlineIcon" */
            "mdi-react/LabelOutlineIcon"
        ),
    ),
    "mdi-label": React.lazy(() =>
        import(
            /* webpackChunkName: "LabelIcon" */
            "mdi-react/LabelIcon"
        ),
    ),
    "mdi-ladybug": React.lazy(() =>
        import(
            /* webpackChunkName: "LadybugIcon" */
            "mdi-react/LadybugIcon"
        ),
    ),
    "mdi-lambda": React.lazy(() =>
        import(
            /* webpackChunkName: "LambdaIcon" */
            "mdi-react/LambdaIcon"
        ),
    ),
    "mdi-lamp": React.lazy(() =>
        import(
            /* webpackChunkName: "LampIcon" */
            "mdi-react/LampIcon"
        ),
    ),
    "mdi-lan-connect": React.lazy(() =>
        import(
            /* webpackChunkName: "LanConnectIcon" */
            "mdi-react/LanConnectIcon"
        ),
    ),
    "mdi-lan-disconnect": React.lazy(() =>
        import(
            /* webpackChunkName: "LanDisconnectIcon" */
            "mdi-react/LanDisconnectIcon"
        ),
    ),
    "mdi-lan-pending": React.lazy(() =>
        import(
            /* webpackChunkName: "LanPendingIcon" */
            "mdi-react/LanPendingIcon"
        ),
    ),
    "mdi-lan": React.lazy(() =>
        import(
            /* webpackChunkName: "LanIcon" */
            "mdi-react/LanIcon"
        ),
    ),
    "mdi-language-c": React.lazy(() =>
        import(
            /* webpackChunkName: "LanguageCIcon" */
            "mdi-react/LanguageCIcon"
        ),
    ),
    "mdi-language-cpp": React.lazy(() =>
        import(
            /* webpackChunkName: "LanguageCppIcon" */
            "mdi-react/LanguageCppIcon"
        ),
    ),
    "mdi-language-csharp": React.lazy(() =>
        import(
            /* webpackChunkName: "LanguageCsharpIcon" */
            "mdi-react/LanguageCsharpIcon"
        ),
    ),
    "mdi-language-css-3": React.lazy(() =>
        import(
            /* webpackChunkName: "LanguageCss3Icon" */
            "mdi-react/LanguageCss3Icon"
        ),
    ),
    "mdi-language-go": React.lazy(() =>
        import(
            /* webpackChunkName: "LanguageGoIcon" */
            "mdi-react/LanguageGoIcon"
        ),
    ),
    "mdi-language-html-5": React.lazy(() =>
        import(
            /* webpackChunkName: "LanguageHtml5Icon" */
            "mdi-react/LanguageHtml5Icon"
        ),
    ),
    "mdi-language-javascript": React.lazy(() =>
        import(
            /* webpackChunkName: "LanguageJavascriptIcon" */
            "mdi-react/LanguageJavascriptIcon"
        ),
    ),
    "mdi-language-lua": React.lazy(() =>
        import(
            /* webpackChunkName: "LanguageLuaIcon" */
            "mdi-react/LanguageLuaIcon"
        ),
    ),
    "mdi-language-php": React.lazy(() =>
        import(
            /* webpackChunkName: "LanguagePhpIcon" */
            "mdi-react/LanguagePhpIcon"
        ),
    ),
    "mdi-language-python-text": React.lazy(() =>
        import(
            /* webpackChunkName: "LanguagePythonTextIcon" */
            "mdi-react/LanguagePythonTextIcon"
        ),
    ),
    "mdi-language-python": React.lazy(() =>
        import(
            /* webpackChunkName: "LanguagePythonIcon" */
            "mdi-react/LanguagePythonIcon"
        ),
    ),
    "mdi-language-r": React.lazy(() =>
        import(
            /* webpackChunkName: "LanguageRIcon" */
            "mdi-react/LanguageRIcon"
        ),
    ),
    "mdi-language-swift": React.lazy(() =>
        import(
            /* webpackChunkName: "LanguageSwiftIcon" */
            "mdi-react/LanguageSwiftIcon"
        ),
    ),
    "mdi-language-typescript": React.lazy(() =>
        import(
            /* webpackChunkName: "LanguageTypescriptIcon" */
            "mdi-react/LanguageTypescriptIcon"
        ),
    ),
    "mdi-laptop-chromebook": React.lazy(() =>
        import(
            /* webpackChunkName: "LaptopChromebookIcon" */
            "mdi-react/LaptopChromebookIcon"
        ),
    ),
    "mdi-laptop-mac": React.lazy(() =>
        import(
            /* webpackChunkName: "LaptopMacIcon" */
            "mdi-react/LaptopMacIcon"
        ),
    ),
    "mdi-laptop-off": React.lazy(() =>
        import(
            /* webpackChunkName: "LaptopOffIcon" */
            "mdi-react/LaptopOffIcon"
        ),
    ),
    "mdi-laptop-windows": React.lazy(() =>
        import(
            /* webpackChunkName: "LaptopWindowsIcon" */
            "mdi-react/LaptopWindowsIcon"
        ),
    ),
    "mdi-laptop": React.lazy(() =>
        import(
            /* webpackChunkName: "LaptopIcon" */
            "mdi-react/LaptopIcon"
        ),
    ),
    "mdi-lastfm": React.lazy(() =>
        import(
            /* webpackChunkName: "LastfmIcon" */
            "mdi-react/LastfmIcon"
        ),
    ),
    "mdi-lastpass": React.lazy(() =>
        import(
            /* webpackChunkName: "LastpassIcon" */
            "mdi-react/LastpassIcon"
        ),
    ),
    "mdi-launch": React.lazy(() =>
        import(
            /* webpackChunkName: "LaunchIcon" */
            "mdi-react/LaunchIcon"
        ),
    ),
    "mdi-lava-lamp": React.lazy(() =>
        import(
            /* webpackChunkName: "LavaLampIcon" */
            "mdi-react/LavaLampIcon"
        ),
    ),
    "mdi-layers-off": React.lazy(() =>
        import(
            /* webpackChunkName: "LayersOffIcon" */
            "mdi-react/LayersOffIcon"
        ),
    ),
    "mdi-layers": React.lazy(() =>
        import(
            /* webpackChunkName: "LayersIcon" */
            "mdi-react/LayersIcon"
        ),
    ),
    "mdi-lead-pencil": React.lazy(() =>
        import(
            /* webpackChunkName: "LeadPencilIcon" */
            "mdi-react/LeadPencilIcon"
        ),
    ),
    "mdi-leaf": React.lazy(() =>
        import(
            /* webpackChunkName: "LeafIcon" */
            "mdi-react/LeafIcon"
        ),
    ),
    "mdi-led-off": React.lazy(() =>
        import(
            /* webpackChunkName: "LedOffIcon" */
            "mdi-react/LedOffIcon"
        ),
    ),
    "mdi-led-on": React.lazy(() =>
        import(
            /* webpackChunkName: "LedOnIcon" */
            "mdi-react/LedOnIcon"
        ),
    ),
    "mdi-led-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "LedOutlineIcon" */
            "mdi-react/LedOutlineIcon"
        ),
    ),
    "mdi-led-strip": React.lazy(() =>
        import(
            /* webpackChunkName: "LedStripIcon" */
            "mdi-react/LedStripIcon"
        ),
    ),
    "mdi-led-variant-off": React.lazy(() =>
        import(
            /* webpackChunkName: "LedVariantOffIcon" */
            "mdi-react/LedVariantOffIcon"
        ),
    ),
    "mdi-led-variant-on": React.lazy(() =>
        import(
            /* webpackChunkName: "LedVariantOnIcon" */
            "mdi-react/LedVariantOnIcon"
        ),
    ),
    "mdi-led-variant-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "LedVariantOutlineIcon" */
            "mdi-react/LedVariantOutlineIcon"
        ),
    ),
    "mdi-less-than-or-equal": React.lazy(() =>
        import(
            /* webpackChunkName: "LessThanOrEqualIcon" */
            "mdi-react/LessThanOrEqualIcon"
        ),
    ),
    "mdi-less-than": React.lazy(() =>
        import(
            /* webpackChunkName: "LessThanIcon" */
            "mdi-react/LessThanIcon"
        ),
    ),
    "mdi-library-books": React.lazy(() =>
        import(
            /* webpackChunkName: "LibraryBooksIcon" */
            "mdi-react/LibraryBooksIcon"
        ),
    ),
    "mdi-library-music": React.lazy(() =>
        import(
            /* webpackChunkName: "LibraryMusicIcon" */
            "mdi-react/LibraryMusicIcon"
        ),
    ),
    "mdi-library-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "LibraryPlusIcon" */
            "mdi-react/LibraryPlusIcon"
        ),
    ),
    "mdi-library": React.lazy(() =>
        import(
            /* webpackChunkName: "LibraryIcon" */
            "mdi-react/LibraryIcon"
        ),
    ),
    "mdi-lifebuoy": React.lazy(() =>
        import(
            /* webpackChunkName: "LifebuoyIcon" */
            "mdi-react/LifebuoyIcon"
        ),
    ),
    "mdi-light-switch": React.lazy(() =>
        import(
            /* webpackChunkName: "LightSwitchIcon" */
            "mdi-react/LightSwitchIcon"
        ),
    ),
    "mdi-lightbulb-on-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "LightbulbOnOutlineIcon" */
            "mdi-react/LightbulbOnOutlineIcon"
        ),
    ),
    "mdi-lightbulb-on": React.lazy(() =>
        import(
            /* webpackChunkName: "LightbulbOnIcon" */
            "mdi-react/LightbulbOnIcon"
        ),
    ),
    "mdi-lightbulb-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "LightbulbOutlineIcon" */
            "mdi-react/LightbulbOutlineIcon"
        ),
    ),
    "mdi-lightbulb": React.lazy(() =>
        import(
            /* webpackChunkName: "LightbulbIcon" */
            "mdi-react/LightbulbIcon"
        ),
    ),
    "mdi-link-off": React.lazy(() =>
        import(
            /* webpackChunkName: "LinkOffIcon" */
            "mdi-react/LinkOffIcon"
        ),
    ),
    "mdi-link-variant-off": React.lazy(() =>
        import(
            /* webpackChunkName: "LinkVariantOffIcon" */
            "mdi-react/LinkVariantOffIcon"
        ),
    ),
    "mdi-link-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "LinkVariantIcon" */
            "mdi-react/LinkVariantIcon"
        ),
    ),
    "mdi-link": React.lazy(() =>
        import(
            /* webpackChunkName: "LinkIcon" */
            "mdi-react/LinkIcon"
        ),
    ),
    "mdi-linkedin-box": React.lazy(() =>
        import(
            /* webpackChunkName: "LinkedinBoxIcon" */
            "mdi-react/LinkedinBoxIcon"
        ),
    ),
    "mdi-linkedin": React.lazy(() =>
        import(
            /* webpackChunkName: "LinkedinIcon" */
            "mdi-react/LinkedinIcon"
        ),
    ),
    "mdi-linux-mint": React.lazy(() =>
        import(
            /* webpackChunkName: "LinuxMintIcon" */
            "mdi-react/LinuxMintIcon"
        ),
    ),
    "mdi-linux": React.lazy(() =>
        import(
            /* webpackChunkName: "LinuxIcon" */
            "mdi-react/LinuxIcon"
        ),
    ),
    "mdi-loading": React.lazy(() =>
        import(
            /* webpackChunkName: "LoadingIcon" */
            "mdi-react/LoadingIcon"
        ),
    ),
    "mdi-lock-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "LockAlertIcon" */
            "mdi-react/LockAlertIcon"
        ),
    ),
    "mdi-lock-clock": React.lazy(() =>
        import(
            /* webpackChunkName: "LockClockIcon" */
            "mdi-react/LockClockIcon"
        ),
    ),
    "mdi-lock-open-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "LockOpenOutlineIcon" */
            "mdi-react/LockOpenOutlineIcon"
        ),
    ),
    "mdi-lock-open": React.lazy(() =>
        import(
            /* webpackChunkName: "LockOpenIcon" */
            "mdi-react/LockOpenIcon"
        ),
    ),
    "mdi-lock-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "LockOutlineIcon" */
            "mdi-react/LockOutlineIcon"
        ),
    ),
    "mdi-lock-pattern": React.lazy(() =>
        import(
            /* webpackChunkName: "LockPatternIcon" */
            "mdi-react/LockPatternIcon"
        ),
    ),
    "mdi-lock-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "LockPlusIcon" */
            "mdi-react/LockPlusIcon"
        ),
    ),
    "mdi-lock-question": React.lazy(() =>
        import(
            /* webpackChunkName: "LockQuestionIcon" */
            "mdi-react/LockQuestionIcon"
        ),
    ),
    "mdi-lock-reset": React.lazy(() =>
        import(
            /* webpackChunkName: "LockResetIcon" */
            "mdi-react/LockResetIcon"
        ),
    ),
    "mdi-lock-smart": React.lazy(() =>
        import(
            /* webpackChunkName: "LockSmartIcon" */
            "mdi-react/LockSmartIcon"
        ),
    ),
    "mdi-lock": React.lazy(() =>
        import(
            /* webpackChunkName: "LockIcon" */
            "mdi-react/LockIcon"
        ),
    ),
    "mdi-locker-multiple": React.lazy(() =>
        import(
            /* webpackChunkName: "LockerMultipleIcon" */
            "mdi-react/LockerMultipleIcon"
        ),
    ),
    "mdi-locker": React.lazy(() =>
        import(
            /* webpackChunkName: "LockerIcon" */
            "mdi-react/LockerIcon"
        ),
    ),
    "mdi-login-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "LoginVariantIcon" */
            "mdi-react/LoginVariantIcon"
        ),
    ),
    "mdi-login": React.lazy(() =>
        import(
            /* webpackChunkName: "LoginIcon" */
            "mdi-react/LoginIcon"
        ),
    ),
    "mdi-logout-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "LogoutVariantIcon" */
            "mdi-react/LogoutVariantIcon"
        ),
    ),
    "mdi-logout": React.lazy(() =>
        import(
            /* webpackChunkName: "LogoutIcon" */
            "mdi-react/LogoutIcon"
        ),
    ),
    "mdi-looks": React.lazy(() =>
        import(
            /* webpackChunkName: "LooksIcon" */
            "mdi-react/LooksIcon"
        ),
    ),
    "mdi-loop": React.lazy(() =>
        import(
            /* webpackChunkName: "LoopIcon" */
            "mdi-react/LoopIcon"
        ),
    ),
    "mdi-loupe": React.lazy(() =>
        import(
            /* webpackChunkName: "LoupeIcon" */
            "mdi-react/LoupeIcon"
        ),
    ),
    "mdi-lumx": React.lazy(() =>
        import(
            /* webpackChunkName: "LumxIcon" */
            "mdi-react/LumxIcon"
        ),
    ),
    "mdi-magnet-on": React.lazy(() =>
        import(
            /* webpackChunkName: "MagnetOnIcon" */
            "mdi-react/MagnetOnIcon"
        ),
    ),
    "mdi-magnet": React.lazy(() =>
        import(
            /* webpackChunkName: "MagnetIcon" */
            "mdi-react/MagnetIcon"
        ),
    ),
    "mdi-magnify-close": React.lazy(() =>
        import(
            /* webpackChunkName: "MagnifyCloseIcon" */
            "mdi-react/MagnifyCloseIcon"
        ),
    ),
    "mdi-magnify-minus-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "MagnifyMinusOutlineIcon" */
            "mdi-react/MagnifyMinusOutlineIcon"
        ),
    ),
    "mdi-magnify-minus": React.lazy(() =>
        import(
            /* webpackChunkName: "MagnifyMinusIcon" */
            "mdi-react/MagnifyMinusIcon"
        ),
    ),
    "mdi-magnify-plus-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "MagnifyPlusOutlineIcon" */
            "mdi-react/MagnifyPlusOutlineIcon"
        ),
    ),
    "mdi-magnify-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "MagnifyPlusIcon" */
            "mdi-react/MagnifyPlusIcon"
        ),
    ),
    "mdi-magnify": React.lazy(() =>
        import(
            /* webpackChunkName: "MagnifyIcon" */
            "mdi-react/MagnifyIcon"
        ),
    ),
    "mdi-mail-ru": React.lazy(() =>
        import(
            /* webpackChunkName: "MailRuIcon" */
            "mdi-react/MailRuIcon"
        ),
    ),
    "mdi-mailbox": React.lazy(() =>
        import(
            /* webpackChunkName: "MailboxIcon" */
            "mdi-react/MailboxIcon"
        ),
    ),
    "mdi-map-marker-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "MapMarkerCircleIcon" */
            "mdi-react/MapMarkerCircleIcon"
        ),
    ),
    "mdi-map-marker-distance": React.lazy(() =>
        import(
            /* webpackChunkName: "MapMarkerDistanceIcon" */
            "mdi-react/MapMarkerDistanceIcon"
        ),
    ),
    "mdi-map-marker-minus": React.lazy(() =>
        import(
            /* webpackChunkName: "MapMarkerMinusIcon" */
            "mdi-react/MapMarkerMinusIcon"
        ),
    ),
    "mdi-map-marker-multiple": React.lazy(() =>
        import(
            /* webpackChunkName: "MapMarkerMultipleIcon" */
            "mdi-react/MapMarkerMultipleIcon"
        ),
    ),
    "mdi-map-marker-off": React.lazy(() =>
        import(
            /* webpackChunkName: "MapMarkerOffIcon" */
            "mdi-react/MapMarkerOffIcon"
        ),
    ),
    "mdi-map-marker-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "MapMarkerOutlineIcon" */
            "mdi-react/MapMarkerOutlineIcon"
        ),
    ),
    "mdi-map-marker-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "MapMarkerPlusIcon" */
            "mdi-react/MapMarkerPlusIcon"
        ),
    ),
    "mdi-map-marker-radius": React.lazy(() =>
        import(
            /* webpackChunkName: "MapMarkerRadiusIcon" */
            "mdi-react/MapMarkerRadiusIcon"
        ),
    ),
    "mdi-map-marker": React.lazy(() =>
        import(
            /* webpackChunkName: "MapMarkerIcon" */
            "mdi-react/MapMarkerIcon"
        ),
    ),
    "mdi-map-minus": React.lazy(() =>
        import(
            /* webpackChunkName: "MapMinusIcon" */
            "mdi-react/MapMinusIcon"
        ),
    ),
    "mdi-map-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "MapOutlineIcon" */
            "mdi-react/MapOutlineIcon"
        ),
    ),
    "mdi-map-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "MapPlusIcon" */
            "mdi-react/MapPlusIcon"
        ),
    ),
    "mdi-map-search-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "MapSearchOutlineIcon" */
            "mdi-react/MapSearchOutlineIcon"
        ),
    ),
    "mdi-map-search": React.lazy(() =>
        import(
            /* webpackChunkName: "MapSearchIcon" */
            "mdi-react/MapSearchIcon"
        ),
    ),
    "mdi-map": React.lazy(() =>
        import(
            /* webpackChunkName: "MapIcon" */
            "mdi-react/MapIcon"
        ),
    ),
    "mdi-margin": React.lazy(() =>
        import(
            /* webpackChunkName: "MarginIcon" */
            "mdi-react/MarginIcon"
        ),
    ),
    "mdi-markdown": React.lazy(() =>
        import(
            /* webpackChunkName: "MarkdownIcon" */
            "mdi-react/MarkdownIcon"
        ),
    ),
    "mdi-marker-check": React.lazy(() =>
        import(
            /* webpackChunkName: "MarkerCheckIcon" */
            "mdi-react/MarkerCheckIcon"
        ),
    ),
    "mdi-marker": React.lazy(() =>
        import(
            /* webpackChunkName: "MarkerIcon" */
            "mdi-react/MarkerIcon"
        ),
    ),
    "mdi-material-design": React.lazy(() =>
        import(
            /* webpackChunkName: "MaterialDesignIcon" */
            "mdi-react/MaterialDesignIcon"
        ),
    ),
    "mdi-material-ui": React.lazy(() =>
        import(
            /* webpackChunkName: "MaterialUiIcon" */
            "mdi-react/MaterialUiIcon"
        ),
    ),
    "mdi-math-compass": React.lazy(() =>
        import(
            /* webpackChunkName: "MathCompassIcon" */
            "mdi-react/MathCompassIcon"
        ),
    ),
    "mdi-matrix": React.lazy(() =>
        import(
            /* webpackChunkName: "MatrixIcon" */
            "mdi-react/MatrixIcon"
        ),
    ),
    "mdi-maxcdn": React.lazy(() =>
        import(
            /* webpackChunkName: "MaxcdnIcon" */
            "mdi-react/MaxcdnIcon"
        ),
    ),
    "mdi-medal": React.lazy(() =>
        import(
            /* webpackChunkName: "MedalIcon" */
            "mdi-react/MedalIcon"
        ),
    ),
    "mdi-medical-bag": React.lazy(() =>
        import(
            /* webpackChunkName: "MedicalBagIcon" */
            "mdi-react/MedicalBagIcon"
        ),
    ),
    "mdi-medium": React.lazy(() =>
        import(
            /* webpackChunkName: "MediumIcon" */
            "mdi-react/MediumIcon"
        ),
    ),
    "mdi-memory": React.lazy(() =>
        import(
            /* webpackChunkName: "MemoryIcon" */
            "mdi-react/MemoryIcon"
        ),
    ),
    "mdi-menu-down-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "MenuDownOutlineIcon" */
            "mdi-react/MenuDownOutlineIcon"
        ),
    ),
    "mdi-menu-down": React.lazy(() =>
        import(
            /* webpackChunkName: "MenuDownIcon" */
            "mdi-react/MenuDownIcon"
        ),
    ),
    "mdi-menu-left": React.lazy(() =>
        import(
            /* webpackChunkName: "MenuLeftIcon" */
            "mdi-react/MenuLeftIcon"
        ),
    ),
    "mdi-menu-right": React.lazy(() =>
        import(
            /* webpackChunkName: "MenuRightIcon" */
            "mdi-react/MenuRightIcon"
        ),
    ),
    "mdi-menu-up-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "MenuUpOutlineIcon" */
            "mdi-react/MenuUpOutlineIcon"
        ),
    ),
    "mdi-menu-up": React.lazy(() =>
        import(
            /* webpackChunkName: "MenuUpIcon" */
            "mdi-react/MenuUpIcon"
        ),
    ),
    "mdi-menu": React.lazy(() =>
        import(
            /* webpackChunkName: "MenuIcon" */
            "mdi-react/MenuIcon"
        ),
    ),
    "mdi-message-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "MessageAlertIcon" */
            "mdi-react/MessageAlertIcon"
        ),
    ),
    "mdi-message-bulleted-off": React.lazy(() =>
        import(
            /* webpackChunkName: "MessageBulletedOffIcon" */
            "mdi-react/MessageBulletedOffIcon"
        ),
    ),
    "mdi-message-bulleted": React.lazy(() =>
        import(
            /* webpackChunkName: "MessageBulletedIcon" */
            "mdi-react/MessageBulletedIcon"
        ),
    ),
    "mdi-message-draw": React.lazy(() =>
        import(
            /* webpackChunkName: "MessageDrawIcon" */
            "mdi-react/MessageDrawIcon"
        ),
    ),
    "mdi-message-image": React.lazy(() =>
        import(
            /* webpackChunkName: "MessageImageIcon" */
            "mdi-react/MessageImageIcon"
        ),
    ),
    "mdi-message-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "MessageOutlineIcon" */
            "mdi-react/MessageOutlineIcon"
        ),
    ),
    "mdi-message-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "MessagePlusIcon" */
            "mdi-react/MessagePlusIcon"
        ),
    ),
    "mdi-message-processing": React.lazy(() =>
        import(
            /* webpackChunkName: "MessageProcessingIcon" */
            "mdi-react/MessageProcessingIcon"
        ),
    ),
    "mdi-message-reply-text": React.lazy(() =>
        import(
            /* webpackChunkName: "MessageReplyTextIcon" */
            "mdi-react/MessageReplyTextIcon"
        ),
    ),
    "mdi-message-reply": React.lazy(() =>
        import(
            /* webpackChunkName: "MessageReplyIcon" */
            "mdi-react/MessageReplyIcon"
        ),
    ),
    "mdi-message-settings-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "MessageSettingsVariantIcon" */
            "mdi-react/MessageSettingsVariantIcon"
        ),
    ),
    "mdi-message-settings": React.lazy(() =>
        import(
            /* webpackChunkName: "MessageSettingsIcon" */
            "mdi-react/MessageSettingsIcon"
        ),
    ),
    "mdi-message-text-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "MessageTextOutlineIcon" */
            "mdi-react/MessageTextOutlineIcon"
        ),
    ),
    "mdi-message-text": React.lazy(() =>
        import(
            /* webpackChunkName: "MessageTextIcon" */
            "mdi-react/MessageTextIcon"
        ),
    ),
    "mdi-message-video": React.lazy(() =>
        import(
            /* webpackChunkName: "MessageVideoIcon" */
            "mdi-react/MessageVideoIcon"
        ),
    ),
    "mdi-message": React.lazy(() =>
        import(
            /* webpackChunkName: "MessageIcon" */
            "mdi-react/MessageIcon"
        ),
    ),
    "mdi-meteor": React.lazy(() =>
        import(
            /* webpackChunkName: "MeteorIcon" */
            "mdi-react/MeteorIcon"
        ),
    ),
    "mdi-metronome-tick": React.lazy(() =>
        import(
            /* webpackChunkName: "MetronomeTickIcon" */
            "mdi-react/MetronomeTickIcon"
        ),
    ),
    "mdi-metronome": React.lazy(() =>
        import(
            /* webpackChunkName: "MetronomeIcon" */
            "mdi-react/MetronomeIcon"
        ),
    ),
    "mdi-micro-sd": React.lazy(() =>
        import(
            /* webpackChunkName: "MicroSdIcon" */
            "mdi-react/MicroSdIcon"
        ),
    ),
    "mdi-microphone-minus": React.lazy(() =>
        import(
            /* webpackChunkName: "MicrophoneMinusIcon" */
            "mdi-react/MicrophoneMinusIcon"
        ),
    ),
    "mdi-microphone-off": React.lazy(() =>
        import(
            /* webpackChunkName: "MicrophoneOffIcon" */
            "mdi-react/MicrophoneOffIcon"
        ),
    ),
    "mdi-microphone-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "MicrophoneOutlineIcon" */
            "mdi-react/MicrophoneOutlineIcon"
        ),
    ),
    "mdi-microphone-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "MicrophonePlusIcon" */
            "mdi-react/MicrophonePlusIcon"
        ),
    ),
    "mdi-microphone-settings": React.lazy(() =>
        import(
            /* webpackChunkName: "MicrophoneSettingsIcon" */
            "mdi-react/MicrophoneSettingsIcon"
        ),
    ),
    "mdi-microphone-variant-off": React.lazy(() =>
        import(
            /* webpackChunkName: "MicrophoneVariantOffIcon" */
            "mdi-react/MicrophoneVariantOffIcon"
        ),
    ),
    "mdi-microphone-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "MicrophoneVariantIcon" */
            "mdi-react/MicrophoneVariantIcon"
        ),
    ),
    "mdi-microphone": React.lazy(() =>
        import(
            /* webpackChunkName: "MicrophoneIcon" */
            "mdi-react/MicrophoneIcon"
        ),
    ),
    "mdi-microscope": React.lazy(() =>
        import(
            /* webpackChunkName: "MicroscopeIcon" */
            "mdi-react/MicroscopeIcon"
        ),
    ),
    "mdi-microsoft-dynamics": React.lazy(() =>
        import(
            /* webpackChunkName: "MicrosoftDynamicsIcon" */
            "mdi-react/MicrosoftDynamicsIcon"
        ),
    ),
    "mdi-microsoft": React.lazy(() =>
        import(
            /* webpackChunkName: "MicrosoftIcon" */
            "mdi-react/MicrosoftIcon"
        ),
    ),
    "mdi-midi-port": React.lazy(() =>
        import(
            /* webpackChunkName: "MidiPortIcon" */
            "mdi-react/MidiPortIcon"
        ),
    ),
    "mdi-midi": React.lazy(() =>
        import(
            /* webpackChunkName: "MidiIcon" */
            "mdi-react/MidiIcon"
        ),
    ),
    "mdi-minecraft": React.lazy(() =>
        import(
            /* webpackChunkName: "MinecraftIcon" */
            "mdi-react/MinecraftIcon"
        ),
    ),
    "mdi-minus-box-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "MinusBoxOutlineIcon" */
            "mdi-react/MinusBoxOutlineIcon"
        ),
    ),
    "mdi-minus-box": React.lazy(() =>
        import(
            /* webpackChunkName: "MinusBoxIcon" */
            "mdi-react/MinusBoxIcon"
        ),
    ),
    "mdi-minus-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "MinusCircleOutlineIcon" */
            "mdi-react/MinusCircleOutlineIcon"
        ),
    ),
    "mdi-minus-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "MinusCircleIcon" */
            "mdi-react/MinusCircleIcon"
        ),
    ),
    "mdi-minus-network": React.lazy(() =>
        import(
            /* webpackChunkName: "MinusNetworkIcon" */
            "mdi-react/MinusNetworkIcon"
        ),
    ),
    "mdi-minus": React.lazy(() =>
        import(
            /* webpackChunkName: "MinusIcon" */
            "mdi-react/MinusIcon"
        ),
    ),
    "mdi-mixcloud": React.lazy(() =>
        import(
            /* webpackChunkName: "MixcloudIcon" */
            "mdi-react/MixcloudIcon"
        ),
    ),
    "mdi-mixed-reality": React.lazy(() =>
        import(
            /* webpackChunkName: "MixedRealityIcon" */
            "mdi-react/MixedRealityIcon"
        ),
    ),
    "mdi-mixer": React.lazy(() =>
        import(
            /* webpackChunkName: "MixerIcon" */
            "mdi-react/MixerIcon"
        ),
    ),
    "mdi-monitor-cellphone-star": React.lazy(() =>
        import(
            /* webpackChunkName: "MonitorCellphoneStarIcon" */
            "mdi-react/MonitorCellphoneStarIcon"
        ),
    ),
    "mdi-monitor-cellphone": React.lazy(() =>
        import(
            /* webpackChunkName: "MonitorCellphoneIcon" */
            "mdi-react/MonitorCellphoneIcon"
        ),
    ),
    "mdi-monitor-multiple": React.lazy(() =>
        import(
            /* webpackChunkName: "MonitorMultipleIcon" */
            "mdi-react/MonitorMultipleIcon"
        ),
    ),
    "mdi-monitor": React.lazy(() =>
        import(
            /* webpackChunkName: "MonitorIcon" */
            "mdi-react/MonitorIcon"
        ),
    ),
    "mdi-more": React.lazy(() =>
        import(
            /* webpackChunkName: "MoreIcon" */
            "mdi-react/MoreIcon"
        ),
    ),
    "mdi-motorbike": React.lazy(() =>
        import(
            /* webpackChunkName: "MotorbikeIcon" */
            "mdi-react/MotorbikeIcon"
        ),
    ),
    "mdi-mouse-bluetooth": React.lazy(() =>
        import(
            /* webpackChunkName: "MouseBluetoothIcon" */
            "mdi-react/MouseBluetoothIcon"
        ),
    ),
    "mdi-mouse-off": React.lazy(() =>
        import(
            /* webpackChunkName: "MouseOffIcon" */
            "mdi-react/MouseOffIcon"
        ),
    ),
    "mdi-mouse-variant-off": React.lazy(() =>
        import(
            /* webpackChunkName: "MouseVariantOffIcon" */
            "mdi-react/MouseVariantOffIcon"
        ),
    ),
    "mdi-mouse-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "MouseVariantIcon" */
            "mdi-react/MouseVariantIcon"
        ),
    ),
    "mdi-mouse": React.lazy(() =>
        import(
            /* webpackChunkName: "MouseIcon" */
            "mdi-react/MouseIcon"
        ),
    ),
    "mdi-move-resize-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "MoveResizeVariantIcon" */
            "mdi-react/MoveResizeVariantIcon"
        ),
    ),
    "mdi-move-resize": React.lazy(() =>
        import(
            /* webpackChunkName: "MoveResizeIcon" */
            "mdi-react/MoveResizeIcon"
        ),
    ),
    "mdi-movie-roll": React.lazy(() =>
        import(
            /* webpackChunkName: "MovieRollIcon" */
            "mdi-react/MovieRollIcon"
        ),
    ),
    "mdi-movie": React.lazy(() =>
        import(
            /* webpackChunkName: "MovieIcon" */
            "mdi-react/MovieIcon"
        ),
    ),
    "mdi-muffin": React.lazy(() =>
        import(
            /* webpackChunkName: "MuffinIcon" */
            "mdi-react/MuffinIcon"
        ),
    ),
    "mdi-multiplication-box": React.lazy(() =>
        import(
            /* webpackChunkName: "MultiplicationBoxIcon" */
            "mdi-react/MultiplicationBoxIcon"
        ),
    ),
    "mdi-multiplication": React.lazy(() =>
        import(
            /* webpackChunkName: "MultiplicationIcon" */
            "mdi-react/MultiplicationIcon"
        ),
    ),
    "mdi-mushroom-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "MushroomOutlineIcon" */
            "mdi-react/MushroomOutlineIcon"
        ),
    ),
    "mdi-mushroom": React.lazy(() =>
        import(
            /* webpackChunkName: "MushroomIcon" */
            "mdi-react/MushroomIcon"
        ),
    ),
    "mdi-music-box-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "MusicBoxOutlineIcon" */
            "mdi-react/MusicBoxOutlineIcon"
        ),
    ),
    "mdi-music-box": React.lazy(() =>
        import(
            /* webpackChunkName: "MusicBoxIcon" */
            "mdi-react/MusicBoxIcon"
        ),
    ),
    "mdi-music-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "MusicCircleIcon" */
            "mdi-react/MusicCircleIcon"
        ),
    ),
    "mdi-music-note-bluetooth-off": React.lazy(() =>
        import(
            /* webpackChunkName: "MusicNoteBluetoothOffIcon" */
            "mdi-react/MusicNoteBluetoothOffIcon"
        ),
    ),
    "mdi-music-note-bluetooth": React.lazy(() =>
        import(
            /* webpackChunkName: "MusicNoteBluetoothIcon" */
            "mdi-react/MusicNoteBluetoothIcon"
        ),
    ),
    "mdi-music-note-eighth": React.lazy(() =>
        import(
            /* webpackChunkName: "MusicNoteEighthIcon" */
            "mdi-react/MusicNoteEighthIcon"
        ),
    ),
    "mdi-music-note-half": React.lazy(() =>
        import(
            /* webpackChunkName: "MusicNoteHalfIcon" */
            "mdi-react/MusicNoteHalfIcon"
        ),
    ),
    "mdi-music-note-off": React.lazy(() =>
        import(
            /* webpackChunkName: "MusicNoteOffIcon" */
            "mdi-react/MusicNoteOffIcon"
        ),
    ),
    "mdi-music-note-quarter": React.lazy(() =>
        import(
            /* webpackChunkName: "MusicNoteQuarterIcon" */
            "mdi-react/MusicNoteQuarterIcon"
        ),
    ),
    "mdi-music-note-sixteenth": React.lazy(() =>
        import(
            /* webpackChunkName: "MusicNoteSixteenthIcon" */
            "mdi-react/MusicNoteSixteenthIcon"
        ),
    ),
    "mdi-music-note-whole": React.lazy(() =>
        import(
            /* webpackChunkName: "MusicNoteWholeIcon" */
            "mdi-react/MusicNoteWholeIcon"
        ),
    ),
    "mdi-music-note": React.lazy(() =>
        import(
            /* webpackChunkName: "MusicNoteIcon" */
            "mdi-react/MusicNoteIcon"
        ),
    ),
    "mdi-music-off": React.lazy(() =>
        import(
            /* webpackChunkName: "MusicOffIcon" */
            "mdi-react/MusicOffIcon"
        ),
    ),
    "mdi-music": React.lazy(() =>
        import(
            /* webpackChunkName: "MusicIcon" */
            "mdi-react/MusicIcon"
        ),
    ),
    "mdi-nas": React.lazy(() =>
        import(
            /* webpackChunkName: "NasIcon" */
            "mdi-react/NasIcon"
        ),
    ),
    "mdi-nativescript": React.lazy(() =>
        import(
            /* webpackChunkName: "NativescriptIcon" */
            "mdi-react/NativescriptIcon"
        ),
    ),
    "mdi-nature-people": React.lazy(() =>
        import(
            /* webpackChunkName: "NaturePeopleIcon" */
            "mdi-react/NaturePeopleIcon"
        ),
    ),
    "mdi-nature": React.lazy(() =>
        import(
            /* webpackChunkName: "NatureIcon" */
            "mdi-react/NatureIcon"
        ),
    ),
    "mdi-navigation": React.lazy(() =>
        import(
            /* webpackChunkName: "NavigationIcon" */
            "mdi-react/NavigationIcon"
        ),
    ),
    "mdi-near-me": React.lazy(() =>
        import(
            /* webpackChunkName: "NearMeIcon" */
            "mdi-react/NearMeIcon"
        ),
    ),
    "mdi-needle": React.lazy(() =>
        import(
            /* webpackChunkName: "NeedleIcon" */
            "mdi-react/NeedleIcon"
        ),
    ),
    "mdi-netflix": React.lazy(() =>
        import(
            /* webpackChunkName: "NetflixIcon" */
            "mdi-react/NetflixIcon"
        ),
    ),
    "mdi-network-strength-1-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "NetworkStrength1AlertIcon" */
            "mdi-react/NetworkStrength1AlertIcon"
        ),
    ),
    "mdi-network-strength-1": React.lazy(() =>
        import(
            /* webpackChunkName: "NetworkStrength1Icon" */
            "mdi-react/NetworkStrength1Icon"
        ),
    ),
    "mdi-network-strength-2-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "NetworkStrength2AlertIcon" */
            "mdi-react/NetworkStrength2AlertIcon"
        ),
    ),
    "mdi-network-strength-2": React.lazy(() =>
        import(
            /* webpackChunkName: "NetworkStrength2Icon" */
            "mdi-react/NetworkStrength2Icon"
        ),
    ),
    "mdi-network-strength-3-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "NetworkStrength3AlertIcon" */
            "mdi-react/NetworkStrength3AlertIcon"
        ),
    ),
    "mdi-network-strength-3": React.lazy(() =>
        import(
            /* webpackChunkName: "NetworkStrength3Icon" */
            "mdi-react/NetworkStrength3Icon"
        ),
    ),
    "mdi-network-strength-4-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "NetworkStrength4AlertIcon" */
            "mdi-react/NetworkStrength4AlertIcon"
        ),
    ),
    "mdi-network-strength-4": React.lazy(() =>
        import(
            /* webpackChunkName: "NetworkStrength4Icon" */
            "mdi-react/NetworkStrength4Icon"
        ),
    ),
    "mdi-network-strength-off-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "NetworkStrengthOffOutlineIcon" */
            "mdi-react/NetworkStrengthOffOutlineIcon"
        ),
    ),
    "mdi-network-strength-off": React.lazy(() =>
        import(
            /* webpackChunkName: "NetworkStrengthOffIcon" */
            "mdi-react/NetworkStrengthOffIcon"
        ),
    ),
    "mdi-network-strength-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "NetworkStrengthOutlineIcon" */
            "mdi-react/NetworkStrengthOutlineIcon"
        ),
    ),
    "mdi-network": React.lazy(() =>
        import(
            /* webpackChunkName: "NetworkIcon" */
            "mdi-react/NetworkIcon"
        ),
    ),
    "mdi-new-box": React.lazy(() =>
        import(
            /* webpackChunkName: "NewBoxIcon" */
            "mdi-react/NewBoxIcon"
        ),
    ),
    "mdi-newspaper": React.lazy(() =>
        import(
            /* webpackChunkName: "NewspaperIcon" */
            "mdi-react/NewspaperIcon"
        ),
    ),
    "mdi-nfc-tap": React.lazy(() =>
        import(
            /* webpackChunkName: "NfcTapIcon" */
            "mdi-react/NfcTapIcon"
        ),
    ),
    "mdi-nfc-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "NfcVariantIcon" */
            "mdi-react/NfcVariantIcon"
        ),
    ),
    "mdi-nfc": React.lazy(() =>
        import(
            /* webpackChunkName: "NfcIcon" */
            "mdi-react/NfcIcon"
        ),
    ),
    "mdi-ninja": React.lazy(() =>
        import(
            /* webpackChunkName: "NinjaIcon" */
            "mdi-react/NinjaIcon"
        ),
    ),
    "mdi-nintendo-switch": React.lazy(() =>
        import(
            /* webpackChunkName: "NintendoSwitchIcon" */
            "mdi-react/NintendoSwitchIcon"
        ),
    ),
    "mdi-nodejs": React.lazy(() =>
        import(
            /* webpackChunkName: "NodejsIcon" */
            "mdi-react/NodejsIcon"
        ),
    ),
    "mdi-not-equal-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "NotEqualVariantIcon" */
            "mdi-react/NotEqualVariantIcon"
        ),
    ),
    "mdi-not-equal": React.lazy(() =>
        import(
            /* webpackChunkName: "NotEqualIcon" */
            "mdi-react/NotEqualIcon"
        ),
    ),
    "mdi-note-multiple-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "NoteMultipleOutlineIcon" */
            "mdi-react/NoteMultipleOutlineIcon"
        ),
    ),
    "mdi-note-multiple": React.lazy(() =>
        import(
            /* webpackChunkName: "NoteMultipleIcon" */
            "mdi-react/NoteMultipleIcon"
        ),
    ),
    "mdi-note-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "NoteOutlineIcon" */
            "mdi-react/NoteOutlineIcon"
        ),
    ),
    "mdi-note-plus-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "NotePlusOutlineIcon" */
            "mdi-react/NotePlusOutlineIcon"
        ),
    ),
    "mdi-note-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "NotePlusIcon" */
            "mdi-react/NotePlusIcon"
        ),
    ),
    "mdi-note-text": React.lazy(() =>
        import(
            /* webpackChunkName: "NoteTextIcon" */
            "mdi-react/NoteTextIcon"
        ),
    ),
    "mdi-note": React.lazy(() =>
        import(
            /* webpackChunkName: "NoteIcon" */
            "mdi-react/NoteIcon"
        ),
    ),
    "mdi-notebook": React.lazy(() =>
        import(
            /* webpackChunkName: "NotebookIcon" */
            "mdi-react/NotebookIcon"
        ),
    ),
    "mdi-notification-clear-all": React.lazy(() =>
        import(
            /* webpackChunkName: "NotificationClearAllIcon" */
            "mdi-react/NotificationClearAllIcon"
        ),
    ),
    "mdi-npm-variant-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "NpmVariantOutlineIcon" */
            "mdi-react/NpmVariantOutlineIcon"
        ),
    ),
    "mdi-npm-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "NpmVariantIcon" */
            "mdi-react/NpmVariantIcon"
        ),
    ),
    "mdi-npm": React.lazy(() =>
        import(
            /* webpackChunkName: "NpmIcon" */
            "mdi-react/NpmIcon"
        ),
    ),
    "mdi-nuke": React.lazy(() =>
        import(
            /* webpackChunkName: "NukeIcon" */
            "mdi-react/NukeIcon"
        ),
    ),
    "mdi-null": React.lazy(() =>
        import(
            /* webpackChunkName: "NullIcon" */
            "mdi-react/NullIcon"
        ),
    ),
    "mdi-numeric-0-box-multiple-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "Numeric0BoxMultipleOutlineIcon" */
            "mdi-react/Numeric0BoxMultipleOutlineIcon"
        ),
    ),
    "mdi-numeric-0-box-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "Numeric0BoxOutlineIcon" */
            "mdi-react/Numeric0BoxOutlineIcon"
        ),
    ),
    "mdi-numeric-0-box": React.lazy(() =>
        import(
            /* webpackChunkName: "Numeric0BoxIcon" */
            "mdi-react/Numeric0BoxIcon"
        ),
    ),
    "mdi-numeric-1-box-multiple-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "Numeric1BoxMultipleOutlineIcon" */
            "mdi-react/Numeric1BoxMultipleOutlineIcon"
        ),
    ),
    "mdi-numeric-1-box-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "Numeric1BoxOutlineIcon" */
            "mdi-react/Numeric1BoxOutlineIcon"
        ),
    ),
    "mdi-numeric-1-box": React.lazy(() =>
        import(
            /* webpackChunkName: "Numeric1BoxIcon" */
            "mdi-react/Numeric1BoxIcon"
        ),
    ),
    "mdi-numeric-2-box-multiple-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "Numeric2BoxMultipleOutlineIcon" */
            "mdi-react/Numeric2BoxMultipleOutlineIcon"
        ),
    ),
    "mdi-numeric-2-box-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "Numeric2BoxOutlineIcon" */
            "mdi-react/Numeric2BoxOutlineIcon"
        ),
    ),
    "mdi-numeric-2-box": React.lazy(() =>
        import(
            /* webpackChunkName: "Numeric2BoxIcon" */
            "mdi-react/Numeric2BoxIcon"
        ),
    ),
    "mdi-numeric-3-box-multiple-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "Numeric3BoxMultipleOutlineIcon" */
            "mdi-react/Numeric3BoxMultipleOutlineIcon"
        ),
    ),
    "mdi-numeric-3-box-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "Numeric3BoxOutlineIcon" */
            "mdi-react/Numeric3BoxOutlineIcon"
        ),
    ),
    "mdi-numeric-3-box": React.lazy(() =>
        import(
            /* webpackChunkName: "Numeric3BoxIcon" */
            "mdi-react/Numeric3BoxIcon"
        ),
    ),
    "mdi-numeric-4-box-multiple-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "Numeric4BoxMultipleOutlineIcon" */
            "mdi-react/Numeric4BoxMultipleOutlineIcon"
        ),
    ),
    "mdi-numeric-4-box-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "Numeric4BoxOutlineIcon" */
            "mdi-react/Numeric4BoxOutlineIcon"
        ),
    ),
    "mdi-numeric-4-box": React.lazy(() =>
        import(
            /* webpackChunkName: "Numeric4BoxIcon" */
            "mdi-react/Numeric4BoxIcon"
        ),
    ),
    "mdi-numeric-5-box-multiple-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "Numeric5BoxMultipleOutlineIcon" */
            "mdi-react/Numeric5BoxMultipleOutlineIcon"
        ),
    ),
    "mdi-numeric-5-box-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "Numeric5BoxOutlineIcon" */
            "mdi-react/Numeric5BoxOutlineIcon"
        ),
    ),
    "mdi-numeric-5-box": React.lazy(() =>
        import(
            /* webpackChunkName: "Numeric5BoxIcon" */
            "mdi-react/Numeric5BoxIcon"
        ),
    ),
    "mdi-numeric-6-box-multiple-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "Numeric6BoxMultipleOutlineIcon" */
            "mdi-react/Numeric6BoxMultipleOutlineIcon"
        ),
    ),
    "mdi-numeric-6-box-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "Numeric6BoxOutlineIcon" */
            "mdi-react/Numeric6BoxOutlineIcon"
        ),
    ),
    "mdi-numeric-6-box": React.lazy(() =>
        import(
            /* webpackChunkName: "Numeric6BoxIcon" */
            "mdi-react/Numeric6BoxIcon"
        ),
    ),
    "mdi-numeric-7-box-multiple-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "Numeric7BoxMultipleOutlineIcon" */
            "mdi-react/Numeric7BoxMultipleOutlineIcon"
        ),
    ),
    "mdi-numeric-7-box-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "Numeric7BoxOutlineIcon" */
            "mdi-react/Numeric7BoxOutlineIcon"
        ),
    ),
    "mdi-numeric-7-box": React.lazy(() =>
        import(
            /* webpackChunkName: "Numeric7BoxIcon" */
            "mdi-react/Numeric7BoxIcon"
        ),
    ),
    "mdi-numeric-8-box-multiple-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "Numeric8BoxMultipleOutlineIcon" */
            "mdi-react/Numeric8BoxMultipleOutlineIcon"
        ),
    ),
    "mdi-numeric-8-box-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "Numeric8BoxOutlineIcon" */
            "mdi-react/Numeric8BoxOutlineIcon"
        ),
    ),
    "mdi-numeric-8-box": React.lazy(() =>
        import(
            /* webpackChunkName: "Numeric8BoxIcon" */
            "mdi-react/Numeric8BoxIcon"
        ),
    ),
    "mdi-numeric-9-box-multiple-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "Numeric9BoxMultipleOutlineIcon" */
            "mdi-react/Numeric9BoxMultipleOutlineIcon"
        ),
    ),
    "mdi-numeric-9-box-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "Numeric9BoxOutlineIcon" */
            "mdi-react/Numeric9BoxOutlineIcon"
        ),
    ),
    "mdi-numeric-9-box": React.lazy(() =>
        import(
            /* webpackChunkName: "Numeric9BoxIcon" */
            "mdi-react/Numeric9BoxIcon"
        ),
    ),
    "mdi-numeric-9-plus-box-multiple-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "Numeric9PlusBoxMultipleOutlineIcon" */
            "mdi-react/Numeric9PlusBoxMultipleOutlineIcon"
        ),
    ),
    "mdi-numeric-9-plus-box-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "Numeric9PlusBoxOutlineIcon" */
            "mdi-react/Numeric9PlusBoxOutlineIcon"
        ),
    ),
    "mdi-numeric-9-plus-box": React.lazy(() =>
        import(
            /* webpackChunkName: "Numeric9PlusBoxIcon" */
            "mdi-react/Numeric9PlusBoxIcon"
        ),
    ),
    "mdi-numeric": React.lazy(() =>
        import(
            /* webpackChunkName: "NumericIcon" */
            "mdi-react/NumericIcon"
        ),
    ),
    "mdi-nut": React.lazy(() =>
        import(
            /* webpackChunkName: "NutIcon" */
            "mdi-react/NutIcon"
        ),
    ),
    "mdi-nutrition": React.lazy(() =>
        import(
            /* webpackChunkName: "NutritionIcon" */
            "mdi-react/NutritionIcon"
        ),
    ),
    "mdi-oar": React.lazy(() =>
        import(
            /* webpackChunkName: "OarIcon" */
            "mdi-react/OarIcon"
        ),
    ),
    "mdi-octagon-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "OctagonOutlineIcon" */
            "mdi-react/OctagonOutlineIcon"
        ),
    ),
    "mdi-octagon": React.lazy(() =>
        import(
            /* webpackChunkName: "OctagonIcon" */
            "mdi-react/OctagonIcon"
        ),
    ),
    "mdi-octagram-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "OctagramOutlineIcon" */
            "mdi-react/OctagramOutlineIcon"
        ),
    ),
    "mdi-octagram": React.lazy(() =>
        import(
            /* webpackChunkName: "OctagramIcon" */
            "mdi-react/OctagramIcon"
        ),
    ),
    "mdi-odnoklassniki": React.lazy(() =>
        import(
            /* webpackChunkName: "OdnoklassnikiIcon" */
            "mdi-react/OdnoklassnikiIcon"
        ),
    ),
    "mdi-office-building": React.lazy(() =>
        import(
            /* webpackChunkName: "OfficeBuildingIcon" */
            "mdi-react/OfficeBuildingIcon"
        ),
    ),
    "mdi-office": React.lazy(() =>
        import(
            /* webpackChunkName: "OfficeIcon" */
            "mdi-react/OfficeIcon"
        ),
    ),
    "mdi-oil-temperature": React.lazy(() =>
        import(
            /* webpackChunkName: "OilTemperatureIcon" */
            "mdi-react/OilTemperatureIcon"
        ),
    ),
    "mdi-oil": React.lazy(() =>
        import(
            /* webpackChunkName: "OilIcon" */
            "mdi-react/OilIcon"
        ),
    ),
    "mdi-omega": React.lazy(() =>
        import(
            /* webpackChunkName: "OmegaIcon" */
            "mdi-react/OmegaIcon"
        ),
    ),
    "mdi-onedrive": React.lazy(() =>
        import(
            /* webpackChunkName: "OnedriveIcon" */
            "mdi-react/OnedriveIcon"
        ),
    ),
    "mdi-onenote": React.lazy(() =>
        import(
            /* webpackChunkName: "OnenoteIcon" */
            "mdi-react/OnenoteIcon"
        ),
    ),
    "mdi-onepassword": React.lazy(() =>
        import(
            /* webpackChunkName: "OnepasswordIcon" */
            "mdi-react/OnepasswordIcon"
        ),
    ),
    "mdi-opacity": React.lazy(() =>
        import(
            /* webpackChunkName: "OpacityIcon" */
            "mdi-react/OpacityIcon"
        ),
    ),
    "mdi-open-in-app": React.lazy(() =>
        import(
            /* webpackChunkName: "OpenInAppIcon" */
            "mdi-react/OpenInAppIcon"
        ),
    ),
    "mdi-open-in-new": React.lazy(() =>
        import(
            /* webpackChunkName: "OpenInNewIcon" */
            "mdi-react/OpenInNewIcon"
        ),
    ),
    "mdi-openid": React.lazy(() =>
        import(
            /* webpackChunkName: "OpenidIcon" */
            "mdi-react/OpenidIcon"
        ),
    ),
    "mdi-opera": React.lazy(() =>
        import(
            /* webpackChunkName: "OperaIcon" */
            "mdi-react/OperaIcon"
        ),
    ),
    "mdi-orbit": React.lazy(() =>
        import(
            /* webpackChunkName: "OrbitIcon" */
            "mdi-react/OrbitIcon"
        ),
    ),
    "mdi-ornament-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "OrnamentVariantIcon" */
            "mdi-react/OrnamentVariantIcon"
        ),
    ),
    "mdi-ornament": React.lazy(() =>
        import(
            /* webpackChunkName: "OrnamentIcon" */
            "mdi-react/OrnamentIcon"
        ),
    ),
    "mdi-owl": React.lazy(() =>
        import(
            /* webpackChunkName: "OwlIcon" */
            "mdi-react/OwlIcon"
        ),
    ),
    "mdi-package-down": React.lazy(() =>
        import(
            /* webpackChunkName: "PackageDownIcon" */
            "mdi-react/PackageDownIcon"
        ),
    ),
    "mdi-package-up": React.lazy(() =>
        import(
            /* webpackChunkName: "PackageUpIcon" */
            "mdi-react/PackageUpIcon"
        ),
    ),
    "mdi-package-variant-closed": React.lazy(() =>
        import(
            /* webpackChunkName: "PackageVariantClosedIcon" */
            "mdi-react/PackageVariantClosedIcon"
        ),
    ),
    "mdi-package-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "PackageVariantIcon" */
            "mdi-react/PackageVariantIcon"
        ),
    ),
    "mdi-package": React.lazy(() =>
        import(
            /* webpackChunkName: "PackageIcon" */
            "mdi-react/PackageIcon"
        ),
    ),
    "mdi-page-first": React.lazy(() =>
        import(
            /* webpackChunkName: "PageFirstIcon" */
            "mdi-react/PageFirstIcon"
        ),
    ),
    "mdi-page-last": React.lazy(() =>
        import(
            /* webpackChunkName: "PageLastIcon" */
            "mdi-react/PageLastIcon"
        ),
    ),
    "mdi-page-layout-body": React.lazy(() =>
        import(
            /* webpackChunkName: "PageLayoutBodyIcon" */
            "mdi-react/PageLayoutBodyIcon"
        ),
    ),
    "mdi-page-layout-footer": React.lazy(() =>
        import(
            /* webpackChunkName: "PageLayoutFooterIcon" */
            "mdi-react/PageLayoutFooterIcon"
        ),
    ),
    "mdi-page-layout-header": React.lazy(() =>
        import(
            /* webpackChunkName: "PageLayoutHeaderIcon" */
            "mdi-react/PageLayoutHeaderIcon"
        ),
    ),
    "mdi-page-layout-sidebar-left": React.lazy(() =>
        import(
            /* webpackChunkName: "PageLayoutSidebarLeftIcon" */
            "mdi-react/PageLayoutSidebarLeftIcon"
        ),
    ),
    "mdi-page-layout-sidebar-right": React.lazy(() =>
        import(
            /* webpackChunkName: "PageLayoutSidebarRightIcon" */
            "mdi-react/PageLayoutSidebarRightIcon"
        ),
    ),
    "mdi-palette-advanced": React.lazy(() =>
        import(
            /* webpackChunkName: "PaletteAdvancedIcon" */
            "mdi-react/PaletteAdvancedIcon"
        ),
    ),
    "mdi-palette-swatch": React.lazy(() =>
        import(
            /* webpackChunkName: "PaletteSwatchIcon" */
            "mdi-react/PaletteSwatchIcon"
        ),
    ),
    "mdi-palette": React.lazy(() =>
        import(
            /* webpackChunkName: "PaletteIcon" */
            "mdi-react/PaletteIcon"
        ),
    ),
    "mdi-panda": React.lazy(() =>
        import(
            /* webpackChunkName: "PandaIcon" */
            "mdi-react/PandaIcon"
        ),
    ),
    "mdi-pandora": React.lazy(() =>
        import(
            /* webpackChunkName: "PandoraIcon" */
            "mdi-react/PandoraIcon"
        ),
    ),
    "mdi-panorama-fisheye": React.lazy(() =>
        import(
            /* webpackChunkName: "PanoramaFisheyeIcon" */
            "mdi-react/PanoramaFisheyeIcon"
        ),
    ),
    "mdi-panorama-horizontal": React.lazy(() =>
        import(
            /* webpackChunkName: "PanoramaHorizontalIcon" */
            "mdi-react/PanoramaHorizontalIcon"
        ),
    ),
    "mdi-panorama-vertical": React.lazy(() =>
        import(
            /* webpackChunkName: "PanoramaVerticalIcon" */
            "mdi-react/PanoramaVerticalIcon"
        ),
    ),
    "mdi-panorama-wide-angle": React.lazy(() =>
        import(
            /* webpackChunkName: "PanoramaWideAngleIcon" */
            "mdi-react/PanoramaWideAngleIcon"
        ),
    ),
    "mdi-panorama": React.lazy(() =>
        import(
            /* webpackChunkName: "PanoramaIcon" */
            "mdi-react/PanoramaIcon"
        ),
    ),
    "mdi-paper-cut-vertical": React.lazy(() =>
        import(
            /* webpackChunkName: "PaperCutVerticalIcon" */
            "mdi-react/PaperCutVerticalIcon"
        ),
    ),
    "mdi-paperclip": React.lazy(() =>
        import(
            /* webpackChunkName: "PaperclipIcon" */
            "mdi-react/PaperclipIcon"
        ),
    ),
    "mdi-parking": React.lazy(() =>
        import(
            /* webpackChunkName: "ParkingIcon" */
            "mdi-react/ParkingIcon"
        ),
    ),
    "mdi-passport": React.lazy(() =>
        import(
            /* webpackChunkName: "PassportIcon" */
            "mdi-react/PassportIcon"
        ),
    ),
    "mdi-patreon": React.lazy(() =>
        import(
            /* webpackChunkName: "PatreonIcon" */
            "mdi-react/PatreonIcon"
        ),
    ),
    "mdi-pause-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "PauseCircleOutlineIcon" */
            "mdi-react/PauseCircleOutlineIcon"
        ),
    ),
    "mdi-pause-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "PauseCircleIcon" */
            "mdi-react/PauseCircleIcon"
        ),
    ),
    "mdi-pause-octagon-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "PauseOctagonOutlineIcon" */
            "mdi-react/PauseOctagonOutlineIcon"
        ),
    ),
    "mdi-pause-octagon": React.lazy(() =>
        import(
            /* webpackChunkName: "PauseOctagonIcon" */
            "mdi-react/PauseOctagonIcon"
        ),
    ),
    "mdi-pause": React.lazy(() =>
        import(
            /* webpackChunkName: "PauseIcon" */
            "mdi-react/PauseIcon"
        ),
    ),
    "mdi-paw-off": React.lazy(() =>
        import(
            /* webpackChunkName: "PawOffIcon" */
            "mdi-react/PawOffIcon"
        ),
    ),
    "mdi-paw": React.lazy(() =>
        import(
            /* webpackChunkName: "PawIcon" */
            "mdi-react/PawIcon"
        ),
    ),
    "mdi-paypal": React.lazy(() =>
        import(
            /* webpackChunkName: "PaypalIcon" */
            "mdi-react/PaypalIcon"
        ),
    ),
    "mdi-peace": React.lazy(() =>
        import(
            /* webpackChunkName: "PeaceIcon" */
            "mdi-react/PeaceIcon"
        ),
    ),
    "mdi-pen": React.lazy(() =>
        import(
            /* webpackChunkName: "PenIcon" */
            "mdi-react/PenIcon"
        ),
    ),
    "mdi-pencil-box-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "PencilBoxOutlineIcon" */
            "mdi-react/PencilBoxOutlineIcon"
        ),
    ),
    "mdi-pencil-box": React.lazy(() =>
        import(
            /* webpackChunkName: "PencilBoxIcon" */
            "mdi-react/PencilBoxIcon"
        ),
    ),
    "mdi-pencil-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "PencilCircleOutlineIcon" */
            "mdi-react/PencilCircleOutlineIcon"
        ),
    ),
    "mdi-pencil-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "PencilCircleIcon" */
            "mdi-react/PencilCircleIcon"
        ),
    ),
    "mdi-pencil-lock": React.lazy(() =>
        import(
            /* webpackChunkName: "PencilLockIcon" */
            "mdi-react/PencilLockIcon"
        ),
    ),
    "mdi-pencil-off": React.lazy(() =>
        import(
            /* webpackChunkName: "PencilOffIcon" */
            "mdi-react/PencilOffIcon"
        ),
    ),
    "mdi-pencil": React.lazy(() =>
        import(
            /* webpackChunkName: "PencilIcon" */
            "mdi-react/PencilIcon"
        ),
    ),
    "mdi-pentagon-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "PentagonOutlineIcon" */
            "mdi-react/PentagonOutlineIcon"
        ),
    ),
    "mdi-pentagon": React.lazy(() =>
        import(
            /* webpackChunkName: "PentagonIcon" */
            "mdi-react/PentagonIcon"
        ),
    ),
    "mdi-percent": React.lazy(() =>
        import(
            /* webpackChunkName: "PercentIcon" */
            "mdi-react/PercentIcon"
        ),
    ),
    "mdi-periodic-table-co-2": React.lazy(() =>
        import(
            /* webpackChunkName: "PeriodicTableCo2Icon" */
            "mdi-react/PeriodicTableCo2Icon"
        ),
    ),
    "mdi-periodic-table": React.lazy(() =>
        import(
            /* webpackChunkName: "PeriodicTableIcon" */
            "mdi-react/PeriodicTableIcon"
        ),
    ),
    "mdi-periscope": React.lazy(() =>
        import(
            /* webpackChunkName: "PeriscopeIcon" */
            "mdi-react/PeriscopeIcon"
        ),
    ),
    "mdi-pharmacy": React.lazy(() =>
        import(
            /* webpackChunkName: "PharmacyIcon" */
            "mdi-react/PharmacyIcon"
        ),
    ),
    "mdi-phone-bluetooth": React.lazy(() =>
        import(
            /* webpackChunkName: "PhoneBluetoothIcon" */
            "mdi-react/PhoneBluetoothIcon"
        ),
    ),
    "mdi-phone-classic": React.lazy(() =>
        import(
            /* webpackChunkName: "PhoneClassicIcon" */
            "mdi-react/PhoneClassicIcon"
        ),
    ),
    "mdi-phone-forward": React.lazy(() =>
        import(
            /* webpackChunkName: "PhoneForwardIcon" */
            "mdi-react/PhoneForwardIcon"
        ),
    ),
    "mdi-phone-hangup": React.lazy(() =>
        import(
            /* webpackChunkName: "PhoneHangupIcon" */
            "mdi-react/PhoneHangupIcon"
        ),
    ),
    "mdi-phone-in-talk": React.lazy(() =>
        import(
            /* webpackChunkName: "PhoneInTalkIcon" */
            "mdi-react/PhoneInTalkIcon"
        ),
    ),
    "mdi-phone-incoming": React.lazy(() =>
        import(
            /* webpackChunkName: "PhoneIncomingIcon" */
            "mdi-react/PhoneIncomingIcon"
        ),
    ),
    "mdi-phone-locked": React.lazy(() =>
        import(
            /* webpackChunkName: "PhoneLockedIcon" */
            "mdi-react/PhoneLockedIcon"
        ),
    ),
    "mdi-phone-log": React.lazy(() =>
        import(
            /* webpackChunkName: "PhoneLogIcon" */
            "mdi-react/PhoneLogIcon"
        ),
    ),
    "mdi-phone-minus": React.lazy(() =>
        import(
            /* webpackChunkName: "PhoneMinusIcon" */
            "mdi-react/PhoneMinusIcon"
        ),
    ),
    "mdi-phone-missed": React.lazy(() =>
        import(
            /* webpackChunkName: "PhoneMissedIcon" */
            "mdi-react/PhoneMissedIcon"
        ),
    ),
    "mdi-phone-outgoing": React.lazy(() =>
        import(
            /* webpackChunkName: "PhoneOutgoingIcon" */
            "mdi-react/PhoneOutgoingIcon"
        ),
    ),
    "mdi-phone-paused": React.lazy(() =>
        import(
            /* webpackChunkName: "PhonePausedIcon" */
            "mdi-react/PhonePausedIcon"
        ),
    ),
    "mdi-phone-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "PhonePlusIcon" */
            "mdi-react/PhonePlusIcon"
        ),
    ),
    "mdi-phone-return": React.lazy(() =>
        import(
            /* webpackChunkName: "PhoneReturnIcon" */
            "mdi-react/PhoneReturnIcon"
        ),
    ),
    "mdi-phone-rotate-landscape": React.lazy(() =>
        import(
            /* webpackChunkName: "PhoneRotateLandscapeIcon" */
            "mdi-react/PhoneRotateLandscapeIcon"
        ),
    ),
    "mdi-phone-rotate-portrait": React.lazy(() =>
        import(
            /* webpackChunkName: "PhoneRotatePortraitIcon" */
            "mdi-react/PhoneRotatePortraitIcon"
        ),
    ),
    "mdi-phone-settings": React.lazy(() =>
        import(
            /* webpackChunkName: "PhoneSettingsIcon" */
            "mdi-react/PhoneSettingsIcon"
        ),
    ),
    "mdi-phone-voip": React.lazy(() =>
        import(
            /* webpackChunkName: "PhoneVoipIcon" */
            "mdi-react/PhoneVoipIcon"
        ),
    ),
    "mdi-phone": React.lazy(() =>
        import(
            /* webpackChunkName: "PhoneIcon" */
            "mdi-react/PhoneIcon"
        ),
    ),
    "mdi-pi-box": React.lazy(() =>
        import(
            /* webpackChunkName: "PiBoxIcon" */
            "mdi-react/PiBoxIcon"
        ),
    ),
    "mdi-pi": React.lazy(() =>
        import(
            /* webpackChunkName: "PiIcon" */
            "mdi-react/PiIcon"
        ),
    ),
    "mdi-piano": React.lazy(() =>
        import(
            /* webpackChunkName: "PianoIcon" */
            "mdi-react/PianoIcon"
        ),
    ),
    "mdi-pickaxe": React.lazy(() =>
        import(
            /* webpackChunkName: "PickaxeIcon" */
            "mdi-react/PickaxeIcon"
        ),
    ),
    "mdi-pier-crane": React.lazy(() =>
        import(
            /* webpackChunkName: "PierCraneIcon" */
            "mdi-react/PierCraneIcon"
        ),
    ),
    "mdi-pier": React.lazy(() =>
        import(
            /* webpackChunkName: "PierIcon" */
            "mdi-react/PierIcon"
        ),
    ),
    "mdi-pig": React.lazy(() =>
        import(
            /* webpackChunkName: "PigIcon" */
            "mdi-react/PigIcon"
        ),
    ),
    "mdi-pill": React.lazy(() =>
        import(
            /* webpackChunkName: "PillIcon" */
            "mdi-react/PillIcon"
        ),
    ),
    "mdi-pillar": React.lazy(() =>
        import(
            /* webpackChunkName: "PillarIcon" */
            "mdi-react/PillarIcon"
        ),
    ),
    "mdi-pin-off-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "PinOffOutlineIcon" */
            "mdi-react/PinOffOutlineIcon"
        ),
    ),
    "mdi-pin-off": React.lazy(() =>
        import(
            /* webpackChunkName: "PinOffIcon" */
            "mdi-react/PinOffIcon"
        ),
    ),
    "mdi-pin-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "PinOutlineIcon" */
            "mdi-react/PinOutlineIcon"
        ),
    ),
    "mdi-pin": React.lazy(() =>
        import(
            /* webpackChunkName: "PinIcon" */
            "mdi-react/PinIcon"
        ),
    ),
    "mdi-pine-tree-box": React.lazy(() =>
        import(
            /* webpackChunkName: "PineTreeBoxIcon" */
            "mdi-react/PineTreeBoxIcon"
        ),
    ),
    "mdi-pine-tree": React.lazy(() =>
        import(
            /* webpackChunkName: "PineTreeIcon" */
            "mdi-react/PineTreeIcon"
        ),
    ),
    "mdi-pinterest-box": React.lazy(() =>
        import(
            /* webpackChunkName: "PinterestBoxIcon" */
            "mdi-react/PinterestBoxIcon"
        ),
    ),
    "mdi-pinterest": React.lazy(() =>
        import(
            /* webpackChunkName: "PinterestIcon" */
            "mdi-react/PinterestIcon"
        ),
    ),
    "mdi-pipe-disconnected": React.lazy(() =>
        import(
            /* webpackChunkName: "PipeDisconnectedIcon" */
            "mdi-react/PipeDisconnectedIcon"
        ),
    ),
    "mdi-pipe-leak": React.lazy(() =>
        import(
            /* webpackChunkName: "PipeLeakIcon" */
            "mdi-react/PipeLeakIcon"
        ),
    ),
    "mdi-pipe": React.lazy(() =>
        import(
            /* webpackChunkName: "PipeIcon" */
            "mdi-react/PipeIcon"
        ),
    ),
    "mdi-pistol": React.lazy(() =>
        import(
            /* webpackChunkName: "PistolIcon" */
            "mdi-react/PistolIcon"
        ),
    ),
    "mdi-piston": React.lazy(() =>
        import(
            /* webpackChunkName: "PistonIcon" */
            "mdi-react/PistonIcon"
        ),
    ),
    "mdi-pizza": React.lazy(() =>
        import(
            /* webpackChunkName: "PizzaIcon" */
            "mdi-react/PizzaIcon"
        ),
    ),
    "mdi-plane-shield": React.lazy(() =>
        import(
            /* webpackChunkName: "PlaneShieldIcon" */
            "mdi-react/PlaneShieldIcon"
        ),
    ),
    "mdi-play-box-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "PlayBoxOutlineIcon" */
            "mdi-react/PlayBoxOutlineIcon"
        ),
    ),
    "mdi-play-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "PlayCircleOutlineIcon" */
            "mdi-react/PlayCircleOutlineIcon"
        ),
    ),
    "mdi-play-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "PlayCircleIcon" */
            "mdi-react/PlayCircleIcon"
        ),
    ),
    "mdi-play-network": React.lazy(() =>
        import(
            /* webpackChunkName: "PlayNetworkIcon" */
            "mdi-react/PlayNetworkIcon"
        ),
    ),
    "mdi-play-pause": React.lazy(() =>
        import(
            /* webpackChunkName: "PlayPauseIcon" */
            "mdi-react/PlayPauseIcon"
        ),
    ),
    "mdi-play-protected-content": React.lazy(() =>
        import(
            /* webpackChunkName: "PlayProtectedContentIcon" */
            "mdi-react/PlayProtectedContentIcon"
        ),
    ),
    "mdi-play-speed": React.lazy(() =>
        import(
            /* webpackChunkName: "PlaySpeedIcon" */
            "mdi-react/PlaySpeedIcon"
        ),
    ),
    "mdi-play": React.lazy(() =>
        import(
            /* webpackChunkName: "PlayIcon" */
            "mdi-react/PlayIcon"
        ),
    ),
    "mdi-playlist-check": React.lazy(() =>
        import(
            /* webpackChunkName: "PlaylistCheckIcon" */
            "mdi-react/PlaylistCheckIcon"
        ),
    ),
    "mdi-playlist-edit": React.lazy(() =>
        import(
            /* webpackChunkName: "PlaylistEditIcon" */
            "mdi-react/PlaylistEditIcon"
        ),
    ),
    "mdi-playlist-minus": React.lazy(() =>
        import(
            /* webpackChunkName: "PlaylistMinusIcon" */
            "mdi-react/PlaylistMinusIcon"
        ),
    ),
    "mdi-playlist-play": React.lazy(() =>
        import(
            /* webpackChunkName: "PlaylistPlayIcon" */
            "mdi-react/PlaylistPlayIcon"
        ),
    ),
    "mdi-playlist-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "PlaylistPlusIcon" */
            "mdi-react/PlaylistPlusIcon"
        ),
    ),
    "mdi-playlist-remove": React.lazy(() =>
        import(
            /* webpackChunkName: "PlaylistRemoveIcon" */
            "mdi-react/PlaylistRemoveIcon"
        ),
    ),
    "mdi-playstation": React.lazy(() =>
        import(
            /* webpackChunkName: "PlaystationIcon" */
            "mdi-react/PlaystationIcon"
        ),
    ),
    "mdi-plex": React.lazy(() =>
        import(
            /* webpackChunkName: "PlexIcon" */
            "mdi-react/PlexIcon"
        ),
    ),
    "mdi-plus-box-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "PlusBoxOutlineIcon" */
            "mdi-react/PlusBoxOutlineIcon"
        ),
    ),
    "mdi-plus-box": React.lazy(() =>
        import(
            /* webpackChunkName: "PlusBoxIcon" */
            "mdi-react/PlusBoxIcon"
        ),
    ),
    "mdi-plus-circle-multiple-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "PlusCircleMultipleOutlineIcon" */
            "mdi-react/PlusCircleMultipleOutlineIcon"
        ),
    ),
    "mdi-plus-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "PlusCircleOutlineIcon" */
            "mdi-react/PlusCircleOutlineIcon"
        ),
    ),
    "mdi-plus-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "PlusCircleIcon" */
            "mdi-react/PlusCircleIcon"
        ),
    ),
    "mdi-plus-minus-box": React.lazy(() =>
        import(
            /* webpackChunkName: "PlusMinusBoxIcon" */
            "mdi-react/PlusMinusBoxIcon"
        ),
    ),
    "mdi-plus-minus": React.lazy(() =>
        import(
            /* webpackChunkName: "PlusMinusIcon" */
            "mdi-react/PlusMinusIcon"
        ),
    ),
    "mdi-plus-network": React.lazy(() =>
        import(
            /* webpackChunkName: "PlusNetworkIcon" */
            "mdi-react/PlusNetworkIcon"
        ),
    ),
    "mdi-plus-one": React.lazy(() =>
        import(
            /* webpackChunkName: "PlusOneIcon" */
            "mdi-react/PlusOneIcon"
        ),
    ),
    "mdi-plus-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "PlusOutlineIcon" */
            "mdi-react/PlusOutlineIcon"
        ),
    ),
    "mdi-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "PlusIcon" */
            "mdi-react/PlusIcon"
        ),
    ),
    "mdi-pocket": React.lazy(() =>
        import(
            /* webpackChunkName: "PocketIcon" */
            "mdi-react/PocketIcon"
        ),
    ),
    "mdi-podcast": React.lazy(() =>
        import(
            /* webpackChunkName: "PodcastIcon" */
            "mdi-react/PodcastIcon"
        ),
    ),
    "mdi-pokeball": React.lazy(() =>
        import(
            /* webpackChunkName: "PokeballIcon" */
            "mdi-react/PokeballIcon"
        ),
    ),
    "mdi-poker-chip": React.lazy(() =>
        import(
            /* webpackChunkName: "PokerChipIcon" */
            "mdi-react/PokerChipIcon"
        ),
    ),
    "mdi-polaroid": React.lazy(() =>
        import(
            /* webpackChunkName: "PolaroidIcon" */
            "mdi-react/PolaroidIcon"
        ),
    ),
    "mdi-poll-box": React.lazy(() =>
        import(
            /* webpackChunkName: "PollBoxIcon" */
            "mdi-react/PollBoxIcon"
        ),
    ),
    "mdi-poll": React.lazy(() =>
        import(
            /* webpackChunkName: "PollIcon" */
            "mdi-react/PollIcon"
        ),
    ),
    "mdi-polymer": React.lazy(() =>
        import(
            /* webpackChunkName: "PolymerIcon" */
            "mdi-react/PolymerIcon"
        ),
    ),
    "mdi-pool": React.lazy(() =>
        import(
            /* webpackChunkName: "PoolIcon" */
            "mdi-react/PoolIcon"
        ),
    ),
    "mdi-popcorn": React.lazy(() =>
        import(
            /* webpackChunkName: "PopcornIcon" */
            "mdi-react/PopcornIcon"
        ),
    ),
    "mdi-pot-mix": React.lazy(() =>
        import(
            /* webpackChunkName: "PotMixIcon" */
            "mdi-react/PotMixIcon"
        ),
    ),
    "mdi-pot": React.lazy(() =>
        import(
            /* webpackChunkName: "PotIcon" */
            "mdi-react/PotIcon"
        ),
    ),
    "mdi-pound-box": React.lazy(() =>
        import(
            /* webpackChunkName: "PoundBoxIcon" */
            "mdi-react/PoundBoxIcon"
        ),
    ),
    "mdi-pound": React.lazy(() =>
        import(
            /* webpackChunkName: "PoundIcon" */
            "mdi-react/PoundIcon"
        ),
    ),
    "mdi-power-cycle": React.lazy(() =>
        import(
            /* webpackChunkName: "PowerCycleIcon" */
            "mdi-react/PowerCycleIcon"
        ),
    ),
    "mdi-power-off": React.lazy(() =>
        import(
            /* webpackChunkName: "PowerOffIcon" */
            "mdi-react/PowerOffIcon"
        ),
    ),
    "mdi-power-on": React.lazy(() =>
        import(
            /* webpackChunkName: "PowerOnIcon" */
            "mdi-react/PowerOnIcon"
        ),
    ),
    "mdi-power-plug-off": React.lazy(() =>
        import(
            /* webpackChunkName: "PowerPlugOffIcon" */
            "mdi-react/PowerPlugOffIcon"
        ),
    ),
    "mdi-power-plug": React.lazy(() =>
        import(
            /* webpackChunkName: "PowerPlugIcon" */
            "mdi-react/PowerPlugIcon"
        ),
    ),
    "mdi-power-settings": React.lazy(() =>
        import(
            /* webpackChunkName: "PowerSettingsIcon" */
            "mdi-react/PowerSettingsIcon"
        ),
    ),
    "mdi-power-sleep": React.lazy(() =>
        import(
            /* webpackChunkName: "PowerSleepIcon" */
            "mdi-react/PowerSleepIcon"
        ),
    ),
    "mdi-power-socket-au": React.lazy(() =>
        import(
            /* webpackChunkName: "PowerSocketAuIcon" */
            "mdi-react/PowerSocketAuIcon"
        ),
    ),
    "mdi-power-socket-eu": React.lazy(() =>
        import(
            /* webpackChunkName: "PowerSocketEuIcon" */
            "mdi-react/PowerSocketEuIcon"
        ),
    ),
    "mdi-power-socket-uk": React.lazy(() =>
        import(
            /* webpackChunkName: "PowerSocketUkIcon" */
            "mdi-react/PowerSocketUkIcon"
        ),
    ),
    "mdi-power-socket-us": React.lazy(() =>
        import(
            /* webpackChunkName: "PowerSocketUsIcon" */
            "mdi-react/PowerSocketUsIcon"
        ),
    ),
    "mdi-power-socket": React.lazy(() =>
        import(
            /* webpackChunkName: "PowerSocketIcon" */
            "mdi-react/PowerSocketIcon"
        ),
    ),
    "mdi-power-standby": React.lazy(() =>
        import(
            /* webpackChunkName: "PowerStandbyIcon" */
            "mdi-react/PowerStandbyIcon"
        ),
    ),
    "mdi-power": React.lazy(() =>
        import(
            /* webpackChunkName: "PowerIcon" */
            "mdi-react/PowerIcon"
        ),
    ),
    "mdi-prescription": React.lazy(() =>
        import(
            /* webpackChunkName: "PrescriptionIcon" */
            "mdi-react/PrescriptionIcon"
        ),
    ),
    "mdi-presentation-play": React.lazy(() =>
        import(
            /* webpackChunkName: "PresentationPlayIcon" */
            "mdi-react/PresentationPlayIcon"
        ),
    ),
    "mdi-presentation": React.lazy(() =>
        import(
            /* webpackChunkName: "PresentationIcon" */
            "mdi-react/PresentationIcon"
        ),
    ),
    "mdi-printer-3-d": React.lazy(() =>
        import(
            /* webpackChunkName: "Printer3dIcon" */
            "mdi-react/Printer3dIcon"
        ),
    ),
    "mdi-printer-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "PrinterAlertIcon" */
            "mdi-react/PrinterAlertIcon"
        ),
    ),
    "mdi-printer-settings": React.lazy(() =>
        import(
            /* webpackChunkName: "PrinterSettingsIcon" */
            "mdi-react/PrinterSettingsIcon"
        ),
    ),
    "mdi-printer": React.lazy(() =>
        import(
            /* webpackChunkName: "PrinterIcon" */
            "mdi-react/PrinterIcon"
        ),
    ),
    "mdi-priority-high": React.lazy(() =>
        import(
            /* webpackChunkName: "PriorityHighIcon" */
            "mdi-react/PriorityHighIcon"
        ),
    ),
    "mdi-priority-low": React.lazy(() =>
        import(
            /* webpackChunkName: "PriorityLowIcon" */
            "mdi-react/PriorityLowIcon"
        ),
    ),
    "mdi-professional-hexagon": React.lazy(() =>
        import(
            /* webpackChunkName: "ProfessionalHexagonIcon" */
            "mdi-react/ProfessionalHexagonIcon"
        ),
    ),
    "mdi-progress-check": React.lazy(() =>
        import(
            /* webpackChunkName: "ProgressCheckIcon" */
            "mdi-react/ProgressCheckIcon"
        ),
    ),
    "mdi-progress-clock": React.lazy(() =>
        import(
            /* webpackChunkName: "ProgressClockIcon" */
            "mdi-react/ProgressClockIcon"
        ),
    ),
    "mdi-progress-download": React.lazy(() =>
        import(
            /* webpackChunkName: "ProgressDownloadIcon" */
            "mdi-react/ProgressDownloadIcon"
        ),
    ),
    "mdi-progress-upload": React.lazy(() =>
        import(
            /* webpackChunkName: "ProgressUploadIcon" */
            "mdi-react/ProgressUploadIcon"
        ),
    ),
    "mdi-projector-screen": React.lazy(() =>
        import(
            /* webpackChunkName: "ProjectorScreenIcon" */
            "mdi-react/ProjectorScreenIcon"
        ),
    ),
    "mdi-projector": React.lazy(() =>
        import(
            /* webpackChunkName: "ProjectorIcon" */
            "mdi-react/ProjectorIcon"
        ),
    ),
    "mdi-publish": React.lazy(() =>
        import(
            /* webpackChunkName: "PublishIcon" */
            "mdi-react/PublishIcon"
        ),
    ),
    "mdi-pulse": React.lazy(() =>
        import(
            /* webpackChunkName: "PulseIcon" */
            "mdi-react/PulseIcon"
        ),
    ),
    "mdi-puzzle": React.lazy(() =>
        import(
            /* webpackChunkName: "PuzzleIcon" */
            "mdi-react/PuzzleIcon"
        ),
    ),
    "mdi-qi": React.lazy(() =>
        import(
            /* webpackChunkName: "QiIcon" */
            "mdi-react/QiIcon"
        ),
    ),
    "mdi-qqchat": React.lazy(() =>
        import(
            /* webpackChunkName: "QqchatIcon" */
            "mdi-react/QqchatIcon"
        ),
    ),
    "mdi-qrcode-edit": React.lazy(() =>
        import(
            /* webpackChunkName: "QrcodeEditIcon" */
            "mdi-react/QrcodeEditIcon"
        ),
    ),
    "mdi-qrcode-scan": React.lazy(() =>
        import(
            /* webpackChunkName: "QrcodeScanIcon" */
            "mdi-react/QrcodeScanIcon"
        ),
    ),
    "mdi-qrcode": React.lazy(() =>
        import(
            /* webpackChunkName: "QrcodeIcon" */
            "mdi-react/QrcodeIcon"
        ),
    ),
    "mdi-quadcopter": React.lazy(() =>
        import(
            /* webpackChunkName: "QuadcopterIcon" */
            "mdi-react/QuadcopterIcon"
        ),
    ),
    "mdi-quality-high": React.lazy(() =>
        import(
            /* webpackChunkName: "QualityHighIcon" */
            "mdi-react/QualityHighIcon"
        ),
    ),
    "mdi-quicktime": React.lazy(() =>
        import(
            /* webpackChunkName: "QuicktimeIcon" */
            "mdi-react/QuicktimeIcon"
        ),
    ),
    "mdi-rabbit": React.lazy(() =>
        import(
            /* webpackChunkName: "RabbitIcon" */
            "mdi-react/RabbitIcon"
        ),
    ),
    "mdi-radar": React.lazy(() =>
        import(
            /* webpackChunkName: "RadarIcon" */
            "mdi-react/RadarIcon"
        ),
    ),
    "mdi-radiator": React.lazy(() =>
        import(
            /* webpackChunkName: "RadiatorIcon" */
            "mdi-react/RadiatorIcon"
        ),
    ),
    "mdi-radio-handheld": React.lazy(() =>
        import(
            /* webpackChunkName: "RadioHandheldIcon" */
            "mdi-react/RadioHandheldIcon"
        ),
    ),
    "mdi-radio-tower": React.lazy(() =>
        import(
            /* webpackChunkName: "RadioTowerIcon" */
            "mdi-react/RadioTowerIcon"
        ),
    ),
    "mdi-radio": React.lazy(() =>
        import(
            /* webpackChunkName: "RadioIcon" */
            "mdi-react/RadioIcon"
        ),
    ),
    "mdi-radioactive": React.lazy(() =>
        import(
            /* webpackChunkName: "RadioactiveIcon" */
            "mdi-react/RadioactiveIcon"
        ),
    ),
    "mdi-radiobox-blank": React.lazy(() =>
        import(
            /* webpackChunkName: "RadioboxBlankIcon" */
            "mdi-react/RadioboxBlankIcon"
        ),
    ),
    "mdi-radiobox-marked": React.lazy(() =>
        import(
            /* webpackChunkName: "RadioboxMarkedIcon" */
            "mdi-react/RadioboxMarkedIcon"
        ),
    ),
    "mdi-raspberrypi": React.lazy(() =>
        import(
            /* webpackChunkName: "RaspberrypiIcon" */
            "mdi-react/RaspberrypiIcon"
        ),
    ),
    "mdi-ray-end-arrow": React.lazy(() =>
        import(
            /* webpackChunkName: "RayEndArrowIcon" */
            "mdi-react/RayEndArrowIcon"
        ),
    ),
    "mdi-ray-end": React.lazy(() =>
        import(
            /* webpackChunkName: "RayEndIcon" */
            "mdi-react/RayEndIcon"
        ),
    ),
    "mdi-ray-start-arrow": React.lazy(() =>
        import(
            /* webpackChunkName: "RayStartArrowIcon" */
            "mdi-react/RayStartArrowIcon"
        ),
    ),
    "mdi-ray-start-end": React.lazy(() =>
        import(
            /* webpackChunkName: "RayStartEndIcon" */
            "mdi-react/RayStartEndIcon"
        ),
    ),
    "mdi-ray-start": React.lazy(() =>
        import(
            /* webpackChunkName: "RayStartIcon" */
            "mdi-react/RayStartIcon"
        ),
    ),
    "mdi-ray-vertex": React.lazy(() =>
        import(
            /* webpackChunkName: "RayVertexIcon" */
            "mdi-react/RayVertexIcon"
        ),
    ),
    "mdi-react": React.lazy(() =>
        import(
            /* webpackChunkName: "ReactIcon" */
            "mdi-react/ReactIcon"
        ),
    ),
    "mdi-read": React.lazy(() =>
        import(
            /* webpackChunkName: "ReadIcon" */
            "mdi-react/ReadIcon"
        ),
    ),
    "mdi-receipt": React.lazy(() =>
        import(
            /* webpackChunkName: "ReceiptIcon" */
            "mdi-react/ReceiptIcon"
        ),
    ),
    "mdi-record-player": React.lazy(() =>
        import(
            /* webpackChunkName: "RecordPlayerIcon" */
            "mdi-react/RecordPlayerIcon"
        ),
    ),
    "mdi-record-rec": React.lazy(() =>
        import(
            /* webpackChunkName: "RecordRecIcon" */
            "mdi-react/RecordRecIcon"
        ),
    ),
    "mdi-record": React.lazy(() =>
        import(
            /* webpackChunkName: "RecordIcon" */
            "mdi-react/RecordIcon"
        ),
    ),
    "mdi-recycle": React.lazy(() =>
        import(
            /* webpackChunkName: "RecycleIcon" */
            "mdi-react/RecycleIcon"
        ),
    ),
    "mdi-reddit": React.lazy(() =>
        import(
            /* webpackChunkName: "RedditIcon" */
            "mdi-react/RedditIcon"
        ),
    ),
    "mdi-redo-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "RedoVariantIcon" */
            "mdi-react/RedoVariantIcon"
        ),
    ),
    "mdi-redo": React.lazy(() =>
        import(
            /* webpackChunkName: "RedoIcon" */
            "mdi-react/RedoIcon"
        ),
    ),
    "mdi-refresh": React.lazy(() =>
        import(
            /* webpackChunkName: "RefreshIcon" */
            "mdi-react/RefreshIcon"
        ),
    ),
    "mdi-regex": React.lazy(() =>
        import(
            /* webpackChunkName: "RegexIcon" */
            "mdi-react/RegexIcon"
        ),
    ),
    "mdi-relative-scale": React.lazy(() =>
        import(
            /* webpackChunkName: "RelativeScaleIcon" */
            "mdi-react/RelativeScaleIcon"
        ),
    ),
    "mdi-reload": React.lazy(() =>
        import(
            /* webpackChunkName: "ReloadIcon" */
            "mdi-react/ReloadIcon"
        ),
    ),
    "mdi-reminder": React.lazy(() =>
        import(
            /* webpackChunkName: "ReminderIcon" */
            "mdi-react/ReminderIcon"
        ),
    ),
    "mdi-remote-desktop": React.lazy(() =>
        import(
            /* webpackChunkName: "RemoteDesktopIcon" */
            "mdi-react/RemoteDesktopIcon"
        ),
    ),
    "mdi-remote": React.lazy(() =>
        import(
            /* webpackChunkName: "RemoteIcon" */
            "mdi-react/RemoteIcon"
        ),
    ),
    "mdi-rename-box": React.lazy(() =>
        import(
            /* webpackChunkName: "RenameBoxIcon" */
            "mdi-react/RenameBoxIcon"
        ),
    ),
    "mdi-reorder-horizontal": React.lazy(() =>
        import(
            /* webpackChunkName: "ReorderHorizontalIcon" */
            "mdi-react/ReorderHorizontalIcon"
        ),
    ),
    "mdi-reorder-vertical": React.lazy(() =>
        import(
            /* webpackChunkName: "ReorderVerticalIcon" */
            "mdi-react/ReorderVerticalIcon"
        ),
    ),
    "mdi-repeat-off": React.lazy(() =>
        import(
            /* webpackChunkName: "RepeatOffIcon" */
            "mdi-react/RepeatOffIcon"
        ),
    ),
    "mdi-repeat-once": React.lazy(() =>
        import(
            /* webpackChunkName: "RepeatOnceIcon" */
            "mdi-react/RepeatOnceIcon"
        ),
    ),
    "mdi-repeat": React.lazy(() =>
        import(
            /* webpackChunkName: "RepeatIcon" */
            "mdi-react/RepeatIcon"
        ),
    ),
    "mdi-replay": React.lazy(() =>
        import(
            /* webpackChunkName: "ReplayIcon" */
            "mdi-react/ReplayIcon"
        ),
    ),
    "mdi-reply-all": React.lazy(() =>
        import(
            /* webpackChunkName: "ReplyAllIcon" */
            "mdi-react/ReplyAllIcon"
        ),
    ),
    "mdi-reply": React.lazy(() =>
        import(
            /* webpackChunkName: "ReplyIcon" */
            "mdi-react/ReplyIcon"
        ),
    ),
    "mdi-reproduction": React.lazy(() =>
        import(
            /* webpackChunkName: "ReproductionIcon" */
            "mdi-react/ReproductionIcon"
        ),
    ),
    "mdi-resize-bottom-right": React.lazy(() =>
        import(
            /* webpackChunkName: "ResizeBottomRightIcon" */
            "mdi-react/ResizeBottomRightIcon"
        ),
    ),
    "mdi-responsive": React.lazy(() =>
        import(
            /* webpackChunkName: "ResponsiveIcon" */
            "mdi-react/ResponsiveIcon"
        ),
    ),
    "mdi-restart": React.lazy(() =>
        import(
            /* webpackChunkName: "RestartIcon" */
            "mdi-react/RestartIcon"
        ),
    ),
    "mdi-restore-clock": React.lazy(() =>
        import(
            /* webpackChunkName: "RestoreClockIcon" */
            "mdi-react/RestoreClockIcon"
        ),
    ),
    "mdi-restore": React.lazy(() =>
        import(
            /* webpackChunkName: "RestoreIcon" */
            "mdi-react/RestoreIcon"
        ),
    ),
    "mdi-rewind-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "RewindOutlineIcon" */
            "mdi-react/RewindOutlineIcon"
        ),
    ),
    "mdi-rewind": React.lazy(() =>
        import(
            /* webpackChunkName: "RewindIcon" */
            "mdi-react/RewindIcon"
        ),
    ),
    "mdi-rhombus-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "RhombusOutlineIcon" */
            "mdi-react/RhombusOutlineIcon"
        ),
    ),
    "mdi-rhombus": React.lazy(() =>
        import(
            /* webpackChunkName: "RhombusIcon" */
            "mdi-react/RhombusIcon"
        ),
    ),
    "mdi-ribbon": React.lazy(() =>
        import(
            /* webpackChunkName: "RibbonIcon" */
            "mdi-react/RibbonIcon"
        ),
    ),
    "mdi-rice": React.lazy(() =>
        import(
            /* webpackChunkName: "RiceIcon" */
            "mdi-react/RiceIcon"
        ),
    ),
    "mdi-ring": React.lazy(() =>
        import(
            /* webpackChunkName: "RingIcon" */
            "mdi-react/RingIcon"
        ),
    ),
    "mdi-road-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "RoadVariantIcon" */
            "mdi-react/RoadVariantIcon"
        ),
    ),
    "mdi-road": React.lazy(() =>
        import(
            /* webpackChunkName: "RoadIcon" */
            "mdi-react/RoadIcon"
        ),
    ),
    "mdi-robot-vacuum-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "RobotVacuumVariantIcon" */
            "mdi-react/RobotVacuumVariantIcon"
        ),
    ),
    "mdi-robot-vacuum": React.lazy(() =>
        import(
            /* webpackChunkName: "RobotVacuumIcon" */
            "mdi-react/RobotVacuumIcon"
        ),
    ),
    "mdi-robot": React.lazy(() =>
        import(
            /* webpackChunkName: "RobotIcon" */
            "mdi-react/RobotIcon"
        ),
    ),
    "mdi-rocket": React.lazy(() =>
        import(
            /* webpackChunkName: "RocketIcon" */
            "mdi-react/RocketIcon"
        ),
    ),
    "mdi-room-service": React.lazy(() =>
        import(
            /* webpackChunkName: "RoomServiceIcon" */
            "mdi-react/RoomServiceIcon"
        ),
    ),
    "mdi-rotate-3-d": React.lazy(() =>
        import(
            /* webpackChunkName: "Rotate3dIcon" */
            "mdi-react/Rotate3dIcon"
        ),
    ),
    "mdi-rotate-left-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "RotateLeftVariantIcon" */
            "mdi-react/RotateLeftVariantIcon"
        ),
    ),
    "mdi-rotate-left": React.lazy(() =>
        import(
            /* webpackChunkName: "RotateLeftIcon" */
            "mdi-react/RotateLeftIcon"
        ),
    ),
    "mdi-rotate-right-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "RotateRightVariantIcon" */
            "mdi-react/RotateRightVariantIcon"
        ),
    ),
    "mdi-rotate-right": React.lazy(() =>
        import(
            /* webpackChunkName: "RotateRightIcon" */
            "mdi-react/RotateRightIcon"
        ),
    ),
    "mdi-rounded-corner": React.lazy(() =>
        import(
            /* webpackChunkName: "RoundedCornerIcon" */
            "mdi-react/RoundedCornerIcon"
        ),
    ),
    "mdi-router-wireless": React.lazy(() =>
        import(
            /* webpackChunkName: "RouterWirelessIcon" */
            "mdi-react/RouterWirelessIcon"
        ),
    ),
    "mdi-routes": React.lazy(() =>
        import(
            /* webpackChunkName: "RoutesIcon" */
            "mdi-react/RoutesIcon"
        ),
    ),
    "mdi-rowing": React.lazy(() =>
        import(
            /* webpackChunkName: "RowingIcon" */
            "mdi-react/RowingIcon"
        ),
    ),
    "mdi-rss-box": React.lazy(() =>
        import(
            /* webpackChunkName: "RssBoxIcon" */
            "mdi-react/RssBoxIcon"
        ),
    ),
    "mdi-rss": React.lazy(() =>
        import(
            /* webpackChunkName: "RssIcon" */
            "mdi-react/RssIcon"
        ),
    ),
    "mdi-ruler": React.lazy(() =>
        import(
            /* webpackChunkName: "RulerIcon" */
            "mdi-react/RulerIcon"
        ),
    ),
    "mdi-run-fast": React.lazy(() =>
        import(
            /* webpackChunkName: "RunFastIcon" */
            "mdi-react/RunFastIcon"
        ),
    ),
    "mdi-run": React.lazy(() =>
        import(
            /* webpackChunkName: "RunIcon" */
            "mdi-react/RunIcon"
        ),
    ),
    "mdi-sale": React.lazy(() =>
        import(
            /* webpackChunkName: "SaleIcon" */
            "mdi-react/SaleIcon"
        ),
    ),
    "mdi-salesforce": React.lazy(() =>
        import(
            /* webpackChunkName: "SalesforceIcon" */
            "mdi-react/SalesforceIcon"
        ),
    ),
    "mdi-sass": React.lazy(() =>
        import(
            /* webpackChunkName: "SassIcon" */
            "mdi-react/SassIcon"
        ),
    ),
    "mdi-satellite-uplink": React.lazy(() =>
        import(
            /* webpackChunkName: "SatelliteUplinkIcon" */
            "mdi-react/SatelliteUplinkIcon"
        ),
    ),
    "mdi-satellite-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "SatelliteVariantIcon" */
            "mdi-react/SatelliteVariantIcon"
        ),
    ),
    "mdi-satellite": React.lazy(() =>
        import(
            /* webpackChunkName: "SatelliteIcon" */
            "mdi-react/SatelliteIcon"
        ),
    ),
    "mdi-sausage": React.lazy(() =>
        import(
            /* webpackChunkName: "SausageIcon" */
            "mdi-react/SausageIcon"
        ),
    ),
    "mdi-saxophone": React.lazy(() =>
        import(
            /* webpackChunkName: "SaxophoneIcon" */
            "mdi-react/SaxophoneIcon"
        ),
    ),
    "mdi-scale-balance": React.lazy(() =>
        import(
            /* webpackChunkName: "ScaleBalanceIcon" */
            "mdi-react/ScaleBalanceIcon"
        ),
    ),
    "mdi-scale-bathroom": React.lazy(() =>
        import(
            /* webpackChunkName: "ScaleBathroomIcon" */
            "mdi-react/ScaleBathroomIcon"
        ),
    ),
    "mdi-scale": React.lazy(() =>
        import(
            /* webpackChunkName: "ScaleIcon" */
            "mdi-react/ScaleIcon"
        ),
    ),
    "mdi-scanner-off": React.lazy(() =>
        import(
            /* webpackChunkName: "ScannerOffIcon" */
            "mdi-react/ScannerOffIcon"
        ),
    ),
    "mdi-scanner": React.lazy(() =>
        import(
            /* webpackChunkName: "ScannerIcon" */
            "mdi-react/ScannerIcon"
        ),
    ),
    "mdi-school": React.lazy(() =>
        import(
            /* webpackChunkName: "SchoolIcon" */
            "mdi-react/SchoolIcon"
        ),
    ),
    "mdi-screen-rotation-lock": React.lazy(() =>
        import(
            /* webpackChunkName: "ScreenRotationLockIcon" */
            "mdi-react/ScreenRotationLockIcon"
        ),
    ),
    "mdi-screen-rotation": React.lazy(() =>
        import(
            /* webpackChunkName: "ScreenRotationIcon" */
            "mdi-react/ScreenRotationIcon"
        ),
    ),
    "mdi-screwdriver": React.lazy(() =>
        import(
            /* webpackChunkName: "ScrewdriverIcon" */
            "mdi-react/ScrewdriverIcon"
        ),
    ),
    "mdi-script": React.lazy(() =>
        import(
            /* webpackChunkName: "ScriptIcon" */
            "mdi-react/ScriptIcon"
        ),
    ),
    "mdi-sd": React.lazy(() =>
        import(
            /* webpackChunkName: "SdIcon" */
            "mdi-react/SdIcon"
        ),
    ),
    "mdi-seal": React.lazy(() =>
        import(
            /* webpackChunkName: "SealIcon" */
            "mdi-react/SealIcon"
        ),
    ),
    "mdi-search-web": React.lazy(() =>
        import(
            /* webpackChunkName: "SearchWebIcon" */
            "mdi-react/SearchWebIcon"
        ),
    ),
    "mdi-seat-flat-angled": React.lazy(() =>
        import(
            /* webpackChunkName: "SeatFlatAngledIcon" */
            "mdi-react/SeatFlatAngledIcon"
        ),
    ),
    "mdi-seat-flat": React.lazy(() =>
        import(
            /* webpackChunkName: "SeatFlatIcon" */
            "mdi-react/SeatFlatIcon"
        ),
    ),
    "mdi-seat-individual-suite": React.lazy(() =>
        import(
            /* webpackChunkName: "SeatIndividualSuiteIcon" */
            "mdi-react/SeatIndividualSuiteIcon"
        ),
    ),
    "mdi-seat-legroom-extra": React.lazy(() =>
        import(
            /* webpackChunkName: "SeatLegroomExtraIcon" */
            "mdi-react/SeatLegroomExtraIcon"
        ),
    ),
    "mdi-seat-legroom-normal": React.lazy(() =>
        import(
            /* webpackChunkName: "SeatLegroomNormalIcon" */
            "mdi-react/SeatLegroomNormalIcon"
        ),
    ),
    "mdi-seat-legroom-reduced": React.lazy(() =>
        import(
            /* webpackChunkName: "SeatLegroomReducedIcon" */
            "mdi-react/SeatLegroomReducedIcon"
        ),
    ),
    "mdi-seat-recline-extra": React.lazy(() =>
        import(
            /* webpackChunkName: "SeatReclineExtraIcon" */
            "mdi-react/SeatReclineExtraIcon"
        ),
    ),
    "mdi-seat-recline-normal": React.lazy(() =>
        import(
            /* webpackChunkName: "SeatReclineNormalIcon" */
            "mdi-react/SeatReclineNormalIcon"
        ),
    ),
    "mdi-security-account": React.lazy(() =>
        import(
            /* webpackChunkName: "SecurityAccountIcon" */
            "mdi-react/SecurityAccountIcon"
        ),
    ),
    "mdi-security-close": React.lazy(() =>
        import(
            /* webpackChunkName: "SecurityCloseIcon" */
            "mdi-react/SecurityCloseIcon"
        ),
    ),
    "mdi-security-home": React.lazy(() =>
        import(
            /* webpackChunkName: "SecurityHomeIcon" */
            "mdi-react/SecurityHomeIcon"
        ),
    ),
    "mdi-security-lock": React.lazy(() =>
        import(
            /* webpackChunkName: "SecurityLockIcon" */
            "mdi-react/SecurityLockIcon"
        ),
    ),
    "mdi-security-network": React.lazy(() =>
        import(
            /* webpackChunkName: "SecurityNetworkIcon" */
            "mdi-react/SecurityNetworkIcon"
        ),
    ),
    "mdi-security-off": React.lazy(() =>
        import(
            /* webpackChunkName: "SecurityOffIcon" */
            "mdi-react/SecurityOffIcon"
        ),
    ),
    "mdi-security": React.lazy(() =>
        import(
            /* webpackChunkName: "SecurityIcon" */
            "mdi-react/SecurityIcon"
        ),
    ),
    "mdi-select-all": React.lazy(() =>
        import(
            /* webpackChunkName: "SelectAllIcon" */
            "mdi-react/SelectAllIcon"
        ),
    ),
    "mdi-select-inverse": React.lazy(() =>
        import(
            /* webpackChunkName: "SelectInverseIcon" */
            "mdi-react/SelectInverseIcon"
        ),
    ),
    "mdi-select-off": React.lazy(() =>
        import(
            /* webpackChunkName: "SelectOffIcon" */
            "mdi-react/SelectOffIcon"
        ),
    ),
    "mdi-select": React.lazy(() =>
        import(
            /* webpackChunkName: "SelectIcon" */
            "mdi-react/SelectIcon"
        ),
    ),
    "mdi-selection-off": React.lazy(() =>
        import(
            /* webpackChunkName: "SelectionOffIcon" */
            "mdi-react/SelectionOffIcon"
        ),
    ),
    "mdi-selection": React.lazy(() =>
        import(
            /* webpackChunkName: "SelectionIcon" */
            "mdi-react/SelectionIcon"
        ),
    ),
    "mdi-send-secure": React.lazy(() =>
        import(
            /* webpackChunkName: "SendSecureIcon" */
            "mdi-react/SendSecureIcon"
        ),
    ),
    "mdi-send": React.lazy(() =>
        import(
            /* webpackChunkName: "SendIcon" */
            "mdi-react/SendIcon"
        ),
    ),
    "mdi-serial-port": React.lazy(() =>
        import(
            /* webpackChunkName: "SerialPortIcon" */
            "mdi-react/SerialPortIcon"
        ),
    ),
    "mdi-server-minus": React.lazy(() =>
        import(
            /* webpackChunkName: "ServerMinusIcon" */
            "mdi-react/ServerMinusIcon"
        ),
    ),
    "mdi-server-network-off": React.lazy(() =>
        import(
            /* webpackChunkName: "ServerNetworkOffIcon" */
            "mdi-react/ServerNetworkOffIcon"
        ),
    ),
    "mdi-server-network": React.lazy(() =>
        import(
            /* webpackChunkName: "ServerNetworkIcon" */
            "mdi-react/ServerNetworkIcon"
        ),
    ),
    "mdi-server-off": React.lazy(() =>
        import(
            /* webpackChunkName: "ServerOffIcon" */
            "mdi-react/ServerOffIcon"
        ),
    ),
    "mdi-server-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "ServerPlusIcon" */
            "mdi-react/ServerPlusIcon"
        ),
    ),
    "mdi-server-remove": React.lazy(() =>
        import(
            /* webpackChunkName: "ServerRemoveIcon" */
            "mdi-react/ServerRemoveIcon"
        ),
    ),
    "mdi-server-security": React.lazy(() =>
        import(
            /* webpackChunkName: "ServerSecurityIcon" */
            "mdi-react/ServerSecurityIcon"
        ),
    ),
    "mdi-server": React.lazy(() =>
        import(
            /* webpackChunkName: "ServerIcon" */
            "mdi-react/ServerIcon"
        ),
    ),
    "mdi-set-all": React.lazy(() =>
        import(
            /* webpackChunkName: "SetAllIcon" */
            "mdi-react/SetAllIcon"
        ),
    ),
    "mdi-set-center-right": React.lazy(() =>
        import(
            /* webpackChunkName: "SetCenterRightIcon" */
            "mdi-react/SetCenterRightIcon"
        ),
    ),
    "mdi-set-center": React.lazy(() =>
        import(
            /* webpackChunkName: "SetCenterIcon" */
            "mdi-react/SetCenterIcon"
        ),
    ),
    "mdi-set-left-center": React.lazy(() =>
        import(
            /* webpackChunkName: "SetLeftCenterIcon" */
            "mdi-react/SetLeftCenterIcon"
        ),
    ),
    "mdi-set-left-right": React.lazy(() =>
        import(
            /* webpackChunkName: "SetLeftRightIcon" */
            "mdi-react/SetLeftRightIcon"
        ),
    ),
    "mdi-set-left": React.lazy(() =>
        import(
            /* webpackChunkName: "SetLeftIcon" */
            "mdi-react/SetLeftIcon"
        ),
    ),
    "mdi-set-none": React.lazy(() =>
        import(
            /* webpackChunkName: "SetNoneIcon" */
            "mdi-react/SetNoneIcon"
        ),
    ),
    "mdi-set-right": React.lazy(() =>
        import(
            /* webpackChunkName: "SetRightIcon" */
            "mdi-react/SetRightIcon"
        ),
    ),
    "mdi-set-top-box": React.lazy(() =>
        import(
            /* webpackChunkName: "SetTopBoxIcon" */
            "mdi-react/SetTopBoxIcon"
        ),
    ),
    "mdi-settings-box": React.lazy(() =>
        import(
            /* webpackChunkName: "SettingsBoxIcon" */
            "mdi-react/SettingsBoxIcon"
        ),
    ),
    "mdi-settings-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "SettingsOutlineIcon" */
            "mdi-react/SettingsOutlineIcon"
        ),
    ),
    "mdi-settings": React.lazy(() =>
        import(
            /* webpackChunkName: "SettingsIcon" */
            "mdi-react/SettingsIcon"
        ),
    ),
    "mdi-shape-circle-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "ShapeCirclePlusIcon" */
            "mdi-react/ShapeCirclePlusIcon"
        ),
    ),
    "mdi-shape-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "ShapeOutlineIcon" */
            "mdi-react/ShapeOutlineIcon"
        ),
    ),
    "mdi-shape-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "ShapePlusIcon" */
            "mdi-react/ShapePlusIcon"
        ),
    ),
    "mdi-shape-polygon-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "ShapePolygonPlusIcon" */
            "mdi-react/ShapePolygonPlusIcon"
        ),
    ),
    "mdi-shape-rectangle-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "ShapeRectanglePlusIcon" */
            "mdi-react/ShapeRectanglePlusIcon"
        ),
    ),
    "mdi-shape-square-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "ShapeSquarePlusIcon" */
            "mdi-react/ShapeSquarePlusIcon"
        ),
    ),
    "mdi-shape": React.lazy(() =>
        import(
            /* webpackChunkName: "ShapeIcon" */
            "mdi-react/ShapeIcon"
        ),
    ),
    "mdi-share-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "ShareOutlineIcon" */
            "mdi-react/ShareOutlineIcon"
        ),
    ),
    "mdi-share-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "ShareVariantIcon" */
            "mdi-react/ShareVariantIcon"
        ),
    ),
    "mdi-share": React.lazy(() =>
        import(
            /* webpackChunkName: "ShareIcon" */
            "mdi-react/ShareIcon"
        ),
    ),
    "mdi-shield-half-full": React.lazy(() =>
        import(
            /* webpackChunkName: "ShieldHalfFullIcon" */
            "mdi-react/ShieldHalfFullIcon"
        ),
    ),
    "mdi-shield-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "ShieldOutlineIcon" */
            "mdi-react/ShieldOutlineIcon"
        ),
    ),
    "mdi-shield": React.lazy(() =>
        import(
            /* webpackChunkName: "ShieldIcon" */
            "mdi-react/ShieldIcon"
        ),
    ),
    "mdi-ship-wheel": React.lazy(() =>
        import(
            /* webpackChunkName: "ShipWheelIcon" */
            "mdi-react/ShipWheelIcon"
        ),
    ),
    "mdi-shopping-music": React.lazy(() =>
        import(
            /* webpackChunkName: "ShoppingMusicIcon" */
            "mdi-react/ShoppingMusicIcon"
        ),
    ),
    "mdi-shopping": React.lazy(() =>
        import(
            /* webpackChunkName: "ShoppingIcon" */
            "mdi-react/ShoppingIcon"
        ),
    ),
    "mdi-shovel-off": React.lazy(() =>
        import(
            /* webpackChunkName: "ShovelOffIcon" */
            "mdi-react/ShovelOffIcon"
        ),
    ),
    "mdi-shovel": React.lazy(() =>
        import(
            /* webpackChunkName: "ShovelIcon" */
            "mdi-react/ShovelIcon"
        ),
    ),
    "mdi-shower-head": React.lazy(() =>
        import(
            /* webpackChunkName: "ShowerHeadIcon" */
            "mdi-react/ShowerHeadIcon"
        ),
    ),
    "mdi-shower": React.lazy(() =>
        import(
            /* webpackChunkName: "ShowerIcon" */
            "mdi-react/ShowerIcon"
        ),
    ),
    "mdi-shredder": React.lazy(() =>
        import(
            /* webpackChunkName: "ShredderIcon" */
            "mdi-react/ShredderIcon"
        ),
    ),
    "mdi-shuffle-disabled": React.lazy(() =>
        import(
            /* webpackChunkName: "ShuffleDisabledIcon" */
            "mdi-react/ShuffleDisabledIcon"
        ),
    ),
    "mdi-shuffle-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "ShuffleVariantIcon" */
            "mdi-react/ShuffleVariantIcon"
        ),
    ),
    "mdi-shuffle": React.lazy(() =>
        import(
            /* webpackChunkName: "ShuffleIcon" */
            "mdi-react/ShuffleIcon"
        ),
    ),
    "mdi-sigma-lower": React.lazy(() =>
        import(
            /* webpackChunkName: "SigmaLowerIcon" */
            "mdi-react/SigmaLowerIcon"
        ),
    ),
    "mdi-sigma": React.lazy(() =>
        import(
            /* webpackChunkName: "SigmaIcon" */
            "mdi-react/SigmaIcon"
        ),
    ),
    "mdi-sign-caution": React.lazy(() =>
        import(
            /* webpackChunkName: "SignCautionIcon" */
            "mdi-react/SignCautionIcon"
        ),
    ),
    "mdi-sign-direction": React.lazy(() =>
        import(
            /* webpackChunkName: "SignDirectionIcon" */
            "mdi-react/SignDirectionIcon"
        ),
    ),
    "mdi-sign-text": React.lazy(() =>
        import(
            /* webpackChunkName: "SignTextIcon" */
            "mdi-react/SignTextIcon"
        ),
    ),
    "mdi-signal-2-g": React.lazy(() =>
        import(
            /* webpackChunkName: "Signal2gIcon" */
            "mdi-react/Signal2gIcon"
        ),
    ),
    "mdi-signal-3-g": React.lazy(() =>
        import(
            /* webpackChunkName: "Signal3gIcon" */
            "mdi-react/Signal3gIcon"
        ),
    ),
    "mdi-signal-4-g": React.lazy(() =>
        import(
            /* webpackChunkName: "Signal4gIcon" */
            "mdi-react/Signal4gIcon"
        ),
    ),
    "mdi-signal-cellular-1": React.lazy(() =>
        import(
            /* webpackChunkName: "SignalCellular1Icon" */
            "mdi-react/SignalCellular1Icon"
        ),
    ),
    "mdi-signal-cellular-2": React.lazy(() =>
        import(
            /* webpackChunkName: "SignalCellular2Icon" */
            "mdi-react/SignalCellular2Icon"
        ),
    ),
    "mdi-signal-cellular-3": React.lazy(() =>
        import(
            /* webpackChunkName: "SignalCellular3Icon" */
            "mdi-react/SignalCellular3Icon"
        ),
    ),
    "mdi-signal-cellular-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "SignalCellularOutlineIcon" */
            "mdi-react/SignalCellularOutlineIcon"
        ),
    ),
    "mdi-signal-hspa-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "SignalHspaPlusIcon" */
            "mdi-react/SignalHspaPlusIcon"
        ),
    ),
    "mdi-signal-hspa": React.lazy(() =>
        import(
            /* webpackChunkName: "SignalHspaIcon" */
            "mdi-react/SignalHspaIcon"
        ),
    ),
    "mdi-signal-off": React.lazy(() =>
        import(
            /* webpackChunkName: "SignalOffIcon" */
            "mdi-react/SignalOffIcon"
        ),
    ),
    "mdi-signal-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "SignalVariantIcon" */
            "mdi-react/SignalVariantIcon"
        ),
    ),
    "mdi-signal": React.lazy(() =>
        import(
            /* webpackChunkName: "SignalIcon" */
            "mdi-react/SignalIcon"
        ),
    ),
    "mdi-silverware-fork": React.lazy(() =>
        import(
            /* webpackChunkName: "SilverwareForkIcon" */
            "mdi-react/SilverwareForkIcon"
        ),
    ),
    "mdi-silverware-spoon": React.lazy(() =>
        import(
            /* webpackChunkName: "SilverwareSpoonIcon" */
            "mdi-react/SilverwareSpoonIcon"
        ),
    ),
    "mdi-silverware-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "SilverwareVariantIcon" */
            "mdi-react/SilverwareVariantIcon"
        ),
    ),
    "mdi-silverware": React.lazy(() =>
        import(
            /* webpackChunkName: "SilverwareIcon" */
            "mdi-react/SilverwareIcon"
        ),
    ),
    "mdi-sim-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "SimAlertIcon" */
            "mdi-react/SimAlertIcon"
        ),
    ),
    "mdi-sim-off": React.lazy(() =>
        import(
            /* webpackChunkName: "SimOffIcon" */
            "mdi-react/SimOffIcon"
        ),
    ),
    "mdi-sim": React.lazy(() =>
        import(
            /* webpackChunkName: "SimIcon" */
            "mdi-react/SimIcon"
        ),
    ),
    "mdi-sitemap": React.lazy(() =>
        import(
            /* webpackChunkName: "SitemapIcon" */
            "mdi-react/SitemapIcon"
        ),
    ),
    "mdi-skip-backward": React.lazy(() =>
        import(
            /* webpackChunkName: "SkipBackwardIcon" */
            "mdi-react/SkipBackwardIcon"
        ),
    ),
    "mdi-skip-forward": React.lazy(() =>
        import(
            /* webpackChunkName: "SkipForwardIcon" */
            "mdi-react/SkipForwardIcon"
        ),
    ),
    "mdi-skip-next-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "SkipNextCircleOutlineIcon" */
            "mdi-react/SkipNextCircleOutlineIcon"
        ),
    ),
    "mdi-skip-next-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "SkipNextCircleIcon" */
            "mdi-react/SkipNextCircleIcon"
        ),
    ),
    "mdi-skip-next": React.lazy(() =>
        import(
            /* webpackChunkName: "SkipNextIcon" */
            "mdi-react/SkipNextIcon"
        ),
    ),
    "mdi-skip-previous-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "SkipPreviousCircleOutlineIcon" */
            "mdi-react/SkipPreviousCircleOutlineIcon"
        ),
    ),
    "mdi-skip-previous-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "SkipPreviousCircleIcon" */
            "mdi-react/SkipPreviousCircleIcon"
        ),
    ),
    "mdi-skip-previous": React.lazy(() =>
        import(
            /* webpackChunkName: "SkipPreviousIcon" */
            "mdi-react/SkipPreviousIcon"
        ),
    ),
    "mdi-skull": React.lazy(() =>
        import(
            /* webpackChunkName: "SkullIcon" */
            "mdi-react/SkullIcon"
        ),
    ),
    "mdi-skype-business": React.lazy(() =>
        import(
            /* webpackChunkName: "SkypeBusinessIcon" */
            "mdi-react/SkypeBusinessIcon"
        ),
    ),
    "mdi-skype": React.lazy(() =>
        import(
            /* webpackChunkName: "SkypeIcon" */
            "mdi-react/SkypeIcon"
        ),
    ),
    "mdi-slack": React.lazy(() =>
        import(
            /* webpackChunkName: "SlackIcon" */
            "mdi-react/SlackIcon"
        ),
    ),
    "mdi-slackware": React.lazy(() =>
        import(
            /* webpackChunkName: "SlackwareIcon" */
            "mdi-react/SlackwareIcon"
        ),
    ),
    "mdi-sleep-off": React.lazy(() =>
        import(
            /* webpackChunkName: "SleepOffIcon" */
            "mdi-react/SleepOffIcon"
        ),
    ),
    "mdi-sleep": React.lazy(() =>
        import(
            /* webpackChunkName: "SleepIcon" */
            "mdi-react/SleepIcon"
        ),
    ),
    "mdi-smoke-detector": React.lazy(() =>
        import(
            /* webpackChunkName: "SmokeDetectorIcon" */
            "mdi-react/SmokeDetectorIcon"
        ),
    ),
    "mdi-smoking-off": React.lazy(() =>
        import(
            /* webpackChunkName: "SmokingOffIcon" */
            "mdi-react/SmokingOffIcon"
        ),
    ),
    "mdi-smoking": React.lazy(() =>
        import(
            /* webpackChunkName: "SmokingIcon" */
            "mdi-react/SmokingIcon"
        ),
    ),
    "mdi-snapchat": React.lazy(() =>
        import(
            /* webpackChunkName: "SnapchatIcon" */
            "mdi-react/SnapchatIcon"
        ),
    ),
    "mdi-snowflake": React.lazy(() =>
        import(
            /* webpackChunkName: "SnowflakeIcon" */
            "mdi-react/SnowflakeIcon"
        ),
    ),
    "mdi-snowman": React.lazy(() =>
        import(
            /* webpackChunkName: "SnowmanIcon" */
            "mdi-react/SnowmanIcon"
        ),
    ),
    "mdi-soccer-field": React.lazy(() =>
        import(
            /* webpackChunkName: "SoccerFieldIcon" */
            "mdi-react/SoccerFieldIcon"
        ),
    ),
    "mdi-soccer": React.lazy(() =>
        import(
            /* webpackChunkName: "SoccerIcon" */
            "mdi-react/SoccerIcon"
        ),
    ),
    "mdi-sofa": React.lazy(() =>
        import(
            /* webpackChunkName: "SofaIcon" */
            "mdi-react/SofaIcon"
        ),
    ),
    "mdi-solid": React.lazy(() =>
        import(
            /* webpackChunkName: "SolidIcon" */
            "mdi-react/SolidIcon"
        ),
    ),
    "mdi-sort-alphabetical": React.lazy(() =>
        import(
            /* webpackChunkName: "SortAlphabeticalIcon" */
            "mdi-react/SortAlphabeticalIcon"
        ),
    ),
    "mdi-sort-ascending": React.lazy(() =>
        import(
            /* webpackChunkName: "SortAscendingIcon" */
            "mdi-react/SortAscendingIcon"
        ),
    ),
    "mdi-sort-descending": React.lazy(() =>
        import(
            /* webpackChunkName: "SortDescendingIcon" */
            "mdi-react/SortDescendingIcon"
        ),
    ),
    "mdi-sort-numeric": React.lazy(() =>
        import(
            /* webpackChunkName: "SortNumericIcon" */
            "mdi-react/SortNumericIcon"
        ),
    ),
    "mdi-sort-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "SortVariantIcon" */
            "mdi-react/SortVariantIcon"
        ),
    ),
    "mdi-sort": React.lazy(() =>
        import(
            /* webpackChunkName: "SortIcon" */
            "mdi-react/SortIcon"
        ),
    ),
    "mdi-soundcloud": React.lazy(() =>
        import(
            /* webpackChunkName: "SoundcloudIcon" */
            "mdi-react/SoundcloudIcon"
        ),
    ),
    "mdi-source-branch": React.lazy(() =>
        import(
            /* webpackChunkName: "SourceBranchIcon" */
            "mdi-react/SourceBranchIcon"
        ),
    ),
    "mdi-source-commit-end-local": React.lazy(() =>
        import(
            /* webpackChunkName: "SourceCommitEndLocalIcon" */
            "mdi-react/SourceCommitEndLocalIcon"
        ),
    ),
    "mdi-source-commit-end": React.lazy(() =>
        import(
            /* webpackChunkName: "SourceCommitEndIcon" */
            "mdi-react/SourceCommitEndIcon"
        ),
    ),
    "mdi-source-commit-local": React.lazy(() =>
        import(
            /* webpackChunkName: "SourceCommitLocalIcon" */
            "mdi-react/SourceCommitLocalIcon"
        ),
    ),
    "mdi-source-commit-next-local": React.lazy(() =>
        import(
            /* webpackChunkName: "SourceCommitNextLocalIcon" */
            "mdi-react/SourceCommitNextLocalIcon"
        ),
    ),
    "mdi-source-commit-start-next-local": React.lazy(() =>
        import(
            /* webpackChunkName: "SourceCommitStartNextLocalIcon" */
            "mdi-react/SourceCommitStartNextLocalIcon"
        ),
    ),
    "mdi-source-commit-start": React.lazy(() =>
        import(
            /* webpackChunkName: "SourceCommitStartIcon" */
            "mdi-react/SourceCommitStartIcon"
        ),
    ),
    "mdi-source-commit": React.lazy(() =>
        import(
            /* webpackChunkName: "SourceCommitIcon" */
            "mdi-react/SourceCommitIcon"
        ),
    ),
    "mdi-source-fork": React.lazy(() =>
        import(
            /* webpackChunkName: "SourceForkIcon" */
            "mdi-react/SourceForkIcon"
        ),
    ),
    "mdi-source-merge": React.lazy(() =>
        import(
            /* webpackChunkName: "SourceMergeIcon" */
            "mdi-react/SourceMergeIcon"
        ),
    ),
    "mdi-source-pull": React.lazy(() =>
        import(
            /* webpackChunkName: "SourcePullIcon" */
            "mdi-react/SourcePullIcon"
        ),
    ),
    "mdi-soy-sauce": React.lazy(() =>
        import(
            /* webpackChunkName: "SoySauceIcon" */
            "mdi-react/SoySauceIcon"
        ),
    ),
    "mdi-speaker-bluetooth": React.lazy(() =>
        import(
            /* webpackChunkName: "SpeakerBluetoothIcon" */
            "mdi-react/SpeakerBluetoothIcon"
        ),
    ),
    "mdi-speaker-off": React.lazy(() =>
        import(
            /* webpackChunkName: "SpeakerOffIcon" */
            "mdi-react/SpeakerOffIcon"
        ),
    ),
    "mdi-speaker-wireless": React.lazy(() =>
        import(
            /* webpackChunkName: "SpeakerWirelessIcon" */
            "mdi-react/SpeakerWirelessIcon"
        ),
    ),
    "mdi-speaker": React.lazy(() =>
        import(
            /* webpackChunkName: "SpeakerIcon" */
            "mdi-react/SpeakerIcon"
        ),
    ),
    "mdi-speedometer": React.lazy(() =>
        import(
            /* webpackChunkName: "SpeedometerIcon" */
            "mdi-react/SpeedometerIcon"
        ),
    ),
    "mdi-spellcheck": React.lazy(() =>
        import(
            /* webpackChunkName: "SpellcheckIcon" */
            "mdi-react/SpellcheckIcon"
        ),
    ),
    "mdi-spotify": React.lazy(() =>
        import(
            /* webpackChunkName: "SpotifyIcon" */
            "mdi-react/SpotifyIcon"
        ),
    ),
    "mdi-spotlight-beam": React.lazy(() =>
        import(
            /* webpackChunkName: "SpotlightBeamIcon" */
            "mdi-react/SpotlightBeamIcon"
        ),
    ),
    "mdi-spotlight": React.lazy(() =>
        import(
            /* webpackChunkName: "SpotlightIcon" */
            "mdi-react/SpotlightIcon"
        ),
    ),
    "mdi-spray": React.lazy(() =>
        import(
            /* webpackChunkName: "SprayIcon" */
            "mdi-react/SprayIcon"
        ),
    ),
    "mdi-square-edit-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "SquareEditOutlineIcon" */
            "mdi-react/SquareEditOutlineIcon"
        ),
    ),
    "mdi-square-inc-cash": React.lazy(() =>
        import(
            /* webpackChunkName: "SquareIncCashIcon" */
            "mdi-react/SquareIncCashIcon"
        ),
    ),
    "mdi-square-inc": React.lazy(() =>
        import(
            /* webpackChunkName: "SquareIncIcon" */
            "mdi-react/SquareIncIcon"
        ),
    ),
    "mdi-square-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "SquareOutlineIcon" */
            "mdi-react/SquareOutlineIcon"
        ),
    ),
    "mdi-square-root-box": React.lazy(() =>
        import(
            /* webpackChunkName: "SquareRootBoxIcon" */
            "mdi-react/SquareRootBoxIcon"
        ),
    ),
    "mdi-square-root": React.lazy(() =>
        import(
            /* webpackChunkName: "SquareRootIcon" */
            "mdi-react/SquareRootIcon"
        ),
    ),
    "mdi-square": React.lazy(() =>
        import(
            /* webpackChunkName: "SquareIcon" */
            "mdi-react/SquareIcon"
        ),
    ),
    "mdi-ssh": React.lazy(() =>
        import(
            /* webpackChunkName: "SshIcon" */
            "mdi-react/SshIcon"
        ),
    ),
    "mdi-stack-exchange": React.lazy(() =>
        import(
            /* webpackChunkName: "StackExchangeIcon" */
            "mdi-react/StackExchangeIcon"
        ),
    ),
    "mdi-stack-overflow": React.lazy(() =>
        import(
            /* webpackChunkName: "StackOverflowIcon" */
            "mdi-react/StackOverflowIcon"
        ),
    ),
    "mdi-stadium": React.lazy(() =>
        import(
            /* webpackChunkName: "StadiumIcon" */
            "mdi-react/StadiumIcon"
        ),
    ),
    "mdi-stairs": React.lazy(() =>
        import(
            /* webpackChunkName: "StairsIcon" */
            "mdi-react/StairsIcon"
        ),
    ),
    "mdi-standard-definition": React.lazy(() =>
        import(
            /* webpackChunkName: "StandardDefinitionIcon" */
            "mdi-react/StandardDefinitionIcon"
        ),
    ),
    "mdi-star-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "StarCircleOutlineIcon" */
            "mdi-react/StarCircleOutlineIcon"
        ),
    ),
    "mdi-star-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "StarCircleIcon" */
            "mdi-react/StarCircleIcon"
        ),
    ),
    "mdi-star-face": React.lazy(() =>
        import(
            /* webpackChunkName: "StarFaceIcon" */
            "mdi-react/StarFaceIcon"
        ),
    ),
    "mdi-star-half": React.lazy(() =>
        import(
            /* webpackChunkName: "StarHalfIcon" */
            "mdi-react/StarHalfIcon"
        ),
    ),
    "mdi-star-off": React.lazy(() =>
        import(
            /* webpackChunkName: "StarOffIcon" */
            "mdi-react/StarOffIcon"
        ),
    ),
    "mdi-star-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "StarOutlineIcon" */
            "mdi-react/StarOutlineIcon"
        ),
    ),
    "mdi-star": React.lazy(() =>
        import(
            /* webpackChunkName: "StarIcon" */
            "mdi-react/StarIcon"
        ),
    ),
    "mdi-steam-box": React.lazy(() =>
        import(
            /* webpackChunkName: "SteamBoxIcon" */
            "mdi-react/SteamBoxIcon"
        ),
    ),
    "mdi-steam": React.lazy(() =>
        import(
            /* webpackChunkName: "SteamIcon" */
            "mdi-react/SteamIcon"
        ),
    ),
    "mdi-steering-off": React.lazy(() =>
        import(
            /* webpackChunkName: "SteeringOffIcon" */
            "mdi-react/SteeringOffIcon"
        ),
    ),
    "mdi-steering": React.lazy(() =>
        import(
            /* webpackChunkName: "SteeringIcon" */
            "mdi-react/SteeringIcon"
        ),
    ),
    "mdi-step-backward-2": React.lazy(() =>
        import(
            /* webpackChunkName: "StepBackward2Icon" */
            "mdi-react/StepBackward2Icon"
        ),
    ),
    "mdi-step-backward": React.lazy(() =>
        import(
            /* webpackChunkName: "StepBackwardIcon" */
            "mdi-react/StepBackwardIcon"
        ),
    ),
    "mdi-step-forward-2": React.lazy(() =>
        import(
            /* webpackChunkName: "StepForward2Icon" */
            "mdi-react/StepForward2Icon"
        ),
    ),
    "mdi-step-forward": React.lazy(() =>
        import(
            /* webpackChunkName: "StepForwardIcon" */
            "mdi-react/StepForwardIcon"
        ),
    ),
    "mdi-stethoscope": React.lazy(() =>
        import(
            /* webpackChunkName: "StethoscopeIcon" */
            "mdi-react/StethoscopeIcon"
        ),
    ),
    "mdi-sticker-emoji": React.lazy(() =>
        import(
            /* webpackChunkName: "StickerEmojiIcon" */
            "mdi-react/StickerEmojiIcon"
        ),
    ),
    "mdi-sticker": React.lazy(() =>
        import(
            /* webpackChunkName: "StickerIcon" */
            "mdi-react/StickerIcon"
        ),
    ),
    "mdi-stocking": React.lazy(() =>
        import(
            /* webpackChunkName: "StockingIcon" */
            "mdi-react/StockingIcon"
        ),
    ),
    "mdi-stop-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "StopCircleOutlineIcon" */
            "mdi-react/StopCircleOutlineIcon"
        ),
    ),
    "mdi-stop-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "StopCircleIcon" */
            "mdi-react/StopCircleIcon"
        ),
    ),
    "mdi-stop": React.lazy(() =>
        import(
            /* webpackChunkName: "StopIcon" */
            "mdi-react/StopIcon"
        ),
    ),
    "mdi-store-24-hour": React.lazy(() =>
        import(
            /* webpackChunkName: "Store24HourIcon" */
            "mdi-react/Store24HourIcon"
        ),
    ),
    "mdi-store": React.lazy(() =>
        import(
            /* webpackChunkName: "StoreIcon" */
            "mdi-react/StoreIcon"
        ),
    ),
    "mdi-stove": React.lazy(() =>
        import(
            /* webpackChunkName: "StoveIcon" */
            "mdi-react/StoveIcon"
        ),
    ),
    "mdi-subdirectory-arrow-left": React.lazy(() =>
        import(
            /* webpackChunkName: "SubdirectoryArrowLeftIcon" */
            "mdi-react/SubdirectoryArrowLeftIcon"
        ),
    ),
    "mdi-subdirectory-arrow-right": React.lazy(() =>
        import(
            /* webpackChunkName: "SubdirectoryArrowRightIcon" */
            "mdi-react/SubdirectoryArrowRightIcon"
        ),
    ),
    "mdi-subway-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "SubwayVariantIcon" */
            "mdi-react/SubwayVariantIcon"
        ),
    ),
    "mdi-subway": React.lazy(() =>
        import(
            /* webpackChunkName: "SubwayIcon" */
            "mdi-react/SubwayIcon"
        ),
    ),
    "mdi-summit": React.lazy(() =>
        import(
            /* webpackChunkName: "SummitIcon" */
            "mdi-react/SummitIcon"
        ),
    ),
    "mdi-sunglasses": React.lazy(() =>
        import(
            /* webpackChunkName: "SunglassesIcon" */
            "mdi-react/SunglassesIcon"
        ),
    ),
    "mdi-surround-sound-20": React.lazy(() =>
        import(
            /* webpackChunkName: "SurroundSound20Icon" */
            "mdi-react/SurroundSound20Icon"
        ),
    ),
    "mdi-surround-sound-31": React.lazy(() =>
        import(
            /* webpackChunkName: "SurroundSound31Icon" */
            "mdi-react/SurroundSound31Icon"
        ),
    ),
    "mdi-surround-sound-51": React.lazy(() =>
        import(
            /* webpackChunkName: "SurroundSound51Icon" */
            "mdi-react/SurroundSound51Icon"
        ),
    ),
    "mdi-surround-sound-71": React.lazy(() =>
        import(
            /* webpackChunkName: "SurroundSound71Icon" */
            "mdi-react/SurroundSound71Icon"
        ),
    ),
    "mdi-surround-sound": React.lazy(() =>
        import(
            /* webpackChunkName: "SurroundSoundIcon" */
            "mdi-react/SurroundSoundIcon"
        ),
    ),
    "mdi-svg": React.lazy(() =>
        import(
            /* webpackChunkName: "SvgIcon" */
            "mdi-react/SvgIcon"
        ),
    ),
    "mdi-swap-horizontal-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "SwapHorizontalVariantIcon" */
            "mdi-react/SwapHorizontalVariantIcon"
        ),
    ),
    "mdi-swap-horizontal": React.lazy(() =>
        import(
            /* webpackChunkName: "SwapHorizontalIcon" */
            "mdi-react/SwapHorizontalIcon"
        ),
    ),
    "mdi-swap-vertical-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "SwapVerticalVariantIcon" */
            "mdi-react/SwapVerticalVariantIcon"
        ),
    ),
    "mdi-swap-vertical": React.lazy(() =>
        import(
            /* webpackChunkName: "SwapVerticalIcon" */
            "mdi-react/SwapVerticalIcon"
        ),
    ),
    "mdi-swim": React.lazy(() =>
        import(
            /* webpackChunkName: "SwimIcon" */
            "mdi-react/SwimIcon"
        ),
    ),
    "mdi-switch": React.lazy(() =>
        import(
            /* webpackChunkName: "SwitchIcon" */
            "mdi-react/SwitchIcon"
        ),
    ),
    "mdi-sword-cross": React.lazy(() =>
        import(
            /* webpackChunkName: "SwordCrossIcon" */
            "mdi-react/SwordCrossIcon"
        ),
    ),
    "mdi-sword": React.lazy(() =>
        import(
            /* webpackChunkName: "SwordIcon" */
            "mdi-react/SwordIcon"
        ),
    ),
    "mdi-sync-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "SyncAlertIcon" */
            "mdi-react/SyncAlertIcon"
        ),
    ),
    "mdi-sync-off": React.lazy(() =>
        import(
            /* webpackChunkName: "SyncOffIcon" */
            "mdi-react/SyncOffIcon"
        ),
    ),
    "mdi-sync": React.lazy(() =>
        import(
            /* webpackChunkName: "SyncIcon" */
            "mdi-react/SyncIcon"
        ),
    ),
    "mdi-tab-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "TabPlusIcon" */
            "mdi-react/TabPlusIcon"
        ),
    ),
    "mdi-tab-unselected": React.lazy(() =>
        import(
            /* webpackChunkName: "TabUnselectedIcon" */
            "mdi-react/TabUnselectedIcon"
        ),
    ),
    "mdi-tab": React.lazy(() =>
        import(
            /* webpackChunkName: "TabIcon" */
            "mdi-react/TabIcon"
        ),
    ),
    "mdi-table-column-plus-after": React.lazy(() =>
        import(
            /* webpackChunkName: "TableColumnPlusAfterIcon" */
            "mdi-react/TableColumnPlusAfterIcon"
        ),
    ),
    "mdi-table-column-plus-before": React.lazy(() =>
        import(
            /* webpackChunkName: "TableColumnPlusBeforeIcon" */
            "mdi-react/TableColumnPlusBeforeIcon"
        ),
    ),
    "mdi-table-column-remove": React.lazy(() =>
        import(
            /* webpackChunkName: "TableColumnRemoveIcon" */
            "mdi-react/TableColumnRemoveIcon"
        ),
    ),
    "mdi-table-column-width": React.lazy(() =>
        import(
            /* webpackChunkName: "TableColumnWidthIcon" */
            "mdi-react/TableColumnWidthIcon"
        ),
    ),
    "mdi-table-column": React.lazy(() =>
        import(
            /* webpackChunkName: "TableColumnIcon" */
            "mdi-react/TableColumnIcon"
        ),
    ),
    "mdi-table-edit": React.lazy(() =>
        import(
            /* webpackChunkName: "TableEditIcon" */
            "mdi-react/TableEditIcon"
        ),
    ),
    "mdi-table-large": React.lazy(() =>
        import(
            /* webpackChunkName: "TableLargeIcon" */
            "mdi-react/TableLargeIcon"
        ),
    ),
    "mdi-table-merge-cells": React.lazy(() =>
        import(
            /* webpackChunkName: "TableMergeCellsIcon" */
            "mdi-react/TableMergeCellsIcon"
        ),
    ),
    "mdi-table-of-contents": React.lazy(() =>
        import(
            /* webpackChunkName: "TableOfContentsIcon" */
            "mdi-react/TableOfContentsIcon"
        ),
    ),
    "mdi-table-row-height": React.lazy(() =>
        import(
            /* webpackChunkName: "TableRowHeightIcon" */
            "mdi-react/TableRowHeightIcon"
        ),
    ),
    "mdi-table-row-plus-after": React.lazy(() =>
        import(
            /* webpackChunkName: "TableRowPlusAfterIcon" */
            "mdi-react/TableRowPlusAfterIcon"
        ),
    ),
    "mdi-table-row-plus-before": React.lazy(() =>
        import(
            /* webpackChunkName: "TableRowPlusBeforeIcon" */
            "mdi-react/TableRowPlusBeforeIcon"
        ),
    ),
    "mdi-table-row-remove": React.lazy(() =>
        import(
            /* webpackChunkName: "TableRowRemoveIcon" */
            "mdi-react/TableRowRemoveIcon"
        ),
    ),
    "mdi-table-row": React.lazy(() =>
        import(
            /* webpackChunkName: "TableRowIcon" */
            "mdi-react/TableRowIcon"
        ),
    ),
    "mdi-table-search": React.lazy(() =>
        import(
            /* webpackChunkName: "TableSearchIcon" */
            "mdi-react/TableSearchIcon"
        ),
    ),
    "mdi-table-settings": React.lazy(() =>
        import(
            /* webpackChunkName: "TableSettingsIcon" */
            "mdi-react/TableSettingsIcon"
        ),
    ),
    "mdi-table": React.lazy(() =>
        import(
            /* webpackChunkName: "TableIcon" */
            "mdi-react/TableIcon"
        ),
    ),
    "mdi-tablet-android": React.lazy(() =>
        import(
            /* webpackChunkName: "TabletAndroidIcon" */
            "mdi-react/TabletAndroidIcon"
        ),
    ),
    "mdi-tablet-cellphone": React.lazy(() =>
        import(
            /* webpackChunkName: "TabletCellphoneIcon" */
            "mdi-react/TabletCellphoneIcon"
        ),
    ),
    "mdi-tablet-ipad": React.lazy(() =>
        import(
            /* webpackChunkName: "TabletIpadIcon" */
            "mdi-react/TabletIpadIcon"
        ),
    ),
    "mdi-tablet": React.lazy(() =>
        import(
            /* webpackChunkName: "TabletIcon" */
            "mdi-react/TabletIcon"
        ),
    ),
    "mdi-taco": React.lazy(() =>
        import(
            /* webpackChunkName: "TacoIcon" */
            "mdi-react/TacoIcon"
        ),
    ),
    "mdi-tag-faces": React.lazy(() =>
        import(
            /* webpackChunkName: "TagFacesIcon" */
            "mdi-react/TagFacesIcon"
        ),
    ),
    "mdi-tag-heart": React.lazy(() =>
        import(
            /* webpackChunkName: "TagHeartIcon" */
            "mdi-react/TagHeartIcon"
        ),
    ),
    "mdi-tag-minus": React.lazy(() =>
        import(
            /* webpackChunkName: "TagMinusIcon" */
            "mdi-react/TagMinusIcon"
        ),
    ),
    "mdi-tag-multiple": React.lazy(() =>
        import(
            /* webpackChunkName: "TagMultipleIcon" */
            "mdi-react/TagMultipleIcon"
        ),
    ),
    "mdi-tag-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "TagOutlineIcon" */
            "mdi-react/TagOutlineIcon"
        ),
    ),
    "mdi-tag-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "TagPlusIcon" */
            "mdi-react/TagPlusIcon"
        ),
    ),
    "mdi-tag-remove": React.lazy(() =>
        import(
            /* webpackChunkName: "TagRemoveIcon" */
            "mdi-react/TagRemoveIcon"
        ),
    ),
    "mdi-tag-text-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "TagTextOutlineIcon" */
            "mdi-react/TagTextOutlineIcon"
        ),
    ),
    "mdi-tag": React.lazy(() =>
        import(
            /* webpackChunkName: "TagIcon" */
            "mdi-react/TagIcon"
        ),
    ),
    "mdi-target": React.lazy(() =>
        import(
            /* webpackChunkName: "TargetIcon" */
            "mdi-react/TargetIcon"
        ),
    ),
    "mdi-taxi": React.lazy(() =>
        import(
            /* webpackChunkName: "TaxiIcon" */
            "mdi-react/TaxiIcon"
        ),
    ),
    "mdi-teach": React.lazy(() =>
        import(
            /* webpackChunkName: "TeachIcon" */
            "mdi-react/TeachIcon"
        ),
    ),
    "mdi-teamviewer": React.lazy(() =>
        import(
            /* webpackChunkName: "TeamviewerIcon" */
            "mdi-react/TeamviewerIcon"
        ),
    ),
    "mdi-telegram": React.lazy(() =>
        import(
            /* webpackChunkName: "TelegramIcon" */
            "mdi-react/TelegramIcon"
        ),
    ),
    "mdi-television-box": React.lazy(() =>
        import(
            /* webpackChunkName: "TelevisionBoxIcon" */
            "mdi-react/TelevisionBoxIcon"
        ),
    ),
    "mdi-television-classic-off": React.lazy(() =>
        import(
            /* webpackChunkName: "TelevisionClassicOffIcon" */
            "mdi-react/TelevisionClassicOffIcon"
        ),
    ),
    "mdi-television-classic": React.lazy(() =>
        import(
            /* webpackChunkName: "TelevisionClassicIcon" */
            "mdi-react/TelevisionClassicIcon"
        ),
    ),
    "mdi-television-guide": React.lazy(() =>
        import(
            /* webpackChunkName: "TelevisionGuideIcon" */
            "mdi-react/TelevisionGuideIcon"
        ),
    ),
    "mdi-television-off": React.lazy(() =>
        import(
            /* webpackChunkName: "TelevisionOffIcon" */
            "mdi-react/TelevisionOffIcon"
        ),
    ),
    "mdi-television": React.lazy(() =>
        import(
            /* webpackChunkName: "TelevisionIcon" */
            "mdi-react/TelevisionIcon"
        ),
    ),
    "mdi-temperature-celsius": React.lazy(() =>
        import(
            /* webpackChunkName: "TemperatureCelsiusIcon" */
            "mdi-react/TemperatureCelsiusIcon"
        ),
    ),
    "mdi-temperature-fahrenheit": React.lazy(() =>
        import(
            /* webpackChunkName: "TemperatureFahrenheitIcon" */
            "mdi-react/TemperatureFahrenheitIcon"
        ),
    ),
    "mdi-temperature-kelvin": React.lazy(() =>
        import(
            /* webpackChunkName: "TemperatureKelvinIcon" */
            "mdi-react/TemperatureKelvinIcon"
        ),
    ),
    "mdi-tennis": React.lazy(() =>
        import(
            /* webpackChunkName: "TennisIcon" */
            "mdi-react/TennisIcon"
        ),
    ),
    "mdi-tent": React.lazy(() =>
        import(
            /* webpackChunkName: "TentIcon" */
            "mdi-react/TentIcon"
        ),
    ),
    "mdi-terrain": React.lazy(() =>
        import(
            /* webpackChunkName: "TerrainIcon" */
            "mdi-react/TerrainIcon"
        ),
    ),
    "mdi-test-tube-empty": React.lazy(() =>
        import(
            /* webpackChunkName: "TestTubeEmptyIcon" */
            "mdi-react/TestTubeEmptyIcon"
        ),
    ),
    "mdi-test-tube-off": React.lazy(() =>
        import(
            /* webpackChunkName: "TestTubeOffIcon" */
            "mdi-react/TestTubeOffIcon"
        ),
    ),
    "mdi-test-tube": React.lazy(() =>
        import(
            /* webpackChunkName: "TestTubeIcon" */
            "mdi-react/TestTubeIcon"
        ),
    ),
    "mdi-text-shadow": React.lazy(() =>
        import(
            /* webpackChunkName: "TextShadowIcon" */
            "mdi-react/TextShadowIcon"
        ),
    ),
    "mdi-text-short": React.lazy(() =>
        import(
            /* webpackChunkName: "TextShortIcon" */
            "mdi-react/TextShortIcon"
        ),
    ),
    "mdi-text-subject": React.lazy(() =>
        import(
            /* webpackChunkName: "TextSubjectIcon" */
            "mdi-react/TextSubjectIcon"
        ),
    ),
    "mdi-text-to-speech-off": React.lazy(() =>
        import(
            /* webpackChunkName: "TextToSpeechOffIcon" */
            "mdi-react/TextToSpeechOffIcon"
        ),
    ),
    "mdi-text-to-speech": React.lazy(() =>
        import(
            /* webpackChunkName: "TextToSpeechIcon" */
            "mdi-react/TextToSpeechIcon"
        ),
    ),
    "mdi-text": React.lazy(() =>
        import(
            /* webpackChunkName: "TextIcon" */
            "mdi-react/TextIcon"
        ),
    ),
    "mdi-textbox-password": React.lazy(() =>
        import(
            /* webpackChunkName: "TextboxPasswordIcon" */
            "mdi-react/TextboxPasswordIcon"
        ),
    ),
    "mdi-textbox": React.lazy(() =>
        import(
            /* webpackChunkName: "TextboxIcon" */
            "mdi-react/TextboxIcon"
        ),
    ),
    "mdi-texture": React.lazy(() =>
        import(
            /* webpackChunkName: "TextureIcon" */
            "mdi-react/TextureIcon"
        ),
    ),
    "mdi-theater": React.lazy(() =>
        import(
            /* webpackChunkName: "TheaterIcon" */
            "mdi-react/TheaterIcon"
        ),
    ),
    "mdi-theme-light-dark": React.lazy(() =>
        import(
            /* webpackChunkName: "ThemeLightDarkIcon" */
            "mdi-react/ThemeLightDarkIcon"
        ),
    ),
    "mdi-thermometer-lines": React.lazy(() =>
        import(
            /* webpackChunkName: "ThermometerLinesIcon" */
            "mdi-react/ThermometerLinesIcon"
        ),
    ),
    "mdi-thermometer": React.lazy(() =>
        import(
            /* webpackChunkName: "ThermometerIcon" */
            "mdi-react/ThermometerIcon"
        ),
    ),
    "mdi-thermostat-box": React.lazy(() =>
        import(
            /* webpackChunkName: "ThermostatBoxIcon" */
            "mdi-react/ThermostatBoxIcon"
        ),
    ),
    "mdi-thermostat": React.lazy(() =>
        import(
            /* webpackChunkName: "ThermostatIcon" */
            "mdi-react/ThermostatIcon"
        ),
    ),
    "mdi-thought-bubble-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "ThoughtBubbleOutlineIcon" */
            "mdi-react/ThoughtBubbleOutlineIcon"
        ),
    ),
    "mdi-thought-bubble": React.lazy(() =>
        import(
            /* webpackChunkName: "ThoughtBubbleIcon" */
            "mdi-react/ThoughtBubbleIcon"
        ),
    ),
    "mdi-thumb-down-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "ThumbDownOutlineIcon" */
            "mdi-react/ThumbDownOutlineIcon"
        ),
    ),
    "mdi-thumb-down": React.lazy(() =>
        import(
            /* webpackChunkName: "ThumbDownIcon" */
            "mdi-react/ThumbDownIcon"
        ),
    ),
    "mdi-thumb-up-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "ThumbUpOutlineIcon" */
            "mdi-react/ThumbUpOutlineIcon"
        ),
    ),
    "mdi-thumb-up": React.lazy(() =>
        import(
            /* webpackChunkName: "ThumbUpIcon" */
            "mdi-react/ThumbUpIcon"
        ),
    ),
    "mdi-thumbs-up-down": React.lazy(() =>
        import(
            /* webpackChunkName: "ThumbsUpDownIcon" */
            "mdi-react/ThumbsUpDownIcon"
        ),
    ),
    "mdi-ticket-account": React.lazy(() =>
        import(
            /* webpackChunkName: "TicketAccountIcon" */
            "mdi-react/TicketAccountIcon"
        ),
    ),
    "mdi-ticket-confirmation": React.lazy(() =>
        import(
            /* webpackChunkName: "TicketConfirmationIcon" */
            "mdi-react/TicketConfirmationIcon"
        ),
    ),
    "mdi-ticket-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "TicketOutlineIcon" */
            "mdi-react/TicketOutlineIcon"
        ),
    ),
    "mdi-ticket-percent": React.lazy(() =>
        import(
            /* webpackChunkName: "TicketPercentIcon" */
            "mdi-react/TicketPercentIcon"
        ),
    ),
    "mdi-ticket": React.lazy(() =>
        import(
            /* webpackChunkName: "TicketIcon" */
            "mdi-react/TicketIcon"
        ),
    ),
    "mdi-tie": React.lazy(() =>
        import(
            /* webpackChunkName: "TieIcon" */
            "mdi-react/TieIcon"
        ),
    ),
    "mdi-tilde": React.lazy(() =>
        import(
            /* webpackChunkName: "TildeIcon" */
            "mdi-react/TildeIcon"
        ),
    ),
    "mdi-timelapse": React.lazy(() =>
        import(
            /* webpackChunkName: "TimelapseIcon" */
            "mdi-react/TimelapseIcon"
        ),
    ),
    "mdi-timer-10": React.lazy(() =>
        import(
            /* webpackChunkName: "Timer10Icon" */
            "mdi-react/Timer10Icon"
        ),
    ),
    "mdi-timer-3": React.lazy(() =>
        import(
            /* webpackChunkName: "Timer3Icon" */
            "mdi-react/Timer3Icon"
        ),
    ),
    "mdi-timer-off": React.lazy(() =>
        import(
            /* webpackChunkName: "TimerOffIcon" */
            "mdi-react/TimerOffIcon"
        ),
    ),
    "mdi-timer-sand-empty": React.lazy(() =>
        import(
            /* webpackChunkName: "TimerSandEmptyIcon" */
            "mdi-react/TimerSandEmptyIcon"
        ),
    ),
    "mdi-timer-sand-full": React.lazy(() =>
        import(
            /* webpackChunkName: "TimerSandFullIcon" */
            "mdi-react/TimerSandFullIcon"
        ),
    ),
    "mdi-timer-sand": React.lazy(() =>
        import(
            /* webpackChunkName: "TimerSandIcon" */
            "mdi-react/TimerSandIcon"
        ),
    ),
    "mdi-timer": React.lazy(() =>
        import(
            /* webpackChunkName: "TimerIcon" */
            "mdi-react/TimerIcon"
        ),
    ),
    "mdi-timetable": React.lazy(() =>
        import(
            /* webpackChunkName: "TimetableIcon" */
            "mdi-react/TimetableIcon"
        ),
    ),
    "mdi-toggle-switch-off": React.lazy(() =>
        import(
            /* webpackChunkName: "ToggleSwitchOffIcon" */
            "mdi-react/ToggleSwitchOffIcon"
        ),
    ),
    "mdi-toggle-switch": React.lazy(() =>
        import(
            /* webpackChunkName: "ToggleSwitchIcon" */
            "mdi-react/ToggleSwitchIcon"
        ),
    ),
    "mdi-toilet": React.lazy(() =>
        import(
            /* webpackChunkName: "ToiletIcon" */
            "mdi-react/ToiletIcon"
        ),
    ),
    "mdi-toolbox-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "ToolboxOutlineIcon" */
            "mdi-react/ToolboxOutlineIcon"
        ),
    ),
    "mdi-toolbox": React.lazy(() =>
        import(
            /* webpackChunkName: "ToolboxIcon" */
            "mdi-react/ToolboxIcon"
        ),
    ),
    "mdi-tooltip-edit": React.lazy(() =>
        import(
            /* webpackChunkName: "TooltipEditIcon" */
            "mdi-react/TooltipEditIcon"
        ),
    ),
    "mdi-tooltip-image": React.lazy(() =>
        import(
            /* webpackChunkName: "TooltipImageIcon" */
            "mdi-react/TooltipImageIcon"
        ),
    ),
    "mdi-tooltip-outline-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "TooltipOutlinePlusIcon" */
            "mdi-react/TooltipOutlinePlusIcon"
        ),
    ),
    "mdi-tooltip-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "TooltipOutlineIcon" */
            "mdi-react/TooltipOutlineIcon"
        ),
    ),
    "mdi-tooltip-text": React.lazy(() =>
        import(
            /* webpackChunkName: "TooltipTextIcon" */
            "mdi-react/TooltipTextIcon"
        ),
    ),
    "mdi-tooltip": React.lazy(() =>
        import(
            /* webpackChunkName: "TooltipIcon" */
            "mdi-react/TooltipIcon"
        ),
    ),
    "mdi-tooth-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "ToothOutlineIcon" */
            "mdi-react/ToothOutlineIcon"
        ),
    ),
    "mdi-tooth": React.lazy(() =>
        import(
            /* webpackChunkName: "ToothIcon" */
            "mdi-react/ToothIcon"
        ),
    ),
    "mdi-tor": React.lazy(() =>
        import(
            /* webpackChunkName: "TorIcon" */
            "mdi-react/TorIcon"
        ),
    ),
    "mdi-tournament": React.lazy(() =>
        import(
            /* webpackChunkName: "TournamentIcon" */
            "mdi-react/TournamentIcon"
        ),
    ),
    "mdi-tower-beach": React.lazy(() =>
        import(
            /* webpackChunkName: "TowerBeachIcon" */
            "mdi-react/TowerBeachIcon"
        ),
    ),
    "mdi-tower-fire": React.lazy(() =>
        import(
            /* webpackChunkName: "TowerFireIcon" */
            "mdi-react/TowerFireIcon"
        ),
    ),
    "mdi-towing": React.lazy(() =>
        import(
            /* webpackChunkName: "TowingIcon" */
            "mdi-react/TowingIcon"
        ),
    ),
    "mdi-track-light": React.lazy(() =>
        import(
            /* webpackChunkName: "TrackLightIcon" */
            "mdi-react/TrackLightIcon"
        ),
    ),
    "mdi-trackpad-lock": React.lazy(() =>
        import(
            /* webpackChunkName: "TrackpadLockIcon" */
            "mdi-react/TrackpadLockIcon"
        ),
    ),
    "mdi-trackpad": React.lazy(() =>
        import(
            /* webpackChunkName: "TrackpadIcon" */
            "mdi-react/TrackpadIcon"
        ),
    ),
    "mdi-tractor": React.lazy(() =>
        import(
            /* webpackChunkName: "TractorIcon" */
            "mdi-react/TractorIcon"
        ),
    ),
    "mdi-traffic-light": React.lazy(() =>
        import(
            /* webpackChunkName: "TrafficLightIcon" */
            "mdi-react/TrafficLightIcon"
        ),
    ),
    "mdi-train-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "TrainVariantIcon" */
            "mdi-react/TrainVariantIcon"
        ),
    ),
    "mdi-train": React.lazy(() =>
        import(
            /* webpackChunkName: "TrainIcon" */
            "mdi-react/TrainIcon"
        ),
    ),
    "mdi-tram": React.lazy(() =>
        import(
            /* webpackChunkName: "TramIcon" */
            "mdi-react/TramIcon"
        ),
    ),
    "mdi-transcribe-close": React.lazy(() =>
        import(
            /* webpackChunkName: "TranscribeCloseIcon" */
            "mdi-react/TranscribeCloseIcon"
        ),
    ),
    "mdi-transcribe": React.lazy(() =>
        import(
            /* webpackChunkName: "TranscribeIcon" */
            "mdi-react/TranscribeIcon"
        ),
    ),
    "mdi-transfer": React.lazy(() =>
        import(
            /* webpackChunkName: "TransferIcon" */
            "mdi-react/TransferIcon"
        ),
    ),
    "mdi-transit-transfer": React.lazy(() =>
        import(
            /* webpackChunkName: "TransitTransferIcon" */
            "mdi-react/TransitTransferIcon"
        ),
    ),
    "mdi-transition-masked": React.lazy(() =>
        import(
            /* webpackChunkName: "TransitionMaskedIcon" */
            "mdi-react/TransitionMaskedIcon"
        ),
    ),
    "mdi-transition": React.lazy(() =>
        import(
            /* webpackChunkName: "TransitionIcon" */
            "mdi-react/TransitionIcon"
        ),
    ),
    "mdi-translate": React.lazy(() =>
        import(
            /* webpackChunkName: "TranslateIcon" */
            "mdi-react/TranslateIcon"
        ),
    ),
    "mdi-treasure-chest": React.lazy(() =>
        import(
            /* webpackChunkName: "TreasureChestIcon" */
            "mdi-react/TreasureChestIcon"
        ),
    ),
    "mdi-tree": React.lazy(() =>
        import(
            /* webpackChunkName: "TreeIcon" */
            "mdi-react/TreeIcon"
        ),
    ),
    "mdi-trello": React.lazy(() =>
        import(
            /* webpackChunkName: "TrelloIcon" */
            "mdi-react/TrelloIcon"
        ),
    ),
    "mdi-trending-down": React.lazy(() =>
        import(
            /* webpackChunkName: "TrendingDownIcon" */
            "mdi-react/TrendingDownIcon"
        ),
    ),
    "mdi-trending-neutral": React.lazy(() =>
        import(
            /* webpackChunkName: "TrendingNeutralIcon" */
            "mdi-react/TrendingNeutralIcon"
        ),
    ),
    "mdi-trending-up": React.lazy(() =>
        import(
            /* webpackChunkName: "TrendingUpIcon" */
            "mdi-react/TrendingUpIcon"
        ),
    ),
    "mdi-triangle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "TriangleOutlineIcon" */
            "mdi-react/TriangleOutlineIcon"
        ),
    ),
    "mdi-triangle": React.lazy(() =>
        import(
            /* webpackChunkName: "TriangleIcon" */
            "mdi-react/TriangleIcon"
        ),
    ),
    "mdi-trophy-award": React.lazy(() =>
        import(
            /* webpackChunkName: "TrophyAwardIcon" */
            "mdi-react/TrophyAwardIcon"
        ),
    ),
    "mdi-trophy-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "TrophyOutlineIcon" */
            "mdi-react/TrophyOutlineIcon"
        ),
    ),
    "mdi-trophy-variant-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "TrophyVariantOutlineIcon" */
            "mdi-react/TrophyVariantOutlineIcon"
        ),
    ),
    "mdi-trophy-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "TrophyVariantIcon" */
            "mdi-react/TrophyVariantIcon"
        ),
    ),
    "mdi-trophy": React.lazy(() =>
        import(
            /* webpackChunkName: "TrophyIcon" */
            "mdi-react/TrophyIcon"
        ),
    ),
    "mdi-truck-delivery": React.lazy(() =>
        import(
            /* webpackChunkName: "TruckDeliveryIcon" */
            "mdi-react/TruckDeliveryIcon"
        ),
    ),
    "mdi-truck-fast": React.lazy(() =>
        import(
            /* webpackChunkName: "TruckFastIcon" */
            "mdi-react/TruckFastIcon"
        ),
    ),
    "mdi-truck-trailer": React.lazy(() =>
        import(
            /* webpackChunkName: "TruckTrailerIcon" */
            "mdi-react/TruckTrailerIcon"
        ),
    ),
    "mdi-truck": React.lazy(() =>
        import(
            /* webpackChunkName: "TruckIcon" */
            "mdi-react/TruckIcon"
        ),
    ),
    "mdi-tshirt-crew": React.lazy(() =>
        import(
            /* webpackChunkName: "TshirtCrewIcon" */
            "mdi-react/TshirtCrewIcon"
        ),
    ),
    "mdi-tshirt-v": React.lazy(() =>
        import(
            /* webpackChunkName: "TshirtVIcon" */
            "mdi-react/TshirtVIcon"
        ),
    ),
    "mdi-tumble-dryer": React.lazy(() =>
        import(
            /* webpackChunkName: "TumbleDryerIcon" */
            "mdi-react/TumbleDryerIcon"
        ),
    ),
    "mdi-tumblr-box": React.lazy(() =>
        import(
            /* webpackChunkName: "TumblrBoxIcon" */
            "mdi-react/TumblrBoxIcon"
        ),
    ),
    "mdi-tumblr-reblog": React.lazy(() =>
        import(
            /* webpackChunkName: "TumblrReblogIcon" */
            "mdi-react/TumblrReblogIcon"
        ),
    ),
    "mdi-tumblr": React.lazy(() =>
        import(
            /* webpackChunkName: "TumblrIcon" */
            "mdi-react/TumblrIcon"
        ),
    ),
    "mdi-tune-vertical": React.lazy(() =>
        import(
            /* webpackChunkName: "TuneVerticalIcon" */
            "mdi-react/TuneVerticalIcon"
        ),
    ),
    "mdi-tune": React.lazy(() =>
        import(
            /* webpackChunkName: "TuneIcon" */
            "mdi-react/TuneIcon"
        ),
    ),
    "mdi-twitch": React.lazy(() =>
        import(
            /* webpackChunkName: "TwitchIcon" */
            "mdi-react/TwitchIcon"
        ),
    ),
    "mdi-twitter-box": React.lazy(() =>
        import(
            /* webpackChunkName: "TwitterBoxIcon" */
            "mdi-react/TwitterBoxIcon"
        ),
    ),
    "mdi-twitter-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "TwitterCircleIcon" */
            "mdi-react/TwitterCircleIcon"
        ),
    ),
    "mdi-twitter-retweet": React.lazy(() =>
        import(
            /* webpackChunkName: "TwitterRetweetIcon" */
            "mdi-react/TwitterRetweetIcon"
        ),
    ),
    "mdi-twitter": React.lazy(() =>
        import(
            /* webpackChunkName: "TwitterIcon" */
            "mdi-react/TwitterIcon"
        ),
    ),
    "mdi-two-factor-authentication": React.lazy(() =>
        import(
            /* webpackChunkName: "TwoFactorAuthenticationIcon" */
            "mdi-react/TwoFactorAuthenticationIcon"
        ),
    ),
    "mdi-uber": React.lazy(() =>
        import(
            /* webpackChunkName: "UberIcon" */
            "mdi-react/UberIcon"
        ),
    ),
    "mdi-ubuntu": React.lazy(() =>
        import(
            /* webpackChunkName: "UbuntuIcon" */
            "mdi-react/UbuntuIcon"
        ),
    ),
    "mdi-ultra-high-definition": React.lazy(() =>
        import(
            /* webpackChunkName: "UltraHighDefinitionIcon" */
            "mdi-react/UltraHighDefinitionIcon"
        ),
    ),
    "mdi-umbraco": React.lazy(() =>
        import(
            /* webpackChunkName: "UmbracoIcon" */
            "mdi-react/UmbracoIcon"
        ),
    ),
    "mdi-umbrella-closed": React.lazy(() =>
        import(
            /* webpackChunkName: "UmbrellaClosedIcon" */
            "mdi-react/UmbrellaClosedIcon"
        ),
    ),
    "mdi-umbrella-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "UmbrellaOutlineIcon" */
            "mdi-react/UmbrellaOutlineIcon"
        ),
    ),
    "mdi-umbrella": React.lazy(() =>
        import(
            /* webpackChunkName: "UmbrellaIcon" */
            "mdi-react/UmbrellaIcon"
        ),
    ),
    "mdi-undo-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "UndoVariantIcon" */
            "mdi-react/UndoVariantIcon"
        ),
    ),
    "mdi-undo": React.lazy(() =>
        import(
            /* webpackChunkName: "UndoIcon" */
            "mdi-react/UndoIcon"
        ),
    ),
    "mdi-unfold-less-horizontal": React.lazy(() =>
        import(
            /* webpackChunkName: "UnfoldLessHorizontalIcon" */
            "mdi-react/UnfoldLessHorizontalIcon"
        ),
    ),
    "mdi-unfold-less-vertical": React.lazy(() =>
        import(
            /* webpackChunkName: "UnfoldLessVerticalIcon" */
            "mdi-react/UnfoldLessVerticalIcon"
        ),
    ),
    "mdi-unfold-more-horizontal": React.lazy(() =>
        import(
            /* webpackChunkName: "UnfoldMoreHorizontalIcon" */
            "mdi-react/UnfoldMoreHorizontalIcon"
        ),
    ),
    "mdi-unfold-more-vertical": React.lazy(() =>
        import(
            /* webpackChunkName: "UnfoldMoreVerticalIcon" */
            "mdi-react/UnfoldMoreVerticalIcon"
        ),
    ),
    "mdi-ungroup": React.lazy(() =>
        import(
            /* webpackChunkName: "UngroupIcon" */
            "mdi-react/UngroupIcon"
        ),
    ),
    "mdi-unity": React.lazy(() =>
        import(
            /* webpackChunkName: "UnityIcon" */
            "mdi-react/UnityIcon"
        ),
    ),
    "mdi-unreal": React.lazy(() =>
        import(
            /* webpackChunkName: "UnrealIcon" */
            "mdi-react/UnrealIcon"
        ),
    ),
    "mdi-untappd": React.lazy(() =>
        import(
            /* webpackChunkName: "UntappdIcon" */
            "mdi-react/UntappdIcon"
        ),
    ),
    "mdi-update": React.lazy(() =>
        import(
            /* webpackChunkName: "UpdateIcon" */
            "mdi-react/UpdateIcon"
        ),
    ),
    "mdi-upload-multiple": React.lazy(() =>
        import(
            /* webpackChunkName: "UploadMultipleIcon" */
            "mdi-react/UploadMultipleIcon"
        ),
    ),
    "mdi-upload-network": React.lazy(() =>
        import(
            /* webpackChunkName: "UploadNetworkIcon" */
            "mdi-react/UploadNetworkIcon"
        ),
    ),
    "mdi-upload": React.lazy(() =>
        import(
            /* webpackChunkName: "UploadIcon" */
            "mdi-react/UploadIcon"
        ),
    ),
    "mdi-usb": React.lazy(() =>
        import(
            /* webpackChunkName: "UsbIcon" */
            "mdi-react/UsbIcon"
        ),
    ),
    "mdi-van-passenger": React.lazy(() =>
        import(
            /* webpackChunkName: "VanPassengerIcon" */
            "mdi-react/VanPassengerIcon"
        ),
    ),
    "mdi-van-utility": React.lazy(() =>
        import(
            /* webpackChunkName: "VanUtilityIcon" */
            "mdi-react/VanUtilityIcon"
        ),
    ),
    "mdi-vanish": React.lazy(() =>
        import(
            /* webpackChunkName: "VanishIcon" */
            "mdi-react/VanishIcon"
        ),
    ),
    "mdi-vector-arrange-above": React.lazy(() =>
        import(
            /* webpackChunkName: "VectorArrangeAboveIcon" */
            "mdi-react/VectorArrangeAboveIcon"
        ),
    ),
    "mdi-vector-arrange-below": React.lazy(() =>
        import(
            /* webpackChunkName: "VectorArrangeBelowIcon" */
            "mdi-react/VectorArrangeBelowIcon"
        ),
    ),
    "mdi-vector-circle-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "VectorCircleVariantIcon" */
            "mdi-react/VectorCircleVariantIcon"
        ),
    ),
    "mdi-vector-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "VectorCircleIcon" */
            "mdi-react/VectorCircleIcon"
        ),
    ),
    "mdi-vector-combine": React.lazy(() =>
        import(
            /* webpackChunkName: "VectorCombineIcon" */
            "mdi-react/VectorCombineIcon"
        ),
    ),
    "mdi-vector-curve": React.lazy(() =>
        import(
            /* webpackChunkName: "VectorCurveIcon" */
            "mdi-react/VectorCurveIcon"
        ),
    ),
    "mdi-vector-difference-ab": React.lazy(() =>
        import(
            /* webpackChunkName: "VectorDifferenceAbIcon" */
            "mdi-react/VectorDifferenceAbIcon"
        ),
    ),
    "mdi-vector-difference-ba": React.lazy(() =>
        import(
            /* webpackChunkName: "VectorDifferenceBaIcon" */
            "mdi-react/VectorDifferenceBaIcon"
        ),
    ),
    "mdi-vector-difference": React.lazy(() =>
        import(
            /* webpackChunkName: "VectorDifferenceIcon" */
            "mdi-react/VectorDifferenceIcon"
        ),
    ),
    "mdi-vector-ellipse": React.lazy(() =>
        import(
            /* webpackChunkName: "VectorEllipseIcon" */
            "mdi-react/VectorEllipseIcon"
        ),
    ),
    "mdi-vector-intersection": React.lazy(() =>
        import(
            /* webpackChunkName: "VectorIntersectionIcon" */
            "mdi-react/VectorIntersectionIcon"
        ),
    ),
    "mdi-vector-line": React.lazy(() =>
        import(
            /* webpackChunkName: "VectorLineIcon" */
            "mdi-react/VectorLineIcon"
        ),
    ),
    "mdi-vector-point": React.lazy(() =>
        import(
            /* webpackChunkName: "VectorPointIcon" */
            "mdi-react/VectorPointIcon"
        ),
    ),
    "mdi-vector-polygon": React.lazy(() =>
        import(
            /* webpackChunkName: "VectorPolygonIcon" */
            "mdi-react/VectorPolygonIcon"
        ),
    ),
    "mdi-vector-polyline": React.lazy(() =>
        import(
            /* webpackChunkName: "VectorPolylineIcon" */
            "mdi-react/VectorPolylineIcon"
        ),
    ),
    "mdi-vector-radius": React.lazy(() =>
        import(
            /* webpackChunkName: "VectorRadiusIcon" */
            "mdi-react/VectorRadiusIcon"
        ),
    ),
    "mdi-vector-rectangle": React.lazy(() =>
        import(
            /* webpackChunkName: "VectorRectangleIcon" */
            "mdi-react/VectorRectangleIcon"
        ),
    ),
    "mdi-vector-selection": React.lazy(() =>
        import(
            /* webpackChunkName: "VectorSelectionIcon" */
            "mdi-react/VectorSelectionIcon"
        ),
    ),
    "mdi-vector-square": React.lazy(() =>
        import(
            /* webpackChunkName: "VectorSquareIcon" */
            "mdi-react/VectorSquareIcon"
        ),
    ),
    "mdi-vector-triangle": React.lazy(() =>
        import(
            /* webpackChunkName: "VectorTriangleIcon" */
            "mdi-react/VectorTriangleIcon"
        ),
    ),
    "mdi-vector-union": React.lazy(() =>
        import(
            /* webpackChunkName: "VectorUnionIcon" */
            "mdi-react/VectorUnionIcon"
        ),
    ),
    "mdi-venmo": React.lazy(() =>
        import(
            /* webpackChunkName: "VenmoIcon" */
            "mdi-react/VenmoIcon"
        ),
    ),
    "mdi-verified": React.lazy(() =>
        import(
            /* webpackChunkName: "VerifiedIcon" */
            "mdi-react/VerifiedIcon"
        ),
    ),
    "mdi-vibrate": React.lazy(() =>
        import(
            /* webpackChunkName: "VibrateIcon" */
            "mdi-react/VibrateIcon"
        ),
    ),
    "mdi-video-3-d": React.lazy(() =>
        import(
            /* webpackChunkName: "Video3dIcon" */
            "mdi-react/Video3dIcon"
        ),
    ),
    "mdi-video-4-k-box": React.lazy(() =>
        import(
            /* webpackChunkName: "Video4kBoxIcon" */
            "mdi-react/Video4kBoxIcon"
        ),
    ),
    "mdi-video-account": React.lazy(() =>
        import(
            /* webpackChunkName: "VideoAccountIcon" */
            "mdi-react/VideoAccountIcon"
        ),
    ),
    "mdi-video-image": React.lazy(() =>
        import(
            /* webpackChunkName: "VideoImageIcon" */
            "mdi-react/VideoImageIcon"
        ),
    ),
    "mdi-video-input-antenna": React.lazy(() =>
        import(
            /* webpackChunkName: "VideoInputAntennaIcon" */
            "mdi-react/VideoInputAntennaIcon"
        ),
    ),
    "mdi-video-input-component": React.lazy(() =>
        import(
            /* webpackChunkName: "VideoInputComponentIcon" */
            "mdi-react/VideoInputComponentIcon"
        ),
    ),
    "mdi-video-input-hdmi": React.lazy(() =>
        import(
            /* webpackChunkName: "VideoInputHdmiIcon" */
            "mdi-react/VideoInputHdmiIcon"
        ),
    ),
    "mdi-video-input-svideo": React.lazy(() =>
        import(
            /* webpackChunkName: "VideoInputSvideoIcon" */
            "mdi-react/VideoInputSvideoIcon"
        ),
    ),
    "mdi-video-minus": React.lazy(() =>
        import(
            /* webpackChunkName: "VideoMinusIcon" */
            "mdi-react/VideoMinusIcon"
        ),
    ),
    "mdi-video-off": React.lazy(() =>
        import(
            /* webpackChunkName: "VideoOffIcon" */
            "mdi-react/VideoOffIcon"
        ),
    ),
    "mdi-video-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "VideoPlusIcon" */
            "mdi-react/VideoPlusIcon"
        ),
    ),
    "mdi-video-stabilization": React.lazy(() =>
        import(
            /* webpackChunkName: "VideoStabilizationIcon" */
            "mdi-react/VideoStabilizationIcon"
        ),
    ),
    "mdi-video-switch": React.lazy(() =>
        import(
            /* webpackChunkName: "VideoSwitchIcon" */
            "mdi-react/VideoSwitchIcon"
        ),
    ),
    "mdi-video": React.lazy(() =>
        import(
            /* webpackChunkName: "VideoIcon" */
            "mdi-react/VideoIcon"
        ),
    ),
    "mdi-view-agenda": React.lazy(() =>
        import(
            /* webpackChunkName: "ViewAgendaIcon" */
            "mdi-react/ViewAgendaIcon"
        ),
    ),
    "mdi-view-array": React.lazy(() =>
        import(
            /* webpackChunkName: "ViewArrayIcon" */
            "mdi-react/ViewArrayIcon"
        ),
    ),
    "mdi-view-carousel": React.lazy(() =>
        import(
            /* webpackChunkName: "ViewCarouselIcon" */
            "mdi-react/ViewCarouselIcon"
        ),
    ),
    "mdi-view-column": React.lazy(() =>
        import(
            /* webpackChunkName: "ViewColumnIcon" */
            "mdi-react/ViewColumnIcon"
        ),
    ),
    "mdi-view-dashboard-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "ViewDashboardVariantIcon" */
            "mdi-react/ViewDashboardVariantIcon"
        ),
    ),
    "mdi-view-dashboard": React.lazy(() =>
        import(
            /* webpackChunkName: "ViewDashboardIcon" */
            "mdi-react/ViewDashboardIcon"
        ),
    ),
    "mdi-view-day": React.lazy(() =>
        import(
            /* webpackChunkName: "ViewDayIcon" */
            "mdi-react/ViewDayIcon"
        ),
    ),
    "mdi-view-grid": React.lazy(() =>
        import(
            /* webpackChunkName: "ViewGridIcon" */
            "mdi-react/ViewGridIcon"
        ),
    ),
    "mdi-view-headline": React.lazy(() =>
        import(
            /* webpackChunkName: "ViewHeadlineIcon" */
            "mdi-react/ViewHeadlineIcon"
        ),
    ),
    "mdi-view-list": React.lazy(() =>
        import(
            /* webpackChunkName: "ViewListIcon" */
            "mdi-react/ViewListIcon"
        ),
    ),
    "mdi-view-module": React.lazy(() =>
        import(
            /* webpackChunkName: "ViewModuleIcon" */
            "mdi-react/ViewModuleIcon"
        ),
    ),
    "mdi-view-parallel": React.lazy(() =>
        import(
            /* webpackChunkName: "ViewParallelIcon" */
            "mdi-react/ViewParallelIcon"
        ),
    ),
    "mdi-view-quilt": React.lazy(() =>
        import(
            /* webpackChunkName: "ViewQuiltIcon" */
            "mdi-react/ViewQuiltIcon"
        ),
    ),
    "mdi-view-sequential": React.lazy(() =>
        import(
            /* webpackChunkName: "ViewSequentialIcon" */
            "mdi-react/ViewSequentialIcon"
        ),
    ),
    "mdi-view-stream": React.lazy(() =>
        import(
            /* webpackChunkName: "ViewStreamIcon" */
            "mdi-react/ViewStreamIcon"
        ),
    ),
    "mdi-view-week": React.lazy(() =>
        import(
            /* webpackChunkName: "ViewWeekIcon" */
            "mdi-react/ViewWeekIcon"
        ),
    ),
    "mdi-vimeo": React.lazy(() =>
        import(
            /* webpackChunkName: "VimeoIcon" */
            "mdi-react/VimeoIcon"
        ),
    ),
    "mdi-violin": React.lazy(() =>
        import(
            /* webpackChunkName: "ViolinIcon" */
            "mdi-react/ViolinIcon"
        ),
    ),
    "mdi-virtual-reality": React.lazy(() =>
        import(
            /* webpackChunkName: "VirtualRealityIcon" */
            "mdi-react/VirtualRealityIcon"
        ),
    ),
    "mdi-visualstudio": React.lazy(() =>
        import(
            /* webpackChunkName: "VisualstudioIcon" */
            "mdi-react/VisualstudioIcon"
        ),
    ),
    "mdi-vk-box": React.lazy(() =>
        import(
            /* webpackChunkName: "VkBoxIcon" */
            "mdi-react/VkBoxIcon"
        ),
    ),
    "mdi-vk-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "VkCircleIcon" */
            "mdi-react/VkCircleIcon"
        ),
    ),
    "mdi-vk": React.lazy(() =>
        import(
            /* webpackChunkName: "VkIcon" */
            "mdi-react/VkIcon"
        ),
    ),
    "mdi-vlc": React.lazy(() =>
        import(
            /* webpackChunkName: "VlcIcon" */
            "mdi-react/VlcIcon"
        ),
    ),
    "mdi-voice": React.lazy(() =>
        import(
            /* webpackChunkName: "VoiceIcon" */
            "mdi-react/VoiceIcon"
        ),
    ),
    "mdi-voicemail": React.lazy(() =>
        import(
            /* webpackChunkName: "VoicemailIcon" */
            "mdi-react/VoicemailIcon"
        ),
    ),
    "mdi-volleyball": React.lazy(() =>
        import(
            /* webpackChunkName: "VolleyballIcon" */
            "mdi-react/VolleyballIcon"
        ),
    ),
    "mdi-volume-high": React.lazy(() =>
        import(
            /* webpackChunkName: "VolumeHighIcon" */
            "mdi-react/VolumeHighIcon"
        ),
    ),
    "mdi-volume-low": React.lazy(() =>
        import(
            /* webpackChunkName: "VolumeLowIcon" */
            "mdi-react/VolumeLowIcon"
        ),
    ),
    "mdi-volume-medium": React.lazy(() =>
        import(
            /* webpackChunkName: "VolumeMediumIcon" */
            "mdi-react/VolumeMediumIcon"
        ),
    ),
    "mdi-volume-minus": React.lazy(() =>
        import(
            /* webpackChunkName: "VolumeMinusIcon" */
            "mdi-react/VolumeMinusIcon"
        ),
    ),
    "mdi-volume-mute": React.lazy(() =>
        import(
            /* webpackChunkName: "VolumeMuteIcon" */
            "mdi-react/VolumeMuteIcon"
        ),
    ),
    "mdi-volume-off": React.lazy(() =>
        import(
            /* webpackChunkName: "VolumeOffIcon" */
            "mdi-react/VolumeOffIcon"
        ),
    ),
    "mdi-volume-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "VolumePlusIcon" */
            "mdi-react/VolumePlusIcon"
        ),
    ),
    "mdi-vpn": React.lazy(() =>
        import(
            /* webpackChunkName: "VpnIcon" */
            "mdi-react/VpnIcon"
        ),
    ),
    "mdi-vuejs": React.lazy(() =>
        import(
            /* webpackChunkName: "VuejsIcon" */
            "mdi-react/VuejsIcon"
        ),
    ),
    "mdi-walk": React.lazy(() =>
        import(
            /* webpackChunkName: "WalkIcon" */
            "mdi-react/WalkIcon"
        ),
    ),
    "mdi-wall-sconce-flat": React.lazy(() =>
        import(
            /* webpackChunkName: "WallSconceFlatIcon" */
            "mdi-react/WallSconceFlatIcon"
        ),
    ),
    "mdi-wall-sconce-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "WallSconceVariantIcon" */
            "mdi-react/WallSconceVariantIcon"
        ),
    ),
    "mdi-wall-sconce": React.lazy(() =>
        import(
            /* webpackChunkName: "WallSconceIcon" */
            "mdi-react/WallSconceIcon"
        ),
    ),
    "mdi-wall": React.lazy(() =>
        import(
            /* webpackChunkName: "WallIcon" */
            "mdi-react/WallIcon"
        ),
    ),
    "mdi-wallet-giftcard": React.lazy(() =>
        import(
            /* webpackChunkName: "WalletGiftcardIcon" */
            "mdi-react/WalletGiftcardIcon"
        ),
    ),
    "mdi-wallet-membership": React.lazy(() =>
        import(
            /* webpackChunkName: "WalletMembershipIcon" */
            "mdi-react/WalletMembershipIcon"
        ),
    ),
    "mdi-wallet-travel": React.lazy(() =>
        import(
            /* webpackChunkName: "WalletTravelIcon" */
            "mdi-react/WalletTravelIcon"
        ),
    ),
    "mdi-wallet": React.lazy(() =>
        import(
            /* webpackChunkName: "WalletIcon" */
            "mdi-react/WalletIcon"
        ),
    ),
    "mdi-wan": React.lazy(() =>
        import(
            /* webpackChunkName: "WanIcon" */
            "mdi-react/WanIcon"
        ),
    ),
    "mdi-washing-machine": React.lazy(() =>
        import(
            /* webpackChunkName: "WashingMachineIcon" */
            "mdi-react/WashingMachineIcon"
        ),
    ),
    "mdi-watch-export-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "WatchExportVariantIcon" */
            "mdi-react/WatchExportVariantIcon"
        ),
    ),
    "mdi-watch-export": React.lazy(() =>
        import(
            /* webpackChunkName: "WatchExportIcon" */
            "mdi-react/WatchExportIcon"
        ),
    ),
    "mdi-watch-import-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "WatchImportVariantIcon" */
            "mdi-react/WatchImportVariantIcon"
        ),
    ),
    "mdi-watch-import": React.lazy(() =>
        import(
            /* webpackChunkName: "WatchImportIcon" */
            "mdi-react/WatchImportIcon"
        ),
    ),
    "mdi-watch-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "WatchVariantIcon" */
            "mdi-react/WatchVariantIcon"
        ),
    ),
    "mdi-watch-vibrate": React.lazy(() =>
        import(
            /* webpackChunkName: "WatchVibrateIcon" */
            "mdi-react/WatchVibrateIcon"
        ),
    ),
    "mdi-watch": React.lazy(() =>
        import(
            /* webpackChunkName: "WatchIcon" */
            "mdi-react/WatchIcon"
        ),
    ),
    "mdi-water-off": React.lazy(() =>
        import(
            /* webpackChunkName: "WaterOffIcon" */
            "mdi-react/WaterOffIcon"
        ),
    ),
    "mdi-water-percent": React.lazy(() =>
        import(
            /* webpackChunkName: "WaterPercentIcon" */
            "mdi-react/WaterPercentIcon"
        ),
    ),
    "mdi-water-pump": React.lazy(() =>
        import(
            /* webpackChunkName: "WaterPumpIcon" */
            "mdi-react/WaterPumpIcon"
        ),
    ),
    "mdi-water": React.lazy(() =>
        import(
            /* webpackChunkName: "WaterIcon" */
            "mdi-react/WaterIcon"
        ),
    ),
    "mdi-watermark": React.lazy(() =>
        import(
            /* webpackChunkName: "WatermarkIcon" */
            "mdi-react/WatermarkIcon"
        ),
    ),
    "mdi-waves": React.lazy(() =>
        import(
            /* webpackChunkName: "WavesIcon" */
            "mdi-react/WavesIcon"
        ),
    ),
    "mdi-weather-cloudy": React.lazy(() =>
        import(
            /* webpackChunkName: "WeatherCloudyIcon" */
            "mdi-react/WeatherCloudyIcon"
        ),
    ),
    "mdi-weather-fog": React.lazy(() =>
        import(
            /* webpackChunkName: "WeatherFogIcon" */
            "mdi-react/WeatherFogIcon"
        ),
    ),
    "mdi-weather-hail": React.lazy(() =>
        import(
            /* webpackChunkName: "WeatherHailIcon" */
            "mdi-react/WeatherHailIcon"
        ),
    ),
    "mdi-weather-hurricane": React.lazy(() =>
        import(
            /* webpackChunkName: "WeatherHurricaneIcon" */
            "mdi-react/WeatherHurricaneIcon"
        ),
    ),
    "mdi-weather-lightning-rainy": React.lazy(() =>
        import(
            /* webpackChunkName: "WeatherLightningRainyIcon" */
            "mdi-react/WeatherLightningRainyIcon"
        ),
    ),
    "mdi-weather-lightning": React.lazy(() =>
        import(
            /* webpackChunkName: "WeatherLightningIcon" */
            "mdi-react/WeatherLightningIcon"
        ),
    ),
    "mdi-weather-night": React.lazy(() =>
        import(
            /* webpackChunkName: "WeatherNightIcon" */
            "mdi-react/WeatherNightIcon"
        ),
    ),
    "mdi-weather-partlycloudy": React.lazy(() =>
        import(
            /* webpackChunkName: "WeatherPartlycloudyIcon" */
            "mdi-react/WeatherPartlycloudyIcon"
        ),
    ),
    "mdi-weather-pouring": React.lazy(() =>
        import(
            /* webpackChunkName: "WeatherPouringIcon" */
            "mdi-react/WeatherPouringIcon"
        ),
    ),
    "mdi-weather-rainy": React.lazy(() =>
        import(
            /* webpackChunkName: "WeatherRainyIcon" */
            "mdi-react/WeatherRainyIcon"
        ),
    ),
    "mdi-weather-snowy-rainy": React.lazy(() =>
        import(
            /* webpackChunkName: "WeatherSnowyRainyIcon" */
            "mdi-react/WeatherSnowyRainyIcon"
        ),
    ),
    "mdi-weather-snowy": React.lazy(() =>
        import(
            /* webpackChunkName: "WeatherSnowyIcon" */
            "mdi-react/WeatherSnowyIcon"
        ),
    ),
    "mdi-weather-sunny": React.lazy(() =>
        import(
            /* webpackChunkName: "WeatherSunnyIcon" */
            "mdi-react/WeatherSunnyIcon"
        ),
    ),
    "mdi-weather-sunset-down": React.lazy(() =>
        import(
            /* webpackChunkName: "WeatherSunsetDownIcon" */
            "mdi-react/WeatherSunsetDownIcon"
        ),
    ),
    "mdi-weather-sunset-up": React.lazy(() =>
        import(
            /* webpackChunkName: "WeatherSunsetUpIcon" */
            "mdi-react/WeatherSunsetUpIcon"
        ),
    ),
    "mdi-weather-sunset": React.lazy(() =>
        import(
            /* webpackChunkName: "WeatherSunsetIcon" */
            "mdi-react/WeatherSunsetIcon"
        ),
    ),
    "mdi-weather-windy-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "WeatherWindyVariantIcon" */
            "mdi-react/WeatherWindyVariantIcon"
        ),
    ),
    "mdi-weather-windy": React.lazy(() =>
        import(
            /* webpackChunkName: "WeatherWindyIcon" */
            "mdi-react/WeatherWindyIcon"
        ),
    ),
    "mdi-web": React.lazy(() =>
        import(
            /* webpackChunkName: "WebIcon" */
            "mdi-react/WebIcon"
        ),
    ),
    "mdi-webcam": React.lazy(() =>
        import(
            /* webpackChunkName: "WebcamIcon" */
            "mdi-react/WebcamIcon"
        ),
    ),
    "mdi-webhook": React.lazy(() =>
        import(
            /* webpackChunkName: "WebhookIcon" */
            "mdi-react/WebhookIcon"
        ),
    ),
    "mdi-webpack": React.lazy(() =>
        import(
            /* webpackChunkName: "WebpackIcon" */
            "mdi-react/WebpackIcon"
        ),
    ),
    "mdi-wechat": React.lazy(() =>
        import(
            /* webpackChunkName: "WechatIcon" */
            "mdi-react/WechatIcon"
        ),
    ),
    "mdi-weight-kilogram": React.lazy(() =>
        import(
            /* webpackChunkName: "WeightKilogramIcon" */
            "mdi-react/WeightKilogramIcon"
        ),
    ),
    "mdi-weight-pound": React.lazy(() =>
        import(
            /* webpackChunkName: "WeightPoundIcon" */
            "mdi-react/WeightPoundIcon"
        ),
    ),
    "mdi-weight": React.lazy(() =>
        import(
            /* webpackChunkName: "WeightIcon" */
            "mdi-react/WeightIcon"
        ),
    ),
    "mdi-whatsapp": React.lazy(() =>
        import(
            /* webpackChunkName: "WhatsappIcon" */
            "mdi-react/WhatsappIcon"
        ),
    ),
    "mdi-wheelchair-accessibility": React.lazy(() =>
        import(
            /* webpackChunkName: "WheelchairAccessibilityIcon" */
            "mdi-react/WheelchairAccessibilityIcon"
        ),
    ),
    "mdi-whistle": React.lazy(() =>
        import(
            /* webpackChunkName: "WhistleIcon" */
            "mdi-react/WhistleIcon"
        ),
    ),
    "mdi-white-balance-auto": React.lazy(() =>
        import(
            /* webpackChunkName: "WhiteBalanceAutoIcon" */
            "mdi-react/WhiteBalanceAutoIcon"
        ),
    ),
    "mdi-white-balance-incandescent": React.lazy(() =>
        import(
            /* webpackChunkName: "WhiteBalanceIncandescentIcon" */
            "mdi-react/WhiteBalanceIncandescentIcon"
        ),
    ),
    "mdi-white-balance-iridescent": React.lazy(() =>
        import(
            /* webpackChunkName: "WhiteBalanceIridescentIcon" */
            "mdi-react/WhiteBalanceIridescentIcon"
        ),
    ),
    "mdi-white-balance-sunny": React.lazy(() =>
        import(
            /* webpackChunkName: "WhiteBalanceSunnyIcon" */
            "mdi-react/WhiteBalanceSunnyIcon"
        ),
    ),
    "mdi-widgets": React.lazy(() =>
        import(
            /* webpackChunkName: "WidgetsIcon" */
            "mdi-react/WidgetsIcon"
        ),
    ),
    "mdi-wifi-off": React.lazy(() =>
        import(
            /* webpackChunkName: "WifiOffIcon" */
            "mdi-react/WifiOffIcon"
        ),
    ),
    "mdi-wifi-strength-1-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "WifiStrength1AlertIcon" */
            "mdi-react/WifiStrength1AlertIcon"
        ),
    ),
    "mdi-wifi-strength-1-lock": React.lazy(() =>
        import(
            /* webpackChunkName: "WifiStrength1LockIcon" */
            "mdi-react/WifiStrength1LockIcon"
        ),
    ),
    "mdi-wifi-strength-1": React.lazy(() =>
        import(
            /* webpackChunkName: "WifiStrength1Icon" */
            "mdi-react/WifiStrength1Icon"
        ),
    ),
    "mdi-wifi-strength-2-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "WifiStrength2AlertIcon" */
            "mdi-react/WifiStrength2AlertIcon"
        ),
    ),
    "mdi-wifi-strength-2-lock": React.lazy(() =>
        import(
            /* webpackChunkName: "WifiStrength2LockIcon" */
            "mdi-react/WifiStrength2LockIcon"
        ),
    ),
    "mdi-wifi-strength-2": React.lazy(() =>
        import(
            /* webpackChunkName: "WifiStrength2Icon" */
            "mdi-react/WifiStrength2Icon"
        ),
    ),
    "mdi-wifi-strength-3-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "WifiStrength3AlertIcon" */
            "mdi-react/WifiStrength3AlertIcon"
        ),
    ),
    "mdi-wifi-strength-3-lock": React.lazy(() =>
        import(
            /* webpackChunkName: "WifiStrength3LockIcon" */
            "mdi-react/WifiStrength3LockIcon"
        ),
    ),
    "mdi-wifi-strength-3": React.lazy(() =>
        import(
            /* webpackChunkName: "WifiStrength3Icon" */
            "mdi-react/WifiStrength3Icon"
        ),
    ),
    "mdi-wifi-strength-4-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "WifiStrength4AlertIcon" */
            "mdi-react/WifiStrength4AlertIcon"
        ),
    ),
    "mdi-wifi-strength-4-lock": React.lazy(() =>
        import(
            /* webpackChunkName: "WifiStrength4LockIcon" */
            "mdi-react/WifiStrength4LockIcon"
        ),
    ),
    "mdi-wifi-strength-4": React.lazy(() =>
        import(
            /* webpackChunkName: "WifiStrength4Icon" */
            "mdi-react/WifiStrength4Icon"
        ),
    ),
    "mdi-wifi-strength-alert-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "WifiStrengthAlertOutlineIcon" */
            "mdi-react/WifiStrengthAlertOutlineIcon"
        ),
    ),
    "mdi-wifi-strength-lock-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "WifiStrengthLockOutlineIcon" */
            "mdi-react/WifiStrengthLockOutlineIcon"
        ),
    ),
    "mdi-wifi-strength-off-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "WifiStrengthOffOutlineIcon" */
            "mdi-react/WifiStrengthOffOutlineIcon"
        ),
    ),
    "mdi-wifi-strength-off": React.lazy(() =>
        import(
            /* webpackChunkName: "WifiStrengthOffIcon" */
            "mdi-react/WifiStrengthOffIcon"
        ),
    ),
    "mdi-wifi-strength-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "WifiStrengthOutlineIcon" */
            "mdi-react/WifiStrengthOutlineIcon"
        ),
    ),
    "mdi-wifi": React.lazy(() =>
        import(
            /* webpackChunkName: "WifiIcon" */
            "mdi-react/WifiIcon"
        ),
    ),
    "mdi-wii": React.lazy(() =>
        import(
            /* webpackChunkName: "WiiIcon" */
            "mdi-react/WiiIcon"
        ),
    ),
    "mdi-wiiu": React.lazy(() =>
        import(
            /* webpackChunkName: "WiiuIcon" */
            "mdi-react/WiiuIcon"
        ),
    ),
    "mdi-wikipedia": React.lazy(() =>
        import(
            /* webpackChunkName: "WikipediaIcon" */
            "mdi-react/WikipediaIcon"
        ),
    ),
    "mdi-window-close": React.lazy(() =>
        import(
            /* webpackChunkName: "WindowCloseIcon" */
            "mdi-react/WindowCloseIcon"
        ),
    ),
    "mdi-window-closed": React.lazy(() =>
        import(
            /* webpackChunkName: "WindowClosedIcon" */
            "mdi-react/WindowClosedIcon"
        ),
    ),
    "mdi-window-maximize": React.lazy(() =>
        import(
            /* webpackChunkName: "WindowMaximizeIcon" */
            "mdi-react/WindowMaximizeIcon"
        ),
    ),
    "mdi-window-minimize": React.lazy(() =>
        import(
            /* webpackChunkName: "WindowMinimizeIcon" */
            "mdi-react/WindowMinimizeIcon"
        ),
    ),
    "mdi-window-open": React.lazy(() =>
        import(
            /* webpackChunkName: "WindowOpenIcon" */
            "mdi-react/WindowOpenIcon"
        ),
    ),
    "mdi-window-restore": React.lazy(() =>
        import(
            /* webpackChunkName: "WindowRestoreIcon" */
            "mdi-react/WindowRestoreIcon"
        ),
    ),
    "mdi-windows": React.lazy(() =>
        import(
            /* webpackChunkName: "WindowsIcon" */
            "mdi-react/WindowsIcon"
        ),
    ),
    "mdi-wordpress": React.lazy(() =>
        import(
            /* webpackChunkName: "WordpressIcon" */
            "mdi-react/WordpressIcon"
        ),
    ),
    "mdi-worker": React.lazy(() =>
        import(
            /* webpackChunkName: "WorkerIcon" */
            "mdi-react/WorkerIcon"
        ),
    ),
    "mdi-wrap": React.lazy(() =>
        import(
            /* webpackChunkName: "WrapIcon" */
            "mdi-react/WrapIcon"
        ),
    ),
    "mdi-wrench": React.lazy(() =>
        import(
            /* webpackChunkName: "WrenchIcon" */
            "mdi-react/WrenchIcon"
        ),
    ),
    "mdi-wunderlist": React.lazy(() =>
        import(
            /* webpackChunkName: "WunderlistIcon" */
            "mdi-react/WunderlistIcon"
        ),
    ),
    "mdi-xamarin-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "XamarinOutlineIcon" */
            "mdi-react/XamarinOutlineIcon"
        ),
    ),
    "mdi-xamarin": React.lazy(() =>
        import(
            /* webpackChunkName: "XamarinIcon" */
            "mdi-react/XamarinIcon"
        ),
    ),
    "mdi-xaml": React.lazy(() =>
        import(
            /* webpackChunkName: "XamlIcon" */
            "mdi-react/XamlIcon"
        ),
    ),
    "mdi-xbox-controller-battery-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "XboxControllerBatteryAlertIcon" */
            "mdi-react/XboxControllerBatteryAlertIcon"
        ),
    ),
    "mdi-xbox-controller-battery-empty": React.lazy(() =>
        import(
            /* webpackChunkName: "XboxControllerBatteryEmptyIcon" */
            "mdi-react/XboxControllerBatteryEmptyIcon"
        ),
    ),
    "mdi-xbox-controller-battery-full": React.lazy(() =>
        import(
            /* webpackChunkName: "XboxControllerBatteryFullIcon" */
            "mdi-react/XboxControllerBatteryFullIcon"
        ),
    ),
    "mdi-xbox-controller-battery-low": React.lazy(() =>
        import(
            /* webpackChunkName: "XboxControllerBatteryLowIcon" */
            "mdi-react/XboxControllerBatteryLowIcon"
        ),
    ),
    "mdi-xbox-controller-battery-medium": React.lazy(() =>
        import(
            /* webpackChunkName: "XboxControllerBatteryMediumIcon" */
            "mdi-react/XboxControllerBatteryMediumIcon"
        ),
    ),
    "mdi-xbox-controller-battery-unknown": React.lazy(() =>
        import(
            /* webpackChunkName: "XboxControllerBatteryUnknownIcon" */
            "mdi-react/XboxControllerBatteryUnknownIcon"
        ),
    ),
    "mdi-xbox-controller-off": React.lazy(() =>
        import(
            /* webpackChunkName: "XboxControllerOffIcon" */
            "mdi-react/XboxControllerOffIcon"
        ),
    ),
    "mdi-xbox-controller": React.lazy(() =>
        import(
            /* webpackChunkName: "XboxControllerIcon" */
            "mdi-react/XboxControllerIcon"
        ),
    ),
    "mdi-xbox": React.lazy(() =>
        import(
            /* webpackChunkName: "XboxIcon" */
            "mdi-react/XboxIcon"
        ),
    ),
    "mdi-xda": React.lazy(() =>
        import(
            /* webpackChunkName: "XdaIcon" */
            "mdi-react/XdaIcon"
        ),
    ),
    "mdi-xing-box": React.lazy(() =>
        import(
            /* webpackChunkName: "XingBoxIcon" */
            "mdi-react/XingBoxIcon"
        ),
    ),
    "mdi-xing-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "XingCircleIcon" */
            "mdi-react/XingCircleIcon"
        ),
    ),
    "mdi-xing": React.lazy(() =>
        import(
            /* webpackChunkName: "XingIcon" */
            "mdi-react/XingIcon"
        ),
    ),
    "mdi-xml": React.lazy(() =>
        import(
            /* webpackChunkName: "XmlIcon" */
            "mdi-react/XmlIcon"
        ),
    ),
    "mdi-xmpp": React.lazy(() =>
        import(
            /* webpackChunkName: "XmppIcon" */
            "mdi-react/XmppIcon"
        ),
    ),
    "mdi-yammer": React.lazy(() =>
        import(
            /* webpackChunkName: "YammerIcon" */
            "mdi-react/YammerIcon"
        ),
    ),
    "mdi-yeast": React.lazy(() =>
        import(
            /* webpackChunkName: "YeastIcon" */
            "mdi-react/YeastIcon"
        ),
    ),
    "mdi-yelp": React.lazy(() =>
        import(
            /* webpackChunkName: "YelpIcon" */
            "mdi-react/YelpIcon"
        ),
    ),
    "mdi-yin-yang": React.lazy(() =>
        import(
            /* webpackChunkName: "YinYangIcon" */
            "mdi-react/YinYangIcon"
        ),
    ),
    "mdi-youtube-creator-studio": React.lazy(() =>
        import(
            /* webpackChunkName: "YoutubeCreatorStudioIcon" */
            "mdi-react/YoutubeCreatorStudioIcon"
        ),
    ),
    "mdi-youtube-gaming": React.lazy(() =>
        import(
            /* webpackChunkName: "YoutubeGamingIcon" */
            "mdi-react/YoutubeGamingIcon"
        ),
    ),
    "mdi-youtube-tv": React.lazy(() =>
        import(
            /* webpackChunkName: "YoutubeTvIcon" */
            "mdi-react/YoutubeTvIcon"
        ),
    ),
    "mdi-youtube": React.lazy(() =>
        import(
            /* webpackChunkName: "YoutubeIcon" */
            "mdi-react/YoutubeIcon"
        ),
    ),
    "mdi-zip-box": React.lazy(() =>
        import(
            /* webpackChunkName: "ZipBoxIcon" */
            "mdi-react/ZipBoxIcon"
        ),
    ),
    "mdi-user-box": React.lazy(() =>
        import(
            /* webpackChunkName: "UserBoxIcon" */
            "mdi-react/UserBoxIcon"
        ),
    ),
    "mdi-identification-card": React.lazy(() =>
        import(
            /* webpackChunkName: "IdentificationCardIcon" */
            "mdi-react/IdentificationCardIcon"
        ),
    ),
    "mdi-user-card-details": React.lazy(() =>
        import(
            /* webpackChunkName: "UserCardDetailsIcon" */
            "mdi-react/UserCardDetailsIcon"
        ),
    ),
    "mdi-user-check": React.lazy(() =>
        import(
            /* webpackChunkName: "UserCheckIcon" */
            "mdi-react/UserCheckIcon"
        ),
    ),
    "mdi-user-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "UserCircleIcon" */
            "mdi-react/UserCircleIcon"
        ),
    ),
    "mdi-user-convert": React.lazy(() =>
        import(
            /* webpackChunkName: "UserConvertIcon" */
            "mdi-react/UserConvertIcon"
        ),
    ),
    "mdi-user-edit": React.lazy(() =>
        import(
            /* webpackChunkName: "UserEditIcon" */
            "mdi-react/UserEditIcon"
        ),
    ),
    "mdi-user-group": React.lazy(() =>
        import(
            /* webpackChunkName: "UserGroupIcon" */
            "mdi-react/UserGroupIcon"
        ),
    ),
    "mdi-user-heart": React.lazy(() =>
        import(
            /* webpackChunkName: "UserHeartIcon" */
            "mdi-react/UserHeartIcon"
        ),
    ),
    "mdi-user-key": React.lazy(() =>
        import(
            /* webpackChunkName: "UserKeyIcon" */
            "mdi-react/UserKeyIcon"
        ),
    ),
    "mdi-user-address": React.lazy(() =>
        import(
            /* webpackChunkName: "UserAddressIcon" */
            "mdi-react/UserAddressIcon"
        ),
    ),
    "mdi-account-address": React.lazy(() =>
        import(
            /* webpackChunkName: "AccountAddressIcon" */
            "mdi-react/AccountAddressIcon"
        ),
    ),
    "mdi-user-location": React.lazy(() =>
        import(
            /* webpackChunkName: "UserLocationIcon" */
            "mdi-react/UserLocationIcon"
        ),
    ),
    "mdi-user-minus": React.lazy(() =>
        import(
            /* webpackChunkName: "UserMinusIcon" */
            "mdi-react/UserMinusIcon"
        ),
    ),
    "mdi-user-multiple-check": React.lazy(() =>
        import(
            /* webpackChunkName: "UserMultipleCheckIcon" */
            "mdi-react/UserMultipleCheckIcon"
        ),
    ),
    "mdi-user-multiple-minus": React.lazy(() =>
        import(
            /* webpackChunkName: "UserMultipleMinusIcon" */
            "mdi-react/UserMultipleMinusIcon"
        ),
    ),
    "mdi-user-multiple-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "UserMultipleOutlineIcon" */
            "mdi-react/UserMultipleOutlineIcon"
        ),
    ),
    "mdi-people-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "PeopleOutlineIcon" */
            "mdi-react/PeopleOutlineIcon"
        ),
    ),
    "mdi-group-add-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "GroupAddOutlineIcon" */
            "mdi-react/GroupAddOutlineIcon"
        ),
    ),
    "mdi-user-multiple-plus-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "UserMultiplePlusOutlineIcon" */
            "mdi-react/UserMultiplePlusOutlineIcon"
        ),
    ),
    "mdi-user-multiple-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "UserMultiplePlusIcon" */
            "mdi-react/UserMultiplePlusIcon"
        ),
    ),
    "mdi-group-add": React.lazy(() =>
        import(
            /* webpackChunkName: "GroupAddIcon" */
            "mdi-react/GroupAddIcon"
        ),
    ),
    "mdi-people": React.lazy(() =>
        import(
            /* webpackChunkName: "PeopleIcon" */
            "mdi-react/PeopleIcon"
        ),
    ),
    "mdi-user-multiple": React.lazy(() =>
        import(
            /* webpackChunkName: "UserMultipleIcon" */
            "mdi-react/UserMultipleIcon"
        ),
    ),
    "mdi-user-network": React.lazy(() =>
        import(
            /* webpackChunkName: "UserNetworkIcon" */
            "mdi-react/UserNetworkIcon"
        ),
    ),
    "mdi-user-off": React.lazy(() =>
        import(
            /* webpackChunkName: "UserOffIcon" */
            "mdi-react/UserOffIcon"
        ),
    ),
    "mdi-user-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "UserOutlineIcon" */
            "mdi-react/UserOutlineIcon"
        ),
    ),
    "mdi-perm-identity": React.lazy(() =>
        import(
            /* webpackChunkName: "PermIdentityIcon" */
            "mdi-react/PermIdentityIcon"
        ),
    ),
    "mdi-person-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "PersonOutlineIcon" */
            "mdi-react/PersonOutlineIcon"
        ),
    ),
    "mdi-person-add-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "PersonAddOutlineIcon" */
            "mdi-react/PersonAddOutlineIcon"
        ),
    ),
    "mdi-register-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "RegisterOutlineIcon" */
            "mdi-react/RegisterOutlineIcon"
        ),
    ),
    "mdi-user-plus-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "UserPlusOutlineIcon" */
            "mdi-react/UserPlusOutlineIcon"
        ),
    ),
    "mdi-register": React.lazy(() =>
        import(
            /* webpackChunkName: "RegisterIcon" */
            "mdi-react/RegisterIcon"
        ),
    ),
    "mdi-user-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "UserPlusIcon" */
            "mdi-react/UserPlusIcon"
        ),
    ),
    "mdi-person-add": React.lazy(() =>
        import(
            /* webpackChunkName: "PersonAddIcon" */
            "mdi-react/PersonAddIcon"
        ),
    ),
    "mdi-user-remove": React.lazy(() =>
        import(
            /* webpackChunkName: "UserRemoveIcon" */
            "mdi-react/UserRemoveIcon"
        ),
    ),
    "mdi-user-search-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "UserSearchOutlineIcon" */
            "mdi-react/UserSearchOutlineIcon"
        ),
    ),
    "mdi-user-search": React.lazy(() =>
        import(
            /* webpackChunkName: "UserSearchIcon" */
            "mdi-react/UserSearchIcon"
        ),
    ),
    "mdi-user-settings-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "UserSettingsVariantIcon" */
            "mdi-react/UserSettingsVariantIcon"
        ),
    ),
    "mdi-user-settings": React.lazy(() =>
        import(
            /* webpackChunkName: "UserSettingsIcon" */
            "mdi-react/UserSettingsIcon"
        ),
    ),
    "mdi-user-star": React.lazy(() =>
        import(
            /* webpackChunkName: "UserStarIcon" */
            "mdi-react/UserStarIcon"
        ),
    ),
    "mdi-user-switch": React.lazy(() =>
        import(
            /* webpackChunkName: "UserSwitchIcon" */
            "mdi-react/UserSwitchIcon"
        ),
    ),
    "mdi-person": React.lazy(() =>
        import(
            /* webpackChunkName: "PersonIcon" */
            "mdi-react/PersonIcon"
        ),
    ),
    "mdi-user": React.lazy(() =>
        import(
            /* webpackChunkName: "UserIcon" */
            "mdi-react/UserIcon"
        ),
    ),
    "mdi-ac-unit": React.lazy(() =>
        import(
            /* webpackChunkName: "AcUnitIcon" */
            "mdi-react/AcUnitIcon"
        ),
    ),
    "mdi-hot-air-balloon": React.lazy(() =>
        import(
            /* webpackChunkName: "HotAirBalloonIcon" */
            "mdi-react/HotAirBalloonIcon"
        ),
    ),
    "mdi-aeroplane-landing": React.lazy(() =>
        import(
            /* webpackChunkName: "AeroplaneLandingIcon" */
            "mdi-react/AeroplaneLandingIcon"
        ),
    ),
    "mdi-flight-land": React.lazy(() =>
        import(
            /* webpackChunkName: "FlightLandIcon" */
            "mdi-react/FlightLandIcon"
        ),
    ),
    "mdi-aeroplane-off": React.lazy(() =>
        import(
            /* webpackChunkName: "AeroplaneOffIcon" */
            "mdi-react/AeroplaneOffIcon"
        ),
    ),
    "mdi-airplanemode-inactive": React.lazy(() =>
        import(
            /* webpackChunkName: "AirplanemodeInactiveIcon" */
            "mdi-react/AirplanemodeInactiveIcon"
        ),
    ),
    "mdi-aeroplane-takeoff": React.lazy(() =>
        import(
            /* webpackChunkName: "AeroplaneTakeoffIcon" */
            "mdi-react/AeroplaneTakeoffIcon"
        ),
    ),
    "mdi-flight-takeoff": React.lazy(() =>
        import(
            /* webpackChunkName: "FlightTakeoffIcon" */
            "mdi-react/FlightTakeoffIcon"
        ),
    ),
    "mdi-aeroplane": React.lazy(() =>
        import(
            /* webpackChunkName: "AeroplaneIcon" */
            "mdi-react/AeroplaneIcon"
        ),
    ),
    "mdi-airplanemode-active": React.lazy(() =>
        import(
            /* webpackChunkName: "AirplanemodeActiveIcon" */
            "mdi-react/AirplanemodeActiveIcon"
        ),
    ),
    "mdi-flight": React.lazy(() =>
        import(
            /* webpackChunkName: "FlightIcon" */
            "mdi-react/FlightIcon"
        ),
    ),
    "mdi-local-airport": React.lazy(() =>
        import(
            /* webpackChunkName: "LocalAirportIcon" */
            "mdi-react/LocalAirportIcon"
        ),
    ),
    "mdi-alarm-on": React.lazy(() =>
        import(
            /* webpackChunkName: "AlarmOnIcon" */
            "mdi-react/AlarmOnIcon"
        ),
    ),
    "mdi-add-alarm": React.lazy(() =>
        import(
            /* webpackChunkName: "AddAlarmIcon" */
            "mdi-react/AddAlarmIcon"
        ),
    ),
    "mdi-access-alarms": React.lazy(() =>
        import(
            /* webpackChunkName: "AccessAlarmsIcon" */
            "mdi-react/AccessAlarmsIcon"
        ),
    ),
    "mdi-vinyl": React.lazy(() =>
        import(
            /* webpackChunkName: "VinylIcon" */
            "mdi-react/VinylIcon"
        ),
    ),
    "mdi-warning-box": React.lazy(() =>
        import(
            /* webpackChunkName: "WarningBoxIcon" */
            "mdi-react/WarningBoxIcon"
        ),
    ),
    "mdi-warning-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "WarningCircleOutlineIcon" */
            "mdi-react/WarningCircleOutlineIcon"
        ),
    ),
    "mdi-error-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "ErrorOutlineIcon" */
            "mdi-react/ErrorOutlineIcon"
        ),
    ),
    "mdi-warning-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "WarningCircleIcon" */
            "mdi-react/WarningCircleIcon"
        ),
    ),
    "mdi-error": React.lazy(() =>
        import(
            /* webpackChunkName: "ErrorIcon" */
            "mdi-react/ErrorIcon"
        ),
    ),
    "mdi-new-releases": React.lazy(() =>
        import(
            /* webpackChunkName: "NewReleasesIcon" */
            "mdi-react/NewReleasesIcon"
        ),
    ),
    "mdi-warning-decagram": React.lazy(() =>
        import(
            /* webpackChunkName: "WarningDecagramIcon" */
            "mdi-react/WarningDecagramIcon"
        ),
    ),
    "mdi-warning-octagon": React.lazy(() =>
        import(
            /* webpackChunkName: "WarningOctagonIcon" */
            "mdi-react/WarningOctagonIcon"
        ),
    ),
    "mdi-report": React.lazy(() =>
        import(
            /* webpackChunkName: "ReportIcon" */
            "mdi-react/ReportIcon"
        ),
    ),
    "mdi-warning-octagram": React.lazy(() =>
        import(
            /* webpackChunkName: "WarningOctagramIcon" */
            "mdi-react/WarningOctagramIcon"
        ),
    ),
    "mdi-warning-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "WarningOutlineIcon" */
            "mdi-react/WarningOutlineIcon"
        ),
    ),
    "mdi-warning": React.lazy(() =>
        import(
            /* webpackChunkName: "WarningIcon" */
            "mdi-react/WarningIcon"
        ),
    ),
    "mdi-report-problem": React.lazy(() =>
        import(
            /* webpackChunkName: "ReportProblemIcon" */
            "mdi-react/ReportProblemIcon"
        ),
    ),
    "mdi-amazon-clouddrive": React.lazy(() =>
        import(
            /* webpackChunkName: "AmazonClouddriveIcon" */
            "mdi-react/AmazonClouddriveIcon"
        ),
    ),
    "mdi-adb": React.lazy(() =>
        import(
            /* webpackChunkName: "AdbIcon" */
            "mdi-react/AdbIcon"
        ),
    ),
    "mdi-math-compass-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "MathCompassVariantIcon" */
            "mdi-react/MathCompassVariantIcon"
        ),
    ),
    "mdi-auto-awesome-motion": React.lazy(() =>
        import(
            /* webpackChunkName: "AutoAwesomeMotionIcon" */
            "mdi-react/AutoAwesomeMotionIcon"
        ),
    ),
    "mdi-apple-mobileme": React.lazy(() =>
        import(
            /* webpackChunkName: "AppleMobilemeIcon" */
            "mdi-react/AppleMobilemeIcon"
        ),
    ),
    "mdi-web-asset": React.lazy(() =>
        import(
            /* webpackChunkName: "WebAssetIcon" */
            "mdi-react/WebAssetIcon"
        ),
    ),
    "mdi-decagram-check": React.lazy(() =>
        import(
            /* webpackChunkName: "DecagramCheckIcon" */
            "mdi-react/DecagramCheckIcon"
        ),
    ),
    "mdi-approve": React.lazy(() =>
        import(
            /* webpackChunkName: "ApproveIcon" */
            "mdi-react/ApproveIcon"
        ),
    ),
    "mdi-arrow-compress-all": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowCompressAllIcon" */
            "mdi-react/ArrowCompressAllIcon"
        ),
    ),
    "mdi-arrow-compress-down": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowCompressDownIcon" */
            "mdi-react/ArrowCompressDownIcon"
        ),
    ),
    "mdi-arrow-compress-left": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowCompressLeftIcon" */
            "mdi-react/ArrowCompressLeftIcon"
        ),
    ),
    "mdi-arrow-compress-right": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowCompressRightIcon" */
            "mdi-react/ArrowCompressRightIcon"
        ),
    ),
    "mdi-arrow-compress-up": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowCompressUpIcon" */
            "mdi-react/ArrowCompressUpIcon"
        ),
    ),
    "mdi-arrow-compress": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowCompressIcon" */
            "mdi-react/ArrowCompressIcon"
        ),
    ),
    "mdi-arrow-drop-down-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowDropDownCircleIcon" */
            "mdi-react/ArrowDropDownCircleIcon"
        ),
    ),
    "mdi-arrow-downward": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowDownwardIcon" */
            "mdi-react/ArrowDownwardIcon"
        ),
    ),
    "mdi-arrow-back": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowBackIcon" */
            "mdi-react/ArrowBackIcon"
        ),
    ),
    "mdi-arrow-forward": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowForwardIcon" */
            "mdi-react/ArrowForwardIcon"
        ),
    ),
    "mdi-arrow-upward": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowUpwardIcon" */
            "mdi-react/ArrowUpwardIcon"
        ),
    ),
    "mdi-alternate-email": React.lazy(() =>
        import(
            /* webpackChunkName: "AlternateEmailIcon" */
            "mdi-react/AlternateEmailIcon"
        ),
    ),
    "mdi-paperclip-horizontal": React.lazy(() =>
        import(
            /* webpackChunkName: "PaperclipHorizontalIcon" */
            "mdi-react/PaperclipHorizontalIcon"
        ),
    ),
    "mdi-magic": React.lazy(() =>
        import(
            /* webpackChunkName: "MagicIcon" */
            "mdi-react/MagicIcon"
        ),
    ),
    "mdi-wand": React.lazy(() =>
        import(
            /* webpackChunkName: "WandIcon" */
            "mdi-react/WandIcon"
        ),
    ),
    "mdi-auto-fix-high": React.lazy(() =>
        import(
            /* webpackChunkName: "AutoFixHighIcon" */
            "mdi-react/AutoFixHighIcon"
        ),
    ),
    "mdi-child-friendly": React.lazy(() =>
        import(
            /* webpackChunkName: "ChildFriendlyIcon" */
            "mdi-react/ChildFriendlyIcon"
        ),
    ),
    "mdi-hamburger-menu-back": React.lazy(() =>
        import(
            /* webpackChunkName: "HamburgerMenuBackIcon" */
            "mdi-react/HamburgerMenuBackIcon"
        ),
    ),
    "mdi-settings-backup-restore": React.lazy(() =>
        import(
            /* webpackChunkName: "SettingsBackupRestoreIcon" */
            "mdi-react/SettingsBackupRestoreIcon"
        ),
    ),
    "mdi-shuttlecock": React.lazy(() =>
        import(
            /* webpackChunkName: "ShuttlecockIcon" */
            "mdi-react/ShuttlecockIcon"
        ),
    ),
    "mdi-account-balance": React.lazy(() =>
        import(
            /* webpackChunkName: "AccountBalanceIcon" */
            "mdi-react/AccountBalanceIcon"
        ),
    ),
    "mdi-barcode-scanner": React.lazy(() =>
        import(
            /* webpackChunkName: "BarcodeScannerIcon" */
            "mdi-react/BarcodeScannerIcon"
        ),
    ),
    "mdi-grain": React.lazy(() =>
        import(
            /* webpackChunkName: "GrainIcon" */
            "mdi-react/GrainIcon"
        ),
    ),
    "mdi-shopping-basket": React.lazy(() =>
        import(
            /* webpackChunkName: "ShoppingBasketIcon" */
            "mdi-react/ShoppingBasketIcon"
        ),
    ),
    "mdi-youtube-sports": React.lazy(() =>
        import(
            /* webpackChunkName: "YoutubeSportsIcon" */
            "mdi-react/YoutubeSportsIcon"
        ),
    ),
    "mdi-battery-warning": React.lazy(() =>
        import(
            /* webpackChunkName: "BatteryWarningIcon" */
            "mdi-react/BatteryWarningIcon"
        ),
    ),
    "mdi-battery-charging-wireless-warning": React.lazy(() =>
        import(
            /* webpackChunkName: "BatteryChargingWirelessWarningIcon" */
            "mdi-react/BatteryChargingWirelessWarningIcon"
        ),
    ),
    "mdi-battery-charging-wireless-empty": React.lazy(() =>
        import(
            /* webpackChunkName: "BatteryChargingWirelessEmptyIcon" */
            "mdi-react/BatteryChargingWirelessEmptyIcon"
        ),
    ),
    "mdi-battery-charging-wireless-0": React.lazy(() =>
        import(
            /* webpackChunkName: "BatteryChargingWireless0Icon" */
            "mdi-react/BatteryChargingWireless0Icon"
        ),
    ),
    "mdi-battery-charging-wireless-full": React.lazy(() =>
        import(
            /* webpackChunkName: "BatteryChargingWirelessFullIcon" */
            "mdi-react/BatteryChargingWirelessFullIcon"
        ),
    ),
    "mdi-battery-charging-wireless-100": React.lazy(() =>
        import(
            /* webpackChunkName: "BatteryChargingWireless100Icon" */
            "mdi-react/BatteryChargingWireless100Icon"
        ),
    ),
    "mdi-battery-charging-full": React.lazy(() =>
        import(
            /* webpackChunkName: "BatteryChargingFullIcon" */
            "mdi-react/BatteryChargingFullIcon"
        ),
    ),
    "mdi-battery-0": React.lazy(() =>
        import(
            /* webpackChunkName: "Battery0Icon" */
            "mdi-react/Battery0Icon"
        ),
    ),
    "mdi-battery-empty": React.lazy(() =>
        import(
            /* webpackChunkName: "BatteryEmptyIcon" */
            "mdi-react/BatteryEmptyIcon"
        ),
    ),
    "mdi-battery-saver": React.lazy(() =>
        import(
            /* webpackChunkName: "BatterySaverIcon" */
            "mdi-react/BatterySaverIcon"
        ),
    ),
    "mdi-battery-full": React.lazy(() =>
        import(
            /* webpackChunkName: "BatteryFullIcon" */
            "mdi-react/BatteryFullIcon"
        ),
    ),
    "mdi-battery-std": React.lazy(() =>
        import(
            /* webpackChunkName: "BatteryStdIcon" */
            "mdi-react/BatteryStdIcon"
        ),
    ),
    "mdi-battery-100": React.lazy(() =>
        import(
            /* webpackChunkName: "Battery100Icon" */
            "mdi-react/Battery100Icon"
        ),
    ),
    "mdi-parasol": React.lazy(() =>
        import(
            /* webpackChunkName: "ParasolIcon" */
            "mdi-react/ParasolIcon"
        ),
    ),
    "mdi-notifications-off": React.lazy(() =>
        import(
            /* webpackChunkName: "NotificationsOffIcon" */
            "mdi-react/NotificationsOffIcon"
        ),
    ),
    "mdi-notifications-none": React.lazy(() =>
        import(
            /* webpackChunkName: "NotificationsNoneIcon" */
            "mdi-react/NotificationsNoneIcon"
        ),
    ),
    "mdi-add-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "AddAlertIcon" */
            "mdi-react/AddAlertIcon"
        ),
    ),
    "mdi-notifications-active": React.lazy(() =>
        import(
            /* webpackChunkName: "NotificationsActiveIcon" */
            "mdi-react/NotificationsActiveIcon"
        ),
    ),
    "mdi-notifications-paused": React.lazy(() =>
        import(
            /* webpackChunkName: "NotificationsPausedIcon" */
            "mdi-react/NotificationsPausedIcon"
        ),
    ),
    "mdi-notifications": React.lazy(() =>
        import(
            /* webpackChunkName: "NotificationsIcon" */
            "mdi-react/NotificationsIcon"
        ),
    ),
    "mdi-bicycle": React.lazy(() =>
        import(
            /* webpackChunkName: "BicycleIcon" */
            "mdi-react/BicycleIcon"
        ),
    ),
    "mdi-cycling": React.lazy(() =>
        import(
            /* webpackChunkName: "CyclingIcon" */
            "mdi-react/CyclingIcon"
        ),
    ),
    "mdi-directions-bike": React.lazy(() =>
        import(
            /* webpackChunkName: "DirectionsBikeIcon" */
            "mdi-react/DirectionsBikeIcon"
        ),
    ),
    "mdi-bluetooth-searching": React.lazy(() =>
        import(
            /* webpackChunkName: "BluetoothSearchingIcon" */
            "mdi-react/BluetoothSearchingIcon"
        ),
    ),
    "mdi-bluetooth-connected": React.lazy(() =>
        import(
            /* webpackChunkName: "BluetoothConnectedIcon" */
            "mdi-react/BluetoothConnectedIcon"
        ),
    ),
    "mdi-bluetooth-disabled": React.lazy(() =>
        import(
            /* webpackChunkName: "BluetoothDisabledIcon" */
            "mdi-react/BluetoothDisabledIcon"
        ),
    ),
    "mdi-settings-bluetooth": React.lazy(() =>
        import(
            /* webpackChunkName: "SettingsBluetoothIcon" */
            "mdi-react/SettingsBluetoothIcon"
        ),
    ),
    "mdi-blur-circular": React.lazy(() =>
        import(
            /* webpackChunkName: "BlurCircularIcon" */
            "mdi-react/BlurCircularIcon"
        ),
    ),
    "mdi-blur-on": React.lazy(() =>
        import(
            /* webpackChunkName: "BlurOnIcon" */
            "mdi-react/BlurOnIcon"
        ),
    ),
    "mdi-auto-stories": React.lazy(() =>
        import(
            /* webpackChunkName: "AutoStoriesIcon" */
            "mdi-react/AutoStoriesIcon"
        ),
    ),
    "mdi-import-contacts": React.lazy(() =>
        import(
            /* webpackChunkName: "ImportContactsIcon" */
            "mdi-react/ImportContactsIcon"
        ),
    ),
    "mdi-chrome-reader-mode": React.lazy(() =>
        import(
            /* webpackChunkName: "ChromeReaderModeIcon" */
            "mdi-react/ChromeReaderModeIcon"
        ),
    ),
    "mdi-class": React.lazy(() =>
        import(
            /* webpackChunkName: "ClassIcon" */
            "mdi-react/ClassIcon"
        ),
    ),
    "mdi-bookmark-border": React.lazy(() =>
        import(
            /* webpackChunkName: "BookmarkBorderIcon" */
            "mdi-react/BookmarkBorderIcon"
        ),
    ),
    "mdi-turned-in-not": React.lazy(() =>
        import(
            /* webpackChunkName: "TurnedInNotIcon" */
            "mdi-react/TurnedInNotIcon"
        ),
    ),
    "mdi-turned-in": React.lazy(() =>
        import(
            /* webpackChunkName: "TurnedInIcon" */
            "mdi-react/TurnedInIcon"
        ),
    ),
    "mdi-border-colour": React.lazy(() =>
        import(
            /* webpackChunkName: "BorderColourIcon" */
            "mdi-react/BorderColourIcon"
        ),
    ),
    "mdi-border-clear": React.lazy(() =>
        import(
            /* webpackChunkName: "BorderClearIcon" */
            "mdi-react/BorderClearIcon"
        ),
    ),
    "mdi-border-outer": React.lazy(() =>
        import(
            /* webpackChunkName: "BorderOuterIcon" */
            "mdi-react/BorderOuterIcon"
        ),
    ),
    "mdi-work": React.lazy(() =>
        import(
            /* webpackChunkName: "WorkIcon" */
            "mdi-react/WorkIcon"
        ),
    ),
    "mdi-brightness-low": React.lazy(() =>
        import(
            /* webpackChunkName: "BrightnessLowIcon" */
            "mdi-react/BrightnessLowIcon"
        ),
    ),
    "mdi-brightness-medium": React.lazy(() =>
        import(
            /* webpackChunkName: "BrightnessMediumIcon" */
            "mdi-react/BrightnessMediumIcon"
        ),
    ),
    "mdi-brightness-high": React.lazy(() =>
        import(
            /* webpackChunkName: "BrightnessHighIcon" */
            "mdi-react/BrightnessHighIcon"
        ),
    ),
    "mdi-paintbrush": React.lazy(() =>
        import(
            /* webpackChunkName: "PaintbrushIcon" */
            "mdi-react/PaintbrushIcon"
        ),
    ),
    "mdi-bug-report": React.lazy(() =>
        import(
            /* webpackChunkName: "BugReportIcon" */
            "mdi-react/BugReportIcon"
        ),
    ),
    "mdi-announcement": React.lazy(() =>
        import(
            /* webpackChunkName: "AnnouncementIcon" */
            "mdi-react/AnnouncementIcon"
        ),
    ),
    "mdi-megaphone": React.lazy(() =>
        import(
            /* webpackChunkName: "MegaphoneIcon" */
            "mdi-react/MegaphoneIcon"
        ),
    ),
    "mdi-target-arrow": React.lazy(() =>
        import(
            /* webpackChunkName: "TargetArrowIcon" */
            "mdi-react/TargetArrowIcon"
        ),
    ),
    "mdi-departure-board": React.lazy(() =>
        import(
            /* webpackChunkName: "DepartureBoardIcon" */
            "mdi-react/DepartureBoardIcon"
        ),
    ),
    "mdi-directions-bus": React.lazy(() =>
        import(
            /* webpackChunkName: "DirectionsBusIcon" */
            "mdi-react/DirectionsBusIcon"
        ),
    ),
    "mdi-event-available": React.lazy(() =>
        import(
            /* webpackChunkName: "EventAvailableIcon" */
            "mdi-react/EventAvailableIcon"
        ),
    ),
    "mdi-calendar-task": React.lazy(() =>
        import(
            /* webpackChunkName: "CalendarTaskIcon" */
            "mdi-react/CalendarTaskIcon"
        ),
    ),
    "mdi-event-clock": React.lazy(() =>
        import(
            /* webpackChunkName: "EventClockIcon" */
            "mdi-react/EventClockIcon"
        ),
    ),
    "mdi-event-time": React.lazy(() =>
        import(
            /* webpackChunkName: "EventTimeIcon" */
            "mdi-react/EventTimeIcon"
        ),
    ),
    "mdi-calendar-time": React.lazy(() =>
        import(
            /* webpackChunkName: "CalendarTimeIcon" */
            "mdi-react/CalendarTimeIcon"
        ),
    ),
    "mdi-event-edit": React.lazy(() =>
        import(
            /* webpackChunkName: "EventEditIcon" */
            "mdi-react/EventEditIcon"
        ),
    ),
    "mdi-event-multiple-check": React.lazy(() =>
        import(
            /* webpackChunkName: "EventMultipleCheckIcon" */
            "mdi-react/EventMultipleCheckIcon"
        ),
    ),
    "mdi-event-multiple": React.lazy(() =>
        import(
            /* webpackChunkName: "EventMultipleIcon" */
            "mdi-react/EventMultipleIcon"
        ),
    ),
    "mdi-event-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "EventPlusIcon" */
            "mdi-react/EventPlusIcon"
        ),
    ),
    "mdi-calendar-rsvp": React.lazy(() =>
        import(
            /* webpackChunkName: "CalendarRsvpIcon" */
            "mdi-react/CalendarRsvpIcon"
        ),
    ),
    "mdi-event-question": React.lazy(() =>
        import(
            /* webpackChunkName: "EventQuestionIcon" */
            "mdi-react/EventQuestionIcon"
        ),
    ),
    "mdi-date-range": React.lazy(() =>
        import(
            /* webpackChunkName: "DateRangeIcon" */
            "mdi-react/DateRangeIcon"
        ),
    ),
    "mdi-calendar-week": React.lazy(() =>
        import(
            /* webpackChunkName: "CalendarWeekIcon" */
            "mdi-react/CalendarWeekIcon"
        ),
    ),
    "mdi-event-range": React.lazy(() =>
        import(
            /* webpackChunkName: "EventRangeIcon" */
            "mdi-react/EventRangeIcon"
        ),
    ),
    "mdi-event-busy": React.lazy(() =>
        import(
            /* webpackChunkName: "EventBusyIcon" */
            "mdi-react/EventBusyIcon"
        ),
    ),
    "mdi-event-note": React.lazy(() =>
        import(
            /* webpackChunkName: "EventNoteIcon" */
            "mdi-react/EventNoteIcon"
        ),
    ),
    "mdi-calendar-day": React.lazy(() =>
        import(
            /* webpackChunkName: "CalendarDayIcon" */
            "mdi-react/CalendarDayIcon"
        ),
    ),
    "mdi-event": React.lazy(() =>
        import(
            /* webpackChunkName: "EventIcon" */
            "mdi-react/EventIcon"
        ),
    ),
    "mdi-insert-invitation": React.lazy(() =>
        import(
            /* webpackChunkName: "InsertInvitationIcon" */
            "mdi-react/InsertInvitationIcon"
        ),
    ),
    "mdi-merge-type": React.lazy(() =>
        import(
            /* webpackChunkName: "MergeTypeIcon" */
            "mdi-react/MergeTypeIcon"
        ),
    ),
    "mdi-camera-user": React.lazy(() =>
        import(
            /* webpackChunkName: "CameraUserIcon" */
            "mdi-react/CameraUserIcon"
        ),
    ),
    "mdi-burst-mode": React.lazy(() =>
        import(
            /* webpackChunkName: "BurstModeIcon" */
            "mdi-react/BurstModeIcon"
        ),
    ),
    "mdi-camera-metering-centre": React.lazy(() =>
        import(
            /* webpackChunkName: "CameraMeteringCentreIcon" */
            "mdi-react/CameraMeteringCentreIcon"
        ),
    ),
    "mdi-switch-camera": React.lazy(() =>
        import(
            /* webpackChunkName: "SwitchCameraIcon" */
            "mdi-react/SwitchCameraIcon"
        ),
    ),
    "mdi-photography": React.lazy(() =>
        import(
            /* webpackChunkName: "PhotographyIcon" */
            "mdi-react/PhotographyIcon"
        ),
    ),
    "mdi-camera-alt": React.lazy(() =>
        import(
            /* webpackChunkName: "CameraAltIcon" */
            "mdi-react/CameraAltIcon"
        ),
    ),
    "mdi-local-see": React.lazy(() =>
        import(
            /* webpackChunkName: "LocalSeeIcon" */
            "mdi-react/LocalSeeIcon"
        ),
    ),
    "mdi-photo-camera": React.lazy(() =>
        import(
            /* webpackChunkName: "PhotoCameraIcon" */
            "mdi-react/PhotoCameraIcon"
        ),
    ),
    "mdi-prohibited": React.lazy(() =>
        import(
            /* webpackChunkName: "ProhibitedIcon" */
            "mdi-react/ProhibitedIcon"
        ),
    ),
    "mdi-ban": React.lazy(() =>
        import(
            /* webpackChunkName: "BanIcon" */
            "mdi-react/BanIcon"
        ),
    ),
    "mdi-do-not-disturb-alt": React.lazy(() =>
        import(
            /* webpackChunkName: "DoNotDisturbAltIcon" */
            "mdi-react/DoNotDisturbAltIcon"
        ),
    ),
    "mdi-local-car-wash": React.lazy(() =>
        import(
            /* webpackChunkName: "LocalCarWashIcon" */
            "mdi-react/LocalCarWashIcon"
        ),
    ),
    "mdi-directions-car": React.lazy(() =>
        import(
            /* webpackChunkName: "DirectionsCarIcon" */
            "mdi-react/DirectionsCarIcon"
        ),
    ),
    "mdi-drive-eta": React.lazy(() =>
        import(
            /* webpackChunkName: "DriveEtaIcon" */
            "mdi-react/DriveEtaIcon"
        ),
    ),
    "mdi-time-to-leave": React.lazy(() =>
        import(
            /* webpackChunkName: "TimeToLeaveIcon" */
            "mdi-react/TimeToLeaveIcon"
        ),
    ),
    "mdi-suit-clubs": React.lazy(() =>
        import(
            /* webpackChunkName: "SuitClubsIcon" */
            "mdi-react/SuitClubsIcon"
        ),
    ),
    "mdi-suit-diamonds": React.lazy(() =>
        import(
            /* webpackChunkName: "SuitDiamondsIcon" */
            "mdi-react/SuitDiamondsIcon"
        ),
    ),
    "mdi-suit-hearts": React.lazy(() =>
        import(
            /* webpackChunkName: "SuitHeartsIcon" */
            "mdi-react/SuitHeartsIcon"
        ),
    ),
    "mdi-suit-spades": React.lazy(() =>
        import(
            /* webpackChunkName: "SuitSpadesIcon" */
            "mdi-react/SuitSpadesIcon"
        ),
    ),
    "mdi-trolley-off": React.lazy(() =>
        import(
            /* webpackChunkName: "TrolleyOffIcon" */
            "mdi-react/TrolleyOffIcon"
        ),
    ),
    "mdi-remove-shopping-cart": React.lazy(() =>
        import(
            /* webpackChunkName: "RemoveShoppingCartIcon" */
            "mdi-react/RemoveShoppingCartIcon"
        ),
    ),
    "mdi-trolley-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "TrolleyOutlineIcon" */
            "mdi-react/TrolleyOutlineIcon"
        ),
    ),
    "mdi-trolley-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "TrolleyPlusIcon" */
            "mdi-react/TrolleyPlusIcon"
        ),
    ),
    "mdi-add-shopping-cart": React.lazy(() =>
        import(
            /* webpackChunkName: "AddShoppingCartIcon" */
            "mdi-react/AddShoppingCartIcon"
        ),
    ),
    "mdi-trolley": React.lazy(() =>
        import(
            /* webpackChunkName: "TrolleyIcon" */
            "mdi-react/TrolleyIcon"
        ),
    ),
    "mdi-local-grocery-store": React.lazy(() =>
        import(
            /* webpackChunkName: "LocalGroceryStoreIcon" */
            "mdi-react/LocalGroceryStoreIcon"
        ),
    ),
    "mdi-shopping-cart": React.lazy(() =>
        import(
            /* webpackChunkName: "ShoppingCartIcon" */
            "mdi-react/ShoppingCartIcon"
        ),
    ),
    "mdi-local-atm": React.lazy(() =>
        import(
            /* webpackChunkName: "LocalAtmIcon" */
            "mdi-react/LocalAtmIcon"
        ),
    ),
    "mdi-closed-circuit-television": React.lazy(() =>
        import(
            /* webpackChunkName: "ClosedCircuitTelevisionIcon" */
            "mdi-react/ClosedCircuitTelevisionIcon"
        ),
    ),
    "mdi-security-camera": React.lazy(() =>
        import(
            /* webpackChunkName: "SecurityCameraIcon" */
            "mdi-react/SecurityCameraIcon"
        ),
    ),
    "mdi-mobile-phone-android": React.lazy(() =>
        import(
            /* webpackChunkName: "MobilePhoneAndroidIcon" */
            "mdi-react/MobilePhoneAndroidIcon"
        ),
    ),
    "mdi-smartphone-android": React.lazy(() =>
        import(
            /* webpackChunkName: "SmartphoneAndroidIcon" */
            "mdi-react/SmartphoneAndroidIcon"
        ),
    ),
    "mdi-mobile-phone-basic": React.lazy(() =>
        import(
            /* webpackChunkName: "MobilePhoneBasicIcon" */
            "mdi-react/MobilePhoneBasicIcon"
        ),
    ),
    "mdi-mobile-phone-dock": React.lazy(() =>
        import(
            /* webpackChunkName: "MobilePhoneDockIcon" */
            "mdi-react/MobilePhoneDockIcon"
        ),
    ),
    "mdi-smartphone-dock": React.lazy(() =>
        import(
            /* webpackChunkName: "SmartphoneDockIcon" */
            "mdi-react/SmartphoneDockIcon"
        ),
    ),
    "mdi-phonelink-erase": React.lazy(() =>
        import(
            /* webpackChunkName: "PhonelinkEraseIcon" */
            "mdi-react/PhonelinkEraseIcon"
        ),
    ),
    "mdi-mobile-phone-erase": React.lazy(() =>
        import(
            /* webpackChunkName: "MobilePhoneEraseIcon" */
            "mdi-react/MobilePhoneEraseIcon"
        ),
    ),
    "mdi-smartphone-erase": React.lazy(() =>
        import(
            /* webpackChunkName: "SmartphoneEraseIcon" */
            "mdi-react/SmartphoneEraseIcon"
        ),
    ),
    "mdi-mobile-phone-iphone": React.lazy(() =>
        import(
            /* webpackChunkName: "MobilePhoneIphoneIcon" */
            "mdi-react/MobilePhoneIphoneIcon"
        ),
    ),
    "mdi-smartphone-iphone": React.lazy(() =>
        import(
            /* webpackChunkName: "SmartphoneIphoneIcon" */
            "mdi-react/SmartphoneIphoneIcon"
        ),
    ),
    "mdi-mobile-phone-link-off": React.lazy(() =>
        import(
            /* webpackChunkName: "MobilePhoneLinkOffIcon" */
            "mdi-react/MobilePhoneLinkOffIcon"
        ),
    ),
    "mdi-smartphone-link-off": React.lazy(() =>
        import(
            /* webpackChunkName: "SmartphoneLinkOffIcon" */
            "mdi-react/SmartphoneLinkOffIcon"
        ),
    ),
    "mdi-phonelink-off": React.lazy(() =>
        import(
            /* webpackChunkName: "PhonelinkOffIcon" */
            "mdi-react/PhonelinkOffIcon"
        ),
    ),
    "mdi-mobile-phone-link": React.lazy(() =>
        import(
            /* webpackChunkName: "MobilePhoneLinkIcon" */
            "mdi-react/MobilePhoneLinkIcon"
        ),
    ),
    "mdi-smartphone-link": React.lazy(() =>
        import(
            /* webpackChunkName: "SmartphoneLinkIcon" */
            "mdi-react/SmartphoneLinkIcon"
        ),
    ),
    "mdi-devices": React.lazy(() =>
        import(
            /* webpackChunkName: "DevicesIcon" */
            "mdi-react/DevicesIcon"
        ),
    ),
    "mdi-phonelink-lock": React.lazy(() =>
        import(
            /* webpackChunkName: "PhonelinkLockIcon" */
            "mdi-react/PhonelinkLockIcon"
        ),
    ),
    "mdi-mobile-phone-lock": React.lazy(() =>
        import(
            /* webpackChunkName: "MobilePhoneLockIcon" */
            "mdi-react/MobilePhoneLockIcon"
        ),
    ),
    "mdi-smartphone-lock": React.lazy(() =>
        import(
            /* webpackChunkName: "SmartphoneLockIcon" */
            "mdi-react/SmartphoneLockIcon"
        ),
    ),
    "mdi-mobile-phone-message": React.lazy(() =>
        import(
            /* webpackChunkName: "MobilePhoneMessageIcon" */
            "mdi-react/MobilePhoneMessageIcon"
        ),
    ),
    "mdi-smartphone-message": React.lazy(() =>
        import(
            /* webpackChunkName: "SmartphoneMessageIcon" */
            "mdi-react/SmartphoneMessageIcon"
        ),
    ),
    "mdi-mobile-phone-off": React.lazy(() =>
        import(
            /* webpackChunkName: "MobilePhoneOffIcon" */
            "mdi-react/MobilePhoneOffIcon"
        ),
    ),
    "mdi-smartphone-off": React.lazy(() =>
        import(
            /* webpackChunkName: "SmartphoneOffIcon" */
            "mdi-react/SmartphoneOffIcon"
        ),
    ),
    "mdi-mobile-off": React.lazy(() =>
        import(
            /* webpackChunkName: "MobileOffIcon" */
            "mdi-react/MobileOffIcon"
        ),
    ),
    "mdi-phonelink-setup": React.lazy(() =>
        import(
            /* webpackChunkName: "PhonelinkSetupIcon" */
            "mdi-react/PhonelinkSetupIcon"
        ),
    ),
    "mdi-mobile-phone-settings-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "MobilePhoneSettingsVariantIcon" */
            "mdi-react/MobilePhoneSettingsVariantIcon"
        ),
    ),
    "mdi-smartphone-settings-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "SmartphoneSettingsVariantIcon" */
            "mdi-react/SmartphoneSettingsVariantIcon"
        ),
    ),
    "mdi-mobile-phone-settings": React.lazy(() =>
        import(
            /* webpackChunkName: "MobilePhoneSettingsIcon" */
            "mdi-react/MobilePhoneSettingsIcon"
        ),
    ),
    "mdi-smartphone-settings": React.lazy(() =>
        import(
            /* webpackChunkName: "SmartphoneSettingsIcon" */
            "mdi-react/SmartphoneSettingsIcon"
        ),
    ),
    "mdi-settings-cell": React.lazy(() =>
        import(
            /* webpackChunkName: "SettingsCellIcon" */
            "mdi-react/SettingsCellIcon"
        ),
    ),
    "mdi-phonelink-ring": React.lazy(() =>
        import(
            /* webpackChunkName: "PhonelinkRingIcon" */
            "mdi-react/PhonelinkRingIcon"
        ),
    ),
    "mdi-mobile-phone-sound": React.lazy(() =>
        import(
            /* webpackChunkName: "MobilePhoneSoundIcon" */
            "mdi-react/MobilePhoneSoundIcon"
        ),
    ),
    "mdi-smartphone-sound": React.lazy(() =>
        import(
            /* webpackChunkName: "SmartphoneSoundIcon" */
            "mdi-react/SmartphoneSoundIcon"
        ),
    ),
    "mdi-mobile-phone-text": React.lazy(() =>
        import(
            /* webpackChunkName: "MobilePhoneTextIcon" */
            "mdi-react/MobilePhoneTextIcon"
        ),
    ),
    "mdi-smartphone-text": React.lazy(() =>
        import(
            /* webpackChunkName: "SmartphoneTextIcon" */
            "mdi-react/SmartphoneTextIcon"
        ),
    ),
    "mdi-mobile-phone-wireless": React.lazy(() =>
        import(
            /* webpackChunkName: "MobilePhoneWirelessIcon" */
            "mdi-react/MobilePhoneWirelessIcon"
        ),
    ),
    "mdi-smartphone-wireless": React.lazy(() =>
        import(
            /* webpackChunkName: "SmartphoneWirelessIcon" */
            "mdi-react/SmartphoneWirelessIcon"
        ),
    ),
    "mdi-mobile-phone": React.lazy(() =>
        import(
            /* webpackChunkName: "MobilePhoneIcon" */
            "mdi-react/MobilePhoneIcon"
        ),
    ),
    "mdi-smartphone": React.lazy(() =>
        import(
            /* webpackChunkName: "SmartphoneIcon" */
            "mdi-react/SmartphoneIcon"
        ),
    ),
    "mdi-stay-current-portrait": React.lazy(() =>
        import(
            /* webpackChunkName: "StayCurrentPortraitIcon" */
            "mdi-react/StayCurrentPortraitIcon"
        ),
    ),
    "mdi-stay-primary-portrait": React.lazy(() =>
        import(
            /* webpackChunkName: "StayPrimaryPortraitIcon" */
            "mdi-react/StayPrimaryPortraitIcon"
        ),
    ),
    "mdi-bubble-chart": React.lazy(() =>
        import(
            /* webpackChunkName: "BubbleChartIcon" */
            "mdi-react/BubbleChartIcon"
        ),
    ),
    "mdi-chart-doughnut-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "ChartDoughnutVariantIcon" */
            "mdi-react/ChartDoughnutVariantIcon"
        ),
    ),
    "mdi-chart-doughnut": React.lazy(() =>
        import(
            /* webpackChunkName: "ChartDoughnutIcon" */
            "mdi-react/ChartDoughnutIcon"
        ),
    ),
    "mdi-data-usage": React.lazy(() =>
        import(
            /* webpackChunkName: "DataUsageIcon" */
            "mdi-react/DataUsageIcon"
        ),
    ),
    "mdi-show-chart": React.lazy(() =>
        import(
            /* webpackChunkName: "ShowChartIcon" */
            "mdi-react/ShowChartIcon"
        ),
    ),
    "mdi-tick-all": React.lazy(() =>
        import(
            /* webpackChunkName: "TickAllIcon" */
            "mdi-react/TickAllIcon"
        ),
    ),
    "mdi-done-all": React.lazy(() =>
        import(
            /* webpackChunkName: "DoneAllIcon" */
            "mdi-react/DoneAllIcon"
        ),
    ),
    "mdi-tick-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "TickCircleOutlineIcon" */
            "mdi-react/TickCircleOutlineIcon"
        ),
    ),
    "mdi-tick-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "TickCircleIcon" */
            "mdi-react/TickCircleIcon"
        ),
    ),
    "mdi-done-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "DoneOutlineIcon" */
            "mdi-react/DoneOutlineIcon"
        ),
    ),
    "mdi-tick-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "TickOutlineIcon" */
            "mdi-react/TickOutlineIcon"
        ),
    ),
    "mdi-tick": React.lazy(() =>
        import(
            /* webpackChunkName: "TickIcon" */
            "mdi-react/TickIcon"
        ),
    ),
    "mdi-done": React.lazy(() =>
        import(
            /* webpackChunkName: "DoneIcon" */
            "mdi-react/DoneIcon"
        ),
    ),
    "mdi-check-box-outline-blank": React.lazy(() =>
        import(
            /* webpackChunkName: "CheckBoxOutlineBlankIcon" */
            "mdi-react/CheckBoxOutlineBlankIcon"
        ),
    ),
    "mdi-check-box": React.lazy(() =>
        import(
            /* webpackChunkName: "CheckBoxIcon" */
            "mdi-react/CheckBoxIcon"
        ),
    ),
    "mdi-chess-horse": React.lazy(() =>
        import(
            /* webpackChunkName: "ChessHorseIcon" */
            "mdi-react/ChessHorseIcon"
        ),
    ),
    "mdi-chess-castle": React.lazy(() =>
        import(
            /* webpackChunkName: "ChessCastleIcon" */
            "mdi-react/ChessCastleIcon"
        ),
    ),
    "mdi-expand-more": React.lazy(() =>
        import(
            /* webpackChunkName: "ExpandMoreIcon" */
            "mdi-react/ExpandMoreIcon"
        ),
    ),
    "mdi-keyboard-arrow-down": React.lazy(() =>
        import(
            /* webpackChunkName: "KeyboardArrowDownIcon" */
            "mdi-react/KeyboardArrowDownIcon"
        ),
    ),
    "mdi-keyboard-arrow-left": React.lazy(() =>
        import(
            /* webpackChunkName: "KeyboardArrowLeftIcon" */
            "mdi-react/KeyboardArrowLeftIcon"
        ),
    ),
    "mdi-navigate-before": React.lazy(() =>
        import(
            /* webpackChunkName: "NavigateBeforeIcon" */
            "mdi-react/NavigateBeforeIcon"
        ),
    ),
    "mdi-keyboard-arrow-right": React.lazy(() =>
        import(
            /* webpackChunkName: "KeyboardArrowRightIcon" */
            "mdi-react/KeyboardArrowRightIcon"
        ),
    ),
    "mdi-navigate-next": React.lazy(() =>
        import(
            /* webpackChunkName: "NavigateNextIcon" */
            "mdi-react/NavigateNextIcon"
        ),
    ),
    "mdi-expand-less": React.lazy(() =>
        import(
            /* webpackChunkName: "ExpandLessIcon" */
            "mdi-react/ExpandLessIcon"
        ),
    ),
    "mdi-keyboard-arrow-up": React.lazy(() =>
        import(
            /* webpackChunkName: "KeyboardArrowUpIcon" */
            "mdi-react/KeyboardArrowUpIcon"
        ),
    ),
    "mdi-chilli-hot": React.lazy(() =>
        import(
            /* webpackChunkName: "ChilliHotIcon" */
            "mdi-react/ChilliHotIcon"
        ),
    ),
    "mdi-chilli-medium": React.lazy(() =>
        import(
            /* webpackChunkName: "ChilliMediumIcon" */
            "mdi-react/ChilliMediumIcon"
        ),
    ),
    "mdi-chilli-mild": React.lazy(() =>
        import(
            /* webpackChunkName: "ChilliMildIcon" */
            "mdi-react/ChilliMildIcon"
        ),
    ),
    "mdi-lens": React.lazy(() =>
        import(
            /* webpackChunkName: "LensIcon" */
            "mdi-react/LensIcon"
        ),
    ),
    "mdi-location-city": React.lazy(() =>
        import(
            /* webpackChunkName: "LocationCityIcon" */
            "mdi-react/LocationCityIcon"
        ),
    ),
    "mdi-clipboard-user": React.lazy(() =>
        import(
            /* webpackChunkName: "ClipboardUserIcon" */
            "mdi-react/ClipboardUserIcon"
        ),
    ),
    "mdi-assignment-ind": React.lazy(() =>
        import(
            /* webpackChunkName: "AssignmentIndIcon" */
            "mdi-react/AssignmentIndIcon"
        ),
    ),
    "mdi-clipboard-warning": React.lazy(() =>
        import(
            /* webpackChunkName: "ClipboardWarningIcon" */
            "mdi-react/ClipboardWarningIcon"
        ),
    ),
    "mdi-assignment-late": React.lazy(() =>
        import(
            /* webpackChunkName: "AssignmentLateIcon" */
            "mdi-react/AssignmentLateIcon"
        ),
    ),
    "mdi-assignment-returned": React.lazy(() =>
        import(
            /* webpackChunkName: "AssignmentReturnedIcon" */
            "mdi-react/AssignmentReturnedIcon"
        ),
    ),
    "mdi-assignment-return": React.lazy(() =>
        import(
            /* webpackChunkName: "AssignmentReturnIcon" */
            "mdi-react/AssignmentReturnIcon"
        ),
    ),
    "mdi-assignment-turned-in": React.lazy(() =>
        import(
            /* webpackChunkName: "AssignmentTurnedInIcon" */
            "mdi-react/AssignmentTurnedInIcon"
        ),
    ),
    "mdi-assignment": React.lazy(() =>
        import(
            /* webpackChunkName: "AssignmentIcon" */
            "mdi-react/AssignmentIcon"
        ),
    ),
    "mdi-clock-warning": React.lazy(() =>
        import(
            /* webpackChunkName: "ClockWarningIcon" */
            "mdi-react/ClockWarningIcon"
        ),
    ),
    "mdi-access-time": React.lazy(() =>
        import(
            /* webpackChunkName: "AccessTimeIcon" */
            "mdi-react/AccessTimeIcon"
        ),
    ),
    "mdi-query-builder": React.lazy(() =>
        import(
            /* webpackChunkName: "QueryBuilderIcon" */
            "mdi-react/QueryBuilderIcon"
        ),
    ),
    "mdi-schedule": React.lazy(() =>
        import(
            /* webpackChunkName: "ScheduleIcon" */
            "mdi-react/ScheduleIcon"
        ),
    ),
    "mdi-watch-later": React.lazy(() =>
        import(
            /* webpackChunkName: "WatchLaterIcon" */
            "mdi-react/WatchLaterIcon"
        ),
    ),
    "mdi-highlight-off": React.lazy(() =>
        import(
            /* webpackChunkName: "HighlightOffIcon" */
            "mdi-react/HighlightOffIcon"
        ),
    ),
    "mdi-remove-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "RemoveCircleIcon" */
            "mdi-react/RemoveCircleIcon"
        ),
    ),
    "mdi-clear": React.lazy(() =>
        import(
            /* webpackChunkName: "ClearIcon" */
            "mdi-react/ClearIcon"
        ),
    ),
    "mdi-cc": React.lazy(() =>
        import(
            /* webpackChunkName: "CcIcon" */
            "mdi-react/CcIcon"
        ),
    ),
    "mdi-cloud-json": React.lazy(() =>
        import(
            /* webpackChunkName: "CloudJsonIcon" */
            "mdi-react/CloudJsonIcon"
        ),
    ),
    "mdi-cloud-done": React.lazy(() =>
        import(
            /* webpackChunkName: "CloudDoneIcon" */
            "mdi-react/CloudDoneIcon"
        ),
    ),
    "mdi-cloud-queue": React.lazy(() =>
        import(
            /* webpackChunkName: "CloudQueueIcon" */
            "mdi-react/CloudQueueIcon"
        ),
    ),
    "mdi-cloud-xml": React.lazy(() =>
        import(
            /* webpackChunkName: "CloudXmlIcon" */
            "mdi-react/CloudXmlIcon"
        ),
    ),
    "mdi-backup": React.lazy(() =>
        import(
            /* webpackChunkName: "BackupIcon" */
            "mdi-react/BackupIcon"
        ),
    ),
    "mdi-wb-cloudy": React.lazy(() =>
        import(
            /* webpackChunkName: "WbCloudyIcon" */
            "mdi-react/WbCloudyIcon"
        ),
    ),
    "mdi-luck": React.lazy(() =>
        import(
            /* webpackChunkName: "LuckIcon" */
            "mdi-react/LuckIcon"
        ),
    ),
    "mdi-tea-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "TeaOutlineIcon" */
            "mdi-react/TeaOutlineIcon"
        ),
    ),
    "mdi-cup-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "CupOutlineIcon" */
            "mdi-react/CupOutlineIcon"
        ),
    ),
    "mdi-tea": React.lazy(() =>
        import(
            /* webpackChunkName: "TeaIcon" */
            "mdi-react/TeaIcon"
        ),
    ),
    "mdi-free-breakfast": React.lazy(() =>
        import(
            /* webpackChunkName: "FreeBreakfastIcon" */
            "mdi-react/FreeBreakfastIcon"
        ),
    ),
    "mdi-local-cafe": React.lazy(() =>
        import(
            /* webpackChunkName: "LocalCafeIcon" */
            "mdi-react/LocalCafeIcon"
        ),
    ),
    "mdi-manufacturing": React.lazy(() =>
        import(
            /* webpackChunkName: "ManufacturingIcon" */
            "mdi-react/ManufacturingIcon"
        ),
    ),
    "mdi-toll": React.lazy(() =>
        import(
            /* webpackChunkName: "TollIcon" */
            "mdi-react/TollIcon"
        ),
    ),
    "mdi-auto-awesome-mosaic": React.lazy(() =>
        import(
            /* webpackChunkName: "AutoAwesomeMosaicIcon" */
            "mdi-react/AutoAwesomeMosaicIcon"
        ),
    ),
    "mdi-colour-helper": React.lazy(() =>
        import(
            /* webpackChunkName: "ColourHelperIcon" */
            "mdi-react/ColourHelperIcon"
        ),
    ),
    "mdi-comment-user-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "CommentUserOutlineIcon" */
            "mdi-react/CommentUserOutlineIcon"
        ),
    ),
    "mdi-comment-user": React.lazy(() =>
        import(
            /* webpackChunkName: "CommentUserIcon" */
            "mdi-react/CommentUserIcon"
        ),
    ),
    "mdi-comment-warning-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "CommentWarningOutlineIcon" */
            "mdi-react/CommentWarningOutlineIcon"
        ),
    ),
    "mdi-comment-warning": React.lazy(() =>
        import(
            /* webpackChunkName: "CommentWarningIcon" */
            "mdi-react/CommentWarningIcon"
        ),
    ),
    "mdi-explore": React.lazy(() =>
        import(
            /* webpackChunkName: "ExploreIcon" */
            "mdi-react/ExploreIcon"
        ),
    ),
    "mdi-terminal-line": React.lazy(() =>
        import(
            /* webpackChunkName: "TerminalLineIcon" */
            "mdi-react/TerminalLineIcon"
        ),
    ),
    "mdi-terminal-network": React.lazy(() =>
        import(
            /* webpackChunkName: "TerminalNetworkIcon" */
            "mdi-react/TerminalNetworkIcon"
        ),
    ),
    "mdi-terminal": React.lazy(() =>
        import(
            /* webpackChunkName: "TerminalIcon" */
            "mdi-react/TerminalIcon"
        ),
    ),
    "mdi-scissors": React.lazy(() =>
        import(
            /* webpackChunkName: "ScissorsIcon" */
            "mdi-react/ScissorsIcon"
        ),
    ),
    "mdi-clip": React.lazy(() =>
        import(
            /* webpackChunkName: "ClipIcon" */
            "mdi-react/ClipIcon"
        ),
    ),
    "mdi-auto-awesome": React.lazy(() =>
        import(
            /* webpackChunkName: "AutoAwesomeIcon" */
            "mdi-react/AutoAwesomeIcon"
        ),
    ),
    "mdi-payment-settings": React.lazy(() =>
        import(
            /* webpackChunkName: "PaymentSettingsIcon" */
            "mdi-react/PaymentSettingsIcon"
        ),
    ),
    "mdi-payment": React.lazy(() =>
        import(
            /* webpackChunkName: "PaymentIcon" */
            "mdi-react/PaymentIcon"
        ),
    ),
    "mdi-crop-54": React.lazy(() =>
        import(
            /* webpackChunkName: "Crop54Icon" */
            "mdi-react/Crop54Icon"
        ),
    ),
    "mdi-gps-fixed": React.lazy(() =>
        import(
            /* webpackChunkName: "GpsFixedIcon" */
            "mdi-react/GpsFixedIcon"
        ),
    ),
    "mdi-my-location": React.lazy(() =>
        import(
            /* webpackChunkName: "MyLocationIcon" */
            "mdi-react/MyLocationIcon"
        ),
    ),
    "mdi-gps-not-fixed": React.lazy(() =>
        import(
            /* webpackChunkName: "GpsNotFixedIcon" */
            "mdi-react/GpsNotFixedIcon"
        ),
    ),
    "mdi-location-searching": React.lazy(() =>
        import(
            /* webpackChunkName: "LocationSearchingIcon" */
            "mdi-react/LocationSearchingIcon"
        ),
    ),
    "mdi-local-drink": React.lazy(() =>
        import(
            /* webpackChunkName: "LocalDrinkIcon" */
            "mdi-react/LocalDrinkIcon"
        ),
    ),
    "mdi-taka": React.lazy(() =>
        import(
            /* webpackChunkName: "TakaIcon" */
            "mdi-react/TakaIcon"
        ),
    ),
    "mdi-bangladeshi-taka": React.lazy(() =>
        import(
            /* webpackChunkName: "BangladeshiTakaIcon" */
            "mdi-react/BangladeshiTakaIcon"
        ),
    ),
    "mdi-franc": React.lazy(() =>
        import(
            /* webpackChunkName: "FrancIcon" */
            "mdi-react/FrancIcon"
        ),
    ),
    "mdi-yuan": React.lazy(() =>
        import(
            /* webpackChunkName: "YuanIcon" */
            "mdi-react/YuanIcon"
        ),
    ),
    "mdi-renminbi": React.lazy(() =>
        import(
            /* webpackChunkName: "RenminbiIcon" */
            "mdi-react/RenminbiIcon"
        ),
    ),
    "mdi-xi": React.lazy(() =>
        import(
            /* webpackChunkName: "XiIcon" */
            "mdi-react/XiIcon"
        ),
    ),
    "mdi-euro": React.lazy(() =>
        import(
            /* webpackChunkName: "EuroIcon" */
            "mdi-react/EuroIcon"
        ),
    ),
    "mdi-euro-symbol": React.lazy(() =>
        import(
            /* webpackChunkName: "EuroSymbolIcon" */
            "mdi-react/EuroSymbolIcon"
        ),
    ),
    "mdi-sterling": React.lazy(() =>
        import(
            /* webpackChunkName: "SterlingIcon" */
            "mdi-react/SterlingIcon"
        ),
    ),
    "mdi-rupee": React.lazy(() =>
        import(
            /* webpackChunkName: "RupeeIcon" */
            "mdi-react/RupeeIcon"
        ),
    ),
    "mdi-yen": React.lazy(() =>
        import(
            /* webpackChunkName: "YenIcon" */
            "mdi-react/YenIcon"
        ),
    ),
    "mdi-won": React.lazy(() =>
        import(
            /* webpackChunkName: "WonIcon" */
            "mdi-react/WonIcon"
        ),
    ),
    "mdi-kazakhstani-tenge": React.lazy(() =>
        import(
            /* webpackChunkName: "KazakhstaniTengeIcon" */
            "mdi-react/KazakhstaniTengeIcon"
        ),
    ),
    "mdi-naira": React.lazy(() =>
        import(
            /* webpackChunkName: "NairaIcon" */
            "mdi-react/NairaIcon"
        ),
    ),
    "mdi-ruble": React.lazy(() =>
        import(
            /* webpackChunkName: "RubleIcon" */
            "mdi-react/RubleIcon"
        ),
    ),
    "mdi-currency-scarab": React.lazy(() =>
        import(
            /* webpackChunkName: "CurrencyScarabIcon" */
            "mdi-react/CurrencyScarabIcon"
        ),
    ),
    "mdi-lira": React.lazy(() =>
        import(
            /* webpackChunkName: "LiraIcon" */
            "mdi-react/LiraIcon"
        ),
    ),
    "mdi-money-off": React.lazy(() =>
        import(
            /* webpackChunkName: "MoneyOffIcon" */
            "mdi-react/MoneyOffIcon"
        ),
    ),
    "mdi-attach-money": React.lazy(() =>
        import(
            /* webpackChunkName: "AttachMoneyIcon" */
            "mdi-react/AttachMoneyIcon"
        ),
    ),
    "mdi-alternating-current": React.lazy(() =>
        import(
            /* webpackChunkName: "AlternatingCurrentIcon" */
            "mdi-react/AlternatingCurrentIcon"
        ),
    ),
    "mdi-direct-current": React.lazy(() =>
        import(
            /* webpackChunkName: "DirectCurrentIcon" */
            "mdi-react/DirectCurrentIcon"
        ),
    ),
    "mdi-trash-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "TrashCircleIcon" */
            "mdi-react/TrashCircleIcon"
        ),
    ),
    "mdi-bin-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "BinCircleIcon" */
            "mdi-react/BinCircleIcon"
        ),
    ),
    "mdi-trash-empty": React.lazy(() =>
        import(
            /* webpackChunkName: "TrashEmptyIcon" */
            "mdi-react/TrashEmptyIcon"
        ),
    ),
    "mdi-bin-empty": React.lazy(() =>
        import(
            /* webpackChunkName: "BinEmptyIcon" */
            "mdi-react/BinEmptyIcon"
        ),
    ),
    "mdi-trash-restore": React.lazy(() =>
        import(
            /* webpackChunkName: "TrashRestoreIcon" */
            "mdi-react/TrashRestoreIcon"
        ),
    ),
    "mdi-bin-restore": React.lazy(() =>
        import(
            /* webpackChunkName: "BinRestoreIcon" */
            "mdi-react/BinRestoreIcon"
        ),
    ),
    "mdi-restore-from-trash": React.lazy(() =>
        import(
            /* webpackChunkName: "RestoreFromTrashIcon" */
            "mdi-react/RestoreFromTrashIcon"
        ),
    ),
    "mdi-trash-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "TrashVariantIcon" */
            "mdi-react/TrashVariantIcon"
        ),
    ),
    "mdi-bin-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "BinVariantIcon" */
            "mdi-react/BinVariantIcon"
        ),
    ),
    "mdi-trash": React.lazy(() =>
        import(
            /* webpackChunkName: "TrashIcon" */
            "mdi-react/TrashIcon"
        ),
    ),
    "mdi-bin": React.lazy(() =>
        import(
            /* webpackChunkName: "BinIcon" */
            "mdi-react/BinIcon"
        ),
    ),
    "mdi-change-history": React.lazy(() =>
        import(
            /* webpackChunkName: "ChangeHistoryIcon" */
            "mdi-react/ChangeHistoryIcon"
        ),
    ),
    "mdi-computer-classic": React.lazy(() =>
        import(
            /* webpackChunkName: "ComputerClassicIcon" */
            "mdi-react/ComputerClassicIcon"
        ),
    ),
    "mdi-keypad": React.lazy(() =>
        import(
            /* webpackChunkName: "KeypadIcon" */
            "mdi-react/KeypadIcon"
        ),
    ),
    "mdi-die-1": React.lazy(() =>
        import(
            /* webpackChunkName: "Die1Icon" */
            "mdi-react/Die1Icon"
        ),
    ),
    "mdi-die-2": React.lazy(() =>
        import(
            /* webpackChunkName: "Die2Icon" */
            "mdi-react/Die2Icon"
        ),
    ),
    "mdi-die-3": React.lazy(() =>
        import(
            /* webpackChunkName: "Die3Icon" */
            "mdi-react/Die3Icon"
        ),
    ),
    "mdi-die-4": React.lazy(() =>
        import(
            /* webpackChunkName: "Die4Icon" */
            "mdi-react/Die4Icon"
        ),
    ),
    "mdi-die-5": React.lazy(() =>
        import(
            /* webpackChunkName: "Die5Icon" */
            "mdi-react/Die5Icon"
        ),
    ),
    "mdi-die-6": React.lazy(() =>
        import(
            /* webpackChunkName: "Die6Icon" */
            "mdi-react/Die6Icon"
        ),
    ),
    "mdi-die-d-10": React.lazy(() =>
        import(
            /* webpackChunkName: "DieD10Icon" */
            "mdi-react/DieD10Icon"
        ),
    ),
    "mdi-die-d-20": React.lazy(() =>
        import(
            /* webpackChunkName: "DieD20Icon" */
            "mdi-react/DieD20Icon"
        ),
    ),
    "mdi-die-d-4": React.lazy(() =>
        import(
            /* webpackChunkName: "DieD4Icon" */
            "mdi-react/DieD4Icon"
        ),
    ),
    "mdi-die-d-6": React.lazy(() =>
        import(
            /* webpackChunkName: "DieD6Icon" */
            "mdi-react/DieD6Icon"
        ),
    ),
    "mdi-die-d-8": React.lazy(() =>
        import(
            /* webpackChunkName: "DieD8Icon" */
            "mdi-react/DieD8Icon"
        ),
    ),
    "mdi-disk-warning": React.lazy(() =>
        import(
            /* webpackChunkName: "DiskWarningIcon" */
            "mdi-react/DiskWarningIcon"
        ),
    ),
    "mdi-disc-full": React.lazy(() =>
        import(
            /* webpackChunkName: "DiscFullIcon" */
            "mdi-react/DiscFullIcon"
        ),
    ),
    "mdi-disc-player": React.lazy(() =>
        import(
            /* webpackChunkName: "DiscPlayerIcon" */
            "mdi-react/DiscPlayerIcon"
        ),
    ),
    "mdi-helix": React.lazy(() =>
        import(
            /* webpackChunkName: "HelixIcon" */
            "mdi-react/HelixIcon"
        ),
    ),
    "mdi-no-entry": React.lazy(() =>
        import(
            /* webpackChunkName: "NoEntryIcon" */
            "mdi-react/NoEntryIcon"
        ),
    ),
    "mdi-building": React.lazy(() =>
        import(
            /* webpackChunkName: "BuildingIcon" */
            "mdi-react/BuildingIcon"
        ),
    ),
    "mdi-company": React.lazy(() =>
        import(
            /* webpackChunkName: "CompanyIcon" */
            "mdi-react/CompanyIcon"
        ),
    ),
    "mdi-business": React.lazy(() =>
        import(
            /* webpackChunkName: "BusinessIcon" */
            "mdi-react/BusinessIcon"
        ),
    ),
    "mdi-ellipsis-horizontal-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "EllipsisHorizontalCircleIcon" */
            "mdi-react/EllipsisHorizontalCircleIcon"
        ),
    ),
    "mdi-more-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "MoreCircleIcon" */
            "mdi-react/MoreCircleIcon"
        ),
    ),
    "mdi-ellipsis-horizontal": React.lazy(() =>
        import(
            /* webpackChunkName: "EllipsisHorizontalIcon" */
            "mdi-react/EllipsisHorizontalIcon"
        ),
    ),
    "mdi-more-horiz": React.lazy(() =>
        import(
            /* webpackChunkName: "MoreHorizIcon" */
            "mdi-react/MoreHorizIcon"
        ),
    ),
    "mdi-ellipsis-vertical-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "EllipsisVerticalCircleIcon" */
            "mdi-react/EllipsisVerticalCircleIcon"
        ),
    ),
    "mdi-ellipsis-vertical": React.lazy(() =>
        import(
            /* webpackChunkName: "EllipsisVerticalIcon" */
            "mdi-react/EllipsisVerticalIcon"
        ),
    ),
    "mdi-more-vert": React.lazy(() =>
        import(
            /* webpackChunkName: "MoreVertIcon" */
            "mdi-react/MoreVertIcon"
        ),
    ),
    "mdi-get-app": React.lazy(() =>
        import(
            /* webpackChunkName: "GetAppIcon" */
            "mdi-react/GetAppIcon"
        ),
    ),
    "mdi-weights": React.lazy(() =>
        import(
            /* webpackChunkName: "WeightsIcon" */
            "mdi-react/WeightsIcon"
        ),
    ),
    "mdi-globe": React.lazy(() =>
        import(
            /* webpackChunkName: "GlobeIcon" */
            "mdi-react/GlobeIcon"
        ),
    ),
    "mdi-public": React.lazy(() =>
        import(
            /* webpackChunkName: "PublicIcon" */
            "mdi-react/PublicIcon"
        ),
    ),
    "mdi-email-warning": React.lazy(() =>
        import(
            /* webpackChunkName: "EmailWarningIcon" */
            "mdi-react/EmailWarningIcon"
        ),
    ),
    "mdi-envelope-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "EnvelopeAlertIcon" */
            "mdi-react/EnvelopeAlertIcon"
        ),
    ),
    "mdi-envelope-warning": React.lazy(() =>
        import(
            /* webpackChunkName: "EnvelopeWarningIcon" */
            "mdi-react/EnvelopeWarningIcon"
        ),
    ),
    "mdi-envelope-open-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "EnvelopeOpenOutlineIcon" */
            "mdi-react/EnvelopeOpenOutlineIcon"
        ),
    ),
    "mdi-drafts": React.lazy(() =>
        import(
            /* webpackChunkName: "DraftsIcon" */
            "mdi-react/DraftsIcon"
        ),
    ),
    "mdi-envelope-open": React.lazy(() =>
        import(
            /* webpackChunkName: "EnvelopeOpenIcon" */
            "mdi-react/EnvelopeOpenIcon"
        ),
    ),
    "mdi-mail-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "MailOutlineIcon" */
            "mdi-react/MailOutlineIcon"
        ),
    ),
    "mdi-envelope-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "EnvelopeOutlineIcon" */
            "mdi-react/EnvelopeOutlineIcon"
        ),
    ),
    "mdi-envelope-secure": React.lazy(() =>
        import(
            /* webpackChunkName: "EnvelopeSecureIcon" */
            "mdi-react/EnvelopeSecureIcon"
        ),
    ),
    "mdi-envelope-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "EnvelopeVariantIcon" */
            "mdi-react/EnvelopeVariantIcon"
        ),
    ),
    "mdi-local-post-office": React.lazy(() =>
        import(
            /* webpackChunkName: "LocalPostOfficeIcon" */
            "mdi-react/LocalPostOfficeIcon"
        ),
    ),
    "mdi-mail": React.lazy(() =>
        import(
            /* webpackChunkName: "MailIcon" */
            "mdi-react/MailIcon"
        ),
    ),
    "mdi-markunread": React.lazy(() =>
        import(
            /* webpackChunkName: "MarkunreadIcon" */
            "mdi-react/MarkunreadIcon"
        ),
    ),
    "mdi-envelope": React.lazy(() =>
        import(
            /* webpackChunkName: "EnvelopeIcon" */
            "mdi-react/EnvelopeIcon"
        ),
    ),
    "mdi-smiley-cool": React.lazy(() =>
        import(
            /* webpackChunkName: "SmileyCoolIcon" */
            "mdi-react/SmileyCoolIcon"
        ),
    ),
    "mdi-smiley-dead": React.lazy(() =>
        import(
            /* webpackChunkName: "SmileyDeadIcon" */
            "mdi-react/SmileyDeadIcon"
        ),
    ),
    "mdi-smiley-devil": React.lazy(() =>
        import(
            /* webpackChunkName: "SmileyDevilIcon" */
            "mdi-react/SmileyDevilIcon"
        ),
    ),
    "mdi-smiley-excited": React.lazy(() =>
        import(
            /* webpackChunkName: "SmileyExcitedIcon" */
            "mdi-react/SmileyExcitedIcon"
        ),
    ),
    "mdi-smiley-happy": React.lazy(() =>
        import(
            /* webpackChunkName: "SmileyHappyIcon" */
            "mdi-react/SmileyHappyIcon"
        ),
    ),
    "mdi-smiley-neutral": React.lazy(() =>
        import(
            /* webpackChunkName: "SmileyNeutralIcon" */
            "mdi-react/SmileyNeutralIcon"
        ),
    ),
    "mdi-smiley-poop": React.lazy(() =>
        import(
            /* webpackChunkName: "SmileyPoopIcon" */
            "mdi-react/SmileyPoopIcon"
        ),
    ),
    "mdi-smiley-sad": React.lazy(() =>
        import(
            /* webpackChunkName: "SmileySadIcon" */
            "mdi-react/SmileySadIcon"
        ),
    ),
    "mdi-smiley-tongue": React.lazy(() =>
        import(
            /* webpackChunkName: "SmileyTongueIcon" */
            "mdi-react/SmileyTongueIcon"
        ),
    ),
    "mdi-smiley": React.lazy(() =>
        import(
            /* webpackChunkName: "SmileyIcon" */
            "mdi-react/SmileyIcon"
        ),
    ),
    "mdi-insert-emoticon": React.lazy(() =>
        import(
            /* webpackChunkName: "InsertEmoticonIcon" */
            "mdi-react/InsertEmoticonIcon"
        ),
    ),
    "mdi-mood": React.lazy(() =>
        import(
            /* webpackChunkName: "MoodIcon" */
            "mdi-react/MoodIcon"
        ),
    ),
    "mdi-sentiment-very-satisfied": React.lazy(() =>
        import(
            /* webpackChunkName: "SentimentVerySatisfiedIcon" */
            "mdi-react/SentimentVerySatisfiedIcon"
        ),
    ),
    "mdi-hide-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "HideOutlineIcon" */
            "mdi-react/HideOutlineIcon"
        ),
    ),
    "mdi-visibility-off-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "VisibilityOffOutlineIcon" */
            "mdi-react/VisibilityOffOutlineIcon"
        ),
    ),
    "mdi-hide": React.lazy(() =>
        import(
            /* webpackChunkName: "HideIcon" */
            "mdi-react/HideIcon"
        ),
    ),
    "mdi-visibility-off": React.lazy(() =>
        import(
            /* webpackChunkName: "VisibilityOffIcon" */
            "mdi-react/VisibilityOffIcon"
        ),
    ),
    "mdi-show-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "ShowOutlineIcon" */
            "mdi-react/ShowOutlineIcon"
        ),
    ),
    "mdi-visibility-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "VisibilityOutlineIcon" */
            "mdi-react/VisibilityOutlineIcon"
        ),
    ),
    "mdi-show": React.lazy(() =>
        import(
            /* webpackChunkName: "ShowIcon" */
            "mdi-react/ShowIcon"
        ),
    ),
    "mdi-visibility": React.lazy(() =>
        import(
            /* webpackChunkName: "VisibilityIcon" */
            "mdi-react/VisibilityIcon"
        ),
    ),
    "mdi-remove-red-eye": React.lazy(() =>
        import(
            /* webpackChunkName: "RemoveRedEyeIcon" */
            "mdi-react/RemoveRedEyeIcon"
        ),
    ),
    "mdi-colorize": React.lazy(() =>
        import(
            /* webpackChunkName: "ColorizeIcon" */
            "mdi-react/ColorizeIcon"
        ),
    ),
    "mdi-colourise": React.lazy(() =>
        import(
            /* webpackChunkName: "ColouriseIcon" */
            "mdi-react/ColouriseIcon"
        ),
    ),
    "mdi-industrial": React.lazy(() =>
        import(
            /* webpackChunkName: "IndustrialIcon" */
            "mdi-react/IndustrialIcon"
        ),
    ),
    "mdi-cargo-ship": React.lazy(() =>
        import(
            /* webpackChunkName: "CargoShipIcon" */
            "mdi-react/CargoShipIcon"
        ),
    ),
    "mdi-boat": React.lazy(() =>
        import(
            /* webpackChunkName: "BoatIcon" */
            "mdi-react/BoatIcon"
        ),
    ),
    "mdi-ship": React.lazy(() =>
        import(
            /* webpackChunkName: "ShipIcon" */
            "mdi-react/ShipIcon"
        ),
    ),
    "mdi-directions-boat": React.lazy(() =>
        import(
            /* webpackChunkName: "DirectionsBoatIcon" */
            "mdi-react/DirectionsBoatIcon"
        ),
    ),
    "mdi-directions-ferry": React.lazy(() =>
        import(
            /* webpackChunkName: "DirectionsFerryIcon" */
            "mdi-react/DirectionsFerryIcon"
        ),
    ),
    "mdi-file-user": React.lazy(() =>
        import(
            /* webpackChunkName: "FileUserIcon" */
            "mdi-react/FileUserIcon"
        ),
    ),
    "mdi-file-report": React.lazy(() =>
        import(
            /* webpackChunkName: "FileReportIcon" */
            "mdi-react/FileReportIcon"
        ),
    ),
    "mdi-file-csv": React.lazy(() =>
        import(
            /* webpackChunkName: "FileCsvIcon" */
            "mdi-react/FileCsvIcon"
        ),
    ),
    "mdi-print-preview": React.lazy(() =>
        import(
            /* webpackChunkName: "PrintPreviewIcon" */
            "mdi-react/PrintPreviewIcon"
        ),
    ),
    "mdi-find-in-page": React.lazy(() =>
        import(
            /* webpackChunkName: "FindInPageIcon" */
            "mdi-react/FindInPageIcon"
        ),
    ),
    "mdi-note-add": React.lazy(() =>
        import(
            /* webpackChunkName: "NoteAddIcon" */
            "mdi-react/NoteAddIcon"
        ),
    ),
    "mdi-restore-page": React.lazy(() =>
        import(
            /* webpackChunkName: "RestorePageIcon" */
            "mdi-react/RestorePageIcon"
        ),
    ),
    "mdi-subtasks": React.lazy(() =>
        import(
            /* webpackChunkName: "SubtasksIcon" */
            "mdi-react/SubtasksIcon"
        ),
    ),
    "mdi-file-revert": React.lazy(() =>
        import(
            /* webpackChunkName: "FileRevertIcon" */
            "mdi-react/FileRevertIcon"
        ),
    ),
    "mdi-file-discard": React.lazy(() =>
        import(
            /* webpackChunkName: "FileDiscardIcon" */
            "mdi-react/FileDiscardIcon"
        ),
    ),
    "mdi-insert-drive-file": React.lazy(() =>
        import(
            /* webpackChunkName: "InsertDriveFileIcon" */
            "mdi-react/InsertDriveFileIcon"
        ),
    ),
    "mdi-draft": React.lazy(() =>
        import(
            /* webpackChunkName: "DraftIcon" */
            "mdi-react/DraftIcon"
        ),
    ),
    "mdi-camera-roll": React.lazy(() =>
        import(
            /* webpackChunkName: "CameraRollIcon" */
            "mdi-react/CameraRollIcon"
        ),
    ),
    "mdi-local-movies": React.lazy(() =>
        import(
            /* webpackChunkName: "LocalMoviesIcon" */
            "mdi-react/LocalMoviesIcon"
        ),
    ),
    "mdi-theaters": React.lazy(() =>
        import(
            /* webpackChunkName: "TheatersIcon" */
            "mdi-react/TheatersIcon"
        ),
    ),
    "mdi-filter-list": React.lazy(() =>
        import(
            /* webpackChunkName: "FilterListIcon" */
            "mdi-react/FilterListIcon"
        ),
    ),
    "mdi-chart-finance": React.lazy(() =>
        import(
            /* webpackChunkName: "ChartFinanceIcon" */
            "mdi-react/ChartFinanceIcon"
        ),
    ),
    "mdi-fire-engine": React.lazy(() =>
        import(
            /* webpackChunkName: "FireEngineIcon" */
            "mdi-react/FireEngineIcon"
        ),
    ),
    "mdi-whatshot": React.lazy(() =>
        import(
            /* webpackChunkName: "WhatshotIcon" */
            "mdi-react/WhatshotIcon"
        ),
    ),
    "mdi-assistant-photo": React.lazy(() =>
        import(
            /* webpackChunkName: "AssistantPhotoIcon" */
            "mdi-react/AssistantPhotoIcon"
        ),
    ),
    "mdi-amp": React.lazy(() =>
        import(
            /* webpackChunkName: "AmpIcon" */
            "mdi-react/AmpIcon"
        ),
    ),
    "mdi-offline-bolt": React.lazy(() =>
        import(
            /* webpackChunkName: "OfflineBoltIcon" */
            "mdi-react/OfflineBoltIcon"
        ),
    ),
    "mdi-lightning-bolt-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "LightningBoltCircleIcon" */
            "mdi-react/LightningBoltCircleIcon"
        ),
    ),
    "mdi-lighning-bolt-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "LighningBoltOutlineIcon" */
            "mdi-react/LighningBoltOutlineIcon"
        ),
    ),
    "mdi-lightning-bolt": React.lazy(() =>
        import(
            /* webpackChunkName: "LightningBoltIcon" */
            "mdi-react/LightningBoltIcon"
        ),
    ),
    "mdi-flash-on": React.lazy(() =>
        import(
            /* webpackChunkName: "FlashOnIcon" */
            "mdi-react/FlashOnIcon"
        ),
    ),
    "mdi-electricity": React.lazy(() =>
        import(
            /* webpackChunkName: "ElectricityIcon" */
            "mdi-react/ElectricityIcon"
        ),
    ),
    "mdi-torch-off": React.lazy(() =>
        import(
            /* webpackChunkName: "TorchOffIcon" */
            "mdi-react/TorchOffIcon"
        ),
    ),
    "mdi-torch": React.lazy(() =>
        import(
            /* webpackChunkName: "TorchIcon" */
            "mdi-react/TorchIcon"
        ),
    ),
    "mdi-local-florist": React.lazy(() =>
        import(
            /* webpackChunkName: "LocalFloristIcon" */
            "mdi-react/LocalFloristIcon"
        ),
    ),
    "mdi-folder-user": React.lazy(() =>
        import(
            /* webpackChunkName: "FolderUserIcon" */
            "mdi-react/FolderUserIcon"
        ),
    ),
    "mdi-folder-shared": React.lazy(() =>
        import(
            /* webpackChunkName: "FolderSharedIcon" */
            "mdi-react/FolderSharedIcon"
        ),
    ),
    "mdi-folder-mydrive": React.lazy(() =>
        import(
            /* webpackChunkName: "FolderMydriveIcon" */
            "mdi-react/FolderMydriveIcon"
        ),
    ),
    "mdi-perm-media": React.lazy(() =>
        import(
            /* webpackChunkName: "PermMediaIcon" */
            "mdi-react/PermMediaIcon"
        ),
    ),
    "mdi-create-new-folder": React.lazy(() =>
        import(
            /* webpackChunkName: "CreateNewFolderIcon" */
            "mdi-react/CreateNewFolderIcon"
        ),
    ),
    "mdi-folder-special": React.lazy(() =>
        import(
            /* webpackChunkName: "FolderSpecialIcon" */
            "mdi-react/FolderSpecialIcon"
        ),
    ),
    "mdi-format-align-centre": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatAlignCentreIcon" */
            "mdi-react/FormatAlignCentreIcon"
        ),
    ),
    "mdi-format-colour-fill": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatColourFillIcon" */
            "mdi-react/FormatColourFillIcon"
        ),
    ),
    "mdi-format-colour-text": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatColourTextIcon" */
            "mdi-react/FormatColourTextIcon"
        ),
    ),
    "mdi-format-float-centre": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatFloatCentreIcon" */
            "mdi-react/FormatFloatCentreIcon"
        ),
    ),
    "mdi-format-horizontal-align-centre": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatHorizontalAlignCentreIcon" */
            "mdi-react/FormatHorizontalAlignCentreIcon"
        ),
    ),
    "mdi-format-list-numbered": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatListNumberedIcon" */
            "mdi-react/FormatListNumberedIcon"
        ),
    ),
    "mdi-rotate-90-degrees-ccw": React.lazy(() =>
        import(
            /* webpackChunkName: "Rotate90DegreesCcwIcon" */
            "mdi-react/Rotate90DegreesCcwIcon"
        ),
    ),
    "mdi-strikethrough-s": React.lazy(() =>
        import(
            /* webpackChunkName: "StrikethroughSIcon" */
            "mdi-react/StrikethroughSIcon"
        ),
    ),
    "mdi-format-underlined": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatUnderlinedIcon" */
            "mdi-react/FormatUnderlinedIcon"
        ),
    ),
    "mdi-format-vertical-align-centre": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatVerticalAlignCentreIcon" */
            "mdi-react/FormatVerticalAlignCentreIcon"
        ),
    ),
    "mdi-message-group": React.lazy(() =>
        import(
            /* webpackChunkName: "MessageGroupIcon" */
            "mdi-react/MessageGroupIcon"
        ),
    ),
    "mdi-question-answer": React.lazy(() =>
        import(
            /* webpackChunkName: "QuestionAnswerIcon" */
            "mdi-react/QuestionAnswerIcon"
        ),
    ),
    "mdi-refrigerator-filled-bottom": React.lazy(() =>
        import(
            /* webpackChunkName: "RefrigeratorFilledBottomIcon" */
            "mdi-react/RefrigeratorFilledBottomIcon"
        ),
    ),
    "mdi-refrigerator-filled-top": React.lazy(() =>
        import(
            /* webpackChunkName: "RefrigeratorFilledTopIcon" */
            "mdi-react/RefrigeratorFilledTopIcon"
        ),
    ),
    "mdi-refrigerator-filled": React.lazy(() =>
        import(
            /* webpackChunkName: "RefrigeratorFilledIcon" */
            "mdi-react/RefrigeratorFilledIcon"
        ),
    ),
    "mdi-kitchen": React.lazy(() =>
        import(
            /* webpackChunkName: "KitchenIcon" */
            "mdi-react/KitchenIcon"
        ),
    ),
    "mdi-refrigerator": React.lazy(() =>
        import(
            /* webpackChunkName: "RefrigeratorIcon" */
            "mdi-react/RefrigeratorIcon"
        ),
    ),
    "mdi-games": React.lazy(() =>
        import(
            /* webpackChunkName: "GamesIcon" */
            "mdi-react/GamesIcon"
        ),
    ),
    "mdi-garage-warning": React.lazy(() =>
        import(
            /* webpackChunkName: "GarageWarningIcon" */
            "mdi-react/GarageWarningIcon"
        ),
    ),
    "mdi-gas-pump": React.lazy(() =>
        import(
            /* webpackChunkName: "GasPumpIcon" */
            "mdi-react/GasPumpIcon"
        ),
    ),
    "mdi-petrol-pump": React.lazy(() =>
        import(
            /* webpackChunkName: "PetrolPumpIcon" */
            "mdi-react/PetrolPumpIcon"
        ),
    ),
    "mdi-petrol-station": React.lazy(() =>
        import(
            /* webpackChunkName: "PetrolStationIcon" */
            "mdi-react/PetrolStationIcon"
        ),
    ),
    "mdi-local-gas-station": React.lazy(() =>
        import(
            /* webpackChunkName: "LocalGasStationIcon" */
            "mdi-react/LocalGasStationIcon"
        ),
    ),
    "mdi-logic-gate-and": React.lazy(() =>
        import(
            /* webpackChunkName: "LogicGateAndIcon" */
            "mdi-react/LogicGateAndIcon"
        ),
    ),
    "mdi-logic-gate-nand": React.lazy(() =>
        import(
            /* webpackChunkName: "LogicGateNandIcon" */
            "mdi-react/LogicGateNandIcon"
        ),
    ),
    "mdi-logic-gate-nor": React.lazy(() =>
        import(
            /* webpackChunkName: "LogicGateNorIcon" */
            "mdi-react/LogicGateNorIcon"
        ),
    ),
    "mdi-logic-gate-not": React.lazy(() =>
        import(
            /* webpackChunkName: "LogicGateNotIcon" */
            "mdi-react/LogicGateNotIcon"
        ),
    ),
    "mdi-logic-gate-or": React.lazy(() =>
        import(
            /* webpackChunkName: "LogicGateOrIcon" */
            "mdi-react/LogicGateOrIcon"
        ),
    ),
    "mdi-logic-gate-xnor": React.lazy(() =>
        import(
            /* webpackChunkName: "LogicGateXnorIcon" */
            "mdi-react/LogicGateXnorIcon"
        ),
    ),
    "mdi-logic-gate-xor": React.lazy(() =>
        import(
            /* webpackChunkName: "LogicGateXorIcon" */
            "mdi-react/LogicGateXorIcon"
        ),
    ),
    "mdi-swap-driving-apps-wheel": React.lazy(() =>
        import(
            /* webpackChunkName: "SwapDrivingAppsWheelIcon" */
            "mdi-react/SwapDrivingAppsWheelIcon"
        ),
    ),
    "mdi-court-hammer": React.lazy(() =>
        import(
            /* webpackChunkName: "CourtHammerIcon" */
            "mdi-react/CourtHammerIcon"
        ),
    ),
    "mdi-interaction-double-tap": React.lazy(() =>
        import(
            /* webpackChunkName: "InteractionDoubleTapIcon" */
            "mdi-react/InteractionDoubleTapIcon"
        ),
    ),
    "mdi-hand-double-tap": React.lazy(() =>
        import(
            /* webpackChunkName: "HandDoubleTapIcon" */
            "mdi-react/HandDoubleTapIcon"
        ),
    ),
    "mdi-interaction-tap": React.lazy(() =>
        import(
            /* webpackChunkName: "InteractionTapIcon" */
            "mdi-react/InteractionTapIcon"
        ),
    ),
    "mdi-hand-tap": React.lazy(() =>
        import(
            /* webpackChunkName: "HandTapIcon" */
            "mdi-react/HandTapIcon"
        ),
    ),
    "mdi-donate": React.lazy(() =>
        import(
            /* webpackChunkName: "DonateIcon" */
            "mdi-react/DonateIcon"
        ),
    ),
    "mdi-present": React.lazy(() =>
        import(
            /* webpackChunkName: "PresentIcon" */
            "mdi-react/PresentIcon"
        ),
    ),
    "mdi-local-bar": React.lazy(() =>
        import(
            /* webpackChunkName: "LocalBarIcon" */
            "mdi-react/LocalBarIcon"
        ),
    ),
    "mdi-cocktail": React.lazy(() =>
        import(
            /* webpackChunkName: "CocktailIcon" */
            "mdi-react/CocktailIcon"
        ),
    ),
    "mdi-martini": React.lazy(() =>
        import(
            /* webpackChunkName: "MartiniIcon" */
            "mdi-react/MartiniIcon"
        ),
    ),
    "mdi-golf-course": React.lazy(() =>
        import(
            /* webpackChunkName: "GolfCourseIcon" */
            "mdi-react/GolfCourseIcon"
        ),
    ),
    "mdi-cable-car": React.lazy(() =>
        import(
            /* webpackChunkName: "CableCarIcon" */
            "mdi-react/CableCarIcon"
        ),
    ),
    "mdi-chromecast": React.lazy(() =>
        import(
            /* webpackChunkName: "ChromecastIcon" */
            "mdi-react/ChromecastIcon"
        ),
    ),
    "mdi-attach-drive": React.lazy(() =>
        import(
            /* webpackChunkName: "AttachDriveIcon" */
            "mdi-react/AttachDriveIcon"
        ),
    ),
    "mdi-g-translate": React.lazy(() =>
        import(
            /* webpackChunkName: "GTranslateIcon" */
            "mdi-react/GTranslateIcon"
        ),
    ),
    "mdi-wallet-product": React.lazy(() =>
        import(
            /* webpackChunkName: "WalletProductIcon" */
            "mdi-react/WalletProductIcon"
        ),
    ),
    "mdi-grid-on": React.lazy(() =>
        import(
            /* webpackChunkName: "GridOnIcon" */
            "mdi-react/GridOnIcon"
        ),
    ),
    "mdi-headset-mic": React.lazy(() =>
        import(
            /* webpackChunkName: "HeadsetMicIcon" */
            "mdi-react/HeadsetMicIcon"
        ),
    ),
    "mdi-favorite-border": React.lazy(() =>
        import(
            /* webpackChunkName: "FavoriteBorderIcon" */
            "mdi-react/FavoriteBorderIcon"
        ),
    ),
    "mdi-favourite-border": React.lazy(() =>
        import(
            /* webpackChunkName: "FavouriteBorderIcon" */
            "mdi-react/FavouriteBorderIcon"
        ),
    ),
    "mdi-favorite-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "FavoriteOutlineIcon" */
            "mdi-react/FavoriteOutlineIcon"
        ),
    ),
    "mdi-favourite-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "FavouriteOutlineIcon" */
            "mdi-react/FavouriteOutlineIcon"
        ),
    ),
    "mdi-favorite": React.lazy(() =>
        import(
            /* webpackChunkName: "FavoriteIcon" */
            "mdi-react/FavoriteIcon"
        ),
    ),
    "mdi-favourite": React.lazy(() =>
        import(
            /* webpackChunkName: "FavouriteIcon" */
            "mdi-react/FavouriteIcon"
        ),
    ),
    "mdi-help-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "HelpOutlineIcon" */
            "mdi-react/HelpOutlineIcon"
        ),
    ),
    "mdi-question-mark-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "QuestionMarkCircleIcon" */
            "mdi-react/QuestionMarkCircleIcon"
        ),
    ),
    "mdi-question-mark": React.lazy(() =>
        import(
            /* webpackChunkName: "QuestionMarkIcon" */
            "mdi-react/QuestionMarkIcon"
        ),
    ),
    "mdi-hd-box": React.lazy(() =>
        import(
            /* webpackChunkName: "HdBoxIcon" */
            "mdi-react/HdBoxIcon"
        ),
    ),
    "mdi-hd": React.lazy(() =>
        import(
            /* webpackChunkName: "HdIcon" */
            "mdi-react/HdIcon"
        ),
    ),
    "mdi-autobahn": React.lazy(() =>
        import(
            /* webpackChunkName: "AutobahnIcon" */
            "mdi-react/AutobahnIcon"
        ),
    ),
    "mdi-motorway": React.lazy(() =>
        import(
            /* webpackChunkName: "MotorwayIcon" */
            "mdi-react/MotorwayIcon"
        ),
    ),
    "mdi-recent": React.lazy(() =>
        import(
            /* webpackChunkName: "RecentIcon" */
            "mdi-react/RecentIcon"
        ),
    ),
    "mdi-latest": React.lazy(() =>
        import(
            /* webpackChunkName: "LatestIcon" */
            "mdi-react/LatestIcon"
        ),
    ),
    "mdi-clock-arrow": React.lazy(() =>
        import(
            /* webpackChunkName: "ClockArrowIcon" */
            "mdi-react/ClockArrowIcon"
        ),
    ),
    "mdi-counterclockwise": React.lazy(() =>
        import(
            /* webpackChunkName: "CounterclockwiseIcon" */
            "mdi-react/CounterclockwiseIcon"
        ),
    ),
    "mdi-home-user": React.lazy(() =>
        import(
            /* webpackChunkName: "HomeUserIcon" */
            "mdi-react/HomeUserIcon"
        ),
    ),
    "mdi-home-warning": React.lazy(() =>
        import(
            /* webpackChunkName: "HomeWarningIcon" */
            "mdi-react/HomeWarningIcon"
        ),
    ),
    "mdi-house-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "HouseCircleIcon" */
            "mdi-react/HouseCircleIcon"
        ),
    ),
    "mdi-family": React.lazy(() =>
        import(
            /* webpackChunkName: "FamilyIcon" */
            "mdi-react/FamilyIcon"
        ),
    ),
    "mdi-house-map-marker": React.lazy(() =>
        import(
            /* webpackChunkName: "HouseMapMarkerIcon" */
            "mdi-react/HouseMapMarkerIcon"
        ),
    ),
    "mdi-house-modern": React.lazy(() =>
        import(
            /* webpackChunkName: "HouseModernIcon" */
            "mdi-react/HouseModernIcon"
        ),
    ),
    "mdi-house-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "HouseOutlineIcon" */
            "mdi-react/HouseOutlineIcon"
        ),
    ),
    "mdi-house-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "HouseVariantIcon" */
            "mdi-react/HouseVariantIcon"
        ),
    ),
    "mdi-house": React.lazy(() =>
        import(
            /* webpackChunkName: "HouseIcon" */
            "mdi-react/HouseIcon"
        ),
    ),
    "mdi-local-hospital": React.lazy(() =>
        import(
            /* webpackChunkName: "LocalHospitalIcon" */
            "mdi-react/LocalHospitalIcon"
        ),
    ),
    "mdi-bed": React.lazy(() =>
        import(
            /* webpackChunkName: "BedIcon" */
            "mdi-react/BedIcon"
        ),
    ),
    "mdi-local-hotel": React.lazy(() =>
        import(
            /* webpackChunkName: "LocalHotelIcon" */
            "mdi-react/LocalHotelIcon"
        ),
    ),
    "mdi-woman": React.lazy(() =>
        import(
            /* webpackChunkName: "WomanIcon" */
            "mdi-react/WomanIcon"
        ),
    ),
    "mdi-wc": React.lazy(() =>
        import(
            /* webpackChunkName: "WcIcon" */
            "mdi-react/WcIcon"
        ),
    ),
    "mdi-man-woman": React.lazy(() =>
        import(
            /* webpackChunkName: "ManWomanIcon" */
            "mdi-react/ManWomanIcon"
        ),
    ),
    "mdi-man": React.lazy(() =>
        import(
            /* webpackChunkName: "ManIcon" */
            "mdi-react/ManIcon"
        ),
    ),
    "mdi-pregnant-woman": React.lazy(() =>
        import(
            /* webpackChunkName: "PregnantWomanIcon" */
            "mdi-react/PregnantWomanIcon"
        ),
    ),
    "mdi-accessibility": React.lazy(() =>
        import(
            /* webpackChunkName: "AccessibilityIcon" */
            "mdi-react/AccessibilityIcon"
        ),
    ),
    "mdi-photo-album": React.lazy(() =>
        import(
            /* webpackChunkName: "PhotoAlbumIcon" */
            "mdi-react/PhotoAlbumIcon"
        ),
    ),
    "mdi-broken-image": React.lazy(() =>
        import(
            /* webpackChunkName: "BrokenImageIcon" */
            "mdi-react/BrokenImageIcon"
        ),
    ),
    "mdi-filter-b-and-w": React.lazy(() =>
        import(
            /* webpackChunkName: "FilterBAndWIcon" */
            "mdi-react/FilterBAndWIcon"
        ),
    ),
    "mdi-image-filter-centre-focus-weak": React.lazy(() =>
        import(
            /* webpackChunkName: "ImageFilterCentreFocusWeakIcon" */
            "mdi-react/ImageFilterCentreFocusWeakIcon"
        ),
    ),
    "mdi-image-filter-centre-focus": React.lazy(() =>
        import(
            /* webpackChunkName: "ImageFilterCentreFocusIcon" */
            "mdi-react/ImageFilterCentreFocusIcon"
        ),
    ),
    "mdi-mountain": React.lazy(() =>
        import(
            /* webpackChunkName: "MountainIcon" */
            "mdi-react/MountainIcon"
        ),
    ),
    "mdi-landscape": React.lazy(() =>
        import(
            /* webpackChunkName: "LandscapeIcon" */
            "mdi-react/LandscapeIcon"
        ),
    ),
    "mdi-image-multiple-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "ImageMultipleOutlineIcon" */
            "mdi-react/ImageMultipleOutlineIcon"
        ),
    ),
    "mdi-collections": React.lazy(() =>
        import(
            /* webpackChunkName: "CollectionsIcon" */
            "mdi-react/CollectionsIcon"
        ),
    ),
    "mdi-photo-library": React.lazy(() =>
        import(
            /* webpackChunkName: "PhotoLibraryIcon" */
            "mdi-react/PhotoLibraryIcon"
        ),
    ),
    "mdi-insert-photo": React.lazy(() =>
        import(
            /* webpackChunkName: "InsertPhotoIcon" */
            "mdi-react/InsertPhotoIcon"
        ),
    ),
    "mdi-move-to-inbox": React.lazy(() =>
        import(
            /* webpackChunkName: "MoveToInboxIcon" */
            "mdi-react/MoveToInboxIcon"
        ),
    ),
    "mdi-info-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "InfoOutlineIcon" */
            "mdi-react/InfoOutlineIcon"
        ),
    ),
    "mdi-about-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "AboutOutlineIcon" */
            "mdi-react/AboutOutlineIcon"
        ),
    ),
    "mdi-about": React.lazy(() =>
        import(
            /* webpackChunkName: "AboutIcon" */
            "mdi-react/AboutIcon"
        ),
    ),
    "mdi-invert-colours": React.lazy(() =>
        import(
            /* webpackChunkName: "InvertColoursIcon" */
            "mdi-react/InvertColoursIcon"
        ),
    ),
    "mdi-jewish": React.lazy(() =>
        import(
            /* webpackChunkName: "JewishIcon" */
            "mdi-react/JewishIcon"
        ),
    ),
    "mdi-martial-arts": React.lazy(() =>
        import(
            /* webpackChunkName: "MartialArtsIcon" */
            "mdi-react/MartialArtsIcon"
        ),
    ),
    "mdi-vpn-key": React.lazy(() =>
        import(
            /* webpackChunkName: "VpnKeyIcon" */
            "mdi-react/VpnKeyIcon"
        ),
    ),
    "mdi-keyboard-capslock": React.lazy(() =>
        import(
            /* webpackChunkName: "KeyboardCapslockIcon" */
            "mdi-react/KeyboardCapslockIcon"
        ),
    ),
    "mdi-keyboard-hide": React.lazy(() =>
        import(
            /* webpackChunkName: "KeyboardHideIcon" */
            "mdi-react/KeyboardHideIcon"
        ),
    ),
    "mdi-bugfood": React.lazy(() =>
        import(
            /* webpackChunkName: "BugfoodIcon" */
            "mdi-react/BugfoodIcon"
        ),
    ),
    "mdi-ladybird": React.lazy(() =>
        import(
            /* webpackChunkName: "LadybirdIcon" */
            "mdi-react/LadybirdIcon"
        ),
    ),
    "mdi-computer": React.lazy(() =>
        import(
            /* webpackChunkName: "ComputerIcon" */
            "mdi-react/ComputerIcon"
        ),
    ),
    "mdi-layers-clear": React.lazy(() =>
        import(
            /* webpackChunkName: "LayersClearIcon" */
            "mdi-react/LayersClearIcon"
        ),
    ),
    "mdi-add-to-photos": React.lazy(() =>
        import(
            /* webpackChunkName: "AddToPhotosIcon" */
            "mdi-react/AddToPhotosIcon"
        ),
    ),
    "mdi-library-add": React.lazy(() =>
        import(
            /* webpackChunkName: "LibraryAddIcon" */
            "mdi-react/LibraryAddIcon"
        ),
    ),
    "mdi-queue": React.lazy(() =>
        import(
            /* webpackChunkName: "QueueIcon" */
            "mdi-react/QueueIcon"
        ),
    ),
    "mdi-local-library": React.lazy(() =>
        import(
            /* webpackChunkName: "LocalLibraryIcon" */
            "mdi-react/LocalLibraryIcon"
        ),
    ),
    "mdi-life-preserver": React.lazy(() =>
        import(
            /* webpackChunkName: "LifePreserverIcon" */
            "mdi-react/LifePreserverIcon"
        ),
    ),
    "mdi-support": React.lazy(() =>
        import(
            /* webpackChunkName: "SupportIcon" */
            "mdi-react/SupportIcon"
        ),
    ),
    "mdi-insert-link": React.lazy(() =>
        import(
            /* webpackChunkName: "InsertLinkIcon" */
            "mdi-react/InsertLinkIcon"
        ),
    ),
    "mdi-tux": React.lazy(() =>
        import(
            /* webpackChunkName: "TuxIcon" */
            "mdi-react/TuxIcon"
        ),
    ),
    "mdi-lock-warning": React.lazy(() =>
        import(
            /* webpackChunkName: "LockWarningIcon" */
            "mdi-react/LockWarningIcon"
        ),
    ),
    "mdi-enhanced-encryption": React.lazy(() =>
        import(
            /* webpackChunkName: "EnhancedEncryptionIcon" */
            "mdi-react/EnhancedEncryptionIcon"
        ),
    ),
    "mdi-forgot-password": React.lazy(() =>
        import(
            /* webpackChunkName: "ForgotPasswordIcon" */
            "mdi-react/ForgotPasswordIcon"
        ),
    ),
    "mdi-password-reset": React.lazy(() =>
        import(
            /* webpackChunkName: "PasswordResetIcon" */
            "mdi-react/PasswordResetIcon"
        ),
    ),
    "mdi-https": React.lazy(() =>
        import(
            /* webpackChunkName: "HttpsIcon" */
            "mdi-react/HttpsIcon"
        ),
    ),
    "mdi-rainbow": React.lazy(() =>
        import(
            /* webpackChunkName: "RainbowIcon" */
            "mdi-react/RainbowIcon"
        ),
    ),
    "mdi-zoom-out-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "ZoomOutOutlineIcon" */
            "mdi-react/ZoomOutOutlineIcon"
        ),
    ),
    "mdi-zoom-out": React.lazy(() =>
        import(
            /* webpackChunkName: "ZoomOutIcon" */
            "mdi-react/ZoomOutIcon"
        ),
    ),
    "mdi-zoom-in-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "ZoomInOutlineIcon" */
            "mdi-react/ZoomInOutlineIcon"
        ),
    ),
    "mdi-zoom-in": React.lazy(() =>
        import(
            /* webpackChunkName: "ZoomInIcon" */
            "mdi-react/ZoomInIcon"
        ),
    ),
    "mdi-search": React.lazy(() =>
        import(
            /* webpackChunkName: "SearchIcon" */
            "mdi-react/SearchIcon"
        ),
    ),
    "mdi-markunread-mailbox": React.lazy(() =>
        import(
            /* webpackChunkName: "MarkunreadMailboxIcon" */
            "mdi-react/MarkunreadMailboxIcon"
        ),
    ),
    "mdi-explore-nearby": React.lazy(() =>
        import(
            /* webpackChunkName: "ExploreNearbyIcon" */
            "mdi-react/ExploreNearbyIcon"
        ),
    ),
    "mdi-location-off": React.lazy(() =>
        import(
            /* webpackChunkName: "LocationOffIcon" */
            "mdi-react/LocationOffIcon"
        ),
    ),
    "mdi-add-location": React.lazy(() =>
        import(
            /* webpackChunkName: "AddLocationIcon" */
            "mdi-react/AddLocationIcon"
        ),
    ),
    "mdi-location": React.lazy(() =>
        import(
            /* webpackChunkName: "LocationIcon" */
            "mdi-react/LocationIcon"
        ),
    ),
    "mdi-address-marker": React.lazy(() =>
        import(
            /* webpackChunkName: "AddressMarkerIcon" */
            "mdi-react/AddressMarkerIcon"
        ),
    ),
    "mdi-location-on": React.lazy(() =>
        import(
            /* webpackChunkName: "LocationOnIcon" */
            "mdi-react/LocationOnIcon"
        ),
    ),
    "mdi-place": React.lazy(() =>
        import(
            /* webpackChunkName: "PlaceIcon" */
            "mdi-react/PlaceIcon"
        ),
    ),
    "mdi-room": React.lazy(() =>
        import(
            /* webpackChunkName: "RoomIcon" */
            "mdi-react/RoomIcon"
        ),
    ),
    "mdi-beenhere": React.lazy(() =>
        import(
            /* webpackChunkName: "BeenhereIcon" */
            "mdi-react/BeenhereIcon"
        ),
    ),
    "mdi-highlighter": React.lazy(() =>
        import(
            /* webpackChunkName: "HighlighterIcon" */
            "mdi-react/HighlighterIcon"
        ),
    ),
    "mdi-first-aid-kit": React.lazy(() =>
        import(
            /* webpackChunkName: "FirstAidKitIcon" */
            "mdi-react/FirstAidKitIcon"
        ),
    ),
    "mdi-arrow-drop-down": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowDropDownIcon" */
            "mdi-react/ArrowDropDownIcon"
        ),
    ),
    "mdi-arrow-drop-up": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowDropUpIcon" */
            "mdi-react/ArrowDropUpIcon"
        ),
    ),
    "mdi-hamburger-menu": React.lazy(() =>
        import(
            /* webpackChunkName: "HamburgerMenuIcon" */
            "mdi-react/HamburgerMenuIcon"
        ),
    ),
    "mdi-feedback": React.lazy(() =>
        import(
            /* webpackChunkName: "FeedbackIcon" */
            "mdi-react/FeedbackIcon"
        ),
    ),
    "mdi-message-warning": React.lazy(() =>
        import(
            /* webpackChunkName: "MessageWarningIcon" */
            "mdi-react/MessageWarningIcon"
        ),
    ),
    "mdi-sms-failed": React.lazy(() =>
        import(
            /* webpackChunkName: "SmsFailedIcon" */
            "mdi-react/SmsFailedIcon"
        ),
    ),
    "mdi-speaker-notes-off": React.lazy(() =>
        import(
            /* webpackChunkName: "SpeakerNotesOffIcon" */
            "mdi-react/SpeakerNotesOffIcon"
        ),
    ),
    "mdi-speaker-notes": React.lazy(() =>
        import(
            /* webpackChunkName: "SpeakerNotesIcon" */
            "mdi-react/SpeakerNotesIcon"
        ),
    ),
    "mdi-rate-review": React.lazy(() =>
        import(
            /* webpackChunkName: "RateReviewIcon" */
            "mdi-react/RateReviewIcon"
        ),
    ),
    "mdi-mms": React.lazy(() =>
        import(
            /* webpackChunkName: "MmsIcon" */
            "mdi-react/MmsIcon"
        ),
    ),
    "mdi-chat-bubble-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "ChatBubbleOutlineIcon" */
            "mdi-react/ChatBubbleOutlineIcon"
        ),
    ),
    "mdi-sms": React.lazy(() =>
        import(
            /* webpackChunkName: "SmsIcon" */
            "mdi-react/SmsIcon"
        ),
    ),
    "mdi-textsms": React.lazy(() =>
        import(
            /* webpackChunkName: "TextsmsIcon" */
            "mdi-react/TextsmsIcon"
        ),
    ),
    "mdi-insert-comment": React.lazy(() =>
        import(
            /* webpackChunkName: "InsertCommentIcon" */
            "mdi-react/InsertCommentIcon"
        ),
    ),
    "mdi-mode-comment": React.lazy(() =>
        import(
            /* webpackChunkName: "ModeCommentIcon" */
            "mdi-react/ModeCommentIcon"
        ),
    ),
    "mdi-chat": React.lazy(() =>
        import(
            /* webpackChunkName: "ChatIcon" */
            "mdi-react/ChatIcon"
        ),
    ),
    "mdi-voice-chat": React.lazy(() =>
        import(
            /* webpackChunkName: "VoiceChatIcon" */
            "mdi-react/VoiceChatIcon"
        ),
    ),
    "mdi-chat-bubble": React.lazy(() =>
        import(
            /* webpackChunkName: "ChatBubbleIcon" */
            "mdi-react/ChatBubbleIcon"
        ),
    ),
    "mdi-mic-off": React.lazy(() =>
        import(
            /* webpackChunkName: "MicOffIcon" */
            "mdi-react/MicOffIcon"
        ),
    ),
    "mdi-mic-none": React.lazy(() =>
        import(
            /* webpackChunkName: "MicNoneIcon" */
            "mdi-react/MicNoneIcon"
        ),
    ),
    "mdi-settings-voice": React.lazy(() =>
        import(
            /* webpackChunkName: "SettingsVoiceIcon" */
            "mdi-react/SettingsVoiceIcon"
        ),
    ),
    "mdi-keyboard-voice": React.lazy(() =>
        import(
            /* webpackChunkName: "KeyboardVoiceIcon" */
            "mdi-react/KeyboardVoiceIcon"
        ),
    ),
    "mdi-checkbox-indeterminate-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "CheckboxIndeterminateOutlineIcon" */
            "mdi-react/CheckboxIndeterminateOutlineIcon"
        ),
    ),
    "mdi-indeterminate-check-box": React.lazy(() =>
        import(
            /* webpackChunkName: "IndeterminateCheckBoxIcon" */
            "mdi-react/IndeterminateCheckBoxIcon"
        ),
    ),
    "mdi-remove-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "RemoveCircleOutlineIcon" */
            "mdi-react/RemoveCircleOutlineIcon"
        ),
    ),
    "mdi-do-not-disturb-on": React.lazy(() =>
        import(
            /* webpackChunkName: "DoNotDisturbOnIcon" */
            "mdi-react/DoNotDisturbOnIcon"
        ),
    ),
    "mdi-remove": React.lazy(() =>
        import(
            /* webpackChunkName: "RemoveIcon" */
            "mdi-react/RemoveIcon"
        ),
    ),
    "mdi-important-devices": React.lazy(() =>
        import(
            /* webpackChunkName: "ImportantDevicesIcon" */
            "mdi-react/ImportantDevicesIcon"
        ),
    ),
    "mdi-desktop-windows": React.lazy(() =>
        import(
            /* webpackChunkName: "DesktopWindowsIcon" */
            "mdi-react/DesktopWindowsIcon"
        ),
    ),
    "mdi-motorcycle": React.lazy(() =>
        import(
            /* webpackChunkName: "MotorcycleIcon" */
            "mdi-react/MotorcycleIcon"
        ),
    ),
    "mdi-film-reel": React.lazy(() =>
        import(
            /* webpackChunkName: "FilmReelIcon" */
            "mdi-react/FilmReelIcon"
        ),
    ),
    "mdi-slate": React.lazy(() =>
        import(
            /* webpackChunkName: "SlateIcon" */
            "mdi-react/SlateIcon"
        ),
    ),
    "mdi-clapperboard": React.lazy(() =>
        import(
            /* webpackChunkName: "ClapperboardIcon" */
            "mdi-react/ClapperboardIcon"
        ),
    ),
    "mdi-movie-creation": React.lazy(() =>
        import(
            /* webpackChunkName: "MovieCreationIcon" */
            "mdi-react/MovieCreationIcon"
        ),
    ),
    "mdi-network-attached-storage": React.lazy(() =>
        import(
            /* webpackChunkName: "NetworkAttachedStorageIcon" */
            "mdi-react/NetworkAttachedStorageIcon"
        ),
    ),
    "mdi-arrow-compass": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowCompassIcon" */
            "mdi-react/ArrowCompassIcon"
        ),
    ),
    "mdi-syringe": React.lazy(() =>
        import(
            /* webpackChunkName: "SyringeIcon" */
            "mdi-react/SyringeIcon"
        ),
    ),
    "mdi-network-strength-1-warning": React.lazy(() =>
        import(
            /* webpackChunkName: "NetworkStrength1WarningIcon" */
            "mdi-react/NetworkStrength1WarningIcon"
        ),
    ),
    "mdi-network-strength-2-warning": React.lazy(() =>
        import(
            /* webpackChunkName: "NetworkStrength2WarningIcon" */
            "mdi-react/NetworkStrength2WarningIcon"
        ),
    ),
    "mdi-network-strength-3-warning": React.lazy(() =>
        import(
            /* webpackChunkName: "NetworkStrength3WarningIcon" */
            "mdi-react/NetworkStrength3WarningIcon"
        ),
    ),
    "mdi-network-strength-4-warning": React.lazy(() =>
        import(
            /* webpackChunkName: "NetworkStrength4WarningIcon" */
            "mdi-react/NetworkStrength4WarningIcon"
        ),
    ),
    "mdi-network-strength-0": React.lazy(() =>
        import(
            /* webpackChunkName: "NetworkStrength0Icon" */
            "mdi-react/NetworkStrength0Icon"
        ),
    ),
    "mdi-fiber-new": React.lazy(() =>
        import(
            /* webpackChunkName: "FiberNewIcon" */
            "mdi-react/FiberNewIcon"
        ),
    ),
    "mdi-filter-1": React.lazy(() =>
        import(
            /* webpackChunkName: "Filter1Icon" */
            "mdi-react/Filter1Icon"
        ),
    ),
    "mdi-looks-one": React.lazy(() =>
        import(
            /* webpackChunkName: "LooksOneIcon" */
            "mdi-react/LooksOneIcon"
        ),
    ),
    "mdi-filter-2": React.lazy(() =>
        import(
            /* webpackChunkName: "Filter2Icon" */
            "mdi-react/Filter2Icon"
        ),
    ),
    "mdi-looks-two": React.lazy(() =>
        import(
            /* webpackChunkName: "LooksTwoIcon" */
            "mdi-react/LooksTwoIcon"
        ),
    ),
    "mdi-filter-3": React.lazy(() =>
        import(
            /* webpackChunkName: "Filter3Icon" */
            "mdi-react/Filter3Icon"
        ),
    ),
    "mdi-looks-3": React.lazy(() =>
        import(
            /* webpackChunkName: "Looks3Icon" */
            "mdi-react/Looks3Icon"
        ),
    ),
    "mdi-filter-4": React.lazy(() =>
        import(
            /* webpackChunkName: "Filter4Icon" */
            "mdi-react/Filter4Icon"
        ),
    ),
    "mdi-looks-4": React.lazy(() =>
        import(
            /* webpackChunkName: "Looks4Icon" */
            "mdi-react/Looks4Icon"
        ),
    ),
    "mdi-filter-5": React.lazy(() =>
        import(
            /* webpackChunkName: "Filter5Icon" */
            "mdi-react/Filter5Icon"
        ),
    ),
    "mdi-looks-5": React.lazy(() =>
        import(
            /* webpackChunkName: "Looks5Icon" */
            "mdi-react/Looks5Icon"
        ),
    ),
    "mdi-filter-6": React.lazy(() =>
        import(
            /* webpackChunkName: "Filter6Icon" */
            "mdi-react/Filter6Icon"
        ),
    ),
    "mdi-looks-6": React.lazy(() =>
        import(
            /* webpackChunkName: "Looks6Icon" */
            "mdi-react/Looks6Icon"
        ),
    ),
    "mdi-filter-7": React.lazy(() =>
        import(
            /* webpackChunkName: "Filter7Icon" */
            "mdi-react/Filter7Icon"
        ),
    ),
    "mdi-filter-8": React.lazy(() =>
        import(
            /* webpackChunkName: "Filter8Icon" */
            "mdi-react/Filter8Icon"
        ),
    ),
    "mdi-filter-9": React.lazy(() =>
        import(
            /* webpackChunkName: "Filter9Icon" */
            "mdi-react/Filter9Icon"
        ),
    ),
    "mdi-filter-9-plus": React.lazy(() =>
        import(
            /* webpackChunkName: "Filter9PlusIcon" */
            "mdi-react/Filter9PlusIcon"
        ),
    ),
    "mdi-ok-ru": React.lazy(() =>
        import(
            /* webpackChunkName: "OkRuIcon" */
            "mdi-react/OkRuIcon"
        ),
    ),
    "mdi-open-in-browser": React.lazy(() =>
        import(
            /* webpackChunkName: "OpenInBrowserIcon" */
            "mdi-react/OpenInBrowserIcon"
        ),
    ),
    "mdi-external-link": React.lazy(() =>
        import(
            /* webpackChunkName: "ExternalLinkIcon" */
            "mdi-react/ExternalLinkIcon"
        ),
    ),
    "mdi-unarchive": React.lazy(() =>
        import(
            /* webpackChunkName: "UnarchiveIcon" */
            "mdi-react/UnarchiveIcon"
        ),
    ),
    "mdi-first-page": React.lazy(() =>
        import(
            /* webpackChunkName: "FirstPageIcon" */
            "mdi-react/FirstPageIcon"
        ),
    ),
    "mdi-last-page": React.lazy(() =>
        import(
            /* webpackChunkName: "LastPageIcon" */
            "mdi-react/LastPageIcon"
        ),
    ),
    "mdi-style": React.lazy(() =>
        import(
            /* webpackChunkName: "StyleIcon" */
            "mdi-react/StyleIcon"
        ),
    ),
    "mdi-color-lens": React.lazy(() =>
        import(
            /* webpackChunkName: "ColorLensIcon" */
            "mdi-react/ColorLensIcon"
        ),
    ),
    "mdi-colour-lens": React.lazy(() =>
        import(
            /* webpackChunkName: "ColourLensIcon" */
            "mdi-react/ColourLensIcon"
        ),
    ),
    "mdi-attachment-vertical": React.lazy(() =>
        import(
            /* webpackChunkName: "AttachmentVerticalIcon" */
            "mdi-react/AttachmentVerticalIcon"
        ),
    ),
    "mdi-attach-file": React.lazy(() =>
        import(
            /* webpackChunkName: "AttachFileIcon" */
            "mdi-react/AttachFileIcon"
        ),
    ),
    "mdi-car-park": React.lazy(() =>
        import(
            /* webpackChunkName: "CarParkIcon" */
            "mdi-react/CarParkIcon"
        ),
    ),
    "mdi-local-parking": React.lazy(() =>
        import(
            /* webpackChunkName: "LocalParkingIcon" */
            "mdi-react/LocalParkingIcon"
        ),
    ),
    "mdi-pause-circle-filled": React.lazy(() =>
        import(
            /* webpackChunkName: "PauseCircleFilledIcon" */
            "mdi-react/PauseCircleFilledIcon"
        ),
    ),
    "mdi-pets": React.lazy(() =>
        import(
            /* webpackChunkName: "PetsIcon" */
            "mdi-react/PetsIcon"
        ),
    ),
    "mdi-edit": React.lazy(() =>
        import(
            /* webpackChunkName: "EditIcon" */
            "mdi-react/EditIcon"
        ),
    ),
    "mdi-create": React.lazy(() =>
        import(
            /* webpackChunkName: "CreateIcon" */
            "mdi-react/CreateIcon"
        ),
    ),
    "mdi-mode-edit": React.lazy(() =>
        import(
            /* webpackChunkName: "ModeEditIcon" */
            "mdi-react/ModeEditIcon"
        ),
    ),
    "mdi-chemist": React.lazy(() =>
        import(
            /* webpackChunkName: "ChemistIcon" */
            "mdi-react/ChemistIcon"
        ),
    ),
    "mdi-local-pharmacy": React.lazy(() =>
        import(
            /* webpackChunkName: "LocalPharmacyIcon" */
            "mdi-react/LocalPharmacyIcon"
        ),
    ),
    "mdi-phone-bluetooth-speaker": React.lazy(() =>
        import(
            /* webpackChunkName: "PhoneBluetoothSpeakerIcon" */
            "mdi-react/PhoneBluetoothSpeakerIcon"
        ),
    ),
    "mdi-telephone-bluetooth": React.lazy(() =>
        import(
            /* webpackChunkName: "TelephoneBluetoothIcon" */
            "mdi-react/TelephoneBluetoothIcon"
        ),
    ),
    "mdi-phone-forwarded": React.lazy(() =>
        import(
            /* webpackChunkName: "PhoneForwardedIcon" */
            "mdi-react/PhoneForwardedIcon"
        ),
    ),
    "mdi-telephone-forward": React.lazy(() =>
        import(
            /* webpackChunkName: "TelephoneForwardIcon" */
            "mdi-react/TelephoneForwardIcon"
        ),
    ),
    "mdi-call-end": React.lazy(() =>
        import(
            /* webpackChunkName: "CallEndIcon" */
            "mdi-react/CallEndIcon"
        ),
    ),
    "mdi-telephone-hangup": React.lazy(() =>
        import(
            /* webpackChunkName: "TelephoneHangupIcon" */
            "mdi-react/TelephoneHangupIcon"
        ),
    ),
    "mdi-telephone-in-talk": React.lazy(() =>
        import(
            /* webpackChunkName: "TelephoneInTalkIcon" */
            "mdi-react/TelephoneInTalkIcon"
        ),
    ),
    "mdi-telephone-incoming": React.lazy(() =>
        import(
            /* webpackChunkName: "TelephoneIncomingIcon" */
            "mdi-react/TelephoneIncomingIcon"
        ),
    ),
    "mdi-telephone-locked": React.lazy(() =>
        import(
            /* webpackChunkName: "TelephoneLockedIcon" */
            "mdi-react/TelephoneLockedIcon"
        ),
    ),
    "mdi-add-call": React.lazy(() =>
        import(
            /* webpackChunkName: "AddCallIcon" */
            "mdi-react/AddCallIcon"
        ),
    ),
    "mdi-settings-phone": React.lazy(() =>
        import(
            /* webpackChunkName: "SettingsPhoneIcon" */
            "mdi-react/SettingsPhoneIcon"
        ),
    ),
    "mdi-call": React.lazy(() =>
        import(
            /* webpackChunkName: "CallIcon" */
            "mdi-react/CallIcon"
        ),
    ),
    "mdi-local-phone": React.lazy(() =>
        import(
            /* webpackChunkName: "LocalPhoneIcon" */
            "mdi-react/LocalPhoneIcon"
        ),
    ),
    "mdi-telephone": React.lazy(() =>
        import(
            /* webpackChunkName: "TelephoneIcon" */
            "mdi-react/TelephoneIcon"
        ),
    ),
    "mdi-medicine": React.lazy(() =>
        import(
            /* webpackChunkName: "MedicineIcon" */
            "mdi-react/MedicineIcon"
        ),
    ),
    "mdi-capsule": React.lazy(() =>
        import(
            /* webpackChunkName: "CapsuleIcon" */
            "mdi-react/CapsuleIcon"
        ),
    ),
    "mdi-historic": React.lazy(() =>
        import(
            /* webpackChunkName: "HistoricIcon" */
            "mdi-react/HistoricIcon"
        ),
    ),
    "mdi-column": React.lazy(() =>
        import(
            /* webpackChunkName: "ColumnIcon" */
            "mdi-react/ColumnIcon"
        ),
    ),
    "mdi-keep-off-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "KeepOffOutlineIcon" */
            "mdi-react/KeepOffOutlineIcon"
        ),
    ),
    "mdi-keep-off": React.lazy(() =>
        import(
            /* webpackChunkName: "KeepOffIcon" */
            "mdi-react/KeepOffIcon"
        ),
    ),
    "mdi-keep-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "KeepOutlineIcon" */
            "mdi-react/KeepOutlineIcon"
        ),
    ),
    "mdi-keep": React.lazy(() =>
        import(
            /* webpackChunkName: "KeepIcon" */
            "mdi-react/KeepIcon"
        ),
    ),
    "mdi-gun": React.lazy(() =>
        import(
            /* webpackChunkName: "GunIcon" */
            "mdi-react/GunIcon"
        ),
    ),
    "mdi-pizzeria": React.lazy(() =>
        import(
            /* webpackChunkName: "PizzeriaIcon" */
            "mdi-react/PizzeriaIcon"
        ),
    ),
    "mdi-local-pizza": React.lazy(() =>
        import(
            /* webpackChunkName: "LocalPizzaIcon" */
            "mdi-react/LocalPizzaIcon"
        ),
    ),
    "mdi-aeroplane-shield": React.lazy(() =>
        import(
            /* webpackChunkName: "AeroplaneShieldIcon" */
            "mdi-react/AeroplaneShieldIcon"
        ),
    ),
    "mdi-airplane-shield": React.lazy(() =>
        import(
            /* webpackChunkName: "AirplaneShieldIcon" */
            "mdi-react/AirplaneShieldIcon"
        ),
    ),
    "mdi-slideshow": React.lazy(() =>
        import(
            /* webpackChunkName: "SlideshowIcon" */
            "mdi-react/SlideshowIcon"
        ),
    ),
    "mdi-play-circle-filled": React.lazy(() =>
        import(
            /* webpackChunkName: "PlayCircleFilledIcon" */
            "mdi-react/PlayCircleFilledIcon"
        ),
    ),
    "mdi-media-network": React.lazy(() =>
        import(
            /* webpackChunkName: "MediaNetworkIcon" */
            "mdi-react/MediaNetworkIcon"
        ),
    ),
    "mdi-play-arrow": React.lazy(() =>
        import(
            /* webpackChunkName: "PlayArrowIcon" */
            "mdi-react/PlayArrowIcon"
        ),
    ),
    "mdi-subscriptions": React.lazy(() =>
        import(
            /* webpackChunkName: "SubscriptionsIcon" */
            "mdi-react/SubscriptionsIcon"
        ),
    ),
    "mdi-playlist-add-check": React.lazy(() =>
        import(
            /* webpackChunkName: "PlaylistAddCheckIcon" */
            "mdi-react/PlaylistAddCheckIcon"
        ),
    ),
    "mdi-playlist-add": React.lazy(() =>
        import(
            /* webpackChunkName: "PlaylistAddIcon" */
            "mdi-react/PlaylistAddIcon"
        ),
    ),
    "mdi-add-box": React.lazy(() =>
        import(
            /* webpackChunkName: "AddBoxIcon" */
            "mdi-react/AddBoxIcon"
        ),
    ),
    "mdi-control-point-duplicate": React.lazy(() =>
        import(
            /* webpackChunkName: "ControlPointDuplicateIcon" */
            "mdi-react/ControlPointDuplicateIcon"
        ),
    ),
    "mdi-add-circle-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "AddCircleOutlineIcon" */
            "mdi-react/AddCircleOutlineIcon"
        ),
    ),
    "mdi-control-point": React.lazy(() =>
        import(
            /* webpackChunkName: "ControlPointIcon" */
            "mdi-react/ControlPointIcon"
        ),
    ),
    "mdi-add-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "AddCircleIcon" */
            "mdi-react/AddCircleIcon"
        ),
    ),
    "mdi-add": React.lazy(() =>
        import(
            /* webpackChunkName: "AddIcon" */
            "mdi-react/AddIcon"
        ),
    ),
    "mdi-assessment": React.lazy(() =>
        import(
            /* webpackChunkName: "AssessmentIcon" */
            "mdi-react/AssessmentIcon"
        ),
    ),
    "mdi-insert-chart": React.lazy(() =>
        import(
            /* webpackChunkName: "InsertChartIcon" */
            "mdi-react/InsertChartIcon"
        ),
    ),
    "mdi-bar-chart": React.lazy(() =>
        import(
            /* webpackChunkName: "BarChartIcon" */
            "mdi-react/BarChartIcon"
        ),
    ),
    "mdi-hashtag-box": React.lazy(() =>
        import(
            /* webpackChunkName: "HashtagBoxIcon" */
            "mdi-react/HashtagBoxIcon"
        ),
    ),
    "mdi-hashtag": React.lazy(() =>
        import(
            /* webpackChunkName: "HashtagIcon" */
            "mdi-react/HashtagIcon"
        ),
    ),
    "mdi-settings-power": React.lazy(() =>
        import(
            /* webpackChunkName: "SettingsPowerIcon" */
            "mdi-react/SettingsPowerIcon"
        ),
    ),
    "mdi-plug-socket-au": React.lazy(() =>
        import(
            /* webpackChunkName: "PlugSocketAuIcon" */
            "mdi-react/PlugSocketAuIcon"
        ),
    ),
    "mdi-power-socket-type-i": React.lazy(() =>
        import(
            /* webpackChunkName: "PowerSocketTypeIIcon" */
            "mdi-react/PowerSocketTypeIIcon"
        ),
    ),
    "mdi-power-socket-cn": React.lazy(() =>
        import(
            /* webpackChunkName: "PowerSocketCnIcon" */
            "mdi-react/PowerSocketCnIcon"
        ),
    ),
    "mdi-power-socket-ar": React.lazy(() =>
        import(
            /* webpackChunkName: "PowerSocketArIcon" */
            "mdi-react/PowerSocketArIcon"
        ),
    ),
    "mdi-power-socket-nz": React.lazy(() =>
        import(
            /* webpackChunkName: "PowerSocketNzIcon" */
            "mdi-react/PowerSocketNzIcon"
        ),
    ),
    "mdi-power-socket-pg": React.lazy(() =>
        import(
            /* webpackChunkName: "PowerSocketPgIcon" */
            "mdi-react/PowerSocketPgIcon"
        ),
    ),
    "mdi-plug-socket-eu": React.lazy(() =>
        import(
            /* webpackChunkName: "PlugSocketEuIcon" */
            "mdi-react/PlugSocketEuIcon"
        ),
    ),
    "mdi-plug-socket-uk": React.lazy(() =>
        import(
            /* webpackChunkName: "PlugSocketUkIcon" */
            "mdi-react/PlugSocketUkIcon"
        ),
    ),
    "mdi-power-socket-type-g": React.lazy(() =>
        import(
            /* webpackChunkName: "PowerSocketTypeGIcon" */
            "mdi-react/PowerSocketTypeGIcon"
        ),
    ),
    "mdi-power-socket-ie": React.lazy(() =>
        import(
            /* webpackChunkName: "PowerSocketIeIcon" */
            "mdi-react/PowerSocketIeIcon"
        ),
    ),
    "mdi-power-socket-hk": React.lazy(() =>
        import(
            /* webpackChunkName: "PowerSocketHkIcon" */
            "mdi-react/PowerSocketHkIcon"
        ),
    ),
    "mdi-power-socket-my": React.lazy(() =>
        import(
            /* webpackChunkName: "PowerSocketMyIcon" */
            "mdi-react/PowerSocketMyIcon"
        ),
    ),
    "mdi-power-socket-cy": React.lazy(() =>
        import(
            /* webpackChunkName: "PowerSocketCyIcon" */
            "mdi-react/PowerSocketCyIcon"
        ),
    ),
    "mdi-power-socket-mt": React.lazy(() =>
        import(
            /* webpackChunkName: "PowerSocketMtIcon" */
            "mdi-react/PowerSocketMtIcon"
        ),
    ),
    "mdi-power-socket-sg": React.lazy(() =>
        import(
            /* webpackChunkName: "PowerSocketSgIcon" */
            "mdi-react/PowerSocketSgIcon"
        ),
    ),
    "mdi-plug-socket-us": React.lazy(() =>
        import(
            /* webpackChunkName: "PlugSocketUsIcon" */
            "mdi-react/PlugSocketUsIcon"
        ),
    ),
    "mdi-power-socket-jp": React.lazy(() =>
        import(
            /* webpackChunkName: "PowerSocketJpIcon" */
            "mdi-react/PowerSocketJpIcon"
        ),
    ),
    "mdi-power-socket-ca": React.lazy(() =>
        import(
            /* webpackChunkName: "PowerSocketCaIcon" */
            "mdi-react/PowerSocketCaIcon"
        ),
    ),
    "mdi-power-socket-mx": React.lazy(() =>
        import(
            /* webpackChunkName: "PowerSocketMxIcon" */
            "mdi-react/PowerSocketMxIcon"
        ),
    ),
    "mdi-power-socket-type-b": React.lazy(() =>
        import(
            /* webpackChunkName: "PowerSocketTypeBIcon" */
            "mdi-react/PowerSocketTypeBIcon"
        ),
    ),
    "mdi-plug-socket": React.lazy(() =>
        import(
            /* webpackChunkName: "PlugSocketIcon" */
            "mdi-react/PlugSocketIcon"
        ),
    ),
    "mdi-power-settings-new": React.lazy(() =>
        import(
            /* webpackChunkName: "PowerSettingsNewIcon" */
            "mdi-react/PowerSettingsNewIcon"
        ),
    ),
    "mdi-shutdown": React.lazy(() =>
        import(
            /* webpackChunkName: "ShutdownIcon" */
            "mdi-react/ShutdownIcon"
        ),
    ),
    "mdi-printer-warning": React.lazy(() =>
        import(
            /* webpackChunkName: "PrinterWarningIcon" */
            "mdi-react/PrinterWarningIcon"
        ),
    ),
    "mdi-local-printshop": React.lazy(() =>
        import(
            /* webpackChunkName: "LocalPrintshopIcon" */
            "mdi-react/LocalPrintshopIcon"
        ),
    ),
    "mdi-low-priority": React.lazy(() =>
        import(
            /* webpackChunkName: "LowPriorityIcon" */
            "mdi-react/LowPriorityIcon"
        ),
    ),
    "mdi-extension": React.lazy(() =>
        import(
            /* webpackChunkName: "ExtensionIcon" */
            "mdi-react/ExtensionIcon"
        ),
    ),
    "mdi-high-quality": React.lazy(() =>
        import(
            /* webpackChunkName: "HighQualityIcon" */
            "mdi-react/HighQualityIcon"
        ),
    ),
    "mdi-bunny": React.lazy(() =>
        import(
            /* webpackChunkName: "BunnyIcon" */
            "mdi-react/BunnyIcon"
        ),
    ),
    "mdi-track-changes": React.lazy(() =>
        import(
            /* webpackChunkName: "TrackChangesIcon" */
            "mdi-react/TrackChangesIcon"
        ),
    ),
    "mdi-radio-button-unchecked": React.lazy(() =>
        import(
            /* webpackChunkName: "RadioButtonUncheckedIcon" */
            "mdi-react/RadioButtonUncheckedIcon"
        ),
    ),
    "mdi-radio-button-checked": React.lazy(() =>
        import(
            /* webpackChunkName: "RadioButtonCheckedIcon" */
            "mdi-react/RadioButtonCheckedIcon"
        ),
    ),
    "mdi-fiber-manual-record": React.lazy(() =>
        import(
            /* webpackChunkName: "FiberManualRecordIcon" */
            "mdi-react/FiberManualRecordIcon"
        ),
    ),
    "mdi-image-aspect-ratio": React.lazy(() =>
        import(
            /* webpackChunkName: "ImageAspectRatioIcon" */
            "mdi-react/ImageAspectRatioIcon"
        ),
    ),
    "mdi-settings-remote": React.lazy(() =>
        import(
            /* webpackChunkName: "SettingsRemoteIcon" */
            "mdi-react/SettingsRemoteIcon"
        ),
    ),
    "mdi-repeat-one": React.lazy(() =>
        import(
            /* webpackChunkName: "RepeatOneIcon" */
            "mdi-react/RepeatOneIcon"
        ),
    ),
    "mdi-fast-rewind": React.lazy(() =>
        import(
            /* webpackChunkName: "FastRewindIcon" */
            "mdi-react/FastRewindIcon"
        ),
    ),
    "mdi-diamond-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "DiamondOutlineIcon" */
            "mdi-react/DiamondOutlineIcon"
        ),
    ),
    "mdi-neato": React.lazy(() =>
        import(
            /* webpackChunkName: "NeatoIcon" */
            "mdi-react/NeatoIcon"
        ),
    ),
    "mdi-roomba": React.lazy(() =>
        import(
            /* webpackChunkName: "RoombaIcon" */
            "mdi-react/RoombaIcon"
        ),
    ),
    "mdi-arrow-rotate-left": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowRotateLeftIcon" */
            "mdi-react/ArrowRotateLeftIcon"
        ),
    ),
    "mdi-arrow-rotate-right": React.lazy(() =>
        import(
            /* webpackChunkName: "ArrowRotateRightIcon" */
            "mdi-react/ArrowRotateRightIcon"
        ),
    ),
    "mdi-sign-routes": React.lazy(() =>
        import(
            /* webpackChunkName: "SignRoutesIcon" */
            "mdi-react/SignRoutesIcon"
        ),
    ),
    "mdi-rss-feed": React.lazy(() =>
        import(
            /* webpackChunkName: "RssFeedIcon" */
            "mdi-react/RssFeedIcon"
        ),
    ),
    "mdi-directions-run": React.lazy(() =>
        import(
            /* webpackChunkName: "DirectionsRunIcon" */
            "mdi-react/DirectionsRunIcon"
        ),
    ),
    "mdi-discount": React.lazy(() =>
        import(
            /* webpackChunkName: "DiscountIcon" */
            "mdi-react/DiscountIcon"
        ),
    ),
    "mdi-graduation-cap": React.lazy(() =>
        import(
            /* webpackChunkName: "GraduationCapIcon" */
            "mdi-react/GraduationCapIcon"
        ),
    ),
    "mdi-screen-lock-rotation": React.lazy(() =>
        import(
            /* webpackChunkName: "ScreenLockRotationIcon" */
            "mdi-react/ScreenLockRotationIcon"
        ),
    ),
    "mdi-sd-card": React.lazy(() =>
        import(
            /* webpackChunkName: "SdCardIcon" */
            "mdi-react/SdCardIcon"
        ),
    ),
    "mdi-sd-storage": React.lazy(() =>
        import(
            /* webpackChunkName: "SdStorageIcon" */
            "mdi-react/SdStorageIcon"
        ),
    ),
    "mdi-airline-seat-flat-angled": React.lazy(() =>
        import(
            /* webpackChunkName: "AirlineSeatFlatAngledIcon" */
            "mdi-react/AirlineSeatFlatAngledIcon"
        ),
    ),
    "mdi-airline-seat-flat": React.lazy(() =>
        import(
            /* webpackChunkName: "AirlineSeatFlatIcon" */
            "mdi-react/AirlineSeatFlatIcon"
        ),
    ),
    "mdi-airline-seat-individual-suite": React.lazy(() =>
        import(
            /* webpackChunkName: "AirlineSeatIndividualSuiteIcon" */
            "mdi-react/AirlineSeatIndividualSuiteIcon"
        ),
    ),
    "mdi-airline-seat-legroom-extra": React.lazy(() =>
        import(
            /* webpackChunkName: "AirlineSeatLegroomExtraIcon" */
            "mdi-react/AirlineSeatLegroomExtraIcon"
        ),
    ),
    "mdi-airline-seat-legroom-normal": React.lazy(() =>
        import(
            /* webpackChunkName: "AirlineSeatLegroomNormalIcon" */
            "mdi-react/AirlineSeatLegroomNormalIcon"
        ),
    ),
    "mdi-airline-seat-legroom-reduced": React.lazy(() =>
        import(
            /* webpackChunkName: "AirlineSeatLegroomReducedIcon" */
            "mdi-react/AirlineSeatLegroomReducedIcon"
        ),
    ),
    "mdi-airline-seat-recline-extra": React.lazy(() =>
        import(
            /* webpackChunkName: "AirlineSeatReclineExtraIcon" */
            "mdi-react/AirlineSeatReclineExtraIcon"
        ),
    ),
    "mdi-airline-seat-recline-normal": React.lazy(() =>
        import(
            /* webpackChunkName: "AirlineSeatReclineNormalIcon" */
            "mdi-react/AirlineSeatReclineNormalIcon"
        ),
    ),
    "mdi-set-centre-right": React.lazy(() =>
        import(
            /* webpackChunkName: "SetCentreRightIcon" */
            "mdi-react/SetCentreRightIcon"
        ),
    ),
    "mdi-set-centre": React.lazy(() =>
        import(
            /* webpackChunkName: "SetCentreIcon" */
            "mdi-react/SetCentreIcon"
        ),
    ),
    "mdi-set-left-centre": React.lazy(() =>
        import(
            /* webpackChunkName: "SetLeftCentreIcon" */
            "mdi-react/SetLeftCentreIcon"
        ),
    ),
    "mdi-gear-box": React.lazy(() =>
        import(
            /* webpackChunkName: "GearBoxIcon" */
            "mdi-react/GearBoxIcon"
        ),
    ),
    "mdi-cog-box": React.lazy(() =>
        import(
            /* webpackChunkName: "CogBoxIcon" */
            "mdi-react/CogBoxIcon"
        ),
    ),
    "mdi-settings-applications": React.lazy(() =>
        import(
            /* webpackChunkName: "SettingsApplicationsIcon" */
            "mdi-react/SettingsApplicationsIcon"
        ),
    ),
    "mdi-cog-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "CogOutlineIcon" */
            "mdi-react/CogOutlineIcon"
        ),
    ),
    "mdi-gear-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "GearOutlineIcon" */
            "mdi-react/GearOutlineIcon"
        ),
    ),
    "mdi-cog": React.lazy(() =>
        import(
            /* webpackChunkName: "CogIcon" */
            "mdi-react/CogIcon"
        ),
    ),
    "mdi-gear": React.lazy(() =>
        import(
            /* webpackChunkName: "GearIcon" */
            "mdi-react/GearIcon"
        ),
    ),
    "mdi-theme": React.lazy(() =>
        import(
            /* webpackChunkName: "ThemeIcon" */
            "mdi-react/ThemeIcon"
        ),
    ),
    "mdi-category": React.lazy(() =>
        import(
            /* webpackChunkName: "CategoryIcon" */
            "mdi-react/CategoryIcon"
        ),
    ),
    "mdi-voyager": React.lazy(() =>
        import(
            /* webpackChunkName: "VoyagerIcon" */
            "mdi-react/VoyagerIcon"
        ),
    ),
    "mdi-local-mall": React.lazy(() =>
        import(
            /* webpackChunkName: "LocalMallIcon" */
            "mdi-react/LocalMallIcon"
        ),
    ),
    "mdi-summation": React.lazy(() =>
        import(
            /* webpackChunkName: "SummationIcon" */
            "mdi-react/SummationIcon"
        ),
    ),
    "mdi-signal-cellular-0": React.lazy(() =>
        import(
            /* webpackChunkName: "SignalCellular0Icon" */
            "mdi-react/SignalCellular0Icon"
        ),
    ),
    "mdi-local-dining": React.lazy(() =>
        import(
            /* webpackChunkName: "LocalDiningIcon" */
            "mdi-react/LocalDiningIcon"
        ),
    ),
    "mdi-restaurant-menu": React.lazy(() =>
        import(
            /* webpackChunkName: "RestaurantMenuIcon" */
            "mdi-react/RestaurantMenuIcon"
        ),
    ),
    "mdi-local-restaurant": React.lazy(() =>
        import(
            /* webpackChunkName: "LocalRestaurantIcon" */
            "mdi-react/LocalRestaurantIcon"
        ),
    ),
    "mdi-sim-warning": React.lazy(() =>
        import(
            /* webpackChunkName: "SimWarningIcon" */
            "mdi-react/SimWarningIcon"
        ),
    ),
    "mdi-sim-card-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "SimCardAlertIcon" */
            "mdi-react/SimCardAlertIcon"
        ),
    ),
    "mdi-signal-cellular-no-sim": React.lazy(() =>
        import(
            /* webpackChunkName: "SignalCellularNoSimIcon" */
            "mdi-react/SignalCellularNoSimIcon"
        ),
    ),
    "mdi-sim-card": React.lazy(() =>
        import(
            /* webpackChunkName: "SimCardIcon" */
            "mdi-react/SimCardIcon"
        ),
    ),
    "mdi-workflow": React.lazy(() =>
        import(
            /* webpackChunkName: "WorkflowIcon" */
            "mdi-react/WorkflowIcon"
        ),
    ),
    "mdi-flowchart": React.lazy(() =>
        import(
            /* webpackChunkName: "FlowchartIcon" */
            "mdi-react/FlowchartIcon"
        ),
    ),
    "mdi-title-backward": React.lazy(() =>
        import(
            /* webpackChunkName: "TitleBackwardIcon" */
            "mdi-react/TitleBackwardIcon"
        ),
    ),
    "mdi-previous-title": React.lazy(() =>
        import(
            /* webpackChunkName: "PreviousTitleIcon" */
            "mdi-react/PreviousTitleIcon"
        ),
    ),
    "mdi-title-forward": React.lazy(() =>
        import(
            /* webpackChunkName: "TitleForwardIcon" */
            "mdi-react/TitleForwardIcon"
        ),
    ),
    "mdi-next-title": React.lazy(() =>
        import(
            /* webpackChunkName: "NextTitleIcon" */
            "mdi-react/NextTitleIcon"
        ),
    ),
    "mdi-nest-protect": React.lazy(() =>
        import(
            /* webpackChunkName: "NestProtectIcon" */
            "mdi-react/NestProtectIcon"
        ),
    ),
    "mdi-no-smoking": React.lazy(() =>
        import(
            /* webpackChunkName: "NoSmokingIcon" */
            "mdi-react/NoSmokingIcon"
        ),
    ),
    "mdi-cigarette-off": React.lazy(() =>
        import(
            /* webpackChunkName: "CigaretteOffIcon" */
            "mdi-react/CigaretteOffIcon"
        ),
    ),
    "mdi-smoke-free": React.lazy(() =>
        import(
            /* webpackChunkName: "SmokeFreeIcon" */
            "mdi-react/SmokeFreeIcon"
        ),
    ),
    "mdi-cigarette": React.lazy(() =>
        import(
            /* webpackChunkName: "CigaretteIcon" */
            "mdi-react/CigaretteIcon"
        ),
    ),
    "mdi-smoking-area": React.lazy(() =>
        import(
            /* webpackChunkName: "SmokingAreaIcon" */
            "mdi-react/SmokingAreaIcon"
        ),
    ),
    "mdi-smoking-rooms": React.lazy(() =>
        import(
            /* webpackChunkName: "SmokingRoomsIcon" */
            "mdi-react/SmokingRoomsIcon"
        ),
    ),
    "mdi-football-pitch": React.lazy(() =>
        import(
            /* webpackChunkName: "FootballPitchIcon" */
            "mdi-react/FootballPitchIcon"
        ),
    ),
    "mdi-couch": React.lazy(() =>
        import(
            /* webpackChunkName: "CouchIcon" */
            "mdi-react/CouchIcon"
        ),
    ),
    "mdi-sort-by-alpha": React.lazy(() =>
        import(
            /* webpackChunkName: "SortByAlphaIcon" */
            "mdi-react/SortByAlphaIcon"
        ),
    ),
    "mdi-paint": React.lazy(() =>
        import(
            /* webpackChunkName: "PaintIcon" */
            "mdi-react/PaintIcon"
        ),
    ),
    "mdi-aerosol": React.lazy(() =>
        import(
            /* webpackChunkName: "AerosolIcon" */
            "mdi-react/AerosolIcon"
        ),
    ),
    "mdi-arena": React.lazy(() =>
        import(
            /* webpackChunkName: "ArenaIcon" */
            "mdi-react/ArenaIcon"
        ),
    ),
    "mdi-feature-highlight": React.lazy(() =>
        import(
            /* webpackChunkName: "FeatureHighlightIcon" */
            "mdi-react/FeatureHighlightIcon"
        ),
    ),
    "mdi-stars": React.lazy(() =>
        import(
            /* webpackChunkName: "StarsIcon" */
            "mdi-react/StarsIcon"
        ),
    ),
    "mdi-star-border": React.lazy(() =>
        import(
            /* webpackChunkName: "StarBorderIcon" */
            "mdi-react/StarBorderIcon"
        ),
    ),
    "mdi-grade": React.lazy(() =>
        import(
            /* webpackChunkName: "GradeIcon" */
            "mdi-react/GradeIcon"
        ),
    ),
    "mdi-star-rate": React.lazy(() =>
        import(
            /* webpackChunkName: "StarRateIcon" */
            "mdi-react/StarRateIcon"
        ),
    ),
    "mdi-search-hands-free-off": React.lazy(() =>
        import(
            /* webpackChunkName: "SearchHandsFreeOffIcon" */
            "mdi-react/SearchHandsFreeOffIcon"
        ),
    ),
    "mdi-search-hands-free": React.lazy(() =>
        import(
            /* webpackChunkName: "SearchHandsFreeIcon" */
            "mdi-react/SearchHandsFreeIcon"
        ),
    ),
    "mdi-frame-backward": React.lazy(() =>
        import(
            /* webpackChunkName: "FrameBackwardIcon" */
            "mdi-react/FrameBackwardIcon"
        ),
    ),
    "mdi-frame-forward": React.lazy(() =>
        import(
            /* webpackChunkName: "FrameForwardIcon" */
            "mdi-react/FrameForwardIcon"
        ),
    ),
    "mdi-local-convenience-store": React.lazy(() =>
        import(
            /* webpackChunkName: "LocalConvenienceStoreIcon" */
            "mdi-react/LocalConvenienceStoreIcon"
        ),
    ),
    "mdi-shop-24-hour": React.lazy(() =>
        import(
            /* webpackChunkName: "Shop24HourIcon" */
            "mdi-react/Shop24HourIcon"
        ),
    ),
    "mdi-shop": React.lazy(() =>
        import(
            /* webpackChunkName: "ShopIcon" */
            "mdi-react/ShopIcon"
        ),
    ),
    "mdi-store-mall-directory": React.lazy(() =>
        import(
            /* webpackChunkName: "StoreMallDirectoryIcon" */
            "mdi-react/StoreMallDirectoryIcon"
        ),
    ),
    "mdi-cooker": React.lazy(() =>
        import(
            /* webpackChunkName: "CookerIcon" */
            "mdi-react/CookerIcon"
        ),
    ),
    "mdi-oven": React.lazy(() =>
        import(
            /* webpackChunkName: "OvenIcon" */
            "mdi-react/OvenIcon"
        ),
    ),
    "mdi-metro-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "MetroVariantIcon" */
            "mdi-react/MetroVariantIcon"
        ),
    ),
    "mdi-tube-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "TubeVariantIcon" */
            "mdi-react/TubeVariantIcon"
        ),
    ),
    "mdi-underground-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "UndergroundVariantIcon" */
            "mdi-react/UndergroundVariantIcon"
        ),
    ),
    "mdi-directions-subway": React.lazy(() =>
        import(
            /* webpackChunkName: "DirectionsSubwayIcon" */
            "mdi-react/DirectionsSubwayIcon"
        ),
    ),
    "mdi-directions-transit": React.lazy(() =>
        import(
            /* webpackChunkName: "DirectionsTransitIcon" */
            "mdi-react/DirectionsTransitIcon"
        ),
    ),
    "mdi-metro": React.lazy(() =>
        import(
            /* webpackChunkName: "MetroIcon" */
            "mdi-react/MetroIcon"
        ),
    ),
    "mdi-tube": React.lazy(() =>
        import(
            /* webpackChunkName: "TubeIcon" */
            "mdi-react/TubeIcon"
        ),
    ),
    "mdi-underground": React.lazy(() =>
        import(
            /* webpackChunkName: "UndergroundIcon" */
            "mdi-react/UndergroundIcon"
        ),
    ),
    "mdi-peak": React.lazy(() =>
        import(
            /* webpackChunkName: "PeakIcon" */
            "mdi-react/PeakIcon"
        ),
    ),
    "mdi-stereo": React.lazy(() =>
        import(
            /* webpackChunkName: "StereoIcon" */
            "mdi-react/StereoIcon"
        ),
    ),
    "mdi-swap-calls": React.lazy(() =>
        import(
            /* webpackChunkName: "SwapCallsIcon" */
            "mdi-react/SwapCallsIcon"
        ),
    ),
    "mdi-import-export": React.lazy(() =>
        import(
            /* webpackChunkName: "ImportExportIcon" */
            "mdi-react/ImportExportIcon"
        ),
    ),
    "mdi-sync-warning": React.lazy(() =>
        import(
            /* webpackChunkName: "SyncWarningIcon" */
            "mdi-react/SyncWarningIcon"
        ),
    ),
    "mdi-sync-problem": React.lazy(() =>
        import(
            /* webpackChunkName: "SyncProblemIcon" */
            "mdi-react/SyncProblemIcon"
        ),
    ),
    "mdi-sync-disabled": React.lazy(() =>
        import(
            /* webpackChunkName: "SyncDisabledIcon" */
            "mdi-react/SyncDisabledIcon"
        ),
    ),
    "mdi-toc": React.lazy(() =>
        import(
            /* webpackChunkName: "TocIcon" */
            "mdi-react/TocIcon"
        ),
    ),
    "mdi-mobile-devices": React.lazy(() =>
        import(
            /* webpackChunkName: "MobileDevicesIcon" */
            "mdi-react/MobileDevicesIcon"
        ),
    ),
    "mdi-tablet-mac": React.lazy(() =>
        import(
            /* webpackChunkName: "TabletMacIcon" */
            "mdi-react/TabletMacIcon"
        ),
    ),
    "mdi-loyalty": React.lazy(() =>
        import(
            /* webpackChunkName: "LoyaltyIcon" */
            "mdi-react/LoyaltyIcon"
        ),
    ),
    "mdi-local-offer": React.lazy(() =>
        import(
            /* webpackChunkName: "LocalOfferIcon" */
            "mdi-react/LocalOfferIcon"
        ),
    ),
    "mdi-local-taxi": React.lazy(() =>
        import(
            /* webpackChunkName: "LocalTaxiIcon" */
            "mdi-react/LocalTaxiIcon"
        ),
    ),
    "mdi-teacher": React.lazy(() =>
        import(
            /* webpackChunkName: "TeacherIcon" */
            "mdi-react/TeacherIcon"
        ),
    ),
    "mdi-teaching": React.lazy(() =>
        import(
            /* webpackChunkName: "TeachingIcon" */
            "mdi-react/TeachingIcon"
        ),
    ),
    "mdi-tv-box": React.lazy(() =>
        import(
            /* webpackChunkName: "TvBoxIcon" */
            "mdi-react/TvBoxIcon"
        ),
    ),
    "mdi-tv-guide": React.lazy(() =>
        import(
            /* webpackChunkName: "TvGuideIcon" */
            "mdi-react/TvGuideIcon"
        ),
    ),
    "mdi-tv-classic-off": React.lazy(() =>
        import(
            /* webpackChunkName: "TvClassicOffIcon" */
            "mdi-react/TvClassicOffIcon"
        ),
    ),
    "mdi-tv-classic": React.lazy(() =>
        import(
            /* webpackChunkName: "TvClassicIcon" */
            "mdi-react/TvClassicIcon"
        ),
    ),
    "mdi-tv-off": React.lazy(() =>
        import(
            /* webpackChunkName: "TvOffIcon" */
            "mdi-react/TvOffIcon"
        ),
    ),
    "mdi-tv": React.lazy(() =>
        import(
            /* webpackChunkName: "TvIcon" */
            "mdi-react/TvIcon"
        ),
    ),
    "mdi-temperature-centigrade": React.lazy(() =>
        import(
            /* webpackChunkName: "TemperatureCentigradeIcon" */
            "mdi-react/TemperatureCentigradeIcon"
        ),
    ),
    "mdi-camping": React.lazy(() =>
        import(
            /* webpackChunkName: "CampingIcon" */
            "mdi-react/CampingIcon"
        ),
    ),
    "mdi-cinema": React.lazy(() =>
        import(
            /* webpackChunkName: "CinemaIcon" */
            "mdi-react/CinemaIcon"
        ),
    ),
    "mdi-theatre": React.lazy(() =>
        import(
            /* webpackChunkName: "TheatreIcon" */
            "mdi-react/TheatreIcon"
        ),
    ),
    "mdi-sun-moon-stars": React.lazy(() =>
        import(
            /* webpackChunkName: "SunMoonStarsIcon" */
            "mdi-react/SunMoonStarsIcon"
        ),
    ),
    "mdi-nest": React.lazy(() =>
        import(
            /* webpackChunkName: "NestIcon" */
            "mdi-react/NestIcon"
        ),
    ),
    "mdi-comic-thought-bubble-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "ComicThoughtBubbleOutlineIcon" */
            "mdi-react/ComicThoughtBubbleOutlineIcon"
        ),
    ),
    "mdi-comic-bubble": React.lazy(() =>
        import(
            /* webpackChunkName: "ComicBubbleIcon" */
            "mdi-react/ComicBubbleIcon"
        ),
    ),
    "mdi-dislike-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "DislikeOutlineIcon" */
            "mdi-react/DislikeOutlineIcon"
        ),
    ),
    "mdi-thumbs-down-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "ThumbsDownOutlineIcon" */
            "mdi-react/ThumbsDownOutlineIcon"
        ),
    ),
    "mdi-dislike": React.lazy(() =>
        import(
            /* webpackChunkName: "DislikeIcon" */
            "mdi-react/DislikeIcon"
        ),
    ),
    "mdi-thumbs-down": React.lazy(() =>
        import(
            /* webpackChunkName: "ThumbsDownIcon" */
            "mdi-react/ThumbsDownIcon"
        ),
    ),
    "mdi-like-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "LikeOutlineIcon" */
            "mdi-react/LikeOutlineIcon"
        ),
    ),
    "mdi-thumbs-up-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "ThumbsUpOutlineIcon" */
            "mdi-react/ThumbsUpOutlineIcon"
        ),
    ),
    "mdi-like": React.lazy(() =>
        import(
            /* webpackChunkName: "LikeIcon" */
            "mdi-react/LikeIcon"
        ),
    ),
    "mdi-thumbs-up": React.lazy(() =>
        import(
            /* webpackChunkName: "ThumbsUpIcon" */
            "mdi-react/ThumbsUpIcon"
        ),
    ),
    "mdi-like-dislike": React.lazy(() =>
        import(
            /* webpackChunkName: "LikeDislikeIcon" */
            "mdi-react/LikeDislikeIcon"
        ),
    ),
    "mdi-ticket-user": React.lazy(() =>
        import(
            /* webpackChunkName: "TicketUserIcon" */
            "mdi-react/TicketUserIcon"
        ),
    ),
    "mdi-confirmation-number": React.lazy(() =>
        import(
            /* webpackChunkName: "ConfirmationNumberIcon" */
            "mdi-react/ConfirmationNumberIcon"
        ),
    ),
    "mdi-coupon": React.lazy(() =>
        import(
            /* webpackChunkName: "CouponIcon" */
            "mdi-react/CouponIcon"
        ),
    ),
    "mdi-voucher": React.lazy(() =>
        import(
            /* webpackChunkName: "VoucherIcon" */
            "mdi-react/VoucherIcon"
        ),
    ),
    "mdi-local-activity": React.lazy(() =>
        import(
            /* webpackChunkName: "LocalActivityIcon" */
            "mdi-react/LocalActivityIcon"
        ),
    ),
    "mdi-local-play": React.lazy(() =>
        import(
            /* webpackChunkName: "LocalPlayIcon" */
            "mdi-react/LocalPlayIcon"
        ),
    ),
    "mdi-local-attraction": React.lazy(() =>
        import(
            /* webpackChunkName: "LocalAttractionIcon" */
            "mdi-react/LocalAttractionIcon"
        ),
    ),
    "mdi-stopwatch-off": React.lazy(() =>
        import(
            /* webpackChunkName: "StopwatchOffIcon" */
            "mdi-react/StopwatchOffIcon"
        ),
    ),
    "mdi-hourglass-empty": React.lazy(() =>
        import(
            /* webpackChunkName: "HourglassEmptyIcon" */
            "mdi-react/HourglassEmptyIcon"
        ),
    ),
    "mdi-hourglass-full": React.lazy(() =>
        import(
            /* webpackChunkName: "HourglassFullIcon" */
            "mdi-react/HourglassFullIcon"
        ),
    ),
    "mdi-hourglass": React.lazy(() =>
        import(
            /* webpackChunkName: "HourglassIcon" */
            "mdi-react/HourglassIcon"
        ),
    ),
    "mdi-stopwatch": React.lazy(() =>
        import(
            /* webpackChunkName: "StopwatchIcon" */
            "mdi-react/StopwatchIcon"
        ),
    ),
    "mdi-bracket": React.lazy(() =>
        import(
            /* webpackChunkName: "BracketIcon" */
            "mdi-react/BracketIcon"
        ),
    ),
    "mdi-auto-towing": React.lazy(() =>
        import(
            /* webpackChunkName: "AutoTowingIcon" */
            "mdi-react/AutoTowingIcon"
        ),
    ),
    "mdi-directions-railway": React.lazy(() =>
        import(
            /* webpackChunkName: "DirectionsRailwayIcon" */
            "mdi-react/DirectionsRailwayIcon"
        ),
    ),
    "mdi-transfer-within-a-station": React.lazy(() =>
        import(
            /* webpackChunkName: "TransferWithinAStationIcon" */
            "mdi-react/TransferWithinAStationIcon"
        ),
    ),
    "mdi-masked-transitions": React.lazy(() =>
        import(
            /* webpackChunkName: "MaskedTransitionsIcon" */
            "mdi-react/MaskedTransitionsIcon"
        ),
    ),
    "mdi-motion": React.lazy(() =>
        import(
            /* webpackChunkName: "MotionIcon" */
            "mdi-react/MotionIcon"
        ),
    ),
    "mdi-language": React.lazy(() =>
        import(
            /* webpackChunkName: "LanguageIcon" */
            "mdi-react/LanguageIcon"
        ),
    ),
    "mdi-trending-flat": React.lazy(() =>
        import(
            /* webpackChunkName: "TrendingFlatIcon" */
            "mdi-react/TrendingFlatIcon"
        ),
    ),
    "mdi-achievement-award": React.lazy(() =>
        import(
            /* webpackChunkName: "AchievementAwardIcon" */
            "mdi-react/AchievementAwardIcon"
        ),
    ),
    "mdi-achievement-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "AchievementOutlineIcon" */
            "mdi-react/AchievementOutlineIcon"
        ),
    ),
    "mdi-achievement-variant-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "AchievementVariantOutlineIcon" */
            "mdi-react/AchievementVariantOutlineIcon"
        ),
    ),
    "mdi-achievement-variant": React.lazy(() =>
        import(
            /* webpackChunkName: "AchievementVariantIcon" */
            "mdi-react/AchievementVariantIcon"
        ),
    ),
    "mdi-achievement": React.lazy(() =>
        import(
            /* webpackChunkName: "AchievementIcon" */
            "mdi-react/AchievementIcon"
        ),
    ),
    "mdi-lorry-delivery": React.lazy(() =>
        import(
            /* webpackChunkName: "LorryDeliveryIcon" */
            "mdi-react/LorryDeliveryIcon"
        ),
    ),
    "mdi-lorry-fast": React.lazy(() =>
        import(
            /* webpackChunkName: "LorryFastIcon" */
            "mdi-react/LorryFastIcon"
        ),
    ),
    "mdi-lorry": React.lazy(() =>
        import(
            /* webpackChunkName: "LorryIcon" */
            "mdi-react/LorryIcon"
        ),
    ),
    "mdi-local-shipping": React.lazy(() =>
        import(
            /* webpackChunkName: "LocalShippingIcon" */
            "mdi-react/LocalShippingIcon"
        ),
    ),
    "mdi-equaliser-vertical": React.lazy(() =>
        import(
            /* webpackChunkName: "EqualiserVerticalIcon" */
            "mdi-react/EqualiserVerticalIcon"
        ),
    ),
    "mdi-instant-mix": React.lazy(() =>
        import(
            /* webpackChunkName: "InstantMixIcon" */
            "mdi-react/InstantMixIcon"
        ),
    ),
    "mdi-mixer-settings": React.lazy(() =>
        import(
            /* webpackChunkName: "MixerSettingsIcon" */
            "mdi-react/MixerSettingsIcon"
        ),
    ),
    "mdi-equaliser": React.lazy(() =>
        import(
            /* webpackChunkName: "EqualiserIcon" */
            "mdi-react/EqualiserIcon"
        ),
    ),
    "mdi-uhd": React.lazy(() =>
        import(
            /* webpackChunkName: "UhdIcon" */
            "mdi-react/UhdIcon"
        ),
    ),
    "mdi-unreal-engine": React.lazy(() =>
        import(
            /* webpackChunkName: "UnrealEngineIcon" */
            "mdi-react/UnrealEngineIcon"
        ),
    ),
    "mdi-clockwise": React.lazy(() =>
        import(
            /* webpackChunkName: "ClockwiseIcon" */
            "mdi-react/ClockwiseIcon"
        ),
    ),
    "mdi-file-upload": React.lazy(() =>
        import(
            /* webpackChunkName: "FileUploadIcon" */
            "mdi-react/FileUploadIcon"
        ),
    ),
    "mdi-van-candy": React.lazy(() =>
        import(
            /* webpackChunkName: "VanCandyIcon" */
            "mdi-react/VanCandyIcon"
        ),
    ),
    "mdi-bezier": React.lazy(() =>
        import(
            /* webpackChunkName: "BezierIcon" */
            "mdi-react/BezierIcon"
        ),
    ),
    "mdi-shield-check": React.lazy(() =>
        import(
            /* webpackChunkName: "ShieldCheckIcon" */
            "mdi-react/ShieldCheckIcon"
        ),
    ),
    "mdi-verified-user": React.lazy(() =>
        import(
            /* webpackChunkName: "VerifiedUserIcon" */
            "mdi-react/VerifiedUserIcon"
        ),
    ),
    "mdi-vibration": React.lazy(() =>
        import(
            /* webpackChunkName: "VibrationIcon" */
            "mdi-react/VibrationIcon"
        ),
    ),
    "mdi-video-user": React.lazy(() =>
        import(
            /* webpackChunkName: "VideoUserIcon" */
            "mdi-react/VideoUserIcon"
        ),
    ),
    "mdi-settings-input-antenna": React.lazy(() =>
        import(
            /* webpackChunkName: "SettingsInputAntennaIcon" */
            "mdi-react/SettingsInputAntennaIcon"
        ),
    ),
    "mdi-video-input-composite": React.lazy(() =>
        import(
            /* webpackChunkName: "VideoInputCompositeIcon" */
            "mdi-react/VideoInputCompositeIcon"
        ),
    ),
    "mdi-settings-input-component": React.lazy(() =>
        import(
            /* webpackChunkName: "SettingsInputComponentIcon" */
            "mdi-react/SettingsInputComponentIcon"
        ),
    ),
    "mdi-settings-input-composite": React.lazy(() =>
        import(
            /* webpackChunkName: "SettingsInputCompositeIcon" */
            "mdi-react/SettingsInputCompositeIcon"
        ),
    ),
    "mdi-video-input-ypbpr": React.lazy(() =>
        import(
            /* webpackChunkName: "VideoInputYpbprIcon" */
            "mdi-react/VideoInputYpbprIcon"
        ),
    ),
    "mdi-rca": React.lazy(() =>
        import(
            /* webpackChunkName: "RcaIcon" */
            "mdi-react/RcaIcon"
        ),
    ),
    "mdi-settings-input-hdmi": React.lazy(() =>
        import(
            /* webpackChunkName: "SettingsInputHdmiIcon" */
            "mdi-react/SettingsInputHdmiIcon"
        ),
    ),
    "mdi-settings-input-svideo": React.lazy(() =>
        import(
            /* webpackChunkName: "SettingsInputSvideoIcon" */
            "mdi-react/SettingsInputSvideoIcon"
        ),
    ),
    "mdi-videocam-off": React.lazy(() =>
        import(
            /* webpackChunkName: "VideocamOffIcon" */
            "mdi-react/VideocamOffIcon"
        ),
    ),
    "mdi-video-call": React.lazy(() =>
        import(
            /* webpackChunkName: "VideoCallIcon" */
            "mdi-react/VideoCallIcon"
        ),
    ),
    "mdi-video-stabilisation": React.lazy(() =>
        import(
            /* webpackChunkName: "VideoStabilisationIcon" */
            "mdi-react/VideoStabilisationIcon"
        ),
    ),
    "mdi-switch-video": React.lazy(() =>
        import(
            /* webpackChunkName: "SwitchVideoIcon" */
            "mdi-react/SwitchVideoIcon"
        ),
    ),
    "mdi-videocam": React.lazy(() =>
        import(
            /* webpackChunkName: "VideocamIcon" */
            "mdi-react/VideocamIcon"
        ),
    ),
    "mdi-vr": React.lazy(() =>
        import(
            /* webpackChunkName: "VrIcon" */
            "mdi-react/VrIcon"
        ),
    ),
    "mdi-vkontakte-box": React.lazy(() =>
        import(
            /* webpackChunkName: "VkontakteBoxIcon" */
            "mdi-react/VkontakteBoxIcon"
        ),
    ),
    "mdi-vkontakte-circle": React.lazy(() =>
        import(
            /* webpackChunkName: "VkontakteCircleIcon" */
            "mdi-react/VkontakteCircleIcon"
        ),
    ),
    "mdi-vkontakte": React.lazy(() =>
        import(
            /* webpackChunkName: "VkontakteIcon" */
            "mdi-react/VkontakteIcon"
        ),
    ),
    "mdi-record-voice-over": React.lazy(() =>
        import(
            /* webpackChunkName: "RecordVoiceOverIcon" */
            "mdi-react/RecordVoiceOverIcon"
        ),
    ),
    "mdi-audio": React.lazy(() =>
        import(
            /* webpackChunkName: "AudioIcon" */
            "mdi-react/AudioIcon"
        ),
    ),
    "mdi-speakerphone": React.lazy(() =>
        import(
            /* webpackChunkName: "SpeakerphoneIcon" */
            "mdi-react/SpeakerphoneIcon"
        ),
    ),
    "mdi-mute": React.lazy(() =>
        import(
            /* webpackChunkName: "MuteIcon" */
            "mdi-react/MuteIcon"
        ),
    ),
    "mdi-audio-off": React.lazy(() =>
        import(
            /* webpackChunkName: "AudioOffIcon" */
            "mdi-react/AudioOffIcon"
        ),
    ),
    "mdi-speakerphone-off": React.lazy(() =>
        import(
            /* webpackChunkName: "SpeakerphoneOffIcon" */
            "mdi-react/SpeakerphoneOffIcon"
        ),
    ),
    "mdi-directions-walk": React.lazy(() =>
        import(
            /* webpackChunkName: "DirectionsWalkIcon" */
            "mdi-react/DirectionsWalkIcon"
        ),
    ),
    "mdi-card-giftcard": React.lazy(() =>
        import(
            /* webpackChunkName: "CardGiftcardIcon" */
            "mdi-react/CardGiftcardIcon"
        ),
    ),
    "mdi-redeem": React.lazy(() =>
        import(
            /* webpackChunkName: "RedeemIcon" */
            "mdi-react/RedeemIcon"
        ),
    ),
    "mdi-card-membership": React.lazy(() =>
        import(
            /* webpackChunkName: "CardMembershipIcon" */
            "mdi-react/CardMembershipIcon"
        ),
    ),
    "mdi-card-travel": React.lazy(() =>
        import(
            /* webpackChunkName: "CardTravelIcon" */
            "mdi-react/CardTravelIcon"
        ),
    ),
    "mdi-account-balance-wallet": React.lazy(() =>
        import(
            /* webpackChunkName: "AccountBalanceWalletIcon" */
            "mdi-react/AccountBalanceWalletIcon"
        ),
    ),
    "mdi-laundrette": React.lazy(() =>
        import(
            /* webpackChunkName: "LaundretteIcon" */
            "mdi-react/LaundretteIcon"
        ),
    ),
    "mdi-local-laundry-service": React.lazy(() =>
        import(
            /* webpackChunkName: "LocalLaundryServiceIcon" */
            "mdi-react/LocalLaundryServiceIcon"
        ),
    ),
    "mdi-format-color-reset": React.lazy(() =>
        import(
            /* webpackChunkName: "FormatColorResetIcon" */
            "mdi-react/FormatColorResetIcon"
        ),
    ),
    "mdi-humidity": React.lazy(() =>
        import(
            /* webpackChunkName: "HumidityIcon" */
            "mdi-react/HumidityIcon"
        ),
    ),
    "mdi-branding-watermark": React.lazy(() =>
        import(
            /* webpackChunkName: "BrandingWatermarkIcon" */
            "mdi-react/BrandingWatermarkIcon"
        ),
    ),
    "mdi-moon-and-stars": React.lazy(() =>
        import(
            /* webpackChunkName: "MoonAndStarsIcon" */
            "mdi-react/MoonAndStarsIcon"
        ),
    ),
    "mdi-night-sky": React.lazy(() =>
        import(
            /* webpackChunkName: "NightSkyIcon" */
            "mdi-react/NightSkyIcon"
        ),
    ),
    "mdi-accessible": React.lazy(() =>
        import(
            /* webpackChunkName: "AccessibleIcon" */
            "mdi-react/AccessibleIcon"
        ),
    ),
    "mdi-wb-auto": React.lazy(() =>
        import(
            /* webpackChunkName: "WbAutoIcon" */
            "mdi-react/WbAutoIcon"
        ),
    ),
    "mdi-wb-incandescent": React.lazy(() =>
        import(
            /* webpackChunkName: "WbIncandescentIcon" */
            "mdi-react/WbIncandescentIcon"
        ),
    ),
    "mdi-wb-iridescent": React.lazy(() =>
        import(
            /* webpackChunkName: "WbIridescentIcon" */
            "mdi-react/WbIridescentIcon"
        ),
    ),
    "mdi-wb-sunny": React.lazy(() =>
        import(
            /* webpackChunkName: "WbSunnyIcon" */
            "mdi-react/WbSunnyIcon"
        ),
    ),
    "mdi-wifi-strength-1-warning": React.lazy(() =>
        import(
            /* webpackChunkName: "WifiStrength1WarningIcon" */
            "mdi-react/WifiStrength1WarningIcon"
        ),
    ),
    "mdi-wifi-strength-2-warning": React.lazy(() =>
        import(
            /* webpackChunkName: "WifiStrength2WarningIcon" */
            "mdi-react/WifiStrength2WarningIcon"
        ),
    ),
    "mdi-wifi-strength-3-warning": React.lazy(() =>
        import(
            /* webpackChunkName: "WifiStrength3WarningIcon" */
            "mdi-react/WifiStrength3WarningIcon"
        ),
    ),
    "mdi-wifi-strength-4-warning": React.lazy(() =>
        import(
            /* webpackChunkName: "WifiStrength4WarningIcon" */
            "mdi-react/WifiStrength4WarningIcon"
        ),
    ),
    "mdi-wifi-strength-warning-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "WifiStrengthWarningOutlineIcon" */
            "mdi-react/WifiStrengthWarningOutlineIcon"
        ),
    ),
    "mdi-wifi-strength-0-alert": React.lazy(() =>
        import(
            /* webpackChunkName: "WifiStrength0AlertIcon" */
            "mdi-react/WifiStrength0AlertIcon"
        ),
    ),
    "mdi-wifi-strength-0-warning": React.lazy(() =>
        import(
            /* webpackChunkName: "WifiStrength0WarningIcon" */
            "mdi-react/WifiStrength0WarningIcon"
        ),
    ),
    "mdi-wifi-strength-0-lock": React.lazy(() =>
        import(
            /* webpackChunkName: "WifiStrength0LockIcon" */
            "mdi-react/WifiStrength0LockIcon"
        ),
    ),
    "mdi-wifi-strength-0": React.lazy(() =>
        import(
            /* webpackChunkName: "WifiStrength0Icon" */
            "mdi-react/WifiStrength0Icon"
        ),
    ),
    "mdi-build": React.lazy(() =>
        import(
            /* webpackChunkName: "BuildIcon" */
            "mdi-react/BuildIcon"
        ),
    ),
    "mdi-microsoft-xamarin-outline": React.lazy(() =>
        import(
            /* webpackChunkName: "MicrosoftXamarinOutlineIcon" */
            "mdi-react/MicrosoftXamarinOutlineIcon"
        ),
    ),
    "mdi-microsoft-xamarin": React.lazy(() =>
        import(
            /* webpackChunkName: "MicrosoftXamarinIcon" */
            "mdi-react/MicrosoftXamarinIcon"
        ),
    ),
    "mdi-xbox-controller-battery-warning": React.lazy(() =>
        import(
            /* webpackChunkName: "XboxControllerBatteryWarningIcon" */
            "mdi-react/XboxControllerBatteryWarningIcon"
        ),
    ),
    "mdi-video-youtube": React.lazy(() =>
        import(
            /* webpackChunkName: "VideoYoutubeIcon" */
            "mdi-react/VideoYoutubeIcon"
        ),
    ),
    "mdi-youtube-play": React.lazy(() =>
        import(
            /* webpackChunkName: "YoutubePlayIcon" */
            "mdi-react/YoutubePlayIcon"
        ),
    ),
};

const MDIIcon = ({iconfont, size, ...otherPops}: IProps) => {
    // @ts-ignore
    const IconComponent = mapIcon[iconfont];

    return IconComponent ? <IconComponent size={SIZE_MAP[size]} {...otherPops} /> : null;
};

mapComponents.mdi = MDIIcon;

export default MDIIcon;
