# 🎵 Radio App - Streaming de Radio Mundial

<div align="center">

![Angular](https://img.shields.io/badge/Angular-16.2.0-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.1.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-2.0.0-blue?style=for-the-badge)

**Aplicación web moderna para escuchar estaciones de radio en vivo de todo el mundo** 🌍

[Demo en Vivo](#) · [Reportar Bug](https://github.com/NaktoG/radio-app/issues) · [Solicitar Característica](https://github.com/NaktoG/radio-app/issues)

</div>

---

## 📑 Tabla de Contenidos

- [Características](#-características)
- [Capturas de Pantalla](#-capturas-de-pantalla)
- [Tecnologías](#-tecnologías)
- [Arquitectura](#-arquitectura)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Mejores Prácticas Implementadas](#-mejores-prácticas-implementadas)
- [Seguridad](#-seguridad)
- [API](#-api)
- [Roadmap](#-roadmap)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)
- [Contacto](#-contacto)

---

## ✨ Características

### 🎯 Funcionalidades Principales

- **🌐 Acceso Global**: Miles de estaciones de radio de más de 190 países
- **🔍 Búsqueda Avanzada**: Encuentra estaciones por nombre, país, género o idioma
- **🎨 Diseño Moderno**: Interfaz intuitiva y responsive con Tailwind CSS
- **🔐 Sistema de Autenticación**: Login y registro de usuarios (sin datos sensibles)
- **⭐ Favoritos**: Guarda tus estaciones preferidas
- **📱 Responsive Design**: Optimizado para desktop, tablet y móvil
- **♿ Accesibilidad**: Cumple con estándares de accesibilidad (a11y)
- **🎵 Reproductor Integrado**: Control de volumen y gestión de reproducción

### 📄 Páginas Incluidas

- ✅ **Home**: Página principal con presentación de características
- ✅ **Reproductor**: Interfaz principal de reproducción con lista de estaciones
- ✅ **Buscador**: Herramienta avanzada de búsqueda de radios
- ✅ **Login/Registro**: Sistema completo de autenticación
- ✅ **404 Personalizado**: Página de error elegante y útil
- ✅ **Términos y Condiciones**: Documentación legal completa
- ✅ **Política de Privacidad**: Transparencia en el manejo de datos
- ✅ **FAQ**: Preguntas frecuentes con respuestas detalladas

---

## 📸 Capturas de Pantalla

### Página Principal
<div align="center">
<img src="docs/screenshots/home.png" alt="Página Principal" width="800">
</div>

### Reproductor de Radio
<div align="center">
<img src="docs/screenshots/player.png" alt="Reproductor" width="800">
</div>

### Buscador
<div align="center">
<img src="docs/screenshots/search.png" alt="Buscador" width="800">
</div>

---

## 🛠 Tecnologías

### Frontend Framework
- **Angular 16.2.0** - Framework principal
- **TypeScript 5.1.3** - Tipado estático
- **RxJS 7.8.0** - Programación reactiva

### Estilos
- **Tailwind CSS 3.4.0** - Framework de utilidades CSS
- **CSS3** - Animaciones y estilos custom

### Arquitectura y Patrones
- **Clean Architecture** - Separación clara de capas
- **SOLID Principles** - Principios de diseño orientado a objetos
- **Feature-Driven Development** - Organización por características
- **Lazy Loading** - Carga diferida de módulos
- **Dependency Injection** - Inyección de dependencias

### Herramientas de Desarrollo
- **Angular CLI 16.2.2** - Herramienta de línea de comandos
- **Compodoc** - Generación de documentación
- **Karma & Jasmine** - Testing

---

## 🏗 Arquitectura

### Estructura de Clean Architecture

```
src/app/
├── core/                    # Núcleo de la aplicación
│   ├── constants/          # Constantes globales
│   ├── enums/             # Enumeraciones
│   ├── guards/            # Guards de routing
│   └── interceptors/      # HTTP Interceptors
│
├── shared/                 # Módulo compartido
│   ├── components/        # Componentes reutilizables
│   ├── pipes/            # Pipes personalizados
│   ├── validators/       # Validadores custom
│   └── utils/            # Utilidades
│
└── features/              # Módulos de características
    ├── home/             # Página principal
    ├── auth/             # Autenticación
    ├── radio-player/     # Reproductor de radio
    ├── search/           # Buscador
    ├── legal/            # Páginas legales
    └── not-found/        # Página 404
```

### Principios SOLID Implementados

#### 1. **S**ingle Responsibility Principle
- Cada clase y módulo tiene una única responsabilidad
- Servicios especializados para cada dominio

#### 2. **O**pen/Closed Principle
- Código abierto a extensión, cerrado a modificación
- Uso de interfaces y abstracciones

#### 3. **L**iskov Substitution Principle
- Subtipos son reemplazables por sus tipos base
- Herencia correcta de componentes

#### 4. **I**nterface Segregation Principle
- Interfaces específicas para cada contexto
- No forzar dependencias innecesarias

#### 5. **D**ependency Inversion Principle
- Dependencias en abstracciones, no en concreciones
- Uso extensivo de Dependency Injection

---

## 🚀 Instalación

### Prerequisitos

- **Node.js** >= 18.19.0
- **npm** >= 9.0.0
- **Angular CLI** >= 16.2.0

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/NaktoG/radio-app.git
cd radio-app
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno** (opcional)
```bash
cp .env.example .env
# Editar .env con tus configuraciones
```

4. **Iniciar servidor de desarrollo**
```bash
npm start
```

5. **Abrir en el navegador**
```
http://localhost:4200
```

### Build de Producción

```bash
npm run build:prod
```

Los archivos compilados estarán en el directorio `dist/radio-app/`

---

## 💻 Uso

### Escuchar Radio

1. Accede a la aplicación en tu navegador
2. Navega a **"Explorar Estaciones"**
3. Selecciona un país y género
4. Haz clic en cualquier estación para comenzar a escuchar

### Buscar Estaciones

1. Ve a la sección **"Buscar"**
2. Ingresa nombre, país o género
3. Usa los filtros avanzados
4. Selecciona una estación de los resultados

### Crear Cuenta

1. Haz clic en **"Iniciar Sesión"**
2. Selecciona **"Regístrate"**
3. Completa el formulario
4. Acepta los términos y condiciones
5. ¡Comienza a usar todas las funciones!

### Guardar Favoritos

1. Inicia sesión en tu cuenta
2. Reproduce una estación
3. Haz clic en el icono de favorito
4. Accede a tus favoritos desde el menú

---

## 📁 Estructura del Proyecto

```
radio-app/
│
├── src/
│   ├── app/
│   │   ├── core/                 # Funcionalidades core
│   │   │   ├── constants/
│   │   │   │   └── api.constants.ts
│   │   │   ├── enums/
│   │   │   │   ├── auth.enum.ts
│   │   │   │   └── player.enum.ts
│   │   │   ├── guards/
│   │   │   │   └── auth.guard.ts
│   │   │   └── interceptors/
│   │   │       ├── http-error.interceptor.ts
│   │   │       └── security.interceptor.ts
│   │   │
│   │   ├── shared/               # Recursos compartidos
│   │   │   ├── components/
│   │   │   ├── pipes/
│   │   │   │   ├── safe-html.pipe.ts
│   │   │   │   └── truncate.pipe.ts
│   │   │   ├── validators/
│   │   │   │   └── custom.validators.ts
│   │   │   ├── utils/
│   │   │   │   ├── sanitizer.util.ts
│   │   │   │   ├── storage.util.ts
│   │   │   │   └── validator.util.ts
│   │   │   └── shared.module.ts
│   │   │
│   │   ├── features/             # Módulos de características
│   │   │   ├── home/
│   │   │   │   ├── components/
│   │   │   │   │   └── home/
│   │   │   │   └── home.module.ts
│   │   │   │
│   │   │   ├── auth/
│   │   │   │   ├── components/
│   │   │   │   │   ├── login/
│   │   │   │   │   └── register/
│   │   │   │   ├── services/
│   │   │   │   │   └── auth.service.ts
│   │   │   │   ├── models/
│   │   │   │   │   └── user.model.ts
│   │   │   │   ├── guards/
│   │   │   │   │   └── no-auth.guard.ts
│   │   │   │   └── auth.module.ts
│   │   │   │
│   │   │   ├── radio-player/
│   │   │   │   ├── components/
│   │   │   │   │   ├── radio-player/
│   │   │   │   │   ├── audio-player/
│   │   │   │   │   ├── station-list/
│   │   │   │   │   └── filter/
│   │   │   │   ├── services/
│   │   │   │   │   └── radio.service.ts
│   │   │   │   ├── models/
│   │   │   │   │   ├── radio.model.ts
│   │   │   │   │   └── player.model.ts
│   │   │   │   └── radio-player.module.ts
│   │   │   │
│   │   │   ├── search/
│   │   │   │   ├── components/
│   │   │   │   │   └── search/
│   │   │   │   └── search.module.ts
│   │   │   │
│   │   │   ├── legal/
│   │   │   │   ├── components/
│   │   │   │   │   ├── terms/
│   │   │   │   │   ├── privacy/
│   │   │   │   │   └── faq/
│   │   │   │   └── legal.module.ts
│   │   │   │
│   │   │   └── not-found/
│   │   │       ├── components/
│   │   │       │   └── not-found/
│   │   │       └── not-found.module.ts
│   │   │
│   │   ├── app-routing.module.ts
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.css
│   │   └── app.module.ts
│   │
│   ├── assets/                   # Recursos estáticos
│   ├── environments/             # Configuraciones de entorno
│   ├── index.html
│   ├── main.ts
│   └── styles.css
│
├── docs/                         # Documentación
│   └── screenshots/
│
├── documentation/                # Documentación generada por Compodoc
│
├── .gitignore
├── angular.json
├── package.json
├── README.md
├── tailwind.config.js
└── tsconfig.json
```

---

## 🎯 Mejores Prácticas Implementadas

### Código Limpio
- ✅ Nombres descriptivos y claros
- ✅ Funciones pequeñas y específicas
- ✅ Comentarios significativos
- ✅ Código DRY (Don't Repeat Yourself)
- ✅ Principio KISS (Keep It Simple, Stupid)

### TypeScript
- ✅ Tipado estricto
- ✅ Interfaces para todos los modelos
- ✅ Enums para valores constantes
- ✅ Type guards
- ✅ Utility types

### Angular
- ✅ Lazy Loading de módulos
- ✅ OnPush Change Detection (donde aplica)
- ✅ Unsubscribe de Observables
- ✅ TrackBy en ngFor
- ✅ Reactive Forms
- ✅ HTTP Interceptors
- ✅ Route Guards

### Performance
- ✅ Carga diferida de módulos
- ✅ Code splitting
- ✅ Optimización de imágenes
- ✅ Debounce en búsquedas
- ✅ Virtual scrolling (en listas largas)

### UX/UI
- ✅ Loading states
- ✅ Error handling visual
- ✅ Feedback al usuario
- ✅ Animaciones suaves
- ✅ Responsive design
- ✅ Dark mode ready

---

## 🔒 Seguridad

### Medidas Implementadas

#### 1. **Sanitización de Inputs**
```typescript
// Sanitización de strings
const sanitized = SanitizerUtil.sanitizeString(userInput);

// Sanitización de HTML
const safeHtml = SanitizerUtil.sanitizeHtml(sanitizer, htmlContent);
```

#### 2. **Validación de Formularios**
- Validadores custom para username, password, email
- Validación de fortaleza de contraseña
- Prevención de caracteres especiales peligrosos

#### 3. **Protección XSS**
- Escape automático de contenido HTML
- Uso de `DomSanitizer` de Angular
- Pipe `safeHtml` para contenido confiable

#### 4. **Protección CSRF**
- Headers de seguridad en interceptors
- Tokens para operaciones sensibles

#### 5. **Almacenamiento Seguro**
- Encriptación básica de datos en localStorage
- No almacenamiento de contraseñas en texto plano
- Tokens con expiración

#### 6. **HTTP Security Headers**
```typescript
'X-Content-Type-Options': 'nosniff'
'X-Frame-Options': 'DENY'
'X-XSS-Protection': '1; mode=block'
```

### Buenas Prácticas de Seguridad

1. **No exponer información sensible** en el código
2. **Validación** tanto en cliente como servidor
3. **Auditorías de seguridad** regulares
4. **Dependencias actualizadas** constantemente
5. **HTTPS** en producción (recomendado)

---

## 🔌 API

### Radio Browser API

Esta aplicación utiliza la API pública de [Radio Browser](https://www.radio-browser.info/).

#### Endpoints Principales

```typescript
// Búsqueda de estaciones
GET https://de1.api.radio-browser.info/json/stations/search?{params}

// Por país
GET https://de1.api.radio-browser.info/json/stations/bycountry/{country}

// Por género
GET https://de1.api.radio-browser.info/json/stations/bytag/{tag}

// Por nombre
GET https://de1.api.radio-browser.info/json/stations/byname/{name}
```

#### Parámetros Comunes

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `countrycode` | string | Código de país (ISO 3166-1) |
| `limit` | number | Número máximo de resultados |
| `offset` | number | Offset para paginación |
| `order` | string | Campo para ordenar (votes, clickcount, name) |
| `reverse` | boolean | Orden inverso |
| `tag` | string | Filtro por género/etiqueta |

#### Ejemplo de Uso

```typescript
// Buscar radios de rock en Argentina
const params = {
  countrycode: 'AR',
  tag: 'rock',
  limit: 50,
  order: 'votes',
  reverse: true
};

this.radioService.fetchStations(params).subscribe(stations => {
  console.log(stations);
});
```

---

## 🗺 Roadmap

### Versión 2.1 (Q1 2025)
- [ ] Sistema de favoritos persistente
- [ ] Historial de reproducción
- [ ] Compartir estaciones en redes sociales
- [ ] PWA (Progressive Web App)

### Versión 2.2 (Q2 2025)
- [ ] Modo offline con podcasts descargables
- [ ] Ecualizador de audio
- [ ] Temporizador de apagado
- [ ] Soporte multiidioma (i18n)

### Versión 2.3 (Q3 2025)
- [ ] Backend propio con Node.js
- [ ] Base de datos para usuarios
- [ ] Sistema de recomendaciones con IA
- [ ] Chat en vivo entre oyentes

### Versión 3.0 (Q4 2025)
- [ ] App móvil nativa (iOS y Android)
- [ ] Integración con Spotify/Apple Music
- [ ] Visualizador de audio
- [ ] Modo karaoke

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Este proyecto sigue las mejores prácticas de código abierto.

### Cómo Contribuir

1. **Fork** el proyecto
2. **Crea** una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add: Amazing Feature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abre** un Pull Request

### Guía de Estilo

- Seguir las convenciones de Angular
- Código en inglés, comentarios en español
- Tests para nuevas funcionalidades
- Documentación actualizada

### Reportar Bugs

Abre un issue con:
- Descripción clara del problema
- Pasos para reproducir
- Comportamiento esperado vs actual
- Screenshots (si aplica)
- Entorno (navegador, versión, OS)

---

## 📜 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

```
MIT License

Copyright (c) 2024 NaktoG

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 📞 Contacto

**NaktoG**

- GitHub: [@NaktoG](https://github.com/NaktoG)
- Project Link: [https://github.com/NaktoG/radio-app](https://github.com/NaktoG/radio-app)

---

## 🙏 Agradecimientos

- [Radio Browser](https://www.radio-browser.info/) por su increíble API pública
- [Angular Team](https://angular.io/) por el excelente framework
- [Tailwind CSS](https://tailwindcss.com/) por el sistema de diseño
- Todos los contribuidores y testers

---

<div align="center">

**[⬆ Volver arriba](#-radio-app---streaming-de-radio-mundial)**

Hecho con ❤️ y ☕ por [NaktoG](https://github.com/NaktoG)

⭐ Si te gusta este proyecto, no olvides darle una estrella ⭐

</div>
