import { FindExercisesByEquipmentUsecase } from '@domain/usecases/exercises/find-exercises-by-equipment.usecase'
import { DynamoClient, DynamoClientStageType } from '@infrastructure/databases/dynamo/dynamo-client'
import { ExerciseRepositoryDynamo } from '@infrastructure/databases/dynamo/repositories/exercises/exercise.repository.dynamo'
import { makeFindExercisesByEquipmentUsecaseFactory } from './index'

describe('makeFindExercisesByEquipmentUsecaseFactory', () => {
  it('should create an instance of FindExercisesByEquipmentUsecase', () => {
    const findExercisesByEquipmentUsecase = makeFindExercisesByEquipmentUsecaseFactory()
    expect(findExercisesByEquipmentUsecase).toBeInstanceOf(FindExercisesByEquipmentUsecase)
  })

  it('should create an instance of DynamoClient with the correct stage', () => {
    process.env.STAGE = 'local'
    const dynamoClient = new DynamoClient(String(process.env.STAGE) as DynamoClientStageType)
    const exerciseRepository = new ExerciseRepositoryDynamo(dynamoClient)
    const findExercisesByEquipmentUsecase = new FindExercisesByEquipmentUsecase(exerciseRepository)
    expect(findExercisesByEquipmentUsecase).toBeInstanceOf(FindExercisesByEquipmentUsecase)
  })
})
