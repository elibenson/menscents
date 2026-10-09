/* Drop affiliate IDs here when accounts are approved. Empty string = clean retailer link. */
window.AFFILIATES = {
  amazon: "",
  scentsplit: "",
  fragrancex: "",
  dossier: ""
};

window.OFFERS = {
  sauvageSample: { href: "https://www.scentsplit.com/search?q=dior+sauvage+eau+de+parfum", merchant: "scentsplit" },
  sauvageBottle: { href: "https://www.amazon.com/dp/B079TQS99Q", merchant: "amazon" },
  sauvageClone: { href: "https://www.amazon.com/dp/B0B8TQ7YRW", merchant: "amazon" },
  bleuSample: { href: "https://www.scentsplit.com/search?q=bleu+de+chanel+eau+de+parfum", merchant: "scentsplit" },
  bleuBottle: { href: "https://www.amazon.com/dp/B00NAH3GNI", merchant: "amazon" },
  bleuClone: { href: "https://dossier.co/", merchant: "dossier" },
  ySample: { href: "https://www.scentsplit.com/search?q=ysl+y+eau+de+parfum", merchant: "scentsplit" },
  yBottle: { href: "https://www.amazon.com/dp/B0GQ59V2FL", merchant: "amazon" },
  yClone: { href: "https://www.amazon.com/s?k=YSL+Y+clone+men+cologne", merchant: "amazon" },
  asad: { href: "https://www.amazon.com/dp/B0B8TQ7YRW", merchant: "amazon" },
  cdnim: { href: "https://www.amazon.com/dp/B07XFSH553", merchant: "amazon" },
  set: { href: "https://www.scentsplit.com/", merchant: "scentsplit" },
  fragrancexBleu: { href: "https://www.fragrancex.com/products/_cid_cologne-am-lid_c-am-lid_c__brands_chanel-am-lid_b-am-lid_b__s_bleu+de+chanel.html", merchant: "fragrancex" }
};

function withTag(offer) {
  const id = (window.AFFILIATES && window.AFFILIATES[offer.merchant]) || "";
  if (!id) return offer.href;
  const join = offer.href.includes("?") ? "&" : "?";
  if (offer.merchant === "amazon") return offer.href + join + "tag=" + encodeURIComponent(id);
  return offer.href + join + "aff=" + encodeURIComponent(id);
}

document.querySelectorAll("[data-offer]").forEach((el) => {
  const offer = window.OFFERS[el.dataset.offer];
  if (!offer) return;
  el.href = withTag(offer);
  el.target = "_blank";
  el.rel = "noopener";
});
