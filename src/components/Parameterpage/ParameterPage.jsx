import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Input, Form, Switch, message } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import style from './ParameterPageStyle.module.css'
import axios from 'axios'

export const ParameterPage = () => {
  const [rowDefs, setRowDefs] = useState([])
  const [colDefs, setColDefs] = useState([])
  const [form] = Form.useForm()

  const handleElectricChange = (checked) => {
    form.setFieldsValue({ electric: checked })
  }

  const handleAddParameter = async (values) => {
    const newColDefs = [...colDefs]
    const hasEmptyFields = Object.values(values).some(
      (val) => val === '' || (typeof val === 'boolean' && val === undefined)
    )

    if (hasEmptyFields) {
      message.error('Please fill in all fields.')
      return
    }

    if (rowDefs.some((item) => item.model === values.model)) {
      message.error('This car model already exists.')
      return
    }

    Object.keys(values).forEach((key) => {
      if (!newColDefs.find((item) => item.field === key)) {
        newColDefs.push({ field: key })
      }
    })

    const newRowDefs = [...rowDefs, values]

    setRowDefs(newRowDefs)
    setColDefs(newColDefs)
    form.resetFields()

    const parameters = { row: newRowDefs, col: newColDefs }

    localStorage.setItem('parameters', JSON.stringify(parameters))

    try {
      await axios.post('/api/parameters', parameters)
      message.success('Settings updated successfully')
    } catch (error) {
      message.error('Failed to save parameters: ' + error.message)
    }

    console.log(newRowDefs)
    console.log('Колонки', newColDefs)
  }
  console.log(rowDefs)
  console.log('Колонки', colDefs)
  return (
    <div className={style.settings}>
      <h2>Settings table</h2>
      <Form
        form={form}
        onFinish={handleAddParameter}
        initialValues={{ electric: false }}
        className={style.formContainer}
      >
        <Form.Item
          label={<p>Make</p>}
          name="make"
          rules={[{ required: true, message: 'Please input make!' }]}
        >
          <Input placeholder="Make" />
        </Form.Item>

        <Form.Item
          label={<p>Model</p>}
          name="model"
          rules={[{ required: true, message: 'Please input model!' }]}
        >
          <Input placeholder="Model" />
        </Form.Item>

        <Form.Item
          label={<p>Price</p>}
          name="price"
          rules={[{ required: true, message: 'Please input price!' }]}
        >
          <Input type="number" placeholder="Price" />
        </Form.Item>

        <Form.Item
          label={<p>Electric</p>}
          name="electric"
          valuePropName="checked"
        >
          <Switch
            onChange={handleElectricChange}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Add parameters
        </Button>

        <Link to="/content">Сформировать таблицу</Link>
      </Form>
    </div>
  )
}
