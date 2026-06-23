# Vital Hixhama Fier — Website

Faqe interneti për klinikën e terapisë me kupa (hixhame) **Vital Hixhama Fier**, Fier, Shqipëri.

Faqe statike (HTML / CSS / JavaScript), pa varësi nga ndonjë framework — hapet direkt në çdo shfletues.

## Struktura

```
index.html        # Faqja kryesore (një faqe, me seksione)
styles.css        # Stilet dhe paleta e ngjyrave të brandit
script.js         # Menyja mobile, animacionet, formulari i rezervimit
assets/
  logo.svg        # Logoja (rikrijim në SVG i konceptit kupë + dorë + "Vital")
  favicon.svg     # Ikona e faqes
```

## Seksionet
- **Hyrje (Hero)** — prezantimi dhe thirrja për rezervim
- **Çfarë është Hixhama** — shpjegim + dy llojet (e thatë / e lagësht)
- **Shërbimet** — kartat e shërbimeve
- **Përfitimet** — pse të zgjedhësh hixhamen
- **Çmimet** — paketat orientuese
- **Rezervo / Kontakti** — formular që dërgon kërkesën në WhatsApp

## Si ta personalizosh

1. **Numri i telefonit / WhatsApp** — ndrysho `CONFIG.phone` te `script.js`
   (formati ndërkombëtar pa `+`, p.sh. `355691234567`). Përditëso edhe numrin
   te seksioni i kontaktit në `index.html`.
2. **Email & adresa** — te seksioni `#kontakti` në `index.html`.
3. **Çmimet** — te seksioni `#cmimet` në `index.html`.
4. **Rrjetet sociale** — vendos lidhjet reale te footer-i (Instagram / Facebook).
5. **Logoja** — zëvendëso `assets/logo.svg` me logon origjinale
   (PNG ose SVG), duke ruajtur të njëjtin emër ose duke përditësuar referencat.

## Shfaqja lokale

Thjesht hap `index.html` në shfletues, ose:

```bash
python3 -m http.server 8000
# pastaj hap http://localhost:8000
```

## Vërejtje
Përmbajtja ka qëllim informues dhe nuk zëvendëson këshillën mjekësore profesionale.
