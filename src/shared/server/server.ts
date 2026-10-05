import Mustache from 'mustache';
import { Hono } from 'hono';
import { toJSON } from './utils/toJSON';
import { Responses } from '@messages/EvalResponse';
import { upgradeWebSocket, websocket } from 'hono/bun';
import { v4 as uuidv4 } from 'uuid';
import type { Modules } from '@modules/modules';
import type { WebSocketDataRequest } from './interfaces/WebSocketDataRequest';
import type { IWebSiteItem } from './interfaces/IWebSiteItem';
import type { WSContext } from 'hono/ws';

export class Server {
  private hono: Hono;
  private modules: Modules;
  private websites?: IWebSiteItem[];
  private clients: Map<string, WSContext>;

  constructor(modules: Modules, websites?: IWebSiteItem[]) {
    this.modules = modules;
    this.websites = websites;
    this.hono = new Hono();

    this.clients = new Map<string, WSContext>();

    this.startWs();
    this.mapWebsites();
  }

  private startWs() {
    this.hono.get(
      '/',
      upgradeWebSocket(() => {
        const clientId = uuidv4();

        return {
          onOpen: (_, ws) => {
            this.clients.set(clientId, ws);
            console.info(`Cliente ${clientId} conectado!`);
          },
          onClose: () => {
            console.info(`Cliente ${clientId} desconectado!`);
            this.clients.delete(clientId);
          },
          onMessage: async (message, ws) => {
            const json = toJSON(message.data) as WebSocketDataRequest;

            if (!json) {
              return Responses.BAD_REQUEST();
            }

            console.log(`Cliente ${clientId} consulto: ${json.data.path}`);
            const response = await this.modules.evalRequest(
              json.data.path,
              json.data,
            );
            ws.send(JSON.stringify(response));
          },
        };
      }),
    );
  }

  private mapWebsites() {
    if (!this.websites) {
      return;
    }

    for (const website of this.websites) {
      this.hono.get(website.path, (res) => {
        return res.html(Mustache.render(website.template, website.data));
      });
    }
  }

  public start(port: number) {
    const serve = Bun.serve({
      fetch: this.hono.fetch,
      websocket: websocket,
      port: port,
    });

    console.info(`Server started on port: ${serve.port}`);
  }
}
