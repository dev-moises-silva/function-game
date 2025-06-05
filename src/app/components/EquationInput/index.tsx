import { useFormik } from "formik"
import * as Yup from "yup"

import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"
import Button from "react-bootstrap/Button"
import { FaArrowRight } from "react-icons/fa6"

type Props = {
  setEquation: (equation: string) => void
  readOnly?: boolean
}

export function EquationInput({ setEquation, readOnly }: Props) {
  const regexReta = /^y\s*=\s*([+-]?\d*(?:\/\d+)?(?:\.\d+)?|[+-]?)x\s*([+-]?\d*(?:\/\d+)?(?:\.\d+)?)?$/
  const regexCircunferencia = /^\(x\s*([+-])\s*(\d+)\)\^2\s*\+\s*\(y\s*([+-])\s*(\d+)\)\^2\s*=\s*(\d+)(?:\^2)?$/
  const regexCircunferencia2 = /^x\^2\s*\+\s*y\^2\s*=\s*(\d+)\^2$|^x\^2\s*\+\s*y\^2\s*=\s*(\d+)$/

  const formik = useFormik({
    initialValues: {
      equation: ""
    },
    validationSchema: Yup.object().shape({
      equation: Yup
        .string()
        .test(
          'is-equacao-reta-ou-circunferencia',
          'A equação deve representar uma reta ou uma circunferência válida.',
          function (value) {
            if (!value) return false
            return (
              regexReta.test(value) ||
              regexCircunferencia.test(value) ||
              regexCircunferencia2.test(value)
            )
          }
        )
    }),
    onSubmit: (values, { resetForm }) => {
      setEquation(values.equation)
      resetForm()
    }
  })
  return(
    <Form onSubmit={formik.handleSubmit} className="mb-2">
      <InputGroup>
        <Form.Control value={formik.values.equation} name="equation" readOnly={readOnly} placeholder="Equação da reta ou da circunferência..." onChange={formik.handleChange} isInvalid={!!(formik.touched.equation && formik.errors.equation)}/>
        <Button type="submit" disabled={readOnly} variant="outline-primary">
          <FaArrowRight />
        </Button>
      </InputGroup>
      <Form.Text className="text-danger">
        {formik.touched.equation && formik.errors.equation}
      </Form.Text>
    </Form>
  )
}