import { v4 as uuidv4 } from 'uuid';
import { PortRange, PortRecord } from '../types';
import { IndexedDBService } from '../services/IndexedDBService';

export class PortGenerator {
  static async generateRandomPorts(range: PortRange, count: number): Promise<PortRecord[]> {
    const db = new IndexedDBService();
    await db.init();
    const usedPorts = await db.getPorts();
    const usedPortNumbers = usedPorts.map(record => record.port);
    const availablePorts = this.getAvailablePorts(range, usedPortNumbers);
    
    if (availablePorts.length < count) {
      throw new Error(`无法生成 ${count} 个端口，可用端口数量不足 (${availablePorts.length})`);
    }

    const actionId = uuidv4();
    const selectedPorts = this.shuffleArray(availablePorts).slice(0, count);
    
    return selectedPorts.map(port => ({
      id: uuidv4(),
      port,
      actionId,
      usedAt: new Date(),
      note: ''
    }));
  }

  private static getAvailablePorts(range: PortRange, usedPorts: number[]): number[] {
    const available: number[] = [];
    for (let port = range.min; port <= range.max; port++) {
      if (!usedPorts.includes(port)) {
        available.push(port);
      }
    }
    return available;
  }

  private static shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  static async markPortsAsUsed(ports: PortRecord[]): Promise<void> {
    const db = new IndexedDBService();
    await db.init();
    for (const port of ports) {
      await db.addPort(port);
    }
  }

  static async markPortAsUnused(portId: string): Promise<void> {
    const db = new IndexedDBService();
    await db.init();
    await db.removePort(portId);
  }
} 