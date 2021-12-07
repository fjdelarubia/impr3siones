import { Database, DataSnapshot, ref, get } from 'firebase/database';

import { PATH_VERSION } from './database-paths';

export default abstract class DatabaseConnector {
  constructor(private database: Database) {}

  public async getDatabaseVersion(): Promise<number> {
    return (await this.fvo(PATH_VERSION)).val();
  }

  protected async fvo(path: string): Promise<DataSnapshot> {
    return get(ref(this.database, path));
  }
}
