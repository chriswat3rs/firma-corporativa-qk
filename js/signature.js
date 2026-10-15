/* ==========================================================================
   GENERADOR DE LA FIRMA
   Construye el HTML de la firma a partir de los datos del colaborador.
   Usa tablas y estilos en línea porque es lo único que los clientes de
   correo (sobre todo Outlook) respetan de forma consistente.
   ========================================================================== */

const FONT_FAMILY = "'Segoe UI',Arial,Helvetica,sans-serif";

/** Escapa texto del usuario para insertarlo en HTML sin romper la firma. */
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Deja solo dígitos (y opcionalmente el signo +) de un teléfono. */
function digitsOnly(value, keepPlus) {
  return String(value).replace(keepPlus ? /[^0-9+]/g : /[^0-9]/g, "");
}

/** URL absoluta y pública de una imagen de assets/img. */
function assetUrl(path) {
  const isWeb = /^https?:$/.test(window.location.protocol);
  return new URL(path, isWeb ? document.baseURI : CONFIG.publicBaseUrl).href;
}

/** Fila de texto (teléfono, correo…). */
function textRow(inner) {
  return `<tr><td style="font-family:${FONT_FAMILY};font-size:14px;line-height:20px;white-space:nowrap;color:${CONFIG.cLink};">${inner}</td></tr>`;
}

/** Enlace con icono pequeño a la izquierda del texto. */
function iconLink(href, icon, w, h, text) {
  return `<a href="${href}" style="color:${CONFIG.cLink};text-decoration:none;white-space:nowrap;"><img src="${assetUrl(icon)}" width="${w}" height="${h}" alt="" style="display:inline-block;vertical-align:middle;border:0;margin:0 5px 2px 0;">${text}</a>`;
}

/** Celda con icono de red social. */
function socialCell(href, icon, alt) {
  return `<td style="padding:0 6px 0 0;"><a href="${href}" style="text-decoration:none;"><img src="${assetUrl(icon)}" width="${CONFIG.iconSize}" height="${CONFIG.iconSize}" alt="${alt}" style="display:block;border:0;outline:none;"></a></td>`;
}

/**
 * Devuelve el HTML completo de la firma.
 * @param {{nombre:string, puesto:string, area:string, correo:string,
 *          telPersonal:string, waNumero:string}} d
 */
function buildSignature(d) {
  const img = CONFIG.images;
  const nombre = escapeHtml(d.nombre);
  const puesto = escapeHtml(d.puesto);
  const area   = escapeHtml(d.area);
  const correo = (d.correo || CONFIG.correoDefault).trim();

  const telPersonalRow = d.telPersonal
    ? textRow(iconLink(`tel:${digitsOnly(d.telPersonal, true)}`, img.phone, 14, 14, escapeHtml(d.telPersonal)))
    : "";

  const telQKRow = textRow(
    iconLink(`tel:${digitsOnly(CONFIG.telefonoQK, true)}`, img.phone, 14, 14, escapeHtml(CONFIG.telefonoQK))
  );

  const correoRow = correo
    ? textRow(iconLink(`mailto:${escapeHtml(correo)}`, img.email, 16, 12, escapeHtml(correo)))
    : "";

  const whatsappCell = d.waNumero
    ? socialCell(`https://wa.me/${digitsOnly(d.waNumero)}`, img.whatsapp, "WhatsApp")
    : "";

  return `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="${CONFIG.sigWidth}" style="border-collapse:collapse;width:${CONFIG.sigWidth}px;max-width:100%;font-family:${FONT_FAMILY};background:transparent;">
  <tr>
    <td style="padding:0;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;"><tr>
        <td valign="middle" style="padding:0 26px 0 0;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
            <tr><td style="font-family:${FONT_FAMILY};font-size:21px;font-weight:600;color:${CONFIG.cName};line-height:25px;padding:0 0 5px;white-space:nowrap;">${nombre}</td></tr>
            <tr><td style="font-family:${FONT_FAMILY};font-size:15px;font-weight:600;color:${CONFIG.cRole};line-height:19px;padding:0 0 3px;white-space:nowrap;">${puesto}</td></tr>
            <tr><td style="font-family:${FONT_FAMILY};font-size:14px;color:${CONFIG.cSub};line-height:18px;padding:0 0 13px;white-space:nowrap;">${area}</td></tr>
            ${telPersonalRow}
            ${telQKRow}
            ${correoRow}
            <tr><td style="padding:4px 0 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;"><tr>
                ${socialCell(CONFIG.webUrl, img.website, "Sitio web")}
                ${socialCell(CONFIG.linkedin, img.linkedin, "LinkedIn")}
                ${socialCell(CONFIG.youtube, img.youtube, "YouTube")}
                ${whatsappCell}
              </tr></table>
            </td></tr>
          </table>
        </td>
        <td valign="middle" style="padding:0 0 0 26px;border-left:1px solid ${CONFIG.cSep};">
          <img src="${assetUrl(img.logo)}" width="${CONFIG.logoW}" height="${CONFIG.logoH}" alt="Quality &amp; Knowledge" style="display:block;border:0;outline:none;text-decoration:none;">
        </td>
      </tr></table>
    </td>
  </tr>
</table>`.trim();
}
