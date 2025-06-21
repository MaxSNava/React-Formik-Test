import { Formik, Form, Field } from "formik";
import { useCreateItemMutation } from "../api/apiSlice";
import { itemSchema } from "../schemas/item";
import type { IItemFormValues } from "../interfaces/IItems";
import type { FormikHelpers } from "formik";

export default function ItemForm() {

  const [createItem] = useCreateItemMutation();

  const onSubmit = async (values: IItemFormValues, action:FormikHelpers<IItemFormValues>) => {
    try {
      await createItem(values).unwrap();
      action.resetForm();
    } catch (error) {
      console.error("Error al crear item:", error);
    }
  }

  return (
    <Formik
      initialValues={{ name: '', description: '' }}
      onSubmit={onSubmit}
      validationSchema={itemSchema}
    >
      {({handleBlur, handleChange, errors, submitCount, values}) => (
        <Form 
          className="flex flex-col items-center p-2 gap-2"
        >
          <Field 
            name="name" 
            placeholder="Item Name"
            className="bg-slate-950 text-white p-2 rounded-md"
            onBlur={handleBlur}
          />
          {submitCount > 0 && errors.name && (
            <div className="bg-red-600 rounded-lg p-2">
              {errors.name}
            </div>
          )}

          <textarea 
            name="description" 
            id="description"
            className="bg-slate-950 text-white p-2 rounded-md resize-none"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.description}
          ></textarea>
          {submitCount > 0 && errors.description && (
            <div className="bg-red-600 rounded-lg p-2">
              {errors.description}
            </div>
          )}

          <input 
            type="submit" 
            value="Enviar"
            className="bg-blue-500 text-white p-2 rounded-md cursor-pointer hover:bg-blue-600 transition-colors duration-200"
          />
        </Form>
      )}
    </Formik>
  )
}
