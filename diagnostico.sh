#!/bin/bash

# Script de diagnóstico para el proyecto Radio-App
# Este script verifica la configuración del entorno y del proyecto

echo "🔍 ========================================"
echo "🔍 DIAGNÓSTICO DE RADIO-APP"
echo "🔍 ========================================"
echo ""

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para verificar comando
check_command() {
    if command -v $1 &> /dev/null; then
        echo -e "${GREEN}✓${NC} $1 está instalado"
        $1 --version | head -n 1
        return 0
    else
        echo -e "${RED}✗${NC} $1 NO está instalado"
        return 1
    fi
}

# Función para verificar archivo
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} Archivo encontrado: $1"
        return 0
    else
        echo -e "${RED}✗${NC} Archivo NO encontrado: $1"
        return 1
    fi
}

# Función para verificar directorio
check_directory() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} Directorio encontrado: $1"
        return 0
    else
        echo -e "${RED}✗${NC} Directorio NO encontrado: $1"
        return 1
    fi
}

echo "📦 1. Verificando herramientas del sistema..."
echo "---------------------------------------------"
check_command node
check_command npm
check_command git
echo ""

echo "📁 2. Verificando estructura del proyecto..."
echo "---------------------------------------------"
check_file "package.json"
check_file "angular.json"
check_file "tsconfig.json"
check_directory "src"
check_directory "src/app"
check_directory "src/assets"
echo ""

echo "🔧 3. Verificando archivos de módulos críticos..."
echo "---------------------------------------------"
check_file "src/app/app.module.ts"
check_file "src/app/shared/shared.module.ts"
check_file "src/app/features/auth/auth.module.ts"
echo ""

echo "🌍 4. Verificando archivos de traducción..."
echo "---------------------------------------------"
check_directory "src/assets/i18n"
check_file "src/assets/i18n/es.json"
check_file "src/assets/i18n/en.json"
echo ""

echo "📚 5. Verificando dependencias de @ngx-translate..."
echo "---------------------------------------------"
if [ -f "package.json" ]; then
    if grep -q "@ngx-translate/core" package.json; then
        echo -e "${GREEN}✓${NC} @ngx-translate/core está en package.json"
        grep "@ngx-translate/core" package.json
    else
        echo -e "${RED}✗${NC} @ngx-translate/core NO está en package.json"
    fi
    
    if grep -q "@ngx-translate/http-loader" package.json; then
        echo -e "${GREEN}✓${NC} @ngx-translate/http-loader está en package.json"
        grep "@ngx-translate/http-loader" package.json
    else
        echo -e "${RED}✗${NC} @ngx-translate/http-loader NO está en package.json"
    fi
fi
echo ""

echo "📦 6. Verificando instalación de node_modules..."
echo "---------------------------------------------"
if check_directory "node_modules"; then
    if [ -d "node_modules/@ngx-translate" ]; then
        echo -e "${GREEN}✓${NC} @ngx-translate está instalado en node_modules"
        ls -la node_modules/@ngx-translate/
    else
        echo -e "${RED}✗${NC} @ngx-translate NO está instalado en node_modules"
        echo -e "${YELLOW}⚠${NC}  Ejecuta: npm install"
    fi
else
    echo -e "${RED}✗${NC} node_modules NO existe"
    echo -e "${YELLOW}⚠${NC}  Ejecuta: npm install"
fi
echo ""

echo "🔍 7. Verificando contenido de shared.module.ts..."
echo "---------------------------------------------"
if [ -f "src/app/shared/shared.module.ts" ]; then
    if grep -q "TranslateModule" src/app/shared/shared.module.ts; then
        echo -e "${GREEN}✓${NC} TranslateModule está importado en SharedModule"
        echo "Líneas relevantes:"
        grep -n "TranslateModule" src/app/shared/shared.module.ts
    else
        echo -e "${RED}✗${NC} TranslateModule NO está en SharedModule"
    fi
fi
echo ""

echo "🔍 8. Verificando contenido de auth.module.ts..."
echo "---------------------------------------------"
if [ -f "src/app/features/auth/auth.module.ts" ]; then
    if grep -q "SharedModule" src/app/features/auth/auth.module.ts; then
        echo -e "${GREEN}✓${NC} SharedModule está importado en AuthModule"
        echo "Líneas relevantes:"
        grep -n "SharedModule" src/app/features/auth/auth.module.ts
    else
        echo -e "${RED}✗${NC} SharedModule NO está en AuthModule"
    fi
fi
echo ""

echo "📊 9. Resumen de Git..."
echo "---------------------------------------------"
if [ -d ".git" ]; then
    echo "Rama actual:"
    git branch --show-current
    echo ""
    echo "Último commit:"
    git log -1 --oneline
    echo ""
    echo "Estado del repositorio:"
    git status -s
else
    echo -e "${RED}✗${NC} No es un repositorio Git"
fi
echo ""

echo "✅ 10. Recomendaciones..."
echo "---------------------------------------------"

ISSUES=0

# Verificar Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo -e "${RED}⚠${NC} Node.js versión $NODE_VERSION es muy antigua. Se requiere >= 16"
    ISSUES=$((ISSUES+1))
fi

# Verificar si node_modules existe
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}⚠${NC} RECOMENDACIÓN: Ejecuta 'npm install'"
    ISSUES=$((ISSUES+1))
fi

# Verificar si @ngx-translate está instalado
if [ ! -d "node_modules/@ngx-translate" ]; then
    echo -e "${YELLOW}⚠${NC} RECOMENDACIÓN: Ejecuta 'npm install' para instalar @ngx-translate"
    ISSUES=$((ISSUES+1))
fi

# Verificar si .angular existe (caché)
if [ -d ".angular" ]; then
    echo -e "${YELLOW}⚠${NC} RECOMENDACIÓN: Si tienes problemas, elimina la caché con 'rm -rf .angular'"
fi

if [ $ISSUES -eq 0 ]; then
    echo -e "${GREEN}✓${NC} ¡Todo parece estar correcto!"
    echo ""
    echo "Si aún tienes problemas, intenta:"
    echo "  1. rm -rf node_modules .angular"
    echo "  2. npm install"
    echo "  3. npm start"
else
    echo -e "${RED}✗${NC} Se encontraron $ISSUES problemas potenciales"
    echo ""
    echo "Pasos recomendados para solucionar:"
    echo "  1. rm -rf node_modules .angular package-lock.json"
    echo "  2. npm install"
    echo "  3. npm start"
fi

echo ""
echo "🔍 ========================================"
echo "🔍 FIN DEL DIAGNÓSTICO"
echo "🔍 ========================================"
