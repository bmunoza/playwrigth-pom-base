# Playwright + TypeScript (POM) – Proyecto Base

Proyecto base para practicar **Playwright** con **TypeScript** usando **Page Object Model (POM)**.

## Requisitos
- Node.js 18+ (recomendado)
- npm (incluido con Node)

## Instalación
```bash
npm install
npx playwright install
```

## Ejecutar pruebas
```bash
npm test
```

### Ejecutar en modo headed
```bash
npm run test:headed
```

### Abrir el reporte HTML
```bash
npm run report
```

## Estructura
- `src/pages/` → Page Objects (POM)
- `src/tests/` → Specs / tests
- `src/utils/` → utilidades (opcional)

## Configuración
Por defecto usa `https://www.google.com` como `baseURL`.
Puedes cambiarlo así:

**Windows PowerShell**
```powershell
$env:BASE_URL="https://example.com"; npm test
```

**macOS/Linux**
```bash
BASE_URL=https://example.com npm test
```
