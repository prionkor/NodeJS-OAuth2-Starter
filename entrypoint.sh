#!/bin/sh
set -e           # Stop on any error
sequelize-cli db:migrate  # Run migrations
sequelize-cli db:seed:all     # Preload initial data
exec "$@"        # Run the command as the main container process