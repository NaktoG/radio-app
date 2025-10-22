
#!/bin/bash

# Script de Solución Automática para Error de Translate Pipe
# Este script resuelve el error "No pipe found with name 'translate'"
# sincronizando el código con GitHub y reinstalando dependencias

set -e

# Colores para mensajes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Script de Solución Automática${NC}"
echo -e "${BLUE}  Radio App - Fix Translate Error${NC}"
echo -e "${BLUE}========================================${NC}\n"

# 1. Verificar que estamos en el directorio correcto
echo -e "${YELLOW}[1/8]${NC} Verificando directorio del proyecto..."
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: No se encontró package.json${NC}"
    echo -e "${RED}Por favor, ejecuta este script desde el directorio raíz del proyecto${NC}"
    exit 1
fi

if [ ! -d ".git" ]; then
    echo -e "${RED}❌ Error: No es un repositorio Git${NC}"
    echo -e "${RED}Por favor, ejecuta este script desde el directorio del proyecto clonado de GitHub${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Directorio correcto${NC}\n"

# 2. Mostrar estado actual de Git
echo -e "${YELLOW}[2/8]${NC} Verificando estado de Git..."
git status
echo ""

# 3. Hacer backup de cambios locales si existen
echo -e "${YELLOW}[3/8]${NC} Verificando cambios locales..."
if [[ -n $(git status -s) ]]; then
    echo -e "${YELLOW}⚠️  Se detectaron cambios locales. Creando backup...${NC}"
    BACKUP_BRANCH="backup-$(date +%Y%m%d-%H%M%S)"
    git stash save "Backup antes de fix-translate-error $(date)"
    echo -e "${GREEN}✓ Backup guardado en stash${NC}"
    echo -e "${BLUE}ℹ️  Para recuperar tus cambios: git stash pop${NC}\n"
else
    echo -e "${GREEN}✓ No hay cambios locales${NC}\n"
fi

# 4. Obtener nombre de la rama actual
CURRENT_BRANCH=$(git branch --show-current)
echo -e "${BLUE}ℹ️  Rama actual: ${CURRENT_BRANCH}${NC}\n"

# 5. Forzar actualización desde GitHub
echo -e "${YELLOW}[4/8]${NC} Sincronizando con GitHub..."
echo -e "${BLUE}ℹ️  Obteniendo últimos cambios...${NC}"
git fetch origin

echo -e "${BLUE}ℹ️  Actualizando código local...${NC}"
git reset --hard origin/${CURRENT_BRANCH}

echo -e "${GREEN}✓ Código sincronizado con GitHub${NC}\n"

# 6. Limpiar completamente cache y dependencias
echo -e "${YELLOW}[5/8]${NC} Limpiando cache y dependencias..."

# Eliminar node_modules
if [ -d "node_modules" ]; then
    echo -e "${BLUE}ℹ️  Eliminando node_modules...${NC}"
    rm -rf node_modules
    echo -e "${GREEN}✓ node_modules eliminado${NC}"
fi

# Eliminar .angular (cache de Angular)
if [ -d ".angular" ]; then
    echo -e "${BLUE}ℹ️  Eliminando .angular/cache...${NC}"
    rm -rf .angular
    echo -e "${GREEN}✓ .angular eliminado${NC}"
fi

# Eliminar package-lock.json
if [ -f "package-lock.json" ]; then
    echo -e "${BLUE}ℹ️  Eliminando package-lock.json...${NC}"
    rm -f package-lock.json
    echo -e "${GREEN}✓ package-lock.json eliminado${NC}"
fi

echo -e "${GREEN}✓ Limpieza completada${NC}\n"

# 7. Reinstalar dependencias
echo -e "${YELLOW}[6/8]${NC} Instalando dependencias..."
echo -e "${BLUE}ℹ️  Ejecutando npm install (esto puede tardar varios minutos)...${NC}\n"

npm install

echo -e "\n${GREEN}✓ Dependencias instaladas${NC}\n"

# 8. Verificar que @ngx-translate esté instalado
echo -e "${YELLOW}[7/8]${NC} Verificando instalación de @ngx-translate..."

if [ -d "node_modules/@ngx-translate/core" ]; then
    TRANSLATE_VERSION=$(node -p "require('./node_modules/@ngx-translate/core/package.json').version")
    echo -e "${GREEN}✓ @ngx-translate/core instalado (v${TRANSLATE_VERSION})${NC}"
else
    echo -e "${RED}❌ @ngx-translate/core no encontrado${NC}"
    echo -e "${YELLOW}Instalando @ngx-translate...${NC}"
    npm install @ngx-translate/core @ngx-translate/http-loader
    echo -e "${GREEN}✓ @ngx-translate instalado${NC}"
fi

if [ -d "node_modules/@ngx-translate/http-loader" ]; then
    LOADER_VERSION=$(node -p "require('./node_modules/@ngx-translate/http-loader/package.json').version")
    echo -e "${GREEN}✓ @ngx-translate/http-loader instalado (v${LOADER_VERSION})${NC}"
else
    echo -e "${RED}❌ @ngx-translate/http-loader no encontrado${NC}"
    echo -e "${YELLOW}Instalando @ngx-translate/http-loader...${NC}"
    npm install @ngx-translate/http-loader
    echo -e "${GREEN}✓ @ngx-translate/http-loader instalado${NC}"
fi

echo ""

# 9. Mostrar resumen
echo -e "${YELLOW}[8/8]${NC} Resumen de acciones realizadas:\n"
echo -e "${GREEN}✓${NC} Código sincronizado con GitHub"
echo -e "${GREEN}✓${NC} Cache y dependencias limpiadas"
echo -e "${GREEN}✓${NC} Dependencias reinstaladas"
echo -e "${GREEN}✓${NC} @ngx-translate verificado e instalado"

echo -e "\n${BLUE}========================================${NC}"
echo -e "${GREEN}  ✓ Solución aplicada correctamente${NC}"
echo -e "${BLUE}========================================${NC}\n"

# 10. Instrucciones finales
echo -e "${YELLOW}📝 SIGUIENTE PASO:${NC}\n"
echo -e "   Ejecuta el siguiente comando para iniciar la aplicación:\n"
echo -e "   ${GREEN}npm start${NC}\n"
echo -e "${BLUE}ℹ️  La aplicación se abrirá en: ${GREEN}http://localhost:4200${NC}\n"

echo -e "${YELLOW}⚠️  IMPORTANTE:${NC}"
echo -e "   Si persiste algún error, ejecuta:\n"
echo -e "   ${GREEN}npm run build${NC}\n"
echo -e "   Para verificar que no hay errores de compilación.\n"

echo -e "${BLUE}========================================${NC}\n"
