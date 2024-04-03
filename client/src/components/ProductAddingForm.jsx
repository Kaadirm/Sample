import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import usePostProducts from "../hooks/usePostProducts";
import axios from "axios";

const ProductAddingForm = ({ isModalOpen, closeModal, setData }) => {
  const { isLoading, error, postProducts } = usePostProducts();
  const initialValues = {
    name: "",
    image:
      "https://www.intel.com/content/dam/www/central-libraries/us/en/images/2022-08/evo-laptop-product-image-transparent-background.png.rendition.intel.web.576.324.png",
    price: "",
    description: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    price: Yup.number().required("Price is required"),
    description: Yup.string().required("Description is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    setData(prevData => [...prevData, values])
    postProducts("http://localhost:3000/api", values);
    resetForm();
    // axios.post("http://localhost:3000/api", values)
    //   .then(response => {
    //     // handle success
    //     console.log(response.data);
    //     resetForm();
    //   })
    //   .catch(error => {
    //     // handle error
    //     console.error(error);
    //   });
  };



  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.className === "productAddingForm-container") {
        closeModal();
      }
    };

    if (isModalOpen) {
      window.addEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isModalOpen, closeModal]);

  return (
    <div className="productAddingForm-container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <label>
            Name
            <Field type="text" name="name" />
          </label>
          <ErrorMessage className="redError" name="name" component="div" />

          <label>
            Price
            <Field type="number" name="price" />
          </label>
          <ErrorMessage className="redError" name="price" component="div" />

          <label>
            Description
            <Field as="textarea" name="description" />
          </label>
          <ErrorMessage
            className="redError"
            name="description"
            component="div"
          />

          <button type="submit">Add Product</button>
        </Form>
      </Formik>
    </div>
  );
};

export default ProductAddingForm;

// const [productForm, setProductForm] = useState({
//     name: "",
//     image:
//       "https://www.intel.com/content/dam/www/central-libraries/us/en/images/2022-08/evo-laptop-product-image-transparent-background.png.rendition.intel.web.576.324.png",
//     price: "",
//     description: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProductForm((prevForm) => ({
//       ...prevForm,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(productForm);
//     setProductForm({
//       name: "",
//       image:
//         "https://www.intel.com/content/dam/www/central-libraries/us/en/images/2022-08/evo-laptop-product-image-transparent-background.png.rendition.intel.web.576.324.png",
//       price: "",
//       description: "",
//     });
//   };
//   return (
//     <div className="productAddingForm-container">
//       <form onSubmit={handleSubmit}>
//         <label>
//           Name:
//           <input
//             type="text"
//             value={productForm.name}
//             name="name"
//             onChange={(e) => handleChange(e)}
//           />
//         </label>
//         <label>
//           Price:
//           <input
//             type="number"
//             value={productForm.price}
//             name="price"
//             onChange={(e) => handleChange(e)}
//           />
//         </label>
//         <label>
//           Description:
//           <textarea
//             value={productForm.description}
//             name="description"
//             onChange={(e) => handleChange(e)}
//           />
//         </label>
//         <button type="submit">Add Product</button>
//       </form>
//     </div>
//   );
// };
