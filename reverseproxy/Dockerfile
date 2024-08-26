FROM nginx

WORKDIR /

COPY nginx.conf /etc/nginx/
COPY index.html /usr/share/nginx/html/
COPY backendserver.conf /etc/nginx/conf.d/
COPY frontendserver.conf /etc/nginx/conf.d/

# remove the default conf
RUN mv /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf.disabled

EXPOSE 80 443