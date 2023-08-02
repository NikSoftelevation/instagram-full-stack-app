// import { useDisclosure, useToast } from "@chakra-ui/react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useFormik } from "formik";
// import { getUserProfileAction } from "../../Redux/User/Action";

// const EditProfileForm = () => {
//   const { user } = useSelector((store) => store);

//   const toast = useToast();

//   const dispatch = useDispatch();

//   const token = localStorage.getItem("token");

//   const { isOpen, onOpen, onClose } = useDisclosure();

//   const [imageFile, setImageFile] = useState(null);

//   const [initialValues, setInitialValues] = useState({
//     name: "",useStatStyles
//     username: "",
//     email: "",
//     bio: "",

//     mobile: "",
//     gender: "",
//     website: "",
//     private: false,
//   });

//   useEffect(() => {}, [token]);

//   useEffect(() => {
//     console.log("reqUser ", user.reqUser);

//     const newValue = {};

//     for (let item in initialValues) {
//       if (user.reqUser && user.reqUser[item]) {
//         newValue[item] = user.reqUser[item];
//       }
//     }

//     console.log("New value : ", newValue);
//   }, []);
// };
