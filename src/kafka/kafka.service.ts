import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Kafka, Consumer } from 'kafkajs';
import { StatisticsService } from '../statistics/statistics.service';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private kafka = new Kafka({
    clientId: 'statistics-service',
    brokers: ['localhost:9092'],
  });

  private consumer: Consumer;

  constructor(private statisticsService: StatisticsService) {}

  async onModuleInit() {
    this.consumer = this.kafka.consumer({ groupId: 'statistics-group' });
    await this.consumer.connect();
    await this.consumer.subscribe({
      topic: 'game-events',
      fromBeginning: true,
    });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const gameEvent = JSON.parse(message.value.toString());
        console.log(`Received game event: ${gameEvent}`);
        await this.statisticsService.recordGameEvent(gameEvent);
      },
    });
  }

  async onModuleDestroy() {
    await this.consumer.disconnect();
  }
}
