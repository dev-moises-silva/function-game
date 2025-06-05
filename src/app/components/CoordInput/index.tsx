import InputGroup from "react-bootstrap/InputGroup"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { IoAdd } from "react-icons/io5"
import { useFormik } from "formik"
import type { Coords } from "../../types/Coords"

type Props = {
  addCoords: (coords: Coords) => void
}

export function CoordInput({ addCoords }: Props) {
  const formik = useFormik({
    initialValues: {
      x: 0,
      y: 0
    },
    onSubmit: (values, { resetForm }) => {
      addCoords({...values, active: true})
      resetForm()
    }
  })
  return (
    <Form onSubmit={formik.handleSubmit} className="mb-2">
      <InputGroup
        style={{
          maxWidth: "200px"
        }}
      >
        <Button type="submit" variant="outline-secondary" title="adicionar coodenadas">
          <IoAdd />
        </Button>
        <Form.Control name="x" size='sm' value={formik.values.x} required type="number" min={-20} max={20} onChange={formik.handleChange}/>
        <InputGroup.Text>
        ,
        </InputGroup.Text>
        <Form.Control name="y" size='sm' value={formik.values.y} required type="number" min={-24} max={24} onChange={formik.handleChange}/>
      </InputGroup>
    </Form>
  )
}