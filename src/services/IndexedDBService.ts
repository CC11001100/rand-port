import { PortRecord } from '../types';

export class IndexedDBService {
  private db: IDBDatabase | null = null;
  private readonly dbName = 'PortGeneratorDB';
  private readonly dbVersion = 1;
  private readonly storeName = 'usedPorts';

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onerror = () => {
        reject(new Error('Failed to open database'));
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, { keyPath: 'id' });
          store.createIndex('port', 'port', { unique: true });
          store.createIndex('actionId', 'actionId', { unique: false });
          store.createIndex('usedAt', 'usedAt', { unique: false });
        }
      };
    });
  }

  async addPort(portRecord: PortRecord): Promise<void> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      
      const request = store.put(portRecord);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(new Error('Failed to add port'));
    });
  }

  async getPorts(): Promise<PortRecord[]> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();

      request.onsuccess = () => {
        const records = request.result.map((item: any) => ({
          ...item,
          usedAt: new Date(item.usedAt)
        }));
        resolve(records);
      };

      request.onerror = () => reject(new Error('Failed to get ports'));
    });
  }

  async removePort(id: string): Promise<void> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(new Error('Failed to remove port'));
    });
  }

  async updatePort(id: string, updates: Partial<PortRecord>): Promise<void> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      
      const getRequest = store.get(id);
      getRequest.onsuccess = () => {
        const record = getRequest.result;
        if (record) {
          const updatedRecord = { ...record, ...updates };
          const putRequest = store.put(updatedRecord);
          putRequest.onsuccess = () => resolve();
          putRequest.onerror = () => reject(new Error('Failed to update port'));
        } else {
          reject(new Error('Port record not found'));
        }
      };
      getRequest.onerror = () => reject(new Error('Failed to get port record'));
    });
  }

  async clearAll(): Promise<void> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = () => reject(new Error('Failed to clear database'));
    });
  }

  async isPortUsed(port: number): Promise<boolean> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const index = store.index('port');
      const request = index.get(port);

      request.onsuccess = () => {
        resolve(!!request.result);
      };
      request.onerror = () => reject(new Error('Failed to check port'));
    });
  }
} 