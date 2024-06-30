import React, { useState, useEffect } from "react";
import Modal from "antd/es/modal/Modal";
import Form from "antd/es/form/Form";
import Input from "antd/es/input/Input";
import { Select, Table, message } from "antd";
import axios from "axios";
import { DatePicker } from "antd";
import Layout from "../comp/Layout/Layout";
import moment from "moment";
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"
import Graph from "../comp/Graph";

const { RangePicker } = DatePicker;



const DashBoard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [frequency, setFrequency] = useState('7')
  const [allTrnsctn, setAllTrnsctn] = useState([]);
  const [SelectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState('all');
  const [viewData, setviewData] = useState('table');
  const [editable, setEditable] = useState(null);

  //table making
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      render: (text) => <span> {moment(text).format('YYYY-MM-DD')} </span>
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
      render: (text, record) => (
        <div>
          <EditOutlined onClick={() => {
            setEditable(record)
            setIsModalOpen(true);
          }} />
          <DeleteOutlined className="mx-2" onClick={() => {
            handleDelete(record);
          }} />
        </div>
      )

    },

  ]

  //getting transaction





  //useeffect hook
  useEffect(() => {
    const getAllTrnsctn = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'))
        const res = await axios.post('/transaction/get-transaction', {
          userid: user._id,
          frequency,
          SelectedDate,
          type,
        });
        setAllTrnsctn(res.data)
      } catch (error) {
        console.log(error)
        message.error('Some Error.')
      }
    }

    getAllTrnsctn();

  }, [frequency, SelectedDate, type]);



  //delete handler
  const handleDelete = async (record) => {
    try {
      await axios.post('/transaction/delete-transaction', { transactionId: record._id })
      message.success("Transaction Deleted Successfully.")
    } catch (error) {
      console.log(error)
      message.error("Unable to Delete the Transaction.")
    }
  }

  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      if (editable) {
        await axios.post('/transaction/edit-transaction', {
          payload: {
            ...values,
            userId: user._id
          },
          transactionId: editable._id,
        })
        message.success('Transaction edited successfully')
      } else {
        await axios.post('/transaction/add-transaction', { ...values, userid: user._id })
        message.success('Transaction added successfully')
      }
      setIsModalOpen(false)
      setEditable(null);
    } catch (error) {
      message.error('Failed to add transaction.')
    }

  };

  return (
    <>

      <Layout>



        <section className="hero-section d-flex justify-content-center align-items-center">
          <div className="container">
          <div className="row">
            <div className="text-center mx-auto">
              <div className="mx-auto">
                <h2 className="hero-title text-center mb-4 pb-2">Dashboard</h2>
                <div className="filters mb-4 pb-2">
                  <h6 className="hero-title">Select Range</h6>
                  <Select value={frequency} onChange={(values) => setFrequency(values)}>
                    <Select.Option value="7"> Last 1 Week </Select.Option>
                    <Select.Option value="28"> Last 1 Month </Select.Option>
                    <Select.Option value="365"> Last 1 Year </Select.Option>
                    <Select.Option value="custom"> Custom </Select.Option>

                  </Select>
                  {frequency === 'custom' && <RangePicker
                    value={SelectedDate}
                    onChange={(values) => setSelectedDate(values)}
                  />}

                </div>
                <div className="filters mb-4 pb-2">
                  <h6 className="hero-title">Select Type</h6>
                  <Select value={type} onChange={(values) => setType(values)}>
                    <Select.Option value="all"> All </Select.Option>
                    <Select.Option value="income"> Income </Select.Option>
                    <Select.Option value="expense"> Expense </Select.Option>
                  </Select>

                  <div className="mx-2">
                    <UnorderedListOutlined
                      className={`mx-2 ${viewData === 'table' ? 'active-icon' : 'inactive-icon'}`}
                      onClick={() => setviewData('table')}
                    />
                    <AreaChartOutlined
                      className={`mx-2 ${viewData === 'graph' ? 'active-icon' : 'inactive-icon'}`}
                      onClick={() => setviewData('graph')}
                    />
                  </div>

                </div>
                <div className="hero-title text-center">
                  <button className="btn btn-primary mb-4 pb-2" onClick={showModal}>
                    Add Transaction
                  </button>
                </div>
                <div className="">
                  {viewData === 'table' ? (
                    <Table className="" columns={columns} dataSource={allTrnsctn} />
                  )
                    : (<Graph allTrnsctn={allTrnsctn} />)
                  }

                </div>


                <Modal className="container"
                  title={editable ? 'Edit Transaction' : 'Add Transaction'}
                  open={isModalOpen}
                  onCancel={handleCancel}
                  footer={false}>
                  <Form className="custom-form login-form" Layout="vertical" onFinish={handleSubmit} initialValues={editable}>
                    <div className="form-floating mb-4 p-0">
                      <Form.Item label="Amount" name="amount">
                        <Input type="text" required />
                      </Form.Item>
                      <Form.Item label="Type" name="type">

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
                    </div>

                  </Form>
                </Modal>
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
