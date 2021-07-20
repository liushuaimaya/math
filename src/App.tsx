import React, { useState } from "react";
import { Form, Input, Button, Image, message } from "antd";
import formula from "./formula.jpeg";
import { calc } from "./util";
import "./App.css";

const rules = [{ required: true, message: "Please input parma!" }];

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function App() {
  const [res, setRes] = useState<number | undefined>(undefined);
  const [params, setParams] = useState<{ u: string | undefined; m: string | undefined }>({
    u: undefined,
    m: undefined,
  });
  const onFinish = () => {
    if (isNaN(Number(params.m))) {
      message.error(`${params.m} is not number`);
      setRes(undefined);
      return;
    }
    if (isNaN(Number(params.u))) {
      message.error(`${params.u} is not number`);
      setRes(undefined);
      return;
    }

    const res = calc(Number(params.m), Number(params.u));

    if (isNaN(res)) {
      message.error(`参数错误`);
      setRes(undefined);
      return;
    }

    setRes(res);
  };

  const handleReset = () => {
    setParams({ u: undefined, m: undefined });
    setRes(undefined);
  };

  return (
    <div className="App">
      <Form onFinish={onFinish} {...layout}>
        <Form.Item label="公式如图：">
          <Image src={formula} />
        </Form.Item>
        <Form.Item rules={rules} label="请输入参数 m:">
          <Input
            type="number"
            value={params.m}
            onChange={(e) => setParams((prev) => ({ ...prev, m: e.target.value }))}
          />
        </Form.Item>
        <Form.Item rules={rules} label="请输入参数 u:">
          <Input
            type="number"
            value={params.u}
            onChange={(e) => setParams((prev) => ({ ...prev, u: e.target.value }))}
          />
        </Form.Item>
        {res && (
          <Form.Item label="计算结果: ">
            <div className="result">{res}</div>
          </Form.Item>
        )}
        <Form.Item labelAlign="right" {...tailLayout}>
          <Button className="btn" htmlType="reset" onClick={handleReset}>
            重置
          </Button>
          <Button className="btn" disabled={!params.m || !params.u} type="primary" htmlType="submit">
            计算
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default App;
