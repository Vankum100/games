import { Controller, Get } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { RoundStatistics, GameStatistics } from './statistics.schema';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('/rounds')
  async getAllRounds(): Promise<RoundStatistics[]> {
    return this.statisticsService.getAllRoundStatistics();
  }

  @Get('/games')
  async getGameResults(): Promise<GameStatistics[]> {
    return this.statisticsService.getGameStatistics();
  }
}
