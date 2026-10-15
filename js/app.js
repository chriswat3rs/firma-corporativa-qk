/* ==========================================================================
   INTERFAZ
   Conecta el formulario con la vista previa y el botón de copiar.
   ========================================================================== */

(function () {
  const $ = (id) => document.getElementById(id);

  const TEXT_FIELDS = ["nombre", "puesto", "area", "correo", "telPersonal", "waNumero"];
  const PLACEHOLDERS = { nombre: "Nombre y Apellido", puesto: "Puesto", area: "Área" };

  /** Lee el formulario y devuelve los datos para la firma. */
  function currentData() {
    const value = (id) => $(id).value.trim();
    const waTyped = value("waNumero");

    return {
      nombre:      value("nombre") || PLACEHOLDERS.nombre,
      puesto:      value("puesto") || PLACEHOLDERS.puesto,
      area:        value("area")   || PLACEHOLDERS.area,
      correo:      value("correo"),
      telPersonal: value("telPersonal"),
      // Si se activa WhatsApp sin escribir número, se usa el teléfono de Q&K
      waNumero:    $("waEnable").checked ? (waTyped || CONFIG.telefonoQK) : ""
    };
  }

  /** Pinta la firma en la vista previa. */
  function render() {
    $("stage").innerHTML = buildSignature(currentData());
  }

  /** Muestra un aviso breve en la parte inferior. */
  let toastTimer;
  function toast(message) {
    const el = $("toast");
    el.textContent = message;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 1900);
  }

  /** Copia la firma como HTML enriquecido (con texto plano de respaldo). */
  async function copySignature() {
    const html = buildSignature(currentData());
    const plain = $("stage").innerText;

    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html":  new Blob([html],  { type: "text/html" }),
          "text/plain": new Blob([plain], { type: "text/plain" })
        })
      ]);
    } catch (err) {
      // Respaldo para navegadores sin ClipboardItem: seleccionar y copiar
      const range = document.createRange();
      range.selectNode($("stage"));
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand("copy");
      selection.removeAllRanges();
    }
    toast("Firma HTML copiada");
  }

  /* ---------- Eventos ---------- */
  TEXT_FIELDS.forEach((id) => $(id).addEventListener("input", render));

  $("waEnable").addEventListener("change", () => {
    $("waField").hidden = !$("waEnable").checked;
    render();
  });

  $("copyRich").addEventListener("click", copySignature);

  render();

  /* ---------- Altura automática cuando la página está dentro de un iframe ----------
     Avisa a la página contenedora (p. ej. WordPress) cuánto mide el contenido,
     para que el iframe se ajuste sin barras de scroll. Ver README. */
  if (window.parent !== window) {
    const sendHeight = () => {
      const height = Math.ceil(document.body.getBoundingClientRect().height);
      window.parent.postMessage({ type: "qk-firma:height", height }, "*");
    };
    new ResizeObserver(sendHeight).observe(document.body);
    window.addEventListener("load", sendHeight);
  }
})();
