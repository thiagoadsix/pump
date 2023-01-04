import type { ValidatedEventAPIGatewayProxyEventPathParameters } from '@libs/api-gateway'
import { formatJSONResponse } from '@libs/api-gateway'
import { middyfy } from '@libs/lambda'
import { S3Gateway } from '@gateways/aws/s3-gateway'
import { BodyPartType, ExerciseService } from '@services/exercise-service'

const getByBodyPart: ValidatedEventAPIGatewayProxyEventPathParameters<{ which: BodyPartType }> = async (event) => {
  const s3Gateway = new S3Gateway()
  const exerciseService = new ExerciseService(s3Gateway)

  const { which } = event.pathParameters

  return formatJSONResponse({
    data: await exerciseService.getByBodyPart(which),
    event
  })
}

export const main = middyfy(getByBodyPart)
