FROM node:stretch

# Create app directory
RUN mkdir -p /opt/services/microservice_name
WORKDIR /opt/services/microservice_name

# Here go all logs
RUN mkdir -p storage/logs/app
RUN chmod 777 storage/logs/app

# Start service
EXPOSE 3000
CMD [ "sh" ]
