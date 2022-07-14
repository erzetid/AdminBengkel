// Copyright (c) 2022 https://www.adminbengkel.my.id

export default class ClientError extends Error {
  statusCode: number;
  name = 'ClientError';
  constructor(message: string, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}
