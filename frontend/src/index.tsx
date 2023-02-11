import * as React from "react";
import { createRoot } from "react-dom/client";
import { AppSettingProvider, useAppSetting } from "./003_provider/001_AppSettingProvider";
import { AppRootStateProvider } from "./003_provider/002_AppRootStateProvider";
import { AppStateProvider } from "./003_provider/003_AppStateProvider";
import App from "./App";
// import { AppSettingProvider, useAppSetting } from "./003_provider/001_AppSettingProvider";
// import { AppRootStateProvider } from "./003_provider/002_AppRootStateProvider";
// import "./100_components/001_css/001_App.css";
// import { AppStateProvider } from "./003_provider/003_AppStateProvider";
// import App from "./App";

const AppStateProviderWrapper = () => {
    return (
        <AppStateProvider>
            <App />
        </AppStateProvider>
    );
};

// アプリの説明
const FrontPageDescriptionJp = () => {
    return (
        <div className="front-description">
            <p>
                ブラウザを使った音声書き起こしアプリケーションです。
            </p>
            <p>
                ソースコード、使用方法は
                <a href="https://github.com/w-okada/vosk-browser-ts">こちら。</a>
            </p>
            <p className="front-description-strong">使ってみてコーヒーくらいならごちそうしてもいいかなという人はこちらからご支援お願いします。 </p>
            <p>
                <a href="https://www.buymeacoffee.com/wokad">
                    <img className="front-description-img" src="./assets/img/coffee.png"></img>
                </a>
            </p>
        </div>
    );
};

const FrontPageDescriptionEn = () => {
    return (
        <div className="front-description">
            <p>
                Transskribu vochon per via krozilo!
            </p>
            <p>
                Chi tiu aplikajho funkcias per krozilo, kaj ne estas necese, instali dedichitan aplikajhon. Krome, char neniu komunikado kun la servilo okazas post shargo, ne estas necese, zorgi pri komunika shargo.
            </p>
            <p>
                Uzado kaj fontkodo estas en <a href="https://github.com/AndreasKueck/vosk-krozilo-01">tiu deponejo</a>.
            </p>
            <p>
                Tio chi estas adapto kreita surbaze de la originalo publikigita en <a href="https://github.com/w-okada/vosk-browser-ts">tiu deponejo</a> de <a href="https://github.com/w-okada">w-okada</a>.
            </p>
        </div>
    );
};

// 免責
const FrontPageDisclaimerJp = () => {
    return (
        <div className="front-disclaimer">免責：本ソフトウェアの使用または使用不能により生じたいかなる直接損害・間接損害・波及的損害・結果的損害 または特別損害についても、一切責任を負いません。</div>
    );
};
const FrontPageDisclaimerEn = () => {
    return (
        <div className="front-disclaimer">Malgarantio: En neniu okazo ni respondecas pri iuj rektaj, nerektaj, sekvaj, malutilaj au specialaj difektoj rezultantaj de la uzo de chi tiun programaro au malkapablo ghin uzi.</div>
    );
};

// Note
const FrontPageNoteJp = () => {
    return (
        <div className="front-description">
            <p>このアプリケーションは <a href="https://github.com/ccoreilly/vosk-browser">vosk-browser</a>を使用しています</p>
        </div>
    );
};
const FrontPageNoteEn = () => {
    return (
        <p>Tiu chi programaro uzas <a href="https://github.com/ccoreilly/vosk-browser">vosk-browser</a>.</p>
    );
};


const AppRootStateProviderWrapper = () => {
    const { applicationSettingState, deviceManagerState } = useAppSetting();
    const [firstTach, setFirstTouch] = React.useState<boolean>(false);
    const lang = window.navigator.language.toLocaleUpperCase();
    const description = lang.includes("JA") ? <FrontPageDescriptionJp /> : <FrontPageDescriptionEn />
    const disclaimer = lang.includes("JA") ? <FrontPageDisclaimerJp /> : <FrontPageDisclaimerEn />
    const note = lang.includes("JA") ? <FrontPageNoteJp /> : <FrontPageNoteEn />

    if (!applicationSettingState.applicationSetting || !firstTach) {

        return (
            <div className="front-container">
                <div className="front-title">Eksterrete transskribi</div>

                {description}

                <div
                    className="front-start-button"
                    onClick={() => {
                        setFirstTouch(true);
                    }}
                >
                    Klaki por komenci
                </div>
                <div className="front-note">Provitaj: Windows 11 + Chrome</div>

                {disclaimer}

                {note}

            </div>
        );
    } else if (deviceManagerState.audioInputDevices.length === 0) {
        return (
            <>
                <div className="start-button">Sharganta disponajhojn...</div>
            </>
        );
    } else {
        return (
            <AppRootStateProvider>
                <AppStateProviderWrapper></AppStateProviderWrapper>
            </AppRootStateProvider>
        );
    }
};

const container = document.getElementById("app")!;
const root = createRoot(container);
root.render(
    <AppSettingProvider>
        <AppRootStateProviderWrapper></AppRootStateProviderWrapper>
    </AppSettingProvider>
);
