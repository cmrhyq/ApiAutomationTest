import { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Space } from 'antd';
import {FormPanelModel} from "./models.ts";


export default function FormPanel({formData}: {formData: FormPanelModel[]}) {
  const [form] = Form.useForm();
  const [expand, setExpand] = useState(false);

  const onFinish = (values: object) => {
    console.log('Received values of form: ', values);
  };

  return (
    <div>
      <Form form={form} name="advanced_search" onFinish={onFinish}>
        <Row gutter={24}>
          {formData.map(item => (
            <Col span={item.width} key={item.order}>
              <Form.Item
                name={item.name}
                label={item.label}
                tooltip={item.tooltip ? item.tooltip : ""}>
                  <Input placeholder={item.placeholder} />
                </Form.Item>
            </Col>
          ))}
        </Row>
        <div style={{ textAlign: 'right' }}>
          <Space size="small">
            <Button type="primary" htmlType="submit">
              Search
            </Button>
            <Button
              onClick={() => {
                form.resetFields();
              }}>
              Clear
            </Button>
            <a
              style={{ fontSize: 12 }}
              onClick={() => {
                setExpand(!expand);
              }}>
              <DownOutlined rotate={expand ? 180 : 0} /> Collapse
            </a>
          </Space>
        </div>
      </Form>
    </div>
  )
}