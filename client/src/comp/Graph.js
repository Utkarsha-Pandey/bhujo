import React from "react";
import { Progress } from 'antd';

const Graph = ({ allTrnsctn }) => {
    const totalTrnsctn = allTrnsctn.length
    const totalIncomeTrnsctn = allTrnsctn.filter(transaction => transaction.type === 'income')
    const totalExpenseTrnsctn = allTrnsctn.filter(transaction => transaction.type === 'expense')
    const totalIncomePercent = (totalIncomeTrnsctn.length / totalTrnsctn) * 100
    const totalExpensePercent = (totalExpenseTrnsctn.length / totalTrnsctn) * 100

    // const totalKharche = allTrnsctn.reduce(
    //     (acc, transaction) => acc + transaction.amount,
    //     0
    // );

    // const totalIncomeKharche = allTrnsctn.filter(
    //     (transaction) => transaction.type === "income"
    //     ).reduce((acc, transaction) => acc + transaction.amount, 0
    // );

    // const totalExpenseKharche = allTrnsctn.filter(
    //     (transaction) => transaction.type === "expense"
    //     ).reduce((acc, transaction) => acc + transaction.amount, 0
    // );

    // const totalIncomeKharchePercent = (totalIncomeKharche/totalKharche) * 100;
    // const totalExpenseKharchePercent = (totalExpenseKharche/totalKharche) * 100;



        


    return (
        <>
        
        <div className="filters mb-4 pb-2">
            <div className="col">
                <div className="text-center">
                    <div className="hero-title card bg-dark mb-4">
                        <h3>Total Transactions : {totalTrnsctn}</h3>
                    </div>
                    <div className="hero-title text-center mb-4">
                        <h5>Income : {totalIncomeTrnsctn.length} </h5>
                        <h5>Expense : {totalExpenseTrnsctn.length} </h5>
                        <div className="hero-title">
                            <Progress type="circle" 
                                strokeColor={'green'} 
                                className="h2 mx-2 pt-4"
                                percent={totalIncomePercent.toFixed(0)}
                            />
                            <Progress type="circle" 
                                strokeColor={'red'} 
                                className="h2 mx-2 pt-4"
                                percent={totalExpensePercent.toFixed(0)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="col">
                <div className="text-center">
                    <div className="hero-title card bg-dark mb-4">
                        <h3>Total Transactions : {totalKharche}</h3>
                    </div>
                    <div className="hero-title text-center mb-4">
                        <h5>Total Income : {totalIncomeKharche} </h5>
                        <h5>Total Expense : {totalExpenseKharche} </h5>
                        <div className="hero-title">
                            <Progress type="circle" 
                                strokeColor={'green'} 
                                className="h2 mx-2 pt-4"
                                percent={totalIncomeKharchePercent.toFixed(0)}
                            />
                            <Progress type="circle" 
                                strokeColor={'red'} 
                                className="h2 mx-2 pt-4"
                                percent={totalExpenseKharchePercent.toFixed(0)}
                            />
                        </div>
                    </div>
                </div>
            </div> */}
        </div>

        </>
    )
}

export default Graph