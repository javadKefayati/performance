import time
from locust import HttpUser, task, between
import random
import string
class QuickstartUser(HttpUser):
    wait_time = between(1, 5)

#     @task
#     def hello_world(self):
#         self.client.get("/AllUsers/DefaultStd.aspx")
      #   self.client.get("/world")

#     @task(3)
#     def view_items(self):
#         for item_id in range(10):
#             self.client.get(f"/item?id={item_id}", name="/item")
#             time.sleep(1)

    def on_start(self):
        letters = string.ascii_lowercase
        self.client.post("/Guest/Login.aspx", json={"ctl00$ctl00$ContentPlaceHolder1$ContentPlaceHolder1$WebUserControl_Login$txtUserName":"".join(random.choice(letters) for i in range(10)) , "ctl00$ctl00$ContentPlaceHolder1$ContentPlaceHolder1$WebUserControl_Login$txtPassword":"".join(random.choice(letters) for i in range(10)) })