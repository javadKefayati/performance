package main

import (
	"context"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis/v8"
	"crypto/sha256"
)
  
  var ctx = context.Background()

  func InsertToDb(key string ,value string){
	rdb := redis.NewClient(&redis.Options{
		Addr:     "redis:6379",
		Password: "", // no password set
		DB:       0,  // use default DB
	  })
	  err := rdb.Set(ctx,key,value,0).Err()
	  if err != nil {
		panic(err) 
	  }

  }
  func getFromDb(key string)(string ,  error){
	rdb := redis.NewClient(&redis.Options{
		Addr:     "redis:6379",
		Password: "", // no password set
		DB:       0,  // use default DB
	  })
	  val, err := rdb.Get(ctx, key).Result()
	  fmt.Println(val)
	 
	  return val,err

  }

  func setData(c *gin.Context)  {
	    name := c.Query("name")
	    fmt.Println(name)

	if(len(name)>8){	
		hash_code := sha256.Sum256([]byte(name))
		result_hash:= fmt.Sprintf("%x", hash_code)
		println(result_hash+"\n")
		InsertToDb(result_hash ,name) //set data in redis
		
	    c.JSON(200,gin.H{
		    "response": result_hash,
	    })		
	}else{
	c.JSON(200,gin.H{
		"response":-1 ,
	})
}
  }
  func getData(c *gin.Context){
	//cut value from ?key=value
	name :=c.Query("name")

	fmt.Println(name);

	var value string;
	var err error;
	//sent hash code and give encode
	value,err =getFromDb(name);
	fmt.Println(value);

	if err !=nil {
		c.JSON(200,gin.H{
			"response": -1,
		})
	
	}else {
		c.JSON(200,gin.H{
			"response": value,
		})
	
	}
 		


  }

  func main() {

	router := gin.Default()
	router.POST("/go", setData)
	router.GET("/go", getData)

	router.Run() //
  }