# Build stage
FROM node:21-alpine AS build

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar primero los archivos de configuración de npm para aprovechar el caché
COPY package*.json ./
COPY prisma ./prisma/

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Generar el código de Prisma
RUN npx prisma generate

# Compilar la aplicación
RUN npm run build

# Production stage
FROM node:14-alpine AS production

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar archivos de configuración de npm y prisma
COPY package*.json ./
COPY prisma ./prisma/

# Instalar solo dependencias de producción
RUN npm ci --only=production

# Copiar archivos compilados de la etapa de build
COPY --from=build /app/dist ./dist

# Comando para iniciar la aplicación en producción
CMD ["node", "dist/index.js"]
