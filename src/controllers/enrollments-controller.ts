import { AuthenticatedRequest } from "@/middlewares";
import enrollmentsService from "@/services/enrollments-service";
import { Response } from "express";
import httpStatus from "http-status";
import { AxiosResponse } from "axios";
import { CEPAddress, RequestError } from "@/protocols";

export async function getEnrollmentByUser(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const enrollmentWithAddress = await enrollmentsService.getOneWithAddressByUserId(userId);

    return res.status(httpStatus.OK).send(enrollmentWithAddress);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function postCreateOrUpdateEnrollment(req: AuthenticatedRequest, res: Response) {
  try {
    const update: boolean = await enrollmentsService.createOrUpdateEnrollmentWithAddress({
      ...req.body,
      userId: req.userId,
    });

    if( !update) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function getAddressFromCEP(req: AuthenticatedRequest, res: Response) {
  const { cep } = req.query as Record<string, string>;

  try {
    const address = await enrollmentsService.getAddressFromCEP(cep) as AxiosResponse<any, any> | RequestError;
    const resposta: CEPAddress = address.data;
    if(!resposta.uf) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    
    resposta.cidade = address.data.localidade;

    delete resposta.ibge;
    delete resposta.gia;
    delete resposta.ddd;
    delete resposta.siafi;
    delete resposta.cep;
    delete resposta.localidade;

    res.status(httpStatus.OK).send(resposta);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NO_CONTENT);
    }
  }
}

