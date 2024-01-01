import React, { useState, useEffect } from "react";
import Modal from "antd/es/modal/Modal";
import Form from "antd/es/form/Form";
import Input from "antd/es/input/Input";
import { Select, Table, message } from "antd";
import axios from "axios";



import Layout from "../comp/Layout/Layout";

const DashBoard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [frequency, setFrequency] = useState('7')

  //table making
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date'
    },
    {
      title: 'Amount',
      dataIndex: 'amount'
    },
    {
      title: 'Type',
      dataIndex: 'type'
    },
    {
      title: 'Category',
      dataIndex: 'category'
    },
    {
      title: 'Reference',
      dataIndex: 'reference'
    },
    {
      title: 'Actions',
      dataIndex: ''
    },

  ]

  //getting transaction
  const [allTrnsctn , setAllTrnsctn] = useState([]);

  const getAllTrnsctn = async() =>{
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      const res = await axios.post('/transaction/get-transaction', {userid: user._id})
      setAllTrnsctn(res.data)
      console.log(res.data);
    } catch (error) {
      console.log(error)
      message.error('Some Error.')
    }
  }

  //useeffect hook
  useEffect(() =>{
    getAllTrnsctn();

  } ,[]);

  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      await axios.post('/transaction/add-transaction', {...values, userid:user._id})
      message.success('Transaction added successfully')
      setIsModalOpen(false)
    } catch (error) {
      message.error('Failed to add transaction.')
      
    }
    
  };

  return (
    <>

      <Layout>
        <div className="fliters"></div>
        <section className="hero-section d-flex justify-content-center align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 col-12 mx-auto">


                <h2 className="hero-title text-center mb-4 pb-2">Click an Action to Continue</h2>
                <div className="row justify-content-center align-items-center">
                  <div className="col-lg-5 col-12">
                    <button className="btn btn-primary " onClick={showModal}>Add Transaction</button>
                    
                    <Modal className="container"
                      title="Add Transaction"
                      open={isModalOpen}
                      onCancel={handleCancel}
                      footer={false}>
                      <Form className="custom-form login-form" Layout="vertical" onFinish={handleSubmit}>
                        <div className="form-floating mb-4 p-0"></div>
                          <Form.Item label="Amount" name="amount">
                            <Input type="text" required />
                          </Form.Item>
                          <Form.Item label="type" name="type">
                            <Select>
                              <Select.Option value="income">Income</Select.Option>
                              <Select.Option value="expense">Expense</Select.Option>
                            </Select>
                          </Form.Item>
                          {/* <Form.Item className="form-floating mb-4 p-0" name="amount">
                            <Input className="form-control" type="Number" placeholder="Amount" />
                          </Form.Item>
                        </div>
                        <div className="form-floating mb-4 p-0">
                          <Form.Item className="" name="type">
                            <Radio.Group value={placement} onChange={placementChange}>
                              <Radio.Button className="custom-btn" value="expense"> Expense </Radio.Button>
                              <Radio.Button className="custom-btn" value="income"> Income </Radio.Button>
                            </Radio.Group>
                          </Form.Item> */}
                        
                        <Form.Item label="Category" name="category">
                          <Select>
                            <Select.Option value="salary">Salary</Select.Option>
                            <Select.Option value="tip">Tip</Select.Option>
                            <Select.Option value="project">Project</Select.Option>
                            <Select.Option value="food">Food</Select.Option>
                            <Select.Option value="movie">Movie</Select.Option>
                            <Select.Option value="bills">Bills</Select.Option>
                            <Select.Option value="medical">Medical</Select.Option>
                            <Select.Option value="fee">Fee</Select.Option>
                            <Select.Option value="tax">Tax</Select.Option>
                          </Select>
                        </Form.Item>
                        <Form.Item label="Date" name="date">
                          <Input type="date" />
                        </Form.Item>
                        <Form.Item label="Refrence" name="reference">
                          <Input type="text" required />
                        </Form.Item>
                        <Form.Item label="Description" name="description">
                          <Input type="text" required />
                        </Form.Item>
                        <div className="d-flex justify-content-end">
                          <button type="submit" className="btn btn-primary">
                            {" "}
                            Add
                          </button>
                        </div>

                      </Form>
                    </Modal>

                    <div class="col-lg-5 col-12">
                    <Table className="custom-form login-form" columns={columns} dataSource={allTrnsctn} />
                    </div>

                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

      </Layout>

    </>
  );
};

export default DashBoard;
