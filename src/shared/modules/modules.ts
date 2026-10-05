import { Responses } from '@messages/EvalResponse';
import { slicePath } from './shared/utils/slicePath';
import type { IClientData } from './shared/interfaces/IClientData';
import type { IServerModule } from './shared/interfaces/IServerModule';

export class Modules {
  private modules: Record<string, IServerModule>;

  constructor(modules: IServerModule[]) {
    this.modules = modules.reduce<typeof this.modules>(
      (prev, curr) => ({ ...prev, [curr.nameRoute]: curr }),
      {},
    );
  }

  public async evalRequest(path: string, data: IClientData) {
    try {
      const { module, route } = slicePath(path);

      const selectedModule = this.modules[module];

      console.log(`Request: Module -> ${module} | Route -> ${route}`);
      if (!selectedModule) {
        return Responses.NOT_FOUND();
      }

      return await selectedModule.evalRequest(route, data);
    } catch (error) {
      console.error(error);
      return Responses.INTERNAL_ERROR();
    }
  }
}
