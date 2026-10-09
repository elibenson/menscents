window.MENSCENTS = {
  amazonTag: "",
  disclosure: "Menscents may earn a commission if you buy through a link. The retailer ships the order. We do not."
};

const sets = {
  office: ["For the office", "Bleu de Chanel, a clean musk, and a $28 version that's close enough. Three small vials before a full bottle."],
  night: ["For after dark", "Sauvage, a warmer amber, and a cheaper bottle in the same lane. Wear them on different nights."],
  heat: ["For hot weather", "A citrus, a clean aquatic, and a light cheaper version. Two sprays. Then stop."],
  gift: ["If he already owns Sauvage", "Bleu de Chanel, a barbershop classic, and a $40 bottle that isn't another blue flanker."]
};

document.addEventListener("click", (e) => {
  const btn = e.target.closest("#opts button");
  if (!btn) return;
  document.querySelectorAll("#opts button").forEach((b) => b.classList.remove("on"));
  btn.classList.add("on");
  const [title, body] = sets[btn.dataset.key];
  const box = document.getElementById("result");
  box.innerHTML = `<div class="kicker">Your set</div><h3>${title}</h3><p>${body}</p>` + box.querySelector("form").outerHTML;
});

document.addEventListener("submit", (e) => {
  const form = e.target.closest("form.capture");
  if (!form) return;
  e.preventDefault();
  const email = new FormData(form).get("email");
  if (!email || !String(email).includes("@")) return;
  const key = "menscents-leads";
  const leads = JSON.parse(localStorage.getItem(key) || "[]");
  leads.push({ email: String(email), at: new Date().toISOString(), set: document.querySelector("#result h3")?.textContent || "desk" });
  localStorage.setItem(key, JSON.stringify(leads));
  const toast = form.parentElement.querySelector(".toast") || form.nextElementSibling;
  if (toast) toast.textContent = "Got it. We'll send the set.";
  form.reset();
});
