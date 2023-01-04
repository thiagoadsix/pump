import { ExerciseContract } from '@contracts/exercise-contract'

export type BodyPartType =
  'back' |
  'card' |
  'chest' |
  'lower arms' |
  'lower legs' |
  'neck' |
  'shoulders' |
  'upper arms' |
  'upper legs' |
  'waist'

export type EquipmentType =
  'assisted' |
  'band' |
  'barbell' |
  'body weight' |
  'bosu ball' |
  'cable' |
  'dumbbell' |
  'elliptical machine' |
  'ez barbell' |
  'hammer' |
  'kettlebell' |
  'leverage machine' |
  'medicine ball' |
  'olympic barbell' |
  'resistance band' |
  'roller' |
  'rope' |
  'skierg machine' |
  'sled machine' |
  'smith machine' |
  'stability ball' |
  'stationary bike' |
  'stepmill machine' |
  'tire' |
  'trap bar' |
  'upper body ergometer' |
  'weighted' |
  'wheel roller'

export type TargetType =
  'abductors' |
  'abs' |
  'adductors' |
  'biceps' |
  'calves' |
  'cardiovascular system' |
  'delts' |
  'forearms' |
  'glutes' |
  'hamstrings' |
  'lats' |
  'levator scapulae' |
  'pectorals' |
  'quads' |
  'serratus anterior' |
  'spine' |
  'traps' |
  'triceps' |
  'upper back'

export interface GetAllExercisesInterface {
  id: string
  name: string
  target: string
  bodyPart: BodyPartType
  equipment: EquipmentType
  gifUrl: string
}

export class ExerciseService {
  constructor (private readonly s3: ExerciseContract) {
    this.s3 = s3
  }

  public async getAllExercises (): Promise<GetAllExercisesInterface[]> {
    const object = await this.s3.client().getObject({
      Bucket: 'pump-data/json',
      Key: 'all-exercises.json'
    }).promise()
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-base-to-string
    const exercisesObject: GetAllExercisesInterface[] = JSON.parse(object.Body!.toString('utf-8'))

    return exercisesObject.map(exercise => ({ ...exercise }))
  }

  public async getByBodyPart (bodyPart: BodyPartType): Promise<GetAllExercisesInterface[]> {
    const object = await this.s3.client().getObject({
      Bucket: 'pump-data/json',
      Key: 'all-exercises.json'
    }).promise()
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-base-to-string
    const exercisesObject: GetAllExercisesInterface[] = JSON.parse(object.Body!.toString('utf-8'))

    return exercisesObject.filter(exercise => exercise.bodyPart === bodyPart)
  }

  public async getByEquipment (equipment: EquipmentType): Promise<GetAllExercisesInterface[]> {
    const object = await this.s3.client().getObject({
      Bucket: 'pump-data/json',
      Key: 'all-exercises.json'
    }).promise()
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-base-to-string
    const exercisesObject: GetAllExercisesInterface[] = JSON.parse(object.Body!.toString('utf-8'))

    return exercisesObject.filter(exercise => exercise.equipment === equipment)
  }

  public async getByTarget (target: TargetType): Promise<GetAllExercisesInterface[]> {
    const object = await this.s3.client().getObject({
      Bucket: 'pump-data/json',
      Key: 'all-exercises.json'
    }).promise()
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-base-to-string
    const exercisesObject: GetAllExercisesInterface[] = JSON.parse(object.Body!.toString('utf-8'))

    return exercisesObject.filter(exercise => exercise.target === target)
  }
}
