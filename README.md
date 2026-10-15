# Firma Corporativa Oficial · Quality & Knowledge

Herramienta web para que cada colaborador genere su firma de correo institucional
y la pegue en **Outlook, Gmail o Apple Mail**.

**Usar la herramienta:** https://chriswat3rs.github.io/firma-corporativa-qk/

## Cómo se usa

1. Abre la página y llena tus datos (nombre, puesto, área, correo y, si quieres, teléfono personal).
2. Opcional: marca **Agregar WhatsApp a la firma** y escribe tu número.
   Si lo dejas vacío se usa el teléfono de Q&K.
3. Revisa la vista previa y pulsa **Copiar firma (HTML)**.
4. Pégala en la configuración de firma de tu cliente de correo.

## Estructura del proyecto

```
firma-corporativa-qk/
├── index.html          Estructura de la página (formulario + vista previa)
├── css/
│   └── styles.css      Estilos de la herramienta
├── js/
│   ├── config.js       Datos de la empresa, enlaces, imágenes, medidas y colores
│   ├── signature.js    Genera el HTML de la firma (tablas + estilos en línea)
│   └── app.js          Conecta el formulario, la vista previa y el botón de copiar
└── assets/img/         Logo animado e iconos que usa la firma
```

## Cambios frecuentes

Casi todo se cambia en **`js/config.js`**:

| Quiero cambiar…                    | Dónde                                   |
| ---------------------------------- | --------------------------------------- |
| Teléfono de Q&K                    | `telefonoQK`                            |
| Sitio web, LinkedIn o YouTube      | `webUrl`, `linkedin`, `youtube`         |
| Colores del nombre, puesto, etc.   | `cName`, `cRole`, `cSub`, `cLink`, `cSep` |
| Tamaño del logo o de los iconos    | `logoW`, `logoH`, `iconSize`            |
| Logo o iconos                      | Reemplaza el archivo en `assets/img/` con el mismo nombre |

## Sobre las imágenes

Los clientes de correo necesitan que las imágenes estén en una **URL pública**
(Outlook de escritorio no muestra imágenes en base64). Por eso el logo y los
iconos viven en `assets/img/` y la firma copiada apunta a su dirección en
GitHub Pages. Si mueves la página a otro dominio, actualiza `publicBaseUrl`
en `js/config.js`.

El GIF del logo se anima en Gmail, Apple Mail y Outlook Web. Outlook de
escritorio muestra solo el primer cuadro, que ya es el logo completo.

## Insertar en WordPress (iframe)

Pega esto en un bloque **HTML personalizado** (Gutenberg) o en un widget **HTML** (Elementor).
El script ajusta la altura del iframe al contenido, así no aparecen barras de scroll.

```html
<iframe id="qk-firma"
  src="https://chriswat3rs.github.io/firma-corporativa-qk/"
  title="Generador de firma corporativa Quality &amp; Knowledge"
  style="width:100%;height:760px;border:0;display:block;"
  loading="lazy"
  allow="clipboard-write"></iframe>
<script>
  window.addEventListener("message", function (e) {
    if (e.origin !== "https://chriswat3rs.github.io" || !e.data || e.data.type !== "qk-firma:height") return;
    document.getElementById("qk-firma").style.height = e.data.height + "px";
  });
</script>
```

`allow="clipboard-write"` es necesario para que el botón **Copiar firma** funcione dentro del iframe.

## Publicación

El sitio se publica con **GitHub Pages** desde la rama `main` (carpeta raíz).
Cada cambio que se sube a `main` se refleja en la página en uno o dos minutos.

Para probarlo en tu computadora basta con abrir `index.html` en el navegador.
