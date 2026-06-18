#!/bin/zsh

cd "$(dirname "$0")" || exit 1

PORT=8765
URL="http://127.0.0.1:${PORT}/crm-marketplaces.html"

if lsof -iTCP:${PORT} -sTCP:LISTEN >/dev/null 2>&1; then
  echo "Directo CRM ya esta funcionando."
  open "${URL}"
  echo "Abierto: ${URL}"
  exit 0
fi

echo "Arrancando Directo CRM..."
open "${URL}"
echo ""
echo "Directo CRM abierto en el navegador."
echo "Mantén esta ventana abierta mientras lo uses."
echo "Cuando termines, cierra esta ventana o pulsa Ctrl+C."
echo ""

python3 -m http.server "${PORT}" --bind 127.0.0.1
