import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StatisticsModule } from './statistics/statistics.module';
import { KafkaService } from './kafka/kafka.service';
import { StatisticsService } from './statistics/statistics.service';
import {
  RoundStatisticsSchema,
  GameStatisticsSchema,
} from './statistics/statistics.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/tic-tac-toe-statistics'),
    MongooseModule.forFeature([
      { name: 'RoundStatistics', schema: RoundStatisticsSchema },
    ]),
    MongooseModule.forFeature([
      { name: 'GameStatistics', schema: GameStatisticsSchema },
    ]),
    StatisticsModule,
  ],
  providers: [KafkaService, StatisticsService],
})
export class AppModule {}
