import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  RoundStatistics,
  GameStatistics,
  RoundStatisticsSchema,
  GameStatisticsSchema,
} from './statistics.schema';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectModel(RoundStatisticsSchema.name)
    private roundModel: Model<RoundStatistics>,
    @InjectModel(GameStatisticsSchema.name)
    private gameModel: Model<GameStatistics>,
  ) {}

  async recordGameEvent(gameEvent: any) {
    if (gameEvent.winner) {
      await this.recordGameStatistics({ winner: gameEvent.winner });
    }
    await this.recordRoundStatistics({
      winner: gameEvent.winner || 'none',
      emptyCells: gameEvent.board.flat().filter((cell) => cell === null).length,
      moves: gameEvent.board.flat().filter((cell) => cell !== null).length,
    });
  }

  async recordRoundStatistics(
    roundStats: Partial<RoundStatistics>,
  ): Promise<RoundStatistics> {
    const newRoundStats = new this.roundModel(roundStats);
    return newRoundStats.save();
  }

  async recordGameStatistics(
    gameStats: Partial<GameStatistics>,
  ): Promise<GameStatistics> {
    const existingStats = await this.gameModel
      .findOne({ winner: gameStats.winner })
      .exec();
    if (existingStats) {
      existingStats.wins += 1;
      return existingStats.save();
    } else {
      const newGameStats = new this.gameModel(gameStats);
      return newGameStats.save();
    }
  }

  async getAllRoundStatistics(): Promise<RoundStatistics[]> {
    return this.roundModel.find().exec();
  }

  async getGameStatistics(): Promise<GameStatistics[]> {
    return this.gameModel.find().exec();
  }
}
