package main

import (
	"fmt"
	"landtick/database"
	"landtick/pkg/mysql"
	"landtick/routes"
	"os"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	e := echo.New()
	errEnv := godotenv.Load()
	if errEnv != nil {
		panic("Failed to load env file")
	}
	mysql.DatabaseInit()
	database.RunMigration()
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{echo.GET, echo.POST, echo.PATCH, echo.DELETE},
		AllowHeaders: []string{"X-Requested-With", "Content-Type", "Authorization"},
	}))
	e.Static("/uploads", "./uploads")

	routes.RouteInit(e.Group("/api/v1"))

	var port = os.Getenv("PORT")

	fmt.Println("server running localhost:" + port)
	e.Logger.Fatal(e.Start(":" + port))
}
