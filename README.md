# Lona Health and Beauty Clinic — Website

Faqe interneti për **Lona Health and Beauty Clinic**, Fier, Shqipëri — klinikë shëndeti
dhe bukurie që ofron **masazhe** (relaksuese & terapeutike), **hixhame** (terapi me kupa)
dhe **trajtime bukurie**.

Faqe statike (HTML / CSS / JavaScript), pa varësi nga ndonjë framework — hapet direkt në çdo shfletues.

## Struktura

```
index.html        # Faqja kryesore (një faqe, me seksione)
styles.css        # Stilet dhe paleta e ngjyrave (dy nuanca lejla)
script.js         # Menyja mobile, animacionet, formulari i rezervimit
assets/
  favicon.svg     # Ikona e faqes (shkronja "L" në lejla)
  logo.png        # Logoja e Lona Health and Beauty Clinic
robots.txt        # Udhëzime për motorët e kërkimit
sitemap.xml       # Sitemap-i i faqes së vetme
```

Logoja reale e klinikës përdoret në header dhe footer. Faviconi është ikonë e thjeshtë
me shkronjën "L".

## Seksionet
- **Hyrje (Hero)** — fokus te "masazhe në Fier" + thirrja për rezervim
- **Rreth Nesh** — prezantimi i klinikës (masazh & hixhame)
- **Shërbimet** — masazh relaksues, masazh terapeutik, hixhame, trajtime bukurie
- **Përfitimet** — pse një masazh
- **Çmimet** — paketat orientuese
- **Rezervo / Kontakti** — formular që dërgon kërkesën në WhatsApp

## SEO
- Fokus te fjalëkyçi **"masazhe Fier"** (titull, meta description, keywords, H1 dhe përmbajtje)
- Të dhëna të strukturuara **JSON-LD `HealthAndBeautyBusiness`** me `areaServed: Fier` dhe shërbimet
- `lang="sq"`, Open Graph për shpërndarje në rrjete sociale
- `robots.txt` dhe `sitemap.xml` për indeksimin e faqes së vetme

## Paleta e ngjyrave (dy nuanca lejla)
- `--lilac-light: #c9a7e8` (lejla e lehtë)
- `--lilac-dark: #5b3a86` (lejla e errët)

Të dyja ndryshohen te `:root` në fillim të `styles.css`.

## Si ta personalizosh
1. **Numri WhatsApp/telefon** — `CONFIG.phone` te `script.js` (format pa `+`, p.sh. `355691234567`); përditëso edhe te `#kontakti` në `index.html`.
2. **Email & adresa** — te seksioni `#kontakti`.
3. **Çmimet** — te seksioni `#cmimet`.
4. **Rrjetet sociale** — linket te footer-i.
5. **Adresa e saktë** — përditëso edhe te blloku JSON-LD në `<head>`.
6. **Domaini** — kur të caktohet, vendos URL-në përfundimtare te `<loc>` në `sitemap.xml`
   (hiq komentet), shto rreshtin `Sitemap:` në `robots.txt` dhe plotëso canonical/URL-të
   absolute të SEO metadata në `index.html`.

## Shfaqja lokale
Hape me një server lokal (p.sh. **Live Server** në VS Code), ose:

```bash
python3 -m http.server 8000
# pastaj hap http://localhost:8000
```

## Vërejtje
Përmbajtja ka qëllim informues dhe nuk zëvendëson këshillën mjekësore profesionale.
