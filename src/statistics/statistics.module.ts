import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import {
  RoundStatisticsSchema,
  GameStatisticsSchema,
} from './statistics.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'RoundStatistics', schema: RoundStatisticsSchema },
    ]),
    MongooseModule.forFeature([
      { name: 'GameStatistics', schema: GameStatisticsSchema },
    ]),
  ],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule {}
