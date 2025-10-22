# 🚀 Instrucciones Rápidas - Radio App

## ⚡ Si tienes el error "No pipe found with name 'translate'"

### Solución en 1 comando:

```bash
# Navega al directorio de tu proyecto
cd ~/Desktop/radio-app-feature-complete-refactor-and-improvements

# Ejecuta el script de solución automática
bash <(curl -s https://raw.githubusercontent.com/NaktoG/radio-app/main/fix-translate-error.sh)
```

O si ya clonaste el repositorio:

```bash
cd tu-directorio-del-proyecto
chmod +x fix-translate-error.sh
./fix-translate-error.sh
```

### ¿Qué hace este script?

1. ✅ Verifica que estás en el directorio correcto
2. ✅ Hace backup de tus cambios locales
3. ✅ Sincroniza el código con GitHub (donde está la corrección)
4. ✅ Limpia cache y dependencias corruptas
5. ✅ Reinstala todo correctamente
6. ✅ Verifica que @ngx-translate esté instalado

### Después del script:

```bash
npm start
```

---

## 📦 ¿Quieres desplegar la aplicación?

Lee el archivo **DEPLOY_OPTIONS.md** que contiene:

- 🖥️ Despliegue en servidor propio (VPS, DigitalOcean, AWS)
- 🚀 Despliegue en Vercel (recomendado)
- 🎯 Despliegue en Netlify
- 📄 Despliegue en GitHub Pages
- 🔥 Despliegue en Firebase Hosting
- 🔧 Configuración de Nginx
- 🌐 Configuración de dominio

**Ver documentación completa**:
```bash
cat DEPLOY_OPTIONS.md
```

O ábrelo en tu editor de texto favorito.

---

## 🆘 Si el error persiste

### Opción 1: Clonar repositorio desde cero

```bash
# Navega a donde quieras clonar
cd ~/Desktop

# Clona el repositorio
git clone https://github.com/NaktoG/radio-app.git

# Entra al directorio
cd radio-app

# Instala dependencias
npm install

# Inicia la aplicación
npm start
```

### Opción 2: Manual (paso a paso)

```bash
# 1. Sincroniza con GitHub
git fetch origin
git reset --hard origin/main

# 2. Limpia todo
rm -rf node_modules .angular package-lock.json

# 3. Reinstala
npm install

# 4. Verifica @ngx-translate
npm list @ngx-translate/core @ngx-translate/http-loader

# 5. Inicia
npm start
```

---

## 📂 Estructura de Archivos de Ayuda

```
radio-app/
├── fix-translate-error.sh          ← Script de solución automática
├── DEPLOY_OPTIONS.md               ← Guía completa de despliegue
├── INSTRUCCIONES_RAPIDAS.md        ← Este archivo
├── QUICK_START.pdf                 ← Guía rápida de inicio
├── SOLUCION_ERROR_TRANSLATE.pdf    ← Guía del error translate
└── INSTRUCCIONES_USUARIO.pdf       ← Manual de usuario
```

---

## 💡 Consejos

### Mantén tu código actualizado

```bash
git pull origin main
npm install
```

### Si hiciste cambios locales

```bash
# Guarda tus cambios
git stash

# Actualiza código
git pull origin main

# Recupera tus cambios
git stash pop
```

### Verifica el estado antes de empezar

```bash
git status
git log --oneline -5
```

---

## 🎯 Comandos Útiles

```bash
# Iniciar aplicación
npm start

# Compilar para producción
npm run build

# Ejecutar tests
npm test

# Verificar errores de lint
npm run lint

# Ver logs del servidor de desarrollo
npm start 2>&1 | tee logs.txt
```

---

## 🌐 URLs por Defecto

- **Aplicación**: http://localhost:4200
- **Backend Mock**: (Datos locales por ahora)

---

## 📞 Soporte

Si después de seguir estas instrucciones el problema persiste:

1. Verifica que estás usando Node.js v18 o superior: `node --version`
2. Verifica que tienes npm actualizado: `npm --version`
3. Revisa los logs de error completos
4. Busca en la documentación de Angular: https://angular.io/docs

---

**Última actualización**: 22 de octubre de 2025
