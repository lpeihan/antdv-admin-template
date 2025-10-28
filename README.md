# Antdv Admin

## Environment

```shell
# use specified version of node https://github.com/nvm-sh/nvm
nvm use
# install dependencies
pnpm i
# dev
pnpm run serve
# build
pnpm run build
# lint
pnpm run lint
# deploy
pnpm run deploy:lab
pnpm run deploy:production
# chmod +x
chmod +x ./scripts/deploy.sh
```

## Tools

```shell
# Icons
https://free-icons.github.io/free-icons/

# Deploy to Netlify
https://www.netlify.com/

# Convert png to ico
https://cloudconvert.com/png-to-ico

# Tailwind CSS
https://tailwind.nodejs.cn/docs/border-radius

```

## Create .env.local

```shell
LAB_HOST=47.242.63.249
LAB_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----"
PRODUCTION_HOST=47.242.63.249
PRODUCTION_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----"
```

## Nginx

```shell
upstream backend {
  server localhost:8080;
}

server {
  listen 80;
  server_name localhost;
  return 301 https://$host$request_uri;
}

server {
  listen 443 ssl;
  server_name localhost;

  ssl_certificate /home/ubuntu/.acme.sh/localhost_ecc/fullchain.cer;
  ssl_certificate_key /home/ubuntu/.acme.sh/localhost_ecc/localhost.key;

  ssl_session_cache shared:SSL:1m;
  ssl_session_timeout 5m;

  root /home/ubuntu/web/dist;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  location /api/ {
    proxy_pass http://backend;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
  }

  location /admin/ {
    # alias /home/ubuntu/admin/dist/;
    index admin.html;
    try_files $uri $uri/ /admin.html;
  }
}
```
