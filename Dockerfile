FROM wordpress:php8.2-apache

# Install SQLite, unzip, and Composer
RUN apt-get update && apt-get install -y sqlite3 unzip \
  && rm -rf /var/lib/apt/lists/*

# Install Composer for Sage theme dependencies
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Download and activate the SQLite Integration plugin
RUN curl -L https://github.com/aaemnnosttv/wp-sqlite-db/releases/latest/download/sqlite-integration.zip -o /tmp/sqlite-integration.zip \
  && unzip /tmp/sqlite-integration.zip -d /usr/src/wordpress/wp-content/plugins/ \
  && rm /tmp/sqlite-integration.zip

# Copy Sage theme
COPY web/app/themes/wb-restaurant /var/www/html/wp-content/themes/wb-restaurant

# Install Sage theme dependencies (if composer.json exists)
RUN if [ -f /var/www/html/wp-content/themes/wb-restaurant/composer.json ]; then \
    cd /var/www/html/wp-content/themes/wb-restaurant && composer install --no-dev; \
  fi

# Copy SQLite DB (if you have one)
COPY db/sqlite-database.db /var/www/html/wp-content/database/database.db

# Set permissions
RUN chown -R www-data:www-data /var/www/html/wp-content

EXPOSE 80
