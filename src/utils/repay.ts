import { Response } from "express";

interface IRepay<T> {
  statusCode: number;
  success?: boolean;
  message: string;
  data?: T;
}

const repay = <T>(res: Response, data: IRepay<T>): void => {
  const resData: Partial<IRepay<T>> = {
    success: true,
    message: data.message,
  };
  if (data.data !== undefined) {
    resData.data = data.data;
  }
  res.status(data.statusCode).json(resData);
};

export default repay;
