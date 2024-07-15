import { Schema, Document } from 'mongoose';

export const RoundStatisticsSchema = new Schema({
  winner: { type: String, required: true },
  emptyCells: { type: Number, required: true },
  moves: { type: Number, required: true },
});

export const GameStatisticsSchema = new Schema({
  winner: { type: String, required: true },
  wins: { type: Number, default: 1 },
});

export interface RoundStatistics extends Document {
  winner: string;
  emptyCells: number;
  moves: number;
}

export interface GameStatistics extends Document {
  winner: string;
  wins: number;
}
