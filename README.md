# Projekt: Diving School

Eine Full-Stack Web-Anwendung als privates Lernprojekt mit modernem Next.js (App Router).  
Fokus: saubere Architektur, Typsicherheit (TypeScript + Zod), persistente Daten (PostgreSQL + Prisma) und ein späteres Production-Setup auf einer Linux-VM (Nginx + SSL + Node LTS).

> Status: **WIP / Learning Project** (nicht für Produktion gedacht – Deployment/Hardening folgt später)

---

## Projektziele

- Entwurf und Umsetzung einer sauberen Full-Stack-Architektur mit Next.js (App Router)
- Konsequente End-to-End-Typsicherheit mit TypeScript, Zod und Prisma
- Strukturierte Trennung von Präsentation, Business-Logik und Datenzugriff
- Arbeit mit relationalen Datenbanken (PostgreSQL) inkl. Migrations-Workflow
- Vorbereitung eines produktionsnahen Deployments (Linux VM, Nginx, SSL)
- Vertiefung von Software-Engineering-Prinzipien wie Wartbarkeit und Skalierbarkeit

---

## Tech-Stack

### Frontend
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS oder CSS Modules

### Backend
- Next.js Server (Route Handlers / API Routes)
- PostgreSQL
- Prisma ORM
- Zod (Request- & Datenvalidierung)

### Infrastruktur (Roadmap / produktionsnah)
- Linux Virtual Machine
- Nginx als Reverse Proxy inkl. SSL
- Node.js (LTS)
- PM2 oder systemd
- PostgreSQL auf der VM

## Features (aktueller Stand)

- [ ] Grundlayout + Navigation
- [ ] Datenbankanbindung (PostgreSQL)
- [ ] Prisma Schema + Migrationen
- [ ] CRUD-Funktionalität für zentrale Domänenobjekte
- [ ] Zod-Validierung für Requests/Responses
- [ ] UI: Listen/Detailseiten/Formulare
- [ ] Error-Handling (API + UI)
- [ ] Auth (optional)
- [ ] Deployment (Nginx + SSL + PM2/systemd) (später)

---

## Architektur-Überblick

- Frontend und Backend sind über den Next.js App Router integriert
- API-Routen kapseln Business-Logik und Validierung
- Datenbankzugriff erfolgt ausschließlich über Prisma
- Zod-Schemas werden zentral definiert und wiederverwendet
- Fokus auf klare Zuständigkeiten und nachvollziehbare Ordnerstruktur

