import { DeepPartial, Repository } from 'typeorm';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';

async function seed<Entity extends ObjectLiteral>(
  repository: Repository<Entity>,
  entities: DeepPartial<Entity>[],
): Promise<void> {
  await repository.clear();
  await repository.save(entities);
}

export default seed;
