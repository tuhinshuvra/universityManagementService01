import { AcademicSemister, Prisma, PrismaClient } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { AcademicSemisterServiceabeFields } from "./academicSemister.contants";
import { IAcademicSemisterFilterRequest } from "./academicSemister.interface";

const prisma = new PrismaClient();

const insertIntoDB = async (data: AcademicSemister): Promise<AcademicSemister> => {
  const result = await prisma.academicSemister.create({
    data
  })
  return result;
}

const getAllFromDB = async (
  filters: IAcademicSemisterFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<AcademicSemister[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: AcademicSemisterServiceabeFields.map((field) => ({
        [field]: {
          contins: searchTerm,
          mode: 'insensetive'
        }
      }))
    })
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key]
        }
      }))
    })
  }

  const whereConditions: Prisma.AcademicSemisterWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.academicSemister.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: options.sortBy && options.sortOrder
      ? {
        [options.sortBy]: options.sortOrder
      }
      : {
        createdAt: 'desc'
      }
  });

  const total = await prisma.academicSemister.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result
  }
}

export const AcademicSemisterService = {
  insertIntoDB,
  getAllFromDB
}