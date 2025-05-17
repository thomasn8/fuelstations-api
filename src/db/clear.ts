import { Repository } from 'typeorm';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';

async function clear<Entity extends ObjectLiteral>(
  repository: Repository<Entity>,
): Promise<void> {
  await repository.clear();
}

export default clear;
