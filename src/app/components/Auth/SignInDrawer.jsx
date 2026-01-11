"use client";
import React from 'react';
import { Drawer, Form, Input, Button, Checkbox } from 'antd';
import { CloseOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';

const SignInDrawer = ({ open, onClose }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Login values:', values);
  };

  return (
   
      <Drawer
      title={<span className="text-xl font-medium text-gray-800">Sign in</span>}
      placement="right"
      onClose={onClose}
      open={open}
      size="small"
      closable={false}
      
      styles={{
        header: { borderBottom: '1px solid #f3f4f6', padding: '20px 24px' },
        body: { padding: '24px' }
      }}
      extra={
        <button 
          onClick={onClose} 
          className="flex items-center gap-1 text-gray-500 hover:text-black transition-colors text-sm font-normal"
        >
          <CloseOutlined className="text-xs" />
          Close
        </button>
      }
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        requiredMark={false}
        className="mt-2"
      >
        {/* Username */}
        <Form.Item
          label={
            <span className="text-gray-700 text-sm">
              Username or email address <span className="text-red-500">*</span>
            </span>
          }
          name="username"
          rules={[{ required: true, message: 'Please enter your username' }]}
        >
          <Input 
            className="!rounded-none h-11 !border-gray-200 focus:!border-emerald-500 hover:!border-emerald-500 shadow-none" 
          />
        </Form.Item>

       
        <Form.Item
          label={
            <span className="text-gray-700 text-sm">
              Password <span className="text-red-500">*</span>
            </span>
          }
          name="password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password 
            className="!rounded-none h-11 !border-gray-200 focus:!border-emerald-500 hover:!border-emerald-500 shadow-none" 
          />
        </Form.Item>

       
        <Form.Item className="mt-8">
          <Button
            type="primary"
            htmlType="submit"
            block
            className="!bg-[#10B981] !border-[#10B981] h-[50px] !rounded-none font-bold text-base tracking-widest uppercase hover:!bg-emerald-600 transition-colors"
          >
            LOG IN
          </Button>
        </Form.Item>

       
        <div className="flex justify-between items-center -mt-2">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox className="text-xs text-gray-500">Remember me</Checkbox>
          </Form.Item>
          <a href="#" className="text-[#10B981] text-xs hover:underline">
            Lost your password?
          </a>
        </div>

       
        <div className="mt-16 pt-10 border-t border-gray-100 text-center">
          <div className="mb-6">
             
            <div className="w-16 h-16 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserOutlined className="text-3xl text-gray-200" />
            </div>
            <p className="text-base font-semibold text-gray-800">
              No account yet?
            </p>
          </div>
          
         <Link href="/register" className="text-gray-800 font-bold text-sm tracking-widest border-b-2 border-[#10B981] pb-0.5 hover:text-emerald-600 hover:border-emerald-600 transition-all uppercase">
            CREATE AN ACCOUNT
          </Link>
        </div>
      </Form>
    </Drawer>
  
  );
};

export default SignInDrawer;