// Copyright (c) 2022 fahrizalm14
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
export enum ResultStatus {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  ERROR = 'ERROR',
  NOT_FOUND = 'NOT FOUND',
}

export enum CLIENT_ERROR {
  FAILED = 'failed',
  NOT_FOUND = 'not_found',
}

export enum Category {
  ELECTRICAL = 'electrical',
  ENGINE = 'engine',
  FRAME = 'frame',
}

export enum CategoryServ {
  LIGHT_REPAIR = 'lr',
  REGULAR = 'regular',
  HEAVY_REPAIR = 'hr',
  OIL_REPLACEMENT = 'or',
}

export enum ServStatus {
  QUEUE = 'queue',
  PROGRESS = 'progress',
  DONE = 'done',
}

export enum ImagePart {
  DEFAULT = 'sparePart',
  OIL = 'oil',
  GEAR_OIL = 'gearOil',
  COOLANT = 'coolant',
  BATTERY = 'battery',
  SPARK_PLUG = 'sparkPlug',
  GEAR_SET = 'gearSet',
  BRAKE = 'brake',
  LAMP = 'lamp',
  TIRE = 'tire',
  V_BELT = 'vBelt',
}
