import { AcademicSemister } from "@prisma/client";
import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { AcademicSemisterService } from "./academicSemister.services";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicSemisterService.insertIntoDB(req.body);
  sendResponse<AcademicSemister>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Semister Created!!",
    data: result
  })
})


const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  console.log(req.query);
  const filters = pick(req.query, ['searchTerm', 'code', 'startMonth', 'endMonth']);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  // console.log("filters:", filters, "options:", options);
  const result = await AcademicSemisterService.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Semister data fetched!!",
    meta: result.meta,
    data: result.data
  })
})


export const AcademicSemisterController = {
  insertIntoDB,
  getAllFromDB
}