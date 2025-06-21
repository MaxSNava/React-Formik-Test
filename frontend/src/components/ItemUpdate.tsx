import { Form, Formik, Field } from "formik";
import { useUpdateItemMutation, useDeleteItemMutation } from "../api/apiSlice";
import { itemSchema } from "../schemas/item";
import type { IItemFormValues } from "../interfaces/IItems";
import type { FormikHelpers } from "formik";

type PropsItemUpdate = {
  id: string;
}

export const ItemUpdate = ({id}:PropsItemUpdate) => {

  const [updateItem] = useUpdateItemMutation();
  const [deleteItem] = useDeleteItemMutation();

  const onSubmit = async (values: IItemFormValues, action:FormikHelpers<IItemFormValues>) => {
    try {
      await updateItem({ id, ...values }).unwrap();
      action.resetForm();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  }

  return (
    <div className="flex flex-col items-center p-2 gap-2 bg-slate-800 text-white rounded-md shadow-md">
      <Formik
        initialValues={{ name: '', description: '' }}
        onSubmit={onSubmit}
        validationSchema={itemSchema}
        >
          {({handleBlur, handleChange, errors, submitCount, values}) => (
            <Form
              className="flex flex-col items-center p-2 gap-2 bg-slate-600 text-white rounded-md shadow-md"
            >
              <Field 
                name="name" 
                placeholder="Item Name"
                className="bg-slate-950 text-white p-2 rounded-md"
                onBlur={handleBlur}
                onChange={handleChange} 
                value={values.name} 
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
                value="Update" 
                className="bg-blue-500 text-white p-2 rounded-md cursor-pointer hover:bg-blue-600 transition-colors duration-200"
              />
            </Form>
          )}
      </Formik>

      <button 
        type="submit" 
        onClick={() => deleteItem(id)}
        className="bg-red-600 text-white p-2 rounded-md cursor-pointer hover:bg-red-700 transition-colors duration-200"
      >
        Delete
      </button>
    </div>
  )
}
