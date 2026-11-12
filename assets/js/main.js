/* Thiago Rocha — interações */
(function () {
  "use strict";
  var WHATSAPP = "5582993753996";
  var root = document.documentElement;
  requestAnimationFrame(function () { requestAnimationFrame(function () { root.classList.add("ready"); }); });

  document.querySelectorAll("[data-wa]").forEach(function (a) {
    a.href = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(a.getAttribute("data-wa"));
  });

  var top = document.getElementById("top"), wa = document.querySelector(".wa");
  function onScroll() { var y = window.scrollY; top.classList.toggle("is-solid", y > 30); wa.classList.toggle("is-visible", y > window.innerHeight * 0.7); }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  var els = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (en) { en.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } }); }, { rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { io.observe(el); });
  } else { els.forEach(function (el) { el.classList.add("is-in"); }); }

  var form = document.getElementById("form"), status = form.querySelector(".form__status");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var nome = form.nome.value.trim(), field = form.nome.closest(".field");
    if (nome.length < 2) { field.classList.add("is-invalid"); status.textContent = "Escreva o seu nome para continuar."; form.nome.focus(); return; }
    field.classList.remove("is-invalid");
    var lines = ["Olá, Thiago! Vim pelo site.", "", "*Nome:* " + nome, "*Quero:* " + form.tipo.value];
    if (form.detalhe.value.trim()) lines.push("*Procuro:* " + form.detalhe.value.trim());
    status.textContent = "Abrindo o WhatsApp com a sua mensagem…";
    window.open("https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(lines.join("\n")), "_blank", "noopener");
  });

  var y = document.getElementById("y"); if (y) y.textContent = new Date().getFullYear();
})();
