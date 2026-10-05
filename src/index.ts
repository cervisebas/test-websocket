import { Server } from '@server/server';
import { Modules } from '@modules/modules';
import { TestModule } from '@modules/TestModule';
import type { IWebSiteItem } from '@server/interfaces/IWebSiteItem';

// Website Templates
import TestModulesWebsite from '@/websites/TestModulesWebsite.hbs';

const modules = new Modules([new TestModule()]);

const websites: IWebSiteItem[] = [
  {
    template: TestModulesWebsite,
    data: { host: `ws://localhost:${Bun.env.PORT}` },
    path: '/test',
  },
];

const server = new Server(modules, websites);

server.start(Bun.env.PORT as never);
