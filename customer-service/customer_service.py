from flask import Flask, jsonify
import py_eureka_client.eureka_client as eureka_client

app = Flask(__name__)

CONTEXT_PATH = "/customer_service"
SERVICE_PORT = 5000

EUREKA_SERVER = "http://localhost:8761/eureka/"

eureka_client.init(
    eureka_server= EUREKA_SERVER,
    app_name= "CUSTOMER_SERVICE",
    instance_port= SERVICE_PORT
)

@app.route(f'{CONTEXT_PATH}/customers', methods=["GET"])
def get_customer():
    customer_list = [
        {"id":1, "name":"John Doe", "email":"john@gmail.com"},
        {"id":2, "name":"Nimal Sunil", "email":"nimal@gmail.com"},
        {"id":3, "name":"Kamal Hassan", "email":"kamal@gmail.com"}
    ]
    return jsonify(customer_list)

app.run(port=SERVICE_PORT)

