import time
from locust import HttpUser, task, between
import random
import string


class QuickstartUser(HttpUser):
        #   wait_time = between(1, 5)
          @task
          def hello(self):
                letters = string.ascii_lowercase
                self.client.get("/node?name="+''.join(random.choice(letters) for i in range(10)) )
                # time.sleep(3)
                
    
#     locust -f locust.py  -H http://localhost:1010  
