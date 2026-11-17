const { instagram, whatsapp, gtm } = window.smhConfig;
const dataLayer = (window.dataLayer ||= []);
const consentKey = "smh-consent-v1";
const validTag = /^GTM-[A-Z0-9]+$/.test(gtm);
const dialog = document.querySelector("#privacy");
const options = dialog.querySelector("form").elements;
const preferences = document.querySelector("#preferences");
const messages = {
  patrocinador: "Olá! Quero avaliar oportunidades de patrocínio esportivo. Minha marca é ___ e queremos alcançar ___ na região de ___.",
  organizador: "Olá! Quero apresentar meu evento esportivo. O evento é ___, em ___, na data ___ e esperamos receber ___ pessoas."
};

function track() {
  dataLayer.push(arguments);
}

function updateConsent(consent) {
  track("consent", "update", {
    analytics_storage: consent.analytics ? "granted" : "denied",
    ad_storage: consent.marketing ? "granted" : "denied",
    ad_user_data: consent.marketing ? "granted" : "denied",
    ad_personalization: consent.marketing ? "granted" : "denied"
  });
  dataLayer.push({
    event: "smh_consent_updated",
    smh_analytics: consent.analytics,
    smh_marketing: consent.marketing
  });
  if (!document.querySelector("#smh-gtm") && (consent.analytics || consent.marketing)) {
    dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    const script = document.createElement("script");
    script.id = "smh-gtm";
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtm.js?id=" + gtm;
    document.head.append(script);
  }
}

if (validTag) {
  track("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied"
  });
  const saved = localStorage.getItem(consentKey);
  if (saved) {
    const consent = JSON.parse(saved);
    options.analytics.checked = consent.analytics;
    options.marketing.checked = consent.marketing;
    updateConsent(consent);
  } else {
    dialog.showModal();
  }
  preferences.hidden = false;
  preferences.addEventListener("click", () => {
    dialog.returnValue = "";
    dialog.showModal();
  });
  dialog.addEventListener("close", () => {
    if (!["save", "reject"].includes(dialog.returnValue)) return;
    const previous = JSON.parse(localStorage.getItem(consentKey) || "{}");
    const consent = {
      analytics: dialog.returnValue === "save" && options.analytics.checked,
      marketing: dialog.returnValue === "save" && options.marketing.checked
    };
    options.analytics.checked = consent.analytics;
    options.marketing.checked = consent.marketing;
    localStorage.setItem(consentKey, JSON.stringify(consent));
    if ((previous.analytics && !consent.analytics) || (previous.marketing && !consent.marketing)) {
      window.location.reload();
      return;
    }
    updateConsent(consent);
  });
}

if (/^[a-zA-Z0-9._]{1,30}$/.test(instagram)) {
  const link = document.querySelector("#instagram");
  link.href = "https://www.instagram.com/" + instagram + "/";
  link.hidden = false;
}

const phone = whatsapp.replace(/\D/g, "");
const validPhone = /^[1-9]\d{7,14}$/.test(phone);
document.querySelector("#contact-status").hidden = validPhone;

if (validPhone) {
  for (const link of document.querySelectorAll("[data-whatsapp]")) {
    const profile = link.dataset.whatsapp;
    link.href = "https://wa.me/" + phone + "?text=" + encodeURIComponent(messages[profile]);
    link.target = "_blank";
    link.rel = "noopener";
    link.hidden = false;
    link.addEventListener("click", () => dataLayer.push({ event: "whatsapp_click", profile }));
  }
}

