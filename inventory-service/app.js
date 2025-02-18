const express = require('express')
const {Eureka} = require('eureka-js-client')

/* accessing objects from a library
const EurekaClient = require('eureka-js-client')
const Eureka = EurekaClient.Eureka*/


//nest js  -> graphql request
const app = express();
const port = 3000;

const router = express.Router()


// 8080/inventory-service/inventory
router.get('/inventory',( req,res)=>{
    res.json({
        items:['milk','Eggs','Bread'],
        message:'Welcome to the inventory System!'
    })
})

//application context
app.use('/inventory-service', router)


// Eureka Client Configuration
const eurekaClient = new Eureka({
    instance: {
        instanceId: "inventory-service",
        app: "INVENTORY-SERVICE",
        hostName: "localhost",
        ipAddr: "127.0.0.1",
        port: {
            $: port,   // Ensure it matches app's running port
            "@enabled": true,
        },
        vipAddress: "inventory-service",
        dataCenterInfo: {
            "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
            name: "MyOwn",
        },
    },
    eureka: {
        host: "localhost",
        port: 8761,
        servicePath: "/eureka/apps/",  // Corrected service path
    },
});


app.listen(port, ()=>{
    console.log(`Inventory Service Running at port : ${port}`)
    eurekaClient.start((error)=>{
        if(error){
            console.error("Fail to register eureka !")
        }else{
            console.log("Successfully Registered With Eureka!")
        }
    })
})