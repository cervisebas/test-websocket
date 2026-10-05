import { Responses } from '@messages/EvalResponse';
import { ModulePath } from '@modules/ModulePath';
import { ModuleResolver } from '@modules/ModuleResolver';
import { TestValidator } from '@validators/TestValidator';
import type { Infer } from '@modules/AType';
import type { IClientData } from '@modules/IClientData';
import type { IServerModule } from '@modules/IServerModule';

export class TestModule implements IServerModule {
  public nameRoute = 'test';

  @ModuleResolver()
  public async evalRequest(route: string, data: IClientData) {
    return { route, data };
  }

  @ModulePath('ping', TestValidator)
  public async pong(data: IClientData<Infer<TestValidator>>) {
    console.log(data);
    if (data.data['test'] === 'ping') {
      return Responses.OK('pong');
    }

    return Responses.OK(':(');
  }
}
