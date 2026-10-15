/* ==========================================================================
   CONFIGURACIÓN DE LA FIRMA
   Edita este archivo para cambiar datos de contacto, enlaces, imágenes
   o colores. No hace falta tocar el resto del código.
   ========================================================================== */

const CONFIG = {
  /* ---------- Datos de la empresa ---------- */
  telefonoQK:    "+52 55 5574 6574",   // Teléfono fijo de Q&K
  correoDefault: "",                   // Correo por defecto si el colaborador no escribe uno
  webUrl:        "https://qacg.com/",
  linkedin:      "https://www.linkedin.com/company/quality-%26-knowledge-on-it-services",
  youtube:       "https://www.youtube.com/@qualityknowledgeonitservic7626",

  /* ---------- Imágenes ----------
     Outlook, Gmail y Apple Mail necesitan imágenes en una URL pública
     (no leen base64 ni archivos locales). Por eso las imágenes viven en
     assets/img/ y la firma usa su URL absoluta:
       · Si la página se abre desde internet (GitHub Pages), se usa esa URL.
       · Si se abre como archivo local, se usa publicBaseUrl.
     El GIF solo anima en Gmail, Apple Mail y Outlook Web; Outlook Desktop
     muestra el primer cuadro (que ya es el logo completo). */
  publicBaseUrl: "https://chriswat3rs.github.io/firma-corporativa-qk/",
  images: {
    logo:     "assets/img/logo-qk.gif",
    phone:    "assets/img/icon-phone.png",
    email:    "assets/img/icon-email.png",
    website:  "assets/img/icon-website.png",
    linkedin: "assets/img/icon-linkedin.png",
    youtube:  "assets/img/icon-youtube.png",
    whatsapp: "assets/img/icon-whatsapp.png"
  },

  /* ---------- Medidas (px) ---------- */
  logoW:    260,
  logoH:    52,
  iconSize: 18,
  sigWidth: 600,

  /* ---------- Colores ---------- */
  cName: "#1F2937",   // Nombre
  cRole: "#0098E5",   // Puesto
  cSub:  "#5B6575",   // Área
  cLink: "#5B6575",   // Teléfonos y correo
  cSep:  "#DDE5ED"    // Línea separadora junto al logo
};
