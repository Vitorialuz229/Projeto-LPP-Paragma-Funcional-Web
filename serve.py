#!/usr/bin/env python3
# Servidor HTTP local que envia os headers COOP/COEP exigidos
# pelo Chrome para habilitar SharedArrayBuffer.
#
# Uso:  python3 serve.py
# Abra: http://localhost:8000/stress-test.html

import http.server
import socketserver

PORT = 8000


class COOPHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cross-Origin-Opener-Policy', 'same-origin')
        self.send_header('Cross-Origin-Embedder-Policy', 'require-corp')
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()


with socketserver.TCPServer(('', PORT), COOPHandler) as httpd:
    print(f'serving on http://localhost:{PORT}')
    print(f'open  http://localhost:{PORT}/stress-test.html')
    print('Ctrl+C para parar')
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
