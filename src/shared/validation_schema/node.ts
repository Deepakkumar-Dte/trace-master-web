import * as Yup from "yup";

export const schema = Yup.object().shape({
  name: Yup.string().required("Please Enter the Title"),
  description: Yup.string().required("Please Enter the Description"),
  processes: Yup.array()
    .of(
      Yup.object().shape({
        outputs: Yup.array().of(
          Yup.object().shape({
            label: Yup.string().required("Output name is required"),
            variableName: Yup.string().required("Variable name is required"),
            dataType: Yup.string().required("Data Type is required"),
          })
        ),
        inputs: Yup.array().of(
          Yup.object().shape({
            label: Yup.string().required("Output name is required"),
            variableName: Yup.string().required("Variable name is required"),
            dataType: Yup.string().required("Data Type is required"),
          })
        ),
        name: Yup.string().required("Please Enter the ProcessName"),
      })
    )
    .required("At least one process is required"),
});
