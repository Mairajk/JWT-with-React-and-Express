import { useFormik } from "formik"
import * as yup from 'yup';

// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import { TextField, Button } from '@mui/material'


const Signup = () => {
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        },

        validationSchema:

            yup.object({

                firstName: yup
                    .string('Enter your first name')
                    .required('first name is required')
                    .min(3, "please enter atleast 3 characters ")
                    .max(20, "please enter within 20 characters "),

                lastName: yup
                    .string('Enter your last name')
                    .required('last name is required')
                    .min(3, "please enter atleast 3 characters ")
                    .max(20, "please enter within 20 characters "),

                email: yup
                    .string('Enter your email')
                    .required('Email is required')
                    .email("Enter a valid Email ")
                    .min(3, "please enter more then 3 characters ")
                    .max(25, "please enter within 20 characters "),

                password: yup
                    .string("Please enter your Password")
                    .required("Password is required")
                    .min(8, "Minimum 8 characters"),

            }),

        onSubmit: (values) => {
            console.log("values : ", values);

        }
    });

    return (

        <div className="formDiv">

            <h1> Validation Form </h1>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    type="text"
                    id="firstName"
                    value={formik.values.firstName}
                    placeholder="Enter you first name :"
                    onChange={formik.handleChange}
                    label='First Name'
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    helperText={formik.touched.firstName && formik.errors.firstName}

                />


                <TextField
                    fullWidth
                    type="text"
                    id="lastName"
                    value={formik.values.lastName}
                    placeholder="Enter you last name :"
                    onChange={formik.handleChange}
                    label='Last Name '
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}

                />


                <TextField
                    fullWidth
                    type="email"
                    id="email"
                    value={formik.values.email}
                    placeholder="Enter your Email :"
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}

                />


                <TextField
                    fullWidth
                    type="password"
                    id="password"
                    value={formik.values.password}
                    placeholder="Enter your password :"
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />

                <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    type="submit">
                    Signup
                </Button>
            </form>
        </div>
    )
}


export default Signup;







