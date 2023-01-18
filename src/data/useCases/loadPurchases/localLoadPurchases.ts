import { CacheStore } from '@/data/protocols/cache';
import { LoadPurchases, SavePurchases } from '@/domain/useCases';

export class LocalLoadPurchases implements LoadPurchases, SavePurchases {
  private readonly key: string;

  constructor(
    private readonly cacheStore: CacheStore, 
    private readonly timestamp: Date
  ) {
    this.key = 'purchases';
  }

  public async loadAll(): Promise<Array<LoadPurchases.Model>> {
    try {
      this.cacheStore.fetch(this.key);

      return[];
    } catch (error) {
      this.cacheStore.delete(this.key);
      
      return []; 
    }
  }

  public async save(purchases: Array<SavePurchases.Params>): Promise<void> {
    /**
     * Since the flow of cache insertion is always "delete old data -> insert new data", 
     * it is worth creating a method like replace 
     */
    this.cacheStore.replace(this.key, {
      timestamp: this.timestamp,
      value: purchases
    });
  }
}