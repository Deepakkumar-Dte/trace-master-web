import { object, string, number } from "yup";

export const productSchema = object().shape({
  name: string().required("Please Entert the Product"),
  sku: string().required("Please Enter the SKU"),
  category: string().required("Please Select the Category"),
  subCategory: string().optional(),
  baseUnit: string().required("Please Select the Base Unit"),
  secondryUnit: string().optional(),
  convertionRate: number()
    .required("Please Enter the ConvertionRate")
    .test((val, obj) => {
      return obj.parent.secondryUnit ? !!val : false;
    }),
});
