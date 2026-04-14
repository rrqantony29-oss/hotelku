FROM php:8.3-cli

RUN apt-get update && apt-get install -y git curl libpng-dev libonig-dev libxml2-dev libzip-dev libsqlite3-dev zip unzip sqlite3 \
    && docker-php-ext-install pdo pdo_sqlite mbstring bcmath curl zip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY backend/ ./

RUN composer install --no-dev --optimize-autoloader --no-interaction

RUN touch database/database.sqlite && chmod 777 database/

ENV APP_ENV=production
ENV APP_DEBUG=false
ENV DB_CONNECTION=sqlite
ENV DB_DATABASE=/app/database/database.sqlite
ENV LOG_CHANNEL=stderr
ENV SESSION_DRIVER=cookie

EXPOSE 8080

CMD php artisan key:generate --force && php artisan migrate --force && php artisan serve --host 0.0.0.0 --port 8080
