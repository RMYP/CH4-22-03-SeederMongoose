const express = require("express");
const fs = require('fs');
const customers = require("./../model/customersModels")
    
const defaultRoute = (req, res, next) => {
    res.send("<h1> Hello anastasia </h1>")
}

const getAllCustomer = async (req, res, next) => {
    try {
        const customer = await customers.find()
        res.status(200).json({
            status: "success",
            requestAt: req.requestTime,
            totalData: customer.length,
            data: {
                customer,
            }
        })
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.massage
        })
    }
   
}

const getCustomersById =  async (req, res, next) => {
    try {
        const {id} = req.params.id;
        const customer = await customers.findById(id)
        console.log(id)
        console.log(customer)
        // menggunakan array method untuk membantu menemukan data
        console.log(customer);
        res.status(200).json({
            status: "success", 
            data: {
                customer
            }
    })
    } catch (err) {
        res.status(400).json({
            status: "fail"
        })
    }
    
}

const updateCustomersById = async (req,res) => {
    try {
    const {id} = req.params.id;
    const customer = await customers.findByIdAndUpdate(id, req.body, {
        new:true,
    });
    res.status(200).json({
        status: "success",
        message: "berhasil update data",
        data: {
            customer
        }
    })} 
    catch (err) {
        res.status(400).json({
            status: "fail",
            massage: err.massage
        })
    }
    
}

const deteleCustomersById = async (req,res) => {
try {
    const id = req.params.id;
    await customers.findByIdAndDelete(id)
    res.status(200).json({
        status: "success",
        massage: "berhasil delete data"
    })
} catch (err) {
    res.status(400).json({
        status: "fail",
        massage: err.massage
    })
}
    
}

const createCustomer = async (req, res) => {
    try {
        const newCustomer = await customers.create(req.body);
        res.status(201).json({
            status: "success",
            data: {
                customer:newCustomer
            }
        })
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message : err.mssage
        })
    }
    
}

module.exports = {
    getAllCustomer,
    defaultRoute,
    getCustomersById,
    deteleCustomersById,
    updateCustomersById,
    createCustomer
}