export interface PortRecord {
  id: string;
  port: number;
  actionId: string;
  usedAt: Date;
  note?: string;
}

export interface PortRange {
  min: number;
  max: number;
}

export interface PortGenerationConfig {
  range: PortRange;
  count: number;
}

export interface PortFilter {
  portRange?: PortRange;
  keyword?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface PortSort {
  field: 'port' | 'usedAt';
  direction: 'asc' | 'desc';
} 