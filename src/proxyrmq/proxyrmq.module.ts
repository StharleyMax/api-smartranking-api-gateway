import { Module } from '@nestjs/common';
import { ClientProxySmartRanking } from './clientProxy';

@Module({
  providers: [ClientProxySmartRanking],
  exports: [ClientProxySmartRanking],
})
export class ProxyRMQModule {}
